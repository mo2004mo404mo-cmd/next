import { db } from '../db';
import { createLogger } from '../logger';
import { getEmbeddings, serializeVector, deserializeVector, cosineSimilarity } from '../agent/knowledge/embeddings';

const log = createLogger('AgentMemory');

/**
 * Long-term memory service — layered, tenant-scoped.
 *
 * Pattern ported from the reference platforms (hermes `memory/service.ts` +
 * deep-agent-platform `memory/manager.ts`): upsert-by-key, relevance search,
 * and a rendered context block injected into the system prompt each run.
 *
 * Layers:
 *   profile       — who the learner is (year, specialty goals, language pref)
 *   study         — how they study and where they struggle
 *   fact          — knowledge learned during interactions
 *   conversation  — thread-scoped working memory (hermes-parity)
 *   semantic      — auto-extracted facts from completed runs (deep-agent
 *                   extractAndStore parity; heuristic, zero extra LLM calls)
 *
 * Retrieval is hybrid (compare-and-integrate-4, deep-agent parity): memories
 * carry a 256-d embedding; search blends vector cosine with the lexical
 * token-overlap + importance + recency score, so semantic matches surface
 * even without exact wording while the deterministic lexical path keeps
 * working when embeddings are unavailable.
 */

export type MemoryScope = 'profile' | 'study' | 'fact' | 'conversation' | 'semantic';

export interface MemoryEntry {
  id: string;
  scope: string;
  key: string | null;
  content: string;
  importance: number;
  updatedAt: string;
}

const MAX_CONTENT_CHARS = 400;

async function embedText(content: string): Promise<Uint8Array<ArrayBuffer> | null> {
  try {
    const embeddings = await getEmbeddings();
    const [vector] = await embeddings.embed([content]);
    return serializeVector(vector);
  } catch {
    return null; // embedding-free operation stays fully functional
  }
}

export async function saveMemory(input: {
  userId: string;
  scope: MemoryScope;
  key?: string;
  content: string;
  importance?: number;
  source?: string;
  threadId?: string;
}): Promise<MemoryEntry> {
  const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
  if (!content) throw new Error('Memory content is empty');

  const key = input.key?.trim().slice(0, 120) || null;
  const importance = Math.min(Math.max(input.importance ?? 0.5, 0), 1);
  const embedding = await embedText(content);

  // Upsert by (userId, scope, key) when a key is given; otherwise insert.
  if (key) {
    const existing = await db.agentMemory.findFirst({
      where: { userId: input.userId, scope: input.scope, key },
      select: { id: true },
    });
    if (existing) {
      const updated = await db.agentMemory.update({
        where: { id: existing.id },
        data: { content, importance, ...(embedding ? { embedding } : {}), updatedAt: new Date() },
      });
      return toEntry(updated);
    }
  }
  const created = await db.agentMemory.create({
    data: {
      userId: input.userId,
      scope: input.scope,
      key,
      content,
      importance,
      ...(embedding ? { embedding } : {}),
      ...(input.threadId ? { threadId: input.threadId } : {}),
    },
  });
  log.info?.(`Saved memory [${input.scope}]${key ? ` "${key}"` : ''} for ${input.userId}`);
  return toEntry(created);
}

export async function forgetMemory(userId: string, memoryId: string): Promise<boolean> {
  const deleted = await db.agentMemory.deleteMany({ where: { id: memoryId, userId } });
  return deleted.count > 0;
}

/** Update a memory's content by id (hermes memory_update parity). */
export async function updateMemory(
  userId: string,
  memoryId: string,
  input: { content?: string; importance?: number },
): Promise<MemoryEntry | null> {
  const data: {
    content?: string;
    importance?: number;
    embedding?: Uint8Array<ArrayBuffer>;
    updatedAt: Date;
  } = { updatedAt: new Date() };
  if (typeof input.content === 'string') {
    const content = input.content.trim().slice(0, MAX_CONTENT_CHARS);
    if (!content) throw new Error('Memory content is empty');
    data.content = content;
    const embedding = await embedText(content);
    if (embedding) data.embedding = embedding;
  }
  if (typeof input.importance === 'number') {
    data.importance = Math.min(Math.max(input.importance, 0), 1);
  }
  const updated = await db.agentMemory.updateMany({ where: { id: memoryId, userId }, data });
  if (updated.count === 0) return null;
  const row = await db.agentMemory.findUnique({ where: { id: memoryId } });
  return row ? toEntry(row) : null;
}

export async function listMemories(userId: string, limit = 100): Promise<MemoryEntry[]> {
  const rows = await db.agentMemory.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: limit,
  });
  return rows.map(toEntry);
}

/**
 * Hybrid relevance search (deep-agent parity): lexical token overlap ×2 +
 * importance + recency decay, PLUS vector cosine when the row carries an
 * embedding. The vector component rescues semantically-related memories
 * that share no exact tokens with the query.
 */
export async function searchMemories(
  userId: string,
  query: string,
  limit = 6,
): Promise<Array<MemoryEntry & { score: number }>> {
  const rows = await db.agentMemory.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' },
    take: 500,
  });
  if (rows.length === 0) return [];

  const queryTokens = tokenize(query);
  let queryVector: Float32Array | null = null;
  const anyEmbedded = rows.some((row) => row.embedding);
  if (anyEmbedded && queryTokens.length > 0) {
    try {
      const embeddings = await getEmbeddings();
      [queryVector] = await embeddings.embed([query]);
    } catch {
      queryVector = null;
    }
  }

  const scored = rows
    .map((row) => {
      const contentTokens = new Set(tokenize(row.content));
      let overlap = 0;
      for (const token of queryTokens) if (contentTokens.has(token)) overlap += 1;
      const lexical = queryTokens.length > 0 ? overlap / queryTokens.length : 0;
      let vectorScore = 0;
      if (queryVector && row.embedding) {
        const rowVector = deserializeVector(new Uint8Array(row.embedding));
        if (rowVector) vectorScore = Math.max(cosineSimilarity(queryVector, rowVector), 0);
      }
      const ageDays = (Date.now() - row.updatedAt.getTime()) / 86_400_000;
      const recency = Math.exp(-ageDays / 30);
      // Lexial dominates; vector similarity contributes up to ~1.2 of the
      // ~3.0 max score so semantic-only matches still clear the 0.6 filter.
      const score = lexical * 2 + vectorScore * 1.2 + row.importance * 0.5 + recency * 0.5;
      return { ...toEntry(row), score };
    })
    .filter((entry) => entry.score > 0.6)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
  return scored;
}

/**
 * Heuristic post-run memory extraction (deep-agent extractAndStore parity,
 * zero extra LLM calls): store what the user asked for and how the run
 * resolved, in the auto-extraction `semantic` layer. The next run's hybrid
 * recall can then surface it even when wording differs.
 */
export async function extractAndStoreMemories(input: {
  userId: string;
  userMessage: string;
  assistantSummary: string;
  threadId?: string;
}): Promise<number> {
  let stored = 0;
  const message = input.userMessage.trim();
  if (message.length >= 40 && message.length <= 2000) {
    try {
      await saveMemory({
        userId: input.userId,
        scope: 'semantic',
        content: `User asked/needed: ${message.slice(0, MAX_CONTENT_CHARS - 20)}`,
        importance: 0.4,
        source: 'conversation-extraction',
        ...(input.threadId ? { threadId: input.threadId } : {}),
      });
      stored += 1;
    } catch { /* best-effort */ }
  }
  const summary = input.assistantSummary.trim();
  if (summary.length > 60) {
    try {
      await saveMemory({
        userId: input.userId,
        scope: 'semantic',
        content: `Outcome: ${summary.slice(0, MAX_CONTENT_CHARS - 10)}`,
        importance: 0.35,
        source: 'conversation-extraction',
        ...(input.threadId ? { threadId: input.threadId } : {}),
      });
      stored += 1;
    } catch { /* best-effort */ }
  }
  return stored;
}

function tokenize(text: string): string[] {
  return (
    text
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, ' ')
      .split(/\s+/)
      .filter((token) => token.length > 2)
      // simple English stemming for common medical suffixes
      .map((token) => (token.endsWith('ies') ? `${token.slice(0, -3)}y` : token))
      .map((token) => (token.endsWith('s') && token.length > 3 ? token.slice(0, -1) : token))
  );
}

function toEntry(row: {
  id: string;
  scope: string;
  key: string | null;
  content: string;
  importance: number;
  updatedAt: Date;
}): MemoryEntry {
  return {
    id: row.id,
    scope: row.scope,
    key: row.key,
    content: row.content,
    importance: row.importance,
    updatedAt: row.updatedAt.toISOString(),
  };
}
