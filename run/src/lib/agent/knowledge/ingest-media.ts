/**
 * knowledge/ingest-media.ts — turn audio / video / image / document files
 * into text corpora for the RAG library.
 *
 * Verified-capability chain (probed in this environment):
 *   - ASR:  z-ai-web-dev-sdk `audio.asr.create({ file_base64 })` ✅
 *           (fallback: OpenAI-compatible Whisper via ASR_OPENAI_API_KEY)
 *   - VLM:  z-ai-web-dev-sdk `chat.completions.createVision` (glm-4.5v) ✅
 *   - ffmpeg + ffprobe: segment / strip video / extract frames ✅
 *
 * Design notes:
 *   - Audio is transcoded to 16 kHz mono PCM WAV and split into 25 s
 *     segments BEFORE ASR (the provider enforces a hard 0-30 s duration cap
 *     and WAV/WebM-only input, probed live: 32 s WAV → HTTP 400 "文件时长限
 *     制为0-30秒", MP3 → 400 "unsupported audio format"). Every segment's
 *     transcript is prefixed with [mm:ss], which flows into chunk metadata
 *     → "what did the lecturer say at 12:34" retrieval.
 *   - Video = audio track (transcribed) + frames sampled EVENLY across the
 *     full duration (VLM-described), merged into one timestamped document.
 *   - Scanned PDFs: when unpdf yields (near-)empty text, baseline JPEG
 *     streams are carved straight out of the PDF bytes and OCR'd via the
 *     VLM — zero extra dependencies, covers flatbed scans.
 *   - Office/EPUB containers (jszip): PPTX → slide text + speaker notes +
 *     embedded slide images (VLM OCR); DOCX → text + embedded images;
 *     XLSX → per-sheet rows (exceljs); EPUB → spine-ordered chapters.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { createLogger } from '../../logger';
import { getZai, probeDuration, tmpDir, fmtTimestamp } from './asr-provider';
import {
  detectSceneCuts,
  buildScenes,
  buildEvenWindows,
  pickVlmScenes,
  assignTranscriptToScenes,
  assignDescriptionsToScenes,
  fmtSec,
  type SceneSpanWithMeta,
} from './scene-detect';
import type { VideoSceneInput } from './video-scenes';
import { transcribeAdvanced, toLegacyTranscription, toStoredTranscript } from './audio-pipeline';

const execFileAsync = promisify(execFile);
const log = createLogger('IngestMedia');

// ─── File-kind detection ───────────────────────────────────────────────────

export type MediaFileKind = 'audio' | 'video' | 'image' | 'document';

const AUDIO_EXT = new Set(['mp3', 'wav', 'm4a', 'aac', 'ogg', 'oga', 'opus', 'flac', 'wma', 'webm', 'aiff', 'amr', '3gp']);
const VIDEO_EXT = new Set(['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'mpeg', 'mpg', 'm4v', '3g2']);
const IMAGE_EXT = new Set(['png', 'jpg', 'jpeg', 'webp', 'bmp', 'gif', 'tiff', 'tif', 'heic']);

export function detectFileKind(fileName: string, mimeType?: string): MediaFileKind {
  const ext = (fileName.split('.').pop() || '').toLowerCase();
  const mime = (mimeType || '').toLowerCase();
  if (mime.startsWith('audio/') || AUDIO_EXT.has(ext)) {
    // webm is ambiguous (can hold audio or video) — trust the declared mime
    if (ext === 'webm' && mime.startsWith('video/')) return 'video';
    return 'audio';
  }
  if (mime.startsWith('video/') || VIDEO_EXT.has(ext)) return 'video';
  if (mime.startsWith('image/') || IMAGE_EXT.has(ext)) return 'image';
  return 'document';
}

// ─── Shared ZAI instance: moved to asr-provider.ts (used by BOTH the legacy
// media ingestion and the advanced audio pipeline). getZai / asrOne /
// probeDuration / tmpDir / fmtTimestamp are imported above. ────────────────

/** Vision model candidates, tried against the REAL image; first success cached. */
const visionGlobal = globalThis as typeof globalThis & { __medqZaiVisionModel?: string };
const VISION_MODELS = ['glm-4.5v', 'glm-4.6v', 'glm-4v'];

/** Stage 3: VLM budget for video scene analysis (scenes beyond this persist transcript-only). */
const MAX_VLM_SCENES = 12;

// ─── ffmpeg helpers: tmpDir / probeDuration / fmtTimestamp live in
// asr-provider.ts (shared with audio-pipeline.ts). ─────────────────────────

// ─── ASR ───────────────────────────────────────────────────────────────────

export interface TranscriptionResult {
  text: string;
  durationSec: number;
  segments: Array<{ offsetSec: number; text: string }>;
}

/**
 * Transcribe an audio/video file buffer.
 *
 * DELEGATES to the advanced pipeline (audio-pipeline.ts): loudnorm → VAD
 * silence segmentation → per-segment ASR → sentence-level [mm:ss] timings
 * → paragraphs. The legacy { text, durationSec, segments } shape is kept
 * for the video path; the audio path uses transcribeAdvanced directly so it
 * can store the full structured transcript on source meta.
 */
export async function transcribeAudio(input: Buffer, opts: { fileName?: string } = {}): Promise<TranscriptionResult> {
  const result = await transcribeAdvanced(input, opts);
  return toLegacyTranscription(result);
}

// ─── VLM image description ─────────────────────────────────────────────────

/**
 * Describe/OCR an image buffer with the vision model. Model candidates are
 * tried directly against the REAL image (no tiny probe image — a degenerate
 * 1×1 probe made every model look "broken" and silently disabled all OCR);
 * the first model that answers is cached. A 400 "image parse" error means
 * the INPUT image is unusable — bail immediately instead of retrying.
 * Returns null when no vision capability is reachable.
 */
export async function describeImage(
  image: Buffer,
  mimeType: string,
  instruction: string,
): Promise<string | null> {
  const zai = await getZai();
  if (!zai) return null;

  const ext = mimeType.includes('png') ? 'png' : mimeType.includes('webp') ? 'webp' : 'jpeg';
  const dataUrl = `data:image/${ext};base64,${image.toString('base64')}`;
  const cached = visionGlobal.__medqZaiVisionModel;
  const candidates = cached
    ? [cached, ...VISION_MODELS.filter((m) => m !== cached)]
    : VISION_MODELS;

  for (const model of candidates) {
    try {
      // Shared resilience layer: jittered exponential backoff on 429/5xx/
      // network blips plus the process-wide gateway concurrency slot — batch
      // ingestion (10+ images in one file) no longer fires N simultaneous
      // vision calls into a ~10/min quota.
      const { withGatewayResilience } = await import('@/lib/ai/resilience');
      const res = (await withGatewayResilience(
        () => zai.chat.completions.createVision({
          model,
          messages: [
            { role: 'user', content: [
              { type: 'text', text: instruction },
              { type: 'image_url', image_url: { url: dataUrl } },
            ] },
          ],
          thinking: { type: 'disabled' },
        }) as Promise<unknown>,
        { label: `vision:${model}`, retries: 2 },
      )) as { choices?: Array<{ message?: { content?: string } }> };
      const text = res?.choices?.[0]?.message?.content || '';
      if (text.trim()) {
        visionGlobal.__medqZaiVisionModel = model;
        return text.trim();
      }
      // empty answer — try the next model
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes('1210') || msg.includes('图片输入格式') || msg.includes('image format')) {
        // the image itself is unparseable — no model will fix it
        log.warn?.('VLM rejected the image as unparseable (format/parse error)');
        return null;
      }
      log.warn?.(`VLM ${model} failed: ${msg.slice(0, 140)}`);
      // next model in the chain
    }
  }
  return null;
}

// ─── XML / container helpers (PPTX, DOCX media, EPUB) ───────────────────────

/** Decode the handful of XML entities that appear in OOXML text runs. */
function decodeXmlEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/** DrawingML (pptx slide / notes) → text: one line per <a:p>, <a:t> runs joined. */
function pptxSlideText(xml: string): string {
  const lines: string[] = [];
  for (const m of xml.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)) {
    const runs = [...m[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((r) => decodeXmlEntities(r[1]));
    const line = runs.join('').replace(/\s+/g, ' ').trim();
    if (line) lines.push(line);
  }
  return lines.join('\n');
}

async function loadZip(buffer: Buffer) {
  const JSZip = (await import('jszip')).default;
  return { zip: await JSZip.loadAsync(buffer) };
}

/** Sniff the raster-image MIME type from magic bytes (extension-agnostic). */
function sniffImageMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  if (buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
  if (buf.slice(0, 3).toString('latin1') === 'GIF') return 'image/gif';
  if (buf.slice(0, 2).toString('latin1') === 'BM') return 'image/bmp';
  return null;
}

const EMBEDDED_IMAGE_PROMPT =
  'You are OCR-ing an image embedded in a document for a medical study library. ' +
  '1) Transcribe ALL visible text verbatim (headings, labels, values, captions, chart axes and numbers). ' +
  '2) Describe the visual content precisely (diagram structure, chart trends with numbers, anatomy, pathology). ' +
  'Output the transcription under "TEXT:", then the description under "VISUAL:".';

interface SlideImage {
  slide: number;
  buffer: Buffer;
  mimeType: string;
}

/**
 * PPTX → per-slide text + speaker notes + embedded slide images (mapped to
 * their slide via ppt/slides/_rels/slideN.xml.rels → ../media/*).
 */
async function parsePptx(buffer: Buffer): Promise<{ text: string; slides: number; images: SlideImage[] }> {
  const { zip } = await loadZip(buffer);
  const slideNums: number[] = [];
  zip.forEach((relPath) => {
    const m = relPath.match(/^ppt\/slides\/slide(\d+)\.xml$/);
    if (m) slideNums.push(Number(m[1]));
  });
  slideNums.sort((a, b) => a - b);
  if (slideNums.length === 0) throw new Error('PPTX contains no slides.');

  const parts: string[] = [];
  const images: SlideImage[] = [];
  for (const n of slideNums.slice(0, 200)) {
    const slideXml = (await zip.file(`ppt/slides/slide${n}.xml`)?.async('string')) || '';
    const slideText = pptxSlideText(slideXml);

    const notesXml = (await zip.file(`ppt/notesSlides/notesSlide${n}.xml`)?.async('string')) || '';
    const notes = pptxSlideText(notesXml).replace(/\n+/g, ' ').trim();

    // Embedded images for this slide (cap: 2/slide, 8 total, raster ≥ 8 KB — skip icons/dividers)
    const relsXml = (await zip.file(`ppt/slides/_rels/slide${n}.xml.rels`)?.async('string')) || '';
    let perSlide = 0;
    for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)) {
      const tagStr = tag[0];
      if (!/\/image"/.test(tagStr)) continue;
      const target = tagStr.match(/Target="([^"]+)"/)?.[1];
      if (!target) continue;
      const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
      if (perSlide >= 2 || images.length >= 8) break;
      const img = await zip.file(mediaPath)?.async('nodebuffer');
      if (!img || img.length < 8_000) continue;
      const mimeType = sniffImageMime(img); // extension-agnostic (targets can be extension-less)
      if (!mimeType) continue;
      images.push({ slide: n, buffer: img, mimeType });
      perSlide++;
    }

    const block: string[] = [];
    if (slideText) block.push(slideText);
    if (notes) block.push(`Speaker notes: ${notes}`);
    parts.push(`— Slide ${n} —\n${block.join('\n')}`);
  }

  const hasText = parts.some((p) => p.replace(/— Slide \d+ —|Speaker notes:/g, '').trim().length > 0);
  if (!hasText && images.length === 0) {
    throw new Error('PPTX contains no extractable slide text, notes, or images.');
  }
  return { text: parts.join('\n\n'), slides: slideNums.length, images };
}

/** XLSX → text: one block per sheet, rows as " | "-joined lines. Caps: 25 sheets / 400 rows / 32 cols. */
async function parseXlsx(buffer: Buffer): Promise<{ text: string; sheets: number; rows: number }> {
  const ExcelJS = await import('exceljs');
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.load(buffer as unknown as Parameters<typeof workbook.xlsx.load>[0]);

  const parts: string[] = [];
  let totalRows = 0;
  for (const ws of workbook.worksheets.slice(0, 25)) {
    const lines: string[] = [];
    const rowCount = Math.min(ws.rowCount || 0, 400);
    const colCount = Math.min(ws.columnCount || 0, 32);
    for (let r = 1; r <= rowCount; r++) {
      const row = ws.getRow(r);
      const cells: string[] = [];
      for (let c = 1; c <= colCount; c++) {
        const v = row.getCell(c)?.text ?? '';
        cells.push(typeof v === 'string' ? v.trim() : v == null ? '' : String(v));
      }
      const line = cells.join(' | ').replace(/(\s*\|\s*)+$/g, '').trim();
      if (line) lines.push(line);
    }
    if (lines.length) {
      parts.push(`## Sheet: ${ws.name}\n${lines.join('\n')}`);
      totalRows += lines.length;
    }
  }
  if (!parts.length) throw new Error('XLSX contains no readable cell data.');
  return { text: parts.join('\n\n'), sheets: workbook.worksheets.length, rows: totalRows };
}

function htmlToPlainText(html: string): string {
  return decodeXmlEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<\/(p|div|li|h[1-6]|tr|blockquote)>/gi, '\n')
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<[^>]+>/g, ' '),
  )
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function cleanInline(s: string): string {
  return decodeXmlEntities(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

/** EPUB → text: spine order from the OPF, each xhtml chapter stripped to plain text. */
async function parseEpub(buffer: Buffer): Promise<{ text: string; chapters: number }> {
  const { zip } = await loadZip(buffer);
  const containerXml = (await zip.file('META-INF/container.xml')?.async('string')) || '';
  const opfPath =
    containerXml.match(/full-path="([^"]+)"/)?.[1] ||
    Object.keys(zip.files).find((p) => p.endsWith('.opf')) ||
    '';
  if (!opfPath) throw new Error('EPUB structure is invalid (no .opf package document found).');
  const opfXml = (await zip.file(opfPath)?.async('string')) || '';
  if (!opfXml) throw new Error('EPUB is missing its package document.');
  const opfDir = opfPath.includes('/') ? opfPath.slice(0, opfPath.lastIndexOf('/') + 1) : '';

  const manifest = new Map<string, string>();
  for (const item of opfXml.matchAll(/<item\b[^>]*>/g)) {
    const id = item[0].match(/id="([^"]+)"/)?.[1];
    const href = item[0].match(/href="([^"]+)"/)?.[1];
    if (id && href) manifest.set(id, href);
  }

  const chapters: string[] = [];
  const seen = new Set<string>();
  for (const ref of opfXml.matchAll(/<itemref\b[^>]*idref="([^"]+)"[^>]*>/g)) {
    const href = manifest.get(ref[1]);
    if (!href || chapters.length >= 400) continue;
    let chapterPath: string;
    try {
      chapterPath = decodeURIComponent(href.startsWith('/') ? href.slice(1) : opfDir + href);
    } catch {
      chapterPath = href;
    }
    if (seen.has(chapterPath)) continue;
    seen.add(chapterPath);
    const entry = zip.file(chapterPath);
    if (!entry) continue;
    const html = await entry.async('string');
    const title =
      cleanInline(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '') ||
      cleanInline(html.match(/<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/i)?.[1] || '') ||
      `Chapter ${chapters.length + 1}`;
    const text = htmlToPlainText(html);
    if (text) chapters.push(`# ${title || `Chapter ${chapters.length + 1}`}\n\n${text}`);
  }
  if (!chapters.length) throw new Error('EPUB contains no readable chapters.');
  return { text: chapters.join('\n\n').slice(0, 900_000), chapters: chapters.length };
}

/** DOCX/PPTX embedded images → VLM descriptions, one block per image. */
async function describeEmbeddedImages(
  entries: Array<{ label: string; buffer: Buffer; mimeType: string }>,
): Promise<string[]> {
  const notes: string[] = [];
  for (const e of entries) {
    const desc = await describeImage(e.buffer, e.mimeType, EMBEDDED_IMAGE_PROMPT);
    if (desc) notes.push(`${e.label}\n${desc}`);
  }
  return notes;
}

// ─── Video: audio + sampled frames ─────────────────────────────────────────

const MAX_VIDEO_FRAMES = 12;

/** Convert an exotic still image (HEIC, TIFF, odd container) to JPEG via ffmpeg. */
async function toJpegViaFfmpeg(input: Buffer): Promise<Buffer | null> {
  const dir = tmpDir();
  try {
    const inPath = path.join(dir, 'input.bin');
    fs.writeFileSync(inPath, input);
    const outPath = path.join(dir, 'out.jpg');
    await execFileAsync('ffmpeg', [
      '-y', '-i', inPath, '-frames:v', '1', '-vf', 'scale=1920:-2', '-q:v', '4', outPath,
    ], { timeout: 60_000, maxBuffer: 1024 * 1024 * 16 });
    return fs.existsSync(outPath) && fs.statSync(outPath).size > 1_000 ? fs.readFileSync(outPath) : null;
  } catch {
    return null;
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

/**
 * Full video-to-text: transcribe the audio track and VLM-describe 6-12
 * frames sampled evenly across the FULL duration (short clips get dense
 * coverage; hour-long lectures still get frames start-to-end). The two
 * extractions run sequentially (both are ffmpeg-bound on the same temp copy).
 */
export async function extractVideoContent(
  input: Buffer,
  opts: { fileName?: string } = {},
): Promise<{ text: string; durationSec: number; transcript: string; scenes: VideoSceneInput[] }> {
  const dir = tmpDir();
  const inputPath = path.join(dir, 'input.bin');
  fs.writeFileSync(inputPath, input);
  try {
    const durationSec = await probeDuration(inputPath);

    // 0. Scene boundaries (Stage 3): ffmpeg scene-cut detection, falling
    // back to even time windows when nothing crosses the threshold
    // (single-set lectures, screencasts). Either way the video gets a
    // temporal scene index with mediaTimeSec navigation; scenes beyond
    // the VLM budget persist transcript-only instead of vanishing.
    let sceneSpans: SceneSpanWithMeta[] = [];
    try {
      const cuts = await detectSceneCuts(inputPath);
      if (cuts.length > 0) {
        sceneSpans = buildScenes(cuts.map((c) => c.atSec), durationSec, { minSceneSec: 5, maxScenes: 60 })
          .map((s) => ({ ...s, detection: 'scene-cut' as const }));
      }
    } catch {
      log.info?.(`scene detection failed for "${opts.fileName || 'video'}" — using even time windows`);
    }
    if (sceneSpans.length === 0) {
      sceneSpans = buildEvenWindows(durationSec, { minWindowSec: 60, maxScenes: 60, targetScenes: 24 })
        .map((s) => ({ ...s, detection: 'even-window' as const }));
    }

    // 1. Audio track → transcription (write a single wav, then segment).
    // NON-FATAL: plenty of valid videos have NO audio stream at all
    // (screen recordings, microscope camera exports, muted demo clips) —
    // ffmpeg then exits non-zero ("does not contain any stream"), which
    // used to fail the WHOLE ingestion. Skip audio and keep the frames.
    const wavPath = path.join(dir, 'audio.wav');
    try {
      await execFileAsync('ffmpeg', ['-y', '-i', inputPath, '-vn', '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', wavPath], { timeout: 300_000, maxBuffer: 1024 * 1024 * 64 });
    } catch {
      log.info?.(`no audio stream in "${opts.fileName || 'video'}" — continuing with visual frames only`);
    }
    let transcript = '';
    let audioSegments: Array<{ offsetSec: number; text: string }> = [];
    if (fs.existsSync(wavPath) && fs.statSync(wavPath).size > 1024) {
      const wavBuf = fs.readFileSync(wavPath);
      try {
        const result = await transcribeAudio(wavBuf, opts);
        transcript = result.text;
        audioSegments = result.segments;
      } catch (e) {
        log.warn?.(`video audio transcription failed: ${e instanceof Error ? e.message : e}`);
      }
    }

    // 2. Frame sampling at SCENE midpoints (≤ MAX_VLM_SCENES evenly-picked
    // scenes when there are more) — replaces the old blind even-spread:
    // each analyzed frame now represents a real content segment, and its
    // description lands on the scene that contains it.
    const vlmScenes = pickVlmScenes(sceneSpans, MAX_VLM_SCENES);
    const frameTsList: number[] = vlmScenes.map((s) => s.midSec);
    const frameDir = path.join(dir, 'frames');
    fs.mkdirSync(frameDir, { recursive: true });
    for (let i = 0; i < frameTsList.length; i++) {
      try {
        await execFileAsync('ffmpeg', [
          '-y', '-ss', String(frameTsList[i]), '-i', inputPath,
          '-frames:v', '1', '-an',
          '-vf', 'scale=960:-2', '-q:v', '4',
          path.join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`),
        ], { timeout: 90_000, maxBuffer: 1024 * 1024 * 16 });
      } catch {
        // unreadable timestamp (corrupt/odd seek) — skip that frame
      }
    }
    const frameFiles = fs.existsSync(frameDir)
      ? fs.readdirSync(frameDir).filter((f) => f.endsWith('.jpg')).sort()
      : [];
    const zai = await getZai();
    const visionNotes: string[] = [];
    const analyzedFrames: Array<{ offsetSec: number; description: string }> = [];
    if (frameFiles.length && zai) {
      for (let i = 0; i < frameFiles.length; i++) {
        const offsetSec = frameTsList[i] ?? 0;
        const buf = fs.readFileSync(path.join(frameDir, frameFiles[i]));
        const desc = await describeImage(
          buf,
          'image/jpeg',
          'This is a frame from an educational video. Extract ALL visible text (slides, diagrams, labels, titles) verbatim, then describe the medical/educational content shown in 1-2 sentences. Be specific and factual.',
        );
        if (desc) {
          analyzedFrames.push({ offsetSec, description: desc });
          visionNotes.push(`[${fmtTimestamp(offsetSec)}] (visual) ${desc}`);
        }
      }
    }

    // 3. Assemble per-scene payloads: transcript segments by containment,
    // frame descriptions by containment (nearest scene wins at edges).
    const sceneTranscripts = assignTranscriptToScenes(audioSegments, sceneSpans);
    const sceneDescriptions = assignDescriptionsToScenes(analyzedFrames, sceneSpans);
    const scenes: VideoSceneInput[] = sceneSpans.map((s, i) => ({
      sceneIdx: s.sceneIdx,
      startSec: s.startSec,
      endSec: s.endSec,
      detection: s.detection,
      description: sceneDescriptions[i] ?? '',
      transcript: sceneTranscripts[i] ?? '',
    }));

    // 4. Flattened document text (backward-compatible chunks) — the scene
    // timeline section is capped + trimmed so it orients retrieval
    // without doubling the transcript's token weight.
    const parts: string[] = [];
    if (transcript.trim()) parts.push('# Spoken content\n' + transcript);
    if (visionNotes.length) parts.push('# On-screen visuals\n' + visionNotes.join('\n'));
    if (scenes.length) {
      const timeline = scenes.slice(0, 40).map((s) =>
        `[${fmtSec(s.startSec)}–${fmtSec(s.endSec)}] (scene ${s.sceneIdx + 1}${s.detection === 'even-window' ? ', time window' : ''}) ` +
        [s.description.slice(0, 300), s.transcript.slice(0, 300)].filter(Boolean).join(' — ') || '(no content extracted)',
      );
      parts.push('# Scene timeline\n' + timeline.join('\n'));
    }
    if (parts.length === 0) {
      throw new Error(
        `No audio or visual content could be extracted from "${opts.fileName || 'video'}" ` +
        `(audio segments: ${audioSegments.length}, frames: ${frameFiles.length}).`,
      );
    }
    return { text: parts.join('\n\n'), durationSec, transcript, scenes };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ─── Question-focused video analysis (deep agent) ──────────────────────────

/**
 * Analyze a retained video with the vision model for QUESTION AUTHORING —
 * unlike extractVideoContent (bulk ingestion, generic prompts), this takes
 * the agent's specific question focus ("which surgical technique is
 * demonstrated?") and describes evenly-sampled frames against it, so the
 * agent can write "watch the video and identify the technique" questions
 * grounded in what is actually shown.
 *
 * Frames are sampled evenly across the duration (6-10, capped for the
 * vision quota) and described individually with the caller's instruction.
 * The audio track is NOT re-transcribed here — the stored transcript is
 * merged by the caller (re-running ASR would take minutes for lectures).
 */
export async function analyzeVideoFrames(
  input: Buffer,
  instruction: string,
  opts: { maxFrames?: number } = {},
): Promise<{ durationSec: number; frames: Array<{ offsetSec: number; description: string }> } | null> {
  const dir = tmpDir();
  const inputPath = path.join(dir, 'input.bin');
  fs.writeFileSync(inputPath, input);
  try {
    const durationSec = await probeDuration(inputPath);
    const frameCount = Math.max(1, Math.min(opts.maxFrames ?? 8, 10));
    const frameTs = (i: number): number =>
      durationSec > 0
        ? Math.min(Math.floor(((i + 0.5) * durationSec) / frameCount), Math.max(0, Math.floor(durationSec - 0.5)))
        : 0;
    const frameDir = path.join(dir, 'frames');
    fs.mkdirSync(frameDir, { recursive: true });
    for (let i = 0; i < frameCount; i++) {
      try {
        await execFileAsync('ffmpeg', [
          '-y', '-ss', String(frameTs(i)), '-i', inputPath,
          '-frames:v', '1', '-an',
          '-vf', 'scale=960:-2', '-q:v', '4',
          path.join(frameDir, `frame_${String(i).padStart(2, '0')}.jpg`),
        ], { timeout: 90_000, maxBuffer: 1024 * 1024 * 16 });
      } catch { /* unreadable seek — skip that frame */ }
    }
    const frameFiles = fs.existsSync(frameDir)
      ? fs.readdirSync(frameDir).filter((f) => f.endsWith('.jpg')).sort()
      : [];
    if (!frameFiles.length) return null;
    const frames: Array<{ offsetSec: number; description: string }> = [];
    for (let i = 0; i < frameFiles.length; i++) {
      const buf = fs.readFileSync(path.join(frameDir, frameFiles[i]));
      const offsetSec = frameTs(Number.parseInt(frameFiles[i].replace(/\D/g, ''), 10) || 0);
      const desc = await describeImage(buf, 'image/jpeg', instruction);
      if (desc) frames.push({ offsetSec, description: desc });
    }
    if (!frames.length) return null;
    return { durationSec, frames };
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

// ─── Scanned-PDF rescue: carve embedded JPEGs, OCR via VLM ─────────────────

/** Carve baseline JPEG streams (FFD8…FFD9) out of raw PDF bytes. */
export function carvePdfJpegs(pdf: Buffer, max = 12): Buffer[] {
  const images: Buffer[] = [];
  let start = -1;
  for (let i = 0; i < pdf.length - 1 && images.length < max; i++) {
    if (pdf[i] === 0xff && pdf[i + 1] === 0xd8) {
      start = i;
    } else if (start >= 0 && pdf[i] === 0xff && pdf[i + 1] === 0xd9) {
      const jpg = pdf.subarray(start, i + 2);
      // Heuristic: real photos are > 15 KB; markers inside text streams are noise.
      if (jpg.length > 15_000) images.push(Buffer.from(jpg));
      start = -1;
    }
  }
  return images;
}

/**
 * OCR a scanned PDF: carve embedded page-scan JPEGs and VLM each one.
 * Returns the OCR'd text, or null when nothing could be recovered.
 */
export async function ocrScannedPdf(
  pdf: Buffer,
  opts: { pageCountHint?: number } = {},
): Promise<string | null> {
  const jpegs = carvePdfJpegs(pdf, 12);
  if (jpegs.length === 0) return null;

  const pages: string[] = [];
  for (let i = 0; i < jpegs.length; i++) {
    const text = await describeImage(
      jpegs[i],
      'image/jpeg',
      'This is a scanned page of a document. Transcribe ALL text on the page verbatim, preserving structure (headings, lists, tables). If parts are unreadable, transcribe the readable parts. Output only the transcription.',
    );
    if (text) pages.push(`— Page ${i + 1}${opts.pageCountHint ? ` of ${opts.pageCountHint}` : ''} —\n${text}`);
  }
  return pages.length ? pages.join('\n\n') : null;
}

// ─── Document parsing (server-side) ────────────────────────────────────────

export interface ParsedMediaContent {
  title: string;
  mimeType: string;
  text: string;
  fileKind: MediaFileKind;
  meta?: Record<string, unknown>;
  /** Stage 3: temporal scene index for videos (persisted by the callers). */
  scenes?: VideoSceneInput[];
}

/** Parse a DOCX buffer with mammoth (server-side — same lib the client uses). */
async function parseDocx(buffer: Buffer): Promise<string> {
  const mammoth = await import('mammoth');
  const result = await mammoth.extractRawText({ buffer });
  return result.value || '';
}

/**
 * Master entry: parse ANY supported upload into text for the RAG library.
 * Throws a descriptive error for genuinely unsupported inputs.
 */
export async function parseMediaFile(
  fileName: string,
  buffer: Buffer,
  mimeType: string,
): Promise<ParsedMediaContent> {
  const kind = detectFileKind(fileName, mimeType);
  const ext = (fileName.split('.').pop() || '').toLowerCase();

  if (kind === 'audio') {
    const result = await transcribeAdvanced(buffer, { fileName });
    return {
      title: fileName,
      mimeType: mimeType || 'audio/*',
      text: result.timestampedText,
      fileKind: kind,
      meta: {
        durationSec: Math.round(result.durationSec),
        transcription: 'advanced-vad-asr',
        // Full structured transcript — powers the Transcript Studio UI
        // (sentences, paragraphs, insights, stats). Heavy rendered texts are
        // stripped by toStoredTranscript (they live in the document content).
        transcript: toStoredTranscript(result),
      },
    };
  }

  if (kind === 'video') {
    const result = await extractVideoContent(buffer, { fileName });
    return {
      title: fileName,
      mimeType: mimeType || 'video/*',
      text: `# Transcript of "${fileName}" (video, ${Math.round(result.durationSec)}s)\n\n${result.text}`,
      fileKind: kind,
      meta: {
        durationSec: Math.round(result.durationSec),
        transcription: 'asr+vlm-frames',
        ...(result.scenes.length ? { scenes: result.scenes.length } : {}),
      },
      ...(result.scenes.length ? { scenes: result.scenes } : {}),
    };
  }

  if (kind === 'image') {
    // Magic-byte sniff first; exotic containers (HEIC, TIFF, odd formats) get
    // an ffmpeg → JPEG conversion pass so the VLM always receives a standard
    // raster format.
    let img = buffer;
    let mime = sniffImageMime(buffer) || (mimeType || 'image/jpeg');
    if (!sniffImageMime(buffer)) {
      const converted = await toJpegViaFfmpeg(buffer);
      if (converted) {
        img = converted;
        mime = 'image/jpeg';
      }
    }
    const text = await describeImage(
      img,
      mime.startsWith('image/') ? mime : 'image/jpeg',
      'You are OCR-ing an image for a medical study library. 1) Transcribe ALL visible text verbatim (headings, labels, values, captions). 2) Describe the visual content precisely (anatomy, pathology, diagram structure, chart trends with numbers). Output the transcription under a "TEXT:" heading, then the description under "VISUAL:".',
    );
    if (!text) throw new Error('Image analysis is unavailable right now (no vision provider reachable).');
    return {
      title: fileName,
      mimeType: mimeType || 'image/*',
      text: `# Image: ${fileName}\n\n${text}`,
      fileKind: kind,
      meta: { ocr: 'vlm' },
    };
  }

  // ── Documents ──
  if (ext === 'docx') {
    const text = await parseDocx(buffer);
    // Embedded images (word/media/*) → VLM descriptions (charts, diagrams, scans).
    // Magic-byte sniffed — some writers store extension-less media files.
    let imageNotes: string[] = [];
    try {
      const { zip } = await loadZip(buffer);
      const media: string[] = [];
      zip.forEach((relPath) => {
        if (/^word\/media\//.test(relPath) && !relPath.endsWith('/')) media.push(relPath);
      });
      const entries: Array<{ label: string; buffer: Buffer; mimeType: string }> = [];
      for (const p of media.sort().slice(0, 6)) {
        const img = await zip.file(p)?.async('nodebuffer');
        if (!img || img.length < 10_000) continue;
        const mimeType = sniffImageMime(img);
        if (!mimeType) continue;
        entries.push({ label: `Embedded image ${entries.length + 1} (${p.split('/').pop()})`, buffer: img, mimeType });
      }
      imageNotes = await describeEmbeddedImages(entries);
    } catch {
      // image extraction is best-effort
    }
    if (!text.trim() && !imageNotes.length) throw new Error('DOCX contains no extractable text.');
    return {
      title: fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      text: imageNotes.length ? `${text}\n\n# Embedded images\n\n${imageNotes.join('\n\n')}` : text,
      fileKind: 'document',
      meta: imageNotes.length ? { embeddedImages: imageNotes.length, ocr: 'vlm' } : undefined,
    };
  }

  if (ext === 'pptx') {
    const parsed = await parsePptx(buffer);
    const imageNotes = await describeEmbeddedImages(
      parsed.images.map((img) => ({ label: `— Slide ${img.slide} visual —`, buffer: img.buffer, mimeType: img.mimeType })),
    );
    const body = parsed.text || '(image-only deck — no slide text)';
    const text =
      `# Presentation: ${fileName} (${parsed.slides} slides)\n\n${body}` +
      (imageNotes.length ? `\n\n# Slide visuals\n\n${imageNotes.join('\n\n')}` : '');
    return {
      title: fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      text,
      fileKind: 'document',
      meta: {
        slides: parsed.slides,
        ...(parsed.images.length ? { slideImages: parsed.images.length } : {}),
        ...(imageNotes.length ? { ocr: 'vlm' } : {}),
      },
    };
  }

  if (ext === 'xlsx') {
    const parsed = await parseXlsx(buffer);
    return {
      title: fileName,
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      text: `# Spreadsheet: ${fileName}\n\n${parsed.text}`,
      fileKind: 'document',
      meta: { sheets: parsed.sheets, rows: parsed.rows },
    };
  }

  if (ext === 'xls') {
    throw new Error('Legacy .xls is not supported — re-save it as .xlsx (Excel/Sheets: File → Save as .xlsx) and upload again.');
  }

  if (ext === 'epub') {
    const parsed = await parseEpub(buffer);
    return {
      title: fileName,
      mimeType: 'application/epub+zip',
      text: `# Book: ${fileName}\n\n${parsed.text}`,
      fileKind: 'document',
      meta: { chapters: parsed.chapters },
    };
  }

  if (ext === 'pdf') {
    const { getDocumentProxy, extractText } = await import('unpdf');
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text, totalPages } = await extractText(pdf, { mergePages: true });
    if (text && text.trim().length > 200) {
      return { title: fileName, mimeType: 'application/pdf', text, fileKind: 'document', meta: { pages: totalPages } };
    }
    // Scanned PDF rescue path
    const ocr = await ocrScannedPdf(buffer, { pageCountHint: totalPages });
    if (ocr) {
      return { title: fileName, mimeType: 'application/pdf', text: ocr, fileKind: 'document', meta: { pages: totalPages, ocr: 'vlm-carved-jpegs' } };
    }
    throw new Error('PDF contains no extractable text (scanned image PDF with no recoverable page scans).');
  }

  // Plain text family — reuse the knowledge pipeline's extension sets.
  const { parseFile } = await import('./pipeline');
  const parsed = await parseFile(fileName, buffer);
  return { title: parsed.title, mimeType: parsed.mimeType, text: parsed.text, fileKind: 'document' };
}
