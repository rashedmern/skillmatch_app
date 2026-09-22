/**
 * NextAuth.js (Auth.js v5) App Router Catch-all Route Handler
 * Configures GET and POST handlers for OAuth providers (Google), sessions, and CSRF.
 * 
 * Providers configured in @/auth:
 * - Google OAuth 2.0 (GOOGLE_CLIENT_ID & GOOGLE_CLIENT_SECRET)
 *   with prompt="select_account" for multi-account chooser.
 * - Strict Candidate institutional (.edu) validation in signIn callback.
 */
import { handlers } from "@/auth";

export const { GET, POST } = handlers;

