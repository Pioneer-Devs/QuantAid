"use client";

import React, { useState, useRef } from 'react';
import { shardFile, encryptShard, arrayBufferToHex, computeDatasetHashFromEncryptedShards } from '../lib/crypto';
import { contractAddress, abi } from '../constants';
import { useContractWrite, useContractRead, usePublicClient } from 'wagmi';

export default function DashboardUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>('Idle');
  const [progress, setProgress] = useState<number>(0);
  const [datasetHash, setDatasetHash] = useState<string | null>(null);
  const [proofId, setProofId] = useState<number | null>(null);
  const encryptedShardsRef = useRef<Uint8Array[]>([]);

  const { write, writeAsync, data: txDataFromHook } = useContractWrite({
    address: contractAddress as any,
    abi: abi as any,
    functionName: 'secureDataset',
  });

  const publicClient = usePublicClient();
  const [txSuccess, setTxSuccess] = React.useState(false);
  const [txData, setTxData] = React.useState<any | null>(null);

  // Quick demo toggle: force mock on-chain flow (no real tx)
  const USE_MOCK_ONCHAIN = true;

  // Wait for transaction confirmation using the public client when we set txData
  React.useEffect(() => {
    let cancelled = false;
    async function waitForTx() {
      if (!txData?.hash) return;
      // If mock flow is enabled, simulate confirmation quickly
      if (USE_MOCK_ONCHAIN && String(txData.hash).startsWith('0xMOCK')) {
        setStatus('Broadcasted (mock)');
        setTimeout(() => {
          if (cancelled) return;
          setTxSuccess(true);
          setStatus('Confirmed (mock)');
        }, 1200);
        return;
      }

      setStatus('Waiting for transaction confirmation');
      try {
        await publicClient.waitForTransaction({ hash: txData.hash });
        if (cancelled) return;
        setTxSuccess(true);
      } catch (err) {
        console.error('Error waiting for tx', err);
        setStatus('Transaction failed');
      }
    }
    waitForTx();
    return () => {
      cancelled = true;
    };
  }, [txData?.hash, publicClient]);

  const { data: proofCount } = useContractRead({
    address: contractAddress as any,
    abi: abi as any,
    functionName: 'proofCount',
  });

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] || null;
    if (!f) return;
    setFile(f);
    setStatus('Sharding');
    const shards = await shardFile(f, 10 * 1024 * 1024);
    setProgress(10);
    setStatus('Encrypting shards');
    encryptedShardsRef.current = [];
    for (let i = 0; i < shards.length; i++) {
      const enc = await encryptShard(shards[i]);
      encryptedShardsRef.current.push(enc.encryptedData);
      setProgress(10 + Math.floor(((i + 1) / shards.length) * 60));
    }

    setStatus('Computing hash');
    const finalHash = await computeDatasetHashFromEncryptedShards(encryptedShardsRef.current);
    setDatasetHash(finalHash);
    setProgress(80);

    // Stub upload to backend
    setStatus('Uploading encrypted shards (stubbed)');
    await new Promise((res) => setTimeout(res, 800));
    console.log('Stub upload: shards count', encryptedShardsRef.current.length);
    setProgress(90);
    setStatus('Ready to secure on BlockDAG');
  }

  async function onSecureClick() {
    if (!datasetHash) return;
    setStatus('Sending transaction');
    try {
      if (USE_MOCK_ONCHAIN) {
        // Simulate a transaction response immediately
        const mockHash = '0xMOCK' + Date.now().toString(16);
        const mockTx = { hash: mockHash };
        setTxData(mockTx);
        setStatus('Broadcasted (mock)');
        // mock backend respond with datasetId and final success
        setTimeout(() => {
          const mockProofId = Math.floor(Math.random() * 9000) + 100;
          setProofId(mockProofId);
          setProgress(100);
          setStatus('Secured on-chain (mock)');
          // log stub backend notify
          console.log('Stub backend notify: proofId', mockProofId, 'hash', datasetHash, 'tx', mockHash);
        }, 1500);
        return;
      }

      // prefer writeAsync when available to get tx response immediately
      if (typeof writeAsync === 'function') {
        const tx = await writeAsync({ args: [datasetHash] });
        setTxData(tx);
        setStatus('Transaction broadcasted');
      } else if (typeof write === 'function') {
        write({ args: [datasetHash] });
        // fallback: txDataFromHook might be populated by wagmi hook
        setTxData(txDataFromHook ?? null);
      }
    } catch (err: any) {
      console.error('User rejected or tx error', err);
      setStatus(err?.message || 'Transaction error');
    }
  }

  // When transaction is confirmed, read proofCount and set proofId
  React.useEffect(() => {
    if (txSuccess) {
      // If we're using mock on-chain, the proofId will already be set by the mock flow
      if (USE_MOCK_ONCHAIN && String(txData?.hash || '').startsWith('0xMOCK')) {
        return;
      }

      const count = Number(proofCount ?? 0);
      setProofId(count);
      setStatus('Secured on-chain');
      setProgress(100);
      // Stub backend notification
      console.log('Stub backend notify: proofId', count, 'hash', datasetHash, 'tx', txData?.hash);
    }
  }, [txSuccess, proofCount, datasetHash, txData]);

  return (
    <div className="p-6">
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white rounded-lg shadow-md overflow-hidden">
        <div className="px-6 py-4">
          <h2 className="text-lg font-semibold">Secure Dataset</h2>
          <p className="text-sm opacity-90">Client-side sharding & post-quantum encryption. No data leaves your browser unencrypted.</p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload dataset</label>
          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
            <input type="file" onChange={handleFileChange} className="mx-auto" />
            <p className="mt-3 text-sm text-gray-500">Drop or select a file (CSV, images, zips). Demo limit: small files recommended.</p>
          </div>

          {file && (
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
              <div className="text-sm text-gray-600">Shards: {encryptedShardsRef.current.length || '—'}</div>
            </div>
          )}

          <div className="mt-4">
            <div className="w-full bg-gray-100 rounded h-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-gray-600">{status}</div>
              <div className="text-sm font-medium">{progress}%</div>
            </div>
            {datasetHash && (
              <div className="mt-3 p-3 bg-gray-50 rounded">
                <div className="flex items-center justify-between">
                  <div className="text-sm break-all"><strong>Hash:</strong> <code className="text-xs">{datasetHash}</code></div>
                  <button
                    className="ml-3 px-3 py-1 bg-indigo-600 text-white text-sm rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(datasetHash || '');
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 flex gap-3">
            <button
              className={`px-4 py-2 rounded text-white ${(!datasetHash || !!txData?.hash) ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-600 hover:brightness-90'}`}
              onClick={onSecureClick}
              disabled={!datasetHash || !!txData?.hash}
            >
              {txData?.hash ? (
                <span className="flex items-center gap-2"><svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path></svg> Pending</span>
              ) : (
                'Secure on BlockDAG'
              )}
            </button>

            <button
              className="px-4 py-2 bg-gray-100 rounded"
              onClick={() => {
                const data = { fileName: file?.name, hash: datasetHash, proofId };
                const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `${file?.name || 'dataset'}.quantaid.json`;
                a.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download Metadata
            </button>
          </div>

          {proofId && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded">
              <p className="font-semibold">Secured! Proof #{proofId}</p>
              <p className="text-sm">Hash: <code className="break-all">{datasetHash}</code></p>
              <p className="text-sm">Transaction: <a className="text-indigo-600" target="_blank" rel="noreferrer" href={`https://primordial.bdagscan.com/tx/${txData?.hash}`}>{txData?.hash}</a></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
