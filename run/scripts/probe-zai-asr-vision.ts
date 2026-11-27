/**
 * Probe ZAI SDK ASR + Vision endpoints so the ingestion module is built on
 * verified behavior.
 */
import fs from 'fs';

async function main() {
  const mod = await import('z-ai-web-dev-sdk');
  const ZAI = mod.default;
  const zai = await ZAI.create();

  // ── ASR probe: 3s of speech-like tone → wav 16k mono ──
  fs.mkdirSync('/tmp/zai-probe', { recursive: true });
  const { execFile } = await import('child_process');
  const { promisify } = await import('util');
  const exec = promisify(execFile);
  await exec('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'sine=frequency=440:duration=3', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', '/tmp/zai-probe/tone.wav']);
  const b64 = fs.readFileSync('/tmp/zai-probe/tone.wav').toString('base64');
  console.log('ASR: sending', Math.round(b64.length / 1024), 'KB b64...');
  try {
    const res = await zai.audio.asr.create({ file_base64: b64 });
    console.log('ASR OK:', JSON.stringify(res).slice(0, 300));
  } catch (e) {
    console.log('ASR FAIL:', e instanceof Error ? e.message : String(e));
  }

  // ── Vision probe: opengraph-image.jpg ──
  const imgB64 = fs.readFileSync('/home/z/my-project/src/app/opengraph-image.jpg').toString('base64');
  const dataUrl = `data:image/jpeg;base64,${imgB64}`;
  for (const model of ['glm-4.5v', 'glm-4.6v', 'glm-4v', 'glm-4.1v-thinking-flash', 'glm-4v-flash']) {
    try {
      const res = await zai.chat.completions.createVision({
        model,
        messages: [
          { role: 'user', content: [
            { type: 'text', text: 'Describe this image in one sentence.' },
            { type: 'image_url', image_url: { url: dataUrl } },
          ] },
        ],
        thinking: { type: 'disabled' },
      });
      const text = res?.choices?.[0]?.message?.content || '';
      console.log(`VISION OK (${model}):`, String(text).slice(0, 150));
      break;
    } catch (e) {
      console.log(`VISION FAIL (${model}):`, e instanceof Error ? e.message.slice(0, 120) : String(e));
    }
  }

  // ── ffprobe availability ──
  try {
    const { stdout } = await exec('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1', '/tmp/zai-probe/tone.wav']);
    console.log('FFPROBE OK:', stdout.trim());
  } catch (e) {
    console.log('FFPROBE FAIL:', e instanceof Error ? e.message.slice(0, 120) : String(e));
  }
}

main().catch((e) => { console.error('probe crashed:', e); process.exit(1); });
