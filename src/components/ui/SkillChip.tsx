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
        return "bg-[#00D4BE]/15 text-[#00D4BE] border-[#00D4BE]/30 font-semibold";
      case "gap":
        return "bg-amber-500/10 text-amber-300 border-amber-500/25 font-medium";
      case "neutral":
      default:
        return "bg-white/5 text-zinc-300 border-white/10 font-medium hover:border-white/20";
    }
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs border transition-colors select-none ${getStatusStyles()} ${className}`}
    >
      {/* Leading Indicator */}
      {status === "matched" && (
        <span className="w-1.5 h-1.5 rounded-full bg-[#00D4BE] shadow-[0_0_5px_#00D4BE]" />
      )}
      {status === "gap" && (
        <span className="text-[10px] font-bold text-amber-300 leading-none">
          •
        </span>
      )}

      {/* Skill Label */}
      <span className="truncate">{name}</span>

      {/* Optional Embedded Micro-Pill for Proficiency / Repos */}
      {proficiency && (
        <span className="ml-0.5 px-1.5 py-0.2 rounded-full text-[10px] font-mono tracking-tight bg-white/10 text-zinc-400">
          {proficiency}
        </span>
      )}
    </div>
  );
};
