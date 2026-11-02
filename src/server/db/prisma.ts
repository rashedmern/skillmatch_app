import { PrismaClient } from "@prisma/client";

const SUPABASE_DB_URL =
  process.env.DATABASE_URL ||
  "postgresql://postgres.hpogiqpiicwphpkoggqz:fuckurself1234@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres";

if (!process.env.DATABASE_URL) {
  process.env.DATABASE_URL = SUPABASE_DB_URL;
}

if (!process.env.DIRECT_URL) {
  process.env.DIRECT_URL = SUPABASE_DB_URL;
}

/**
 * Global singleton pattern for PrismaClient in Next.js.
 * Prevents multiple instances of PrismaClient in development during HMR
 * and reuses connection pool across warm serverless functions on Vercel.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    datasources: {
      db: {
        url: SUPABASE_DB_URL,
      },
    },
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

globalForPrisma.prisma = prisma;

export default prisma;
