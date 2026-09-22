"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  ShieldCheck,
  Code2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  GitBranch,
} from "lucide-react";

// Crisp inline GitHub SVG
const GithubSvg: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

interface StepProgress {
  id: number;
  label: string;
  detail: string;
  status: "pending" | "active" | "completed";
}

function GithubCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "candidate";
  const ghHandle = searchParams.get("gh") || "alexchen-dev";
  const targetEmail = searchParams.get("email") || "alex.chen@berkeley.edu";

  const [steps, setSteps] = useState<StepProgress[]>([
    {
      id: 1,
      label: "OAuth Token Exchange",
      detail: "Exchanging cryptographic authorization code with GitHub API...",
      status: "active",
    },
    {
      id: 2,
      label: "Developer Identity Verification",
      detail: `Fetching public commit history & repos for @${ghHandle}...`,
      status: "pending",
    },
    {
      id: 3,
      label: "AST Handshake Permission",
      detail: "Connecting read-only syntax parser with zero code retention...",
      status: "pending",
    },
    {
      id: 4,
      label: "Generating Two-Factor Challenge",
      detail: `Dispatching verification token to ${targetEmail}...`,
      status: "pending",
    },
  ]);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    // Step progression simulation
    const timer1 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) =>
          s.id === 1 ? { ...s, status: "completed" } : s.id === 2 ? { ...s, status: "active" } : s
        )
      );
    }, 600);

    const timer2 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) =>
          s.id <= 2 ? { ...s, status: "completed" } : s.id === 3 ? { ...s, status: "active" } : s
        )
      );
    }, 1200);

    const timer3 = setTimeout(() => {
      setSteps((prev) =>
        prev.map((s) =>
          s.id <= 3 ? { ...s, status: "completed" } : s.id === 4 ? { ...s, status: "active" } : s
        )
      );
    }, 1800);

    const timer4 = setTimeout(() => {
      setSteps((prev) => prev.map((s) => ({ ...s, status: "completed" })));
      setIsCompleted(true);
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [ghHandle, targetEmail]);

  const handleContinue = () => {
    router.push(
      `/auth/verify-otp?email=${encodeURIComponent(targetEmail)}&role=${role}&gh=${encodeURIComponent(ghHandle)}&provider=github`
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-white border border-stroke-card shadow-level-2 overflow-hidden">
      {/* GitHub Top Banner */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
        <div className="flex items-center gap-2.5">
          <GithubSvg className="w-5 h-5 text-white" />
          <span className="text-sm font-bold">GitHub Developer Handshake</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[11px] font-semibold text-secondary-container">
          <StatusDot size="sm" />
          <span>OAuth 2.0 State Verified</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Profile Card Header */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-sm">
              AC
            </div>
            <div>
              <div className="text-xs font-bold text-on-surface flex items-center gap-1.5">
                <span>@{ghHandle}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-secondary/15 text-secondary-mint font-mono font-bold">
                  Verified
                </span>
              </div>
              <div className="text-[11px] text-outline flex items-center gap-2 mt-0.5">
                <span className="flex items-center gap-1">
                  <GitBranch className="w-3 h-3" />
                  18 Repositories
                </span>
                <span>•</span>
                <span>EECS Student</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] font-mono font-bold text-secondary-mint">AST Ready</div>
            <div className="text-[10px] text-outline">Read-only Scope</div>
          </div>
        </div>

        {/* Real-time Handshake Pipeline Steps */}
        <div className="space-y-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`p-3 rounded-xl border transition-all ${
                step.status === "completed"
                  ? "border-secondary-mint/30 bg-secondary/5"
                  : step.status === "active"
                  ? "border-primary/40 bg-surface-container-low shadow-sm"
                  : "border-slate-100 bg-surface-container-lowest opacity-50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
                  {step.status === "completed" ? (
                    <CheckCircle2 className="w-4 h-4 text-secondary-mint" />
                  ) : step.status === "active" ? (
                    <RefreshCw className="w-4 h-4 text-primary animate-spin" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
                  )}
                  <span>{step.label}</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-outline">
                  {step.status}
                </span>
              </div>
              <p className="text-[11px] text-on-surface-variant pl-6 mt-0.5">{step.detail}</p>
            </div>
          ))}
        </div>

        {/* Completion Action */}
        <div className="pt-2">
          <button
            type="button"
            disabled={!isCompleted}
            onClick={handleContinue}
            className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-sm font-bold shadow-sm transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <span>Proceed to Two-Factor Verification</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between text-[11px] text-outline pt-2 border-t border-slate-100">
          <div className="flex items-center gap-1.5">
            <Code2 className="w-3.5 h-3.5" />
            <span>Zero code retention policy guaranteed</span>
          </div>
          <Link href="/login" className="hover:text-on-surface transition-colors">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GithubCallbackPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Header */}
      <header className="w-full border-b border-stroke-card bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors group"
          >
            <ShieldCheck className="w-4 h-4 text-secondary-mint" />
            <span>SkillMatch Auth Gateway</span>
          </Link>
          <BrandLogo size="sm" />
        </div>
      </header>

      {/* Main Container with Suspense */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Suspense fallback={<div className="text-sm text-outline">Processing GitHub OAuth handshake...</div>}>
          <GithubCallbackContent />
        </Suspense>
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
