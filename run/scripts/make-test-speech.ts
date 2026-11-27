/**
 * Generate a spoken-lecture test audio file via the ZAI TTS SDK — used to
 * build the synthetic lecture video (ffmpeg slides + speech) that verifies
 * the video pipeline captures BOTH the transcript and the on-screen text.
 *
 * Run: bunx tsx scripts/make-test-speech.ts [outPath]
 */
import fs from 'fs';

async function main() {
  const out = process.argv[2] || '/home/z/my-project/upload/fixtures/test-speech.mp3';
  const text =
    'Welcome to the lecture on diabetic ketoacidosis. ' +
    'The DKA protocol recommends starting an insulin infusion at zero point one units per kilogram per hour. ' +
    'Potassium must be checked before insulin is started, and replaced when the level falls below three point five millimoles per liter. ' +
    'Cerebral edema is the most feared complication, especially in children. ' +
    'Fluid resuscitation begins with one liter of normal saline over the first hour.';
  const mod = (await import('z-ai-web-dev-sdk')) as unknown as { default: { create: () => Promise<{ audio: { tts: { create: (b: Record<string, unknown>) => Promise<Response> } } }> } };
  const zai = await mod.default.create();
  const res = await zai.audio.tts.create({ input: text });
  if (!res.ok) throw new Error(`TTS failed: HTTP ${res.status} — ${await res.text().catch(() => '')}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.mkdirSync(out.slice(0, out.lastIndexOf('/')), { recursive: true });
  fs.writeFileSync(out, buf);
  console.log(`wrote ${out} (${(buf.length / 1024).toFixed(1)} KB)`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
