"use strict";
(() => {
var exports = {};
exports.id = 7085;
exports.ids = [3009,5390,7085];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

/***/ }),

/***/ 23776:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $L: () => (/* binding */ disconnectDrive),
/* harmony export */   E5: () => (/* binding */ isImportable),
/* harmony export */   KN: () => (/* binding */ listDriveFiles),
/* harmony export */   Pp: () => (/* binding */ getDriveConnection),
/* harmony export */   dl: () => (/* binding */ isDriveConfigured),
/* harmony export */   gL: () => (/* binding */ deriveRedirectUri),
/* harmony export */   jj: () => (/* binding */ downloadDriveFile),
/* harmony export */   mY: () => (/* binding */ saveDriveConnection),
/* harmony export */   oK: () => (/* binding */ exchangeCodeForTokens),
/* harmony export */   uT: () => (/* binding */ buildAuthUrl),
/* harmony export */   v3: () => (/* binding */ STATE_COOKIE)
/* harmony export */ });
/* unused harmony exports DRIVE_SCOPE, requireAccessToken, isNativeGoogleDoc */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * knowledge/google-drive.ts — OAuth connection to the user's OWN Google Drive.
 *
 * Lets a user "Connect Google Drive" once (Google consent screen) and then
 * browse/import PRIVATE files straight from their Drive — no per-file
 * "anyone with the link" sharing needed. Public share links keep working
 * through url-source.ts; this module is the authenticated path.
 *
 * Storage: tokens live in the existing Prisma `Account` table (the Auth.js
 * adapter schema) as provider='google-drive' — access_token, refresh_token,
 * expires_at — so no schema migration is needed. One connection per app user
 * (re-connecting replaces the previous Google account).
 *
 * Setup (server operator): create an OAuth client in Google Cloud Console
 * (Drive API enabled), set GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET in .env,
 * and register the redirect URI reported by /api/knowledge/drive/status.
 * Everything below degrades to clear "not configured" errors without them.
 */ 

const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('GoogleDrive');
const DRIVE_PROVIDER = 'google-drive';
const AUTH_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const DRIVE_API = 'https://www.googleapis.com/drive/v3';
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive.readonly';
const STATE_COOKIE = 'medq_drive_state';
/** Hard download cap — matches the URL import route's streaming cap. */ const MAX_DRIVE_BYTES = 200 * 1024 * 1024;
// ─── Configuration ──────────────────────────────────────────────────────────
function isDriveConfigured() {
    return Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
}
/**
 * The redirect URI registered in Google Cloud Console. Env override wins
 * (GOOGLE_DRIVE_REDIRECT_URI); otherwise derived from the request host so it
 * is correct both on localhost and behind the sandbox preview proxy.
 */ function deriveRedirectUri(req) {
    const envUri = process.env.GOOGLE_DRIVE_REDIRECT_URI;
    if (envUri) return envUri;
    const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
    const proto = req.headers.get('x-forwarded-proto') || (host?.includes('localhost') ? 'http' : 'https');
    if (host) return `${proto}://${host}/api/knowledge/drive/callback`;
    return new URL(req.url).origin + '/api/knowledge/drive/callback';
}
function buildAuthUrl(redirectUri, state) {
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: `${DRIVE_SCOPE} openid email profile`,
        access_type: 'offline',
        prompt: 'consent',
        state,
        include_granted_scopes: 'false'
    });
    return `${AUTH_ENDPOINT}?${params.toString()}`;
}
/** Decode the id_token payload (JWT) for the connected user's email/name/sub. */ function decodeIdToken(idToken) {
    if (!idToken) return {};
    try {
        const payload = idToken.split('.')[1];
        const json = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
        return {
            sub: json.sub,
            email: json.email,
            name: json.name
        };
    } catch  {
        return {};
    }
}
async function exchangeCodeForTokens(code, redirectUri) {
    const res = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            code,
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        }),
        signal: AbortSignal.timeout(30000)
    });
    const json = await res.json().catch(()=>({}));
    if (!res.ok || json.error) {
        throw new Error(`Google token exchange failed: ${json.error || res.status}${json.error_description ? ` — ${json.error_description}` : ''}`);
    }
    return json;
}
/** Persist the connection as an Account row (one per app user). */ async function saveDriveConnection(userId, tokens) {
    const { sub, email, name } = decodeIdToken(tokens.id_token);
    // one connection per user — replace any previous Google account
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.deleteMany({
        where: {
            userId,
            provider: DRIVE_PROVIDER
        }
    });
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.create({
        data: {
            userId,
            type: 'oauth',
            provider: DRIVE_PROVIDER,
            providerAccountId: sub || email || 'google-user',
            access_token: tokens.access_token || null,
            refresh_token: tokens.refresh_token || null,
            expires_at: tokens.expires_in ? Math.floor(Date.now() / 1000) + tokens.expires_in : null,
            token_type: tokens.token_type || 'Bearer',
            scope: tokens.scope || DRIVE_SCOPE,
            id_token: tokens.id_token || null
        }
    });
    log.info?.(`Drive connected for user ${userId}${email ? ` (${email})` : ''}`);
    return {
        email,
        name
    };
}
async function getDriveConnection(userId) {
    const account = await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.findFirst({
        where: {
            userId,
            provider: DRIVE_PROVIDER
        }
    });
    if (!account) return null;
    const { email, name } = decodeIdToken(account.id_token || undefined);
    return {
        email: email || (account.providerAccountId?.includes('@') ? account.providerAccountId : undefined),
        name
    };
}
async function disconnectDrive(userId) {
    const deleted = await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.deleteMany({
        where: {
            userId,
            provider: DRIVE_PROVIDER
        }
    });
    return deleted.count;
}
/**
 * A valid access token for the user, refreshing when close to expiry.
 * Returns null when the user has no connection; throws on refresh failure
 * (revoked consent / network) with an actionable message.
 */ async function getAccessToken(userId) {
    const account = await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.findFirst({
        where: {
            userId,
            provider: DRIVE_PROVIDER
        }
    });
    if (!account) return null;
    const expiresIn = (account.expires_at || 0) - Math.floor(Date.now() / 1000);
    if (account.access_token && expiresIn > 60) return account.access_token;
    if (!account.refresh_token) {
        if (account.access_token) return account.access_token; // last-known token
        throw new Error('Google Drive connection has no refresh token — disconnect and connect again.');
    }
    const res = await fetch(TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID || '',
            client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
            refresh_token: account.refresh_token,
            grant_type: 'refresh_token'
        }),
        signal: AbortSignal.timeout(30000)
    });
    const json = await res.json().catch(()=>({}));
    if (!res.ok || json.error || !json.access_token) {
        const invalid = json.error === 'invalid_grant';
        await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.deleteMany({
            where: {
                userId,
                provider: DRIVE_PROVIDER
            }
        }).catch(()=>{});
        throw new Error(invalid ? 'Google Drive access was revoked — connect Google Drive again.' : `Could not refresh Google Drive access (${json.error || res.status}).`);
    }
    await _db__WEBPACK_IMPORTED_MODULE_0__.db.account.update({
        where: {
            id: account.id
        },
        data: {
            access_token: json.access_token,
            expires_at: json.expires_in ? Math.floor(Date.now() / 1000) + json.expires_in : null
        }
    });
    return json.access_token;
}
/** Get a token for API calls; throws a clean error when not connected. */ async function requireAccessToken(userId) {
    const token = await getAccessToken(userId);
    if (!token) throw new Error('Google Drive is not connected — click "Connect Google Drive" first.');
    return token;
}
/** Native Google editors → export format that our parsers understand. */ const GOOGLE_EXPORTS = {
    'application/vnd.google-apps.document': {
        ext: 'txt',
        mimeType: 'text/plain'
    },
    'application/vnd.google-apps.spreadsheet': {
        ext: 'csv',
        mimeType: 'text/csv'
    },
    'application/vnd.google-apps.presentation': {
        ext: 'pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    },
    'application/vnd.google-apps.drawing': {
        ext: 'png',
        mimeType: 'image/png'
    }
};
function isNativeGoogleDoc(mimeType) {
    return mimeType in GOOGLE_EXPORTS;
}
function isImportable(file) {
    if (file.mimeType === 'application/vnd.google-apps.folder') return false;
    if (file.mimeType.startsWith('application/vnd.google-apps.')) return isNativeGoogleDoc(file.mimeType);
    return true;
}
async function listDriveFiles(userId, query, pageToken) {
    const token = await requireAccessToken(userId);
    const conditions = [
        "trashed = false",
        "mimeType != 'application/vnd.google-apps.folder'"
    ];
    if (query.trim()) conditions.push(`name contains '${query.replace(/'/g, "\\'")}'`);
    const params = new URLSearchParams({
        pageSize: '40',
        q: conditions.join(' and '),
        orderBy: 'modifiedTime desc',
        fields: 'nextPageToken, files(id, name, mimeType, size, modifiedTime)',
        supportsAllDrives: 'true',
        includeItemsFromAllDrives: 'true'
    });
    if (pageToken) params.set('pageToken', pageToken);
    const res = await fetch(`${DRIVE_API}/files?${params}`, {
        headers: {
            authorization: `Bearer ${token}`
        },
        signal: AbortSignal.timeout(30000)
    });
    const json = await res.json().catch(()=>({}));
    if (!res.ok) throw new Error(`Google Drive list failed: ${json.error?.message || res.status}`);
    return {
        files: (json.files || []).map((f)=>({
                ...f,
                size: f.size || undefined,
                modifiedTime: f.modifiedTime || undefined
            })),
        nextPageToken: json.nextPageToken || undefined
    };
}
/** Download any file (binary alt=media, or native docs via export). */ async function downloadDriveFile(userId, file) {
    const token = await requireAccessToken(userId);
    const native = GOOGLE_EXPORTS[file.mimeType];
    const url = native ? `${DRIVE_API}/files/${encodeURIComponent(file.id)}/export?mimeType=${encodeURIComponent(native.mimeType)}` : `${DRIVE_API}/files/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true`;
    const safeName = file.name.replace(/[\\/:*?"<>|]/g, '_').slice(0, 150) || 'drive-file';
    const fileName = native ? `${safeName}.${native.ext}` : safeName;
    const res = await fetch(url, {
        headers: {
            authorization: `Bearer ${token}`
        },
        signal: AbortSignal.timeout(600000)
    });
    if (!res.ok) {
        const message = await res.text().catch(()=>'');
        throw new Error(`Google Drive download failed (HTTP ${res.status})${message ? `: ${message.slice(0, 160)}` : ''}`);
    }
    const reader = res.body?.getReader();
    if (!reader) throw new Error('Google Drive returned an unreadable stream');
    const chunks = [];
    let total = 0;
    for(;;){
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > MAX_DRIVE_BYTES) {
            await reader.cancel().catch(()=>{});
            throw new Error(`Drive file exceeds the ${Math.round(MAX_DRIVE_BYTES / 1024 / 1024)}MB import limit`);
        }
        chunks.push(Buffer.from(value));
    }
    const buffer = Buffer.concat(chunks);
    if (buffer.length < 64) throw new Error('Google Drive returned an empty file');
    const contentType = res.headers.get('content-type') || '';
    const mimeType = native ? native.mimeType : contentType.split(';')[0] || 'application/octet-stream';
    return {
        buffer,
        fileName,
        mimeType
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 51455:
/***/ ((module) => {

module.exports = require("node:fs/promises");

/***/ }),

/***/ 71553:
/***/ ((module) => {

module.exports = require("node:dns/promises");

/***/ }),

/***/ 79868:
/***/ ((module) => {

module.exports = require("node:sqlite");

/***/ }),

/***/ 87997:
/***/ ((module) => {

module.exports = require("node:timers");

/***/ }),

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 134589:
/***/ ((module) => {

module.exports = require("node:assert");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 157075:
/***/ ((module) => {

module.exports = require("node:stream");

/***/ }),

/***/ 164939:
/***/ ((module) => {

module.exports = import("pg");;

/***/ }),

/***/ 173136:
/***/ ((module) => {

module.exports = require("node:url");

/***/ }),

/***/ 176760:
/***/ ((module) => {

module.exports = require("node:path");

/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "I", ({
    enumerable: true,
    get: function() {
        return sendResponse;
    }
}));
const _helpers = __webpack_require__(228208);
const _pipereadable = __webpack_require__(447617);
const _utils = __webpack_require__(662018);
async function sendResponse(req, res, response, waitUntil) {
    if (// The type check here ensures that `req` is correctly typed, and the
    // environment variable check provides dead code elimination.
     true && (0, _helpers.isNodeNextResponse)(res)) {
        var // Copy over the response headers.
        _response_headers;
        // Copy over the response status.
        res.statusCode = response.status;
        res.statusMessage = response.statusText;
        // TODO: this is not spec-compliant behavior and we should not restrict
        // headers that are allowed to appear many times.
        //
        // See:
        // https://github.com/vercel/next.js/pull/70127
        const headersWithMultipleValuesAllowed = [
            // can add more headers to this list if needed
            'set-cookie',
            'www-authenticate',
            'proxy-authenticate',
            'vary'
        ];
        (_response_headers = response.headers) == null ? void 0 : _response_headers.forEach((value, name)=>{
            // `x-middleware-set-cookie` is an internal header not needed for the response
            if (name.toLowerCase() === 'x-middleware-set-cookie') {
                return;
            }
            // The append handling is special cased for `set-cookie`.
            if (name.toLowerCase() === 'set-cookie') {
                // TODO: (wyattjoh) replace with native response iteration when we can upgrade undici
                for (const cookie of (0, _utils.splitCookiesString)(value)){
                    res.appendHeader(name, cookie);
                }
            } else {
                // only append the header if it is either not present in the outbound response
                // or if the header supports multiple values
                const isHeaderPresent = typeof res.getHeader(name) !== 'undefined';
                if (headersWithMultipleValuesAllowed.includes(name.toLowerCase()) || !isHeaderPresent) {
                    res.appendHeader(name, value);
                }
            }
        });
        /**
     * The response can't be directly piped to the underlying response. The
     * following is duplicated from the edge runtime handler.
     *
     * See packages/next/server/next-server.ts
     */ const { originalResponse } = res;
        // A response body must not be sent for HEAD requests. See https://httpwg.org/specs/rfc9110.html#HEAD
        if (response.body && req.method !== 'HEAD') {
            await (0, _pipereadable.pipeToNodeResponse)(response.body, originalResponse, waitUntil);
        } else {
            originalResponse.end();
        }
    }
}

//# sourceMappingURL=send-response.js.map

/***/ }),

/***/ 200261:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 257975:
/***/ ((module) => {

module.exports = require("node:util");

/***/ }),

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 300643:
/***/ ((module) => {

module.exports = require("node:perf_hooks");

/***/ }),

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


if (false) {} else {
    if (false) {} else {
        if (false) {} else {
            if (false) {} else {
                module.exports = __webpack_require__(744870);
            }
        }
    }
}

//# sourceMappingURL=module.compiled.js.map

/***/ }),

/***/ 321820:
/***/ ((module) => {

module.exports = require("os");

/***/ }),

/***/ 328354:
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 337540:
/***/ ((module) => {

module.exports = require("node:console");

/***/ }),

/***/ 353053:
/***/ ((module) => {

module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ 362768:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FB: () => (/* binding */ withErrorHandler),
/* harmony export */   RK: () => (/* binding */ apiHandler)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
/* harmony import */ var _auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_auth_helpers__WEBPACK_IMPORTED_MODULE_2__]);
_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
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



const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('api');
// ─────────────────────────────────────────────────────────────────────────
// withErrorHandler — wraps any route handler with try/catch + structured log
// ─────────────────────────────────────────────────────────────────────────
function withErrorHandler(handler) {
    return async (req, context)=>{
        // Next.js 16 passes the second arg as { params: Promise<...> }.
        // Older / no-param routes call with just (req) — context is undefined.
        // Resolve to a plain TParams object in all cases.
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
        try {
            return await handler(req, {
                params
            });
        } catch (error) {
            // Pull a route tag from the request URL so logs identify the failing route.
            const url = (()=>{
                try {
                    return new URL(req.url).pathname;
                } catch  {
                    return 'unknown';
                }
            })();
            const message = error instanceof Error ? error.message : String(error);
            const stack = error instanceof Error ? error.stack : undefined;
            log.error(`uncaught error in ${url}: ${message}`, stack ?? '');
            // Don't leak internal error details in production.
            const isProd = "production" === 'production';
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Internal server error',
                ...isProd ? {} : {
                    detail: message
                }
            }, {
                status: 500
            });
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
function apiHandler(handler, options = {}) {
    return withErrorHandler(async (req, ctx)=>{
        // Delegate auth to withAuth-style logic, but inlined so we can preserve
        // the params shape from withErrorHandler.
        // We reuse the existing withAuth impl by calling it and forwarding.
        const wrapped = (0,_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .withAuth */ .ru)(handler, options);
        return wrapped(req, {
            params: ctx.params
        });
    });
}
// Re-export the response helpers from auth-helpers for convenience.


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 378608:
/***/ ((module) => {

module.exports = require("exceljs");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 399253:
/***/ ((module) => {

module.exports = import("@huggingface/transformers");;

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 478474:
/***/ ((module) => {

module.exports = require("node:events");

/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 515390:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   En: () => (/* binding */ buildEvenWindows),
/* harmony export */   He: () => (/* binding */ detectSceneCuts),
/* harmony export */   K_: () => (/* binding */ pickVlmScenes),
/* harmony export */   bz: () => (/* binding */ fmtSec),
/* harmony export */   fQ: () => (/* binding */ assignDescriptionsToScenes),
/* harmony export */   og: () => (/* binding */ buildScenes),
/* harmony export */   w_: () => (/* binding */ assignTranscriptToScenes)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/**
 * knowledge/scene-detect.ts — video scene segmentation (Stage 3).
 *
 * Turns a video into TEMPERATURE-ALIGNED scenes so retrieval can answer
 * "what was shown at 12:34" and questions can cite an exact span
 * (mediaTimeSec) instead of the whole file.
 *
 * Detection strategy (spike decision — Option D, ffmpeg-first):
 *   1. ffmpeg's scene-change filter (`select='gt(scene,T)'` + showinfo)
 *      emits candidate cut timestamps — in-process, no new dependencies.
 *   2. Pure builder logic (buildScenes) sanitizes cuts, merges scenes
 *      shorter than a floor into neighbors, and caps the scene count —
 *      so a 60-min lecture with 200 hard cuts becomes ≤60 stable scenes.
 *   3. VLM confirmation is implicit: each persisted scene carries the VLM
 *      description of its representative frame (a cut the VLM can't
 *      describe degenerates to a transcript-only scene), which keeps cost
 *      at one vision call per ANALYZED scene, not per cut.
 *   4. Fallback (no cuts detected / filter fails): even time windows
 *      (buildEvenWindows) — honest about being temporal slices, labeled
 *      detection='even-window' in the data model.
 *
 * Every builder here is PURE and unit-tested (test/scene-segmentation);
 * only detectSceneCuts touches the filesystem/ffmpeg.
 */ 

const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
// ─── ffmpeg scene detection ────────────────────────────────────────────────
/**
 * Detect scene-change timestamps with ffmpeg's scene filter.
 * Returns [] when nothing crosses the threshold or the filter fails
 * (callers fall back to even windows) — never throws for ordinary inputs.
 */ async function detectSceneCuts(inputPath, opts = {}) {
    const threshold = opts.threshold ?? 0.3;
    try {
        const { stderr } = await execFileAsync('ffmpeg', [
            '-i',
            inputPath,
            '-filter:v',
            `select='gt(scene,${threshold})',showinfo`,
            '-an',
            '-f',
            'null',
            '-'
        ], {
            timeout: opts.timeoutMs ?? 180000,
            maxBuffer: 1024 * 1024 * 64
        });
        const cuts = [];
        // showinfo prints one block per SELECTED frame: ... pts_time:123.456 ...
        for (const m of stderr.matchAll(/pts_time:(\d+(?:\.\d+)?)/g)){
            const t = Number.parseFloat(m[1]);
            if (Number.isFinite(t)) cuts.push(t);
        }
        return cuts.map((atSec)=>({
                atSec
            }));
    } catch  {
        return [];
    }
}
// ─── Pure scene builders ───────────────────────────────────────────────────
/** Clamp v into [lo, hi]. */ const clamp = (v, lo, hi)=>Math.min(Math.max(v, lo), hi);
/**
 * Cut timestamps → scene spans.
 *
 *   - cuts outside (0.5s, duration-0.5s) are dropped; sorted; deduped
 *   - scenes shorter than minSceneSec are merged into their shorter
 *     neighbor (previous wins ties) until none remain under the floor
 *   - scene count is capped at maxScenes by repeatedly merging the
 *     SHORTEST scene into its shorter neighbor (stable, order-preserving)
 *   - the result always spans [0, duration]
 */ function buildScenes(cutTimes, durationSec, opts = {}) {
    const minScene = opts.minSceneSec ?? 5;
    const maxScenes = opts.maxScenes ?? 60;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    const cuts = [
        ...new Set(cutTimes.filter((t)=>Number.isFinite(t) && t > 0.5 && t < duration - 0.5).map((t)=>Math.round(t * 1000) / 1000))
    ].sort((a, b)=>a - b);
    let spans = [];
    const bounds = [
        0,
        ...cuts,
        duration
    ];
    for(let i = 0; i + 1 < bounds.length; i++)spans.push([
        bounds[i],
        bounds[i + 1]
    ]);
    // Merge-under-floor + cap-to-max share the "merge scene i into its
    // shorter neighbor" primitive.
    const mergeIntoNeighbor = (idx)=>{
        const prev = idx - 1;
        const next = idx + 1;
        let target;
        if (prev < 0) target = next;
        else if (next >= spans.length) target = prev;
        else {
            const prevLen = spans[prev][1] - spans[prev][0];
            const nextLen = spans[next][1] - spans[next][0];
            target = prevLen <= nextLen ? prev : next;
        }
        const lo = Math.min(spans[idx][0], spans[target][0]);
        const hi = Math.max(spans[idx][1], spans[target][1]);
        spans.splice(Math.min(idx, target), 2, [
            lo,
            hi
        ]);
    };
    let guard = spans.length * 2 + 8;
    while(spans.length > 1){
        const idx = spans.findIndex(([s, e])=>e - s < minScene);
        if (idx < 0 || guard-- <= 0) break;
        mergeIntoNeighbor(idx);
    }
    while(spans.length > maxScenes){
        let shortest = 0;
        for(let i = 1; i < spans.length; i++){
            if (spans[i][1] - spans[i][0] < spans[shortest][1] - spans[shortest][0]) shortest = i;
        }
        mergeIntoNeighbor(shortest);
    }
    return spans.map(([startSec, endSec], i)=>({
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        }));
}
/**
 * Even time windows (fallback when no scene cuts are detected — single-set
 * lectures, screencasts). Window size is clamped so we get between 1 and
 * maxScenes windows of at least minWindowSec each (minute-level temporal
 * navigation without fabricating content boundaries).
 */ function buildEvenWindows(durationSec, opts = {}) {
    const minWindow = opts.minWindowSec ?? 60;
    const maxScenes = opts.maxScenes ?? 60;
    const target = opts.targetScenes ?? 24;
    const duration = Math.max(0, durationSec);
    if (duration <= 0 || !Number.isFinite(duration)) return [];
    if (duration <= minWindow) {
        return [
            {
                sceneIdx: 0,
                startSec: 0,
                endSec: duration,
                midSec: Math.round(duration / 2 * 1000) / 1000
            }
        ];
    }
    const n = clamp(Math.round(duration / minWindow) >= target ? Math.ceil(duration / Math.max(minWindow, duration / target)) : Math.ceil(duration / minWindow), 1, maxScenes);
    const width = duration / n;
    return Array.from({
        length: n
    }, (_, i)=>{
        const startSec = i * width;
        const endSec = i === n - 1 ? duration : (i + 1) * width;
        return {
            sceneIdx: i,
            startSec: Math.round(startSec * 1000) / 1000,
            endSec: Math.round(endSec * 1000) / 1000,
            midSec: Math.round((startSec + endSec) / 2 * 1000) / 1000
        };
    });
}
// ─── Assignment helpers (pure) ─────────────────────────────────────────────
/** mm:ss stamp (local copy — keeps this module dependency-free). */ function fmtSec(seconds) {
    const s = Math.max(0, Math.floor(seconds));
    const m = Math.floor(s / 60);
    return `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
/**
 * Which scene spans get a VLM frame analysis. All of them when ≤ max;
 * otherwise an evenly-spaced subset (index coverage across the timeline).
 */ function pickVlmScenes(scenes, max) {
    if (scenes.length === 0 || max <= 0) return [];
    if (scenes.length <= max) return scenes;
    const picked = [];
    for(let i = 0; i < max; i++){
        const idx = Math.round(i * (scenes.length - 1) / (max - 1));
        if (!picked.includes(scenes[idx])) picked.push(scenes[idx]);
    }
    return picked;
}
/**
 * Assign timestamped ASR segments to the scenes that CONTAIN them
 * (segments outside every scene — e.g. rounding edges — clamp to the
 * nearest boundary). Returns one transcript string per scene, [mm:ss]-stamped.
 */ function assignTranscriptToScenes(segments, scenes) {
    const buckets = scenes.map(()=>[]);
    if (scenes.length === 0) return [];
    for (const seg of segments){
        const text = seg?.text?.trim();
        if (!text) continue;
        let idx = scenes.findIndex((s)=>seg.offsetSec >= s.startSec && seg.offsetSec < s.endSec);
        if (idx < 0) {
            // clamp to the nearest scene by boundary distance
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(seg.offsetSec - s.startSec), Math.abs(seg.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        buckets[idx].push(`[${fmtSec(seg.offsetSec)}] ${text}`);
    }
    return buckets.map((parts)=>parts.join(' '));
}
/**
 * Assign frame VLM descriptions to the scenes that CONTAIN each frame
 * timestamp (nearest scene wins for edge frames). Later frames win ties,
 * so the most recent analysis of a span is the one kept.
 */ function assignDescriptionsToScenes(frames, scenes) {
    const out = scenes.map(()=>undefined);
    if (scenes.length === 0) return out;
    for (const frame of frames){
        if (!frame?.description?.trim()) continue;
        let idx = scenes.findIndex((s)=>frame.offsetSec >= s.startSec && frame.offsetSec < s.endSec);
        if (idx < 0) {
            let best = 0;
            let bestDist = Infinity;
            scenes.forEach((s, i)=>{
                const d = Math.min(Math.abs(frame.offsetSec - s.startSec), Math.abs(frame.offsetSec - s.endSec));
                if (d < bestDist) {
                    bestDist = d;
                    best = i;
                }
            });
            idx = best;
        }
        out[idx] = frame.description.trim();
    }
    return out;
}


/***/ }),

/***/ 517393:
/***/ ((module) => {

module.exports = require("mammoth");

/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 541692:
/***/ ((module) => {

module.exports = require("node:tls");

/***/ }),

/***/ 541792:
/***/ ((module) => {

module.exports = require("node:querystring");

/***/ }),

/***/ 579646:
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ 594735:
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 629406:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handler: () => (/* binding */ handler),
/* harmony export */   patchFetch: () => (/* binding */ patchFetch),
/* harmony export */   routeModule: () => (/* binding */ routeModule),
/* harmony export */   serverHooks: () => (/* binding */ serverHooks),
/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),
/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)
/* harmony export */ });
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(319225);
/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(684006);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8317);
/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(799373);
/* harmony import */ var next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(434775);
/* harmony import */ var next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(524235);
/* harmony import */ var next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(200261);
/* harmony import */ var next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(754365);
/* harmony import */ var next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(590771);
/* harmony import */ var next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(473461);
/* harmony import */ var next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(767798);
/* harmony import */ var next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(192280);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(662018);
/* harmony import */ var next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(445696);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(347929);
/* harmony import */ var next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(986439);
/* harmony import */ var next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(137527);
/* harmony import */ var next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__);

















// We inject the nextConfigOutput here so that we can use them in the route
// module.
const nextConfigOutput = ""
const routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({
    definition: {
        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
        page: "/api/knowledge/drive/import/route",
        pathname: "/api/knowledge/drive/import",
        filename: "route",
        bundlePath: "app/api/knowledge/drive/import/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/knowledge/drive/import/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(863775),
    // In Turbopack dev mode, also provide a synchronous per-request getter so
    // server HMR updates are picked up without re-executing the entry chunk.
    // Using require() (synchronous) avoids adding async overhead that would be
    // incorrectly attributed to application-code time in devRequestTiming.
    ... false ? 0 : {}
});
// Pull out the exports that we need to expose from the module. This should
// be eliminated when we've moved the other routes to the new format. These
// are used to hook into the route.
const { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;
function patchFetch() {
    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({
        workAsyncStorage,
        workUnitAsyncStorage
    });
}

async function handler(req, res, ctx) {
    if (ctx.requestMeta) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.setRequestMeta)(req, ctx.requestMeta);
    }
    if (routeModule.isDev) {
        (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.addRequestMeta)(req, 'devRequestTimingInternalsEnd', process.hrtime.bigint());
    }
    let srcPage = "/api/knowledge/drive/import/route";
    // turbopack doesn't normalize `/index` in the page name
    // so we need to to process dynamic routes properly
    // TODO: fix turbopack providing differing value from webpack
    if (false) {} else if (srcPage === '/index') {
        // we always normalize /index specifically
        srcPage = '/';
    }
    const multiZoneDraftMode = false;
    const prepareResult = await routeModule.prepare(req, res, {
        srcPage,
        multiZoneDraftMode
    });
    if (!prepareResult) {
        res.statusCode = 400;
        res.end('Bad Request');
        ctx.waitUntil == null ? void 0 : ctx.waitUntil.call(ctx, Promise.resolve());
        return null;
    }
    const { buildId, deploymentId, params, nextConfig, parsedUrl, isDraftMode, prerenderManifest, routerServerContext, isOnDemandRevalidate, revalidateOnlyGenerated, resolvedPathname, clientReferenceManifest, serverActionsManifest } = prepareResult;
    const normalizedSrcPage = (0,next_dist_shared_lib_router_utils_app_paths__WEBPACK_IMPORTED_MODULE_6__.normalizeAppPath)(srcPage);
    let isIsr = Boolean(prerenderManifest.dynamicRoutes[normalizedSrcPage] || prerenderManifest.routes[resolvedPathname]);
    const render404 = async ()=>{
        // TODO: should route-module itself handle rendering the 404
        if (routerServerContext == null ? void 0 : routerServerContext.render404) {
            await routerServerContext.render404(req, res, parsedUrl, false);
        } else {
            res.end('This page could not be found');
        }
        return null;
    };
    if (isIsr && !isDraftMode) {
        const isPrerendered = Boolean(prerenderManifest.routes[resolvedPathname]);
        const prerenderInfo = prerenderManifest.dynamicRoutes[normalizedSrcPage];
        if (prerenderInfo) {
            if (prerenderInfo.fallback === false && !isPrerendered) {
                if (nextConfig.adapterPath) {
                    return await render404();
                }
                throw new next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError();
            }
        }
    }
    let cacheKey = null;
    if (isIsr && !routeModule.isDev && !isDraftMode) {
        cacheKey = resolvedPathname;
        // ensure /index and / is normalized to one key
        cacheKey = cacheKey === '/index' ? '/' : cacheKey;
    }
    const supportsDynamicResponse = // If we're in development, we always support dynamic HTML
    routeModule.isDev === true || // If this is not SSG or does not have static paths, then it supports
    // dynamic HTML.
    !isIsr;
    // This is a revalidation request if the request is for a static
    // page and it is not being resumed from a postponed render and
    // it is not a dynamic RSC request then it is a revalidation
    // request.
    const isStaticGeneration = isIsr && !supportsDynamicResponse;
    // Before rendering (which initializes component tree modules), we have to
    // set the reference manifests to our global store so Server Action's
    // encryption util can access to them at the top level of the page module.
    if (serverActionsManifest && clientReferenceManifest) {
        (0,next_dist_server_app_render_manifests_singleton__WEBPACK_IMPORTED_MODULE_5__.setManifestsSingleton)({
            page: srcPage,
            clientReferenceManifest,
            serverActionsManifest
        });
    }
    const method = req.method || 'GET';
    const tracer = (0,next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.getTracer)();
    const activeSpan = tracer.getActiveScopeSpan();
    const isWrappedByNextServer = Boolean(routerServerContext == null ? void 0 : routerServerContext.isWrappedByNextServer);
    const isMinimalMode = Boolean((0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'minimalMode'));
    const incrementalCache = (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'incrementalCache') || await routeModule.getIncrementalCache(req, nextConfig, prerenderManifest, isMinimalMode);
    incrementalCache == null ? void 0 : incrementalCache.resetRequestCache();
    globalThis.__incrementalCache = incrementalCache;
    const context = {
        params,
        previewProps: prerenderManifest.preview,
        renderOpts: {
            experimental: {
                authInterrupts: Boolean(nextConfig.experimental.authInterrupts),
                useCacheTimeout: nextConfig.experimental.useCacheTimeout
            },
            cacheComponents: Boolean(nextConfig.cacheComponents),
            validationLevel: nextConfig.experimental.instantInsights.validationLevel,
            supportsDynamicResponse,
            incrementalCache,
            hmrRefreshHash: (0,next_dist_server_request_meta__WEBPACK_IMPORTED_MODULE_3__.getRequestMeta)(req, 'hmrRefreshHash'),
            cacheLifeProfiles: nextConfig.cacheLife,
            staticPageGenerationTimeout: nextConfig.staticPageGenerationTimeout,
            waitUntil: ctx.waitUntil,
            onClose: (cb)=>{
                res.on('close', cb);
            },
            onAfterTaskError: undefined,
            onInstrumentationRequestError: (error, _request, errorContext, silenceLog)=>routeModule.onRequestError(req, error, errorContext, silenceLog, routerServerContext)
        },
        sharedContext: {
            buildId,
            deploymentId
        }
    };
    const nodeNextReq = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextRequest(req);
    const nodeNextRes = new next_dist_server_base_http_node__WEBPACK_IMPORTED_MODULE_7__.NodeNextResponse(res);
    const nextReq = next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.NextRequestAdapter.fromNodeNextRequest(nodeNextReq, (0,next_dist_server_web_spec_extension_adapters_next_request__WEBPACK_IMPORTED_MODULE_8__.signalFromNodeResponse)(res));
    const responseGenerator = async ({ previousCacheEntry })=>{
        try {
            if (!isMinimalMode && isOnDemandRevalidate && revalidateOnlyGenerated && !previousCacheEntry) {
                res.statusCode = 404;
                // on-demand revalidate always sets this header
                res.setHeader('x-nextjs-cache', 'REVALIDATED');
                res.end('This page could not be found');
                return null;
            }
            const response = await routeModule.handle(nextReq, context);
            req.fetchMetrics = context.renderOpts.fetchMetrics;
            let pendingWaitUntil = context.renderOpts.pendingWaitUntil;
            // Attempt using provided waitUntil if available
            // if it's not we fallback to sendResponse's handling
            if (pendingWaitUntil) {
                if (ctx.waitUntil) {
                    ctx.waitUntil(pendingWaitUntil);
                    pendingWaitUntil = undefined;
                }
            }
            const cacheTags = context.renderOpts.collectedTags;
            // If the request is for a static response, we can cache it so long
            // as it's not edge.
            if (isIsr) {
                const blob = await response.blob();
                // Copy the headers from the response.
                const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.toNodeOutgoingHttpHeaders)(response.headers);
                if (cacheTags) {
                    headers[next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER] = cacheTags;
                }
                if (!headers['content-type'] && blob.type) {
                    headers['content-type'] = blob.type;
                }
                const revalidate = typeof context.renderOpts.collectedRevalidate === 'undefined' || context.renderOpts.collectedRevalidate >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? false : context.renderOpts.collectedRevalidate;
                const expire = typeof context.renderOpts.collectedExpire === 'undefined' || context.renderOpts.collectedExpire >= next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.INFINITE_CACHE ? // route has a numeric `revalidate` but didn't declare an
                // explicit `expire` (e.g. via `cacheLife`). This mirrors the
                // build-time fallback in `build/index.ts` so cache entries
                // and the response Cache-Control header agree on the route's
                // effective expire. Routes that opt out of revalidation
                // (`revalidate: false`) or that are dynamic (`revalidate: 0`)
                // keep `expire: undefined`.
                revalidate !== false && revalidate > 0 ? nextConfig.expireTime : undefined : context.renderOpts.collectedExpire;
                // Create the cache entry for the response.
                const cacheEntry = {
                    value: {
                        kind: next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE,
                        status: response.status,
                        body: Buffer.from(await blob.arrayBuffer()),
                        headers
                    },
                    cacheControl: {
                        revalidate,
                        expire
                    }
                };
                return cacheEntry;
            } else {
                // send response without caching if not ISR
                await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, response, pendingWaitUntil);
                return null;
            }
        } catch (err) {
            // if this is a background revalidate we need to report
            // the request error here as it won't be bubbled
            if (previousCacheEntry == null ? void 0 : previousCacheEntry.isStale) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: srcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            throw err;
        }
    };
    const handleResponse = async (currentSpan, parentSpan)=>{
        try {
            var _cacheEntry_value;
            const cacheEntry = await routeModule.handleResponse({
                req,
                nextConfig,
                cacheKey,
                routeKind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,
                isFallback: false,
                prerenderManifest,
                isRoutePPREnabled: false,
                isOnDemandRevalidate,
                revalidateOnlyGenerated,
                responseGenerator,
                waitUntil: ctx.waitUntil,
                isMinimalMode
            });
            // we don't create a cacheEntry for ISR
            if (!isIsr) {
                return;
            }
            if ((cacheEntry == null ? void 0 : (_cacheEntry_value = cacheEntry.value) == null ? void 0 : _cacheEntry_value.kind) !== next_dist_server_response_cache__WEBPACK_IMPORTED_MODULE_16__.CachedRouteKind.APP_ROUTE) {
                var _cacheEntry_value1;
                throw Object.defineProperty(new Error(`Invariant: app-route received invalid cache entry ${cacheEntry == null ? void 0 : (_cacheEntry_value1 = cacheEntry.value) == null ? void 0 : _cacheEntry_value1.kind}`), "__NEXT_ERROR_CODE", {
                    value: "E701",
                    enumerable: false,
                    configurable: true
                });
            }
            if (!isMinimalMode) {
                res.setHeader('x-nextjs-cache', isOnDemandRevalidate ? 'REVALIDATED' : cacheEntry.isMiss ? 'MISS' : cacheEntry.isStale ? 'STALE' : 'HIT');
            }
            // Draft mode should never be cached
            if (isDraftMode) {
                res.setHeader('Cache-Control', 'private, no-cache, no-store, max-age=0, must-revalidate');
            }
            const headers = (0,next_dist_server_web_utils__WEBPACK_IMPORTED_MODULE_12__.fromNodeOutgoingHttpHeaders)(cacheEntry.value.headers);
            if (!(isMinimalMode && isIsr)) {
                headers.delete(next_dist_lib_constants__WEBPACK_IMPORTED_MODULE_14__.NEXT_CACHE_TAGS_HEADER);
            }
            // If cache control is already set on the response we don't
            // override it to allow users to customize it via next.config
            if (cacheEntry.cacheControl && !res.getHeader('Cache-Control') && !headers.get('Cache-Control')) {
                headers.set('Cache-Control', (0,next_dist_server_lib_cache_control__WEBPACK_IMPORTED_MODULE_13__.getCacheControlHeader)(cacheEntry.cacheControl));
            }
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, // @ts-expect-error - Argument of type 'Buffer<ArrayBufferLike>' is not assignable to parameter of type 'BodyInit | null | undefined'.
            new Response(cacheEntry.value.body, {
                headers,
                status: cacheEntry.value.status || 200
            }));
            return;
        } catch (err) {
            if (!(err instanceof next_dist_shared_lib_no_fallback_error_external__WEBPACK_IMPORTED_MODULE_15__.NoFallbackError)) {
                const silenceLog = false;
                await routeModule.onRequestError(req, err, {
                    routerKind: 'App Router',
                    routePath: normalizedSrcPage,
                    routeType: 'route',
                    revalidateReason: (0,next_dist_server_instrumentation_utils__WEBPACK_IMPORTED_MODULE_10__.getRevalidateReason)({
                        isStaticGeneration,
                        isOnDemandRevalidate
                    })
                }, silenceLog, routerServerContext);
            }
            // rethrow so that we can handle serving error page
            // If this is during static generation, throw the error again.
            if (isIsr) throw err;
            // Otherwise, send a 500 response.
            await (0,next_dist_server_send_response__WEBPACK_IMPORTED_MODULE_11__/* .sendResponse */ .I)(nodeNextReq, nodeNextRes, new Response(null, {
                status: 500
            }));
            return;
        } finally{
            ;
            (()=>{
                if (!currentSpan) {
                    return;
                }
                let statusCode = res.statusCode;
                currentSpan.setAttributes({
                    'http.status_code': statusCode,
                    'next.rsc': false
                });
                if (statusCode && statusCode >= 500) {
                    // For 5xx status codes: SHOULD be set to 'Error' span status.
                    // x-ref: https://opentelemetry.io/docs/specs/semconv/http/http-spans/#status
                    currentSpan.setStatus({
                        code: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanStatusCode.ERROR
                    });
                    // For span status 'Error', SHOULD set 'error.type' attribute.
                    currentSpan.setAttribute('error.type', statusCode.toString());
                }
                const rootSpanAttributes = tracer.getRootSpanAttributes();
                // We were unable to get attributes, probably OTEL is not enabled
                if (!rootSpanAttributes) {
                    return;
                }
                if (rootSpanAttributes.get('next.span_type') !== next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest) {
                    console.warn(`Unexpected root span type '${rootSpanAttributes.get('next.span_type')}'. Please report this Next.js issue https://github.com/vercel/next.js`);
                    return;
                }
                const route = rootSpanAttributes.get('next.route') || normalizedSrcPage;
                const name = `${method} ${route}`;
                currentSpan.setAttributes({
                    'next.route': route,
                    'http.route': route,
                    'next.span_name': name
                });
                currentSpan.updateName(name);
                // Propagate http.route to the parent span if one exists (e.g.
                // a platform-created HTTP span in adapter deployments).
                if (parentSpan && parentSpan !== currentSpan) {
                    parentSpan.setAttribute('http.route', route);
                    parentSpan.updateName(name);
                }
            })();
        }
    };
    // TODO: activeSpan code path is for when wrapped by
    // next-server can be removed when this is no longer used
    if (isWrappedByNextServer && activeSpan) {
        await handleResponse(activeSpan, undefined);
    } else {
        let parentSpan = tracer.getActiveScopeSpan();
        await tracer.withPropagatedContext(req.headers, ()=>tracer.trace(next_dist_server_lib_trace_constants__WEBPACK_IMPORTED_MODULE_9__.BaseServerSpan.handleRequest, {
                spanName: `${method} ${srcPage}`,
                kind: next_dist_server_lib_trace_tracer__WEBPACK_IMPORTED_MODULE_4__.SpanKind.SERVER,
                attributes: {
                    'http.method': method,
                    'http.target': req.url
                }
            }, (span)=>handleResponse(span, parentSpan)), undefined, !isWrappedByNextServer);
    }
}

//# sourceMappingURL=app-route.js.map


/***/ }),

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   h: () => (/* binding */ createLogger)
/* harmony export */ });
/**
 * Shared logger used across the app for request tracing and diagnostics.
 *
 * It centralizes log formatting, log-level filtering, and console emission so
 * routes and services can record operational events consistently without
 * duplicating configuration or message formatting logic.
 */ const LOG_LEVELS = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
};
function getMinLevel() {
    const env = (process.env.LOG_LEVEL ?? 'info').toLowerCase();
    return env in LOG_LEVELS ? env : 'info';
}
function isJsonFormat() {
    return process.env.LOG_FORMAT === 'json';
}
function formatLine(level, tag, args) {
    const timestamp = new Date().toISOString();
    const upperLevel = level.toUpperCase();
    const msg = args.map((a)=>a instanceof Error ? a.stack ?? a.message : typeof a === 'string' ? a : JSON.stringify(a)).join(' ');
    if (isJsonFormat()) {
        return JSON.stringify({
            timestamp,
            level: upperLevel,
            tag,
            message: msg
        });
    }
    return `[${timestamp}] [${upperLevel}] [${tag}] ${msg}`;
}
function createLogger(tag) {
    const emit = (level, args)=>{
        if (LOG_LEVELS[level] < LOG_LEVELS[getMinLevel()]) return;
        const line = formatLine(level, tag, args);
        // Console output
        const fn = level === 'debug' ? console.debug : level === 'warn' ? console.warn : level === 'error' ? console.error : console.log;
        fn(line);
    };
    return {
        debug: (...args)=>emit('debug', args),
        info: (...args)=>emit('info', args),
        warn: (...args)=>emit('warn', args),
        error: (...args)=>emit('error', args)
    };
}


/***/ }),

/***/ 663033:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 673429:
/***/ ((module) => {

module.exports = require("node:util/types");

/***/ }),

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 775919:
/***/ ((module) => {

module.exports = require("node:worker_threads");

/***/ }),

/***/ 777030:
/***/ ((module) => {

module.exports = require("node:net");

/***/ }),

/***/ 840610:
/***/ ((module) => {

module.exports = require("node:dns");

/***/ }),

/***/ 863775:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   POST: () => (/* binding */ POST),
/* harmony export */   maxDuration: () => (/* binding */ maxDuration),
/* harmony export */   runtime: () => (/* binding */ runtime)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
/* harmony import */ var _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(362768);
/* harmony import */ var _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(375556);
/* harmony import */ var _lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(256899);
/* harmony import */ var _lib_agent_knowledge_audio_pipeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(69985);
/* harmony import */ var _lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(315072);
/* harmony import */ var _lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(23776);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__, _lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__, _lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * POST /api/knowledge/drive/import  { fileId, name, mimeType }
 *   → { sourceId, status: 'pending' }
 *
 * Imports one file from the CONNECTED user's Drive: creates a pending
 * KnowledgeSource row immediately, then downloads (binary alt=media, or
 * Google-native docs via export) and runs the standard ingest pipeline in the
 * background — same pattern as URL imports, so the client polls
 * GET /api/knowledge/sources for progress.
 */ 









const runtime = 'nodejs';
const maxDuration = 300;
const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_9__/* .createLogger */ .h)('DriveImport');
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .FB)(async (req)=>{
    if (!(0,_lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__/* .isDriveConfigured */ .dl)()) {
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Google Drive is not configured on this server (missing GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET).'
        }, {
            status: 400
        });
    }
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .resolveUserId */ .n$)();
    const body = await req.json().catch(()=>({}));
    const fileId = typeof body.fileId === 'string' ? body.fileId.trim() : '';
    const name = typeof body.name === 'string' ? body.name.trim().slice(0, 200) : '';
    const mimeType = typeof body.mimeType === 'string' ? body.mimeType.trim() : '';
    if (!fileId || !name) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('fileId and name are required');
    if (!(0,_lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__/* .isImportable */ .E5)({
        mimeType
    })) {
        return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('Folders and unsupported Google items cannot be imported.');
    }
    const source = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.create({
        data: {
            userId,
            name: name.slice(0, 200),
            type: 'url',
            status: 'pending',
            fileKind: 'url'
        }
    });
    void processDriveImport(userId, source.id, {
        fileId,
        name,
        mimeType
    }).catch((error)=>{
        log.error?.(`drive import crashed for source ${source.id}:`, error);
        _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.update({
            where: {
                id: source.id
            },
            data: {
                status: 'failed',
                error: (error instanceof Error ? error.message : String(error)).slice(0, 500)
            }
        }).catch(()=>{});
    });
    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
        sourceId: source.id,
        status: 'pending'
    });
});
async function processDriveImport(userId, sourceId, file) {
    await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            status: 'processing',
            error: null
        }
    });
    const download = await (0,_lib_agent_knowledge_google_drive__WEBPACK_IMPORTED_MODULE_8__/* .downloadDriveFile */ .jj)(userId, {
        id: file.fileId,
        name: file.name,
        mimeType: file.mimeType
    });
    const parsed = await (0,_lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_5__.parseMediaFile)(download.fileName, download.buffer, download.mimeType);
    // Retain the originals: audio → audio-store (Transcript Studio playback),
    // image / video / PDF → file-store (original-view preview + media
    // attachment to generated questions + citation "view original").
    const audioMeta = {};
    if (parsed.fileKind === 'audio') {
        const retained = await (0,_lib_agent_knowledge_audio_pipeline__WEBPACK_IMPORTED_MODULE_6__/* .retainAudioFile */ .UZ)(sourceId, download.buffer);
        if (retained.retained) {
            audioMeta.audioMime = retained.mime;
            audioMeta.audioBytes = retained.bytes;
        }
    } else if (parsed.fileKind === 'image' || parsed.fileKind === 'video' || parsed.mimeType === 'application/pdf') {
        const retained = (0,_lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_7__/* .retainOriginalFile */ .VW)(sourceId, download.buffer, download.mimeType || undefined);
        if (retained.retained) {
            audioMeta.originalMime = retained.mime;
            audioMeta.originalBytes = retained.bytes;
        }
    }
    if (download.fileName) audioMeta.originalName = download.fileName.slice(0, 200);
    await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .ingestSource */ .Kk)({
        userId,
        sourceId,
        type: 'file',
        name: download.fileName,
        fileKind: parsed.fileKind,
        meta: {
            platform: 'google-drive-connected',
            driveFileId: file.fileId,
            sourceUrl: `https://drive.google.com/file/d/${file.fileId}/view`,
            ...parsed.meta || {},
            ...audioMeta
        },
        parsed: {
            title: download.fileName,
            mimeType: parsed.mimeType,
            text: parsed.text
        },
        payload: {}
    });
    log.info?.(`drive source ${sourceId} ingested: ${download.fileName}`);
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 902381:
/***/ ((module) => {

module.exports = import("z-ai-web-dev-sdk");;

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 927910:
/***/ ((module) => {

module.exports = require("stream");

/***/ }),

/***/ 932467:
/***/ ((module) => {

module.exports = require("node:http2");

/***/ }),

/***/ 937067:
/***/ ((module) => {

module.exports = require("node:http");

/***/ }),

/***/ 973024:
/***/ ((module) => {

module.exports = require("node:fs");

/***/ }),

/***/ 977598:
/***/ ((module) => {

module.exports = require("node:crypto");

/***/ }),

/***/ 979428:
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035,2538,9985,5556,6899], () => (__webpack_exec__(629406)));
module.exports = __webpack_exports__;

})();