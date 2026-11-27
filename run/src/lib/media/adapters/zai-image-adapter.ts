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

import { createZAI } from '@/lib/zai';
import type {
  ImageGenerationConfig,
  ImageGenerationOptions,
  ImageGenerationResult,
} from '../types';

const ZAI_SUPPORTED_SIZES = [
  { size: '1024x1024', width: 1024, height: 1024 },
  { size: '1344x768', width: 1344, height: 768 },
  { size: '1440x720', width: 1440, height: 720 },
  { size: '1152x864', width: 1152, height: 864 },
  { size: '864x1152', width: 864, height: 1152 },
  { size: '768x1344', width: 768, height: 1344 },
  { size: '720x1440', width: 720, height: 1440 },
] as const;

/**
 * Map our aspect-ratio / width+height request onto one of the SDK's fixed
 * sizes. Width+height picks the supported size with the closest aspect
 * ratio (ties broken by closest pixel area); aspectRatio maps directly.
 */
function resolveZaiSize(options: ImageGenerationOptions): {
  size: string;
  width: number;
  height: number;
} {
  if (options.width && options.height) {
    const targetRatio = Math.log(options.width / options.height);
    const targetArea = options.width * options.height;
    let best: (typeof ZAI_SUPPORTED_SIZES)[number] = ZAI_SUPPORTED_SIZES[0];
    let bestRatioDelta = Number.POSITIVE_INFINITY;
    let bestAreaDelta = Number.POSITIVE_INFINITY;
    for (const candidate of ZAI_SUPPORTED_SIZES) {
      const ratioDelta = Math.abs(Math.log(candidate.width / candidate.height) - targetRatio);
      const areaDelta = Math.abs(candidate.width * candidate.height - targetArea);
      const ratioImproves = ratioDelta < bestRatioDelta - 1e-9;
      const ratioTies = Math.abs(ratioDelta - bestRatioDelta) <= 1e-9;
      if (ratioImproves || (ratioTies && areaDelta < bestAreaDelta)) {
        best = candidate;
        bestRatioDelta = ratioDelta;
        bestAreaDelta = areaDelta;
      }
    }
    return { size: best.size, width: best.width, height: best.height };
  }
  switch (options.aspectRatio) {
    case '16:9':
      return { size: '1344x768', width: 1344, height: 768 };
    case '9:16':
      return { size: '768x1344', width: 768, height: 1344 };
    case '4:3':
      return { size: '1152x864', width: 1152, height: 864 };
    default: // '1:1' or unspecified
      return { size: '1024x1024', width: 1024, height: 1024 };
  }
}

interface ZaiImageClient {
  images: {
    generations: {
      create: (body: Record<string, unknown>) => Promise<{
        created?: number;
        data?: Array<{ base64?: string }>;
        content_filter?: Array<{ role?: string; level?: number }>;
      }>;
    };
  };
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
 */
async function resolveZaiImageClient(config: ImageGenerationConfig): Promise<ZaiImageClient> {
  try {
    return (await createZAI()) as ZaiImageClient;
  } catch (platformError) {
    if (!config.apiKey) {
      throw new Error(
        `ZAI image provider is not configured: ${
          platformError instanceof Error ? platformError.message : String(platformError)
        }`,
      );
    }
    const loader = new Function('return import("z-ai-web-dev-sdk")') as () => Promise<any>;
    let ZAI: any;
    try {
      const mod = await loader();
      ZAI = mod?.default ?? mod;
    } catch {
      throw new Error('z-ai-web-dev-sdk is not available on this server');
    }
    if (!ZAI) throw new Error('z-ai-web-dev-sdk is not available on this server');
    const Ctor = ZAI as unknown as new (cfg: {
      baseUrl: string;
      apiKey: string;
      [key: string]: unknown;
    }) => ZaiImageClient;
    return new Ctor({
      baseUrl: config.baseUrl || 'https://api.z.ai/api/paas/v4',
      apiKey: config.apiKey,
    });
  }
}

export async function generateWithZaiImage(
  config: ImageGenerationConfig,
  options: ImageGenerationOptions,
): Promise<ImageGenerationResult> {
  const zai = await resolveZaiImageClient(config);
  const { size, width, height } = resolveZaiSize(options);

  // `model` is optional in the SDK body; only forward meaningful overrides
  // ('auto' means "let the platform pick").
  const model = config.model && config.model !== 'auto' ? config.model : undefined;

  const response = await zai.images.generations.create({
    prompt: options.prompt,
    size,
    ...(model ? { model } : {}),
  });

  const base64 = response?.data?.[0]?.base64;
  if (!base64) {
    if (response?.content_filter?.length) {
      throw new Error('ZAI image generation blocked the prompt (content filter)');
    }
    throw new Error('ZAI image generation returned an empty response');
  }

  return { base64, width, height };
}

export async function testZaiImageConnectivity(
  config: ImageGenerationConfig,
): Promise<{ success: boolean; message: string }> {
  try {
    // Real probe: the ZAI gateway has no cheap auth-only endpoint for images,
    // so a minimal 1024x1024 generation is the only honest connectivity check.
    const result = await generateWithZaiImage(config, {
      prompt: 'simple blue circle centered on a white background, minimal test image',
    });
    return {
      success: true,
      message: `Connected to ZAI image generation (${result.width}x${result.height} test image generated)`,
    };
  } catch (err) {
    return {
      success: false,
      message: `ZAI image connectivity error: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}
