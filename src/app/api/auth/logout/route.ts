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
  "next-auth.session-token",
  "__Secure-next-auth.session-token",
  "authjs.csrf-token",
  "next-auth.csrf-token",
  "authjs.callback-url",
  "next-auth.callback-url",
];

async function handleLogout(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetUrl = searchParams.get("callbackUrl") || "/";

  try {
    const cookieStore = await cookies();
    for (const name of COOKIES_TO_DELETE) {
      try {
        cookieStore.set(name, "", { path: "/", maxAge: 0, expires: new Date(0) });
        cookieStore.delete(name);
      } catch {}
    }
  } catch {}

  const response = NextResponse.redirect(new URL(targetUrl, req.url), { status: 303 });

  // 1. Delete all explicit known cookie names
  for (const name of COOKIES_TO_DELETE) {
    try {
      response.cookies.set(name, "", { path: "/", maxAge: 0, expires: new Date(0) });
      response.cookies.delete(name);
    } catch {}
  }

  // 2. Dynamically scan all incoming cookies and expire session/auth/token/csrf cookies (including chunked NextAuth)
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
        response.cookies.set(c.name, "", { path: "/", maxAge: 0, expires: new Date(0) });
        response.cookies.delete(c.name);
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
