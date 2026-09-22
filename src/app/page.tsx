import { Navbar } from "@/components/sections/navbar/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { TalentMetrics } from "@/components/sections/metrics/TalentMetrics";
import { TracksSection } from "@/components/sections/tracks/TracksSection";
import { HowItWorks } from "@/components/sections/how-it-works/HowItWorks";
import { FinalCtaBanner } from "@/components/sections/cta/FinalCtaBanner";
import { Footer } from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden flex flex-col bg-surface">
      {/* 1. Global Sticky Navigation Header */}
      <Navbar />

      {/* 2. Hero Section Organism */}
      <HeroSection />

      {/* 3. Real-Time Talent Metrics & Proof Organism */}
      <TalentMetrics />

      {/* 4. CSE Specialization Tracks Bento Grid Organism */}
      <TracksSection />

      {/* 5. How It Works 3-Step Pipeline Organism */}
      <HowItWorks />

      {/* 6. Final Call-to-Action Banner Organism */}
      <FinalCtaBanner />

      {/* 7. Institutional Directory & Compliance Footer */}
      <Footer />
    </main>
  );
}

