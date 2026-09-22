import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export const FinalCtaBanner: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-surface overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container with Oceanic Gradient */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] border border-white/10 p-8 sm:p-12 lg:p-16 text-white shadow-2xl overflow-hidden">
          {/* Ambient Radial Lighting Overlay */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] h-[450px] bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.3),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-10 -mb-20 w-[350px] h-[350px] bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.15),transparent_70%)] pointer-events-none" />

          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-secondary-container backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Accelerate Your Engineering Career</span>
            </div>

            {/* Display Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.15] font-sans">
              Ready to Match With Real Code, Not Broken Resumes?
            </h2>

            {/* Subtitle Value Prop */}
            <p className="text-base sm:text-lg text-white/80 font-normal leading-relaxed max-w-2xl mx-auto font-sans">
              Connect your GitHub repository in 60 seconds. Our AST engine evaluates
              your code architecture and matches you directly to hiring engineering
              managers with zero recruiter gatekeeping.
            </p>

            {/* Dual CTA Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
              {/* Primary White CTA Button */}
              <Link
                href="#signup"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg text-base font-bold text-primary-container bg-white hover:bg-surface-container-low active:scale-[0.98] shadow-lg hover:shadow-xl transition-all duration-150 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-white/50"
              >
                <span>Start Free Verification</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-150" />
              </Link>

              {/* Ghost / Outline Secondary CTA Button */}
              <Link
                href="#demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-base font-bold text-white bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 active:scale-[0.98] backdrop-blur-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
              >
                <span>Schedule Employer Demo</span>
              </Link>
            </div>

            {/* Micro Guarantees */}
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-4 text-xs text-white/70 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                100% Free for Students
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                Zero Private Code Retention
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary-container" />
                AST Match Report in 90 Seconds
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
