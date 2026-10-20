import React from "react";
import { GitBranch, Network, CalendarCheck, ArrowRight, ArrowDown } from "lucide-react";
import { PipelineStepItem } from "@/data/pipelineSteps";

interface PipelineStepProps {
  step: PipelineStepItem;
  isLast: boolean;
}

export const PipelineStep: React.FC<PipelineStepProps> = ({ step, isLast }) => {
  const renderIcon = (name: PipelineStepItem["iconName"]) => {
    const iconProps = { className: "w-6 h-6 text-[#00D4BE]", strokeWidth: 2 };
    switch (name) {
      case "gitBranch":
        return <GitBranch {...iconProps} />;
      case "network":
        return <Network {...iconProps} />;
      case "calendarCheck":
        return <CalendarCheck {...iconProps} />;
    }
  };

  return (
    <div className="relative flex-1 flex flex-col items-center">
      {/* Step Card Container */}
      <div className="relative w-full rounded-2xl bg-[#121920] border border-white/10 p-5 sm:p-7 lg:p-8 hover:border-[#00D4BE]/50 hover:bg-[#152321] transition-all duration-200 flex flex-col justify-between h-full z-10 group text-white">
        <div>
          {/* Top Header: Step Number Pill + Step Icon */}
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-white/5 border border-white/10 text-[#00D4BE] tabular-nums shrink-0">
              STEP {step.stepNumber}
            </span>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-105 group-hover:bg-[#00D4BE]/10 transition-all duration-200 shrink-0">
              {renderIcon(step.iconName)}
            </div>
          </div>

          {/* Subtitle & Title */}
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#00D4BE] block">
              {step.subtitle}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white font-sans leading-snug group-hover:text-[#00D4BE] transition-colors">
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed mt-2.5 sm:mt-3 font-sans">
            {step.description}
          </p>
        </div>

        {/* Feature Tags Strip */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-white/5 text-zinc-300 border border-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive Visual Connecting Arrow to Next Step */}
      {!isLast && (
        <>
          {/* Desktop Right Connector Arrow */}
          <div className="hidden lg:flex absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 w-7 h-7 rounded-full bg-[#121920] border border-white/15 items-center justify-center text-zinc-400 shadow-md pointer-events-none">
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          {/* Mobile Bottom Connector Arrow */}
          <div className="flex lg:hidden my-2 w-7 h-7 rounded-full bg-[#121920] border border-white/15 items-center justify-center text-zinc-400 shadow-md">
            <ArrowDown className="w-3.5 h-3.5" />
          </div>
        </>
      )}
    </div>
  );
};
