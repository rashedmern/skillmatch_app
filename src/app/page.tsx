import { Navbar } from "@/components/sections/navbar/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { TalentMetrics } from "@/components/sections/metrics/TalentMetrics";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-surface">
      {/* 1. Global Sticky Navigation Header */}
      <Navbar />

      {/* 2. Hero Section Organism */}
      <HeroSection />

      {/* 3. Real-Time Talent Metrics & Proof Organism */}
      <TalentMetrics />
    </main>
  );
}
