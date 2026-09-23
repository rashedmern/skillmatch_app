export type UserRole = "candidate" | "recruiter";

export type AuthProviderType = "email" | "google" | "github";

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution?: string;
  company?: string;
  specialization?: string;
  githubUsername?: string;
  isVerified: boolean;
  authProvider: AuthProviderType;
  verifiedAt?: string;
}

export interface PendingAuth {
  email: string;
  name?: string;
  role: UserRole;
  authProvider: AuthProviderType;
  institution?: string;
  company?: string;
  specialization?: string;
  githubUsername?: string;
  otpCode: string;
  expiresAt: number;
}
