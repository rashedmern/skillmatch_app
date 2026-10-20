import React from "react";
import { PLATFORM_METRICS } from "@/data/metricsData";
import { MetricCard } from "./MetricCard";
import { Testimonial } from "./Testimonial";

export const TalentMetrics: React.FC = () => {
  return (
    <section
      id="benchmarks"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14151C] text-white border-y border-white/5"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00D4BE]/10 border border-[#00D4BE]/30 text-xs font-bold text-[#00D4BE]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D4BE]" />
              Proven Placement Metrics
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
              Real Outcomes Backed by Working Code.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-2xl font-sans">
              Measured across students who landed engineering internships through code-first verification and direct technical reviews.
            </p>
          </div>
        </div>

        {/* 4-Column Bento Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {PLATFORM_METRICS.map((metric) => (
            <MetricCard key={metric.id} metric={metric} />
          ))}
        </div>

        {/* Featured Testimonial Outcome Module */}
        <div className="mt-6 sm:mt-8">
          <Testimonial />
        </div>
      </div>
    </section>
  );
};
