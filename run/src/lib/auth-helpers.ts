/**
 * Authentication utilities shared across API routes.
 *
 * The helpers resolve the active user from both the authenticated session and
 * guest-user fallbacks so route handlers can safely support both signed-in and
 * anonymous traffic without duplicating auth logic in each endpoint.
 */
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "./db";
import { getGuestUserId } from "./guest-user";

/**
 * Get the current authenticated user via Auth.js v5 `auth()`.
 * Replaces the v4 `getServerSession(authOptions)` pattern.
 * `auth()` reads the JWT from the cookie — no DB query needed.
 */
export async function getCurrentUser() {
  const session = await auth();
  return session?.user ?? null;
}

// ─────────────────────────────────────────────────────────────────────────
// Stale-session guard.
//
// JWT sessions are stateless: `auth()` happily returns a user id for an
// account that no longer exists in this database (deleted user, or a cookie
// carried over from a previous/re-seeded environment). Any FK-constrained
// create (subscription, wallet, knowledge source, question…) would then
// throw P2003 and 500. resolveUserId() therefore verifies the session user
// actually exists and silently falls back to the guest account otherwise;
// signing in again issues a fresh, valid token.
// ─────────────────────────────────────────────────────────────────────────
const USER_EXISTS_TTL_MS = 5 * 60 * 1000;
const USER_EXISTS_CACHE_MAX = 500;
const userExistsCache = new Map<string, { exists: boolean; at: number }>();

async function sessionUserExists(userId: string): Promise<boolean> {
  const now = Date.now();
  const hit = userExistsCache.get(userId);
  if (hit && now - hit.at < USER_EXISTS_TTL_MS) return hit.exists;
  try {
    const found = await db.user.findUnique({ where: { id: userId }, select: { id: true } });
    if (userExistsCache.size >= USER_EXISTS_CACHE_MAX) userExistsCache.clear();
    userExistsCache.set(userId, { exists: found !== null, at: now });
    return found !== null;
  } catch {
    // DB hiccup — trust the token rather than logging everyone out
    return true;
  }
}

// ─────────────────────────────────────────────────────────────────────────
// resolveUserId() — canonical auth-optional helper.
//
// Returns the authenticated user's id if a session exists, otherwise
// falls back to the per-browser guest id. Uses Auth.js v5 `auth()`.
// ─────────────────────────────────────────────────────────────────────────
export async function resolveUserId(): Promise<string> {
  const user = await getCurrentUser();
  const userId = (user as { id?: string } | null)?.id;
  if (userId) {
    if (await sessionUserExists(userId)) return userId;
    // Stale session: token references a user that no longer exists in this
    // database. Fall back to the guest account so FK-constrained creates
    // keep working; a fresh sign-in restores the real identity.
    console.warn(`[auth] session user ${userId} not found in DB — falling back to guest`);
  }
  return getGuestUserId();
}

// ─────────────────────────────────────────────────────────────────────────
// HTTP response helpers for API routes.
// These return proper NextResponse objects with the right status code + JSON
// body, so route handlers can `return unauthorized()` instead of building
// the response manually each time.
// ─────────────────────────────────────────────────────────────────────────

export function unauthorized(message = "Unauthorized") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function forbidden(message = "Forbidden: Insufficient permissions") {
  return NextResponse.json({ error: message }, { status: 403 });
}

export function badRequest(message = "Bad request") {
  return NextResponse.json({ error: message }, { status: 400 });
}

export function notFound(message = "Not found") {
  return NextResponse.json({ error: message }, { status: 404 });
}

// ─────────────────────────────────────────────────────────────────────────
// withAuth() — higher-order wrapper for API route handlers.
//
// Replaces the manual `const session = await getServerSession(); if (!session)
// return unauthorized();` boilerplate that's duplicated across 29+ routes.
//
// Usage:
//   export const GET = withAuth(async (req, ctx) => {
//     // ctx.user is guaranteed non-null here
//     return NextResponse.json({ id: ctx.user.id });
//   });
//
//   // With role check:
//   export const GET = withAuth(
//     async (req, ctx) => NextResponse.json({ ok: true }),
//     { requiredRole: 'admin' }
//   );
// ─────────────────────────────────────────────────────────────────────────

export type AuthContext = {
  user: { id: string; email: string; name?: string | null; role?: string };
  userId: string;
};

type Handler<TParams = Record<string, string>> = (
  req: Request,
  ctx: AuthContext & { params: TParams }
) => Promise<Response> | Response;

export function withAuth<TParams extends Record<string, string> = Record<string, string>>(
  handler: Handler<TParams>,
  options: { requiredRole?: string; requiredRoles?: string[] } = {}
) {
  return async (req: Request, context?: { params: Promise<TParams> } | TParams): Promise<Response> => {
    let user: Awaited<ReturnType<typeof getCurrentUser>>;
    try {
      user = await getCurrentUser();
    } catch (e) {
      console.error('[withAuth] getCurrentUser failed:', e);
      return unauthorized('Authentication failed');
    }

    if (!user) return unauthorized();

    const userObj = user as any;
    if (!userObj.id) {
      console.warn('[withAuth] Session user has no id field');
      return unauthorized('Invalid session');
    }

    if (options.requiredRole && userObj.role !== options.requiredRole) {
      return forbidden(`Requires ${options.requiredRole} role`);
    }
    if (options.requiredRoles && !options.requiredRoles.includes(userObj.role)) {
      return forbidden(`Requires one of: ${options.requiredRoles.join(', ')}`);
    }

    // Next.js 16 passes the second arg as { params: Promise<...> }.
    // Resolve to a plain TParams object regardless of the input shape.
    let params: TParams;
    if (context === undefined) {
      params = {} as TParams;
    } else if (context instanceof Promise) {
      // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
      params = await context;
    } else if (typeof context === 'object' && context !== null && 'params' in context) {
      // Next.js 16 shape: { params: Promise<TParams> }
      const rawParams = (context as { params: Promise<TParams> | TParams }).params;
      params = rawParams instanceof Promise ? await rawParams : (rawParams as TParams);
    } else {
      // Already-resolved params object (Next.js 15 or earlier).
      params = context as TParams;
    }

    return handler(req, { user: userObj, userId: userObj.id, params });
  };
}

/**
 * @deprecated Use `resolveUserId()` for auth-optional routes (returns a guest
 * id when there's no session), or `apiHandler()` / `withAuth()` for routes
 * that require authentication (they return a proper 401 NextResponse).
 *
 * Resilient auth helper for API routes.
 * Uses Auth.js v5 `auth()` first, then falls back to x-user-id header.
 * Returns the userId string or null if unauthenticated.
 */
export async function getAuthenticatedUserId(req?: Request): Promise<string | null> {
  try {
    const session = await auth();
    if (session?.user) {
      const id = (session.user as any).id;
      if (id) return id;
    }
  } catch (e) {
    console.warn('[Auth] auth() failed, trying fallback:', e);
  }

  // Fallback: check x-user-id header
  if (req) {
    const headerUserId = req.headers.get('x-user-id');
    if (headerUserId) {
      try {
        const user = await db.user.findUnique({ where: { id: headerUserId }, select: { id: true } });
        if (user) return headerUserId;
        console.warn('[Auth] x-user-id header provided but user not found:', headerUserId);
      } catch (e) {
        console.warn('[Auth] Error validating x-user-id:', e);
      }
    }

    // Cookie-based fallback check (v5 uses authjs.session-token)
    try {
      const cookieHeader = req.headers.get('cookie') || '';
      const sessionTokenMatch = cookieHeader.match(/authjs\.session-token=([^;]+)/);
      if (sessionTokenMatch) {
        console.warn('[Auth] Session token found in cookie but auth() returned null');
      }
    } catch (e) {
      // Ignore cookie parsing errors
    }
  }

  return null;
}

/**
 * @deprecated Use `resolveUserId()` instead. This wrapper just calls
 * `getAuthenticatedUserId(req)` and throws on null — `resolveUserId()`
 * returns a guest id instead of throwing, which is what almost every
 * caller actually wants. If you genuinely need to throw on missing auth,
 * use `apiHandler()` or `withAuth()` so the error becomes a proper 401
 * NextResponse instead of an uncaught exception.
 *
 * Require authentication with fallback support.
 * Returns userId or throws an error.
 */
export async function requireAuthWithFallback(req?: Request): Promise<string> {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

/**
 * @deprecated Use `apiHandler()` or `withAuth()` instead. Both return a
 * proper 401 NextResponse when there's no session. Uses Auth.js v5 `auth()`.
 */
export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

/**
 * @deprecated Use `apiHandler(handler, { requiredRole: role })` instead.
 * The composable wrapper returns a 403 NextResponse on role mismatch
 * instead of throwing, and integrates with `withErrorHandler` for free
 * structured logging. See `src/lib/api-handler.ts`.
 */
export async function requireRole(role: string) {
  const user = await requireAuth();
  if ((user as any).role !== role) throw new Error("Forbidden: Insufficient permissions");
  return user;
}

/**
 * @deprecated Use `apiHandler(handler, { requiredRole: 'admin' })` instead.
 * Same rationale as `requireRole()` — the composable wrapper returns a
 * proper 403 NextResponse and integrates with `withErrorHandler`.
 */
export async function requireAdmin() {
  return requireRole("admin");
}

/**
 * @deprecated Use `apiHandler(handler, { requiredRoles: roles })` instead.
 * Same rationale as `requireRole()` — the composable wrapper returns a
 * proper 403 NextResponse and integrates with `withErrorHandler`.
 */
export async function requireAnyRole(roles: string[]) {
  const user = await requireAuth();
  if (!roles.includes((user as any).role)) throw new Error("Forbidden: Insufficient permissions");
  return user;
}

/**
 * @deprecated Tier checks should be expressed as a small `requireTier`
 * helper that returns a 403 NextResponse (not throws). The current
 * implementation also runs a DB query on every call, which is fine for
 * a few routes but doesn't scale — consider caching the subscription
 * row on `ctx` via an `apiHandler`-style wrapper if many routes need it.
 *
 * Check if user has at least the given tier level
 */
export async function requireTier(minTier: "free" | "premium" | "pro") {
  const user = await requireAuth();
  const userId = (user as any).id;
  const subscription = await db.subscription.findUnique({ where: { userId } });
  const tierLevels = { free: 0, premium: 1, pro: 2 };
  if (!subscription || tierLevels[subscription.tier as keyof typeof tierLevels] < tierLevels[minTier]) {
    throw new Error(`Forbidden: Requires ${minTier} tier or higher`);
  }
  return { user, subscription };
}
