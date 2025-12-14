import { Chain } from 'viem';

export const blockdagPrimordial = {
  id: 1043,
  name: 'BlockDAG Awakening Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'BlockDAG',
    symbol: 'BDAG',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.awakening.bdagscan.com'],
    },
    public: {
      http: ['https://rpc.awakening.bdagscan.com'],
    },
  },
  blockExplorers: {
    default: {
      name: 'BDAGScan Awakening',
      url: 'https://awakening.bdagscan.com',
    },
  },
} as const satisfies Chain; 