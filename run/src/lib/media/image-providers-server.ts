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

import 'server-only';

import {
  generateImage as generateImageBase,
  testImageConnectivity as testImageConnectivityBase,
} from './image-providers';
import {
  generateWithZaiImage,
  testZaiImageConnectivity,
} from './adapters/zai-image-adapter';
import type {
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
} from './types';

export async function generateImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  if (config.providerId === 'zai') {
    return generateWithZaiImage(config, options);
  }
  return generateImageBase(config, options);
}

export async function testImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  if (config.providerId === 'zai') {
    return testZaiImageConnectivity(config);
  }
  return testImageConnectivityBase(config);
}
