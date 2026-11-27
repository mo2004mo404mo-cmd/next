/**
 * Image Generation Service — routes to provider adapters
 *
 * 2026-11-04: the pure registry (IMAGE_PROVIDERS) moved to
 * ./image-provider-registry — a browser-safe module with ZERO adapter
 * imports. The dispatchers below import the provider adapters, which use
 * server-only helpers (ssrf-guard → node:dns/node:net), so THIS file must
 * never be imported from client code. Server consumers can import from
 * either module (the registry is re-exported below for compat).
 */

import type {
  ImageProviderId,
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
  ImageProviderConfig,
} from './types';
// Re-exported for backward compatibility — existing server imports of
// IMAGE_PROVIDERS from './image-providers' keep working.
export { IMAGE_PROVIDERS } from './image-provider-registry';
import { generateWithSeedream, testSeedreamConnectivity } from './adapters/seedream-adapter';
// NOTE: the ZAI adapter is intentionally NOT imported here. This module is
// bundled for the client (settings store / settings UI import IMAGE_PROVIDERS),
// and the ZAI adapter statically imports @/lib/zai (fs/path/os + the server-only
// SDK). ZAI dispatch lives in image-providers-server.ts — server call sites
// must import generateImage/testImageConnectivity from there.
import {
  generateWithOpenAIImage,
  testOpenAIImageConnectivity,
} from './adapters/openai-image-adapter';
import { generateWithQwenImage, testQwenImageConnectivity } from './adapters/qwen-image-adapter';
import { generateWithNanoBanana, testNanoBananaConnectivity } from './adapters/nano-banana-adapter';
import {
  generateWithMiniMaxImage,
  testMiniMaxImageConnectivity,
} from './adapters/minimax-image-adapter';
import { generateWithGrokImage, testGrokImageConnectivity } from './adapters/grok-image-adapter';
import {
  generateWithLemonadeImage,
  testLemonadeImageConnectivity,
} from './adapters/lemonade-image-adapter';


export async function testImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  switch (config.providerId) {
    case 'seedream':
      return testSeedreamConnectivity(config);
    case 'openai-image':
      return testOpenAIImageConnectivity(config);
    case 'qwen-image':
      return testQwenImageConnectivity(config);
    case 'nano-banana':
      return testNanoBananaConnectivity(config);
    case 'minimax-image':
      return testMiniMaxImageConnectivity(config);
    case 'grok-image':
      return testGrokImageConnectivity(config);
    case 'lemonade':
      return testLemonadeImageConnectivity(config);
    case 'zai':
      // Server-only SDK — dispatch through image-providers-server.ts
      return {
        success: false,
        message:
          'ZAI image connectivity must be tested server-side (import testImageConnectivity from @/lib/media/image-providers-server).',
      };
    default:
      return {
        success: false,
        message: `Unsupported image provider: ${config.providerId}`,
      };
  }
}


export async function generateImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  switch (config.providerId) {
    case 'seedream':
      return generateWithSeedream(config, options);
    case 'openai-image':
      return generateWithOpenAIImage(config, options);
    case 'qwen-image':
      return generateWithQwenImage(config, options);
    case 'nano-banana':
      return generateWithNanoBanana(config, options);
    case 'minimax-image':
      return generateWithMiniMaxImage(config, options);
    case 'grok-image':
      return generateWithGrokImage(config, options);
    case 'lemonade':
      return generateWithLemonadeImage(config, options);
    case 'zai':
      // Server-only SDK — dispatch through image-providers-server.ts
      throw new Error(
        'ZAI image generation must run on the server (import generateImage from @/lib/media/image-providers-server).',
      );
    default:
      throw new Error(`Unsupported image provider: ${config.providerId}`);
  }
}

export function aspectRatioToDimensions(
  ratio: string,
  maxWidth = 1024,
): { width: number; height: number } {
  const [w, h] = ratio.split(':').map(Number);
  if (!w || !h) return { width: maxWidth, height: Math.round((maxWidth * 9) / 16) };
  return { width: maxWidth, height: Math.round((maxWidth * h) / w) };
}

