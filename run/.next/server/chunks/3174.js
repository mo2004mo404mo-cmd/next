"use strict";
exports.id = 3174;
exports.ids = [3174];
exports.modules = {

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

/***/ 453062:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AO: () => (/* binding */ UploadSessionError),
/* harmony export */   NW: () => (/* binding */ uploadStore),
/* harmony export */   sR: () => (/* binding */ DEFAULT_MAX_AGE_MS)
/* harmony export */ });
/* unused harmony exports isUploadId, DEFAULT_CHUNK_BYTES, totalChunksFor, expectedChunkSize, missingChunkIndexes, createUploadStore */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(455511);
/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_2__);
/**
 * upload-session-store.ts — disk-backed RESUMABLE upload sessions (Stage 13).
 *
 * Problem being solved: uploads used to be ONE multipart POST. A large file
 * (15–100 MB) that stalled mid-transfer died with the connection — the user
 * lost everything and had to restart from byte zero. Refreshing the page was
 * just as fatal.
 *
 * Design: the client opens a session, sends the file in idempotent chunks,
 * and can ask the server at any moment "which chunks do you already have?"
 * so a reconnect/refresh/re-pick resumes from the last confirmed chunk.
 *
 *   POST   /api/uploads                        open a session (tier-capped)
 *   PUT    /api/uploads/:id/chunks/:n          idempotent chunk upload
 *   GET    /api/uploads/:id                    status → which chunks landed
 *   POST   /api/uploads/:id/complete           assemble + verify size
 *
 * Consumers (/api/extract, /api/knowledge/upload) then reference the
 * ASSEMBLED bytes by uploadId — no second full transfer.
 *
 * Store layout (sibling of the existing file-store / audio-store):
 *
 *   upload/upload-sessions/<uploadId>/
 *     manifest.json     session manifest (atomic tmp+rename writes)
 *     chunk-<n>         raw chunk bytes (removed after assembly)
 *     file.bin          assembled file (source of truth once complete)
 *
 * Security:
 *   - ids are UUIDs and validated with a strict hex pattern before ANY
 *     filesystem use (path traversal is structurally impossible)
 *   - sessions are owner-scoped (userId bound at init, checked on every
 *     operation); foreign sessions answer exactly like missing ones (404,
 *     no existence leak)
 *   - sizes are enforced THREE times: at init (tier cap), per chunk
 *     (byte-exact expected size), and at assembly (total must match)
 *
 * Sessions are swept after 24h (MEDQ_UPLOAD_SESSION_MAX_AGE_MS) — they are
 * transport artifacts, not data. The knowledge-ingest consumer deletes the
 * session as soon as ingestion succeeds.
 */ 


/** Typed store error — routes map `code` to an HTTP status. */ class UploadSessionError extends Error {
    constructor(code, message){
        super(message);
        this.name = 'UploadSessionError';
        this.code = code;
    }
}
/** Strict UUID-ish hex pattern — anything else is rejected before fs use. */ const UPLOAD_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function isUploadId(id) {
    return typeof id === 'string' && UPLOAD_ID_RE.test(id);
}
/** 8 MB chunks: big enough for throughput, small enough that a stall costs
 *  one chunk, not the upload. (Client-side uploads are also capped at 8 MB
 *  per request, which keeps memory flat on the server.) */ const DEFAULT_CHUNK_BYTES = 8 * 1024 * 1024;
const MIN_CHUNK_BYTES = 512 * 1024;
const MAX_TOTAL_CHUNKS = 4096;
const MAX_FILE_NAME_LENGTH = 255;
const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000;
function chunkSizeFor(size) {
    return Math.max(MIN_CHUNK_BYTES, Math.min(DEFAULT_CHUNK_BYTES, Math.max(1, size)));
}
function totalChunksFor(size, chunkSize) {
    if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(chunkSize) || chunkSize <= 0) return 0;
    return Math.max(1, Math.ceil(size / chunkSize));
}
/** Exact byte length chunk `index` must have, or -1 when out of range. */ function expectedChunkSize(size, chunkSize, index) {
    const start = index * chunkSize;
    if (!Number.isInteger(index) || index < 0 || start >= size) return -1;
    return Math.min(chunkSize, size - start);
}
/** Indexes in [0, totalChunks) that are NOT in `received`. */ function missingChunkIndexes(received, totalChunks) {
    const set = received instanceof Set ? received : new Set(received);
    const missing = [];
    for(let i = 0; i < totalChunks; i++){
        if (!set.has(i)) missing.push(i);
    }
    return missing;
}
function toStatus(m) {
    return {
        uploadId: m.id,
        fileName: m.fileName,
        mimeType: m.mimeType,
        size: m.size,
        chunkSize: m.chunkSize,
        totalChunks: m.totalChunks,
        receivedChunks: [
            ...m.receivedChunks
        ],
        receivedBytes: m.receivedBytes,
        missingChunks: missingChunkIndexes(m.receivedChunks, m.totalChunks),
        status: m.status
    };
}
/**
 * Create a store bound to a directory. The app uses the default singleton
 * below; tests pass their own tmpdir.
 */ function createUploadStore(rootDir) {
    const root = rootDir;
    const dirFor = (id)=>path__WEBPACK_IMPORTED_MODULE_1___default().join(root, id);
    const manifestPath = (id)=>path__WEBPACK_IMPORTED_MODULE_1___default().join(root, id, 'manifest.json');
    const chunkPath = (id, index)=>path__WEBPACK_IMPORTED_MODULE_1___default().join(root, id, `chunk-${index}`);
    const assembledPath = (id)=>path__WEBPACK_IMPORTED_MODULE_1___default().join(root, id, 'file.bin');
    function readManifest(id) {
        if (!isUploadId(id)) return null;
        try {
            const raw = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(manifestPath(id), 'utf8');
            const m = JSON.parse(raw);
            if (!m || typeof m !== 'object' || m.id !== id) return null;
            return m;
        } catch  {
            return null;
        }
    }
    function writeManifest(m) {
        fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dirFor(m.id), {
            recursive: true
        });
        const tmp = `${manifestPath(m.id)}.tmp`;
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(tmp, JSON.stringify(m, null, 2));
        fs__WEBPACK_IMPORTED_MODULE_0___default().renameSync(tmp, manifestPath(m.id));
    }
    /** Open a new session. Throws UploadSessionError on invalid input / oversize. */ function init(input) {
        if (!input || typeof input.fileName !== 'string' || !input.fileName.trim()) {
            throw new UploadSessionError('bad_request', 'fileName is required');
        }
        const fileName = input.fileName.trim().slice(0, MAX_FILE_NAME_LENGTH);
        const size = input.size;
        if (!Number.isInteger(size) || size <= 0) {
            throw new UploadSessionError('bad_request', 'size must be a positive integer (byte count)');
        }
        if (size > input.maxBytes) {
            throw new UploadSessionError('too_large', `File exceeds the upload cap of ${Math.round(input.maxBytes / 1024 / 1024)}MB`);
        }
        const chunkSize = Math.max(1, input.chunkSize ?? chunkSizeFor(size));
        const totalChunks = totalChunksFor(size, chunkSize);
        if (totalChunks < 1 || totalChunks > MAX_TOTAL_CHUNKS) {
            throw new UploadSessionError('bad_request', 'File needs too many chunks — increase the chunk size');
        }
        const now = Date.now();
        const m = {
            id: crypto__WEBPACK_IMPORTED_MODULE_2___default().randomUUID(),
            userId: input.userId,
            fileName,
            mimeType: typeof input.mimeType === 'string' ? input.mimeType.slice(0, MAX_FILE_NAME_LENGTH) : '',
            size,
            chunkSize,
            totalChunks,
            receivedChunks: [],
            receivedBytes: 0,
            status: 'open',
            createdAt: now,
            updatedAt: now
        };
        fs__WEBPACK_IMPORTED_MODULE_0___default().mkdirSync(dirFor(m.id), {
            recursive: true
        });
        writeManifest(m);
        return toStatus(m);
    }
    /** Fetch a session's public status. Foreign sessions look exactly like
   *  missing ones (null) — no existence leak. */ function get(id, userId) {
        const m = readManifest(id);
        if (!m) return null;
        if (userId !== undefined && m.userId !== userId) return null;
        return toStatus(m);
    }
    /** Store one chunk. Idempotent: re-PUTting a received chunk is a no-op. */ function saveChunk(id, userId, index, buf) {
        const m = readManifest(id);
        if (!m || m.userId !== userId) throw new UploadSessionError('not_found', 'Upload session not found');
        if (m.status === 'complete') {
            throw new UploadSessionError('already_complete', 'Upload already completed');
        }
        if (!Number.isInteger(index) || index < 0 || index >= m.totalChunks) {
            throw new UploadSessionError('bad_index', `Chunk index out of range (0..${m.totalChunks - 1})`);
        }
        const expected = expectedChunkSize(m.size, m.chunkSize, index);
        if (buf.length !== expected) {
            throw new UploadSessionError('chunk_size_mismatch', `Chunk ${index} must be exactly ${expected} bytes (got ${buf.length})`);
        }
        if (m.receivedChunks.includes(index)) return toStatus(m); // idempotent
        const tmp = `${chunkPath(id, index)}.tmp`;
        fs__WEBPACK_IMPORTED_MODULE_0___default().writeFileSync(tmp, buf);
        fs__WEBPACK_IMPORTED_MODULE_0___default().renameSync(tmp, chunkPath(id, index));
        m.receivedChunks = [
            ...m.receivedChunks,
            index
        ].sort((a, b)=>a - b);
        m.receivedBytes += buf.length;
        m.updatedAt = Date.now();
        writeManifest(m);
        return toStatus(m);
    }
    /** Assemble all chunks into file.bin and verify the byte count. */ function assemble(id, userId) {
        const m = readManifest(id);
        if (!m || m.userId !== userId) throw new UploadSessionError('not_found', 'Upload session not found');
        if (m.status === 'complete') {
            return {
                uploadId: m.id,
                fileName: m.fileName,
                mimeType: m.mimeType,
                size: m.size
            };
        }
        const missing = missingChunkIndexes(m.receivedChunks, m.totalChunks);
        if (missing.length > 0) {
            const shown = missing.slice(0, 8).join(', ');
            throw new UploadSessionError('incomplete', `Upload incomplete — missing ${missing.length} chunk(s): ${shown}${missing.length > 8 ? '…' : ''}`);
        }
        const out = assembledPath(id);
        const tmp = `${out}.tmp`;
        const fd = fs__WEBPACK_IMPORTED_MODULE_0___default().openSync(tmp, 'w');
        try {
            for(let i = 0; i < m.totalChunks; i++){
                const data = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(chunkPath(id, i));
                fs__WEBPACK_IMPORTED_MODULE_0___default().writeSync(fd, data);
            }
        } finally{
            fs__WEBPACK_IMPORTED_MODULE_0___default().closeSync(fd);
        }
        const written = fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(tmp).size;
        if (written !== m.size) {
            fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(tmp, {
                force: true
            });
            throw new UploadSessionError('size_mismatch', `Assembled file is ${written} bytes, expected ${m.size}`);
        }
        fs__WEBPACK_IMPORTED_MODULE_0___default().renameSync(tmp, out);
        m.status = 'complete';
        m.updatedAt = Date.now();
        writeManifest(m);
        // The chunks are baked into file.bin — reclaim the duplicate bytes.
        for(let i = 0; i < m.totalChunks; i++){
            try {
                fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(chunkPath(id, i), {
                    force: true
                });
            } catch  {
            /* best-effort */ }
        }
        return {
            uploadId: m.id,
            fileName: m.fileName,
            mimeType: m.mimeType,
            size: m.size
        };
    }
    /** Read the assembled bytes back (owner-only, complete sessions only). */ function readAssembled(id, userId) {
        const m = readManifest(id);
        if (!m || m.userId !== userId || m.status !== 'complete') return null;
        try {
            const buffer = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(assembledPath(id));
            if (buffer.length !== m.size) return null;
            return {
                buffer,
                fileName: m.fileName,
                mimeType: m.mimeType,
                size: m.size
            };
        } catch  {
            return null;
        }
    }
    /** Delete a session (owner-scoped when userId is given). Best-effort. */ function remove(id, userId) {
        const m = readManifest(id);
        if (!m) return;
        if (userId !== undefined && m.userId !== userId) return;
        try {
            fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(dirFor(id), {
                recursive: true,
                force: true
            });
        } catch  {
        /* best-effort */ }
    }
    /** Drop sessions whose directory hasn't been touched within maxAgeMs. */ function sweep(maxAgeMs = DEFAULT_MAX_AGE_MS) {
        let entries = [];
        try {
            entries = fs__WEBPACK_IMPORTED_MODULE_0___default().readdirSync(root);
        } catch  {
            return 0;
        }
        const cutoff = Date.now() - maxAgeMs;
        let removed = 0;
        for (const entry of entries){
            try {
                const full = path__WEBPACK_IMPORTED_MODULE_1___default().join(root, entry);
                const st = fs__WEBPACK_IMPORTED_MODULE_0___default().statSync(full);
                if (st.isDirectory() && st.mtimeMs < cutoff) {
                    fs__WEBPACK_IMPORTED_MODULE_0___default().rmSync(full, {
                        recursive: true,
                        force: true
                    });
                    removed += 1;
                }
            } catch  {
            /* skip unreadable entries */ }
        }
        return removed;
    }
    return {
        rootDir: root,
        init,
        get,
        saveChunk,
        assemble,
        readAssembled,
        remove,
        sweep
    };
}
const UPLOAD_SESSION_ROOT = process.env.MEDQ_UPLOAD_SESSION_DIR || path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), 'upload', 'upload-sessions');
/** App-wide singleton (tests create their own with createUploadStore). */ const uploadStore = createUploadStore(UPLOAD_SESSION_ROOT);


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


/***/ })

};
;