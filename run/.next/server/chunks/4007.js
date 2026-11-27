"use strict";
exports.id = 4007;
exports.ids = [4007,6389];
exports.modules = {

/***/ 376389:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 834007:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $q: () => (/* binding */ isServerConfiguredProvider),
/* harmony export */   Au: () => (/* binding */ resolveImageBaseUrl),
/* harmony export */   Fu: () => (/* binding */ resolveProxy),
/* harmony export */   Gc: () => (/* binding */ resolveVideoBaseUrl),
/* harmony export */   Zi: () => (/* binding */ resolveVideoApiKey),
/* harmony export */   getServerASRProviders: () => (/* binding */ getServerASRProviders),
/* harmony export */   getServerTTSProviders: () => (/* binding */ getServerTTSProviders),
/* harmony export */   isServerTTSProviderDisabled: () => (/* binding */ isServerTTSProviderDisabled),
/* harmony export */   kv: () => (/* binding */ resolveApiKey),
/* harmony export */   pb: () => (/* binding */ resolveImageApiKey),
/* harmony export */   qS: () => (/* binding */ resolveWebSearchApiKey),
/* harmony export */   resolveASRApiKey: () => (/* binding */ resolveASRApiKey),
/* harmony export */   resolveASRBaseUrl: () => (/* binding */ resolveASRBaseUrl),
/* harmony export */   resolveTTSApiKey: () => (/* binding */ resolveTTSApiKey),
/* harmony export */   resolveTTSBaseUrl: () => (/* binding */ resolveTTSBaseUrl),
/* harmony export */   resolveTTSModel: () => (/* binding */ resolveTTSModel),
/* harmony export */   t$: () => (/* binding */ resolveWebSearchBaseUrl),
/* harmony export */   ub: () => (/* binding */ getServerProviders),
/* harmony export */   xj: () => (/* binding */ resolveBaseUrl)
/* harmony export */ });
/* unused harmony exports _resetZaiConfigCacheForTests, getServerPDFProviders, resolvePDFApiKey, resolvePDFBaseUrl, getServerImageProviders, getServerVideoProviders, getServerWebSearchProviders, resolveServerWebSearchProviderId, getParallelSceneConcurrency */
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(629021);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(333873);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var js_yaml__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(90426);
/* harmony import */ var _lib_zai__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(376389);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(653165);
/**
 * Server-side Provider Configuration
 *
 * Restored from upstream OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * Original: lib/server/provider-config.ts (597 lines)
 *
 * Loads provider configs from YAML (primary) + environment variables (fallback).
 * Keys never leave the server — only provider IDs and metadata are exposed via API.
 *
 * MedQ adaptation: ZAI (the native LLM backend via z-ai-web-dev-sdk) is injected
 * as a synthetic managed provider into every section, resolved from `.z-ai-config`.
 * This means:
 *   - ZAI is ALWAYS available as a managed provider when `.z-ai-config` exists.
 *   - Operators can ALSO configure additional providers (OpenAI, Anthropic, GLM,
 *     MiniMax, VoxCPM TTS, Brave web search, etc.) via `server-providers.yml`
 *     or env vars — those providers become managed too.
 *   - The Settings UI in the browser can show all managed providers; users can
 *     add their own unmanaged providers (client-supplied keys) for anything
 *     the operator hasn't configured.
 *
 * This file is a merge of:
 *   - upstream's full multi-provider YAML+env loader (lines 1-597 verbatim)
 *   - medq's ZAI injection (resolveZaiConfig + ZAI provider entries)
 */ 




const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_4__/* .createLogger */ .h)('ServerProviderConfig');
// ---------------------------------------------------------------------------
// Env-var prefix mappings (verbatim from upstream)
// ---------------------------------------------------------------------------
const LLM_ENV_MAP = {
    OPENAI: 'openai',
    ANTHROPIC: 'anthropic',
    GOOGLE: 'google',
    DEEPSEEK: 'deepseek',
    QWEN: 'qwen',
    KIMI: 'kimi',
    MINIMAX: 'minimax',
    GLM: 'glm',
    SILICONFLOW: 'siliconflow',
    DOUBAO: 'doubao',
    OPENROUTER: 'openrouter',
    GROK: 'grok',
    TENCENT: 'tencent-hunyuan',
    TENCENT_HUNYUAN: 'tencent-hunyuan',
    XIAOMI: 'xiaomi',
    MIMO: 'xiaomi',
    OLLAMA: 'ollama',
    LEMONADE: 'lemonade',
    FREELLMAPI: 'freellmapi'
};
const TTS_ENV_MAP = {
    TTS_OPENAI: 'openai-tts',
    TTS_AZURE: 'azure-tts',
    TTS_GLM: 'glm-tts',
    TTS_QWEN: 'qwen-tts',
    TTS_VOXCPM: 'voxcpm-tts',
    TTS_DOUBAO: 'doubao-tts',
    TTS_ELEVENLABS: 'elevenlabs-tts',
    TTS_MINIMAX: 'minimax-tts',
    TTS_LEMONADE: 'lemonade-tts'
};
/**
 * Env prefixes for the TTS force-disable switch (`TTS_<PREFIX>_ENABLED=false`).
 * Superset of TTS_ENV_MAP: browser-native has no credential env (it is
 * client-only) but operators may still want to force it off fleet-wide (#665).
 */ const TTS_DISABLE_ENV_MAP = {
    ...TTS_ENV_MAP,
    TTS_BROWSER_NATIVE: 'browser-native-tts'
};
const ASR_ENV_MAP = {
    ASR_OPENAI: 'openai-whisper',
    ASR_QWEN: 'qwen-asr',
    ASR_AZURE: 'azure-asr',
    ASR_LEMONADE: 'lemonade-asr'
};
const PDF_ENV_MAP = {
    PDF_UNPDF: 'unpdf',
    PDF_MINERU: 'mineru',
    PDF_MINERU_CLOUD: 'mineru-cloud'
};
const IMAGE_ENV_MAP = {
    IMAGE_OPENAI: 'openai-image',
    IMAGE_SEEDREAM: 'seedream',
    IMAGE_QWEN_IMAGE: 'qwen-image',
    IMAGE_NANO_BANANA: 'nano-banana',
    IMAGE_MINIMAX: 'minimax-image',
    IMAGE_GROK: 'grok-image',
    IMAGE_LEMONADE: 'lemonade'
};
const VIDEO_ENV_MAP = {
    VIDEO_SEEDANCE: 'seedance',
    VIDEO_KLING: 'kling',
    VIDEO_VEO: 'veo',
    VIDEO_SORA: 'sora',
    VIDEO_MINIMAX: 'minimax-video',
    VIDEO_GROK: 'grok-video',
    VIDEO_HAPPYHORSE: 'happyhorse'
};
const WEB_SEARCH_ENV_MAP = {
    TAVILY: 'tavily',
    BOCHA: 'bocha',
    BRAVE: 'brave',
    BAIDU: 'baidu',
    WEB_SEARCH_MINIMAX: 'minimax'
};
let _cachedZaiConfig = null;
function resolveZaiConfig() {
    if (_cachedZaiConfig) return _cachedZaiConfig;
    const config = (0,_lib_zai__WEBPACK_IMPORTED_MODULE_3__.readConfig)();
    _cachedZaiConfig = {
        apiKey: config?.apiKey || '',
        baseUrl: config?.baseUrl,
        hasConfig: !!config
    };
    return _cachedZaiConfig;
}
/** Test hook: re-read .z-ai-config on next access (env changes in dev). */ function _resetZaiConfigCacheForTests() {
    _cachedZaiConfig = null;
    _configs.clear();
}
function loadYamlFile(filename) {
    try {
        const filePath = path__WEBPACK_IMPORTED_MODULE_1___default().join(process.cwd(), filename);
        if (!fs__WEBPACK_IMPORTED_MODULE_0___default().existsSync(filePath)) return {};
        const raw = fs__WEBPACK_IMPORTED_MODULE_0___default().readFileSync(filePath, 'utf-8');
        const parsed = js_yaml__WEBPACK_IMPORTED_MODULE_2__/* .load */ .Hh(raw);
        if (!parsed || typeof parsed !== 'object') return {};
        return parsed;
    } catch (e) {
        log.warn(`[ServerProviderConfig] Failed to load ${filename}:`, e);
        return {};
    }
}
// ---------------------------------------------------------------------------
// Env-var helpers (verbatim from upstream)
// ---------------------------------------------------------------------------
function loadEnvSection(envMap, yamlSection, { requiresBaseUrl = false, keylessProviders = new Set() } = {}) {
    const result = {};
    // First, add everything from YAML as defaults
    if (yamlSection) {
        for (const [id, entry] of Object.entries(yamlSection)){
            if (requiresBaseUrl ? !!entry?.baseUrl : entry?.apiKey || entry?.baseUrl && keylessProviders.has(id)) {
                result[id] = {
                    apiKey: entry.apiKey || '',
                    baseUrl: entry.baseUrl,
                    models: entry.models,
                    proxy: entry.proxy,
                    enabled: entry.enabled
                };
            }
        }
    }
    // Then, apply env vars (env takes priority over YAML)
    for (const [prefix, providerId] of Object.entries(envMap)){
        const envApiKey = process.env[`${prefix}_API_KEY`] || undefined;
        const envBaseUrl = process.env[`${prefix}_BASE_URL`] || undefined;
        const envModelsStr = process.env[`${prefix}_MODELS`];
        const envModels = envModelsStr ? envModelsStr.split(',').map((m)=>m.trim()).filter(Boolean) : undefined;
        if (result[providerId]) {
            // YAML entry exists — env vars override individual fields
            if (envApiKey) result[providerId].apiKey = envApiKey;
            if (envBaseUrl) result[providerId].baseUrl = envBaseUrl;
            if (envModels) result[providerId].models = envModels;
            continue;
        }
        // Activate on API key, or base URL alone for keyless providers (e.g. Ollama)
        if (requiresBaseUrl ? !envBaseUrl : !(envApiKey || envBaseUrl && keylessProviders.has(providerId))) continue;
        result[providerId] = {
            apiKey: envApiKey || '',
            baseUrl: envBaseUrl,
            models: envModels
        };
    }
    return result;
}
/** Parse a boolean-ish env value. Falsey words ⇒ false; anything else ⇒ true. */ function parseBooleanEnv(raw) {
    return !/^(false|0|no|off)$/i.test(raw.trim());
}
/**
 * Collect TTS provider IDs the operator force-disabled, from YAML
 * (`tts.<id>.enabled: false`) and env (`TTS_<PREFIX>_ENABLED=false`). An
 * explicit env `true` overrides a YAML disable (env precedence, matching the
 * rest of this module).
 */ function collectDisabledTTS(yamlTts) {
    const disabled = new Set();
    if (yamlTts) {
        for (const [id, entry] of Object.entries(yamlTts)){
            if (entry?.enabled === false) disabled.add(id);
        }
    }
    for (const [prefix, providerId] of Object.entries(TTS_DISABLE_ENV_MAP)){
        const raw = process.env[`${prefix}_ENABLED`];
        // Treat unset / empty (e.g. a blank CI-templated value) as "no opinion" so
        // it never silently overrides an explicit YAML disable.
        if (raw === undefined || raw.trim() === '') continue;
        if (parseBooleanEnv(raw)) disabled.delete(providerId);
        else disabled.add(providerId);
    }
    return disabled;
}
// ---------------------------------------------------------------------------
// ZAI injection into a provider section (medq-specific)
// ---------------------------------------------------------------------------
/**
 * Inject ZAI as a synthetic managed provider into a section's config map.
 * ZAI is always "managed" when `.z-ai-config` exists, regardless of YAML/env.
 * This guarantees ZAI works out-of-the-box for medq deployments without any
 * operator configuration, while still allowing other providers to be added.
 *
 * If the operator has ALSO configured ZAI via YAML/env (unlikely but possible),
 * the YAML/env entry wins (matches the rest of this module's "env > YAML"
 * precedence — except here ZAI is injected last so it never overrides an
 * explicit operator config).
 */ function injectZaiProvider(sectionMap, options = {}) {
    const zai = resolveZaiConfig();
    if (!zai.hasConfig) return sectionMap;
    // Don't override an explicit operator config for ZAI.
    if (sectionMap.zai) return sectionMap;
    return {
        ...sectionMap,
        zai: {
            apiKey: zai.apiKey,
            baseUrl: zai.baseUrl,
            models: options.models
        }
    };
}
// ---------------------------------------------------------------------------
// Module-level cache (process singleton)
// ---------------------------------------------------------------------------
const DEFAULT_FILENAME = 'server-providers.yml';
const OPENAI_IMAGE_PROVIDER_ID = 'openai-image';
/** Cache keyed by YAML filename (empty string = default file). */ const _configs = new Map();
function applyOpenAIImageFallback(imageConfig, yamlImageSection) {
    if (imageConfig[OPENAI_IMAGE_PROVIDER_ID]) return imageConfig;
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return imageConfig;
    const yamlOpenAIImage = yamlImageSection?.[OPENAI_IMAGE_PROVIDER_ID];
    imageConfig[OPENAI_IMAGE_PROVIDER_ID] = {
        apiKey,
        baseUrl: yamlOpenAIImage?.baseUrl || process.env.IMAGE_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL,
        models: yamlOpenAIImage?.models,
        proxy: yamlOpenAIImage?.proxy
    };
    return imageConfig;
}
function buildConfig(yamlData) {
    const image = applyOpenAIImageFallback(loadEnvSection(IMAGE_ENV_MAP, yamlData.image, {
        keylessProviders: new Set([
            'lemonade'
        ])
    }), yamlData.image);
    // Build each section from YAML + env, then inject ZAI as a managed provider.
    const providers = injectZaiProvider(loadEnvSection(LLM_ENV_MAP, yamlData.providers, {
        keylessProviders: new Set([
            'ollama',
            'lemonade'
        ])
    }), {
        models: [
            'auto'
        ]
    });
    const tts = injectZaiProvider(loadEnvSection(TTS_ENV_MAP, yamlData.tts, {
        keylessProviders: new Set([
            'voxcpm-tts',
            'lemonade-tts'
        ])
    }));
    const asr = injectZaiProvider(loadEnvSection(ASR_ENV_MAP, yamlData.asr, {
        keylessProviders: new Set([
            'lemonade-asr'
        ])
    }));
    const pdf = loadEnvSection(PDF_ENV_MAP, yamlData.pdf, {
        requiresBaseUrl: true
    });
    const video = injectZaiProvider(loadEnvSection(VIDEO_ENV_MAP, yamlData.video));
    const webSearch = injectZaiProvider(loadEnvSection(WEB_SEARCH_ENV_MAP, yamlData['web-search']));
    return {
        providers,
        tts,
        asr,
        pdf,
        image: injectZaiProvider(image, {
            models: [
                'auto'
            ]
        }),
        video,
        webSearch,
        ttsDisabled: collectDisabledTTS(yamlData.tts)
    };
}
function logConfig(config, label) {
    const counts = [
        Object.keys(config.providers).length,
        Object.keys(config.tts).length,
        Object.keys(config.asr).length,
        Object.keys(config.pdf).length,
        Object.keys(config.image).length,
        Object.keys(config.video).length,
        Object.keys(config.webSearch).length
    ];
    if (counts.some((c)=>c > 0)) {
        log.info(`[ServerProviderConfig] Loaded (${label}): ${counts[0]} LLM, ${counts[1]} TTS, ${counts[2]} ASR, ${counts[3]} PDF, ${counts[4]} Image, ${counts[5]} Video, ${counts[6]} WebSearch providers`);
    }
}
function getConfig() {
    const cached = _configs.get('');
    if (cached) return cached;
    const yamlData = loadYamlFile(DEFAULT_FILENAME);
    const config = buildConfig(yamlData);
    logConfig(config, DEFAULT_FILENAME);
    _configs.set('', config);
    return config;
}
// ---------------------------------------------------------------------------
// Managed-provider resolution (verbatim from upstream)
// ---------------------------------------------------------------------------
/** Whether the operator configured this provider in the given section.
 *  ZAI is always considered configured when .z-ai-config exists. */ function isServerConfiguredProvider(section, providerId) {
    return !!getConfig()[section][providerId];
}
function resolveSectionApiKey(section, providerId, clientKey) {
    const entry = getConfig()[section][providerId];
    if (entry) return entry.apiKey || ''; // managed: server key is authoritative
    return clientKey || ''; // unmanaged: client-supplied key only
}
function resolveSectionBaseUrl(section, providerId, clientBaseUrl) {
    const entry = getConfig()[section][providerId];
    if (entry) return entry.baseUrl; // managed: server base URL is authoritative
    return clientBaseUrl; // unmanaged: client-supplied base URL only
}
// ---------------------------------------------------------------------------
// Public API — LLM
// ---------------------------------------------------------------------------
/**
 * Returns server-configured LLM providers. Exposes only the allowed model list
 * and the "managed" flag (presence in this map) — never the API key or the
 * base URL, which can reveal internal gateway/proxy infrastructure.
 */ function getServerProviders() {
    const cfg = getConfig();
    const result = {};
    for (const [id, entry] of Object.entries(cfg.providers)){
        result[id] = {};
        if (entry.models && entry.models.length > 0) result[id].models = entry.models;
    }
    return result;
}
/** Resolve API key. Managed provider ⇒ server key; otherwise client key. */ function resolveApiKey(providerId, clientKey) {
    return resolveSectionApiKey('providers', providerId, clientKey);
}
/** Resolve base URL. Managed provider ⇒ server URL; otherwise client URL. */ function resolveBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('providers', providerId, clientBaseUrl);
}
/** Resolve proxy URL for a provider (server config only) */ function resolveProxy(providerId) {
    return getConfig().providers[providerId]?.proxy;
}
// ---------------------------------------------------------------------------
// Public API — TTS
// ---------------------------------------------------------------------------
/**
 * Returns TTS providers the client must know about: server-managed providers
 * (presence = managed flag, no base URLs) plus operator force-disabled
 * providers (`{ disabled: true }`). A force-disabled provider is reported as
 * disabled even when it is otherwise configured — disable wins (#665).
 */ function getServerTTSProviders() {
    const cfg = getConfig();
    const result = {};
    for (const id of Object.keys(cfg.tts))result[id] = {};
    for (const id of cfg.ttsDisabled)result[id] = {
        disabled: true
    };
    return result;
}
function resolveTTSApiKey(providerId, clientKey) {
    return resolveSectionApiKey('tts', providerId, clientKey);
}
/** Whether the operator force-disabled this TTS provider (server precedence, #665). */ function isServerTTSProviderDisabled(providerId) {
    return getConfig().ttsDisabled.has(providerId);
}
function resolveTTSBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('tts', providerId, clientBaseUrl);
}
/**
 * Resolve the TTS model. A managed provider may pin its model server-side
 * (`${PREFIX}_MODELS`, first entry) — authoritative like its key/baseUrl, since
 * the managed-provider UI does not expose a model field. Otherwise the client
 * model wins.
 */ function resolveTTSModel(providerId, clientModel) {
    const entry = getConfig().tts[providerId];
    if (entry?.models && entry.models.length > 0) return entry.models[0];
    return clientModel;
}
// ---------------------------------------------------------------------------
// Public API — ASR
// ---------------------------------------------------------------------------
/** Returns server-configured ASR providers (managed flag only, no base URLs). */ function getServerASRProviders() {
    return Object.fromEntries(Object.keys(getConfig().asr).map((id)=>[
            id,
            {}
        ]));
}
function resolveASRApiKey(providerId, clientKey) {
    return resolveSectionApiKey('asr', providerId, clientKey);
}
function resolveASRBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('asr', providerId, clientBaseUrl);
}
// ---------------------------------------------------------------------------
// Public API — PDF
// ---------------------------------------------------------------------------
/** Returns server-configured PDF providers (managed flag only, no base URLs). */ function getServerPDFProviders() {
    return Object.fromEntries(Object.keys(getConfig().pdf).map((id)=>[
            id,
            {}
        ]));
}
function resolvePDFApiKey(providerId, clientKey) {
    return resolveSectionApiKey('pdf', providerId, clientKey);
}
function resolvePDFBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('pdf', providerId, clientBaseUrl);
}
// ---------------------------------------------------------------------------
// Public API — Image Generation
// ---------------------------------------------------------------------------
/** Returns server-configured image providers (allowed models only, no base URLs). */ function getServerImageProviders() {
    const cfg = getConfig();
    const result = {};
    for (const [id, entry] of Object.entries(cfg.image)){
        result[id] = {};
        if (entry.models && entry.models.length > 0) result[id].models = entry.models;
    }
    return result;
}
function resolveImageApiKey(providerId, clientKey) {
    return resolveSectionApiKey('image', providerId, clientKey);
}
function resolveImageBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('image', providerId, clientBaseUrl);
}
// ---------------------------------------------------------------------------
// Public API — Video Generation
// ---------------------------------------------------------------------------
/** Returns server-configured video providers (managed flag only, no base URLs). */ function getServerVideoProviders() {
    return Object.fromEntries(Object.keys(getConfig().video).map((id)=>[
            id,
            {}
        ]));
}
function resolveVideoApiKey(providerId, clientKey) {
    return resolveSectionApiKey('video', providerId, clientKey);
}
function resolveVideoBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('video', providerId, clientBaseUrl);
}
// ---------------------------------------------------------------------------
// Public API — Web Search
// ---------------------------------------------------------------------------
/** Returns server-configured web search providers (managed flag only, no base URLs). */ function getServerWebSearchProviders() {
    return Object.fromEntries(Object.keys(getConfig().webSearch).map((id)=>[
            id,
            {}
        ]));
}
function resolveWebSearchApiKey(providerIdOrClientKey, clientKey) {
    const hasProviderId = arguments.length >= 2;
    const providerId = hasProviderId ? providerIdOrClientKey || 'tavily' : 'tavily';
    const effectiveClientKey = hasProviderId ? clientKey : providerIdOrClientKey;
    return resolveSectionApiKey('webSearch', providerId, effectiveClientKey);
}
function resolveWebSearchBaseUrl(providerId, clientBaseUrl) {
    return resolveSectionBaseUrl('webSearch', providerId, clientBaseUrl);
}
function resolveServerWebSearchProviderId(preferredProviderId) {
    const webSearch = getConfig().webSearch;
    // ZAI is medq's default — prefer it if configured.
    if (webSearch.zai?.apiKey) return 'zai';
    if (preferredProviderId && webSearch[preferredProviderId]?.apiKey) {
        return preferredProviderId;
    }
    if (webSearch.tavily?.apiKey) return 'tavily';
    if (webSearch.bocha?.apiKey) return 'bocha';
    if (webSearch.baidu?.apiKey) return 'baidu';
    if (webSearch.minimax?.apiKey) return 'minimax';
    return Object.keys(webSearch)[0];
}
/**
 * Opt-in concurrency for parallel scene-content generation (#572).
 *
 * Returns the server-configured `PARALLEL_SCENE_CONCURRENCY`, clamped to
 * [0, 10]. `0` (the default) means the client keeps the original serial
 * generation loop; a value `> 1` enables the hybrid two-phase path. Kept
 * server-side because many deployments use API keys with low per-key
 * concurrency quotas, where a bursty default would surface as 429s.
 */ function getParallelSceneConcurrency() {
    const raw = Number.parseInt(process.env.PARALLEL_SCENE_CONCURRENCY ?? '', 10);
    if (!Number.isFinite(raw) || raw <= 0) return 0;
    return Math.min(raw, 10);
}


/***/ })

};
;