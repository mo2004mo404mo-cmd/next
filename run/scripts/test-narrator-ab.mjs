/**
 * Audible A/B proof for Task 51 (narrator speaks markdown fix).
 *
 * Generates the SAME clinical narration twice through the real Z.AI TTS SDK:
 *   A) raw markdown text   — the OLD behavior (narrator speaks "**", "hash"...)
 *   B) sanitized text      — the NEW behavior (stripMarkdownForTTS applied)
 *
 * Output: /home/z/my-project/download/narrator-before.wav / narrator-after.wav
 */
import fs from 'fs';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { stripMarkdownForTTS } = require('/home/z/my-project/tmp/tts-text-out/tts-text.js');

const RAW = [
  '## Patient Presentation',
  '',
  'A **67-year-old man** presents with *crushing chest pain*.',
  '',
  '- Pain radiates to the left arm',
  '- Associated with `diaphoresis` and nausea',
  '',
  '> Initial impression: acute coronary syndrome.',
].join('\n');

const CLEAN = stripMarkdownForTTS(RAW);
console.log('--- RAW (before) ---');
console.log(RAW);
console.log('--- SANITIZED (after) ---');
console.log(CLEAN);
console.log('');

function readZaiConfig() {
  const paths = ['/home/z/my-project/.z-ai-config', '/home/z/.z-ai-config', '/etc/.z-ai-config'];
  for (const p of paths) {
    try {
      const cfg = JSON.parse(fs.readFileSync(p, 'utf-8'));
      if (cfg.baseUrl && cfg.apiKey) return cfg;
    } catch {}
  }
  return null;
}

async function tts(sdk, text, outFile) {
  const t0 = Date.now();
  const response = await sdk.audio.tts.create({
    input: text.slice(0, 950),
    voice: 'jam',
    speed: 1.0,
    response_format: 'wav',
    stream: false,
  });
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(new Uint8Array(arrayBuffer));
  if (!buffer.length) throw new Error('empty audio buffer');
  fs.writeFileSync(outFile, buffer);
  console.log(`wrote ${outFile} (${(buffer.length / 1024).toFixed(0)} KB, ${Date.now() - t0}ms)`);
}

const loader = new Function('return import("z-ai-web-dev-sdk")');
const mod = await loader();
const ZAICtor = mod?.default ?? mod;
if (!ZAICtor) throw new Error('z-ai-web-dev-sdk unavailable');
const cfg = readZaiConfig();
if (!cfg) throw new Error('no .z-ai-config found');
console.log(`ZAI config found (baseUrl: ${cfg.baseUrl})`);
// Same instantiation path as src/lib/zai.ts createZAI():
// constructor cast (SDK marks it private to force ZAI.create()).
const sdk = new ZAICtor(cfg);

await tts(sdk, RAW, '/home/z/my-project/download/narrator-before.wav');
await tts(sdk, CLEAN, '/home/z/my-project/download/narrator-after.wav');
console.log('\nDONE — listen to both files to hear the fix.');
