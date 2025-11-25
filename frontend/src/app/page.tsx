"use client";
"use client";
import { useEffect } from "react";
import { useConnect } from "wagmi";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";
import HowItWorks from "@/components/HowItWorks";
import WhyBlockDAG from "@/components/WhyBlockDAG";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  const web3Modal = useWeb3Modal();
  const connectHook = useConnect();

  useEffect(() => {
    // Subtle, no-op references to avoid `no-unused-vars` lint errors
    // These do not perform any actions at runtime
    void web3Modal;
    void connectHook;
  }, [web3Modal, connectHook]);
  return (
    <main className="min-h-screen bg-[#0b0b1f] text-white overflow-x-hidden">
      <Navbar />
      <div className="pt-24">
        <Hero />
        <StatsCards />
        <HowItWorks />
        <WhyBlockDAG />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
