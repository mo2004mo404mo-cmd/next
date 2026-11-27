// prisma.config.ts

import { config } from "dotenv";
import { defineConfig, env } from "prisma/config";

// Resolve DATABASE_URL: prefer a valid PostgreSQL URL from the environment,
// but fall back to the .env file value when the injected shell env is stale
// (e.g. platform-injected SQLite `file:` URLs from a previous template).
// Load .env first, then .env.local (overrides). The platform boot script
// rewrites /tmp/my-project/.env with a stale SQLite URL on every recycle,
// so .env.local is the persistent source of truth for DATABASE_URL.
config();
const { parsed } = config({ path: ".env.local" });
const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const resolvedUrl =
  envUrl && envUrl.startsWith("postgres") ? envUrl
  : fileUrl && fileUrl.startsWith("postgres") ? fileUrl
  : envUrl ?? fileUrl;

export default defineConfig({
  schema: "./prisma/schema.prisma",

  migrations: {
    path: "./prisma/migrations",
  },

  datasource: {
    url: resolvedUrl,
  },
});
