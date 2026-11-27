/**
 * Task 39 verification: ZAI image adapter E2E.
 *
 * Generates one test image through the exact path the agent's
 * generate_medical_illustration tool now uses when no Seedream key is
 * configured (fallback → providerId 'zai' → generateWithZaiImage), then
 * persists it via saveGeneratedImage like the tool does.
 *
 * Run: bun scripts/test-zai-image-adapter.ts
 */

import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { generateWithZaiImage } from '../src/lib/media/adapters/zai-image-adapter';

// NOTE: this script imports the adapter DIRECTLY (not image-providers-server)
// because the wrapper carries the `import 'server-only'` build guard, which
// resolves to a throwing stub under plain Bun (no react-server export
// condition). The full wrapper path is exercised through the dev-server
// E2E (curl SSE) instead. Persistence here mirrors saveGeneratedImage()
// from tools/illustration.ts line-for-line.
function saveGeneratedImage(base64: string): string | null {
  try {
    const buffer = Buffer.from(base64, 'base64');
    const isJpeg =
      buffer.length > 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
    const ext = isJpeg ? 'jpg' : 'png';
    const dir = path.join(process.cwd(), 'public', 'generated');
    fs.mkdirSync(dir, { recursive: true });
    const fileName = `agent-${randomUUID().slice(0, 12)}.${ext}`;
    fs.writeFileSync(path.join(dir, fileName), buffer);
    return `/generated/${fileName}`;
  } catch {
    return null;
  }
}

async function main() {
  console.log('[1] Generating via ZAI adapter (aspectRatio 16:9)...');
  const started = Date.now();
  const result = await generateWithZaiImage(
    { providerId: 'zai', apiKey: '' },
    {
      prompt:
        'Clean educational medical illustration of the human heart anatomy, anterior view, ' +
        'four chambers and major vessels clearly drawn, textbook diagram style, white background, ' +
        'high quality, detailed labels',
      aspectRatio: '16:9',
    },
  );
  const elapsed = ((Date.now() - started) / 1000).toFixed(1);
  console.log(
    `    ok in ${elapsed}s: ${result.width}x${result.height}, base64 length=${result.base64?.length ?? 0}`,
  );
  if (!result.base64 || result.base64.length < 1000) {
    throw new Error('Suspiciously small image payload — generation likely failed silently');
  }

  console.log('[2] Persisting via saveGeneratedImage (same as the agent tool)...');
  const url = saveGeneratedImage(result.base64);
  if (!url) throw new Error('saveGeneratedImage returned null');
  console.log(`    persisted: ${url}`);

  const filePath = path.join(process.cwd(), 'public', url.replace('/generated/', 'generated/'));
  const stat = fs.statSync(filePath);
  const head = fs.readFileSync(filePath).subarray(0, 4);
  const isJpeg = head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  const isPng = head[0] === 0x89 && head[1] === 0x50 && head[2] === 0x4e && head[3] === 0x47;
  const fmt = isJpeg ? 'JPEG' : isPng ? 'PNG' : 'unknown';
  const ext = isJpeg ? 'jpg' : 'png';
  console.log(`    file: ${filePath} (${(stat.size / 1024).toFixed(1)} KB, format=${fmt})`);
  if (!isJpeg && !isPng) throw new Error('Persisted file is neither JPEG nor PNG');
  if (!url.endsWith(`.${ext}`)) throw new Error(`Extension mismatch: ${url}`);

  // Copy for user-facing evidence.
  const evidenceDir = path.join(process.cwd(), 'download');
  fs.mkdirSync(evidenceDir, { recursive: true });
  const evidence = path.join(evidenceDir, `medq-zai-image-adapter-test.${ext}`);
  fs.copyFileSync(filePath, evidence);
  console.log(`    evidence copy: ${evidence}`);

  console.log('\n✅ ZAI image adapter E2E PASSED');
}

main().catch((err) => {
  console.error('\n❌ ZAI image adapter E2E FAILED:', err instanceof Error ? err.message : err);
  process.exit(1);
});
