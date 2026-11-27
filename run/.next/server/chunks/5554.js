"use strict";
exports.id = 5554;
exports.ids = [5554];
exports.modules = {

/***/ 30924:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Y: () => (/* binding */ generateWithLemonadeImage),
/* harmony export */   c: () => (/* binding */ testLemonadeImageConnectivity)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/lemonade-image-adapter.ts */ /**
 * Lemonade Image Generation Adapter
 *
 * Lemonade exposes OpenAI-compatible image generation at /v1/images/generations.
 */ const DEFAULT_MODEL = 'Qwen-Image-GGUF';
const DEFAULT_BASE_URL = 'http://localhost:13305/v1';
function normalizeBaseUrl(baseUrl) {
    return (baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
}
function authHeaders(apiKey) {
    const key = apiKey?.trim();
    return key ? {
        Authorization: `Bearer ${key}`
    } : {};
}
function resolveSize(options) {
    return `${options.width || 1024}x${options.height || 1024}`;
}
async function testLemonadeImageConnectivity(config) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    try {
        const response = await fetch(`${baseUrl}/models`, {
            headers: authHeaders(config.apiKey)
        });
        if (response.ok) {
            return {
                success: true,
                message: 'Connected to Lemonade image generation'
            };
        }
        const text = await response.text().catch(()=>response.statusText);
        return {
            success: false,
            message: `Lemonade API error (${response.status}): ${text}`
        };
    } catch (err) {
        return {
            success: false,
            message: `Lemonade connectivity error: ${err}`
        };
    }
}
async function generateWithLemonadeImage(config, options) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    const width = options.width || 1024;
    const height = options.height || 1024;
    const response = await fetch(`${baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            ...authHeaders(config.apiKey)
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            prompt: options.prompt,
            n: 1,
            size: resolveSize(options),
            response_format: 'b64_json'
        })
    });
    if (!response.ok) {
        const text = await response.text().catch(()=>response.statusText);
        throw new Error(`Lemonade image generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    const imageData = data.data?.[0];
    if (!imageData?.url && !imageData?.b64_json) {
        throw new Error('Lemonade returned empty image response');
    }
    return {
        url: imageData.url,
        base64: imageData.b64_json,
        width,
        height
    };
}


/***/ }),

/***/ 314534:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ testQwenImageConnectivity),
/* harmony export */   M: () => (/* binding */ generateWithQwenImage)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/qwen-image-adapter.ts */ /**
 * Qwen Image (Alibaba Cloud / DashScope) Image Generation Adapter
 *
 * Uses DashScope multimodal generation API (synchronous, no polling needed).
 * Endpoint: https://dashscope.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation
 *
 * Supported models:
 * - qwen-image-max     (highest quality)
 * - z-image-turbo      (fast, good quality)
 *
 * API docs: https://help.aliyun.com/zh/model-studio/developer-reference/text-to-image
 */ const DEFAULT_MODEL = 'qwen-image-max';
const DEFAULT_BASE_URL = 'https://dashscope.aliyuncs.com';
/**
 * Map our width x height to DashScope size format "WxH".
 * Common sizes: 1024*1024, 1280*720, 1664*928, 1120*1440, etc.
 */ function resolveDashScopeSize(options) {
    const w = options.width || 1024;
    const h = options.height || 576;
    return `${w}*${h}`;
}
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request. 401/403 means key invalid; other errors mean key is valid.
 */ async function testQwenImageConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/api/v1/services/aigc/multimodal-generation/generation`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model || DEFAULT_MODEL,
                input: {
                    messages: [
                        {
                            role: 'user',
                            content: [
                                {
                                    text: ''
                                }
                            ]
                        }
                    ]
                },
                parameters: {
                    size: '1*1'
                }
            })
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Qwen Image auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Qwen Image'
        };
    } catch (err) {
        return {
            success: false,
            message: `Qwen Image connectivity error: ${err}`
        };
    }
}
async function generateWithQwenImage(config, options) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v1/services/aigc/multimodal-generation/generation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            input: {
                messages: [
                    {
                        role: 'user',
                        content: [
                            {
                                text: options.prompt
                            }
                        ]
                    }
                ]
            },
            parameters: {
                negative_prompt: options.negativePrompt || undefined,
                prompt_extend: true,
                watermark: false,
                size: resolveDashScopeSize(options)
            }
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Qwen Image generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    // DashScope multimodal generation response format:
    // { output: { choices: [{ message: { content: [{ image: "url" }] } }] } }
    const choices = data.output?.choices;
    if (!choices || choices.length === 0) {
        // Check for error in response
        if (data.code || data.message) {
            throw new Error(`Qwen Image error: ${data.code} - ${data.message}`);
        }
        throw new Error('Qwen Image returned empty response');
    }
    const content = choices[0]?.message?.content;
    const imageContent = content?.find((c)=>c.image);
    if (!imageContent?.image) {
        throw new Error('Qwen Image response missing image URL');
    }
    return {
        url: imageContent.image,
        width: options.width || 1024,
        height: options.height || 576
    };
}


/***/ }),

/***/ 458384:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   De: () => (/* reexport safe */ _image_provider_registry__WEBPACK_IMPORTED_MODULE_0__.D),
/* harmony export */   Fz: () => (/* binding */ generateImage),
/* harmony export */   S8: () => (/* binding */ aspectRatioToDimensions),
/* harmony export */   rZ: () => (/* binding */ testImageConnectivity)
/* harmony export */ });
/* harmony import */ var _image_provider_registry__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(659497);
/* harmony import */ var _adapters_seedream_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(630327);
/* harmony import */ var _adapters_openai_image_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(884911);
/* harmony import */ var _adapters_qwen_image_adapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(314534);
/* harmony import */ var _adapters_nano_banana_adapter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(926725);
/* harmony import */ var _adapters_minimax_image_adapter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(847582);
/* harmony import */ var _adapters_grok_image_adapter__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(478006);
/* harmony import */ var _adapters_lemonade_image_adapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30924);
/**
 * Image Generation Service — routes to provider adapters
 *
 * 2026-11-04: the pure registry (IMAGE_PROVIDERS) moved to
 * ./image-provider-registry — a browser-safe module with ZERO adapter
 * imports. The dispatchers below import the provider adapters, which use
 * server-only helpers (ssrf-guard → node:dns/node:net), so THIS file must
 * never be imported from client code. Server consumers can import from
 * either module (the registry is re-exported below for compat).
 */ // Re-exported for backward compatibility — existing server imports of
// IMAGE_PROVIDERS from './image-providers' keep working.


// NOTE: the ZAI adapter is intentionally NOT imported here. This module is
// bundled for the client (settings store / settings UI import IMAGE_PROVIDERS),
// and the ZAI adapter statically imports @/lib/zai (fs/path/os + the server-only
// SDK). ZAI dispatch lives in image-providers-server.ts — server call sites
// must import generateImage/testImageConnectivity from there.






async function testImageConnectivity(config) {
    switch(config.providerId){
        case 'seedream':
            return (0,_adapters_seedream_adapter__WEBPACK_IMPORTED_MODULE_2__/* .testSeedreamConnectivity */ .U)(config);
        case 'openai-image':
            return (0,_adapters_openai_image_adapter__WEBPACK_IMPORTED_MODULE_1__/* .testOpenAIImageConnectivity */ .P)(config);
        case 'qwen-image':
            return (0,_adapters_qwen_image_adapter__WEBPACK_IMPORTED_MODULE_3__/* .testQwenImageConnectivity */ .I)(config);
        case 'nano-banana':
            return (0,_adapters_nano_banana_adapter__WEBPACK_IMPORTED_MODULE_4__/* .testNanoBananaConnectivity */ .R)(config);
        case 'minimax-image':
            return (0,_adapters_minimax_image_adapter__WEBPACK_IMPORTED_MODULE_5__/* .testMiniMaxImageConnectivity */ .C)(config);
        case 'grok-image':
            return (0,_adapters_grok_image_adapter__WEBPACK_IMPORTED_MODULE_6__/* .testGrokImageConnectivity */ .M)(config);
        case 'lemonade':
            return (0,_adapters_lemonade_image_adapter__WEBPACK_IMPORTED_MODULE_7__/* .testLemonadeImageConnectivity */ .c)(config);
        case 'zai':
            // Server-only SDK — dispatch through image-providers-server.ts
            return {
                success: false,
                message: 'ZAI image connectivity must be tested server-side (import testImageConnectivity from @/lib/media/image-providers-server).'
            };
        default:
            return {
                success: false,
                message: `Unsupported image provider: ${config.providerId}`
            };
    }
}
async function generateImage(config, options) {
    switch(config.providerId){
        case 'seedream':
            return (0,_adapters_seedream_adapter__WEBPACK_IMPORTED_MODULE_2__/* .generateWithSeedream */ .I)(config, options);
        case 'openai-image':
            return (0,_adapters_openai_image_adapter__WEBPACK_IMPORTED_MODULE_1__/* .generateWithOpenAIImage */ .V)(config, options);
        case 'qwen-image':
            return (0,_adapters_qwen_image_adapter__WEBPACK_IMPORTED_MODULE_3__/* .generateWithQwenImage */ .M)(config, options);
        case 'nano-banana':
            return (0,_adapters_nano_banana_adapter__WEBPACK_IMPORTED_MODULE_4__/* .generateWithNanoBanana */ .T)(config, options);
        case 'minimax-image':
            return (0,_adapters_minimax_image_adapter__WEBPACK_IMPORTED_MODULE_5__/* .generateWithMiniMaxImage */ .U)(config, options);
        case 'grok-image':
            return (0,_adapters_grok_image_adapter__WEBPACK_IMPORTED_MODULE_6__/* .generateWithGrokImage */ .e)(config, options);
        case 'lemonade':
            return (0,_adapters_lemonade_image_adapter__WEBPACK_IMPORTED_MODULE_7__/* .generateWithLemonadeImage */ .Y)(config, options);
        case 'zai':
            // Server-only SDK — dispatch through image-providers-server.ts
            throw new Error('ZAI image generation must run on the server (import generateImage from @/lib/media/image-providers-server).');
        default:
            throw new Error(`Unsupported image provider: ${config.providerId}`);
    }
}
function aspectRatioToDimensions(ratio, maxWidth = 1024) {
    const [w, h] = ratio.split(':').map(Number);
    if (!w || !h) return {
        width: maxWidth,
        height: Math.round(maxWidth * 9 / 16)
    };
    return {
        width: maxWidth,
        height: Math.round(maxWidth * h / w)
    };
}


/***/ }),

/***/ 478006:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   M: () => (/* binding */ testGrokImageConnectivity),
/* harmony export */   e: () => (/* binding */ generateWithGrokImage)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/grok-image-adapter.ts */ /**
 * Grok (xAI) Image Generation Adapter
 *
 * Uses OpenAI-compatible synchronous API format.
 * Endpoint: https://api.x.ai/v1/images/generations
 *
 * Supported models:
 * - grok-imagine-image      (standard, $0.02/image)
 * - grok-imagine-image-pro  (pro quality, $0.07/image)
 *
 * Authentication: Bearer token via Authorization header
 *
 * API docs: https://docs.x.ai/developers/rest-api-reference/inference/images
 */ const DEFAULT_MODEL = 'grok-imagine-image';
const DEFAULT_BASE_URL = 'https://api.x.ai/v1';
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */ async function testGrokImageConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        const response = await fetch(`${baseUrl}/images/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model || DEFAULT_MODEL,
                prompt: '',
                n: 1
            })
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Grok Image auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Grok Image'
        };
    } catch (err) {
        return {
            success: false,
            message: `Grok Image connectivity error: ${err}`
        };
    }
}
async function generateWithGrokImage(config, options) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const response = await fetch(`${baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            prompt: options.prompt,
            n: 1,
            response_format: 'url'
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Grok image generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    // OpenAI-compatible response format: { data: [{ url, revised_prompt }] }
    const imageData = data.data?.[0];
    if (!imageData) {
        throw new Error('Grok returned empty image response');
    }
    return {
        url: imageData.url,
        base64: imageData.b64_json,
        width: options.width || 1024,
        height: options.height || 1024
    };
}


/***/ }),

/***/ 609169:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   J: () => (/* binding */ testZaiImageConnectivity),
/* harmony export */   d: () => (/* binding */ generateWithZaiImage)
/* harmony export */ });
/* harmony import */ var _lib_zai__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(376389);
/**
 * ZAI (built-in platform) Image Generation Adapter — MedQ-specific.
 *
 * Uses z-ai-web-dev-sdk's `images.generations` API — the same SDK and the
 * same credential source (`.z-ai-config` / `ZAI_API_KEY`, including the
 * gateway X-Token) that already back the app's LLM layer. This makes image
 * generation work OUT OF THE BOX on ZAI deployments with no operator
 * configuration, and it is the automatic fallback whenever an external
 * image provider (Seedream, OpenAI, …) has no API key configured — see
 * deep-agent-tools.ts / tools/illustration.ts.
 *
 * The SDK returns base64-only results (no hosted URL); callers persist them
 * to /public/generated (saveGeneratedImage) so tool results carry a small,
 * previewable URL instead of a ~40KB base64 blob.
 *
 * SERVER-ONLY module: statically imports @/lib/zai (fs/path/os). It must
 * never be imported from image-providers.ts (which is bundled for the
 * client) — dispatch goes through image-providers-server.ts instead.
 *
 * SDK size constraint — `size` must be exactly one of:
 *   1024x1024, 768x1344, 864x1152, 1344x768, 1152x864, 1440x720, 720x1440
 */ 
const ZAI_SUPPORTED_SIZES = [
    {
        size: '1024x1024',
        width: 1024,
        height: 1024
    },
    {
        size: '1344x768',
        width: 1344,
        height: 768
    },
    {
        size: '1440x720',
        width: 1440,
        height: 720
    },
    {
        size: '1152x864',
        width: 1152,
        height: 864
    },
    {
        size: '864x1152',
        width: 864,
        height: 1152
    },
    {
        size: '768x1344',
        width: 768,
        height: 1344
    },
    {
        size: '720x1440',
        width: 720,
        height: 1440
    }
];
/**
 * Map our aspect-ratio / width+height request onto one of the SDK's fixed
 * sizes. Width+height picks the supported size with the closest aspect
 * ratio (ties broken by closest pixel area); aspectRatio maps directly.
 */ function resolveZaiSize(options) {
    if (options.width && options.height) {
        const targetRatio = Math.log(options.width / options.height);
        const targetArea = options.width * options.height;
        let best = ZAI_SUPPORTED_SIZES[0];
        let bestRatioDelta = Number.POSITIVE_INFINITY;
        let bestAreaDelta = Number.POSITIVE_INFINITY;
        for (const candidate of ZAI_SUPPORTED_SIZES){
            const ratioDelta = Math.abs(Math.log(candidate.width / candidate.height) - targetRatio);
            const areaDelta = Math.abs(candidate.width * candidate.height - targetArea);
            const ratioImproves = ratioDelta < bestRatioDelta - 1e-9;
            const ratioTies = Math.abs(ratioDelta - bestRatioDelta) <= 1e-9;
            if (ratioImproves || ratioTies && areaDelta < bestAreaDelta) {
                best = candidate;
                bestRatioDelta = ratioDelta;
                bestAreaDelta = areaDelta;
            }
        }
        return {
            size: best.size,
            width: best.width,
            height: best.height
        };
    }
    switch(options.aspectRatio){
        case '16:9':
            return {
                size: '1344x768',
                width: 1344,
                height: 768
            };
        case '9:16':
            return {
                size: '768x1344',
                width: 768,
                height: 1344
            };
        case '4:3':
            return {
                size: '1152x864',
                width: 1152,
                height: 864
            };
        default:
            return {
                size: '1024x1024',
                width: 1024,
                height: 1024
            };
    }
}
/**
 * Resolve the SDK client.
 *
 *  - Normal (managed) path FIRST: `.z-ai-config` / `ZAI_API_KEY` exists →
 *    `createZAI()` resolves the full credential set (baseUrl + apiKey +
 *    gateway X-Token — the token is required by the gateway and is only
 *    available through the platform config, so this path must win even when
 *    a config.apiKey is present). `config.apiKey` (injected into the image
 *    section by provider-config from the same source) is informational only.
 *  - Unmanaged fallback: no platform config, but a client-supplied key
 *    arrived (config.apiKey non-empty) → instantiate the SDK directly with
 *    it, using the runtime-constructor bypass documented in src/lib/zai.ts.
 */ async function resolveZaiImageClient(config) {
    try {
        return await (0,_lib_zai__WEBPACK_IMPORTED_MODULE_0__.createZAI)();
    } catch (platformError) {
        if (!config.apiKey) {
            throw new Error(`ZAI image provider is not configured: ${platformError instanceof Error ? platformError.message : String(platformError)}`);
        }
        const loader = new Function('return import("z-ai-web-dev-sdk")');
        let ZAI;
        try {
            const mod = await loader();
            ZAI = mod?.default ?? mod;
        } catch  {
            throw new Error('z-ai-web-dev-sdk is not available on this server');
        }
        if (!ZAI) throw new Error('z-ai-web-dev-sdk is not available on this server');
        const Ctor = ZAI;
        return new Ctor({
            baseUrl: config.baseUrl || 'https://api.z.ai/api/paas/v4',
            apiKey: config.apiKey
        });
    }
}
async function generateWithZaiImage(config, options) {
    const zai = await resolveZaiImageClient(config);
    const { size, width, height } = resolveZaiSize(options);
    // `model` is optional in the SDK body; only forward meaningful overrides
    // ('auto' means "let the platform pick").
    const model = config.model && config.model !== 'auto' ? config.model : undefined;
    const response = await zai.images.generations.create({
        prompt: options.prompt,
        size,
        ...model ? {
            model
        } : {}
    });
    const base64 = response?.data?.[0]?.base64;
    if (!base64) {
        if (response?.content_filter?.length) {
            throw new Error('ZAI image generation blocked the prompt (content filter)');
        }
        throw new Error('ZAI image generation returned an empty response');
    }
    return {
        base64,
        width,
        height
    };
}
async function testZaiImageConnectivity(config) {
    try {
        // Real probe: the ZAI gateway has no cheap auth-only endpoint for images,
        // so a minimal 1024x1024 generation is the only honest connectivity check.
        const result = await generateWithZaiImage(config, {
            prompt: 'simple blue circle centered on a white background, minimal test image'
        });
        return {
            success: true,
            message: `Connected to ZAI image generation (${result.width}x${result.height} test image generated)`
        };
    } catch (err) {
        return {
            success: false,
            message: `ZAI image connectivity error: ${err instanceof Error ? err.message : String(err)}`
        };
    }
}


/***/ }),

/***/ 630327:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   I: () => (/* binding */ generateWithSeedream),
/* harmony export */   U: () => (/* binding */ testSeedreamConnectivity)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/seedream-adapter.ts */ /**
 * Seedream (ByteDance / Doubao / Ark) Image Generation Adapter
 *
 * Uses OpenAI-compatible synchronous API format.
 * Endpoint: https://ark.cn-beijing.volces.com/api/v3/images/generations
 *
 * Supported models:
 * - doubao-seedream-5-0-260128  (latest / Lite, text2img + img2img + multi-ref + group)
 * - doubao-seedream-4-5-251128
 * - doubao-seedream-4-0-250828
 * - doubao-seedream-3-0-t2i-250415
 *
 * API docs: https://www.volcengine.com/docs/6791/1399028
 */ const DEFAULT_MODEL = 'doubao-seedream-5-0-260128';
const DEFAULT_BASE_URL = 'https://ark.cn-beijing.volces.com';
/**
 * Map our aspect ratio + size to Seedream size format "WxH".
 * Seedream requires minimum 3,686,400 pixels total.
 * Common sizes: 2048x2048 (2K), 2560x1440 (16:9), 1920x1920.
 */ function resolveSeedreamSize(options) {
    if (options.width && options.height) {
        // Ensure minimum pixel count (3,686,400)
        const pixels = options.width * options.height;
        if (pixels < 3686400) {
            // Scale up proportionally
            const scale = Math.ceil(Math.sqrt(3686400 / pixels));
            return `${options.width * scale}x${options.height * scale}`;
        }
        return `${options.width}x${options.height}`;
    }
    // Default to 2K for quality
    return '2K';
}
/**
 * Lightweight connectivity test — validates API key by making a minimal
 * request that triggers auth check. 401/403 means key invalid.
 */ async function testSeedreamConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    try {
        // Send a request with empty prompt — auth failure (401/403) means bad key,
        // any other error (400) means key is valid but request is intentionally bad
        const response = await fetch(`${baseUrl}/api/v3/images/generations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${config.apiKey}`
            },
            body: JSON.stringify({
                model: config.model || DEFAULT_MODEL,
                prompt: '',
                size: '1x1'
            })
        });
        if (response.status === 401 || response.status === 403) {
            const text = await response.text();
            return {
                success: false,
                message: `Seedream auth failed (${response.status}): ${text}`
            };
        }
        return {
            success: true,
            message: 'Connected to Seedream'
        };
    } catch (err) {
        return {
            success: false,
            message: `Seedream connectivity error: ${err}`
        };
    }
}
async function generateWithSeedream(config, options) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const response = await fetch(`${baseUrl}/api/v3/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            prompt: options.prompt,
            size: resolveSeedreamSize(options),
            watermark: false
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Seedream generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    // OpenAI-compatible response format: { data: [{ url, b64_json, ... }] }
    const imageData = data.data?.[0];
    if (!imageData) {
        throw new Error('Seedream returned empty response');
    }
    return {
        url: imageData.url,
        base64: imageData.b64_json,
        width: options.width || 1024,
        height: options.height || 1024
    };
}


/***/ }),

/***/ 659497:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

/***/ 785554:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   F: () => (/* binding */ generateImage),
/* harmony export */   r: () => (/* binding */ testImageConnectivity)
/* harmony export */ });
/* harmony import */ var _image_providers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(458384);
/* harmony import */ var _adapters_zai_image_adapter__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(609169);
/**
 * Server-only image generation dispatch — MedQ-specific.
 *
 * Thin wrapper around image-providers.ts that adds the `zai` (built-in
 * platform) provider. The ZAI adapter statically imports @/lib/zai
 * (fs/path/os + z-ai-web-dev-sdk), so it CANNOT live in image-providers.ts —
 * that module is bundled for the client (settings store / settings UI import
 * the IMAGE_PROVIDERS registry).
 *
 * SERVER CALL SITES MUST IMPORT FROM HERE, not from image-providers.ts:
 *   import { generateImage } from '@/lib/media/image-providers-server';
 *
 * The `import 'server-only'` marker makes any accidental client import fail
 * at build time with a clear message instead of a cryptic fs error.
 */ 


async function generateImage(config, options) {
    if (config.providerId === 'zai') {
        return (0,_adapters_zai_image_adapter__WEBPACK_IMPORTED_MODULE_1__/* .generateWithZaiImage */ .d)(config, options);
    }
    return (0,_image_providers__WEBPACK_IMPORTED_MODULE_0__/* .generateImage */ .Fz)(config, options);
}
async function testImageConnectivity(config) {
    if (config.providerId === 'zai') {
        return (0,_adapters_zai_image_adapter__WEBPACK_IMPORTED_MODULE_1__/* .testZaiImageConnectivity */ .J)(config);
    }
    return (0,_image_providers__WEBPACK_IMPORTED_MODULE_0__/* .testImageConnectivity */ .rZ)(config);
}


/***/ }),

/***/ 847582:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   C: () => (/* binding */ testMiniMaxImageConnectivity),
/* harmony export */   U: () => (/* binding */ generateWithMiniMaxImage)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/minimax-image-adapter.ts */ /**
 * MiniMax Image Generation Adapter
 * Supports: text-to-image with aspect ratio control
 * API Docs: https://platform.minimaxi.com/docs/api-reference/image-generation-t2i
 */ const BASE_URL = 'https://api.minimaxi.com';
async function generateWithMiniMaxImage(config, options) {
    const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
    const model = config.model || 'image-01';
    const aspectRatio = options.aspectRatio || '1:1';
    const response = await fetch(`${baseUrl}/v1/image_generation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model,
            prompt: options.prompt,
            negative_prompt: options.negativePrompt,
            aspect_ratio: aspectRatio,
            response_format: 'url',
            n: 1,
            prompt_optimizer: false
        })
    });
    if (!response.ok) {
        const errText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax Image API error: ${errText}`);
    }
    const data = await response.json();
    // Check for error response
    if (data?.base_resp?.status_code !== 0 && data?.base_resp?.status_code !== undefined) {
        const code = data.base_resp.status_code;
        const msg = data.base_resp.status_msg || 'unknown error';
        throw new Error(`MiniMax Image API error ${code}: ${msg}`);
    }
    const imageUrls = data?.data?.image_urls;
    if (!imageUrls || imageUrls.length === 0) {
        throw new Error(`MiniMax Image: no image URLs returned. Response: ${JSON.stringify(data)}`);
    }
    const imageUrl = imageUrls[0];
    // Determine dimensions from aspect ratio
    let width = options.width || 1024;
    let height = options.height || 1024;
    if (!options.width && !options.height) {
        const [w, h] = aspectRatio.split(':').map(Number);
        if (w && h) {
            if (w > h) {
                width = 1024;
                height = Math.round(1024 * h / w);
            } else {
                height = 1024;
                width = Math.round(1024 * w / h);
            }
        }
    }
    return {
        url: imageUrl,
        width,
        height
    };
}
async function testMiniMaxImageConnectivity(config) {
    try {
        const baseUrl = (config.baseUrl || BASE_URL).replace(/\/$/, '');
        const response = await fetch(`${baseUrl}/v1/image_generation`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${config.apiKey}`,
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                model: 'image-01',
                prompt: 'test',
                aspect_ratio: '1:1',
                n: 1
            })
        });
        if (response.ok) {
            return {
                success: true,
                message: 'MiniMax Image API connected'
            };
        }
        const errData = await response.json().catch(()=>({}));
        const msg = errData?.base_resp?.status_msg || response.statusText;
        return {
            success: false,
            message: `API error: ${msg}`
        };
    } catch (err) {
        return {
            success: false,
            message: `Connection failed: ${err.message}`
        };
    }
}


/***/ }),

/***/ 884911:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   P: () => (/* binding */ testOpenAIImageConnectivity),
/* harmony export */   V: () => (/* binding */ generateWithOpenAIImage)
/* harmony export */ });
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(124307);
/** Ported from OpenMAIC. Original: lib/media/adapters/openai-image-adapter.ts */ /**
 * OpenAI Image Generation Adapter
 *
 * Uses the OpenAI Images API.
 * Endpoint: https://api.openai.com/v1/images/generations
 */ 
const DEFAULT_MODEL = 'gpt-image-2';
const DEFAULT_BASE_URL = 'https://api.openai.com/v1';
function normalizeBaseUrl(baseUrl) {
    return (baseUrl || DEFAULT_BASE_URL).replace(/\/$/, '');
}
function resolveSize(options) {
    return `${options.width || 1024}x${options.height || 1024}`;
}
async function testOpenAIImageConnectivity(config) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    try {
        const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__/* .httpFetch */ .tX)(`${baseUrl}/models/${encodeURIComponent(config.model || DEFAULT_MODEL)}`, {
            headers: {
                Authorization: `Bearer ${config.apiKey}`
            }
        });
        if (response.ok) {
            return {
                success: true,
                message: 'Connected to OpenAI Image'
            };
        }
        const text = await response.text().catch(()=>response.statusText);
        if (response.status === 401 || response.status === 403) {
            return {
                success: false,
                message: `OpenAI Image auth failed (${response.status}): ${text}`
            };
        }
        if (response.status === 404) {
            return {
                success: false,
                message: `OpenAI Image model not found: ${config.model || DEFAULT_MODEL}`
            };
        }
        return {
            success: false,
            message: `OpenAI Image API error (${response.status}): ${text}`
        };
    } catch (err) {
        return {
            success: false,
            message: `OpenAI Image connectivity error: ${err}`
        };
    }
}
async function generateWithOpenAIImage(config, options) {
    const baseUrl = normalizeBaseUrl(config.baseUrl);
    const width = options.width || 1024;
    const height = options.height || 1024;
    const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_0__/* .httpFetch */ .tX)(`${baseUrl}/images/generations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${config.apiKey}`
        },
        body: JSON.stringify({
            model: config.model || DEFAULT_MODEL,
            prompt: options.prompt,
            n: 1,
            size: resolveSize(options)
        })
    });
    if (!response.ok) {
        const text = await response.text().catch(()=>response.statusText);
        throw new Error(`OpenAI image generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    const imageData = data.data?.[0];
    if (!imageData?.url && !imageData?.b64_json) {
        throw new Error('OpenAI Image returned empty image response');
    }
    return {
        url: imageData.url,
        base64: imageData.b64_json,
        width,
        height
    };
}


/***/ }),

/***/ 926725:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   R: () => (/* binding */ testNanoBananaConnectivity),
/* harmony export */   T: () => (/* binding */ generateWithNanoBanana)
/* harmony export */ });
/** Ported from OpenMAIC. Original: lib/media/adapters/nano-banana-adapter.ts */ /**
 * Nano Banana / Gemini Native Image Generation Adapter
 *
 * Uses Google Gemini's native image generation capability.
 * Endpoint: https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent
 *
 * Supported models:
 * - gemini-3.1-flash-image-preview  (Nano Banana 2 — latest, fastest)
 * - gemini-3-pro-image-preview      (Nano Banana Pro — highest quality)
 * - gemini-2.5-flash-image          (Nano Banana — original)
 *
 * Authentication: x-goog-api-key header
 *
 * API docs: https://ai.google.dev/gemini-api/docs/image-generation
 */ const DEFAULT_MODEL = 'gemini-2.5-flash-image';
const DEFAULT_BASE_URL = 'https://generativelanguage.googleapis.com';
/**
 * Lightweight connectivity test — validates API key by fetching model info.
 * Uses GET /v1beta/models/{model} which does not trigger generation.
 */ async function testNanoBananaConnectivity(config) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const model = config.model || DEFAULT_MODEL;
    const url = `${baseUrl}/v1beta/models`;
    // Try ?key= query param first (direct Google API), fall back to x-goog-api-key header (proxy)
    let response = null;
    try {
        response = await fetch(`${url}?key=${config.apiKey}`, {
            method: 'GET'
        });
    } catch  {
    // Direct API unreachable, try header auth
    }
    if (!response || !response.ok) {
        try {
            response = await fetch(url, {
                method: 'GET',
                headers: {
                    'x-goog-api-key': config.apiKey
                }
            });
        } catch (_err) {
            return {
                success: false,
                message: `Network error: unable to reach ${baseUrl}. Check your Base URL and network connection.`
            };
        }
    }
    if (response.ok) {
        return {
            success: true,
            message: `Connected to Nano Banana (${model})`
        };
    }
    // Parse error body for user-friendly message
    const text = await response.text().catch(()=>'');
    if (response.status === 400 || response.status === 401 || response.status === 403) {
        return {
            success: false,
            message: `Invalid API key or unauthorized (${response.status}). Check your API Key and Base URL match the same provider.`
        };
    }
    return {
        success: false,
        message: `Nano Banana connectivity failed (${response.status}): ${text}`
    };
}
async function generateWithNanoBanana(config, options) {
    const baseUrl = config.baseUrl || DEFAULT_BASE_URL;
    const model = config.model || DEFAULT_MODEL;
    const response = await fetch(`${baseUrl}/v1beta/models/${model}:generateContent`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': config.apiKey
        },
        body: JSON.stringify({
            contents: [
                {
                    parts: [
                        {
                            text: options.prompt
                        }
                    ]
                }
            ],
            generationConfig: {
                responseModalities: [
                    'IMAGE'
                ]
            }
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Gemini image generation failed (${response.status}): ${text}`);
    }
    const data = await response.json();
    if (data.error) {
        throw new Error(`Gemini error: ${data.error.code} - ${data.error.message}`);
    }
    const parts = data.candidates?.[0]?.content?.parts;
    if (!parts || parts.length === 0) {
        throw new Error('Gemini returned empty response');
    }
    // Find the image part (inlineData with base64)
    const imagePart = parts.find((p)=>p.inlineData);
    if (!imagePart?.inlineData) {
        // Might have returned text only (e.g. if prompt was rejected)
        const textPart = parts.find((p)=>p.text);
        throw new Error(`Gemini did not return an image. Response text: ${textPart?.text || 'none'}`);
    }
    return {
        base64: imagePart.inlineData.data,
        width: options.width || 1024,
        height: options.height || 1024
    };
}


/***/ })

};
;