/**
 * Email & OTP Dispatch Service
 * Encapsulates cryptographic OTP token generation, verification, and email dispatch telemetry.
 */

import { getDatabase } from "../db/client";
import { DbOtpToken } from "../db/schema";

export class EmailService {
  /**
   * Generates a 6-digit numeric OTP code.
   */
  static generateOtpCode(): string {
    // In production, use crypto.randomInt(100000, 999999)
    return Math.floor(100000 + Math.random() * 900000).toString();
  }

  /**
   * Dispatches a verification email containing a 6-digit OTP.
   * Stores the token record with a 10-minute expiration window.
   */
  static async sendOtpVerificationEmail(
    email: string,
    role: "candidate" | "recruiter"
  ): Promise<{ success: boolean; code: string; expiresAt: string }> {
    const code = this.generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // 10 minutes

    const db = getDatabase();
    const tokenRecord: DbOtpToken = {
      id: `otp_${Date.now()}`,
      email: email.toLowerCase().trim(),
      codeHash: code, // In production, hash with argon2 or bcrypt
      expiresAt,
      consumed: false,
      attempts: 0,
      createdAt: new Date().toISOString(),
    };

    db.otpTokens.set(tokenRecord.email, tokenRecord);

    // Telemetry log for simulation & development testing
    console.log(`\n========================================`);
    console.log(`[AUTH SERVICE - EMAIL DISPATCH SIMULATION]`);
    console.log(`To: ${email} (${role})`);
    console.log(`Subject: SkillMatch Two-Factor Verification Code`);
    console.log(`OTP Code: >>> ${code} <<<`);
    console.log(`Expires At: ${expiresAt}`);
    console.log(`========================================\n`);

    return { success: true, code, expiresAt };
  }

  /**
   * Verifies an OTP code against active records.
   */
  static async verifyOtpCode(
    email: string,
    code: string
  ): Promise<{ isValid: boolean; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();
    const cleanCode = code.trim();

    // Universal demo testing bypass code
    if (cleanCode === "123456") {
      return { isValid: true };
    }

    const db = getDatabase();
    const record = db.otpTokens.get(cleanEmail);

    if (!record) {
      // If no token exists in mock store, accept valid 6-digit code for smooth prototype flow
      if (/^\d{6}$/.test(cleanCode)) {
        return { isValid: true };
      }
      return {
        isValid: false,
        error: "No active verification code found for this email. Please request a new code.",
      };
    }

    if (record.consumed) {
      return { isValid: false, error: "This verification code has already been used." };
    }

    if (new Date() > new Date(record.expiresAt)) {
      return { isValid: false, error: "Verification code has expired. Please request a new code." };
    }

    if (record.codeHash !== cleanCode) {
      record.attempts += 1;
      return {
        isValid: false,
        error: "Invalid verification code. Please check your inbox or click Resend.",
      };
    }

    // Mark as consumed
    record.consumed = true;
    return { isValid: true };
  }
}
