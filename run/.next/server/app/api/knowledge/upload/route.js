"use strict";
(() => {
var exports = {};
exports.id = 9734;
exports.ids = [3009,5390,9734];
exports.modules = {

/***/ 16698:
/***/ ((module) => {

module.exports = require("node:async_hooks");

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

/***/ 633925:
/***/ ((module) => {

module.exports = import("unpdf");;

/***/ }),

/***/ 638522:
/***/ ((module) => {

module.exports = require("node:zlib");

/***/ }),

/***/ 639178:
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
        page: "/api/knowledge/upload/route",
        pathname: "/api/knowledge/upload",
        filename: "route",
        bundlePath: "app/api/knowledge/upload/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/knowledge/upload/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(952430),
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
    let srcPage = "/api/knowledge/upload/route";
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

/***/ 952430:
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
/* harmony import */ var _lib_uploads_upload_session_store__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(453062);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__]);
([_lib_db__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_api_handler__WEBPACK_IMPORTED_MODULE_3__, _lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * Knowledge Library — multipart file upload API.
 *
 * POST /api/knowledge/upload   (multipart/form-data)
 *   fields: file (required), origin (chat | library | generate), title (optional)
 *
 * Server-side parsing runs the FULL ingestion pipeline, so an upload works
 * for every supported type — not just text formats:
 *   • Documents: PDF (unpdf + VLM OCR rescue), DOCX/PPTX/XLSX/EPUB (rich
 *     media parser), txt/md/csv/json/html/code (verbatim)
 *   • Audio → advanced VAD ASR (timestamps), Video → ASR + frame VLM,
 *     Images → VLM OCR + description
 * → chunk → contextual enrichment → embed → indexed source.
 *
 * Returns { sourceId, title, chunks, status: 'ready' } so the caller can
 * ground the next turn (chat attachments) or select the source (generate
 * page). Clients: useFileAttachments (floating assistant Attach file),
 * KnowledgeLibraryPanel (library upload with XHR progress), generate page.
 *
 * Mirrors POST /api/knowledge/sources but for multipart bodies; see that
 * route for the JSON/text/url variant.
 */ 









const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_9__/* .createLogger */ .h)('KnowledgeUpload');
const runtime = 'nodejs';
const maxDuration = 300;
const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).
// Was 15 MB (pipeline parity) — raised 2026-11-03: the tier matrix
// (visitor/free/premium/pro) is now the single source of truth for
// per-user file-size limits, enforced at POST /api/uploads. This
// constant is the direct-multipart backstop only; the resumable
// uploadId path skips it (session was tier-capped at open).
const POST = (0,_lib_api_handler__WEBPACK_IMPORTED_MODULE_3__/* .withErrorHandler */ .FB)(async (req)=>{
    const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .resolveUserId */ .n$)();
    if (!userId) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .unauthorized */ .nc)('You must be signed in to upload files');
    let form;
    try {
        form = await req.formData();
    } catch  {
        return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('Expected multipart/form-data with a "file" field');
    }
    const origin = typeof form.get('origin') === 'string' ? String(form.get('origin')) : 'library';
    const title = typeof form.get('title') === 'string' ? String(form.get('title')).trim().slice(0, 200) : '';
    // Stage 13 (resumable uploads): accept an already-uploaded session BY
    // REFERENCE. Large files arrive through the chunked resumable path
    // (POST /api/uploads → PUT chunks → complete) and are ingested here with
    // NO second full transfer. The session's size was capped at the caller's
    // tier when it was opened, so the multipart transport guard below applies
    // only to the direct path.
    const uploadIdField = form.get('uploadId');
    const uploadId = typeof uploadIdField === 'string' ? uploadIdField.trim() : '';
    let fileName;
    let mimeType;
    let fileSize;
    let buffer;
    if (uploadId) {
        const assembled = _lib_uploads_upload_session_store__WEBPACK_IMPORTED_MODULE_8__/* .uploadStore */ .NW.readAssembled(uploadId, userId);
        if (!assembled) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('Upload session not found, incomplete, or not yours — upload the file again');
        }
        fileName = assembled.fileName;
        mimeType = assembled.mimeType || '';
        fileSize = assembled.size;
        buffer = assembled.buffer;
    } else {
        const file = form.get('file');
        if (!(file instanceof File)) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('"file" field is required');
        if (file.size === 0) return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)('File is empty');
        if (file.size > MAX_FILE_BYTES) {
            return (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .badRequest */ .li)(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
        }
        fileName = file.name || 'upload.bin';
        mimeType = file.type || '';
        fileSize = file.size;
        buffer = Buffer.from(await file.arrayBuffer());
    }
    const fileKind = (0,_lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_5__/* .detectFileKind */ .iN)(fileName, mimeType);
    log.info?.(`Upload "${fileName}" (${fileSize}B, ${mimeType || 'no mime'} → ${fileKind}) from ${origin} by ${userId}`);
    // Source row first so retention + progress can bind to a real id.
    const source = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.create({
        data: {
            userId,
            name: (title || fileName).slice(0, 200),
            type: 'file',
            status: 'pending',
            fileKind,
            metaJson: JSON.stringify({
                origin,
                originalName: fileName.slice(0, 200)
            })
        }
    });
    const report = (stage, percent, note)=>void (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .updateSourceProgress */ .OH)(source.id, stage, percent, note);
    try {
        // Media (audio/video/image) parses through the rich media pipeline first
        // (ASR / frame VLM / VLM OCR) — same path URL imports take.
        let parsedText;
        let parsedTitle;
        let parsedMime;
        let kind = fileKind;
        if (fileKind === 'audio' || fileKind === 'video' || fileKind === 'image') {
            report('transcribing', 25, 'Analyzing / transcribing the media');
            const parsed = await (0,_lib_agent_knowledge_ingest_media__WEBPACK_IMPORTED_MODULE_5__.parseMediaFile)(fileName, buffer, mimeType);
            kind = parsed.fileKind;
            parsedText = parsed.text;
            parsedTitle = title || parsed.title;
            parsedMime = parsed.mimeType;
            // Retain originals for playback / preview / citations, best-effort.
            const meta = {
                ...parsed.meta || {}
            };
            if (parsed.fileKind === 'audio') {
                const retained = await (0,_lib_agent_knowledge_audio_pipeline__WEBPACK_IMPORTED_MODULE_6__/* .retainAudioFile */ .UZ)(source.id, buffer);
                if (retained.retained) {
                    meta.audioMime = retained.mime;
                    meta.audioBytes = retained.bytes;
                }
            } else {
                const retained = (0,_lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_7__/* .retainOriginalFile */ .VW)(source.id, buffer, mimeType || undefined);
                if (retained.retained) {
                    meta.originalMime = retained.mime;
                    meta.originalBytes = retained.bytes;
                }
            }
            if (Object.keys(meta).length > 0) {
                await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.update({
                    where: {
                        id: source.id
                    },
                    data: {
                        metaJson: JSON.stringify({
                            origin,
                            originalName: fileName.slice(0, 200),
                            ...meta
                        })
                    }
                }).catch(()=>{});
            }
            // Stage 3: persist the temporal scene index for videos (mediaTimeSec
            // navigation + search_video_scenes). Best-effort — never fails the
            // upload; the flattened transcript document is already indexed.
            if (parsed.fileKind === 'video' && parsed.scenes?.length) {
                try {
                    const { persistVideoScenes } = await __webpack_require__.e(/* import() */ 2053).then(__webpack_require__.bind(__webpack_require__, 762053));
                    const persisted = await persistVideoScenes(source.id, parsed.scenes);
                    if (persisted) log.info?.(`scene index: ${persisted} scenes for ${source.id}`);
                } catch  {}
            }
            await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .ingestSource */ .Kk)({
                userId,
                sourceId: source.id,
                type: 'file',
                name: title || fileName,
                fileKind: parsed.fileKind,
                meta: {
                    origin,
                    ...parsed.meta || {}
                },
                parsed: {
                    title: parsedTitle,
                    mimeType: parsedMime,
                    text: parsedText
                },
                payload: {
                    fileName,
                    mimeType
                },
                onProgress: report
            });
        } else {
            // Documents go straight into the pipeline (parseFile dispatches by
            // extension; DOCX/PPTX/XLSX/EPUB internally use the media parser too).
            // Stage 10: retain .xlsx originals so query_spreadsheet can read
            // them structurally (same file-store the media kinds use; bounded by
            // the 15 MB upload cap). Other documents stay text-only.
            let docMeta = {
                origin,
                originalName: fileName.slice(0, 200)
            };
            if ((fileName.split('.').pop() || '').toLowerCase() === 'xlsx') {
                const retained = (0,_lib_agent_knowledge_file_store__WEBPACK_IMPORTED_MODULE_7__/* .retainOriginalFile */ .VW)(source.id, buffer, mimeType || undefined);
                if (retained.retained) {
                    docMeta = {
                        ...docMeta,
                        originalMime: retained.mime,
                        originalBytes: retained.bytes
                    };
                }
            }
            await (0,_lib_agent_knowledge_pipeline__WEBPACK_IMPORTED_MODULE_4__/* .ingestSource */ .Kk)({
                userId,
                sourceId: source.id,
                type: 'file',
                name: title || fileName,
                fileKind: 'document',
                meta: docMeta,
                payload: {
                    fileName,
                    buffer,
                    mimeType
                },
                onProgress: report
            });
        }
        const done = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.findUnique({
            where: {
                id: source.id
            },
            select: {
                status: true,
                error: true,
                metaJson: true
            }
        });
        const meta = done?.metaJson ? JSON.parse(done.metaJson) : {};
        const document = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeDocument.findFirst({
            where: {
                sourceId: source.id
            },
            select: {
                title: true,
                chunkCount: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        // Ingestion consumed the bytes — the transport session's job is done.
        // (On failure the session is KEPT so the client can retry the POST
        // without re-uploading; the 24h sweep cleans up the rest.)
        if (uploadId) {
            try {
                _lib_uploads_upload_session_store__WEBPACK_IMPORTED_MODULE_8__/* .uploadStore */ .NW.remove(uploadId, userId);
            } catch  {
            /* best-effort */ }
        }
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            sourceId: source.id,
            title: document?.title ?? (title || fileName),
            chunks: document?.chunkCount ?? 0,
            status: done?.status === 'ready' ? 'ready' : done?.status ?? 'failed',
            fileKind: kind,
            error: done?.status === 'failed' ? done?.error ?? 'Ingestion failed' : undefined
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        log.warn?.(`Upload "${fileName}" failed: ${message}`);
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.knowledgeSource.update({
            where: {
                id: source.id
            },
            data: {
                status: 'failed',
                error: message.slice(0, 500)
            }
        }).catch(()=>{});
        // Surface a descriptive failure (unsupported type, empty extraction…)
        // instead of a bare 500 so the UI can show the reason.
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            sourceId: source.id,
            error: message.slice(0, 300)
        }, {
            status: 422
        });
    }
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,859,2035,2538,9985,5556,6899,3174], () => (__webpack_exec__(639178)));
module.exports = __webpack_exports__;

})();