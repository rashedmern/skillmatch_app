"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import { ValidationService } from "@/server/services/validationService";
import { loginAction } from "@/server/actions/authActions";
import {
  ArrowLeft,
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  Building2,
  Code2,
  AlertCircle,
} from "lucide-react";

// Crisp inline SVGs for OAuth providers
const GithubIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const GoogleIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
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

export default function LoginPage() {
  const router = useRouter();
  const [persona, setPersona] = useState<"candidate" | "recruiter">("candidate");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);

    // Strict Candidate .edu Rule: immediate UI error block
    if (persona === "candidate") {
      const isEdu = ValidationService.isEduEmail(email);
      if (!isEdu) {
        setIsLoading(false);
        setErrorMessage(
          "Candidate registration requires a valid university institutional (.edu) email."
        );
        return;
      }
    }

    try {
      const result = await loginAction({ email, password, role: persona });
      if (!result.success || !result.data) {
        setIsLoading(false);
        setErrorMessage(result.error || "Authentication failed. Please check your credentials.");
        return;
      }

      router.push(result.data.redirectUrl);
    } catch {
      setIsLoading(false);
      setErrorMessage("An unexpected network error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Utility Header */}
      <header className="w-full border-b border-stroke-card/80 bg-white/80 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-on-surface-variant hover:text-primary-container transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Return to Home</span>
          </Link>

          <BrandLogo size="sm" />

          <div className="hidden sm:flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-secondary-mint" />
            <span>256-Bit Encrypted Portal</span>
          </div>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 rounded-2xl bg-white border border-stroke-card shadow-level-2 overflow-hidden">
          {/* Left Panel: Brand Context & Real-Time Telemetry (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-5 relative bg-gradient-to-br from-[#002930] via-primary-container to-[#004049] p-8 xl:p-10 text-white flex-col justify-between overflow-hidden">
            {/* Ambient Radial Glow Overlays */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(10,136,125,0.35),transparent_70%)] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-80 h-80 bg-[radial-gradient(circle_at_center,rgba(141,206,218,0.2),transparent_70%)] pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-semibold text-secondary-container backdrop-blur-sm">
                <StatusDot size="sm" />
                <span>Empirical Verification Hub</span>
              </div>

              <h2 className="text-2xl xl:text-3xl font-extrabold tracking-tight leading-snug">
                Connecting Verified CSE Engineers Directly to Core Tech Teams.
              </h2>

              <p className="text-sm text-white/80 font-normal leading-relaxed">
                Skip standard ATS keyword filters. SkillMatch parses codebase AST structures,
                benchmarking algorithmic complexity, concurrency, and architecture.
              </p>

              {/* Platform Telemetry Cards */}
              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Code2 className="w-4 h-4 text-secondary-container" />
                    <span className="text-xs font-medium text-white/90">AST Parse Precision</span>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-secondary-container">
                    98.4% Accuracy
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-secondary-container" />
                    <span className="text-xs font-medium text-white/90">Avg. Time to Screen</span>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-secondary-container">
                    14 Days
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Building2 className="w-4 h-4 text-secondary-container" />
                    <span className="text-xs font-medium text-white/90">Active Partner Teams</span>
                  </div>
                  <span className="text-xs font-bold font-mono tabular-nums text-secondary-container">
                    120+ Companies
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Institutional Strip */}
            <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-[11px] text-white/70 font-medium">
              <span>SOC-2 Type II Certified</span>
              <span>ABET Aligned</span>
            </div>
          </div>

          {/* Right Panel: Authentication Form Hub */}
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto space-y-6">
              {/* Heading */}
              <div className="space-y-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Sign in to access your verified profile and candidate telemetry.
                </p>
              </div>

              {/* Persona Switcher Tabs */}
              <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-container-low border border-slate-200/80 text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setPersona("candidate")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all duration-150 ${
                    persona === "candidate"
                      ? "bg-white text-primary-container shadow-sm border border-slate-200/50"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Candidate / Student</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPersona("recruiter")}
                  className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg transition-all duration-150 ${
                    persona === "recruiter"
                      ? "bg-white text-primary-container shadow-sm border border-slate-200/50"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Recruiter / Lead</span>
                </button>
              </div>

              {/* Fast OAuth Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href={`/auth/callback/github?role=${persona}&email=${encodeURIComponent(
                    email || "alex.chen@berkeley.edu"
                  )}`}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-all active:scale-[0.98] shadow-sm group"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Continue with GitHub</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-secondary/10 text-secondary-mint border border-secondary/20 ml-1">
                    AST
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-semibold text-on-surface transition-all active:scale-[0.98] shadow-sm group cursor-pointer"
                >
                  <GoogleIcon className="w-4 h-4" />
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Security Error Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-accent-gap/10 border border-accent-gap/30 flex items-start gap-2.5 text-xs text-accent-gap animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">{errorMessage}</p>
                    <p className="text-[11px] text-accent-gap/80 mt-0.5">
                      Redirecting to university verification guidelines...
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="relative flex items-center justify-center">
                <div className="border-t border-slate-200 w-full" />
                <span className="bg-white px-3 text-[11px] font-medium text-outline uppercase tracking-wider">
                  or continue with email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-on-surface"
                  >
                    {persona === "candidate" ? "University / Personal Email" : "Work Email"}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={
                        persona === "candidate"
                          ? "alex.chen@eecs.berkeley.edu"
                          : "sarah.miller@scaleops.io"
                      }
                      className="w-full h-10 pl-9 pr-3 rounded-lg bg-surface-container-low border border-slate-200 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white focus:border-secondary-mint focus:ring-2 focus:ring-secondary/15 transition-all"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-xs font-bold uppercase tracking-wider text-on-surface"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setResetSent(true)}
                      className="text-xs text-secondary-mint hover:underline font-medium"
                    >
                      {resetSent ? "Reset instructions sent!" : "Forgot password?"}
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-outline absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-10 pl-9 pr-10 rounded-lg bg-surface-container-low border border-slate-200 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-white focus:border-secondary-mint focus:ring-2 focus:ring-secondary/15 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-slate-300 text-primary-container focus:ring-secondary/30"
                  />
                  <label htmlFor="remember" className="text-xs text-on-surface-variant font-medium select-none">
                    Remember me on this workstation
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover active:scale-[0.98] text-white text-sm font-bold shadow-sm hover:shadow-md transition-all duration-150 disabled:opacity-60"
                >
                  {isLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>
                        Sign In as {persona === "candidate" ? "Candidate" : "Recruiter"}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Register Route Link */}
              <div className="text-center pt-2">
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Don&apos;t have an account yet?{" "}
                  <Link
                    href="/register"
                    className="font-bold text-primary-container hover:text-secondary-mint hover:underline transition-colors"
                  >
                    Create Free Profile
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
