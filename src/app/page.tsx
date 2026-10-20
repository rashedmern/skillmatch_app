import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Navbar } from "@/components/sections/navbar/Navbar";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import { OpportunityCards } from "@/components/sections/opportunities/OpportunityCards";
import { CompanyMarquee } from "@/components/sections/hero/CompanyMarquee";
import { HandshakeFeatureShowcase } from "@/components/sections/features/HandshakeFeatureShowcase";
import { PersonaSection } from "@/components/sections/persona/PersonaSection";
import { TracksSection } from "@/components/sections/tracks/TracksSection";
import { HowItWorks } from "@/components/sections/how-it-works/HowItWorks";
import { TalentMetrics } from "@/components/sections/metrics/TalentMetrics";
import { FinalCtaBanner } from "@/components/sections/cta/FinalCtaBanner";
import { Footer } from "@/components/sections/footer/Footer";

export default async function Home() {
  // Check if current visitor already has an active authenticated session
  const cookieStore = await cookies();
  const sessionCookie =
    cookieStore.get("skillmatch_session")?.value ||
    cookieStore.get("__Secure-skillmatch_session")?.value;
  const roleCookie = (
    cookieStore.get("skillmatch_auth_role")?.value ||
    cookieStore.get("__Secure-skillmatch_auth_role")?.value
  )?.toUpperCase();
  const candidateEmail = cookieStore.get("skillmatch_candidate_email")?.value;
  const recruiterEmail = cookieStore.get("skillmatch_recruiter_email")?.value;

  const nextAuthSession = await auth();

  const isAuth = Boolean(
    nextAuthSession?.user ||
    sessionCookie === "authenticated" ||
    (roleCookie && (candidateEmail || recruiterEmail))
  );

  // If already logged in, redirect directly to candidate or recruiter console
  if (isAuth) {
    const role =
      (nextAuthSession?.user as any)?.role?.toUpperCase() ||
      roleCookie ||
      (recruiterEmail && !candidateEmail ? "RECRUITER" : "CANDIDATE");

    if (role === "RECRUITER") {
      redirect("/dashboard/recruiter");
    } else {
      redirect("/dashboard/candidate");
    }
  }

  // New or unauthenticated visitor: Render the Landing Page
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#14151C] text-white selection:bg-[#00D4BE] selection:text-[#051C19]">
      {/* 1. Handshake Floating Capsule Navbar */}
      <Navbar />

      <main className="flex-1 w-full flex flex-col">
        {/* 2. Handshake 2026 Giant Centered Hero with Exact Production Gradient */}
        <HeroSection />

        {/* 3. Handshake 6 Opportunity Cards */}
        <OpportunityCards />

        {/* 4. Handshake Company Logo Strip & Network Header */}
        <CompanyMarquee />

        {/* 5. Handshake Feature Showcases with Lush Green Glow */}
        <HandshakeFeatureShowcase />

        {/* 6. Handshake Interactive Persona Switcher (Candidates vs Employers) */}
        <PersonaSection />

        {/* 7. Specialization Tracks Bento Grid */}
        <TracksSection />

        {/* 8. 3-Step Pipeline Pathway */}
        <HowItWorks />

        {/* 9. Real-Time Platform Benchmarks */}
        <TalentMetrics />

        {/* 10. Handshake-Style Rounded-3xl Final Banner */}
        <FinalCtaBanner />
      </main>

      {/* 11. Full-Dark Institutional Footer */}
      <Footer />
    </div>
  );
}
