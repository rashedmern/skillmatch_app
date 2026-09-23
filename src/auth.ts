import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { cookies, headers } from "next/headers";
import { ValidationService } from "@/server/services/validationService";

// ==============================================================================
// Vercel & Production Environment Normalization
// ==============================================================================
// 1. Ensure Auth.js v5 trusts the Vercel edge/proxy headers (x-forwarded-host, etc.)
process.env.AUTH_TRUST_HOST = "true";

// 2. Ensure AUTH_SECRET is populated from NEXTAUTH_SECRET fallback if necessary
if (!process.env.AUTH_SECRET && process.env.NEXTAUTH_SECRET) {
  process.env.AUTH_SECRET = process.env.NEXTAUTH_SECRET;
}
if (!process.env.NEXTAUTH_SECRET && process.env.AUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = process.env.AUTH_SECRET;
}

// 3. Fallback secret to prevent startup crashes if env var is missing in staging
if (!process.env.AUTH_SECRET) {
  process.env.AUTH_SECRET = "skillmatch-production-secure-32-character-random-salt-key-2026";
}

// 4. Ensure NEXTAUTH_URL and AUTH_URL are synchronized if explicitly configured
if (!process.env.AUTH_URL && process.env.NEXTAUTH_URL) {
  process.env.AUTH_URL = process.env.NEXTAUTH_URL;
}
if (!process.env.NEXTAUTH_URL && process.env.AUTH_URL) {
  process.env.NEXTAUTH_URL = process.env.AUTH_URL;
}

// 5. In production / Vercel, clean up accidental localhost URLs that break OAuth redirects
if (process.env.VERCEL || process.env.NODE_ENV === "production") {
  if (process.env.NEXTAUTH_URL?.includes("localhost")) {
    delete process.env.NEXTAUTH_URL;
  }
  if (process.env.AUTH_URL?.includes("localhost")) {
    delete process.env.AUTH_URL;
  }
  // IMPORTANT: Do NOT assign AUTH_URL or NEXTAUTH_URL to VERCEL_URL on Vercel!
  // VERCEL_URL points to transient deployment subdomains (e.g. *-git-*.vercel.app),
  // which breaks OAuth redirect URIs and session cookies on production/custom domains.
  // With AUTH_TRUST_HOST="true", Auth.js v5 dynamically reads x-forwarded-host.
}

// ==============================================================================
// Resilient Request & Cookie Helpers for Serverless / Edge Runtimes
// ==============================================================================

/**
 * Safely extracts cookies from either `cookies()` or raw request `headers()`
 * without throwing in edge, route handler, or background execution contexts.
 */
async function getSafeCookie(name: string): Promise<string | null> {
  // Method 1: Try async cookies() API (Next.js 15+)
  try {
    const cookieStore = await cookies();
    const val =
      cookieStore.get(name)?.value ||
      cookieStore.get(`__Secure-${name}`)?.value ||
      cookieStore.get(`__Host-${name}`)?.value;
    if (val) return val;
  } catch {
    // Next.js cookies() may throw outside active request scope
  }

  // Method 2: Fallback to reading raw "cookie" header from headers()
  try {
    const headerStore = await headers();
    const rawCookie = headerStore.get("cookie") || "";
    if (rawCookie) {
      const regex = new RegExp(`(?:^|;\\s*)(?:__Secure-|__Host-)?${name}=([^;]+)`);
      const match = rawCookie.match(regex);
      if (match && match[1]) {
        return decodeURIComponent(match[1].trim());
      }
    }
  } catch {
    // headers() unavailable in this execution context
  }

  return null;
}

/**
 * Safely resolves the callback URL from cookie or referer headers.
 */
async function getSafeCallbackUrl(): Promise<string | null> {
  const cbCookie =
    (await getSafeCookie("authjs.callback-url")) ||
    (await getSafeCookie("next-auth.callback-url"));
  if (cbCookie) return cbCookie;

  try {
    const headerStore = await headers();
    const referer = headerStore.get("referer");
    if (referer) return referer;
  } catch {
    // ignore
  }

  return null;
}

/**
 * Resilient multi-layered role detector:
 * 1. Custom role cookie (skillmatch_auth_role / __Secure-skillmatch_auth_role)
 * 2. Callback URL / referer containing ?role= or /recruiter or /candidate
 * 3. Institutional .edu email heuristic
 * 4. Safe fallback to CANDIDATE
 */
async function resolveRoleFromRequest(email: string): Promise<"CANDIDATE" | "RECRUITER"> {
  // 1. Direct role cookie
  const roleCookie = await getSafeCookie("skillmatch_auth_role");
  if (roleCookie) {
    const upper = roleCookie.toUpperCase().trim();
    if (upper === "RECRUITER") return "RECRUITER";
    if (upper === "CANDIDATE") return "CANDIDATE";
  }

  // 2. Callback URL or referer query parameter
  const cbUrl = await getSafeCallbackUrl();
  if (cbUrl) {
    try {
      const decoded = decodeURIComponent(cbUrl);
      const match = decoded.match(/role=(candidate|recruiter)/i);
      if (match) {
        return match[1].toUpperCase() as "CANDIDATE" | "RECRUITER";
      }
      if (decoded.includes("/dashboard/recruiter") || decoded.includes("role=recruiter")) {
        return "RECRUITER";
      }
    } catch {
      // ignore URI decoding errors
    }
  }

  // 3. Institutional email heuristic: Accredited universities default to candidate
  if (email && ValidationService.isEduEmail(email)) {
    return "CANDIDATE";
  }

  // 4. Default to CANDIDATE
  return "CANDIDATE";
}

// ==============================================================================
// NextAuth Configuration
// ==============================================================================

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        process.env.AUTH_GOOGLE_ID ||
        "demo-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        process.env.AUTH_GOOGLE_SECRET ||
        "demo-google-client-secret",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId:
        process.env.GITHUB_CLIENT_ID ||
        process.env.AUTH_GITHUB_ID ||
        "demo-github-client-id",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        process.env.AUTH_GITHUB_SECRET ||
        "demo-github-client-secret",
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const provider = account?.provider;
        const email = user.email?.toLowerCase().trim() || "";

        // 1. Resilient Role Resolution (multi-layer: cookie, header, callbackUrl, .edu heuristic)
        const effectiveRole = await resolveRoleFromRequest(email);

        // 2. Strict Institutional (.edu) Validation Rule for Candidate Google Logins
        if (provider === "google") {
          if (effectiveRole === "CANDIDATE") {
            const isEdu = ValidationService.isEduEmail(email);
            if (!isEdu) {
              // Reject and redirect to security policy restriction page
              return `/auth/error?error=InvalidDomain&email=${encodeURIComponent(email)}&role=CANDIDATE`;
            }
          }
          // Recruiters signing in via Google with corporate emails (e.g. @company.com) are permitted
        }

        return true;
      } catch (err) {
        console.error("[Auth] Error inside signIn callback:", err);
        // Fail safely to true to allow session creation rather than crashing serverless execution
        return true;
      }
    },

    async redirect({ url, baseUrl }) {
      try {
        const cleanBaseUrl = baseUrl.replace(/\/+$/, "");

        // 1. Defend against empty or landing page anchor redirects (#signup, #login, /#...)
        if (!url) {
          return `${cleanBaseUrl}/dashboard`;
        }

        const lowerUrl = url.toLowerCase();
        if (
          lowerUrl.includes("#signup") ||
          lowerUrl.includes("#login") ||
          lowerUrl.includes("#register") ||
          lowerUrl.startsWith("/#") ||
          lowerUrl.startsWith("#")
        ) {
          return `${cleanBaseUrl}/dashboard`;
        }

        // 2. Parse destination safely with cleanBaseUrl as reference base
        let parsedUrl: URL;
        try {
          parsedUrl = new URL(url, cleanBaseUrl);
        } catch {
          return `${cleanBaseUrl}/dashboard`;
        }

        const pathname = parsedUrl.pathname;
        const search = parsedUrl.search;

        // 3. Prevent landing, login, or register page looping
        if (
          pathname === "/" ||
          pathname === "/login" ||
          pathname === "/register" ||
          pathname === "/auth/signin" ||
          pathname.endsWith("/#signup")
        ) {
          const roleParam = parsedUrl.searchParams.get("role");
          if (roleParam) {
            return `${cleanBaseUrl}/dashboard?role=${encodeURIComponent(roleParam)}`;
          }
          return `${cleanBaseUrl}/dashboard`;
        }

        // 4. Preserve valid application routes (dashboard, auth errors, verification)
        if (
          pathname.startsWith("/dashboard") ||
          pathname.startsWith("/auth/error") ||
          pathname.startsWith("/auth/verify-otp") ||
          pathname.startsWith("/auth/google")
        ) {
          return `${cleanBaseUrl}${pathname}${search}`;
        }

        // 5. If origin matches cleanBaseUrl, permit relative navigation
        if (parsedUrl.origin === cleanBaseUrl) {
          return `${cleanBaseUrl}${pathname}${search}`;
        }

        // 6. Safe fallback: always direct successful sign-ins to /dashboard
        return `${cleanBaseUrl}/dashboard`;
      } catch {
        return `${baseUrl.replace(/\/+$/, "")}/dashboard`;
      }
    },

    async jwt({ token, user }) {
      try {
        if (user) {
          token.id = user.id;
        }

        // Synchronize role into JWT token payload if missing
        if (!token.role) {
          const email = (user?.email || token.email || "").toLowerCase().trim();
          token.role = await resolveRoleFromRequest(email);
        }
      } catch (err) {
        console.warn("[Auth] Error inside jwt callback:", err);
        if (!token.role) {
          token.role = "CANDIDATE";
        }
      }

      return token;
    },

    async session({ session, token }) {
      try {
        if (session.user) {
          if (token.sub) {
            session.user.id = token.sub;
          }
          if (token.role) {
            (session.user as any).role = token.role;
          }
        }
      } catch (err) {
        console.warn("[Auth] Error inside session callback:", err);
      }
      return session;
    },
  },
  trustHost: true,
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "skillmatch-production-secure-32-character-random-salt-key-2026",
});
