import React from "react";
import { GitBranch, Network, CalendarCheck, ArrowRight, ArrowDown } from "lucide-react";
import { PipelineStepItem } from "@/data/pipelineSteps";

interface PipelineStepProps {
  step: PipelineStepItem;
  isLast: boolean;
}

export const PipelineStep: React.FC<PipelineStepProps> = ({ step, isLast }) => {
  const renderIcon = (name: PipelineStepItem["iconName"]) => {
    const iconProps = { className: "w-6 h-6 text-secondary-mint", strokeWidth: 2 };
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
      <div className="relative w-full rounded-2xl bg-surface-container-lowest border border-stroke-card p-5 sm:p-7 lg:p-8 shadow-level-1 hover:shadow-level-2 hover:border-secondary-mint/40 transition-all duration-200 flex flex-col justify-between h-full z-10 group">
        <div>
          {/* Top Header: Step Number Pill + Step Icon */}
          <div className="flex items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="inline-flex items-center justify-center px-2.5 sm:px-3 py-1 rounded-full text-xs font-bold font-mono tracking-wider bg-surface-container-low border border-stroke-card text-primary-container tabular-nums shrink-0">
              STEP {step.stepNumber}
            </span>

            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center justify-center group-hover:scale-105 group-hover:bg-secondary/15 transition-all duration-200 shrink-0">
              {renderIcon(step.iconName)}
            </div>
          </div>

          {/* Subtitle & Title */}
          <div className="space-y-1">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-secondary-mint block">
              {step.subtitle}
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-on-surface font-sans leading-snug group-hover:text-primary-container transition-colors">
              {step.title}
            </h3>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-on-surface-variant font-normal leading-relaxed mt-2.5 sm:mt-3 font-sans">
            {step.description}
          </p>
        </div>

        {/* Feature Tags Strip */}
        <div className="mt-6 pt-4 border-t border-stroke-card/60 flex flex-wrap gap-1.5">
          {step.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-surface-container-low text-outline border border-stroke-card/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Responsive Visual Connectors between steps */}
      {!isLast && (
        <>
          {/* Desktop Horizontal Connector (Visible lg:block) */}
          <div className="hidden lg:flex absolute top-1/2 -right-4 -translate-y-1/2 translate-x-1/2 z-20 items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-secondary-mint/40 shadow-sm flex items-center justify-center text-secondary-mint">
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Mobile/Tablet Vertical Connector (Visible lg:hidden) */}
          <div className="lg:hidden flex items-center justify-center py-3 text-secondary-mint/80">
            <div className="w-8 h-8 rounded-full bg-surface-container-lowest border border-secondary-mint/40 shadow-sm flex items-center justify-center text-secondary-mint">
              <ArrowDown className="w-4 h-4" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
