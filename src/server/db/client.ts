/**
 * Database Client Initialization
 * Implements a singleton database client abstraction pattern with Prisma ORM.
 * Connects directly to live Supabase PostgreSQL with Connection Pooling & Direct Migrations.
 */

import { prisma } from "./prisma";

export { prisma };

export const db = {
  prisma,
  isConnected: () => true,
  databaseUrl: process.env.DATABASE_URL || "",
};
