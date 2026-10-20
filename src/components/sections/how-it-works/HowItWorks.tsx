import React from "react";
import { PIPELINE_STEPS } from "@/data/pipelineSteps";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PipelineStep } from "./PipelineStep";

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-[#14151C] text-white border-y border-white/5"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Centered Section Header */}
        <SectionHeader
          align="center"
          badge="How It Works"
          title="From Working Code to Direct Technical Interviews."
          subtitle="Skip the resume screening lottery. Prove your technical depth through real GitHub code and interactive challenges in three straightforward steps."
        />

        {/* 3-Step Responsive Sequential Flow */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-6 relative">
          {PIPELINE_STEPS.map((step, index) => (
            <PipelineStep
              key={step.stepNumber}
              step={step}
              isLast={index === PIPELINE_STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
