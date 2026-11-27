#!/usr/bin/env python3
"""
Stage 13 UX layer \u2014 create the <ResumableUploadProgress> component.

Renders the upload-progress state machine as a UI: progress bar, %, message,
speed/ETA, resumed badge, retrying indicator, and Pause/Resume/Cancel/Retry
buttons (visibility derived by deriveControls()).

Styling mirrors the generate page's dark-theme accent (#4fc3f7) and uses
lucide-react icons. The component is a pure render of state \u2014 all logic
lives in upload-progress-state.ts (unit-tested) and the hook wires callbacks.

Idempotent: overwrites with the same content.
"""
from pathlib import Path

DEST = Path("/tmp/my-project/src/components/medq/ResumableUploadProgress.tsx")

CONTENT = '''/**
 * ResumableUploadProgress.tsx \u2014 UX for the resumable chunked upload path
 * (Stage 13 UX layer).
 *
 * Renders the state produced by useResumableUpload() / the pure state
 * machine in upload-progress-state.ts. Shows:
 *   \u25cf a smooth progress bar (0..100%) with %
 *   \u25cf the human-facing phase message
 *   \u25cf speed + ETA (when the engine has enough samples)
 *   \u25cf a "resumed from X%" badge when the server already had bytes
 *   \u25cf a retrying indicator (chunk N, attempt M) when a chunk is retrying
 *   \u25cf Pause / Resume / Cancel buttons (visibility via deriveControls)
 *   \u25cf a Retry hint when the upload ended in failure (re-pick the file)
 *
 * The component is a PRESENTATIONAL layer: it calls back into the hook for
 * pause/resume/cancel; it never touches the upload engine directly.
 */

"use client";

import { memo } from 'react';
import { Loader2, Pause, Play, X, RotateCw, AlertTriangle, CheckCircle2, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  deriveControls,
  formatSpeed,
  formatEta,
  formatBytes,
  type UploadProgressState,
} from '@/lib/uploads/upload-progress-state';

export interface ResumableUploadProgressProps {
  state: UploadProgressState;
  /** Pause the in-flight chunk (confirmed chunks stay on the server). */
  onPause: () => void;
  /** Resume a paused upload. */
  onResume: () => void;
  /** Cancel \u2014 confirmed chunks stay; re-pick the file to resume. */
  onCancel: () => void;
  /** Retry after failure \u2014 typically re-dispatches the file picker. */
  onRetry: () => void;
  /** Optional className for outer layout customization. */
  className?: string;
}

function PhaseIcon({ phase }: { phase: UploadProgressState['phase'] }) {
  if (phase === 'done') return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (phase === 'error') return <AlertTriangle className="w-4 h-4 text-amber-400" />;
  if (phase === 'cancelled') return <X className="w-4 h-4 text-zinc-400" />;
  if (phase === 'paused') return <Pause className="w-4 h-4 text-[#4fc3f7]" />;
  if (phase === 'retrying') return <RefreshCw className="w-4 h-4 text-[#4fc3f7] animate-spin" />;
  return <Loader2 className="w-4 h-4 text-[#4fc3f7] animate-spin" />;
}

function ResumableUploadProgressImpl({
  state,
  onPause,
  onResume,
  onCancel,
  onRetry,
  className,
}: ResumableUploadProgressProps) {
  const controls = deriveControls(state);
  const isError = state.phase === 'error';
  const isDone = state.phase === 'done';
  const isCancelled = state.phase === 'cancelled';

  return (
    <div className={cn('w-full max-w-md mx-auto space-y-3', className)} role="status" aria-live="polite">
      {/* ── message row: icon + phase label ── */}
      <div className="flex items-center gap-2 justify-center">
        <PhaseIcon phase={state.phase} />
        <p className="text-sm text-[#e8ecf4] font-medium text-center">{state.message}</p>
      </div>

      {/* ── progress bar ── */}
      <div className="w-full bg-white/[0.06] rounded-full h-2 overflow-hidden">
        <div
          className={cn(
            'h-2 rounded-full transition-all duration-300',
            isError ? 'bg-amber-400' : isCancelled ? 'bg-zinc-500' : isDone ? 'bg-emerald-400' : 'bg-[#4fc3f7]',
          )}
          style={{ width: `${Math.max(0, Math.min(100, state.progress))}%` }}
        />
      </div>

      {/* ── stats row: % + speed + ETA + resumed badge ── */}
      <div className="flex items-center justify-center gap-3 text-[10px] text-[#5a6478]">
        <span>{state.progress}%</span>
        {controls.showStats && (
          <>
            <span>\u00b7</span>
            <span>{formatSpeed(state.bytesPerSecond)}</span>
            {state.etaSeconds !== null && state.etaSeconds > 0 && (
              <>
                <span>\u00b7</span>
                <span>{formatEta(state.etaSeconds)} left</span>
              </>
            )}
          </>
        )}
        {state.totalBytes > 0 && (
          <>
            <span>\u00b7</span>
            <span>{formatBytes(state.uploadedBytes)} / {formatBytes(state.totalBytes)}</span>
          </>
        )}
        {controls.showResumedBadge && (
          <>
            <span>\u00b7</span>
            <span className="text-emerald-400/80">resumed from {Math.round((state.resumedBytes / Math.max(1, state.totalBytes)) * 100)}%</span>
          </>
        )}
      </div>

      {/* ── retrying indicator ── */}
      {controls.showRetryingIndicator && state.phase !== 'done' && state.phase !== 'error' && (
        <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#4fc3f7]/80">
          <RefreshCw className="w-3 h-3 animate-spin" />
          <span>Retrying \u2014 your progress is saved on the server</span>
        </div>
      )}

      {/* ── control buttons ── */}
      <div className="flex items-center justify-center gap-2">
        {controls.canPause && (
          <button
            type="button"
            onClick={onPause}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.06] hover:bg-white/[0.1] text-xs text-[#e8ecf4] transition-colors"
            aria-label="Pause upload"
          >
            <Pause className="w-3.5 h-3.5" /> Pause
          </button>
        )}
        {controls.canResume && (
          <button
            type="button"
            onClick={onResume}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4fc3f7]/20 hover:bg-[#4fc3f7]/30 text-xs text-[#4fc3f7] transition-colors"
            aria-label="Resume upload"
          >
            <Play className="w-3.5 h-3.5" /> Resume
          </button>
        )}
        {controls.canCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/[0.04] hover:bg-white/[0.08] text-xs text-[#5a6478] hover:text-[#e8ecf4] transition-colors"
            aria-label="Cancel upload"
          >
            <X className="w-3.5 h-3.5" /> Cancel
          </button>
        )}
        {controls.canRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#4fc3f7]/20 hover:bg-[#4fc3f7]/30 text-xs text-[#4fc3f7] transition-colors"
            aria-label="Retry upload from where it stopped"
          >
            <RotateCw className="w-3.5 h-3.5" /> Retry from where it stopped
          </button>
        )}
      </div>

      {/* ── error detail (collapsed under the message) ── */}
      {isError && state.error && (
        <p className="text-[10px] text-amber-400/70 text-center break-words max-w-sm mx-auto">
          {state.error}
        </p>
      )}
    </div>
  );
}

export const ResumableUploadProgress = memo(ResumableUploadProgressImpl);
'''


def main() -> None:
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(CONTENT, encoding="utf-8")
    print(f"WROTE {DEST} ({len(CONTENT)} bytes)")


if __name__ == "__main__":
    main()
