/**
 * upload-progress-state.ts — PURE state machine for the resumable upload UX
 * (Stage 13 UX layer).
 *
 * The chunked-upload engine (`chunked-upload-client.ts`) already exposes
 * `ResumableUploadProgress` callbacks, but they are a raw stream of
 * snapshots — not a UI-friendly state. This module derives the
 * human-facing phase, labels, and button-visibility rules from that stream
 * with PURE functions (no React, no side-effects) so the UX logic is
 * unit-testable in node.
 *
 * The React hook (`use-resumable-upload.ts`) wires these transitions to
 * `useState`; the component (`ResumableUploadProgress.tsx`) renders the
 * resulting state. Both are thin layers over THIS module.
 */

// ▬▬ phases ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export type UploadPhase =
  | 'idle'
  | 'preparing'
  | 'uploading'
  | 'paused'
  | 'retrying'
  | 'assembling'
  | 'done'
  | 'error'
  | 'cancelled';

// ▬▬ state ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export interface UploadProgressState {
  phase: UploadPhase;
  /** 0..100 overall (upload covers 0..60, server parse 60..100 — parity with
   *  the legacy ExtractionProgress contract). */
  progress: number;
  /** Confirmed bytes on the server (including resumed bytes). */
  uploadedBytes: number;
  /** Declared total file size. */
  totalBytes: number;
  /** Sliding-window speed, bytes/second (0 = unknown). */
  bytesPerSecond: number;
  /** Seconds remaining, or null while unknown. */
  etaSeconds: number | null;
  /** Bytes already on the server when this upload started (resume). */
  resumedBytes: number;
  /** Attempt number of the in-flight chunk (1 = first try). */
  attempt: number;
  /** Human-facing message (phase label + context). */
  message: string;
  /** Set when the upload ended in failure (exhausted retries / fatal). */
  error?: string;
}

// ▬▬ inputs (mirror of chunked-upload-client callbacks) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export interface ProgressInput {
  uploadedBytes: number;
  totalBytes: number;
  fraction: number;
  bytesPerSecond: number;
  etaSeconds: number | null;
  resumedBytes: number;
  attempt: number;
}

export interface RetryInput {
  chunkIndex: number;
  attempt: number;
  error: string;
}

// ▬▬ constants (mirrors file-extract.ts upload/parse split) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

/** Upload phase fills 0..60% of the overall bar; server parse fills 60..100%. */
export const UPLOAD_FRACTION_OF_OVERALL = 0.6;
export const PREPARING_PROGRESS = 5;
export const ASSEMBLING_PROGRESS = 65;

// ▬▬ pure transitions ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export function initState(totalBytes: number): UploadProgressState {
  return {
    phase: 'preparing',
    progress: PREPARING_PROGRESS,
    uploadedBytes: 0,
    totalBytes: Math.max(0, totalBytes),
    bytesPerSecond: 0,
    etaSeconds: null,
    resumedBytes: 0,
    attempt: 1,
    message: 'Preparing upload…',
  };
}

export function onProgress(prev: UploadProgressState, p: ProgressInput): UploadProgressState {
  // Map the engine's 0..1 upload fraction onto the 0..60% overall slice.
  const uploadPct = Math.max(0, Math.min(1, p.fraction)) * 100 * UPLOAD_FRACTION_OF_OVERALL;
  const progress = Math.max(PREPARING_PROGRESS, Math.round(uploadPct));
  const resumed = p.resumedBytes > 0 && p.uploadedBytes <= p.resumedBytes;
  return {
    ...prev,
    phase: resumed ? 'uploading' : p.attempt > 1 ? 'retrying' : 'uploading',
    progress,
    uploadedBytes: p.uploadedBytes,
    totalBytes: p.totalBytes,
    bytesPerSecond: p.bytesPerSecond,
    etaSeconds: p.etaSeconds,
    resumedBytes: p.resumedBytes,
    attempt: p.attempt,
    message: resumed
      ? `Resuming upload… (${Math.round((p.resumedBytes / Math.max(1, p.totalBytes)) * 100)}% already on server)`
      : p.attempt > 1
        ? `Uploading… (retry attempt ${p.attempt})`
        : `Uploading… ${Math.round(p.fraction * 100)}%`,
    error: undefined,
  };
}

export function onRetrying(prev: UploadProgressState, info: RetryInput): UploadProgressState {
  return {
    ...prev,
    phase: 'retrying',
    attempt: info.attempt,
    message: `Connection hiccup on chunk ${info.chunkIndex + 1} — retrying (attempt ${info.attempt})…`,
  };
}

export function onPaused(prev: UploadProgressState): UploadProgressState {
  if (prev.phase === 'done' || prev.phase === 'error' || prev.phase === 'cancelled') return prev;
  return {
    ...prev,
    phase: 'paused',
    message: `Paused — ${Math.round((prev.uploadedBytes / Math.max(1, prev.totalBytes)) * 100)}% safely on the server. Click resume to continue.`,
  };
}

export function onResumed(prev: UploadProgressState): UploadProgressState {
  if (prev.phase !== 'paused') return prev;
  return {
    ...prev,
    phase: 'uploading',
    message: `Resuming from ${Math.round((prev.uploadedBytes / Math.max(1, prev.totalBytes)) * 100)}%…`,
  };
}

export function onAssembling(prev: UploadProgressState): UploadProgressState {
  return {
    ...prev,
    phase: 'assembling',
    progress: ASSEMBLING_PROGRESS,
    message: 'Finalizing upload on the server…',
  };
}

export function onExtracting(prev: UploadProgressState, pct: number): UploadProgressState {
  return {
    ...prev,
    phase: 'uploading',
    progress: Math.max(ASSEMBLING_PROGRESS, Math.min(99, pct)),
    message: 'Extracting content on the server…',
  };
}

export function onDone(prev: UploadProgressState): UploadProgressState {
  return {
    ...prev,
    phase: 'done',
    progress: 100,
    uploadedBytes: prev.totalBytes,
    message: 'Upload complete',
    error: undefined,
  };
}

export function onError(prev: UploadProgressState, message: string): UploadProgressState {
  return {
    ...prev,
    phase: 'error',
    message: 'Upload failed — you can retry from where it stopped.',
    error: message,
  };
}

export function onCancelled(prev: UploadProgressState): UploadProgressState {
  return {
    ...prev,
    phase: 'cancelled',
    message: 'Upload cancelled — your progress is saved. Re-pick the file to resume.',
  };
}

// ▬▬ derived view-model (what the component renders) ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬

export interface UploadControls {
  /** Show the Pause button. */
  canPause: boolean;
  /** Show the Resume button (instead of Pause). */
  canResume: boolean;
  /** Show the Cancel button. */
  canCancel: boolean;
  /** Show the Retry button (after failure — re-pick file to resume). */
  canRetry: boolean;
  /** Show the speed/ETA line. */
  showStats: boolean;
  /** Show the "resumed from X%" badge. */
  showResumedBadge: boolean;
  /** Show the retrying indicator. */
  showRetryingIndicator: boolean;
}

export function deriveControls(state: UploadProgressState): UploadControls {
  const active = state.phase === 'uploading' || state.phase === 'retrying';
  return {
    canPause: active,
    canResume: state.phase === 'paused',
    canCancel: active || state.phase === 'paused',
    canRetry: state.phase === 'error',
    showStats: active && state.bytesPerSecond > 0,
    showResumedBadge: state.resumedBytes > 0 && state.uploadedBytes > state.resumedBytes,
    showRetryingIndicator: state.phase === 'retrying' || state.attempt > 1,
  };
}

// ▬▬ formatters (kept here so tests cover the exact user-facing strings) ▬▬▬▬▬▬

export function formatSpeed(bytesPerSecond: number): string {
  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0) return '—';
  if (bytesPerSecond < 1024) return `${Math.round(bytesPerSecond)} B/s`;
  if (bytesPerSecond < 1024 * 1024) return `${(bytesPerSecond / 1024).toFixed(0)} KB/s`;
  return `${(bytesPerSecond / 1024 / 1024).toFixed(1)} MB/s`;
}

export function formatEta(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return '';
  const s = Math.ceil(seconds);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${String(r).padStart(2, '0')}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${String(m % 60).padStart(2, '0')}m`;
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
}
