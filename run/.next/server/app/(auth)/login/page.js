(() => {
var exports = {};
exports.id = 72;
exports.ids = [72];
exports.modules = {

/***/ 55591:
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ 73299:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 74075:
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ }),

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134631:
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ 144865:
/***/ ((module) => {

"use strict";
module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 164939:
/***/ ((module) => {

"use strict";
module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ 176760:
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ 226849:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 233969:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 128021));


/***/ }),

/***/ 268817:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 501303));


/***/ }),

/***/ 274552:
/***/ ((module) => {

"use strict";
module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

"use strict";
module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 379551:
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ 383519:
/***/ ((module) => {

"use strict";
module.exports = require("postgres-array");

/***/ }),

/***/ 398149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginLayout),
/* harmony export */   metadata: () => (/* binding */ metadata)
/* harmony export */ });
const metadata = {
    title: 'Sign in — MedQ',
    description: 'Sign in to your MedQ account and continue studying.'
};
function LoginLayout({ children }) {
    return children;
}


/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 466426:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ LoginPage)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(305735);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(691970);
/* harmony import */ var _lib_session__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(835909);
/* harmony import */ var _components_medq_LoginForm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(501303);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_session__WEBPACK_IMPORTED_MODULE_2__]);
_lib_session__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




/**
 * Login page — Server Component.
 *
 * Checks session before rendering any UI. If the user is already
 * authenticated, redirects to the home page. This runs server-side
 * at the edge, so no client JavaScript ships to the browser.
 */ async function LoginPage() {
    const session = await (0,_lib_session__WEBPACK_IMPORTED_MODULE_2__/* .getSession */ .H)();
    if (session) (0,next_navigation__WEBPACK_IMPORTED_MODULE_1__.redirect)('/');
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_medq_LoginForm__WEBPACK_IMPORTED_MODULE_3__["default"], {});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 491645:
/***/ ((module) => {

"use strict";
module.exports = require("net");

/***/ }),

/***/ 501303:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(777943);
/* harmony import */ var react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__);
// This file is generated by the Webpack next-flight-loader.

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_server_dom_webpack_server__WEBPACK_IMPORTED_MODULE_0__.registerClientReference)(
function() { throw new Error("Attempted to call the default export of \"/workspaces/next/run/src/components/medq/LoginForm.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component."); },
"/workspaces/next/run/src/components/medq/LoginForm.tsx",
"default",
));


/***/ }),

/***/ 504573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 506574:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __next_app__: () => (/* binding */ __next_app__),
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   routeModule: () => (/* binding */ routeModule)
/* harmony export */ });
/* harmony import */ var next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(121635);
/* harmony import */ var next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(986315);
/* harmony import */ var next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(301020);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(961287);
/* harmony import */ var next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__);
/* harmony reexport (unknown) */ var __WEBPACK_REEXPORT_OBJECT__ = {};
/* harmony reexport (unknown) */ for(const __WEBPACK_IMPORT_KEY__ in next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__) if(["default","__next_app__","routeModule","handler"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) __WEBPACK_REEXPORT_OBJECT__[__WEBPACK_IMPORT_KEY__] = () => next_dist_server_app_render_entry_base__WEBPACK_IMPORTED_MODULE_3__[__WEBPACK_IMPORT_KEY__]
/* harmony reexport (unknown) */ __webpack_require__.d(__webpack_exports__, __WEBPACK_REEXPORT_OBJECT__);

const module0 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 376537)));
const module1 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 695127)));
const module2 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module3 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 308979)));
const module4 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module5 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module6 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const module7 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 145270, 23)));
const module8 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 628193, 23)));
const module9 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 398149)));
const module10 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.t.bind(__webpack_require__, 895547, 23)));
const page11 = (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 466426)));


const tree = {
        children: [
        '',
        {
        children: [
        '(auth)',
        {
        children: [
        'login',
        {
        children: ['__PAGE__', {}, {
          page: [page11, "/workspaces/next/run/src/app/(auth)/login/page.tsx"],
          
        }]
      },
        {
        'layout': [module9, "/workspaces/next/run/src/app/(auth)/login/layout.tsx"],
'global-error': [module10, "next/dist/client/components/builtin/global-error.js"],
        
      },
        []
      ]
      },
        {
        'global-error': [module6, "next/dist/client/components/builtin/global-error.js"],
'forbidden': [module7, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module8, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      },
        {
        'layout': [module0, "/workspaces/next/run/src/app/layout.tsx"],
'loading': [module1, "/workspaces/next/run/src/app/loading.tsx"],
'global-error': [module2, "next/dist/client/components/builtin/global-error.js"],
'not-found': [module3, "/workspaces/next/run/src/app/not-found.tsx"],
'forbidden': [module4, "next/dist/client/components/builtin/forbidden.js"],
'unauthorized': [module5, "next/dist/client/components/builtin/unauthorized.js"],
        metadata: {
    icon: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 770440)))()).default(props))],
    apple: [],
    openGraph: [(async (props) => (await (0,next_dist_server_app_render_module_loading_instrument_module_getter__WEBPACK_IMPORTED_MODULE_0__/* .instrumentModuleGetter */ .p)(() => Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 998558)))()).default(props))],
    twitter: [],
    manifest: undefined
  }
      },
        []
      ]
      }.children;
const __next_app_require__ = __webpack_require__
const __next_app_load_chunk__ = () => Promise.resolve()
const entrypoint = (0,next_dist_build_templates_app_page_runtime__WEBPACK_IMPORTED_MODULE_1__/* .createAppPageEntrypoint */ .H)({
    tree,
    page: "/(auth)/login/page",
    pathname: "/login",
    require: __next_app_require__,
    loadChunk: __next_app_load_chunk__,
    interopDefault: next_dist_server_app_render_interop_default__WEBPACK_IMPORTED_MODULE_2__/* .interopDefault */ .T
});
const __next_app__ = entrypoint.__next_app__;
const routeModule = entrypoint.routeModule;
const handler = entrypoint.handler;


//# sourceMappingURL=app-page.js.map


/***/ }),

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 579646:
/***/ ((module) => {

"use strict";
module.exports = require("child_process");

/***/ }),

/***/ 583997:
/***/ ((module) => {

"use strict";
module.exports = require("tty");

/***/ }),

/***/ 594735:
/***/ ((module) => {

"use strict";
module.exports = require("events");

/***/ }),

/***/ 629021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 638522:
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ 646060:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external.js");

/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 741025:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/dynamic-access-async-storage.external.js");

/***/ }),

/***/ 757078:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 781630:
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ 835909:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   H: () => (/* binding */ getSession)
/* harmony export */ });
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(73299);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth__WEBPACK_IMPORTED_MODULE_0__]);
_auth__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

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
 */ async function getSession() {
    try {
        return await (0,_auth__WEBPACK_IMPORTED_MODULE_0__/* .auth */ .j2)();
    } catch  {
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 876266:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 927910:
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ 979428:
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,4515,476,799,8163,9911,8027,6069,859,1068,4656,8021], () => (__webpack_exec__(506574)));
module.exports = __webpack_exports__;

})();