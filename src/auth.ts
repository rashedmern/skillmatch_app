import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import { cookies } from "next/headers";
import { ValidationService } from "@/server/services/validationService";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId:
        process.env.GOOGLE_CLIENT_ID ||
        process.env.AUTH_GOOGLE_ID ||
        "demo-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ||
        process.env.AUTH_GOOGLE_SECRET ||
        "demo-google-client-secret",
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    GitHub({
      clientId:
        process.env.GITHUB_CLIENT_ID ||
        process.env.AUTH_GITHUB_ID ||
        "demo-github-client-id",
      clientSecret:
        process.env.GITHUB_CLIENT_SECRET ||
        process.env.AUTH_GITHUB_SECRET ||
        "demo-github-client-secret",
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

        let role = "CANDIDATE";
        try {
          const cookieStore = await cookies();
          const cookieRole = cookieStore.get("skillmatch_auth_role")?.value;
          if (cookieRole) {
            role = cookieRole.toUpperCase();
          }
        } catch {
          role = "CANDIDATE";
        }

        // Strict Candidate .edu Rule:
        // Candidates logging in via Google must possess a university institutional email
        if (role === "CANDIDATE") {
          const isEdu = ValidationService.isEduEmail(email);
          if (!isEdu) {
            // Reject and redirect to dedicated security restriction page with ?error=InvalidDomain
            return `/auth/error?error=InvalidDomain&email=${encodeURIComponent(email)}&role=CANDIDATE`;
          }
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
  secret:
    process.env.AUTH_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "skillmatch-dev-secret-32-character-salt-key-2026",
});
