import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Role-Based Access Control (RBAC) Next.js Middleware
 * 
 * Enforces role isolation:
 * - CANDIDATE cannot access /dashboard/recruiter
 * - RECRUITER cannot access /dashboard/candidate
 * - Root /dashboard redirects to appropriate role dashboard
 * - Unauthenticated requests are directed to /login
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const roleCookie = request.cookies.get("skillmatch_auth_role")?.value?.toUpperCase();

    // Check NextAuth session tokens (both production HTTPS and development HTTP)
    const hasNextAuthSession =
      request.cookies.has("authjs.session-token") ||
      request.cookies.has("__Secure-authjs.session-token") ||
      request.cookies.has("next-auth.session-token") ||
      request.cookies.has("__Secure-next-auth.session-token");

    // Unauthenticated protection: If neither session nor role cookie exists, redirect to login
    if (!hasNextAuthSession && !roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const currentRole = roleCookie === "RECRUITER" ? "RECRUITER" : "CANDIDATE";

    // 1. Root /dashboard dispatcher
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      const target = currentRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/candidate";
      return NextResponse.redirect(new URL(target, request.url));
    }

    // 2. Candidate trying to access recruiter dashboard
    if (pathname.startsWith("/dashboard/recruiter") && currentRole === "CANDIDATE") {
      const redirectUrl = new URL("/dashboard/candidate", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_recruiter_access");
      return NextResponse.redirect(redirectUrl);
    }

    // 3. Recruiter trying to access candidate dashboard
    if (pathname.startsWith("/dashboard/candidate") && currentRole === "RECRUITER") {
      const redirectUrl = new URL("/dashboard/recruiter", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_candidate_access");
      return NextResponse.redirect(redirectUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
