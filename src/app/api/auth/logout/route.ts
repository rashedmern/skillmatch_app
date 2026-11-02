import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIES_TO_DELETE = [
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
  "authjs.session-token.0",
  "authjs.session-token.1",
  "__Secure-authjs.session-token.0",
  "__Secure-authjs.session-token.1",
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "next-auth.session-token.0",
  "next-auth.session-token.1",
  "__Secure-next-auth.session-token.0",
  "__Secure-next-auth.session-token.1",
  "authjs.csrf-token",
  "__Secure-authjs.csrf-token",
  "next-auth.csrf-token",
  "__Secure-next-auth.csrf-token",
  "authjs.callback-url",
  "next-auth.callback-url",
];

async function handleLogout(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawTarget = searchParams.get("callbackUrl") || "/";
  // Add logged_out=1 flag to target URL so middleware never loops
  const targetUrl = rawTarget.includes("?")
    ? `${rawTarget}&logged_out=1`
    : `${rawTarget}?logged_out=1`;

  try {
    const cookieStore = await cookies();
    for (const name of COOKIES_TO_DELETE) {
      try {
        cookieStore.delete(name);
      } catch {}
    }
  } catch {}

  const response = NextResponse.redirect(new URL(targetUrl, req.url), { status: 303 });
  const isHttps = req.nextUrl.protocol === "https:" || req.headers.get("x-forwarded-proto") === "https";

  const clearCookie = (name: string) => {
    // Standard delete
    try {
      response.cookies.delete(name);
    } catch {}

    // Standard non-secure expire
    try {
      response.cookies.set(name, "", {
        path: "/",
        maxAge: 0,
        expires: new Date(0),
        sameSite: "lax",
      });
    } catch {}

    // Strict secure expire (mandatory on HTTPS / Vercel for __Secure- cookies)
    if (isHttps || name.startsWith("__Secure-") || name.startsWith("__Host-")) {
      try {
        response.cookies.set(name, "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
          secure: true,
          sameSite: "lax",
        });
      } catch {}
    }
  };

  // 1. Delete all explicit known cookie names
  for (const name of COOKIES_TO_DELETE) {
    clearCookie(name);
  }

  // 2. Dynamically scan all incoming cookies and expire session/auth/token/csrf cookies
  try {
    const allCookies = req.cookies.getAll();
    for (const c of allCookies) {
      const lower = c.name.toLowerCase();
      if (
        lower.includes("auth") ||
        lower.includes("session") ||
        lower.includes("skillmatch") ||
        lower.includes("csrf") ||
        lower.includes("token") ||
        lower.includes("callback")
      ) {
        clearCookie(c.name);
      }
    }
  } catch {}

  return response;
}

export async function GET(req: NextRequest) {
  return handleLogout(req);
}

export async function POST(req: NextRequest) {
  return handleLogout(req);
}
