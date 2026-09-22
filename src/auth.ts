import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { ValidationService } from "@/server/services/validationService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "demo-google-client-id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo-google-client-secret",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const email = user.email?.toLowerCase().trim() || "";

        // Strict Candidate .edu Rule:
        // Candidates logging in via Google must possess a university institutional email
        const isEdu = ValidationService.isEduEmail(email);
        if (!isEdu) {
          // Reject and redirect to dedicated security restriction page
          return `/auth/error?error=invalid_domain&email=${encodeURIComponent(email)}&role=candidate`;
        }
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs or defaults to /dashboard
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/dashboard`;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
  trustHost: true,
  secret: process.env.AUTH_SECRET || "skillmatch-dev-secret-32-character-salt-key-2026",
});
