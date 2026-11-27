/**
 * Knowledge Library — multipart file upload API.
 *
 * POST /api/knowledge/upload   (multipart/form-data)
 *   fields: file (required), origin (chat | library | generate), title (optional)
 *
 * Server-side parsing runs the FULL ingestion pipeline, so an upload works
 * for every supported type — not just text formats:
 *   • Documents: PDF (unpdf + VLM OCR rescue), DOCX/PPTX/XLSX/EPUB (rich
 *     media parser), txt/md/csv/json/html/code (verbatim)
 *   • Audio → advanced VAD ASR (timestamps), Video → ASR + frame VLM,
 *     Images → VLM OCR + description
 * → chunk → contextual enrichment → embed → indexed source.
 *
 * Returns { sourceId, title, chunks, status: 'ready' } so the caller can
 * ground the next turn (chat attachments) or select the source (generate
 * page). Clients: useFileAttachments (floating assistant Attach file),
 * KnowledgeLibraryPanel (library upload with XHR progress), generate page.
 *
 * Mirrors POST /api/knowledge/sources but for multipart bodies; see that
 * route for the JSON/text/url variant.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { ingestSource, updateSourceProgress } from '@/lib/agent/knowledge/pipeline';
import { parseMediaFile, detectFileKind } from '@/lib/agent/knowledge/ingest-media';
import { retainAudioFile } from '@/lib/agent/knowledge/audio-pipeline';
import { retainOriginalFile } from '@/lib/agent/knowledge/file-store';
import { uploadStore } from '@/lib/uploads/upload-session-store';
import { createLogger } from '@/lib/logger';

const log = createLogger('KnowledgeUpload');

export const runtime = 'nodejs';
export const maxDuration = 300;

const MAX_FILE_BYTES = 100 * 1024 * 1024; // 100 MB (= ABSOLUTE cap).
// Was 15 MB (pipeline parity) — raised 2026-11-03: the tier matrix
// (visitor/free/premium/pro) is now the single source of truth for
// per-user file-size limits, enforced at POST /api/uploads. This
// constant is the direct-multipart backstop only; the resumable
// uploadId path skips it (session was tier-capped at open).

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('You must be signed in to upload files');

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest('Expected multipart/form-data with a "file" field');
  }

  const origin = typeof form.get('origin') === 'string' ? String(form.get('origin')) : 'library';
  const title = typeof form.get('title') === 'string' ? String(form.get('title')).trim().slice(0, 200) : '';

  // Stage 13 (resumable uploads): accept an already-uploaded session BY
  // REFERENCE. Large files arrive through the chunked resumable path
  // (POST /api/uploads → PUT chunks → complete) and are ingested here with
  // NO second full transfer. The session's size was capped at the caller's
  // tier when it was opened, so the multipart transport guard below applies
  // only to the direct path.
  const uploadIdField = form.get('uploadId');
  const uploadId = typeof uploadIdField === 'string' ? uploadIdField.trim() : '';
  let fileName: string;
  let mimeType: string;
  let fileSize: number;
  let buffer: Buffer;

  if (uploadId) {
    const assembled = uploadStore.readAssembled(uploadId, userId);
    if (!assembled) {
      return badRequest('Upload session not found, incomplete, or not yours — upload the file again');
    }
    fileName = assembled.fileName;
    mimeType = assembled.mimeType || '';
    fileSize = assembled.size;
    buffer = assembled.buffer;
  } else {
    const file = form.get('file');
    if (!(file instanceof File)) return badRequest('"file" field is required');
    if (file.size === 0) return badRequest('File is empty');
    if (file.size > MAX_FILE_BYTES) {
      return badRequest(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
    }
    fileName = file.name || 'upload.bin';
    mimeType = file.type || '';
    fileSize = file.size;
    buffer = Buffer.from(await file.arrayBuffer());
  }

  const fileKind = detectFileKind(fileName, mimeType);
  log.info?.(`Upload "${fileName}" (${fileSize}B, ${mimeType || 'no mime'} → ${fileKind}) from ${origin} by ${userId}`);

  // Source row first so retention + progress can bind to a real id.
  const source = await db.knowledgeSource.create({
    data: {
      userId,
      name: (title || fileName).slice(0, 200),
      type: 'file',
      status: 'pending',
      fileKind,
      metaJson: JSON.stringify({ origin, originalName: fileName.slice(0, 200) }),
    },
  });

  const report = (stage: string, percent: number, note?: string) =>
    void updateSourceProgress(source.id, stage, percent, note);

  try {
    // Media (audio/video/image) parses through the rich media pipeline first
    // (ASR / frame VLM / VLM OCR) — same path URL imports take.
    let parsedText: string;
    let parsedTitle: string;
    let parsedMime: string;
    let kind = fileKind;

    if (fileKind === 'audio' || fileKind === 'video' || fileKind === 'image') {
      report('transcribing', 25, 'Analyzing / transcribing the media');
      const parsed = await parseMediaFile(fileName, buffer, mimeType);
      kind = parsed.fileKind;
      parsedText = parsed.text;
      parsedTitle = title || parsed.title;
      parsedMime = parsed.mimeType;

      // Retain originals for playback / preview / citations, best-effort.
      const meta: Record<string, unknown> = { ...(parsed.meta || {}) };
      if (parsed.fileKind === 'audio') {
        const retained = await retainAudioFile(source.id, buffer);
        if (retained.retained) {
          meta.audioMime = retained.mime;
          meta.audioBytes = retained.bytes;
        }
      } else {
        const retained = retainOriginalFile(source.id, buffer, mimeType || undefined);
        if (retained.retained) {
          meta.originalMime = retained.mime;
          meta.originalBytes = retained.bytes;
        }
      }
      if (Object.keys(meta).length > 0) {
        await db.knowledgeSource.update({
          where: { id: source.id },
          data: { metaJson: JSON.stringify({ origin, originalName: fileName.slice(0, 200), ...meta }) },
        }).catch(() => {});
      }

      // Stage 3: persist the temporal scene index for videos (mediaTimeSec
      // navigation + search_video_scenes). Best-effort — never fails the
      // upload; the flattened transcript document is already indexed.
      if (parsed.fileKind === 'video' && parsed.scenes?.length) {
        try {
          const { persistVideoScenes } = await import('@/lib/agent/knowledge/video-scenes');
          const persisted = await persistVideoScenes(source.id, parsed.scenes);
          if (persisted) log.info?.(`scene index: ${persisted} scenes for ${source.id}`);
        } catch { /* best-effort */ }
      }

      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: parsed.fileKind,
        meta: { origin, ...(parsed.meta || {}) },
        parsed: { title: parsedTitle, mimeType: parsedMime, text: parsedText },
        payload: { fileName, mimeType },
        onProgress: report,
      });
    } else {
      // Documents go straight into the pipeline (parseFile dispatches by
      // extension; DOCX/PPTX/XLSX/EPUB internally use the media parser too).
      // Stage 10: retain .xlsx originals so query_spreadsheet can read
      // them structurally (same file-store the media kinds use; bounded by
      // the 15 MB upload cap). Other documents stay text-only.
      let docMeta: Record<string, unknown> = { origin, originalName: fileName.slice(0, 200) };
      if ((fileName.split('.').pop() || '').toLowerCase() === 'xlsx') {
        const retained = retainOriginalFile(source.id, buffer, mimeType || undefined);
        if (retained.retained) {
          docMeta = { ...docMeta, originalMime: retained.mime, originalBytes: retained.bytes };
        }
      }

      await ingestSource({
        userId,
        sourceId: source.id,
        type: 'file',
        name: title || fileName,
        fileKind: 'document',
        meta: docMeta,
        payload: { fileName, buffer, mimeType },
        onProgress: report,
      });
    }

    const done = await db.knowledgeSource.findUnique({
      where: { id: source.id },
      select: { status: true, error: true, metaJson: true },
    });
    const meta = done?.metaJson ? (JSON.parse(done.metaJson) as Record<string, unknown>) : {};
    const document = await db.knowledgeDocument.findFirst({
      where: { sourceId: source.id },
      select: { title: true, chunkCount: true },
      orderBy: { createdAt: 'desc' },
    });

    // Ingestion consumed the bytes — the transport session's job is done.
    // (On failure the session is KEPT so the client can retry the POST
    // without re-uploading; the 24h sweep cleans up the rest.)
    if (uploadId) {
      try {
        uploadStore.remove(uploadId, userId);
      } catch {
        /* best-effort */
      }
    }

    return NextResponse.json({
      sourceId: source.id,
      title: document?.title ?? (title || fileName),
      chunks: document?.chunkCount ?? 0,
      status: done?.status === 'ready' ? 'ready' : (done?.status ?? 'failed'),
      fileKind: kind,
      error: done?.status === 'failed' ? done?.error ?? 'Ingestion failed' : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    log.warn?.(`Upload "${fileName}" failed: ${message}`);
    await db.knowledgeSource.update({
      where: { id: source.id },
      data: { status: 'failed', error: message.slice(0, 500) },
    }).catch(() => {});
    // Surface a descriptive failure (unsupported type, empty extraction…)
    // instead of a bare 500 so the UI can show the reason.
    return NextResponse.json({ sourceId: source.id, error: message.slice(0, 300) }, { status: 422 });
  }
});
