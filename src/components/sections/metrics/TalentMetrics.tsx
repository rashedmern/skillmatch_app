import React from "react";
import { PLATFORM_METRICS } from "@/data/metricsData";
import { MetricCard } from "./MetricCard";
import { Testimonial } from "./Testimonial";

export const TalentMetrics: React.FC = () => {
  return (
    <section
      id="benchmarks"
      className="relative w-full py-12 sm:py-16 lg:py-20 bg-surface border-y border-stroke-card/60"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-xs font-semibold text-secondary-mint">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-mint" />
              Verified Telemetry & Pipeline Velocity
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight font-sans">
              Engineered for Metric Precision, Not Guesswork.
            </h2>

            <p className="text-sm sm:text-base text-on-surface-variant font-normal max-w-2xl font-sans">
              Real-time platform telemetry measured across benchmarked repositories,
              interview conversion rates, and hiring team placement timelines.
            </p>
          </div>

          <div className="text-xs text-outline font-medium flex items-center gap-2">
            <span>Enforced OpenType</span>
            <code className="px-1.5 py-0.5 rounded bg-surface-container-low border border-stroke-card font-mono text-[11px] text-primary-container">
              font-variant-numeric: tabular-nums
            </code>
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
