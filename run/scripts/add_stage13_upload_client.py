#!/usr/bin/env python3
"""
Stage 13 — resumable chunked uploads (CLIENT side + tests).

Creates (idempotent):
  - src/lib/uploads/chunked-upload-client.ts   browser upload engine
  - test/upload-session-store.test.ts          server store unit tests
  - test/chunked-upload-client.test.ts         pure client-logic unit tests
"""
import os

ROOT = "/tmp/my-project"

FILES = {}

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/lib/uploads/chunked-upload-client.ts")] = r'''
/**
 * chunked-upload-client.ts — browser-side resumable uploads (Stage 13).
 *
 * Files above RESUMABLE_THRESHOLD_BYTES no longer travel as one fragile
 * multipart POST. They are split into idempotent chunks (PUT
 * /api/uploads/:id/chunks/:n) with:
 *
 *   - per-chunk retry with exponential backoff (a stall costs one chunk)
 *   - pause / resume / cancel mid-flight (pause aborts the in-flight chunk;
 *     confirmed chunks stay on the server)
 *   - resume-after-refresh: localStorage remembers the session id per file
 *     signature; on re-pick the client asks the server which chunks it
 *     already has and skips them
 *   - live progress: confirmed bytes, speed (sliding window), ETA
 *
 * The XHR-per-chunk (not fetch) is deliberate: upload.onprogress gives
 * sub-chunk progress so the bar stays smooth, and abort() gives pause/cancel
 * immediate effect.
 */

/** Files at or below this size keep the single-request fast path (the plain
 *  multipart XHR) — a session costs 2 extra round-trips that only pay off
 *  when a failure would actually hurt. */
export const RESUMABLE_THRESHOLD_BYTES = 8 * 1024 * 1024;

/** Per-chunk wall clock budget. 8 MB at even a poor 70 KB/s ≈ 120 s. */
export const DEFAULT_CHUNK_TIMEOUT_MS = 120_000;

const MAX_ATTEMPTS_PER_CHUNK = 4;
const SPEED_WINDOW_MS = 12_000;
const LS_PREFIX = 'medq:upload-session:';
const LS_MAX_ENTRIES = 10;
const LS_MAX_AGE_MS = 24 * 60 * 60 * 1000;

// ── pure helpers (unit-tested) ──────────────────────────────────────────────

export interface ChunkSlice {
  index: number;
  start: number;
  end: number;
  size: number;
}

/** Slice plan for [size] bytes in [chunkSize] chunks. */
export function planChunks(size: number, chunkSize: number): ChunkSlice[] {
  const slices: ChunkSlice[] = [];
  if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(chunkSize) || chunkSize <= 0) {
    return slices;
  }
  const total = Math.max(1, Math.ceil(size / chunkSize));
  for (let i = 0; i < total; i++) {
    const start = i * chunkSize;
    const end = Math.min(size, start + chunkSize);
    slices.push({ index: i, start, end, size: end - start });
  }
  return slices;
}

/** Which chunk indexes in [0, totalChunks) are still missing. */
export function missingChunks(received: number[] | Set<number>, totalChunks: number): number[] {
  const set = received instanceof Set ? received : new Set(received);
  const missing: number[] = [];
  for (let i = 0; i < totalChunks; i++) {
    if (!set.has(i)) missing.push(i);
  }
  return missing;
}

/** Stable identity of a File for localStorage resume bookkeeping. */
export function fileSignature(file: { name: string; size: number; lastModified?: number }): string {
  return `${file.name}:${file.size}:${file.lastModified ?? 0}`;
}

export interface SpeedSample {
  t: number;
  /** Cumulative confirmed bytes at time t. */
  bytes: number;
}

/** Bytes/second over a sliding window of cumulative samples. 0 = unknown. */
export function speedFromSamples(samples: SpeedSample[], windowMs: number = SPEED_WINDOW_MS): number {
  if (samples.length < 2) return 0;
  const newest = samples[samples.length - 1];
  const cutoff = newest.t - windowMs;
  let oldest = samples[0];
  for (const s of samples) {
    if (s.t >= cutoff) {
      oldest = s;
      break;
    }
  }
  const dt = newest.t - oldest.t;
  const dBytes = newest.bytes - oldest.bytes;
  if (dt <= 0 || dBytes <= 0) return 0;
  return dBytes / (dt / 1000);
}

/** Seconds remaining, or null while the speed is unknown. */
export function etaFrom(bytesRemaining: number, bytesPerSecond: number): number | null {
  if (!Number.isFinite(bytesPerSecond) || bytesPerSecond <= 0 || bytesRemaining <= 0) return null;
  return bytesRemaining / bytesPerSecond;
}

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

// ── errors ──────────────────────────────────────────────────────────────────

export class UploadCancelledError extends Error {
  constructor() {
    super('Upload cancelled');
    this.name = 'UploadCancelledError';
  }
}

/** Server rejected the chunk with a 4xx — retrying will not help. */
class ChunkHttpError extends Error {
  readonly status: number;
  constructor(status: number, message: string) {
    super(message);
    this.name = 'ChunkHttpError';
    this.status = status;
  }
}

function isFatalChunkError(err: unknown): boolean {
  return err instanceof ChunkHttpError && [400, 404, 409, 413].includes(err.status);
}

// ── localStorage resume bookkeeping ─────────────────────────────────────────

function lsKey(sig: string): string {
  return LS_PREFIX + sig;
}

export function rememberResumableUpload(file: { name: string; size: number; lastModified?: number }, uploadId: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(lsKey(fileSignature(file)), JSON.stringify({ uploadId, at: Date.now() }));
    pruneLocalStorage();
  } catch {
    /* private mode / quota — resume-after-refresh is a bonus, not a promise */
  }
}

export function recallResumableUpload(file: { name: string; size: number; lastModified?: number }): string | null {
  if (typeof window === 'undefined') return null;
  try {
    const key = lsKey(fileSignature(file));
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { uploadId?: string; at?: number };
    if (!parsed || typeof parsed.uploadId !== 'string') return null;
    if (Date.now() - (parsed.at ?? 0) > LS_MAX_AGE_MS) {
      window.localStorage.removeItem(key);
      return null;
    }
    return parsed.uploadId;
  } catch {
    return null;
  }
}

export function forgetResumableUpload(file: { name: string; size: number; lastModified?: number }): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(lsKey(fileSignature(file)));
  } catch {
    /* best-effort */
  }
}

/** Keep the newest N entries — localStorage is not a session archive. */
function pruneLocalStorage(): void {
  try {
    const entries: Array<{ key: string; at: number }> = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key || !key.startsWith(LS_PREFIX)) continue;
      try {
        const parsed = JSON.parse(window.localStorage.getItem(key) || '{}') as { at?: number };
        entries.push({ key, at: parsed.at ?? 0 });
      } catch {
        entries.push({ key, at: 0 });
      }
    }
    if (entries.length <= LS_MAX_ENTRIES) return;
    entries.sort((a, b) => a.at - b.at);
    for (const e of entries.slice(0, entries.length - LS_MAX_ENTRIES)) {
      window.localStorage.removeItem(e.key);
    }
  } catch {
    /* best-effort */
  }
}

// ── the upload engine ───────────────────────────────────────────────────────

export interface ResumableUploadProgress {
  /** Confirmed bytes on the server (including resumed bytes). */
  uploadedBytes: number;
  totalBytes: number;
  /** 0..1. */
  fraction: number;
  /** Sliding-window speed in bytes/second (0 = unknown). */
  bytesPerSecond: number;
  etaSeconds: number | null;
  /** Bytes already on the server when this upload started (resume). */
  resumedBytes: number;
  /** Attempt number of the in-flight chunk (1 = first try). */
  attempt: number;
}

export interface ResumableUploadResult {
  uploadId: string;
  fileName: string;
  mimeType: string;
  size: number;
}

export interface ResumableUploadHandle {
  pause(): void;
  resume(): void;
  cancel(): void;
  readonly promise: Promise<ResumableUploadResult>;
}

export interface ResumableUploadOpts {
  /** Try to resume this session (from recallResumableUpload). */
  resumeUploadId?: string;
  maxAttemptsPerChunk?: number;
  chunkTimeoutMs?: number;
  onProgress?: (p: ResumableUploadProgress) => void;
  /** Fired once when the server already had bytes of this file. */
  onResumed?: (alreadyUploadedBytes: number) => void;
  /** Fired before a retryable chunk failure is retried. */
  onRetrying?: (info: { chunkIndex: number; attempt: number; error: string }) => void;
}

interface EngineState {
  paused: boolean;
  cancelled: boolean;
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitWhilePaused(state: EngineState): Promise<void> {
  while (state.paused && !state.cancelled) {
    await sleep(150);
  }
  if (state.cancelled) throw new UploadCancelledError();
}

/** One idempotent chunk PUT via XHR (upload progress + abort + timeout). */
function putChunk(args: {
  uploadId: string;
  slice: ChunkSlice;
  blob: Blob;
  timeoutMs: number;
  onUploadProgress?: (loaded: number) => void;
  register: (xhr: XMLHttpRequest | null) => void;
}): Promise<number> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    args.register(xhr);
    xhr.open('PUT', `/api/uploads/${encodeURIComponent(args.uploadId)}/chunks/${args.slice.index}`);
    xhr.timeout = args.timeoutMs;
    xhr.responseType = 'text';
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) args.onUploadProgress?.(e.loaded);
    };
    xhr.onload = () => {
      args.register(null);
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(args.slice.size);
        return;
      }
      let message = `HTTP ${xhr.status}`;
      try {
        const parsed = JSON.parse(xhr.responseText) as { error?: string };
        if (parsed?.error) message = parsed.error;
      } catch {
        /* non-JSON body */
      }
      reject(new ChunkHttpError(xhr.status, message));
    };
    xhr.onerror = () => {
      args.register(null);
      reject(new Error('Network error during chunk upload'));
    };
    xhr.ontimeout = () => {
      args.register(null);
      reject(new Error('Chunk upload timed out'));
    };
    xhr.onabort = () => {
      args.register(null);
      reject(new Error('Chunk upload aborted'));
    };
    try {
      xhr.send(args.blob);
    } catch (err) {
      args.register(null);
      reject(err instanceof Error ? err : new Error(String(err)));
    }
  });
}

/**
 * Upload `file` in resumable chunks. Returns a handle immediately — the
 * promise settles when the session is assembled server-side.
 */
export function uploadFileResumable(file: File, opts: ResumableUploadOpts = {}): ResumableUploadHandle {
  const state: EngineState = { paused: false, cancelled: false };
  let inFlight: XMLHttpRequest | null = null;
  const register = (xhr: XMLHttpRequest | null) => {
    inFlight = xhr;
  };

  const promise = (async (): Promise<ResumableUploadResult> => {
    if (!file || typeof file.size !== 'number' || file.size <= 0) {
      throw new Error('Cannot upload an empty file');
    }
    const maxAttempts = opts.maxAttemptsPerChunk ?? MAX_ATTEMPTS_PER_CHUNK;
    const timeoutMs = opts.chunkTimeoutMs ?? DEFAULT_CHUNK_TIMEOUT_MS;

    // ── open a session, or adopt a previous one for this exact file ──
    let uploadId = '';
    let chunkSize = 0;
    let totalChunks = 0;
    let received = new Set<number>();
    let resumedBytes = 0;

    if (opts.resumeUploadId) {
      try {
        const res = await fetch(`/api/uploads/${encodeURIComponent(opts.resumeUploadId)}`, { cache: 'no-store' });
        if (res.ok) {
          const s = (await res.json()) as {
            uploadId?: string;
            size?: number;
            chunkSize?: number;
            totalChunks?: number;
            receivedChunks?: number[];
            receivedBytes?: number;
            status?: string;
          };
          if (s?.uploadId && s.size === file.size && s.chunkSize && s.totalChunks) {
            uploadId = s.uploadId;
            chunkSize = s.chunkSize;
            totalChunks = s.totalChunks;
            received = new Set(s.receivedChunks ?? []);
            resumedBytes = s.receivedBytes ?? 0;
          }
        }
      } catch {
        /* offline / server restart — fall through to a fresh session */
      }
    }

    if (!uploadId) {
      const res = await fetch('/api/uploads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName: file.name, size: file.size, mimeType: file.type || '' }),
      });
      const body = (await res.json().catch(() => null)) as
        | { uploadId?: string; chunkSize?: number; totalChunks?: number; error?: string }
        | null;
      if (!res.ok || !body?.uploadId || !body.chunkSize || !body.totalChunks) {
        throw new Error(body?.error || `Could not start the upload (HTTP ${res.status})`);
      }
      uploadId = body.uploadId;
      chunkSize = body.chunkSize;
      totalChunks = body.totalChunks;
    }

    // Remember the session so a refresh / re-pick can resume. Removed on
    // success; a cancelled upload KEEPS it — that IS the resume case.
    rememberResumableUpload(file, uploadId);
    if (resumedBytes > 0) opts.onResumed?.(resumedBytes);

    // ── push the missing chunks ──
    const slices = planChunks(file.size, chunkSize);
    const pending = slices.filter((s) => !received.has(s.index));

    let confirmed = resumedBytes;
    const samples: SpeedSample[] = [{ t: Date.now(), bytes: confirmed }];

    const emit = (inFlightLoaded: number, attempt: number) => {
      samples.push({ t: Date.now(), bytes: confirmed });
      const speed = speedFromSamples(samples);
      const uploaded = confirmed + inFlightLoaded;
      opts.onProgress?.({
        uploadedBytes: uploaded,
        totalBytes: file.size,
        fraction: file.size > 0 ? Math.min(1, uploaded / file.size) : 0,
        bytesPerSecond: speed,
        etaSeconds: etaFrom(file.size - uploaded, speed),
        resumedBytes,
        attempt,
      });
    };
    emit(0, 1);

    for (const slice of pending) {
      await waitWhilePaused(state);
      if (state.cancelled) throw new UploadCancelledError();

      let attempt = 0;
      for (;;) {
        attempt += 1;
        if (state.cancelled) throw new UploadCancelledError();
        try {
          await putChunk({
            uploadId,
            slice,
            blob: file.slice(slice.start, slice.end),
            timeoutMs,
            onUploadProgress: (loaded) => emit(loaded, attempt),
            register,
          });
          confirmed += slice.size;
          emit(0, attempt);
          break;
        } catch (err) {
          if (state.cancelled) throw new UploadCancelledError();
          if (state.paused) {
            // Aborted BY the pause, not by a failure — don't burn an attempt.
            attempt -= 1;
            await waitWhilePaused(state);
            continue;
          }
          const message = err instanceof Error ? err.message : String(err);
          if (isFatalChunkError(err)) throw new Error(message);
          if (attempt >= maxAttempts) {
            throw new Error(
              `Upload failed after ${maxAttempts} attempts on chunk ${slice.index + 1}/${totalChunks}: ${message}`,
            );
          }
          opts.onRetrying?.({ chunkIndex: slice.index, attempt, error: message });
          const backoff = Math.min(500 * 2 ** (attempt - 1) + Math.random() * 250, 8000);
          await sleep(backoff);
          await waitWhilePaused(state);
        }
      }
    }

    // ── assemble server-side ──
    if (state.cancelled) throw new UploadCancelledError();
    const res = await fetch(`/api/uploads/${encodeURIComponent(uploadId)}/complete`, { method: 'POST' });
    const body = (await res.json().catch(() => null)) as
      | { fileName?: string; mimeType?: string; size?: number; error?: string }
      | null;
    if (!res.ok) {
      throw new Error(body?.error || `Could not finalize the upload (HTTP ${res.status})`);
    }
    forgetResumableUpload(file);
    return {
      uploadId,
      fileName: body.fileName || file.name,
      mimeType: body.mimeType || file.type || '',
      size: body.size ?? file.size,
    };
  })();

  return {
    pause() {
      state.paused = true;
      try {
        inFlight?.abort();
      } catch {
        /* already gone */
      }
    },
    resume() {
      state.paused = false;
    },
    cancel() {
      state.cancelled = true;
      try {
        inFlight?.abort();
      } catch {
        /* already gone */
      }
    },
    promise,
  };
}
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "test/upload-session-store.test.ts")] = r'''
import { describe, it, expect, afterEach } from 'vitest';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {
  createUploadStore,
  UploadSessionError,
  expectedChunkSize,
  missingChunkIndexes,
  totalChunksFor,
} from '@/lib/uploads/upload-session-store';

const MB = 1024 * 1024;
const roots: string[] = [];

function freshStore() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'medq-upload-sessions-'));
  roots.push(root);
  return { store: createUploadStore(root), root };
}

afterEach(() => {
  for (const r of roots.splice(0)) {
    try {
      fs.rmSync(r, { recursive: true, force: true });
    } catch {
      /* best-effort */
    }
  }
});

describe('chunk math', () => {
  it('computes totals and expected chunk sizes', () => {
    expect(totalChunksFor(20 * MB, 8 * MB)).toBe(3);
    expect(totalChunksFor(4 * MB, 8 * MB)).toBe(1);
    expect(expectedChunkSize(20 * MB, 8 * MB, 0)).toBe(8 * MB);
    expect(expectedChunkSize(20 * MB, 8 * MB, 2)).toBe(4 * MB);
    expect(expectedChunkSize(20 * MB, 8 * MB, 3)).toBe(-1);
    expect(missingChunkIndexes([0, 2], 3)).toEqual([1]);
    expect(missingChunkIndexes(new Set([0, 1]), 3)).toEqual([2]);
  });
});

describe('upload session store — init', () => {
  it('opens a session with the full chunk plan', () => {
    const { store } = freshStore();
    const s = store.init({
      userId: 'u1',
      fileName: 'big-lecture.pdf',
      mimeType: 'application/pdf',
      size: 20 * MB,
      maxBytes: 100 * MB,
    });
    expect(s.uploadId).toMatch(/^[0-9a-f-]{36}$/);
    expect(s.chunkSize).toBe(8 * MB);
    expect(s.totalChunks).toBe(3);
    expect(s.receivedChunks).toEqual([]);
    expect(s.receivedBytes).toBe(0);
    expect(s.missingChunks).toEqual([0, 1, 2]);
    expect(s.status).toBe('open');
  });

  it('enforces the caller-provided tier cap', () => {
    const { store } = freshStore();
    expect(() =>
      store.init({ userId: 'u1', fileName: 'x.bin', size: 3 * MB, maxBytes: 2 * MB }),
    ).toThrowError(UploadSessionError);
  });

  it('rejects invalid input', () => {
    const { store } = freshStore();
    expect(() => store.init({ userId: 'u1', fileName: '   ', size: 10, maxBytes: 100 })).toThrowError(/fileName/);
    expect(() => store.init({ userId: 'u1', fileName: 'x', size: 0, maxBytes: 100 })).toThrowError(/size/);
    expect(() => store.init({ userId: 'u1', fileName: 'x', size: 1.5, maxBytes: 100 })).toThrowError(/size/);
  });
});

describe('upload session store — chunks', () => {
  it('stores chunks, tracks received state, and is idempotent', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 20 * MB, maxBytes: 100 * MB });
    const after0 = store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(8 * MB, 0xaa));
    expect(after0.receivedChunks).toEqual([0]);
    expect(after0.receivedBytes).toBe(8 * MB);
    // Re-PUT of an already-received chunk is a 200 no-op (retry safety).
    const again = store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(8 * MB, 0xaa));
    expect(again.receivedBytes).toBe(8 * MB);
    expect(again.missingChunks).toEqual([1, 2]);
    expect(again.receivedChunks).toEqual([0]);
  });

  it('rejects wrong-size chunks and out-of-range indexes', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 20 * MB, maxBytes: 100 * MB });
    expect(() => store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(4 * MB))).toThrowError(/must be exactly/);
    expect(() => store.saveChunk(s.uploadId, 'u1', 5, Buffer.alloc(8 * MB))).toThrowError(/out of range/);
  });

  it('is owner-scoped — foreign sessions look missing', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 512 * 1024, maxBytes: 1024 * 1024 });
    expect(() => store.saveChunk(s.uploadId, 'u2', 0, Buffer.alloc(512 * 1024))).toThrowError(/not found/);
    expect(store.get(s.uploadId, 'u2')).toBeNull();
    expect(store.readAssembled(s.uploadId, 'u2')).toBeNull();
  });

  it('refuses traversal-style ids', () => {
    const { store, root } = freshStore();
    expect(store.get('../../../etc')).toBeNull();
    expect(store.get('..%2f..%2fetc')).toBeNull();
    expect(() => store.saveChunk('../../../etc', 'u1', 0, Buffer.alloc(1))).toThrowError(UploadSessionError);
    // Nothing escaped the store root.
    expect(fs.existsSync(path.join(root, 'manifest.json'))).toBe(false);
  });
});

describe('upload session store — assemble', () => {
  it('refuses to assemble until every chunk arrived', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 20 * MB, maxBytes: 100 * MB });
    store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(8 * MB, 0xaa));
    expect(() => store.assemble(s.uploadId, 'u1')).toThrowError(/missing 2 chunk/);
  });

  it('assembles byte-exactly and locks the session', () => {
    const { store, root } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 20 * MB, maxBytes: 100 * MB });
    store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(8 * MB, 0xaa));
    store.saveChunk(s.uploadId, 'u1', 1, Buffer.alloc(8 * MB, 0xbb));
    store.saveChunk(s.uploadId, 'u1', 2, Buffer.alloc(4 * MB, 0xcc));

    const done = store.assemble(s.uploadId, 'u1');
    expect(done.size).toBe(20 * MB);
    expect(done.status ?? true).toBe(true);

    const assembled = store.readAssembled(s.uploadId, 'u1');
    expect(assembled).not.toBeNull();
    expect(assembled!.buffer.length).toBe(20 * MB);
    expect(assembled!.buffer.subarray(0, 1).toString('hex')).toBe('aa');
    expect(assembled!.buffer.subarray(8 * MB, 8 * MB + 1).toString('hex')).toBe('bb');
    expect(assembled!.buffer.subarray(16 * MB, 16 * MB + 1).toString('hex')).toBe('cc');

    // Chunks are reclaimed after assembly; further writes are rejected.
    expect(fs.readdirSync(path.join(root, s.uploadId)).includes('chunk-0')).toBe(false);
    expect(() => store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(8 * MB, 0xaa))).toThrowError(/already completed/);
  });

  it('readAssembled stays null until assembled', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'x.bin', size: 10, maxBytes: 100 });
    expect(store.readAssembled(s.uploadId, 'u1')).toBeNull();
    store.saveChunk(s.uploadId, 'u1', 0, Buffer.alloc(10));
    expect(store.readAssembled(s.uploadId, 'u1')).toBeNull(); // all chunks, not assembled yet
    store.assemble(s.uploadId, 'u1');
    expect(store.readAssembled(s.uploadId, 'u1')?.buffer.length).toBe(10);
  });
});

describe('upload session store — lifecycle', () => {
  it('sweep drops stale sessions and keeps fresh ones', () => {
    const { store, root } = freshStore();
    const fresh = store.init({ userId: 'u1', fileName: 'a.bin', size: 10, maxBytes: 100 });
    const stale = store.init({ userId: 'u1', fileName: 'b.bin', size: 10, maxBytes: 100 });
    const day = 24 * 60 * 60 * 1000;
    const old = new Date(Date.now() - 2 * day);
    fs.utimesSync(path.join(root, stale.uploadId), old, old);
    expect(store.sweep(day)).toBe(1);
    expect(store.get(fresh.uploadId, 'u1')).not.toBeNull();
    expect(store.get(stale.uploadId, 'u1')).toBeNull();
  });

  it('remove deletes the session for its owner', () => {
    const { store } = freshStore();
    const s = store.init({ userId: 'u1', fileName: 'a.bin', size: 10, maxBytes: 100 });
    store.remove(s.uploadId, 'u1');
    expect(store.get(s.uploadId, 'u1')).toBeNull();
  });
});
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "test/chunked-upload-client.test.ts")] = r'''
import { describe, it, expect } from 'vitest';
import {
  planChunks,
  missingChunks,
  fileSignature,
  speedFromSamples,
  etaFrom,
  formatSpeed,
  formatEta,
  RESUMABLE_THRESHOLD_BYTES,
} from '@/lib/uploads/chunked-upload-client';

const MB = 1024 * 1024;

describe('planChunks', () => {
  it('splits a 20MB file into 8+8+4MB slices', () => {
    const slices = planChunks(20 * MB, 8 * MB);
    expect(slices).toHaveLength(3);
    expect(slices[0]).toMatchObject({ index: 0, start: 0, end: 8 * MB, size: 8 * MB });
    expect(slices[1]).toMatchObject({ index: 1, start: 8 * MB, end: 16 * MB, size: 8 * MB });
    expect(slices[2]).toMatchObject({ index: 2, start: 16 * MB, end: 20 * MB, size: 4 * MB });
  });

  it('returns one slice for files smaller than the chunk size', () => {
    const slices = planChunks(1024, 8 * MB);
    expect(slices).toHaveLength(1);
    expect(slices[0]).toMatchObject({ index: 0, start: 0, end: 1024, size: 1024 });
  });

  it('returns no slices for empty or invalid input', () => {
    expect(planChunks(0, 8 * MB)).toEqual([]);
    expect(planChunks(-5, 8 * MB)).toEqual([]);
    expect(planChunks(100, 0)).toEqual([]);
  });
});

describe('missingChunks', () => {
  it('lists the gaps', () => {
    expect(missingChunks([0, 2], 4)).toEqual([1, 3]);
  });

  it('accepts a Set', () => {
    expect(missingChunks(new Set([1, 2, 3]), 4)).toEqual([0]);
  });

  it('returns everything when nothing arrived', () => {
    expect(missingChunks([], 3)).toEqual([0, 1, 2]);
  });

  it('ignores out-of-range entries', () => {
    expect(missingChunks([0, 1, 2, 9], 3)).toEqual([]);
  });
});

describe('fileSignature', () => {
  it('is stable for the same descriptor and differs otherwise', () => {
    const a = { name: 'lec.pdf', size: 123, lastModified: 456 };
    expect(fileSignature(a)).toBe(fileSignature({ name: 'lec.pdf', size: 123, lastModified: 456 }));
    expect(fileSignature(a)).not.toBe(fileSignature({ name: 'lec.pdf', size: 124, lastModified: 456 }));
    expect(fileSignature(a)).not.toBe(fileSignature({ name: 'other.pdf', size: 123, lastModified: 456 }));
    expect(fileSignature(a)).not.toBe(fileSignature({ name: 'lec.pdf', size: 123, lastModified: 999 }));
  });
});

describe('speedFromSamples', () => {
  it('computes bytes/second between two samples', () => {
    const speed = speedFromSamples([
      { t: 0, bytes: 0 },
      { t: 10_000, bytes: 10 * MB },
    ]);
    expect(speed).toBeCloseTo(MB, 1);
  });

  it('only uses samples inside the window', () => {
    const speed = speedFromSamples(
      [
        { t: 0, bytes: 0 },
        { t: 10_000, bytes: 10 * MB },
        { t: 11_000, bytes: 10.5 * MB },
      ],
      1_500,
    );
    expect(speed).toBeGreaterThan(0.4 * MB);
    expect(speed).toBeLessThan(0.7 * MB);
  });

  it('returns 0 without elapsed time or with fewer than two samples', () => {
    expect(speedFromSamples([])).toBe(0);
    expect(speedFromSamples([{ t: 1, bytes: 5 }])).toBe(0);
    expect(speedFromSamples([{ t: 1, bytes: 5 }, { t: 1, bytes: 5 }])).toBe(0);
  });
});

describe('etaFrom', () => {
  it('divides remaining bytes by the speed', () => {
    expect(etaFrom(5 * MB, 0.5 * MB)).toBeCloseTo(10, 5);
  });

  it('returns null while the speed is unknown', () => {
    expect(etaFrom(5 * MB, 0)).toBeNull();
  });

  it('returns null when nothing remains', () => {
    expect(etaFrom(0, 1024)).toBeNull();
  });
});

describe('formatters', () => {
  it('formats speeds', () => {
    expect(formatSpeed(0)).toBe('—');
    expect(formatSpeed(500)).toBe('500 B/s');
    expect(formatSpeed(2048)).toBe('2 KB/s');
    expect(formatSpeed(3 * MB)).toBe('3.0 MB/s');
  });

  it('formats ETAs', () => {
    expect(formatEta(null)).toBe('');
    expect(formatEta(undefined)).toBe('');
    expect(formatEta(45.2)).toBe('46s');
    expect(formatEta(125)).toBe('2m 05s');
    expect(formatEta(3700)).toBe('1h 01m');
  });
});

describe('RESUMABLE_THRESHOLD_BYTES', () => {
  it('is 8MB — matches the server chunk size', () => {
    expect(RESUMABLE_THRESHOLD_BYTES).toBe(8 * 1024 * 1024);
  });
});
'''

# ─────────────────────────────────────────────────────────────────────────────
def main() -> None:
    created = 0
    for rel, content in FILES.items():
        if os.path.exists(rel):
            print(f"[skip] exists: {os.path.relpath(rel, ROOT)}")
            continue
        os.makedirs(os.path.dirname(rel), exist_ok=True)
        with open(rel, "w", encoding="utf-8") as f:
            f.write(content.lstrip("\n"))
        created += 1
        print(f"[create] {os.path.relpath(rel, ROOT)} ({len(content)} chars)")
    print(f"done: {created} file(s) created")

if __name__ == "__main__":
    main()
