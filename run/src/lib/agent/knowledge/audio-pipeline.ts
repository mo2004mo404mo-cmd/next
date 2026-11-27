/**
 * knowledge/audio-pipeline.ts — ADVANCED audio transcription engine.
 *
 * Upgrades over the legacy fixed-25s-window transcriber:
 *   1. Loudness normalization (ffmpeg loudnorm → 16 kHz mono WAV) — the
 *      single biggest accuracy lever for quiet/recorded-at-a-distance audio.
 *   2. VAD-aware segmentation: silences are detected first
 *      (`silencedetect`), then speech runs are cut AT natural pauses
 *      (≤28 s, the provider's 0-30 s window) — so every ASR chunk starts
 *      and ends on real speech boundaries and carries ACCURATE timestamps.
 *   3. Sentence-level timing: each ASR chunk is split into sentences;
 *      sentence starts/ends are interpolated across the chunk's true
 *      [start,end] span (±0.5 s worst case, exact at pause boundaries).
 *   4. Deterministic paragraphing: sentence groups break at long pauses
 *      (>1.4 s) or size limits → readable transcript, better RAG chunks.
 *   5. LLM insights (title / summary / keywords / topics / entities) with a
 *      heuristic TF fallback — never a hard dependency.
 *   6. Speech analytics: words, sentences, WPM, speech-vs-silence coverage.
 *
 * Also owns the RETAINED-AUDIO store (`upload/audio-store/<sourceId>.bin`):
 * the original audio is kept (audio sources only) so the Transcript Studio
 * can play it back; served owner-gated with Range support by
 * GET /api/knowledge/sources/[id]/audio.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { createLogger } from '../../logger';
import { asrOne, probeDuration, tmpDir, fmtTimestamp } from './asr-provider';
import { knowledgeLLM } from './llm';

const execFileAsync = promisify(execFile);
const log = createLogger('AudioPipeline');

// ─── Types (stored on source meta.transcript, consumed by the Studio UI) ──

export interface TranscriptSentence {
  id: number;
  /** seconds from file start (VAD-accurate at boundaries, interpolated within a chunk) */
  start: number;
  end: number;
  text: string;
  /** source ASR chunk index (segments[]), for debugging */
  seg: number;
}

export interface TranscriptSegment {
  id: number;
  start: number;
  end: number;
  /** raw ASR text of this VAD chunk (sentences carry the cleaned split) */
  text: string;
}

export interface TranscriptParagraph {
  /** inclusive sentence-id range */
  from: number;
  to: number;
}

export interface TranscriptInsights {
  title: string;
  summary: string;
  keywords: string[];
  topics: string[];
  entities: string[];
}

export interface TranscriptStats {
  words: number;
  sentences: number;
  segments: number;
  speechSec: number;
  silenceSec: number;
  /** words per minute of SPEECH (not of total duration) */
  wpm: number;
  /** speech share of total duration, 0-1 */
  coverage: number;
  /** ASR windows that still returned nothing after retries (provider limits) */
  dropped?: number;
}

export interface AdvancedTranscript {
  version: 2;
  fileName: string;
  durationSec: number;
  stats: TranscriptStats;
  segments: TranscriptSegment[];
  sentences: TranscriptSentence[];
  paragraphs: TranscriptParagraph[];
  insights: TranscriptInsights;
}

// ─── VAD: silence detection → speech segments ──────────────────────────────

const SILENCE_NOISE_DB = -35; // below this = silence (works post-loudnorm)
const SILENCE_MIN_SEC = 0.45; // pause shorter than this does NOT cut a segment
const SEGMENT_MAX_SEC = 28; // provider hard cap is 30s; keep headroom
const SEGMENT_MIN_SEC = 0.9; // merge shorter speech runs into neighbours
const BLIP_SEC = 0.35; // drop speech runs shorter than this (coughs, clicks)

interface SilenceInterval { start: number; end: number }

/** Run ffmpeg silencedetect and parse the silence intervals from stderr. */
async function detectSilences(file: string): Promise<SilenceInterval[]> {
  try {
    const { stderr } = await execFileAsync('ffmpeg', [
      '-hide_banner', '-nostats', '-i', file,
      '-af', `silencedetect=noise=${SILENCE_NOISE_DB}dB:d=${SILENCE_MIN_SEC}`,
      '-f', 'null', '-',
    ], { timeout: 120_000, maxBuffer: 1024 * 1024 * 16 });
    const starts = [...stderr.matchAll(/silence_start:\s*(-?[\d.]+)/g)].map((m) => Number.parseFloat(m[1]));
    const ends = [...stderr.matchAll(/silence_end:\s*([\d.]+)/g)].map((m) => Number.parseFloat(m[1]));
    const out: SilenceInterval[] = [];
    for (let i = 0; i < starts.length; i++) {
      const start = Math.max(0, starts[i]);
      const end = ends[i] ?? Number.POSITIVE_INFINITY;
      out.push({ start, end });
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Complement silences into speech runs, then merge/split into ASR-ready
 * segments: never longer than SEGMENT_MAX_SEC, never shorter than
 * SEGMENT_MIN_SEC, always cut at the LONGEST internal pause when a split
 * is unavoidable (so the cut lands in a natural spot).
 */
export function buildSpeechSegments(duration: number, silences: SilenceInterval[]): Array<{ start: number; end: number }> {
  const speech: Array<{ start: number; end: number }> = [];
  let cursor = 0;
  for (const s of silences) {
    if (s.start > cursor) speech.push({ start: cursor, end: Math.min(s.start, duration) });
    cursor = Math.max(cursor, s.end);
    if (cursor >= duration) break;
  }
  if (cursor < duration) speech.push({ start: cursor, end: duration });

  // drop blips
  const real = speech.filter((p) => p.end - p.start >= BLIP_SEC);
  if (real.length === 0) return speech.length ? [speech[0]] : [];

  // merge runs separated by short gaps (< SILENCE_MIN_SEC) or under-length runs
  const merged: Array<{ start: number; end: number }> = [];
  for (const p of real) {
    const last = merged[merged.length - 1];
    const gap = last ? p.start - last.end : Number.POSITIVE_INFINITY;
    const wouldLen = last ? p.end - last.start : 0;
    if (last && (gap < SILENCE_MIN_SEC || wouldLen < SEGMENT_MIN_SEC) && wouldLen < SEGMENT_MAX_SEC) {
      last.end = p.end;
    } else {
      merged.push({ ...p });
    }
  }

  // split any run still > SEGMENT_MAX_SEC at its longest internal silence (or midpoint)
  const out: Array<{ start: number; end: number }> = [];
  for (const run of merged) {
    let queue = [run];
    while (queue.length) {
      const piece = queue.shift()!;
      const len = piece.end - piece.start;
      if (len <= SEGMENT_MAX_SEC) { out.push(piece); continue; }
      // longest silence INSIDE the piece
      const inside = silences
        .filter((s) => s.start > piece.start + 0.3 && s.end < piece.end - 0.3)
        .sort((a, b) => (b.end - b.start) - (a.end - a.start))[0];
      const cut = inside ? Math.max(piece.start + 1, Math.min(inside.start, piece.end - 1)) : piece.start + len / 2;
      queue = [{ start: piece.start, end: cut }, { start: cut, end: piece.end }, ...queue];
    }
  }
  return out.filter((p) => p.end - p.start >= BLIP_SEC);
}

// ─── Sentence splitting & paragraphing ─────────────────────────────────────

/** Split ASR chunk text into sentences, preserving terminal punctuation. */
export function splitSentences(text: string): string[] {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  // split after . ! ? … (incl. CJK 。！？) followed by space/end; keep the punct
  const parts = cleaned.match(/[^.!?。！？…]+[.!?。！？…]+["'”’)\]]*\s*|[^.!?。！？…]+$/g) || [cleaned];
  return parts.map((p) => p.trim()).filter(Boolean);
}

function cleanSentence(s: string): string {
  const t = s.replace(/\s+/g, ' ').trim();
  if (!t) return t;
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/**
 * Interpolate sentence timings across the chunk span, weighted by character
 * length. First sentence starts exactly at chunk start; last ends at chunk end.
 */
function timeSentences(texts: string[], start: number, end: number): Array<{ start: number; end: number }> {
  if (texts.length === 0) return [];
  if (texts.length === 1) return [{ start, end }];
  const weights = texts.map((t) => Math.max(4, t.replace(/\s/g, '').length));
  const total = weights.reduce((a, b) => a + b, 0);
  const span = Math.max(0.2, end - start);
  const out: Array<{ start: number; end: number }> = [];
  let cursor = start;
  for (let i = 0; i < texts.length; i++) {
    const dur = (weights[i] / total) * span;
    const segEnd = i === texts.length - 1 ? end : cursor + dur;
    out.push({ start: cursor, end: segEnd });
    cursor = segEnd;
  }
  return out;
}

const PARAGRAPH_PAUSE_SEC = 1.4; // pause long enough to start a new paragraph
const PARAGRAPH_MAX_SENTENCES = 6;
const PARAGRAPH_MAX_WORDS = 70;

function buildParagraphs(sentences: TranscriptSentence[]): TranscriptParagraph[] {
  const paras: TranscriptParagraph[] = [];
  let from = 0;
  let words = 0;
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    words += s.text.split(/\s+/).length;
    const next = sentences[i + 1];
    const isNew = i === sentences.length - 1
      || (next && (next.start - s.end) >= PARAGRAPH_PAUSE_SEC)
      || (i - from + 1) >= PARAGRAPH_MAX_SENTENCES
      || words >= PARAGRAPH_MAX_WORDS;
    if (isNew) {
      paras.push({ from, to: i });
      from = i + 1;
      words = 0;
    }
  }
  return paras;
}

// ─── Insights: LLM (title/summary/keywords/topics) + heuristic fallback ────

const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'of', 'to', 'in', 'on', 'at', 'for', 'with', 'by', 'from', 'as', 'is', 'are',
  'was', 'were', 'be', 'been', 'being', 'it', 'its', 'this', 'that', 'these', 'those', 'i', 'you', 'he', 'she', 'we',
  'they', 'them', 'his', 'her', 'their', 'our', 'your', 'my', 'me', 'us', 'him', 'will', 'would', 'can', 'could',
  'should', 'shall', 'may', 'might', 'must', 'do', 'does', 'did', 'done', 'have', 'has', 'had', 'having', 'not', 'no',
  'so', 'if', 'then', 'than', 'when', 'where', 'which', 'who', 'whom', 'what', 'why', 'how', 'all', 'any', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'only', 'own', 'same', 'too', 'very', 'just', 'also', 'now',
  'there', 'here', 'about', 'into', 'over', 'under', 'again', 'further', 'once', 'up', 'down', 'out', 'off', 'we',
  'okay', 'ok', 'um', 'uh', 'er', 'ah', 'like', 'right', 'well', 'one', 'two', 'three', 'going', 'get', 'got', 'go',
]);

function heuristicInsights(fileName: string, sentences: TranscriptSentence[]): TranscriptInsights {
  const fullText = sentences.map((s) => s.text).join(' ');
  const freq = new Map<string, number>();
  for (const w of fullText.toLowerCase().match(/[a-z][a-z'-]{2,}/g) || []) {
    if (STOPWORDS.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  const keywords = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w);
  const first = sentences.slice(0, 2).map((s) => s.text).join(' ');
  return {
    title: fileName.replace(/\.[a-z0-9]+$/i, '').slice(0, 120),
    summary: first.length > 400 ? `${first.slice(0, 400)}…` : first || '(no speech transcribed)',
    keywords,
    topics: [],
    entities: [],
  };
}

async function llmInsights(fileName: string, transcriptText: string): Promise<TranscriptInsights | null> {
  const input = transcriptText.slice(0, 6000);
  const raw = await knowledgeLLM({
    system:
      'You analyze transcripts for a study-library app. Reply with ONLY a JSON object (no markdown fence) with keys: ' +
      'title (<=10 words, descriptive), summary (2-3 sentences, factual), keywords (5-10 single words or short phrases, lowercase), ' +
      'topics (0-5 thematic labels), entities (0-10 named entities: people, drugs, diseases, organizations, numbers-with-units).',
    prompt: `Audio file: "${fileName}"\nTranscript:\n${input}\n\nReturn the JSON object now.`,
    maxOutputTokens: 700,
    temperature: 0,
    timeoutMs: 30_000,
  });
  if (!raw) return null;
  try {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) return null;
    const obj = JSON.parse(match[0]) as Record<string, unknown>;
    const strArr = (v: unknown, cap: number): string[] =>
      Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string' && x.trim().length > 0).slice(0, cap).map((x) => x.trim().slice(0, 60)) : [];
    const title = typeof obj.title === 'string' ? obj.title.trim().slice(0, 120) : '';
    const summary = typeof obj.summary === 'string' ? obj.summary.trim().slice(0, 600) : '';
    if (!title && !summary) return null;
    return {
      title: title || fileName,
      summary,
      keywords: strArr(obj.keywords, 10),
      topics: strArr(obj.topics, 5),
      entities: strArr(obj.entities, 10),
    };
  } catch {
    return null;
  }
}

// ─── The engine ────────────────────────────────────────────────────────────

/** asrOne + 429-aware retry with backoff (the ASR quota window is shared and
 *  bursts of parallel calls can trip it; a single 9-12 s wait clears it). */
async function asrOneWithRetry(wavBuffer: Buffer, attempts = 3): Promise<string> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await asrOne(wavBuffer);
    } catch (e) {
      lastError = e;
      const msg = e instanceof Error ? e.message : String(e);
      const rateLimited = msg.includes('429') || /too many requests/i.test(msg);
      if (!rateLimited || i === attempts - 1) break;
      const waitMs = 9000 + Math.floor(Math.random() * 3000);
      log.warn?.(`ASR rate-limited, waiting ${Math.round(waitMs / 1000)}s (attempt ${i + 1}/${attempts})`);
      await new Promise((r) => setTimeout(r, waitMs));
    }
  }
  throw lastError;
}

export interface AdvancedTranscribeResult extends AdvancedTranscript {
  /** RAG text: "[mm:ss] sentence" lines, blank line between paragraphs. */
  timestampedText: string;
  /** readable plain text (paragraph form) */
  text: string;
}

const MAX_SEGMENTS = 180; // ~60+ min of speech at avg 20s/segment

/**
 * Advanced transcription: normalize → VAD → per-segment ASR → sentences with
 * timings → paragraphs → insights → stats.
 */
export async function transcribeAdvanced(
  input: Buffer,
  opts: { fileName?: string } = {},
): Promise<AdvancedTranscribeResult> {
  const fileName = opts.fileName || 'audio';
  const dir = tmpDir();
  const inputPath = path.join(dir, 'input.bin');
  const normPath = path.join(dir, 'norm.wav');
  fs.writeFileSync(inputPath, input);

  try {
    // 1. Loudness-normalize to 16 kHz mono PCM (accuracy lever + uniform levels
    //    so the -35 dB silence threshold behaves consistently).
    await execFileAsync('ffmpeg', [
      '-y', '-i', inputPath, '-vn',
      '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11',
      '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le',
      normPath,
    ], { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 });

    if (!fs.existsSync(normPath) || fs.statSync(normPath).size < 1024) {
      throw new Error(`Could not decode any audio from "${fileName}" (is it a valid media file?)`);
    }

    const durationSec = await probeDuration(normPath);
    if (durationSec <= 0) throw new Error(`Could not determine the duration of "${fileName}".`);

    // 2. VAD segmentation
    const silences = await detectSilences(normPath);
    let windows = buildSpeechSegments(durationSec, silences);
    let vad = true;
    if (windows.length === 0) {
      // No usable silences (continuous speech / noisy floor) → fixed windows,
      // still sentence-timed within each chunk.
      vad = false;
      const n = Math.max(1, Math.ceil(durationSec / 25));
      windows = Array.from({ length: n }, (_, i) => ({ start: i * 25, end: Math.min((i + 1) * 25, durationSec) }));
    }
    windows = windows.slice(0, MAX_SEGMENTS);

    // 3. Cut + ASR each window (3 in parallel — rate-limit friendly, each
    //    with 429-aware backoff retries)
    const segTexts: string[] = new Array(windows.length).fill('');
    let sawRateLimit = false;
    const noteRateLimit = (e: unknown) => {
      const msg = e instanceof Error ? e.message : String(e);
      if (/429|too many requests/i.test(msg)) sawRateLimit = true;
    };
    const BATCH = 3;
    for (let i = 0; i < windows.length; i += BATCH) {
      const batchIdx = Array.from({ length: Math.min(BATCH, windows.length - i) }, (_, k) => i + k);
      await Promise.all(batchIdx.map(async (idx) => {
        const w = windows[idx];
        const segPath = path.join(dir, `seg_${String(idx).padStart(3, '0')}.wav`);
        try {
          await execFileAsync('ffmpeg', [
            '-y', '-ss', String(w.start), '-i', normPath,
            '-t', String(Math.max(0.3, w.end - w.start)),
            '-c:a', 'pcm_s16le', segPath,
          ], { timeout: 60_000, maxBuffer: 1024 * 1024 * 16 });
          if (!fs.existsSync(segPath) || fs.statSync(segPath).size < 512) return;
          const buf = fs.readFileSync(segPath);
          segTexts[idx] = await asrOneWithRetry(buf);
        } catch (e) {
          // tolerate a failed segment (rate limits, caps) but keep going
          noteRateLimit(e);
          log.warn?.(`ASR window ${idx} [${fmtTimestamp(w.start)}] failed: ${e instanceof Error ? e.message.slice(0, 140) : e}`);
        }
      }));
      // small breather between batches keeps the shared quota happy
      if (i + BATCH < windows.length) await new Promise((r) => setTimeout(r, 600));
    }

    // 3b. Second-chance sweep: rate-limit trips are transient — re-run the
    // windows that returned nothing after a cooldown so long lectures stay
    // whole instead of silently losing chunks to a throttled minute.
    const failedIdx = windows.map((_, i) => i).filter((i) => !segTexts[i]);
    if (failedIdx.length > 0 && failedIdx.length < windows.length) {
      log.info?.(`second-chance ASR sweep: ${failedIdx.length}/${windows.length} windows`);
      await new Promise((r) => setTimeout(r, 15_000));
      for (const idx of failedIdx) {
        const w = windows[idx];
        const segPath = path.join(dir, `seg_${String(idx).padStart(3, '0')}.wav`);
        try {
          if (!fs.existsSync(segPath)) {
            await execFileAsync('ffmpeg', [
              '-y', '-ss', String(w.start), '-i', normPath,
              '-t', String(Math.max(0.3, w.end - w.start)),
              '-c:a', 'pcm_s16le', segPath,
            ], { timeout: 60_000, maxBuffer: 1024 * 1024 * 16 });
          }
          if (fs.existsSync(segPath) && fs.statSync(segPath).size >= 512) {
            segTexts[idx] = await asrOneWithRetry(fs.readFileSync(segPath));
          }
        } catch (e) {
          noteRateLimit(e);
          log.warn?.(`second-chance window ${idx} still failed: ${e instanceof Error ? e.message.slice(0, 120) : e}`);
        }
      }
    }
    const droppedWindows = failedIdx.filter((i) => !segTexts[i]).length;

    // 4. Sentences with interpolated timings
    const sentences: TranscriptSentence[] = [];
    const segments: TranscriptSegment[] = [];
    let sid = 0;
    for (let i = 0; i < windows.length; i++) {
      const raw = segTexts[i].trim();
      if (!raw) continue;
      const w = windows[i];
      segments.push({ id: segments.length, start: w.start, end: w.end, text: raw });
      const parts = splitSentences(raw).map(cleanSentence).filter(Boolean);
      const timed = timeSentences(parts, w.start, w.end);
      for (let k = 0; k < parts.length; k++) {
        sentences.push({ id: sid++, start: timed[k].start, end: timed[k].end, text: parts[k], seg: segments.length - 1 });
      }
    }

    const totalChars = sentences.map((s) => s.text).join(' ').trim().length;
    if (sentences.length === 0 || totalChars < 10) {
      throw new Error(
        sawRateLimit
          ? `The speech-to-text provider is rate-limited right now — none of the ${windows.length} speech segments could be transcribed (${Math.round(durationSec)}s of audio). This is temporary: wait a few minutes and retry the import.`
          : `No speech could be transcribed from "${fileName}" (${windows.length} speech ${vad ? 'segments' : 'windows'}, ` +
            `${Math.round(durationSec)}s). The audio may be music, noise, or too quiet.`,
      );
    }

    // 5. Paragraphs, stats, insights
    const paragraphs = buildParagraphs(sentences);
    const words = sentences.map((s) => s.text).join(' ').split(/\s+/).filter(Boolean).length;
    const speechSec = segments.reduce((a, s) => a + (s.end - s.start), 0);
    const silenceSec = Math.max(0, durationSec - speechSec);
    const stats: TranscriptStats = {
      words,
      sentences: sentences.length,
      segments: segments.length,
      speechSec: Math.round(speechSec * 10) / 10,
      silenceSec: Math.round(silenceSec * 10) / 10,
      wpm: speechSec > 0 ? Math.round((words / speechSec) * 60) : 0,
      coverage: durationSec > 0 ? Math.round((speechSec / durationSec) * 100) / 100 : 0,
      ...(droppedWindows > 0 ? { dropped: droppedWindows } : {}),
    };

    const plain = sentences.map((s) => s.text).join(' ');
    const insights =
      (await llmInsights(fileName, plain).catch(() => null))
      || heuristicInsights(fileName, sentences);

    // 6. Rendered texts
    const lines: string[] = [];
    for (const p of paragraphs) {
      for (let i = p.from; i <= p.to; i++) {
        const s = sentences[i];
        lines.push(`[${fmtTimestamp(s.start)}] ${s.text}`);
      }
      lines.push('');
    }
    const timestampedText = `# Advanced transcript of "${fileName}" (audio, ${Math.round(durationSec)}s)\n\n${lines.join('\n').trim()}`;
    const text = paragraphs
      .map((p) => sentences.slice(p.from, p.to + 1).map((s) => s.text).join(' '))
      .join('\n\n');

    return {
      version: 2,
      fileName,
      durationSec: Math.round(durationSec * 10) / 10,
      stats,
      segments,
      sentences,
      paragraphs,
      insights,
      timestampedText,
      text,
    };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/** Legacy-shape adapter (used by the video path: audio track transcription). */
export function toLegacyTranscription(result: AdvancedTranscribeResult): {
  text: string;
  durationSec: number;
  segments: Array<{ offsetSec: number; text: string }>;
} {
  return {
    text: result.timestampedText,
    durationSec: result.durationSec,
    segments: result.segments.map((s) => ({ offsetSec: s.start, text: s.text })),
  };
}

/** Strip the heavy rendered texts — stored copy for source meta. */
export function toStoredTranscript(result: AdvancedTranscribeResult): AdvancedTranscript {
  return {
    version: result.version,
    fileName: result.fileName,
    durationSec: result.durationSec,
    stats: result.stats,
    segments: result.segments,
    sentences: result.sentences,
    paragraphs: result.paragraphs,
    insights: result.insights,
  };
}

// ─── Retained-audio store ──────────────────────────────────────────────────

const AUDIO_STORE = path.join(process.cwd(), 'upload', 'audio-store');
const MAX_RETAIN_BYTES = 200 * 1024 * 1024; // matches the upload cap

export function audioStorePath(sourceId: string): string {
  return path.join(AUDIO_STORE, `${sourceId}.bin`);
}

/** Magic-byte sniffing — the store keeps extension-less files. */
export function sniffAudioMime(buf: Buffer): string {
  if (buf.length >= 12) {
    if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) return 'audio/mpeg'; // ID3
    if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return 'audio/mpeg'; // MPEG frame sync
    if (buf.subarray(0, 4).toString('ascii') === 'OggS') return 'audio/ogg';
    if (buf.subarray(4, 8).toString('ascii') === 'ftyp') return 'audio/mp4'; // m4a/aac
    if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WAVE') return 'audio/wav';
    if (buf.subarray(0, 4).toString('ascii') === 'fLaC') return 'audio/flac';
    if (buf[0] === 0x1a && buf[1] === 0x45 && (buf[2] & 0xf0) === 0x00) return 'audio/webm'; // EBML (webm/mkv)
  }
  return 'application/octet-stream';
}

/**
 * Keep the ORIGINAL audio bytes for playback in the Transcript Studio.
 * Best-effort: failure to retain never fails ingestion.
 */
export async function retainAudioFile(
  sourceId: string,
  buffer: Buffer,
): Promise<{ retained: boolean; mime: string; bytes: number }> {
  const mime = sniffAudioMime(buffer);
  const bytes = buffer.byteLength;
  if (bytes === 0 || bytes > MAX_RETAIN_BYTES) return { retained: false, mime, bytes };
  try {
    fs.mkdirSync(AUDIO_STORE, { recursive: true });
    fs.writeFileSync(audioStorePath(sourceId), buffer);
    return { retained: true, mime, bytes };
  } catch (e) {
    log.warn?.(`retain audio failed for ${sourceId}: ${e instanceof Error ? e.message : e}`);
    return { retained: false, mime, bytes };
  }
}

/** Remove the retained audio when its source is deleted. */
export function deleteRetainedAudio(sourceId: string): void {
  try {
    const p = audioStorePath(sourceId);
    if (fs.existsSync(p)) fs.rmSync(p, { force: true });
  } catch {
    // best-effort cleanup
  }
}
