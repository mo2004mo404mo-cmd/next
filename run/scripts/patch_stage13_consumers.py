#!/usr/bin/env python3
"""
Stage 13 — wire uploadId into existing consumers (idempotent string patches).

Patches:
  1. src/app/api/extract/route.ts            accept uploadId form field
  2. src/app/api/knowledge/upload/route.ts   accept uploadId + tier-aware cap
  3. src/lib/file-extract.ts                 >8MB → resumable path + uploadId passthrough
  4. src/components/medq/ai-agent/useFileAttachments.ts  ingest by reference
"""
import os

ROOT = "/tmp/my-project"

def patch_file(rel: str, edits: list) -> None:
    path = os.path.join(ROOT, rel)
    with open(path, "r", encoding="utf-8") as f:
        src = f.read()
    changed = False
    for old, new in edits:
        if new in src and old not in src:
            print(f"[skip] already patched: {rel} :: {old[:48]!r}...")
            continue
        if old not in src:
            raise SystemExit(f"[FAIL] anchor not found in {rel}: {old[:80]!r}")
        src = src.replace(old, new, 1)
        changed = True
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(src)
        print(f"[patch] {rel}")

# ── 1. /api/extract ─────────────────────────────────────────────────────────
patch_file("src/app/api/extract/route.ts", [
    (
"""import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';""",
"""import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';
import { uploadStore } from '@/lib/uploads/upload-session-store';""",
    ),
    (
"""  const file = form.get('file');
  if (!(file instanceof File)) return badRequest('"file" field is required');
  if (file.size === 0) return badRequest('File is empty');
  if (file.size > ABSOLUTE_MAX_BYTES) {
    return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
  }
  if (file.size > tierMaxBytes) {
    const hint = tierConfig.isAnonymous
      ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
      : '';
    return badRequest(
      `File exceeds the ${tierConfig.fileUploadMaxMb}MB cap for your ${tierConfig.label} tier${hint}`,
    );
  }

  const fileName = file.name || 'upload.bin';
  const buffer = Buffer.from(await file.arrayBuffer());
  const started = Date.now();""",
"""  // Stage 13 (resumable uploads): the client may reference an ALREADY-UPLOADED
  // session (uploadId) instead of re-sending bytes — the chunked resumable
  // path for large files ends here BY REFERENCE. Tier + absolute caps were
  // enforced when the session was opened (POST /api/uploads), so only a
  // defensive absolute re-check remains. The session is intentionally NOT
  // deleted here — /api/knowledge/upload may ingest the same bytes next
  // (chat attachments extract AND ingest from one upload).
  const uploadIdField = form.get('uploadId');
  let fileName: string;
  let buffer: Buffer;
  let fileSize: number;

  if (typeof uploadIdField === 'string' && uploadIdField.trim()) {
    const assembled = uploadStore.readAssembled(uploadIdField.trim(), userId);
    if (!assembled) {
      return badRequest('Upload session not found, incomplete, or not yours — upload the file again');
    }
    if (assembled.size > ABSOLUTE_MAX_BYTES) {
      return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
    }
    fileName = assembled.fileName;
    buffer = assembled.buffer;
    fileSize = assembled.size;
  } else {
    const file = form.get('file');
    if (!(file instanceof File)) return badRequest('"file" field is required');
    if (file.size === 0) return badRequest('File is empty');
    if (file.size > ABSOLUTE_MAX_BYTES) {
      return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
    }
    if (file.size > tierMaxBytes) {
      const hint = tierConfig.isAnonymous
        ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
        : '';
      return badRequest(
        `File exceeds the ${tierConfig.fileUploadMaxMb}MB cap for your ${tierConfig.label} tier${hint}`,
      );
    }
    fileName = file.name || 'upload.bin';
    buffer = Buffer.from(await file.arrayBuffer());
    fileSize = file.size;
  }

  const started = Date.now();""",
    ),
    (
"""    log.info?.(`extract "${fileName}" (${file.size}B → ${content.fileType}, ` +""",
"""    log.info?.(`extract "${fileName}" (${fileSize}B → ${content.fileType}, ` +""",
    ),
])

# ── 2. /api/knowledge/upload ────────────────────────────────────────────────
patch_file("src/app/api/knowledge/upload/route.ts", [
    (
"""import { retainOriginalFile } from '@/lib/agent/knowledge/file-store';""",
"""import { retainOriginalFile } from '@/lib/agent/knowledge/file-store';
import { uploadStore } from '@/lib/uploads/upload-session-store';""",
    ),
    (
"""  const file = form.get('file');
  if (!(file instanceof File)) return badRequest('"file" field is required');
  if (file.size === 0) return badRequest('File is empty');
  if (file.size > MAX_FILE_BYTES) {
    return badRequest(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
  }

  const origin = typeof form.get('origin') === 'string' ? String(form.get('origin')) : 'library';
  const title = typeof form.get('title') === 'string' ? String(form.get('title')).trim().slice(0, 200) : '';
  const fileName = file.name || 'upload.bin';
  const mimeType = file.type || '';
  const buffer = Buffer.from(await file.arrayBuffer());

  const fileKind = detectFileKind(fileName, mimeType);
  log.info?.(`Upload "${fileName}" (${file.size}B, ${mimeType || 'no mime'} → ${fileKind}) from ${origin} by ${userId}`);""",
"""  const origin = typeof form.get('origin') === 'string' ? String(form.get('origin')) : 'library';
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
  log.info?.(`Upload "${fileName}" (${fileSize}B, ${mimeType || 'no mime'} → ${fileKind}) from ${origin} by ${userId}`);""",
    ),
    (
"""    return NextResponse.json({
      sourceId: source.id,
      title: document?.title ?? (title || fileName),
      chunks: document?.chunkCount ?? 0,
      status: done?.status === 'ready' ? 'ready' : (done?.status ?? 'failed'),
      fileKind: kind,
      error: done?.status === 'failed' ? done?.error ?? 'Ingestion failed' : undefined,
    });""",
"""    // Ingestion consumed the bytes — the transport session's job is done.
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
    });""",
    ),
])

# ── 3. src/lib/file-extract.ts ──────────────────────────────────────────────
patch_file("src/lib/file-extract.ts", [
    (
"""/**
 * file-extract.ts — Client-side extraction entry (THIN WRAPPER).""",
"""import {
  recallResumableUpload,
  uploadFileResumable,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
} from '@/lib/uploads/chunked-upload-client';

/**
 * file-extract.ts — Client-side extraction entry (THIN WRAPPER).""",
    ),
    (
"""  /** Flat data-URL alias (same data as images) — legacy consumer shape. */
  imageUrls?: string[];
}""",
"""  /** Flat data-URL alias (same data as images) — legacy consumer shape. */
  imageUrls?: string[];
  /** Server upload-session id when the file took the resumable chunked path
   *  (Stage 13). /api/knowledge/upload accepts it to ingest the SAME bytes
   *  without a second full transfer of a large file. */
  uploadId?: string;
}""",
    ),
    (
"""/** Upload the raw file to /api/extract and return its parsed content. */
function extractOnServer(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {
  return new Promise<ExtractedContent>((resolve, reject) => {""",
"""/** Upload the raw file to /api/extract and return its parsed content.
 *
 * Stage 13: files above RESUMABLE_THRESHOLD_BYTES take the resumable chunked
 * path instead of one fragile multipart POST — a mid-transfer stall now
 * costs one 8MB chunk (auto-retried), never the whole upload, and the user
 * can pause / resume / refresh mid-flight. Small files keep the fast path.
 */
function extractOnServer(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return extractOnServerResumable(file, onProgress);
  }
  return new Promise<ExtractedContent>((resolve, reject) => {""",
    ),
    (
"""function readAsText(file: File): Promise<string> {""",
"""/**
 * Large-file path (Stage 13): resumable chunked upload, then /api/extract
 * BY REFERENCE (uploadId). Progress contract is unchanged for callers:
 * upload fills 0–60%, server parsing the rest.
 */
async function extractOnServerResumable(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  onProgress?.({
    stage: 'reading',
    progress: 5,
    message: resumeUploadId ? `Resuming ${file.name}…` : `Preparing ${file.name}…`,
  });

  let uploadId: string;
  try {
    ({ uploadId } = await uploadFileResumable(file, {
      resumeUploadId,
      onProgress: (p) => {
        const pct = Math.max(5, Math.round(p.fraction * 60));
        onProgress?.({
          stage: 'reading',
          progress: pct,
          message: p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes
            ? `Resuming ${file.name}…`
            : `Uploading ${file.name}… ${Math.round(p.fraction * 100)}%${p.attempt > 1 ? ' (retrying)' : ''}`,
        });
      },
      onRetrying: () =>
        onProgress?.({ stage: 'reading', progress: 5, message: 'Connection hiccup — retrying where it left off…' }),
    }).promise);
  } catch (error) {
    if (error instanceof UploadCancelledError) throw new Error('Extraction cancelled.');
    throw error instanceof Error ? error : new Error(String(error));
  }

  onProgress?.({ stage: 'extracting', progress: 65, message: 'Extracting content…' });
  const form = new FormData();
  form.append('uploadId', uploadId);

  let res: Response;
  try {
    res = await fetch('/api/extract', { method: 'POST', body: form });
  } catch {
    throw new Error('Network error while extracting the file.');
  }
  const body = (await res.json().catch(() => null)) as (ExtractedContent & { error?: string }) | null;
  if (!res.ok || !body || typeof body.text !== 'string') {
    throw new Error(body?.error || `Extraction failed (HTTP ${res.status}).`);
  }
  onProgress?.({ stage: 'done', progress: 100, message: 'Extraction complete' });
  return {
    text: truncate(body.text, MAX_TEXT_LENGTH),
    fileName: body.fileName || file.name,
    fileType: body.fileType || (file.name.split('.').pop()?.toLowerCase() || ''),
    fileSize: body.fileSize ?? file.size,
    ...(body.pageCount !== undefined ? { pageCount: body.pageCount } : {}),
    ...(body.images?.length ? { images: body.images } : {}),
    imageUrls: body.imageUrls ?? [],
    uploadId,
  };
}

function readAsText(file: File): Promise<string> {""",
    ),
])

# ── 4. useFileAttachments.ts ────────────────────────────────────────────────
patch_file("src/components/medq/ai-agent/useFileAttachments.ts", [
    (
"""async function ingestToKnowledgeLibrary(file: File): Promise<FileAttachment['knowledge'] | undefined> {
  try {
    const form = new FormData();
    form.append('file', file);
    form.append('origin', 'chat');""",
"""async function ingestToKnowledgeLibrary(
  file: File,
  uploadId?: string,
): Promise<FileAttachment['knowledge'] | undefined> {
  try {
    const form = new FormData();
    if (uploadId) {
      // Stage 13: ingest the bytes the resumable path already uploaded —
      // no second full transfer of a large file.
      form.append('uploadId', uploadId);
    } else {
      form.append('file', file);
    }
    form.append('origin', 'chat');""",
    ),
    (
"""        if (INGESTIBLE_TYPES.has(getFileType(file.name))) {
          void ingestToKnowledgeLibrary(file).then((knowledge) => {""",
"""        if (INGESTIBLE_TYPES.has(getFileType(file.name))) {
          void ingestToKnowledgeLibrary(file, extracted.uploadId).then((knowledge) => {""",
    ),
])

print("all patches applied")
