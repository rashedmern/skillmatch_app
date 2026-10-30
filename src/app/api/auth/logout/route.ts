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
  try {
    const cookieStore = await cookies();
    for (const name of COOKIES_TO_DELETE) {
      try {
        cookieStore.set(name, "", { path: "/", maxAge: 0, expires: new Date(0) });
        cookieStore.delete(name);
      } catch {}
    }
  } catch {}

  const response = NextResponse.redirect(new URL("/", req.url), { status: 303 });
  for (const name of COOKIES_TO_DELETE) {
    try {
      response.cookies.set(name, "", { path: "/", maxAge: 0, expires: new Date(0) });
      response.cookies.delete(name);
    } catch {}
  }

  return response;
}

export async function GET(req: NextRequest) {
  return handleLogout(req);
}

export async function POST(req: NextRequest) {
  return handleLogout(req);
}
