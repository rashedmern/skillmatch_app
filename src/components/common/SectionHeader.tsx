import React from "react";

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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/25 text-xs font-semibold text-primary-container shadow-sm">
          {badgeDot && (
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-mint" />
            </span>
          )}
          <span className="tracking-wide">{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight font-sans leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-on-surface-variant font-normal max-w-2xl font-sans leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
