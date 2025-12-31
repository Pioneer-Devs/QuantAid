"use client";

import React from "react";
import Image from "next/image";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useAppKit } from "@reown/appkit/react";

export default function Hero() {
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
    <section className="relative bg-white py-10 lg:py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Text Content */}
          <div className="text-left space-y-8">
            <div className="space-y-4">
              <p className="text-sm text-blue-600 font-semibold tracking-wide uppercase">
                AI DATASET SECURITY
              </p>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                QUANTAID
              </h1>

              <p className="text-xl sm:text-2xl text-gray-700 leading-relaxed">
                Encrypt AI datasets with <span className="text-blue-600 font-semibold">PQC resistant encryption</span> in your browser and anchor immutable proofs on <span className="text-blue-600 font-semibold">BlockDAG</span> in seconds.
              </p>
            </div>

            <p className="text-base text-gray-600 leading-relaxed max-w-xl">
              Essential decentralized infrastructure for securing AI training data. Powered by post-quantum cryptography, protecting datasets worth billions in value monthly.
            </p>

            <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
              <button 
                onClick={handleCTA}
                className="group px-8 py-4 text-lg font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-white"
              >
                {isConnected ? "Go to Dashboard" : "Start building"}
              </button>
              
              <a 
                href="https://github.com/freddyfavour/QuantAid" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 border-gray-300 text-gray-900 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 inline-block text-center"
              >
                Docs
              </a>
            </div>

            <p className="text-sm text-gray-500">
              Free to try. Works entirely in your browser.
            </p>
          </div>

          {/* Right Column - Image */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src="/quantum.jpg"
              alt="Quantum Security"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
