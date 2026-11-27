/**
 * use-resumable-upload.ts — React hook binding the PURE upload-progress
 * state machine to extractFromFile + the resumable-upload handle.
 *
 * Stage 13 UX layer: the generate page and chat attachments used to call
 * extractFromFile(file, onProgress) and throw away the upload handle — so
 * the UI could show a progress bar but NOT pause/resume/cancel. This hook
 * captures the handle (via the onHandle callback added to extractFromFile)
 * and wires it to the state machine's transitions.
 *
 * The hook itself is a thin pass-through; all logic lives in
 * upload-progress-state.ts (pure, unit-tested).
 */

"use client";

import { useCallback, useRef, useState } from 'react';
import { extractFromFile, type ExtractedContent, type ExtractionProgress } from '@/lib/file-extract';
import type { ResumableUploadHandle } from '@/lib/uploads/chunked-upload-client';
import {
  initState,
  onProgress as applyProgress,
  onRetrying as applyRetrying,
  onPaused,
  onResumed,
  onAssembling,
  onExtracting,
  onDone,
  onError,
  onCancelled,
  type UploadProgressState,
} from '@/lib/uploads/upload-progress-state';

export interface UseResumableUploadResult {
  /** Current UI state (null = no upload in flight). */
  state: UploadProgressState | null;
  /** The extracted content once the upload + extraction succeeds. */
  content: ExtractedContent | null;
  /** Start uploading + extracting `file`. Returns the content (throws on
   *  failure). Also sets `state` for the lifetime of the upload. */
  upload: (file: File) => Promise<ExtractedContent>;
  /** Pause the in-flight chunk (confirmed chunks stay on the server). */
  pause: () => void;
  /** Resume a paused upload. */
  resume: () => void;
  /** Cancel the upload (confirmed chunks stay on the server — re-pick the
   *  file to resume from where it stopped). */
  cancel: () => void;
  /** Reset to idle (clears state + content). Used when the user picks a new
   *  file or dismisses the result. */
  reset: () => void;
}

export function useResumableUpload(): UseResumableUploadResult {
  const [state, setState] = useState<UploadProgressState | null>(null);
  const [content, setContent] = useState<ExtractedContent | null>(null);
  const handleRef = useRef<ResumableUploadHandle | null>(null);

  const upload = useCallback(async (file: File): Promise<ExtractedContent> => {
    // Fresh upload — reset content, init state.
    setContent(null);
    setState(initState(file.size));

    let lastProgressPct = 5;
    try {
      const result = await extractFromFile(
        file,
        (p: ExtractionProgress) => {
          lastProgressPct = p.progress;
          setState((prev) => {
            if (!prev) return prev;
            // Map the legacy ExtractionProgress onto the state machine.
            // The richer fields (uploadedBytes, bytesPerSecond, etc.) are
            // present on the resumable path; absent on the small-file path.
            if (p.retrying) {
              return applyRetrying(prev, {
                chunkIndex: 0,
                attempt: p.attempt ?? 1,
                error: p.message,
              });
            }
            if (p.uploadedBytes !== undefined && p.totalBytes !== undefined) {
              return applyProgress(prev, {
                uploadedBytes: p.uploadedBytes,
                totalBytes: p.totalBytes,
                fraction: p.totalBytes > 0 ? p.uploadedBytes / p.totalBytes : 0,
                bytesPerSecond: p.bytesPerSecond ?? 0,
                etaSeconds: p.etaSeconds ?? null,
                resumedBytes: p.resumedBytes ?? 0,
                attempt: p.attempt ?? 1,
              });
            }
            // Small-file / server-parse phase — just carry the progress.
            if (p.stage === 'extracting') {
              return onExtracting(prev, p.progress);
            }
            if (p.stage === 'done') {
              return onDone(prev);
            }
            return { ...prev, progress: p.progress, message: p.message };
          });
        },
        (handle: ResumableUploadHandle | null) => {
          handleRef.current = handle;
        },
      );
      // The "done" progress callback already fired onProgress(onDone), but
      // the extractFromFile path emits a final 'done' stage only on the
      // small-file path. For the resumable path, the last progress is
      // 'extracting' at 100 — flip to done here.
      setState((prev) => (prev ? onAssembling(prev) : prev));
      setState((prev) => (prev ? { ...prev, progress: Math.max(prev.progress, 90) } : prev));
      setContent(result);
      setState((prev) => (prev ? onDone(prev) : prev));
      handleRef.current = null;
      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      // Distinguish "cancelled by user" from "failed" — both surface as
      // errors from extractFromFile, but the state machine treats them
      // differently (cancelled keeps the resume hint).
      if (/cancel/i.test(message)) {
        setState((prev) => (prev ? onCancelled(prev) : null));
      } else {
        setState((prev) => (prev ? onError(prev, message) : null));
      }
      handleRef.current = null;
      throw error;
    }
  }, []);

  const pause = useCallback(() => {
    handleRef.current?.pause();
    setState((prev) => (prev ? onPaused(prev) : prev));
  }, []);

  const resume = useCallback(() => {
    handleRef.current?.resume();
    setState((prev) => (prev ? onResumed(prev) : prev));
  }, []);

  const cancel = useCallback(() => {
    handleRef.current?.cancel();
    setState((prev) => (prev ? onCancelled(prev) : prev));
    handleRef.current = null;
  }, []);

  const reset = useCallback(() => {
    handleRef.current?.cancel();
    handleRef.current = null;
    setState(null);
    setContent(null);
  }, []);

  return { state, content, upload, pause, resume, cancel, reset };
}
