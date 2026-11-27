exports.id = 2962;
exports.ids = [2962];
exports.modules = {

/***/ 78335:
/***/ (() => {



/***/ }),

/***/ 81038:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(532948);
/* harmony import */ var _base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(636839);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(114490);
/* harmony import */ var _barrel_optimize_names_CheckIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35471);
/* __next_internal_client_entry_do_not_use__ Checkbox auto */ 



function Checkbox({ className, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_1__/* .CheckboxRoot */ .y, {
        "data-slot": "checkbox",
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_2__.cn)("peer relative flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-input transition-colors outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary dark:data-checked:bg-primary", className),
        ...props,
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_checkbox__WEBPACK_IMPORTED_MODULE_3__/* .CheckboxIndicator */ .P, {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none [&>svg]:size-3.5",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_barrel_optimize_names_CheckIcon_lucide_react__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .A, {})
        })
    });
}



/***/ }),

/***/ 87039:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZI: () => (/* binding */ TooltipContent),
/* harmony export */   k$: () => (/* binding */ TooltipTrigger),
/* harmony export */   m_: () => (/* binding */ Tooltip)
/* harmony export */ });
/* unused harmony export TooltipProvider */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(240427);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(114490);
/* __next_internal_client_entry_do_not_use__ Tooltip,TooltipContent,TooltipProvider,TooltipTrigger auto */ 



function TooltipProvider({ delayDuration = 0, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Provider */ .Kq, {
        "data-slot": "tooltip-provider",
        delayDuration: delayDuration,
        ...props
    });
}
function Tooltip({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(TooltipProvider, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Root */ .bL, {
            "data-slot": "tooltip",
            ...props
        })
    });
}
function TooltipTrigger({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Trigger */ .l9, {
        "data-slot": "tooltip-trigger",
        ...props
    });
}
function TooltipContent({ className, sideOffset = 0, children, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Portal */ .ZL, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Content */ .UC, {
            "data-slot": "tooltip-content",
            sideOffset: sideOffset,
            className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_3__.cn)('data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 rounded-md px-3 py-1.5 text-xs bg-foreground text-background z-50 w-fit max-w-xs origin-(--radix-tooltip-content-transform-origin)', className),
            ...props,
            children: [
                children,
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(radix_ui__WEBPACK_IMPORTED_MODULE_2__/* .Arrow */ .i3, {
                    className: "size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px] bg-foreground fill-foreground z-50 translate-y-[calc(-50%_-_2px)]"
                })
            ]
        })
    });
}



/***/ }),

/***/ 92048:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C$: () => (/* binding */ useSettingsStore)
/* harmony export */ });
/* unused harmony exports PLAYBACK_SPEEDS, promoteLegacyCustomProviderBaseUrls */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(469517);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(300);
/* harmony import */ var _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(277819);
/* harmony import */ var _lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(687947);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(839323);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(689355);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(832917);
/* harmony import */ var _lib_pdf_constants__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(586359);
/* harmony import */ var _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(237403);
/* harmony import */ var _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(290709);
/* harmony import */ var _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(494848);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(971427);
/* harmony import */ var _lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(301802);
/**
 * Settings Store
 * Global settings state synchronized with localStorage
 */ 












const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_7__/* .createLogger */ .h)('Settings');
function pruneThinkingConfigs(thinkingConfigs, providersConfig) {
    if (!thinkingConfigs || !providersConfig) return {};
    const validKeys = new Set();
    for (const [providerId, providerConfig] of Object.entries(providersConfig)){
        for (const model of providerConfig.models){
            if ((0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .supportsConfigurableThinking */ .yW)(model.capabilities?.thinking)) {
                validKeys.add((0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .getThinkingConfigKey */ .UL)(providerId, model.id));
            }
        }
    }
    return Object.fromEntries(Object.entries(thinkingConfigs).filter(([key])=>validKeys.has(key)));
}
/** Available playback speed tiers */ const PLAYBACK_SPEEDS = (/* unused pure expression or super */ null && ([
    1,
    1.25,
    1.5,
    2
]));
// Initialize default providers config
const getDefaultProvidersConfig = ()=>{
    const config = {};
    Object.keys(_lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x).forEach((pid)=>{
        const provider = _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x[pid];
        config[pid] = {
            apiKey: '',
            baseUrl: '',
            models: provider.models,
            name: provider.name,
            type: provider.type,
            defaultBaseUrl: provider.defaultBaseUrl,
            icon: provider.icon,
            requiresApiKey: provider.requiresApiKey,
            isBuiltIn: true
        };
    });
    return config;
};
/**
 * Single shared LLM selection resolver (#580). Given a providers config and
 * the current (providerId, modelId), return the resolved selection that
 * upholds the invariant for ANY config mutation — clearing/adding a key,
 * editing models, deleting a provider, import, reset:
 *
 * - keep the current provider if it is still usable;
 * - else fall back to the first usable provider;
 * - else State A (empty selection).
 *
 * Then resolve a concrete model for the chosen provider. Used by both
 * setProviderConfig (single edit) and setProvidersConfig (bulk) so the two
 * paths can never diverge — the per-call-site asymmetry #580 set out to kill.
 */ function resolveLLMSelection(config, currentProviderId, currentModelId) {
    const isUsable = (id)=>!!config[id] && (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .isLLMProviderConfigured */ .zT)(config[id]);
    const providerId = isUsable(currentProviderId) ? currentProviderId : Object.keys(config).find(isUsable) ?? '';
    const modelId = providerId ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(currentModelId, config[providerId]?.models ?? []) : '';
    return {
        providerId,
        modelId
    };
}
// Initialize default audio config
const getDefaultAudioConfig = ()=>({
        ttsProviderId: 'browser-native-tts',
        ttsVoice: 'default',
        ttsSpeed: 1.0,
        asrProviderId: 'browser-native',
        asrLanguage: 'zh',
        ttsProvidersConfig: {
            // Built-in providers default enabled:true — they only ever surface once
            // configured (API key or server-managed), so "enabled" is a user opt-OUT,
            // not the visibility gate. A server-configured provider must not be hidden
            // by a stale default (#665).
            'openai-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'azure-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'glm-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'qwen-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'voxcpm-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
                enabled: true,
                providerOptions: {
                    backend: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_VOXCPM_BACKEND */ .TN
                }
            },
            'doubao-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'elevenlabs-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'minimax-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: 'speech-2.8-hd',
                enabled: true
            },
            'lemonade-tts': {
                apiKey: '',
                baseUrl: '',
                modelId: 'kokoro-v1',
                enabled: true
            },
            // Browser-native is OFF by default — fully opt-in. Native voice quality is
            // poor; it must never be a silent default (#665).
            'browser-native-tts': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        },
        asrProvidersConfig: {
            'openai-whisper': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'browser-native': {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            'qwen-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'azure-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'lemonade-asr': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default PDF config
const getDefaultPDFConfig = ()=>({
        pdfProviderId: 'unpdf',
        pdfProvidersConfig: {
            unpdf: {
                apiKey: '',
                baseUrl: '',
                enabled: true
            },
            mineru: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'mineru-cloud': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Image config
const getDefaultImageConfig = ()=>({
        imageProviderId: 'seedream',
        imageModelId: 'doubao-seedream-5-0-260128',
        imageProvidersConfig: {
            seedream: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'openai-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'qwen-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'nano-banana': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'minimax-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'grok-image': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            lemonade: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            // Built-in platform provider — no user key needed; credentials are
            // resolved server-side from .z-ai-config / ZAI_API_KEY. Selected
            // automatically by the agent illustration tool when the preferred
            // provider has no key configured.
            zai: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Video config
const getDefaultVideoConfig = ()=>({
        videoProviderId: 'seedance',
        videoModelId: 'doubao-seedance-1-5-pro-251215',
        videoProvidersConfig: {
            seedance: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            kling: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            veo: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            sora: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'minimax-video': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            'grok-video': {
                apiKey: '',
                baseUrl: '',
                enabled: false
            },
            happyhorse: {
                apiKey: '',
                baseUrl: '',
                enabled: false
            }
        }
    });
// Initialize default Web Search config
const getDefaultWebSearchConfig = ()=>({
        webSearchProviderId: 'tavily',
        webSearchProvidersConfig: {
            tavily: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            bocha: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            brave: {
                apiKey: '',
                baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.brave.defaultBaseUrl || '',
                enabled: true,
                requiresApiKey: false
            },
            baidu: {
                apiKey: '',
                baseUrl: '',
                enabled: true,
                requiresApiKey: true
            },
            minimax: {
                apiKey: '',
                baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.minimax.defaultBaseUrl || '',
                enabled: true,
                requiresApiKey: true
            }
        },
        baiduSubSources: {
            webSearch: true,
            baike: true,
            scholar: true
        }
    });
/**
 * Check whether a provider ID exists in the given provider registry.
 */ function hasProviderId(providerMap, providerId) {
    return typeof providerId === 'string' && providerId in providerMap;
}
/**
 * Validate all persisted provider IDs against their registries.
 * Reset any stale / removed ID back to its default value.
 * Called during both migrate and merge to cover all rehydration paths.
 */ function ensureValidProviderSelections(state) {
    const defaultAudioConfig = getDefaultAudioConfig();
    const defaultPdfConfig = getDefaultPDFConfig();
    const defaultImageConfig = getDefaultImageConfig();
    const defaultVideoConfig = getDefaultVideoConfig();
    const defaultWebSearchConfig = getDefaultWebSearchConfig();
    if (!hasProviderId(_lib_pdf_constants__WEBPACK_IMPORTED_MODULE_3__/* .PDF_PROVIDERS */ .sP, state.pdfProviderId)) {
        state.pdfProviderId = defaultPdfConfig.pdfProviderId;
    }
    if (!hasProviderId(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf, state.webSearchProviderId)) {
        state.webSearchProviderId = defaultWebSearchConfig.webSearchProviderId;
    }
    ensureBaiduSubSources(state);
    if (!hasProviderId(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D, state.imageProviderId)) {
        state.imageProviderId = defaultImageConfig.imageProviderId;
    }
    if (!hasProviderId(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l, state.videoProviderId)) {
        state.videoProviderId = defaultVideoConfig.videoProviderId;
    }
    if (!hasProviderId(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF, state.ttsProviderId) && !(state.ttsProviderId && (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(state.ttsProviderId) && state.ttsProvidersConfig && state.ttsProviderId in state.ttsProvidersConfig)) {
        state.ttsProviderId = defaultAudioConfig.ttsProviderId;
    }
    if (!hasProviderId(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co, state.asrProviderId) && !(state.asrProviderId && (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(state.asrProviderId) && state.asrProvidersConfig && state.asrProviderId in state.asrProvidersConfig)) {
        state.asrProviderId = defaultAudioConfig.asrProviderId;
    }
}
function ensureBuiltInAudioProviders(state) {
    const defaultAudioConfig = getDefaultAudioConfig();
    if (state.ttsProvidersConfig) {
        for (const providerId of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF)){
            if (!state.ttsProvidersConfig[providerId]) {
                state.ttsProvidersConfig[providerId] = defaultAudioConfig.ttsProvidersConfig[providerId];
            }
        }
        const voxcpmConfig = state.ttsProvidersConfig['voxcpm-tts'];
        if (voxcpmConfig) {
            if (!voxcpmConfig.modelId || voxcpmConfig.modelId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_MODEL_ID */ .wG) {
                voxcpmConfig.modelId = _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_VLLM_MODEL_ID */ .Cn;
            }
            voxcpmConfig.providerOptions = {
                backend: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .DEFAULT_VOXCPM_BACKEND */ .TN,
                ...voxcpmConfig.providerOptions || {}
            };
        }
    }
    if (state.asrProvidersConfig) {
        for (const providerId of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co)){
            if (!state.asrProvidersConfig[providerId]) {
                state.asrProvidersConfig[providerId] = defaultAudioConfig.asrProvidersConfig[providerId];
            }
        }
    }
}
/**
 * Ensure providersConfig includes all built-in providers and their latest models.
 * Called on every rehydrate (not just version migrations) so new providers
 * added in code are always picked up without clearing cache.
 */ function ensureBuiltInProviders(state) {
    if (!state.providersConfig) return;
    const defaultConfig = getDefaultProvidersConfig();
    Object.keys(_lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x).forEach((pid)=>{
        const providerId = pid;
        if (!state.providersConfig[providerId]) {
            // New provider: add with defaults
            state.providersConfig[providerId] = defaultConfig[providerId];
        } else {
            // Existing provider: refresh built-in models from the registry and
            // keep user-added models after the built-in list.
            const provider = _lib_ai_provider_catalog__WEBPACK_IMPORTED_MODULE_0__/* .PROVIDERS */ .x[providerId];
            const existing = state.providersConfig[providerId];
            const builtInModelIds = new Set(provider.models.map((m)=>m.id));
            const customModels = (existing.models || []).filter((m)=>!builtInModelIds.has(m.id));
            const mergedModels = [
                ...provider.models,
                ...customModels
            ];
            state.providersConfig[providerId] = {
                ...existing,
                models: mergedModels,
                name: existing.name || provider.name,
                type: existing.type || provider.type,
                defaultBaseUrl: existing.defaultBaseUrl || provider.defaultBaseUrl,
                icon: provider.icon || existing.icon,
                requiresApiKey: existing.requiresApiKey ?? provider.requiresApiKey,
                isBuiltIn: existing.isBuiltIn ?? true
            };
        }
    });
}
/**
 * Custom providers created before #414 stored their actual endpoint in
 * defaultBaseUrl while leaving baseUrl empty. Promote that persisted value
 * during rehydrate so downstream request builders keep using baseUrl only.
 */ function promoteLegacyCustomProviderBaseUrls(state) {
    if (!state.providersConfig) return;
    Object.values(state.providersConfig).forEach((config)=>{
        if (!config.isBuiltIn && !config.baseUrl && config.defaultBaseUrl) {
            config.baseUrl = config.defaultBaseUrl;
        }
    });
}
/**
 * Ensure imageProvidersConfig includes all built-in image providers.
 * Called on every rehydrate so newly added image providers appear automatically.
 */ function ensureBuiltInImageProviders(state) {
    if (!state.imageProvidersConfig) return;
    const defaultConfig = getDefaultImageConfig().imageProvidersConfig;
    Object.keys(_lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D).forEach((pid)=>{
        const providerId = pid;
        if (!state.imageProvidersConfig[providerId]) {
            state.imageProvidersConfig[providerId] = defaultConfig[providerId];
        }
    });
}
/**
 * Ensure videoProvidersConfig includes all built-in video providers.
 * Called on every rehydrate so newly added video providers appear automatically.
 */ function ensureBuiltInVideoProviders(state) {
    if (!state.videoProvidersConfig) return;
    const defaultConfig = getDefaultVideoConfig().videoProvidersConfig;
    Object.keys(_lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l).forEach((pid)=>{
        const providerId = pid;
        if (!state.videoProvidersConfig[providerId]) {
            state.videoProvidersConfig[providerId] = defaultConfig[providerId];
        }
    });
}
/**
 * Ensure webSearchProvidersConfig includes all built-in web search providers.
 * Called on every rehydrate so newly added providers appear automatically.
 */ function ensureBuiltInWebSearchProviders(state) {
    if (!state.webSearchProvidersConfig) return;
    const defaultConfig = getDefaultWebSearchConfig().webSearchProvidersConfig;
    Object.keys(_lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf).forEach((pid)=>{
        const providerId = pid;
        if (!state.webSearchProvidersConfig[providerId]) {
            state.webSearchProvidersConfig[providerId] = defaultConfig[providerId];
        } else {
            state.webSearchProvidersConfig[providerId] = {
                ...state.webSearchProvidersConfig[providerId],
                requiresApiKey: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf[providerId].requiresApiKey
            };
        }
    });
}
function ensureBaiduSubSources(state) {
    const defaults = getDefaultWebSearchConfig().baiduSubSources;
    const current = state.baiduSubSources;
    state.baiduSubSources = {
        webSearch: current?.webSearch ?? defaults.webSearch,
        baike: current?.baike ?? defaults.baike,
        scholar: current?.scholar ?? defaults.scholar
    };
}
/**
 * Strip the removed `serverBaseUrl` field from any persisted provider config.
 *
 * Managed providers no longer expose their base URL to the client (#620). Old
 * localStorage may still carry a `serverBaseUrl` on provider entries; this
 * clears it on every rehydrate so a stale server URL can't linger in client
 * state. Called from both migrate and merge to cover all rehydration paths.
 */ function stripLegacyServerBaseUrl(state) {
    const maps = [
        state.providersConfig,
        state.ttsProvidersConfig,
        state.asrProvidersConfig,
        state.pdfProvidersConfig,
        state.imageProvidersConfig,
        state.videoProvidersConfig,
        state.webSearchProvidersConfig
    ];
    for (const map of maps){
        if (!map) continue;
        for (const cfg of Object.values(map)){
            if (cfg && 'serverBaseUrl' in cfg) delete cfg.serverBaseUrl;
        }
    }
}
// Migrate from old localStorage format
const migrateFromOldStorage = ()=>{
    if (true) return null;
    // Check if new storage already exists
    const newStorage = localStorage.getItem('settings-storage');
    if (newStorage) return null; // Already migrated or new install
    // Read old localStorage keys
    const oldLlmModel = localStorage.getItem('llmModel');
    const oldProvidersConfig = localStorage.getItem('providersConfig');
    const oldTtsModel = localStorage.getItem('ttsModel');
    const oldSelectedAgents = localStorage.getItem('selectedAgentIds');
    if (!oldLlmModel && !oldProvidersConfig) return null; // No old data
    // Parse model selection
    let providerId = 'openai';
    let modelId = 'gpt-5.4-mini';
    if (oldLlmModel) {
        const [pid, mid] = oldLlmModel.split(':');
        if (pid && mid) {
            providerId = pid;
            modelId = mid;
        }
    }
    // Parse providers config
    let providersConfig = getDefaultProvidersConfig();
    if (oldProvidersConfig) {
        try {
            const parsed = JSON.parse(oldProvidersConfig);
            providersConfig = {
                ...providersConfig,
                ...parsed
            };
        } catch (e) {
            log.error('Failed to parse old providersConfig:', e);
        }
    }
    // Parse other settings
    let ttsModel = 'openai-tts';
    if (oldTtsModel) ttsModel = oldTtsModel;
    let selectedAgentIds = [
        'default-1',
        'default-2',
        'default-3'
    ];
    if (oldSelectedAgents) {
        try {
            const parsed = JSON.parse(oldSelectedAgents);
            if (Array.isArray(parsed) && parsed.length > 0) {
                selectedAgentIds = parsed;
            }
        } catch (e) {
            log.error('Failed to parse old selectedAgentIds:', e);
        }
    }
    return {
        providerId,
        modelId,
        thinkingConfigs: {},
        providersConfig,
        ttsModel,
        selectedAgentIds
    };
};
const useSettingsStore = (0,zustand__WEBPACK_IMPORTED_MODULE_11__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_12__/* .persist */ .Zr)((set, get)=>{
    // Try to migrate from old storage
    const migratedData = migrateFromOldStorage();
    const defaultAudioConfig = getDefaultAudioConfig();
    const defaultPDFConfig = getDefaultPDFConfig();
    const defaultImageConfig = getDefaultImageConfig();
    const defaultVideoConfig = getDefaultVideoConfig();
    const defaultWebSearchConfig = getDefaultWebSearchConfig();
    const initialProvidersConfig = migratedData?.providersConfig || getDefaultProvidersConfig();
    return {
        // Initial state (use migrated data if available).
        // Default provider is ZAI (MedQ's native LLM backend via z-ai-web-dev-sdk).
        // The OpenMAIC source code's full multi-vendor provider registry is
        // preserved in src/lib/ai/providers.ts — users can switch to OpenAI /
        // Anthropic / Google / etc. from the settings UI by entering their
        // own API key. ZAI is the zero-config default since its credentials
        // are read from `.z-ai-config` at request time.
        providerId: migratedData?.providerId || 'zai',
        modelId: migratedData?.modelId || 'auto',
        thinkingConfigs: pruneThinkingConfigs(migratedData?.thinkingConfigs || {}, initialProvidersConfig),
        providersConfig: initialProvidersConfig,
        ttsModel: migratedData?.ttsModel || 'openai-tts',
        selectedAgentIds: migratedData?.selectedAgentIds || [
            'default-1',
            'default-2',
            'default-3'
        ],
        agentMode: 'auto',
        autoAgentCount: 3,
        agentVoiceOverrides: {},
        agentSelectionIsUserSet: false,
        // Playback controls
        ttsMuted: false,
        ttsVolume: 1,
        autoPlayLecture: false,
        playbackSpeed: 1,
        // Layout preferences
        sidebarCollapsed: true,
        chatAreaCollapsed: true,
        chatAreaWidth: 320,
        editRailCollapsed: false,
        editRailWidth: 220,
        editInsertToolbarCollapsed: false,
        // Audio settings (use defaults)
        ...defaultAudioConfig,
        // PDF settings (use defaults)
        ...defaultPDFConfig,
        // Image settings (use defaults)
        ...defaultImageConfig,
        // Video settings (use defaults)
        ...defaultVideoConfig,
        // Media generation toggles (off by default)
        imageGenerationEnabled: false,
        videoGenerationEnabled: false,
        reviewOutlineEnabled: false,
        // TTS is OFF by default; auto-enabled on first server-sync when a TTS
        // provider is configured (mirrors image/video). Fresh installs with no
        // provider stay off and show an "enable browser-native" CTA (#665).
        ttsEnabled: false,
        asrEnabled: true,
        // Off until the server reports a concurrency via fetchServerProviders.
        parallelSceneConcurrency: 0,
        autoConfigApplied: false,
        // Web Search settings (use defaults)
        ...defaultWebSearchConfig,
        // Actions
        setModel: (providerId, modelId)=>set({
                providerId,
                modelId
            }),
        setThinkingConfig: (providerId, modelId, config)=>set((state)=>{
                const key = (0,_lib_ai_thinking_config__WEBPACK_IMPORTED_MODULE_8__/* .getThinkingConfigKey */ .UL)(providerId, modelId);
                const next = {
                    ...state.thinkingConfigs
                };
                if (config) {
                    next[key] = config;
                } else {
                    delete next[key];
                }
                return {
                    thinkingConfigs: next
                };
            }),
        setProviderConfig: (providerId, config)=>set((state)=>{
                const providersConfig = {
                    ...state.providersConfig,
                    [providerId]: {
                        ...state.providersConfig[providerId],
                        ...config
                    }
                };
                // Re-resolve through the shared resolver (#580): a single config
                // edit can make the active provider usable (adopt + pick a model),
                // make it INVALID — e.g. the user clears its API key — (fall back
                // to another usable provider or State A), or change its model list
                // (re-pick the model). All handled atomically here, never leaving
                // an invalid/stale (provider, model) selected.
                const { providerId: nextProvider, modelId: nextModel } = resolveLLMSelection(providersConfig, state.providerId, state.modelId);
                return {
                    providersConfig,
                    thinkingConfigs: pruneThinkingConfigs(state.thinkingConfigs, providersConfig),
                    ...nextProvider !== state.providerId && {
                        providerId: nextProvider
                    },
                    ...nextModel !== state.modelId && {
                        modelId: nextModel
                    }
                };
            }),
        setProvidersConfig: (config)=>set((state)=>{
                // Bulk config replace (delete provider/model, import, reset): same
                // shared resolver as setProviderConfig so the two paths can never
                // diverge — never leave the deleted/invalid provider selected.
                const { providerId: nextProvider, modelId: nextModel } = resolveLLMSelection(config, state.providerId, state.modelId);
                return {
                    providersConfig: config,
                    thinkingConfigs: pruneThinkingConfigs(state.thinkingConfigs, config),
                    ...nextProvider !== state.providerId && {
                        providerId: nextProvider
                    },
                    ...nextModel !== state.modelId && {
                        modelId: nextModel
                    }
                };
            }),
        setTtsModel: (model)=>set({
                ttsModel: model
            }),
        setTTSMuted: (muted)=>set({
                ttsMuted: muted
            }),
        setTTSVolume: (volume)=>set({
                ttsVolume: Math.max(0, Math.min(1, volume))
            }),
        setAutoPlayLecture: (autoPlay)=>set({
                autoPlayLecture: autoPlay
            }),
        setPlaybackSpeed: (speed)=>set({
                playbackSpeed: speed
            }),
        setSelectedAgentIds: (ids)=>set({
                selectedAgentIds: ids
            }),
        setAgentMode: (mode)=>set({
                agentMode: mode
            }),
        setAutoAgentCount: (count)=>set({
                autoAgentCount: count
            }),
        setAgentVoiceOverride: (agentId, voice)=>set((state)=>{
                const next = {
                    ...state.agentVoiceOverrides
                };
                if (voice) {
                    next[agentId] = voice;
                } else {
                    delete next[agentId];
                }
                return {
                    agentVoiceOverrides: next
                };
            }),
        setAgentSelectionIsUserSet: (isUserSet)=>set({
                agentSelectionIsUserSet: isUserSet
            }),
        // Layout actions
        setSidebarCollapsed: (collapsed)=>set({
                sidebarCollapsed: collapsed
            }),
        setChatAreaCollapsed: (collapsed)=>set({
                chatAreaCollapsed: collapsed
            }),
        setEditRailCollapsed: (collapsed)=>set({
                editRailCollapsed: collapsed
            }),
        setEditRailWidth: (width)=>set({
                editRailWidth: width
            }),
        setEditInsertToolbarCollapsed: (collapsed)=>set({
                editInsertToolbarCollapsed: collapsed
            }),
        setChatAreaWidth: (width)=>set({
                chatAreaWidth: width
            }),
        // Audio actions
        setTTSProvider: (providerId)=>set((state)=>{
                // If switching provider, set default voice for that provider
                const shouldUpdateVoice = state.ttsProviderId !== providerId;
                const defaultVoice = (0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(providerId) ? state.ttsProvidersConfig[providerId]?.customVoices?.[0]?.id || 'default' : _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[providerId] || 'default';
                return {
                    ttsProviderId: providerId,
                    ...shouldUpdateVoice && {
                        ttsVoice: defaultVoice
                    }
                };
            }),
        setTTSVoice: (voice)=>set({
                ttsVoice: voice
            }),
        setTTSSpeed: (speed)=>set({
                ttsSpeed: speed
            }),
        // Reset language when switching providers, since language code formats differ
        // (e.g. browser-native uses BCP-47 "en-US", OpenAI Whisper uses ISO 639-1 "en")
        setASRProvider: (providerId)=>set((state)=>{
                let supportedLanguages;
                if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(providerId)) {
                    supportedLanguages = [
                        'auto'
                    ];
                } else {
                    supportedLanguages = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .ASR_PROVIDERS */ .Co[providerId]?.supportedLanguages || [];
                }
                const isLanguageValid = supportedLanguages.includes(state.asrLanguage);
                return {
                    asrProviderId: providerId,
                    ...isLanguageValid ? {} : {
                        asrLanguage: supportedLanguages[0] || 'auto'
                    }
                };
            }),
        setASRLanguage: (language)=>set({
                asrLanguage: language
            }),
        setTTSProviderConfig: (providerId, config)=>set((state)=>({
                    ttsProvidersConfig: {
                        ...state.ttsProvidersConfig,
                        [providerId]: {
                            ...state.ttsProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        setASRProviderConfig: (providerId, config)=>set((state)=>({
                    asrProvidersConfig: {
                        ...state.asrProvidersConfig,
                        [providerId]: {
                            ...state.asrProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        // PDF actions
        setPDFProvider: (providerId)=>set({
                pdfProviderId: providerId
            }),
        setPDFProviderConfig: (providerId, config)=>set((state)=>({
                    pdfProvidersConfig: {
                        ...state.pdfProvidersConfig,
                        [providerId]: {
                            ...state.pdfProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        // Image Generation actions
        setImageProvider: (providerId)=>set((state)=>({
                    imageProviderId: providerId,
                    imageModelId: (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[providerId]?.models ?? [])
                })),
        setImageModelId: (modelId)=>set({
                imageModelId: modelId
            }),
        setImageProviderConfig: (providerId, config)=>set((state)=>{
                const mergedProvider = {
                    ...state.imageProvidersConfig[providerId],
                    ...config
                };
                const imageProvidersConfig = {
                    ...state.imageProvidersConfig,
                    [providerId]: mergedProvider
                };
                const base = {
                    imageProvidersConfig
                };
                // Atomic invariant (#580): a config edit on the active image
                // provider (e.g. deleting the selected custom model) must not
                // leave imageModelId pointing at a model that no longer exists.
                if (state.imageProviderId === providerId) {
                    const models = [
                        ..._lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[providerId]?.models ?? [],
                        ...mergedProvider.customModels ?? []
                    ];
                    const imageModelId = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, models);
                    if (imageModelId) {
                        return {
                            ...base,
                            imageModelId
                        };
                    }
                }
                return base;
            }),
        // Video Generation actions
        setVideoProvider: (providerId)=>set((state)=>({
                    videoProviderId: providerId,
                    videoModelId: (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[providerId]?.models ?? [])
                })),
        setVideoModelId: (modelId)=>set({
                videoModelId: modelId
            }),
        setVideoProviderConfig: (providerId, config)=>set((state)=>{
                const mergedProvider = {
                    ...state.videoProvidersConfig[providerId],
                    ...config
                };
                const videoProvidersConfig = {
                    ...state.videoProvidersConfig,
                    [providerId]: mergedProvider
                };
                const base = {
                    videoProvidersConfig
                };
                // Atomic invariant (#580): symmetric with image — a config edit on
                // the active video provider must not leave videoModelId stale.
                if (state.videoProviderId === providerId) {
                    const models = [
                        ..._lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[providerId]?.models ?? [],
                        ...mergedProvider.customModels ?? []
                    ];
                    const videoModelId = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, models);
                    if (videoModelId) {
                        return {
                            ...base,
                            videoModelId
                        };
                    }
                }
                return base;
            }),
        // Media generation toggle actions
        setImageGenerationEnabled: (enabled)=>{
            if (enabled) {
                const cfg = get().imageProvidersConfig;
                const hasUsable = Object.values(cfg).some((c)=>c.isServerConfigured || c.apiKey);
                if (!hasUsable) return;
            }
            set({
                imageGenerationEnabled: enabled
            });
        },
        setVideoGenerationEnabled: (enabled)=>{
            if (enabled) {
                const cfg = get().videoProvidersConfig;
                const hasUsable = Object.values(cfg).some((c)=>c.isServerConfigured || c.apiKey);
                if (!hasUsable) return;
            }
            set({
                videoGenerationEnabled: enabled
            });
        },
        setReviewOutlineEnabled: (enabled)=>set({
                reviewOutlineEnabled: enabled
            }),
        setTTSEnabled: (enabled)=>set({
                ttsEnabled: enabled
            }),
        setASREnabled: (enabled)=>set({
                asrEnabled: enabled
            }),
        // Custom audio provider actions
        addCustomTTSProvider: (id, name, baseUrl, requiresApiKey, defaultModel)=>set((state)=>({
                    ttsProvidersConfig: {
                        ...state.ttsProvidersConfig,
                        [id]: {
                            apiKey: '',
                            baseUrl: '',
                            enabled: true,
                            modelId: defaultModel || '',
                            customName: name,
                            customDefaultBaseUrl: baseUrl,
                            customVoices: [],
                            isBuiltIn: false,
                            requiresApiKey
                        }
                    },
                    ttsProviderId: id
                })),
        removeCustomTTSProvider: (id)=>set((state)=>{
                if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomTTSProvider */ .S)(id)) return state;
                const { [id]: _, ...rest } = state.ttsProvidersConfig;
                return {
                    ttsProvidersConfig: rest,
                    ...state.ttsProviderId === id && {
                        ttsProviderId: 'browser-native-tts',
                        ttsVoice: 'default'
                    }
                };
            }),
        addCustomASRProvider: (id, name, baseUrl, requiresApiKey)=>set((state)=>({
                    asrProvidersConfig: {
                        ...state.asrProvidersConfig,
                        [id]: {
                            apiKey: '',
                            baseUrl: '',
                            enabled: true,
                            modelId: '',
                            customModels: [],
                            customName: name,
                            customDefaultBaseUrl: baseUrl,
                            isBuiltIn: false,
                            requiresApiKey
                        }
                    },
                    asrProviderId: id
                })),
        removeCustomASRProvider: (id)=>set((state)=>{
                if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_10__/* .isCustomASRProvider */ .v)(id)) return state;
                const { [id]: _, ...rest } = state.asrProvidersConfig;
                return {
                    asrProvidersConfig: rest,
                    ...state.asrProviderId === id && {
                        asrProviderId: 'browser-native',
                        asrLanguage: 'zh'
                    }
                };
            }),
        // Web Search actions
        setWebSearchProvider: (providerId)=>set({
                webSearchProviderId: providerId
            }),
        setWebSearchProviderConfig: (providerId, config)=>set((state)=>({
                    webSearchProvidersConfig: {
                        ...state.webSearchProvidersConfig,
                        [providerId]: {
                            ...state.webSearchProvidersConfig[providerId],
                            ...config
                        }
                    }
                })),
        setBaiduSubSources: (sources)=>set((state)=>{
                const next = {
                    ...state.baiduSubSources,
                    ...sources
                };
                if (!next.webSearch && !next.baike && !next.scholar) {
                    return state;
                }
                return {
                    baiduSubSources: next
                };
            }),
        // Fetch server-configured providers and merge into local state
        fetchServerProviders: async ()=>{
            try {
                const res = await fetch('/api/server-providers');
                if (!res.ok) return;
                // Managed providers expose only their allowed model list (LLM/image)
                // and presence (the "managed" flag) — never a base URL.
                const data = await res.json();
                set((state)=>{
                    // Merge LLM providers
                    const newProvidersConfig = {
                        ...state.providersConfig
                    };
                    // First reset all server flags
                    for (const pid of Object.keys(newProvidersConfig)){
                        const key = pid;
                        if (newProvidersConfig[key]) {
                            newProvidersConfig[key] = {
                                ...newProvidersConfig[key],
                                isServerConfigured: false,
                                serverModels: undefined
                            };
                        }
                    }
                    // Set flags for server-configured providers
                    for (const [pid, info] of Object.entries(data.providers)){
                        const key = pid;
                        if (newProvidersConfig[key]) {
                            const currentModels = newProvidersConfig[key].models;
                            // When server specifies allowed models, filter the models list
                            // while preserving custom IDs from env/YAML in server order.
                            const currentModelMap = new Map(currentModels.map((m)=>[
                                    m.id,
                                    m
                                ]));
                            const filteredModels = info.models?.length ? info.models.map((id)=>currentModelMap.get(id) ?? {
                                    id,
                                    name: id
                                }) : currentModels;
                            newProvidersConfig[key] = {
                                ...newProvidersConfig[key],
                                isServerConfigured: true,
                                serverModels: info.models,
                                models: filteredModels
                            };
                        }
                    }
                    // Merge TTS providers. Reset both server flags first, then apply:
                    // an entry with `disabled` is force-off (server precedence) and is
                    // NOT treated as managed/configured; any other entry is managed.
                    const newTTSConfig = {
                        ...state.ttsProvidersConfig
                    };
                    for (const pid of Object.keys(newTTSConfig)){
                        const key = pid;
                        if (newTTSConfig[key]) {
                            newTTSConfig[key] = {
                                ...newTTSConfig[key],
                                isServerConfigured: false,
                                serverDisabled: false
                            };
                        }
                    }
                    for (const [pid, info] of Object.entries(data.tts)){
                        const key = pid;
                        if (newTTSConfig[key]) {
                            newTTSConfig[key] = {
                                ...newTTSConfig[key],
                                isServerConfigured: !info.disabled,
                                serverDisabled: info.disabled === true
                            };
                        }
                    }
                    // Merge ASR providers
                    const newASRConfig = {
                        ...state.asrProvidersConfig
                    };
                    for (const pid of Object.keys(newASRConfig)){
                        const key = pid;
                        if (newASRConfig[key]) {
                            newASRConfig[key] = {
                                ...newASRConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.asr)){
                        const key = pid;
                        if (newASRConfig[key]) {
                            newASRConfig[key] = {
                                ...newASRConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge PDF providers
                    const newPDFConfig = {
                        ...state.pdfProvidersConfig
                    };
                    for (const pid of Object.keys(newPDFConfig)){
                        const key = pid;
                        if (newPDFConfig[key]) {
                            newPDFConfig[key] = {
                                ...newPDFConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.pdf)){
                        const key = pid;
                        if (newPDFConfig[key]) {
                            newPDFConfig[key] = {
                                ...newPDFConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge Image providers
                    const newImageConfig = {
                        ...state.imageProvidersConfig
                    };
                    for (const pid of Object.keys(newImageConfig)){
                        const key = pid;
                        if (newImageConfig[key]) {
                            newImageConfig[key] = {
                                ...newImageConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    for (const pid of Object.keys(data.image)){
                        const key = pid;
                        if (newImageConfig[key]) {
                            newImageConfig[key] = {
                                ...newImageConfig[key],
                                isServerConfigured: true
                            };
                        }
                    }
                    // Merge Video providers
                    const newVideoConfig = {
                        ...state.videoProvidersConfig
                    };
                    for (const pid of Object.keys(newVideoConfig)){
                        const key = pid;
                        if (newVideoConfig[key]) {
                            newVideoConfig[key] = {
                                ...newVideoConfig[key],
                                isServerConfigured: false
                            };
                        }
                    }
                    if (data.video) {
                        for (const pid of Object.keys(data.video)){
                            const key = pid;
                            if (newVideoConfig[key]) {
                                newVideoConfig[key] = {
                                    ...newVideoConfig[key],
                                    isServerConfigured: true
                                };
                            }
                        }
                    }
                    // Merge Web Search config — reset all first, then mark server-configured
                    const newWebSearchConfig = {
                        ...state.webSearchProvidersConfig
                    };
                    for (const key of Object.keys(newWebSearchConfig)){
                        newWebSearchConfig[key] = {
                            ...newWebSearchConfig[key],
                            isServerConfigured: false
                        };
                    }
                    if (data.webSearch) {
                        for (const pid of Object.keys(data.webSearch)){
                            const key = pid;
                            if (newWebSearchConfig[key]) {
                                newWebSearchConfig[key] = {
                                    ...newWebSearchConfig[key],
                                    isServerConfigured: true
                                };
                            }
                        }
                    }
                    // === Validate current selections against updated configs ===
                    // Build fallback: server-configured first, then client-key-only
                    const buildFallback = (config)=>[
                            // Server-disabled providers (TTS only) are never fallback targets.
                            ...Object.entries(config).filter(([, c])=>c.isServerConfigured && !c.serverDisabled).map(([id])=>id),
                            ...Object.entries(config).filter(([, c])=>!c.isServerConfigured && !c.serverDisabled && !!c.apiKey).map(([id])=>id)
                        ];
                    const llmFallback = buildFallback(newProvidersConfig);
                    const ttsFallback = buildFallback(newTTSConfig);
                    const asrFallback = buildFallback(newASRConfig);
                    const pdfFallback = buildFallback(newPDFConfig);
                    const imageFallback = buildFallback(newImageConfig);
                    const videoFallback = buildFallback(newVideoConfig);
                    const webSearchFallback = buildFallback(newWebSearchConfig);
                    let validLLMProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.providerId, newProvidersConfig, llmFallback);
                    const validTTSProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.ttsProviderId, newTTSConfig, ttsFallback, 'browser-native-tts');
                    const validASRProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.asrProviderId, newASRConfig, asrFallback, 'browser-native');
                    const validPDFProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.pdfProviderId, newPDFConfig, pdfFallback, 'unpdf');
                    let validImageProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.imageProviderId, newImageConfig, imageFallback);
                    let validVideoProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.videoProviderId, newVideoConfig, videoFallback);
                    const validWebSearchProvider = (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .validateProvider */ .e3)(state.webSearchProviderId, newWebSearchConfig, webSearchFallback, 'tavily');
                    // Auto-recover: when the selected provider is empty/unusable but
                    // a usable one exists, adopt the first usable fallback. Applied
                    // symmetrically to LLM/image/video so that "usable provider ⇒ a
                    // concrete model is selected" holds for every modality (#580).
                    if (!validLLMProvider && llmFallback.length > 0) {
                        validLLMProvider = llmFallback[0];
                    }
                    if (!validImageProvider && imageFallback.length > 0) {
                        validImageProvider = imageFallback[0];
                    }
                    if (!validVideoProvider && videoFallback.length > 0) {
                        validVideoProvider = videoFallback[0];
                    }
                    // Resolve the model in the same place the provider is resolved.
                    // resolveSelectedModel never yields '' when the provider has ≥1
                    // model, so a usable provider can never settle with an empty model.
                    const llmModels = validLLMProvider ? newProvidersConfig[validLLMProvider]?.models ?? [] : [];
                    const validLLMModel = validLLMProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.modelId, llmModels) : '';
                    const imageModels = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[validImageProvider]?.models ?? [];
                    const validImageModel = validImageProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.imageModelId, imageModels) : '';
                    const videoModels = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[validVideoProvider]?.models ?? [];
                    const validVideoModel = validVideoProvider ? (0,_lib_store_settings_validation__WEBPACK_IMPORTED_MODULE_9__/* .resolveSelectedModel */ .zE)(state.videoModelId, videoModels) : '';
                    const validTTSVoice = validTTSProvider !== state.ttsProviderId ? _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[validTTSProvider] || 'default' : state.ttsVoice;
                    // Auto-disable image/video generation when no provider is usable
                    const shouldDisableImage = !validImageProvider && state.imageGenerationEnabled;
                    const shouldDisableVideo = !validVideoProvider && state.videoGenerationEnabled;
                    // === Auto-select / auto-enable (only on first run) ===
                    let autoTtsProvider;
                    let autoTtsVoice;
                    let autoAsrProvider;
                    let autoPdfProvider;
                    let autoImageProvider;
                    let autoImageModel;
                    let autoVideoProvider;
                    let autoVideoModel;
                    let autoImageEnabled;
                    let autoVideoEnabled;
                    let autoTtsEnabled;
                    if (!state.autoConfigApplied) {
                        // PDF: unpdf → mineru-cloud or mineru if server has it
                        if (state.pdfProviderId === 'unpdf') {
                            if (newPDFConfig['mineru-cloud']?.isServerConfigured) {
                                autoPdfProvider = 'mineru-cloud';
                            } else if (newPDFConfig.mineru?.isServerConfigured) {
                                autoPdfProvider = 'mineru';
                            }
                        }
                        // TTS: select first server provider if current is not server-configured.
                        // Skip server-disabled entries — they are force-off, not selectable.
                        const serverTtsIds = Object.entries(data.tts).filter(([, info])=>!info.disabled).map(([id])=>id);
                        if (serverTtsIds.length > 0 && !newTTSConfig[state.ttsProviderId]?.isServerConfigured) {
                            autoTtsProvider = serverTtsIds[0];
                            autoTtsVoice = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .DEFAULT_TTS_VOICES */ .S5[autoTtsProvider] || 'default';
                        }
                        // Auto-enable TTS on first run when a server provider exists
                        // (mirrors image/video). No provider ⇒ stays off + CTA.
                        if (serverTtsIds.length > 0 && !state.ttsEnabled) {
                            autoTtsEnabled = true;
                        }
                        // ASR: select first server provider if current is not server-configured
                        const serverAsrIds = Object.keys(data.asr);
                        if (serverAsrIds.length > 0 && !newASRConfig[state.asrProviderId]?.isServerConfigured) {
                            autoAsrProvider = serverAsrIds[0];
                        }
                        // Image: first server provider
                        const serverImageIds = Object.keys(data.image);
                        if (serverImageIds.length > 0 && !newImageConfig[state.imageProviderId]?.isServerConfigured) {
                            autoImageProvider = serverImageIds[0];
                            const models = _lib_media_image_provider_registry__WEBPACK_IMPORTED_MODULE_4__/* .IMAGE_PROVIDERS */ .D[autoImageProvider]?.models;
                            if (models?.length) autoImageModel = models[0].id;
                        }
                        if (serverImageIds.length > 0 && !state.imageGenerationEnabled) {
                            autoImageEnabled = true;
                        }
                        // Video: first server provider
                        const serverVideoIds = Object.keys(data.video || {});
                        if (serverVideoIds.length > 0 && !newVideoConfig[state.videoProviderId]?.isServerConfigured) {
                            autoVideoProvider = serverVideoIds[0];
                            const models = _lib_media_video_provider_registry__WEBPACK_IMPORTED_MODULE_5__/* .VIDEO_PROVIDERS */ .l[autoVideoProvider]?.models;
                            if (models?.length) autoVideoModel = models[0].id;
                        }
                        if (serverVideoIds.length > 0 && !state.videoGenerationEnabled) {
                            autoVideoEnabled = true;
                        }
                    }
                    // (LLM first-load auto-select removed: the symmetric provider
                    // recovery + resolveSelectedModel above now resolve LLM provider
                    // and model atomically at the source, covering server-configured
                    // AND client-API-key providers — see #580.)
                    return {
                        providersConfig: newProvidersConfig,
                        ttsProvidersConfig: newTTSConfig,
                        asrProvidersConfig: newASRConfig,
                        pdfProvidersConfig: newPDFConfig,
                        imageProvidersConfig: newImageConfig,
                        videoProvidersConfig: newVideoConfig,
                        webSearchProvidersConfig: newWebSearchConfig,
                        // Already clamped server-side (getParallelSceneConcurrency); this
                        // re-clamp is intentional belt-and-suspenders against a malformed
                        // response. The consumer (use-scene-generator) clamps once more.
                        parallelSceneConcurrency: Math.max(0, Math.floor(data.generation?.parallelSceneConcurrency ?? 0)),
                        autoConfigApplied: true,
                        // Validated selections
                        ...validLLMProvider !== state.providerId && {
                            providerId: validLLMProvider
                        },
                        ...validLLMModel !== state.modelId && {
                            modelId: validLLMModel
                        },
                        ...validTTSProvider !== state.ttsProviderId && {
                            ttsProviderId: validTTSProvider,
                            ttsVoice: validTTSVoice
                        },
                        ...validASRProvider !== state.asrProviderId && {
                            asrProviderId: validASRProvider
                        },
                        ...validPDFProvider !== state.pdfProviderId && {
                            pdfProviderId: validPDFProvider
                        },
                        ...validWebSearchProvider !== state.webSearchProviderId && {
                            webSearchProviderId: validWebSearchProvider
                        },
                        ...validImageProvider !== state.imageProviderId && {
                            imageProviderId: validImageProvider
                        },
                        ...validImageModel !== state.imageModelId && {
                            imageModelId: validImageModel
                        },
                        ...validVideoProvider !== state.videoProviderId && {
                            videoProviderId: validVideoProvider
                        },
                        ...validVideoModel !== state.videoModelId && {
                            videoModelId: validVideoModel
                        },
                        ...shouldDisableImage && {
                            imageGenerationEnabled: false
                        },
                        ...shouldDisableVideo && {
                            videoGenerationEnabled: false
                        },
                        // First-run auto-select overrides validation (autoConfigApplied guard).
                        // On first sync, auto-select picks the best provider. On subsequent syncs,
                        // auto* variables stay undefined so only validation spreads take effect.
                        ...autoPdfProvider && {
                            pdfProviderId: autoPdfProvider
                        },
                        ...autoTtsProvider && {
                            ttsProviderId: autoTtsProvider,
                            ttsVoice: autoTtsVoice
                        },
                        ...autoAsrProvider && {
                            asrProviderId: autoAsrProvider
                        },
                        ...autoImageProvider && {
                            imageProviderId: autoImageProvider
                        },
                        ...autoImageModel && {
                            imageModelId: autoImageModel
                        },
                        ...autoVideoProvider && {
                            videoProviderId: autoVideoProvider
                        },
                        ...autoVideoModel && {
                            videoModelId: autoVideoModel
                        },
                        ...autoImageEnabled !== undefined && {
                            imageGenerationEnabled: autoImageEnabled
                        },
                        ...autoVideoEnabled !== undefined && {
                            videoGenerationEnabled: autoVideoEnabled
                        },
                        ...autoTtsEnabled !== undefined && {
                            ttsEnabled: autoTtsEnabled
                        }
                    };
                });
            } catch (e) {
                // Silently fail — server providers are optional
                log.warn('Failed to fetch server providers:', e);
            }
        }
    };
}, {
    name: 'settings-storage',
    version: 4,
    // Migrate persisted state
    migrate: (persistedState, version)=>{
        const state = persistedState;
        // v0 → v1: clear hardcoded default model so user must actively select
        if (version === 0) {
            if (state.providerId === 'openai' && state.modelId === 'gpt-4o-mini') {
                state.modelId = '';
            }
        }
        // Ensure providersConfig has all built-in providers (also in merge below)
        ensureBuiltInProviders(state);
        promoteLegacyCustomProviderBaseUrls(state);
        // Ensure image/video configs have all built-in providers
        ensureBuiltInImageProviders(state);
        ensureBuiltInVideoProviders(state);
        // Migrate from old ttsModel to new ttsProviderId
        if (state.ttsModel && !state.ttsProviderId) {
            // Map old ttsModel values to new ttsProviderId
            if (state.ttsModel === 'openai-tts') {
                state.ttsProviderId = 'openai-tts';
            } else if (state.ttsModel === 'azure-tts') {
                state.ttsProviderId = 'azure-tts';
            } else {
                // Default to OpenAI
                state.ttsProviderId = 'openai-tts';
            }
        }
        // Add default audio config if missing
        if (!state.ttsProvidersConfig || !state.asrProvidersConfig) {
            const defaultAudioConfig = getDefaultAudioConfig();
            Object.assign(state, defaultAudioConfig);
        }
        ensureBuiltInAudioProviders(state);
        ensureBuiltInWebSearchProviders(state);
        // Migrate global ttsModelId to per-provider
        if (state.ttsModelId) {
            const pid = state.ttsProviderId;
            if (pid && state.ttsProvidersConfig?.[pid]) {
                state.ttsProvidersConfig[pid].modelId = state.ttsModelId;
            }
            delete state.ttsModelId;
        }
        // Same for asrModelId
        if (state.asrModelId) {
            const pid = state.asrProviderId;
            if (pid && state.asrProvidersConfig?.[pid]) {
                state.asrProvidersConfig[pid].modelId = state.asrModelId;
            }
            delete state.asrModelId;
        }
        // Migrate MiniMax's model field to modelId
        for (const [, cfg] of Object.entries(state.ttsProvidersConfig || {})){
            if (cfg.model && !cfg.modelId) {
                cfg.modelId = cfg.model;
                delete cfg.model;
            }
        }
        // Add default PDF config if missing
        if (!state.pdfProvidersConfig) {
            const defaultPDFConfig = getDefaultPDFConfig();
            Object.assign(state, defaultPDFConfig);
        }
        // Add default Image config if missing
        if (!state.imageProvidersConfig) {
            const defaultImageConfig = getDefaultImageConfig();
            Object.assign(state, defaultImageConfig);
        }
        // Add default Video config if missing
        if (!state.videoProvidersConfig) {
            const defaultVideoConfig = getDefaultVideoConfig();
            Object.assign(state, defaultVideoConfig);
        }
        // v1 → v2: Replace deep research with web search
        if (version < 2) {
            delete state.deepResearchProviderId;
            delete state.deepResearchProvidersConfig;
        }
        // Add default media generation toggles if missing
        if (state.imageGenerationEnabled === undefined) {
            state.imageGenerationEnabled = false;
        }
        if (state.videoGenerationEnabled === undefined) {
            state.videoGenerationEnabled = false;
        }
        if (state.reviewOutlineEnabled === undefined) {
            state.reviewOutlineEnabled = false;
        }
        // Add default audio toggles if missing. TTS defaults OFF (opt-in / CTA);
        // first server-sync auto-enables it when a provider is configured (#665).
        if (state.ttsEnabled === undefined) {
            state.ttsEnabled = false;
        }
        if (state.asrEnabled === undefined) {
            state.asrEnabled = true;
        }
        // Existing users already have their config set up — mark auto-config as done
        if (state.autoConfigApplied === undefined) {
            state.autoConfigApplied = true;
        }
        if (state.agentMode === undefined) {
            state.agentMode = 'preset';
        }
        if (state.autoAgentCount === undefined) {
            state.autoAgentCount = 3;
        }
        if (state.thinkingConfigs === undefined) {
            state.thinkingConfigs = {};
        }
        // Migrate Web Search: old flat fields → new provider-based config
        if (!state.webSearchProvidersConfig) {
            const stateRecord = state;
            const oldApiKey = stateRecord.webSearchApiKey || '';
            const oldIsServerConfigured = stateRecord.webSearchIsServerConfigured || false;
            state.webSearchProviderId = 'tavily';
            state.webSearchProvidersConfig = {
                tavily: {
                    apiKey: oldApiKey,
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true,
                    isServerConfigured: oldIsServerConfigured
                },
                bocha: {
                    apiKey: '',
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true
                },
                brave: {
                    apiKey: '',
                    baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.brave.defaultBaseUrl || '',
                    enabled: true,
                    requiresApiKey: false
                },
                baidu: {
                    apiKey: '',
                    baseUrl: '',
                    enabled: true,
                    requiresApiKey: true
                },
                minimax: {
                    apiKey: '',
                    baseUrl: _lib_web_search_constants__WEBPACK_IMPORTED_MODULE_6__/* .WEB_SEARCH_PROVIDERS */ .Vf.minimax.defaultBaseUrl || '',
                    enabled: true,
                    requiresApiKey: true
                }
            };
            delete stateRecord.webSearchApiKey;
            delete stateRecord.webSearchIsServerConfigured;
        }
        // v2 → v3: managed providers no longer expose a base URL to the client;
        // drop any persisted serverBaseUrl left over from older versions (#620).
        stripLegacyServerBaseUrl(state);
        // v3 → v4: the per-provider `enabled` flag becomes live under the
        // unified enablement model (#665). Before v4 it was never user-editable,
        // so any persisted value is just a stale default — normalize it:
        // browser-native OFF (opt-in), every other built-in ON (it only surfaces
        // once configured, so a server-managed provider must not stay hidden).
        if (version < 4 && state.ttsProvidersConfig) {
            for (const pid of Object.keys(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_1__/* .TTS_PROVIDERS */ .JF)){
                const cfg = state.ttsProvidersConfig[pid];
                if (cfg) cfg.enabled = pid !== 'browser-native-tts';
            }
        }
        ensureValidProviderSelections(state);
        ensureBuiltInAudioProviders(state);
        ensureBuiltInWebSearchProviders(state);
        state.thinkingConfigs = pruneThinkingConfigs(state.thinkingConfigs, state.providersConfig);
        return state;
    },
    // Custom merge: always sync built-in providers on every rehydrate,
    // so newly added providers/models appear without clearing cache.
    merge: (persistedState, currentState)=>{
        const merged = {
            ...currentState,
            ...persistedState
        };
        ensureBuiltInProviders(merged);
        promoteLegacyCustomProviderBaseUrls(merged);
        ensureBuiltInAudioProviders(merged);
        ensureBuiltInImageProviders(merged);
        ensureBuiltInVideoProviders(merged);
        ensureBuiltInWebSearchProviders(merged);
        ensureValidProviderSelections(merged);
        stripLegacyServerBaseUrl(merged);
        const typedMerged = merged;
        typedMerged.thinkingConfigs = pruneThinkingConfigs(typedMerged.thinkingConfigs, typedMerged.providersConfig);
        return merged;
    }
}));


/***/ }),

/***/ 167324:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   clearDatabase: () => (/* binding */ clearDatabase),
/* harmony export */   db: () => (/* binding */ db),
/* harmony export */   deleteStageWithRelatedData: () => (/* binding */ deleteStageWithRelatedData),
/* harmony export */   exportDatabase: () => (/* binding */ exportDatabase),
/* harmony export */   getDatabaseStats: () => (/* binding */ getDatabaseStats),
/* harmony export */   getGeneratedAgentsByStageId: () => (/* binding */ getGeneratedAgentsByStageId),
/* harmony export */   getScenesByStageId: () => (/* binding */ getScenesByStageId),
/* harmony export */   importDatabase: () => (/* binding */ importDatabase),
/* harmony export */   initDatabase: () => (/* binding */ initDatabase),
/* harmony export */   mediaFileKey: () => (/* binding */ mediaFileKey)
/* harmony export */ });
/* harmony import */ var dexie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(400513);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(971427);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/database.ts
 *
 * MedQ port of OpenMAIC's Dexie-backed IndexedDB layer.
 *
 * Schema versions 1–11 follow the OpenMAIC source so that a database created by
 * OpenMAIC can be opened by MedQ (and vice-versa) without an upgrade path that
 * would wipe user data. The schema is the union of the tables actually consumed
 * by the ported zustand stores (`lib/store/*`) and the ported util modules
 * (`lib/utils/{audio-player,chat-storage,image-storage,playback-storage,
 * stage-storage}.ts`).
 */ 

const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('Database');
/** Build the compound primary key for mediaFiles: `${stageId}:${elementId}` */ function mediaFileKey(stageId, elementId) {
    return `${stageId}:${elementId}`;
}
// ==================== Database Definition ====================
const DATABASE_NAME = 'MAIC-Database';
/**
 * MAIC Database Instance (MedQ).
 *
 * Schema versions are kept aligned with OpenMAIC's upstream history so the same
 * IndexedDB instance is forward/backward-compatible.
 */ class MAICDatabase extends dexie__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Ay {
    constructor(){
        super(DATABASE_NAME);
        // Version 1: Initial schema
        this.version(1).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id'
        });
        // Version 2: Remove unused tables
        this.version(2).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            messages: null,
            participants: null,
            discussions: null,
            sceneSnapshots: null
        });
        // Version 3: Add chatSessions and playbackState tables
        this.version(3).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId'
        });
        // Version 4: Add stageOutlines table for resume-on-refresh
        this.version(4).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId'
        });
        // Version 5: Add mediaFiles table for async media generation
        this.version(5).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]'
        });
        // Version 6: Fix mediaFiles primary key — use compound key stageId:elementId
        this.version(6).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]'
        }).upgrade(async (tx)=>{
            const table = tx.table('mediaFiles');
            const allRecords = await table.toArray();
            for (const rec of allRecords){
                const newKey = `${rec.stageId}:${rec.id}`;
                // Skip if already migrated (idempotent)
                if (rec.id.includes(':')) continue;
                await table.delete(rec.id);
                await table.put({
                    ...rec,
                    id: newKey
                });
            }
        });
        // Version 7: Add ossKey fields to mediaFiles and audioFiles for OSS storage plugin
        this.version(7).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]'
        });
        // Version 8: Add generatedAgents table for AI-generated agent profiles
        this.version(8).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]',
            generatedAgents: 'id, stageId'
        });
        // Version 9: Migrate legacy `language` field to `languageDirective`
        const LOCALE_TO_DIRECTIVE = {
            'zh-CN': 'Deliver the entire course in Chinese (Simplified, zh-CN).',
            'en-US': 'Deliver the entire course in English (en-US).',
            'ja-JP': 'Deliver the entire course in Japanese (ja-JP).',
            'ru-RU': 'Deliver the entire course in Russian (ru-RU).'
        };
        this.version(9).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]',
            generatedAgents: 'id, stageId'
        }).upgrade(async (tx)=>{
            const table = tx.table('stages');
            await table.toCollection().modify((stage)=>{
                const lang = stage.language;
                if (lang && !stage.languageDirective) {
                    stage.languageDirective = LOCALE_TO_DIRECTIVE[lang] || `Deliver the entire course in ${lang}.`;
                }
                delete stage.language;
            });
        });
        // Version 10: Add browser-local voice profiles for serverless TTS voice storage.
        this.version(10).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]',
            generatedAgents: 'id, stageId',
            voiceProfiles: 'id, providerId, kind, updatedAt'
        });
        // Version 11: Add auto-voice reference-clip cache (provider-neutral register-by-id).
        this.version(11).stores({
            stages: 'id, updatedAt',
            scenes: 'id, stageId, order, [stageId+order]',
            audioFiles: 'id, createdAt',
            imageFiles: 'id, createdAt',
            snapshots: '++id',
            chatSessions: 'id, stageId, [stageId+createdAt]',
            playbackState: 'stageId',
            stageOutlines: 'stageId',
            mediaFiles: 'id, stageId, [stageId+type]',
            generatedAgents: 'id, stageId',
            voiceProfiles: 'id, providerId, kind, updatedAt',
            autoVoiceCache: 'voiceId, updatedAt'
        });
    }
}
// Create database instance
const db = new MAICDatabase();
// ==================== Helper Functions ====================
/**
 * Initialize database
 * Call at application startup
 */ async function initDatabase() {
    try {
        await db.open();
        // Request persistent storage to prevent browser from evicting IndexedDB
        // under storage pressure (large media blobs can trigger LRU cleanup)
        void navigator.storage?.persist?.();
        log.info('Database initialized successfully');
    } catch (error) {
        log.error('Failed to initialize database:', error);
        throw error;
    }
}
/**
 * Clear database (optional)
 * Use with caution: deletes all data
 */ async function clearDatabase() {
    await db.delete();
    log.info('Database cleared');
}
/**
 * Export database contents (for backup)
 */ async function exportDatabase() {
    return {
        stages: await db.stages.toArray(),
        scenes: await db.scenes.toArray(),
        chatSessions: await db.chatSessions.toArray(),
        playbackState: await db.playbackState.toArray()
    };
}
/**
 * Import database contents (for restoring backups)
 */ async function importDatabase(data) {
    await db.transaction('rw', [
        db.stages,
        db.scenes,
        db.chatSessions,
        db.playbackState
    ], async ()=>{
        if (data.stages) await db.stages.bulkPut(data.stages);
        if (data.scenes) await db.scenes.bulkPut(data.scenes);
        if (data.chatSessions) await db.chatSessions.bulkPut(data.chatSessions);
        if (data.playbackState) await db.playbackState.bulkPut(data.playbackState);
    });
    log.info('Database imported successfully');
}
// ==================== Convenience Query Functions ====================
/**
 * Get all scenes for a course
 */ async function getScenesByStageId(stageId) {
    return db.scenes.where('stageId').equals(stageId).sortBy('order');
}
/**
 * Delete a course and all its related data
 */ async function deleteStageWithRelatedData(stageId) {
    await db.transaction('rw', [
        db.stages,
        db.scenes,
        db.chatSessions,
        db.playbackState,
        db.stageOutlines,
        db.mediaFiles,
        db.generatedAgents
    ], async ()=>{
        await db.stages.delete(stageId);
        await db.scenes.where('stageId').equals(stageId).delete();
        await db.chatSessions.where('stageId').equals(stageId).delete();
        await db.playbackState.delete(stageId);
        await db.stageOutlines.delete(stageId);
        await db.mediaFiles.where('stageId').equals(stageId).delete();
        await db.generatedAgents.where('stageId').equals(stageId).delete();
    });
}
/**
 * Get all generated agents for a course
 */ async function getGeneratedAgentsByStageId(stageId) {
    return db.generatedAgents.where('stageId').equals(stageId).toArray();
}
/**
 * Get database statistics
 */ async function getDatabaseStats() {
    return {
        stages: await db.stages.count(),
        scenes: await db.scenes.count(),
        audioFiles: await db.audioFiles.count(),
        imageFiles: await db.imageFiles.count(),
        snapshots: await db.snapshots.count(),
        chatSessions: await db.chatSessions.count(),
        playbackState: await db.playbackState.count(),
        stageOutlines: await db.stageOutlines.count(),
        mediaFiles: await db.mediaFiles.count(),
        generatedAgents: await db.generatedAgents.count()
    };
}


/***/ }),

/***/ 230716:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   E_: () => (/* binding */ useAgentRegistry),
/* harmony export */   saveGeneratedAgents: () => (/* binding */ saveGeneratedAgents)
/* harmony export */ });
/* unused harmony exports DEFAULT_AGENTS, getDefaultAgents, getAgent, listAgents, pickAgentsForScene, agentsToParticipants, loadGeneratedAgentsForStage */
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(469517);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(444244);
/* harmony import */ var _lib_store_user_profile__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(696582);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/orchestration/registry/{types,store}.ts
 *
 * Agent Registry — reconciled MedQ adaptation of OpenMAIC's registry.
 *
 * OpenMAIC uses a Zustand-persisted client-side registry (with localStorage
 * sync, IndexedDB for generated agents, voice-config management, and a
 * participant-mapping helper for the roundtable UI). MedQ is server-only and
 * stateless, so this file keeps OpenMAIC's AgentConfig type verbatim (from
 * `./types`) and the six default agent personas verbatim, but drops:
 *   - Zustand `persist` middleware (no client-side persistence)
 *   - IndexedDB generated-agent persistence (no Dexie)
 *   - `agentsToParticipants` (MedQ has no roundtable UI)
 *   - Voice-config warm-up (MedQ uses ZAI TTS via /api/voice-tts)
 *
 * What's preserved verbatim from OpenMAIC:
 *   - The six default agent personas (AI teacher / AI助教 / 显眼包 / 好奇宝宝 /
 *     笔记员 / 思考者) — these are the real IP, ported word-for-word.
 *   - The AgentConfig shape and role→action mapping.
 *
 * What's added for MedQ:
 *   - `getDefaultAgents()`, `getAgent()`, `listAgents()`, `pickAgentsForScene()`
 *     — plain server-side helpers (OpenMAIC's are Zustand-bound).
 *   - `AgentInfo` — lightweight pipeline type.
 *   - `useAgentRegistry` — minimal Zustand store shim that satisfies the
 *     `useAgentRegistry.getState().getAgent(id)` call pattern used by ported
 *     director-graph.ts. Stateless (no persist) — agent overrides travel with
 *     the request via `request.config.agentConfigs`.
 *
 * The personas are the source of truth. Names are left in their original
 * language (translated to English in this MedQ fork for consistency with the
 * rest of the MedQ UI) so the AI speaks naturally.
 */ 
// Re-export everything from ./types so callers can import from either path.

/* ──────────────── Default agents (ported verbatim from OpenMAIC) ──────────────── */ const now = ()=>new Date();
const DEFAULT_AGENTS = {
    'default-1': {
        id: 'default-1',
        name: 'AI Teacher',
        role: 'teacher',
        persona: `You are the lead teacher of this classroom. You teach with clarity, warmth, and genuine enthusiasm for the subject matter.

Your teaching style:
- Explain concepts step by step, building from what students already know
- Use vivid analogies, real-world examples, and visual aids to make abstract ideas concrete
- Pause to check understanding — ask questions, not just lecture
- Adapt your pace: slow down for difficult parts, move briskly through familiar ground
- Encourage students by name when they contribute, and gently correct mistakes without embarrassment

You can spotlight or laser-point at slide elements, and use the whiteboard for hand-drawn explanations. Use these actions naturally as part of your teaching flow. Never announce your actions; just teach.

Tone: Professional yet approachable. Patient. Encouraging. You genuinely care about whether students understand.`,
        avatar: '/avatars/teacher.png',
        color: '#3b82f6',
        allowedActions: [
            'spotlight',
            'laser',
            'play_video',
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 10,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    },
    'default-2': {
        id: 'default-2',
        name: 'AI TA',
        role: 'assistant',
        persona: `You are the teaching assistant. You support the lead teacher by filling in gaps, answering side questions, and making sure no student is left behind.

Your style:
- When a student is confused, rephrase the teacher's explanation in simpler terms or from a different angle
- Provide concrete examples, especially practical or everyday ones that make concepts relatable
- Proactively offer background context that the teacher might skip over
- Summarize key takeaways after complex explanations
- You can use the whiteboard to sketch quick clarifications when needed

You play a supportive role — you don't take over the lesson, but you make sure everyone keeps up.

Tone: Friendly, warm, down-to-earth. Like a helpful older classmate who just "gets it."`,
        avatar: '/avatars/assist.png',
        color: '#10b981',
        allowedActions: [
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 7,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    },
    'default-3': {
        id: 'default-3',
        name: 'Class Clown',
        role: 'student',
        persona: `You are the class clown — the student everyone notices. You bring energy and laughter to the classroom with your witty comments, playful observations, and unexpected takes on the material.

Your personality:
- You crack jokes and make humorous connections to the topic being discussed
- You sometimes exaggerate your confusion for comedic effect, but you're actually paying attention
- You use pop culture references, memes, and funny analogies
- You're not disruptive — your humor makes the class more engaging and helps everyone relax
- Occasionally you stumble onto surprisingly insightful points through your jokes

You keep things light. When the class gets too heavy or boring, you're the one who livens it up. But you also know when to dial it back during serious moments.

Tone: Playful, energetic, a little cheeky. You speak casually, like you're chatting with friends. Keep responses SHORT — one-liners and quick reactions, not paragraphs.`,
        avatar: '/avatars/clown.png',
        color: '#f59e0b',
        allowedActions: [
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 4,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    },
    'default-4': {
        id: 'default-4',
        name: 'Curious Student',
        role: 'student',
        persona: `You are the endlessly curious student. You always have a question — and your questions often push the whole class to think deeper.

Your personality:
- You ask "why" and "how" constantly — not to be annoying, but because you genuinely want to understand
- You notice details others miss and ask about edge cases, exceptions, and connections to other topics
- You're not afraid to say "I don't get it" — your honesty helps other students who were too shy to ask
- You get excited when you learn something new and express that enthusiasm openly
- You sometimes ask questions that are slightly ahead of the current topic, pulling the discussion forward

You represent the voice of genuine curiosity. Your questions make the teacher's explanations better for everyone.

Tone: Eager, enthusiastic, occasionally puzzled. You speak with the excitement of someone discovering things for the first time. Keep questions concise and direct.`,
        avatar: '/avatars/curious.png',
        color: '#ec4899',
        allowedActions: [
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 5,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    },
    'default-5': {
        id: 'default-5',
        name: 'Note Taker',
        role: 'student',
        persona: `You are the dedicated note-taker of the class. You listen carefully, organize information, and love sharing your structured summaries with everyone.

Your personality:
- You naturally distill complex explanations into clear, organized bullet points
- After a key concept is taught, you offer a quick summary or recap for the class
- You use the whiteboard to write down key formulas, definitions, or structured outlines
- You notice when something important was said but might have been missed, and you flag it
- You occasionally ask the teacher to clarify something so your notes are accurate

You're the student everyone wants to sit next to during exams. Your notes are legendary.

Tone: Organized, helpful, slightly studious. You speak clearly and precisely. When sharing notes, use structured formats — numbered lists, key terms bolded, clear headers.`,
        avatar: '/avatars/note-taker.png',
        color: '#06b6d4',
        allowedActions: [
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 5,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    },
    'default-6': {
        id: 'default-6',
        name: 'Deep Thinker',
        role: 'student',
        persona: `You are the deep thinker of the class. While others focus on understanding the basics, you're already connecting ideas, questioning assumptions, and exploring implications.

Your personality:
- You make unexpected connections between the current topic and other fields or concepts
- You challenge ideas respectfully — "But what if..." and "Doesn't that contradict..." are your signature phrases
- You think about the bigger picture: philosophical implications, real-world consequences, ethical dimensions
- You sometimes play devil's advocate to push the discussion deeper
- Your contributions often spark the most interesting class discussions

You don't speak as often as others, but when you do, it changes the direction of the conversation. You value depth over breadth.

Tone: Thoughtful, measured, intellectually curious. You pause before speaking. Your sentences are deliberate and carry weight. Ask provocative questions that make everyone stop and think.`,
        avatar: '/avatars/thinker.png',
        color: '#8b5cf6',
        allowedActions: [
            'wb_open',
            'wb_close',
            'wb_draw_text',
            'wb_draw_shape',
            'wb_draw_chart',
            'wb_draw_latex',
            'wb_draw_table',
            'wb_draw_line',
            'wb_draw_code',
            'wb_edit_code',
            'wb_clear',
            'wb_delete'
        ],
        priority: 6,
        createdAt: now(),
        updatedAt: now(),
        isDefault: true
    }
};
/** Return all default agents as lightweight AgentInfo objects. */ function getDefaultAgents() {
    return Object.values(DEFAULT_AGENTS).map((a)=>({
            id: a.id,
            name: a.name,
            role: a.role,
            persona: a.persona
        }));
}
/** Look up a single agent by id. */ function getAgent(id) {
    return DEFAULT_AGENTS[id];
}
/** Return all default agents. */ function listAgents() {
    return Object.values(DEFAULT_AGENTS);
}
/**
 * Pick which agents should participate for a given scene type.
 * - Slides: teacher + TA + 2 students (note-taker + thinker)
 * - Quizzes: teacher + curious student
 * - Interactive: teacher + class clown (to keep it light)
 * - PBL: teacher + TA + deep thinker
 *
 * Heuristic — OpenMAIC's director agent does this dynamically; this is a
 * deterministic fallback when no director is in the loop.
 */ function pickAgentsForScene(sceneType) {
    switch(sceneType){
        case 'quiz':
            return [
                DEFAULT_AGENTS['default-1'],
                DEFAULT_AGENTS['default-4']
            ];
        case 'interactive':
            return [
                DEFAULT_AGENTS['default-1'],
                DEFAULT_AGENTS['default-3']
            ];
        case 'pbl':
            return [
                DEFAULT_AGENTS['default-1'],
                DEFAULT_AGENTS['default-2'],
                DEFAULT_AGENTS['default-6']
            ];
        case 'slide':
        default:
            return [
                DEFAULT_AGENTS['default-1'],
                DEFAULT_AGENTS['default-2'],
                DEFAULT_AGENTS['default-5'],
                DEFAULT_AGENTS['default-6']
            ];
    }
}
const useAgentRegistry = (0,zustand__WEBPACK_IMPORTED_MODULE_1__/* .create */ .v)()((set, get)=>({
        agents: {
            ...DEFAULT_AGENTS
        },
        addAgent: (agent)=>set((state)=>({
                    agents: {
                        ...state.agents,
                        [agent.id]: agent
                    }
                })),
        updateAgent: (id, updates)=>set((state)=>({
                    agents: {
                        ...state.agents,
                        [id]: {
                            ...state.agents[id],
                            ...updates,
                            updatedAt: new Date()
                        }
                    }
                })),
        deleteAgent: (id)=>set((state)=>{
                const { [id]: _removed, ...rest } = state.agents;
                return {
                    agents: rest
                };
            }),
        getAgent: (id)=>get().agents[id],
        listAgents: ()=>Object.values(get().agents)
    }));


/**
 * Map an array of agent IDs to an ordered Participant[] for the roundtable UI.
 * The first agent with role "teacher" (or the highest-priority agent if none
 * is a teacher) becomes the left-side teacher; the rest are students; the
 * signed-in user is always appended last as role "user".
 *
 * Ported verbatim from OpenMAIC lib/orchestration/registry/store.ts.
 */ function agentsToParticipants(agentIds, t) {
    const registry = useAgentRegistry.getState();
    const participants = [];
    let hasTeacher = false;
    // Resolve agents and sort: teacher first (by role then priority desc)
    const resolved = agentIds.map((id)=>registry.getAgent(id)).filter((a)=>a != null);
    resolved.sort((a, b)=>{
        if (a.role === 'teacher' && b.role !== 'teacher') return -1;
        if (a.role !== 'teacher' && b.role === 'teacher') return 1;
        return (b.priority ?? 0) - (a.priority ?? 0);
    });
    for (const agent of resolved){
        let role = 'student';
        if (!hasTeacher) {
            role = 'teacher';
            hasTeacher = true;
        }
        const i18nName = t?.(`settings.agentNames.${agent.id}`);
        const displayName = i18nName && i18nName !== `settings.agentNames.${agent.id}` ? i18nName : agent.name;
        participants.push({
            id: agent.id,
            name: displayName,
            role,
            avatar: agent.avatar,
            isOnline: true,
            isSpeaking: false
        });
    }
    // Always add user participant
    const userProfile = useUserProfileStore.getState();
    const userName = userProfile.nickname || t?.('common.you') || 'You';
    const userAvatar = userProfile.avatar || USER_AVATAR;
    participants.push({
        id: 'user-1',
        name: userName,
        role: 'user',
        avatar: userAvatar,
        isOnline: true,
        isSpeaking: false
    });
    return participants;
}
/**
 * Load generated agents for a stage from the IndexedDB database.
 * Returns an array of agent IDs that were loaded into the registry.
 *
 * Ported from OpenMAIC. MedQ may not have the full Dexie database setup, so
 * this gracefully returns an empty array if the database module is unavailable.
 */ async function loadGeneratedAgentsForStage(stageId) {
    try {
        const { getGeneratedAgentsByStageId } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 167324));
        const records = await getGeneratedAgentsByStageId(stageId);
        const registry = useAgentRegistry.getState();
        // Clear previously loaded generated agents
        const currentAgents = registry.listAgents();
        for (const agent of currentAgents){
            if (agent.isGenerated) {
                registry.deleteAgent(agent.id);
            }
        }
        if (!records || records.length === 0) return [];
        const ids = [];
        for (const record of records){
            const agentConfig = {
                id: record.id,
                name: record.name,
                role: record.role,
                persona: record.persona,
                avatar: record.avatar,
                color: record.color,
                priority: record.priority,
                isGenerated: true,
                voiceConfig: record.voiceConfig,
                voiceDesign: record.voiceDesign
            };
            registry.addAgent(agentConfig);
            ids.push(record.id);
        }
        return ids;
    } catch (e) {
        console.warn('[loadGeneratedAgentsForStage] database unavailable, returning []:', e);
        return [];
    }
}
/**
 * Save generated agents for a stage to the IndexedDB database.
 *
 * Ported from OpenMAIC. Gracefully no-ops if the database module is unavailable.
 */ async function saveGeneratedAgents(stageId, agents) {
    try {
        const { db } = await Promise.resolve(/* import() */).then(__webpack_require__.bind(__webpack_require__, 167324));
        // Clear old generated agents for this stage
        await db.generatedAgents.where('stageId').equals(stageId).delete();
        // Clear from registry
        const registry = useAgentRegistry.getState();
        const currentAgents = registry.listAgents();
        for (const agent of currentAgents){
            if (agent.isGenerated) {
                registry.deleteAgent(agent.id);
            }
        }
        // Save new ones
        const ids = [];
        for (const agent of agents){
            await db.generatedAgents.put({
                ...agent,
                stageId,
                createdAt: new Date()
            });
            ids.push(agent.id);
        }
        return ids;
    } catch (e) {
        console.warn('[saveGeneratedAgents] database unavailable, returning []:', e);
        return [];
    }
}


/***/ }),

/***/ 237403:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   D: () => (/* binding */ IMAGE_PROVIDERS)
/* harmony export */ });
/**
 * Image provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/image-providers.ts: the
 * IMAGE_PROVIDERS config table, with ZERO adapter imports. The dispatchers
 * that call the provider adapters stay in image-providers.ts — the adapters
 * use server-only helpers (openai-image-adapter imports @/lib/server/ssrf-guard,
 * which needs node:dns / node:net for DNS-rebinding protection), and importing
 * them from client modules drags node builtins into browser chunks, which
 * Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)").
 *
 * Client code imports from './image-provider-registry'; server code can use
 * either (image-providers.ts re-exports this registry).
 */ const IMAGE_PROVIDERS = {
    seedream: {
        id: 'seedream',
        name: 'Seedream',
        requiresApiKey: true,
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
        models: [
            {
                id: 'doubao-seedream-5-0-260128',
                name: 'Seedream 5.0 Lite'
            },
            {
                id: 'doubao-seedream-4-5-251128',
                name: 'Seedream 4.5'
            },
            {
                id: 'doubao-seedream-4-0-250828',
                name: 'Seedream 4.0'
            },
            {
                id: 'doubao-seedream-3-0-t2i-250415',
                name: 'Seedream 3.0'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'openai-image': {
        id: 'openai-image',
        name: 'OpenAI Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.openai.com/v1',
        models: [
            {
                id: 'gpt-image-2',
                name: 'GPT Image 2'
            },
            {
                id: 'gpt-image-2-2026-04-21',
                name: 'GPT Image 2 (2026-04-21)'
            },
            {
                id: 'gpt-image-1.5',
                name: 'GPT Image 1.5'
            },
            {
                id: 'gpt-image-1',
                name: 'GPT Image 1'
            },
            {
                id: 'gpt-image-1-mini',
                name: 'GPT Image 1 Mini'
            },
            {
                id: 'chatgpt-image-latest',
                name: 'ChatGPT Image Latest'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'qwen-image': {
        id: 'qwen-image',
        name: 'Qwen Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com',
        models: [
            {
                id: 'qwen-image-2.0-pro',
                name: 'Qwen Image 2.0 Pro'
            },
            {
                id: 'qwen-image-2.0-pro-2026-03-03',
                name: 'Qwen Image 2.0 Pro (2026-03-03)'
            },
            {
                id: 'qwen-image-2.0',
                name: 'Qwen Image 2.0'
            },
            {
                id: 'qwen-image-2.0-2026-03-03',
                name: 'Qwen Image 2.0 (2026-03-03)'
            },
            {
                id: 'qwen-image-max',
                name: 'Qwen Image Max'
            },
            {
                id: 'qwen-image-max-2025-12-30',
                name: 'Qwen Image Max (2025-12-30)'
            },
            {
                id: 'qwen-image-plus',
                name: 'Qwen Image Plus'
            },
            {
                id: 'qwen-image-plus-2026-01-09',
                name: 'Qwen Image Plus (2026-01-09)'
            },
            {
                id: 'qwen-image',
                name: 'Qwen Image'
            },
            {
                id: 'z-image-turbo',
                name: 'Z-Image Turbo'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'nano-banana': {
        id: 'nano-banana',
        name: 'Nano Banana (Gemini)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        models: [
            {
                id: 'gemini-3.1-flash-image-preview',
                name: 'Gemini 3.1 Flash Image (Nano Banana 2)'
            },
            {
                id: 'gemini-3-pro-image-preview',
                name: 'Gemini 3 Pro Image (Nano Banana Pro)'
            },
            {
                id: 'gemini-2.5-flash-image',
                name: 'Gemini 2.5 Flash Image (Nano Banana)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1'
        ]
    },
    'minimax-image': {
        id: 'minimax-image',
        name: 'MiniMax Image',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        models: [
            {
                id: 'image-01',
                name: 'Image 01'
            },
            {
                id: 'image-01-live',
                name: 'Image 01 Live'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    'grok-image': {
        id: 'grok-image',
        name: 'Grok Image (xAI)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.x.ai/v1',
        models: [
            {
                id: 'grok-imagine-image',
                name: 'Grok Imagine Image'
            },
            {
                id: 'grok-imagine-image-pro',
                name: 'Grok Imagine Image Pro'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    },
    lemonade: {
        id: 'lemonade',
        name: 'Lemonade',
        requiresApiKey: false,
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: '/logos/lemonade.svg',
        models: [
            {
                id: 'Qwen-Image-GGUF',
                name: 'Qwen Image GGUF'
            },
            {
                id: 'sd-cpp',
                name: 'Stable Diffusion (sd-cpp)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ],
        maxResolution: {
            width: 1024,
            height: 1024
        }
    },
    zai: {
        id: 'zai',
        name: 'ZAI (built-in)',
        // No USER-supplied key needed — credentials come from the platform
        // (.z-ai-config / ZAI_API_KEY) resolved server-side. This is the
        // out-of-the-box provider on ZAI deployments.
        requiresApiKey: false,
        models: [
            {
                id: 'auto',
                name: 'Auto (platform picks)'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ]
    }
};


/***/ }),

/***/ 245957:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   V9: () => (/* binding */ isTTSProviderConfigured),
/* harmony export */   mO: () => (/* binding */ isTTSProviderEnabled),
/* harmony export */   nH: () => (/* binding */ BROWSER_NATIVE_TTS_PROVIDER_ID)
/* harmony export */ });
/* unused harmony exports listEnabledTTSProviderIds, hasAnyEnabledTTSProvider */
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689355);
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(839323);
/**
 * TTS provider enablement model (#665)
 *
 * A single, framework-agnostic source of truth for "which TTS providers may be
 * used", honored everywhere (voice picker, auto-assignment, fallback, toolbar
 * CTA). It collapses the previously ad-hoc gates in voice-resolver, the
 * hardcoded browser-native branch in the agent UI, and the implicit fallbacks
 * into two layered predicates:
 *
 *   configured  — the provider has a real credential path (server-managed, a
 *                 client API key, or an explicit base URL). browser-native is
 *                 intrinsically configured (it runs in the browser).
 *   enabled     — configured AND not server-disabled AND the user's per-provider
 *                 `enabled` flag is not explicitly false.
 *
 * Server precedence: `serverDisabled` (admin/server-level disable via
 * server-providers.yml / env) forces a provider off regardless of the user
 * toggle.
 *
 * No React, no IO — pure functions over the persisted ttsProvidersConfig slice,
 * so they are trivially unit-testable and safe to import in both client and
 * server code.
 */ 

const BROWSER_NATIVE_TTS_PROVIDER_ID = 'browser-native-tts';
function hasText(value) {
    return !!value && value.trim().length > 0;
}
/**
 * Whether a provider has a usable credential path (is "available").
 *
 * Deliberately does NOT fall back to the registry `defaultBaseUrl`: a keyless
 * local provider (e.g. Lemonade) must be shown only once the operator
 * server-configures it or the user supplies an explicit base URL — otherwise
 * its voices are selectable while nothing is actually running there (#665
 * symptom 1).
 */ function isTTSProviderConfigured(providerId, config) {
    // Browser-native runs in-browser; it never needs a credential path.
    if (providerId === BROWSER_NATIVE_TTS_PROVIDER_ID) return true;
    if (!config) return false;
    if (config.isServerConfigured) return true;
    if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_1__/* .isCustomTTSProvider */ .S)(providerId)) {
        // A custom provider is usable once it has a credential path or any voices
        // the user defined for it (its existing visibility rule).
        return hasText(config.apiKey) || hasText(config.baseUrl) || (config.customVoices?.length ?? 0) > 0;
    }
    const def = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF[providerId];
    if (!def) return false;
    if (def.requiresApiKey) return hasText(config.apiKey);
    // Keyless built-in (VoxCPM, Lemonade): require an EXPLICIT base URL.
    return hasText(config.serverBaseUrl) || hasText(config.baseUrl);
}
/**
 * Whether a provider may be used: configured, not server-disabled, and the
 * user's per-provider `enabled` flag is not explicitly false.
 */ function isTTSProviderEnabled(providerId, config) {
    if (config?.serverDisabled) return false; // server precedence
    if (!isTTSProviderConfigured(providerId, config)) return false;
    return config?.enabled !== false;
}
/**
 * All enabled provider IDs in canonical (deterministic) registry order,
 * built-ins first then custom providers. Includes browser-native only when it
 * is explicitly enabled. Used for the toolbar empty-state CTA decision.
 */ function listEnabledTTSProviderIds(config) {
    const ids = [];
    for (const id of Object.keys(TTS_PROVIDERS)){
        if (isTTSProviderEnabled(id, config[id])) ids.push(id);
    }
    for (const id of Object.keys(config)){
        if (isCustomTTSProvider(id) && isTTSProviderEnabled(id, config[id])) {
            ids.push(id);
        }
    }
    return ids;
}
/** Whether at least one TTS provider (incl. browser-native) is enabled. */ function hasAnyEnabledTTSProvider(config) {
    for (const id of Object.keys(TTS_PROVIDERS)){
        if (isTTSProviderEnabled(id, config[id])) return true;
    }
    for (const id of Object.keys(config)){
        if (isCustomTTSProvider(id) && isTTSProviderEnabled(id, config[id])) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ 260321:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NG: () => (/* binding */ applyModelMetadata)
/* harmony export */ });
/* unused harmony exports getModelMetadataKey, getCatalogThinkingCapability */
function getModelMetadataKey(providerId, modelId) {
    return `${providerId}:${modelId}`;
}
function effortCapability(requestAdapter, effortValues, defaultEffort) {
    return {
        control: 'effort',
        requestAdapter,
        effortValues,
        defaultEffort,
        defaultMode: effortValues.includes('none') ? 'disabled' : 'enabled',
        toggleable: effortValues.includes('none'),
        budgetAdjustable: true,
        defaultEnabled: !effortValues.includes('none')
    };
}
function levelCapability(levelValues, defaultLevel) {
    return {
        control: 'level',
        requestAdapter: 'google',
        levelValues,
        defaultLevel,
        defaultMode: 'enabled',
        toggleable: false,
        budgetAdjustable: true,
        defaultEnabled: true
    };
}
function toggleCapability(requestAdapter, defaultEnabled = true) {
    return {
        control: 'toggle',
        requestAdapter,
        defaultMode: defaultEnabled ? 'enabled' : 'disabled',
        toggleable: true,
        budgetAdjustable: false,
        defaultEnabled
    };
}
function toggleBudgetCapability(requestAdapter, range, defaultEnabled = false, defaultBudgetTokens) {
    return {
        control: 'toggle-budget',
        requestAdapter,
        budgetRange: range,
        defaultBudgetTokens,
        defaultMode: defaultEnabled ? 'enabled' : 'disabled',
        toggleable: true,
        budgetAdjustable: true,
        defaultEnabled
    };
}
function budgetOnlyCapability(requestAdapter, range, defaultBudgetTokens) {
    return {
        control: 'budget-only',
        requestAdapter,
        budgetRange: range,
        defaultBudgetTokens,
        defaultMode: 'enabled',
        toggleable: false,
        budgetAdjustable: true,
        defaultEnabled: true
    };
}
const fixedThinkingCapability = {
    control: 'none',
    requestAdapter: 'none',
    defaultMode: 'enabled',
    toggleable: false,
    budgetAdjustable: false,
    defaultEnabled: true
};
const anthropicManualBudgetByEffort = {
    low: 4096,
    medium: 10240,
    high: 32768,
    max: 64000
};
const anthropicManualEffort = {
    control: 'effort',
    requestAdapter: 'anthropic',
    effortValues: [
        'none',
        'low',
        'medium',
        'high',
        'max'
    ],
    defaultEffort: 'medium',
    defaultMode: 'enabled',
    toggleable: true,
    budgetAdjustable: true,
    defaultEnabled: true,
    anthropicThinking: {
        type: 'enabled',
        budgetByEffort: anthropicManualBudgetByEffort
    }
};
const anthropicAdaptiveEffort = {
    ...anthropicManualEffort,
    anthropicThinking: {
        type: 'adaptive'
    }
};
const anthropicBudget = toggleBudgetCapability('anthropic', {
    min: 1024,
    max: 64000,
    step: 1024
}, false, 1024);
const anthropicOpus47Effort = {
    ...anthropicAdaptiveEffort,
    effortValues: [
        'none',
        'low',
        'medium',
        'high',
        'xhigh',
        'max'
    ]
};
const deepseekEffort = {
    control: 'effort',
    requestAdapter: 'deepseek',
    effortValues: [
        'none',
        'high',
        'max'
    ],
    defaultEffort: 'high',
    defaultMode: 'enabled',
    toggleable: true,
    budgetAdjustable: true,
    defaultEnabled: true
};
const glm52Effort = {
    control: 'effort',
    requestAdapter: 'glm',
    effortValues: [
        'none',
        'minimal',
        'low',
        'medium',
        'high',
        'xhigh',
        'max'
    ],
    defaultEffort: 'max',
    defaultMode: 'enabled',
    toggleable: true,
    budgetAdjustable: true,
    defaultEnabled: true
};
const hunyuanHy3Effort = {
    control: 'effort',
    requestAdapter: 'hunyuan',
    effortValues: [
        'none',
        'low',
        'high'
    ],
    defaultEffort: 'none',
    defaultMode: 'disabled',
    toggleable: true,
    budgetAdjustable: true,
    defaultEnabled: false
};
const lemonadeToggleBudget = toggleBudgetCapability('lemonade', {
    min: 0,
    max: 81920,
    step: 1024,
    disableValue: 0
}, false);
const qwenBudgetEnabled = toggleBudgetCapability('qwen', {
    min: 0,
    max: 81920,
    step: 1024,
    disableValue: 0
}, true);
const qwenBudgetDisabled = toggleBudgetCapability('qwen', {
    min: 0,
    max: 81920,
    step: 1024,
    disableValue: 0
}, false);
const siliconflowBudget = budgetOnlyCapability('siliconflow', {
    min: 128,
    max: 32768,
    step: 1024
}, 4096);
const siliconflowToggleBudget = toggleBudgetCapability('siliconflow', {
    min: 128,
    max: 32768,
    step: 1024,
    disableValue: 0
}, true, 4096);
const doubaoMode = {
    control: 'mode',
    requestAdapter: 'doubao',
    defaultMode: 'auto',
    toggleable: true,
    budgetAdjustable: false,
    defaultEnabled: true
};
const doubaoSeed20Effort = {
    control: 'effort',
    requestAdapter: 'doubao',
    effortValues: [
        'minimal',
        'low',
        'medium',
        'high'
    ],
    defaultEffort: 'medium',
    defaultMode: 'enabled',
    toggleable: true,
    budgetAdjustable: true,
    defaultEnabled: true
};
const minimaxM3Thinking = toggleCapability('anthropic', false);
const THINKING_CAPABILITIES = {
    [getModelMetadataKey('openai', 'gpt-5.5')]: effortCapability('openai', [
        'low',
        'medium',
        'high',
        'xhigh'
    ], 'medium'),
    [getModelMetadataKey('openai', 'gpt-5.4-pro')]: effortCapability('openai', [
        'medium',
        'high',
        'xhigh'
    ], 'medium'),
    [getModelMetadataKey('openai', 'gpt-5.4')]: effortCapability('openai', [
        'none',
        'low',
        'medium',
        'high',
        'xhigh'
    ], 'none'),
    [getModelMetadataKey('openai', 'gpt-5.4-mini')]: effortCapability('openai', [
        'none',
        'low',
        'medium',
        'high',
        'xhigh'
    ], 'none'),
    [getModelMetadataKey('openai', 'gpt-5.4-nano')]: effortCapability('openai', [
        'none',
        'low',
        'medium',
        'high',
        'xhigh'
    ], 'none'),
    [getModelMetadataKey('anthropic', 'claude-opus-4-8')]: anthropicOpus47Effort,
    [getModelMetadataKey('anthropic', 'claude-opus-4-7')]: anthropicOpus47Effort,
    [getModelMetadataKey('anthropic', 'claude-opus-4-6')]: anthropicAdaptiveEffort,
    [getModelMetadataKey('anthropic', 'claude-sonnet-4-6')]: anthropicAdaptiveEffort,
    [getModelMetadataKey('anthropic', 'claude-sonnet-4-5')]: anthropicManualEffort,
    [getModelMetadataKey('anthropic', 'claude-haiku-4-5')]: anthropicBudget,
    [getModelMetadataKey('google', 'gemini-3.5-flash')]: levelCapability([
        'minimal',
        'low',
        'medium',
        'high'
    ], 'medium'),
    [getModelMetadataKey('google', 'gemini-3.1-pro-preview')]: levelCapability([
        'minimal',
        'low',
        'medium',
        'high'
    ], 'high'),
    [getModelMetadataKey('google', 'gemini-3-flash-preview')]: levelCapability([
        'minimal',
        'low',
        'medium',
        'high'
    ], 'high'),
    [getModelMetadataKey('google', 'gemini-2.5-flash')]: toggleBudgetCapability('google', {
        min: 0,
        max: 24576,
        step: 1024,
        allowDynamic: true,
        disableValue: 0
    }, true, -1),
    [getModelMetadataKey('google', 'gemini-2.5-flash-lite')]: toggleBudgetCapability('google', {
        min: 0,
        max: 24576,
        step: 1024,
        allowDynamic: true,
        disableValue: 0
    }, false, 0),
    [getModelMetadataKey('google', 'gemini-2.5-pro')]: budgetOnlyCapability('google', {
        min: 128,
        max: 32768,
        step: 1024,
        allowDynamic: true
    }, -1),
    [getModelMetadataKey('glm', 'glm-5.2')]: glm52Effort,
    [getModelMetadataKey('glm', 'glm-5.1')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-5v-turbo')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-5')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.7')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.7-flashx')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.7-flash')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.6')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.6v')]: toggleCapability('glm'),
    [getModelMetadataKey('glm', 'glm-4.6v-flash')]: toggleCapability('glm'),
    [getModelMetadataKey('qwen', 'qwen3.7-plus')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.7-max')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.6-max-preview')]: qwenBudgetDisabled,
    [getModelMetadataKey('qwen', 'qwen3.6-plus')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.6-plus-2026-04-02')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.6-flash')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.6-flash-2026-04-16')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.6-35b-a3b')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.5-flash')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3.5-plus')]: qwenBudgetEnabled,
    [getModelMetadataKey('qwen', 'qwen3-max')]: qwenBudgetDisabled,
    [getModelMetadataKey('qwen', 'qwen3-vl-plus')]: qwenBudgetDisabled,
    [getModelMetadataKey('deepseek', 'deepseek-v4-pro')]: deepseekEffort,
    [getModelMetadataKey('deepseek', 'deepseek-v4-flash')]: deepseekEffort,
    [getModelMetadataKey('kimi', 'kimi-k2.7-code')]: fixedThinkingCapability,
    [getModelMetadataKey('kimi', 'kimi-k2.7-code-highspeed')]: fixedThinkingCapability,
    [getModelMetadataKey('kimi', 'kimi-k2.6')]: toggleCapability('kimi'),
    [getModelMetadataKey('kimi', 'kimi-k2.5')]: toggleCapability('kimi'),
    [getModelMetadataKey('kimi', 'kimi-k2-thinking')]: toggleCapability('kimi'),
    [getModelMetadataKey('siliconflow', 'deepseek-ai/DeepSeek-R1')]: siliconflowBudget,
    [getModelMetadataKey('siliconflow', 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B')]: siliconflowBudget,
    [getModelMetadataKey('siliconflow', 'Qwen/Qwen3-VL-32B-Instruct')]: siliconflowToggleBudget,
    [getModelMetadataKey('siliconflow', 'THUDM/GLM-4.1V-9B-Thinking')]: siliconflowBudget,
    [getModelMetadataKey('siliconflow', 'THUDM/GLM-Z1-Rumination-32B-0414')]: siliconflowBudget,
    [getModelMetadataKey('doubao', 'doubao-seed-2-0-pro-260215')]: doubaoSeed20Effort,
    [getModelMetadataKey('doubao', 'doubao-seed-2-0-lite-260215')]: doubaoSeed20Effort,
    [getModelMetadataKey('doubao', 'doubao-seed-2-0-mini-260215')]: doubaoSeed20Effort,
    [getModelMetadataKey('doubao', 'doubao-seed-1-8-251228')]: doubaoMode,
    [getModelMetadataKey('openrouter', 'deepseek/deepseek-v4-pro')]: effortCapability('openrouter', [
        'low',
        'medium',
        'high'
    ], 'medium'),
    [getModelMetadataKey('openrouter', 'deepseek/deepseek-v4-flash')]: effortCapability('openrouter', [
        'low',
        'medium',
        'high'
    ], 'medium'),
    [getModelMetadataKey('grok', 'grok-4.20-reasoning')]: fixedThinkingCapability,
    [getModelMetadataKey('grok', 'grok-4.20-multi-agent')]: fixedThinkingCapability,
    [getModelMetadataKey('grok', 'grok-4-1-fast-reasoning')]: fixedThinkingCapability,
    [getModelMetadataKey('minimax', 'MiniMax-M3')]: minimaxM3Thinking,
    [getModelMetadataKey('minimax', 'MiniMax-M2.7')]: fixedThinkingCapability,
    [getModelMetadataKey('tencent-hunyuan', 'hy3-preview')]: hunyuanHy3Effort,
    [getModelMetadataKey('xiaomi', 'mimo-v2.5-pro')]: toggleCapability('xiaomi'),
    [getModelMetadataKey('xiaomi', 'mimo-v2-pro')]: toggleCapability('xiaomi'),
    [getModelMetadataKey('xiaomi', 'mimo-v2.5')]: toggleCapability('xiaomi'),
    [getModelMetadataKey('xiaomi', 'mimo-v2-omni')]: toggleCapability('xiaomi'),
    [getModelMetadataKey('xiaomi', 'mimo-v2-flash')]: toggleCapability('xiaomi'),
    [getModelMetadataKey('lemonade', 'Qwen3-4B-GGUF')]: lemonadeToggleBudget,
    [getModelMetadataKey('lemonade', 'Qwen3.5-4B-GGUF')]: lemonadeToggleBudget,
    [getModelMetadataKey('lemonade', 'gpt-oss-20b')]: lemonadeToggleBudget,
    [getModelMetadataKey('lemonade', 'GPT-OSS-20B-GGUF')]: lemonadeToggleBudget
};
function getCatalogThinkingCapability(providerId, modelId) {
    const exact = THINKING_CAPABILITIES[getModelMetadataKey(providerId, modelId)];
    if (exact) return exact;
    if (providerId === 'lemonade') {
        return lemonadeToggleBudget;
    }
    return undefined;
}
function applyModelMetadata(providers) {
    for (const provider of Object.values(providers)){
        for (const model of provider.models){
            const thinking = getCatalogThinkingCapability(provider.id, model.id);
            if (thinking) {
                model.capabilities = {
                    ...model.capabilities,
                    thinking
                };
            }
        }
    }
}


/***/ }),

/***/ 260388:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I18nProvider: () => (/* binding */ I18nProvider),
/* harmony export */   s: () => (/* binding */ useI18n)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(35915);
/* harmony import */ var _lib_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(354524);
/* harmony import */ var _lib_i18n_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(492340);
/* __next_internal_client_entry_do_not_use__ I18nProvider,useI18n auto */ 




const LOCALE_STORAGE_KEY = 'locale';
/** Match a browser language code (e.g. 'en', 'zh-TW') to a supported locale */ function resolveLocale(lang) {
    // Exact match
    const exact = _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.find((l)=>l.code === lang);
    if (exact) return exact.code;
    // Prefix match: 'en' → 'en-US', 'zh' → 'zh-CN'
    const prefix = lang.split('-')[0].toLowerCase();
    const match = _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .supportedLocales */ .O4.find((l)=>l.code.toLowerCase().startsWith(prefix));
    return match?.code ?? _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
}
const I18nContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)(undefined);
function I18nProvider({ children }) {
    const { t, i18n } = (0,react_i18next__WEBPACK_IMPORTED_MODULE_4__/* .useTranslation */ .B)();
    const locale = i18n.language || _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
    // Detect language after hydration to avoid SSR mismatch.
    // i18next handles fallback automatically: if the detected language
    // has no matching JSON file, it falls back to fallbackLng.
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        try {
            const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
            const raw = stored || navigator.language || _lib_i18n__WEBPACK_IMPORTED_MODULE_2__/* .defaultLocale */ .q;
            const target = resolveLocale(raw);
            if (target !== i18n.language) i18n.changeLanguage(target);
        } catch  {
        // localStorage unavailable, keep default
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    const setLocale = (newLocale)=>{
        i18n.changeLanguage(newLocale);
        try {
            localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
        } catch  {
        // localStorage unavailable
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(I18nContext.Provider, {
        value: {
            locale,
            setLocale,
            t
        },
        children: children
    });
}
function useI18n() {
    const context = (0,react__WEBPACK_IMPORTED_MODULE_1__.useContext)(I18nContext);
    if (!context) {
        throw new Error('useI18n must be used within I18nProvider');
    }
    return context;
}


/***/ }),

/***/ 277819:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ MONO_LOGO_PROVIDERS),
/* harmony export */   x: () => (/* binding */ PROVIDERS)
/* harmony export */ });
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(260321);
/**
 * Pure AI provider CATALOG — client-safe provider/mode data.
 *
 * This module is the dependency-free half of src/lib/ai/providers.ts: the
 * PROVIDERS registry (ids, names, base URLs, logos, model catalogs) and
 * MONO_LOGO_PROVIDERS, plus the shared provider types. It deliberately has
 * ZERO npm runtime imports so browser chunks can use it safely.
 *
 * Why the split exists (2026-11-04): providers.ts imports the Vercel AI SDK
 * ('ai' + the @ai-sdk/* provider packages) for server-side model factories,
 * and @ai-sdk/provider-utils (reached via 'ai') imports node:dns in its
 * safe-node-fetch.ts. OpenMAIC's client settings panels need the provider
 * CATALOG, and importing it from providers.ts dragged the whole SDK — and its
 * node:dns — into the browser chunk graph, which Turbopack refuses to write
 * ("chunking context does not support external modules (request: node:dns)")
 * → GET /ai-classroom panicked with a 500. Client code MUST import from
 * './provider-catalog', never from './providers'; server code can use either
 * (providers.ts re-exports this catalog for backward compatibility).
 */ 
const MONO_LOGO_PROVIDERS = new Set([
    'openai',
    'openrouter',
    'ollama'
]);
/**
 * Provider registry
 */ const PROVIDERS = {
    openai: {
        id: 'openai',
        name: 'OpenAI',
        type: 'openai',
        defaultBaseUrl: 'https://api.openai.com/v1',
        requiresApiKey: true,
        icon: '/logos/openai.svg',
        models: [
            {
                id: 'gpt-5.5',
                name: 'GPT-5.5',
                contextWindow: 1050000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gpt-5.4-pro',
                name: 'GPT-5.4 Pro',
                contextWindow: 1050000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gpt-5.4',
                name: 'GPT-5.4',
                contextWindow: 1050000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'gpt-5.4-mini',
                name: 'GPT-5.4 Mini',
                contextWindow: 400000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'gpt-5.4-nano',
                name: 'GPT-5.4 Nano',
                contextWindow: 400000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            }
        ]
    },
    anthropic: {
        id: 'anthropic',
        name: 'Claude',
        type: 'anthropic',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.anthropic.com/v1',
        icon: '/logos/claude.svg',
        models: [
            {
                id: 'claude-opus-4-8',
                name: 'Claude Opus 4.8',
                contextWindow: 1000000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'claude-opus-4-7',
                name: 'Claude Opus 4.7',
                contextWindow: 1000000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'claude-opus-4-6',
                name: 'Claude Opus 4.6',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'claude-sonnet-4-6',
                name: 'Claude Sonnet 4.6',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'claude-sonnet-4-5',
                name: 'Claude Sonnet 4.5',
                contextWindow: 200000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'claude-haiku-4-5',
                name: 'Claude Haiku 4.5',
                contextWindow: 200000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            }
        ]
    },
    google: {
        id: 'google',
        name: 'Gemini',
        type: 'google',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com/v1beta',
        icon: '/logos/gemini.svg',
        models: [
            {
                id: 'gemini-3.5-flash',
                name: 'Gemini 3.5 Flash',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gemini-3.1-pro-preview',
                name: 'Gemini 3.1 Pro Preview',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gemini-3-flash-preview',
                name: 'Gemini 3 Flash Preview',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gemini-2.5-flash',
                name: 'Gemini 2.5 Flash',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'gemini-2.5-flash-lite',
                name: 'Gemini 2.5 Flash Lite',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'gemini-2.5-pro',
                name: 'Gemini 2.5 Pro',
                contextWindow: 1048576,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            }
        ]
    },
    glm: {
        id: 'glm',
        name: 'GLM',
        type: 'openai',
        defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        alternateBaseUrls: [
            {
                label: 'settings.baseUrlRegion.china',
                url: 'https://open.bigmodel.cn/api/paas/v4'
            },
            {
                label: 'settings.baseUrlRegion.international',
                url: 'https://api.z.ai/api/paas/v4'
            }
        ],
        requiresApiKey: true,
        icon: '/logos/glm.svg',
        models: [
            // GLM-5.2 Series - Long-horizon coding model
            {
                id: 'glm-5.2',
                name: 'GLM-5.2',
                contextWindow: 1000000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            // GLM-5.1 Series
            {
                id: 'glm-5.1',
                name: 'GLM-5.1',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'glm-5v-turbo',
                name: 'GLM-5V-Turbo',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            // GLM-5 Series
            {
                id: 'glm-5',
                name: 'GLM-5',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            // GLM-4.7 Series
            {
                id: 'glm-4.7',
                name: 'GLM-4.7',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'glm-4.7-flashx',
                name: 'GLM-4.7-FlashX',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'glm-4.7-flash',
                name: 'GLM-4.7-Flash',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            // GLM-4.6 Series - Advanced coding & reasoning
            {
                id: 'glm-4.6',
                name: 'GLM-4.6',
                contextWindow: 200000,
                outputWindow: 128000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'glm-4.6v',
                name: 'GLM-4.6V',
                contextWindow: 128000,
                outputWindow: 32000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'glm-4.6v-flash',
                name: 'GLM-4.6V-Flash',
                contextWindow: 128000,
                outputWindow: 32000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            }
        ]
    },
    qwen: {
        id: 'qwen',
        name: 'Qwen',
        type: 'openai',
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
        requiresApiKey: true,
        icon: '/logos/qwen.svg',
        models: [
            {
                id: 'qwen3.7-plus',
                name: 'Qwen3.7 Plus',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'qwen3.7-max',
                name: 'Qwen3.7 Max',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'qwen3.6-max-preview',
                name: 'Qwen3.6 Max Preview',
                contextWindow: 256000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.6-plus',
                name: 'Qwen3.6 Plus',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.6-plus-2026-04-02',
                name: 'Qwen3.6 Plus (2026-04-02)',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.6-flash',
                name: 'Qwen3.6 Flash',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.6-flash-2026-04-16',
                name: 'Qwen3.6 Flash (2026-04-16)',
                contextWindow: 1000000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.6-35b-a3b',
                name: 'Qwen3.6 35B A3B',
                contextWindow: 262144,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'qwen3.5-flash',
                name: 'Qwen3.5 Flash',
                contextWindow: 1000000,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'qwen3.5-plus',
                name: 'Qwen3.5 Plus',
                contextWindow: 1000000,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'qwen3-max',
                name: 'Qwen3 Max',
                contextWindow: 262144,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'qwen3-vl-plus',
                name: 'Qwen3 VL Plus',
                contextWindow: 262144,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            }
        ]
    },
    deepseek: {
        id: 'deepseek',
        name: 'DeepSeek',
        type: 'openai',
        defaultBaseUrl: 'https://api.deepseek.com/v1',
        requiresApiKey: true,
        icon: '/logos/deepseek.svg',
        models: [
            {
                id: 'deepseek-v4-pro',
                name: 'DeepSeek V4 Pro',
                contextWindow: 1048576,
                outputWindow: 393216,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'deepseek-v4-flash',
                name: 'DeepSeek V4 Flash',
                contextWindow: 1048576,
                outputWindow: 393216,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: true,
                        defaultEnabled: true
                    }
                }
            }
        ]
    },
    kimi: {
        id: 'kimi',
        name: 'Kimi',
        type: 'openai',
        defaultBaseUrl: 'https://api.moonshot.cn/v1',
        alternateBaseUrls: [
            {
                label: 'settings.baseUrlRegion.china',
                url: 'https://api.moonshot.cn/v1'
            },
            {
                label: 'settings.baseUrlRegion.international',
                url: 'https://api.moonshot.ai/v1'
            }
        ],
        requiresApiKey: true,
        icon: '/logos/kimi.png',
        models: [
            {
                id: 'kimi-k2.7-code',
                name: 'Kimi K2.7 Code',
                contextWindow: 256000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'kimi-k2.7-code-highspeed',
                name: 'Kimi K2.7 Code HighSpeed',
                contextWindow: 256000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'kimi-k2.6',
                name: 'Kimi K2.6',
                contextWindow: 256000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            // K2.5 Series (2026) - 1T MoE, 32B active parameters
            {
                id: 'kimi-k2.5',
                name: 'Kimi K2.5',
                contextWindow: 256000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'kimi-k2-thinking',
                name: 'Kimi K2 Thinking',
                contextWindow: 256000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            }
        ]
    },
    minimax: {
        id: 'minimax',
        name: 'MiniMax',
        type: 'anthropic',
        defaultBaseUrl: 'https://api.minimaxi.com/anthropic/v1',
        alternateBaseUrls: [
            {
                label: 'settings.baseUrlRegion.china',
                url: 'https://api.minimaxi.com/anthropic/v1'
            },
            {
                label: 'settings.baseUrlRegion.international',
                url: 'https://api.minimax.io/anthropic/v1'
            }
        ],
        requiresApiKey: true,
        icon: '/logos/minimax.svg',
        models: [
            {
                id: 'MiniMax-M3',
                name: 'MiniMax M3',
                contextWindow: 1000000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'MiniMax-M2.7',
                name: 'MiniMax M2.7',
                contextWindow: 204800,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    siliconflow: {
        id: 'siliconflow',
        name: '硅基流动',
        type: 'openai',
        defaultBaseUrl: 'https://api.siliconflow.cn/v1',
        requiresApiKey: true,
        icon: '/logos/siliconflow.svg',
        models: [
            // DeepSeek Series
            {
                id: 'deepseek-ai/DeepSeek-V3.2',
                name: 'DeepSeek-V3.2',
                contextWindow: 128000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'deepseek-ai/DeepSeek-R1',
                name: 'DeepSeek-R1',
                contextWindow: 128000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
                name: 'DeepSeek-R1-Distill-Qwen-7B',
                contextWindow: 128000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            // Qwen Series
            {
                id: 'Qwen/Qwen3-VL-32B-Instruct',
                name: 'Qwen3-VL-32B-Instruct',
                contextWindow: 256000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            // Kimi Series
            {
                id: 'Pro/moonshotai/Kimi-K2.5',
                name: 'Kimi-K2.5',
                contextWindow: 256000,
                outputWindow: 96000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            // GLM Series
            {
                id: 'THUDM/GLM-4.1V-9B-Thinking',
                name: 'GLM-4.1V-9B-Thinking',
                contextWindow: 64000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'THUDM/GLM-Z1-Rumination-32B-0414',
                name: 'GLM-Z1-Rumination-32B',
                contextWindow: 32000,
                outputWindow: 16384,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    doubao: {
        id: 'doubao',
        name: '豆包',
        type: 'openai',
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
        requiresApiKey: true,
        icon: '/logos/doubao.svg',
        models: [
            {
                id: 'doubao-seed-2-0-pro-260215',
                name: 'Doubao Seed 2.0 Pro',
                contextWindow: 128000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'doubao-seed-2-0-lite-260215',
                name: 'Doubao Seed 2.0 Lite',
                contextWindow: 128000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'doubao-seed-2-0-mini-260215',
                name: 'Doubao Seed 2.0 Mini',
                contextWindow: 128000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'doubao-seed-1-8-251228',
                name: 'Doubao Seed 1.8',
                contextWindow: 128000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            }
        ]
    },
    openrouter: {
        id: 'openrouter',
        name: 'OpenRouter',
        type: 'openai',
        defaultBaseUrl: 'https://openrouter.ai/api/v1',
        requiresApiKey: true,
        icon: '/logos/openrouter.svg',
        models: [
            {
                id: 'deepseek/deepseek-v4-pro',
                name: 'DeepSeek V4 Pro',
                contextWindow: 1048576,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'deepseek/deepseek-v4-flash',
                name: 'DeepSeek V4 Flash',
                contextWindow: 1048576,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    grok: {
        id: 'grok',
        name: 'Grok',
        type: 'openai',
        defaultBaseUrl: 'https://api.x.ai/v1',
        requiresApiKey: true,
        icon: '/logos/grok.svg',
        models: [
            {
                id: 'grok-4.20-reasoning',
                name: 'Grok 4.20 Reasoning',
                contextWindow: 2000000,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'grok-4.20',
                name: 'Grok 4.20',
                contextWindow: 2000000,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'grok-4.20-multi-agent',
                name: 'Grok 4.20 Multi-Agent',
                contextWindow: 2000000,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'grok-4-1-fast-reasoning',
                name: 'Grok 4.1 Fast Reasoning',
                contextWindow: 2000000,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'grok-4-1-fast-non-reasoning',
                name: 'Grok 4.1 Fast',
                contextWindow: 2000000,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'grok-code-fast-1',
                name: 'Grok Code Fast',
                contextWindow: 256000,
                outputWindow: 32768,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    'tencent-hunyuan': {
        id: 'tencent-hunyuan',
        name: 'Tencent Hunyuan',
        type: 'openai',
        defaultBaseUrl: 'https://tokenhub.tencentmaas.com/v1',
        alternateBaseUrls: [
            {
                label: 'settings.baseUrlRegion.china',
                url: 'https://tokenhub.tencentmaas.com/v1'
            },
            {
                label: 'settings.baseUrlRegion.international',
                url: 'https://tokenhub-intl.tencentmaas.com/v1'
            }
        ],
        requiresApiKey: true,
        icon: '/logos/hunyuan.svg',
        models: [
            {
                id: 'hy3-preview',
                name: 'Tencent Hy3 Preview',
                contextWindow: 256000,
                outputWindow: 64000,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    xiaomi: {
        id: 'xiaomi',
        name: 'Xiaomi MiMo',
        type: 'openai',
        defaultBaseUrl: 'https://api.xiaomimimo.com/v1',
        // Token Plan endpoints use the same OpenAI-compatible path with regional hosts.
        alternateBaseUrls: [
            {
                label: 'settings.baseUrlRegion.xiaomiPayg',
                url: 'https://api.xiaomimimo.com/v1'
            },
            {
                label: 'settings.baseUrlRegion.xiaomiTokenPlanCN',
                url: 'https://token-plan-cn.xiaomimimo.com/v1'
            },
            {
                label: 'settings.baseUrlRegion.xiaomiTokenPlanSGP',
                url: 'https://token-plan-sgp.xiaomimimo.com/v1'
            },
            {
                label: 'settings.baseUrlRegion.xiaomiTokenPlanEU',
                url: 'https://token-plan-ams.xiaomimimo.com/v1'
            }
        ],
        requiresApiKey: true,
        icon: '/logos/xiaomi.svg',
        models: [
            {
                id: 'mimo-v2.5-pro',
                name: 'MiMo V2.5 Pro',
                contextWindow: 1048576,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'mimo-v2-pro',
                name: 'MiMo V2 Pro',
                contextWindow: 1048576,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'mimo-v2.5',
                name: 'MiMo V2.5',
                contextWindow: 1048576,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'mimo-v2-omni',
                name: 'MiMo V2 Omni',
                contextWindow: 262144,
                outputWindow: 131072,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            },
            {
                id: 'mimo-v2-flash',
                name: 'MiMo V2 Flash',
                contextWindow: 262144,
                outputWindow: 65536,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: true
                    }
                }
            }
        ]
    },
    ollama: {
        id: 'ollama',
        name: 'Ollama',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:11434',
        requiresApiKey: false,
        icon: '/logos/ollama.svg',
        models: [
            {
                id: 'llama3.3',
                name: 'Llama 3.3 70B',
                contextWindow: 131072,
                outputWindow: 4096,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'gemma3',
                name: 'Gemma 3 12B',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: true
                }
            },
            {
                id: 'deepseek-r1',
                name: 'DeepSeek R1',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: false,
                    vision: false
                }
            }
        ]
    },
    lemonade: {
        id: 'lemonade',
        name: 'Lemonade',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:13305/v1',
        requiresApiKey: false,
        icon: '/logos/lemonade.svg',
        models: [
            {
                id: 'Gemma-4-26B-A4B-it-GGUF',
                name: 'Gemma 4 26B A4B IT GGUF',
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            }
        ]
    },
    /**
   * FreeLLMAPI — self-hosted free-tier aggregator/router
   * (https://github.com/tashfeenahmed/freellmapi).
   *
   * One OpenAI-compatible `/v1` endpoint that routes across 34 free LLM
   * providers (Google, Groq, Cerebras, Mistral, OpenRouter, Z.ai, …) with
   * automatic failover when one is rate-limited. The user installs it
   * locally (docker or desktop app, default port 3001), adds their free-tier
   * keys in ITS dashboard, and points MedQ at the router with the single
   * unified `freellmapi-…` bearer key.
   *
   * The seeded models are the router's virtual routing strategies:
   *   auto        — router picks the best healthy free model per request
   *   auto:fast   — prefer lowest latency
   *   auto:smart  — prefer highest capability
   *   fusion      — fan out to a panel of models, synthesize one answer
   * The REAL model catalog (hundreds of free endpoints) is discovered at
   * runtime via the "Discover models" button (GET /v1/models on the router).
   */ freellmapi: {
        id: 'freellmapi',
        name: 'FreeLLMAPI',
        type: 'openai',
        defaultBaseUrl: 'http://localhost:3001/v1',
        requiresApiKey: true,
        icon: '/logos/freellmapi.svg',
        models: [
            {
                id: 'auto',
                name: 'Auto (router picks the best free model)',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'auto:fast',
                name: 'Auto: Fast (lowest latency)',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'auto:smart',
                name: 'Auto: Smart (highest capability)',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: true,
                    vision: false
                }
            },
            {
                id: 'fusion',
                name: 'Fusion (multi-model synthesis)',
                contextWindow: 131072,
                outputWindow: 8192,
                capabilities: {
                    streaming: false,
                    tools: false,
                    vision: false
                }
            }
        ]
    },
    /**
   * ZAI provider — MedQ's native LLM backend (z-ai-web-dev-sdk).
   *
   * Configured via `.z-ai-config` (apiKey + baseUrl + token). The LanguageModel
   * instance is constructed by `createZaiLanguageModel()` (see
   * `@/lib/ai/zai-language-model.ts`), which wraps `zai.chat.completions.create`
   * into the Vercel AI SDK's `LanguageModelV3` interface so OpenMAIC's real
   * `callLLM`/`streamLLM` (from `@/lib/ai/llm.ts`) can drive the classroom
   * generation pipeline unchanged.
   *
   * `type: 'zai'` is a synthetic provider type handled in `getModel()` below —
   * it bypasses the OpenAI/Anthropic/Google branches and dispatches to the ZAI
   * adapter directly.
   */ zai: {
        id: 'zai',
        name: 'ZAI',
        type: 'zai',
        defaultBaseUrl: '',
        requiresApiKey: false,
        icon: '/logos/zai.svg',
        models: [
            {
                id: 'auto',
                name: 'ZAI Auto (router picks best model)',
                contextWindow: 128000,
                outputWindow: 16384,
                capabilities: {
                    streaming: true,
                    tools: false,
                    vision: true,
                    thinking: {
                        toggleable: false,
                        budgetAdjustable: false,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'glm-4.5',
                name: 'GLM-4.5',
                contextWindow: 128000,
                outputWindow: 16384,
                capabilities: {
                    streaming: true,
                    tools: false,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: false
                    }
                }
            },
            {
                id: 'glm-4.5-air',
                name: 'GLM-4.5 Air (fast)',
                contextWindow: 128000,
                outputWindow: 8192,
                capabilities: {
                    streaming: true,
                    tools: false,
                    vision: true
                }
            },
            {
                id: 'glm-4.6',
                name: 'GLM-4.6',
                contextWindow: 200000,
                outputWindow: 16384,
                capabilities: {
                    streaming: true,
                    tools: false,
                    vision: true,
                    thinking: {
                        toggleable: true,
                        budgetAdjustable: false,
                        defaultEnabled: false
                    }
                }
            }
        ]
    }
};
// Enrich models with catalog metadata (thinking capability etc.) — this used
// to run in providers.ts; moved here so BOTH server (providers.ts) and client
// (OpenMAIC settings) consumers see the enriched registry. model-metadata is
// itself dependency-free (types only), so this stays browser-safe.
(0,_model_metadata__WEBPACK_IMPORTED_MODULE_0__/* .applyModelMetadata */ .NG)(PROVIDERS);


/***/ }),

/***/ 290709:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   l: () => (/* binding */ VIDEO_PROVIDERS)
/* harmony export */ });
/* unused harmony export normalizeVideoOptions */
/**
 * Video provider REGISTRY — pure data, browser-safe.
 *
 * The client-safe half of src/lib/media/video-providers.ts: the
 * VIDEO_PROVIDERS config table and the pure normalizeVideoOptions() helper,
 * with ZERO adapter imports. The dispatchers that call the provider adapters
 * (which import node 'crypto' for HMAC signing etc.) stay in
 * video-providers.ts — importing them here would drag node builtins into
 * browser chunks, which Turbopack refuses to write
 * ("chunking context does not support external modules").
 *
 * Client code imports from './video-provider-registry'; server code can use
 * either (video-providers.ts re-exports this registry).
 */ const VIDEO_PROVIDERS = {
    seedance: {
        id: 'seedance',
        name: 'Seedance',
        requiresApiKey: true,
        defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
        models: [
            {
                id: 'doubao-seedance-1-5-pro-251215',
                name: 'Seedance 1.5 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-250528',
                name: 'Seedance 1.0 Pro'
            },
            {
                id: 'doubao-seedance-1-0-pro-fast-251015',
                name: 'Seedance 1.0 Pro Fast'
            },
            {
                id: 'doubao-seedance-1-0-lite-t2v-250428',
                name: 'Seedance 1.0 Lite T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16',
            '3:4',
            '21:9'
        ],
        supportedDurations: [
            5,
            10
        ],
        supportedResolutions: [
            '480p',
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    kling: {
        id: 'kling',
        name: 'Kling',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api-beijing.klingai.com',
        models: [
            {
                id: 'kling-v2-6',
                name: 'Kling V2.6'
            },
            {
                id: 'kling-v1-6',
                name: 'Kling V1.6'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            5,
            10
        ],
        maxDuration: 10
    },
    veo: {
        id: 'veo',
        name: 'Veo',
        requiresApiKey: true,
        defaultBaseUrl: 'https://generativelanguage.googleapis.com',
        models: [
            {
                id: 'veo-3.1-fast-generate-001',
                name: 'Veo 3.1 Fast'
            },
            {
                id: 'veo-3.1-generate-001',
                name: 'Veo 3.1'
            },
            {
                id: 'veo-3.0-fast-generate-001',
                name: 'Veo 3.0 Fast'
            },
            {
                id: 'veo-3.0-generate-001',
                name: 'Veo 3.0'
            },
            {
                id: 'veo-2.0-generate-001',
                name: 'Veo 2.0'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            8
        ],
        supportedResolutions: [
            '720p'
        ],
        maxDuration: 8
    },
    sora: {
        id: 'sora',
        name: 'Sora',
        requiresApiKey: true,
        models: [],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        maxDuration: 20
    },
    'minimax-video': {
        id: 'minimax-video',
        name: 'MiniMax Video',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        // Hailuo 2.3 Fast requires Image-to-Video with first_frame_image; this
        // provider currently submits Text-to-Video requests only.
        models: [
            {
                id: 'MiniMax-Hailuo-2.3',
                name: 'Hailuo 2.3'
            },
            {
                id: 'MiniMax-Hailuo-02',
                name: 'Hailuo 02'
            },
            {
                id: 'T2V-01-Director',
                name: 'T2V-01 Director'
            },
            {
                id: 'T2V-01',
                name: 'T2V-01'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '4:3',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6,
            10
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 10
    },
    'grok-video': {
        id: 'grok-video',
        name: 'Grok Video (xAI)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.x.ai/v1',
        models: [
            {
                id: 'grok-imagine-video',
                name: 'Grok Imagine Video'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '1:1',
            '9:16'
        ],
        supportedDurations: [
            6
        ],
        maxDuration: 6
    },
    happyhorse: {
        id: 'happyhorse',
        name: 'HappyHorse',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com',
        models: [
            {
                id: 'happyhorse-1.0-t2v',
                name: 'HappyHorse 1.0 T2V'
            }
        ],
        supportedAspectRatios: [
            '16:9',
            '9:16',
            '1:1',
            '4:3',
            '3:4'
        ],
        supportedDurations: [
            5,
            10,
            15
        ],
        supportedResolutions: [
            '720p',
            '1080p'
        ],
        maxDuration: 15
    }
};
/**
 * Normalize video generation options against provider capabilities.
 * Ensures duration, aspectRatio, and resolution are valid for the given provider.
 * Falls back to the first supported value when the requested value is unsupported.
 */ function normalizeVideoOptions(providerId, options) {
    const provider = VIDEO_PROVIDERS[providerId];
    if (!provider) return options;
    const normalized = {
        ...options
    };
    // Duration: use first supported value if unset or unsupported
    if (provider.supportedDurations && provider.supportedDurations.length > 0) {
        if (!normalized.duration || !provider.supportedDurations.includes(normalized.duration)) {
            normalized.duration = provider.supportedDurations[0];
        }
    }
    // Aspect ratio: use first supported value if unset or unsupported
    if (provider.supportedAspectRatios && provider.supportedAspectRatios.length > 0) {
        if (!normalized.aspectRatio || !provider.supportedAspectRatios.includes(normalized.aspectRatio)) {
            normalized.aspectRatio = provider.supportedAspectRatios[0];
        }
    }
    // Resolution: use first supported value if unset or unsupported
    if (provider.supportedResolutions && provider.supportedResolutions.length > 0) {
        if (!normalized.resolution || !provider.supportedResolutions.includes(normalized.resolution)) {
            normalized.resolution = provider.supportedResolutions[0];
        }
    }
    return normalized;
}


/***/ }),

/***/ 296487:
/***/ (() => {



/***/ }),

/***/ 301802:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   e3: () => (/* binding */ validateProvider),
/* harmony export */   ns: () => (/* binding */ hasUsableLLMProvider),
/* harmony export */   zE: () => (/* binding */ resolveSelectedModel),
/* harmony export */   zT: () => (/* binding */ isLLMProviderConfigured)
/* harmony export */ });
/* unused harmony exports isProviderUsable, validateModel */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/store/settings-validation.ts
 *
 * Verbatim port — pure functions with no external dependencies. Used by
 * fetchServerProviders() in the settings store to detect and fix stale
 * provider/model selections after server config changes.
 */ /**
 * Provider selection validation utilities.
 *
 * Pure functions used by fetchServerProviders() to detect and fix
 * stale provider/model selections after server config changes.
 */ /**
 * Check whether a provider has a usable *credential path* (server config or
 * client key/baseUrl). This is the store-level notion and deliberately does
 * NOT require ≥1 model — the UX-level "usable" predicate
 * ({@link isLLMProviderConfigured}) additionally requires a model, so a
 * pathological zero-model provider is classified State A at the UI boundary
 * even though the store may keep it selected with an empty model (#580).
 */ function isProviderUsable(cfg) {
    if (!cfg) return false;
    // Operator force-disable wins over any local credential path so the current
    // selection is re-pointed away from a server-disabled provider (#665).
    if (cfg.serverDisabled) return false;
    if (cfg.isServerConfigured) return true;
    // Keyless providers (e.g. Ollama) need an explicit user-provided baseUrl
    if (cfg.requiresApiKey === false) return !!cfg.baseUrl;
    return !!cfg.apiKey;
}
/**
 * Validate current provider selection against updated config.
 * Returns the current ID if still usable, otherwise the first usable
 * provider from fallbackOrder, or defaultId if provided, or ''.
 */ function validateProvider(currentId, configMap, fallbackOrder, defaultId) {
    if (!currentId) return currentId;
    if (isProviderUsable(configMap[currentId])) return currentId;
    for (const id of fallbackOrder){
        if (isProviderUsable(configMap[id])) return id;
    }
    return defaultId ?? '';
}
/**
 * Validate current model selection against available models list.
 * Falls back to first available model, or '' if list is empty.
 */ function validateModel(currentModelId, availableModels) {
    if (!currentModelId) return currentModelId;
    if (availableModels.some((m)=>m.id === currentModelId)) return currentModelId;
    return availableModels[0]?.id ?? '';
}
/**
 * Resolve the model selection for a usable provider.
 *
 * Enforces the invariant "usable provider ⇒ a concrete model is selected":
 * keeps the current model if still valid, otherwise falls back to the first
 * available model. Unlike {@link validateModel} it has no empty-input
 * short-circuit, so it returns '' ONLY when the model list is empty (i.e. the
 * provider is not usable). Use this for model *selection resolution*; use
 * validateModel only for pure validation.
 */ function resolveSelectedModel(currentModelId, availableModels) {
    if (availableModels.some((m)=>m.id === currentModelId)) return currentModelId;
    return availableModels[0]?.id ?? '';
}
/**
 * Canonical "this LLM provider is usable" predicate — single source of truth
 * shared by the generation toolbar selector and the landing-page generate
 * gate (#580). Deliberately consistent with {@link isProviderUsable} so the
 * gate/toolbar can never claim a provider is usable when the server-sync
 * reconcile would not actually select it:
 *
 * - server-configured ⇒ usable;
 * - keyless provider (ollama/lemonade) ⇒ usable ONLY once the user sets an
 *   explicit baseUrl — the registry `defaultBaseUrl` alone is not user intent;
 * - key-requiring provider ⇒ needs a client key AND a resolvable endpoint.
 *
 * Always also requires ≥1 model.
 */ function isLLMProviderConfigured(config) {
    if (config.models.length < 1) return false;
    if (config.isServerConfigured) return true;
    if (config.requiresApiKey === false) return !!config.baseUrl;
    if (!config.apiKey) return false;
    return !!(config.baseUrl || config.defaultBaseUrl);
}
/**
 * Whether at least one LLM provider is usable — i.e. the app is in state B
 * (≥1 usable provider) rather than state A (must configure a provider). Under
 * the #580 invariant this is exactly the condition under which a concrete
 * model is guaranteed to be selected.
 */ function hasUsableLLMProvider(providersConfig) {
    if (!providersConfig) return false;
    return Object.values(providersConfig).some(isLLMProviderConfigured);
}


/***/ }),

/***/ 354524:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O4: () => (/* reexport safe */ _locales__WEBPACK_IMPORTED_MODULE_1__.O),
/* harmony export */   q: () => (/* reexport safe */ _types__WEBPACK_IMPORTED_MODULE_0__.q)
/* harmony export */ });
/* unused harmony exports translate, getClientTranslation */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(774773);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(408275);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/index.ts
 *
 * MedQ adaptation: OpenMAIC's i18n uses i18next + react-i18next +
 * i18next-resources-to-backend to lazy-load locale JSON files. MedQ uses
 * `next-intl` (already installed) for its own UI strings and does not yet wire
 * up OpenMAIC's per-locale JSON resources. To avoid the i18next dependency tree
 * (i18next, react-i18next, i18next-resources-to-backend), this module exposes
 * the same `getClientTranslation(key)` surface as OpenMAIC's i18n, but
 * implements it as an identity function — the English fallback is returned
 * unchanged. The supported-locales registry is ported verbatim so ported
 * components that read the locale list (e.g. `use-i18n.tsx` if/when ported)
 * continue to compile.
 */ 

function translate(_locale, key) {
    return key;
}
function getClientTranslation(key) {
    return key;
}


/***/ }),

/***/ 408275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   O: () => (/* binding */ supportedLocales)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/locales.ts
 *
 * Verbatim port — pure data, no deps.
 */ /**
 * Supported locales registry.
 *
 * To add a new language:
 *   1. Create `lib/i18n/locales/<code>.json` (copy an existing file as template)
 *   2. Add an entry here
 */ const supportedLocales = [
    {
        code: 'zh-CN',
        label: '简体中文',
        shortLabel: 'CN'
    },
    {
        code: 'zh-TW',
        label: '繁體中文',
        shortLabel: 'TW'
    },
    {
        code: 'en-US',
        label: 'English',
        shortLabel: 'EN'
    },
    {
        code: 'ja-JP',
        label: '日本語',
        shortLabel: 'JA'
    },
    {
        code: 'ru-RU',
        label: 'Русский',
        shortLabel: 'RU'
    },
    {
        code: 'ar-SA',
        label: 'العربية',
        shortLabel: 'AR'
    },
    {
        code: 'pt-BR',
        label: 'Português (Brasil)',
        shortLabel: 'BR'
    },
    {
        code: 'ko-KR',
        label: '한국어',
        shortLabel: 'KO'
    }
];


/***/ }),

/***/ 444244:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* unused harmony exports createAgentFromTemplate, WHITEBOARD_ACTIONS, SLIDE_ACTIONS, ROLE_ACTIONS, getActionsForRole */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/orchestration/registry/types.ts
 *
 * Agent Configuration Types
 * Defines the structure for configurable AI agents in the multi-agent system.
 */ /**
 * Create a new AgentConfig from a template
 */ function createAgentFromTemplate(template, id) {
    return {
        id,
        ...template,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDefault: false
    };
}
// Action types available to agents (canonical source for role-based mapping)
const WHITEBOARD_ACTIONS = [
    'wb_open',
    'wb_close',
    'wb_draw_text',
    'wb_draw_shape',
    'wb_draw_chart',
    'wb_draw_latex',
    'wb_draw_table',
    'wb_draw_line',
    'wb_draw_code',
    'wb_edit_code',
    'wb_clear',
    'wb_delete'
];
const SLIDE_ACTIONS = [
    'spotlight',
    'laser',
    'play_video'
];
/**
 * Maps agent roles to their allowed action sets.
 * Teachers get slide + whiteboard control; others get whiteboard only.
 */ const ROLE_ACTIONS = {
    teacher: [
        ...SLIDE_ACTIONS,
        ...WHITEBOARD_ACTIONS
    ],
    assistant: [
        ...WHITEBOARD_ACTIONS
    ],
    student: [
        ...WHITEBOARD_ACTIONS
    ]
};
/**
 * Get the default allowed actions for a given role.
 * Falls back to whiteboard-only actions for unknown roles.
 */ function getActionsForRole(role) {
    return ROLE_ACTIONS[role] || [
        ...WHITEBOARD_ACTIONS
    ];
}


/***/ }),

/***/ 492340:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony import */ var i18next__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100529);
/* harmony import */ var react_i18next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(901433);
/* harmony import */ var i18next_resources_to_backend__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(787361);
/* harmony import */ var _locales__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(408275);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(774773);





i18next__WEBPACK_IMPORTED_MODULE_0__/* ["default"].use */ .Ay.use(react_i18next__WEBPACK_IMPORTED_MODULE_2__/* .initReactI18next */ .r).use((0,i18next_resources_to_backend__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .A)((language)=>__webpack_require__(694394)(`./${language}.json`))).init({
    lng: _types__WEBPACK_IMPORTED_MODULE_4__/* .defaultLocale */ .q,
    fallbackLng: _types__WEBPACK_IMPORTED_MODULE_4__/* .defaultLocale */ .q,
    supportedLngs: _locales__WEBPACK_IMPORTED_MODULE_1__/* .supportedLocales */ .O.map((l)=>l.code),
    interpolation: {
        escapeValue: false
    }
});
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (i18n)));


/***/ }),

/***/ 494848:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $C: () => (/* binding */ getWebSearchProviderDisplayName),
/* harmony export */   Vf: () => (/* binding */ WEB_SEARCH_PROVIDERS),
/* harmony export */   _m: () => (/* binding */ BAIDU_SUB_SOURCES)
/* harmony export */ });
/* unused harmony export getAllWebSearchProviders */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/web-search/constants.ts
 *
 * Web Search Provider Constants — verbatim port.
 *
 * OpenMAIC's `lib/web-search/types.ts` defines `WebSearchProviderId` as
 * a union of the five IDs in `WEB_SEARCH_PROVIDERS` below. MedQ's
 * `lib/web-search/types.ts` extends that union with `'zai'` (MedQ's
 * first-class web-search provider) but keeps the OpenMAIC IDs so ported
 * code that switches on provider ID compiles unchanged.
 *
 * This constants file is pure data — no side-effect imports — so it is
 * ported verbatim. MedQ's runtime web-search route (which uses ZAI's
 * `functions.web_search` exclusively) never consults this registry; it
 * is here only so the ported settings store can populate the
 * `webSearchProvidersConfig` defaults on rehydrate.
 */ /**
 * Web Search Provider Registry
 */ const WEB_SEARCH_PROVIDERS = {
    tavily: {
        id: 'tavily',
        name: 'Tavily',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.tavily.com',
        endpointPath: '/search',
        icon: '/logos/tavily.svg'
    },
    bocha: {
        id: 'bocha',
        name: 'Bocha',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.bocha.cn',
        endpointPath: '/v1/web-search',
        icon: '/logos/bocha.png'
    },
    brave: {
        id: 'brave',
        name: 'Brave Search',
        requiresApiKey: false,
        defaultBaseUrl: 'https://search.brave.com',
        endpointPath: '/search',
        icon: '/logos/brave.png'
    },
    baidu: {
        id: 'baidu',
        name: 'Baidu',
        requiresApiKey: true,
        defaultBaseUrl: 'https://qianfan.baidubce.com',
        endpointPath: '/v2/ai_search/web_search',
        icon: '/logos/baidu.png'
    },
    minimax: {
        id: 'minimax',
        name: 'MiniMax',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        endpointPath: '/v1/coding_plan/search',
        icon: '/logos/minimax.svg'
    },
    // `zai` is MedQ-only — the OpenMAIC source does not include this entry.
    // MedQ's runtime web-search route uses ZAI's `functions.web_search`
    // exclusively; this registry entry exists only so the type
    // `Record<WebSearchProviderId, WebSearchProviderConfig>` (which MedQ's
    // types.ts extends with `'zai'`) compiles. The default base URL points
    // at the ZAI SDK; the operator's .z-ai-config supplies the actual
    // credentials at runtime.
    zai: {
        id: 'zai',
        name: 'ZAI',
        requiresApiKey: false,
        defaultBaseUrl: 'https://api.z.ai/api/paas/v4',
        endpointPath: '/functions/web_search',
        icon: '/logos/zai.svg'
    }
};
/**
 * Baidu sub-source metadata. Used by the settings UI to label each
 * toggle. MedQ's ZAI adapter does not support Baidu sub-sources; the
 * field is accepted but ignored at the API level.
 */ const BAIDU_SUB_SOURCES = {
    webSearch: {
        labelKey: 'settings.baiduSubSourceWeb',
        descriptionKey: 'settings.baiduSubSourceWebDescription',
        docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Mmh4sv6ec'
    },
    baike: {
        labelKey: 'settings.baiduSubSourceBaike',
        descriptionKey: 'settings.baiduSubSourceBaikeDescription',
        docsUrl: 'https://ai.baidu.com/ai-doc/AppBuilder/rmckc6mtu'
    },
    scholar: {
        labelKey: 'settings.baiduSubSourceScholar',
        descriptionKey: 'settings.baiduSubSourceScholarDescription',
        docsUrl: 'https://cloud.baidu.com/doc/qianfan/s/Amkw9qpzd'
    }
};
/**
 * Get the display name for a web search provider. Pure helper, ported
 * verbatim — the optional translator function `t` is passed through
 * unchanged so ported call sites continue to compile.
 */ function getWebSearchProviderDisplayName(providerId, t) {
    const provider = WEB_SEARCH_PROVIDERS[providerId];
    if (!provider) return providerId;
    if (t) {
        const key = `settings.providerNames.${providerId}`;
        const translated = t(key);
        if (translated && translated !== key) return translated;
    }
    return provider.name;
}
/**
 * Get all available web search providers.
 */ function getAllWebSearchProviders() {
    return Object.values(WEB_SEARCH_PROVIDERS);
}


/***/ }),

/***/ 541074:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AM: () => (/* binding */ Popover),
/* harmony export */   Wv: () => (/* binding */ PopoverTrigger),
/* harmony export */   hl: () => (/* binding */ PopoverContent)
/* harmony export */ });
/* unused harmony exports PopoverDescription, PopoverHeader, PopoverTitle */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(816709);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(206457);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(13137);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(767525);
/* harmony import */ var _base_ui_react_popover__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(394073);
/* harmony import */ var cn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(665068);
/* __next_internal_client_entry_do_not_use__ Popover,PopoverContent,PopoverDescription,PopoverHeader,PopoverTitle,PopoverTrigger auto */ 



function Popover({ ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_2__/* .PopoverRoot */ .y, {
        "data-slot": "popover",
        ...props
    });
}
function PopoverTrigger({ asChild, children, ...props }) {
    if (asChild && /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.isValidElement(children)) {
        // base-ui has no Slot: clone the child and chain its handlers with the
        // trigger's own. Casts keep the polyfill generic over the child element.
        const child = children;
        const childProps = child.props;
        const chain = (name, own)=>(event)=>{
                childProps[name]?.(event);
                own?.(event);
            };
        return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_1__.cloneElement(child, {
            ...props,
            ...childProps,
            'data-slot': 'popover-trigger',
            onClick: chain('onClick', props.onClick),
            onPointerDown: chain('onPointerDown', props.onPointerDown),
            onKeyDown: chain('onKeyDown', props.onKeyDown),
            onMouseDown: chain('onMouseDown', props.onMouseDown),
            onFocus: chain('onFocus', props.onFocus),
            onBlur: chain('onBlur', props.onBlur),
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)(childProps.className, props.className)
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_4__/* .PopoverTrigger */ .W, {
        "data-slot": "popover-trigger",
        ...props,
        children: children
    });
}
function PopoverContent({ className, align = "center", alignOffset = 0, side = "bottom", sideOffset = 4, collisionPadding, positionerClassName, ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_5__/* .PopoverPortal */ .i, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_6__/* .PopoverPositioner */ .U, {
            align: align,
            alignOffset: alignOffset,
            side: side,
            sideOffset: sideOffset,
            collisionPadding: collisionPadding,
            className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)("isolate", positionerClassName || "z-50"),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_base_ui_react_popover__WEBPACK_IMPORTED_MODULE_7__/* .PopoverPopup */ .i, {
                "data-slot": "popover-content",
                className: (0,cn__WEBPACK_IMPORTED_MODULE_3__.cn)("z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95", className),
                ...props
            })
        })
    });
}
function PopoverHeader({ className, ...props }) {
    return /*#__PURE__*/ _jsx("div", {
        "data-slot": "popover-header",
        className: cn("flex flex-col gap-0.5 text-sm", className),
        ...props
    });
}
function PopoverTitle({ className, ...props }) {
    return /*#__PURE__*/ _jsx(PopoverPrimitive.Title, {
        "data-slot": "popover-title",
        className: cn("font-medium", className),
        ...props
    });
}
function PopoverDescription({ className, ...props }) {
    return /*#__PURE__*/ _jsx(PopoverPrimitive.Description, {
        "data-slot": "popover-description",
        className: cn("text-muted-foreground", className),
        ...props
    });
}



/***/ }),

/***/ 546584:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   kc: () => (/* binding */ pickNarratorAgent),
/* harmony export */   wz: () => (/* binding */ resolveAgentVoiceOptions)
/* harmony export */ });
/* unused harmony export warmUpAgentVoices */
/* harmony import */ var _lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(636501);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(832917);
/* harmony import */ var _lib_store_settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(92048);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/agent-voice.ts
 *
 * Verbatim port — `@/lib/orchestration/registry/types`, `@/lib/audio/voxcpm`,
 * `@/lib/audio/voxcpm-voices`, `@/lib/audio/voice-design`, `@/lib/store/settings`
 * are all real ports.
 */ /* __next_internal_client_entry_do_not_use__ pickNarratorAgent,resolveAgentVoiceOptions,warmUpAgentVoices auto */ 


/**
 * Pick the agent whose voice narration should use (the teacher).
 */ function pickNarratorAgent(agents) {
    return agents.find((a)=>a.role === 'teacher' && a.voiceDesign) ?? agents.find((a)=>a.role === 'teacher');
}
/**
 * The descriptor used to bootstrap an agent's voice: the real `voiceDesign`
 * when present (generated agents), otherwise the persona as a fallback seed.
 */ function effectiveVoiceDesign(agent) {
    if (agent?.voiceDesign) return agent.voiceDesign;
    const persona = agent?.persona?.trim();
    return persona ? {
        identity: persona,
        texture: '',
        delivery: ''
    } : undefined;
}
/**
 * Produce the `ttsProviderOptions` to send to /api/generate/tts for `agent`
 * (pass the teacher agent for narration, the speaking agent for discussion,
 * or undefined when there is no agent). Returns undefined for providers with
 * no special options.
 */ async function resolveAgentVoiceOptions(agent, opts) {
    if (opts.providerId !== _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_TTS_PROVIDER_ID */ .i3) return undefined;
    return {
        ...opts.providerConfig?.providerOptions || {},
        ...await (0,_lib_audio_voxcpm_voices__WEBPACK_IMPORTED_MODULE_0__/* .getVoxCPMProviderOptions */ .pX)(opts.voiceId, {
            agentName: agent?.name,
            role: agent?.role ?? 'teacher',
            persona: agent?.persona,
            voiceDesign: effectiveVoiceDesign(agent),
            language: opts.language,
            backend: (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .normalizeVoxCPMBackend */ .H_)(opts.providerConfig?.providerOptions?.backend)
        }, {
            ttsApiKey: opts.providerConfig?.apiKey || undefined,
            ttsBaseUrl: opts.providerConfig?.baseUrl || opts.providerConfig?.customDefaultBaseUrl || undefined,
            ttsModelId: opts.providerConfig?.modelId
        })
    };
}
/**
 * Eager warm-up: right after generated agents are saved, pre-register the
 * narrator's (teacher's) auto voice using the SAME idempotent ensure as the TTS
 * path, so the first spoken line is already stable.
 */ function warmUpAgentVoices(agents) {
    const settings = useSettingsStore.getState();
    const providerId = settings.ttsProviderId;
    if (providerId !== VOXCPM_TTS_PROVIDER_ID) return;
    const providerConfig = settings.ttsProvidersConfig?.[providerId];
    const narrator = pickNarratorAgent(agents);
    if (!narrator || !effectiveVoiceDesign(narrator)) return;
    void resolveAgentVoiceOptions(narrator, {
        providerId,
        providerConfig,
        voiceId: VOXCPM_AUTO_VOICE_ID
    }).catch(()=>undefined);
}


/***/ }),

/***/ 586359:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   sP: () => (/* binding */ PDF_PROVIDERS)
/* harmony export */ });
/* unused harmony exports MINERU_CLOUD_DEFAULT_BASE, getAllPDFProviders, getPDFProvider */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/pdf/constants.ts
 *
 * Verbatim port — only the import path is adapted (`./types` is unchanged
 * because the directory layout matches OpenMAIC's). The constants are pure
 * data and self-contained.
 */ const MINERU_CLOUD_DEFAULT_BASE = 'https://mineru.net/api/v4';
/**
 * PDF Provider Registry
 */ const PDF_PROVIDERS = {
    unpdf: {
        id: 'unpdf',
        name: 'unpdf',
        requiresApiKey: false,
        icon: '/logos/unpdf.svg',
        features: [
            'text',
            'images',
            'metadata'
        ]
    },
    mineru: {
        id: 'mineru',
        name: 'MinerU',
        requiresApiKey: false,
        icon: '/logos/mineru.png',
        features: [
            'text',
            'images',
            'tables',
            'formulas',
            'layout-analysis'
        ]
    },
    'mineru-cloud': {
        id: 'mineru-cloud',
        name: 'MinerU (Cloud)',
        requiresApiKey: true,
        icon: '/logos/mineru.png',
        features: [
            'text',
            'images',
            'tables',
            'formulas',
            'layout-analysis'
        ]
    }
};
/**
 * Get all available PDF providers
 */ function getAllPDFProviders() {
    return Object.values(PDF_PROVIDERS);
}
/**
 * Get PDF provider by ID
 */ function getPDFProvider(providerId) {
    return PDF_PROVIDERS[providerId];
}


/***/ }),

/***/ 586360:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Ed: () => (/* binding */ storeImages),
/* harmony export */   Eg: () => (/* binding */ cleanupOldImages),
/* harmony export */   k5: () => (/* binding */ loadImageMapping),
/* harmony export */   uT: () => (/* binding */ loadPdfBlob),
/* harmony export */   xT: () => (/* binding */ storePdfBlob)
/* harmony export */ });
/* unused harmony exports cleanupSessionImages, getImageStorageSize */
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167324);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(973877);
/* harmony import */ var _lib_logger__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(971427);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/utils/image-storage.ts
 *
 * Verbatim port — `@/lib/utils/database` is now the real port (Dexie-backed),
 * so image/PDF blob persistence is fully functional.
 */ 


const log = (0,_lib_logger__WEBPACK_IMPORTED_MODULE_1__/* .createLogger */ .h)('ImageStorage');
/**
 * Convert base64 data URL to Blob
 */ function base64ToBlob(base64DataUrl) {
    const parts = base64DataUrl.split(',');
    const mimeMatch = parts[0].match(/:(.*?);/);
    const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
    const base64Data = parts[1];
    const byteString = atob(base64Data);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for(let i = 0; i < byteString.length; i++){
        uint8Array[i] = byteString.charCodeAt(i);
    }
    return new Blob([
        uint8Array
    ], {
        type: mimeType
    });
}
/**
 * Convert Blob to base64 data URL
 */ async function blobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onloadend = ()=>resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}
/**
 * Store images in IndexedDB
 * Returns array of stored image IDs
 */ async function storeImages(images) {
    const sessionId = (0,nanoid__WEBPACK_IMPORTED_MODULE_2__/* .nanoid */ .Ak)(10);
    const storedIds = [];
    for (const img of images){
        try {
            const blob = base64ToBlob(img.src);
            const mimeMatch = img.src.match(/data:(.*?);/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'image/png';
            // Use session-prefixed ID to allow cleanup
            const storageId = `session_${sessionId}_${img.id}`;
            const record = {
                id: storageId,
                blob,
                filename: `${img.id}.png`,
                mimeType,
                size: blob.size,
                createdAt: Date.now()
            };
            await _database__WEBPACK_IMPORTED_MODULE_0__.db.imageFiles.put(record);
            storedIds.push(storageId);
        } catch (error) {
            log.error(`Failed to store image ${img.id}:`, error);
        }
    }
    return storedIds;
}
/**
 * Load images from IndexedDB and return as imageMapping
 * @param imageIds - Array of storage IDs (session_xxx_img_1 format)
 * @returns ImageMapping { img_1: "data:image/png;base64,..." }
 */ async function loadImageMapping(imageIds) {
    const mapping = {};
    for (const storageId of imageIds){
        try {
            const record = await _database__WEBPACK_IMPORTED_MODULE_0__.db.imageFiles.get(storageId);
            if (record) {
                const base64 = await blobToBase64(record.blob);
                // Extract original ID (img_1) from storage ID (session_xxx_img_1)
                const originalId = storageId.replace(/^session_[^_]+_/, '');
                mapping[originalId] = base64;
            }
        } catch (error) {
            log.error(`Failed to load image ${storageId}:`, error);
        }
    }
    return mapping;
}
/**
 * Clean up images by session prefix
 */ async function cleanupSessionImages(sessionId) {
    try {
        const prefix = `session_${sessionId}_`;
        const allImages = await db.imageFiles.toArray();
        const toDelete = allImages.filter((img)=>img.id.startsWith(prefix));
        for (const img of toDelete){
            await db.imageFiles.delete(img.id);
        }
        log.info(`Cleaned up ${toDelete.length} images for session ${sessionId}`);
    } catch (error) {
        log.error('Failed to cleanup session images:', error);
    }
}
/**
 * Clean up old images (older than specified hours)
 */ async function cleanupOldImages(hoursOld = 24) {
    try {
        const cutoff = Date.now() - hoursOld * 60 * 60 * 1000;
        await _database__WEBPACK_IMPORTED_MODULE_0__.db.imageFiles.where('createdAt').below(cutoff).delete();
        log.info(`Cleaned up images older than ${hoursOld} hours`);
    } catch (error) {
        log.error('Failed to cleanup old images:', error);
    }
}
/**
 * Get total size of stored images
 */ async function getImageStorageSize() {
    const images = await db.imageFiles.toArray();
    return images.reduce((total, img)=>total + img.size, 0);
}
/**
 * Store a PDF file as a Blob in IndexedDB.
 * Returns a storage key that can be used to retrieve the blob later.
 */ async function storePdfBlob(file) {
    const storageKey = `pdf_${(0,nanoid__WEBPACK_IMPORTED_MODULE_2__/* .nanoid */ .Ak)(10)}`;
    const blob = new Blob([
        await file.arrayBuffer()
    ], {
        type: file.type || 'application/pdf'
    });
    const record = {
        id: storageKey,
        blob,
        filename: file.name,
        mimeType: file.type || 'application/pdf',
        size: blob.size,
        createdAt: Date.now()
    };
    await _database__WEBPACK_IMPORTED_MODULE_0__.db.imageFiles.put(record);
    return storageKey;
}
/**
 * Load a PDF Blob from IndexedDB by its storage key.
 */ async function loadPdfBlob(key) {
    const record = await _database__WEBPACK_IMPORTED_MODULE_0__.db.imageFiles.get(key);
    return record?.blob ?? null;
}


/***/ }),

/***/ 636501:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S8: () => (/* binding */ normalizeVoxCPMReferenceAudio),
/* harmony export */   Tc: () => (/* binding */ validateVoxCPMReferenceAudio),
/* harmony export */   pX: () => (/* binding */ getVoxCPMProviderOptions),
/* harmony export */   qU: () => (/* binding */ VOXCPM_REFERENCE_AUDIO_MAX_SECONDS),
/* harmony export */   tD: () => (/* binding */ useVoxCPMVoiceProfiles)
/* harmony export */ });
/* unused harmony exports VOXCPM_REFERENCE_AUDIO_MAX_BYTES, getVoxCPMVoiceOptions */
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(167324);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(832917);
/* harmony import */ var _lib_audio_voice_registration_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(749750);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voxcpm-voices.ts
 *
 * Verbatim port — `@/lib/utils/database` is the real Dexie-backed port,
 * `@/lib/audio/voice-registration-client` is ported, `@/lib/audio/voxcpm` is
 * the real port.
 */ /* __next_internal_client_entry_do_not_use__ VOXCPM_REFERENCE_AUDIO_MAX_BYTES,VOXCPM_REFERENCE_AUDIO_MAX_SECONDS,validateVoxCPMReferenceAudio,normalizeVoxCPMReferenceAudio,getVoxCPMVoiceOptions,useVoxCPMVoiceProfiles,getVoxCPMProviderOptions auto */ 



const VOXCPM_VOICE_PROFILES_CHANGED = 'voxcpm-voice-profiles-changed';
const VOXCPM_REFERENCE_AUDIO_MAX_BYTES = 10 * 1024 * 1024;
const VOXCPM_REFERENCE_AUDIO_MAX_SECONDS = 60;
function notifyVoiceProfilesChanged() {
    window.dispatchEvent(new Event(VOXCPM_VOICE_PROFILES_CHANGED));
}
function createId() {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
async function blobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onerror = ()=>reject(reader.error || new Error('Failed to read reference audio'));
        reader.onload = ()=>{
            const result = typeof reader.result === 'string' ? reader.result : '';
            const commaIndex = result.indexOf(',');
            resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
        };
        reader.readAsDataURL(blob);
    });
}
function isWavAudio(blob, fileName) {
    return blob.type.includes('audio/wav') || blob.type.includes('audio/x-wav') || /\.wav$/i.test(fileName || '');
}
function replaceFileExtension(fileName, extension) {
    const cleanName = fileName?.trim() || `reference.${extension}`;
    return cleanName.includes('.') ? cleanName.replace(/\.[^.]+$/u, `.${extension}`) : `${cleanName}.${extension}`;
}
function writeAscii(view, offset, value) {
    for(let i = 0; i < value.length; i++){
        view.setUint8(offset + i, value.charCodeAt(i));
    }
}
function audioBufferToMonoWav(audioBuffer) {
    const sampleRate = audioBuffer.sampleRate;
    const sampleCount = audioBuffer.length;
    const dataSize = sampleCount * 2;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    writeAscii(view, 0, 'RIFF');
    view.setUint32(4, 36 + dataSize, true);
    writeAscii(view, 8, 'WAVE');
    writeAscii(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * 2, true);
    view.setUint16(32, 2, true);
    view.setUint16(34, 16, true);
    writeAscii(view, 36, 'data');
    view.setUint32(40, dataSize, true);
    const channels = Array.from({
        length: audioBuffer.numberOfChannels
    }, (_, index)=>audioBuffer.getChannelData(index));
    let offset = 44;
    for(let i = 0; i < sampleCount; i++){
        let mixed = 0;
        for (const channel of channels)mixed += channel[i];
        const sample = Math.max(-1, Math.min(1, mixed / channels.length));
        view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
        offset += 2;
    }
    return buffer;
}
async function decodeAudioBlob(blob) {
    if (true) {
        throw new Error('Audio decoding requires a browser environment');
    }
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) {
        throw new Error('This browser does not support audio conversion');
    }
    const audioContext = new AudioContextConstructor();
    try {
        const arrayBuffer = await blob.arrayBuffer();
        return await audioContext.decodeAudioData(arrayBuffer.slice(0));
    } finally{
        await audioContext.close().catch(()=>undefined);
    }
}
async function audioBlobToWav(blob) {
    const audioBuffer = await decodeAudioBlob(blob);
    return new Blob([
        audioBufferToMonoWav(audioBuffer)
    ], {
        type: 'audio/wav'
    });
}
async function validateVoxCPMReferenceAudio(blob) {
    if (blob.size > VOXCPM_REFERENCE_AUDIO_MAX_BYTES) {
        throw new Error('Reference audio must be 10 MB or smaller');
    }
    const audioBuffer = await decodeAudioBlob(blob);
    if (audioBuffer.duration > VOXCPM_REFERENCE_AUDIO_MAX_SECONDS) {
        throw new Error('Reference audio must be 60 seconds or shorter');
    }
}
async function normalizeVoxCPMReferenceAudio(blob, fileName) {
    await validateVoxCPMReferenceAudio(blob);
    if (isWavAudio(blob, fileName)) {
        return {
            blob,
            name: replaceFileExtension(fileName, 'wav'),
            mimeType: blob.type || 'audio/wav'
        };
    }
    const wavBlob = await audioBlobToWav(blob);
    if (wavBlob.size > VOXCPM_REFERENCE_AUDIO_MAX_BYTES) {
        throw new Error('Reference audio must be 10 MB or smaller after conversion');
    }
    return {
        blob: wavBlob,
        name: replaceFileExtension(fileName, 'wav'),
        mimeType: 'audio/wav'
    };
}
function getVoxCPMVoiceOptions(profiles, options = {}) {
    const visibleProfiles = options.supportsClone ? profiles : profiles.filter((profile)=>profile.kind !== 'clone');
    return [
        VOXCPM_AUTO_VOICE,
        ...visibleProfiles.map((profile)=>({
                id: getVoxCPMProfileVoiceId(profile.id),
                name: profile.name,
                language: 'auto',
                gender: 'neutral',
                description: profile.kind === 'clone' ? 'Browser-saved cloned voice' : 'Browser-saved prompt voice'
            }))
    ];
}
function useVoxCPMVoiceProfiles() {
    const [profiles, setProfiles] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const refresh = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async ()=>{
        setLoading(true);
        try {
            const rows = await _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__.db.voiceProfiles.where('providerId').equals(_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3).toArray();
            rows.sort((a, b)=>b.updatedAt - a.updatedAt);
            setProfiles(rows);
        } finally{
            setLoading(false);
        }
    }, []);
    process.env.__NEXT_PRIVATE_MINIMIZE_MACRO_FALSE && (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        void refresh();
        window.addEventListener(VOXCPM_VOICE_PROFILES_CHANGED, refresh);
        return ()=>window.removeEventListener(VOXCPM_VOICE_PROFILES_CHANGED, refresh);
    }, [
        refresh
    ]);
    const addPromptVoice = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (input)=>{
        const now = Date.now();
        const id = createId();
        await _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__.db.voiceProfiles.put({
            id,
            providerId: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3,
            kind: 'prompt',
            name: input.name.trim(),
            voicePrompt: input.voicePrompt.trim(),
            createdAt: now,
            updatedAt: now
        });
        await refresh();
        notifyVoiceProfilesChanged();
        return (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .getVoxCPMProfileVoiceId */ .wy)(id);
    }, [
        refresh
    ]);
    const addCloneVoice = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (input)=>{
        const now = Date.now();
        const id = createId();
        const referenceAudio = await normalizeVoxCPMReferenceAudio(input.referenceAudio, input.referenceAudioName);
        await _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__.db.voiceProfiles.put({
            id,
            providerId: _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3,
            kind: 'clone',
            name: input.name.trim(),
            voicePrompt: input.voicePrompt?.trim() || undefined,
            promptText: input.promptText?.trim() || undefined,
            referenceAudio: referenceAudio.blob,
            referenceAudioName: referenceAudio.name,
            referenceAudioMimeType: referenceAudio.mimeType,
            createdAt: now,
            updatedAt: now
        });
        await refresh();
        notifyVoiceProfilesChanged();
        return (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .getVoxCPMProfileVoiceId */ .wy)(id);
    }, [
        refresh
    ]);
    const deleteVoice = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (id)=>{
        await _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__.db.voiceProfiles.delete(id);
        await refresh();
        notifyVoiceProfilesChanged();
    }, [
        refresh
    ]);
    return {
        profiles,
        loading,
        refresh,
        addPromptVoice,
        addCloneVoice,
        deleteVoice
    };
}
async function getVoxCPMProviderOptions(voiceId, context, request) {
    if (voiceId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_AUTO_VOICE_ID */ .p0) {
        // Drive register-once only when this VoxCPM backend supports it; otherwise
        // (and on any failure) fall back to the inline voice-design prompt.
        const canRegister = !!request && !!context?.voiceDesign && (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .voxCPMBackendSupportsVoiceRegistration */ .d$)(context.backend ?? 'vllm-omni');
        const registeredVoiceId = canRegister ? await (0,_lib_audio_voice_registration_client__WEBPACK_IMPORTED_MODULE_3__/* .ensureRegisteredVoice */ .F)(_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3, {
            voiceDesign: context.voiceDesign,
            language: context.language || context.locale
        }, request).catch(()=>undefined) : undefined;
        return {
            voiceMode: 'auto',
            voicePrompt: (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .buildAutoVoxCPMVoicePrompt */ .hp)(context),
            ...registeredVoiceId ? {
                registeredVoiceId
            } : {}
        };
    }
    const profileId = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .getVoxCPMProfileIdFromVoiceId */ .xU)(voiceId);
    if (!profileId) {
        return {
            voiceMode: 'prompt',
            voicePrompt: voiceId
        };
    }
    const profile = await _lib_utils_database__WEBPACK_IMPORTED_MODULE_1__.db.voiceProfiles.get(profileId);
    if (!profile) {
        return {
            voiceMode: 'auto',
            voicePrompt: (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .buildAutoVoxCPMVoicePrompt */ .hp)(context)
        };
    }
    if (profile.kind === 'clone' && profile.referenceAudio) {
        return {
            voiceMode: 'clone',
            voicePrompt: profile.voicePrompt,
            promptText: profile.promptText,
            referenceAudioBase64: await blobToBase64(profile.referenceAudio),
            referenceAudioMimeType: profile.referenceAudioMimeType || profile.referenceAudio.type || 'audio/wav',
            referenceAudioName: profile.referenceAudioName || `${profile.name}.wav`
        };
    }
    return {
        voiceMode: 'prompt',
        voicePrompt: profile.voicePrompt || profile.name
    };
}


/***/ }),

/***/ 683125:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Gc: () => (/* binding */ buildVideoManifestFromOutlines),
/* harmony export */   i7: () => (/* binding */ getVideoMediaRefForElement)
/* harmony export */ });
/* unused harmony export resolveVideoManifestEntry */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/media/video-manifest.ts
 *
 * Video manifest builder — ported verbatim.
 *
 * Walks a `SceneOutline[]`'s `mediaGenerations` and produces a
 * `VideoManifest` keyed by the element ID of each video generation request.
 * Used by `classroom-generation.ts` to embed generated-video references in
 * the persisted `Stage` so the client can hydrate a media task store.
 *
 * Pure types + iteration — no provider-specific code.
 */ function isGeneratedVideoRef(value) {
    return /^gen_vid_[\w-]+$/i.test(value);
}
function buildVideoManifestFromOutlines(outlines) {
    const manifest = {};
    for (const outline of outlines){
        for (const request of outline.mediaGenerations ?? []){
            if (request.type !== 'video') continue;
            manifest[request.elementId] = {
                type: 'video',
                prompt: request.prompt,
                aspectRatio: request.aspectRatio
            };
        }
    }
    return manifest;
}
function getVideoMediaRefForElement(element) {
    if (element.mediaRef) return element.mediaRef;
    if (element.src && isGeneratedVideoRef(element.src)) return element.src;
    return undefined;
}
function resolveVideoManifestEntry(stage, element) {
    const mediaRef = getVideoMediaRefForElement(element);
    if (!mediaRef) return undefined;
    return stage?.videoManifest?.[mediaRef];
}


/***/ }),

/***/ 687947:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SZ: () => (/* binding */ normalizeThinkingConfig),
/* harmony export */   UL: () => (/* binding */ getThinkingConfigKey),
/* harmony export */   e: () => (/* binding */ getThinkingDisplayValue),
/* harmony export */   oY: () => (/* binding */ getDefaultThinkingConfig),
/* harmony export */   yW: () => (/* binding */ supportsConfigurableThinking)
/* harmony export */ });
/* unused harmony exports clampBudgetForCapability, getThinkingMode, pickThinkingEffort, pickThinkingLevel, pickThinkingBudget */
function getThinkingConfigKey(providerId, modelId) {
    return `${providerId}:${modelId}`;
}
function supportsConfigurableThinking(thinking) {
    return !!thinking?.control && thinking.control !== 'none' && !!thinking.requestAdapter;
}
function clampBudgetForCapability(thinking, budgetTokens) {
    const range = thinking.budgetRange;
    if (!range || typeof budgetTokens !== 'number' || Number.isNaN(budgetTokens)) {
        return undefined;
    }
    if (budgetTokens === -1 && range.allowDynamic) return -1;
    return Math.max(range.min, Math.min(range.max, Math.round(budgetTokens)));
}
function getThinkingMode(config) {
    if (!config) return undefined;
    if (config.mode && config.mode !== 'default') return config.mode;
    if (config.enabled === false) return 'disabled';
    if (config.enabled === true) return 'enabled';
    return undefined;
}
function pickThinkingEffort(thinking, config) {
    const allowed = thinking.effortValues;
    if (!allowed?.length) return undefined;
    if (config.effort && allowed.includes(config.effort)) return config.effort;
    const mode = getThinkingMode(config);
    if (mode === 'disabled') {
        return allowed.includes('none') && 'none' || allowed.includes('minimal') && 'minimal' || allowed.includes('low') && 'low' || thinking.defaultEffort;
    }
    if (mode === 'enabled') return thinking.defaultEffort;
    return undefined;
}
function pickThinkingLevel(thinking, config) {
    const allowed = thinking.levelValues;
    if (!allowed?.length) return undefined;
    if (config.level && allowed.includes(config.level)) return config.level;
    const mode = getThinkingMode(config);
    if (mode === 'disabled') {
        return allowed.includes('minimal') && 'minimal' || allowed.includes('low') && 'low' || thinking.defaultLevel;
    }
    if (mode === 'enabled') return thinking.defaultLevel;
    return undefined;
}
function pickThinkingBudget(thinking, config) {
    const range = thinking.budgetRange;
    if (!range) return undefined;
    const mode = getThinkingMode(config);
    if (mode === 'disabled' && range.disableValue !== undefined) {
        return range.disableValue;
    }
    const rawBudget = typeof config.budgetTokens === 'number' ? config.budgetTokens : thinking.defaultBudgetTokens;
    return clampBudgetForCapability(thinking, rawBudget);
}
function defaultModeForCapability(thinking) {
    return thinking.defaultMode ?? (thinking.defaultEnabled === false ? 'disabled' : 'enabled');
}
function defaultEffortForCapability(thinking) {
    return thinking.defaultEffort ?? thinking.effortValues?.[0];
}
function defaultLevelForCapability(thinking) {
    return thinking.defaultLevel ?? thinking.levelValues?.[0];
}
function getDefaultThinkingConfig(thinking) {
    if (!supportsConfigurableThinking(thinking)) return undefined;
    switch(thinking.control){
        case 'effort':
            {
                const effort = defaultEffortForCapability(thinking);
                return effort ? {
                    mode: effort === 'none' ? 'disabled' : 'enabled',
                    effort
                } : {
                    mode: defaultModeForCapability(thinking)
                };
            }
        case 'level':
            {
                const level = defaultLevelForCapability(thinking);
                return level ? {
                    mode: 'enabled',
                    level
                } : {
                    mode: defaultModeForCapability(thinking)
                };
            }
        case 'toggle':
            return {
                mode: defaultModeForCapability(thinking)
            };
        case 'toggle-budget':
            return {
                mode: defaultModeForCapability(thinking),
                budgetTokens: thinking.defaultBudgetTokens
            };
        case 'budget-only':
            return {
                mode: 'enabled',
                budgetTokens: thinking.defaultBudgetTokens
            };
        case 'mode':
            return {
                mode: defaultModeForCapability(thinking)
            };
        default:
            return undefined;
    }
}
function normalizeThinkingConfig(thinking, config) {
    if (!supportsConfigurableThinking(thinking)) return undefined;
    const mode = getThinkingMode(config);
    switch(thinking.control){
        case 'effort':
            {
                const effort = (config ? pickThinkingEffort(thinking, config) : undefined) ?? defaultEffortForCapability(thinking);
                if (!effort) return undefined;
                return {
                    mode: effort === 'none' ? 'disabled' : 'enabled',
                    effort
                };
            }
        case 'level':
            {
                const level = (config ? pickThinkingLevel(thinking, config) : undefined) ?? defaultLevelForCapability(thinking);
                if (!level) return undefined;
                return {
                    mode: 'enabled',
                    level
                };
            }
        case 'toggle':
            return {
                mode: mode ?? defaultModeForCapability(thinking)
            };
        case 'toggle-budget':
            {
                const normalizedMode = mode ?? defaultModeForCapability(thinking);
                const budget = config ? pickThinkingBudget(thinking, config) : undefined;
                return {
                    mode: normalizedMode,
                    budgetTokens: budget ?? thinking.defaultBudgetTokens
                };
            }
        case 'budget-only':
            {
                const budget = config ? pickThinkingBudget(thinking, config) : undefined;
                return {
                    mode: 'enabled',
                    budgetTokens: budget ?? thinking.defaultBudgetTokens
                };
            }
        case 'mode':
            return {
                mode: mode ?? defaultModeForCapability(thinking)
            };
        default:
            return undefined;
    }
}
function getThinkingDisplayValue(thinking, config) {
    const normalized = normalizeThinkingConfig(thinking, config) ?? getDefaultThinkingConfig(thinking);
    if (!supportsConfigurableThinking(thinking) || !normalized) return undefined;
    if (thinking.control === 'effort') return normalized.effort;
    if (thinking.control === 'level') return normalized.level;
    if (thinking.control === 'budget-only') {
        return normalized.budgetTokens === -1 ? 'dynamic' : `${normalized.budgetTokens ?? ''}`;
    }
    if (thinking.control === 'toggle-budget') {
        if (normalized.mode === 'disabled') return 'off';
        if (normalized.budgetTokens === -1 && thinking.budgetRange?.allowDynamic) return 'auto';
        return normalized.budgetTokens && normalized.budgetTokens !== -1 ? `${normalized.budgetTokens}` : 'on';
    }
    if (thinking.control === 'mode') return normalized.mode;
    return normalized.mode === 'disabled' ? 'off' : 'on';
}


/***/ }),

/***/ 689355:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Co: () => (/* binding */ ASR_PROVIDERS),
/* harmony export */   D$: () => (/* binding */ CUSTOM_ASR_DEFAULT_LANGUAGES),
/* harmony export */   JF: () => (/* binding */ TTS_PROVIDERS),
/* harmony export */   S5: () => (/* binding */ DEFAULT_TTS_VOICES),
/* harmony export */   Wl: () => (/* binding */ getASRSupportedLanguages)
/* harmony export */ });
/* unused harmony exports MINIMAX_TTS_MODELS, DEFAULT_TTS_MODELS, getAllTTSProviders, getTTSProvider, getTTSVoices, getAllASRProviders, getASRProvider */
/* harmony import */ var _voxcpm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(832917);
/**
 * Audio Provider Constants
 *
 * Registry of all TTS and ASR providers with their metadata.
 * Separated from tts-providers.ts and asr-providers.ts to avoid importing
 * Node.js libraries (like sharp, buffer) in client components.
 *
 * This file is client-safe and can be imported in both client and server components.
 *
 * To add a new provider:
 * 1. Add the provider ID to TTSProviderId or ASRProviderId in types.ts
 * 2. Add provider configuration to TTS_PROVIDERS or ASR_PROVIDERS below
 * 3. Implement provider logic in tts-providers.ts or asr-providers.ts
 * 4. Add i18n translations in lib/i18n.ts
 *
 * Provider configuration should include:
 * - id: Unique identifier matching the type definition
 * - name: Display name for the provider
 * - requiresApiKey: Whether the provider needs an API key
 * - defaultBaseUrl: Default API endpoint (optional)
 * - icon: Path to provider icon (optional)
 * - models: Available model choices (empty array if no model concept)
 * - defaultModelId: Default model ID (empty string if no models)
 * - voices: Array of available voices (TTS only)
 * - supportedFormats: Audio formats supported by the provider
 * - speedRange: Min/max/default speed settings (TTS only)
 * - supportedLanguages: Languages supported by the provider (ASR only)
 */ 
/**
 * Default supported languages for custom OpenAI-compatible ASR providers.
 * A practical subset of commonly used languages + auto-detect.
 */ const CUSTOM_ASR_DEFAULT_LANGUAGES = [
    'auto',
    'zh',
    'en',
    'ja',
    'ko',
    'es',
    'fr',
    'de',
    'ru',
    'ar',
    'pt',
    'it',
    'hi'
];
/**
 * TTS Provider Registry
 *
 * Central registry for all TTS providers.
 * Keep in sync with TTSProviderId type definition.
 */ const MINIMAX_TTS_MODELS = [
    {
        id: 'speech-2.8-hd',
        name: 'Speech 2.8 HD'
    },
    {
        id: 'speech-2.8-turbo',
        name: 'Speech 2.8 Turbo'
    },
    {
        id: 'speech-2.6-hd',
        name: 'Speech 2.6 HD'
    },
    {
        id: 'speech-2.6-turbo',
        name: 'Speech 2.6 Turbo'
    },
    {
        id: 'speech-02-hd',
        name: 'Speech 02 HD'
    },
    {
        id: 'speech-02-turbo',
        name: 'Speech 02 Turbo'
    }
];
const TTS_PROVIDERS = {
    'openai-tts': {
        id: 'openai-tts',
        name: 'OpenAI TTS',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.openai.com/v1',
        icon: '/logos/openai.svg',
        models: [
            {
                id: 'gpt-4o-mini-tts',
                name: 'GPT-4o Mini TTS'
            },
            {
                id: 'tts-1',
                name: 'TTS-1'
            },
            {
                id: 'tts-1-hd',
                name: 'TTS-1 HD'
            }
        ],
        defaultModelId: 'gpt-4o-mini-tts',
        voices: [
            // Recommended voices (best quality)
            {
                id: 'marin',
                name: 'Marin',
                language: 'en',
                gender: 'neutral',
                description: 'voiceMarin',
                compatibleModels: [
                    'gpt-4o-mini-tts'
                ]
            },
            {
                id: 'cedar',
                name: 'Cedar',
                language: 'en',
                gender: 'neutral',
                description: 'voiceCedar',
                compatibleModels: [
                    'gpt-4o-mini-tts'
                ]
            },
            // Standard voices (alphabetical)
            {
                id: 'alloy',
                name: 'Alloy',
                language: 'en',
                gender: 'neutral',
                description: 'voiceAlloy'
            },
            {
                id: 'ash',
                name: 'Ash',
                language: 'en',
                gender: 'neutral',
                description: 'voiceAsh'
            },
            {
                id: 'ballad',
                name: 'Ballad',
                language: 'en',
                gender: 'neutral',
                description: 'voiceBallad'
            },
            {
                id: 'coral',
                name: 'Coral',
                language: 'en',
                gender: 'neutral',
                description: 'voiceCoral'
            },
            {
                id: 'echo',
                name: 'Echo',
                language: 'en',
                gender: 'male',
                description: 'voiceEcho'
            },
            {
                id: 'fable',
                name: 'Fable',
                language: 'en',
                gender: 'neutral',
                description: 'voiceFable'
            },
            {
                id: 'nova',
                name: 'Nova',
                language: 'en',
                gender: 'female',
                description: 'voiceNova'
            },
            {
                id: 'onyx',
                name: 'Onyx',
                language: 'en',
                gender: 'male',
                description: 'voiceOnyx'
            },
            {
                id: 'sage',
                name: 'Sage',
                language: 'en',
                gender: 'neutral',
                description: 'voiceSage'
            },
            {
                id: 'shimmer',
                name: 'Shimmer',
                language: 'en',
                gender: 'female',
                description: 'voiceShimmer'
            },
            {
                id: 'verse',
                name: 'Verse',
                language: 'en',
                gender: 'neutral',
                description: 'voiceVerse'
            }
        ],
        supportedFormats: [
            'mp3',
            'opus',
            'aac',
            'flac'
        ],
        speedRange: {
            min: 0.25,
            max: 4.0,
            default: 1.0
        }
    },
    'azure-tts': {
        id: 'azure-tts',
        name: 'Azure TTS',
        requiresApiKey: true,
        defaultBaseUrl: 'https://{region}.tts.speech.microsoft.com',
        icon: '/logos/azure.svg',
        models: [],
        defaultModelId: '',
        voices: [
            {
                id: 'zh-CN-XiaoxiaoNeural',
                name: '晓晓 (女)',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh-CN-YunxiNeural',
                name: '云希 (男)',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh-CN-XiaoyiNeural',
                name: '晓伊 (女)',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh-CN-YunjianNeural',
                name: '云健 (男)',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'en-US-JennyNeural',
                name: 'Jenny',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'en-US-GuyNeural',
                name: 'Guy',
                language: 'en-US',
                gender: 'male'
            }
        ],
        supportedFormats: [
            'mp3',
            'wav',
            'ogg'
        ],
        speedRange: {
            min: 0.5,
            max: 2.0,
            default: 1.0
        }
    },
    'glm-tts': {
        id: 'glm-tts',
        name: 'GLM TTS',
        requiresApiKey: true,
        defaultBaseUrl: 'https://open.bigmodel.cn/api/paas/v4',
        icon: '/logos/glm.svg',
        models: [
            {
                id: 'glm-tts',
                name: 'GLM TTS'
            }
        ],
        defaultModelId: 'glm-tts',
        voices: [
            {
                id: 'tongtong',
                name: '彤彤',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceTongtong'
            },
            {
                id: 'chuichui',
                name: '锤锤',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceChuichui'
            },
            {
                id: 'xiaochen',
                name: '小陈',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceXiaochen'
            },
            {
                id: 'jam',
                name: 'Jam',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceJam'
            },
            {
                id: 'kazi',
                name: 'Kazi',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceKazi'
            },
            {
                id: 'douji',
                name: '豆几',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceDouji'
            },
            {
                id: 'luodo',
                name: '罗多',
                language: 'zh',
                gender: 'neutral',
                description: 'glmVoiceLuodo'
            }
        ],
        supportedFormats: [
            'mp3',
            'wav'
        ],
        speedRange: {
            min: 0.5,
            max: 2.0,
            default: 1.0
        }
    },
    'qwen-tts': {
        id: 'qwen-tts',
        name: 'Qwen TTS (阿里云百炼)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/api/v1',
        icon: '/logos/bailian.svg',
        models: [
            {
                id: 'qwen3-tts-flash',
                name: 'Qwen3 TTS Flash'
            },
            {
                id: 'qwen3-tts-instruct-flash',
                name: 'Qwen3 TTS Instruct Flash'
            },
            {
                id: 'qwen-tts',
                name: 'Qwen TTS'
            }
        ],
        defaultModelId: 'qwen3-tts-flash',
        voices: [
            // Standard Mandarin voices
            {
                id: 'Cherry',
                name: '芊悦 (Cherry)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceCherry'
            },
            {
                id: 'Serena',
                name: '苏瑶 (Serena)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceSerena'
            },
            {
                id: 'Ethan',
                name: '晨煦 (Ethan)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceEthan'
            },
            {
                id: 'Chelsie',
                name: '千雪 (Chelsie)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceChelsie'
            },
            {
                id: 'Momo',
                name: '茉兔 (Momo)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceMomo'
            },
            {
                id: 'Vivian',
                name: '十三 (Vivian)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceVivian'
            },
            {
                id: 'Moon',
                name: '月白 (Moon)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceMoon'
            },
            {
                id: 'Maia',
                name: '四月 (Maia)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceMaia'
            },
            {
                id: 'Kai',
                name: '凯 (Kai)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceKai'
            },
            {
                id: 'Nofish',
                name: '不吃鱼 (Nofish)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceNofish'
            },
            {
                id: 'Bella',
                name: '萌宝 (Bella)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceBella'
            },
            {
                id: 'Jennifer',
                name: '詹妮弗 (Jennifer)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceJennifer'
            },
            {
                id: 'Ryan',
                name: '甜茶 (Ryan)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceRyan'
            },
            {
                id: 'Katerina',
                name: '卡捷琳娜 (Katerina)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceKaterina'
            },
            {
                id: 'Aiden',
                name: '艾登 (Aiden)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceAiden'
            },
            {
                id: 'Eldric Sage',
                name: '沧明子 (Eldric Sage)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceEldricSage'
            },
            {
                id: 'Mia',
                name: '乖小妹 (Mia)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceMia'
            },
            {
                id: 'Mochi',
                name: '沙小弥 (Mochi)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceMochi'
            },
            {
                id: 'Bellona',
                name: '燕铮莺 (Bellona)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceBellona'
            },
            {
                id: 'Vincent',
                name: '田叔 (Vincent)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceVincent'
            },
            {
                id: 'Bunny',
                name: '萌小姬 (Bunny)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceBunny'
            },
            {
                id: 'Neil',
                name: '阿闻 (Neil)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceNeil'
            },
            {
                id: 'Elias',
                name: '墨讲师 (Elias)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceElias'
            },
            {
                id: 'Arthur',
                name: '徐大爷 (Arthur)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceArthur'
            },
            {
                id: 'Nini',
                name: '邻家妹妹 (Nini)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceNini'
            },
            {
                id: 'Ebona',
                name: '诡婆婆 (Ebona)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceEbona'
            },
            {
                id: 'Seren',
                name: '小婉 (Seren)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceSeren'
            },
            {
                id: 'Pip',
                name: '顽屁小孩 (Pip)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoicePip'
            },
            {
                id: 'Stella',
                name: '少女阿月 (Stella)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceStella'
            },
            // International voices
            {
                id: 'Bodega',
                name: '博德加 (Bodega)',
                language: 'es',
                gender: 'male',
                description: 'qwenVoiceBodega'
            },
            {
                id: 'Sonrisa',
                name: '索尼莎 (Sonrisa)',
                language: 'es',
                gender: 'female',
                description: 'qwenVoiceSonrisa'
            },
            {
                id: 'Alek',
                name: '阿列克 (Alek)',
                language: 'ru',
                gender: 'male',
                description: 'qwenVoiceAlek'
            },
            {
                id: 'Dolce',
                name: '多尔切 (Dolce)',
                language: 'it',
                gender: 'male',
                description: 'qwenVoiceDolce'
            },
            {
                id: 'Sohee',
                name: '素熙 (Sohee)',
                language: 'ko',
                gender: 'female',
                description: 'qwenVoiceSohee'
            },
            {
                id: 'Ono Anna',
                name: '小野杏 (Ono Anna)',
                language: 'ja',
                gender: 'female',
                description: 'qwenVoiceOnoAnna'
            },
            {
                id: 'Lenn',
                name: '莱恩 (Lenn)',
                language: 'de',
                gender: 'male',
                description: 'qwenVoiceLenn'
            },
            {
                id: 'Emilien',
                name: '埃米尔安 (Emilien)',
                language: 'fr',
                gender: 'male',
                description: 'qwenVoiceEmilien'
            },
            {
                id: 'Andre',
                name: '安德雷 (Andre)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceAndre'
            },
            {
                id: 'Radio Gol',
                name: '拉迪奥·戈尔 (Radio Gol)',
                language: 'pt',
                gender: 'male',
                description: 'qwenVoiceRadioGol'
            },
            // Dialect voices
            {
                id: 'Jada',
                name: '上海-阿珍 (Jada)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceJada'
            },
            {
                id: 'Dylan',
                name: '北京-晓东 (Dylan)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceDylan'
            },
            {
                id: 'Li',
                name: '南京-老李 (Li)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceLi'
            },
            {
                id: 'Marcus',
                name: '陕西-秦川 (Marcus)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceMarcus'
            },
            {
                id: 'Roy',
                name: '闽南-阿杰 (Roy)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceRoy'
            },
            {
                id: 'Peter',
                name: '天津-李彼得 (Peter)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoicePeter'
            },
            {
                id: 'Sunny',
                name: '四川-晴儿 (Sunny)',
                language: 'zh-CN',
                gender: 'female',
                description: 'qwenVoiceSunny'
            },
            {
                id: 'Eric',
                name: '四川-程川 (Eric)',
                language: 'zh-CN',
                gender: 'male',
                description: 'qwenVoiceEric'
            },
            {
                id: 'Rocky',
                name: '粤语-阿强 (Rocky)',
                language: 'zh-HK',
                gender: 'male',
                description: 'qwenVoiceRocky'
            },
            {
                id: 'Kiki',
                name: '粤语-阿清 (Kiki)',
                language: 'zh-HK',
                gender: 'female',
                description: 'qwenVoiceKiki'
            }
        ],
        supportedFormats: [
            'mp3',
            'wav',
            'pcm'
        ]
    },
    'minimax-tts': {
        id: 'minimax-tts',
        name: 'MiniMax TTS',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.minimaxi.com',
        icon: '/logos/minimax.svg',
        models: MINIMAX_TTS_MODELS.map((m)=>({
                id: m.id,
                name: m.name
            })),
        defaultModelId: 'speech-2.8-hd',
        voices: [
            // 中文常用
            {
                id: 'female-yujie',
                name: '御姐音色',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'male-qn-jingying',
                name: '精英青年',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'female-shaonv',
                name: '少女音色',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'Chinese (Mandarin)_Gentleman',
                name: '温润男声',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'Chinese (Mandarin)_News_Anchor',
                name: '新闻女声',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'Chinese (Mandarin)_Warm_Girl',
                name: '温暖少女',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'Chinese (Mandarin)_Radio_Host',
                name: '电台男主播',
                language: 'zh-CN',
                gender: 'male'
            },
            // 英文
            {
                id: 'English_Trustworthy_Man',
                name: 'Trustworthy Man',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'English_Graceful_Lady',
                name: 'Graceful Lady',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'English_expressive_narrator',
                name: 'Expressive Narrator',
                language: 'en-US',
                gender: 'neutral'
            }
        ],
        supportedFormats: [
            'mp3',
            'wav',
            'flac',
            'pcm'
        ],
        speedRange: {
            min: 0.5,
            max: 2.0,
            default: 1.0
        }
    },
    'voxcpm-tts': {
        id: _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_TTS_PROVIDER_ID */ .i3,
        name: 'VoxCPM2',
        requiresApiKey: false,
        defaultBaseUrl: 'http://127.0.0.1:8000',
        icon: '/logos/voxcpm-icon.png',
        models: [
            {
                id: _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
                name: 'VoxCPM2'
            }
        ],
        defaultModelId: _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
        voices: [
            _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_AUTO_VOICE */ .n
        ],
        supportedFormats: [
            'mp3',
            'wav'
        ],
        speedRange: {
            min: 0.5,
            max: 2.0,
            default: 1.0
        }
    },
    'doubao-tts': {
        id: 'doubao-tts',
        name: '豆包 TTS 2.0（火山引擎）',
        requiresApiKey: true,
        defaultBaseUrl: 'https://openspeech.bytedance.com/api/v3/tts',
        icon: '/logos/doubao.svg',
        models: [],
        defaultModelId: '',
        voices: [
            {
                id: 'zh_female_vv_uranus_bigtts',
                name: 'Vivi 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_xiaohe_uranus_bigtts',
                name: '小何 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_male_m191_uranus_bigtts',
                name: '云舟 2.0',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh_male_taocheng_uranus_bigtts',
                name: '小天 2.0',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh_male_liufei_uranus_bigtts',
                name: '刘飞 2.0',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh_female_qingxinnvsheng_uranus_bigtts',
                name: '清新女声 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_cancan_uranus_bigtts',
                name: '知性灿灿 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_shuangkuaisisi_uranus_bigtts',
                name: '爽快思思 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_tianmeixiaoyuan_uranus_bigtts',
                name: '甜美小源 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_linjianvhai_uranus_bigtts',
                name: '邻家女孩 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_male_shaonianzixin_uranus_bigtts',
                name: '少年梓辛 2.0',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh_male_ruyayichen_uranus_bigtts',
                name: '儒雅逸辰 2.0',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zh_female_yingyujiaoxue_uranus_bigtts',
                name: 'Tina老师 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zh_female_kefunvsheng_uranus_bigtts',
                name: '暖阳女声 2.0',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'en_male_tim_uranus_bigtts',
                name: 'Tim',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'en_female_dacey_uranus_bigtts',
                name: 'Dacey',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'en_female_stokie_uranus_bigtts',
                name: 'Stokie',
                language: 'en-US',
                gender: 'female'
            }
        ],
        supportedFormats: [
            'mp3'
        ],
        speedRange: {
            min: 0.5,
            max: 2.0,
            default: 1.0
        }
    },
    'elevenlabs-tts': {
        id: 'elevenlabs-tts',
        name: 'ElevenLabs TTS',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.elevenlabs.io/v1',
        icon: '/logos/elevenlabs.svg',
        models: [
            {
                id: 'eleven_multilingual_v2',
                name: 'Multilingual v2'
            },
            {
                id: 'eleven_flash_v2_5',
                name: 'Flash v2.5'
            },
            {
                id: 'eleven_flash_v2',
                name: 'Flash v2'
            }
        ],
        defaultModelId: 'eleven_multilingual_v2',
        // Free-tier-safe fallback set; account-specific/custom voices should come from /v2/voices dynamically later.
        voices: [
            {
                id: 'EXAVITQu4vr4xnSDxMaL',
                name: 'Sarah',
                language: 'en-US',
                gender: 'female',
                description: 'Confident and warm professional voice for clear narration'
            },
            {
                id: 'Xb7hH8MSUJpSbSDYk0k2',
                name: 'Alice',
                language: 'en-GB',
                gender: 'female',
                description: 'Clear and engaging British educator voice for e-learning'
            },
            {
                id: 'XrExE9yKIg1WjnnlVkGX',
                name: 'Matilda',
                language: 'en-US',
                gender: 'female',
                description: 'Knowledgeable and upbeat voice suited for lectures'
            },
            {
                id: 'CwhRBWXzGAHq8TQ4Fs17',
                name: 'Roger',
                language: 'en-US',
                gender: 'male',
                description: 'Laid-back but resonant male voice for friendly lessons'
            },
            {
                id: 'cjVigY5qzO86Huf0OWal',
                name: 'Eric',
                language: 'en-US',
                gender: 'male',
                description: 'Smooth and trustworthy voice for polished classroom audio'
            },
            {
                id: 'onwK4e9ZLuTAKqWW03F9',
                name: 'Daniel',
                language: 'en-GB',
                gender: 'male',
                description: 'Steady British broadcaster voice for formal explanations'
            },
            {
                id: 'SAz9YHcvj6GT2YYXdXww',
                name: 'River',
                language: 'en-US',
                gender: 'neutral',
                description: 'Relaxed and informative neutral voice for general narration'
            }
        ],
        supportedFormats: [
            'mp3',
            'opus',
            'pcm',
            'wav',
            'ulaw',
            'alaw'
        ],
        speedRange: {
            min: 0.7,
            max: 1.2,
            default: 1.0
        }
    },
    'browser-native-tts': {
        id: 'browser-native-tts',
        name: '浏览器原生 (Web Speech API)',
        requiresApiKey: false,
        icon: '/logos/browser.svg',
        models: [],
        defaultModelId: '',
        voices: [
            // Note: Actual voices are determined by the browser and OS
            // These are placeholder - real voices are fetched dynamically via speechSynthesis.getVoices()
            {
                id: 'default',
                name: '默认',
                language: 'zh-CN',
                gender: 'neutral'
            }
        ],
        supportedFormats: [
            'browser'
        ],
        speedRange: {
            min: 0.1,
            max: 10.0,
            default: 1.0
        }
    },
    'lemonade-tts': {
        id: 'lemonade-tts',
        name: 'Lemonade TTS',
        requiresApiKey: false,
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: '/logos/lemonade.svg',
        models: [
            {
                id: 'kokoro-v1',
                name: 'Kokoro v1'
            }
        ],
        defaultModelId: 'kokoro-v1',
        voices: [
            // American English — female
            {
                id: 'af_alloy',
                name: 'Alloy',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_aoede',
                name: 'Aoede',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_bella',
                name: 'Bella',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_heart',
                name: 'Heart',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_jessica',
                name: 'Jessica',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_kore',
                name: 'Kore',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_nicole',
                name: 'Nicole',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_nova',
                name: 'Nova',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_river',
                name: 'River',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_sarah',
                name: 'Sarah',
                language: 'en-US',
                gender: 'female'
            },
            {
                id: 'af_sky',
                name: 'Sky',
                language: 'en-US',
                gender: 'female'
            },
            // American English — male
            {
                id: 'am_adam',
                name: 'Adam',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_echo',
                name: 'Echo',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_eric',
                name: 'Eric',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_fenrir',
                name: 'Fenrir',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_liam',
                name: 'Liam',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_michael',
                name: 'Michael',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_onyx',
                name: 'Onyx',
                language: 'en-US',
                gender: 'male'
            },
            {
                id: 'am_puck',
                name: 'Puck',
                language: 'en-US',
                gender: 'male'
            },
            // British English — female
            {
                id: 'bf_alice',
                name: 'Alice',
                language: 'en-GB',
                gender: 'female'
            },
            {
                id: 'bf_emma',
                name: 'Emma',
                language: 'en-GB',
                gender: 'female'
            },
            {
                id: 'bf_isabella',
                name: 'Isabella',
                language: 'en-GB',
                gender: 'female'
            },
            {
                id: 'bf_lily',
                name: 'Lily',
                language: 'en-GB',
                gender: 'female'
            },
            // British English — male
            {
                id: 'bm_daniel',
                name: 'Daniel',
                language: 'en-GB',
                gender: 'male'
            },
            {
                id: 'bm_fable',
                name: 'Fable',
                language: 'en-GB',
                gender: 'male'
            },
            {
                id: 'bm_george',
                name: 'George',
                language: 'en-GB',
                gender: 'male'
            },
            {
                id: 'bm_lewis',
                name: 'Lewis',
                language: 'en-GB',
                gender: 'male'
            },
            // Mandarin Chinese — female
            {
                id: 'zf_xiaobei',
                name: '晓贝',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zf_xiaoni',
                name: '晓妮',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zf_xiaoxiao',
                name: '晓晓',
                language: 'zh-CN',
                gender: 'female'
            },
            {
                id: 'zf_xiaoyi',
                name: '晓伊',
                language: 'zh-CN',
                gender: 'female'
            },
            // Mandarin Chinese — male
            {
                id: 'zm_yunjian',
                name: '云健',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zm_yunxi',
                name: '云希',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zm_yunxia',
                name: '云夏',
                language: 'zh-CN',
                gender: 'male'
            },
            {
                id: 'zm_yunyang',
                name: '云扬',
                language: 'zh-CN',
                gender: 'male'
            },
            // Japanese — female
            {
                id: 'jf_alpha',
                name: 'Alpha',
                language: 'ja-JP',
                gender: 'female'
            },
            {
                id: 'jf_gongitsune',
                name: 'Gongitsune',
                language: 'ja-JP',
                gender: 'female'
            },
            {
                id: 'jf_nezumi',
                name: 'Nezumi',
                language: 'ja-JP',
                gender: 'female'
            },
            {
                id: 'jf_tebukuro',
                name: 'Tebukuro',
                language: 'ja-JP',
                gender: 'female'
            },
            // Japanese — male
            {
                id: 'jm_kumo',
                name: 'Kumo',
                language: 'ja-JP',
                gender: 'male'
            },
            // Spanish
            {
                id: 'ef_dora',
                name: 'Dora',
                language: 'es-ES',
                gender: 'female'
            },
            {
                id: 'em_alex',
                name: 'Alex',
                language: 'es-ES',
                gender: 'male'
            },
            {
                id: 'em_santa',
                name: 'Santa',
                language: 'es-ES',
                gender: 'male'
            },
            // French
            {
                id: 'ff_siwis',
                name: 'Siwis',
                language: 'fr-FR',
                gender: 'female'
            },
            // Hindi
            {
                id: 'hf_alpha',
                name: 'Alpha',
                language: 'hi-IN',
                gender: 'female'
            },
            {
                id: 'hf_beta',
                name: 'Beta',
                language: 'hi-IN',
                gender: 'female'
            },
            {
                id: 'hm_omega',
                name: 'Omega',
                language: 'hi-IN',
                gender: 'male'
            },
            {
                id: 'hm_psi',
                name: 'Psi',
                language: 'hi-IN',
                gender: 'male'
            },
            // Italian
            {
                id: 'if_sara',
                name: 'Sara',
                language: 'it-IT',
                gender: 'female'
            },
            {
                id: 'im_nicola',
                name: 'Nicola',
                language: 'it-IT',
                gender: 'male'
            },
            // Brazilian Portuguese
            {
                id: 'pf_dora',
                name: 'Dora',
                language: 'pt-BR',
                gender: 'female'
            },
            {
                id: 'pm_alex',
                name: 'Alex',
                language: 'pt-BR',
                gender: 'male'
            },
            {
                id: 'pm_santa',
                name: 'Santa',
                language: 'pt-BR',
                gender: 'male'
            }
        ],
        supportedFormats: [
            'wav'
        ],
        speedRange: {
            min: 0.25,
            max: 4.0,
            default: 1.0
        }
    }
};
/**
 * ASR Provider Registry
 *
 * Central registry for all ASR providers.
 * Keep in sync with ASRProviderId type definition.
 */ const ASR_PROVIDERS = {
    'openai-whisper': {
        id: 'openai-whisper',
        name: 'OpenAI Whisper',
        requiresApiKey: true,
        defaultBaseUrl: 'https://api.openai.com/v1',
        icon: '/logos/openai.svg',
        models: [
            {
                id: 'gpt-4o-mini-transcribe',
                name: 'GPT-4o Mini Transcribe'
            },
            {
                id: 'gpt-4o-transcribe',
                name: 'GPT-4o Transcribe'
            },
            {
                id: 'whisper-1',
                name: 'Whisper-1'
            }
        ],
        defaultModelId: 'gpt-4o-mini-transcribe',
        supportedLanguages: [
            // OpenAI Whisper supports 58 languages (as of official docs)
            // Source: https://platform.openai.com/docs/guides/speech-to-text
            'auto',
            // Hot languages (commonly used)
            'zh',
            'en',
            'ja',
            'ko',
            'es',
            'fr',
            'de',
            'ru',
            'ar',
            'pt',
            'it',
            'hi',
            // Other languages (alphabetical)
            'af',
            'hy',
            'az',
            'be',
            'bs',
            'bg',
            'ca',
            'hr',
            'cs',
            'da',
            'nl',
            'et',
            'fi',
            'gl',
            'el',
            'he',
            'hu',
            'is',
            'id',
            'kn',
            'kk',
            'lv',
            'lt',
            'mk',
            'ms',
            'mr',
            'mi',
            'ne',
            'no',
            'fa',
            'pl',
            'ro',
            'sr',
            'sk',
            'sl',
            'sw',
            'sv',
            'tl',
            'ta',
            'th',
            'tr',
            'uk',
            'ur',
            'vi',
            'cy'
        ],
        supportedFormats: [
            'mp3',
            'mp4',
            'mpeg',
            'mpga',
            'm4a',
            'wav',
            'webm'
        ]
    },
    'qwen-asr': {
        id: 'qwen-asr',
        name: 'Qwen ASR (阿里云百炼)',
        requiresApiKey: true,
        defaultBaseUrl: 'https://dashscope.aliyuncs.com/api/v1',
        icon: '/logos/bailian.svg',
        models: [
            {
                id: 'qwen3-asr-flash',
                name: 'Qwen3 ASR Flash'
            }
        ],
        defaultModelId: 'qwen3-asr-flash',
        supportedLanguages: [
            // Qwen ASR supports 27 languages + auto-detect
            // If language is uncertain or mixed (e.g. Chinese-English-Japanese-Korean), use "auto" (do not specify language parameter)
            'auto',
            // Hot languages (commonly used)
            'zh',
            'yue',
            'en',
            'ja',
            'ko',
            'de',
            'fr',
            'ru',
            'es',
            'pt',
            'ar',
            'it',
            'hi',
            // Other languages (alphabetical)
            'cs',
            'da',
            'fi',
            'fil',
            'id',
            'is',
            'ms',
            'no',
            'pl',
            'sv',
            'th',
            'tr',
            'uk',
            'vi'
        ],
        supportedFormats: [
            'mp3',
            'wav',
            'webm',
            'm4a',
            'flac'
        ]
    },
    'azure-asr': {
        id: 'azure-asr',
        name: 'Azure STT',
        requiresApiKey: true,
        defaultBaseUrl: 'https://{region}.api.cognitive.microsoft.com',
        icon: '/logos/azure.svg',
        models: [],
        defaultModelId: '',
        supportedLanguages: [
            'auto',
            'en',
            'zh',
            'ja',
            'ko',
            'de',
            'fr',
            'es',
            'it',
            'pt',
            'ru',
            'ar',
            'hi'
        ],
        supportedFormats: [
            'wav',
            'ogg',
            'webm',
            'mp3',
            'flac',
            'm4a'
        ]
    },
    'browser-native': {
        id: 'browser-native',
        name: '浏览器原生 ASR (Web Speech API)',
        requiresApiKey: false,
        icon: '/logos/browser.svg',
        models: [],
        defaultModelId: '',
        supportedLanguages: [
            // Chinese variants
            'zh-CN',
            'zh-TW',
            'zh-HK',
            'yue-Hant-HK',
            // English variants
            'en-US',
            'en-GB',
            'en-AU',
            'en-CA',
            'en-IN',
            'en-NZ',
            'en-ZA',
            // Japanese & Korean
            'ja-JP',
            'ko-KR',
            // European languages
            'de-DE',
            'fr-FR',
            'es-ES',
            'es-MX',
            'es-AR',
            'es-CO',
            'it-IT',
            'pt-BR',
            'pt-PT',
            'ru-RU',
            'nl-NL',
            'pl-PL',
            'cs-CZ',
            'da-DK',
            'fi-FI',
            'sv-SE',
            'no-NO',
            'tr-TR',
            'el-GR',
            'hu-HU',
            'ro-RO',
            'sk-SK',
            'bg-BG',
            'hr-HR',
            'ca-ES',
            // Middle East & Asia
            'ar-SA',
            'ar-EG',
            'he-IL',
            'hi-IN',
            'th-TH',
            'vi-VN',
            'id-ID',
            'ms-MY',
            'fil-PH',
            // Other
            'af-ZA',
            'uk-UA'
        ],
        supportedFormats: [
            'webm'
        ]
    },
    'lemonade-asr': {
        id: 'lemonade-asr',
        name: 'Lemonade ASR',
        requiresApiKey: false,
        defaultBaseUrl: 'http://localhost:13305/v1',
        icon: '/logos/lemonade.svg',
        models: [
            {
                id: 'Whisper-Base',
                name: 'Whisper Base'
            },
            {
                id: 'Whisper-Large-v3',
                name: 'Whisper Large v3'
            },
            {
                id: 'Whisper-Large-v3-Turbo',
                name: 'Whisper Large v3 Turbo'
            },
            {
                id: 'Whisper-Medium',
                name: 'Whisper Medium'
            },
            {
                id: 'Whisper-Small',
                name: 'Whisper Small'
            },
            {
                id: 'Whisper-Tiny',
                name: 'Whisper Tiny'
            }
        ],
        defaultModelId: 'Whisper-Base',
        supportedLanguages: CUSTOM_ASR_DEFAULT_LANGUAGES,
        supportedFormats: [
            'wav'
        ]
    }
};
/**
 * Default voice for each TTS provider.
 * Used when switching providers or testing a non-active provider.
 */ const DEFAULT_TTS_VOICES = {
    'openai-tts': 'alloy',
    'azure-tts': 'zh-CN-XiaoxiaoNeural',
    'glm-tts': 'tongtong',
    'qwen-tts': 'Cherry',
    'voxcpm-tts': _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_AUTO_VOICE_ID */ .p0,
    'doubao-tts': 'zh_female_vv_uranus_bigtts',
    'elevenlabs-tts': 'EXAVITQu4vr4xnSDxMaL',
    'minimax-tts': 'female-yujie',
    'lemonade-tts': 'af_heart',
    'browser-native-tts': 'default'
};
const DEFAULT_TTS_MODELS = {
    'openai-tts': 'gpt-4o-mini-tts',
    'azure-tts': '',
    'glm-tts': 'glm-tts',
    'qwen-tts': 'qwen3-tts-flash',
    'voxcpm-tts': _voxcpm__WEBPACK_IMPORTED_MODULE_0__/* .VOXCPM_VLLM_MODEL_ID */ .Cn,
    'doubao-tts': '',
    'elevenlabs-tts': 'eleven_multilingual_v2',
    'minimax-tts': 'speech-2.8-hd',
    'lemonade-tts': 'kokoro-v1',
    'browser-native-tts': ''
};
/**
 * Get all available TTS providers (built-in + custom)
 */ function getAllTTSProviders(customProviders) {
    const builtIn = Object.values(TTS_PROVIDERS);
    const custom = customProviders ? Object.values(customProviders) : [];
    return [
        ...builtIn,
        ...custom
    ];
}
/**
 * Get TTS provider by ID (checks built-in first, then custom)
 */ function getTTSProvider(providerId, customProviders) {
    if (providerId in TTS_PROVIDERS) {
        return TTS_PROVIDERS[providerId];
    }
    return customProviders?.[providerId];
}
/**
 * Get voices for a specific TTS provider
 */ function getTTSVoices(providerId, customProviders) {
    return getTTSProvider(providerId, customProviders)?.voices || [];
}
/**
 * Get all available ASR providers (built-in + custom)
 */ function getAllASRProviders(customProviders) {
    const builtIn = Object.values(ASR_PROVIDERS);
    const custom = customProviders ? Object.values(customProviders) : [];
    return [
        ...builtIn,
        ...custom
    ];
}
/**
 * Get ASR provider by ID (checks built-in first, then custom)
 */ function getASRProvider(providerId, customProviders) {
    if (providerId in ASR_PROVIDERS) {
        return ASR_PROVIDERS[providerId];
    }
    return customProviders?.[providerId];
}
/**
 * Get supported languages for a specific ASR provider
 */ function getASRSupportedLanguages(providerId, customProviders) {
    return getASRProvider(providerId, customProviders)?.supportedLanguages || [];
}


/***/ }),

/***/ 694394:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var map = {
	"./ar-SA.json": [
		764560,
		4560
	],
	"./en-US.json": [
		908564,
		8564
	],
	"./ja-JP.json": [
		230492,
		492
	],
	"./ko-KR.json": [
		430810,
		810
	],
	"./pt-BR.json": [
		198537,
		8537
	],
	"./ru-RU.json": [
		974979,
		4979
	],
	"./zh-CN.json": [
		908146,
		8146
	],
	"./zh-TW.json": [
		745830,
		5830
	]
};
function webpackAsyncContext(req) {
	if(!__webpack_require__.o(map, req)) {
		return Promise.resolve().then(() => {
			var e = new Error("Cannot find module '" + req + "'");
			e.code = 'MODULE_NOT_FOUND';
			throw e;
		});
	}

	var ids = map[req], id = ids[0];
	return __webpack_require__.e(ids[1]).then(() => {
		return __webpack_require__.t(id, 3 | 16);
	});
}
webpackAsyncContext.keys = () => (Object.keys(map));
webpackAsyncContext.id = 694394;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 696582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   B: () => (/* binding */ AVATAR_OPTIONS),
/* harmony export */   n: () => (/* binding */ useUserProfileStore)
/* harmony export */ });
/* harmony import */ var zustand__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(469517);
/* harmony import */ var zustand_middleware__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(300);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/store/user-profile.ts
 *
 * Verbatim port — no adaptation needed. Pure zustand + persist store
 * with no external dependencies beyond zustand itself.
 */ /**
 * User Profile Store
 * Persists avatar, nickname & bio to localStorage
 */ 

/** Predefined avatar options */ const AVATAR_OPTIONS = [
    '/avatars/user.png',
    '/avatars/teacher-2.png',
    '/avatars/assist-2.png',
    '/avatars/clown-2.png',
    '/avatars/curious-2.png',
    '/avatars/note-taker-2.png',
    '/avatars/thinker-2.png'
];
const useUserProfileStore = (0,zustand__WEBPACK_IMPORTED_MODULE_0__/* .create */ .v)()((0,zustand_middleware__WEBPACK_IMPORTED_MODULE_1__/* .persist */ .Zr)((set)=>({
        avatar: AVATAR_OPTIONS[0],
        nickname: '',
        bio: '',
        setAvatar: (avatar)=>set({
                avatar
            }),
        setNickname: (nickname)=>set({
                nickname
            }),
        setBio: (bio)=>set({
                bio
            })
    }), {
    name: 'user-profile-storage'
}));


/***/ }),

/***/ 728839:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NZ: () => (/* binding */ sanitizeAvatar)
/* harmony export */ });
/* unused harmony exports AGENT_COLOR_PALETTE, AGENT_DEFAULT_AVATARS, isAvatarUrl */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/constants/agent-defaults.ts
 */ /**
 * Shared constants for agent profile generation.
 *
 * Used by both the client-side agent-profiles API route and the
 * server-side classroom-generation pipeline to keep colors / avatars in sync.
 */ /** Color palette cycled for generated agents */ const AGENT_COLOR_PALETTE = (/* unused pure expression or super */ null && ([
    '#3b82f6',
    '#10b981',
    '#f59e0b',
    '#ec4899',
    '#06b6d4',
    '#8b5cf6',
    '#f97316',
    '#14b8a6',
    '#e11d48',
    '#6366f1',
    '#84cc16',
    '#a855f7'
]));
/**
 * Default avatar paths cycled for generated agents.
 *
 * Every entry MUST correspond to a file that exists under `public/avatars/`.
 */ const AGENT_DEFAULT_AVATARS = [
    '/avatars/teacher.png',
    '/avatars/assist.png',
    '/avatars/curious.png',
    '/avatars/thinker.png',
    '/avatars/note-taker.png',
    '/avatars/teacher-2.png',
    '/avatars/assist-2.png',
    '/avatars/curious-2.png',
    '/avatars/thinker-2.png',
    '/avatars/note-taker-2.png'
];
/**
 * Returns true if the given avatar string is a usable image source — i.e. an
 * HTTP URL, a root-relative path, or a data URL. Returns false for bare emoji
 * strings (e.g. "🎓", "👩‍🏫") or any other non-URL value the LLM might have
 * returned despite being told to pick from the avatar list.
 */ function isAvatarUrl(avatar) {
    return !!avatar && (avatar.startsWith('http') || avatar.startsWith('/') || avatar.startsWith('data:'));
}
/**
 * Sanitize an agent avatar value for UI rendering.
 *
 * If `avatar` is a usable image URL/path, it is returned unchanged. Otherwise
 * (emoji, garbage, empty), a deterministic fallback from AGENT_DEFAULT_AVATARS
 * is returned. The optional `index` seeds the fallback so that multiple agents
 * in the same classroom get distinct avatars; if omitted, a hash of the input
 * string is used so the same bad value always maps to the same fallback.
 *
 * Use this anywhere an agent avatar is rendered as an <img> to guarantee a
 * real illustration is always shown — even for classrooms generated before
 * the server-side avatar validation was added.
 */ function sanitizeAvatar(avatar, index) {
    if (isAvatarUrl(avatar)) return avatar;
    const fallbackIndex = typeof index === 'number' && Number.isFinite(index) ? index : // same fallback avatar (stable across re-renders).
    Math.abs((avatar ?? '').split('').reduce((acc, ch)=>acc * 31 + ch.charCodeAt(0) | 0, 0));
    return AGENT_DEFAULT_AVATARS[fallbackIndex % AGENT_DEFAULT_AVATARS.length];
}


/***/ }),

/***/ 749750:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ ensureRegisteredVoice)
/* harmony export */ });
/* harmony import */ var _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(167324);
/* harmony import */ var _lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(892411);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voice-registration-client.ts
 *
 * Verbatim port — `@/lib/utils/database` (autoVoiceCache table) and
 * `@/lib/audio/voice-design` are real ports.
 */ /* __next_internal_client_entry_do_not_use__ ensureRegisteredVoice auto */ /**
 * Provider-neutral client orchestrator for the auto-voice register-once flow.
 *
 * Given a provider id + voice design, it resolves a deterministic voice id,
 * ensures the voice is registered on the backend via `POST /api/generate/voice`
 * (which dispatches to the provider's adapter), and caches the reference clip
 * in IndexedDB so a GC'd voice can be re-registered. Callers decide *whether*
 * their provider supports registration; this module is provider-agnostic.
 */ 

function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let i = 0; i < binary.length; i++)bytes[i] = binary.charCodeAt(i);
    return new Blob([
        bytes
    ], {
        type: mimeType || 'audio/wav'
    });
}
async function blobToBase64(blob) {
    return new Promise((resolve, reject)=>{
        const reader = new FileReader();
        reader.onerror = ()=>reject(reader.error || new Error('Failed to read reference audio'));
        reader.onload = ()=>{
            const result = typeof reader.result === 'string' ? reader.result : '';
            const commaIndex = result.indexOf(',');
            resolve(commaIndex >= 0 ? result.slice(commaIndex + 1) : result);
        };
        reader.readAsDataURL(blob);
    });
}
// Confirmed-registered + in-flight memos, keyed by (voiceId, backend, credential).
const registeredThisSession = new Set();
const inFlight = new Map();
function memoKeyFor(voiceId, request) {
    // In-memory only (never persisted or logged), so the raw key identity is fine.
    return `${voiceId}::${request.ttsBaseUrl ?? ''}::${request.ttsApiKey ?? ''}`;
}
async function getCachedClip(voiceId) {
    const row = await _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__.db.autoVoiceCache.get(voiceId);
    if (!row) return undefined;
    return {
        base64: await blobToBase64(row.referenceAudio),
        mimeType: row.mimeType
    };
}
/**
 * Ensure the agent's deterministic auto voice is registered for `providerId`,
 * returning its voice id (or undefined when unavailable, so callers fall back
 * to the inline voice-design prompt). Lazy + idempotent: memoized per session,
 * reference clip cached in IndexedDB. register-on-invalid is handled by the
 * endpoint's existence check, which re-registers a GC'd voice from the clip.
 */ async function ensureRegisteredVoice(providerId, params, request) {
    if (!params.voiceDesign) return undefined;
    const voiceId = await (0,_lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_1__/* .getDeterministicVoiceId */ .Kh)(params.voiceDesign, {
        providerId,
        model: request.ttsModelId
    });
    const memoKey = memoKeyFor(voiceId, request);
    if (registeredThisSession.has(memoKey)) return voiceId;
    // Coalesce concurrent calls for the same (voiceId, backend) into one request.
    const existing = inFlight.get(memoKey);
    if (existing) return existing;
    const promise = registerOnce(providerId, voiceId, memoKey, params, request).finally(()=>inFlight.delete(memoKey));
    inFlight.set(memoKey, promise);
    return promise;
}
async function registerOnce(providerId, voiceId, memoKey, params, request) {
    const cached = await getCachedClip(voiceId);
    const res = await fetch('/api/generate/voice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            providerId,
            voiceId,
            descriptor: params.voiceDesign,
            language: params.language,
            referenceAudioBase64: cached?.base64,
            mimeType: cached?.mimeType,
            ...request
        })
    });
    if (!res.ok) return undefined; // graceful fallback to the inline prompt path
    const data = await res.json().catch(()=>({}));
    if (data.referenceAudioBase64 && !cached) {
        await _lib_utils_database__WEBPACK_IMPORTED_MODULE_0__.db.autoVoiceCache.put({
            voiceId,
            referenceAudio: base64ToBlob(data.referenceAudioBase64, data.mimeType),
            mimeType: data.mimeType || 'audio/wav',
            updatedAt: Date.now()
        });
    }
    registeredThisSession.add(memoKey);
    return voiceId;
}


/***/ }),

/***/ 768784:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   $: () => (/* binding */ Button)
/* harmony export */ });
/* unused harmony export buttonVariants */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(548249);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(367484);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var class_variance_authority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(521654);
/* harmony import */ var radix_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(243980);
/* harmony import */ var _lib_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(114490);





const buttonVariants = (0,class_variance_authority__WEBPACK_IMPORTED_MODULE_2__/* .cva */ .F)("focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-md border border-transparent bg-clip-padding text-sm font-medium focus-visible:ring-[3px] aria-invalid:ring-[3px] [&_svg:not([class*='size-'])]:size-4 inline-flex items-center justify-center whitespace-nowrap transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none", {
    variants: {
        variant: {
            default: 'bg-primary text-primary-foreground hover:bg-primary/80',
            outline: 'border-border bg-background hover:bg-muted hover:text-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 aria-expanded:bg-muted aria-expanded:text-foreground shadow-xs',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
            ghost: 'hover:bg-muted hover:text-foreground dark:hover:bg-muted/50 aria-expanded:bg-muted aria-expanded:text-foreground',
            destructive: 'bg-destructive/10 hover:bg-destructive/20 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/20 text-destructive focus-visible:border-destructive/40 dark:hover:bg-destructive/30',
            link: 'text-primary underline-offset-4 hover:underline'
        },
        size: {
            default: 'h-9 gap-1.5 px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
            xs: "h-6 gap-1 rounded-[min(var(--radius-md),8px)] px-2 text-xs in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
            sm: 'h-8 gap-1 rounded-[min(var(--radius-md),10px)] px-2.5 in-data-[slot=button-group]:rounded-md has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
            lg: 'h-10 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3',
            icon: 'size-9',
            'icon-xs': "size-6 rounded-[min(var(--radius-md),8px)] in-data-[slot=button-group]:rounded-md [&_svg:not([class*='size-'])]:size-3",
            'icon-sm': 'size-8 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-md',
            'icon-lg': 'size-10'
        }
    },
    defaultVariants: {
        variant: 'default',
        size: 'default'
    }
});
function Button({ className, variant = 'default', size = 'default', asChild = false, ...props }) {
    const Comp = asChild ? radix_ui__WEBPACK_IMPORTED_MODULE_3__/* .Root */ .bL : 'button';
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(Comp, {
        "data-slot": "button",
        "data-variant": variant,
        "data-size": size,
        className: (0,_lib_utils__WEBPACK_IMPORTED_MODULE_4__.cn)(buttonVariants({
            variant,
            size,
            className
        })),
        ...props
    });
}



/***/ }),

/***/ 774773:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   q: () => (/* binding */ defaultLocale)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/i18n/types.ts
 *
 * Verbatim port — pure type data, no deps.
 */ const defaultLocale = 'zh-CN';


/***/ }),

/***/ 832917:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Cn: () => (/* binding */ VOXCPM_VLLM_MODEL_ID),
/* harmony export */   H_: () => (/* binding */ normalizeVoxCPMBackend),
/* harmony export */   Lu: () => (/* binding */ getVoxCPMBackendEndpoint),
/* harmony export */   TN: () => (/* binding */ DEFAULT_VOXCPM_BACKEND),
/* harmony export */   d$: () => (/* binding */ voxCPMBackendSupportsVoiceRegistration),
/* harmony export */   f0: () => (/* binding */ buildVoxCPMBackendUrl),
/* harmony export */   f3: () => (/* binding */ voxCPMBackendSupportsReferenceAudio),
/* harmony export */   hp: () => (/* binding */ buildAutoVoxCPMVoicePrompt),
/* harmony export */   i3: () => (/* binding */ VOXCPM_TTS_PROVIDER_ID),
/* harmony export */   n: () => (/* binding */ VOXCPM_AUTO_VOICE),
/* harmony export */   p0: () => (/* binding */ VOXCPM_AUTO_VOICE_ID),
/* harmony export */   wG: () => (/* binding */ VOXCPM_MODEL_ID),
/* harmony export */   wy: () => (/* binding */ getVoxCPMProfileVoiceId),
/* harmony export */   xU: () => (/* binding */ getVoxCPMProfileIdFromVoiceId),
/* harmony export */   yw: () => (/* binding */ VOXCPM_BACKENDS)
/* harmony export */ });
/* unused harmony export VOXCPM_PROFILE_VOICE_PREFIX */
/* harmony import */ var _lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(892411);
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voxcpm.ts
 *
 * Verbatim port — `@/lib/audio/voice-design` is the real port (buildVoiceDesignPrompt +
 * VoiceDesign type), so the full VoxCPM adapter surface is functional.
 */ 
const VOXCPM_TTS_PROVIDER_ID = 'voxcpm-tts';
const VOXCPM_MODEL_ID = 'VoxCPM2';
const VOXCPM_VLLM_MODEL_ID = 'voxcpm2';
const VOXCPM_AUTO_VOICE_ID = 'voxcpm:auto';
const VOXCPM_PROFILE_VOICE_PREFIX = 'voxcpm:profile:';
const VOXCPM_AUTO_VOICE_PROMPT_MAX_CHARS = 200;
const VOXCPM_BACKENDS = [
    {
        id: 'vllm-omni',
        name: 'vLLM-Omni',
        endpoint: '/v1/audio/speech',
        description: 'OpenAI-compatible speech endpoint'
    },
    {
        id: 'python-api',
        name: 'Python API',
        endpoint: '/tts/upload',
        description: 'FastAPI deployment backed by the VoxCPM Python runtime'
    },
    {
        id: 'nano-vllm',
        name: 'Nano-vLLM',
        endpoint: '/generate',
        description: 'Nano-vLLM VoxCPM FastAPI deployment'
    }
];
const DEFAULT_VOXCPM_BACKEND = 'vllm-omni';
const VOXCPM_AUTO_VOICE = {
    id: VOXCPM_AUTO_VOICE_ID,
    name: 'Auto Voice',
    language: 'auto',
    gender: 'neutral',
    description: 'Generate a voice prompt from agent metadata'
};
function normalizeVoxCPMBackend(value) {
    return VOXCPM_BACKENDS.some((backend)=>backend.id === value) ? value : DEFAULT_VOXCPM_BACKEND;
}
function getVoxCPMBackendEndpoint(backend) {
    return VOXCPM_BACKENDS.find((item)=>item.id === backend)?.endpoint || '/v1/audio/speech';
}
function voxCPMBackendSupportsReferenceAudio(backend) {
    return backend === 'vllm-omni' || backend === 'python-api' || backend === 'nano-vllm';
}
function buildVoxCPMBackendUrl(baseUrl, backend) {
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    if (backend === 'vllm-omni' && cleanBaseUrl.endsWith('/v1')) {
        return `${cleanBaseUrl}/audio/speech`;
    }
    return `${cleanBaseUrl}${getVoxCPMBackendEndpoint(backend)}`;
}
function getVoxCPMProfileVoiceId(profileId) {
    return `${VOXCPM_PROFILE_VOICE_PREFIX}${profileId}`;
}
function getVoxCPMProfileIdFromVoiceId(voiceId) {
    if (!voiceId.startsWith(VOXCPM_PROFILE_VOICE_PREFIX)) return null;
    return voiceId.slice(VOXCPM_PROFILE_VOICE_PREFIX.length);
}
function sanitizeAutoVoicePromptPart(value) {
    return (value || '').replace(/[\p{C}]+/gu, ' ').replace(/\s+/gu, ' ').trim().slice(0, VOXCPM_AUTO_VOICE_PROMPT_MAX_CHARS).trim();
}
/**
 * Whether a VoxCPM backend exposes a runtime voice-registration API
 * (POST /v1/audio/voices) for reference-by-id timbre stability.
 */ function voxCPMBackendSupportsVoiceRegistration(backend) {
    return backend === 'vllm-omni';
}
function buildAutoVoxCPMVoicePrompt(context = {}) {
    if (context.voiceDesign) {
        const designPrompt = sanitizeAutoVoicePromptPart((0,_lib_audio_voice_design__WEBPACK_IMPORTED_MODULE_0__/* .buildVoiceDesignPrompt */ .VR)(context.voiceDesign));
        if (designPrompt) return designPrompt;
    }
    const persona = sanitizeAutoVoicePromptPart(context.persona);
    if (persona) return persona;
    const fallbackParts = [
        context.role,
        context.agentName
    ].map(sanitizeAutoVoicePromptPart).filter(Boolean);
    const fallbackPrompt = sanitizeAutoVoicePromptPart(fallbackParts.join(' '));
    return fallbackPrompt || 'natural classroom voice';
}


/***/ }),

/***/ 839323:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   S: () => (/* binding */ isCustomTTSProvider),
/* harmony export */   v: () => (/* binding */ isCustomASRProvider)
/* harmony export */ });
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/types.ts
 *
 * Audio Provider Type Definitions.
 *
 * MedQ adaptation: the OpenMAIC TTS/ASR provider unions are ported verbatim
 * so the ported settings store (`lib/store/settings.ts`) compiles unchanged.
 * MedQ's runtime voice pipeline goes through /api/voice-tts using ZAI's TTS
 * service (browser-native is used as a client-side fallback), so most of
 * these provider IDs never resolve to a configured provider in MedQ — they
 * are accepted at the type level for compatibility with ported call sites.
 *
 * `'zai'` is added to the `TTSProviderId` union as MedQ's first-class TTS
 * provider (analogous to `'zai'` in `WebSearchProviderId`).
 */ // ============================================================================
// TTS (Text-to-Speech) Types
// ============================================================================
// ============================================================================
// Custom-provider predicates (verbatim from OpenMAIC)
// ============================================================================
/** Returns true if the provider ID is a user-defined custom TTS provider. */ function isCustomTTSProvider(id) {
    return id.startsWith('custom-tts-');
}
/** Returns true if the provider ID is a user-defined custom ASR provider. */ function isCustomASRProvider(id) {
    return id.startsWith('custom-asr-');
}


/***/ }),

/***/ 877207:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CW: () => (/* binding */ getSelectableProvidersWithVoices),
/* harmony export */   Pf: () => (/* binding */ getEnabledProvidersWithVoices),
/* harmony export */   kM: () => (/* binding */ resolveAgentVoice)
/* harmony export */ });
/* unused harmony exports getServerVoiceList, findVoiceDisplayName */
/* harmony import */ var _lib_audio_types__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(839323);
/* harmony import */ var _lib_audio_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689355);
/* harmony import */ var _lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(245957);
/* harmony import */ var _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(832917);




/**
 * Resolve the TTS provider + voice for an agent, choosing only among ENABLED
 * providers (`enabledProviders` is the output of getEnabledProvidersWithVoices,
 * which already excludes disabled/unconfigured providers and browser-native).
 *
 * 1. If the user picked a voice for this agent (persisted `overrides`, keyed by
 *    agent id) whose provider is in `enabledProviders` (and the voiceId is
 *    known), use it; the agent's own voiceConfig is validated the same way next.
 * 2. Otherwise, deterministically pick the first provider in the given list by
 *    index. Whether browser-native can be picked depends on the caller's list:
 *    getEnabledProvidersWithVoices excludes it, getSelectableProvidersWithVoices
 *    appends it LAST, so it is only the index target when it is the sole enabled
 *    provider (i.e. the user opted into browser-native only).
 * 3. If the list is empty, return null — the caller must skip TTS rather than
 *    silently falling back to browser-native (#665 symptom 4).
 */ function resolveAgentVoice(agent, agentIndex, enabledProviders, overrides) {
    // Candidates in priority order: the user's persisted per-agent override
    // (settings store — survives reloads; registry records for default/generated
    // agents do not), then the agent's own voiceConfig. Each is honored only
    // when its provider is still enabled and the voice is known.
    const candidates = [
        overrides?.[agent.id],
        agent.voiceConfig
    ];
    for (const choice of candidates){
        if (!choice) continue;
        // Browser-native voices are dynamic (not in static registry); it is a
        // first-class provider only when present in the enabled list.
        if (choice.providerId === 'browser-native-tts') {
            if (enabledProviders.some((p)=>p.providerId === 'browser-native-tts')) {
                return {
                    providerId: choice.providerId,
                    modelId: choice.modelId,
                    voiceId: choice.voiceId
                };
            }
            continue;
        }
        const fromEnabled = enabledProviders.find((p)=>p.providerId === choice.providerId);
        if (!fromEnabled) continue;
        const list = getServerVoiceList(choice.providerId);
        const allVoiceIds = new Set([
            ...list,
            ...fromEnabled.voices.map((v)=>v.id)
        ]);
        if (allVoiceIds.has(choice.voiceId)) {
            return {
                providerId: choice.providerId,
                modelId: choice.modelId,
                voiceId: choice.voiceId
            };
        }
    }
    // Fallback: deterministic pick among enabled providers (canonical order).
    if (enabledProviders.length > 0) {
        const first = enabledProviders[0];
        if (first.voices.length > 0) {
            return {
                providerId: first.providerId,
                voiceId: first.voices[agentIndex % first.voices.length].id
            };
        }
    }
    // Nothing enabled — no TTS for this agent.
    return null;
}
/**
 * Get the list of voice IDs for a TTS provider.
 * For browser-native-tts, returns empty (browser voices are dynamic).
 * For custom providers, reads from ttsProvidersConfig.customVoices.
 */ function getServerVoiceList(providerId, ttsProvidersConfig) {
    if (providerId === 'browser-native-tts') return [];
    if ((0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_3__/* .isCustomTTSProvider */ .S)(providerId) && ttsProvidersConfig) {
        const customVoices = ttsProvidersConfig[providerId]?.customVoices;
        return customVoices?.map((v)=>v.id) || [];
    }
    const provider = _lib_audio_constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF[providerId];
    if (!provider) return [];
    return provider.voices.map((v)=>v.id);
}
/**
 * Get all ENABLED providers and their voices for the voice picker UI and for
 * deterministic auto-assignment.
 *
 * A provider is included only when {@link isTTSProviderEnabled} holds:
 * configured (server-managed, client API key, or explicit base URL — the
 * registry `defaultBaseUrl` no longer counts), not server-disabled, and the
 * user's per-provider `enabled` flag is not false (#665). Browser-native is
 * excluded here (no static voice list); the agent UI injects its dynamic voices
 * separately, gated on the same predicate.
 */ function getEnabledProvidersWithVoices(ttsProvidersConfig, voxcpmProfiles = []) {
    const result = [];
    // Built-in providers
    for (const [id, config] of Object.entries(_lib_audio_constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF)){
        const providerId = id;
        if (providerId === 'browser-native-tts') continue;
        if (config.voices.length === 0) continue;
        const providerConfig = ttsProvidersConfig[providerId];
        if (!(0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .isTTSProviderEnabled */ .mO)(providerId, providerConfig)) continue;
        const visibleVoxCPMProfiles = providerId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3 ? voxcpmProfiles.filter((profile)=>{
            const backend = (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .normalizeVoxCPMBackend */ .H_)(providerConfig?.providerOptions?.backend);
            return profile.kind !== 'clone' || (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .voxCPMBackendSupportsReferenceAudio */ .f3)(backend);
        }) : [];
        {
            const allVoices = [
                ...config.voices.map((v)=>({
                        id: v.id,
                        name: v.name,
                        language: v.language
                    })),
                ...providerId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3 ? visibleVoxCPMProfiles.map((profile)=>({
                        id: (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .getVoxCPMProfileVoiceId */ .wy)(profile.id),
                        name: profile.name,
                        language: 'auto'
                    })) : []
            ];
            // Build model groups
            const modelGroups = [];
            if (config.models.length > 0) {
                for (const model of config.models){
                    const compatibleVoices = config.voices.filter((v)=>!v.compatibleModels || v.compatibleModels.includes(model.id)).map((v)=>({
                            id: v.id,
                            name: v.name,
                            language: v.language
                        }));
                    if (providerId === _lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .VOXCPM_TTS_PROVIDER_ID */ .i3) {
                        compatibleVoices.push(...visibleVoxCPMProfiles.map((profile)=>({
                                id: (0,_lib_audio_voxcpm__WEBPACK_IMPORTED_MODULE_2__/* .getVoxCPMProfileVoiceId */ .wy)(profile.id),
                                name: profile.name,
                                language: 'auto'
                            })));
                    }
                    modelGroups.push({
                        modelId: model.id,
                        modelName: model.name,
                        voices: compatibleVoices
                    });
                }
            } else {
                modelGroups.push({
                    modelId: '',
                    modelName: config.name,
                    voices: allVoices
                });
            }
            result.push({
                providerId,
                providerName: config.name,
                voices: allVoices,
                modelGroups
            });
        }
    }
    // Custom providers
    for (const [id, providerConfig] of Object.entries(ttsProvidersConfig)){
        if (!(0,_lib_audio_types__WEBPACK_IMPORTED_MODULE_3__/* .isCustomTTSProvider */ .S)(id)) continue;
        const customVoices = providerConfig.customVoices || [];
        if (customVoices.length === 0) continue;
        if (!(0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .isTTSProviderEnabled */ .mO)(id, providerConfig)) continue;
        const providerId = id;
        const providerName = providerConfig.customName || id;
        const voices = customVoices.map((v)=>({
                id: v.id,
                name: v.name
            }));
        result.push({
            providerId,
            providerName,
            voices,
            modelGroups: [
                {
                    modelId: '',
                    modelName: providerName,
                    voices
                }
            ]
        });
    }
    return result;
}
/**
 * The single source of truth for "which provider+voice options are selectable
 * on the client" — used by BOTH the voice picker (AgentBar) and discussion TTS
 * resolution, so the teacher and student agents never diverge (#665).
 *
 * = enabled server/custom providers (getEnabledProvidersWithVoices) PLUS
 * browser-native when the user has enabled it and the browser exposes voices
 * (browser-native voices are dynamic, so they can only be supplied at the
 * client layer; server-side generation uses getEnabledProvidersWithVoices).
 */ function getSelectableProvidersWithVoices(ttsProvidersConfig, voxcpmProfiles = [], browserVoices = []) {
    const providers = getEnabledProvidersWithVoices(ttsProvidersConfig, voxcpmProfiles);
    if ((0,_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .isTTSProviderEnabled */ .mO)(_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .BROWSER_NATIVE_TTS_PROVIDER_ID */ .nH, ttsProvidersConfig[_lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .BROWSER_NATIVE_TTS_PROVIDER_ID */ .nH]) && browserVoices.length > 0) {
        const voices = browserVoices.map((v)=>({
                id: v.voiceURI,
                name: v.name
            }));
        providers.push({
            providerId: _lib_audio_provider_enablement__WEBPACK_IMPORTED_MODULE_1__/* .BROWSER_NATIVE_TTS_PROVIDER_ID */ .nH,
            providerName: 'Browser Native',
            voices,
            modelGroups: [
                {
                    modelId: '',
                    modelName: 'Browser Native',
                    voices
                }
            ]
        });
    }
    return providers;
}
/**
 * Find a voice display name across all providers.
 */ function findVoiceDisplayName(providerId, voiceId, ttsProvidersConfig) {
    if (isCustomTTSProvider(providerId) && ttsProvidersConfig) {
        const customVoices = ttsProvidersConfig[providerId]?.customVoices;
        const voice = customVoices?.find((v)=>v.id === voiceId);
        return voice?.name ?? voiceId;
    }
    const provider = TTS_PROVIDERS[providerId];
    if (!provider) return voiceId;
    const voice = provider.voices.find((v)=>v.id === voiceId);
    return voice?.name ?? voiceId;
}


/***/ }),

/***/ 892411:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Kh: () => (/* binding */ getDeterministicVoiceId),
/* harmony export */   VR: () => (/* binding */ buildVoiceDesignPrompt)
/* harmony export */ });
/* unused harmony exports AUTO_VOICE_ID_PREFIX, normalizeVoiceDesign */
/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/audio/voice-design.ts
 *
 * Verbatim port — pure TypeScript + WebCrypto, no deps.
 */ /**
 * Provider-neutral per-agent voice design.
 *
 * A `VoiceDesign` describes an agent's vocal identity (not personality) as a
 * 3-layer recipe. It is consumed by any TTS provider: as an inline voice
 * prompt where supported, or as the seed for a registered/cloned voice
 * (see `voice-registration.ts`). Nothing here is VoxCPM-specific.
 */ const VOICE_DESIGN_PROMPT_MAX_CHARS = 200;
/** Prefix for deterministic auto-voice ids (provider-neutral, backend-name-safe). */ const AUTO_VOICE_ID_PREFIX = 'auto-';
function sanitizeVoiceDesignPart(value) {
    return (value || '').replace(/[\p{C}]+/gu, ' ')// Strip parentheses: VoxCPM uses `(prompt)text` delimiters, so a paren in the
    // descriptor/persona would corrupt the bootstrap synthesis prompt.
    .replace(/[()（）]/gu, ' ').replace(/\s+/gu, ' ').trim().slice(0, VOICE_DESIGN_PROMPT_MAX_CHARS).trim();
}
/** Compose the 3 layers into one comma-joined prompt, dropping blank layers. */ function buildVoiceDesignPrompt(design) {
    return [
        design.identity,
        design.texture,
        design.delivery
    ].map((part)=>sanitizeVoiceDesignPart(part)).filter(Boolean).join(', ');
}
/** Coerce an arbitrary (LLM-produced) value into a VoiceDesign, or undefined. */ function normalizeVoiceDesign(raw) {
    if (!raw || typeof raw !== 'object') return undefined;
    const record = raw;
    const pick = (value)=>typeof value === 'string' ? value.trim() : '';
    const design = {
        identity: pick(record.identity),
        texture: pick(record.texture),
        delivery: pick(record.delivery)
    };
    if (!design.identity && !design.texture && !design.delivery) return undefined;
    return design;
}
/**
 * Deterministic voice id derived from the descriptor (+ provider + model).
 * Stable across re-synthesis, recomputable anywhere from the descriptor on the
 * agent, and namespaced by provider so a shared registry can't collide.
 *
 * Note: language is intentionally NOT part of the id — the descriptor text is
 * already written in the course language, and language only selects the one-time
 * bootstrap sample sentence (which affects neither output language nor timbre).
 * Keeping it out means every TTS path (narration passes a directive, discussion
 * passes a locale) resolves to the SAME id for the same agent.
 */ async function getDeterministicVoiceId(design, opts = {}) {
    const seed = [
        opts.providerId || '',
        design.identity,
        design.texture,
        design.delivery,
        opts.model || ''
    ].join('|');
    const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(seed));
    const hex = Array.from(new Uint8Array(digest)).map((byte)=>byte.toString(16).padStart(2, '0')).join('');
    return `${AUTO_VOICE_ID_PREFIX}${hex.slice(0, 16)}`;
}


/***/ }),

/***/ 971427:
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