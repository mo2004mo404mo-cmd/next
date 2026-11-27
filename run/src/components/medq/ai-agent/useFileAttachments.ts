'use client';

import { useCallback, useRef, useState, type DragEvent } from 'react';
import type { FileAttachment } from '@/lib/agent/file-intelligence';
import {
  analyzeExtractedContent,
  getFileType,
  getSupportedFileTypes,
} from '@/lib/agent/file-intelligence';
import { extractFromFile, isFileTypeSupported } from '@/lib/file-extract';
import type { ExtractionProgress } from '@/lib/file-extract';
import type { ResumableUploadHandle } from '@/lib/uploads/chunked-upload-client';

/** Document kinds worth persisting into the knowledge library (excludes
 *  images/audio/video — those flow through the turn, not the library). */
const INGESTIBLE_TYPES = new Set(['pdf', 'docx', 'txt', 'md', 'csv', 'tsv', 'xlsx', 'pptx']);

/** Absolute client-side ceiling. The tier-aware cap (2MB visitor … 100MB pro)
 *  is enforced server-side at POST /api/uploads, which returns a precise 413
 *  that we surface on the chip. This guard only prevents the pointless
 *  round-trip for a file NOTHING can accept. */
const ABSOLUTE_CLIENT_MAX_BYTES = 100 * 1024 * 1024;

/** Upload the original file for server-side parsing + RAG ingestion.
 *  Best-effort: failures leave the attachment usable (extracted text still
 *  flows with the message) — we just don't get library grounding. */
async function ingestToKnowledgeLibrary(
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
    form.append('origin', 'chat');
    const res = await fetch('/api/knowledge/upload', { method: 'POST', body: form });
    if (!res.ok) return undefined;
    const data = await res.json().catch(() => null) as { sourceId?: string; chunks?: number; title?: string } | null;
    if (!data?.sourceId) return undefined;
    return { sourceId: data.sourceId, chunks: data.chunks ?? 0, title: data.title ?? file.name };
  } catch {
    return undefined;
  }
}

type AnalysisOptions = Parameters<typeof analyzeExtractedContent>[1];

type UseFileAttachmentsOptions = {
  onUnsupportedFile: (fileName: string, supportedTypes: string) => void;
  /** Stage 13 UX: surfaced when a file exceeds the absolute 100MB cap so the
   *  chip can show why nothing happened (no attachment is created). */
  onFileTooLarge?: (fileName: string, sizeBytes: number) => void;
};

/**
 * Map the extraction progress callback onto the attachment's `upload` snapshot.
 * Returns a partial FileAttachment patch (merged by the caller).
 *
 * Pure-ish (no React) — kept inline so the wiring is auditable in one place.
 */
function progressToUploadPatch(
  p: ExtractionProgress,
): Partial<FileAttachment> {
  // The resumable path populates uploadedBytes/totalBytes; the small-file
  // path does not (it only carries stage/progress/message). When the richer
  // fields are absent we keep the legacy behavior: just bump `progress`.
  if (p.uploadedBytes === undefined || p.totalBytes === undefined) {
    const patch: Partial<FileAttachment> = {
      progress: p.progress,
      status: p.stage === 'done' ? 'analyzing' : 'extracting',
    };
    if (p.retrying) {
      patch.upload = {
        phase: 'retrying',
        uploadedBytes: 0,
        totalBytes: 0,
        bytesPerSecond: 0,
        etaSeconds: null,
        resumedBytes: 0,
        attempt: p.attempt ?? 1,
      };
    }
    return patch;
  }
  // Resumable path — derive the phase from the richer fields.
  let phase: NonNullable<FileAttachment['upload']>['phase'] = 'uploading';
  if (p.retrying) phase = 'retrying';
  else if (p.resumedBytes && p.resumedBytes > 0 && (p.uploadedBytes ?? 0) <= p.resumedBytes) {
    // The engine reports resumedBytes as the starting baseline; while the
    // in-flight chunk hasn't confirmed new bytes yet, we're "resuming".
    phase = 'uploading';
  }
  return {
    progress: p.progress,
    status: 'extracting',
    upload: {
      phase,
      uploadedBytes: p.uploadedBytes ?? 0,
      totalBytes: p.totalBytes ?? 0,
      bytesPerSecond: p.bytesPerSecond ?? 0,
      etaSeconds: p.etaSeconds ?? null,
      resumedBytes: p.resumedBytes ?? 0,
      attempt: p.attempt ?? 1,
    },
  };
}

export function useFileAttachments({ onUnsupportedFile, onFileTooLarge }: UseFileAttachmentsOptions) {
  const [fileAttachments, setFileAttachments] = useState<FileAttachment[]>([]);
  const [isDraggingFile, setIsDraggingFile] = useState(false);

  // Stage 13 UX: per-attachment resumable handles + the original File (for
  // retry-after-failure, which re-runs extractFromFile → recallResumableUpload
  // → resumes from the chunks the server already holds). Refs, not state —
  // handles are imperative objects (pause/resume/cancel), not render data.
  const handlesRef = useRef<Map<string, ResumableUploadHandle>>(new Map());
  const filesRef = useRef<Map<string, File>>(new Map());

  const patchAttachment = useCallback((id: string, patch: Partial<FileAttachment>) => {
    setFileAttachments((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));
  }, []);

  /** Core per-file processing. Called by handleFileUpload (new file) AND
   *  retryAttachment (re-run after failure/cancel — resumes server-side). */
  const processFile = useCallback(async (file: File, attachmentId: string) => {
    filesRef.current.set(attachmentId, file);
    try {
      const extracted = await extractFromFile(
        file,
        (progress: ExtractionProgress) => {
          patchAttachment(attachmentId, progressToUploadPatch(progress));
        },
        // Stage 13 UX: capture the resumable handle so the chip can
        // pause/resume/cancel. Null on the small-file fast path.
        (handle: ResumableUploadHandle | null) => {
          if (handle) handlesRef.current.set(attachmentId, handle);
          else handlesRef.current.delete(attachmentId);
        },
      );

      const analysis = analyzeExtractedContent(extracted.text, {
        fileName: extracted.fileName,
        fileType: extracted.fileType as AnalysisOptions['fileType'],
        fileSize: extracted.fileSize,
        pageCount: extracted.pageCount,
      });

      patchAttachment(attachmentId, {
        status: 'complete',
        progress: 100,
        extractedText: extracted.text,
        dataUrl: extracted.imageUrls?.[0],
        analysis,
        // Keep the upload snapshot briefly so a "done" transition is visible;
        // clear it so the chip falls back to the compact complete state.
        upload: undefined,
      });

      // Auto-ingest documents into the knowledge library (server-side
      // parse → chunk → embed). Fire-and-forget so chat is never blocked.
      if (INGESTIBLE_TYPES.has(getFileType(file.name))) {
        void ingestToKnowledgeLibrary(file, extracted.uploadId).then((knowledge) => {
          if (!knowledge) return;
          patchAttachment(attachmentId, { knowledge });
        });
      }

      // Upload succeeded — drop the handle (the engine is done) but KEEP the
      // File ref until the attachment is removed (cheap; one reference).
      handlesRef.current.delete(attachmentId);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to process file';
      const cancelled = /cancel/i.test(message);
      patchAttachment(attachmentId, {
        status: cancelled ? 'complete' : 'error', // see note below
        error: message,
        upload: cancelled
          ? {
              phase: 'cancelled',
              uploadedBytes: 0,
              totalBytes: file.size,
              bytesPerSecond: 0,
              etaSeconds: null,
              resumedBytes: 0,
              attempt: 0,
            }
          : {
              phase: 'error',
              uploadedBytes: 0,
              totalBytes: file.size,
              bytesPerSecond: 0,
              etaSeconds: null,
              resumedBytes: 0,
              attempt: 0,
            },
      });
      // NOTE on the cancelled→'complete' status: a cancelled upload is NOT an
      // extraction error — the user chose to stop. We mark status 'complete'
      // so the chip shows the (compact) cancelled badge via `upload.phase`
      // and a Retry button, without the red error styling. The File ref is
      // retained so retryAttachment(id) can resume from the server's chunks.
      handlesRef.current.delete(attachmentId);
    }
  }, [patchAttachment]);

  const handleFileUpload = useCallback(async (files: FileList | File[]) => {
    for (const file of Array.from(files)) {
      if (!isFileTypeSupported(file)) {
        onUnsupportedFile(file.name, getSupportedFileTypes());
        continue;
      }
      if (file.size > ABSOLUTE_CLIENT_MAX_BYTES) {
        onFileTooLarge?.(file.name, file.size);
        continue;
      }

      const attachmentId = `file-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      setFileAttachments((previous) => [
        ...previous,
        {
          id: attachmentId,
          name: file.name,
          type: getFileType(file.name),
          size: file.size,
          status: 'extracting',
          progress: 10,
        },
      ]);

      void processFile(file, attachmentId);
    }
  }, [onUnsupportedFile, onFileTooLarge, processFile]);

  // ── Stage 13 UX controls (operate by attachment id) ───────────────────
  const pauseAttachment = useCallback((id: string) => {
    handlesRef.current.get(id)?.pause();
    setFileAttachments((prev) => prev.map((a) =>
      a.id === id && a.upload ? { ...a, upload: { ...a.upload, phase: 'paused' } } : a,
    ));
  }, []);

  const resumeAttachment = useCallback((id: string) => {
    handlesRef.current.get(id)?.resume();
    setFileAttachments((prev) => prev.map((a) =>
      a.id === id && a.upload && a.upload.phase === 'paused'
        ? { ...a, upload: { ...a.upload, phase: 'uploading' } }
        : a,
    ));
  }, []);

  const cancelAttachment = useCallback((id: string) => {
    handlesRef.current.get(id)?.cancel();
    handlesRef.current.delete(id);
    setFileAttachments((prev) => prev.map((a) =>
      a.id === id && a.upload
        ? {
            ...a,
            status: 'complete', // not an error — user chose to stop
            upload: { ...a.upload, phase: 'cancelled' },
          }
        : a,
    ));
  }, []);

  /** Re-run extraction for a failed/cancelled attachment. Because
   *  extractFromFile calls recallResumableUpload(file) first, this RESUMES
   *  from the chunks the server already holds — it does NOT re-upload from
   *  zero (the whole point of Stage 13). */
  const retryAttachment = useCallback((id: string) => {
    const file = filesRef.current.get(id);
    if (!file) return; // nothing to retry (shouldn't happen — File is retained)
    setFileAttachments((prev) => prev.map((a) =>
      a.id === id
        ? {
            ...a,
            status: 'extracting',
            progress: 5,
            error: undefined,
            upload: {
              phase: 'preparing',
              uploadedBytes: 0,
              totalBytes: file.size,
              bytesPerSecond: 0,
              etaSeconds: null,
              resumedBytes: 0,
              attempt: 1,
            },
          }
        : a,
    ));
    void processFile(file, id);
  }, [processFile]);

  const handleDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingFile(true);
  }, []);

  const handleDragLeave = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingFile(false);
  }, []);

  const handleDrop = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDraggingFile(false);
    if (event.dataTransfer.files.length > 0) {
      void handleFileUpload(event.dataTransfer.files);
    }
  }, [handleFileUpload]);

  const removeAttachment = useCallback((attachmentId: string) => {
    // Clean up any in-flight handle + retained File ref.
    handlesRef.current.get(attachmentId)?.cancel();
    handlesRef.current.delete(attachmentId);
    filesRef.current.delete(attachmentId);
    setFileAttachments((previous) => previous.filter((a) => a.id !== attachmentId));
  }, []);

  const clearAttachments = useCallback(() => {
    for (const handle of handlesRef.current.values()) {
      try { handle.cancel(); } catch { /* already gone */ }
    }
    handlesRef.current.clear();
    filesRef.current.clear();
    setFileAttachments([]);
  }, []);

  return {
    fileAttachments,
    isDraggingFile,
    handleFileUpload,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    removeAttachment,
    clearAttachments,
    // Stage 13 UX:
    pauseAttachment,
    resumeAttachment,
    cancelAttachment,
    retryAttachment,
  };
}
