'use client';

import { createAppKit } from '@reown/appkit/react';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { blockdagPrimordial } from '../chains';

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || '';

const metadata = {
  name: 'BlockDAG Starter Kit',
  description: 'BlockDAG Starter Kit Web3 App',
  url: 'https://blockdag.network', 
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// Use a mutable array so it matches the expected AppKitNetwork[] type
const networks = [blockdagPrimordial];

const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
});

createAppKit({
  adapters: [wagmiAdapter],
  networks: [blockdagPrimordial],
  projectId,
  metadata,
  features: {
    analytics: true,
  },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
} 