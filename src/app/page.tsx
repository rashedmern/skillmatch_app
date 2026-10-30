import { Navbar } from "@/components/sections/navbar/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { OpportunityCards } from "@/components/sections/opportunities/OpportunityCards";
import { CompanyMarquee } from "@/components/sections/hero/CompanyMarquee";
import { FeatureShowcase } from "@/components/sections/features/FeatureShowcase";
import { PersonaSection } from "@/components/sections/persona/PersonaSection";
import { TracksSection } from "@/components/sections/tracks/TracksSection";
import { HowItWorks } from "@/components/sections/how-it-works/HowItWorks";
import { TalentMetrics } from "@/components/sections/metrics/TalentMetrics";
import { FinalCtaBanner } from "@/components/sections/cta/FinalCtaBanner";
import { Footer } from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#14151C] text-white selection:bg-[#00D4BE] selection:text-[#051C19]">
      {/* 1. Floating Capsule Navbar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Live Verified Opportunity Cards Simulation */}
        <OpportunityCards />

        {/* 4. Company Trust Marquee */}
        <CompanyMarquee />

        {/* 5. Feature Showcase - Technical Benchmarking */}
        <FeatureShowcase />

        {/* 6. Persona Section - Dual Audience (Student vs Recruiter) */}
        <PersonaSection />

        {/* 7. Specialization Tracks Grid */}
        <TracksSection />

        {/* 8. How It Works Pipeline */}
        <HowItWorks />

        {/* 9. Talent Placement Metrics & Social Proof */}
        <TalentMetrics />

        {/* 10. Final Call to Action Banner */}
        <FinalCtaBanner />
      </main>

      {/* 11. Comprehensive Enterprise Footer */}
      <Footer />
    </div>
  );
}
