import { auth } from '@/auth';

/**
 * Lightweight session check for server components and server actions.
 *
 * In Auth.js v5, `auth()` replaces `getServerSession(authOptions)`.
 * It decodes the JWT from the cookie without hitting the database,
 * so it's safe to use in server components without pulling in Prisma
 * (which causes Turbopack crashes due to better-sqlite3 native bindings).
 *
 * Returns the session object (with user.id, user.role from JWT callbacks)
 * or null if not authenticated.
 */
export async function getSession() {
  try {
    return await auth();
  } catch {
    return null;
  }
}
