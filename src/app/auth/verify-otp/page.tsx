"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { verifyOtpAction, resendOtpAction } from "@/server/actions/authActions";
import {
  ArrowLeft,
  ShieldCheck,
  Mail,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get("email") || "alex.chen@berkeley.edu";
  const role = (searchParams.get("role") || "candidate") as "candidate" | "recruiter";

  // 6 individual input digit states
  const [digits, setDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [countdown, setCountdown] = useState<number>(60);
  const canResend = countdown <= 0;
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isResending, setIsResending] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [resendNotification, setResendNotification] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  // Focus the first box on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // 60-second countdown timer loop
  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  // Handle individual digit change
  const handleChange = (index: number, value: string) => {
    // Only accept numeric inputs
    const numericChar = value.replace(/\D/g, "").slice(-1);

    const newDigits = [...digits];
    newDigits[index] = numericChar;
    setDigits(newDigits);
    setErrorMessage(null);

    // Auto-advance focus to next input
    if (numericChar && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, trigger auto-submit
    const combined = newDigits.join("");
    if (combined.length === 6) {
      executeVerification(combined);
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle pasting full 6-digit code
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

    if (pastedData) {
      const newDigits = [...digits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || "";
      }
      setDigits(newDigits);
      setErrorMessage(null);

      const focusIdx = Math.min(pastedData.length, 5);
      inputRefs.current[focusIdx]?.focus();

      if (pastedData.length === 6) {
        executeVerification(pastedData);
      }
    }
  };

  // Verification execution
  const executeVerification = async (code: string) => {
    setIsVerifying(true);
    setErrorMessage(null);

    try {
      const result = await verifyOtpAction({ email, code });

      if (!result.success) {
        setIsVerifying(false);
        setErrorMessage(result.error || "Invalid verification code.");
        return;
      }

      setIsSuccess(true);
      // Brief success animation before redirecting to dashboard
      setTimeout(() => {
        router.push(result.data?.redirectUrl || "/dashboard");
      }, 700);
    } catch {
      setIsVerifying(false);
      setErrorMessage("Network error during code verification. Please try again.");
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setErrorMessage("Please enter all 6 digits.");
      return;
    }
    executeVerification(code);
  };

  // Handle resend code
  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setErrorMessage(null);

    try {
      const res = await resendOtpAction({ email, role });
      setCountdown(60);
      setIsResending(false);
      const codeSuffix = res.data?.otpCode ? ` (Code: ${res.data.otpCode})` : "";
      setResendNotification(`A fresh 6-digit verification code${codeSuffix} has been dispatched to your inbox.`);
      setTimeout(() => setResendNotification(null), 8000);
    } catch {
      setIsResending(false);
      setErrorMessage("Failed to resend code. Please try again.");
    }
  };

  // Demo auto-fill helper for frictionless review
  const handleFillDemoCode = () => {
    const demoCode = "123456";
    setDigits(demoCode.split(""));
    executeVerification(demoCode);
  };

  // Format countdown string MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mask target email for visual security
  const maskedEmail = (() => {
    if (!email.includes("@")) return email;
    const [user, domain] = email.split("@");
    if (user.length <= 2) return `${user}***@${domain}`;
    return `${user.slice(0, 1)}***${user.slice(-1)}@${domain}`;
  })();

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl bg-white border border-stroke-card shadow-level-2 overflow-hidden">
      {/* Top Banner */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-on-surface">
          <KeyRound className="w-4 h-4 text-secondary-mint" />
          <span>Two-Factor Authentication</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-[11px] font-semibold text-secondary-mint">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>256-Bit Encrypted</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Context Heading */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container mx-auto">
            <Mail className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">
            Verify Your Email
          </h1>

          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            We sent a 6-digit cryptographic verification code to:
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-slate-200 text-xs font-mono font-bold text-on-surface">
            <span>{maskedEmail}</span>
            <span className="text-[10px] uppercase font-sans text-secondary-mint px-1.5 py-0.2 rounded bg-secondary/15">
              {role}
            </span>
          </div>
        </div>

        {/* Resend Confirmation Notice */}
        {resendNotification && (
          <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center gap-2 text-xs text-primary font-medium animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-secondary-mint shrink-0" />
            <span>{resendNotification}</span>
          </div>
        )}

        {/* Error Notice */}
        {errorMessage && (
          <div className="p-3 rounded-xl bg-accent-gap/10 border border-accent-gap/25 flex items-center gap-2 text-xs text-accent-gap font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notice */}
        {isSuccess && (
          <div className="p-3.5 rounded-xl bg-secondary/15 border border-secondary-mint flex items-center justify-center gap-2 text-xs text-primary font-bold">
            <CheckCircle2 className="w-5 h-5 text-secondary-mint animate-bounce" />
            <span>Identity Confirmed! Launching Session...</span>
          </div>
        )}

        {/* 6-Digit Boxed Inputs Form */}
        <form onSubmit={handleManualSubmit} className="space-y-6">
          <div className="flex items-center justify-center gap-2 sm:gap-3">
            {digits.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => {
                  inputRefs.current[idx] = el;
                }}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                disabled={isVerifying || isSuccess}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onPaste={handlePaste}
                className={`w-11 h-13 sm:w-12 sm:h-14 text-center font-mono text-xl sm:text-2xl font-bold rounded-xl border bg-surface-container-low transition-all duration-150 tabular-nums select-none ${
                  errorMessage
                    ? "border-accent-gap text-accent-gap focus:ring-accent-gap/20"
                    : digit
                    ? "border-secondary-mint bg-white text-on-surface ring-2 ring-secondary/15"
                    : "border-slate-200 text-on-surface focus:bg-white focus:border-secondary-mint focus:ring-2 focus:ring-secondary/15"
                } focus:outline-none`}
              />
            ))}
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isVerifying || isSuccess || digits.join("").length < 6}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all disabled:opacity-50"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <span>Verify &amp; Enter Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Bypass Button */}
            <button
              type="button"
              onClick={handleFillDemoCode}
              className="w-full h-9 inline-flex items-center justify-center gap-1.5 rounded-lg border border-dashed border-secondary-mint/50 bg-secondary/5 hover:bg-secondary/10 text-xs font-semibold text-primary transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-secondary-mint" />
              <span>Demo Key: Auto-fill &quot;123456&quot;</span>
            </button>
          </div>
        </form>

        {/* Resend Code Strip & Countdown */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <div className="text-on-surface-variant font-medium">
            {canResend ? (
              <span className="text-outline">Didn&apos;t receive code?</span>
            ) : (
              <span className="font-mono tabular-nums text-outline">
                Resend code in {formatTimer(countdown)}
              </span>
            )}
          </div>

          <button
            type="button"
            disabled={!canResend || isResending}
            onClick={handleResend}
            className={`font-bold transition-colors ${
              canResend
                ? "text-primary-container hover:text-secondary-mint hover:underline cursor-pointer"
                : "text-outline/60 cursor-not-allowed"
            }`}
          >
            {isResending ? "Dispatching..." : "Resend Code"}
          </button>
        </div>

        {/* Security Footer Info */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Use different sign in method</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-surface font-sans selection:bg-secondary/20 selection:text-primary">
      {/* Top Utility Header */}
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
          <div className="hidden sm:flex items-center gap-2 text-xs text-on-surface-variant">
            <ShieldCheck className="w-4 h-4 text-secondary-mint" />
            <span>SOC-2 Verified Gateway</span>
          </div>
        </div>
      </header>

      {/* Main Form Container with Suspense Boundary */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Suspense fallback={<div className="text-sm text-outline">Loading verification challenge...</div>}>
          <VerifyOtpContent />
        </Suspense>
      </main>

      {/* Mini Footer */}
      <footer className="w-full py-4 text-center text-xs text-outline border-t border-stroke-card/60">
        &copy; 2026 SkillMatch Systems Inc. All rights reserved.
      </footer>
    </div>
  );
}
