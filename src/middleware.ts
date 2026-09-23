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
  const { pathname, searchParams } = request.nextUrl;

  if (pathname.startsWith("/dashboard")) {
    const roleCookie = (
      request.cookies.get("skillmatch_auth_role")?.value ||
      request.cookies.get("__Secure-skillmatch_auth_role")?.value
    )?.toUpperCase();

    // Check NextAuth session tokens (production HTTPS, dev HTTP, and chunked tokens)
    const allCookies = request.cookies.getAll();
    const hasNextAuthSession = allCookies.some(
      (c) =>
        c.name.includes("authjs.session-token") ||
        c.name.includes("next-auth.session-token")
    );

    // Unauthenticated protection: If neither session nor role cookie exists, redirect to login
    if (!hasNextAuthSession && !roleCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Role resolution with query parameter override support from OAuth callbacks
    const queryRole = searchParams.get("role")?.toUpperCase();
    const currentRole: "CANDIDATE" | "RECRUITER" =
      queryRole === "RECRUITER" || roleCookie === "RECRUITER"
        ? "RECRUITER"
        : "CANDIDATE";

    // Helper to persist role cookie on redirect response if missing or updated
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

    // 1. Root /dashboard dispatcher
    if (pathname === "/dashboard" || pathname === "/dashboard/") {
      const target = currentRole === "RECRUITER" ? "/dashboard/recruiter" : "/dashboard/candidate";
      const redirectUrl = new URL(target, request.url);
      // Clean query params
      searchParams.forEach((val, key) => {
        if (key !== "role") redirectUrl.searchParams.set(key, val);
      });
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // 2. Candidate trying to access recruiter dashboard
    if (pathname.startsWith("/dashboard/recruiter") && currentRole === "CANDIDATE") {
      const redirectUrl = new URL("/dashboard/candidate", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_recruiter_access");
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // 3. Recruiter trying to access candidate dashboard
    if (pathname.startsWith("/dashboard/candidate") && currentRole === "RECRUITER") {
      const redirectUrl = new URL("/dashboard/recruiter", request.url);
      redirectUrl.searchParams.set("warning", "unauthorized_candidate_access");
      return attachRoleCookie(NextResponse.redirect(redirectUrl));
    }

    // Continue to matching dashboard route
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
  matcher: ["/dashboard/:path*"],
};
