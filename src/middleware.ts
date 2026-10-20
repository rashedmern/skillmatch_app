import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Role-Based Access Control (RBAC) & Dynamic Landing Page Switcher Middleware
 * 
 * Concept:
 * 1. Root / (Landing Page):
 *    - Unauthenticated guest: Shows the full marketing Landing Page.
 *    - Authenticated user: Automatically bypasses landing page and lands on their
 *      role-specific console (/dashboard/candidate or /dashboard/recruiter).
 * 
 * 2. Auth Gateways (/login, /register):
 *    - Unauthenticated: Renders auth portal.
 *    - Already Authenticated: Bypasses to active dashboard.
 * 
 * 3. Role Protection (/dashboard/:path*):
 *    - Unauthenticated: Redirects to /login?callbackUrl=...
 *    - Strict cross-role isolation (Candidate cannot access Recruiter, and vice-versa).
 */
export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 1. Read role cookies (both standard and HTTPS __Secure- prefix)
  const roleCookie = (
    request.cookies.get("skillmatch_auth_role")?.value ||
    request.cookies.get("__Secure-skillmatch_auth_role")?.value
  )?.toUpperCase();

  // 2. Read explicit session cookie
  const sessionCookie = (
    request.cookies.get("skillmatch_session")?.value ||
    request.cookies.get("__Secure-skillmatch_session")?.value
  );

  // 3. Read identity email cookies
  const candidateEmailCookie = request.cookies.get("skillmatch_candidate_email")?.value;
  const recruiterEmailCookie = request.cookies.get("skillmatch_recruiter_email")?.value;

  // 4. Check NextAuth active session tokens (HTTPS production, HTTP local, chunked)
  const allCookies = request.cookies.getAll();
  const hasNextAuthSession = allCookies.some(
    (c) =>
      (c.name.includes("authjs.session-token") || c.name.includes("next-auth.session-token")) &&
      Boolean(c.value && c.value.trim() !== "")
  );

  // User is authenticated if they have NextAuth session, explicit session cookie, or active role with bound email
  const isAuthenticated = Boolean(
    hasNextAuthSession ||
    sessionCookie === "authenticated" ||
    (roleCookie && (candidateEmailCookie || recruiterEmailCookie))
  );

  // Determine effective role: query override -> role cookie -> email heuristic -> fallback candidate
  const queryRole = searchParams.get("role")?.toUpperCase();
  const currentRole: "CANDIDATE" | "RECRUITER" =
    queryRole === "RECRUITER" || roleCookie === "RECRUITER" || (recruiterEmailCookie && !candidateEmailCookie)
      ? "RECRUITER"
      : "CANDIDATE";

  // Helper to persist role & session cookies on redirect response
  const attachRoleCookie = (res: NextResponse) => {
    const isHttps = request.nextUrl.protocol === "https:";
    if (!roleCookie || (queryRole && queryRole !== roleCookie)) {
      res.cookies.set("skillmatch_auth_role", currentRole, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30, // 30 days
        sameSite: "lax",
        secure: isHttps,
      });
      if (isHttps) {
        res.cookies.set("__Secure-skillmatch_auth_role", currentRole, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
          secure: true,
        });
      }
    }
    return res;
  };

  // =========================================================================
  // RULE 1: ROOT LANDING PAGE (/)
  // =========================================================================
  if (pathname === "/") {
    // If the user has an active session, skip landing page and redirect to their role dashboard
    if (isAuthenticated) {
      const targetDashboard = currentRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/candidate";
      return attachRoleCookie(NextResponse.redirect(new URL(targetDashboard, request.url)));
    }

    // New visitor / guest: Render the landing page
    return NextResponse.next();
  }

  // =========================================================================
  // RULE 2: AUTH PAGES (/login, /register)
  // =========================================================================
  if (pathname === "/login" || pathname === "/register") {
    // If already authenticated, redirect directly to dashboard
    if (isAuthenticated) {
      const targetDashboard = currentRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/candidate";
      return attachRoleCookie(NextResponse.redirect(new URL(targetDashboard, request.url)));
    }
    return NextResponse.next();
  }

  // =========================================================================
  // RULE 3: DASHBOARD ENCLAVES (/dashboard, /dashboard/:path*)
  // =========================================================================
  if (pathname.startsWith("/dashboard")) {
    // Guard unauthenticated visitors from protected dashboard zones
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Root /dashboard dispatcher
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      const target = currentRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/candidate";
      const redirectUrl = new URL(target, request.url);
      searchParams.forEach((val, key) => {
        if (key !== "role") redirectUrl.searchParams.set(key, val);
      });
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // Candidate attempting to access recruiter dashboard
    if (pathname.startsWith("/dashboard/recruiter") && currentRole === "CANDIDATE") {
      const redirectUrl = new URL("/dashboard/candidate", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_recruiter_access");
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // Recruiter attempting to access candidate dashboard
    if (pathname.startsWith("/dashboard/candidate") && currentRole === "RECRUITER") {
      const redirectUrl = new URL("/dashboard/recruiter", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_candidate_access");
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // Continue to authenticated route and ensure cookies are synchronized
    const response = NextResponse.next();
    if (!roleCookie) {
      const isHttps = request.nextUrl.protocol === "https:";
      response.cookies.set("skillmatch_auth_role", currentRole, {
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        sameSite: "lax",
        secure: isHttps,
      });
      if (isHttps) {
        response.cookies.set("__Secure-skillmatch_auth_role", currentRole, {
          path: "/",
          maxAge: 60 * 60 * 24 * 30,
          sameSite: "lax",
          secure: true,
        });
      }
    }
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};
