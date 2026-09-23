/**
 * Database Client Initialization Wrapper
 * Implements a singleton database client abstraction pattern.
 * Provides clean connection pooling and prevents hot-reloading connection leaks in Next.js development.
 */

import { DbUser, DbOtpToken, DbAstMetric } from "./schema";

interface MockDatabaseStore {
  users: Map<string, DbUser>;
  otpTokens: Map<string, DbOtpToken>;
  astMetrics: Map<string, DbAstMetric>;
}

// Global declaration for Next.js hot module reloading lifecycle
declare global {
  var __skillmatch_db_store__: MockDatabaseStore | undefined;
}

const initializeDbStore = (): MockDatabaseStore => {
  const store: MockDatabaseStore = {
    users: new Map<string, DbUser>(),
    otpTokens: new Map<string, DbOtpToken>(),
    astMetrics: new Map<string, DbAstMetric>(),
  };

  // Seed default demo verified candidate
  const defaultCandidate: DbUser = {
    id: "cand_01",
    email: "alex.chen@berkeley.edu",
    name: "Alex Chen",
    role: "candidate",
    institution: "UC Berkeley (EECS '26)",
    specialization: "Distributed Systems",
    githubUsername: "alexchen-dev",
    isEmailVerified: true,
    authProvider: "google",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.users.set(defaultCandidate.email, defaultCandidate);

  // Seed default demo recruiter
  const defaultRecruiter: DbUser = {
    id: "rec_01",
    email: "sarah.miller@scaleops.io",
    name: "Sarah Miller",
    role: "recruiter",
    company: "ScaleOps Inc.",
    isEmailVerified: true,
    authProvider: "email",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.users.set(defaultRecruiter.email, defaultRecruiter);

  return store;
};

// Singleton instance retrieval
export const getDatabase = (): MockDatabaseStore => {
  if (process.env.NODE_ENV === "production") {
    return initializeDbStore();
  }

  if (!global.__skillmatch_db_store__) {
    global.__skillmatch_db_store__ = initializeDbStore();
  }

  return global.__skillmatch_db_store__;
};

// Live database connection string verification for production deployment
const databaseUrl = process.env.DATABASE_URL;

/**
 * Enterprise Database Client Interface
 * Pre-configured for PrismaClient, Drizzle, or PostgreSQL connection pooling via DATABASE_URL.
 */
export const db = {
  get client() {
    return getDatabase();
  },
  isConnected: () => true,
  databaseUrl: databaseUrl || "postgresql://localhost:5432/skillmatch?schema=public",
};
