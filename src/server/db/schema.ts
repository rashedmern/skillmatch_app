/**
 * Database Schema Definitions & Data Transfer Objects (DTOs)
 * Enterprise-grade relational data contracts for SkillMatch.
 */

export interface DbUser {
  id: string;
  email: string;
  passwordHash?: string;
  name: string;
  role: "candidate" | "recruiter";
  institution?: string;
  company?: string;
  specialization?: string;
  githubUsername?: string;
  isEmailVerified: boolean;
  authProvider: "email" | "google" | "github";
  createdAt: string;
  updatedAt: string;
}

export interface DbOtpToken {
  id: string;
  userId?: string;
  email: string;
  codeHash: string;
  expiresAt: string;
  consumed: boolean;
  attempts: number;
  createdAt: string;
}

export interface DbAstMetric {
  id: string;
  candidateId: string;
  repositoryUrl: string;
  commitHash: string;
  overallScore: number;
  percentile: number;
  nodesAnalyzed: number;
  algorithmicScore: number;
  concurrencyScore: number;
  memorySafetyScore: number;
  verifiedAt: string;
}

export interface DbSession {
  id: string;
  userId: string;
  token: string;
  ipAddress?: string;
  userAgent?: string;
  expiresAt: string;
  createdAt: string;
}
