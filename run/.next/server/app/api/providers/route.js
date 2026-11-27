"use strict";
(() => {
var exports = {};
exports.id = 8648;
exports.ids = [8648];
exports.modules = {

/***/ 108128:
/***/ ((module) => {

module.exports = require("next/dist/server/runtime-reacts.external.js");

/***/ }),

/***/ 144865:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.mjs");;

/***/ }),

/***/ 151270:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   z: () => (/* binding */ buildProviderCatalog)
/* harmony export */ });
/* harmony import */ var _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(228262);
/* harmony import */ var _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(500770);
/* harmony import */ var _lib_server_provider_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(834007);
/* harmony import */ var _lib_server_byok__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(735566);
/* harmony import */ var _lib_ai_local_probes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(516563);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_byok__WEBPACK_IMPORTED_MODULE_3__]);
_lib_server_byok__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];
/**
 * Server-side provider catalog assembly.
 *
 * Builds the ProviderCatalog that /api/providers returns. Combines:
 *   - Server-managed providers (from env vars + server-providers.yml)
 *   - User BYOK providers (from UserApiKey table)
 *   - Local keyless providers (Ollama, Lemonade) with live probing
 *   - The full available-provider registry (for the "Add provider" UI)
 *
 * Sensitive data (API keys, base URLs that might reveal internal gateways)
 * is never included — only provider IDs, model lists, and availability flags.
 */ 




/**
 * Build the full provider catalog for a user.
 *
 * @param userId The authenticated user ID (for BYOK lookup). Pass null for
 *               unauthenticated users — they'll see server + local providers
 *               only, no BYOK section.
 */ async function buildProviderCatalog(userId) {
    // Parallel-fetch everything we need
    const [userKeys, serverProviders, ollamaProbe, lemonadeProbe] = await Promise.all([
        userId ? (0,_lib_server_byok__WEBPACK_IMPORTED_MODULE_3__/* .listUserApiKeys */ .IW)(userId) : Promise.resolve([]),
        (0,_lib_server_provider_config__WEBPACK_IMPORTED_MODULE_2__/* .getServerProviders */ .ub)(),
        (0,_lib_ai_local_probes__WEBPACK_IMPORTED_MODULE_4__/* .probeOllama */ .X)(),
        (0,_lib_ai_local_probes__WEBPACK_IMPORTED_MODULE_4__/* .probeLemonade */ .y)()
    ]);
    const server = [];
    const byok = [];
    const local = [];
    const available = [];
    // Track which provider IDs we've already shown (so a provider that's BOTH
    // server-managed and in the user's BYOK list appears once, in `server`,
    // with a `byokShadowed: true` flag).
    const seenIds = new Set();
    // ── 1. Server-managed providers (operator-paid) ──
    for (const providerId of Object.keys(serverProviders)){
        const cfg = _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS[providerId];
        if (!cfg) continue; // unknown provider in YAML, skip
        seenIds.add(providerId);
        const models = (serverProviders[providerId]?.models?.length ? filterModelsByIdList(cfg, serverProviders[providerId].models) : cfg.models).map(toCatalogModel);
        server.push({
            id: providerId,
            name: cfg.name,
            type: cfg.type,
            icon: cfg.icon,
            keyless: !cfg.requiresApiKey,
            available: true,
            models,
            defaultBaseUrl: cfg.defaultBaseUrl
        });
    }
    // ── 2. User BYOK providers (user-paid) ──
    // Group enabled keys by providerId first: a user may hold SEVERAL endpoints
    // under one provider (two OpenAI keys, or the MedQ AI Router registered as
    // its own `medq-router` provider). Every key's curated models must surface —
    // grouping here is what keeps "the models I added" visible no matter which
    // key row they were saved on.
    const byokGroups = new Map();
    for (const key of userKeys){
        if (!key.enabled) continue;
        const group = byokGroups.get(key.providerId);
        if (group) group.push(key);
        else byokGroups.set(key.providerId, [
            key
        ]);
    }
    for (const [groupProviderId, groupKeys] of byokGroups){
        const cfg = _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS[groupProviderId];
        if (!cfg) {
            // Unknown to the static registry (e.g. the MedQ AI Router, or any
            // OpenAI-compatible gateway saved under a custom provider id) — still
            // list it so its models stay visible. Prefer BYOK registry metadata
            // (name/icon) when present; otherwise the endpoint's label.
            if (seenIds.has(groupProviderId)) continue;
            seenIds.add(groupProviderId);
            const byokMeta = _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__/* .BYOK_PROVIDER_BY_ID */ .Uy[groupProviderId];
            byok.push({
                id: groupProviderId,
                name: byokMeta?.name || groupKeys[0]?.label || groupProviderId,
                type: 'openai',
                icon: byokMeta?.icon,
                keyless: false,
                available: true,
                // User-curated catalog ("the models I added") is the source of truth.
                models: dedupeById(groupKeys.flatMap((k)=>k.modelsConfig ?? [])).map(toCatalogModel)
            });
            continue;
        }
        if (seenIds.has(groupProviderId)) {
            // Already shown as server-managed — mark it as shadowed instead of duplicating
            const existing = server.find((p)=>p.id === groupProviderId);
            if (existing) existing.byokShadowed = true;
            continue;
        }
        seenIds.add(groupProviderId);
        // ── THE VISIBILITY FIX ──
        // The user's modelsConfig ("models I added" in the Models manager) is the
        // source of truth for this provider's catalog — merged across EVERY
        // enabled endpoint of the provider, so models curated on any key row
        // show up. Only when the user has never curated models on any key do we
        // fall back to the static registry list.
        // Previously this read just the FIRST key row, which is why models added
        // on other rows (or via the AI Router link) were invisible to every
        // model picker in the app.
        const mergedUserModels = dedupeById(groupKeys.flatMap((k)=>k.modelsConfig ?? []));
        const models = (mergedUserModels.length ? mergedUserModels.map(toCatalogModel) : cfg.models.map(toCatalogModel)).map((m)=>({
                ...m,
                source: 'byok'
            }));
        byok.push({
            id: groupProviderId,
            name: cfg.name,
            type: cfg.type,
            icon: cfg.icon,
            keyless: !cfg.requiresApiKey,
            available: true,
            models,
            defaultBaseUrl: cfg.defaultBaseUrl
        });
    }
    // ── 3. Local keyless providers (auto-detected) ──
    if (ollamaProbe.ok) {
        const cfg = _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS.ollama;
        // If Ollama returned a model list, use that; otherwise fall back to the registry
        const models = ollamaProbe.models?.length ? ollamaProbe.models.map((id)=>({
                id,
                name: id,
                capabilities: {
                    streaming: true,
                    tools: false
                }
            })) : cfg.models.map(toCatalogModel);
        if (!seenIds.has('ollama')) {
            local.push({
                id: 'ollama',
                name: 'Ollama (local)',
                type: 'openai',
                icon: cfg.icon,
                keyless: true,
                available: true,
                models,
                defaultBaseUrl: cfg.defaultBaseUrl
            });
            seenIds.add('ollama');
        } else {
            // Server-managed Ollama — augment with the probed model list
            const existing = server.find((p)=>p.id === 'ollama');
            if (existing && ollamaProbe.models?.length) {
                existing.models = models;
            }
        }
    }
    if (lemonadeProbe.ok) {
        const cfg = _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS.lemonade;
        if (!seenIds.has('lemonade')) {
            local.push({
                id: 'lemonade',
                name: 'Lemonade (local)',
                type: 'openai',
                icon: cfg.icon,
                keyless: true,
                available: true,
                models: cfg.models.map(toCatalogModel),
                defaultBaseUrl: cfg.defaultBaseUrl
            });
            seenIds.add('lemonade');
        }
    }
    // ── 4. Available providers (anything user could add a key for) ──
    for (const byokMeta of _lib_ai_byok_providers__WEBPACK_IMPORTED_MODULE_1__/* .BYOK_PROVIDERS */ .ln){
        if (seenIds.has(byokMeta.id)) continue;
        const cfg = _lib_ai_providers__WEBPACK_IMPORTED_MODULE_0__.PROVIDERS[byokMeta.id];
        if (!cfg) continue;
        available.push({
            id: byokMeta.id,
            name: byokMeta.name,
            type: byokMeta.type,
            icon: byokMeta.icon,
            keyless: !byokMeta.requiresKey,
            available: byokMeta.requiresKey,
            unavailableReason: byokMeta.requiresKey ? undefined : 'Local provider — start it to use',
            models: cfg.models.map(toCatalogModel),
            defaultBaseUrl: byokMeta.defaultBaseUrl
        });
    }
    return {
        server,
        byok,
        local,
        available,
        userDefault: null,
        serverDefault: process.env.DEFAULT_MODEL ?? null
    };
}
// ── Helpers ──
// The medq-router self-bridge advertises the app's OWN capability models
// (modelsConfig: zai-llm, zai-vision, zai-web-search, ...). They are named after
// the managed gateway's tool capabilities, and on OpenAI-compatible gateways
// only the chat/vision entries accept /v1/chat/completions — the rest 400 with
// "Model X does not support /v1/chat/completions" (verified live on the user's
// gateways, 2026-10-26). Annotating them here lets pickers badge/refuse them
// instead of letting a doomed request burn the router's attempt trail.
const NON_CHAT_MODEL_HINT = {
    'zai-web-search': 'web-search',
    'zai-web-reader': 'web-reader',
    'zai-image-gen': 'image generation',
    'zai-image-edit': 'image editing',
    'zai-tts': 'text-to-speech',
    'zai-asr': 'speech recognition'
};
function toCatalogModel(m) {
    const nonChatHint = NON_CHAT_MODEL_HINT[m.id];
    return {
        id: m.id,
        name: m.name,
        contextWindow: m.contextWindow,
        outputWindow: m.outputWindow,
        capabilities: {
            streaming: m.capabilities?.streaming,
            tools: m.capabilities?.tools,
            vision: m.capabilities?.vision,
            thinking: !!m.capabilities?.thinking,
            // Absent (undefined) = chat as far as anyone knows; only explicit
            // knowledge ever marks a model non-chat.
            ...nonChatHint ? {
                chat: false
            } : {}
        },
        ...nonChatHint ? {
            capabilityLabel: nonChatHint
        } : {}
    };
}
function filterModelsByIdList(cfg, ids) {
    return cfg.models.filter((m)=>ids.includes(m.id));
}
/** Merge model lists from several endpoint rows of one provider — first
 *  occurrence of an id wins (keys are ordered by priority, so the
 *  higher-priority endpoint's curation is authoritative). */ function dedupeById(models) {
    const seen = new Set();
    const out = [];
    for (const m of models){
        if (!m?.id || seen.has(m.id)) continue;
        seen.add(m.id);
        out.push(m);
    }
    return out;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

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

/***/ 274552:
/***/ ((module) => {

module.exports = require("pino");

/***/ }),

/***/ 275811:
/***/ ((module) => {

module.exports = import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.mjs");;

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

/***/ 333873:
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ 383519:
/***/ ((module) => {

module.exports = require("postgres-array");

/***/ }),

/***/ 419121:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/action-async-storage.external.js");

/***/ }),

/***/ 455511:
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ 500770:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Uy: () => (/* binding */ BYOK_PROVIDER_BY_ID),
/* harmony export */   ln: () => (/* binding */ BYOK_PROVIDERS)
/* harmony export */ });
/* unused harmony export BYOK_MONO_LOGO_IDS */
/**
 * BYOK provider metadata for the app-wide Settings UI.
 *
 * Lightweight, client-safe subset of the full PROVIDERS registry in
 * src/lib/ai/providers.ts. We don't import that file directly because it
 * pulls in @ai-sdk/* packages (heavy, server-leaning) and the BYOK UI is
 * a client component mounted inside the SettingsDialog.
 *
 * Fields:
 *   id           — provider ID, matches PROVIDERS keys
 *   name         — display name
 *   type         — provider type, drives the test endpoint strategy
 *   defaultBaseUrl — used to pre-fill the Base URL field in the UI
 *   icon         — logo path under /public/openmaic/logos/
 *   keyHint      — placeholder shown in the API key input
 *   requiresKey  — false for keyless providers like Ollama
 */ const L = '/openmaic/logos';
const BYOK_PROVIDERS = [
    {
        id: 'openai',
        name: 'OpenAI',
        type: 'openai',
        defaultBaseUrl: 'https://api.openai.com/v1',
        icon: `${L}/openai.svg`,
        keyHint: 'sk-proj-...',
        requiresKey: true
    },
    {
        id: 'anthropic',
        name: 'Anthropic (Claude)',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.anthropic.com',
        icon: `${L}/claude.svg`,
        keyHint: 'sk-ant-...',
        requiresKey: true
    },
    {
        id: 'google',
        name: 'Google Gemini',
        type: 'google',
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        icon: `${L}/gemini.svg`,
        keyHint: 'AIza...',
        requiresKey: true
    },
    {
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'openai',
        defaultBaseUrl: 'https://api.deepseek.com/v1',
        icon: `${L}/deepseek.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'glm',
        name: 'GLM (Zhipu)',
        type: 'openai',
        defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        icon: `${L}/glm.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'qwen',
        name: 'Qwen (DashScope)',
        type: 'openai',
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        icon: `${L}/qwen.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'kimi',
        name: 'Kimi (Moonshot)',
        type: 'openai',
        defaultBaseUrl: 'https://api.moonshot.cn/v1',
        icon: `${L}/kimi.png`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'minimax',
        name: 'MiniMax',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
        icon: `${L}/minimax.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'siliconflow',
        name: 'SiliconFlow',
        type: 'openai',
        defaultBaseUrl: 'https://api.siliconflow.cn/v1',
        icon: `${L}/siliconflow.svg`,
        keyHint: 'sk-...',
        requiresKey: true
    },
    {
        id: 'doubao',
        name: 'Doubao (Volcengine Ark)',
        type: 'openai',
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        icon: `${L}/doubao.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'openrouter',
        name: 'OpenRouter',
        type: 'openai',
        defaultBaseUrl: 'https://openrouter.ai/api/v1',
        icon: `${L}/openrouter.svg`,
        keyHint: 'sk-or-...',
        requiresKey: true
    },
    {
        id: 'grok',
        name: 'Grok (xAI)',
        type: 'openai',
        defaultBaseUrl: 'https://api.x.ai/v1',
        icon: `${L}/grok.svg`,
        keyHint: 'xai-...',
        requiresKey: true
    },
    {
        id: 'xiaomi',
        name: 'Xiaomi MiMo',
        type: 'openai',
        defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
        icon: `${L}/xiaomi.svg`,
        keyHint: '...',
        requiresKey: true
    },
    {
        id: 'ollama',
        name: 'Ollama (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:11434',
        icon: `${L}/ollama.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    },
    {
        id: 'freellmapi',
        name: 'FreeLLMAPI (free-tier router)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:3001/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellmapi-… (unified key from its dashboard)',
        requiresKey: true
    },
    {
        id: 'medq-router',
        name: 'MedQ AI Router (this app)',
        type: 'openai',
        // Same-origin wire surface — the AI Router tab links this automatically,
        // so the default is only a prefill for manual adds.
        defaultBaseUrl: '/v1',
        icon: `${L}/freellmapi.svg`,
        keyHint: 'freellm… (unified key from the AI Router tab)',
        requiresKey: true
    },
    {
        id: 'lemonade',
        name: 'Lemonade (local)',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: `${L}/lemonade.svg`,
        keyHint: '(no key needed — local only)',
        requiresKey: false
    }
];
const BYOK_PROVIDER_BY_ID = Object.fromEntries(BYOK_PROVIDERS.map((p)=>[
        p.id,
        p
    ]));
/** Monochrome SVG logos that need a dark background to render correctly. */ const BYOK_MONO_LOGO_IDS = new Set([
    'openai',
    'openrouter',
    'ollama',
    'siliconflow'
]);


/***/ }),

/***/ 504573:
/***/ ((module) => {

module.exports = require("node:buffer");

/***/ }),

/***/ 516563:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   X: () => (/* binding */ probeOllama),
/* harmony export */   y: () => (/* binding */ probeLemonade)
/* harmony export */ });
/**
 * Fast local-runtime probes for keyless providers (Ollama, Lemonade).
 *
 * Used by the provider catalog to decide whether a local inference server is
 * up, and — when the server exposes a model list — what concrete model ids to
 * show instead of the static registry defaults.
 *
 * Contract: these probes are fired from `Promise.all` inside
 * `buildProviderCatalog`, so they must NEVER reject — every failure path
 * resolves to `{ ok: false }`. Timeouts are deliberately short (the catalog
 * render path waits on all probes before answering the client).
 */ /** Abort-based fetch with a hard timeout; resolves null on any failure. */ async function fetchJson(url, timeoutMs) {
    try {
        const controller = new AbortController();
        const timer = setTimeout(()=>controller.abort(), timeoutMs);
        try {
            const res = await fetch(url, {
                signal: controller.signal
            });
            if (!res.ok) return null;
            return await res.json();
        } finally{
            clearTimeout(timer);
        }
    } catch  {
        return null;
    }
}
function normalizeBaseUrl(raw, fallback) {
    const url = (raw || fallback).trim();
    return url.replace(/\/+$/, '');
}
/**
 * Probe a native Ollama server (`GET {base}/api/tags`).
 * `ok` only when the daemon answers AND reports at least one installed model.
 */ async function probeOllama() {
    const baseUrl = normalizeBaseUrl(process.env.OLLAMA_BASE_URL, 'http://127.0.0.1:11434');
    // An OpenAI-compatible gateway configured as OLLAMA_BASE_URL has no
    // /api/tags route — that resolves to { ok: false } and the catalog falls
    // back to the static registry models, which is the desired behaviour.
    const data = await fetchJson(`${baseUrl}/api/tags`, 3000);
    if (!data || typeof data !== 'object') return {
        ok: false
    };
    const models = data.models;
    if (!Array.isArray(models) || models.length === 0) return {
        ok: false
    };
    const ids = models.map((m)=>typeof m?.name === 'string' && m.name ? m.name : m?.model).filter((id)=>typeof id === 'string' && id.length > 0);
    if (ids.length === 0) return {
        ok: false
    };
    return {
        ok: true,
        models: ids
    };
}
/**
 * Probe a Lemonade Server instance (`GET {base}/models`, OpenAI-shaped).
 * Lemonade always serves its model list at the /v1 OpenAI route, so the env
 * base URL (which conventionally carries the /v1 suffix) is used as-is.
 */ async function probeLemonade() {
    const baseUrl = normalizeBaseUrl(process.env.LEMONADE_BASE_URL, 'http://127.0.0.1:13305/v1');
    const data = await fetchJson(`${baseUrl}/models`, 2500);
    if (!data || typeof data !== 'object') return {
        ok: false
    };
    const list = data.data;
    if (!Array.isArray(list)) return {
        ok: false
    };
    const ids = list.map((m)=>typeof m?.id === 'string' ? m.id : '').filter((id)=>id.length > 0);
    if (ids.length === 0) return {
        ok: false
    };
    return {
        ok: true,
        models: ids
    };
}


/***/ }),

/***/ 529294:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ 629021:
/***/ ((module) => {

module.exports = require("fs");

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

/***/ 671616:
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
        page: "/api/providers/route",
        pathname: "/api/providers",
        filename: "route",
        bundlePath: "app/api/providers/route"
    },
    distDir: ".next" || 0,
    relativeProjectDir:  false || '',
    resolvedPagePath: "/workspaces/next/run/src/app/api/providers/route.ts",
    nextConfigOutput,
    // The lazy require factory ensures that:
    // - In dev: devRequestTimingInternalsEnd is set before userland executes,
    //   correctly attributing module load time to application-code rather than
    //   framework internals.
    // - In all modes: async modules (route files with top-level await) are
    //   handled correctly — require() returns a Promise for such modules, which
    //   ensureUserland() awaits before the first request is handled.
    userland: ()=>__webpack_require__(713358),
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
    let srcPage = "/api/providers/route";
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

/***/ 710846:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.prod.js");

/***/ }),

/***/ 713358:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GET: () => (/* binding */ GET)
/* harmony export */ });
/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(945592);
/* harmony import */ var _lib_server_catalog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(151270);
/* harmony import */ var _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(122035);
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(520903);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_lib_server_catalog__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_db__WEBPACK_IMPORTED_MODULE_3__]);
([_lib_server_catalog__WEBPACK_IMPORTED_MODULE_1__, _lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__, _lib_db__WEBPACK_IMPORTED_MODULE_3__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
/**
 * GET /api/providers — the live provider/model catalog.
 *
 * Returns everything the model pickers in the app need, in ONE payload:
 *   - `server`   : operator-configured providers (env / server-providers.yml)
 *   - `byok`     : the user's own providers (UserApiKey rows), with the
 *                  user's curated modelsConfig models as the catalog — this
 *                  is what makes "the models I added" visible app-wide.
 *   - `local`    : auto-detected keyless providers (Ollama, Lemonade)
 *   - `available`: providers the user could add a key for
 *   - `userDefault` / `serverDefault`: default model strings
 *
 * Auth: optional. Unauthenticated callers get server + local sections only
 * (no BYOK — keys and user models are per-account). The ModelPicker shows
 * a "sign in to use your own keys" hint in that case.
 */ 



async function GET(req) {
    try {
        const userId = await (0,_lib_auth_helpers__WEBPACK_IMPORTED_MODULE_2__/* .getAuthenticatedUserId */ .At)(req).catch(()=>null);
        const [catalog, userDefault] = await Promise.all([
            (0,_lib_server_catalog__WEBPACK_IMPORTED_MODULE_1__/* .buildProviderCatalog */ .z)(userId),
            userId ? _lib_db__WEBPACK_IMPORTED_MODULE_3__.db.user.findUnique({
                where: {
                    id: userId
                },
                select: {
                    defaultModel: true
                }
            }).then((u)=>u?.defaultModel ?? null).catch(()=>null) : Promise.resolve(null)
        ]);
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            ...catalog,
            userDefault
        }, {
            headers: {
                'Cache-Control': 'no-store'
            }
        });
    } catch (e) {
        const message = e instanceof Error ? e.message : 'Failed to build provider catalog';
        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({
            error: message
        }, {
            status: 500
        });
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 744870:
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.prod.js");

/***/ }),

/***/ 903295:
/***/ ((module) => {

module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ 986439:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/no-fallback-error.external");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4741,5592,6912,5573,1435,2393,8963,426,1545,9567,859,2035,4007,7909,5566,8262], () => (__webpack_exec__(671616)));
module.exports = __webpack_exports__;

})();