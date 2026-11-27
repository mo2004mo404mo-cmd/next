/**
 * knowledge/file-store.ts — original-file retention for the Knowledge Library.
 *
 * The RAG pipeline extracts TEXT from every source (transcripts, OCR, parsed
 * documents), but the ORIGINAL bytes were historically discarded for
 * everything except audio (audio-store). Three features now need the
 * originals:
 *
 *   1. "Show my own X-ray and ask me about it" — the generation deep agent
 *      attaches retained image/video/audio files to the questions it saves
 *      (imageUrl/audioUrl/videoUrl → GET /api/knowledge/sources/[id]/file).
 *   2. "Preview my data in its original view" — the SourceViewerModal's
 *      "Original file" tab renders PDFs in an embedded viewer, images
 *      full-size, audio/video in native players.
 *   3. Advanced citations — "open the original PDF next to the highlighted
 *      passage" needs the real file, not the extracted text.
 *
 * Store layout: upload/file-store/<sourceId>.bin (extension-less, exactly the
 * audio-store pattern) + { originalMime, originalBytes, originalName } in the
 * source's metaJson. Serving is owner-gated with HTTP Range support in
 * /api/knowledge/sources/[id]/file/route.ts.
 *
 * Audio sources uploaded through the ADVANCED audio pipeline keep using
 * audio-store (their playback path); the file route checks BOTH stores.
 */

import fs from 'fs';
import path from 'path';

const FILE_STORE = path.join(process.cwd(), 'upload', 'file-store');
const MAX_RETAIN_BYTES = 200 * 1024 * 1024; // matches the upload cap

export function fileStorePath(sourceId: string): string {
  return path.join(FILE_STORE, `${sourceId}.bin`);
}

/** Path of the retained original for a source, whichever store holds it. */
export function retainedOriginalPath(sourceId: string): string | null {
  const p = fileStorePath(sourceId);
  if (fs.existsSync(p)) return p;
  // Legacy path: audio uploaded through the advanced pipeline (audio-store).
  const audio = path.join(process.cwd(), 'upload', 'audio-store', `${sourceId}.bin`);
  if (fs.existsSync(audio)) return audio;
  return null;
}

/** Magic-byte sniffing for the common browser-renderable types we retain. */
export function sniffFileMime(buf: Buffer): string {
  if (buf.length >= 12) {
    // Images
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
    if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
    if (buf.subarray(0, 6).toString('ascii') === 'GIF89a' || buf.subarray(0, 6).toString('ascii') === 'GIF87a') return 'image/gif';
    if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WEBP') return 'image/webp';
    if (buf.subarray(4, 8).toString('ascii') === 'ftyp') {
      // ISO container: could be mp4/m4a/mov/heic — disambiguate by brand
      const brand = buf.subarray(8, 12).toString('ascii').toLowerCase();
      if (brand.startsWith('mif1') || brand.startsWith('msf1') || brand.startsWith('heic') || brand.startsWith('heix')) return 'image/heic';
      if (brand.startsWith('qt')) return 'video/quicktime';
      return 'video/mp4';
    }
    // Documents
    if (buf.subarray(0, 5).toString('ascii') === '%PDF-') return 'application/pdf';
    if (buf.subarray(0, 2).toString('ascii') === 'BM') return 'image/bmp';
    if (buf.subarray(0, 4).toString('ascii') === 'II*\u0000' || buf.subarray(0, 4).toString('ascii') === 'MM\u0000*') return 'image/tiff';
    // Audio / video containers
    if (buf[0] === 0x1a && buf[1] === 0x45 && (buf[2] & 0xf0) === 0x00) return 'video/webm'; // EBML (webm/mkv)
    if (buf[0] === 0x49 && buf[1] === 0x44 && buf[2] === 0x33) return 'audio/mpeg'; // ID3
    if (buf[0] === 0xff && (buf[1] & 0xe0) === 0xe0) return 'audio/mpeg'; // MPEG frame sync
    if (buf.subarray(0, 4).toString('ascii') === 'OggS') return 'audio/ogg';
    if (buf.subarray(0, 4).toString('ascii') === 'RIFF' && buf.subarray(8, 12).toString('ascii') === 'WAVE') return 'audio/wav';
    if (buf.subarray(0, 4).toString('ascii') === 'fLaC') return 'audio/flac';
  }
  return 'application/octet-stream';
}

export interface RetainResult {
  retained: boolean;
  mime: string;
  bytes: number;
}

/**
 * Keep the ORIGINAL file bytes for preview / media attachment / citations.
 * Best-effort: a retention failure never fails ingestion.
 */
export function retainOriginalFile(sourceId: string, buffer: Buffer, declaredMime?: string): RetainResult {
  const bytes = buffer.byteLength;
  const sniffed = sniffFileMime(buffer);
  const mime =
    declaredMime && declaredMime !== 'application/octet-stream' && declaredMime.includes('/')
      ? declaredMime
      : sniffed;
  if (bytes === 0 || bytes > MAX_RETAIN_BYTES) return { retained: false, mime, bytes };
  try {
    fs.mkdirSync(FILE_STORE, { recursive: true });
    fs.writeFileSync(fileStorePath(sourceId), buffer);
    return { retained: true, mime, bytes };
  } catch {
    return { retained: false, mime, bytes };
  }
}

/** Read a retained original back (e.g. to build a data URL for the VLM). */
export function readRetainedOriginal(sourceId: string): { buffer: Buffer; path: string } | null {
  const p = retainedOriginalPath(sourceId);
  if (!p) return null;
  try {
    const buffer = fs.readFileSync(p);
    if (!buffer.length) return null;
    return { buffer, path: p };
  } catch {
    return null;
  }
}

/** Remove the retained original when its source is deleted. */
export function deleteRetainedOriginal(sourceId: string): void {
  try {
    const p = fileStorePath(sourceId);
    if (fs.existsSync(p)) fs.rmSync(p, { force: true });
  } catch {
    // best-effort cleanup
  }
}

/**
 * Resolve the display mime for serving: prefer the mime recorded at ingestion
 * (metaJson.originalMime), fall back to sniffing the stored bytes.
 */
export function resolveServeMime(file: string, metaJson: string | null): string {
  try {
    const meta = metaJson ? (JSON.parse(metaJson) as Record<string, unknown>) : {};
    const declared = meta.originalMime ?? meta.audioMime;
    if (typeof declared === 'string' && declared.includes('/')) return declared;
  } catch {
    // fall through to sniffing
  }
  const head = Buffer.alloc(16);
  const fd = fs.openSync(file, 'r');
  try {
    fs.readSync(fd, head, 0, 16, 0);
  } finally {
    fs.closeSync(fd);
  }
  const sniffed = sniffFileMime(head);
  return sniffed;
}

/** Which file kinds get a browser-renderable "original view". */
export function isRenderableOriginal(mime: string): boolean {
  return (
    mime === 'application/pdf' ||
    mime.startsWith('image/') ||
    mime.startsWith('audio/') ||
    mime.startsWith('video/')
  );
}
