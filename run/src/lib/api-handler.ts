// ─────────────────────────────────────────────────────────────────────────
// api-handler.ts — composable wrappers for App Router Route Handlers.
//
// This module builds on `withAuth` from auth-helpers.ts and adds:
//
//   1. withErrorHandler()  — try/catch around any handler, logs to the
//      shared logger, returns a clean 500 response on uncaught errors.
//
//   2. apiHandler()        — composes withAuth + withErrorHandler in one
//      call. This is the recommended wrapper for any new route handler
//      that needs authenticated access.
//

import { NextResponse } from 'next/server';
import { createLogger } from './logger';
import { withAuth, unauthorized, type AuthContext } from './auth-helpers';

const log = createLogger('api');

type Handler<TParams = Record<string, string>> = (
  req: Request,
  ctx: AuthContext & { params: TParams }
) => Promise<Response> | Response;

type PublicHandler<TParams = Record<string, string>> = (
  req: Request,
  ctx: { params: TParams }
) => Promise<Response> | Response;

// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────

export function withErrorHandler<TParams extends Record<string, string> = Record<string, string>>(
  handler: PublicHandler<TParams>
) {
  return async (req: Request, context?: { params: Promise<TParams> } | TParams): Promise<Response> => {
    // Next.js 16 passes the second arg as { params: Promise<...> }.
    // Older / no-param routes call with just (req) — context is undefined.
    // Resolve to a plain TParams object in all cases.
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

    try {
      return await handler(req, { params });
    } catch (error) {
      // Pull a route tag from the request URL so logs identify the failing route.
      const url = (() => { try { return new URL(req.url).pathname; } catch { return 'unknown'; } })();
      const message = error instanceof Error ? error.message : String(error);
      const stack = error instanceof Error ? error.stack : undefined;

      log.error(`uncaught error in ${url}: ${message}`, stack ?? '');

      // Don't leak internal error details in production.
      const isProd = process.env.NODE_ENV === 'production';
      return NextResponse.json(
        { error: 'Internal server error', ...(isProd ? {} : { detail: message }) },
        { status: 500 }
      );
    }
  };
}

// ─────────────────────────────────────────────────────────────────────────
// apiHandler — composes withAuth + withErrorHandler
//
//   export const GET = apiHandler(async (req, ctx) => {
//     return NextResponse.json({ id: ctx.userId });
//   }, { requiredRole: 'admin' });
// ─────────────────────────────────────────────────────────────────────────

export function apiHandler<TParams extends Record<string, string> = Record<string, string>>(
  handler: Handler<TParams>,
  options: { requiredRole?: string; requiredRoles?: string[] } = {}
) {
  return withErrorHandler<TParams>(
    async (req, ctx) => {
      // Delegate auth to withAuth-style logic, but inlined so we can preserve
      // the params shape from withErrorHandler.
      // We reuse the existing withAuth impl by calling it and forwarding.
      const wrapped = withAuth<TParams>(handler, options);
      return wrapped(req, { params: ctx.params } as any);
    }
  );
}

// Re-export the response helpers from auth-helpers for convenience.
export { unauthorized, type AuthContext };
