"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { NavLinks } from "./NavLinks";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Condenses into the floating capsule as soon as user begins scrolling down
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
    <>
      {/* 1. FIXED WRAPPER - Always positioned at top, centers the morphing navbar */}
      <div className="fixed top-0 inset-x-0 z-50 flex justify-center pointer-events-none pt-3 sm:pt-4 px-3 sm:px-6">
        {/* 
          HANDSHAKE UNIFIED MORPHING NAVBAR:
          - Starts full width (max-w-[1380px]), transparent background, white text.
          - On scroll: smoothly contracts to max-w-[980px], morphs into white capsule with shadow.
          - As the width contracts, the logo glides smoothly from the left edge toward the center,
            and buttons glide smoothly from the right edge toward the center.
        */}
        <motion.header
          layout
          initial={false}
          animate={{
            maxWidth: isScrolled ? "980px" : "1380px",
            backgroundColor: isScrolled
              ? "rgba(255, 255, 255, 0.96)"
              : "rgba(255, 255, 255, 0)",
            boxShadow: isScrolled
              ? "0 20px 45px -10px rgba(0, 0, 0, 0.28), 0 0 0 1px rgba(0, 0, 0, 0.08)"
              : "0 0 0 0 rgba(0, 0, 0, 0)",
            paddingLeft: isScrolled ? "1.5rem" : "1.75rem",
            paddingRight: isScrolled ? "1.25rem" : "1.75rem",
            paddingTop: isScrolled ? "0.6rem" : "0.75rem",
            paddingBottom: isScrolled ? "0.6rem" : "0.75rem",
          }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1], // Handshake fluid cubic-bezier
          }}
          className={`pointer-events-auto w-full rounded-full flex items-center justify-between gap-3 sm:gap-4 transition-[backdrop-filter] duration-500 ${
            isScrolled ? "backdrop-blur-xl" : "backdrop-blur-none"
          }`}
        >
          {/* LEFT: Logo glides smoothly toward the middle as container shrinks */}
          <motion.div layout="position" className="flex items-center shrink-0">
            <BrandLogo
              size="md"
              variant={isScrolled ? "capsule" : "dark"}
            />
          </motion.div>

          {/* CENTER: Navigation Links */}
          <motion.div layout="position" className="hidden md:flex items-center">
            <NavLinks variant={isScrolled ? "capsule" : "dark"} />
          </motion.div>

          {/* RIGHT: Buttons glide smoothly toward the middle as container shrinks */}
          <motion.div layout="position" className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
              {/* Outline 'Log in' button with smooth color transition */}
              <Link
                href="/login"
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-500 ${
                  isScrolled
                    ? "border border-zinc-300 text-zinc-800 hover:bg-zinc-100"
                    : "border border-white/40 text-white hover:bg-white/10"
                }`}
              >
                Log in
              </Link>

              {/* Filled User Green 'Sign up' button (#00D4BE) */}
              <Link
                href="/register"
                className="px-4 sm:px-5 py-1.5 rounded-full text-xs sm:text-sm font-bold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] active:scale-[0.98] shadow-sm hover:shadow-[0_0_15px_rgba(0,212,190,0.35)] transition-all duration-200"
              >
                <span>Sign up</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`flex md:hidden items-center justify-center w-9 h-9 rounded-full transition-all duration-500 ${
                isScrolled
                  ? "border border-zinc-300 bg-zinc-100 text-zinc-900"
                  : "border border-white/20 bg-white/10 text-white"
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </motion.div>
        </motion.header>
      </div>

      {/* Top Spacer so hero content is positioned seamlessly without jump */}
      <div className="h-[72px] sm:h-[80px] w-full shrink-0" aria-hidden="true" />

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-20 z-50 rounded-2xl bg-[#0e1713]/98 border border-white/15 p-5 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="space-y-4">
              <NavLinks mobile onLinkClick={() => setIsMobileMenuOpen(false)} />
              <div className="pt-3 border-t border-white/15 flex flex-col gap-2">
                <Link
                  href="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2.5 rounded-lg text-center text-sm font-bold text-black bg-[#D4F85A]"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full py-2 rounded-lg text-center text-sm font-medium text-white/80 border border-white/20"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
