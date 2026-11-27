/**
 * knowledge/video-scenes.ts — VideoScene persistence + retrieval (Stage 3).
 *
 * The temporal index of ingested videos: one row per scene (ffmpeg
 * scene-cut boundary or even-window fallback), each carrying
 *   - the VLM description of its representative frame,
 *   - the ASR transcript segments that fall inside its span,
 *   - an embedding of (description + transcript) for semantic search.
 *
 * Retrieval (searchVideoScenes) is deliberately application-layer cosine
 * over owner-scoped rows — the Stage 5 spike decision (pgvector is not
 * installable on the embedded PG; brute force is ≤35 ms even at 100k
 * vectors, and scene counts per user are far below that).
 *
 * Questions cite scenes via (videoSourceId, videoSceneStart,
 * videoSceneEnd) on the Question model — the mediaTimeSec data model.
 */

import { db } from '@/lib/db';
import { createLogger } from '@/lib/logger';
import { getEmbeddings, serializeVector, deserializeVector, cosineSimilarity } from './embeddings';
import { fmtSec } from './scene-detect';
import type { SceneDetection } from './scene-detect';

const log = createLogger('VideoScenes');

// ─── Types ─────────────────────────────────────────────────────────────────

/** Scene payload produced by extraction (ingest-media) → persisted here. */
export interface VideoSceneInput {
  sceneIdx: number;
  startSec: number;
  endSec: number;
  description: string;
  transcript: string;
  detection: SceneDetection;
}

export interface VideoSceneHit {
  sceneId: string;
  sourceId: string;
  sourceName: string;
  sceneIdx: number;
  startSec: number;
  endSec: number;
  detection: SceneDetection;
  description: string;
  transcript: string;
  /** Query similarity (cosine, 0..1 clamped for display). */
  score: number;
}

// ─── Persistence ───────────────────────────────────────────────────────────

/**
 * Embed + persist scenes for a source. Idempotent: existing rows for the
 * source are deleted first (re-ingest / retry replaces the timeline).
 * Never throws to the caller — a scene-index failure must not fail the
 * ingestion itself (the flattened transcript document is still indexed).
 */
export async function persistVideoScenes(
  sourceId: string,
  scenes: VideoSceneInput[],
): Promise<number> {
  const usable = (scenes ?? []).filter(
    (s) => Number.isFinite(s.startSec) && Number.isFinite(s.endSec) && s.endSec > s.startSec,
  );
  if (usable.length === 0) return 0;

  try {
    const embeddings = await getEmbeddings();
    const inputs = usable.map((s) =>
      `${s.description ? s.description + '\n' : ''}${s.transcript}`.trim() || 'video scene',
    );
    const vectors = await embeddings.embed(inputs);

    await db.videoScene.deleteMany({ where: { sourceId } });
    await db.videoScene.createMany({
      data: usable.map((s, i) => ({
        sourceId,
        sceneIdx: s.sceneIdx,
        startSec: s.startSec,
        endSec: s.endSec,
        detection: s.detection,
        description: (s.description || '').slice(0, 4000),
        transcript: (s.transcript || '').slice(0, 12_000),
        embedding: serializeVector(vectors[i]),
        embeddingModel: embeddings.id,
      })),
    });
    log.info?.(`persisted ${usable.length} scenes for source ${sourceId} (${embeddings.id})`);
    return usable.length;
  } catch (error) {
    log.warn?.(`scene persistence failed for ${sourceId}: ${error instanceof Error ? error.message : error}`);
    return 0;
  }
}

// ─── Retrieval ─────────────────────────────────────────────────────────────

/** All scenes of one source (owner-gated), timeline order — powers the
 *  analyze_library_video sceneTimeline without any VLM re-run. */
export async function listVideoScenes(
  userId: string,
  sourceId: string,
): Promise<VideoSceneHit[]> {
  const rows = await db.videoScene.findMany({
    where: { sourceId, source: { userId, status: 'ready' } },
    orderBy: { sceneIdx: 'asc' },
    take: 120,
  });
  const names = await db.knowledgeSource.findMany({
    where: { id: sourceId, userId },
    select: { id: true, name: true },
  });
  const sourceName = names[0]?.name ?? 'video';
  return rows.map((r) => ({
    sceneId: r.id,
    sourceId: r.sourceId,
    sourceName,
    sceneIdx: r.sceneIdx,
    startSec: r.startSec,
    endSec: r.endSec,
    detection: (r.detection === 'even-window' ? 'even-window' : 'scene-cut') as SceneDetection,
    description: r.description,
    transcript: r.transcript,
    score: 1,
  }));
}

/**
 * Semantic scene search over the user's video library (optionally scoped
 * to specific sources). Embeds the query, cosine-scans owner-scoped scene
 * rows, returns the top-K with timestamps.
 */
export async function searchVideoScenes(
  userId: string,
  query: string,
  opts: { sourceIds?: string[]; topK?: number } = {},
): Promise<VideoSceneHit[]> {
  const topK = Math.min(Math.max(opts.topK ?? 6, 1), 20);
  const rows = await db.videoScene.findMany({
    where: {
      ...(opts.sourceIds?.length ? { sourceId: { in: opts.sourceIds } } : {}),
      source: { userId, status: 'ready' },
    },
    include: { source: { select: { name: true } } },
    take: 2000,
    orderBy: { createdAt: 'desc' },
  });
  if (rows.length === 0) return [];

  const embeddings = await getEmbeddings();
  const [queryVector] = await embeddings.embed([query], { query: true });

  return rows
    .map((row) => {
      const vector = row.embedding ? deserializeVector(new Uint8Array(row.embedding)) : null;
      const score = vector ? cosineSimilarity(queryVector, vector) : -1;
      return {
        sceneId: row.id,
        sourceId: row.sourceId,
        sourceName: row.source.name,
        sceneIdx: row.sceneIdx,
        startSec: row.startSec,
        endSec: row.endSec,
        detection: (row.detection === 'even-window' ? 'even-window' : 'scene-cut') as SceneDetection,
        description: row.description,
        transcript: row.transcript,
        score,
      } satisfies VideoSceneHit;
    })
    .filter((h) => h.score > -1)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

/** Render scene hits as [V#]-cited context for the agent prompt. */
export function formatVideoSceneContext(hits: VideoSceneHit[]): string {
  if (hits.length === 0) return '';
  const lines = ['# Video scenes (retrieved)', ''];
  hits.forEach((hit, i) => {
    lines.push(
      `[V${i + 1}] ${hit.sourceName} — scene ${hit.sceneIdx + 1}, ${fmtSec(hit.startSec)}–${fmtSec(hit.endSec)} ` +
        `(mediaTimeSec: ${Math.round(hit.startSec)}, sourceId ${hit.sourceId}, relevance ${Math.round(Math.max(hit.score, 0) * 100)}%)`,
    );
    if (hit.description) lines.push(`Visual: ${trim(hit.description, 400)}`);
    if (hit.transcript) lines.push(`Spoken: ${trim(hit.transcript, 400)}`);
    lines.push('');
  });
  return lines.join('\n');
}

function trim(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const edge = cut.lastIndexOf(' ');
  return (edge > max * 0.6 ? cut.slice(0, edge) : cut) + '…';
}
