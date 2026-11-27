#!/usr/bin/env python3
"""
Stage 13 — resumable chunked uploads (SERVER side).

Creates (idempotent):
  - src/lib/uploads/upload-session-store.ts   disk-backed upload sessions
  - src/app/api/uploads/route.ts              POST   init (tier-capped)
  - src/app/api/uploads/[uploadId]/route.ts   GET    status (for resume)
  - src/app/api/uploads/[uploadId]/chunks/[index]/route.ts  PUT chunk
  - src/app/api/uploads/[uploadId]/complete/route.ts        POST assemble

Run from anywhere: paths are resolved from the project root below.
"""
import os

ROOT = "/tmp/my-project"

FILES = {}

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/lib/uploads/upload-session-store.ts")] = r'''
/**
 * upload-session-store.ts — disk-backed RESUMABLE upload sessions (Stage 13).
 *
 * Problem being solved: uploads used to be ONE multipart POST. A large file
 * (15–100 MB) that stalled mid-transfer died with the connection — the user
 * lost everything and had to restart from byte zero. Refreshing the page was
 * just as fatal.
 *
 * Design: the client opens a session, sends the file in idempotent chunks,
 * and can ask the server at any moment "which chunks do you already have?"
 * so a reconnect/refresh/re-pick resumes from the last confirmed chunk.
 *
 *   POST   /api/uploads                        open a session (tier-capped)
 *   PUT    /api/uploads/:id/chunks/:n          idempotent chunk upload
 *   GET    /api/uploads/:id                    status → which chunks landed
 *   POST   /api/uploads/:id/complete           assemble + verify size
 *
 * Consumers (/api/extract, /api/knowledge/upload) then reference the
 * ASSEMBLED bytes by uploadId — no second full transfer.
 *
 * Store layout (sibling of the existing file-store / audio-store):
 *
 *   upload/upload-sessions/<uploadId>/
 *     manifest.json     session manifest (atomic tmp+rename writes)
 *     chunk-<n>         raw chunk bytes (removed after assembly)
 *     file.bin          assembled file (source of truth once complete)
 *
 * Security:
 *   - ids are UUIDs and validated with a strict hex pattern before ANY
 *     filesystem use (path traversal is structurally impossible)
 *   - sessions are owner-scoped (userId bound at init, checked on every
 *     operation); foreign sessions answer exactly like missing ones (404,
 *     no existence leak)
 *   - sizes are enforced THREE times: at init (tier cap), per chunk
 *     (byte-exact expected size), and at assembly (total must match)
 *
 * Sessions are swept after 24h (MEDQ_UPLOAD_SESSION_MAX_AGE_MS) — they are
 * transport artifacts, not data. The knowledge-ingest consumer deletes the
 * session as soon as ingestion succeeds.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export interface UploadSessionManifest {
  id: string;
  userId: string;
  fileName: string;
  mimeType: string;
  /** Exact declared total size in bytes. */
  size: number;
  chunkSize: number;
  totalChunks: number;
  receivedChunks: number[];
  receivedBytes: number;
  status: 'open' | 'complete';
  createdAt: number;
  updatedAt: number;
}

/** Public, client-safe view of a session (no userId). */
export interface UploadSessionStatus {
  uploadId: string;
  fileName: string;
  mimeType: string;
  size: number;
  chunkSize: number;
  totalChunks: number;
  receivedChunks: number[];
  receivedBytes: number;
  /** Chunk indexes the server still needs — the client resumes from here. */
  missingChunks: number[];
  status: 'open' | 'complete';
}

export type UploadSessionErrorCode =
  | 'not_found'
  | 'too_large'
  | 'bad_request'
  | 'bad_index'
  | 'chunk_size_mismatch'
  | 'already_complete'
  | 'incomplete'
  | 'size_mismatch';

/** Typed store error — routes map `code` to an HTTP status. */
export class UploadSessionError extends Error {
  readonly code: UploadSessionErrorCode;
  constructor(code: UploadSessionErrorCode, message: string) {
    super(message);
    this.name = 'UploadSessionError';
    this.code = code;
  }
}

/** Strict UUID-ish hex pattern — anything else is rejected before fs use. */
const UPLOAD_ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
export function isUploadId(id: string): boolean {
  return typeof id === 'string' && UPLOAD_ID_RE.test(id);
}

/** 8 MB chunks: big enough for throughput, small enough that a stall costs
 *  one chunk, not the upload. (Client-side uploads are also capped at 8 MB
 *  per request, which keeps memory flat on the server.) */
export const DEFAULT_CHUNK_BYTES = 8 * 1024 * 1024;
const MIN_CHUNK_BYTES = 512 * 1024;
const MAX_TOTAL_CHUNKS = 4096;
const MAX_FILE_NAME_LENGTH = 255;
export const DEFAULT_MAX_AGE_MS = 24 * 60 * 60 * 1000;

function chunkSizeFor(size: number): number {
  return Math.max(MIN_CHUNK_BYTES, Math.min(DEFAULT_CHUNK_BYTES, Math.max(1, size)));
}

export function totalChunksFor(size: number, chunkSize: number): number {
  if (!Number.isFinite(size) || size <= 0 || !Number.isFinite(chunkSize) || chunkSize <= 0) return 0;
  return Math.max(1, Math.ceil(size / chunkSize));
}

/** Exact byte length chunk `index` must have, or -1 when out of range. */
export function expectedChunkSize(size: number, chunkSize: number, index: number): number {
  const start = index * chunkSize;
  if (!Number.isInteger(index) || index < 0 || start >= size) return -1;
  return Math.min(chunkSize, size - start);
}

/** Indexes in [0, totalChunks) that are NOT in `received`. */
export function missingChunkIndexes(received: number[] | Set<number>, totalChunks: number): number[] {
  const set = received instanceof Set ? received : new Set(received);
  const missing: number[] = [];
  for (let i = 0; i < totalChunks; i++) {
    if (!set.has(i)) missing.push(i);
  }
  return missing;
}

function toStatus(m: UploadSessionManifest): UploadSessionStatus {
  return {
    uploadId: m.id,
    fileName: m.fileName,
    mimeType: m.mimeType,
    size: m.size,
    chunkSize: m.chunkSize,
    totalChunks: m.totalChunks,
    receivedChunks: [...m.receivedChunks],
    receivedBytes: m.receivedBytes,
    missingChunks: missingChunkIndexes(m.receivedChunks, m.totalChunks),
    status: m.status,
  };
}

export interface UploadStoreInitInput {
  userId: string;
  fileName: string;
  mimeType?: string;
  /** Declared total size in bytes. */
  size: number;
  /** Caller-enforced cap (tier / absolute) — enforced again here. */
  maxBytes: number;
  chunkSize?: number;
}

export interface AssembledUpload {
  uploadId: string;
  fileName: string;
  mimeType: string;
  size: number;
}

/**
 * Create a store bound to a directory. The app uses the default singleton
 * below; tests pass their own tmpdir.
 */
export function createUploadStore(rootDir: string) {
  const root = rootDir;
  const dirFor = (id: string) => path.join(root, id);
  const manifestPath = (id: string) => path.join(root, id, 'manifest.json');
  const chunkPath = (id: string, index: number) => path.join(root, id, `chunk-${index}`);
  const assembledPath = (id: string) => path.join(root, id, 'file.bin');

  function readManifest(id: string): UploadSessionManifest | null {
    if (!isUploadId(id)) return null;
    try {
      const raw = fs.readFileSync(manifestPath(id), 'utf8');
      const m = JSON.parse(raw) as UploadSessionManifest;
      if (!m || typeof m !== 'object' || m.id !== id) return null;
      return m;
    } catch {
      return null;
    }
  }

  function writeManifest(m: UploadSessionManifest): void {
    fs.mkdirSync(dirFor(m.id), { recursive: true });
    const tmp = `${manifestPath(m.id)}.tmp`;
    fs.writeFileSync(tmp, JSON.stringify(m, null, 2));
    fs.renameSync(tmp, manifestPath(m.id));
  }

  /** Open a new session. Throws UploadSessionError on invalid input / oversize. */
  function init(input: UploadStoreInitInput): UploadSessionStatus {
    if (!input || typeof input.fileName !== 'string' || !input.fileName.trim()) {
      throw new UploadSessionError('bad_request', 'fileName is required');
    }
    const fileName = input.fileName.trim().slice(0, MAX_FILE_NAME_LENGTH);
    const size = input.size;
    if (!Number.isInteger(size) || size <= 0) {
      throw new UploadSessionError('bad_request', 'size must be a positive integer (byte count)');
    }
    if (size > input.maxBytes) {
      throw new UploadSessionError(
        'too_large',
        `File exceeds the upload cap of ${Math.round(input.maxBytes / 1024 / 1024)}MB`,
      );
    }
    const chunkSize = Math.max(1, input.chunkSize ?? chunkSizeFor(size));
    const totalChunks = totalChunksFor(size, chunkSize);
    if (totalChunks < 1 || totalChunks > MAX_TOTAL_CHUNKS) {
      throw new UploadSessionError('bad_request', 'File needs too many chunks — increase the chunk size');
    }
    const now = Date.now();
    const m: UploadSessionManifest = {
      id: crypto.randomUUID(),
      userId: input.userId,
      fileName,
      mimeType: typeof input.mimeType === 'string' ? input.mimeType.slice(0, MAX_FILE_NAME_LENGTH) : '',
      size,
      chunkSize,
      totalChunks,
      receivedChunks: [],
      receivedBytes: 0,
      status: 'open',
      createdAt: now,
      updatedAt: now,
    };
    fs.mkdirSync(dirFor(m.id), { recursive: true });
    writeManifest(m);
    return toStatus(m);
  }

  /** Fetch a session's public status. Foreign sessions look exactly like
   *  missing ones (null) — no existence leak. */
  function get(id: string, userId?: string): UploadSessionStatus | null {
    const m = readManifest(id);
    if (!m) return null;
    if (userId !== undefined && m.userId !== userId) return null;
    return toStatus(m);
  }

  /** Store one chunk. Idempotent: re-PUTting a received chunk is a no-op. */
  function saveChunk(id: string, userId: string, index: number, buf: Buffer): UploadSessionStatus {
    const m = readManifest(id);
    if (!m || m.userId !== userId) throw new UploadSessionError('not_found', 'Upload session not found');
    if (m.status === 'complete') {
      throw new UploadSessionError('already_complete', 'Upload already completed');
    }
    if (!Number.isInteger(index) || index < 0 || index >= m.totalChunks) {
      throw new UploadSessionError('bad_index', `Chunk index out of range (0..${m.totalChunks - 1})`);
    }
    const expected = expectedChunkSize(m.size, m.chunkSize, index);
    if (buf.length !== expected) {
      throw new UploadSessionError(
        'chunk_size_mismatch',
        `Chunk ${index} must be exactly ${expected} bytes (got ${buf.length})`,
      );
    }
    if (m.receivedChunks.includes(index)) return toStatus(m); // idempotent
    const tmp = `${chunkPath(id, index)}.tmp`;
    fs.writeFileSync(tmp, buf);
    fs.renameSync(tmp, chunkPath(id, index));
    m.receivedChunks = [...m.receivedChunks, index].sort((a, b) => a - b);
    m.receivedBytes += buf.length;
    m.updatedAt = Date.now();
    writeManifest(m);
    return toStatus(m);
  }

  /** Assemble all chunks into file.bin and verify the byte count. */
  function assemble(id: string, userId: string): AssembledUpload {
    const m = readManifest(id);
    if (!m || m.userId !== userId) throw new UploadSessionError('not_found', 'Upload session not found');
    if (m.status === 'complete') {
      return { uploadId: m.id, fileName: m.fileName, mimeType: m.mimeType, size: m.size };
    }
    const missing = missingChunkIndexes(m.receivedChunks, m.totalChunks);
    if (missing.length > 0) {
      const shown = missing.slice(0, 8).join(', ');
      throw new UploadSessionError(
        'incomplete',
        `Upload incomplete — missing ${missing.length} chunk(s): ${shown}${missing.length > 8 ? '…' : ''}`,
      );
    }
    const out = assembledPath(id);
    const tmp = `${out}.tmp`;
    const fd = fs.openSync(tmp, 'w');
    try {
      for (let i = 0; i < m.totalChunks; i++) {
        const data = fs.readFileSync(chunkPath(id, i));
        fs.writeSync(fd, data);
      }
    } finally {
      fs.closeSync(fd);
    }
    const written = fs.statSync(tmp).size;
    if (written !== m.size) {
      fs.rmSync(tmp, { force: true });
      throw new UploadSessionError('size_mismatch', `Assembled file is ${written} bytes, expected ${m.size}`);
    }
    fs.renameSync(tmp, out);
    m.status = 'complete';
    m.updatedAt = Date.now();
    writeManifest(m);
    // The chunks are baked into file.bin — reclaim the duplicate bytes.
    for (let i = 0; i < m.totalChunks; i++) {
      try {
        fs.rmSync(chunkPath(id, i), { force: true });
      } catch {
        /* best-effort */
      }
    }
    return { uploadId: m.id, fileName: m.fileName, mimeType: m.mimeType, size: m.size };
  }

  /** Read the assembled bytes back (owner-only, complete sessions only). */
  function readAssembled(
    id: string,
    userId: string,
  ): { buffer: Buffer; fileName: string; mimeType: string; size: number } | null {
    const m = readManifest(id);
    if (!m || m.userId !== userId || m.status !== 'complete') return null;
    try {
      const buffer = fs.readFileSync(assembledPath(id));
      if (buffer.length !== m.size) return null;
      return { buffer, fileName: m.fileName, mimeType: m.mimeType, size: m.size };
    } catch {
      return null;
    }
  }

  /** Delete a session (owner-scoped when userId is given). Best-effort. */
  function remove(id: string, userId?: string): void {
    const m = readManifest(id);
    if (!m) return;
    if (userId !== undefined && m.userId !== userId) return;
    try {
      fs.rmSync(dirFor(id), { recursive: true, force: true });
    } catch {
      /* best-effort */
    }
  }

  /** Drop sessions whose directory hasn't been touched within maxAgeMs. */
  function sweep(maxAgeMs: number = DEFAULT_MAX_AGE_MS): number {
    let entries: string[] = [];
    try {
      entries = fs.readdirSync(root);
    } catch {
      return 0;
    }
    const cutoff = Date.now() - maxAgeMs;
    let removed = 0;
    for (const entry of entries) {
      try {
        const full = path.join(root, entry);
        const st = fs.statSync(full);
        if (st.isDirectory() && st.mtimeMs < cutoff) {
          fs.rmSync(full, { recursive: true, force: true });
          removed += 1;
        }
      } catch {
        /* skip unreadable entries */
      }
    }
    return removed;
  }

  return { rootDir: root, init, get, saveChunk, assemble, readAssembled, remove, sweep };
}

const UPLOAD_SESSION_ROOT =
  process.env.MEDQ_UPLOAD_SESSION_DIR || path.join(process.cwd(), 'upload', 'upload-sessions');

/** App-wide singleton (tests create their own with createUploadStore). */
export const uploadStore = createUploadStore(UPLOAD_SESSION_ROOT);
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/app/api/uploads/route.ts")] = r'''
/**
 * POST /api/uploads — open a resumable upload session (Stage 13).
 *
 * Body: { fileName, size, mimeType } → { uploadId, chunkSize, totalChunks,
 * receivedChunks: [], missingChunks, maxBytes }
 *
 * The caller's tier cap is applied HERE, up front, so a visitor can never
 * open a 100 MB session and discover the cap after uploading 98 MB (the old
 * UX failure mode). Chunk PUTs then only validate chunk shape.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, DEFAULT_MAX_AGE_MS } from '@/lib/uploads/upload-session-store';
import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';
import { createLogger } from '@/lib/logger';

const log = createLogger('ApiUploads');

export const runtime = 'nodejs';

// Absolute ceiling across all tiers — parity with /api/extract (Stage 10).
const ABSOLUTE_MAX_BYTES = 100 * 1024 * 1024;

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const body = await req.json().catch(() => null) as
    | { fileName?: unknown; size?: unknown; mimeType?: unknown }
    | null;
  if (!body || typeof body !== 'object') {
    return badRequest('Expected a JSON body: { fileName, size, mimeType }');
  }

  const tier = await resolveAccessTier(userId);
  const tierConfig = thresholdFor(tier);
  const maxBytes = Math.min(tierConfig.fileUploadMaxMb * 1024 * 1024, ABSOLUTE_MAX_BYTES);

  try {
    const session = uploadStore.init({
      userId,
      fileName: typeof body.fileName === 'string' ? body.fileName : '',
      mimeType: typeof body.mimeType === 'string' ? body.mimeType : '',
      size: typeof body.size === 'number' ? body.size : -1,
      maxBytes,
    });
    // Opportunistic hygiene — never blocks the response.
    try {
      uploadStore.sweep(DEFAULT_MAX_AGE_MS);
    } catch {
      /* best-effort */
    }
    log.info?.(
      `session ${session.uploadId} opened: "${session.fileName}" ${session.size}B in ` +
      `${session.totalChunks} chunks (cap ${Math.round(maxBytes / 1024 / 1024)}MB) by ${userId}`,
    );
    return NextResponse.json({ ...session, maxBytes });
  } catch (error) {
    if (error instanceof UploadSessionError) {
      const hint =
        error.code === 'too_large' && tierConfig.isAnonymous
          ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
          : '';
      return NextResponse.json({ error: `${error.message}${hint}`, code: error.code }, {
        status: error.code === 'too_large' ? 413 : 400,
      });
    }
    throw error;
  }
});
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/app/api/uploads/[uploadId]/route.ts")] = r'''
/**
 * GET /api/uploads/:uploadId — session status (Stage 13).
 *
 * The resume primitive: reports which chunks the server already holds, so a
 * client that reconnected, refreshed, or re-picked the same file skips them.
 * Foreign sessions are indistinguishable from missing ones (404).
 */

import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore } from '@/lib/uploads/upload-session-store';

export const runtime = 'nodejs';

export const GET = withErrorHandler<{ uploadId: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const session = uploadStore.get(ctx.params.uploadId, userId);
  if (!session) {
    return NextResponse.json({ error: 'Upload session not found' }, { status: 404 });
  }
  return NextResponse.json(session);
});
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/app/api/uploads/[uploadId]/chunks/[index]/route.ts")] = r'''
/**
 * PUT /api/uploads/:uploadId/chunks/:index — one idempotent chunk (Stage 13).
 *
 * Raw binary body (application/octet-stream). The expected byte length is
 * derived from the session manifest (chunkSize / total size), so the
 * assembled file can never exceed the declared, tier-capped size.
 *
 * Re-PUTting an already-received chunk is a 200 no-op — that is exactly what
 * makes retries and resumes safe.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, type UploadSessionErrorCode } from '@/lib/uploads/upload-session-store';

export const runtime = 'nodejs';

function statusForCode(code: UploadSessionErrorCode): number {
  switch (code) {
    case 'not_found':
      return 404; // foreign session looks like a missing one — no leak
    case 'too_large':
    case 'chunk_size_mismatch':
      return 413;
    case 'already_complete':
      return 409;
    case 'bad_index':
    case 'bad_request':
      return 400;
    default:
      return 400;
  }
}

export const PUT = withErrorHandler<{ uploadId: string; index: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  const raw = ctx.params.index;
  if (!/^[0-9]{1,6}$/.test(raw)) return badRequest('Invalid chunk index');
  const index = Number(raw);

  const buf = Buffer.from(await req.arrayBuffer());

  try {
    const status = uploadStore.saveChunk(ctx.params.uploadId, userId, index, buf);
    return NextResponse.json(status);
  } catch (error) {
    if (error instanceof UploadSessionError) {
      return NextResponse.json({ error: error.message, code: error.code }, {
        status: statusForCode(error.code),
      });
    }
    throw error;
  }
});
'''

# ─────────────────────────────────────────────────────────────────────────────
FILES[os.path.join(ROOT, "src/app/api/uploads/[uploadId]/complete/route.ts")] = r'''
/**
 * POST /api/uploads/:uploadId/complete — assemble + verify (Stage 13).
 *
 * Concatenates the chunks in order, verifies the byte count against the
 * declared size, and flips the session to `complete`. After this, consumers
 * (/api/extract, /api/knowledge/upload) process the file BY REFERENCE via
 * the uploadId form field — no second full transfer.
 */

import { NextResponse } from 'next/server';
import { resolveUserId, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { uploadStore, UploadSessionError, type UploadSessionErrorCode } from '@/lib/uploads/upload-session-store';
import { createLogger } from '@/lib/logger';

const log = createLogger('ApiUploads');

export const runtime = 'nodejs';

function statusForCode(code: UploadSessionErrorCode): number {
  switch (code) {
    case 'not_found':
      return 404;
    case 'incomplete':
    case 'already_complete':
      return 409;
    case 'size_mismatch':
      return 500;
    default:
      return 400;
  }
}

export const POST = withErrorHandler<{ uploadId: string }>(async (req, ctx) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to upload files');

  try {
    const done = uploadStore.assemble(ctx.params.uploadId, userId);
    log.info?.(`session ${done.uploadId} complete: "${done.fileName}" ${done.size}B by ${userId}`);
    return NextResponse.json(done);
  } catch (error) {
    if (error instanceof UploadSessionError) {
      return NextResponse.json({ error: error.message, code: error.code }, {
        status: statusForCode(error.code),
      });
    }
    throw error;
  }
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
