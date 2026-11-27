(() => {
var exports = {};
exports.id = 5105;
exports.ids = [5105];
exports.modules = {

/***/ 108128:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/runtime-reacts.external.js");

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

/***/ 196760:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return getSortedRoutes;
    }
});
class UrlNode {
    insert(urlPath) {
        this._insert(urlPath.split('/').filter(Boolean), [], false);
    }
    smoosh() {
        return this._smoosh();
    }
    _smoosh(prefix = '/') {
        const childrenPaths = [
            ...this.children.keys()
        ].sort();
        if (this.slugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[]'), 1);
        }
        if (this.restSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[...]'), 1);
        }
        if (this.optionalRestSlugName !== null) {
            childrenPaths.splice(childrenPaths.indexOf('[[...]]'), 1);
        }
        const routes = childrenPaths.map((c)=>this.children.get(c)._smoosh(`${prefix}${c}/`)).reduce((prev, curr)=>[
                ...prev,
                ...curr
            ], []);
        if (this.slugName !== null) {
            routes.push(...this.children.get('[]')._smoosh(`${prefix}[${this.slugName}]/`));
        }
        if (!this.placeholder) {
            const r = prefix === '/' ? '/' : prefix.slice(0, -1);
            if (this.optionalRestSlugName != null) {
                throw Object.defineProperty(new Error(`You cannot define a route with the same specificity as a optional catch-all route ("${r}" and "${r}[[...${this.optionalRestSlugName}]]").`), "__NEXT_ERROR_CODE", {
                    value: "E458",
                    enumerable: false,
                    configurable: true
                });
            }
            routes.unshift(r);
        }
        if (this.restSlugName !== null) {
            routes.push(...this.children.get('[...]')._smoosh(`${prefix}[...${this.restSlugName}]/`));
        }
        if (this.optionalRestSlugName !== null) {
            routes.push(...this.children.get('[[...]]')._smoosh(`${prefix}[[...${this.optionalRestSlugName}]]/`));
        }
        return routes;
    }
    _insert(urlPaths, slugNames, isCatchAll) {
        if (urlPaths.length === 0) {
            this.placeholder = false;
            return;
        }
        if (isCatchAll) {
            throw Object.defineProperty(new Error(`Catch-all must be the last part of the URL.`), "__NEXT_ERROR_CODE", {
                value: "E392",
                enumerable: false,
                configurable: true
            });
        }
        // The next segment in the urlPaths list
        let nextSegment = urlPaths[0];
        // Check if the segment matches `[something]`
        if (nextSegment.startsWith('[') && nextSegment.endsWith(']')) {
            // Strip `[` and `]`, leaving only `something`
            let segmentName = nextSegment.slice(1, -1);
            let isOptional = false;
            if (segmentName.startsWith('[') && segmentName.endsWith(']')) {
                // Strip optional `[` and `]`, leaving only `something`
                segmentName = segmentName.slice(1, -1);
                isOptional = true;
            }
            if (segmentName.startsWith('…')) {
                throw Object.defineProperty(new Error(`Detected a three-dot character ('…') at ('${segmentName}'). Did you mean ('...')?`), "__NEXT_ERROR_CODE", {
                    value: "E147",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('...')) {
                // Strip `...`, leaving only `something`
                segmentName = segmentName.substring(3);
                isCatchAll = true;
            }
            if (segmentName.startsWith('[') || segmentName.endsWith(']')) {
                throw Object.defineProperty(new Error(`Segment names may not start or end with extra brackets ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E421",
                    enumerable: false,
                    configurable: true
                });
            }
            if (segmentName.startsWith('.')) {
                throw Object.defineProperty(new Error(`Segment names may not start with erroneous periods ('${segmentName}').`), "__NEXT_ERROR_CODE", {
                    value: "E288",
                    enumerable: false,
                    configurable: true
                });
            }
            function handleSlug(previousSlug, nextSlug) {
                if (previousSlug !== null) {
                    // If the specific segment already has a slug but the slug is not `something`
                    // This prevents collisions like:
                    // pages/[post]/index.js
                    // pages/[id]/index.js
                    // Because currently multiple dynamic params on the same segment level are not supported
                    if (previousSlug !== nextSlug) {
                        // TODO: This error seems to be confusing for users, needs an error link, the description can be based on above comment.
                        throw Object.defineProperty(new Error(`You cannot use different slug names for the same dynamic path ('${previousSlug}' !== '${nextSlug}').`), "__NEXT_ERROR_CODE", {
                            value: "E337",
                            enumerable: false,
                            configurable: true
                        });
                    }
                }
                slugNames.forEach((slug)=>{
                    if (slug === nextSlug) {
                        throw Object.defineProperty(new Error(`You cannot have the same slug name "${nextSlug}" repeat within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E247",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    if (slug.replace(/\W/g, '') === nextSegment.replace(/\W/g, '')) {
                        throw Object.defineProperty(new Error(`You cannot have the slug names "${slug}" and "${nextSlug}" differ only by non-word symbols within a single dynamic path`), "__NEXT_ERROR_CODE", {
                            value: "E499",
                            enumerable: false,
                            configurable: true
                        });
                    }
                });
                slugNames.push(nextSlug);
            }
            if (isCatchAll) {
                if (isOptional) {
                    if (this.restSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an required and optional catch-all route at the same level ("[...${this.restSlugName}]" and "${urlPaths[0]}" ).`), "__NEXT_ERROR_CODE", {
                            value: "E299",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.optionalRestSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.optionalRestSlugName = segmentName;
                    // nextSegment is overwritten to [[...]] so that it can later be sorted specifically
                    nextSegment = '[[...]]';
                } else {
                    if (this.optionalRestSlugName != null) {
                        throw Object.defineProperty(new Error(`You cannot use both an optional and required catch-all route at the same level ("[[...${this.optionalRestSlugName}]]" and "${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                            value: "E300",
                            enumerable: false,
                            configurable: true
                        });
                    }
                    handleSlug(this.restSlugName, segmentName);
                    // slugName is kept as it can only be one particular slugName
                    this.restSlugName = segmentName;
                    // nextSegment is overwritten to [...] so that it can later be sorted specifically
                    nextSegment = '[...]';
                }
            } else {
                if (isOptional) {
                    throw Object.defineProperty(new Error(`Optional route parameters are not yet supported ("${urlPaths[0]}").`), "__NEXT_ERROR_CODE", {
                        value: "E435",
                        enumerable: false,
                        configurable: true
                    });
                }
                handleSlug(this.slugName, segmentName);
                // slugName is kept as it can only be one particular slugName
                this.slugName = segmentName;
                // nextSegment is overwritten to [] so that it can later be sorted specifically
                nextSegment = '[]';
            }
        }
        // If this UrlNode doesn't have the nextSegment yet we create a new child UrlNode
        if (!this.children.has(nextSegment)) {
            this.children.set(nextSegment, new UrlNode());
        }
        this.children.get(nextSegment)._insert(urlPaths.slice(1), slugNames, isCatchAll);
    }
    constructor(){
        this.placeholder = true;
        this.children = new Map();
        this.slugName = null;
        this.restSlugName = null;
        this.optionalRestSlugName = null;
    }
}
function getSortedRoutes(normalizedPages) {
    // First the UrlNode is created, and every UrlNode can have only 1 dynamic segment
    // Eg you can't have pages/[post]/abc.js and pages/[hello]/something-else.js
    // Only 1 dynamic segment per nesting level
    // So in the case that is test/e2e/dynamic-routing it'll be this:
    // pages/[post]/comments.js
    // pages/blog/[post]/comment/[id].js
    // Both are fine because `pages/[post]` and `pages/blog` are on the same level
    // So in this case `UrlNode` created here has `this.slugName === 'post'`
    // And since your PR passed through `slugName` as an array basically it'd including it in too many possibilities
    // Instead what has to be passed through is the upwards path's dynamic names
    const root = new UrlNode();
    // Here the `root` gets injected multiple paths, and insert will break them up into sublevels
    normalizedPages.forEach((pagePath)=>root.insert(pagePath));
    // Smoosh will then sort those sublevels up to the point where you get the correct route definition priority
    return root.smoosh();
}
function getSortedRouteObjects(objects, getter) {
    // We're assuming here that all the pathnames are unique, that way we can
    // sort the list and use the index as the key.
    const indexes = {};
    const pathnames = [];
    for(let i = 0; i < objects.length; i++){
        const pathname = getter(objects[i]);
        indexes[pathname] = i;
        pathnames[i] = pathname;
    }
    // Sort the pathnames.
    const sorted = getSortedRoutes(pathnames);
    // Map the sorted pathnames back to the original objects using the new sorted
    // index.
    return sorted.map((pathname)=>objects[indexes[pathname]]);
} //# sourceMappingURL=sorted-routes.js.map


/***/ }),

/***/ 200261:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/app-paths");

/***/ }),

/***/ 226849:
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client/runtime/client");

/***/ }),

/***/ 265547:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $i: () => (/* binding */ invalidatePath),
/* harmony export */   Y1: () => (/* binding */ invalidate),
/* harmony export */   jY: () => (/* binding */ CACHE_TAGS)
/* harmony export */ });
/* unused harmony exports cachedFetch, cachedFetch0 */
/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(716949);
/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_cache__WEBPACK_IMPORTED_MODULE_0__);
/**
 * Server-side caching helpers for App Router pages.
 *
 * ─── Why this exists ───
 *
 * Before this module, every SSR page in src/app/<tab>/page.tsx fetched its
 * data with `cache: 'no-store'` — meaning every page hit re-ran the
 * underlying DB query, even for content that changes rarely (question bank,
 * medical dictionary terms, leaderboard snapshots, etc.). Under load this
 * was a major contributor to the OOM-and-restart loop the watchdog was
 * mitigating.
 *
 * This module provides:
 *
 *   1. `cachedFetch(tag, fetcher, opts)` — wraps `unstable_cache` with a
 *      typed signature and sensible defaults. Use this for SSR pages where
 *      the data changes rarely and a small staleness window is acceptable.
 *
 *   2. Tag constants — `CACHE_TAGS.questions`, `CACHE_TAGS.dailyChallenge`,
 *      etc. Centralising the tag strings prevents typos (a typo'd tag
 *      silently disables invalidation, which is the worst kind of bug).
 *
 *   3. `invalidate(...tags)` — thin wrapper around `revalidateTag`. Call
 *      this from service-layer write paths (create/update/delete) so the
 *      SSR cache is busted the moment the underlying data changes.
 *
 *   4. `invalidatePath(path)` — wrapper around `revalidatePath`. Use this
 *      when a write invalidates a specific page (e.g. posting a question
 *      invalidates /bank).
 *
 * ─── Usage ───
 *
 *   // SSR page (src/app/bank/page.tsx)
 *   import { cachedFetch, CACHE_TAGS } from '@/lib/server/cache';
 *   const getBankCatalog = cachedFetch(
 *     'bank-catalog:v1',
 *     async () => questionRepository.list({ page: 1, limit: 20 }),
 *     { tags: [CACHE_TAGS.questions], revalidate: 60 }
 *   );
 *   const data = await getBankCatalog();
 *
 *   // Service write path (src/lib/services/question-service.ts)
 *   import { invalidate, CACHE_TAGS } from '@/lib/server/cache';
 *   async create(input) {
 *     const q = await this.repo.create(input);
 *     await invalidate(CACHE_TAGS.questions);   // ← busts the SSR cache
 *     return q;
 *   }
 *
 * ─── Important caveats ───
 *
 *   - `unstable_cache` is invoked at module load time, not call time. The
 *     cache key is the tuple `(keyVersion, ...args)`. Bump `keyVersion`
 *     (e.g. `bank-catalog:v1` → `bank-catalog:v2`) to force a full
 *     re-cache after a shape change.
 *
 *   - `unstable_cache` only caches the Promise result. If the fetcher
 *     throws, the cache stores the rejection and re-throws on every
 *     subsequent call until the revalidate window expires. Wrap fetchers
 *     in try/catch if you want graceful degradation.
 *
 *   - `revalidateTag` and `revalidatePath` only work inside Next.js
 *     request scope (route handlers, server actions, SSR pages). They
 *     DON'T work inside BullMQ workers or detached background jobs —
 *     for those, call the HTTP API instead.
 */ 
// ─────────────────────────────────────────────────────────────────────────
// Cache tag catalog
//
// Centralising tag strings here prevents typos. A typo'd tag silently
// disables invalidation, which is the worst kind of bug — the cache
// stays stale forever and nobody notices until a user complains.
// ─────────────────────────────────────────────────────────────────────────
const CACHE_TAGS = {
    /** Question bank list + individual question pages. */ questions: 'questions',
    /** Individual question by id (used by /api/questions/[id] SSR). */ questionById: 'question-by-id',
    /** Daily challenge — changes once per day, but invalidate on admin override. */ dailyChallenge: 'daily-challenge',
    /** Question of the day — same cadence as daily challenge. */ qotd: 'qotd',
    /** Leaderboard — invalidate on every new attempt. */ leaderboard: 'leaderboard',
    /** Medical dictionary — invalidate on term add/edit. */ medicalDictionary: 'medical-dictionary',
    /** Medication tables — invalidate on drug add/edit. */ medicationTables: 'medication-tables',
    /** Study streaks — invalidate on check-in. */ studyStreaks: 'study-streaks',
    /** User achievements — invalidate on unlock. */ achievements: 'achievements',
    /** Exam countdown — invalidate on exam add/edit. */ examCountdown: 'exam-countdown',
    /** Medical news — fetched from upstream, long revalidate window. */ medicalNews: 'medical-news',
    /** Speed quiz / arena sessions — invalidate on session end. */ speedQuiz: 'speed-quiz',
    /** Flashcard decks — invalidate on deck create/edit/review. */ flashcards: 'flashcards',
    /** User collections — invalidate on collection add/edit/delete. */ collections: 'collections'
};
/**
 * Wraps a fetcher in `unstable_cache` with a typed signature.
 *
 *   const getBankCatalog = cachedFetch(
 *     'bank-catalog:v1',
 *     async () => questionRepository.list({ page: 1, limit: 20 }),
 *     { tags: [CACHE_TAGS.questions], revalidate: 60 }
 *   );
 *   const data = await getBankCatalog();
 *
 * The `keyVersion` argument lets you force a full re-cache after a shape
 * change — bump it from `:v1` to `:v2` and all existing cache entries
 * become orphans (eventually GC'd by Next.js).
 */ function cachedFetch(keyVersion, fetcher, opts = {}) {
    const tags = opts.tags ?? [];
    const revalidate = opts.revalidate ?? 60;
    return unstable_cache(fetcher, tags.length > 0 ? [
        ...tags,
        keyVersion
    ] : [
        keyVersion
    ], {
        ...revalidate !== false ? {
            revalidate
        } : {},
        ...tags.length > 0 ? {
            tags
        } : {}
    });
}
/**
 * Cached fetcher for nullary fetchers (no arguments).
 *
 * Most SSR page fetchers take no args — they just fetch a fixed dataset.
 * This helper makes the call site cleaner:
 *
 *   const getBankCatalog = cachedFetch0('bank-catalog:v1', async () => { ... });
 *   const data = await getBankCatalog();
 */ function cachedFetch0(keyVersion, fetcher, opts = {}) {
    return cachedFetch(keyVersion, fetcher, opts);
}
// ─────────────────────────────────────────────────────────────────────────
// Invalidation helpers
//
// These are thin wrappers around revalidateTag/revalidatePath that exist
// for two reasons:
//   1. They centralise the import of `next/cache` so callers don't need
//      to remember which module the functions live in.
//   2. They return Promise<void> instead of void (the upstream signature
//      is misleading — revalidateTag is actually async under Next.js 16).
// ─────────────────────────────────────────────────────────────────────────
/**
 * Invalidate one or more cache tags. Call this from service-layer write
 * paths (create/update/delete) so the SSR cache is busted the moment
 * the underlying data changes.
 *
 *   await invalidate(CACHE_TAGS.questions);
 *   await invalidate(CACHE_TAGS.questions, CACHE_TAGS.leaderboard);
 *
 * Note: Next.js 16's `revalidateTag` requires a `profile` argument
 * (a cache life profile name like 'default', or a `{ expire: seconds }`
 * object). We pass `'default'` which uses Next.js's built-in profile
 * (5min stale, 15min revalidate). For custom expiry, call
 * `revalidateTag(tag, { expire: 60 })` directly.
 */ async function invalidate(...tags) {
    for (const tag of tags){
        (0,next_cache__WEBPACK_IMPORTED_MODULE_0__.revalidateTag)(tag, 'default');
    }
}
/**
 * Invalidate a specific path. Use this when a write invalidates a
 * specific SSR page (e.g. posting a question invalidates /bank).
 *
 *   await invalidatePath('/bank');
 *   await invalidatePath('/bank', 'page');  // ← only the page, not layout
 */ async function invalidatePath(path, type) {
    (0,next_cache__WEBPACK_IMPORTED_MODULE_0__.revalidatePath)(path, type);
}


/***/ }),

/***/ 271520:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "throwPrerenderPPRRemovedError", ({
    enumerable: true,
    get: function() {
        return throwPrerenderPPRRemovedError;
    }
}));
const _invarianterror = __webpack_require__(772339);
function throwPrerenderPPRRemovedError() {
    throw Object.defineProperty(new _invarianterror.InvariantError('The prerender-ppr work unit type has been removed. This code path should be unreachable.'), "__NEXT_ERROR_CODE", {
        value: "E1158",
        enumerable: false,
        configurable: true
    });
} //# sourceMappingURL=ppr-removed-error.js.map


/***/ }),

/***/ 275811:
/***/ ((module) => {

"use strict";
module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

/***/ }),

/***/ 276220:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "isDynamicRoute", ({
    enumerable: true,
    get: function() {
        return isDynamicRoute;
    }
}));
const _interceptionroutes = __webpack_require__(532107);
// Identify /.*[param].*/ in route string
const TEST_ROUTE = /\/[^/]*\[[^/]+\][^/]*(?=\/|$)/;
// Identify /[param]/ in route string
const TEST_STRICT_ROUTE = /\/\[[^/]+\](?=\/|$)/;
function isDynamicRoute(route, strict = true) {
    if ((0, _interceptionroutes.isInterceptionRouteAppPath)(route)) {
        route = (0, _interceptionroutes.extractInterceptionRouteInformation)(route).interceptedRoute;
    }
    if (strict) {
        return TEST_STRICT_ROUTE.test(route);
    }
    return TEST_ROUTE.test(route);
} //# sourceMappingURL=is-dynamic.js.map


/***/ }),

/***/ 282194:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "z", ({
    enumerable: true,
    get: function() {
        return cacheTag;
    }
}));
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _patchfetch = __webpack_require__(8317);
function cacheTag(...tags) {
    if (true) {
        throw Object.defineProperty(new Error('`cacheTag()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E886",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case 'generate-static-params':
        case undefined:
            throw Object.defineProperty(new Error('`cacheTag()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E819",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    const validTags = (0, _patchfetch.validateTags)(tags, '`cacheTag()`');
    if (!workUnitStore.tags) {
        workUnitStore.tags = validTags;
    } else {
        workUnitStore.tags.push(...validTags);
    }
} //# sourceMappingURL=cache-tag.js.map


/***/ }),

/***/ 306104:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FU: () => (/* binding */ MEDICAL_SYSTEMS),
/* harmony export */   My: () => (/* binding */ DIFFICULTY_LABELS),
/* harmony export */   ee: () => (/* binding */ getDifficultyLevel),
/* harmony export */   hy: () => (/* binding */ normalizeDifficulty)
/* harmony export */ });
/* unused harmony exports TOPIC_MAP, DIFFICULTY_OPTIONS, DIFFICULTY_LEVELS, DIFFICULTY_COLORS, DIFFICULTY_BG_COLORS, QUESTION_TYPES */
const MEDICAL_SYSTEMS = [
    'OBG',
    'Cardiovascular',
    'Respiratory',
    'Neurological',
    'Gastrointestinal',
    'Renal',
    'Endocrine',
    'Hematologic',
    'Musculoskeletal',
    'Integumentary',
    'Reproductive',
    'Immunologic',
    'Pharmacology',
    'Pathology',
    'Microbiology',
    'Biochemistry'
];
const TOPIC_MAP = {
    OBG: [
        'Operative Vaginal Delivery',
        'Malpresentation Malpositions Breech',
        'Abnormal Labour Patterns',
        'Multiple Multifetal Pregnancy',
        'Postpartum Hemorrhage PPH',
        'PROM Preterm Labour',
        'SGA Fetal Growth Restriction',
        'Rh Iso-immunization',
        'Cesarean Delivery',
        'Amenorrhea',
        'Hyperprolactinemia Hirsutism PCOS',
        'Puberty Menopause',
        'Physiology of Menstruation',
        'Anatomy Embryology'
    ],
    Cardiovascular: [
        'Hypertension',
        'Heart Failure',
        'Arrhythmias',
        'Coronary Artery Disease',
        'Valvular Heart Disease',
        'Myocarditis',
        'Aortic Dissection',
        'Endocarditis'
    ],
    Respiratory: [
        'COPD',
        'Asthma',
        'Pneumonia',
        'Pulmonary Embolism',
        'Interstitial Lung Disease',
        'ARDS',
        'Lung Cancer',
        'Pleural Effusion'
    ],
    Neurological: [
        'Stroke',
        'Epilepsy',
        'Parkinson Disease',
        'Multiple Sclerosis',
        'Meningitis',
        'Myasthenia Gravis',
        'Alzheimer Disease',
        'Guillain-Barre'
    ],
    Gastrointestinal: [
        'Peptic Ulcer Disease',
        'Inflammatory Bowel Disease',
        'Pancreatitis',
        'Cirrhosis',
        'Hepatitis',
        'Celiac Disease',
        'GI Bleeding',
        'Appendicitis'
    ],
    Renal: [
        'Acute Kidney Injury',
        'Chronic Kidney Disease',
        'Nephrotic Syndrome',
        'Glomerulonephritis',
        'Renal Stones',
        'UTI',
        'Polycystic Kidney Disease'
    ],
    Endocrine: [
        'Diabetes Mellitus',
        'Thyroid Disorders',
        'Cushing Syndrome',
        'Addison Disease',
        'Pheochromocytoma',
        'Hyperparathyroidism',
        'SIADH',
        'Diabetes Insipidus'
    ],
    Hematologic: [
        'Anemia',
        'Leukemia',
        'Lymphoma',
        'Coagulation Disorders',
        'Sickle Cell Disease',
        'Thrombocytopenia',
        'Hemophilia',
        'DIC'
    ],
    Musculoskeletal: [
        'Rheumatoid Arthritis',
        'Osteoarthritis',
        'Osteoporosis',
        'Gout',
        'Lyme Disease',
        'Osteomyelitis',
        'Fractures',
        'Lupus'
    ],
    Integumentary: [
        'Melanoma',
        'Psoriasis',
        'Eczema',
        'Burns',
        'Cellulitis',
        'Contact Dermatitis',
        'Acne Vulgaris',
        'Basal Cell Carcinoma'
    ],
    Reproductive: [
        'Ectopic Pregnancy',
        'PCOS',
        'Endometriosis',
        'Preeclampsia',
        'Prostate Cancer',
        'Cervical Cancer',
        'Infertility',
        'Menorrhagia'
    ],
    Immunologic: [
        'HIV/AIDS',
        'Autoimmune Diseases',
        'Transplant Rejection',
        'Primary Immunodeficiency',
        'Anaphylaxis',
        'SLE',
        'Sarcoidosis',
        'Vasculitis'
    ],
    Pharmacology: [
        'ACE Inhibitors',
        'Beta Blockers',
        'Statins',
        'Antibiotics',
        'Anticoagulants',
        'NSAIDs',
        'Opioids',
        'Antidepressants'
    ],
    Pathology: [
        'Neoplasia',
        'Inflammation',
        'Infarction',
        'Apoptosis',
        'Necrosis',
        'Amyloidosis',
        'Hemochromatosis',
        'Atherosclerosis'
    ],
    Microbiology: [
        'Staphylococcus',
        'Streptococcus',
        'E. coli',
        'TB',
        'Malaria',
        'HIV',
        'Hepatitis Viruses',
        'Fungal Infections'
    ],
    Biochemistry: [
        'Glycolysis',
        'TCA Cycle',
        'Urea Cycle',
        'Lipid Metabolism',
        'Porphyrias',
        'Glycogen Storage Diseases',
        'Electron Transport Chain'
    ]
};
const DIFFICULTY_OPTIONS = (/* unused pure expression or super */ null && ([
    'Easy',
    'Basic',
    'Moderate',
    'Hard',
    'Expert'
]));
const DIFFICULTY_LEVELS = {
    'Easy': 1,
    'Basic': 2,
    'Moderate': 3,
    'Hard': 4,
    'Expert': 5
};
const DIFFICULTY_LABELS = {
    1: 'Easy',
    2: 'Basic',
    3: 'Moderate',
    4: 'Hard',
    5: 'Expert'
};
const DIFFICULTY_COLORS = {
    1: '#22c55e',
    2: '#4ade80',
    3: '#f59e0b',
    4: '#f97316',
    5: '#ef4444'
};
const DIFFICULTY_BG_COLORS = {
    1: 'rgba(34,197,94,0.10)',
    2: 'rgba(74,222,128,0.10)',
    3: 'rgba(245,158,11,0.10)',
    4: 'rgba(249,115,22,0.10)',
    5: 'rgba(239,68,68,0.10)'
};
/** Map legacy difficulty values to new 5-level system */ function normalizeDifficulty(difficulty) {
    if (difficulty === 'Medium') return 'Moderate';
    const valid = new Set([
        'Easy',
        'Basic',
        'Moderate',
        'Hard',
        'Expert'
    ]);
    return valid.has(difficulty) ? difficulty : 'Moderate';
}
/** Get numeric level from difficulty label */ function getDifficultyLevel(difficulty) {
    return DIFFICULTY_LEVELS[normalizeDifficulty(difficulty)] ?? 3;
}
const QUESTION_TYPES = (/* unused pure expression or super */ null && ([
    'mcq',
    'tf',
    'short'
]));


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

/***/ 321820:
/***/ ((module) => {

"use strict";
module.exports = require("os");

/***/ }),

/***/ 333873:
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ 383519:
/***/ ((module) => {

"use strict";
module.exports = require("postgres-array");

/***/ }),

/***/ 419121:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 439569:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DELETE: () => (/* binding */ DELETE),
/* harmony export */   GET: () => (/* binding */ GET),
/* harmony export */   POST: () => (/* binding */ POST)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(520903);
/* harmony import */ var _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(306104);
/* harmony import */ var _lib_server_cache__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(265547);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_db__WEBPACK_IMPORTED_MODULE_1__]);
_lib_db__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '20', 10);
        const system = searchParams.get('system');
        const topic = searchParams.get('topic');
        const difficulty = searchParams.get('difficulty');
        const type = searchParams.get('type');
        const search = searchParams.get('search');
        // Citation-status filter: 'cited' (has chunk-level citations), 'uncited'
        // (none — honest drop or legacy), or 'verified' (≥1 citation with
        // answer-support judge score ≥ 8). 'verified' needs JSON inspection, so
        // it is resolved by ids (see below) to keep pagination exact.
        const citation = searchParams.get('citation');
        // Composable filter groups — each dimension contributes an AND group so
        // combining filters never clobbers another dimension's OR block (the old
        // flat `where.OR` assignments let search + difficulty overwrite each other).
        const andGroups = [];
        const where = {};
        if (system) where.system = system;
        if (topic) where.topic = {
            contains: topic
        };
        if (difficulty) {
            // Support numeric difficulty level (1-5) or label string
            const numDiff = parseInt(difficulty, 10);
            if (!isNaN(numDiff) && numDiff >= 1 && numDiff <= 5) {
                // Map level number to label, also include legacy 'Medium' mapping to 'Moderate'
                const label = _lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .DIFFICULTY_LABELS */ .My[numDiff];
                if (label === 'Moderate') {
                    andGroups.push({
                        OR: [
                            {
                                difficulty: label
                            },
                            {
                                difficulty: 'Medium'
                            }
                        ]
                    });
                } else {
                    where.difficulty = label;
                }
            } else {
                // Legacy label support: 'Medium' → also match 'Moderate'
                if (difficulty === 'Moderate') {
                    andGroups.push({
                        OR: [
                            {
                                difficulty: 'Moderate'
                            },
                            {
                                difficulty: 'Medium'
                            }
                        ]
                    });
                } else {
                    where.difficulty = difficulty;
                }
            }
        }
        // Type filter. NOTE: type "flashcard" rows are agent-created spaced-
        // repetition cards (create_flashcards tool) — they belong to the
        // Flashcards page, not the MCQ bank, so the default listing excludes
        // them. An explicit ?type=flashcard (or any other type) still works.
        if (type) where.type = type;
        else where.type = {
            not: 'flashcard'
        };
        if (search) {
            andGroups.push({
                OR: [
                    {
                        text: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        topic: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    },
                    {
                        system: {
                            contains: search,
                            mode: 'insensitive'
                        }
                    }
                ]
            });
        }
        if (citation === 'cited' || citation === 'verified') {
            // Column is NOT NULL with default '[]' — "cited" = anything other than
            // the empty placeholder ('[]' or '').
            andGroups.push({
                NOT: {
                    OR: [
                        {
                            citations: '[]'
                        },
                        {
                            citations: ''
                        }
                    ]
                }
            });
        } else if (citation === 'uncited') {
            andGroups.push({
                OR: [
                    {
                        citations: '[]'
                    },
                    {
                        citations: ''
                    }
                ]
            });
        }
        if (andGroups.length) where.AND = andGroups;
        // 'verified': judgeScore lives inside the JSON citations text, so resolve
        // the qualifying ids first (one light scan over the already-filtered set),
        // then page over them by id — counts and pagination stay exact.
        let verifiedIds = null;
        if (citation === 'verified') {
            const citedRows = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.findMany({
                where,
                select: {
                    id: true,
                    citations: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            });
            verifiedIds = citedRows.filter((row)=>{
                try {
                    const arr = JSON.parse(row.citations || '[]');
                    return Array.isArray(arr) && arr.some((c)=>typeof c?.judgeScore === 'number' && c.judgeScore >= 8);
                } catch  {
                    return false;
                }
            }).map((row)=>row.id);
            where.id = {
                in: verifiedIds
            };
        }
        const [questions, total] = await Promise.all([
            _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.findMany({
                where,
                orderBy: {
                    createdAt: 'desc'
                },
                skip: (page - 1) * limit,
                take: limit
            }),
            _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.count({
                where
            })
        ]);
        // Safely parse the JSON columns — a single malformed row (e.g. a
        // citations blob that was double-escaped at write time) used to abort
        // the WHOLE list request with a 500 + "Expected ',' or '}'" message,
        // taking the entire bank page offline. Each column is parsed in its own
        // try/catch so one bad row degrades gracefully (returns [] / {} for
        // that column) instead of poisoning the response.
        const safeJson = (raw, fallback)=>{
            if (!raw) return fallback;
            try {
                return JSON.parse(raw);
            } catch  {
                return fallback;
            }
        };
        const formatted = questions.map((q)=>({
                ...q,
                options: safeJson(q.options, []),
                tags: safeJson(q.tags, []),
                sources: safeJson(q.sources, []),
                // Advanced chunk-level citations: {sourceId, chunkId, title, fileKind, quote}
                citations: safeJson(q.citations, []),
                diagramSpec: q.diagramSpec || undefined,
                molecularScenes: q.molecularScenes || undefined,
                difficultyLevel: (0,_lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .getDifficultyLevel */ .ee)((0,_lib_medq_types__WEBPACK_IMPORTED_MODULE_2__/* .normalizeDifficulty */ .hy)(q.difficulty || 'Moderate'))
            }));
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            questions: formatted,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        });
    } catch (error) {
        console.error('Questions GET error:', error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Failed to fetch questions'
        }, {
            status: 500
        });
    }
}
async function POST(request) {
    try {
        const body = await request.json();
        const { type, text, options, answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags, isAIGenerated, illustrationDescription, diagramSpec, molecularScenes, sources, organInvolvement, mechanismDiagram, visualSummary } = body;
        if (!text || !type) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'Text and type are required'
            }, {
                status: 400
            });
        }
        // Process diagramSpec - stringify if object, keep as string if already string
        let diagramSpecStr = '';
        if (diagramSpec) {
            diagramSpecStr = typeof diagramSpec === 'string' ? diagramSpec : JSON.stringify(diagramSpec);
        }
        // Process molecularScenes - stringify if object
        let molecularScenesStr = '';
        if (molecularScenes) {
            molecularScenesStr = typeof molecularScenes === 'string' ? molecularScenes : JSON.stringify(molecularScenes);
        }
        // Process sources - stringify if array
        let sourcesStr = '[]';
        if (sources) {
            sourcesStr = typeof sources === 'string' ? sources : JSON.stringify(sources);
        }
        const question = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.create({
            data: {
                type: type || 'mcq',
                text: text || '',
                options: JSON.stringify(options || []),
                answer: answer || '',
                explanation: explanation || '',
                mnemonic: mnemonic || '',
                clinicalPearl: clinicalPearl || '',
                distractorAnalysis: distractorAnalysis || '',
                difficulty: difficulty || 'Moderate',
                system: system || '',
                topic: topic || '',
                tags: JSON.stringify(tags || []),
                isAIGenerated: isAIGenerated || false,
                illustrationDescription: illustrationDescription || '',
                diagramSpec: diagramSpecStr,
                molecularScenes: molecularScenesStr,
                sources: sourcesStr,
                organInvolvement: organInvolvement || '',
                mechanismDiagram: mechanismDiagram || '',
                visualSummary: visualSummary || ''
            }
        });
        // Bust the SSR cache so /bank and any cached question-by-id entries
        // pick up the new question on the next render.
        await (0,_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .invalidate */ .Y1)(_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .CACHE_TAGS */ .jY.questions);
        await (0,_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .invalidatePath */ .$i)('/bank');
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ...question,
            options: JSON.parse(question.options),
            tags: JSON.parse(question.tags),
            sources: question.sources ? JSON.parse(question.sources) : [],
            diagramSpec: question.diagramSpec || undefined,
            molecularScenes: question.molecularScenes || undefined
        });
    } catch (error) {
        console.error('Questions POST error:', error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: 'Failed to create question'
        }, {
            status: 500
        });
    }
}
async function DELETE(request) {
    try {
        const { ids } = await request.json();
        if (!Array.isArray(ids) || ids.length === 0) {
            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
                error: 'ids array is required'
            }, {
                status: 400
            });
        }
        // Delete exam question references first (cascade)
        await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.examQuestion.deleteMany({
            where: {
                questionId: {
                    in: ids
                }
            }
        });
        // Delete the questions
        const result = await _lib_db__WEBPACK_IMPORTED_MODULE_1__.db.question.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        // Bust the SSR cache so /bank and cached question-by-id entries
        // stop serving the deleted questions.
        await (0,_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .invalidate */ .Y1)(_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .CACHE_TAGS */ .jY.questions, _lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .CACHE_TAGS */ .jY.questionById);
        await (0,_lib_server_cache__WEBPACK_IMPORTED_MODULE_3__/* .invalidatePath */ .$i)('/bank');
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            deleted: result.count
        });
    } catch (error) {
        console.error('Bulk delete error:', error);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: error instanceof Error ? error.message : 'Failed to delete questions'
        }, {
            status: 500
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 455511:
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ 504573:
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ 529294:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 532107:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    INTERCEPTION_ROUTE_MARKERS: function() {
        return INTERCEPTION_ROUTE_MARKERS;
    },
    extractInterceptionRouteInformation: function() {
        return extractInterceptionRouteInformation;
    },
    isInterceptionRouteAppPath: function() {
        return isInterceptionRouteAppPath;
    }
});
const _apppaths = __webpack_require__(66796);
const INTERCEPTION_ROUTE_MARKERS = [
    '(..)(..)',
    '(.)',
    '(..)',
    '(...)'
];
function isInterceptionRouteAppPath(path) {
    // TODO-APP: add more serious validation
    return path.split('/').find((segment)=>INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m))) !== undefined;
}
function extractInterceptionRouteInformation(path) {
    let interceptingRoute;
    let marker;
    let interceptedRoute;
    for (const segment of path.split('/')){
        marker = INTERCEPTION_ROUTE_MARKERS.find((m)=>segment.startsWith(m));
        if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
        }
    }
    if (!interceptingRoute || !marker || !interceptedRoute) {
        throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
        });
    }
    interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute) // normalize the path, e.g. /(blog)/feed -> /feed
    ;
    switch(marker){
        case '(.)':
            // (.) indicates that we should match with sibling routes, so we just need to append the intercepted route to the intercepting route
            if (interceptingRoute === '/') {
                interceptedRoute = `/${interceptedRoute}`;
            } else {
                interceptedRoute = interceptingRoute + '/' + interceptedRoute;
            }
            break;
        case '(..)':
            // (..) indicates that we should match at one level up, so we need to remove the last segment of the intercepting route
            if (interceptingRoute === '/') {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                    value: "E207",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = interceptingRoute.split('/').slice(0, -1).concat(interceptedRoute).join('/');
            break;
        case '(...)':
            // (...) will match the route segment in the root directory, so we need to use the root directory to prepend the intercepted route
            interceptedRoute = '/' + interceptedRoute;
            break;
        case '(..)(..)':
            // (..)(..) indicates that we should match at two levels up, so we need to remove the last two segments of the intercepting route
            const splitInterceptingRoute = interceptingRoute.split('/');
            if (splitInterceptingRoute.length <= 2) {
                throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                    value: "E486",
                    enumerable: false,
                    configurable: true
                });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join('/');
            break;
        default:
            throw Object.defineProperty(new Error('Invariant: unexpected marker'), "__NEXT_ERROR_CODE", {
                value: "E112",
                enumerable: false,
                configurable: true
            });
    }
    return {
        interceptingRoute,
        interceptedRoute
    };
} //# sourceMappingURL=interception-routes.js.map


/***/ }),

/***/ 589503:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "M", ({
    enumerable: true,
    get: function() {
        return unstable_noStore;
    }
}));
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _dynamicrendering = __webpack_require__(423445);
function unstable_noStore() {
    const callingExpression = 'unstable_noStore()';
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!store) {
        // This generally implies we are being called in Pages router. We should probably not support
        // unstable_noStore in contexts outside of `react-server` condition but since we historically
        // have not errored here previously, we maintain that behavior for now.
        return;
    } else if (store.forceStatic) {
        return;
    } else {
        store.isUnstableNoStore = true;
        if (workUnitStore) {
            switch(workUnitStore.type){
                case 'prerender':
                case 'prerender-client':
                case 'validation-client':
                case 'prerender-runtime':
                    // unstable_noStore() is a noop in Dynamic I/O.
                    return;
                case 'prerender-ppr':
                case 'prerender-legacy':
                case 'request':
                case 'cache':
                case 'private-cache':
                case 'unstable-cache':
                case 'generate-static-params':
                    break;
                default:
                    workUnitStore;
            }
        }
        (0, _dynamicrendering.markCurrentScopeAsDynamic)(store, workUnitStore, callingExpression);
    }
}

//# sourceMappingURL=unstable-no-store.js.map

/***/ }),

/***/ 629021:
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ 663033:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ 692150:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "io", ({
    enumerable: true,
    get: function() {
        return io;
    }
}));
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _dynamicrenderingutils = __webpack_require__(548894);
const _stagedrendering = __webpack_require__(965934);
const _pprremovederror = __webpack_require__(271520);
const _utils = __webpack_require__(492305);
// A fulfilled thenable that React can unwrap synchronously via `use()` without
// ever suspending. Reusing a single instance avoids allocating on every call.
const resolvedIOPromise = Promise.resolve(undefined);
resolvedIOPromise.status = 'fulfilled';
resolvedIOPromise.value = undefined;
function io() {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workStore && workUnitStore) {
        if (workUnitStore && !(0, _utils.isRequestApiAllowedInCurrentPhase)(workUnitStore)) {
            throw Object.defineProperty(new Error(`Route ${workStore.route} used \`io()\` inside \`after()\` while rendering. The \`io()\` function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`), "__NEXT_ERROR_CODE", {
                value: "E1380",
                enumerable: false,
                configurable: true
            });
        }
        switch(workUnitStore.type){
            case 'request':
                // For dev renders we instrument the promise so it will show up in
                // React Suspense Devtools and, if also doing `instant` validation,
                // ensure it resolves in the right stage for staged rendering
                // In production we just let it resolve immediately because we're doing
                // a dynamic SSR or resume render and have no need to delay anything
                // after this call
                if (false) {} else if (workUnitStore.asyncApiPromises) {
                    return workUnitStore.asyncApiPromises.io;
                }
                return resolvedIOPromise;
            case 'prerender':
            case 'prerender-client':
            case 'prerender-runtime':
                // When prerendering with Cache Components we consider `io()` to be
                // actual IO if not in a cache scope and we can avoid actually executing
                // anything after it by making it return a hanging promise.
                return (0, _dynamicrenderingutils.makeDynamicHangingPromise)(workUnitStore.renderSignal, workStore.route, '`io()`');
            case 'prerender-ppr':
                // Dead code to be removed when we eliminate legacy ppr code
                (0, _pprremovederror.throwPrerenderPPRRemovedError)();
                break;
            case 'cache':
            case 'private-cache':
            case 'unstable-cache':
            // Inside cache scopes, io() resolves immediately.
            // Caches can contain IO-dependent code like new Date() — it will
            // simply return the value at cache-fill time.
            // ...
            // intentional fallthrough
            case 'generate-static-params':
            // generateStaticParams runs at build time. There is no prerender
            // to stall so we resolve immediately.
            // ...
            // intentional fallthrough
            case 'validation-client':
            // io() is usable in client components, resolve immediately.
            // The reason we take this position is most io shielding you would do
            // in a browser is for sync IO as there aren't many non-fetch based IO
            // operations you can do in the browser that have meaningful latency.
            // So while you might use
            // ...
            // intentional fallthrough
            case 'prerender-legacy':
                // Without cache components, IO is not inherently dynamic.
                // Resolve immediately rather than interrupting static generation.
                return resolvedIOPromise;
            default:
                workUnitStore;
        }
    }
    // No work store — we're outside the Next.js rendering context (e.g. in
    // a client component on the browser or in a standalone script). Resolve
    // immediately.
    return resolvedIOPromise;
}

//# sourceMappingURL=io.js.map

/***/ }),

/***/ 710846:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 716949:
/***/ ((module, exports, __webpack_require__) => {

let cacheExports

if (false) {} else {
  // Keep server requires in this branch so browser builds can DCE them.
  cacheExports = {
    unstable_cache:
      (__webpack_require__(785568)/* .unstable_cache */ .e),

    updateTag: (__webpack_require__(906984).updateTag),

    revalidateTag: (__webpack_require__(906984).revalidateTag),
    revalidatePath: (__webpack_require__(906984).revalidatePath),

    refresh: (__webpack_require__(906984).refresh),

    unstable_noStore:
      (__webpack_require__(589503)/* .unstable_noStore */ .M),
    io: (__webpack_require__(692150).io),
    cacheLife: (__webpack_require__(792418)/* .cacheLife */ .F),
    cacheTag: (__webpack_require__(282194)/* .cacheTag */ .z),
  }
}

let didWarnCacheLife = false
function unstable_cacheLife() {
  if (!didWarnCacheLife) {
    didWarnCacheLife = true
    const error = new Error(
      '`unstable_cacheLife` was recently stabilized and should be imported as `cacheLife`. The `unstable` prefixed form will be removed in a future version of Next.js.'
    )
    console.error(error)
  }
  return cacheExports.cacheLife.apply(this, arguments)
}

let didWarnCacheTag = false
function unstable_cacheTag() {
  if (!didWarnCacheTag) {
    didWarnCacheTag = true
    const error = new Error(
      '`unstable_cacheTag` was recently stabilized and should be imported as `cacheTag`. The `unstable` prefixed form will be removed in a future version of Next.js.'
    )
    console.error(error)
  }
  return cacheExports.cacheTag.apply(this, arguments)
}

cacheExports.unstable_cacheLife = unstable_cacheLife
cacheExports.unstable_cacheTag = unstable_cacheTag

// https://nodejs.org/api/esm.html#commonjs-namespaces
// When importing CommonJS modules, the module.exports object is provided as the default export
module.exports = cacheExports

// make import { xxx } from 'next/cache' work
exports.unstable_cache = cacheExports.unstable_cache
exports.revalidatePath = cacheExports.revalidatePath
exports.revalidateTag = cacheExports.revalidateTag
exports.updateTag = cacheExports.updateTag
exports.unstable_noStore = cacheExports.unstable_noStore
exports.cacheLife = cacheExports.cacheLife
exports.unstable_cacheLife = cacheExports.unstable_cacheLife
exports.cacheTag = cacheExports.cacheTag
exports.unstable_cacheTag = cacheExports.unstable_cacheTag
exports.refresh = cacheExports.refresh
exports.io = cacheExports.io


/***/ }),

/***/ 744870:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 785568:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "e", ({
    enumerable: true,
    get: function() {
        return unstable_cache;
    }
}));
const _constants = __webpack_require__(347929);
const _patchfetch = __webpack_require__(8317);
const _encodeheadersafe = __webpack_require__(753446);
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _responsecache = __webpack_require__(137527);
let noStoreFetchIdx = 0;
async function cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl) {
    await incrementalCache.set(cacheKey, {
        kind: _responsecache.CachedRouteKind.FETCH,
        data: {
            headers: {},
            // TODO: handle non-JSON values?
            body: JSON.stringify(result),
            status: 200,
            url: ''
        },
        revalidate: typeof revalidate !== 'number' ? _constants.CACHE_ONE_YEAR_SECONDS : revalidate
    }, {
        fetchCache: true,
        tags,
        fetchIdx,
        fetchUrl
    });
    return;
}
function unstable_cache(cb, keyParts, options = {}) {
    if (options.revalidate === 0) {
        throw Object.defineProperty(new Error(`Invariant revalidate: 0 can not be passed to unstable_cache(), must be "false" or "> 0" ${cb.toString()}`), "__NEXT_ERROR_CODE", {
            value: "E57",
            enumerable: false,
            configurable: true
        });
    }
    // Validate the tags provided are valid
    const tags = options.tags ? (0, _patchfetch.validateTags)(options.tags, `unstable_cache ${cb.toString()}`) : [];
    // Validate the revalidate option, and adopt the normalized value, which
    // maps `false` and `Infinity` to INFINITE_CACHE so that the stored value
    // survives JSON serialization.
    const revalidate = (0, _patchfetch.validateRevalidate)(options.revalidate, `unstable_cache ${cb.name || cb.toString()}`);
    // Stash the fixed part of the key at construction time. The invocation key will combine
    // the fixed key with the arguments when actually called
    // @TODO if cb.toString() is long we should hash it
    // @TODO come up with a collision-free way to combine keyParts
    // @TODO consider validating the keyParts are all strings. TS can't provide runtime guarantees
    // and the error produced by accidentally using something that cannot be safely coerced is likely
    // hard to debug
    const fixedKey = `${cb.toString()}-${Array.isArray(keyParts) && keyParts.join(',')}`;
    const cachedCb = async (...args)=>{
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        // We must be able to find the incremental cache otherwise we throw
        const maybeIncrementalCache = (workStore == null ? void 0 : workStore.incrementalCache) || globalThis.__incrementalCache;
        if (!maybeIncrementalCache) {
            throw Object.defineProperty(new Error(`Invariant: incrementalCache missing in unstable_cache ${cb.toString()}`), "__NEXT_ERROR_CODE", {
                value: "E469",
                enumerable: false,
                configurable: true
            });
        }
        const incrementalCache = maybeIncrementalCache;
        const cacheSignal = workUnitStore ? (0, _workunitasyncstorageexternal.getCacheSignal)(workUnitStore) : null;
        if (cacheSignal) {
            cacheSignal.beginRead();
        }
        try {
            // If there's no request store, we aren't in a request (or we're not in
            // app router) and if there's no static generation store, we aren't in app
            // router. Default to an empty pathname and search params when there's no
            // request store or static generation store available.
            const fetchUrlPrefix = workStore && workUnitStore ? getFetchUrlPrefix(workStore, workUnitStore) : '';
            // Construct the complete cache key for this function invocation
            // @TODO stringify is likely not safe here. We will coerce undefined to null which will make
            // the keyspace smaller than the execution space
            const invocationKey = `${fixedKey}-${JSON.stringify(args)}`;
            const cacheKey = await incrementalCache.generateSimpleCacheKey(invocationKey);
            // $urlWithPath,$sortedQueryStringKeys,$hashOfEveryThingElse
            //
            // A cache implementation may serialize this name into an HTTP request
            // header, so it is encoded here. Both parts can carry a character above
            // U+00FF: the search parameters are decoded, and a JavaScript identifier
            // may hold one. The character class leaves the separating spaces and the
            // URL punctuation untouched, so the shape above is preserved.
            //
            // `toWellFormed` replaces lone surrogates, which `cb.name` can hold and
            // which `encodeURIComponent` rejects. The name identifies the call for
            // debug metrics, so a replacement character is an acceptable trade for
            // not failing the render.
            const fetchUrl = (0, _encodeheadersafe.encodeHeaderSafe)(`unstable_cache ${fetchUrlPrefix} ${cb.name ? ` ${cb.name}` : cacheKey}`.toWellFormed());
            const fetchIdx = (workStore ? workStore.nextFetchId : noStoreFetchIdx) ?? 1;
            const implicitTags = workUnitStore == null ? void 0 : workUnitStore.implicitTags;
            const innerCacheStore = {
                type: 'unstable-cache',
                phase: 'render',
                implicitTags,
                draftMode: workUnitStore && workStore && (0, _workunitasyncstorageexternal.getDraftModeProviderForCacheScope)(workStore, workUnitStore),
                rootParams: undefined
            };
            if (workStore) {
                workStore.nextFetchId = fetchIdx + 1;
                // We are in an App Router context. We try to return the cached entry if it exists and is valid
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                let isNestedUnstableCache = false;
                if (workUnitStore) {
                    switch(workUnitStore.type){
                        case 'cache':
                        case 'private-cache':
                        case 'prerender':
                        case 'prerender-runtime':
                        case 'prerender-ppr':
                        case 'prerender-legacy':
                            // We update the store's revalidate property if the revalidate option is a higher precedence
                            // revalidate === undefined doesn't affect timing.
                            // revalidate === INFINITE_CACHE (from `false` or `Infinity`) doesn't shrink timing. it stays at the maximum.
                            if (typeof revalidate === 'number') {
                                if (workUnitStore.revalidate < revalidate) {
                                // The store is already revalidating on a shorter time interval, leave it alone
                                } else {
                                    workUnitStore.revalidate = revalidate;
                                }
                            }
                            // We need to accumulate the tags for this invocation within the store
                            const collectedTags = workUnitStore.tags;
                            if (collectedTags === null) {
                                workUnitStore.tags = tags.slice();
                            } else {
                                for (const tag of tags){
                                    // @TODO refactor tags to be a set to avoid this O(n) lookup
                                    if (!collectedTags.includes(tag)) {
                                        collectedTags.push(tag);
                                    }
                                }
                            }
                            break;
                        case 'unstable-cache':
                            isNestedUnstableCache = true;
                            break;
                        case 'prerender-client':
                        case 'validation-client':
                        case 'request':
                        case 'generate-static-params':
                            break;
                        default:
                            workUnitStore;
                    }
                }
                if (// when we are nested inside of other unstable_cache's
                // we should bypass cache similar to fetches
                !isNestedUnstableCache && workStore.fetchCache !== 'force-no-store' && !workStore.isOnDemandRevalidate && !incrementalCache.isOnDemandRevalidate && !workStore.isDraftMode) {
                    // We attempt to get the current cache entry from the incremental cache.
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate,
                        tags,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags,
                        fetchIdx,
                        fetchUrl
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            // @TODO the invocation key can have sensitive data in it. we should not log this entire object
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else {
                            // We have a valid cache entry so we will be returning it. We also check to see if we need
                            // to background revalidate it by checking if it is stale.
                            const cachedResponse = cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                            if (cacheEntry.isStale) {
                                if (!workStore.pendingRevalidates) {
                                    workStore.pendingRevalidates = {};
                                }
                                // Check if there's already a pending revalidation to avoid duplicate work
                                if (!workStore.pendingRevalidates[invocationKey]) {
                                    // Create the revalidation promise
                                    const revalidationPromise = _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args).then(async (result)=>{
                                        await cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl);
                                        return result;
                                    }).catch((err)=>{
                                        // @TODO This error handling seems wrong. We swallow the error?
                                        console.error(`revalidating cache with key: ${invocationKey}`, err);
                                        // Return the stale value on error for foreground revalidation
                                        return cachedResponse;
                                    });
                                    // Attach the empty catch here so we don't get a "unhandled promise
                                    // rejection" warning. (Behavior is matched with patch-fetch)
                                    if (workStore.isStaticGeneration) {
                                        revalidationPromise.catch(()=>{});
                                    }
                                    workStore.pendingRevalidates[invocationKey] = revalidationPromise;
                                }
                                // Check if we need to do foreground revalidation
                                if (workStore.isStaticGeneration) {
                                    // When the page is revalidating and the cache entry is stale,
                                    // we need to wait for fresh data (blocking revalidate). The
                                    // `await` here keeps `cacheSignal.endRead` (in the outer
                                    // `finally`) suspended until the recompute + cacheNewResult
                                    // actually complete, so the prospective prerender's
                                    // `cacheSignal` doesn't resolve `cacheReady` prematurely.
                                    return await workStore.pendingRevalidates[invocationKey];
                                }
                            // Otherwise, we're doing background revalidation - return stale immediately
                            }
                            // We had a valid cache entry so we return it here
                            return cachedResponse;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                if (!workStore.isDraftMode) {
                    if (!workStore.pendingRevalidates) {
                        workStore.pendingRevalidates = {};
                    }
                    // We need to push the cache result promise to pending
                    // revalidates otherwise it won't be awaited and is just
                    // dangling
                    workStore.pendingRevalidates[invocationKey] = cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl);
                }
                return result;
            } else {
                noStoreFetchIdx += 1;
                // We are in Pages Router or were called outside of a render. We don't have a store
                // so we just call the callback directly when it needs to run.
                // If the entry is fresh we return it. If the entry is stale we return it but revalidate the entry in
                // the background. If the entry is missing or invalid we generate a new entry and return it.
                if (!incrementalCache.isOnDemandRevalidate) {
                    // We aren't doing an on demand revalidation so we check use the cache if valid
                    const cacheEntry = await incrementalCache.get(cacheKey, {
                        kind: _responsecache.IncrementalCacheKind.FETCH,
                        revalidate,
                        tags,
                        fetchIdx,
                        fetchUrl,
                        softTags: implicitTags == null ? void 0 : implicitTags.tags
                    });
                    if (cacheEntry && cacheEntry.value) {
                        // The entry exists and has a value
                        if (cacheEntry.value.kind !== _responsecache.CachedRouteKind.FETCH) {
                            // The entry is invalid and we need a special warning
                            // @TODO why do we warn this way? Should this just be an error? How are these errors surfaced
                            // so bugs can be reported
                            console.error(`Invariant invalid cacheEntry returned for ${invocationKey}`);
                        // will fall through to generating a new cache entry below
                        } else if (!cacheEntry.isStale) {
                            // We have a valid cache entry and it is fresh so we return it
                            return cacheEntry.value.data.body !== undefined ? JSON.parse(cacheEntry.value.data.body) : undefined;
                        }
                    }
                }
                // If we got this far then we had an invalid cache entry and need to generate a new one
                const result = await _workunitasyncstorageexternal.workUnitAsyncStorage.run(innerCacheStore, cb, ...args);
                // we need to wait setting the new cache result here as
                // we don't have pending revalidates on workStore to
                // push to and we can't have a dangling promise
                await cacheNewResult(result, incrementalCache, cacheKey, tags, revalidate, fetchIdx, fetchUrl);
                return result;
            }
        } finally{
            if (cacheSignal) {
                cacheSignal.endRead();
            }
        }
    };
    // TODO: once AsyncLocalStorage.run() returns the correct types this override will no longer be necessary
    return cachedCb;
}
function getFetchUrlPrefix(workStore, workUnitStore) {
    switch(workUnitStore.type){
        case 'request':
            const pathname = workUnitStore.url.pathname;
            const searchParams = new URLSearchParams(workUnitStore.url.search);
            const sortedSearch = [
                ...searchParams.keys()
            ].sort((a, b)=>a.localeCompare(b)).map((key)=>`${key}=${searchParams.get(key)}`).join('&');
            return `${pathname}${sortedSearch.length ? '?' : ''}${sortedSearch}`;
        case 'prerender':
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'cache':
        case 'private-cache':
        case 'unstable-cache':
        case 'generate-static-params':
            return workStore.route;
        default:
            return workUnitStore;
    }
}

//# sourceMappingURL=unstable-cache.js.map

/***/ }),

/***/ 792418:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
var __webpack_unused_export__;

__webpack_unused_export__ = ({
    value: true
});
Object.defineProperty(exports, "F", ({
    enumerable: true,
    get: function() {
        return cacheLife;
    }
}));
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _cachelifeprofile = __webpack_require__(880370);
function cacheLife(profile) {
    if (true) {
        throw Object.defineProperty(new Error('`cacheLife()` is only available with the `cacheComponents` config.'), "__NEXT_ERROR_CODE", {
            value: "E887",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    switch(workUnitStore == null ? void 0 : workUnitStore.type){
        case 'prerender':
        case 'prerender-client':
        case 'validation-client':
        case 'prerender-runtime':
        case 'prerender-ppr':
        case 'prerender-legacy':
        case 'request':
        case 'unstable-cache':
        case 'generate-static-params':
        case undefined:
            throw Object.defineProperty(new Error('`cacheLife()` can only be called inside a "use cache" function.'), "__NEXT_ERROR_CODE", {
                value: "E818",
                enumerable: false,
                configurable: true
            });
        case 'cache':
        case 'private-cache':
            break;
        default:
            workUnitStore;
    }
    if (typeof profile === 'string') {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        if (!workStore) {
            throw Object.defineProperty(new Error('`cacheLife()` can only be called during App Router rendering at the moment.'), "__NEXT_ERROR_CODE", {
                value: "E820",
                enumerable: false,
                configurable: true
            });
        }
        // TODO: This should be globally available and not require an AsyncLocalStorage.
        const configuredProfile = workStore.cacheLifeProfiles[profile];
        if (configuredProfile === undefined) {
            if (workStore.cacheLifeProfiles[profile.trim()]) {
                throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + `Did you mean "${profile.trim()}" without the spaces?`), "__NEXT_ERROR_CODE", {
                    value: "E816",
                    enumerable: false,
                    configurable: true
                });
            }
            throw Object.defineProperty(new Error(`Unknown \`cacheLife()\` profile "${profile}" is not configured in next.config.js\n` + 'module.exports = {\n' + '  cacheLife: {\n' + `    "${profile}": ...\n` + '  }\n' + '}'), "__NEXT_ERROR_CODE", {
                value: "E888",
                enumerable: false,
                configurable: true
            });
        }
        profile = configuredProfile;
    } else if (typeof profile !== 'object' || profile === null || Array.isArray(profile)) {
        throw Object.defineProperty(new Error('Invalid `cacheLife()` option. Either pass a profile name or object.'), "__NEXT_ERROR_CODE", {
            value: "E814",
            enumerable: false,
            configurable: true
        });
    } else {
        profile = (0, _cachelifeprofile.validateAndNormalizeCacheLifeProfile)(profile, {
            kind: 'inline'
        });
    }
    if (profile.revalidate !== undefined) {
        // Track the explicit revalidate time.
        if (workUnitStore.explicitRevalidate === undefined || workUnitStore.explicitRevalidate > profile.revalidate) {
            workUnitStore.explicitRevalidate = profile.revalidate;
        }
    }
    if (profile.expire !== undefined) {
        // Track the explicit expire time.
        if (workUnitStore.explicitExpire === undefined || workUnitStore.explicitExpire > profile.expire) {
            workUnitStore.explicitExpire = profile.expire;
        }
    }
    if (profile.stale !== undefined) {
        // Track the explicit stale time.
        if (workUnitStore.explicitStale === undefined || workUnitStore.explicitStale > profile.stale) {
            workUnitStore.explicitStale = profile.stale;
        }
    }
} //# sourceMappingURL=cache-life.js.map


/***/ }),

/***/ 880370:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
Object.defineProperty(exports, "validateAndNormalizeCacheLifeProfile", ({
    enumerable: true,
    get: function() {
        return validateAndNormalizeCacheLifeProfile;
    }
}));
const _constants = __webpack_require__(347929);
function normalizeCacheLifeValue(key, value, context) {
    if (value === undefined) {
        return undefined;
    }
    if (value === false) {
        if (key === 'stale') {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the client forever ' + 'without checking with the server.'), "__NEXT_ERROR_CODE", {
                value: "E407",
                enumerable: false,
                configurable: true
            });
        } else if (key === 'revalidate') {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you do not want to revalidate by time.'), "__NEXT_ERROR_CODE", {
                value: "E104",
                enumerable: false,
                configurable: true
            });
        } else {
            throw Object.defineProperty(new Error('Pass `Infinity` instead of `false` if you want to cache on the server forever ' + 'without checking with the origin.'), "__NEXT_ERROR_CODE", {
                value: "E658",
                enumerable: false,
                configurable: true
            });
        }
    }
    if (typeof value !== 'number') {
        throw Object.defineProperty(new Error(`The ${key} option must be a number of seconds.`), "__NEXT_ERROR_CODE", {
            value: "E1414",
            enumerable: false,
            configurable: true
        });
    }
    if (value === Infinity) {
        // Infinity means "never", but turns into null when serialized as JSON
        // (e.g. for build workers or cache handlers), unlike INFINITE_CACHE.
        return _constants.INFINITE_CACHE;
    }
    if (!Number.isFinite(value)) {
        throw Object.defineProperty(new Error(context.kind === 'config' ? `Invalid "cacheLife.${context.profileName}.${key}" provided, expected a finite number of seconds or Infinity, received ${value}` : `Invalid \`cacheLife()\` option "${key}" provided, expected a finite number of seconds or Infinity, received ${value}.`), "__NEXT_ERROR_CODE", {
            value: "E394",
            enumerable: false,
            configurable: true
        });
    }
    return value;
}
function validateAndNormalizeCacheLifeProfile(profile, context) {
    // Don't mutate the profile; it may be shared, e.g. as part of the user's
    // config object.
    const normalizedProfile = {
        ...profile
    };
    for (const key of [
        'stale',
        'revalidate',
        'expire'
    ]){
        const value = normalizeCacheLifeValue(key, profile[key], context);
        if (value !== undefined) {
            normalizedProfile[key] = value;
        }
    }
    if (normalizedProfile.revalidate !== undefined && normalizedProfile.expire !== undefined && normalizedProfile.revalidate > normalizedProfile.expire) {
        throw Object.defineProperty(new Error('If providing both the revalidate and expire options, ' + 'the expire option must be greater than the revalidate option. ' + 'The expire option indicates how many seconds from the start ' + 'until it can no longer be used.'), "__NEXT_ERROR_CODE", {
            value: "E656",
            enumerable: false,
            configurable: true
        });
    }
    return normalizedProfile;
}

//# sourceMappingURL=cache-life-profile.js.map

/***/ }),

/***/ 903295:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 906984:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    refresh: function() {
        return refresh;
    },
    revalidatePath: function() {
        return revalidatePath;
    },
    revalidateTag: function() {
        return revalidateTag;
    },
    updateTag: function() {
        return updateTag;
    }
});
const _dynamicrendering = __webpack_require__(423445);
const _utils = __webpack_require__(941954);
const _constants = __webpack_require__(347929);
const _workasyncstorageexternal = __webpack_require__(529294);
const _workunitasyncstorageexternal = __webpack_require__(663033);
const _hooksservercontext = __webpack_require__(543449);
const _invarianterror = __webpack_require__(772339);
const _actionrevalidationkind = __webpack_require__(943014);
const _removetrailingslash = __webpack_require__(977165);
const _encodeheadersafe = __webpack_require__(753446);
const _cachelifeprofile = __webpack_require__(880370);
function revalidateTag(tag, profile) {
    if (!profile) {
        console.warn('"revalidateTag" without the second argument is now deprecated, add second argument of "max" or use "updateTag". See more info here: https://nextjs.org/docs/messages/revalidate-tag-single-arg');
    } else if (typeof profile === 'object') {
        profile = (0, _cachelifeprofile.validateAndNormalizeCacheLifeProfile)(profile, {
            kind: 'inline'
        });
    }
    return revalidate([
        (0, _encodeheadersafe.encodeHeaderSafe)(tag)
    ], `revalidateTag ${tag}`, profile);
}
function updateTag(tag) {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    // TODO: change this after investigating why phase: 'action' is
    // set for route handlers
    if (!workStore || workStore.page.endsWith('/route')) {
        throw Object.defineProperty(new Error('updateTag can only be called from within a Server Action. ' + 'To invalidate cache tags in Route Handlers or other contexts, use revalidateTag instead. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/updateTag'), "__NEXT_ERROR_CODE", {
            value: "E872",
            enumerable: false,
            configurable: true
        });
    }
    // updateTag uses immediate expiration (no profile) without deprecation warning
    return revalidate([
        (0, _encodeheadersafe.encodeHeaderSafe)(tag)
    ], `updateTag ${tag}`, undefined);
}
function refresh() {
    const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (!workStore || workStore.page.endsWith('/route') || (workUnitStore == null ? void 0 : workUnitStore.phase) !== 'action') {
        throw Object.defineProperty(new Error('refresh can only be called from within a Server Action. ' + 'See more info here: https://nextjs.org/docs/app/api-reference/functions/refresh'), "__NEXT_ERROR_CODE", {
            value: "E870",
            enumerable: false,
            configurable: true
        });
    }
    if (workStore) {
        // The Server Action version of refresh() only revalidates the dynamic data
        // on the client. It doesn't affect cached data.
        workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateDynamicOnly;
    }
}
function revalidatePath(originalPath, type) {
    if (originalPath.length > _constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH) {
        console.warn(`Warning: revalidatePath received "${originalPath}" which exceeded max length of ${_constants.NEXT_CACHE_SOFT_TAG_MAX_LENGTH}. See more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
        return;
    }
    let normalizedPath = `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}${(0, _encodeheadersafe.encodeHeaderSafe)((0, _removetrailingslash.removeTrailingSlash)(originalPath))}`;
    if (type) {
        normalizedPath += `${normalizedPath.endsWith('/') ? '' : '/'}${type}`;
    } else if ((0, _utils.isDynamicRoute)(originalPath)) {
        console.warn(`Warning: a dynamic page path "${originalPath}" was passed to "revalidatePath", but the "type" parameter is missing. This has no effect by default, see more info here https://nextjs.org/docs/app/api-reference/functions/revalidatePath`);
    }
    const tags = [
        normalizedPath
    ];
    if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`);
    } else if (normalizedPath === `${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/index`) {
        tags.push(`${_constants.NEXT_CACHE_IMPLICIT_TAG_ID}/`);
    }
    return revalidate(tags, `revalidatePath ${originalPath}`);
}
function revalidate(tags, expression, profile) {
    const store = _workasyncstorageexternal.workAsyncStorage.getStore();
    if (!store || !store.incrementalCache) {
        throw Object.defineProperty(new Error(`Invariant: static generation store missing in ${expression}`), "__NEXT_ERROR_CODE", {
            value: "E263",
            enumerable: false,
            configurable: true
        });
    }
    const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
    if (workUnitStore) {
        if (workUnitStore.phase === 'render') {
            throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" during render which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                value: "E7",
                enumerable: false,
                configurable: true
            });
        }
        switch(workUnitStore.type){
            case 'cache':
            case 'private-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a "use cache" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E181",
                    enumerable: false,
                    configurable: true
                });
            case 'unstable-cache':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside a function cached with "unstable_cache(...)" which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E306",
                    enumerable: false,
                    configurable: true
                });
            case 'generate-static-params':
                throw Object.defineProperty(new Error(`Route ${store.route} used "${expression}" inside \`generateStaticParams\` which is unsupported. To ensure revalidation is performed consistently it must always happen outside of renders and cached functions. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
                    value: "E1127",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender':
            case 'prerender-runtime':
                // cacheComponents Prerender
                const error = Object.defineProperty(new Error(`Route ${store.route} used ${expression} without first calling \`await connection()\`.`), "__NEXT_ERROR_CODE", {
                    value: "E406",
                    enumerable: false,
                    configurable: true
                });
                return (0, _dynamicrendering.abortAndThrowOnSynchronousRequestDataAccess)(store.route, expression, error, workUnitStore);
            case 'prerender-client':
            case 'validation-client':
                throw Object.defineProperty(new _invarianterror.InvariantError(`${expression} must not be used within a client component. Next.js should be preventing ${expression} from being included in client components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                    value: "E693",
                    enumerable: false,
                    configurable: true
                });
            case 'prerender-ppr':
                return (0, _dynamicrendering.postponeWithTracking)(store.route, expression, workUnitStore.dynamicTracking);
            case 'prerender-legacy':
                workUnitStore.revalidate = 0;
                const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                    value: "E558",
                    enumerable: false,
                    configurable: true
                });
                store.dynamicUsageDescription = expression;
                store.dynamicUsageStack = err.stack;
                throw err;
            case 'request':
                if (false) {}
                break;
            default:
                workUnitStore;
        }
    }
    if (!store.pendingRevalidatedTags) {
        store.pendingRevalidatedTags = [];
    }
    const revalidatedAt = performance.timeOrigin + performance.now();
    for (const tag of tags){
        const existingIndex = store.pendingRevalidatedTags.findIndex((item)=>{
            if (item.tag !== tag) return false;
            // Compare profiles: both strings, both objects, or both undefined
            if (typeof item.profile === 'string' && typeof profile === 'string') {
                return item.profile === profile;
            }
            if (typeof item.profile === 'object' && typeof profile === 'object') {
                return JSON.stringify(item.profile) === JSON.stringify(profile);
            }
            return item.profile === profile;
        });
        if (existingIndex === -1) {
            store.pendingRevalidatedTags.push({
                tag,
                profile,
                revalidatedAt
            });
        } else {
            // Revalidating a tag again invalidates everything produced up to now, so
            // the latest revalidation is the one that decides which entries are
            // stale.
            store.pendingRevalidatedTags[existingIndex].revalidatedAt = revalidatedAt;
        }
    }
    // if profile is provided and this is a stale-while-revalidate
    // update we do not mark the path as revalidated so that server
    // actions don't pull their own writes
    const cacheLife = profile && typeof profile === 'object' ? profile : profile && typeof profile === 'string' && (store == null ? void 0 : store.cacheLifeProfiles[profile]) ? store.cacheLifeProfiles[profile] : undefined;
    if (!profile || (cacheLife == null ? void 0 : cacheLife.expire) === 0) {
        // TODO: only revalidate if the path matches
        store.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
    }
} //# sourceMappingURL=revalidate.js.map


/***/ }),

/***/ 941954:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getSortedRouteObjects: function() {
        return _sortedroutes.getSortedRouteObjects;
    },
    getSortedRoutes: function() {
        return _sortedroutes.getSortedRoutes;
    },
    isDynamicRoute: function() {
        return _isdynamic.isDynamicRoute;
    }
});
const _sortedroutes = __webpack_require__(196760);
const _isdynamic = __webpack_require__(276220); //# sourceMappingURL=index.js.map


/***/ }),

/***/ 943014:
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
0 && (0);
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    ActionDidNotRevalidate: function() {
        return ActionDidNotRevalidate;
    },
    ActionDidRevalidateDynamicOnly: function() {
        return ActionDidRevalidateDynamicOnly;
    },
    ActionDidRevalidateStaticAndDynamic: function() {
        return ActionDidRevalidateStaticAndDynamic;
    }
});
const ActionDidNotRevalidate = 0;
const ActionDidRevalidateStaticAndDynamic = 1;
const ActionDidRevalidateDynamicOnly = 2; //# sourceMappingURL=action-revalidation-kind.js.map


/***/ }),

/***/ 970980:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
        page: "/api/questions/route",
        pathname: "/api/questions",
        filename: "route",
        bundlePath: "app/api/questions/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/questions/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(439569),
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
    let srcPage = "/api/questions/route";
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

/***/ 986439:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,859], () => (__webpack_exec__(970980)));
module.exports = __webpack_exports__;

})();