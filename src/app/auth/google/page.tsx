"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { ValidationService } from "@/server/services/validationService";
import { googleAuthAction } from "@/server/actions/authActions";
import {
  ArrowLeft,
  ShieldCheck,
  Building2,
  GraduationCap,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

// Crisp inline Google SVG Icon
const GoogleSvg: React.FC<{ className?: string }> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
    />
  </svg>
);

interface MockGoogleAccount {
  name: string;
  email: string;
  avatarUrl: string;
  domainType: "edu" | "personal" | "work";
  badge: string;
}

const mockAccounts: MockGoogleAccount[] = [
  {
    name: "Alex Chen",
    email: "alex.chen@berkeley.edu",
    avatarUrl: "AC",
    domainType: "edu",
    badge: "UC Berkeley EECS (Accredited)",
  },
  {
    name: "Elena Rostova",
    email: "elena.r@stanford.edu",
    avatarUrl: "ER",
    domainType: "edu",
    badge: "Stanford University (Accredited)",
  },
  {
    name: "Alex (Personal Account)",
    email: "alex.chen99@gmail.com",
    avatarUrl: "AP",
    domainType: "personal",
    badge: "Non-Institutional Personal Domain",
  },
];

function GoogleAuthContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") === "recruiter" ? "recruiter" : "candidate";

  const [customEmail, setCustomEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedAccountEmail, setSelectedAccountEmail] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAccountSelect = (account: MockGoogleAccount) => {
    setSelectedAccountEmail(account.email);
    setErrorMessage(null);
    validateAndProceed(account.email, account.name);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customEmail) return;
    validateAndProceed(customEmail);
  };

  const validateAndProceed = async (targetEmail: string, accountName?: string) => {
    setIsProcessing(true);
    setErrorMessage(null);

    // Strict .edu check for candidates
    if (role === "candidate") {
      const isEdu = ValidationService.isEduEmail(targetEmail);
      if (!isEdu) {
        setIsProcessing(false);
        setErrorMessage("Candidate registration requires a valid university institutional (.edu) email.");
        return;
      }
    }

    try {
      const result = await googleAuthAction({
        email: targetEmail,
        name: accountName || targetEmail.split("@")[0].replace(".", " "),
        role,
      });

      if (!result.success || !result.data) {
        setIsProcessing(false);
        setErrorMessage(result.error || "Google authorization failed.");
        return;
      }

      router.push(result.data.redirectUrl);
    } catch {
      setIsProcessing(false);
      setErrorMessage("Network error during Google sign-in. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-white border border-stroke-card shadow-level-2 overflow-hidden">
      {/* Google Dialog Header */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <GoogleSvg className="w-5 h-5" />
          <span className="text-sm font-bold text-on-surface">Sign in with Google</span>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] font-semibold text-on-surface-variant">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
          <span>OAuth 2.0 Direct</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Context Heading */}
        <div className="space-y-1">
          <h1 className="text-xl font-extrabold text-on-surface tracking-tight">
            Choose an account
          </h1>
          <p className="text-xs text-on-surface-variant">
            to continue to <span className="font-semibold text-primary">SkillMatch Systems</span> as a{" "}
            <span className="font-bold text-primary capitalize">{role}</span>.
          </p>
        </div>

        {/* Live Google SSO Window Trigger */}
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full h-11 inline-flex items-center justify-center gap-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-on-surface transition-all active:scale-[0.98] shadow-sm cursor-pointer"
        >
          <GoogleSvg className="w-4 h-4" />
          <span>Launch Google Browser Account Pop-up</span>
        </button>

        {/* Security Policy Alert for Candidates */}
        {role === "candidate" && (
          <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20 flex items-start gap-2.5 text-xs text-primary">
            <GraduationCap className="w-4 h-4 text-secondary-mint shrink-0 mt-0.5" />
            <span className="text-[11px] leading-relaxed">
              <strong>University Requirement:</strong> Select your verified institutional{" "}
              <code className="font-mono font-bold bg-white/60 px-1 py-0.5 rounded">.edu</code>{" "}
              account to unlock AST skill parsing and recruiter matching.
            </span>
          </div>
        )}

        {/* Inline Error Notice */}
        {errorMessage && (
          <div className="p-3.5 rounded-xl bg-accent-gap/10 border border-accent-gap/30 flex items-start gap-2.5 text-xs text-accent-gap animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">{errorMessage}</p>
              <p className="text-[11px] text-accent-gap/80 mt-0.5">
                Redirecting to security restriction details...
              </p>
            </div>
          </div>
        )}

        {/* Account Selector List */}
        <div className="space-y-2">
          {mockAccounts.map((account) => {
            const isInvalidForCandidate =
              role === "candidate" && account.domainType === "personal";

            return (
              <button
                key={account.email}
                type="button"
                disabled={isProcessing}
                onClick={() => handleAccountSelect(account)}
                className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all active:scale-[0.99] group ${
                  selectedAccountEmail === account.email
                    ? "border-secondary-mint bg-secondary/5 ring-2 ring-secondary/20"
                    : isInvalidForCandidate
                    ? "border-slate-200 bg-slate-50/70 hover:border-accent-gap/40 hover:bg-accent-gap/5"
                    : "border-slate-200 bg-surface-container-lowest hover:border-primary/40 hover:bg-surface-container-low"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs ${
                      isInvalidForCandidate
                        ? "bg-slate-200 text-slate-600"
                        : "bg-primary-container text-white"
                    }`}
                  >
                    {account.avatarUrl}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-on-surface group-hover:text-primary transition-colors flex items-center gap-1.5">
                      <span>{account.name}</span>
                      {account.domainType === "edu" && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-secondary-mint" />
                      )}
                    </div>
                    <div className="text-[11px] font-mono text-outline">{account.email}</div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        isInvalidForCandidate
                          ? "text-accent-gap font-semibold"
                          : "text-secondary-mint font-medium"
                      }`}
                    >
                      {account.badge}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-outline group-hover:text-on-surface group-hover:translate-x-0.5 transition-all" />
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-200 w-full" />
          <span className="bg-white px-3 text-[11px] font-medium text-outline uppercase tracking-wider">
            or use another account
          </span>
        </div>

        {/* Custom Email Input */}
        <form onSubmit={handleCustomSubmit} className="space-y-3">
          <div className="space-y-1">
            <label
              htmlFor="customEmail"
              className="block text-xs font-bold uppercase tracking-wider text-on-surface"
            >
              Enter Google Workspace Email
            </label>
            <input
              id="customEmail"
              type="email"
              required
              value={customEmail}
              onChange={(e) => setCustomEmail(e.target.value)}
              placeholder={
                role === "candidate"
                  ? "student.id@university.edu"
                  : "recruiter@scaleops.io"
              }
              className="w-full h-10 px-3 rounded-lg bg-surface-container-low border border-slate-200 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white focus:border-secondary-mint focus:ring-2 focus:ring-secondary/15 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing || !customEmail}
            className="w-full h-10 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover text-white text-xs font-bold shadow-sm transition-all disabled:opacity-60"
          >
            <span>{isProcessing ? "Authenticating..." : "Continue with Google"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Switch Persona or Return Link */}
        <div className="pt-2 flex items-center justify-between text-xs text-on-surface-variant">
          <Link
            href={`/auth/google?role=${role === "candidate" ? "recruiter" : "candidate"}`}
            className="text-secondary-mint hover:underline font-semibold flex items-center gap-1"
          >
            {role === "candidate" ? (
              <>
                <Building2 className="w-3.5 h-3.5" />
                <span>Switch to Recruiter SSO</span>
              </>
            ) : (
              <>
                <GraduationCap className="w-3.5 h-3.5" />
                <span>Switch to Candidate (.edu) SSO</span>
              </>
            )}
          </Link>

          <Link href="/login" className="text-outline hover:text-on-surface">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function GoogleAuthPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Header */}
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
        <Suspense fallback={<div className="text-sm text-outline">Connecting to Google OAuth...</div>}>
          <GoogleAuthContent />
        </Suspense>
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
