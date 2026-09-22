import React from "react";
import { ShieldCheck, Award, Lock, CheckCircle2 } from "lucide-react";

export const ComplianceBar: React.FC = () => {
  const currentYear = 2026;

  return (
    <div className="w-full pt-8 pb-10 border-t border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-5 text-xs text-on-surface-variant font-sans">
      {/* Left: Copyright with tabular-nums year */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1">
        <span>
          &copy; <span className="tabular-nums font-mono font-medium">{currentYear}</span> SkillMatch Systems Inc.
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="text-on-surface-variant/80">
          Autonomous Skill Verification &amp; Talent Engine
        </span>
      </div>

      {/* Right: Security & Institutional Compliance Badges */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-4 gap-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low border border-slate-200/70 text-on-surface-variant font-medium text-[11px] select-none">
          <ShieldCheck className="w-3.5 h-3.5 text-primary-container" />
          <span>SOC-2 Type II</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low border border-slate-200/70 text-on-surface-variant font-medium text-[11px] select-none">
          <Award className="w-3.5 h-3.5 text-secondary-mint" />
          <span>ABET Aligned</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container-low border border-slate-200/70 text-on-surface-variant font-medium text-[11px] select-none">
          <Lock className="w-3.5 h-3.5 text-slate-600" />
          <span>End-to-End Encrypted</span>
        </div>

        <div className="hidden lg:inline-flex items-center gap-1.5 pl-2 text-slate-500 text-[11px]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-mint opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-mint" />
          </span>
          <span className="tabular-nums">99.99%</span> Uptime
        </div>
      </div>
    </div>
  );
};
