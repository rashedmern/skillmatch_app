import React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/navigation";
export type { NavItem } from "@/types/landing";
export { NAV_ITEMS };

interface NavLinksProps {
  className?: string;
  mobile?: boolean;
  variant?: "dark" | "capsule";
  onLinkClick?: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  className = "",
  mobile = false,
  variant = "dark",
  onLinkClick,
}) => {
  if (mobile) {
    return (
      <nav className={`flex flex-col gap-1.5 ${className}`} aria-label="Mobile Navigation">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onLinkClick}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[15px] font-medium text-white/90 hover:text-white hover:bg-white/10 transition-colors"
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#D4F85A]/20 text-[#D4F85A]">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );
  }

  const isCapsule = variant === "capsule";

  return (
    <nav className={`flex items-center gap-1 sm:gap-2 ${className}`} aria-label="Main Navigation">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`relative px-3 py-1.5 rounded-full transition-all duration-500 ${
            isCapsule
              ? "text-zinc-700 hover:text-black hover:bg-zinc-100 text-xs sm:text-sm font-semibold"
              : "text-white/85 hover:text-white hover:bg-white/10 text-xs sm:text-sm font-medium"
          }`}
        >
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
};
