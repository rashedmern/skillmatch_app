"use client";

import { signOut } from "next-auth/react";
import { logoutAction } from "@/server/actions/authActions";

/**
 * Enterprise client-side logout handler:
 * 1. Clears server-side auth & role cookies
 * 2. Clears client-side auth & role cookies across all paths and subdomains
 * 3. Clears localStorage & sessionStorage
 * 4. Signs out of NextAuth (if active)
 * 5. Hard redirects cleanly to "/" (Landing Page)
 */
export async function handleAppSignOut(callbackUrl: string = "/?logout=true") {
  try {
    // 1. Clear server-side session cookies
    await logoutAction();
  } catch (err) {
    console.warn("logoutAction failed:", err);
  }

  if (typeof window !== "undefined") {
    // 2. Clear all authentication & role cookies client-side
    const cookiesToClear = [
      "skillmatch_session",
      "__Secure-skillmatch_session",
      "skillmatch_auth_role",
      "__Secure-skillmatch_auth_role",
      "skillmatch_candidate_email",
      "skillmatch_recruiter_email",
      "authjs.session-token",
      "__Secure-authjs.session-token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "authjs.csrf-token",
      "next-auth.csrf-token",
      "authjs.callback-url",
      "next-auth.callback-url",
    ];

    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${name}=; path=/; domain=${window.location.hostname}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });

    // 3. Clear authentication identifiers in localStorage & sessionStorage
    try {
      localStorage.removeItem("skillmatch_candidate_email");
      localStorage.removeItem("skillmatch_recruiter_email");
      localStorage.removeItem("skillmatch_candidate_profile");
      localStorage.removeItem("skillmatch_recruiter_profile");
      sessionStorage.clear();
    } catch (e) {
      console.warn("Error removing auth items from localStorage:", e);
    }

    // 4. Terminate NextAuth session without blocking redirect
    try {
      await signOut({ redirect: false });
    } catch (e) {
      console.warn("NextAuth signOut error:", e);
    }

    // 5. Force a full hard browser navigation to landing page
    window.location.href = callbackUrl;
  }
}
