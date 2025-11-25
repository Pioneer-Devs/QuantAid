"use client";

import React from 'react';
import DashboardUpload from '../../components/DashboardUpload';
import ProofExplorer from '../../components/ProofExplorer';
import { useDisconnect, useAccount } from 'wagmi';
import { useWeb3Modal } from '@web3modal/wagmi/react';

export default function DashboardPage() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const web3Modal = useWeb3Modal();

  async function handleLogout() {
    try {
      await disconnect();
    } catch (err) {
      console.warn('Error disconnecting', err);
    }
    try {
      // close web3modal UI if present
      (web3Modal as any)?.close?.();
    } catch (err) {
      // ignore
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto py-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">QUANTAID Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">{isConnected ? `Wallet: ${String(address).slice(0,6)}...${String(address).slice(-4)}` : 'Wallet: disconnected'}</div>
            {isConnected && (
              <button onClick={handleLogout} className="px-3 py-1 bg-red-600 text-white rounded text-sm">Logout</button>
            )}
          </div>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-white rounded shadow">
            <DashboardUpload />
          </section>
          <section className="bg-white rounded shadow">
            <ProofExplorer />
          </section>
        </main>
      </div>
    </div>
  );
}
