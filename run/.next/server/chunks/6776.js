"use strict";
exports.id = 6776;
exports.ids = [6776];
exports.modules = {

/***/ 886776:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Q: () => (/* binding */ createMedicalFetchTool),
/* harmony export */   fetchPageText: () => (/* binding */ fetchPageText),
/* harmony export */   htmlToText: () => (/* binding */ htmlToText)
/* harmony export */ });
/* unused harmony export assertPublicUrl */
/* harmony import */ var _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(971890);
/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(18963);
/* harmony import */ var node_dns_promises__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(71553);
/* harmony import */ var node_dns_promises__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(node_dns_promises__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(777030);
/* harmony import */ var node_net__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(node_net__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(653165);
/* harmony import */ var _offload__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(935854);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_offload__WEBPACK_IMPORTED_MODULE_4__]);
_offload__WEBPACK_IMPORTED_MODULE_4__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






const log = (0,_logger__WEBPACK_IMPORTED_MODULE_3__/* .createLogger */ .h)('AgentWebFetch');
/**
 * fetch_medical_reference — SSRF-guarded page reader.
 *
 * Ported from the reference agent platforms (deep-agent-platform
 * `assertSafeUrl` / hermes `assertPublicUrl`): blocks non-http(s) schemes,
 * loopback / private / link-local / CGNAT / metadata IPs, re-validates every
 * redirect hop, enforces size + time caps, and strips HTML to readable text
 * so the tool result stays small enough for the model context.
 */ const PRIVATE_HOSTNAMES = new Set([
    'localhost',
    'localhost.localdomain',
    'ip6-localhost',
    'ip6-loopback',
    'metadata.google.internal',
    'instance-data'
]);
function isPrivateIPv4(ip) {
    const parts = ip.split('.').map(Number);
    if (parts.length !== 4 || parts.some((p)=>Number.isNaN(p))) return true; // malformed → treat as private
    const [a, b] = parts;
    if (a === 10 || a === 127) return true;
    if (a === 192 && b === 168) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 169 && b === 254) return true; // link-local + cloud metadata
    if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT
    if (a === 0) return true;
    return false;
}
function isPrivateIPv6(ip) {
    const normalized = ip.toLowerCase();
    if (normalized === '::' || normalized === '::1') return true;
    if (normalized.startsWith('fe80')) return true; // link-local
    if (normalized.startsWith('fc') || normalized.startsWith('fd')) return true; // unique local
    if (/^::ffff:/.test(normalized)) return isPrivateIPv4(normalized.replace('::ffff:', ''));
    return false;
}
async function assertPublicUrl(rawUrl) {
    let url;
    try {
        url = new URL(rawUrl);
    } catch  {
        throw new Error(`Invalid URL: ${rawUrl}`);
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error(`Blocked scheme: ${url.protocol} (only http/https are allowed)`);
    }
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (PRIVATE_HOSTNAMES.has(hostname)) throw new Error('Blocked host (private/metadata)');
    if (node_net__WEBPACK_IMPORTED_MODULE_2___default().isIPv4(hostname)) {
        if (isPrivateIPv4(hostname)) throw new Error('Blocked host (private IP range)');
        return url;
    }
    if (hostname.includes(':')) {
        if (isPrivateIPv6(hostname)) throw new Error('Blocked host (private IPv6 range)');
        return url;
    }
    // DNS resolve to defeat hostname-based SSRF (incl. DNS rebinding)
    try {
        const records = await node_dns_promises__WEBPACK_IMPORTED_MODULE_1___default().lookup(hostname, {
            all: true
        });
        for (const record of records){
            if (isPrivateIPv4(record.address) || isPrivateIPv6(record.address)) {
                throw new Error('Blocked host (resolves to private address)');
            }
        }
    } catch (error) {
        if (error instanceof Error && error.message.startsWith('Blocked host')) throw error;
        // DNS failure falls through — the fetch itself will fail with a clear error
        log.warn?.(`DNS lookup failed for ${hostname}`);
    }
    return url;
}
/** Regex-based HTML → text (no external deps), ported pattern from P1/P3.
 * Exported for the knowledge pipeline's URL ingestion (compare-and-integrate-4). */ function htmlToText(html) {
    return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<noscript[\s\S]*?<\/noscript>/gi, ' ').replace(/<(?:nav|footer|header|aside|form)[^>]*>[\s\S]*?<\/(?:nav|footer|header|aside|form)>/gi, ' ').replace(/<!--[\s\S]*?-->/g, ' ').replace(/<br\s*\/?>/gi, '\n').replace(/<\/(p|div|section|article|li|h[1-6]|tr)>/gi, '\n').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/[ \t]+/g, ' ').replace(/\n{3,}/g, '\n\n').trim();
}
const MAX_CONTENT_CHARS = 12000;
const MAX_BYTES = 2 * 1024 * 1024; // 2 MB
const FETCH_TIMEOUT_MS = 20000;
const MAX_REDIRECTS = 4;
/** SSRF-guarded page fetch → clean text. Exported for knowledge ingestion. */ async function fetchPageText(rawUrl, hops = 0) {
    const url = await assertPublicUrl(rawUrl);
    const controller = new AbortController();
    const timer = setTimeout(()=>controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const response = await fetch(url, {
            signal: controller.signal,
            redirect: 'manual',
            headers: {
                'User-Agent': 'MedQ-Agent/1.0 (education research)',
                Accept: 'text/html,text/plain,*/*'
            }
        });
        if ([
            301,
            302,
            303,
            307,
            308
        ].includes(response.status)) {
            const location = response.headers.get('location');
            if (!location) throw new Error(`Redirect without location (HTTP ${response.status})`);
            if (hops >= MAX_REDIRECTS) throw new Error('Too many redirects');
            return fetchPageText(new URL(location, url).toString(), hops + 1);
        }
        if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
        const buffer = Buffer.from(await response.arrayBuffer());
        if (buffer.byteLength > MAX_BYTES) throw new Error('Page exceeds 2MB size cap');
        const contentType = response.headers.get('content-type') ?? '';
        const text = buffer.toString('utf8');
        if (contentType.includes('text/html') || /^\s*<(!doctype|html)/i.test(text)) {
            const titleMatch = text.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
            return {
                title: titleMatch ? htmlToText(titleMatch[1]).slice(0, 200) : url.hostname,
                url: url.toString(),
                content: htmlToText(text).slice(0, MAX_CONTENT_CHARS)
            };
        }
        return {
            title: url.hostname,
            url: url.toString(),
            content: text.slice(0, MAX_CONTENT_CHARS)
        };
    } finally{
        clearTimeout(timer);
    }
}
function createMedicalFetchTool(ctx) {
    return new _langchain_core_tools__WEBPACK_IMPORTED_MODULE_0__/* .DynamicStructuredTool */ .XW({
        name: 'fetch_medical_reference',
        description: 'Fetch and read a specific web page (guideline, article, abstract) as clean text. Use after search_medical_references when a snippet is not enough to answer accurately. Only public http(s) pages.',
        schema: zod__WEBPACK_IMPORTED_MODULE_5__/* .object */ .Ikc({
            url: zod__WEBPACK_IMPORTED_MODULE_5__/* .string */ .YjP().url().describe('The page URL to read'),
            maxChars: zod__WEBPACK_IMPORTED_MODULE_5__/* .number */ .aig().int().min(1000).max(12000).optional().describe('Optional cap on returned characters')
        }),
        func: async ({ url, maxChars })=>{
            // 1. ZAI gateway page_reader (renders JS-heavy pages; P1 pattern)
            try {
                const { createZAI } = await __webpack_require__.e(/* import() */ 6389).then(__webpack_require__.bind(__webpack_require__, 376389));
                const zai = await createZAI();
                if (zai?.functions?.invoke) {
                    const page = await zai.functions.invoke('page_reader', {
                        url
                    });
                    if (page?.data?.html) {
                        // Validate the resolved URL is public before trusting gateway output
                        const finalUrl = page.data.url ?? url;
                        const content = htmlToText(page.data.html).slice(0, maxChars ?? MAX_CONTENT_CHARS);
                        if (content.length > 200) {
                            const payload = JSON.stringify({
                                title: page.data.title ?? finalUrl,
                                url: finalUrl,
                                content,
                                source: 'zai-page-reader'
                            });
                            return ctx ? (0,_offload__WEBPACK_IMPORTED_MODULE_4__/* .maybeOffload */ .y)(ctx, 'fetch_medical_reference', payload) : payload;
                        }
                    }
                }
            } catch (error) {
                log.warn?.('ZAI page_reader failed, falling back to direct fetch:', error);
            }
            // 2. Direct SSRF-guarded fetch
            try {
                const page = await fetchPageText(url);
                const content = maxChars ? page.content.slice(0, maxChars) : page.content;
                const payload = JSON.stringify({
                    title: page.title,
                    url: page.url,
                    content
                });
                return ctx ? (0,_offload__WEBPACK_IMPORTED_MODULE_4__/* .maybeOffload */ .y)(ctx, 'fetch_medical_reference', payload) : payload;
            } catch (error) {
                const message = error instanceof Error ? error.message : String(error);
                return JSON.stringify({
                    error: `Could not read page: ${message}`,
                    url
                });
            }
        }
    });
}


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 902328:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Dg: () => (/* binding */ createArtifact),
/* harmony export */   Mj: () => (/* binding */ searchArtifacts),
/* harmony export */   jZ: () => (/* binding */ getArtifact)
/* harmony export */ });
/* unused harmony export listArtifacts */
/* harmony import */ var _db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(520903);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(653165);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_db__WEBPACK_IMPORTED_MODULE_0__]);
_db__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


const log = (0,_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('AgentArtifacts');
const KIND_MIME = {
    markdown: 'text/markdown',
    html: 'text/html',
    csv: 'text/csv',
    json: 'application/json',
    chart: 'application/json',
    image: 'image/png',
    document: 'text/markdown'
};
const MAX_INLINE_CHARS = 120000;
function sanitizeName(name) {
    const cleaned = name.trim().replace(/[^\p{L}\p{N}\s._-]/gu, '').replace(/\s+/g, '-').slice(0, 80);
    return cleaned || 'artifact';
}
async function createArtifact(input) {
    const name = sanitizeName(input.name);
    const mimeType = KIND_MIME[input.kind] ?? 'text/plain';
    const content = input.content ? input.content.slice(0, MAX_INLINE_CHARS) : undefined;
    const sizeBytes = content ? Buffer.byteLength(content, 'utf8') : 0;
    const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.create({
        data: {
            userId: input.userId,
            name,
            kind: input.kind,
            mimeType,
            sizeBytes,
            content,
            url: input.url,
            // JSON.parse returns `any`, satisfying Prisma's Json input type
            meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined
        }
    });
    const downloadUrl = `/api/medq-agent/artifacts/${row.id}`;
    log.info?.(`Created ${input.kind} artifact "${name}" (${sizeBytes}B) for ${input.userId}`);
    return {
        id: row.id,
        name,
        kind: row.kind,
        mimeType: row.mimeType,
        sizeBytes: row.sizeBytes,
        url: row.url,
        createdAt: row.createdAt.toISOString(),
        downloadUrl
    };
}
async function listArtifacts(userId, limit = 50) {
    const rows = await db.agentArtifact.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: limit,
        select: {
            id: true,
            name: true,
            kind: true,
            mimeType: true,
            sizeBytes: true,
            url: true,
            createdAt: true
        }
    });
    return rows.map((row)=>({
            ...row,
            createdAt: row.createdAt.toISOString()
        }));
}
/**
 * Search the user's artifact library by free-text query (name/kind match,
 * newest first) with short content excerpts so the agent can cite what it
 * previously produced. (Task 6 — agent-side artifact library access,
 * product-vocabulary port of the reference platform's workspace tools.)
 */ async function searchArtifacts(userId, query, limit = 10) {
    const terms = query.toLowerCase().split(/[\s,]+/).map((t)=>t.trim()).filter((t)=>t.length > 1).slice(0, 6);
    const rows = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.findMany({
        where: {
            userId,
            ...terms.length > 0 || query.trim() ? {
                OR: [
                    ...terms.length > 0 ? terms.map((t)=>({
                            name: {
                                contains: t,
                                mode: 'insensitive'
                            }
                        })) : [],
                    {
                        kind: {
                            contains: query.trim(),
                            mode: 'insensitive'
                        }
                    }
                ]
            } : {}
        },
        orderBy: {
            createdAt: 'desc'
        },
        take: Math.min(Math.max(limit, 1), 20),
        select: {
            id: true,
            name: true,
            kind: true,
            mimeType: true,
            sizeBytes: true,
            url: true,
            createdAt: true,
            content: true
        }
    });
    return rows.map((row)=>({
            id: row.id,
            name: row.name,
            kind: row.kind,
            mimeType: row.mimeType,
            sizeBytes: row.sizeBytes,
            url: row.url,
            createdAt: row.createdAt.toISOString(),
            downloadUrl: `/api/medq-agent/artifacts/${row.id}`,
            excerpt: row.content ? row.content.replace(/\s+/g, ' ').slice(0, 220) : undefined
        }));
}
async function getArtifact(userId, id) {
    const row = await _db__WEBPACK_IMPORTED_MODULE_0__.db.agentArtifact.findUnique({
        where: {
            id
        }
    });
    // Guest artifacts (userId null) stay guest-accessible; user artifacts require the owner.
    if (!row) return null;
    if (row.userId && row.userId !== userId) return null;
    return row;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 935854:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   y: () => (/* binding */ maybeOffload)
/* harmony export */ });
/* harmony import */ var _artifacts_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(902328);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_artifacts_service__WEBPACK_IMPORTED_MODULE_0__]);
_artifacts_service__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

/**
 * maybeOffload — big-output context protection, ported from hermes
 * `lib/tools/index.ts`. When a tool's textual output exceeds the threshold,
 * the full output is persisted as a downloadable artifact and the value
 * returned to the model is replaced with a preview + pointer. Keeps huge
 * fetches/snapshots from blowing up the conversation context.
 */ const LARGE_OUTPUT_CHARS = 8000;
const RETURN_CHARS = 2500;
async function maybeOffload(ctx, toolName, output) {
    if (!output || output.length <= LARGE_OUTPUT_CHARS) return output;
    try {
        const artifact = await (0,_artifacts_service__WEBPACK_IMPORTED_MODULE_0__/* .createArtifact */ .Dg)({
            userId: ctx.userId,
            name: `${toolName}-output-${Date.now()}.txt`,
            kind: 'document',
            content: output.slice(0, 120000),
            meta: {
                autoCaptured: true,
                tool: toolName,
                mimeType: 'text/plain'
            }
        });
        return `${output.slice(0, RETURN_CHARS)}\n\n` + `[Full output (${output.length.toLocaleString()} chars) saved as artifact ` + `"${artifact.name}" — download: ${artifact.downloadUrl}. ` + `Ask the user to open it from the Files tab for the complete content.]`;
    } catch  {
        // Offload failed — return a hard-truncated version instead of the giant blob.
        return `${output.slice(0, RETURN_CHARS)}\n\n[Output truncated at ${RETURN_CHARS} chars.]`;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;