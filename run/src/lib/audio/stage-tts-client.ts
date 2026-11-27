/**
 * MedQ adapter (newly written — not ported from OpenMAIC).
 *
 * Thin client for `/api/voice-tts` — the single TTS endpoint medq actually
 * serves. Used by the Stage component's playback engine (when a speech
 * action has no pre-generated `audioUrl`) and by the discussion TTS hook
 * (`use-discussion-tts.ts`) so both paths route through one consistent
 * endpoint with one consistent request/response shape.
 *
 * Why a separate client?
 * -----------------------
 * OpenMAIC's ported `use-tts-preview.ts` and `use-discussion-tts.ts` both
 * call `/api/generate/tts` — a per-provider adapter route that does NOT
 * exist in medq (only `/api/generate/route.ts` exists, for question
 * generation). Medq's TTS lives at `/api/voice-tts` which:
 *   - accepts `{ text, voice, speed }` (no provider/model/apiKey params)
 *   - returns binary `audio/wav` directly (NOT base64-JSON)
 *
 * The OpenMAIC hooks expect base64-JSON. Rather than rewrite them in-place
 * (which would risk breaking the ported settings UI), this module exposes a
 * clean `synthesize()` returning a Blob URL the AudioPlayer can consume
 * directly. The Stage's playback engine is wired to call this when
 * `audioUrl` is missing; the discussion hook gets the same path via the
 * `useStageTTS` hook below.
 */

import { resolveAgentVoice, type AgentVoice, type VoicePersona } from './agent-voice-resolver';
import { stripMarkdownForTTS } from './tts-text';

/** Voice + speed + agent context for a single TTS synthesis call. */
export interface StageTTSSynthesizeOptions {
  /** The text to synthesize. Markdown/HTML is stripped server-side. */
  text: string;
  /** Optional agent ID — used to look up the default voice via {@link resolveAgentVoice}. */
  agentId?: string | null;
  /** Optional persona override ('male' | 'female'). */
  persona?: VoicePersona;
  /** Optional explicit voice id (takes priority over agent/persona lookup). */
  voice?: string;
  /** Optional speed override (defaults to 1.0). */
  speed?: number;
  /** Optional abort signal (cancels the fetch mid-flight). */
  signal?: AbortSignal;
}

/** Result of a successful synthesis. */
export interface StageTTSSynthesizeResult {
  /** Object URL suitable for `AudioPlayer.play(audioId, blobUrl)` / `new Audio(url)`. */
  blobUrl: string;
  /** The voice id that was actually used (for logging / UI). */
  voice: string;
  /** The speed multiplier that was actually used. */
  speed: number;
}

/**
 * Synthesize speech via `/api/voice-tts`.
 *
 * Returns a Blob URL that can be passed to `AudioPlayer.play(audioId, blobUrl)`
 * or `new Audio(blobUrl)`. Caller is responsible for revoking the URL when
 * done (the AudioPlayer's `play()` already does this for the IndexedDB path;
 * the Stage's live-TTS path should revoke after `onEnded`).
 *
 * Throws on non-2xx responses or empty audio buffers. Abort errors are
 * re-thrown unchanged so callers can detect them via `error.name === 'AbortError'`.
 */
export async function synthesizeStageTTS(
  options: StageTTSSynthesizeOptions,
): Promise<StageTTSSynthesizeResult> {
  const resolved: AgentVoice = options.voice
    ? { voice: options.voice, speed: options.speed ?? 1.0 }
    : resolveAgentVoice(options.agentId, options.persona);

  const speed = options.speed ?? resolved.speed;
  // Never speak markdown syntax markers — strip before synthesis.
  const speakableText = stripMarkdownForTTS(options.text ?? '');
  if (!speakableText.trim()) {
    throw new Error('Nothing speakable in this line (markdown markers only)');
  }

  const res = await fetch('/api/voice-tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: speakableText,
      voice: resolved.voice,
      speed,
    }),
    signal: options.signal,
  });

  if (!res.ok) {
    let message = `TTS failed (HTTP ${res.status})`;
    try {
      const errBody = await res.json();
      if (errBody && typeof errBody.error === 'string') message = errBody.error;
    } catch {
      // response had no JSON body — keep the default message
    }
    throw new Error(message);
  }

  // `/api/voice-tts` returns binary `audio/wav` directly.
  const arrayBuffer = await res.arrayBuffer();
  if (arrayBuffer.byteLength === 0) {
    throw new Error('TTS returned an empty audio buffer');
  }

  const blob = new Blob([arrayBuffer], { type: 'audio/wav' });
  const blobUrl = URL.createObjectURL(blob);

  return { blobUrl, voice: resolved.voice, speed };
}

/**
 * Resolve the `{ voice, speed }` settings for an agent WITHOUT making a
 * network call. Useful when the caller wants to attach voice metadata to a
 * `SpeechAction` (so a later `/api/voice-tts` call can reuse it) without
 * paying for synthesis upfront.
 */
export function resolveStageVoice(
  agentId: string | null | undefined,
  persona?: VoicePersona,
): AgentVoice {
  return resolveAgentVoice(agentId, persona);
}
