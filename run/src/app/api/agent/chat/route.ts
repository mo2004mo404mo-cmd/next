/**
 * Agent voice services API (v1 chat route — voice modes only).
 *
 * POST /api/agent/chat
 *   body: { mode: 'tts', text, voice? }     → audio/wav|mpeg blob of the text
 *   body: { mode: 'asr', audio: base64 }    → { text } transcription
 *
 * This is the endpoint the floating assistant's voice layer (useAgentVoice)
 * calls when the browser's native speech capabilities are missing or fail:
 *   • TTS: browser speechSynthesis unavailable/voiceless → server synthesis
 *   • ASR: MediaRecorder fallback (webkitSpeechRecognition unavailable) →
 *     server transcription
 *
 * Voice providers, in priority order:
 *   1. The FreeLLM router (MEDQ_AGENT_BASE_URL + MEDQ_AGENT_API_KEY — same
 *      BYOK pool the chat LLM uses): POST {base}/audio/speech (model 'auto'
 *      picks a healthy audio model) and multipart {base}/audio/transcriptions.
 *      Verified live: speech → WAV, transcription → { text }.
 *   2. An operator-configured built-in TTS/ASR provider (TTS_x / ASR_x env
 *      vars or server-providers.yml) via generateTTS / transcribeAudio.
 *   3. 503 with a descriptive message.
 *
 * The v1 CHAT mode of this route was replaced by /api/agent/chat/v2 (SSE
 * streaming, tools, threads); chat-mode requests get a 410 pointer so stale
 * clients fail loudly instead of silently.
 *
 * Auth: any resolved user (session or guest fallback) — parity with chat/v2.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createLogger } from '@/lib/logger';

const log = createLogger('AgentVoiceAPI');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 120;

interface RouterConfig {
  baseUrl: string;
  apiKey: string;
}

/** Resolve the OpenAI-compatible router the agent LLM already uses. */
function resolveRouter(): RouterConfig | null {
  const baseUrl = (process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || '')
    .replace(/\/$/, '');
  const apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
  if (!baseUrl || !apiKey) return null;
  return { baseUrl, apiKey };
}

/**
 * Split long text into ≤maxChars segments at sentence boundaries so each
 * fits an upstream TTS input cap (router: 1024 chars). Prefers breaking on
 * sentence enders, then newlines/commas; never cuts mid-word.
 */
export function splitForSpeech(text: string, maxChars: number): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= maxChars) return [trimmed];

  const sentences = trimmed.match(/[^.!?\n]+[.!?]*[\n]*/g) ?? [trimmed];
  const segments: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    const piece = sentence.trim();
    if (!piece) continue;
    if ((current + ' ' + piece).trim().length <= maxChars) {
      current = (current ? current + ' ' : '') + piece;
    } else {
      if (current) segments.push(current);
      if (piece.length <= maxChars) {
        current = piece;
      } else {
        // Pathological single sentence longer than the cap — hard split on
        // spaces near the boundary.
        let rest = piece;
        while (rest.length > maxChars) {
          let cut = rest.lastIndexOf(' ', maxChars);
          if (cut <= 0) cut = maxChars;
          segments.push(rest.slice(0, cut).trim());
          rest = rest.slice(cut).trim();
        }
        current = rest;
      }
    }
  }
  if (current.trim()) segments.push(current.trim());
  return segments.length > 0 ? segments : [trimmed.slice(0, maxChars)];
}

/**
 * Concatenate same-format WAV buffers into one playable file: reads the fmt
 * chunk (sample rate / channels / bit depth) from the first buffer, appends
 * every buffer's PCM payload, and writes a fresh canonical 44-byte header.
 * Falls back to the first buffer when inputs are not parseable WAVs or the
 * formats differ between segments.
 */
function mergeWavBuffers(buffers: Buffer[]): Buffer {
  if (buffers.length === 0) throw new Error('no audio segments');
  if (buffers.length === 1) return buffers[0];

  const parse = (buf: Buffer) => {
    if (buf.length < 44 || buf.subarray(0, 4).toString('ascii') !== 'RIFF'
      || buf.subarray(8, 12).toString('ascii') !== 'WAVE') return null;
    let offset = 12;
    let fmt: { start: number; size: number } | null = null;
    let data: { start: number; size: number } | null = null;
    while (offset + 8 <= buf.length) {
      const chunkId = buf.subarray(offset, offset + 4).toString('ascii');
      const chunkSize = buf.readUInt32LE(offset + 4);
      if (chunkId === 'fmt ' && !fmt) fmt = { start: offset + 8, size: chunkSize };
      if (chunkId === 'data') {
        data = { start: offset + 8, size: Math.min(chunkSize, buf.length - offset - 8) };
        break;
      }
      offset += 8 + chunkSize + (chunkSize % 2);
    }
    if (!fmt || !data) return null;
    return {
      audioFormat: buf.readUInt16LE(fmt.start),
      channels: buf.readUInt16LE(fmt.start + 2),
      sampleRate: buf.readUInt32LE(fmt.start + 4),
      bitsPerSample: buf.readUInt16LE(fmt.start + 14),
      pcm: buf.subarray(data.start, data.start + data.size),
    };
  };

  const parts = buffers.map(parse);
  const first = parts[0];
  if (!first || parts.some(p => !p)) return buffers[0];

  // Same PCM format across segments? Otherwise concatenation would glitch.
  const sameFormat = parts.every(p =>
    p!.audioFormat === first.audioFormat
    && p!.channels === first.channels
    && p!.sampleRate === first.sampleRate
    && p!.bitsPerSample === first.bitsPerSample,
  );
  if (!sameFormat) return buffers[0];

  let dataBytes = 0;
  for (const p of parts) dataBytes += p!.pcm.length;
  const byteRate = first.sampleRate * first.channels * (first.bitsPerSample / 8);
  const blockAlign = first.channels * (first.bitsPerSample / 8);

  const merged = Buffer.alloc(44 + dataBytes);
  merged.write('RIFF', 0, 'ascii');
  merged.writeUInt32LE(36 + dataBytes, 4);
  merged.write('WAVE', 8, 'ascii');
  merged.write('fmt ', 12, 'ascii');
  merged.writeUInt32LE(16, 16);
  merged.writeUInt16LE(first.audioFormat, 20);
  merged.writeUInt16LE(first.channels, 22);
  merged.writeUInt32LE(first.sampleRate, 24);
  merged.writeUInt32LE(byteRate, 28);
  merged.writeUInt16LE(blockAlign, 32);
  merged.writeUInt16LE(first.bitsPerSample, 34);
  merged.write('data', 36, 'ascii');
  merged.writeUInt32LE(dataBytes, 40);
  let cursor = 44;
  for (const p of parts) {
    p!.pcm.copy(merged, cursor);
    cursor += p!.pcm.length;
  }
  return merged;
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null) as {
    mode?: unknown;
    text?: unknown;
    audio?: unknown;
    voice?: unknown;
    mimeType?: unknown;
  } | null;

  if (!body || typeof body.mode !== 'string') {
    return NextResponse.json({ error: 'mode is required' }, { status: 400 });
  }

  // ── Text to speech ──────────────────────────────────────────────────────
  if (body.mode === 'tts') {
    const text = typeof body.text === 'string' ? body.text.trim() : '';
    const voice = typeof body.voice === 'string' && body.voice.trim() ? body.voice.trim() : 'tongtong';
    if (!text) return NextResponse.json({ error: 'text is required for mode=tts' }, { status: 400 });
    if (text.length > 6000) {
      return NextResponse.json({ error: 'Text too long for a single utterance (6000 char cap)' }, { status: 400 });
    }

    // 1. FreeLLM router (audio/speech is OpenAI-compatible: model/input/voice).
    //    Upstream caps a single input at ~1024 chars — longer replies are
    //    split at sentence boundaries, synthesized per segment and merged.
    const router = resolveRouter();
    if (router) {
      try {
        const segments = splitForSpeech(text, 1000);
        const buffers: Buffer[] = [];
        let contentType = 'audio/wav';
        for (const segment of segments) {
          const upstream = await fetch(`${router.baseUrl}/audio/speech`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${router.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: 'auto', input: segment, voice }),
            signal: AbortSignal.timeout(30_000),
          });
          if (!upstream.ok) {
            const errText = await upstream.text().catch(() => upstream.statusText);
            throw new Error(`router ${upstream.status}: ${errText.slice(0, 160)}`);
          }
          contentType = upstream.headers.get('content-type') || contentType;
          buffers.push(Buffer.from(await upstream.arrayBuffer()));
        }
        const audio = mergeWavBuffers(buffers);
        log.info?.(
          `TTS ok via router (${audio.byteLength}B, ${contentType}, ${segments.length} segment(s)) for ${text.slice(0, 60)}…`,
        );
        return new NextResponse(new Uint8Array(audio), {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Content-Length': String(audio.byteLength),
            'Cache-Control': 'no-store',
          },
        });
      } catch (error) {
        log.warn?.(`TTS router failed: ${error instanceof Error ? error.message : error}`);
      }
    }

    // 2. Operator-configured built-in provider (env / server-providers.yml).
    //    'zai' is not a generateTTS provider (it is the router path above).
    try {
      const { getServerTTSProviders, resolveTTSApiKey, resolveTTSBaseUrl, resolveTTSModel, isServerTTSProviderDisabled } =
        await import('@/lib/server/provider-config');
      const configured = Object.keys(getServerTTSProviders()).filter(
        (id) => id !== 'browser-native-tts' && id !== 'zai' && !isServerTTSProviderDisabled(id),
      );
      const providerId = configured[0];
      if (providerId) {
        const { generateTTS } = await import('@/lib/audio/tts-providers');
        const config = {
          providerId: providerId as never,
          modelId: resolveTTSModel(providerId),
          apiKey: resolveTTSApiKey(providerId),
          baseUrl: resolveTTSBaseUrl(providerId),
          voice,
        };
        const result = await generateTTS(config, text);
        const buffer = Buffer.from(result.audio);
        const mimeType = result.format === 'wav' ? 'audio/wav' : 'audio/mpeg';
        log.info?.(`TTS ok via ${providerId} (${buffer.byteLength}B)`);
        return new NextResponse(new Uint8Array(buffer), {
          status: 200,
          headers: {
            'Content-Type': mimeType,
            'Content-Length': String(buffer.byteLength),
            'Cache-Control': 'no-store',
          },
        });
      }
    } catch (error) {
      log.warn?.(`TTS provider fallback failed: ${error instanceof Error ? error.message : error}`);
    }

    return NextResponse.json(
      { error: 'TTS unavailable: no reachable voice provider (router down, no TTS provider configured)' },
      { status: 503 },
    );
  }

  // ── Speech to text ──────────────────────────────────────────────────────
  if (body.mode === 'asr') {
    const audio = typeof body.audio === 'string' ? body.audio.replace(/^data:[^,]+,/, '') : '';
    if (!audio) return NextResponse.json({ error: 'audio (base64) is required for mode=asr' }, { status: 400 });
    if (audio.length > 12 * 1024 * 1024) {
      return NextResponse.json({ error: 'Audio too large' }, { status: 413 });
    }
    const buffer = Buffer.from(audio, 'base64');

    // 1. FreeLLM router (multipart transcription, model 'auto').
    const router = resolveRouter();
    if (router) {
      try {
        const form = new FormData();
        form.append('file', new Blob([new Uint8Array(buffer)], { type: typeof body.mimeType === 'string' ? body.mimeType : 'audio/webm' }), 'utterance.webm');
        form.append('model', 'auto');
        const upstream = await fetch(`${router.baseUrl}/audio/transcriptions`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${router.apiKey}` },
          body: form,
          signal: AbortSignal.timeout(50_000),
        });
        if (upstream.ok) {
          const data = await upstream.json().catch(() => null) as { text?: string } | null;
          if (data && typeof data.text === 'string') {
            log.info?.(`ASR ok via router (${buffer.byteLength}B): ${data.text.slice(0, 80)}`);
            return NextResponse.json({ text: data.text });
          }
        }
        const errText = await upstream.text().catch(() => upstream.statusText);
        log.warn?.(`ASR router ${upstream.status}: ${errText.slice(0, 200)}`);
      } catch (error) {
        log.warn?.(`ASR router unreachable: ${error instanceof Error ? error.message : error}`);
      }
    }

    // 2. Operator-configured ASR provider ('zai' is the router path above).
    try {
      const { getServerASRProviders, resolveASRApiKey, resolveASRBaseUrl } = await import('@/lib/server/provider-config');
      const configured = Object.keys(getServerASRProviders()).filter(id => id !== 'zai');
      const providerId = configured[0];
      if (providerId) {
        const { transcribeAudio } = await import('@/lib/audio/asr-providers');
        const config = {
          providerId: providerId as never,
          apiKey: resolveASRApiKey(providerId),
          baseUrl: resolveASRBaseUrl(providerId),
        };
        const result = await transcribeAudio(config, buffer);
        log.info?.(`ASR ok via ${providerId} (${buffer.byteLength}B): ${result.text.slice(0, 80)}`);
        return NextResponse.json({ text: result.text });
      }
    } catch (error) {
      log.warn?.(`ASR provider fallback failed: ${error instanceof Error ? error.message : error}`);
    }

    return NextResponse.json(
      { error: 'ASR unavailable: no reachable transcription provider' },
      { status: 503 },
    );
  }

  // ── Legacy chat mode ────────────────────────────────────────────────────
  return NextResponse.json(
    { error: 'Chat moved to /api/agent/chat/v2 (SSE). Voice modes: mode=tts|asr.' },
    { status: 410 },
  );
}
