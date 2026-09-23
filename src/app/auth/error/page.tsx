"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  ShieldAlert,
  ArrowLeft,
  Mail,
  Building2,
  GraduationCap,
  HelpCircle,
  AlertTriangle,
} from "lucide-react";

function AuthErrorContent() {
  const searchParams = useSearchParams();
  const rawError = searchParams.get("error") || "InvalidDomain";
  const attemptedEmail = searchParams.get("email") || "";
  const role = searchParams.get("role") || "CANDIDATE";

  const isInvalidDomain =
    rawError.toLowerCase() === "invaliddomain" ||
    rawError.toLowerCase() === "invalid_domain" ||
    rawError.toLowerCase() === "accessdenied";

  const handleRetryGoogle = () => {
    const roleName = role.toUpperCase() === "RECRUITER" ? "RECRUITER" : "CANDIDATE";
    const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
    document.cookie = `skillmatch_auth_role=${roleName}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    if (isSecure) {
      document.cookie = `__Secure-skillmatch_auth_role=${roleName}; path=/; max-age=2592000; SameSite=Lax; Secure`;
    }
    signIn("google", { callbackUrl: `/dashboard?role=${roleName}` });
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-2xl bg-white border border-stroke-card shadow-level-2 overflow-hidden">
      {/* Top Banner Accent */}
      <div className="h-2 w-full bg-gradient-to-r from-accent-gap via-amber-500 to-accent-gap" />

      <div className="p-6 sm:p-10 space-y-6">
        {/* Security Warning Icon */}
        <div className="w-14 h-14 rounded-2xl bg-accent-gap/10 border border-accent-gap/20 flex items-center justify-center text-accent-gap mx-auto sm:mx-0">
          {isInvalidDomain ? (
            <ShieldAlert className="w-7 h-7 animate-pulse" />
          ) : (
            <AlertTriangle className="w-7 h-7" />
          )}
        </div>

        {/* Headline */}
        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent-gap/10 text-accent-gap text-xs font-bold uppercase tracking-wider">
            <span>Security Policy Restriction</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
            {isInvalidDomain
              ? "Institutional .edu Email Required"
              : "Authentication Access Restricted"}
          </h1>

          <p className="text-sm text-on-surface-variant leading-relaxed">
            {isInvalidDomain ? (
              <>
                Candidate accounts require a verified university institutional email address.
                Personal domains such as <span className="font-mono text-on-surface font-semibold">@gmail.com</span>,{" "}
                <span className="font-mono text-on-surface font-semibold">@yahoo.com</span>, or{" "}
                <span className="font-mono text-on-surface font-semibold">@outlook.com</span> are strictly not permitted for student profiles.
              </>
            ) : (
              "We were unable to complete your authorization request due to security credentials mismatch."
            )}
          </p>
        </div>

        {/* Attempted Identity Telemetry Pill */}
        {attemptedEmail && (
          <div className="p-3 rounded-xl bg-surface-container-low border border-slate-200 flex items-center justify-between text-xs">
            <span className="text-outline font-medium">Attempted Address:</span>
            <span className="font-mono font-bold text-accent-gap line-through">
              {attemptedEmail}
            </span>
          </div>
        )}

        {/* Why this policy exists card */}
        <div className="p-4 rounded-xl bg-surface border border-stroke-card space-y-2.5 text-xs text-on-surface-variant">
          <div className="flex items-center gap-2 font-bold text-on-surface">
            <GraduationCap className="w-4 h-4 text-secondary-mint" />
            <span>Why Institutional Email Verification is Mandatory:</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-[11px] leading-relaxed">
            <li>Guarantees direct access to technical recruiters without standard resume ATS keyword drops.</li>
            <li>Benchmarks your code syntax against ABET accredited computer science curricula.</li>
            <li>Protects student engineering profiles from automated scraping and spam bots.</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleRetryGoogle}
            id="retry-google-btn"
            className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-sm font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Select Different Google Account (.edu)</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href="/register?role=recruiter"
              className="h-10 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-all"
            >
              <Building2 className="w-4 h-4 text-outline" />
              <span>Register as Recruiter</span>
            </Link>

            <Link
              href="/login"
              className="h-10 inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-all"
            >
              <Mail className="w-4 h-4 text-outline" />
              <span>Back to Login</span>
            </Link>
          </div>
        </div>

        {/* Support Footer */}
        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-outline">
          <div className="flex items-center gap-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Is your university domain missing?</span>
          </div>
          <a
            href="mailto:admissions-support@skillmatch.io"
            className="text-secondary-mint hover:underline font-semibold"
          >
            Request Whitelisting
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Bar */}
      <header className="w-full border-b border-stroke-card bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Login</span>
          </Link>
          <BrandLogo size="sm" />
        </div>
      </header>

      {/* Main Container with Suspense Boundary */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Suspense fallback={<div className="text-sm text-outline">Loading security details...</div>}>
          <AuthErrorContent />
        </Suspense>
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. Institutional Security Enforcement Gateway.
      </footer>
    </div>
  );
}
