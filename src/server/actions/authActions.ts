"use server";

/**
 * Server Actions: Authentication, OTP & Verification
 * Dedicated Next.js Server Actions with strict execution boundaries.
 */

import { AuthService } from "../services/authService";
import { EmailService } from "../services/emailService";
import { DbUser } from "../db/schema";

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface AuthSuccessPayload {
  user: DbUser;
  redirectUrl: string;
  otpCode?: string;
}

/**
 * Server Action for credential login.
 */
export async function loginAction(formData: {
  email: string;
  password?: string;
  role: "candidate" | "recruiter";
}): Promise<ActionResponse<AuthSuccessPayload>> {
  try {
    const result = await AuthService.loginWithCredentials(formData.email, formData.password, formData.role);

    if (!result.success || !result.user) {
      return { success: false, error: result.error || "Authentication failed." };
    }

    return {
      success: true,
      data: {
        user: result.user,
        otpCode: result.otpCode,
        redirectUrl: `/auth/verify-otp?email=${encodeURIComponent(formData.email)}&role=${formData.role}`,
      },
    };
  } catch (error) {
    console.error("[loginAction error]:", error);
    return { success: false, error: "An unexpected server error occurred during login." };
  }
}

/**
 * Server Action for registration.
 */
export async function registerAction(formData: {
  name: string;
  email: string;
  password?: string;
  role: "candidate" | "recruiter";
  specialization?: string;
  company?: string;
}): Promise<ActionResponse<AuthSuccessPayload>> {
  try {
    const result = await AuthService.register(formData);

    if (!result.success || !result.user) {
      return { success: false, error: result.error || "Registration failed." };
    }

    return {
      success: true,
      data: {
        user: result.user,
        otpCode: result.otpCode,
        redirectUrl: `/auth/verify-otp?email=${encodeURIComponent(formData.email)}&role=${formData.role}&name=${encodeURIComponent(formData.name)}`,
      },
    };
  } catch (error) {
    console.error("[registerAction error]:", error);
    return { success: false, error: "An unexpected server error occurred during registration." };
  }
}

/**
 * Server Action for OTP verification.
 */
export async function verifyOtpAction(formData: {
  email: string;
  code: string;
}): Promise<ActionResponse<{ redirectUrl: string }>> {
  try {
    const result = await EmailService.verifyOtpCode(formData.email, formData.code);

    if (!result.isValid) {
      return { success: false, error: result.error || "Invalid verification code." };
    }

    return {
      success: true,
      data: {
        redirectUrl: "/dashboard",
      },
    };
  } catch (error) {
    console.error("[verifyOtpAction error]:", error);
    return { success: false, error: "Server error occurred while validating code." };
  }
}

/**
 * Server Action for resending OTP code.
 */
export async function resendOtpAction(formData: {
  email: string;
  role: "candidate" | "recruiter";
}): Promise<ActionResponse<{ sentAt: string; otpCode?: string }>> {
  try {
    const result = await EmailService.sendOtpVerificationEmail(formData.email, formData.role);
    return {
      success: true,
      data: {
        sentAt: result.expiresAt,
        otpCode: result.code,
      },
    };
  } catch (error) {
    console.error("[resendOtpAction error]:", error);
    return { success: false, error: "Failed to resend verification code." };
  }
}

/**
 * Server Action for Google SSO with institutional check.
 */
export async function googleAuthAction(formData: {
  email: string;
  name: string;
  role: "candidate" | "recruiter";
}): Promise<ActionResponse<AuthSuccessPayload>> {
  try {
    const result = await AuthService.handleGoogleOAuth(formData.email, formData.name, formData.role);

    if (!result.success || !result.user) {
      return { success: false, error: result.error || "Google authentication failed." };
    }

    return {
      success: true,
      data: {
        user: result.user,
        otpCode: result.otpCode,
        redirectUrl: `/auth/verify-otp?email=${encodeURIComponent(formData.email)}&role=${formData.role}&provider=google`,
      },
    };
  } catch (error) {
    console.error("[googleAuthAction error]:", error);
    return { success: false, error: "Server error during Google authorization." };
  }
}

/**
 * Server Action for GitHub developer authentication.
 */
export async function githubAuthAction(formData: {
  githubUsername: string;
  email: string;
  role: "candidate" | "recruiter";
}): Promise<ActionResponse<AuthSuccessPayload>> {
  try {
    const result = await AuthService.handleGithubOAuth(
      formData.githubUsername,
      formData.email,
      formData.role
    );

    if (!result.success || !result.user) {
      return { success: false, error: result.error || "GitHub authorization failed." };
    }

    return {
      success: true,
      data: {
        user: result.user,
        otpCode: result.otpCode,
        redirectUrl: `/auth/verify-otp?email=${encodeURIComponent(formData.email)}&role=${formData.role}&provider=github&gh=${encodeURIComponent(formData.githubUsername)}`,
      },
    };
  } catch (error) {
    console.error("[githubAuthAction error]:", error);
    return { success: false, error: "Server error during GitHub authorization." };
  }
}
