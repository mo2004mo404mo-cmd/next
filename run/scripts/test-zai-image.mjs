/**
 * Test the ZAI image generation provider directly — is the 429 transient?
 * Mirrors the exact call path of tools/illustration.ts:
 *   providerId 'seedream' (no key check) → fallback 'zai' → generateImage
 */
import { generateImage } from '../src/lib/media/image-providers-server';
import { resolveImageApiKey, resolveImageBaseUrl } from '../src/lib/server/provider-config';

async function main() {
  // Same resolution logic as illustration.ts
  let providerId = (process.env.MEDQ_AGENT_IMAGE_PROVIDER || 'seedream');
  let apiKey = resolveImageApiKey(providerId);
  let baseUrl = resolveImageBaseUrl(providerId);
  console.log('provider resolved:', providerId, 'hasKey:', !!apiKey);
  if (!apiKey && providerId !== 'zai') {
    providerId = 'zai';
    apiKey = resolveImageApiKey('zai') || undefined;
    baseUrl = resolveImageBaseUrl('zai');
    console.log('fell back to zai, hasKey:', !!apiKey);
  }

  const t0 = Date.now();
  try {
    const result = await generateImage(
      { providerId, apiKey: apiKey ?? '', baseUrl, model: process.env.MEDQ_AGENT_IMAGE_MODEL },
      { prompt: 'Simple educational diagram of a normal heart coronary anatomy, clean medical illustration style', aspectRatio: '16:9' },
    );
    console.log('SUCCESS in', Date.now() - t0, 'ms');
    console.log('result keys:', Object.keys(result));
    if (result.url) console.log('url:', result.url);
    if (result.base64) console.log('base64 length:', result.base64.length);
  } catch (err) {
    console.log('FAILED in', Date.now() - t0, 'ms');
    console.log('error:', String(err).slice(0, 300));
  }
}

main().catch((e) => { console.error('fatal', e); process.exit(1); });
