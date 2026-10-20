"use client";

import React from "react";

const COMPANIES = [
  { name: "Google", subtitle: "Cloud & Distributed Systems" },
  { name: "Stripe", subtitle: "Financial Infrastructure" },
  { name: "Datadog", subtitle: "Observability & Backend" },
  { name: "Microsoft", subtitle: "Azure & Core Systems" },
  { name: "ScaleOps", subtitle: "Cloud Native Kubernetes" },
  { name: "Amazon", subtitle: "AWS & Distributed Systems" },
  { name: "Cloudflare", subtitle: "Edge & Network Systems" },
  { name: "GitHub", subtitle: "Developer Infrastructure" },
  { name: "Uber", subtitle: "Real-time Platform Engineering" },
  { name: "Meta", subtitle: "Systems & Infrastructure" },
];

export const CompanyMarquee: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-20 bg-[#14151C] text-white border-y border-white/5 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Green Dot Eyebrow */}
        <div className="flex items-center gap-2 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#00D4BE] shadow-[0_0_8px_#00D4BE]" />
          <span className="text-xs sm:text-sm font-bold tracking-tight text-white/90">
            Top engineering teams hiring interns on SkillMatch
          </span>
        </div>

        {/* Scrolling Dark Logo Tiles */}
        <div className="relative w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_64px,_black_calc(100%-64px),transparent_100%)]">
          <div className="flex gap-4 sm:gap-5 animate-infinite-scroll hover:[animation-play-state:paused] w-max">
            {[...COMPANIES, ...COMPANIES].map((company, idx) => (
              <div
                key={`${company.name}-${idx}`}
                className="w-40 h-24 sm:w-48 sm:h-28 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/40 transition-all flex flex-col items-center justify-center p-4 shrink-0 select-none group cursor-pointer"
              >
                <span className="text-base sm:text-lg font-black tracking-tight text-white/90 group-hover:text-[#00D4BE] transition-colors">
                  {company.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-medium mt-1">
                  {company.subtitle}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Centered Headline */}
        <div className="text-center max-w-3xl mx-auto mt-16 sm:mt-24 space-y-3">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The direct network for engineering internships
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Connecting ambitious computer science students with engineering organizations hiring based on working code and problem-solving.
          </p>
        </div>
      </div>
    </section>
  );
};
