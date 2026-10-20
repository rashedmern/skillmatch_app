"use client";

import React, { useState, useEffect } from "react";
import { Search, ArrowUp } from "lucide-react";
import { motion } from "framer-motion";

const FILTER_PILLS = [
  "AI & ML Interns",
  "Software Engineering",
  "Distributed Systems",
  "Remote Internships",
];

const SEARCH_PLACEHOLDERS = [
  "Backend Engineering intern in Go",
  "Distributed Systems intern in Go",
  "Full-Stack React & Node.js intern",
  "Machine Learning & PyTorch intern",
];

export const HeroSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [placeholderIdx, setPlaceholderIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect mimicking Handshake's animated placeholder
  useEffect(() => {
    const currentTarget = SEARCH_PLACEHOLDERS[placeholderIdx];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayedText.length < currentTarget.length) {
          setDisplayedText(currentTarget.slice(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentTarget.slice(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setPlaceholderIdx((prev) => (prev + 1) % SEARCH_PLACEHOLDERS.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, placeholderIdx]);

  return (
    <section className="relative w-full min-h-[92vh] flex flex-col justify-center items-center overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32 px-4 sm:px-6 lg:px-8 text-center select-none">
      {/* 
        RICH DARK GREEN GRADIENT BACKDROP:
        Deep obsidian/forest base (#051C19) with glowing radial layers:
        - Deep Pine Teal (#095964)
        - Rich Forest Emerald (#0D3E35)
        - Cyber Mint / Green Glow (#00D4BE)
      */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden bg-[#051C19]">
        {/* Layer 1: Massive ambient dark green radial background */}
        <div
          className="absolute inset-0 opacity-95"
          style={{
            background:
              "radial-gradient(ellipse 95% 85% at 50% 38%, #0E423A 0%, #082923 55%, #051C19 100%)",
          }}
        />

        {/* Layer 2: Organic glowing green energy pools with deep blur */}
        <div className="absolute inset-0 transform-gpu blur-[100px] opacity-75">
          {/* Center glowing green core illuminating the headline */}
          <div
            className="absolute rounded-full"
            style={{
              width: "55%",
              height: "48%",
              left: "22%",
              top: "16%",
              background:
                "radial-gradient(circle at center, rgba(0, 212, 190, 0.45) 0%, rgba(9, 89, 100, 0.55) 50%, transparent 75%)",
            }}
          />
          {/* Top-left deep forest ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: "45%",
              height: "40%",
              left: "0%",
              top: "0%",
              background:
                "radial-gradient(circle at center, rgba(13, 62, 53, 0.6) 0%, transparent 70%)",
            }}
          />
          {/* Bottom-right cyber teal ambient glow */}
          <div
            className="absolute rounded-full"
            style={{
              width: "50%",
              height: "45%",
              right: "5%",
              bottom: "10%",
              background:
                "radial-gradient(circle at center, rgba(9, 89, 100, 0.45) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Layer 3: Subtle dark vignette overlay to keep text ultra sharp */}
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 110% 100% at 50% 40%, transparent 40%, #051C19 95%)",
          }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        {/* 
          HANDSHAKE EXACT ULTRA-TALL CONDENSED HEADLINE:
          "LET'S FIND
           YOUR NEXT INTERN"
          Using ultra-condensed font style with tight leading & tracking
        */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-3 sm:space-y-4"
        >
          <h1 className="font-[family-name:var(--font-bebas)] text-[80px] xs:text-[96px] sm:text-[130px] md:text-[160px] lg:text-[180px] font-normal tracking-[-2px] sm:tracking-[-4px] uppercase leading-[0.84] text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <span className="block">Let&apos;s Find</span>
            <span className="block text-white">Your Next Intern</span>
          </h1>

          {/* SkillMatch Subtitle */}
          <p className="text-sm xs:text-base sm:text-lg md:text-xl text-white/90 font-medium max-w-2xl mx-auto pt-2 leading-relaxed">
            Connecting computer science students directly with engineering teams ready to hire verified interns.
          </p>
        </motion.div>

        {/* 
          HANDSHAKE EXACT GIANT WHITE CAPSULE SEARCH BAR:
          A pure white rounded pill with left search icon, typewriter text, and top-right arrow button
        */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[760px] mx-auto mt-8 sm:mt-10"
        >
          <form
            data-handshake-search
            onSubmit={(e) => {
              e.preventDefault();
              if (searchTerm.trim()) {
                window.location.href = "#tracks";
              }
            }}
            className="relative flex items-center w-full h-16 sm:h-20 bg-white rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.35)] px-5 sm:px-7 border-0 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none transition-all"
            style={{ outline: "none" }}
          >
            {/* Search Icon */}
            <Search className="w-6 h-6 text-[#14151C] shrink-0 mr-3.5 sm:mr-4 transition-colors" />

            {/* Input with Typewriter Animated Placeholder */}
            <div className="relative flex-1 h-full flex items-center overflow-hidden">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-black text-base sm:text-lg font-medium border-0 ring-0 outline-none focus:outline-none focus:ring-0 focus:border-0 focus-visible:outline-none focus-visible:ring-0 z-10 [outline:none!important] [box-shadow:none!important]"
                style={{ outline: "none", boxShadow: "none" }}
              />

              {!searchTerm && (
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none text-zinc-400 text-base sm:text-lg font-medium truncate">
                  <span>{displayedText}</span>
                  <span className="w-0.5 h-5 bg-zinc-400 ml-0.5 animate-pulse" />
                </div>
              )}
            </div>

            {/* Submit Arrow Button (Handshake Circular Arrow with User Green Accent) */}
            <button
              type="submit"
              aria-label="Submit search"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#EBEBEB] hover:bg-[#00D4BE] text-zinc-600 hover:text-black flex items-center justify-center shrink-0 transition-all active:scale-95 cursor-pointer shadow-sm ml-2 border-0 outline-none focus:outline-none focus-visible:outline-none"
              style={{ outline: "none" }}
            >
              <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </form>
        </motion.div>

        {/* 
          HANDSHAKE EXACT 4 FILTER PILLS BELOW SEARCH BAR:
          Translucent pills with user green hover border & text
        */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-6 sm:mt-8"
        >
          {FILTER_PILLS.map((pill) => (
            <button
              key={pill}
              type="button"
              onClick={() => setSearchTerm(pill)}
              className="px-4 py-2 sm:px-4.5 sm:py-2.5 rounded-lg bg-black/25 hover:bg-black/40 border border-white/20 hover:border-[#00D4BE] text-xs sm:text-sm font-medium text-white hover:text-[#00D4BE] backdrop-blur-md transition-all duration-150 cursor-pointer shadow-sm active:scale-95"
            >
              {pill}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
