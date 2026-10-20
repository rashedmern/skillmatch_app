import React from "react";
import Link from "next/link";
import { ArrowRight, Star, CheckCircle, Sparkles, Building2, GraduationCap } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";

export const HeroContent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center space-y-6 sm:space-y-7 lg:space-y-8 pt-2 sm:pt-4 lg:pt-6">
      {/* 1. Eyebrow Pill */}
      <div className="inline-flex items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/10 border border-secondary/25 text-xs font-semibold text-primary-container shadow-sm">
          <StatusDot size="sm" />
          <span className="font-bold tracking-tight">The #1 Verified Tech Career Network</span>
          <span className="text-secondary/40">•</span>
          <span className="text-secondary-mint font-semibold">Live for CSE '25 - '27</span>
        </div>
      </div>

      {/* 2. Editorial Headline */}
      <div className="space-y-3.5 sm:space-y-4">
        <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] leading-[1.12] text-on-surface font-sans">
          Where tech talent gets hired, and employers hire the{" "}
          <span className="relative inline-block text-primary-container">
            future.
            <span className="absolute -bottom-1.5 left-0 right-0 h-2 bg-secondary-mint/20 rounded-full -z-10" />
          </span>
        </h1>

        {/* 3. High-Value Subtitle */}
        <p className="text-base sm:text-lg text-on-surface-variant font-normal leading-relaxed max-w-xl font-sans">
          Skip resume black holes. Connect directly with hiring managers who want
          your verified code, system architecture, and real projects—matched on
          what you can actually build, not keywords.
        </p>
      </div>

      {/* 4. Dual Call-to-Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 pt-1">
        {/* Primary CTA: Candidates */}
        <Link
          href="/register"
          className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-base font-bold text-white bg-primary-container hover:bg-primary-hover active:scale-[0.98] shadow-md hover:shadow-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-secondary/30"
        >
          <GraduationCap className="w-5 h-5" />
          <span>Get Hired (For Candidates)</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-150" />
        </Link>

        {/* Secondary CTA: Employers */}
        <Link
          href="/register?role=recruiter"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full text-base font-bold text-on-surface bg-surface-container-lowest hover:bg-surface-container-low border border-stroke-card hover:border-stroke-hover active:scale-[0.98] shadow-sm hover:shadow transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <Building2 className="w-4 h-4 text-outline" />
          <span>Hire Early Talent</span>
        </Link>
      </div>

      {/* 5. Social Proof & Rating Bar */}
      <div className="pt-2 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-on-surface-variant">
        <div className="flex items-center gap-1 text-amber-500">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
          <span className="ml-1 font-bold text-on-surface text-sm">4.9 / 5</span>
        </div>
        <span className="hidden sm:inline text-outline/30">•</span>
        <span className="font-medium">
          Trusted by <strong className="text-on-surface font-bold">12,000+</strong> engineering students &amp; <strong className="text-on-surface font-bold">500+</strong> tech companies
        </span>
      </div>

      {/* 6. Key Value Bullets */}
      <div className="pt-4 border-t border-stroke-card/70 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-outline">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary-mint" />
          <span>No experience required</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary-mint" />
          <span>Direct recruiter inbound</span>
        </div>
        <div className="flex items-center gap-1.5">
          <CheckCircle className="w-4 h-4 text-secondary-mint" />
          <span>100% Free for students</span>
        </div>
      </div>
    </div>
  );
};
