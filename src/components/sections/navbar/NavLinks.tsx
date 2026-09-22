import React from "react";
import Link from "next/link";
import { NAV_ITEMS } from "@/data/navigation";
export type { NavItem } from "@/types/landing";
export { NAV_ITEMS };

interface NavLinksProps {
  className?: string;
  mobile?: boolean;
  onLinkClick?: () => void;
}

export const NavLinks: React.FC<NavLinksProps> = ({
  className = "",
  mobile = false,
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
            className="flex items-center justify-between px-3.5 py-2.5 rounded-lg text-[15px] font-medium text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low transition-colors active:bg-surface-container"
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-secondary/10 text-secondary-mint">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>
    );
  }

  return (
    <nav className={`flex items-center gap-1 lg:gap-2 ${className}`} aria-label="Main Navigation">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="relative px-3 py-1.5 rounded-lg text-sm font-medium text-on-surface-variant hover:text-primary-container hover:bg-primary/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-1 group"
        >
          <span>{item.label}</span>
          {/* Subtle bottom micro-indicator on hover */}
          <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-secondary-mint scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full" />
        </Link>
      ))}
    </nav>
  );
};
