"use client";

import { logoutAction } from "@/server/actions/authActions";

/**
 * Enterprise client-side logout handler:
 * 1. Clears session authentication cookies client-side (WITHOUT touching saved user profiles)
 * 2. Fires logoutAction on the server to clear server session cookies
 * 3. Immediately navigates the browser to the landing page ("/")
 */
export function handleAppSignOut(callbackUrl: string = "/") {
  if (typeof window !== "undefined") {
    // 1. Clear session authentication cookies client-side
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

    try {
      localStorage.removeItem("skillmatch_candidate_email");
      localStorage.removeItem("skillmatch_recruiter_email");
      sessionStorage.clear();
    } catch (e) {
      console.warn("Storage cleanup warning:", e);
    }
  }

  // 2. Dispatch server-side cookie cleanup
  try {
    logoutAction().catch(() => {});
  } catch {}

  // 3. Synchronously and immediately redirect to the Landing Page
  if (typeof window !== "undefined") {
    window.location.replace(callbackUrl);
  }
}
