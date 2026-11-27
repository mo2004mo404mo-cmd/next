/**
 * knowledge/asr-provider.ts — shared low-level providers & ffmpeg helpers.
 *
 * Extracted from ingest-media.ts so BOTH the legacy media ingestion and the
 * new advanced audio pipeline (audio-pipeline.ts) can use them without
 * import cycles:
 *   - getZai()        cached z-ai-web-dev-sdk instance (ASR + vision)
 *   - asrOne()        one WAV buffer → text (ZAI ASR → OpenAI-Whisper fallback)
 *   - probeDuration() ffprobe duration
 *   - tmpDir()        temp dir for ffmpeg scratch files
 *   - fmtTimestamp()  seconds → "mm:ss"
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { createLogger } from '../../logger';

const execFileAsync = promisify(execFile);
const log = createLogger('AsrProvider');

// ─── Shared ZAI instance (ASR + Vision) ────────────────────────────────────

export type ZaiLike = {
  audio: { asr: { create: (body: Record<string, unknown>) => Promise<unknown> } };
  chat: {
    completions: {
      create: (body: Record<string, unknown>) => Promise<unknown>;
      createVision: (body: Record<string, unknown>) => Promise<unknown>;
    };
  };
};

const zaiGlobal = globalThis as typeof globalThis & { __medqZaiMedia?: Promise<ZaiLike | null> };

export async function getZai(): Promise<ZaiLike | null> {
  if (!zaiGlobal.__medqZaiMedia) {
    zaiGlobal.__medqZaiMedia = (async () => {
      const mod = (await import('z-ai-web-dev-sdk')) as unknown as {
        default?: { create: () => Promise<ZaiLike> };
      };
      if (!mod.default?.create) throw new Error('sdk unavailable');
      return mod.default.create();
    })().catch(() => {
      zaiGlobal.__medqZaiMedia = undefined;
      return null;
    });
  }
  return zaiGlobal.__medqZaiMedia ?? null;
}

// ─── ffmpeg helpers ────────────────────────────────────────────────────────

export function tmpDir(): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'medq-ingest-'));
}

export async function probeDuration(file: string): Promise<number> {
  try {
    const { stdout } = await execFileAsync('ffprobe', [
      '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=noprint_wrappers=1:nokey=1', file,
    ]);
    return Number.parseFloat(stdout.trim()) || 0;
  } catch {
    return 0;
  }
}

export function fmtTimestamp(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ─── ASR chain ─────────────────────────────────────────────────────────────

/** Transcribe one audio segment buffer (16 kHz mono WAV) via the ASR chain. */
export async function asrOne(wavBuffer: Buffer): Promise<string> {
  // 1. ZAI SDK ASR (verified in this environment)
  let lastReason = '';
  const zai = await getZai();
  if (zai) {
    try {
      const res = (await zai.audio.asr.create({ file_base64: wavBuffer.toString('base64') })) as { text?: string };
      if (typeof res?.text === 'string') return res.text.trim();
    } catch (e) {
      lastReason = e instanceof Error ? e.message : String(e);
      log.warn?.(`ZAI ASR failed: ${lastReason}`);
    }
  }

  // 2. OpenAI-compatible Whisper via env (ASR_OPENAI_* / OPENAI_*)
  const apiKey = process.env.ASR_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
  if (apiKey) {
    const baseUrl = (process.env.ASR_OPENAI_BASE_URL || process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '');
    const model = process.env.ASR_OPENAI_MODELS || 'whisper-1';
    try {
      const form = new FormData();
      form.set('file', new Blob([new Uint8Array(wavBuffer)], { type: 'audio/wav' }), 'segment.wav');
      form.set('model', model);
      const res = await fetch(`${baseUrl}/audio/transcriptions`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}` },
        body: form,
        signal: AbortSignal.timeout(120_000),
      });
      if (res.ok) {
        const json = (await res.json()) as { text?: string };
        if (typeof json.text === 'string') return json.text.trim();
      }
      lastReason = `whisper HTTP ${res.status}`;
    } catch (e) {
      lastReason = e instanceof Error ? e.message : String(e);
      log.warn?.(`Whisper ASR failed: ${lastReason}`);
    }
  }

  // Keep the LAST provider error in the message so callers can detect
  // rate limits (429 / "too many requests") and retry with backoff.
  throw new Error(
    `No speech-to-text provider is available${lastReason ? ` (last provider error: ${lastReason.slice(0, 180)})` : ' (ZAI ASR unreachable and no ASR_OPENAI_API_KEY)'}`,
  );
}
