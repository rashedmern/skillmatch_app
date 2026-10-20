import React from "react";
import { ShieldCheck, Code2, Lock } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";

export const ComplianceBar: React.FC = () => {
  const currentYear = 2026;

  return (
    <div className="w-full pt-6 sm:pt-8 pb-8 sm:pb-10 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-5 text-xs text-zinc-400 font-sans text-center md:text-left">
      {/* Left: Copyright */}
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-2.5 sm:gap-x-3 gap-y-1">
        <span>
          &copy; <span className="tabular-nums font-mono font-medium">{currentYear}</span> SkillMatch. All rights reserved.
        </span>
        <span className="hidden sm:inline text-zinc-600">•</span>
        <span className="text-zinc-400">
          Direct Engineering Internships &amp; Skill Matching
        </span>
      </div>

      {/* Right: Security & Platform Badges */}
      <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-2.5 sm:gap-x-4 gap-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-medium text-[11px] select-none">
          <Code2 className="w-3.5 h-3.5 text-[#00D4BE]" />
          <span>Verified Code Signal</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-medium text-[11px] select-none">
          <Lock className="w-3.5 h-3.5 text-[#00D4BE]" />
          <span>OAuth 2.0 Encrypted</span>
        </div>

        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-zinc-300 font-medium text-[11px] select-none">
          <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
          <span>Zero Private Code Retention</span>
        </div>

        <div className="hidden lg:inline-flex items-center gap-1.5 pl-2 text-zinc-400 text-[11px]">
          <StatusDot size="sm" />
          <span className="tabular-nums">All Systems Operational</span>
        </div>
      </div>
    </div>
  );
};
