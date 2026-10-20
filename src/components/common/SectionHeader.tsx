import React from "react";
import { StatusDot } from "@/components/ui/StatusDot";

interface SectionHeaderProps {
  badge?: string;
  badgeDot?: boolean;
  title: React.ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  badgeDot = true,
  title,
  subtitle,
  align = "left",
  className = "",
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center mx-auto",
  }[align];

  return (
    <div className={`flex flex-col space-y-3 ${alignmentClasses} ${className}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-[#D4F85A] shadow-sm">
          {badgeDot && <span className="w-1.5 h-1.5 rounded-full bg-[#D4F85A] shadow-[0_0_6px_#D4F85A]" />}
          <span className="tracking-wide uppercase text-[11px]">{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-zinc-400 font-normal max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
