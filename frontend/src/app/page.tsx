"use client";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsCards from "@/components/StatsCards";
import ProblemSection from "@/components/ProblemSection";
import HowItWorks from "@/components/HowItWorks";
import WhyBlockDAG from "@/components/WhyBlockDAG";
import DashboardPreview from "@/components/DashboardPreview";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-x-hidden">
      <Navbar />
      <div className="pt-20">
        <Hero />
        <StatsCards />
        <ProblemSection />
        <HowItWorks />
        <WhyBlockDAG />
        <DashboardPreview />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
