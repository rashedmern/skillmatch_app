"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { NavLinks } from "./NavLinks";
import { CommandSearchBar } from "@/components/common/CommandSearchBar";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* 1. Top System Telemetry & Liveness Status Ribbon */}
      <div className="w-full bg-surface-container-low border-b border-stroke-card/60 py-1.5 px-4 text-xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Pulsing Live Mint Dot */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-mint opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-mint" />
            </span>
            <span className="font-sans font-medium text-on-surface-variant">
              Live CSE Matching Engine v2.4
            </span>
            <span className="hidden sm:inline text-outline/40">•</span>
            <span className="hidden sm:inline text-outline font-medium">
              98.4% AST Parse Accuracy
            </span>
          </div>

          <div className="flex items-center gap-3 text-outline">
            <span className="hidden md:inline font-mono text-[11px] tabular-nums">
              ABET / Institutional Directory Aligned
            </span>
          </div>
        </div>
      </div>

      {/* 2. Global Sticky Navigation Container */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "bg-surface-container-lowest/90 backdrop-blur-md shadow-level-1 border-b border-stroke-card"
            : "bg-surface-container-lowest border-b border-stroke-card/80"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <BrandLogo size="md" />

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center">
              <NavLinks />
            </div>
          </div>

          {/* Center-Right: Command Search Bar */}
          <div className="hidden lg:flex items-center justify-end flex-1 max-w-[280px]">
            <CommandSearchBar />
          </div>

          {/* Right: Actions & Conversion CTAs */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Log In Ghost Button */}
            <Link
              href="#login"
              className="px-3.5 py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:text-primary-container hover:bg-primary/5 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            >
              Log In
            </Link>

            {/* Primary CTA: Get Started Free */}
            <Link
              href="#signup"
              className="group inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white bg-primary-container hover:bg-primary-hover active:scale-[0.98] border border-[#07454e] shadow-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2"
            >
              <span>Get Started Free</span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-150"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* 3. Mobile Navigation Slide-Over Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-stroke-card bg-surface-container-lowest px-4 py-4 space-y-4 shadow-level-2 animate-in slide-in-from-top-2 duration-200">
            {/* Mobile Search Bar */}
            <div className="w-full">
              <CommandSearchBar className="max-w-full" placeholder="Search roles, verified skills..." />
            </div>

            {/* Mobile Links */}
            <NavLinks mobile onLinkClick={() => setIsMobileMenuOpen(false)} />

            {/* Mobile Conversion Buttons */}
            <div className="pt-2 border-t border-stroke-card flex flex-col gap-2">
              <Link
                href="#signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold text-white bg-primary-container hover:bg-primary-hover shadow-sm transition-colors"
              >
                <span>Get Started Free</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="#login"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center py-2 rounded-lg text-sm font-semibold text-on-surface-variant hover:bg-surface-container-low transition-colors"
              >
                Log In to Candidate Portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
