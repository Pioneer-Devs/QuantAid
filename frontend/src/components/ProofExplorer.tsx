"use client";

import React, { useState } from 'react';
import { contractAddress, abi } from '../constants';
import { useContractRead } from 'wagmi';

export default function ProofExplorer() {
  const [id, setId] = useState<string>('');
  const [queryId, setQueryId] = useState<number | null>(null);

  const proof = useContractRead({
    address: contractAddress as any,
    abi: abi as any,
    functionName: 'proofs',
    args: queryId !== null ? [queryId] : undefined,
    enabled: queryId !== null,
  });

  function onLookup() {
    const n = Number(id);
    if (Number.isNaN(n) || n <= 0) return;
    setQueryId(n);
  }

  return (
    <div className="p-6">
      <h3 className="font-semibold mb-2">Proof Explorer</h3>
      <div className="flex gap-2">
        <input className="border px-3 py-2 rounded flex-1" value={id} onChange={(e) => setId(e.target.value)} placeholder="Enter proof ID" />
        <button className="px-3 py-2 bg-indigo-600 text-white rounded" onClick={onLookup}>Lookup</button>
      </div>

      {proof?.data && (
        <div className="mt-4 p-4 border rounded bg-white">
          <p><strong>Hash:</strong> <code>{proof.data[0]}</code></p>
          <p><strong>Timestamp:</strong> {new Date(Number(proof.data[1]) * 1000).toString()}</p>
          <p><strong>Owner:</strong> {proof.data[2]}</p>
        </div>
      )}
    </div>
  );
}
