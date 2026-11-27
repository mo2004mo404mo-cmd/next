// lib/prisma.ts — project-root Prisma client singleton.
//
// auth.ts imports `prisma` from "../lib/prisma" — relative to src/auth.ts,
// that resolves to /tmp/my-project/lib/prisma.ts (THIS file), NOT
// /tmp/my-project/src/lib/prisma.ts. Both files coexist for historical
// reasons; this one is the one actually used by the auth flow.
//
// The resolver matches src/lib/db.ts: prefer a postgres:// URL from either
// the shell env or .env.local, falling back to .env, and never trusting a
// stale SQLite file: URL injected by the platform boot script.

import { PrismaClient } from "@/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { config } from "dotenv";

// Load .env first, then .env.local (overrides). The platform boot script
// rewrites .env with a stale SQLite DATABASE_URL on every recycle, so
// .env.local is the persistent source of truth.
config({ override: true });
const { parsed } = config({ path: ".env.local", override: true });

const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const resolvedUrl =
  envUrl && envUrl.startsWith("postgres") ? envUrl
  : fileUrl && fileUrl.startsWith("postgres") ? fileUrl
  : envUrl ?? fileUrl;

if (!resolvedUrl) {
  throw new Error("DATABASE_URL is not defined");
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const adapter = new PrismaPg({ connectionString: resolvedUrl });

// Reuse the existing global prisma instance if present (same pattern as
// src/lib/db.ts) — this avoids spawning a second PrismaClient + connection
// pool when both this module and db.ts are imported in the same process.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
