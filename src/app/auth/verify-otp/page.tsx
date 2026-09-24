"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BrandLogo } from "@/components/common/BrandLogo";
import { LanguageSwitcher } from "@/components/common/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
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
  Inbox,
} from "lucide-react";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, language } = useLanguage();

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

  // Handle individual digit change with mobile/browser one-time-code auto-fill support
  const handleChange = (index: number, value: string) => {
    const numericOnly = value.replace(/\D/g, "");

    // Cleared input
    if (!numericOnly) {
      const newDigits = [...digits];
      newDigits[index] = "";
      setDigits(newDigits);
      return;
    }

    // Auto-fill or multi-digit paste/fill detection (e.g. from browser autoComplete="one-time-code")
    if (numericOnly.length > 1) {
      const newDigits = [...digits];
      const slice = numericOnly.slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newDigits[i] = slice[i] || "";
      }
      setDigits(newDigits);
      setErrorMessage(null);

      const targetFocus = Math.min(slice.length, 5);
      inputRefs.current[targetFocus]?.focus();

      if (slice.length === 6) {
        executeVerification(slice);
      }
      return;
    }

    // Standard single-digit typing
    const newDigits = [...digits];
    newDigits[index] = numericOnly;
    setDigits(newDigits);
    setErrorMessage(null);

    // Auto-advance focus to next input
    if (numericOnly && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // If all 6 digits are filled, trigger auto-submit
    const combined = newDigits.join("");
    if (combined.length === 6) {
      executeVerification(combined);
    }
  };

  // Handle backspace and arrow navigation
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
        setErrorMessage(
          result.error ||
            (language === "bn" ? "ভুল যাচাইকরণ কোড।" : "Invalid verification code.")
        );
        return;
      }

      setIsSuccess(true);
      // Brief success animation before redirecting to dashboard
      setTimeout(() => {
        router.push(result.data?.redirectUrl || "/dashboard");
      }, 700);
    } catch {
      setIsVerifying(false);
      setErrorMessage(
        language === "bn"
          ? "কোড যাচাইকরণে নেটওয়ার্ক ত্রুটি। আবার চেষ্টা করুন।"
          : "Network error during code verification. Please try again."
      );
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = digits.join("");
    if (code.length < 6) {
      setErrorMessage(
        language === "bn" ? "অনুগ্রহ করে সম্পূর্ণ ৬ ডিজিট প্রদান করুন।" : "Please enter all 6 digits."
      );
      return;
    }
    executeVerification(code);
  };

  // Handle resend code via live email dispatch
  const handleResend = async () => {
    if (!canResend || isResending) return;
    setIsResending(true);
    setErrorMessage(null);

    try {
      await resendOtpAction({ email, role });
      setCountdown(60);
      setIsResending(false);
      setResendNotification(
        language === "bn"
          ? "আপনার ইনবক্সে একটি নতুন ৬-সংখ্যার যাচাইকরণ কোড পাঠানো হয়েছে।"
          : "A fresh 6-digit verification code has been dispatched to your email address."
      );
      setTimeout(() => setResendNotification(null), 8000);
    } catch {
      setIsResending(false);
      setErrorMessage(
        language === "bn"
          ? "কোড পুনরায় পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"
          : "Failed to resend code. Please try again."
      );
    }
  };

  // Format countdown string MM:SS
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Mask target email for visual privacy
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
          <span>{t.auth.twoFactorAuth}</span>
        </div>
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary/10 text-[11px] font-semibold text-secondary-mint">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>{t.auth.encryptedBadge}</span>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Context Heading */}
        <div className="space-y-1.5 text-center">
          <div className="w-12 h-12 rounded-2xl bg-primary-container/10 border border-primary-container/20 flex items-center justify-center text-primary-container mx-auto">
            <Mail className="w-6 h-6" />
          </div>

          <h1 className="text-2xl font-extrabold text-on-surface tracking-tight">
            {t.auth.verifyEmailTitle}
          </h1>

          <p className="text-xs text-on-surface-variant max-w-sm mx-auto leading-relaxed">
            {t.auth.verifyEmailSubtitle}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-slate-200 text-xs font-mono font-bold text-on-surface">
            <span>{maskedEmail}</span>
            <span className="text-[10px] uppercase font-sans text-secondary-mint px-1.5 py-0.5 rounded bg-secondary/15 font-semibold">
              {role === "candidate" ? t.common.candidate : t.common.recruiter}
            </span>
          </div>
        </div>

        {/* Resend Confirmation Notice */}
        {resendNotification && (
          <div role="status" aria-live="polite" className="p-3 rounded-xl bg-secondary/10 border border-secondary/25 flex items-center gap-2 text-xs text-primary font-medium animate-fadeIn">
            <CheckCircle2 className="w-4 h-4 text-secondary-mint shrink-0" aria-hidden="true" />
            <span>{resendNotification}</span>
          </div>
        )}

        {/* Error Notice */}
        {errorMessage && (
          <div role="alert" aria-live="assertive" className="p-3 rounded-xl bg-accent-gap/10 border border-accent-gap/25 flex items-center gap-2 text-xs text-accent-gap font-medium animate-shake">
            <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notice */}
        {isSuccess && (
          <div role="status" aria-live="polite" className="p-3.5 rounded-xl bg-secondary/15 border border-secondary-mint flex items-center justify-center gap-2 text-xs text-primary font-bold">
            <CheckCircle2 className="w-5 h-5 text-secondary-mint animate-bounce" aria-hidden="true" />
            <span>{t.auth.identityConfirmed}</span>
          </div>
        )}

        {/* 6-Digit Boxed Inputs Form with Native One-Time-Code Auto-Fill */}
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
                autoComplete={idx === 0 ? "one-time-code" : "off"}
                pattern="[0-9]*"
                maxLength={idx === 0 ? 6 : 1}
                value={digit}
                aria-label={`Digit ${idx + 1} of 6`}
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
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint`}
              />
            ))}
          </div>

          {/* Action Button & Live Delivery Trust Indicator */}
          <div className="space-y-3">
            <button
              type="submit"
              disabled={isVerifying || isSuccess || digits.join("").length < 6}
              className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary-container hover:bg-primary-hover active:scale-[0.98] text-white text-sm font-bold shadow-sm transition-all disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary-mint focus-visible:ring-offset-2"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>{t.auth.verifyingCode}</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>{t.auth.verifiedBtn}</span>
                </>
              ) : (
                <>
                  <span>{t.auth.verifyEnterDashboard}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </>
              )}
            </button>

            {/* Email Delivery Advisory */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
              <Inbox className="w-3.5 h-3.5 text-secondary-mint shrink-0" />
              <span>Real-time email dispatch active • Check spam/junk if not received within 60s</span>
            </div>
          </div>
        </form>

        {/* Resend Code Strip & Countdown */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <div className="text-slate-600 font-medium">
            {canResend ? (
              <span className="text-slate-600">{t.auth.didntReceiveCode}</span>
            ) : (
              <span className="font-mono tabular-nums text-slate-600">
                {t.auth.resendCodeIn} {formatTimer(countdown)}
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
            {isResending ? t.auth.dispatching : t.auth.resendCodeBtn}
          </button>
        </div>

        {/* Security Footer Info */}
        <div className="text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{t.auth.useDifferentMethod}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  const { t } = useLanguage();

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
            <span>{t.auth.returnToLogin}</span>
          </Link>
          <BrandLogo size="sm" />
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-on-surface-variant">
              <ShieldCheck className="w-4 h-4 text-secondary-mint" />
              <span>{t.auth.soc2Gateway}</span>
            </div>
            <LanguageSwitcher variant="pill" />
          </div>
        </div>
      </header>

      {/* Main Form Container with Suspense Boundary */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex items-center justify-center">
        <Suspense fallback={<div className="text-sm text-outline">{t.common.loading}</div>}>
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
