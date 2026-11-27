import { config } from "dotenv";
import { PrismaClient } from "../generated/client";
import { PrismaPg } from "@prisma/adapter-pg";

// Resolve DATABASE_URL: the shell environment may inject a stale SQLite
// `file:` URL (from the fullstack-dev template) that shadows the real
// PostgreSQL URL defined in .env. Force dotenv to override the shell env
// so the .env value wins whenever it's a postgres URL.
config({ override: true });
const { parsed } = config({ path: ".env.local", override: true });
const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const connectionString =
  envUrl && envUrl.startsWith("postgres") ? envUrl : fileUrl ?? envUrl;
// One-time startup log so we can see what the running server is using.
console.log("[db.ts] DATABASE_URL resolution:", {
  envUrl_type: typeof envUrl, envUrl_starts_postgres: !!envUrl && envUrl.startsWith("postgres"),
  fileUrl_set: !!fileUrl, fileUrl_starts_postgres: !!fileUrl && fileUrl.startsWith("postgres"),
  resolved_starts_postgres: !!connectionString && connectionString.startsWith("postgres"),
  resolved_preview: connectionString ? connectionString.replace(/:[^:@]*@/, ":***@").slice(0, 80) : "(empty)",
});

if (!connectionString) {
  throw new Error("DATABASE_URL is not defined");
}

const adapter = new PrismaPg({
  connectionString,
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
