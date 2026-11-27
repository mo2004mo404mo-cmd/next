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
