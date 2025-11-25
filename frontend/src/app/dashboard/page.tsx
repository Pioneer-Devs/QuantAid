"use client";

import React from 'react';
import DashboardUpload from '../../components/DashboardUpload';
import ProofExplorer from '../../components/ProofExplorer';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <div className="max-w-6xl mx-auto py-12">
        <header className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">QUANTAID Dashboard</h1>
          <div className="text-sm text-gray-600">Wallet: connected</div>
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
