/**
 * Validation Service
 * Encapsulates all domain and security validation rules.
 */

export class ValidationService {
  /**
   * Validates whether an email belongs to an accredited university institutional domain (.edu).
   */
  static isEduEmail(email: string): boolean {
    if (!email || typeof email !== "string") return false;
    const cleanEmail = email.trim().toLowerCase();
    // Matches .edu or international institutional subdomains like .ac.uk, .edu.au
    return (
      cleanEmail.endsWith(".edu") ||
      /\.(edu\.[a-z]{2}|ac\.[a-z]{2})$/.test(cleanEmail) ||
      cleanEmail.includes(".edu.")
    );
  }

  /**
   * Enforces security policy: Candidates MUST register/authenticate with a valid .edu email.
   * Throws or returns standard validation error.
   */
  static validateCandidateEmail(email: string): { isValid: boolean; error?: string } {
    if (!email || !email.includes("@")) {
      return { isValid: false, error: "Please enter a valid email address." };
    }

    if (!this.isEduEmail(email)) {
      return {
        isValid: false,
        error: "Candidate registration requires a valid university institutional (.edu) email.",
      };
    }

    return { isValid: true };
  }

  /**
   * Validates full registration payload according to role constraints.
   */
  static validateRegistration(data: {
    name: string;
    email: string;
    password?: string;
    role: "candidate" | "recruiter";
    institution?: string;
    company?: string;
  }): { isValid: boolean; error?: string } {
    if (!data.name || data.name.trim().length < 2) {
      return { isValid: false, error: "Full name must be at least 2 characters." };
    }

    if (!data.email || !data.email.includes("@")) {
      return { isValid: false, error: "Please provide a valid email address." };
    }

    // Role-specific check
    if (data.role === "candidate") {
      const eduCheck = this.validateCandidateEmail(data.email);
      if (!eduCheck.isValid) {
        return eduCheck;
      }
    } else if (data.role === "recruiter") {
      if (data.company && data.company.trim().length < 2) {
        return { isValid: false, error: "Please specify your company or organization name." };
      }
    }

    if (data.password && data.password.length < 8) {
      return { isValid: false, error: "Password must be at least 8 characters long." };
    }

    return { isValid: true };
  }

  /**
   * Validates 6-digit numeric OTP.
   */
  static validateOtpCode(code: string): boolean {
    return /^\d{6}$/.test(code.trim());
  }
}
