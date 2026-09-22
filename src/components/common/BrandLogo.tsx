import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  iconOnly = false,
  size = "md",
}) => {
  // Dimensional scaling based on design tokens
  const dimensions = {
    sm: { icon: "w-8 h-8", text: "text-lg", badge: "text-[10px] px-1.5 py-0.5" },
    md: { icon: "w-9 h-9", text: "text-xl", badge: "text-xs px-2 py-0.5" },
    lg: { icon: "w-11 h-11", text: "text-2xl", badge: "text-xs px-2.5 py-1" },
  }[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 select-none group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 rounded-lg transition-transform active:scale-[0.98] ${className}`}
      aria-label="SkillMatch Home"
    >
      {/* AST Squircle Hub Icon */}
      <div
        className={`relative flex-shrink-0 transition-transform group-hover:scale-105 duration-200 ${dimensions.icon}`}
      >
        <svg
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Outer Squircle Container */}
          <rect
            x="2"
            y="2"
            width="52"
            height="52"
            rx="14"
            fill="#095964"
          />
          <rect
            x="2"
            y="2"
            width="52"
            height="52"
            rx="14"
            stroke="rgba(255, 255, 255, 0.2)"
            strokeWidth="1.5"
          />

          {/* Interconnected CSE Skill Network Graph */}
          <g transform="translate(14, 14)">
            {/* Edges */}
            <line
              x1="14"
              y1="14"
              x2="14"
              y2="4"
              stroke="#00d4be"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="14"
              x2="23.5"
              y2="10"
              stroke="#67e8f9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="14"
              x2="20"
              y2="23"
              stroke="#a5f3fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="14"
              x2="8"
              y2="23"
              stroke="#a5f3fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="14"
              x2="4.5"
              y2="10"
              stroke="#67e8f9"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Peripheral Nodes (AST Leaves) */}
            <circle cx="14" cy="4" r="3.2" fill="#ffffff" />
            <circle cx="23.5" cy="10" r="3.2" fill="#00d4be" />
            <circle cx="20" cy="23" r="3.2" fill="#67e8f9" />
            <circle cx="8" cy="23" r="3.2" fill="#67e8f9" />
            <circle cx="4.5" cy="10" r="3.2" fill="#00d4be" />

            {/* Central Hub Node */}
            <circle
              cx="14"
              cy="14"
              r="4.8"
              fill="#ffffff"
              stroke="#095964"
              strokeWidth="1.5"
            />
            <circle cx="14" cy="14" r="2.2" fill="#095964" />
          </g>
        </svg>
      </div>

      {!iconOnly && (
        <div className="flex items-center gap-2">
          {/* Typography Wordmark in Arimo */}
          <span
            className={`font-sans tracking-tight font-extrabold text-primary-container ${dimensions.text}`}
          >
            Skill<span className="font-bold text-secondary-mint">Match</span>
          </span>

          {/* Department / Ecosystem Badge Pill */}
          <span
            className={`inline-flex items-center justify-center font-bold tracking-wider rounded-md bg-[#e0f2fe] border border-[#bae6fd] text-[#0369a1] ${dimensions.badge}`}
          >
            CSE
          </span>
        </div>
      )}
    </Link>
  );
};
