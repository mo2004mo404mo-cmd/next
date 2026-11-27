#!/usr/bin/env python3
"""
Stage 13 UX layer \u2014 extend file-extract.ts to EXPOSE the resumable upload
handle to callers (so the UI can pause/resume/cancel) and pass richer
progress (bytes/speed/ETA/attempt/resumed) through the existing
ExtractionProgress contract.

Backward-compatible:
  - ExtractionProgress gains OPTIONAL fields only (existing callers that
    read just .stage/.progress/.message keep working).
  - extractFromFile gains an OPTIONAL 3rd arg onHandle. Existing 2-arg
    callers keep working.

Idempotent: detects whether the patch is already applied by checking for
the `onHandle` marker in extractFromFile's signature.
"""
from pathlib import Path

DEST = Path("/tmp/my-project/src/lib/file-extract.ts")
SRC = DEST.read_text(encoding="utf-8")

# 1. Add ResumableUploadHandle to the import (idempotent).
OLD_IMPORT = """import {
  recallResumableUpload,
  uploadFileResumable,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
} from '@/lib/uploads/chunked-upload-client';"""
NEW_IMPORT = """import {
  recallResumableUpload,
  uploadFileResumable,
  UploadCancelledError,
  RESUMABLE_THRESHOLD_BYTES,
  type ResumableUploadHandle,
} from '@/lib/uploads/chunked-upload-client';"""

if "type ResumableUploadHandle" not in SRC:
    SRC = SRC.replace(OLD_IMPORT, NEW_IMPORT)
    print("[patch] added ResumableUploadHandle import")

# 2. Extend ExtractionProgress with optional resumable fields (idempotent).
OLD_PROGRESS = """export interface ExtractionProgress {
  stage: 'reading' | 'extracting' | 'processing' | 'done';
  progress: number; // 0\u2013100
  message: string;
}"""
NEW_PROGRESS = """export interface ExtractionProgress {
  stage: 'reading' | 'extracting' | 'processing' | 'done';
  progress: number; // 0\u2013100
  message: string;
  // \u25ac Stage 13 resumable UX fields (optional \u2014 only populated for large
  //   files on the chunked path). Existing callers that read only
  //   .stage/.progress/.message are unaffected.
  /** Confirmed bytes on the server (including resumed bytes). */
  uploadedBytes?: number;
  /** Declared total file size. */
  totalBytes?: number;
  /** Sliding-window upload speed, bytes/second (0 = unknown). */
  bytesPerSecond?: number;
  /** Seconds remaining, or null while unknown. */
  etaSeconds?: number | null;
  /** Bytes already on the server when this upload started (resume). */
  resumedBytes?: number;
  /** Attempt number of the in-flight chunk (1 = first try; >1 = retrying). */
  attempt?: number;
  /** True when the user paused the upload. */
  paused?: boolean;
  /** True when the engine is retrying a failed chunk. */
  retrying?: boolean;
}"""

if "uploadedBytes?: number;" not in SRC:
    SRC = SRC.replace(OLD_PROGRESS, NEW_PROGRESS)
    print("[patch] extended ExtractionProgress with resumable fields")

# 3. Add onHandle param to extractFromFile (idempotent).
OLD_SIG = """export async function extractFromFile(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {"""
NEW_SIG = """export async function extractFromFile(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  /** Stage 13 UX: receives the resumable-upload handle when the file takes
   *  the chunked path (so the UI can pause/resume/cancel). Null for the
   *  small-file fast path and for client-side text reads. */
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {"""

if "onHandle?: (handle: ResumableUploadHandle | null)" not in SRC:
    SRC = SRC.replace(OLD_SIG, NEW_SIG)
    print("[patch] added onHandle param to extractFromFile")

# 4. Find the extractOnServer call site and pass onHandle.
#    The body has: `return extractOnServer(file, onProgress);`
OLD_CALL = "  return extractOnServer(file, onProgress);"
NEW_CALL = "  return extractOnServer(file, onProgress, onHandle);"
if "return extractOnServer(file, onProgress, onHandle);" not in SRC:
    SRC = SRC.replace(OLD_CALL, NEW_CALL)
    print("[patch] forwarded onHandle to extractOnServer")

# 5. Update extractOnServer signature + forward to resumable path.
OLD_EXTRACT_SIG = """function extractOnServer(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return extractOnServerResumable(file, onProgress);
  }"""
NEW_EXTRACT_SIG = """function extractOnServer(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {
  if (file.size > RESUMABLE_THRESHOLD_BYTES) {
    return extractOnServerResumable(file, onProgress, onHandle);
  }"""
if "return extractOnServerResumable(file, onProgress, onHandle);" not in SRC:
    SRC = SRC.replace(OLD_EXTRACT_SIG, NEW_EXTRACT_SIG)
    print("[patch] forwarded onHandle to extractOnServerResumable")

# 6. Update extractOnServerResumable: signature + expose handle + richer progress.
OLD_RESUMABLE_SIG = """async function extractOnServerResumable(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
): Promise<ExtractedContent> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  onProgress?.({
    stage: 'reading',
    progress: 5,
    message: resumeUploadId ? `Resuming ${file.name}\u2026` : `Preparing ${file.name}\u2026`,
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
            ? `Resuming ${file.name}\u2026`
            : `Uploading ${file.name}\u2026 ${Math.round(p.fraction * 100)}%${p.attempt > 1 ? ' (retrying)' : ''}`,
        });
      },
      onRetrying: () =>
        onProgress?.({ stage: 'reading', progress: 5, message: 'Connection hiccup \u2014 retrying where it left off\u2026' }),
    }).promise);
  } catch (error) {
    if (error instanceof UploadCancelledError) throw new Error('Extraction cancelled.');
    throw error instanceof Error ? error : new Error(String(error));
  }"""

NEW_RESUMABLE_SIG = """async function extractOnServerResumable(
  file: File,
  onProgress?: (p: ExtractionProgress) => void,
  onHandle?: (handle: ResumableUploadHandle | null) => void,
): Promise<ExtractedContent> {
  const resumeUploadId = recallResumableUpload(file) ?? undefined;
  onProgress?.({
    stage: 'reading',
    progress: 5,
    message: resumeUploadId ? `Resuming ${file.name}\u2026` : `Preparing ${file.name}\u2026`,
  });

  let uploadId: string;
  try {
    // Stage 13 UX: grab the handle BEFORE awaiting so the caller can wire
    // pause/resume/cancel buttons immediately. The handle's .promise is what
    // we await \u2014 the engine keeps running independently of the UI.
    const handle = uploadFileResumable(file, {
      resumeUploadId,
      onProgress: (p) => {
        const pct = Math.max(5, Math.round(p.fraction * 60));
        onProgress?.({
          stage: 'reading',
          progress: pct,
          message: p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes
            ? `Resuming ${file.name}\u2026`
            : `Uploading ${file.name}\u2026 ${Math.round(p.fraction * 100)}%${p.attempt > 1 ? ' (retrying)' : ''}`,
          // Richer fields for the resumable progress UI (optional consumers):
          uploadedBytes: p.uploadedBytes,
          totalBytes: p.totalBytes,
          bytesPerSecond: p.bytesPerSecond,
          etaSeconds: p.etaSeconds,
          resumedBytes: p.resumedBytes,
          attempt: p.attempt,
          retrying: p.attempt > 1,
        });
      },
      onRetrying: (info) =>
        onProgress?.({
          stage: 'reading',
          progress: 5,
          message: `Connection hiccup on chunk ${info.chunkIndex + 1} \u2014 retrying (attempt ${info.attempt})\u2026`,
          retrying: true,
          attempt: info.attempt,
        }),
    });
    onHandle?.(handle);
    ({ uploadId } = await handle.promise);
  } catch (error) {
    if (error instanceof UploadCancelledError) throw new Error('Extraction cancelled.');
    throw error instanceof Error ? error : new Error(String(error));
  }"""

if "const handle = uploadFileResumable(file, {" not in SRC:
    SRC = SRC.replace(OLD_RESUMABLE_SIG, NEW_RESUMABLE_SIG)
    print("[patch] exposed handle + richer progress in extractOnServerResumable")

DEST.write_text(SRC, encoding="utf-8")
print(f"WROTE {DEST} ({len(SRC)} bytes)")
