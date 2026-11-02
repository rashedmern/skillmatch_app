"use client";

import { signOut } from "next-auth/react";

/**
 * Enterprise client-side logout handler:
 * 1. Clears session authentication cookies client-side (WITHOUT touching saved user profiles)
 * 2. Purges NextAuth session state
 * 3. Navigates the browser to /api/auth/logout which clears all HTTP-only cookies on the server
 * 4. Redirects cleanly to the landing page ("/")
 */
export async function handleAppSignOut(callbackUrl: string = "/") {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("skillmatch_candidate_email");
      localStorage.removeItem("skillmatch_recruiter_email");
      localStorage.removeItem("skillmatch_candidate_active_tab");
      localStorage.removeItem("skillmatch_recruiter_active_tab");
      sessionStorage.clear();
    } catch (e) {
      console.warn("Storage cleanup warning:", e);
    }

    // 1. NextAuth sign out
    try {
      await signOut({ redirect: false });
    } catch {}

    // 2. Clear session authentication cookies client-side
    const sessionCookies = [
      "skillmatch_session",
      "__Secure-skillmatch_session",
      "skillmatch_auth_role",
      "__Secure-skillmatch_auth_role",
      "skillmatch_candidate_email",
      "skillmatch_recruiter_email",
      "skillmatch_otp_challenge",
      "__Secure-skillmatch_otp_challenge",
      "skillmatch_otp_email",
      "authjs.session-token",
      "__Secure-authjs.session-token",
      "next-auth.session-token",
      "__Secure-next-auth.session-token",
      "authjs.csrf-token",
      "next-auth.csrf-token",
      "authjs.callback-url",
      "next-auth.callback-url",
    ];

    const isHttps = window.location.protocol === "https:";
    const secureFlag = isHttps ? "; Secure" : "";

    sessionCookies.forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT${secureFlag}`;
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax${secureFlag}`;
    });

    // 3. Perform a full browser navigation through the server logout route
    window.location.href = `/api/auth/logout?callbackUrl=${encodeURIComponent(callbackUrl)}`;
  }
}
