import React from "react";
import { Quote, CheckCircle2, GitFork } from "lucide-react";
import { FEATURED_TESTIMONIAL } from "@/data/metricsData";

export const Testimonial: React.FC = () => {
  const t = FEATURED_TESTIMONIAL;

  return (
    <div className="relative rounded-2xl bg-[#121920] border border-white/10 p-6 sm:p-8 hover:border-[#00D4BE]/50 transition-all duration-200 overflow-hidden text-white">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(0,212,190,0.1),transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Quote Text */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-[#00D4BE]">
            <Quote className="w-6 h-6 rotate-180" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#00D4BE]">
              Verified Candidate Outcome
            </span>
          </div>

          <p className="text-base sm:text-lg text-white font-medium leading-relaxed font-sans">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-zinc-400 font-medium">
            <span className="inline-flex items-center gap-1 text-[#00D4BE] bg-white/5 px-2.5 py-1 rounded-md border border-white/10 font-mono text-[11px]">
              <GitFork className="w-3.5 h-3.5 text-[#00D4BE]" />
              {t.verifiedRepo}
            </span>
            <span className="text-zinc-600">•</span>
            <span>Reviewed by VP of Infrastructure</span>
          </div>
        </div>

        {/* Right: Author Profile Card */}
        <div className="flex flex-col sm:flex-row md:flex-col items-start sm:items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8 border-white/10 gap-4">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#00D4BE]/20 border border-[#00D4BE]/40 text-[#00D4BE] font-extrabold text-sm sm:text-base flex items-center justify-center">
                MP
              </div>
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#00D4BE] border-2 border-[#121920] flex items-center justify-center">
                <CheckCircle2 className="w-2 sm:w-2.5 h-2 sm:h-2.5 text-[#051C19]" />
              </span>
            </div>

            <div className="text-left md:text-right min-w-0">
              <h4 className="font-bold text-white text-sm sm:text-base font-sans leading-none truncate">
                {t.authorName}
              </h4>
              <p className="text-xs text-[#00D4BE] font-semibold mt-1 truncate">
                {t.authorRole}
              </p>
              <p className="text-[11px] sm:text-xs text-zinc-400 mt-0.5 font-normal truncate">
                {t.company} • {t.school}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
