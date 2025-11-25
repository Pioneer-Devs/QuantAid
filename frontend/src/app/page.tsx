"use client";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";
import HowItWorks from "@/components/HowItWorks";
import WhyBlockDAG from "@/components/WhyBlockDAG";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    // no-op: keep placeholder effect for potential future client-side hooks
    return () => undefined;
  }, []);
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
