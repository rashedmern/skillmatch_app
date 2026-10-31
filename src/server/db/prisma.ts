import { PrismaClient } from "@prisma/client";

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
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

globalForPrisma.prisma = prisma;

export default prisma;
