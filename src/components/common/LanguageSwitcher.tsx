"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  variant?: "pill" | "compact" | "minimal";
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = "pill",
  className = "",
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === "compact") {
    return (
      <div
        role="group"
        aria-label="Language selection / ভাষা নির্বাচন"
        className={`inline-flex items-center rounded-lg bg-surface-container border border-slate-200 p-0.5 text-xs font-bold ${className}`}
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          aria-label={language === "en" ? "English (current language)" : "Switch to English"}
          className={`px-2 py-1 rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint focus-visible:ring-offset-1 ${
            language === "en"
              ? "bg-white text-primary-container shadow-xs font-black"
              : "text-slate-600 hover:text-on-surface hover:bg-white/50"
          }`}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("bn")}
          aria-pressed={language === "bn"}
          aria-label={language === "bn" ? "বাংলা (বর্তমান ভাষা)" : "বাংলা ভাষায় পরিবর্তন করুন"}
          className={`px-2 py-1 rounded-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint focus-visible:ring-offset-1 ${
            language === "bn"
              ? "bg-primary-container text-white shadow-xs font-black"
              : "text-slate-600 hover:text-on-surface hover:bg-white/50"
          }`}
        >
          বাংলা
        </button>
      </div>
    );
  }

  // Default "pill" variant with globe icon and Oceanic Intelligence aesthetics
  return (
    <div
      role="group"
      aria-label="Language selection / ভাষা নির্বাচন"
      className={`inline-flex items-center gap-1 px-1.5 py-1 rounded-xl bg-surface-container-low border border-slate-200 hover:border-secondary-mint/50 transition-all shadow-xs ${className}`}
    >
      <Globe className="w-3.5 h-3.5 text-secondary-mint shrink-0 ml-1" aria-hidden="true" />
      <div className="flex items-center gap-0.5 text-[11px] font-bold">
        <button
          type="button"
          onClick={() => setLanguage("en")}
          aria-pressed={language === "en"}
          aria-label={language === "en" ? "English (active)" : "Switch to English"}
          className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint focus-visible:ring-offset-1 ${
            language === "en"
              ? "bg-primary-container text-white shadow-xs font-black"
              : "text-slate-600 hover:text-on-surface hover:bg-white"
          }`}
        >
          EN
        </button>
        <span className="text-slate-300 text-[10px] select-none" aria-hidden="true">|</span>
        <button
          type="button"
          onClick={() => setLanguage("bn")}
          aria-pressed={language === "bn"}
          aria-label={language === "bn" ? "বাংলা (সক্রিয়)" : "বাংলা ভাষায় পরিবর্তন করুন"}
          className={`px-2 py-0.5 rounded-lg transition-all cursor-pointer font-sans focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint focus-visible:ring-offset-1 ${
            language === "bn"
              ? "bg-secondary-mint text-white shadow-xs font-black"
              : "text-slate-600 hover:text-on-surface hover:bg-white"
          }`}
        >
          বাংলা
        </button>
      </div>
    </div>
  );
};

