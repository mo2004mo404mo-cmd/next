/**
 * Cached server-side data fetchers for SSR pages.
 *
 * This module composes `cachedFetch0` (from `@/lib/server/cache`) with the
 * Prisma data layer to give SSR pages a one-line way to fetch cached data
 * that's automatically invalidated when the underlying data changes.
 *
 * ─── Why this exists ───
 *
 * Before this module, every SSR page in src/app/<tab>/page.tsx fetched its
 * data via `fetch('/api/...')` with `cache: 'no-store'`. That had three
 * problems:
 *
 *   1. **No caching** — every page hit re-ran the DB query, even for
 *      rarely-changing content like the question bank catalog.
 *   2. **HTTP round-trip** — the SSR page made an HTTP request to its own
 *      API route, adding ~5-20ms of latency per page load.
 *   3. **No invalidation** — even if you wanted to cache, there was no
 *      `revalidateTag` call on the write path, so cached data would go
 *      stale silently.
 *
 * This module fixes all three:
 *
 *   1. `unstable_cache` caches the fetcher result for 60s by default.
 *   2. The fetcher calls Prisma directly — no HTTP round-trip.
 *   3. The write paths in `/api/questions/route.ts` call `invalidate(
 *      CACHE_TAGS.questions)` on POST/DELETE, busting the cache instantly.
 *
 * ─── Usage ───
 *
 *   // src/app/bank/page.tsx
 *   import { getBankCatalog } from '@/lib/server/ssr-data';
 *   const data = await getBankCatalog();    // ← cached, fast, auto-invalidated
 *
 *   // src/app/api/questions/route.ts (POST handler)
 *   import { invalidate, CACHE_TAGS } from '@/lib/server/cache';
 *   await db.question.create({ ... });
 *   await invalidate(CACHE_TAGS.questions);   // ← busts the SSR cache
 */

import { db } from '@/lib/db';
import { cachedFetch, cachedFetch0, CACHE_TAGS } from '@/lib/server/cache';
import { normalizeDifficulty, getDifficultyLevel } from '@/lib/medq-types';

// ─────────────────────────────────────────────────────────────────────────
// Types — mirror the /api/questions response shape for backward compat
// ─────────────────────────────────────────────────────────────────────────

export interface BankQuestionDTO {
  id: string;
  type: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  mnemonic: string;
  clinicalPearl: string;
  distractorAnalysis: string;
  difficulty: string;
  difficultyLevel: number;
  system: string;
  topic: string;
  tags: string[];
  isAIGenerated: boolean;
  sources: string;
  illustrationDescription?: string;
  organInvolvement?: string;
  mechanismDiagram?: string;
  visualSummary?: string;
  diagramSpec?: string;
  molecularScenes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BankCatalogResult {
  questions: BankQuestionDTO[];
  total: number;
  page: number;
  totalPages: number;
}

// ─────────────────────────────────────────────────────────────────────────
// Helpers — row → DTO (mirrors the legacy /api/questions response shape)
// ─────────────────────────────────────────────────────────────────────────

type QuestionRow = {
  id: string;
  type: string;
  text: string;
  options: string;
  answer: string;
  explanation: string;
  mnemonic: string;
  clinicalPearl: string;
  distractorAnalysis: string;
  difficulty: string;
  system: string;
  topic: string;
  tags: string;
  isAIGenerated: boolean;
  diagramSpec: string | null;
  molecularScenes: string | null;
  sources: string | null;
  illustrationDescription: string | null;
  organInvolvement: string | null;
  mechanismDiagram: string | null;
  visualSummary: string | null;
  createdAt: Date;
  updatedAt: Date;
};

function safeParse<T>(value: string | null | undefined, fallback: T): T {
  if (!value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

function rowToDTO(row: QuestionRow): BankQuestionDTO {
  return {
    id: row.id,
    type: row.type,
    text: row.text,
    options: safeParse<string[]>(row.options, []),
    answer: row.answer,
    explanation: row.explanation,
    mnemonic: row.mnemonic,
    clinicalPearl: row.clinicalPearl,
    distractorAnalysis: row.distractorAnalysis,
    difficulty: normalizeDifficulty(row.difficulty || 'Moderate'),
    difficultyLevel: getDifficultyLevel(normalizeDifficulty(row.difficulty || 'Moderate')),
    system: row.system,
    topic: row.topic,
    tags: safeParse<string[]>(row.tags, []),
    isAIGenerated: row.isAIGenerated,
    sources: row.sources || '[]',
    illustrationDescription: row.illustrationDescription || undefined,
    organInvolvement: row.organInvolvement || undefined,
    mechanismDiagram: row.mechanismDiagram || undefined,
    visualSummary: row.visualSummary || undefined,
    diagramSpec: row.diagramSpec || undefined,
    molecularScenes: row.molecularScenes || undefined,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  };
}

// ─────────────────────────────────────────────────────────────────────────
// Cached fetchers
//
// Each fetcher is wrapped in `cachedFetch0` with a versioned key. Bump the
// version (e.g. `:v1` → `:v2`) to force a full re-cache after a shape change.
// ─────────────────────────────────────────────────────────────────────────

/**
 * Fetch the first page of the question bank for the /bank SSR catalog.
 *
 * Cached for 60s by default, invalidated immediately on question
 * create/delete via `revalidateTag('questions')`.
 */
export const getBankCatalog = cachedFetch0(
  'bank-catalog:v1',
  async (): Promise<BankCatalogResult> => {
    const page = 1;
    const limit = 20;

    const [rows, total] = await Promise.all([
      db.question.findMany({
        where: {},
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
      }) as Promise<QuestionRow[]>,
      db.question.count({ where: {} }),
    ]);

    return {
      questions: rows.map(rowToDTO),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },
  { tags: [CACHE_TAGS.questions], revalidate: 60 }
);

/**
 * Fetch a single question by id for SSR rendering.
 *
 * Cached indefinitely (only invalidated by tag) — individual questions
 * rarely change, and when they do, `revalidateTag('questions')` busts
 * this cache along with the catalog.
 *
 * Note: `unstable_cache` serializes the args as part of the cache key,
 * so each id gets its own cache entry. The `cachedFetch` wrapper handles
 * this correctly — the id is passed as an argument, not closed over.
 */
export const getQuestionById = cachedFetch(
  'question-by-id:v1',
  async (id: string): Promise<BankQuestionDTO | null> => {
    const row = (await db.question.findUnique({ where: { id } })) as QuestionRow | null;
    return row ? rowToDTO(row) : null;
  },
  { tags: [CACHE_TAGS.questions, CACHE_TAGS.questionById], revalidate: false }
);
