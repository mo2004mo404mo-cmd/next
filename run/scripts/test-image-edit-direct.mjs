#!/usr/bin/env node
/**
 * E2E probe for the edit_medical_illustration tool path (the one skill whose
 * gateway interaction was never e2e-verified after the attachment-ref fix).
 *
 * Mirrors the tool exactly: resolve a source image → data URL →
 * zai.images.generations.edit({ prompt, images: [{ url: dataUrl }] }).
 * Success = base64 bytes returned; the tool then saves them as an artifact.
 */
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');

async function main() {
  // Prefer a real test image from the earlier skill tests, else generate a
  // tiny PNG on the fly.
  let dataUrl;
  const candidates = [
    resolve(ROOT, 'download/medq-skill-tests/nephron.jpg'),
    resolve(ROOT, 'public/generated/agent-a4b27883-403.jpg'),
  ];
  const found = candidates.find((p) => {
    try {
      readFileSync(p);
      return true;
    } catch {
      return false;
    }
  });
  if (found) {
    const { ext } = found.match(/\.(jpg|jpeg|png)$/i) || { ext: 'png' };
    const mime = /jpe?g/i.test(found) ? 'image/jpeg' : 'image/png';
    dataUrl = `data:${mime};base64,${readFileSync(found).toString('base64')}`;
    console.log(`source image: ${found} (${(readFileSync(found).length / 1024).toFixed(0)} KB)`);
  } else {
    // 1x1 red pixel PNG
    dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    console.log('source image: synthetic 1x1 PNG');
  }

  // Load the ZAI client exactly like the app does.
  const { createZAI } = await import(new URL('file://' + resolve(ROOT, 'src/lib/zai.ts')).href).catch(() => ({}));
  let zai;
  if (createZAI) {
    zai = await createZAI();
  } else {
    // Fallback: replicate the dynamic SDK import the app uses.
    const mod = await import('z-ai-web-dev-sdk').catch(async () => {
      const ZAI = (await import(new URL('file://' + resolve(ROOT, 'node_modules/z-ai-web-dev-sdk/dist/index.js')).href)).default;
      return { default: ZAI };
    });
    const ZAI = mod.default ?? mod.ZAI;
    const configPath = '/etc/.z-ai-config';
    let token = process.env.ZAI_API_KEY || '';
    let baseUrl = 'https://api.z.ai/api/paas/v4';
    try {
      const cfg = JSON.parse(readFileSync(configPath, 'utf8'));
      token = cfg.apiKey || cfg.token || token;
      baseUrl = cfg.baseUrl || baseUrl;
    } catch {}
    zai = typeof ZAI === 'function' ? ZAI({ apiKey: token, baseUrl }) : new ZAI({ apiKey: token, baseUrl });
  }
  if (!zai?.images?.generations?.edit) {
    throw new Error('ZAI client has no images.generations.edit — check SDK wiring');
  }

  console.log('calling images.generations.edit (add labels prompt)…');
  const startedAt = Date.now();
  const response = await zai.images.generations.edit({
    prompt: 'Add clear English labels to the main structures, keep the original style, clean educational diagram',
    images: [{ url: dataUrl }],
    size: '1024x1024',
  });
  const elapsedMs = Date.now() - startedAt;

  const base64 = response?.data?.[0]?.base64;
  if (!base64) {
    console.log('RESULT: gateway responded but returned no base64 image:', JSON.stringify(response).slice(0, 400));
    process.exit(2);
  }
  const bytes = Buffer.from(base64, 'base64');
  console.log(`RESULT: SUCCESS — edited image ${bytes.length.toLocaleString()} bytes in ${(elapsedMs / 1000).toFixed(1)}s`);
  const outPath = resolve(ROOT, 'tmp/edit-illustration-probe.png');
  const { writeFileSync } = await import('node:fs');
  writeFileSync(outPath, bytes);
  console.log(`saved: ${outPath}`);
}

main().catch((error) => {
  console.error('RESULT: FAILED —', error instanceof Error ? error.message : error);
  process.exit(1);
});
