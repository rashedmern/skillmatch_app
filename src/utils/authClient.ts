"use client";

import { logoutAction } from "@/server/actions/authActions";

/**
 * Enterprise client-side logout handler:
 * 1. Clears localStorage & sessionStorage
 * 2. Clears all accessible client-side cookies
 * 3. Calls server-side logoutAction
 * 4. Navigates to /api/auth/logout to erase all HttpOnly cookies on the HTTP response
 *    and perform a clean redirect to the Landing Page ("/")
 */
export async function handleAppSignOut(callbackUrl: string = "/") {
  if (typeof window !== "undefined") {
    try {
      localStorage.removeItem("skillmatch_candidate_email");
      localStorage.removeItem("skillmatch_recruiter_email");
      localStorage.removeItem("skillmatch_candidate_profile");
      localStorage.removeItem("skillmatch_recruiter_profile");
      sessionStorage.clear();
    } catch (e) {
      console.warn("Storage cleanup warning:", e);
    }

    const cookiesToClear = [
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

    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      document.cookie = `${name}=; path=/; domain=${window.location.hostname}; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });
  }

  try {
    await logoutAction();
  } catch (err) {
    console.warn("logoutAction error:", err);
  }

  if (typeof window !== "undefined") {
    // Navigating to /api/auth/logout forces the server to send Set-Cookie Max-Age=0
    // headers to wipe any HttpOnly cookie and redirects cleanly with status 303 to "/"
    window.location.href = "/api/auth/logout";
  }
}
