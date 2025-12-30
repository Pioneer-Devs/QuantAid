"use client";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";

import { cookieStorage, createStorage } from "wagmi";
import { morphHolesky } from "viem/chains";

// Get projectId at https://cloud.walletconnect.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "QuantAId",
  description: "QuantAId",
  url: "https://quantaid.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiAdapter
const networks = [morphHolesky];

export const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});

export const config = wagmiAdapter.wagmiConfig;
