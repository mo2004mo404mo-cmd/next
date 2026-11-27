import { db } from '../../db';
import { createLogger } from '../../logger';

const log = createLogger('AgentArtifacts');

/**
 * Artifact service — durable agent deliverables.
 *
 * Ported pattern from the reference platforms (hermes `tools/artifacts.ts` +
 * deep-agent-platform `register_artifact`): generated study guides, cheat
 * sheets, data tables, and images are registered in the DB so they outlive
 * the chat turn, can be previewed in the timeline, and downloaded via
 * /api/medq-agent/artifacts/[id].
 *
 * Text content is stored inline (markdown/html/csv/json); binary artifacts
 * (generated images) carry a public URL instead.
 */

export type ArtifactKind = 'markdown' | 'html' | 'csv' | 'json' | 'chart' | 'image' | 'document';

export interface ArtifactRecord {
  id: string;
  name: string;
  kind: string;
  mimeType: string;
  sizeBytes: number;
  url?: string | null;
  createdAt: string;
}

const KIND_MIME: Record<ArtifactKind, string> = {
  markdown: 'text/markdown',
  html: 'text/html',
  csv: 'text/csv',
  json: 'application/json',
  chart: 'application/json',
  image: 'image/png',
  document: 'text/markdown',
};

const MAX_INLINE_CHARS = 120_000;

function sanitizeName(name: string): string {
  const cleaned = name
    .trim()
    .replace(/[^\p{L}\p{N}\s._-]/gu, '')
    .replace(/\s+/g, '-')
    .slice(0, 80);
  return cleaned || 'artifact';
}

export async function createArtifact(input: {
  userId: string;
  name: string;
  kind: ArtifactKind;
  content?: string;
  url?: string;
  threadId?: string;
  meta?: Record<string, unknown>;
}): Promise<ArtifactRecord & { downloadUrl: string }> {
  const name = sanitizeName(input.name);
  const mimeType = KIND_MIME[input.kind] ?? 'text/plain';
  const content = input.content ? input.content.slice(0, MAX_INLINE_CHARS) : undefined;
  const sizeBytes = content ? Buffer.byteLength(content, 'utf8') : 0;

  const row = await db.agentArtifact.create({
    data: {
      userId: input.userId,
      name,
      kind: input.kind,
      mimeType,
      sizeBytes,
      content,
      url: input.url,
      // JSON.parse returns `any`, satisfying Prisma's Json input type
      meta: input.meta ? JSON.parse(JSON.stringify(input.meta)) : undefined,
    },
  });
  const downloadUrl = `/api/medq-agent/artifacts/${row.id}`;
  log.info?.(`Created ${input.kind} artifact "${name}" (${sizeBytes}B) for ${input.userId}`);
  return {
    id: row.id,
    name,
    kind: row.kind,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    url: row.url,
    createdAt: row.createdAt.toISOString(),
    downloadUrl,
  };
}

export async function listArtifacts(userId: string, limit = 50): Promise<ArtifactRecord[]> {
  const rows = await db.agentArtifact.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: { id: true, name: true, kind: true, mimeType: true, sizeBytes: true, url: true, createdAt: true },
  });
  return rows.map((row) => ({ ...row, createdAt: row.createdAt.toISOString() }));
}

/**
 * Search the user's artifact library by free-text query (name/kind match,
 * newest first) with short content excerpts so the agent can cite what it
 * previously produced. (Task 6 — agent-side artifact library access,
 * product-vocabulary port of the reference platform's workspace tools.)
 */
export async function searchArtifacts(
  userId: string,
  query: string,
  limit = 10,
): Promise<Array<ArtifactRecord & { downloadUrl: string; excerpt?: string }>> {
  const terms = query
    .toLowerCase()
    .split(/[\s,]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 1)
    .slice(0, 6);
  const rows = await db.agentArtifact.findMany({
    where: {
      userId,
      ...(terms.length > 0 || query.trim()
        ? {
            OR: [
              ...(terms.length > 0
                ? terms.map((t) => ({ name: { contains: t, mode: 'insensitive' as const } }))
                : []),
              { kind: { contains: query.trim(), mode: 'insensitive' as const } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: Math.min(Math.max(limit, 1), 20),
    select: { id: true, name: true, kind: true, mimeType: true, sizeBytes: true, url: true, createdAt: true, content: true },
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    kind: row.kind,
    mimeType: row.mimeType,
    sizeBytes: row.sizeBytes,
    url: row.url,
    createdAt: row.createdAt.toISOString(),
    downloadUrl: `/api/medq-agent/artifacts/${row.id}`,
    excerpt: row.content ? row.content.replace(/\s+/g, ' ').slice(0, 220) : undefined,
  }));
}

export async function getArtifact(userId: string | null | undefined, id: string) {
  const row = await db.agentArtifact.findUnique({ where: { id } });
  // Guest artifacts (userId null) stay guest-accessible; user artifacts require the owner.
  if (!row) return null;
  if (row.userId && row.userId !== userId) return null;
  return row;
}
