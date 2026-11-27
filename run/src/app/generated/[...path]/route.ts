import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { Readable } from 'stream';
import type { NextRequest } from 'next/server';

/**
 * Runtime-file streaming for /generated/* — the safety net under Next's
 * static public/ serving.
 *
 * WHY THIS ROUTE EXISTS: `next start` snapshots the public/ directory at
 * SERVER START. Files written there at runtime (agent artifacts via
 * saveBinaryArtifact, generated illustrations via saveGeneratedImage, cached
 * image-search results via image-cache) 404 until the next restart —
 * discovered 2026-10-23 when freshly-cached images 404'd minutes after
 * creation (pre-build files served 200; brand-new files 404; both served 200
 * again after a restart). This catch-all app route streams any file under
 * public/generated straight from disk, so runtime-created content serves
 * immediately regardless of the static snapshot. When the static handler
 * already covers a file, whichever layer answers first serves identical
 * bytes from the same directory — no behavior change for old files.
 *
 * Security: only public/generated is reachable; traversal segments are
 * rejected; the resolved path must stay inside the generated root.
 */

const GENERATED_ROOT = path.join(process.cwd(), 'public', 'generated');

const CONTENT_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.m4a': 'audio/mp4',
  '.webm': 'video/webm',
  '.mp4': 'video/mp4',
  '.pdf': 'application/pdf',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.csv': 'text/csv; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

export async function GET(_request: NextRequest, context: { params: Promise<{ path: string[] }> }) {
  const { path: segments } = await context.params;

  // Reject traversal / absolute / empty requests before touching the disk.
  if (!segments || segments.length === 0) return new Response('Not found', { status: 404 });
  const relative = segments.join('/');
  if (relative.includes('..') || relative.includes('\\') || relative.startsWith('/') || relative.includes('\0')) {
    return new Response('Bad request', { status: 400 });
  }

  const filePath = path.join(GENERATED_ROOT, relative);
  // Defense in depth: the joined path must still resolve inside the root.
  if (!filePath.startsWith(GENERATED_ROOT + path.sep)) {
    return new Response('Bad request', { status: 400 });
  }

  let info;
  try {
    info = await stat(filePath);
  } catch {
    return new Response('Not found', { status: 404 });
  }
  if (!info.isFile()) return new Response('Not found', { status: 404 });

  const contentType = CONTENT_TYPES[path.extname(filePath).toLowerCase()] ?? 'application/octet-stream';
  // File names under /generated are content-uuid or url-hash based — a given
  // name never changes content, so aggressive immutable caching is safe.
  const stream = Readable.toWeb(createReadStream(filePath)) as ReadableStream;
  return new Response(stream, {
    status: 200,
    headers: {
      'content-type': contentType,
      'content-length': String(info.size),
      'cache-control': 'public, max-age=31536000, immutable',
    },
  });
}
