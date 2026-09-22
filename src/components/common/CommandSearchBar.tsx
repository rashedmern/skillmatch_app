"use client";

import React, { useEffect, useRef, useState } from "react";

interface CommandSearchBarProps {
  className?: string;
  placeholder?: string;
  onSearchClick?: () => void;
}

export const CommandSearchBar: React.FC<CommandSearchBarProps> = ({
  className = "",
  placeholder = "Search roles, skills...",
  onSearchClick,
}) => {
  const [isMac, setIsMac] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Detect OS for shortcut display
    if (typeof window !== "undefined") {
      setIsMac(/(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent));
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        onSearchClick?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchClick]);

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`group relative flex items-center h-9 w-full max-w-[260px] lg:max-w-[280px] rounded-full bg-surface-container-low border border-stroke-card hover:border-stroke-hover focus-within:border-secondary-mint focus-within:bg-surface-container-lowest focus-within:ring-2 focus-within:ring-secondary/20 transition-all duration-200 cursor-text shadow-sm ${className}`}
    >
      {/* Search Icon */}
      <span className="pl-3 pr-2 text-outline group-hover:text-on-surface-variant group-focus-within:text-secondary-mint transition-colors">
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>

      {/* Input Field */}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        aria-label="Search roles and skills"
        className="w-full h-full bg-transparent text-sm text-on-surface placeholder:text-outline/70 focus:outline-none pr-12 font-sans"
      />

      {/* Keyboard Shortcut Kbd Badge */}
      <div className="absolute right-2 flex items-center pointer-events-none">
        <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[11px] font-semibold text-outline-variant bg-surface-container-lowest border border-outline-variant/30 rounded shadow-[0_1px_1px_rgba(0,0,0,0.05)] select-none group-focus-within:border-secondary-mint/40 group-focus-within:text-secondary-mint">
          {isMac ? "⌘" : "Ctrl"} K
        </kbd>
      </div>
    </div>
  );
};
