import React from "react";
import { PIPELINE_STEPS } from "@/data/pipelineSteps";
import { SectionHeader } from "@/components/common/SectionHeader";
import { PipelineStep } from "./PipelineStep";

export const HowItWorks: React.FC = () => {
  return (
    <section
      id="how-it-works"
      className="relative w-full py-16 sm:py-20 lg:py-24 bg-surface-container-low/30 border-y border-stroke-card/60"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Centered Section Header */}
        <SectionHeader
          align="center"
          badge="End-to-End Pipeline"
          title="How SkillMatch Replaces the Broken Application Pipeline."
          subtitle="Eliminate the resume lottery. From GitHub AST codebase analysis to direct technical interview scheduling in three transparent steps."
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
