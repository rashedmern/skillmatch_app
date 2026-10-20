import React from "react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { TracksGrid } from "./TracksGrid";

export const TracksSection: React.FC = () => {
  return (
    <section id="tracks" className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14151C] text-white border-t border-white/5">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Centered Section Header */}
        <SectionHeader
          align="center"
          badge="Specialization Tracks"
          title="Explore In-Demand Engineering Tracks."
          subtitle="See the exact technical competencies and real-world architectures top teams look for in interns and early-career software engineers."
        />

        {/* Interactive 3+2 Bento Grid */}
        <TracksGrid />
      </div>
    </section>
  );
};
