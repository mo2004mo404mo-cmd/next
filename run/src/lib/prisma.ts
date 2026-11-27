/**
 * Prisma client singleton.
 *
 * Re-exports the `db` instance from db.ts (the canonical PrismaClient built
 * with the PrismaPg adapter and the .env.local-aware connection resolver).
 * Some legacy code (notably src/auth.ts) imports `prisma` from this path
 * instead of `db` from `@/lib/db` — both names point at the same instance.
 *
 * Keeping a single source of truth for the client avoids the long-running
 * "two PrismaClient instances exhaust the connection pool" footgun.
 */
export { db as prisma, db as default } from './db';
