"use client";

import React from "react";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useAppKit } from "@reown/appkit/react";

export default function CTASection() {
  const { isConnected } = useAccount();
  const router = useRouter();
  const { open } = useAppKit();

  const handleCTA = () => {
    if (isConnected) {
      router.push("/dashboard");
    } else {
      open();
    }
  };

  return (
    <section className="py-24 px-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full filter blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-300 rounded-full filter blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-5xl sm:text-6xl font-extrabold text-white mb-6 leading-tight">
          Start Securing Your AI Data Today
        </h2>
        
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          Free to try. Works entirely in your browser.
        </p>

        <button 
          onClick={handleCTA}
          className="group px-12 py-6 text-xl font-bold rounded-xl bg-white text-blue-600 hover:bg-gray-50 transition-all duration-300 shadow-2xl hover:shadow-3xl hover:scale-105 transform"
        >
          {isConnected ? "Go to Dashboard" : "Start building"}
        </button>

        <p className="mt-8 text-sm text-blue-200">
          Join teams already protecting their AI datasets with post-quantum encryption
        </p>
      </div>
    </section>
  );
}
