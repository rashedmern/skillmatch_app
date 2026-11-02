import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export const FinalCtaBanner: React.FC = () => {
  return (
    <section className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14151C] overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#051C19] via-[#0D3E35] to-[#095964] border border-[#00D4BE]/30 p-6 sm:p-10 lg:p-16 text-white shadow-2xl overflow-hidden">
          {/* Ambient Lighting Overlay */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[450px] max-w-[90vw] h-[450px] bg-[radial-gradient(circle_at_center,rgba(0,212,190,0.25),transparent_70%)] pointer-events-none" />
          <div className="absolute bottom-0 left-10 -mb-20 w-[350px] max-w-[80vw] h-[350px] bg-[radial-gradient(circle_at_center,rgba(9,89,100,0.35),transparent_70%)] pointer-events-none" />

          {/* Grid Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4BE]/10 border border-[#00D4BE]/30 text-xs font-semibold text-[#00D4BE] backdrop-blur-sm max-w-full">
              <Sparkles className="w-3.5 h-3.5 text-[#00D4BE] shrink-0" />
              <span className="truncate">SkillMatch Platform</span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.03em] leading-[1.18] sm:leading-[1.15] font-sans">
              Ready to showcase your engineering skills?
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl mx-auto font-sans">
              Create your profile in minutes. Connect your GitHub repositories, explore open positions, or post opportunities to recruit verified technical talent.
            </p>

            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4">
              {/* Candidate Button */}
              <Link
                href="/register"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] active:scale-[0.98] shadow-lg hover:shadow-[0_0_25px_rgba(0,212,190,0.45)] transition-all duration-150"
              >
                <span>Get Started as Candidate</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-150" />
              </Link>

              {/* Recruiter Button */}
              <Link
                href="/register?role=recruiter"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-bold text-white bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/40 active:scale-[0.98] backdrop-blur-sm transition-all duration-150"
              >
                <span>Hire Engineering Talent</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
