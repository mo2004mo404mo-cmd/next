/**
 * Shared helpers for the anatomy-discover API family.
 *
 * Two routes consume this:
 *   - /api/anatomy-discover/sketchfab  (fast: ~1-3s) — Sketchfab v3 search
 *   - /api/anatomy-discover/images     (slow: ~15-50s) — ZAI image search
 *
 * Splitting the sources into separate routes lets the frontend fire both
 * requests in parallel and render Sketchfab results immediately, while
 * image results stream in whenever they arrive. The old combined
 * /api/anatomy-discover route was a single bottleneck — the user saw
 * nothing until BOTH sources finished.
 */

import { createZAI } from '@/lib/zai';

// ── Types ──────────────────────────────────────────────────────────────

export interface SketchfabModelResult {
  uid: string;
  name: string;
  viewerUrl: string;
  embedUrl: string;
  thumbnailUrl: string | null;
  author: string;
  likeCount: number;
  viewCount: number;
  description: string;
  isDownloadable: boolean;
}

export interface ImageResult {
  url: string;
  caption?: string;
  source?: string;
  width?: number;
  height?: number;
}

// ── Constants ──────────────────────────────────────────────────────────

export const SKETCHFAB_SEARCH_URL = 'https://api.sketchfab.com/v3/search';

// ── Helpers ────────────────────────────────────────────────────────────

/**
 * Pick the best thumbnail URL from Sketchfab's thumbnails.images array.
 * Sketchfab returns an array of {url, width, height, uid} entries at
 * various sizes. Prefer the one closest to ~600px wide.
 */
function pickThumbnail(thumbs: unknown): string | null {
  if (!thumbs || typeof thumbs !== 'object') return null;
  const images = (thumbs as { images?: Array<{ url?: string; width?: number }> }).images;
  if (!Array.isArray(images) || images.length === 0) return null;
  const sorted = [...images].sort(
    (a, b) => Math.abs((a.width ?? 0) - 600) - Math.abs((b.width ?? 0) - 600),
  );
  return sorted[0]?.url ?? null;
}

export function buildEmbedUrl(uid: string): string {
  const params = new URLSearchParams({
    autospin: '0.2',
    autostart: '1',
    preload: '1',
    ui_infos: '1',
    ui_controls: '1',
    ui_watermark: '0',
    ui_help: '0',
    ui_settings: '1',
    ui_inspector: '1',
    ui_annotations: '1',
    ui_hint: '0',
  });
  return `https://sketchfab.com/models/${uid}/embed?${params.toString()}`;
}

/**
 * Augment the user's raw query with "anatomy" unless they already typed
 * that word. Sketchfab's search is keyword-based and not anatomy-aware —
 * a raw query like "heart chambers" matches "gun chambers" too (verified
 * empirically). Appending "anatomy" pushes the relevance rank toward
 * medical content.
 */
export function augmentQuery(query: string): string {
  const trimmed = query.trim();
  const alreadyHasAnatomy = /\banatomy\b/i.test(trimmed);
  return alreadyHasAnatomy ? trimmed : `${trimmed} anatomy`;
}

/**
 * Search Sketchfab's public model catalog. No API key required.
 * Returns up to `count` models matching `query`.
 */
export async function searchSketchfabModels(
  query: string,
  count: number,
): Promise<{ models: SketchfabModelResult[]; error?: string }> {
  const searchQ = augmentQuery(query);
  const url = new URL(SKETCHFAB_SEARCH_URL);
  url.searchParams.set('type', 'models');
  url.searchParams.set('q', searchQ);
  url.searchParams.set('count', String(Math.min(Math.max(count, 1), 24)));
  url.searchParams.set('downloadable', 'false');
  // NOTE: do NOT set sort_by=relevance — Sketchfab's explicit "relevance"
  // sort ignores popularity and surfaces 0-likes uploads. The default
  // sort (omitted param) returns popular + relevant models (verified:
  // "heart anatomy" → [Animation] Human Heart w/ 908 likes, 473k views).

  try {
    const res = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'User-Agent': 'MedQ-Anatomy-Visualizer/1.0 (medical education app)',
      },
      cache: 'no-store',
    });
    if (!res.ok) {
      return {
        models: [],
        error: `Sketchfab search returned HTTP ${res.status} ${res.statusText}`,
      };
    }
    const json: unknown = await res.json();
    const results = (json as { results?: Array<Record<string, unknown>> }).results ?? [];

    const models: SketchfabModelResult[] = results
      .map((r): SketchfabModelResult | null => {
        const uid = typeof r.uid === 'string' ? r.uid : null;
        if (!uid) return null;
        const name = typeof r.name === 'string' ? r.name : 'Untitled model';
        const viewerUrl =
          typeof r.viewerUrl === 'string'
            ? r.viewerUrl
            : `https://sketchfab.com/3d-models/${uid}`;
        const user = r.user as { displayName?: string; username?: string } | undefined;
        const author = user?.displayName || user?.username || 'Unknown';
        const likeCount = typeof r.likeCount === 'number' ? r.likeCount : 0;
        const viewCount = typeof r.viewCount === 'number' ? r.viewCount : 0;
        const description = typeof r.description === 'string' ? r.description.slice(0, 280) : '';
        const isDownloadable = Boolean(r.isDownloadable);
        const thumbnailUrl = pickThumbnail(r.thumbnails);
        return {
          uid,
          name,
          viewerUrl,
          embedUrl: buildEmbedUrl(uid),
          thumbnailUrl,
          author,
          likeCount,
          viewCount,
          description,
          isDownloadable,
        };
      })
      .filter((m): m is SketchfabModelResult => m !== null);

    return { models };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown Sketchfab fetch error';
    return { models: [], error: msg };
  }
}

/**
 * Pick the "best" model uid from a list of search results for the given
 * query. Heuristic: among models whose NAME contains a significant token
 * from the user's query, pick the one with the highest likeCount. If no
 * name matches, fall back to the highest-likeCount model overall.
 */
export function pickSuggestedModel(
  models: SketchfabModelResult[],
  query: string,
): string | undefined {
  if (models.length === 0) return undefined;
  const stop = new Set([
    'the', 'a', 'an', 'of', 'and', 'or', 'in', 'on', 'to', 'for', 'with',
    'human', 'model', '3d', 'anatomy',
  ]);
  const tokens = query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length >= 3 && !stop.has(t));

  const nameMatched = models.filter((m) => {
    const n = m.name.toLowerCase();
    return tokens.some((t) => n.includes(t));
  });

  const pool = nameMatched.length > 0 ? nameMatched : models;
  return [...pool].sort((a, b) => b.likeCount - a.likeCount)[0]?.uid;
}

/**
 * Search for medical/anatomy images via ZAI image search. Slow (~15-50s)
 * because ZAI's image search hits multiple providers under the hood.
 *
 * Calls z-ai-web-dev-sdk directly: zai.images.search.create({query, count}).
 * Response shape (defensive against SDK drift):
 *   { results?: [{ original_url?, url?, caption?, source?, original_width?, original_height? }] }
 *   — or — { data?: [...] }
 */
export async function searchAnatomyImages(
  query: string,
  system: string | undefined,
  count: number,
): Promise<{ images: ImageResult[]; error?: string }> {
  // Augment with system context + "anatomy medical illustration"
  const imageQuery = [query, system, 'anatomy medical illustration']
    .filter(Boolean)
    .join(' ');

  try {
    const zai = await createZAI();
    const result: any = await zai.images.search.create({
      query: imageQuery,
      count: Math.min(Math.max(count, 1), 12),
    });

    // Normalize the response into an array of { url, caption? } items
    const rawResults: any[] =
      (result as any)?.results || (result as any)?.data || [];
    const images: ImageResult[] = rawResults
      .map((r: any) => ({
        url: r.original_url || r.url || '',
        caption: r.caption || undefined,
        source: r.source || undefined,
        width: r.original_width || undefined,
        height: r.original_height || undefined,
      }))
      .filter((r) => r.url);

    return { images };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown image search error';
    return { images: [], error: msg };
  }
}
