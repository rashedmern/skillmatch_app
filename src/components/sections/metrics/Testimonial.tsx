import React from "react";
import { Quote, CheckCircle2, GitFork, Sparkles } from "lucide-react";
import { FEATURED_TESTIMONIAL } from "@/data/metricsData";

export const Testimonial: React.FC = () => {
  const t = FEATURED_TESTIMONIAL;

  return (
    <div className="relative rounded-2xl bg-surface-container-lowest border border-stroke-card p-6 sm:p-8 shadow-level-1 hover:shadow-level-2 transition-all duration-200 overflow-hidden">
      {/* Subtle Background Accent Gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(10,136,125,0.08),transparent_70%)] pointer-events-none" />

      <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left: Quote Text */}
        <div className="space-y-4 max-w-2xl">
          <div className="flex items-center gap-2 text-secondary-mint">
            <Quote className="w-6 h-6 rotate-180" />
            <span className="text-xs font-bold uppercase tracking-wider text-secondary-mint">
              Verified Candidate Outcome
            </span>
          </div>

          <p className="text-base sm:text-lg text-on-surface font-medium leading-relaxed font-sans">
            &ldquo;{t.quote}&rdquo;
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-outline font-medium">
            <span className="inline-flex items-center gap-1 text-primary-container bg-surface-container-low px-2.5 py-1 rounded-md border border-stroke-card font-mono text-[11px]">
              <GitFork className="w-3.5 h-3.5 text-secondary-mint" />
              {t.verifiedRepo}
            </span>
            <span className="text-outline/40">•</span>
            <span>Reviewed by VP of Infrastructure</span>
          </div>
        </div>

        {/* Right: Author Profile Card & Speed Badge */}
        <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-8 border-stroke-card gap-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container/10 border-2 border-surface-container-lowest shadow-sm flex items-center justify-center font-bold text-primary-container">
                MP
              </div>
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-secondary-mint border-2 border-surface-container-lowest flex items-center justify-center">
                <CheckCircle2 className="w-2.5 h-2.5 text-white" />
              </span>
            </div>

            <div className="text-left md:text-right">
              <h4 className="font-bold text-on-surface text-base font-sans leading-none">
                {t.authorName}
              </h4>
              <p className="text-xs text-secondary-mint font-semibold mt-1">
                {t.authorRole}
              </p>
              <p className="text-xs text-outline mt-0.5 font-normal">
                {t.company} • {t.school}
              </p>
            </div>
          </div>

          {/* Time to Offer Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-primary-container text-xs font-bold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-secondary-mint" />
            <span>{t.timeToOffer}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
