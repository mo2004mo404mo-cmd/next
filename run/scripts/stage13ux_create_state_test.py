#!/usr/bin/env python3
"""
Stage 13 UX layer \u2014 create the test for the PURE upload-progress state
machine. Covers every transition + the deriveControls view-model + the
formatters.

Idempotent: overwrites with the same content.
"""
from pathlib import Path

DEST = Path("/tmp/my-project/test/upload-progress-state.test.ts")

CONTENT = '''/**
 * upload-progress-state.test.ts \u2014 pure-logic tests for the Stage 13 UX
 * state machine. No React, no DOM \u2014 just transitions + derived view-model.
 */
import { describe, it, expect } from 'vitest';
import {
  initState,
  onProgress,
  onRetrying,
  onPaused,
  onResumed,
  onAssembling,
  onDone,
  onError,
  onCancelled,
  deriveControls,
  formatSpeed,
  formatEta,
  formatBytes,
  UPLOAD_FRACTION_OF_OVERALL,
  PREPARING_PROGRESS,
  ASSEMBLING_PROGRESS,
  type ProgressInput,
} from '@/lib/uploads/upload-progress-state';

const KB = 1024;
const MB = 1024 * 1024;

function baseProgress(over: Partial<ProgressInput>): ProgressInput {
  return {
    uploadedBytes: 0,
    totalBytes: 10 * MB,
    fraction: 0,
    bytesPerSecond: 0,
    etaSeconds: null,
    resumedBytes: 0,
    attempt: 1,
    ...over,
  };
}

describe('upload-progress-state \u2014 initState', () => {
  it('starts in the preparing phase with the floor progress', () => {
    const s = initState(10 * MB);
    expect(s.phase).toBe('preparing');
    expect(s.progress).toBe(PREPARING_PROGRESS);
    expect(s.totalBytes).toBe(10 * MB);
    expect(s.uploadedBytes).toBe(0);
    expect(s.resumedBytes).toBe(0);
    expect(s.attempt).toBe(1);
    expect(s.message).toMatch(/Preparing/);
  });

  it('clamps a negative total to zero (defensive)', () => {
    const s = initState(-5);
    expect(s.totalBytes).toBe(0);
  });
});

describe('upload-progress-state \u2014 onProgress', () => {
  it('maps fraction 0.5 onto 30% overall (60% upload slice)', () => {
    const s0 = initState(10 * MB);
    const s1 = onProgress(s0, baseProgress({ fraction: 0.5, uploadedBytes: 5 * MB }));
    expect(s1.phase).toBe('uploading');
    expect(s1.progress).toBe(Math.round(0.5 * 100 * UPLOAD_FRACTION_OF_OVERALL));
    expect(s1.uploadedBytes).toBe(5 * MB);
  });

  it('reports "Resuming upload" when resumedBytes > 0 and uploaded <= resumed', () => {
    const s0 = initState(10 * MB);
    const s1 = onProgress(s0, baseProgress({
      fraction: 0.3,
      uploadedBytes: 3 * MB,
      resumedBytes: 3 * MB,
    }));
    expect(s1.message).toMatch(/Resuming upload/);
    expect(s1.message).toContain('30% already on server');
  });

  it('switches to retrying when attempt > 1', () => {
    const s0 = initState(10 * MB);
    const s1 = onProgress(s0, baseProgress({ fraction: 0.4, attempt: 2 }));
    expect(s1.phase).toBe('retrying');
    expect(s1.attempt).toBe(2);
    expect(s1.message).toContain('retry attempt 2');
  });

  it('clamps fraction > 1 to 100% of the upload slice', () => {
    const s0 = initState(10 * MB);
    const s1 = onProgress(s0, baseProgress({ fraction: 1.5, uploadedBytes: 10 * MB }));
    expect(s1.progress).toBe(60);
  });

  it('never reports progress below the preparing floor', () => {
    const s0 = initState(10 * MB);
    const s1 = onProgress(s0, baseProgress({ fraction: 0 }));
    expect(s1.progress).toBeGreaterThanOrEqual(PREPARING_PROGRESS);
  });
});

describe('upload-progress-state \u2014 onRetrying', () => {
  it('records the chunk index and attempt in the message', () => {
    const s0 = initState(10 * MB);
    const s1 = onRetrying(s0, { chunkIndex: 3, attempt: 2, error: 'timeout' });
    expect(s1.phase).toBe('retrying');
    expect(s1.attempt).toBe(2);
    expect(s1.message).toContain('chunk 4');
    expect(s1.message).toContain('attempt 2');
  });
});

describe('upload-progress-state \u2014 pause / resume', () => {
  it('pause flips to paused with a resume hint', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5, uploadedBytes: 5 * MB }));
    const s1 = onPaused(s0);
    expect(s1.phase).toBe('paused');
    expect(s1.message).toMatch(/Paused/);
    expect(s1.message).toMatch(/Click resume/);
  });

  it('resume flips back to uploading', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5, uploadedBytes: 5 * MB }));
    const s1 = onPaused(s0);
    const s2 = onResumed(s1);
    expect(s2.phase).toBe('uploading');
    expect(s2.message).toMatch(/Resuming from 50%/);
  });

  it('pause is a no-op on terminal phases', () => {
    const done = onDone(initState(10 * MB));
    expect(onPaused(done).phase).toBe('done');
    const err = onError(initState(10 * MB), 'boom');
    expect(onPaused(err).phase).toBe('error');
  });

  it('resume is a no-op when not paused', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5 }));
    expect(onResumed(s0).phase).toBe('uploading');
  });
});

describe('upload-progress-state \u2014 assembling / done / error / cancelled', () => {
  it('onAssembling sets the assembling progress floor', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 1 }));
    const s1 = onAssembling(s0);
    expect(s1.phase).toBe('assembling');
    expect(s1.progress).toBe(ASSEMBLING_PROGRESS);
  });

  it('onDone sets 100% and clears any error', () => {
    const s0 = onError(initState(10 * MB), 'boom');
    const s1 = onDone(s0);
    expect(s1.phase).toBe('done');
    expect(s1.progress).toBe(100);
    expect(s1.error).toBeUndefined();
  });

  it('onError keeps the totalBytes and records the message', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5 }));
    const s1 = onError(s0, 'Network error');
    expect(s1.phase).toBe('error');
    expect(s1.error).toBe('Network error');
    expect(s1.message).toMatch(/Upload failed/);
  });

  it('onCancelled tells the user their progress is saved', () => {
    const s0 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5 }));
    const s1 = onCancelled(s0);
    expect(s1.phase).toBe('cancelled');
    expect(s1.message).toMatch(/progress is saved/);
    expect(s1.message).toMatch(/Re-pick the file/);
  });
});

describe('upload-progress-state \u2014 deriveControls', () => {
  it('uploading shows pause + cancel, hides resume + retry', () => {
    const s = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5, bytesPerSecond: 500 * KB }));
    const c = deriveControls(s);
    expect(c.canPause).toBe(true);
    expect(c.canCancel).toBe(true);
    expect(c.canResume).toBe(false);
    expect(c.canRetry).toBe(false);
    expect(c.showStats).toBe(true);
  });

  it('paused shows resume + cancel, hides pause', () => {
    const s = onPaused(onProgress(initState(10 * MB), baseProgress({ fraction: 0.5 })));
    const c = deriveControls(s);
    expect(c.canPause).toBe(false);
    expect(c.canResume).toBe(true);
    expect(c.canCancel).toBe(true);
  });

  it('error shows retry, hides pause/resume/cancel', () => {
    const s = onError(initState(10 * MB), 'boom');
    const c = deriveControls(s);
    expect(c.canRetry).toBe(true);
    expect(c.canPause).toBe(false);
    expect(c.canResume).toBe(false);
    expect(c.canCancel).toBe(false);
  });

  it('done hides all controls', () => {
    const s = onDone(initState(10 * MB));
    const c = deriveControls(s);
    expect(c.canPause).toBe(false);
    expect(c.canResume).toBe(false);
    expect(c.canCancel).toBe(false);
    expect(c.canRetry).toBe(false);
  });

  it('showResumedBadge is true only after upload exceeds resumedBytes', () => {
    // resumed, not yet past it
    const s1 = onProgress(initState(10 * MB), baseProgress({
      fraction: 0.3, uploadedBytes: 3 * MB, resumedBytes: 3 * MB,
    }));
    expect(deriveControls(s1).showResumedBadge).toBe(false);
    // resumed, now past it
    const s2 = onProgress(initState(10 * MB), baseProgress({
      fraction: 0.5, uploadedBytes: 5 * MB, resumedBytes: 3 * MB,
    }));
    expect(deriveControls(s2).showResumedBadge).toBe(true);
  });

  it('showRetryingIndicator fires on retrying phase OR attempt > 1', () => {
    const s1 = onRetrying(initState(10 * MB), { chunkIndex: 0, attempt: 2, error: 'x' });
    expect(deriveControls(s1).showRetryingIndicator).toBe(true);
    const s2 = onProgress(initState(10 * MB), baseProgress({ fraction: 0.4, attempt: 2 }));
    expect(deriveControls(s2).showRetryingIndicator).toBe(true);
  });
});

describe('upload-progress-state \u2014 formatters', () => {
  it('formatSpeed scales B \u2192 KB \u2192 MB', () => {
    expect(formatSpeed(500)).toBe('500 B/s');
    expect(formatSpeed(50 * KB)).toBe('50 KB/s');
    expect(formatSpeed(1.5 * MB)).toBe('1.5 MB/s');
    expect(formatSpeed(0)).toBe('\u2014');
    expect(formatSpeed(-1)).toBe('\u2014');
  });

  it('formatEta renders seconds, minutes, hours', () => {
    expect(formatEta(30)).toBe('30s');
    expect(formatEta(90)).toBe('1m 30s');
    expect(formatEta(3700)).toBe('1h 01m');
    expect(formatEta(null)).toBe('');
    expect(formatEta(-5)).toBe('');
  });

  it('formatBytes scales B \u2192 KB \u2192 MB \u2192 GB', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(512)).toBe('512 B');
    expect(formatBytes(5 * KB)).toBe('5 KB');
    expect(formatBytes(2.5 * MB)).toBe('2.5 MB');
    expect(formatBytes(1.5 * 1024 * 1024 * 1024)).toBe('1.50 GB');
  });
});

describe('upload-progress-state \u2014 full lifecycle', () => {
  it('walks preparing \u2192 uploading \u2192 paused \u2192 uploading \u2192 assembling \u2192 done', () => {
    let s = initState(10 * MB);
    expect(s.phase).toBe('preparing');
    s = onProgress(s, baseProgress({ fraction: 0.3, uploadedBytes: 3 * MB }));
    expect(s.phase).toBe('uploading');
    s = onPaused(s);
    expect(s.phase).toBe('paused');
    s = onResumed(s);
    expect(s.phase).toBe('uploading');
    s = onProgress(s, baseProgress({ fraction: 1, uploadedBytes: 10 * MB }));
    s = onAssembling(s);
    expect(s.phase).toBe('assembling');
    s = onDone(s);
    expect(s.phase).toBe('done');
    expect(s.progress).toBe(100);
  });

  it('walks uploading \u2192 retrying \u2192 error \u2192 (re-pick) \u2192 uploading', () => {
    let s = onProgress(initState(10 * MB), baseProgress({ fraction: 0.5 }));
    s = onRetrying(s, { chunkIndex: 2, attempt: 3, error: 'timeout' });
    expect(s.phase).toBe('retrying');
    s = onError(s, 'Upload failed after 4 attempts on chunk 3/2: timeout');
    expect(s.phase).toBe('error');
    expect(deriveControls(s).canRetry).toBe(true);
    // Re-pick \u2192 fresh state
    s = initState(10 * MB);
    expect(s.phase).toBe('preparing');
  });
});
'''


def main() -> None:
    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(CONTENT, encoding="utf-8")
    print(f"WROTE {DEST} ({len(CONTENT)} bytes)")


if __name__ == "__main__":
    main()
