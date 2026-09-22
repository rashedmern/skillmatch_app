import React from "react";
import { SkillMatchStatus } from "@/data/tracksData";

interface SkillChipProps {
  name: string;
  status?: SkillMatchStatus;
  proficiency?: string;
  className?: string;
}

export const SkillChip: React.FC<SkillChipProps> = ({
  name,
  status = "neutral",
  proficiency,
  className = "",
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "matched":
        return "bg-secondary/10 text-primary-container border-secondary/25 font-semibold";
      case "gap":
        return "bg-accent-gap-subtle text-accent-gap border-accent-gap-border font-medium";
      case "neutral":
      default:
        return "bg-surface-container-low text-on-surface-variant border-stroke-card/70 font-medium hover:border-stroke-hover";
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors select-none ${getStatusStyles()} ${className}`}
    >
      {/* Leading Indicator */}
      {status === "matched" && (
        <span className="w-1.5 h-1.5 rounded-full bg-secondary-mint" />
      )}
      {status === "gap" && (
        <span className="text-[10px] font-bold text-accent-gap leading-none">
          –
        </span>
      )}

      {/* Skill Label */}
      <span className="truncate">{name}</span>

      {/* Optional Embedded Micro-Pill for Proficiency / Repos */}
      {proficiency && (
        <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono tracking-tight bg-black/5 text-outline">
          {proficiency}
        </span>
      )}
    </div>
  );
};
