"use strict";
exports.id = 5728;
exports.ids = [3009,5390,5728];
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

/***/ 335593:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ markSourceFailed),
/* harmony export */   k: () => (/* binding */ processExternalUrl)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(256899);
/* harmony import */ var _lib_agent_knowledge_url_source__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(436915);
/* harmony import */ var _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(375556);
/* harmony import */ var _lib_agent_knowledge_audio_pipeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(69985);
/* harmony import */ var _lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(315072);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_0__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_0__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Shared URL-source ingestion — used by POST /api/knowledge/sources (initial
 * import) and POST /api/knowledge/sources/[id]/retry (re-running a failed
 * import, e.g. after a transient YouTube bot-check clears).
 *
 * Kept in its own module so both routes drive the exact same pipeline:
 * fetchExternalSource (yt-dlp / Drive / direct / webpage) → parseMediaFile /
 * ingestSource → chunks + embeddings.
 */ 






const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_6__/* .createLogger */ .h)('KnowledgeUrl');
async function processExternalUrl(userId, sourceId, url) {
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            status: 'processing',
            error: null
        }
    });
    await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .updateSourceProgress */ .OH)(sourceId, 'downloading', 10, 'Downloading — YouTube / Drive links take 1-2 min');
    const plan = await (0,_lib_agent_knowledge_url_source__WEBPACK_IMPORTED_MODULE_2__/* .fetchExternalSource */ .X)(url);
    // Show the resolved title (e.g. the YouTube video title) on the row.
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            name: plan.title.slice(0, 200),
            ...plan.displayKind ? {
                fileKind: plan.displayKind
            } : {}
        }
    }).catch(()=>{});
    if (plan.kind === 'media' && plan.buffer) {
        const isYouTube = /youtu\.?be|youtube\.com/i.test(url);
        await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .updateSourceProgress */ .OH)(sourceId, 'transcribing', 30, isYouTube ? 'Transcribing audio + on-screen text — 1-3 min' : 'Transcribing / analyzing the media');
        const parsed = await (0,_lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_1__.parseMediaFile)(plan.fileName || 'download.bin', plan.buffer, plan.mimeType || '');
        // Retain the originals: audio → audio-store (playback), image / video /
        // PDF → file-store (original-view preview + media attachment + citations).
        const audioMeta = {};
        if (parsed.fileKind === 'audio') {
            const retained = await (0,_lib_agent_knowledge_audio_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .retainAudioFile */ .UZ)(sourceId, plan.buffer);
            if (retained.retained) {
                audioMeta.audioMime = retained.mime;
                audioMeta.audioBytes = retained.bytes;
            }
        } else if (parsed.fileKind === 'image' || parsed.fileKind === 'video' || parsed.mimeType === 'application/pdf') {
            const retained = (0,_lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_5__/* .retainOriginalFile */ .VW)(sourceId, plan.buffer, plan.mimeType || undefined);
            if (retained.retained) {
                audioMeta.originalMime = retained.mime;
                audioMeta.originalBytes = retained.bytes;
            }
        }
        if (plan.fileName) audioMeta.originalName = plan.fileName.slice(0, 200);
        // The stored document should carry the real title (video title, not the temp file name).
        const text = plan.title && plan.fileName && parsed.text.includes(`"${plan.fileName}"`) ? parsed.text.replace(`"${plan.fileName}"`, `"${plan.title}"`) : parsed.text;
        // Stage 3: persist the video scene index (mediaTimeSec navigation).
        if (parsed.fileKind === 'video' && parsed.scenes?.length) {
            try {
                const { persistVideoScenes } = await __webpack_require__.e(/* import() */ 2053).then(__webpack_require__.bind(__webpack_require__, 762053));
                await persistVideoScenes(sourceId, parsed.scenes);
            } catch  {}
        }
        await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .ingestSource */ .Kk)({
            userId,
            sourceId,
            type: 'file',
            name: plan.title,
            fileKind: parsed.fileKind,
            meta: {
                ...plan.meta || {},
                ...parsed.meta || {},
                ...audioMeta
            },
            parsed: {
                title: plan.title,
                mimeType: parsed.mimeType,
                text
            },
            payload: {},
            onProgress: (stage, percent, note)=>void (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .updateSourceProgress */ .OH)(sourceId, stage, percent, note)
        });
    } else {
        await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .ingestSource */ .Kk)({
            userId,
            sourceId,
            type: 'text',
            name: plan.title,
            fileKind: plan.displayKind,
            meta: plan.meta || {},
            parsed: {
                title: plan.title,
                mimeType: 'text/html',
                text: plan.text || ''
            },
            payload: {},
            onProgress: (stage, percent, note)=>void (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_3__/* .updateSourceProgress */ .OH)(sourceId, stage, percent, note)
        });
    }
    log.info?.(`url source ${sourceId} (${plan.meta?.platform || 'web'}) ingested: ${plan.title}`);
}
/** Mark a source failed (crash handler for both routes). */ async function markSourceFailed(sourceId, error) {
    const message = (error instanceof Error ? error.message : String(error)).slice(0, 500);
    log.error?.(`url ingest failed for source ${sourceId}:`, message);
    await _lib_db__WEBPACK_IMPORTED_MODULE_0__.db.knowledgeSource.update({
        where: {
            id: sourceId
        },
        data: {
            status: 'failed',
            error: message
        }
    }).catch(()=>{});
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 436915:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ fetchExternalSource)
/* harmony export */ });
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(579646);
/* harmony import */ var child_process__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(child_process__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(328354);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(321820);
/* harmony import */ var os__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(os__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(653165);
/**
 * knowledge/url-source.ts — ingest cloud-hosted sources into the RAG library.
 *
 * Supported URL shapes:
 *   - YouTube (watch / youtu.be / shorts / embed): the VIDEO is downloaded
 *     with yt-dlp (node as its JS runtime) — ≤480p for videos up to 20 min,
 *     ≤240p beyond (bandwidth/memory) — so the ingest pipeline captures BOTH
 *     the spoken audio (ASR) and the on-screen slides (frame VLM OCR).
 *     Falls back to audio-only when no video stream fits. Requires the
 *     `yt-dlp` binary on PATH (plus ffmpeg, already required for uploads).
 *     Hard cap: 60 minutes (ASR pipeline limit).
 *   - Google Drive share links (file/d/<id>, open?id=): resolved to a direct
 *     download (drive.usercontent.google.com, confirm=t) and parsed as a
 *     regular file. Must be shared "Anyone with the link".
 *   - Google Docs / Sheets (docs.google.com): exported as txt / csv.
 *   - Dropbox share links: dl=1 direct download.
 *   - Any direct file URL (arxiv PDF, hosted mp3 …): downloaded and parsed
 *     by kind (content-type + extension + magic bytes).
 *   - Anything else: falls back to the webpage text extractor.
 *
 * Everything returns a uniform `ExternalSourcePlan` so the API route can run
 * the standard ingest pipeline (parseMediaFile / ingestSource) in the
 * background after responding "pending" to the client.
 */ 





const execFileAsync = (0,util__WEBPACK_IMPORTED_MODULE_1__.promisify)(child_process__WEBPACK_IMPORTED_MODULE_0__.execFile);
const log = (0,_logger__WEBPACK_IMPORTED_MODULE_5__/* .createLogger */ .h)('UrlSource');
const BROWSER_UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36';
/** Hard download cap for URL-sourced files (matches the upload route's audio/video cap). */ const MAX_DOWNLOAD_BYTES = 200 * 1024 * 1024;
/** ASR pipeline caps at 144 × 25 s = 3600 s — reject longer videos up front. */ const MAX_VIDEO_SEC = 3600;
// ─── URL classifiers ───────────────────────────────────────────────────────
function parseYouTubeId(u) {
    const host = u.hostname.replace(/^www\.|^m\./, '');
    if (host !== 'youtube.com' && host !== 'youtube-nocookie.com' && host !== 'youtu.be') return null;
    if (host === 'youtu.be') return u.pathname.slice(1).split('/')[0] || null;
    if (u.pathname === '/watch') return u.searchParams.get('v');
    const m = u.pathname.match(/^\/(shorts|embed|live|v)\/([^/?]+)/);
    return m ? m[2] : null;
}
function parseGoogleDriveId(u) {
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'drive.google.com' && host !== 'docs.google.com') return null;
    const m = u.pathname.match(/^\/(?:file\/d|open|uc)\/?([^/?]+)/);
    if (m) return m[1];
    if (u.pathname.startsWith('/file/d/')) return null;
    return u.searchParams.get('id');
}
function isGoogleDocs(u) {
    const host = u.hostname.replace(/^www\./, '');
    if (host !== 'docs.google.com') return null;
    if (u.pathname.startsWith('/document/d/')) return 'document';
    if (u.pathname.startsWith('/spreadsheets/d/')) return 'spreadsheets';
    return null;
}
function isDropbox(u) {
    return u.hostname.replace(/^www\./, '') === 'dropbox.com';
}
function isYouTubePlaylistOnly(u) {
    return u.hostname.includes('youtube.com') && u.pathname === '/playlist' && !u.searchParams.get('v');
}
// ─── HTTP helpers ──────────────────────────────────────────────────────────
async function fetchWithCap(url, opts = {}) {
    const res = await fetch(url, {
        redirect: 'follow',
        ...opts,
        headers: {
            'user-agent': BROWSER_UA,
            ...opts.headers || {}
        }
    });
    if (!res.ok && res.status >= 400 && res.status !== 416) {
        throw new Error(`Download failed (HTTP ${res.status} from ${new URL(url).hostname})`);
    }
    return res;
}
async function readBodyCapped(res, capBytes = MAX_DOWNLOAD_BYTES) {
    const reader = res.body?.getReader();
    if (!reader) return Buffer.from(await res.arrayBuffer());
    const chunks = [];
    let total = 0;
    for(;;){
        const { done, value } = await reader.read();
        if (done) break;
        total += value.byteLength;
        if (total > capBytes) {
            await reader.cancel().catch(()=>{});
            throw new Error(`Remote file exceeds the ${Math.round(capBytes / 1024 / 1024)}MB limit`);
        }
        chunks.push(Buffer.from(value));
    }
    return Buffer.concat(chunks);
}
function fileNameFromDisposition(res) {
    const cd = res.headers.get('content-disposition');
    if (!cd) return null;
    const star = cd.match(/filename\*=(?:UTF-8'')?([^;]+)/i);
    if (star) {
        try {
            return decodeURIComponent(star[1].trim().replace(/^"|"$/g, ''));
        } catch  {
        /* fall through */ }
    }
    const plain = cd.match(/filename="?([^";]+)"?/i);
    return plain ? plain[1] : null;
}
/** Sniff a usable extension for extension-less downloads (magic bytes). */ function sniffExtension(buf, res) {
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (buf.length >= 5 && buf.slice(0, 5).toString('latin1') === '%PDF-') return 'pdf';
    if (buf.length >= 4 && buf[0] === 0x50 && buf[1] === 0x4b && buf[2] === 0x03 && buf[3] === 0x04) {
        // zip container: docx/xlsx/pptx/odt — refine with content-type
        if (ct.includes('wordprocessing')) return 'docx';
        if (ct.includes('spreadsheet')) return 'xlsx';
        if (ct.includes('presentation')) return 'pptx';
        return 'docx';
    }
    if (buf.length >= 3 && (buf.slice(0, 3).toString('latin1') === 'ID3' || buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0)) return 'mp3';
    if (buf.length >= 12 && buf.slice(4, 8).toString('latin1') === 'ftyp') return 'mp4';
    if (ct.startsWith('audio/')) return ct.includes('wav') ? 'wav' : 'mp3';
    if (ct.startsWith('video/')) return 'mp4';
    if (ct === 'image/png') return 'png';
    if (ct === 'image/jpeg') return 'jpg';
    return null;
}
function sanitizeFileName(name) {
    return name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim().slice(0, 120) || 'download';
}
async function ytDlp(args, timeoutMs) {
    // Optional escape hatches for datacenter IPs that YouTube bot-checks:
    //   YOUTUBE_COOKIES=/path/to/cookies.txt  — a logged-in cookie jar
    //   YOUTUBE_PROXY=http://host:port         — route yt-dlp through a proxy
    const extra = [];
    if (process.env.YOUTUBE_COOKIES) extra.push('--cookies', process.env.YOUTUBE_COOKIES);
    if (process.env.YOUTUBE_PROXY) extra.push('--proxy', process.env.YOUTUBE_PROXY);
    return execFileAsync('yt-dlp', [
        ...extra,
        ...args
    ], {
        timeout: timeoutMs,
        maxBuffer: 1024 * 1024 * 8
    });
}
/** Map raw yt-dlp failures to actionable messages. */ function describeYouTubeError(e) {
    const msg = (e.message || '').toString();
    if (msg.includes('ENOENT')) {
        return 'yt-dlp is not installed on the server — YouTube ingestion needs the yt-dlp binary on PATH (ffmpeg is already used for uploads).';
    }
    if (msg.includes('Sign in to confirm') || msg.includes('not a bot')) {
        return 'YouTube is asking for bot verification on this video right now — the check is temporary and lifts after a cooldown. Wait a few minutes and press the Retry button on this row (no need to re-paste the link), or try a different video.';
    }
    if (msg.includes('Private video')) {
        return 'This YouTube video is private.';
    }
    if (msg.includes('Video unavailable') || msg.includes('removed by the uploader')) {
        return 'This YouTube video is unavailable (deleted or region-locked).';
    }
    if (msg.includes('age') && msg.includes('confirm')) {
        return 'Age-restricted videos cannot be downloaded without an account.';
    }
    if (msg.includes('members-only') || msg.includes('Join this channel')) {
        return 'Members-only videos cannot be downloaded.';
    }
    if (msg.includes('Playback on other websites has been disabled')) {
        return 'The uploader has disabled downloads for this video.';
    }
    return `Could not read video info — is the video public? (${msg.slice(0, 160)})`;
}
async function downloadYouTube(videoId, pageUrl) {
    const metaLine = await ytDlp([
        '--js-runtimes',
        'node',
        '--no-playlist',
        '--skip-download',
        '--print',
        '%(title)s\u001f%(duration)s\u001f%(channel)s',
        pageUrl
    ], 60000).catch((e)=>{
        throw new Error(describeYouTubeError(e));
    });
    const [rawTitle, rawDur, rawChannel] = metaLine.stdout.trim().split('\u001f');
    const title = (rawTitle || `YouTube ${videoId}`).slice(0, 200);
    const durationSec = rawDur && rawDur !== 'NA' && !Number.isNaN(Number(rawDur)) ? Math.round(Number(rawDur)) : null;
    const channel = rawChannel && rawChannel !== 'NA' ? rawChannel.slice(0, 120) : null;
    if (durationSec != null && durationSec > MAX_VIDEO_SEC) {
        throw new Error(`Video is ${Math.floor(durationSec / 60)} min — transcription currently caps at 60 minutes.`);
    }
    if (durationSec != null && durationSec < 5) {
        throw new Error('Video is shorter than 5 seconds — nothing to transcribe.');
    }
    const dir = fs__WEBPACK_IMPORTED_MODULE_2___default().mkdtempSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(os__WEBPACK_IMPORTED_MODULE_4___default().tmpdir(), 'medq-ytdl-'));
    try {
        // 1) VIDEO download — the ingest pipeline then transcribes the audio AND
        //    VLM-OCRs evenly-sampled frames (slide text, diagrams, on-screen
        //    labels). ≤480p for ≤20 min, ≤240p beyond (keeps ≤60 min within
        //    ~150 MB). Any failure falls back to audio-only (step 2).
        const maxHeight = durationSec != null && durationSec > 1200 ? 240 : 480;
        const videoArgs = [
            '--js-runtimes',
            'node',
            '--no-playlist',
            '-f',
            `best[height<=${maxHeight}][ext=mp4]/best[height<=${maxHeight}]/bv*[height<=${maxHeight}]+ba[ext=m4a]/bv*[height<=${maxHeight}]+ba`,
            '--merge-output-format',
            'mp4',
            '--max-filesize',
            '150M',
            '--no-progress',
            '--retries',
            '2',
            '-o',
            path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'media.%(ext)s'),
            pageUrl
        ];
        await ytDlp(videoArgs, 300000).catch((e)=>{
            log.warn?.(`yt-dlp video download fell back to audio-only: ${e.message.slice(0, 120)}`);
        });
        const videoFile = fs__WEBPACK_IMPORTED_MODULE_2___default().readdirSync(dir).find((f)=>f.startsWith('media.'));
        // 2) AUDIO-only fallback (long video with no small stream, merge failure …)
        let audioFile = null;
        if (!videoFile) {
            await ytDlp([
                '--js-runtimes',
                'node',
                '--no-playlist',
                '-f',
                'bestaudio[ext=m4a]/bestaudio/worstaudio',
                '--no-progress',
                '--retries',
                '2',
                '-o',
                path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, 'audio.%(ext)s'),
                pageUrl
            ], 300000).catch((e)=>{
                throw new Error(describeYouTubeError(e));
            });
            audioFile = fs__WEBPACK_IMPORTED_MODULE_2___default().readdirSync(dir).find((f)=>f.startsWith('audio.')) || null;
        }
        const file = videoFile || audioFile;
        if (!file) throw new Error('yt-dlp finished but produced no media file');
        const buffer = fs__WEBPACK_IMPORTED_MODULE_2___default().readFileSync(path__WEBPACK_IMPORTED_MODULE_3___default().join(dir, file));
        if (buffer.length < 2048) throw new Error('Downloaded media is suspiciously small — try again or use a direct file URL');
        const ext = file.split('.').pop() || 'mp4';
        const fileName = `${sanitizeFileName(title)}.${ext}`;
        const isVideo = Boolean(videoFile);
        log.info?.(`yt-dlp: ${title} (${durationSec ?? '?'}s, ${(buffer.length / 1024 / 1024).toFixed(1)}MB, .${ext}${isVideo ? ', video+audio' : ', audio-only'})`);
        return {
            kind: 'media',
            title,
            fileName,
            buffer,
            mimeType: isVideo ? ext === 'webm' ? 'video/webm' : ext === 'mkv' ? 'video/x-matroska' : 'video/mp4' : ext === 'm4a' ? 'audio/mp4' : ext === 'webm' ? 'audio/webm' : 'audio/mpeg',
            displayKind: isVideo ? 'video' : 'audio',
            meta: {
                platform: 'youtube',
                sourceUrl: pageUrl,
                videoId,
                ...channel ? {
                    channel
                } : {},
                ...durationSec ? {
                    durationSec
                } : {},
                visual: isVideo ? 'audio+frames' : 'audio-only'
            }
        };
    } finally{
        fs__WEBPACK_IMPORTED_MODULE_2___default().rmSync(dir, {
            recursive: true,
            force: true
        });
    }
}
// ─── Google Drive / Docs ───────────────────────────────────────────────────
async function downloadGoogleDrive(fileId, pageUrl) {
    const direct = `https://drive.usercontent.google.com/download?id=${encodeURIComponent(fileId)}&export=download&confirm=t`;
    let res;
    try {
        res = await fetchWithCap(direct, {
            headers: {
                cookie: ''
            }
        });
    } catch (e) {
        const status = e instanceof Error && e.message.includes('404') ? 404 : null;
        if (status === 404) {
            throw new Error('Google Drive file not found — check the link and that sharing is set to "Anyone with the link".');
        }
        throw e;
    }
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    if (ct.includes('text/html')) {
        const body = (await res.text()).slice(0, 4000).toLowerCase();
        if (body.includes('not found') || body.includes('sorry, this file')) {
            throw new Error('Google Drive file not found — check the link.');
        }
        if (body.includes('virus scan warning') || body.includes('too large')) {
            throw new Error('Google Drive refused the direct download for this file size — download it and upload the file instead.');
        }
        if (body.includes('sign in') || body.includes('accounts.google.com')) {
            throw new Error('This Google Drive file is private — share it as "Anyone with the link" first.');
        }
        throw new Error('Google Drive returned a page instead of the file — make sure sharing is set to "Anyone with the link".');
    }
    const buffer = await readBodyCapped(res);
    if (buffer.length < 64) throw new Error('Google Drive returned an empty file');
    let fileName = fileNameFromDisposition(res) || '';
    if (!fileName || !fileName.includes('.')) {
        const sniff = sniffExtension(buffer, res);
        fileName = fileName ? sanitizeFileName(fileName) : `google-drive-${fileId.slice(0, 8)}`;
        if (sniff && !fileName.includes('.')) fileName += `.${sniff}`;
    }
    return {
        kind: 'media',
        title: fileName,
        fileName,
        buffer,
        mimeType: res.headers.get('content-type') || 'application/octet-stream',
        displayKind: 'url',
        meta: {
            platform: 'google-drive',
            sourceUrl: pageUrl
        }
    };
}
async function exportGoogleDoc(kind, pageUrl) {
    const id = pageUrl.pathname.match(/^\/(?:document|spreadsheets)\/d\/([^/?]+)/)?.[1];
    if (!id) throw new Error('Could not parse the Google Docs id from the link');
    const format = kind === 'document' ? 'txt' : 'csv';
    const url = `https://docs.google.com/${kind}/d/${id}/export?format=${format}`;
    const res = await fetchWithCap(url);
    if (!res.ok) {
        throw new Error(`Google ${kind === 'document' ? 'Doc' : 'Sheet'} export failed (HTTP ${res.status}) — is it shared "Anyone with the link"?`);
    }
    const text = await res.text();
    if (text.trim().startsWith('<!DOCTYPE') || text.trim().startsWith('<html')) {
        throw new Error('Google returned a login page — share the doc as "Anyone with the link" first.');
    }
    if (!text.trim()) throw new Error('Google Doc exported empty content');
    return {
        kind: 'text',
        title: `Google ${kind === 'document' ? 'Doc' : 'Sheet'} ${id.slice(0, 8)}`,
        text: kind === 'document' ? text : `# Google Sheet (CSV)\n\n${text}`,
        displayKind: 'url',
        meta: {
            platform: 'google-docs',
            sourceUrl: pageUrl.toString(),
            mimeType: kind === 'document' ? 'text/plain' : 'text/csv'
        }
    };
}
// ─── Main router ───────────────────────────────────────────────────────────
async function fetchExternalSource(rawUrl) {
    let u;
    try {
        u = new URL(rawUrl);
    } catch  {
        throw new Error('That does not look like a valid URL');
    }
    if (u.protocol !== 'http:' && u.protocol !== 'https:') {
        throw new Error('Only http(s) URLs are supported');
    }
    // YouTube
    const ytId = parseYouTubeId(u);
    if (ytId) {
        return downloadYouTube(ytId, `https://www.youtube.com/watch?v=${ytId}`);
    }
    if (isYouTubePlaylistOnly(u)) {
        throw new Error('Playlists are not supported — paste the URL of a single video');
    }
    // Google Docs / Sheets export
    const gdocs = isGoogleDocs(u);
    if (gdocs) return exportGoogleDoc(gdocs, u);
    // Google Drive file
    const gdId = parseGoogleDriveId(u);
    if (gdId) return downloadGoogleDrive(gdId, rawUrl);
    // Dropbox → force direct download
    if (isDropbox(u)) {
        u.searchParams.set('dl', '1');
        if (u.hostname === 'www.dropbox.com') u.hostname = 'dl.dropboxusercontent.com';
    }
    // Everything else: fetch and decide (file vs webpage).
    // The probe may itself fail (403 anti-bot, 429 …) — that must NOT kill the
    // request, because the page-reader fallback (parseUrl) can still succeed
    // via the gateway reader from a different egress.
    let res = null;
    try {
        res = await fetchWithCap(u.toString());
    } catch  {
        res = null;
    }
    const ct = res ? (res.headers.get('content-type') || '').toLowerCase() : '';
    if (res && !ct.includes('text/html')) {
        // Direct binary file (arxiv PDF, hosted mp3, raw github …)
        const buffer = await readBodyCapped(res);
        if (buffer.length < 64) throw new Error('The URL returned an empty file');
        let fileName = fileNameFromDisposition(res) || decodeURIComponent(u.pathname.split('/').filter(Boolean).pop() || '') || 'download';
        fileName = sanitizeFileName(fileName);
        const sniff = sniffExtension(buffer, res);
        if (!fileName.includes('.') && sniff) fileName += `.${sniff}`;
        return {
            kind: 'media',
            title: fileName,
            fileName,
            buffer,
            mimeType: ct || 'application/octet-stream',
            displayKind: 'url',
            meta: {
                platform: 'direct-url',
                sourceUrl: rawUrl
            }
        };
    }
    // Webpage (or the probe was blocked) → let the pipeline's reader extract
    // text (ZAI gateway page reader first, then plain fetch).
    // NOTE: the probe body must be released WITHOUT awaiting — Next's patched
    // fetch can deadlock .cancel() in background tasks (dev instrumentation),
    // which froze every webpage import at this exact await.
    try {
        void res?.body?.cancel?.();
    } catch  {}
    const { parseUrl } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 375556));
    const parsed = await parseUrl(rawUrl);
    return {
        kind: 'text',
        title: parsed.title || u.hostname,
        text: parsed.text,
        displayKind: 'url',
        meta: {
            platform: 'web',
            sourceUrl: rawUrl,
            mimeType: parsed.mimeType
        }
    };
}


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