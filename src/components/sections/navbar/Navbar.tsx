"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
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

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on resize to desktop (768px+)
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
    <header
      style={{ position: "sticky", top: 0 }}
      className="sticky top-0 z-50 w-full transition-all duration-200"
    >
      {/* Global Sticky Navigation Bar */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled || isMobileMenuOpen
            ? "bg-surface-container-lowest/90 backdrop-blur-md shadow-level-1 border-b border-stroke-card"
            : "bg-surface-container-lowest border-b border-stroke-card/80"
        }`}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[64px] md:h-[72px] flex items-center justify-between gap-4">
          {/* Left: Brand Logo & Desktop Navigation */}
          <div className="flex items-center gap-6 lg:gap-8">
            <BrandLogo size="md" />

            {/* Desktop Navigation Links (Hidden on Mobile) */}
            <div className="hidden md:flex items-center">
              <NavLinks />
            </div>
          </div>

          {/* Center-Right: Command Search Bar (Hidden on Mobile & Tablet, visible on Desktop) */}
          <div className="hidden lg:flex items-center justify-end flex-1 max-w-[280px]">
            <CommandSearchBar />
          </div>

          {/* Right: Actions & Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Desktop Conversion Actions (Strictly Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-2.5 lg:gap-3">
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
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 duration-150" />
              </Link>
            </div>

            {/* Mobile Menu Hamburger Button (Strictly Visible Only on Mobile) */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex md:hidden items-center justify-center w-10 h-10 rounded-lg border border-stroke-card bg-surface-container-low text-on-surface hover:text-primary-container hover:bg-surface-container transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-on-surface" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5 text-on-surface" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Animated Mobile Navigation Drawer (Framer Motion) */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden border-t border-stroke-card bg-surface-container-lowest/95 backdrop-blur-xl shadow-level-2"
            >
              <div className="px-4 pt-4 pb-6 space-y-4 max-w-[1440px] mx-auto">
                {/* 1. Mobile Search Bar */}
                <div className="w-full">
                  <CommandSearchBar
                    className="max-w-full w-full"
                    placeholder="Search roles, verified skills..."
                  />
                </div>

                {/* 2. Mobile Navigation Links */}
                <div className="py-1">
                  <NavLinks mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
                </div>

                {/* 3. Mobile Action Buttons */}
                <div className="pt-3 border-t border-stroke-card flex flex-col gap-2.5">
                  <Link
                    href="#signup"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-semibold text-white bg-primary-container hover:bg-primary-hover active:scale-[0.98] border border-[#07454e] shadow-sm transition-all"
                  >
                    <span>Get Started Free</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="#login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-lg text-sm font-semibold text-on-surface-variant hover:text-primary-container hover:bg-surface-container-low active:bg-surface-container transition-colors"
                  >
                    Log In
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
