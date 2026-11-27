/**
 * Local image cache for search_medical_images results.
 *
 * Why: image-search results are hotlinked from external sites (Anatomy.app,
 * Dreamstime, Quizlet, Getty…). Those URLs rot — sites move pages, CDNs expire
 * tokens, hotlink protection kicks in — and every broken URL means a blank
 * image in a student's chat. This module downloads the TOP results to
 * public/generated/imgcache and serves them locally, keyed by a hash of the
 * original URL (dedup across queries).
 *
 * Behavior:
 *   • Best-effort and never throws: an image that fails to download keeps
 *     cachedUrl = null and the caller falls back to the original URL.
 *   • Content-type must be image/*; responses over MAX_BYTES are rejected.
 *   • LRU eviction: when the cache exceeds MAX_FILES, the oldest files by
 *     mtime are deleted (mtime is touched on cache hits).
 */
import { createHash } from 'crypto';
import { mkdir, readdir, stat, unlink, utimes, writeFile } from 'fs/promises';
import path from 'path';
import { withGatewaySlot } from '@/lib/ai/resilience';

const CACHE_DIR = path.join(process.cwd(), 'public', 'generated', 'imgcache');
const PUBLIC_PREFIX = '/generated/imgcache';
const MAX_FILES = 300;
const MAX_BYTES = 8 * 1024 * 1024;
const FETCH_TIMEOUT_MS = 8_000;
/** Extensions we accept, in preference order for the content-type sniff. */
const CONTENT_TYPE_EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
  'image/svg+xml': 'svg',
};

export interface CacheableImage {
  imageUrl: string;
  caption?: string;
  source?: string;
}

export interface CachedImage {
  /** The original remote URL — keep for attribution and fallback. */
  imageUrl: string;
  /** Local /generated/imgcache/... URL, or null when caching failed. */
  cachedUrl: string | null;
  caption?: string;
  source?: string;
}

function hashUrl(url: string): string {
  return createHash('sha1').update(url).digest('hex').slice(0, 16);
}

/** All extensions we may have written for this hash (hit check). */
function candidateExtensions(): string[] {
  return [...new Set(Object.values(CONTENT_TYPE_EXT))];
}

async function findExisting(hash: string): Promise<string | null> {
  const { access } = await import('fs/promises');
  for (const ext of candidateExtensions()) {
    const file = path.join(CACHE_DIR, `${hash}.${ext}`);
    try {
      await access(file);
      // Touch mtime so LRU eviction sees this as recently used.
      const now = new Date();
      await utimes(file, now, now).catch(() => undefined);
      return `${PUBLIC_PREFIX}/${hash}.${ext}`;
    } catch {
      // Not cached with this extension — keep looking.
    }
  }
  return null;
}

async function evictIfNeeded(): Promise<void> {
  try {
    const names = (await readdir(CACHE_DIR)).filter((name) => !name.startsWith('.'));
    if (names.length <= MAX_FILES) return;
    const entries = await Promise.all(
      names.map(async (name) => {
        try {
          const info = await stat(path.join(CACHE_DIR, name));
          return { name, mtime: info.mtimeMs };
        } catch {
          return { name, mtime: Number.MAX_SAFE_INTEGER };
        }
      }),
    );
    entries.sort((a, b) => a.mtime - b.mtime);
    const excess = entries.length - MAX_FILES;
    await Promise.all(
      entries.slice(0, excess).map((entry) => unlink(path.join(CACHE_DIR, entry.name)).catch(() => undefined)),
    );
  } catch {
    // Eviction is best-effort housekeeping.
  }
}

async function cacheOne(imageUrl: string): Promise<string | null> {
  if (!/^https?:\/\//i.test(imageUrl)) return null;
  const hash = hashUrl(imageUrl);
  const existing = await findExisting(hash);
  if (existing) return existing;

  try {
    // The download itself goes through the gateway slot so a burst of image
    // searches doesn't saturate sockets; retry is unnecessary here (a dead
    // URL stays dead), so plain slot + single attempt.
    const buffer = await withGatewaySlot(async () => {
      const response = await fetch(imageUrl, {
        signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; MedQAgent/1.0; +education)' },
        redirect: 'follow',
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const contentType = (response.headers.get('content-type') ?? '').split(';')[0].trim().toLowerCase();
      const ext = CONTENT_TYPE_EXT[contentType];
      if (!ext) throw new Error(`Unsupported content-type: ${contentType || 'unknown'}`);
      const declaredLength = parseInt(response.headers.get('content-length') ?? '', 10);
      if (!Number.isNaN(declaredLength) && declaredLength > MAX_BYTES) throw new Error('Image too large');
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length === 0 || bytes.length > MAX_BYTES) throw new Error('Image too large or empty');
      await mkdir(CACHE_DIR, { recursive: true });
      await writeFile(path.join(CACHE_DIR, `${hash}.${ext}`), bytes);
      return `${PUBLIC_PREFIX}/${hash}.${ext}`;
    });
    return buffer;
  } catch {
    return null;
  }
}

/**
 * Cache the top `maxN` images locally. Never throws; per-image failures
 * return cachedUrl: null (the caller embeds the original URL as fallback).
 */
export async function cacheRemoteImages(items: CacheableImage[], maxN = 4): Promise<CachedImage[]> {
  const top = items.filter((item) => typeof item?.imageUrl === 'string' && item.imageUrl).slice(0, maxN);
  const results = await Promise.all(
    top.map(async (item): Promise<CachedImage> => ({
      imageUrl: item.imageUrl,
      cachedUrl: await cacheOne(item.imageUrl),
      caption: item.caption,
      source: item.source,
    })),
  );
  void evictIfNeeded();
  return results;
}
