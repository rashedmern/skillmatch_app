import React from "react";
import Link from "next/link";
import { ArrowRight, Code2, ShieldCheck, Sparkles } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center space-y-5 sm:space-y-6 lg:space-y-8 pt-2 sm:pt-4 lg:pt-8">
      {/* 1. Over-Title Real-Time Status Pill (Responsive Flex-Wrap) */}
      <div className="inline-flex items-center">
        <div className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-xs font-semibold text-primary-container shadow-sm max-w-full">
          <StatusDot size="sm" />
          <span className="tracking-wide">Live CSE Matching Engine</span>
          <span className="hidden sm:inline text-secondary/40">•</span>
          <span className="text-secondary-mint font-bold tracking-normal">
            98.4% AST Accuracy
          </span>
        </div>
      </div>

      {/* 2. Display H1 Heading */}
      <div className="space-y-3 sm:space-y-4">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[44px] font-extrabold tracking-[-0.03em] leading-[1.18] sm:leading-[1.16] text-on-surface font-sans">
          Land Your Dream CSE Internship Based on{" "}
          <span className="bg-gradient-to-r from-primary-container via-secondary to-secondary-mint bg-clip-text text-transparent">
            Real Code
          </span>
          , Not Broken Resumes.
        </h1>

        {/* 3. Authoritative Body Value Proposition */}
        <p className="text-sm sm:text-base lg:text-lg text-on-surface-variant font-normal leading-relaxed max-w-xl font-sans">
          Skip keyword-stuffed ATS black holes. SkillMatch performs static AST
          code analysis on your GitHub repositories to evaluate algorithmic
          complexity, concurrency handling, and system architecture—matching you
          directly to production engineering teams.
        </p>
      </div>

      {/* 4. Dual Action CTAs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-3.5 pt-1 sm:pt-2">
        {/* Primary CTA: Start Verification */}
        <Link
          href="/register"
          className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-white bg-primary-container hover:bg-primary-hover active:scale-[0.98] border border-[#07454e] shadow-sm hover:shadow-md transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary/30"
        >
          <span>Start Skill Verification</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-150" />
        </Link>

        {/* Secondary CTA: Explore Roles */}
        <Link
          href="#tracks"
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm sm:text-base font-semibold text-on-surface bg-surface-container-lowest hover:bg-surface-container-low border border-stroke-slate hover:border-stroke-hover active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <span>Explore Live CSE Roles</span>
        </Link>
      </div>

      {/* 5. Telemetry Proof Indicators */}
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-on-surface-variant pt-1 font-medium">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-secondary-mint shrink-0" />
          <span>Zero ATS Keyword Filters</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Code2 className="w-4 h-4 text-secondary-mint shrink-0" />
          <span>AST Verified Repos</span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <Sparkles className="w-4 h-4 text-secondary-mint shrink-0" />
          <span>Direct Lead Access</span>
        </div>
      </div>

      {/* 6. Institutional Partner Trust Strip */}
      <div className="pt-5 sm:pt-6 border-t border-stroke-card/80">
        <p className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider text-outline mb-2.5 sm:mb-3">
          Calibrated with engineering teams &amp; accredited institutions:
        </p>
        <div className="flex flex-wrap items-center gap-x-4 sm:gap-x-6 gap-y-2 text-outline/80 font-bold text-xs sm:text-sm tracking-tight select-none">
          <span className="hover:text-on-surface transition-colors">UC BERKELEY EECS</span>
          <span className="text-outline/30">•</span>
          <span className="hover:text-on-surface transition-colors">STANFORD CS</span>
          <span className="text-outline/30">•</span>
          <span className="hover:text-on-surface transition-colors">CARNEGIE MELLON</span>
          <span className="text-outline/30">•</span>
          <span className="hover:text-on-surface transition-colors">SCALEOPS INFRA</span>
        </div>
      </div>
    </div>
  );
};
