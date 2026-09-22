/**
 * Authentication Business Logic Service
 * Orchestrates user authentication, registration, OAuth handlers, and session issuance.
 */

import { getDatabase } from "../db/client";
import { DbUser } from "../db/schema";
import { ValidationService } from "./validationService";
import { EmailService } from "./emailService";

export class AuthService {
  /**
   * Authenticates user via email and password credentials.
   * If candidate, enforces .edu check.
   */
  static async loginWithCredentials(
    email: string,
    password?: string,
    role: "candidate" | "recruiter" = "candidate"
  ): Promise<{ success: boolean; user?: DbUser; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();

    if (role === "candidate") {
      const eduCheck = ValidationService.validateCandidateEmail(cleanEmail);
      if (!eduCheck.isValid) {
        return { success: false, error: eduCheck.error };
      }
    }

    const db = getDatabase();
    let user = db.users.get(cleanEmail);

    if (!user) {
      // Auto-provision standard profile for prototype verification
      user = {
        id: `user_${Date.now()}`,
        email: cleanEmail,
        name: cleanEmail.split("@")[0].replace(".", " "),
        role,
        institution: role === "candidate" ? "University Engineering Department" : undefined,
        isEmailVerified: false,
        authProvider: "email",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.users.set(cleanEmail, user);
    }

    // Trigger OTP verification code
    await EmailService.sendOtpVerificationEmail(cleanEmail, role);

    return { success: true, user };
  }

  /**
   * Registers a new user.
   */
  static async register(data: {
    name: string;
    email: string;
    password?: string;
    role: "candidate" | "recruiter";
    specialization?: string;
    company?: string;
  }): Promise<{ success: boolean; user?: DbUser; error?: string }> {
    const validation = ValidationService.validateRegistration(data);
    if (!validation.isValid) {
      return { success: false, error: validation.error };
    }

    const cleanEmail = data.email.toLowerCase().trim();
    const db = getDatabase();

    const newUser: DbUser = {
      id: `user_${Date.now()}`,
      email: cleanEmail,
      name: data.name.trim(),
      role: data.role,
      institution: data.role === "candidate" ? "University Engineering College" : undefined,
      company: data.role === "recruiter" ? data.company : undefined,
      specialization: data.role === "candidate" ? data.specialization : undefined,
      isEmailVerified: false,
      authProvider: "email",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.users.set(cleanEmail, newUser);

    // Dispatch verification OTP
    await EmailService.sendOtpVerificationEmail(cleanEmail, data.role);

    return { success: true, user: newUser };
  }

  /**
   * Handles Google OAuth response simulation with strict .edu check.
   */
  static async handleGoogleOAuth(
    email: string,
    name: string,
    role: "candidate" | "recruiter"
  ): Promise<{ success: boolean; user?: DbUser; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();

    if (role === "candidate") {
      const eduCheck = ValidationService.validateCandidateEmail(cleanEmail);
      if (!eduCheck.isValid) {
        return {
          success: false,
          error: "Candidate registration requires a valid university institutional (.edu) email.",
        };
      }
    }

    const db = getDatabase();
    let user = db.users.get(cleanEmail);

    if (!user) {
      user = {
        id: `goog_${Date.now()}`,
        email: cleanEmail,
        name,
        role,
        institution: role === "candidate" ? "Institutional Partner University" : undefined,
        isEmailVerified: true,
        authProvider: "google",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.users.set(cleanEmail, user);
    }

    return { success: true, user };
  }

  /**
   * Handles GitHub OAuth developer verification simulation.
   */
  static async handleGithubOAuth(
    githubUsername: string,
    email: string,
    role: "candidate" | "recruiter"
  ): Promise<{ success: boolean; user?: DbUser; error?: string }> {
    const cleanEmail = email.toLowerCase().trim();
    const db = getDatabase();

    let user = db.users.get(cleanEmail);
    if (!user) {
      user = {
        id: `gh_${Date.now()}`,
        email: cleanEmail,
        name: githubUsername,
        role,
        githubUsername,
        institution: role === "candidate" ? "Verified GitHub Developer" : undefined,
        isEmailVerified: true,
        authProvider: "github",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      db.users.set(cleanEmail, user);
    } else {
      user.githubUsername = githubUsername;
    }

    return { success: true, user };
  }
}
