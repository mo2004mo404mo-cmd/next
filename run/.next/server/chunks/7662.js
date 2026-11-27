"use strict";
exports.id = 7662;
exports.ids = [7662];
exports.modules = {

/***/ 107662:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   generateTTS: () => (/* binding */ generateTTS),
/* harmony export */   vY: () => (/* binding */ TTSRateLimitError)
/* harmony export */ });
/* unused harmony exports throwIfTtsRateLimited, getCurrentTTSConfig */
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(731253);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(908521);
/* harmony import */ var _tts_text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(476149);
/* harmony import */ var _voxcpm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(754547);
/* harmony import */ var _lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(124307);
/**
 * TTS (Text-to-Speech) Provider Implementation
 *
 * Factory pattern for routing TTS requests to appropriate provider implementations.
 * Follows the same architecture as lib/ai/providers.ts for consistency.
 *
 * Currently Supported Providers:
 * - OpenAI TTS: https://platform.openai.com/docs/guides/text-to-speech
 * - Azure TTS: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/text-to-speech
 * - GLM TTS: https://docs.bigmodel.cn/cn/guide/models/sound-and-video/glm-tts
 * - Qwen TTS: https://bailian.console.aliyun.com/
 * - MiniMax TTS: https://platform.minimaxi.com/docs/api-reference/speech-t2a-http
 * - Doubao TTS: https://www.volcengine.com/docs/6561/1257543
 * - ElevenLabs TTS: https://elevenlabs.io/docs/api-reference/text-to-speech/convert
 * - Browser Native: Web Speech API (client-side only)
 *
 * HOW TO ADD A NEW PROVIDER:
 *
 * 1. Add provider ID to TTSProviderId in lib/audio/types.ts
 *    Example: | 'elevenlabs-tts'
 *
 * 2. Add provider configuration to lib/audio/constants.ts
 *    Example:
 *    'elevenlabs-tts': {
 *      id: 'elevenlabs-tts',
 *      name: 'ElevenLabs',
 *      requiresApiKey: true,
 *      defaultBaseUrl: 'https://api.elevenlabs.io/v1',
 *      icon: '/logos/elevenlabs.svg',
 *      voices: [...],
 *      supportedFormats: ['mp3', 'pcm'],
 *      speedRange: { min: 0.5, max: 2.0, default: 1.0 }
 *    }
 *
 * 3. Implement provider function in this file
 *    Pattern: async function generateXxxTTS(config, text): Promise<TTSGenerationResult>
 *    - Validate config and build API request
 *    - Handle API authentication (apiKey, headers)
 *    - Convert provider-specific parameters (voice, speed, format)
 *    - Return { audio: Uint8Array, format: string }
 *
 *    Example:
 *    async function generateElevenLabsTTS(
 *      config: TTSModelConfig,
 *      text: string
 *    ): Promise<TTSGenerationResult> {
 *      const baseUrl = config.baseUrl || TTS_PROVIDERS['elevenlabs-tts'].defaultBaseUrl;
 *
 *      const response = await fetch(`${baseUrl}/text-to-speech/${config.voice}`, {
 *        method: 'POST',
 *        headers: {
 *          'xi-api-key': config.apiKey!,
 *          'Content-Type': 'application/json',
 *        },
 *        body: JSON.stringify({
 *          text,
 *          model_id: 'eleven_multilingual_v2',
 *          voice_settings: {
 *            stability: 0.5,
 *            similarity_boost: 0.75,
 *          }
 *        }),
 *      });
 *
 *      if (!response.ok) {
 *        throw new Error(`ElevenLabs TTS API error: ${response.statusText}`);
 *      }
 *
 *      const arrayBuffer = await response.arrayBuffer();
 *      return {
 *        audio: new Uint8Array(arrayBuffer),
 *        format: 'mp3',
 *      };
 *    }
 *
 * 4. Add case to generateTTS() switch statement
 *    case 'elevenlabs-tts':
 *      return await generateElevenLabsTTS(config, text);
 *
 * 5. Add i18n translations in lib/i18n.ts
 *    providerElevenLabsTTS: { zh: 'ElevenLabs TTS', en: 'ElevenLabs TTS' }
 *
 * Error Handling Patterns:
 * - Always validate API key if requiresApiKey is true
 * - Throw descriptive errors for API failures
 * - Include response.statusText or error messages from API
 * - For client-only providers (browser-native), throw error directing to client-side usage
 *
 * API Call Patterns:
 * - Direct API: Use fetch with appropriate headers and body format (recommended for better encoding support)
 * - SSML: For Azure-like providers requiring SSML markup
 * - URL-based: For providers returning audio URL (download in second step)
 */ 




/**
 * Thrown when a TTS provider returns a rate-limit / concurrency-quota error.
 * Allows downstream consumers to distinguish rate-limit errors from other TTS failures.
 *
 * TODO: The API route currently catches all errors uniformly as GENERATION_FAILED.
 * This class enables future retry/backoff logic without changing the throw sites.
 */ class TTSRateLimitError extends Error {
    constructor(provider, message){
        super(message), this.provider = provider;
        this.name = 'TTSRateLimitError';
    }
}
/**
 * Map an upstream HTTP 429 to a typed {@link TTSRateLimitError} so the API route
 * can surface it as 429 instead of a generic 500. Call right after an
 * `!response.ok` check, before building the provider-specific error message.
 */ function throwIfTtsRateLimited(provider, status) {
    if (status === 429) {
        throw new TTSRateLimitError(provider, `${provider} TTS rate limit exceeded (HTTP 429)`);
    }
}
/**
 * Generate speech using specified TTS provider
 */ async function generateTTS(config, text) {
    const provider = _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF[config.providerId];
    // Validate API key if required (only for built-in providers with known config)
    if (provider?.requiresApiKey && !config.apiKey) {
        throw new Error(`API key required for TTS provider: ${config.providerId}`);
    }
    // Narration/discussion text is markdown — strip it ONCE here so every
    // provider (and every calling route) speaks clean text instead of reading
    // "**", "#", "-" markers aloud. Idempotent, so client-side pre-stripping
    // (browser TTS paths) is safe to combine with this.
    const speakableText = (0,_tts_text__WEBPACK_IMPORTED_MODULE_3__/* .stripMarkdownForTTS */ .A)(text ?? '');
    switch(config.providerId){
        case 'openai-tts':
            return await generateOpenAITTS(config, speakableText);
        case 'azure-tts':
            return await generateAzureTTS(config, speakableText);
        case 'glm-tts':
            return await generateGLMTTS(config, speakableText);
        case 'qwen-tts':
            return await generateQwenTTS(config, speakableText);
        case 'voxcpm-tts':
            return await generateVoxCPMTTS(config, speakableText);
        case 'minimax-tts':
            return await generateMiniMaxTTS(config, speakableText);
        case 'doubao-tts':
            return await generateDoubaoTTS(config, speakableText);
        case 'elevenlabs-tts':
            return await generateElevenLabsTTS(config, speakableText);
        case 'lemonade-tts':
            return await generateLemonadeTTS(config, speakableText);
        case 'browser-native-tts':
            throw new Error('Browser Native TTS must be handled client-side using Web Speech API. This provider cannot be used on the server.');
        default:
            if ((0,_types__WEBPACK_IMPORTED_MODULE_4__/* .isCustomTTSProvider */ .S)(config.providerId)) {
                return await generateOpenAITTS(config, speakableText);
            }
            throw new Error(`Unsupported TTS provider: ${config.providerId}`);
    }
}
/**
 * OpenAI TTS implementation (direct API call with explicit UTF-8 encoding)
 */ async function generateOpenAITTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['openai-tts'].defaultBaseUrl;
    // Use gpt-4o-mini-tts for best quality and intelligent realtime applications
    const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .httpFetch */ .tX)(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'gpt-4o-mini-tts',
            input: text,
            voice: config.voice,
            speed: config.speed || 1.0
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('OpenAI', response.status);
        const error = await response.json().catch(()=>({
                error: response.statusText
            }));
        throw new Error(`OpenAI TTS API error: ${error.error?.message || response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    const format = getAudioResponseFormat(contentType);
    return {
        audio: new Uint8Array(arrayBuffer),
        format
    };
}
/**
 * Lemonade TTS implementation (OpenAI-compatible /v1/audio/speech).
 */ async function generateLemonadeTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['lemonade-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    const modelId = config.modelId || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['lemonade-tts'].defaultModelId;
    const voice = config.voice || 'af_heart';
    const response = await (0,_lib_server_ssrf_guard__WEBPACK_IMPORTED_MODULE_2__/* .httpFetch */ .tX)(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(config.apiKey)
        },
        body: JSON.stringify({
            model: modelId,
            input: text,
            voice,
            speed: config.speed || 1.0,
            response_format: config.format || 'wav'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Lemonade', response.status);
        throw new Error(`Lemonade TTS API error: ${await readTTSApiError(response)}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    return {
        audio: new Uint8Array(arrayBuffer),
        format: getAudioResponseFormat(contentType)
    };
}
/**
 * VoxCPM2 TTS implementation.
 *
 * OpenMAIC keeps one internal VoxCPM request shape, then adapts it to the
 * selected official backend protocol.
 */ async function generateVoxCPMTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['voxcpm-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    if (!baseUrl) {
        throw new Error('VoxCPM base URL is required');
    }
    const options = config.providerOptions || {};
    const backend = (0,_voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .normalizeVoxCPMBackend */ .H_)(options.backend);
    const voicePrompt = options.voicePrompt || (config.voice && config.voice !== 'default' && config.voice !== _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_AUTO_VOICE_ID */ .p0 ? config.voice : undefined);
    // A registered voice carries timbre by id, so no voice prompt is required.
    const registeredVoiceId = options.registeredVoiceId?.trim() || undefined;
    if (config.voice === _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_AUTO_VOICE_ID */ .p0 && !voicePrompt && !registeredVoiceId) {
        throw new Error('VoxCPM Auto Voice requires agent context');
    }
    const cfgValue = options.cfgValue ?? 2.0;
    const inferenceTimesteps = options.inferenceTimesteps ?? 10;
    const normalize = options.normalize ?? false;
    const denoise = options.denoise ?? false;
    const usePromptContinuation = Boolean(options.promptText?.trim() && options.referenceAudioBase64);
    const request = {
        targetText: usePromptContinuation ? text : buildVoxCPMTargetText(text, voicePrompt),
        rawText: text,
        registeredVoiceId,
        voicePrompt,
        promptText: options.promptText,
        cfgValue,
        inferenceTimesteps,
        normalize,
        denoise,
        referenceAudioBase64: options.referenceAudioBase64,
        referenceAudioMimeType: options.referenceAudioMimeType,
        referenceAudioName: options.referenceAudioName
    };
    const response = backend === 'nano-vllm' ? await postVoxCPMNanoVLLM(baseUrl, request, config.apiKey) : backend === 'python-api' ? await postVoxCPMPythonAPI(baseUrl, request, config.apiKey) : await postVoxCPMVLLMOmni(baseUrl, request, config);
    if (!response.ok) {
        throwIfTtsRateLimited('VoxCPM', response.status);
        throw new Error(`VoxCPM TTS API error: ${await readTTSApiError(response)}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || '';
    const format = getAudioResponseFormat(contentType);
    return {
        audio: new Uint8Array(arrayBuffer),
        format
    };
}
function buildVoxCPMTargetText(text, voicePrompt) {
    const prompt = voicePrompt?.replace(/[\p{C}]+/gu, ' ').replace(/[()（）]/gu, '').replace(/\s+/gu, ' ').trim();
    return prompt ? `(${prompt})${text}` : text;
}
function getAudioResponseFormat(contentType) {
    if (contentType.includes('audio/wav') || contentType.includes('audio/x-wav')) return 'wav';
    if (contentType.includes('audio/mpeg') || contentType.includes('audio/mp3')) return 'mp3';
    if (contentType.includes('audio/flac')) return 'flac';
    if (contentType.includes('audio/ogg')) return 'ogg';
    if (contentType.includes('audio/webm')) return 'webm';
    return 'mp3';
}
function getVoxCPMAudioFormat(mimeType, fileName) {
    const lowerName = fileName?.toLowerCase() || '';
    if (mimeType?.includes('wav') || lowerName.endsWith('.wav')) return 'wav';
    if (mimeType?.includes('mpeg') || mimeType?.includes('mp3') || lowerName.endsWith('.mp3')) {
        return 'mp3';
    }
    if (mimeType?.includes('flac') || lowerName.endsWith('.flac')) return 'flac';
    if (mimeType?.includes('ogg') || lowerName.endsWith('.ogg')) return 'ogg';
    if (mimeType?.includes('webm') || lowerName.endsWith('.webm')) return 'webm';
    return 'wav';
}
function getVLLMOmniSpeechUrl(baseUrl) {
    return baseUrl.endsWith('/v1') ? `${baseUrl}/audio/speech` : `${baseUrl}/v1/audio/speech`;
}
function getVLLMOmniModelId(config) {
    const modelId = config.modelId?.trim();
    if (!modelId || modelId === 'VoxCPM2') return _voxcpm__WEBPACK_IMPORTED_MODULE_1__/* .VOXCPM_VLLM_MODEL_ID */ .Cn;
    return modelId;
}
function getBackendAuthHeaders(apiKey) {
    return apiKey?.trim() ? {
        Authorization: `Bearer ${apiKey.trim()}`
    } : {};
}
async function postVoxCPMVLLMOmni(baseUrl, params, config) {
    const payload = {
        model: getVLLMOmniModelId(config),
        input: params.targetText,
        voice: 'default',
        response_format: 'wav',
        stream: false
    };
    if (params.registeredVoiceId) {
        // A registered voice carries timbre by id (pre-encoded latents): reference it
        // directly and send the raw text — no inline voice-design prompt or ref_audio.
        payload.voice = params.registeredVoiceId;
        payload.input = params.rawText ?? params.targetText;
    } else if (params.referenceAudioBase64) {
        const referenceAudio = getVoxCPMDataAudioUrl(params.referenceAudioBase64, params.referenceAudioMimeType, params.referenceAudioName);
        payload.ref_audio = referenceAudio;
        if (params.promptText?.trim()) {
            payload.prompt_audio = referenceAudio;
            payload.prompt_text = params.promptText.trim();
        }
    }
    return fetch(getVLLMOmniSpeechUrl(baseUrl), {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(config.apiKey)
        },
        body: JSON.stringify(payload)
    });
}
function getVoxCPMDataAudioUrl(base64, mimeType, fileName) {
    const format = getVoxCPMAudioFormat(mimeType, fileName);
    const mediaType = mimeType?.trim() || (format === 'mp3' ? 'audio/mpeg' : format === 'flac' ? 'audio/flac' : format === 'ogg' ? 'audio/ogg' : format === 'webm' ? 'audio/webm' : 'audio/wav');
    return `data:${mediaType};base64,${base64}`;
}
function base64ToBlob(base64, mimeType) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for(let index = 0; index < binary.length; index++){
        bytes[index] = binary.charCodeAt(index);
    }
    return new Blob([
        bytes
    ], {
        type: mimeType || 'audio/wav'
    });
}
async function postVoxCPMPythonAPI(baseUrl, params, apiKey) {
    const formData = new FormData();
    formData.set('text', params.targetText);
    formData.set('cfg_value', String(params.cfgValue));
    formData.set('inference_timesteps', String(params.inferenceTimesteps));
    formData.set('normalize', String(params.normalize));
    formData.set('denoise', String(params.denoise));
    if (params.referenceAudioBase64) {
        const audioBlob = base64ToBlob(params.referenceAudioBase64, params.referenceAudioMimeType);
        const audioName = params.referenceAudioName || 'reference.wav';
        formData.set('reference_audio', audioBlob, audioName);
        if (params.promptText?.trim()) {
            formData.set('prompt_audio', audioBlob, audioName);
            formData.set('prompt_text', params.promptText.trim());
        }
    }
    return fetch(`${baseUrl}/tts/upload`, {
        method: 'POST',
        headers: getBackendAuthHeaders(apiKey),
        body: formData
    });
}
async function postVoxCPMNanoVLLM(baseUrl, params, apiKey) {
    const payload = {
        target_text: params.targetText,
        cfg_value: params.cfgValue
    };
    if (params.referenceAudioBase64) {
        const format = getVoxCPMAudioFormat(params.referenceAudioMimeType, params.referenceAudioName);
        payload.ref_audio_wav_base64 = params.referenceAudioBase64;
        payload.ref_audio_wav_format = format;
        if (params.promptText?.trim()) {
            payload.prompt_wav_base64 = params.referenceAudioBase64;
            payload.prompt_wav_format = format;
            payload.prompt_text = params.promptText.trim();
        }
    }
    return fetch(`${baseUrl}/generate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            ...getBackendAuthHeaders(apiKey)
        },
        body: JSON.stringify(payload)
    });
}
async function readTTSApiError(response) {
    const text = await response.text().catch(()=>response.statusText);
    if (!text) return response.statusText;
    try {
        const json = JSON.parse(text);
        if (typeof json.detail === 'string') return json.detail;
        if (typeof json.error === 'string') return json.error;
        if (json.error?.message) return json.error.message;
    } catch  {
    // Fall through to raw text.
    }
    return text;
}
/**
 * Azure TTS implementation (direct API call with SSML)
 */ async function generateAzureTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['azure-tts'].defaultBaseUrl;
    // Build SSML
    const rate = config.speed ? `${((config.speed - 1) * 100).toFixed(0)}%` : '0%';
    const ssml = `
    <speak version='1.0' xml:lang='zh-CN'>
      <voice xml:lang='zh-CN' name='${config.voice}'>
        <prosody rate='${rate}'>${escapeXml(text)}</prosody>
      </voice>
    </speak>
  `.trim();
    const response = await fetch(`${baseUrl}/cognitiveservices/v1`, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': config.apiKey,
            'Content-Type': 'application/ssml+xml; charset=utf-8',
            'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
        },
        body: ssml
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Azure', response.status);
        throw new Error(`Azure TTS API error: ${response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'mp3'
    };
}
/**
 * GLM TTS implementation (GLM API)
 */ async function generateGLMTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['glm-tts'].defaultBaseUrl;
    const response = await fetch(`${baseUrl}/audio/speech`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'glm-tts',
            input: text,
            voice: config.voice,
            speed: config.speed || 1.0,
            volume: 1.0,
            response_format: 'wav'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('GLM', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        let errorMessage = `GLM TTS API error: ${errorText}`;
        try {
            const errorJson = JSON.parse(errorText);
            if (errorJson.error?.message) {
                errorMessage = `GLM TTS API error: ${errorJson.error.message} (code: ${errorJson.error.code})`;
            }
        } catch  {
        // If not JSON, use the text as is
        }
        throw new Error(errorMessage);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'wav'
    };
}
/**
 * Qwen TTS implementation (DashScope API - Qwen3 TTS Flash)
 */ async function generateQwenTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['qwen-tts'].defaultBaseUrl;
    // Calculate speed: Qwen3 uses rate parameter from -500 to 500
    // speed 1.0 = rate 0, speed 2.0 = rate 500, speed 0.5 = rate -250
    const rate = Math.round(((config.speed || 1.0) - 1.0) * 500);
    const response = await fetch(`${baseUrl}/services/aigc/multimodal-generation/generation`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'qwen3-tts-flash',
            input: {
                text,
                voice: config.voice,
                language_type: 'Chinese'
            },
            parameters: {
                rate
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Qwen', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`Qwen TTS API error: ${errorText}`);
    }
    const data = await response.json();
    // Check for audio URL in response
    if (!data.output?.audio?.url) {
        throw new Error(`Qwen TTS error: No audio URL in response. Response: ${JSON.stringify(data)}`);
    }
    // Download audio from URL
    const audioUrl = data.output.audio.url;
    const audioResponse = await fetch(audioUrl);
    if (!audioResponse.ok) {
        throw new Error(`Failed to download audio from URL: ${audioResponse.statusText}`);
    }
    const arrayBuffer = await audioResponse.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: 'wav'
    };
}
/**
 * MiniMax TTS implementation (synchronous HTTP API)
 */ async function generateMiniMaxTTS(config, text) {
    const baseUrl = (config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['minimax-tts'].defaultBaseUrl || '').replace(/\/$/, '');
    const response = await fetch(`${baseUrl}/v1/t2a_v2`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            model: config.modelId || 'speech-2.8-hd',
            text,
            stream: false,
            output_format: 'hex',
            voice_setting: {
                voice_id: config.voice,
                speed: config.speed || 1.0,
                vol: 1,
                pitch: 0
            },
            audio_setting: {
                sample_rate: 32000,
                bitrate: 128000,
                format: config.format || 'mp3',
                channel: 1
            },
            language_boost: 'auto'
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('MiniMax', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`MiniMax TTS API error: ${errorText}`);
    }
    const data = await response.json();
    const hexAudio = data?.data?.audio;
    if (!hexAudio || typeof hexAudio !== 'string') {
        throw new Error(`MiniMax TTS error: No audio returned. Response: ${JSON.stringify(data)}`);
    }
    const cleanedHex = hexAudio.trim();
    if (cleanedHex.length % 2 !== 0) {
        throw new Error('MiniMax TTS error: invalid hex audio payload length');
    }
    const audio = new Uint8Array(cleanedHex.match(/.{1,2}/g)?.map((byte)=>parseInt(byte, 16)) || []);
    return {
        audio,
        format: data?.extra_info?.audio_format || config.format || 'mp3'
    };
}
/**
 * ElevenLabs TTS implementation (direct API call with voice-specific endpoint)
 */ async function generateElevenLabsTTS(config, text) {
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['elevenlabs-tts'].defaultBaseUrl;
    const requestedFormat = config.format || 'mp3';
    const clampedSpeed = Math.min(1.2, Math.max(0.7, config.speed || 1.0));
    const outputFormatMap = {
        mp3: 'mp3_44100_128',
        opus: 'opus_48000_96',
        pcm: 'pcm_44100',
        wav: 'wav_44100',
        ulaw: 'ulaw_8000',
        alaw: 'alaw_8000'
    };
    const outputFormat = outputFormatMap[requestedFormat] || outputFormatMap.mp3;
    const response = await fetch(`${baseUrl}/text-to-speech/${encodeURIComponent(config.voice)}?output_format=${outputFormat}`, {
        method: 'POST',
        headers: {
            'xi-api-key': config.apiKey,
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
            text,
            model_id: config.modelId || 'eleven_multilingual_v2',
            voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
                speed: clampedSpeed
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('ElevenLabs', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`ElevenLabs TTS API error: ${errorText || response.statusText}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    return {
        audio: new Uint8Array(arrayBuffer),
        format: requestedFormat
    };
}
/**
 * Get current TTS configuration from settings store
 * Note: This function should only be called in browser context
 */ async function getCurrentTTSConfig() {
    if (true) {
        throw new Error('getCurrentTTSConfig() can only be called in browser context');
    }
    // Lazy import to avoid circular dependency
    const { useSettingsStore } = await Promise.all(/* import() */[__webpack_require__.e(7909), __webpack_require__.e(3946)]).then(__webpack_require__.bind(__webpack_require__, 473946));
    const { ttsProviderId, ttsVoice, ttsSpeed, ttsProvidersConfig } = useSettingsStore.getState();
    const providerConfig = ttsProvidersConfig?.[ttsProviderId];
    return {
        providerId: ttsProviderId,
        modelId: providerConfig?.modelId || TTS_PROVIDERS[ttsProviderId]?.defaultModelId || '',
        apiKey: providerConfig?.apiKey,
        baseUrl: providerConfig?.baseUrl || providerConfig?.customDefaultBaseUrl,
        voice: ttsVoice,
        speed: ttsSpeed
    };
}
// Re-export from constants for convenience

/**
 * Doubao TTS 2.0 implementation (Volcengine Seed-TTS 2.0)
 */ async function generateDoubaoTTS(config, text) {
    const colonIdx = (config.apiKey || '').indexOf(':');
    if (colonIdx <= 0) {
        throw new Error('Doubao TTS requires API key in format "appId:accessKey". Get both from the Volcengine console.');
    }
    const appId = config.apiKey.slice(0, colonIdx);
    const accessKey = config.apiKey.slice(colonIdx + 1);
    const baseUrl = config.baseUrl || _constants__WEBPACK_IMPORTED_MODULE_0__/* .TTS_PROVIDERS */ .JF['doubao-tts'].defaultBaseUrl;
    const speechRate = Math.round(((config.speed || 1.0) - 1.0) * 100);
    const response = await fetch(`${baseUrl}/unidirectional`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Api-App-Id': appId,
            'X-Api-Access-Key': accessKey,
            'X-Api-Resource-Id': 'seed-tts-2.0'
        },
        body: JSON.stringify({
            user: {
                uid: 'openmaic'
            },
            req_params: {
                text,
                speaker: config.voice,
                audio_params: {
                    format: 'mp3',
                    sample_rate: 24000,
                    speech_rate: speechRate
                }
            }
        })
    });
    if (!response.ok) {
        throwIfTtsRateLimited('Doubao', response.status);
        const errorText = await response.text().catch(()=>response.statusText);
        throw new Error(`Doubao TTS API error (${response.status}): ${errorText}`);
    }
    const responseText = await response.text();
    const audioChunks = [];
    let depth = 0;
    let start = -1;
    for(let i = 0; i < responseText.length; i++){
        if (responseText[i] === '{') {
            if (depth === 0) start = i;
            depth++;
        } else if (responseText[i] === '}') {
            depth--;
            if (depth === 0 && start >= 0) {
                let chunk;
                try {
                    chunk = JSON.parse(responseText.slice(start, i + 1));
                } catch  {
                    start = -1;
                    continue;
                }
                start = -1;
                if (chunk.code === 0 && chunk.data) {
                    audioChunks.push(new Uint8Array(Buffer.from(chunk.data, 'base64')));
                } else if (chunk.code === 20000000) {
                    break;
                } else if (chunk.code && chunk.code !== 0) {
                    if (chunk.code === 45000000 || chunk.code === 45000292) {
                        throw new TTSRateLimitError('doubao-tts', chunk.message || 'concurrency quota exceeded');
                    }
                    throw new Error(`Doubao TTS error: ${chunk.message || 'unknown'} (code: ${chunk.code})`);
                }
            }
        }
    }
    if (audioChunks.length === 0) {
        throw new Error('Doubao TTS: no audio data received');
    }
    const totalLength = audioChunks.reduce((sum, c)=>sum + c.length, 0);
    const combined = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of audioChunks){
        combined.set(chunk, offset);
        offset += chunk.length;
    }
    return {
        audio: combined,
        format: 'mp3'
    };
}
/**
 * Escape XML special characters for SSML
 */ function escapeXml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}


/***/ }),

/***/ 476149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ stripMarkdownForTTS)
/* harmony export */ });
/**
 * Markdown → plain-speech text sanitizer for TTS.
 *
 * Problem (Task 51): LLM-generated narration/discussion text is markdown
 * (`**bold**`, `# headings`, `- bullets`, links, tables...). Every TTS entry
 * point used to pass that text through verbatim, so the narrator audibly read
 * the syntax ("asterisk asterisk ... hash hash ...").
 *
 * This module converts markdown narration to clean speakable text. It is a
 * PURE isomorphic function (no client/server imports) so it can be applied at
 * every choke point:
 *   - server:  `generateTTS()` in tts-providers.ts (all providers, all routes)
 *   - browser: use-browser-tts.speak(), playBrowserTTSPreview(), useAgentVoice
 *   - client→server bodies: stage-tts-client.synthesizeStageTTS()
 *
 * Design notes:
 *  - Idempotent: output contains no markdown markers, so re-running is a no-op
 *    (double-sanitize across client + server is safe).
 *  - Conservative: emphasis pairs require whitespace/punctuation boundaries so
 *    legitimate text like `5 * 3` or `snake_case` is never eaten.
 *  - Ordered: structural constructs (fences, links, images, headings) are
 *    removed before inline emphasis so markers inside them don't leak.
 *  - Ordered-list markers ("1.") are KEPT (they carry meaning when spoken);
 *    bullet markers ("- ", "* ") are stripped (TTS reads them as "dash").
 */ /** Remove HTML comments (multi-line safe). */ function stripHtmlComments(text) {
    return text.replace(/<!--[\s\S]*?-->/g, '');
}
/**
 * Strip fenced code blocks, keeping the inner code as speakable text.
 * Two-step (order matters):
 *   1. drop bare fence-marker lines (`` ``` `` alone on a line — i.e. closers
 *      and bare openers);
 *   2. drop opener lines including their language tag ("```python\n").
 * Content between them is kept so code narration still speaks the code.
 */ function stripCodeFences(text) {
    return text.replace(/^[ \t]*(`{3,}|~{3,})[ \t]*$/gm, '').replace(/^[ \t]*(`{3,}|~{3,})[^\n]*\n/gm, '');
}
/** Headings: leading ATX marker(s) and trailing closers. "## T ##" → "T". */ function stripHeadingMarkers(text) {
    return text.split('\n').map((line)=>line.replace(/^[ \t]{0,3}#{1,6}[ \t]+/, '').replace(/[ \t]+#{1,6}[ \t]*$/, '')).join('\n');
}
/** Remove setext heading underlines ("===" / "---" lines). */ function stripSetextUnderlines(text) {
    return text.replace(/^[ \t]*(-{3,}|={3,})[ \t]*$/gm, '');
}
/** Remove horizontal rules (already partially covered by setext pass). */ function stripHorizontalRules(text) {
    return text.replace(/^[ \t]{0,3}([-*_])[ \t]*\1[ \t]*\1[\s\S]*?$/gm, '');
}
/**
 * Inline: images → removed, links → keep label only, reference definitions →
 * removed, footnotes → removed.
 */ function stripLinksAndImages(text) {
    return text// images ![alt](url) — never speak the alt or the URL
    .replace(/!\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '')// links [label](url) → label
    .replace(/\[([^\]]*)\]\([^)\s]*(?:\s+"[^"]*")?\)/g, '$1')// reference-style link definitions at line start → drop the whole line
    .replace(/^[ \t]*\[([^\]]+)\]:[ \t]*\S+.*$/gm, '')// footnotes [^1] (inline refs and definitions)
    .replace(/\[\^[^\]]+\]/g, '')// leftover empty link labels `[](url)` were handled above; bare `[]`
    // pairs left by image removal inside links → drop
    .replace(/^\[\]$/gm, '');
}
/**
 * Inline emphasis: `**bold**`, `__bold__`, `*italic*`, `_italic_`, `~~strike~~`,
 * and inline code backticks. Single-char markers require non-word boundaries on
 * both sides so `5 * 3`, `snake_case`, `a_b` survive untouched.
 */ function stripInlineEmphasisAndCode(text) {
    return text// double-backtick inline code first (``x``)
    .replace(/``([^`]+)``/g, '$1')// single-backtick inline code
    .replace(/`([^`\n]+)`/g, '$1')// strikethrough
    .replace(/~~([^~\n]+)~~/g, '$1')// bold ** ** (allow intraword — real narration bold is word-level)
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')// bold __ __ — CommonMark semantics: "Run __init__ first" IS strong
    // emphasis (space-flanked); dunders only survive inside code spans.
    .replace(/(^|[^\w\\])__([^_\n]+)__(?!\w)/g, '$1$2')// italic * * — boundaries required (protects "5 * 3", "a*b*c" math)
    .replace(/(^|[^\w\\*])\*(?=\S)([^*\n]*[^\s\*])\*(?![\w*])/g, '$1$2')// italic _ _ — boundaries required (protects snake_case)
    .replace(/(^|[^\w\\])_(?=\S)([^_\n]*[^\s_])_(?![\w])/g, '$1$2');
}
/**
 * Blockquotes: strip the leading ">" markers (handles nested ">>" — one or
 * more markers per line). NOTE: exactly ONE ">" in the pattern after the
 * optional space — a second ">" would require nested quotes to match.
 */ function stripBlockquotes(text) {
    return text.replace(/^[ \t]{0,3}(?:>[ \t]?)+/gm, '');
}
/** Bullets: "- ", "* ", "+ " at line start → drop the marker (keep the text). */ function stripBulletMarkers(text) {
    return text.replace(/^([ \t]*)[-*+][ \t]+/gm, '$1');
}
/**
 * Tables: drop separator rows (|---|---|) together with their newline, then
 * per line trim the edge pipes and turn inner pipes into comma pauses so
 * cell content still reads naturally.
 */ function stripTables(text) {
    const withoutSeparators = text.replace(/^[ \t]*\|?[ \t]*:?-{3,}:?[ \t]*(?:\|[ \t]*:?-{3,}:?[ \t]*)+\|?[ \t]*(?:\r?\n|$)/gm, '');
    return withoutSeparators.split('\n').map((line)=>line.replace(/^[ \t]*\|[ \t]*/, '').replace(/[ \t]*\|[ \t]*$/, '').replace(/[ \t]*\|[ \t]*/g, ', ').replace(/,[ \t]*,[ \t]*/g, ', ')).join('\n');
}
/** Remove HTML tags (narration occasionally carries <b>, <br>, <sub>...). */ function stripHtmlTags(text) {
    return text.replace(/<\/?[a-zA-Z][^>]*>/g, '');
}
/** Backslash escapes: `\*` → `*` (the literal char is the speakable form). */ function unescapeBackslashes(text) {
    return text.replace(/\\([\\`*_{}[\]()#+\-.!>~|])/g, '$1');
}
/** Collapse 3+ blank lines to one; trim each line; trim overall. */ function normalizeWhitespace(text) {
    return text.split('\n').map((line)=>line.replace(/[ \t]{2,}/g, ' ').trimEnd()).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
/**
 * Convert markdown narration text to clean, speakable plain text.
 * Idempotent and order-stable; safe for CJK and Latin content alike.
 */ function stripMarkdownForTTS(text) {
    if (!text) return text;
    let out = text;
    out = stripHtmlComments(out);
    out = stripCodeFences(out);
    out = stripLinksAndImages(out);
    out = stripHeadingMarkers(out);
    out = stripSetextUnderlines(out);
    out = stripHorizontalRules(out);
    out = stripBlockquotes(out);
    out = stripBulletMarkers(out);
    out = stripTables(out);
    out = stripInlineEmphasisAndCode(out);
    out = stripHtmlTags(out);
    out = unescapeBackslashes(out);
    out = normalizeWhitespace(out);
    return out;
}


/***/ })

};
;