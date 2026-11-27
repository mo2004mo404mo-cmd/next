"use strict";
exports.id = 2035;
exports.ids = [2035];
exports.modules = {

/***/ 73299:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y9: () => (/* binding */ handlers),
/* harmony export */   j2: () => (/* binding */ auth)
/* harmony export */ });
/* unused harmony exports signIn, signOut */
/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(647242);
/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(415235);
/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(886946);
/* harmony import */ var next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(409029);
/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(393021);
/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(757078);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(520903);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(876266);
/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(834013);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_prisma__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__]);
([_lib_prisma__WEBPACK_IMPORTED_MODULE_1__, _lib_db__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









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
const { handlers, auth, signIn, signOut } = (0,next_auth__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay)({
    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_5__/* .PrismaAdapter */ .y)(_lib_db__WEBPACK_IMPORTED_MODULE_2__.db),
    pages: {
        signIn: "/login"
    },
    providers: [
        next_auth_providers_google__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .A,
        next_auth_providers_facebook__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .A,
        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .A)({
            name: "credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            async authorize (credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }
                const email = String(credentials.email);
                const password = String(credentials.password);
                const user = await _lib_prisma__WEBPACK_IMPORTED_MODULE_1__/* .prisma */ .z.user.findUnique({
                    where: {
                        email
                    }
                });
                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                // return null;
                }
                // Check if email is verified
                if (!user.emailVerified) {
                    (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_FAILURE", {
                        email: credentials.email,
                        userId: user.id,
                        reason: "email_not_verified"
                    });
                    throw new Error("Please verify your email before signing in");
                }
                const passwordMatches = await (0,bcryptjs__WEBPACK_IMPORTED_MODULE_4__/* .compare */ .UD)(password, user.password);
                if (!passwordMatches) {
                    (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_FAILURE", {
                        email: credentials.email,
                        userId: user.id,
                        reason: "invalid_password"
                    });
                    throw new Error("Invalid credentials");
                }
                // ── Admin moderation enforcement ──
                if (user.status === "banned") {
                    throw new Error("banned:" + (user.bannedReason || "Your account has been banned."));
                }
                if (user.status === "suspended") {
                    if (user.suspendedUntil && user.suspendedUntil.getTime() < Date.now()) {
                        await _lib_db__WEBPACK_IMPORTED_MODULE_2__.db.user.update({
                            where: {
                                id: user.id
                            },
                            data: {
                                status: "active",
                                suspendedUntil: null,
                                suspendedReason: null
                            }
                        });
                    } else {
                        const until = user.suspendedUntil ? new Date(user.suspendedUntil).toISOString() : "indefinite";
                        throw new Error("suspended:Your account is suspended until " + until + ".");
                    }
                }
                (0,_lib_logger__WEBPACK_IMPORTED_MODULE_3__/* .logAudit */ .At)("AUTH_SUCCESS", {
                    userId: user.id,
                    email: user.email,
                    method: "credentials"
                });
                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    role: user.role
                };
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    callbacks: {
        authorized ({ auth, request }) {
            const isLoggedIn = !!auth?.user;
            const pathname = request.nextUrl.pathname;
            const protectedRoutes = [
                "/dashboard",
                "/admin",
                "/manager"
            ];
            const isProtected = protectedRoutes.some((route)=>pathname.startsWith(route));
            if (isProtected && !isLoggedIn) {
                return false;
            }
            return true;
        },
        async jwt ({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session ({ session, token }) {
            if (session.user) {
                session.user.id = token.id;
                session.user.role = token.role;
            }
            return session;
        }
    },
    secret: process.env.NEXTAUTH_SECRET
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 122035:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   At: () => (/* binding */ getAuthenticatedUserId),
/* harmony export */   HW: () => (/* binding */ getCurrentUser),
/* harmony export */   li: () => (/* binding */ badRequest),
/* harmony export */   mX: () => (/* binding */ notFound),
/* harmony export */   n$: () => (/* binding */ resolveUserId),
/* harmony export */   nc: () => (/* binding */ unauthorized),
/* harmony export */   o0: () => (/* binding */ forbidden),
/* harmony export */   ru: () => (/* binding */ withAuth)
/* harmony export */ });
/* unused harmony exports requireAuthWithFallback, requireAuth, requireRole, requireAdmin, requireAnyRole, requireTier */
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73299);
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(520903);
/* harmony import */ var _guest_user__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(245187);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth__WEBPACK_IMPORTED_MODULE_1__, _db__WEBPACK_IMPORTED_MODULE_2__, _guest_user__WEBPACK_IMPORTED_MODULE_3__]);
([_auth__WEBPACK_IMPORTED_MODULE_1__, _db__WEBPACK_IMPORTED_MODULE_2__, _guest_user__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Authentication utilities shared across API routes.
 *
 * The helpers resolve the active user from both the authenticated session and
 * guest-user fallbacks so route handlers can safely support both signed-in and
 * anonymous traffic without duplicating auth logic in each endpoint.
 */ 



/**
 * Get the current authenticated user via Auth.js v5 `auth()`.
 * Replaces the v4 `getServerSession(authOptions)` pattern.
 * `auth()` reads the JWT from the cookie — no DB query needed.
 */ async function getCurrentUser() {
    const session = await (0,_auth__WEBPACK_IMPORTED_MODULE_1__/* .auth */ .j2)();
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
const userExistsCache = new Map();
async function sessionUserExists(userId) {
    const now = Date.now();
    const hit = userExistsCache.get(userId);
    if (hit && now - hit.at < USER_EXISTS_TTL_MS) return hit.exists;
    try {
        const found = await _db__WEBPACK_IMPORTED_MODULE_2__.db.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true
            }
        });
        if (userExistsCache.size >= USER_EXISTS_CACHE_MAX) userExistsCache.clear();
        userExistsCache.set(userId, {
            exists: found !== null,
            at: now
        });
        return found !== null;
    } catch  {
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
async function resolveUserId() {
    const user = await getCurrentUser();
    const userId = user?.id;
    if (userId) {
        if (await sessionUserExists(userId)) return userId;
        // Stale session: token references a user that no longer exists in this
        // database. Fall back to the guest account so FK-constrained creates
        // keep working; a fresh sign-in restores the real identity.
        console.warn(`[auth] session user ${userId} not found in DB — falling back to guest`);
    }
    return (0,_guest_user__WEBPACK_IMPORTED_MODULE_3__.getGuestUserId)();
}
// ─────────────────────────────────────────────────────────────────────────
// HTTP response helpers for API routes.
// These return proper NextResponse objects with the right status code + JSON
// body, so route handlers can `return unauthorized()` instead of building
// the response manually each time.
// ─────────────────────────────────────────────────────────────────────────
function unauthorized(message = "Unauthorized") {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: message
    }, {
        status: 401
    });
}
function forbidden(message = "Forbidden: Insufficient permissions") {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: message
    }, {
        status: 403
    });
}
function badRequest(message = "Bad request") {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: message
    }, {
        status: 400
    });
}
function notFound(message = "Not found") {
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        error: message
    }, {
        status: 404
    });
}
function withAuth(handler, options = {}) {
    return async (req, context)=>{
        let user;
        try {
            user = await getCurrentUser();
        } catch (e) {
            console.error('[withAuth] getCurrentUser failed:', e);
            return unauthorized('Authentication failed');
        }
        if (!user) return unauthorized();
        const userObj = user;
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
        let params;
        if (context === undefined) {
            params = {};
        } else if (context instanceof Promise) {
            // Defensive: shouldn't happen with Next.js 16, but covers edge cases.
            params = await context;
        } else if (typeof context === 'object' && context !== null && 'params' in context) {
            // Next.js 16 shape: { params: Promise<TParams> }
            const rawParams = context.params;
            params = rawParams instanceof Promise ? await rawParams : rawParams;
        } else {
            // Already-resolved params object (Next.js 15 or earlier).
            params = context;
        }
        return handler(req, {
            user: userObj,
            userId: userObj.id,
            params
        });
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
 */ async function getAuthenticatedUserId(req) {
    try {
        const session = await (0,_auth__WEBPACK_IMPORTED_MODULE_1__/* .auth */ .j2)();
        if (session?.user) {
            const id = session.user.id;
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
                const user = await _db__WEBPACK_IMPORTED_MODULE_2__.db.user.findUnique({
                    where: {
                        id: headerUserId
                    },
                    select: {
                        id: true
                    }
                });
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
 */ async function requireAuthWithFallback(req) {
    const userId = await getAuthenticatedUserId(req);
    if (!userId) throw new Error("Unauthorized");
    return userId;
}
/**
 * @deprecated Use `apiHandler()` or `withAuth()` instead. Both return a
 * proper 401 NextResponse when there's no session. Uses Auth.js v5 `auth()`.
 */ async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) throw new Error("Unauthorized");
    return user;
}
/**
 * @deprecated Use `apiHandler(handler, { requiredRole: role })` instead.
 * The composable wrapper returns a 403 NextResponse on role mismatch
 * instead of throwing, and integrates with `withErrorHandler` for free
 * structured logging. See `src/lib/api-handler.ts`.
 */ async function requireRole(role) {
    const user = await requireAuth();
    if (user.role !== role) throw new Error("Forbidden: Insufficient permissions");
    return user;
}
/**
 * @deprecated Use `apiHandler(handler, { requiredRole: 'admin' })` instead.
 * Same rationale as `requireRole()` — the composable wrapper returns a
 * proper 403 NextResponse and integrates with `withErrorHandler`.
 */ async function requireAdmin() {
    return requireRole("admin");
}
/**
 * @deprecated Use `apiHandler(handler, { requiredRoles: roles })` instead.
 * Same rationale as `requireRole()` — the composable wrapper returns a
 * proper 403 NextResponse and integrates with `withErrorHandler`.
 */ async function requireAnyRole(roles) {
    const user = await requireAuth();
    if (!roles.includes(user.role)) throw new Error("Forbidden: Insufficient permissions");
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
 */ async function requireTier(minTier) {
    const user = await requireAuth();
    const userId = user.id;
    const subscription = await db.subscription.findUnique({
        where: {
            userId
        }
    });
    const tierLevels = {
        free: 0,
        premium: 1,
        pro: 2
    };
    if (!subscription || tierLevels[subscription.tier] < tierLevels[minTier]) {
        throw new Error(`Forbidden: Requires ${minTier} tier or higher`);
    }
    return {
        user,
        subscription
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 245187:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getGuestUserId: () => (/* binding */ getGuestUserId)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__]);
_lib_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const GUEST_EMAIL = 'guest@medq.local';
let cachedGuestId = null;
let guestInitPromise = null;
const WELCOME_BONUS = 25;
/**
 * Returns the ID of the default "guest" user.
 * Creates the guest user (and their subscription + wallet) on first call.
 * Uses a singleton promise to prevent race conditions from parallel calls.
 */ async function getGuestUserId() {
    if (cachedGuestId) return cachedGuestId;
    // Re-use the same promise for concurrent callers (prevents race conditions)
    if (!guestInitPromise) {
        guestInitPromise = _initGuestUser();
    }
    return guestInitPromise;
}
async function _initGuestUser() {
    if (cachedGuestId) return cachedGuestId;
    let user = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.user.findUnique({
        where: {
            email: GUEST_EMAIL
        }
    });
    if (!user) {
        user = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.user.create({
            data: {
                email: GUEST_EMAIL,
                name: 'Guest',
                role: 'student',
                onboardingCompleted: true
            }
        });
        // Ensure subscription exists
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.subscription.upsert({
            where: {
                userId: user.id
            },
            update: {},
            create: {
                userId: user.id,
                tier: 'free',
                status: 'active',
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
    }
    // Ensure wallet with welcome bonus — also fixes existing guest users with 0 balance
    const existingWallet = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.findUnique({
        where: {
            userId: user.id
        }
    });
    if (!existingWallet) {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.create({
            data: {
                userId: user.id,
                balance: WELCOME_BONUS,
                totalEarned: WELCOME_BONUS,
                totalSpent: 0
            }
        });
    } else if (existingWallet.balance === 0 && existingWallet.totalEarned === 0) {
        // Migrate: existing guest user with 0 credits → grant welcome bonus
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditWallet.update({
            where: {
                id: existingWallet.id
            },
            data: {
                balance: WELCOME_BONUS,
                totalEarned: WELCOME_BONUS,
                updatedAt: new Date()
            }
        });
    }
    // Ensure welcome bonus transaction exists (use findFirst to avoid duplicates)
    const existingTx = await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.findFirst({
        where: {
            userId: user.id,
            category: 'welcome_bonus'
        }
    });
    if (!existingTx) {
        await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.creditTransaction.create({
            data: {
                userId: user.id,
                type: 'admin_grant',
                amount: WELCOME_BONUS,
                balance: WELCOME_BONUS,
                category: 'welcome_bonus',
                description: 'Welcome bonus - 25 free credits!'
            }
        });
    }
    cachedGuestId = user.id;
    return user.id;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 757078:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ prisma)
/* harmony export */ });
/* harmony import */ var _generated_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(732152);
/* harmony import */ var _prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(249750);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(380127);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__]);
_prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
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



// Load .env first, then .env.local (overrides). The platform boot script
// rewrites .env with a stale SQLite DATABASE_URL on every recycle, so
// .env.local is the persistent source of truth.
(0,dotenv__WEBPACK_IMPORTED_MODULE_1__.config)({
    override: true
});
const { parsed } = (0,dotenv__WEBPACK_IMPORTED_MODULE_1__.config)({
    path: ".env.local",
    override: true
});
const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const resolvedUrl = envUrl && envUrl.startsWith("postgres") ? envUrl : fileUrl && fileUrl.startsWith("postgres") ? fileUrl : envUrl ?? fileUrl;
if (!resolvedUrl) {
    throw new Error("DATABASE_URL is not defined");
}
const globalForPrisma = globalThis;
const adapter = new _prisma_adapter_pg__WEBPACK_IMPORTED_MODULE_2__/* .PrismaPg */ .M({
    connectionString: resolvedUrl
});
// Reuse the existing global prisma instance if present (same pattern as
// src/lib/db.ts) — this avoids spawning a second PrismaClient + connection
// pool when both this module and db.ts are imported in the same process.
const prisma = globalForPrisma.prisma ?? new _generated_client__WEBPACK_IMPORTED_MODULE_0__/* .PrismaClient */ .m3({
    adapter,
    log: [
        "error",
        "warn"
    ]
});
if (false) {}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 876266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   At: () => (/* binding */ logAudit),
/* harmony export */   vF: () => (/* binding */ logger)
/* harmony export */ });
/* unused harmony exports createLogger, logError, logRequest */
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(274552);
/* harmony import */ var pino__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(pino__WEBPACK_IMPORTED_MODULE_0__);

const isDev = "production" === 'development';
const logger = pino__WEBPACK_IMPORTED_MODULE_0___default()({
    level: isDev ? 'debug' : 'info',
    browser: {
        asObject: true
    },
    // [sandbox adaptation] pino worker-thread transports (pino-pretty) crash
    // inside the Next.js bundled server ("the worker has exited" uncaught
    // exceptions). Plain JSON logs are emitted instead — still readable in
    // `.zscripts/dev.log`.
    transport: undefined,
    formatters: {
        level: (label)=>{
            return {
                level: label
            };
        }
    }
});
/**
 * Create a child logger with additional context
 */ function createLogger(context) {
    return logger.child(context);
}
/**
 * Log audit events (auth, security, etc.)
 */ function logAudit(event, data) {
    logger.info({
        audit: true,
        event,
        ...data
    }, `[AUDIT] ${event}`);
}
/**
 * Log errors with structured data
 */ function logError(error, context) {
    logger.error({
        error: {
            message: error.message,
            stack: error.stack,
            name: error.name
        },
        ...context
    }, error.message);
}
/**
 * Log HTTP requests (for API routes)
 */ function logRequest(method, url, statusCode, duration) {
    logger.info({
        http: {
            method,
            url,
            statusCode,
            duration
        }
    }, `${method} ${url} ${statusCode} - ${duration}ms`);
}


/***/ })

};
;