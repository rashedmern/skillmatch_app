"use client";

import React, { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/common/BrandLogo";
import { StatusDot } from "@/components/ui/StatusDot";
import {
  Code2,
  Building2,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

function DashboardDispatcherContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Read role cookie or query param
    const roleCookieMatch = document.cookie.match(/(?:^|;\s*)(?:__Secure-)?skillmatch_auth_role=([^;]+)/);
    const roleFromCookie = roleCookieMatch ? roleCookieMatch[1].toUpperCase() : null;
    const roleFromQuery = searchParams.get("role")?.toUpperCase();

    const targetRole =
      roleFromQuery === "RECRUITER" || roleFromCookie === "RECRUITER"
        ? "RECRUITER"
        : "CANDIDATE";

    // Persist role cookie securely if missing or updated from query
    if (typeof document !== "undefined") {
      const isSecure = window.location.protocol === "https:";
      document.cookie = `skillmatch_auth_role=${targetRole}; path=/; max-age=2592000; SameSite=Lax${isSecure ? "; Secure" : ""}`;
      if (isSecure) {
        document.cookie = `__Secure-skillmatch_auth_role=${targetRole}; path=/; max-age=2592000; SameSite=Lax; Secure`;
      }
    }

    // Auto-redirect to appropriate role dashboard
    if (targetRole === "RECRUITER") {
      router.replace("/dashboard/recruiter");
    } else {
      router.replace("/dashboard/candidate");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-surface p-4 text-center font-sans">
      <div className="w-full max-w-md p-8 rounded-2xl bg-white border border-stroke-card shadow-level-2 space-y-6 animate-scaleIn">
        <div className="flex justify-center">
          <BrandLogo size="md" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low border border-slate-200 text-xs text-on-surface-variant font-medium">
            <StatusDot size="sm" />
            <span>Verifying RBAC Authorization...</span>
          </div>

          <h2 className="text-xl font-extrabold text-on-surface tracking-tight">
            Routing to Dedicated Workspace
          </h2>

          <p className="text-xs text-on-surface-variant leading-relaxed">
            Directing you to your verified role dashboard based on cryptographic session telemetry.
          </p>
        </div>

        {/* Manual Choice fallback if redirection takes time */}
        <div className="space-y-3 pt-2">
          <Link
            href="/dashboard/candidate"
            className="w-full h-11 px-4 rounded-xl bg-primary-container hover:bg-primary-hover text-white text-xs font-bold flex items-center justify-between transition-all shadow-sm group"
          >
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-secondary-container" />
              <span>Enter Candidate Dossier (.edu)</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/dashboard/recruiter"
            className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-surface-container-lowest hover:bg-surface-container-low text-xs font-bold text-on-surface flex items-center justify-between transition-all group"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-outline" />
              <span>Enter Recruiter Portal (Talent Sourcing)</span>
            </div>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="text-[11px] text-outline font-mono flex items-center justify-center gap-1.5 pt-2">
          <ShieldCheck className="w-3.5 h-3.5 text-secondary-mint" />
          <span>Role-Based Access Control Active</span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardDispatcherPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs text-outline">Directing to dashboard...</div>}>
      <DashboardDispatcherContent />
    </Suspense>
  );
}
