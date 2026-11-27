/**
 * Build a harvard.wav reproduction of the user's test file — the six classic
 * Harvard phonetically-balanced sentences, spoken one at a time with natural
 * pauses (~0.7 s) between them, ~20 s total. Each sentence is TTS'd
 * separately so the VAD has REAL inter-sentence silences to cut on (exactly
 * like a naturally-paced recording).
 *
 * Run: bunx tsx scripts/make-harvard.ts [outPath]
 */
import fs from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';

const execFileAsync = promisify(execFile);

const SENTENCES = [
  'The stale smell of old beer lingers.',
  'It takes heat to bring out the odor.',
  'A cold dip restores health and zest.',
  'A salt pickle tastes fine with ham.',
  'Tacos al pastor are my favorite.',
  'A zestful food is the hot cross bun.',
];

async function main() {
  const out = process.argv[2] || '/home/z/my-project/upload/fixtures/harvard.wav';
  const dir = out.slice(0, out.lastIndexOf('/'));
  fs.mkdirSync(dir, { recursive: true });

  const mod = (await import('z-ai-web-dev-sdk')) as unknown as {
    default: { create: () => Promise<{ audio: { tts: { create: (b: Record<string, unknown>) => Promise<Response> } } }> };
  };
  const zai = await mod.default.create();

  const parts: string[] = [];
  for (let i = 0; i < SENTENCES.length; i++) {
    const res = await zai.audio.tts.create({ input: SENTENCES[i] });
    if (!res.ok) throw new Error(`TTS failed on sentence ${i + 1}: HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    // NOTE: the TTS service returns HEADERLESS 16-bit 24 kHz mono PCM.
    const part = `${dir}/hv_${i}.pcm`;
    fs.writeFileSync(part, buf);
    parts.push(part);
    console.log(`sentence ${i + 1}: ${(buf.length / 1024).toFixed(1)} KB (${(buf.length / 2 / 24000).toFixed(1)}s)`);
    await new Promise((r) => setTimeout(r, 400));
  }

  // concat with 0.7 s trailing silence per sentence → single 44.1 kHz mono 16-bit WAV
  const padded: string[] = [];
  for (let i = 0; i < parts.length; i++) {
    const paddedPath = `${dir}/hv_pad_${i}.wav`;
    await execFileAsync('ffmpeg', [
      '-y', '-f', 's16le', '-ar', '24000', '-ac', '1', '-i', parts[i],
      '-af', 'apad=pad_dur=0.7',
      '-ar', '44100', '-ac', '1', '-c:a', 'pcm_s16le',
      paddedPath,
    ]);
    padded.push(paddedPath);
  }
  // small leading silence so the first sentence does not start at t=0
  const lead = `${dir}/hv_lead.wav`;
  await execFileAsync('ffmpeg', [
    '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=mono:d=0.3',
    '-c:a', 'pcm_s16le', lead,
  ]);
  const listPath = `${dir}/hv_list.txt`;
  fs.writeFileSync(listPath, [lead, ...padded].map((p) => `file '${p}'`).join('\n'));
  await execFileAsync('ffmpeg', [
    '-y', '-f', 'concat', '-safe', '0', '-i', listPath,
    '-c:a', 'pcm_s16le', '-ar', '44100', '-ac', '1',
    out,
  ]);

  // cleanup scratch
  for (const p of [...parts, ...padded, lead, listPath]) fs.rmSync(p, { force: true });

  const { stdout } = await execFileAsync('ffprobe', [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', out,
  ]);
  const stat = fs.statSync(out);
  console.log(`wrote ${out} (${(stat.size / 1024).toFixed(1)} KB, ${Number.parseFloat(stdout).toFixed(1)}s)`);
}

void main().catch((e) => { console.error(e); process.exit(1); });
