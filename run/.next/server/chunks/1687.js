exports.id = 1687;
exports.ids = [1687,6389];
exports.modules = {

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 104144:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Wg: () => (/* binding */ searchAnatomyImages),
/* harmony export */   c9: () => (/* binding */ searchSketchfabModels),
/* harmony export */   i0: () => (/* binding */ pickSuggestedModel)
/* harmony export */ });
/* unused harmony exports SKETCHFAB_SEARCH_URL, buildEmbedUrl, augmentQuery */
/* harmony import */ var _lib_zai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(376389);
/**
 * Shared helpers for the anatomy-discover API family.
 *
 * Two routes consume this:
 *   - /api/anatomy-discover/sketchfab  (fast: ~1-3s) — Sketchfab v3 search
 *   - /api/anatomy-discover/images     (slow: ~15-50s) — ZAI image search
 *
 * Splitting the sources into separate routes lets the frontend fire both
 * requests in parallel and render Sketchfab results immediately, while
 * image results stream in whenever they arrive. The old combined
 * /api/anatomy-discover route was a single bottleneck — the user saw
 * nothing until BOTH sources finished.
 */ 
// ── Constants ──────────────────────────────────────────────────────────
const SKETCHFAB_SEARCH_URL = 'https://api.sketchfab.com/v3/search';
// ── Helpers ────────────────────────────────────────────────────────────
/**
 * Pick the best thumbnail URL from Sketchfab's thumbnails.images array.
 * Sketchfab returns an array of {url, width, height, uid} entries at
 * various sizes. Prefer the one closest to ~600px wide.
 */ function pickThumbnail(thumbs) {
    if (!thumbs || typeof thumbs !== 'object') return null;
    const images = thumbs.images;
    if (!Array.isArray(images) || images.length === 0) return null;
    const sorted = [
        ...images
    ].sort((a, b)=>Math.abs((a.width ?? 0) - 600) - Math.abs((b.width ?? 0) - 600));
    return sorted[0]?.url ?? null;
}
function buildEmbedUrl(uid) {
    const params = new URLSearchParams({
        autospin: '0.2',
        autostart: '1',
        preload: '1',
        ui_infos: '1',
        ui_controls: '1',
        ui_watermark: '0',
        ui_help: '0',
        ui_settings: '1',
        ui_inspector: '1',
        ui_annotations: '1',
        ui_hint: '0'
    });
    return `https://sketchfab.com/models/${uid}/embed?${params.toString()}`;
}
/**
 * Augment the user's raw query with "anatomy" unless they already typed
 * that word. Sketchfab's search is keyword-based and not anatomy-aware —
 * a raw query like "heart chambers" matches "gun chambers" too (verified
 * empirically). Appending "anatomy" pushes the relevance rank toward
 * medical content.
 */ function augmentQuery(query) {
    const trimmed = query.trim();
    const alreadyHasAnatomy = /\banatomy\b/i.test(trimmed);
    return alreadyHasAnatomy ? trimmed : `${trimmed} anatomy`;
}
/**
 * Search Sketchfab's public model catalog. No API key required.
 * Returns up to `count` models matching `query`.
 */ async function searchSketchfabModels(query, count) {
    const searchQ = augmentQuery(query);
    const url = new URL(SKETCHFAB_SEARCH_URL);
    url.searchParams.set('type', 'models');
    url.searchParams.set('q', searchQ);
    url.searchParams.set('count', String(Math.min(Math.max(count, 1), 24)));
    url.searchParams.set('downloadable', 'false');
    // NOTE: do NOT set sort_by=relevance — Sketchfab's explicit "relevance"
    // sort ignores popularity and surfaces 0-likes uploads. The default
    // sort (omitted param) returns popular + relevant models (verified:
    // "heart anatomy" → [Animation] Human Heart w/ 908 likes, 473k views).
    try {
        const res = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'User-Agent': 'MedQ-Anatomy-Visualizer/1.0 (medical education app)'
            },
            cache: 'no-store'
        });
        if (!res.ok) {
            return {
                models: [],
                error: `Sketchfab search returned HTTP ${res.status} ${res.statusText}`
            };
        }
        const json = await res.json();
        const results = json.results ?? [];
        const models = results.map((r)=>{
            const uid = typeof r.uid === 'string' ? r.uid : null;
            if (!uid) return null;
            const name = typeof r.name === 'string' ? r.name : 'Untitled model';
            const viewerUrl = typeof r.viewerUrl === 'string' ? r.viewerUrl : `https://sketchfab.com/3d-models/${uid}`;
            const user = r.user;
            const author = user?.displayName || user?.username || 'Unknown';
            const likeCount = typeof r.likeCount === 'number' ? r.likeCount : 0;
            const viewCount = typeof r.viewCount === 'number' ? r.viewCount : 0;
            const description = typeof r.description === 'string' ? r.description.slice(0, 280) : '';
            const isDownloadable = Boolean(r.isDownloadable);
            const thumbnailUrl = pickThumbnail(r.thumbnails);
            return {
                uid,
                name,
                viewerUrl,
                embedUrl: buildEmbedUrl(uid),
                thumbnailUrl,
                author,
                likeCount,
                viewCount,
                description,
                isDownloadable
            };
        }).filter((m)=>m !== null);
        return {
            models
        };
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown Sketchfab fetch error';
        return {
            models: [],
            error: msg
        };
    }
}
/**
 * Pick the "best" model uid from a list of search results for the given
 * query. Heuristic: among models whose NAME contains a significant token
 * from the user's query, pick the one with the highest likeCount. If no
 * name matches, fall back to the highest-likeCount model overall.
 */ function pickSuggestedModel(models, query) {
    if (models.length === 0) return undefined;
    const stop = new Set([
        'the',
        'a',
        'an',
        'of',
        'and',
        'or',
        'in',
        'on',
        'to',
        'for',
        'with',
        'human',
        'model',
        '3d',
        'anatomy'
    ]);
    const tokens = query.toLowerCase().split(/[^a-z0-9]+/).filter((t)=>t.length >= 3 && !stop.has(t));
    const nameMatched = models.filter((m)=>{
        const n = m.name.toLowerCase();
        return tokens.some((t)=>n.includes(t));
    });
    const pool = nameMatched.length > 0 ? nameMatched : models;
    return [
        ...pool
    ].sort((a, b)=>b.likeCount - a.likeCount)[0]?.uid;
}
/**
 * Search for medical/anatomy images via ZAI image search. Slow (~15-50s)
 * because ZAI's image search hits multiple providers under the hood.
 *
 * Calls z-ai-web-dev-sdk directly: zai.images.search.create({query, count}).
 * Response shape (defensive against SDK drift):
 *   { results?: [{ original_url?, url?, caption?, source?, original_width?, original_height? }] }
 *   — or — { data?: [...] }
 */ async function searchAnatomyImages(query, system, count) {
    // Augment with system context + "anatomy medical illustration"
    const imageQuery = [
        query,
        system,
        'anatomy medical illustration'
    ].filter(Boolean).join(' ');
    try {
        const zai = await (0,_lib_zai__WEBPACK_IMPORTED_MODULE_0__.createZAI)();
        const result = await zai.images.search.create({
            query: imageQuery,
            count: Math.min(Math.max(count, 1), 12)
        });
        // Normalize the response into an array of { url, caption? } items
        const rawResults = result?.results || result?.data || [];
        const images = rawResults.map((r)=>({
                url: r.original_url || r.url || '',
                caption: r.caption || undefined,
                source: r.source || undefined,
                width: r.original_width || undefined,
                height: r.original_height || undefined
            })).filter((r)=>r.url);
        return {
            images
        };
    } catch (err) {
        const msg = err instanceof Error ? err.message : 'Unknown image search error';
        return {
            images: [],
            error: msg
        };
    }
}


/***/ }),

/***/ 192280:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
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

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 319225:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

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

/***/ 376389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createZAI: () => (/* binding */ createZAI),
/* harmony export */   readConfig: () => (/* binding */ readConfig)
/* harmony export */ });
/* unused harmony exports updateConfigToken, hasToken */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_2__);
/**
 * ZAI SDK Wrapper — Handles dynamic token management and config updates.
 *
 * The z-ai-web-dev-sdk reads from .z-ai-config, but the API gateway
 * now requires an X-Token header. This utility:
 * 1. Reads the current config
 * 2. Allows dynamic token updates (e.g., from environment or request)
 * 3. Caches the ZAI instance for reuse within a request
 */ 


async function getZaiSdk() {
    try {
        const loader = new Function('return import("z-ai-web-dev-sdk")');
        const mod = await loader();
        return mod?.default ?? mod ?? null;
    } catch  {
        return null;
    }
}
const CONFIG_PATHS = [
    path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), '.z-ai-config'),
    path__WEBPACK_IMPORTED_MODULE_1___default().join(os__WEBPACK_IMPORTED_MODULE_2___default().homedir(), '.z-ai-config'),
    '/etc/.z-ai-config'
];
/**
 * Read the current ZAI config.
 *
 * Resolution order:
 *   1. `.z-ai-config` file (project / home / /etc) — original SDK behavior
 *   2. Env vars: `ZAI_API_KEY` (+ optional `ZAI_BASE_URL`)
 *      Also accepts `GLM_API_KEY` / `GLM_BASE_URL` as aliases (same service).
 *
 * The env-var fallback lets deployments (Docker, Vercel, CI) inject
 * credentials without writing a JSON file to disk, and lets the
 * `isServerConfigured` gate flip to true for the OpenMAIC UI.
 */ function readConfig() {
    // 1. File-based config (preferred — may include token, chatId, userId)
    for (const p of CONFIG_PATHS){
        try {
            const raw = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(p, 'utf-8');
            const config = JSON.parse(raw);
            if (config.baseUrl && config.apiKey) return config;
        } catch  {
        // continue
        }
    }
    // 2. Env-var fallback
    const envApiKey = process.env.ZAI_API_KEY || process.env.GLM_API_KEY;
    if (envApiKey) {
        const envBaseUrl = process.env.ZAI_BASE_URL || process.env.GLM_BASE_URL || 'https://api.z.ai/api/paas/v4';
        return {
            baseUrl: envBaseUrl,
            apiKey: envApiKey
        };
    }
    return null;
}
/** Write the project-level .z-ai-config with an updated token.
 *  Silently skips the write when the file is read-only (e.g. when it's a
 *  symlink to /etc/.z-ai-config owned by root) — the in-memory config is
 *  still returned so the caller can use it. The warn is downgraded from
 *  console.warn to a no-op because the warning fired on every single ZAI
 *  request when .z-ai-config was deployed as a non-writable symlink, which
 *  is the documented production deployment pattern. */ function updateConfigToken(token) {
    const configPath = CONFIG_PATHS[0]; // project-level
    // Default config — reads from env vars or uses null sentinel if unconfigured.
    // (Previously hardcoded a sandbox-internal IP; now degrades gracefully when
    // no .z-ai-config exists, so the auto-detect fallback can kick in instead.)
    let config = readConfig();
    if (!config) {
        // No .z-ai-config found — ZAI is not configured. Return a minimal config
        // with the token so the caller can attempt to use it (ZAI.create() will
        // fail if the SDK can't find a config, which is the correct behavior —
        // the auto-detect system will then fall back to other providers).
        config = {
            baseUrl: process.env.ZAI_BASE_URL || '',
            apiKey: process.env.ZAI_API_KEY || '',
            token
        };
        return config;
    }
    // Skip the write entirely if the existing config already has this token —
    // common case after the first request (the token doesn't change between
    // requests, so the write is redundant and just produces EACCES noise on
    // non-writable deployments).
    if (config.token === token) {
        return config;
    }
    config.token = token;
    try {
        // Ensure file is writable before writing
        try {
            fs__WEBPACK_IMPORTED_MODULE_0___default().chmodSync(configPath, 420);
        } catch  {}
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
    } catch  {
    // EACCES / EROFS / EISDIR: file is not writable (typically a symlink to
    // /etc/.z-ai-config owned by root). The in-memory config is still valid,
    // so the caller proceeds normally. Silently ignored — the warning fired
    // on every ZAI request in production deployments using a read-only
    // symlink, which is the documented deployment pattern.
    }
    return config;
}
/**
 * Create a ZAI instance with optional token override.
 *
 * Resolution:
 *   1. If a token is provided, persist it to `.z-ai-config` so the SDK's
 *      own `ZAI.create()` picks it up (existing behavior).
 *   2. Otherwise — and whenever `.z-ai-config` is absent but env vars are
 *      set — bypass `ZAI.create()` and instantiate directly with the
 *      env-var-resolved config. This is necessary because the SDK's
 *      `loadConfig()` only reads files and throws otherwise.
 *
 * Note: the SDK marks its constructor as `private` in the .d.ts to force
 * callers through `ZAI.create()`. At runtime the constructor is a plain
 * function, so we cast to bypass the TS check. This lets us inject an
 * env-var-resolved config without writing a temp file to disk.
 */ async function createZAI(token) {
    if (token) {
        updateConfigToken(token);
    }
    const ZAI = await getZaiSdk();
    if (!ZAI) {
        throw new Error('This project is configured to use the BYOK/provider flow. Configure a provider key or model in the app instead of the missing ZAI SDK.');
    }
    const config = readConfig();
    if (config) {
        const Ctor = ZAI;
        return new Ctor(config);
    }
    return ZAI.create();
}
/** Check if the current config has a non-empty token */ function hasToken() {
    const config = readConfig();
    return !!config?.token && config.token.trim().length > 0;
}


/***/ }),

/***/ 653165:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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


/***/ })

};
;