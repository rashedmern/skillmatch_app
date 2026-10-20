"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const OPPORTUNITIES = [
  {
    title: "Backend Systems Intern",
    comp: "Up to $55/hr",
    education: "CS & Software Engineering • Class of '26 - '27",
    href: "#tracks",
  },
  {
    title: "AI & ML Systems Intern",
    comp: "Up to $65/hr",
    education: "Undergrad & Master's CS Students",
    href: "#tracks",
  },
  {
    title: "Full-Stack Web Intern",
    comp: "Up to $45/hr",
    education: "Computer Science • All Student Levels",
    href: "#tracks",
  },
  {
    title: "Cloud & DevOps Intern",
    comp: "Up to $50/hr",
    education: "CS, IT & Systems Engineering Students",
    href: "#tracks",
  },
  {
    title: "Database Systems Intern",
    comp: "Up to $55/hr",
    education: "PostgreSQL • Storage Internals • CS Students",
    href: "#tracks",
  },
  {
    title: "Cybersecurity & Systems Intern",
    comp: "Up to $60/hr",
    education: "Computer Science & Security Students",
    href: "#tracks",
  },
];

export const OpportunityCards: React.FC = () => {
  return (
    <section className="w-full py-16 sm:py-24 bg-[#14151C] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Get hired on real code, not broken resumes
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Showcase your actual programming ability, pass practical coding benchmarks, and connect with engineering teams ready to hire interns.
          </p>
        </div>

        {/* 6 Dark Cards Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {OPPORTUNITIES.map((opp) => (
            <Link
              key={opp.title}
              href={opp.href}
              className="group p-6 sm:p-7 rounded-2xl bg-[#121920] border border-white/10 hover:border-[#00D4BE]/50 hover:bg-[#0d1e1c] transition-all duration-200 flex flex-col justify-between min-h-[170px]"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-base sm:text-lg text-white group-hover:text-[#00D4BE] transition-colors leading-snug">
                    {opp.title}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-[#00D4BE] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1" />
                </div>
                <p className="text-sm text-zinc-400 mt-1 font-medium">{opp.comp}</p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5">
                <p className="text-xs text-zinc-400 font-normal">{opp.education}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Action Button using user green palette (#00D4BE) */}
        <div className="mt-12 text-center space-y-3">
          <Link
            href="#tracks"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm sm:text-base font-extrabold text-[#051C19] bg-[#00D4BE] hover:bg-[#00bda8] active:scale-[0.98] shadow-lg hover:shadow-[0_0_20px_rgba(0,212,190,0.4)] transition-all"
          >
            Explore all opportunities
          </Link>
          <div>
            <Link
              href="#how-it-works"
              className="text-xs sm:text-sm text-zinc-400 hover:text-[#00D4BE] transition-colors underline underline-offset-4"
            >
              How does code verification work?
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
