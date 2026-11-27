import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
// Server-only dispatch (adds the built-in ZAI provider on top of the shared
// registry) — see image-providers-server.ts for why agent code must use it.
import { generateImage } from '../../media/image-providers-server';
import type { ImageProviderId } from '../../media/types';
import { resolveImageApiKey, resolveImageBaseUrl } from '../../server/provider-config';
import { createLogger } from '../../logger';

const log = createLogger('AgentIllustration');

/**
 * Persist a base64 image to public/generated/ so tool results carry a stable,
 * previewable URL instead of a ~40KB base64 blob (which would blow the tool
 * result excerpt cap and bloat chat storage). Served by Next's static file
 * handling for /public in dev. Shared with tools/discovery.ts (Task 6).
 */
export function saveGeneratedImage(base64: string): string | null {
  try {
    const buffer = Buffer.from(base64, 'base64');
    // Sniff the actual format — the ZAI SDK (and some providers) return JPEG
    // even when asked for PNG. Browsers render by content sniffing, but the
    // extension should be honest for downloads and downstream pipelines.
    const isJpeg =
      buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const ext = isJpeg ? 'jpg' : 'png';
    const dir = path.join(process.cwd(), 'public', 'generated');
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `agent-${randomUUID().slice(0, 12)}.${ext}`;
    fs.writeFileSync(path.join(dir, fileName), buffer);
    return `/generated/${fileName}`;
  } catch (error) {
    log.warn?.('Failed to persist generated image:', error);
    return null;
  }
}

/**
 * generate_medical_illustration — educational image generation.
 * (Moved from the monolithic deep-agent-runtime.ts; behavior unchanged.)
 */
export function createMedicalIllustrationTool() {
  return new DynamicStructuredTool({
    name: 'generate_medical_illustration',
    description:
      'Generate an educational medical illustration when a question genuinely requires an image. Returns the provider result, or a clear configuration error.',
    schema: z.object({
      prompt: z.string().min(10).describe('Anatomically precise educational image prompt'),
    }),
    func: async ({ prompt }) => {
      // Preferred provider from env (default seedream); falls back to the
      // managed ZAI image provider when no API key is configured for it —
      // this keeps illustration generation working out of the box on ZAI
      // deployments (the base64 result is rendered inline in the chat UI).
      let providerId = (process.env.MEDQ_AGENT_IMAGE_PROVIDER || 'seedream') as ImageProviderId;
      let apiKey: string | undefined = resolveImageApiKey(providerId);
      let baseUrl = resolveImageBaseUrl(providerId);
      if (!apiKey && providerId !== 'zai') {
        providerId = 'zai';
        apiKey = resolveImageApiKey('zai') || undefined;
        baseUrl = resolveImageBaseUrl('zai');
      }
      try {
        const result = await generateImage(
          {
            providerId,
            apiKey: apiKey ?? '',
            baseUrl,
            model: process.env.MEDQ_AGENT_IMAGE_MODEL,
          },
          { prompt, aspectRatio: '16:9' },
        );
        // Base64-only results (ZAI) are persisted to /public/generated so the
        // result carries a small, previewable URL the chat UI renders inline.
        if (result.base64 && !result.url) {
          const url = saveGeneratedImage(result.base64);
          if (url) return JSON.stringify({ url, width: result.width, height: result.height });
        }
        return JSON.stringify(result);
      } catch (err) {
        // Graceful degradation: a failing image provider must never crash the
        // agent graph — return an honest payload the agent can adapt to.
        return JSON.stringify({
          error: `Image generation failed: ${
            err instanceof Error ? err.message.slice(0, 200) : 'unknown error'
          }`,
          note: 'Proceed without an image. To enable image generation, set IMAGE_SEEDREAM_API_KEY (Ark/Volcano Engine) in .env — when no provider key is set, the built-in ZAI provider is used automatically.',
        });
      }
    },
  });
}
