"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import {
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Lock,
  GitBranch,
  Terminal,
  Check,
  ExternalLink,
  Code2,
  Sparkles,
  Zap,
} from "lucide-react";

// Crisp inline GitHub Octocat SVG
const GithubSvg: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

function GithubAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "recruiter" ? "recruiter" : "candidate";

  // Flow states: "overview" (VIEW 1) -> "parsing" (VIEW 2) -> "success" (VIEW 3)
  const [viewState, setViewState] = useState<"overview" | "parsing" | "success">("overview");
  const [telemetryStage, setTelemetryStage] = useState(0);
  const [candidateHandle, setCandidateHandle] = useState("alexchen-dev");

  const telemetryLogs = [
    "Establishing secure TLS handshake with GitHub Enterprise GraphQL v4...",
    "Querying public repositories, commit histories & PR review contributions...",
    "Executing AST parser for Go, TypeScript, Python & Rust AST nodes...",
    "Calculating cyclomatic complexity & deterministic code hygiene metrics...",
    "Synthesizing high-confidence CSE vector skill embeddings...",
  ];

  // Simulated AST parse pipeline
  useEffect(() => {
    if (viewState === "parsing") {
      const interval = setInterval(() => {
        setTelemetryStage((prev) => {
          if (prev < telemetryLogs.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => setViewState("success"), 600);
            return prev;
          }
        });
      }, 700);

      return () => clearInterval(interval);
    }
  }, [viewState]);

  // Real GitHub OAuth Redirection
  const handleLaunchOfficialGithubOAuth = () => {
    const roleName = role === "recruiter" ? "RECRUITER" : "CANDIDATE";
    const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";
    document.cookie = `skillmatch_auth_role=${roleName}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
    if (isSecure) {
      document.cookie = `__Secure-skillmatch_auth_role=${roleName}; path=/; max-age=2592000; SameSite=Lax; Secure`;
    }
    signIn("github", { callbackUrl: `/dashboard?role=${roleName}` });
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Header */}
      <header className="w-full border-b border-stroke-card/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Login</span>
          </Link>

          <BrandLogo size="sm" />

          <div className="flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-secondary-mint" />
            <span className="hidden sm:inline font-mono">AST ZERO-CODE-RETENTION GUARANTEE</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col justify-center">
        {/* VIEW 1: GITHUB AUTHORIZATION VIEW */}
        {viewState === "overview" && (
          <div className="bg-white rounded-2xl border border-stroke-card shadow-card-elevation overflow-hidden">
            {/* Interconnect Header Graphic */}
            <div className="bg-gradient-to-r from-primary to-primary-container text-white px-6 sm:px-10 py-8 relative">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2.5 shadow-lg">
                    <img
                      src="/images/skillmatch-app-icon.svg"
                      alt="SkillMatch"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-secondary-mint/20 border border-secondary-mint/40 text-[10px] font-bold tracking-wider text-secondary-container uppercase">
                      Official OAuth Connector
                    </div>
                    <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      SkillMatch <span className="text-[#00d4be]">Handshake</span>
                    </h1>
                  </div>
                </div>

                {/* Animated Bridge */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-cyan-200">
                  <span>TLS 1.3</span>
                  <div className="w-8 h-[2px] bg-secondary-mint relative overflow-hidden">
                    <div className="w-2 h-full bg-white animate-pulse" />
                  </div>
                  <span>OAuth 2.0</span>
                </div>

                {/* GitHub Octocat Badge */}
                <div className="w-14 h-14 rounded-2xl bg-[#24292F] border border-white/20 flex items-center justify-center text-white shadow-lg">
                  <GithubSvg className="w-8 h-8" />
                </div>
              </div>
            </div>

            {/* Scope & Permissions Inspection Body */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="text-center sm:text-left space-y-1">
                <h2 className="text-xl font-bold text-primary-container">
                  Authorize SkillMatch Autonomous Verification
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Connecting as <span className="font-semibold text-primary capitalize">{role}</span>.
                  Inspect public repositories to generate deterministic AST skill scorecards.
                </p>
              </div>

              {/* Scope Checklist Box */}
              <div className="rounded-xl border border-stroke-card bg-surface-lowest p-5 sm:p-6 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-secondary-mint" />
                  <span>Requested Security Permissions (Read-Only)</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stroke-card/60">
                    <CheckCircle2 className="w-4 h-4 text-secondary-mint flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-primary">Public Code Repository Tree</div>
                      <div className="text-[11px] text-on-surface-variant leading-relaxed">
                        Read-only static AST parsing of commits, AST token types, and syntax trees.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stroke-card/60">
                    <CheckCircle2 className="w-4 h-4 text-secondary-mint flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-primary">Public Email & Profile Handle</div>
                      <div className="text-[11px] text-on-surface-variant leading-relaxed">
                        Maps code authorship to candidate profile (read:user, user:email).
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stroke-card/60">
                    <CheckCircle2 className="w-4 h-4 text-secondary-mint flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-primary">Commit & PR Velocity Metrics</div>
                      <div className="text-[11px] text-on-surface-variant leading-relaxed">
                        Extracts contribution cadences, branch hygiene, and code review activity.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white border border-stroke-card/60">
                    <CheckCircle2 className="w-4 h-4 text-secondary-mint flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold text-primary">Test Suite & Complexity Extraction</div>
                      <div className="text-[11px] text-on-surface-variant leading-relaxed">
                        Detects unit test coverage, cyclomatic branches, and algorithmic complexity.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explicit Non-Access Guarantee */}
                <div className="p-3.5 rounded-lg bg-[#eef4ff] border border-[#dbeafe] flex items-center gap-3 text-xs text-primary font-medium">
                  <Lock className="w-4 h-4 text-secondary-mint flex-shrink-0" />
                  <span>
                    <strong>Strict Privacy Guarantee:</strong> Zero write access, zero private repository inspection, and zero persistent storage of candidate source code.
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                {/* 1. Official GitHub OAuth Button */}
                <button
                  onClick={handleLaunchOfficialGithubOAuth}
                  className="w-full sm:flex-1 h-12 rounded-xl bg-[#24292F] hover:bg-[#1B1F23] text-white font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
                >
                  <GithubSvg className="w-5 h-5 text-white" />
                  <span>Continue with Official GitHub OAuth</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </button>

                {/* 2. Interactive AST Preview Simulation */}
                <button
                  onClick={() => setViewState("parsing")}
                  className="w-full sm:w-auto px-6 h-12 rounded-xl bg-surface hover:bg-surface-low border border-stroke-card text-primary font-bold text-sm flex items-center justify-center gap-2 transition-all hover:border-secondary-mint"
                >
                  <Zap className="w-4 h-4 text-secondary-mint" />
                  <span>Preview AST Analysis Flow</span>
                </button>
              </div>

              <div className="text-center">
                <Link
                  href="/login"
                  className="text-xs text-on-surface-variant hover:text-primary transition-colors underline-offset-4 hover:underline"
                >
                  Cancel and return to SkillMatch login
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: EPHEMERAL AST PARSER LOADING STATE */}
        {viewState === "parsing" && (
          <div className="bg-white rounded-2xl border border-stroke-card shadow-card-elevation p-8 sm:p-12 text-center space-y-8 animate-in fade-in duration-300">
            {/* Radial Dual-Ring Spinner */}
            <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-stroke-card" />
              <div className="absolute inset-0 rounded-full border-4 border-secondary-mint border-t-transparent animate-spin" />
              <Code2 className="w-8 h-8 text-primary animate-pulse" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-mint/10 border border-secondary-mint/30 text-xs font-mono font-bold text-primary">
                <Sparkles className="w-3.5 h-3.5 text-secondary-mint" />
                <span>Abstract Syntax Tree Pipeline Active</span>
              </div>
              <h2 className="text-2xl font-extrabold text-primary-container">
                Analyzing GitHub Architecture
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                Parsing repositories for verified candidate <code className="font-mono text-primary font-semibold">@{candidateHandle}</code>.
              </p>
            </div>

            {/* Real-Time Telemetry Terminal */}
            <div className="max-w-xl mx-auto rounded-xl bg-[#091E24] text-white p-5 text-left font-mono text-xs border border-white/10 shadow-inner space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-white/10 text-[11px] text-cyan-300/80">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>skillmatch-ast-engine v2.6</span>
                </span>
                <span className="text-[10px] text-white/50">TLS SECURE</span>
              </div>

              <div className="space-y-1.5 pt-1">
                {telemetryLogs.slice(0, telemetryStage + 1).map((log, index) => {
                  const isCurrent = index === telemetryStage;
                  return (
                    <div
                      key={index}
                      className={`flex items-start gap-2 ${
                        isCurrent ? "text-secondary-mint font-semibold" : "text-white/70"
                      }`}
                    >
                      <span className="text-white/40">{index + 1}.</span>
                      <span className="flex-1">{log}</span>
                      {isCurrent ? (
                        <span className="animate-pulse text-cyan-300">[ACTIVE]</span>
                      ) : (
                        <span className="text-[#00d4be]">[DONE]</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: GITHUB VERIFICATION SUCCESS STATE */}
        {viewState === "success" && (
          <div className="bg-white rounded-2xl border border-stroke-card shadow-card-elevation p-8 sm:p-10 space-y-8 animate-in zoom-in-95 duration-300">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-secondary-mint/15 border border-secondary-mint/30 flex items-center justify-center mx-auto text-secondary-mint">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-mint/15 border border-secondary-mint/30 text-xs font-bold text-primary font-mono">
                <span>AST CODE VERIFICATION PASSED (CONFIDENCE: 98.4%)</span>
              </div>
              <h2 className="text-2xl font-extrabold text-primary-container">
                GitHub Repository Verified
              </h2>
              <p className="text-sm text-on-surface-variant max-w-md mx-auto">
                SkillMatch has successfully indexed verified AST code proofs for{" "}
                <span className="font-semibold text-primary">@{candidateHandle}</span>.
              </p>
            </div>

            {/* Extracted Skill Badges Preview */}
            <div className="rounded-xl border border-stroke-card bg-surface-lowest p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-primary font-mono flex items-center justify-between">
                <span>Extracted AST Engineering Stacks</span>
                <span className="text-secondary-mint font-bold">4 Verified Categories</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-white border border-secondary-mint/30 text-center">
                  <div className="text-xs font-extrabold text-primary font-mono">Go (Golang)</div>
                  <div className="text-[10px] text-secondary-mint font-bold mt-0.5">AST Score 96%</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-secondary-mint/30 text-center">
                  <div className="text-xs font-extrabold text-primary font-mono">React 19 & Next.js</div>
                  <div className="text-[10px] text-secondary-mint font-bold mt-0.5">AST Score 94%</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-secondary-mint/30 text-center">
                  <div className="text-xs font-extrabold text-primary font-mono">PostgreSQL Internals</div>
                  <div className="text-[10px] text-secondary-mint font-bold mt-0.5">AST Score 92%</div>
                </div>
                <div className="p-3 rounded-lg bg-white border border-secondary-mint/30 text-center">
                  <div className="text-xs font-extrabold text-primary font-mono">Distributed Systems</div>
                  <div className="text-[10px] text-secondary-mint font-bold mt-0.5">AST Score 91%</div>
                </div>
              </div>
            </div>

            {/* Final Action Handshake */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => router.push(`/dashboard?role=${role === "recruiter" ? "RECRUITER" : "CANDIDATE"}`)}
                className="w-full sm:flex-1 h-12 rounded-xl bg-primary hover:bg-primary-hover text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Continue to Candidate Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewState("overview")}
                className="w-full sm:w-auto px-6 h-12 rounded-xl border border-stroke-card hover:bg-surface text-on-surface-variant font-medium text-sm transition-all"
              >
                Re-scan Repositories
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-stroke-card/60 bg-white/60 py-4 text-center text-xs text-on-surface-variant">
        <span>SkillMatch Career Platform • Oceanic Intelligence • Zero Code Retention Architecture</span>
      </footer>
    </div>
  );
}

export default function GithubAuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full flex items-center justify-center bg-surface">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <GithubAuthContent />
    </Suspense>
  );
}
