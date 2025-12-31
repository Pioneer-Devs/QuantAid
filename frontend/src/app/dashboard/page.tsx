"use client";

import React, { useState } from 'react';
import DashboardUpload from '../../components/DashboardUpload';
import ProofExplorer from '../../components/ProofExplorer';
import { useDisconnect, useAccount } from 'wagmi';
import { useAppKit } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { disconnect } = useDisconnect();
  const { isConnected, address } = useAccount();
  const appKit = useAppKit();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'upload' | 'proofs'>('upload');

  async function handleLogout() {
    try {
      await disconnect();
    } catch (err) {
      console.warn('Error disconnecting', err);
    }
    try {
      (appKit as any)?.close?.();
    } catch (err) {
      // ignore
    }
    router.push('/');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b0b1f] via-[#1a0b2e] to-[#0b0b1f]">
      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-1">QUANTAID Dashboard</h1>
              <p className="text-gray-400 text-sm">Secure your AI datasets with post-quantum encryption</p>
            </div>
            <div className="flex items-center gap-4">
              {isConnected && (
                <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <div className="text-xs text-gray-400 mb-1">Connected Wallet</div>
                  <div className="text-white font-mono text-sm">
                    {String(address).slice(0, 6)}...{String(address).slice(-4)}
                  </div>
                </div>
              )}
              {isConnected && (
                <button 
                  onClick={handleLogout} 
                  className="px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-300 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105"
                >
                  Disconnect
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Sidebar Navigation (for mobile: tabs) */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-2 mb-8 shadow-[0_8px_32px_rgba(0,0,0,0.3)] inline-flex gap-2">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'upload'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            📤 Upload Dataset
          </button>
          <button
            onClick={() => setActiveTab('proofs')}
            className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeTab === 'proofs'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            🔍 My Proofs
          </button>
        </div>

        {/* Main Content */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <section className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 ${
            activeTab === 'upload' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xl">
                  📤
                </div>
                <h2 className="text-2xl font-bold text-white">Upload & Encrypt</h2>
              </div>
              <DashboardUpload />
            </div>
          </section>

          {/* Proofs Section */}
          <section className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-300 ${
            activeTab === 'proofs' ? 'block' : 'hidden lg:block'
          }`}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center text-white text-xl">
                  🔍
                </div>
                <h2 className="text-2xl font-bold text-white">Proof Explorer</h2>
              </div>
              <ProofExplorer />
            </div>
          </section>
        </main>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div className="backdrop-blur-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(139,92,246,0.2)] hover:scale-105 transition-transform duration-300">
            <div className="text-purple-400 text-sm font-semibold mb-2">Encryption Algorithm</div>
            <div className="text-white text-2xl font-bold">Kyber-1024</div>
            <div className="text-gray-400 text-xs mt-1">NIST Post-Quantum Standard</div>
          </div>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border border-cyan-500/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(0,242,255,0.2)] hover:scale-105 transition-transform duration-300">
            <div className="text-cyan-400 text-sm font-semibold mb-2">Proof Finality</div>
            <div className="text-white text-2xl font-bold">&lt; 2 seconds</div>
            <div className="text-gray-400 text-xs mt-1">BlockDAG Performance</div>
          </div>
          
          <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/20 rounded-2xl p-6 shadow-[0_8px_32px_rgba(34,197,94,0.2)] hover:scale-105 transition-transform duration-300">
            <div className="text-green-400 text-sm font-semibold mb-2">Security Level</div>
            <div className="text-white text-2xl font-bold">Quantum-Safe</div>
            <div className="text-gray-400 text-xs mt-1">Future-proof Protection</div>
          </div>
        </div>
      </div>
    </div>
  );
}
