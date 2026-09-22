import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TracksGrid } from "./TracksGrid";

export const TracksSection: React.FC = () => {
  return (
    <section id="tracks" className="relative w-full py-16 sm:py-20 lg:py-24 bg-surface">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Centered Section Header */}
        <SectionHeader
          align="center"
          badge="Curated CSE Specializations"
          title="Calibrated for Real Engineering Tracks."
          subtitle="Select your focus area to benchmark your codebase against industry expectations, discover high-percentile skill requirements, and explore verified team matches."
        />

        {/* Interactive 3+2 Bento Grid */}
        <TracksGrid />
      </div>
    </section>
  );
};
