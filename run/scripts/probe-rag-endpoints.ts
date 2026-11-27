/**
 * Probe endpoints needed for the RAG + file-ingestion pipeline:
 *  1. OpenAI-compatible /embeddings (via OPENAI_BASE_URL proxy)
 *  2. OpenAI-compatible /audio/transcriptions (multipart)
 *  3. Vision via /chat/completions image_url
 *  4. z-ai-web-dev-sdk resolvability (fallback ASR/vision path)
 */
import fs from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execFile);

const BASE = (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
const KEY = process.env.OPENAI_API_KEY || '';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

async function main() {
  console.log('BASE =', BASE);
  console.log('KEY present =', Boolean(KEY));

  // 1) embeddings
  for (const m of ['text-embedding-3-small', 'text-embedding-3-large', 'text-embedding-ada-002']) {
    try {
      const t0 = Date.now();
      const res = await fetch(`${BASE}/embeddings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
        body: JSON.stringify({ model: m, input: ['aortic stenosis murmur', 'mitral regurgitation'] }),
      });
      const j: any = await res.json().catch(() => ({}));
      if (res.ok && j?.data?.length) {
        console.log(`EMBED OK (${m}): dims=${j.data[0].embedding.length} in ${Date.now() - t0}ms`);
      } else {
        console.log(`EMBED FAIL (${m}): HTTP ${res.status} ${JSON.stringify(j).slice(0, 160)}`);
      }
    } catch (e: any) { console.log(`EMBED CRASH (${m}): ${e.message?.slice(0, 120)}`); }
  }

  // 2) audio transcription
  fs.mkdirSync('/tmp/rag-probe', { recursive: true });
  await exec('ffmpeg', ['-y', '-f', 'lavfi', '-i', 'anullsrc=r=16000:cl=mono', '-t', '2', '-c:a', 'pcm_s16le', '/tmp/rag-probe/silence.wav']);
  for (const m of ['whisper-1', 'gpt-4o-transcribe', 'gpt-4o-mini-transcribe']) {
    try {
      const fd = new FormData();
      fd.append('file', new Blob([fs.readFileSync('/tmp/rag-probe/silence.wav')], { type: 'audio/wav' }), 'silence.wav');
      fd.append('model', m);
      const res = await fetch(`${BASE}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${KEY}` },
        body: fd,
      });
      const j: any = await res.json().catch(() => ({}));
      console.log(res.ok ? `ASR OK (${m}): ${JSON.stringify(j).slice(0, 120)}` : `ASR FAIL (${m}): HTTP ${res.status} ${JSON.stringify(j).slice(0, 160)}`);
      if (res.ok) break;
    } catch (e: any) { console.log(`ASR CRASH (${m}): ${e.message?.slice(0, 120)}`); }
  }

  // 3) vision via chat completions
  try {
    const imgB64 = fs.readFileSync('/home/z/my-project/src/app/opengraph-image.jpg').toString('base64');
    const res = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 40,
        messages: [{ role: 'user', content: [
          { type: 'text', text: 'One sentence: what is in this image?' },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${imgB64}` } },
        ] }],
      }),
    });
    const j: any = await res.json().catch(() => ({}));
    console.log(res.ok ? `VISION OK (${MODEL}): ${j?.choices?.[0]?.message?.content?.slice(0, 100)}` : `VISION FAIL: HTTP ${res.status} ${JSON.stringify(j).slice(0, 160)}`);
  } catch (e: any) { console.log(`VISION CRASH: ${e.message?.slice(0, 120)}`); }

  // 4) z-ai sdk
  try {
    const mod: any = await import('z-ai-web-dev-sdk');
    const zai = await mod.default.create();
    console.log('ZAI SDK OK — asr:', typeof zai.audio?.asr?.create, 'vision:', typeof zai.chat?.completions?.createVision);
  } catch (e: any) { console.log('ZAI SDK UNAVAILABLE:', e.message?.slice(0, 120)); }
}

main().catch((e) => { console.error('probe crashed:', e); process.exit(1); });
