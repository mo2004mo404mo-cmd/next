/**
 * Minimal ASR probe: replicate the pipeline's core steps manually —
 * ffmpeg loudnorm to 16kHz mono WAV, then z-ai-web-dev-sdk audio.asr.create.
 */
import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';

const execFileAsync = promisify(execFile);

async function main() {
  const zai = (await import('z-ai-web-dev-sdk')).default;
  const cfg = JSON.parse(fs.readFileSync('/etc/.z-ai-config', 'utf-8'));
  const client = new zai(cfg);

  const input = '/home/z/my-project/download/medq-skill-tests/skill-test-tts-pronunciation.wav';
  const norm = '/tmp/asr-probe-norm.wav';

  await execFileAsync('ffmpeg', ['-y', '-i', input, '-vn',
    '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
    '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', norm]);
  const { stdout } = await execFileAsync('ffprobe',
    ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', norm]);
  console.log('normalized duration:', stdout.trim(), 's');

  const b64 = fs.readFileSync(norm).toString('base64');
  const t0 = Date.now();
  try {
    const result = await client.audio.asr.create({ file_base64: b64, file: 'probe.wav' });
    let text;
    if (result instanceof Response) {
      const raw = await result.text();
      try { text = JSON.parse(raw)?.text ?? raw; } catch { text = raw; }
    } else if (typeof result === 'string') {
      text = result;
    } else {
      text = result?.text ?? result?.result ?? JSON.stringify(result).slice(0, 200);
    }
    console.log(`OK in ${Date.now() - t0}ms`);
    console.log('ASR OUTPUT:', String(text).slice(0, 300));
  } catch (err) {
    console.log(`FAILED in ${Date.now() - t0}ms`);
    console.log('ERROR:', err instanceof Error ? err.message : String(err));
  }
}
main();
