import { Navbar } from "@/components/sections/navbar/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { OpportunityCards } from "@/components/sections/opportunities/OpportunityCards";
import { CompanyMarquee } from "@/components/sections/hero/CompanyMarquee";
import { PersonaSection } from "@/components/sections/persona/PersonaSection";
import { TracksSection } from "@/components/sections/tracks/TracksSection";
import { HowItWorks } from "@/components/sections/how-it-works/HowItWorks";
import { TalentMetrics } from "@/components/sections/metrics/TalentMetrics";
import { FinalCtaBanner } from "@/components/sections/cta/FinalCtaBanner";
import { Footer } from "@/components/sections/footer/Footer";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#14151C] text-white selection:bg-[#00D4BE] selection:text-[#051C19]">
      {/* 1. Navbar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* 3. Verified Opportunities */}
        <OpportunityCards />

        {/* 4. Company Trust Marquee */}
        <CompanyMarquee />

        {/* 5. Persona Section - Dual Audience (Candidate vs Recruiter) */}
        <PersonaSection />

        {/* 6. Specialization Tracks Grid */}
        <TracksSection />

        {/* 7. How It Works Pipeline */}
        <HowItWorks />

        {/* 8. Platform Database & Skill Metrics */}
        <TalentMetrics />

        {/* 9. Final Call to Action Banner */}
        <FinalCtaBanner />
      </main>

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
