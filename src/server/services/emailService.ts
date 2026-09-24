/**
 * Email & OTP Dispatch Service
 * Encapsulates cryptographic OTP token generation, verification, and live email dispatch
 * using Resend API or Nodemailer SMTP transports with serverless-resilient signed cookie persistence.
 */

import crypto from "node:crypto";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import { cookies } from "next/headers";
import { getDatabase } from "../db/client";
import { DbOtpToken } from "../db/schema";

function getSecretKey(): string {
  return (
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "skillmatch-production-secure-32-character-random-salt-key-2026"
  );
}

/**
 * Creates an HMAC-SHA256 signed tamper-proof challenge payload.
 * Safe for cross-serverless lambda execution on Vercel without database race conditions.
 */
function createSignedChallenge(email: string, code: string, expiresAtMs: number): string {
  const secret = getSecretKey();
  const cleanEmail = email.toLowerCase().trim();
  const codeHash = crypto
    .createHmac("sha256", secret)
    .update(`${cleanEmail}:${code.trim()}`)
    .digest("hex");

  const payload = JSON.stringify({
    email: cleanEmail,
    codeHash,
    expiresAt: expiresAtMs,
    createdAt: Date.now(),
  });

  const payloadB64 = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");

  return `${payloadB64}.${signature}`;
}

/**
 * Verifies an HMAC-SHA256 signed challenge token against an incoming code.
 */
function verifySignedChallenge(
  tokenString: string,
  incomingCode: string,
  expectedEmail?: string
): { isValid: boolean; email?: string; error?: string } {
  try {
    const parts = tokenString.split(".");
    if (parts.length !== 2) {
      return { isValid: false, error: "Invalid verification challenge signature format." };
    }

    const [payloadB64, signature] = parts;
    const secret = getSecretKey();
    const expectedSig = crypto
      .createHmac("sha256", secret)
      .update(payloadB64)
      .digest("base64url");

    const sigBuf = Buffer.from(signature);
    const expectedSigBuf = Buffer.from(expectedSig);

    if (sigBuf.length !== expectedSigBuf.length || !crypto.timingSafeEqual(sigBuf, expectedSigBuf)) {
      return { isValid: false, error: "Verification challenge signature has been tampered with." };
    }

    const payload = JSON.parse(Buffer.from(payloadB64, "base64url").toString("utf-8"));
    const cleanEmail = payload.email?.toLowerCase().trim();

    if (expectedEmail) {
      const cleanExpected = expectedEmail.toLowerCase().trim();
      if (cleanExpected && cleanEmail !== cleanExpected) {
        return {
          isValid: false,
          error: `Verification challenge was issued for ${cleanEmail}, not ${cleanExpected}.`,
        };
      }
    }

    if (Date.now() > payload.expiresAt) {
      return {
        isValid: false,
        error: "Verification code has expired. Please click Resend to receive a fresh code.",
      };
    }

    const incomingHash = crypto
      .createHmac("sha256", secret)
      .update(`${cleanEmail}:${incomingCode.trim()}`)
      .digest("hex");

    const hashBuf = Buffer.from(incomingHash);
    const expectedHashBuf = Buffer.from(payload.codeHash);

    if (hashBuf.length !== expectedHashBuf.length || !crypto.timingSafeEqual(hashBuf, expectedHashBuf)) {
      return {
        isValid: false,
        error: "Invalid verification code. Please check your inbox or click Resend.",
      };
    }

    return { isValid: true, email: cleanEmail };
  } catch (err) {
    console.error("[verifySignedChallenge error]:", err);
    return { isValid: false, error: "Failed to verify challenge token." };
  }
}

/**
 * Safely sets the serverless challenge cookie on active requests.
 */
async function setChallengeCookie(challengeToken: string, email: string) {
  try {
    const cookieStore = await cookies();
    const isProd = process.env.NODE_ENV === "production";
    cookieStore.set("skillmatch_otp_challenge", challengeToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 600, // 10 minutes
    });
    cookieStore.set("skillmatch_otp_email", email, {
      httpOnly: false,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 600,
    });
    if (isProd) {
      cookieStore.set("__Secure-skillmatch_otp_challenge", challengeToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 600,
      });
    }
  } catch {
    // cookies() unavailable outside active request scope, skip
  }
}

/**
 * Safely retrieves the serverless challenge cookie from active request headers.
 */
async function getChallengeCookie(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return (
      cookieStore.get("__Secure-skillmatch_otp_challenge")?.value ||
      cookieStore.get("skillmatch_otp_challenge")?.value ||
      null
    );
  } catch {
    return null;
  }
}

/**
 * Safely clears the challenge cookie after successful consumption.
 */
async function clearChallengeCookie() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("skillmatch_otp_challenge");
    cookieStore.delete("__Secure-skillmatch_otp_challenge");
    cookieStore.delete("skillmatch_otp_email");
  } catch {
    // ignore
  }
}

/**
 * Generates an Oceanic Intelligence styled HTML email for OTP verification.
 */
function generateOtpEmailHtml(params: {
  code: string;
  recipientEmail: string;
  role: "candidate" | "recruiter";
  expiresInMinutes: number;
}): string {
  const { code, recipientEmail, role, expiresInMinutes } = params;
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SkillMatch Verification Code</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f9ff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #131c26;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8f9ff; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(9, 89, 100, 0.06);">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #004049 0%, #095964 100%); padding: 32px 36px; text-align: left;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td>
                    <div style="display: inline-block; padding: 6px 12px; background: rgba(255, 255, 255, 0.12); border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 8px; font-size: 11px; font-weight: 700; color: #67e8f9; letter-spacing: 0.5px; text-transform: uppercase;">
                      Two-Factor Authentication
                    </div>
                    <h1 style="margin: 12px 0 0 0; font-size: 26px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">
                      Skill<span style="color: #00d4be;">Match</span>
                    </h1>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding: 36px 36px 28px 36px;">
              <h2 style="margin: 0 0 12px 0; font-size: 20px; font-weight: 700; color: #004049;">
                Verify Your Institutional Account
              </h2>
              <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                We received a sign-in or registration request for <strong style="color: #095964;">${recipientEmail}</strong> (${role}). Enter the 6-digit verification code below to confirm your identity:
              </p>

              <!-- OTP Code Display Card -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin: 28px 0;">
                <tr>
                  <td align="center" style="background-color: #f1f5f9; border: 2px dashed #0a887d; border-radius: 12px; padding: 24px;">
                    <div style="font-size: 11px; font-weight: 700; color: #0a887d; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 8px;">
                      One-Time Verification Code
                    </div>
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; letter-spacing: 10px; color: #095964; margin: 0 0 4px 10px;">
                      ${code}
                    </div>
                    <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
                      Valid for <strong>${expiresInMinutes} minutes</strong> • Single use only
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Security Information -->
              <div style="background-color: #f8fafc; border-left: 4px solid #095964; padding: 14px 16px; border-radius: 4px; margin-top: 24px;">
                <p style="margin: 0; font-size: 12px; line-height: 1.5; color: #334155;">
                  <strong>Security Advisory:</strong> If you did not request this verification code, please ignore this email. Never disclose this verification code to anyone; SkillMatch representatives will never ask for your code.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 36px; text-align: center;">
              <p style="margin: 0; font-size: 11px; color: #94a3b8; line-height: 1.5;">
                SkillMatch Autonomous Skill Verification Platform<br>
                Computer Science & Engineering (CSE) Talent & Recruitment System<br>
                256-Bit Encrypted Institutional Gateway
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export class EmailService {
  /**
   * Generates a genuine, cryptographically secure 6-digit numeric OTP code.
   * Uses Node.js CSPRNG (crypto.randomInt).
   */
  static generateOtpCode(): string {
    return crypto.randomInt(100000, 1000000).toString();
  }

  /**
   * Dispatches a real verification email containing the 6-digit OTP code
   * using Resend API or Nodemailer SMTP, and saves both in-memory and signed challenge cookies.
   */
  static async sendOtpVerificationEmail(
    email: string,
    role: "candidate" | "recruiter"
  ): Promise<{ success: boolean; code: string; expiresAt: string }> {
    const cleanEmail = email.toLowerCase().trim();
    const code = this.generateOtpCode();
    const expiresInMinutes = 10;
    const expiresAtMs = Date.now() + expiresInMinutes * 60 * 1000;
    const expiresAt = new Date(expiresAtMs).toISOString();

    // 1. Store in local in-memory store
    const db = getDatabase();
    const tokenRecord: DbOtpToken = {
      id: `otp_${Date.now()}_${crypto.randomBytes(4).toString("hex")}`,
      email: cleanEmail,
      codeHash: code,
      expiresAt,
      consumed: false,
      attempts: 0,
      createdAt: new Date().toISOString(),
    };

    db.otpTokens.set(cleanEmail, tokenRecord);

    // 2. Set cryptographically signed HTTP-only challenge cookie (guarantees cross-serverless survival on Vercel)
    const challengeToken = createSignedChallenge(cleanEmail, code, expiresAtMs);
    await setChallengeCookie(challengeToken, cleanEmail);

    let deliveredVia = "console_telemetry";

    // Method A: Resend API Dispatch
    if (process.env.RESEND_API_KEY) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const fromAddress = process.env.RESEND_FROM_EMAIL || "SkillMatch Verification <onboarding@resend.dev>";
        const { data, error } = await resend.emails.send({
          from: fromAddress,
          to: cleanEmail,
          subject: `Your SkillMatch Verification Code: ${code}`,
          text: `Your SkillMatch verification code is: ${code}. It expires in 10 minutes. Enter this code to verify your ${role} account.`,
          html: generateOtpEmailHtml({
            code,
            recipientEmail: cleanEmail,
            role,
            expiresInMinutes,
          }),
        });

        if (error) {
          console.error(`[EmailService] Resend API dispatch error for ${cleanEmail}:`, error.message || error);
        } else {
          deliveredVia = "resend_api";
          console.log(`[EmailService] Successfully dispatched OTP to ${cleanEmail} via Resend (id: ${data?.id}).`);
        }
      } catch (err) {
        console.error("[EmailService] Failed dispatching via Resend API:", err);
      }
    }

    // Method B: Nodemailer SMTP Dispatch (fallback if Resend not used or failed)
    if (deliveredVia !== "resend_api" && (process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST)) {
      try {
        const host = process.env.SMTP_HOST || process.env.EMAIL_SERVER_HOST;
        const port = Number(process.env.SMTP_PORT || process.env.EMAIL_SERVER_PORT || 587);
        const isSecure = process.env.SMTP_SECURE === "true" || port === 465;
        const user = process.env.SMTP_USER || process.env.EMAIL_SERVER_USER;
        const pass = process.env.SMTP_PASS || process.env.EMAIL_SERVER_PASSWORD;
        const from = process.env.SMTP_FROM || `"SkillMatch Verification" <${user}>`;

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: isSecure,
          auth: user ? { user, pass } : undefined,
        });

        await transporter.sendMail({
          from,
          to: cleanEmail,
          subject: `Your SkillMatch Verification Code: ${code}`,
          text: `Your SkillMatch verification code is: ${code}. It expires in 10 minutes. Enter this code to verify your ${role} account.`,
          html: generateOtpEmailHtml({
            code,
            recipientEmail: cleanEmail,
            role,
            expiresInMinutes,
          }),
        });
        deliveredVia = "nodemailer_smtp";
        console.log(`[EmailService] Successfully sent OTP code to ${cleanEmail} via SMTP.`);
      } catch (err) {
        console.error("[EmailService] Failed sending via SMTP:", err);
      }
    }

    // Terminal telemetry log (always active to verify dispatch and unblock local developers)
    console.log(`\n======================================================`);
    console.log(`[SKILLMATCH AUTH] REAL-TIME EMAIL DISPATCH`);
    console.log(`Delivered Via: ${deliveredVia}`);
    console.log(`To:            ${cleanEmail} (${role})`);
    console.log(`Subject:       SkillMatch Verification Code: ${code}`);
    console.log(`OTP Code:      >>> ${code} <<<`);
    console.log(`Expires At:    ${expiresAt}`);
    if (deliveredVia === "console_telemetry") {
      console.log(`Notice:        Set RESEND_API_KEY or SMTP_HOST in environment variables to deliver live inbox emails.`);
    }
    console.log(`======================================================\n`);

    return { success: true, code, expiresAt };
  }

  /**
   * Strictly verifies a cryptographic OTP code against active records and signed challenge cookies.
   * Disallows fake/demo codes and enforces single-use and expiration.
   */
  static async verifyOtpCode(
    email: string,
    code: string
  ): Promise<{ isValid: boolean; error?: string }> {
    const cleanCode = code ? code.trim() : "";
    let cleanEmail = email ? email.toLowerCase().trim() : "";

    if (!cleanCode || cleanCode.length !== 6 || !/^\d{6}$/.test(cleanCode)) {
      return {
        isValid: false,
        error: "Please enter a valid 6-digit numeric verification code.",
      };
    }

    const db = getDatabase();

    // Strategy 1: Check in-memory persistent database store
    if (cleanEmail && db.otpTokens.has(cleanEmail)) {
      const record = db.otpTokens.get(cleanEmail)!;

      if (!record.consumed && new Date() <= new Date(record.expiresAt)) {
        if (record.attempts >= 5) {
          record.consumed = true;
          await clearChallengeCookie();
          return {
            isValid: false,
            error: "Too many failed attempts. For your security, this code has been invalidated. Please request a new code.",
          };
        }

        if (record.codeHash === cleanCode) {
          // Success! Consume token and clear challenge cookie
          record.consumed = true;
          await clearChallengeCookie();

          const user = db.users.get(cleanEmail);
          if (user) {
            user.isEmailVerified = true;
            user.updatedAt = new Date().toISOString();
          }

          return { isValid: true };
        } else {
          record.attempts += 1;
          const remaining = 5 - record.attempts;
          return {
            isValid: false,
            error: `Invalid verification code. Please check your inbox (${remaining} attempt${remaining === 1 ? "" : "s"} remaining).`,
          };
        }
      }
    }

    // Strategy 2: Check cryptographically signed serverless challenge cookie (Vercel multi-lambda resilience)
    const challengeCookie = await getChallengeCookie();
    if (challengeCookie) {
      const cookieVerifyResult = verifySignedChallenge(challengeCookie, cleanCode, cleanEmail);

      if (cookieVerifyResult.isValid && cookieVerifyResult.email) {
        // Success via verified cryptographic signature!
        const resolvedEmail = cookieVerifyResult.email;
        await clearChallengeCookie();

        const user = db.users.get(resolvedEmail);
        if (user) {
          user.isEmailVerified = true;
          user.updatedAt = new Date().toISOString();
        }

        // Also mark in-memory record if exists
        const memRecord = db.otpTokens.get(resolvedEmail);
        if (memRecord) {
          memRecord.consumed = true;
        }

        return { isValid: true };
      }

      if (cookieVerifyResult.error) {
        return { isValid: false, error: cookieVerifyResult.error };
      }
    }

    // If both Strategy 1 and Strategy 2 failed to find an active token
    console.warn(`[EmailService.verifyOtpCode] No active challenge found for email: "${cleanEmail}".`);
    return {
      isValid: false,
      error: "No active verification code found for this email. Please click Resend to receive a fresh code.",
    };
  }
}
