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
 */

import type { ImageProviderId, ImageProviderConfig } from './types';

export const IMAGE_PROVIDERS: Record<ImageProviderId, ImageProviderConfig> = {
  seedream: {
    id: 'seedream',
    name: 'Seedream',
    requiresApiKey: true,
    defaultBaseUrl: 'https://ark.cn-beijing.volces.com',
    models: [
      { id: 'doubao-seedream-5-0-260128', name: 'Seedream 5.0 Lite' },
      { id: 'doubao-seedream-4-5-251128', name: 'Seedream 4.5' },
      { id: 'doubao-seedream-4-0-250828', name: 'Seedream 4.0' },
      { id: 'doubao-seedream-3-0-t2i-250415', name: 'Seedream 3.0' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
  'openai-image': {
    id: 'openai-image',
    name: 'OpenAI Image',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.openai.com/v1',
    models: [
      { id: 'gpt-image-2', name: 'GPT Image 2' },
      { id: 'gpt-image-2-2026-04-21', name: 'GPT Image 2 (2026-04-21)' },
      { id: 'gpt-image-1.5', name: 'GPT Image 1.5' },
      { id: 'gpt-image-1', name: 'GPT Image 1' },
      { id: 'gpt-image-1-mini', name: 'GPT Image 1 Mini' },
      { id: 'chatgpt-image-latest', name: 'ChatGPT Image Latest' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
  'qwen-image': {
    id: 'qwen-image',
    name: 'Qwen Image',
    requiresApiKey: true,
    defaultBaseUrl: 'https://dashscope.aliyuncs.com',
    models: [
      { id: 'qwen-image-2.0-pro', name: 'Qwen Image 2.0 Pro' },
      { id: 'qwen-image-2.0-pro-2026-03-03', name: 'Qwen Image 2.0 Pro (2026-03-03)' },
      { id: 'qwen-image-2.0', name: 'Qwen Image 2.0' },
      { id: 'qwen-image-2.0-2026-03-03', name: 'Qwen Image 2.0 (2026-03-03)' },
      { id: 'qwen-image-max', name: 'Qwen Image Max' },
      { id: 'qwen-image-max-2025-12-30', name: 'Qwen Image Max (2025-12-30)' },
      { id: 'qwen-image-plus', name: 'Qwen Image Plus' },
      {
        id: 'qwen-image-plus-2026-01-09',
        name: 'Qwen Image Plus (2026-01-09)',
      },
      { id: 'qwen-image', name: 'Qwen Image' },
      { id: 'z-image-turbo', name: 'Z-Image Turbo' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
  'nano-banana': {
    id: 'nano-banana',
    name: 'Nano Banana (Gemini)',
    requiresApiKey: true,
    defaultBaseUrl: 'https://generativelanguage.googleapis.com',
    models: [
      {
        id: 'gemini-3.1-flash-image-preview',
        name: 'Gemini 3.1 Flash Image (Nano Banana 2)',
      },
      {
        id: 'gemini-3-pro-image-preview',
        name: 'Gemini 3 Pro Image (Nano Banana Pro)',
      },
      {
        id: 'gemini-2.5-flash-image',
        name: 'Gemini 2.5 Flash Image (Nano Banana)',
      },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1'],
  },
  'minimax-image': {
    id: 'minimax-image',
    name: 'MiniMax Image',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.minimaxi.com',
    models: [
      { id: 'image-01', name: 'Image 01' },
      { id: 'image-01-live', name: 'Image 01 Live' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
  'grok-image': {
    id: 'grok-image',
    name: 'Grok Image (xAI)',
    requiresApiKey: true,
    defaultBaseUrl: 'https://api.x.ai/v1',
    models: [
      { id: 'grok-imagine-image', name: 'Grok Imagine Image' },
      { id: 'grok-imagine-image-pro', name: 'Grok Imagine Image Pro' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
  lemonade: {
    id: 'lemonade',
    name: 'Lemonade',
    requiresApiKey: false,
    defaultBaseUrl: 'http://localhost:13305/v1',
    icon: '/logos/lemonade.svg',
    models: [
      { id: 'Qwen-Image-GGUF', name: 'Qwen Image GGUF' },
      { id: 'sd-cpp', name: 'Stable Diffusion (sd-cpp)' },
    ],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
    maxResolution: { width: 1024, height: 1024 },
  },
  zai: {
    id: 'zai',
    name: 'ZAI (built-in)',
    // No USER-supplied key needed — credentials come from the platform
    // (.z-ai-config / ZAI_API_KEY) resolved server-side. This is the
    // out-of-the-box provider on ZAI deployments.
    requiresApiKey: false,
    models: [{ id: 'auto', name: 'Auto (platform picks)' }],
    supportedAspectRatios: ['16:9', '4:3', '1:1', '9:16'],
  },
};
