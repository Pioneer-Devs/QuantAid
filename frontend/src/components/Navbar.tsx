"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import ConnectButton from "./ConnectButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur-md bg-white/90 border-b border-gray-200 shadow-sm" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="font-bold text-2xl tracking-tight text-gray-900">
              QUANTAID
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6 text-sm text-white/90">
            <Link href="#how" className="hover:underline">How it Works</Link>
            <Link href="#why" className="hover:underline">Why BlockDAG</Link>
          </div>

          <div>
            <ConnectButton className="px-4 py-2 rounded-lg shadow-[0_6px_18px_rgba(139,92,246,0.16)]" showAddress={true} />
          </div>
        </div>
      </nav>
    </header>
  );
}
