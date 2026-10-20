"use client";

import { signOut } from "next-auth/react";
import { logoutAction } from "@/server/actions/authActions";

/**
 * Enterprise client-side logout handler:
 * 1. Clears client-side auth & role cookies
 * 2. Clears authentication email identifiers in localStorage
 * 3. Calls server-side action to wipe session cookies
 * 4. Signs out of NextAuth and redirects cleanly to "/" (Landing Page)
 */
export async function handleAppSignOut(callbackUrl: string = "/") {
  if (typeof window !== "undefined") {
    // 1. Clear all authentication & role cookies client-side
    const cookiesToClear = [
      "skillmatch_session",
      "__Secure-skillmatch_session",
      "skillmatch_auth_role",
      "__Secure-skillmatch_auth_role",
      "skillmatch_candidate_email",
      "skillmatch_recruiter_email",
    ];

    cookiesToClear.forEach((name) => {
      document.cookie = `${name}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
    });

    // 2. Clear authentication identifiers in localStorage
    try {
      localStorage.removeItem("skillmatch_candidate_email");
      localStorage.removeItem("skillmatch_recruiter_email");
    } catch (e) {
      console.warn("Error removing auth items from localStorage:", e);
    }
  }

  // 3. Clear server-side session cookies
  try {
    await logoutAction();
  } catch (err) {
    console.warn("logoutAction failed:", err);
  }

  // 4. Terminate NextAuth session & redirect to landing page
  await signOut({ callbackUrl });
}
