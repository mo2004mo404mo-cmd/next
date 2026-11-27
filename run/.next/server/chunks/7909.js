"use strict";
exports.id = 7909;
exports.ids = [7909];
exports.modules = {

/***/ 716533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Aq: () => (/* binding */ pickThinkingLevel),
/* harmony export */   IG: () => (/* binding */ pickThinkingEffort),
/* harmony export */   QL: () => (/* binding */ getThinkingMode),
/* harmony export */   UL: () => (/* binding */ getThinkingConfigKey),
/* harmony export */   hg: () => (/* binding */ pickThinkingBudget),
/* harmony export */   oY: () => (/* binding */ getDefaultThinkingConfig),
/* harmony export */   yW: () => (/* binding */ supportsConfigurableThinking)
/* harmony export */ });
/* unused harmony exports clampBudgetForCapability, normalizeThinkingConfig, getThinkingDisplayValue */
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

/***/ 815969:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   x: () => (/* binding */ PROVIDERS)
/* harmony export */ });
/* unused harmony export MONO_LOGO_PROVIDERS */
/* harmony import */ var _model_metadata__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(826295);
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

/***/ 826295:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NG: () => (/* binding */ applyModelMetadata),
/* harmony export */   uY: () => (/* binding */ getCatalogThinkingCapability),
/* harmony export */   yi: () => (/* binding */ getModelMetadataKey)
/* harmony export */ });
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


/***/ })

};
;