import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "../lib/prisma";
import { db } from "@/lib/db";
import { logAudit } from "../lib/logger";
import { compare } from "bcryptjs";

// ─────────────────────────────────────────────────────────────────────────
// Auth.js v5 configuration
//
// Key v5 changes from v4:
//  - Uses `export const { handlers, auth, signIn, signOut } = NextAuth(...)`
//    instead of exporting `authOptions` + separate route handler
//  - `auth()` is a server-side function (replaces getServerSession)
//  - `signIn()` works in Server Actions (not just client-side)
//  - `handlers` replaces the `[...nextauth]/route.ts` catch-all handler
//  - Cookie name changes from `next-auth.session-token` to
//    `authjs.session-token` (default in v5)
// ─────────────────────────────────────────────────────────────────────────

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db) as any,
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,
    Facebook,
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          !credentials?.email ||
          !credentials?.password
        ) {
          throw new Error("Invalid credentials");
        }

        const email = String(credentials.email);
        const password = String(credentials.password);

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
          // return null;
        }
        // Check if email is verified
        if (!user.emailVerified) {
          logAudit("AUTH_FAILURE", { email: credentials.email, userId: user.id, reason: "email_not_verified" });
          throw new Error("Please verify your email before signing in");
        }
        const passwordMatches = await compare(
          password,
          user.password
        );

        if (!passwordMatches) {
          logAudit("AUTH_FAILURE", { email: credentials.email, userId: user.id, reason: "invalid_password" });
          throw new Error("Invalid credentials");
        }

        // ── Admin moderation enforcement ──
        if (user.status === "banned") {
          throw new Error("banned:" + (user.bannedReason || "Your account has been banned."));
        }
        if (user.status === "suspended") {
          if (user.suspendedUntil && user.suspendedUntil.getTime() < Date.now()) {
            await db.user.update({
              where: { id: user.id },
              data: { status: "active", suspendedUntil: null, suspendedReason: null },
            });
          } else {
            const until = user.suspendedUntil
              ? new Date(user.suspendedUntil).toISOString()
              : "indefinite";
            throw new Error("suspended:Your account is suspended until " + until + ".");
          }
        }
        logAudit("AUTH_SUCCESS", { userId: user.id, email: user.email, method: "credentials" });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          role: user.role as "USER" | "MANAGER" | "ADMIN",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;

      const pathname = request.nextUrl.pathname;

      const protectedRoutes = [
        "/dashboard",
        "/admin",
        "/manager",
      ];

      const isProtected = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );

      if (isProtected && !isLoggedIn) {
        return false;
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
