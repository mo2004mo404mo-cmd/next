"""Add checkpointQuery helper to checkpoint-postgres.ts (shared pool for
the graph-runs inspection API) + create the graph-runs API route +
integration test.

1. checkpoint-postgres.ts: extract getCheckpointPool() (lazy pool
   singleton, NO setup()) + export checkpointQuery(sql, params) that
   reuses the same pool buildPostgresSaver uses.

2. src/app/api/agent/graph-runs/route.ts — time-travel debugging API:
   GET (no params)            → recent threads (thread_id, checkpoint
                                count, first/last ts, node names)
   GET ?threadId=...          → full checkpoint timeline for one thread
                                (step, source, ts, checkpointId, writes
                                with node/channel/preview)
   Admin/educator gated (User.role check).

3. test/graph-production.integration.test.ts — full production graph run
   against the LIVE DB: real hybrid retrieval (admin@medq.com's chunks),
   offline generate (no LLM), spied db.question.create (no row writes),
   REAL PostgresSaver checkpoint persistence.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")
CKPT = PROJECT / "src/lib/agent/checkpoint-postgres.ts"
ROUTE = PROJECT / "src/app/api/agent/graph-runs/route.ts"
INTEGRATION = PROJECT / "test/graph-production.integration.test.ts"

# ── 1. checkpoint-postgres.ts additions ──
CKPT_APPENDIX = """

// ── Inspection query helper (graph-runs API) ──────────────────────────────
//
// The PostgresSaver tables (`checkpoints`, `checkpoint_writes`) are NOT
// Prisma-modeled — the saver owns that schema. The graph-runs inspection
// API reads them through THIS module's shared pool so the API and the
// saver never open separate connection pools to the same database.

/**
 * Get (or lazily create) the shared checkpoint pg Pool. Does NOT run
 * setup() — use only when the tables are known to exist (i.e. after a
 * buildPostgresSaver() somewhere in the process, or for read-only
// inspection against a pre-existing schema).
 */
export function getCheckpointPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: resolveConnectionString(), max: 4 });
    process.once('beforeExit', () => {
      _pool?.end().catch(() => {});
    });
  }
  return _pool;
}

/**
 * Run a read-only query against the PostgresSaver's tables through the
 * shared pool. Returns the pg result rows.
 */
export async function checkpointQuery<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getCheckpointPool();
  const result = await pool.query(sql, params as never[]);
  return result.rows as T[];
}
"""

ckpt_src = CKPT.read_text()
if "checkpointQuery" in ckpt_src:
    print("[checkpoint-postgres.ts] checkpointQuery already present, skipping")
else:
    CKPT.write_text(ckpt_src.rstrip() + "\n" + CKPT_APPENDIX + "\n")
    print("[checkpoint-postgres.ts] added getCheckpointPool + checkpointQuery")

# ── 2. graph-runs API route ──
ROUTE_SRC = '''/**
 * GET /api/agent/graph-runs — LangGraph checkpoint inspection API
 * (Stage 11 Phase C: time-travel debugging surface).
 *
 *   GET (no params)      → { runs: [{ threadId, checkpoints, firstTs, lastTs, nodes }] }
 *   GET ?threadId=<id>   → { threadId, checkpoints: [{ step, source, ts,
 *                            checkpointId, writes: [{ node, channel, type, preview }] }] }
 *
 * Reads the PostgresSaver's own tables (`checkpoints`, `checkpoint_writes`)
 * through the shared checkpoint pool — the saver owns that schema, so no
 * Prisma models are involved.
 *
 * Auth: educator or admin (generation runs are per-user data; thread ids
 * are not secrets but the write payloads can embed question content).
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, unauthorized, forbidden } from '@/lib/auth-helpers';
import { checkpointQuery } from '@/lib/agent/checkpoint-postgres';
import { getGuestUserId } from '@/lib/guest-user';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Decode one checkpoint_writes blob into a preview string. */
function decodeWriteBlob(blob: unknown, type: unknown): string {
  if (blob === null || blob === undefined) return '';
  let text = '';
  if (Buffer.isBuffer(blob)) text = blob.toString('utf8');
  else if (typeof blob === 'string') text = blob;
  else if (typeof blob === 'object') text = JSON.stringify(blob);
  else text = String(blob);
  if (type === 'json') {
    try {
      return JSON.stringify(JSON.parse(text)).slice(0, 300);
    } catch {
      /* fall through to raw text */
    }
  }
  // msgpack or other serde — report size, not bytes.
  if (type === 'msgpack') {
    const size = Buffer.isBuffer(blob) ? blob.length : text.length;
    return `(msgpack, ${size} bytes)`;
  }
  return text.slice(0, 300);
}

/** Extract the node name from a task_path like "~__pregel_pull, ground". */
function nodeFromTaskPath(taskPath: string | null): string {
  if (!taskPath) return '';
  const parts = taskPath.split(',').map((p) => p.trim());
  return parts[parts.length - 1] || '';
}

async function requireEducatorOrAdmin(): Promise<{ ok: true } | { ok: false; res: NextResponse }> {
  const userId = await resolveUserId();
  if (!userId) return { ok: false, res: unauthorized('Sign in to inspect graph runs') };
  // Visitors (shared guest account) may not inspect generation runs.
  const guestId = await getGuestUserId().catch(() => null);
  if (guestId && userId === guestId) {
    return { ok: false, res: forbidden('Graph run inspection requires a signed-in educator or admin account') };
  }
  const user = await db.user.findUnique({ where: { id: userId }, select: { role: true } });
  if (!user || (user.role !== 'admin' && user.role !== 'educator')) {
    return { ok: false, res: forbidden('Graph run inspection requires an educator or admin account') };
  }
  return { ok: true };
}

export async function GET(req: NextRequest) {
  const gate = await requireEducatorOrAdmin();
  if (!gate.ok) return gate.res;

  const threadId = new URL(req.url).searchParams.get('threadId');

  try {
    // ── Detail: one thread's checkpoint timeline ──
    if (threadId) {
      const checkpoints = await checkpointQuery<{
        checkpoint_id: string;
        metadata: { step?: number; source?: string } | null;
        checkpoint: { ts?: string } | null;
      }>(
        `SELECT checkpoint_id, metadata, checkpoint
           FROM checkpoints
          WHERE thread_id = $1
          ORDER BY (metadata->>'step')::int`,
        [threadId],
      );
      const writes = await checkpointQuery<{
        checkpoint_id: string;
        channel: string;
        type: string | null;
        blob: Buffer | null;
        task_path: string | null;
      }>(
        `SELECT checkpoint_id, channel, type, blob, task_path
           FROM checkpoint_writes
          WHERE thread_id = $1
          ORDER BY idx`,
        [threadId],
      );
      const writesByCkpt = new Map<string, Array<Record<string, unknown>>>();
      for (const w of writes) {
        const list = writesByCkpt.get(w.checkpoint_id) ?? [];
        list.push({
          node: nodeFromTaskPath(w.task_path),
          channel: w.channel,
          type: w.type ?? '',
          preview: decodeWriteBlob(w.blob, w.type),
        });
        writesByCkpt.set(w.checkpoint_id, list);
      }
      return NextResponse.json({
        threadId,
        checkpoints: checkpoints.map((c) => ({
          step: c.metadata?.step ?? null,
          source: c.metadata?.source ?? '',
          ts: c.checkpoint?.ts ?? null,
          checkpointId: c.checkpoint_id,
          writes: writesByCkpt.get(c.checkpoint_id) ?? [],
        })),
      });
    }

    // ── List: recent threads ──
    const runs = await checkpointQuery<{
      thread_id: string;
      checkpoints: number;
      first_ts: string | null;
      last_ts: string | null;
      nodes: string[] | null;
    }>(
      `SELECT c.thread_id,
              count(*)::int AS checkpoints,
              min((c.checkpoint->>'ts')) AS first_ts,
              max((c.checkpoint->>'ts')) AS last_ts,
              (array_agg(DISTINCT regexp_replace(w.task_path, '^.*,[[:space:]]*', '')))
                FILTER (WHERE w.task_path IS NOT NULL) AS nodes
         FROM checkpoints c
         LEFT JOIN checkpoint_writes w ON w.thread_id = c.thread_id
        GROUP BY c.thread_id
        ORDER BY max((c.checkpoint->>'ts')) DESC
        LIMIT 50`,
    );
    return NextResponse.json({
      runs: runs.map((r) => ({
        threadId: r.thread_id,
        checkpoints: r.checkpoints,
        firstTs: r.first_ts,
        lastTs: r.last_ts,
        nodes: (r.nodes ?? []).filter((n) => n && n !== 'pregel_pull'),
      })),
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json(
      { error: `Failed to query graph runs: ${message.slice(0, 200)}` },
      { status: 500 },
    );
  }
}
'''

ROUTE.parent.mkdir(parents=True, exist_ok=True)
if ROUTE.exists() and "graph-runs" in ROUTE.read_text():
    print("[graph-runs/route.ts] already exists, skipping")
else:
    ROUTE.write_text(ROUTE_SRC)
    print(f"[graph-runs/route.ts] wrote {len(ROUTE_SRC)} bytes")

# ── 3. Integration test ──
INTEGRATION_SRC = '''import { describe, it, expect, vi, afterAll } from 'vitest';

// ── Stage 11 production-graph integration test ─────────────────────────────
//
// Runs the FULL production graph against the LIVE database:
//   - REAL hybrid retrieval (a user that has knowledge chunks)
//   - offline generate (no LLM — deterministic fallback drafts)
//   - spied db.question.create (asserts the row shape, writes nothing)
//   - REAL PostgresSaver checkpoint persistence (checkpoints table)
//
// Soft-skips when the live DB has no user with knowledge chunks (fresh
// environments) so the suite stays green anywhere.

import { runQuestionGenerationGraph } from '@/lib/agent/question-generation-graph';
import { createProductionGraphDeps } from '@/lib/agent/graph-deps';
import { buildPostgresSaver, __resetForTest, checkpointQuery } from '@/lib/agent/checkpoint-postgres';
import { db } from '@/lib/db';

const createSpy = vi.spyOn(db.question, 'create');
let mockIdSeq = 0;
createSpy.mockImplementation((async () => ({
  id: `q_mock_${++mockIdSeq}`,
})) as never);

afterAll(() => {
  createSpy.mockRestore();
  __resetForTest();
});

describe('production graph — live integration', () => {
  it(
    'runs plan→ground→generate→verify→save with real retrieval + PostgresSaver checkpoints',
    { timeout: 90_000 },
    async () => {
      // Find a user that actually has knowledge chunks (skip if none).
      const user = await db.user.findFirst({
        where: { email: 'admin@medq.com' },
        select: { id: true, email: true },
      });
      const chunkCount = user
        ? await db.knowledgeChunk.count({
            where: { document: { source: { userId: user.id } } },
          })
        : 0;
      if (!user || chunkCount === 0) {
        console.warn('no user with knowledge chunks — skipping live integration');
        return;
      }

      const deps = createProductionGraphDeps({ offline: true });
      const threadId = `integration_${Date.now()}`;

      const final = await runQuestionGenerationGraph(
        {
          topic: 'clinical medicine',
          system: 'USMLE Step 1',
          types: ['short'],
          difficulties: ['Medium'],
          count: 2,
          knowledgeSourceIds: [],
          userId: user.id,
          weakTopics: [],
          focusHint: '',
        },
        deps,
        { checkpointer: buildPostgresSaver(), threadId },
      );

      // Retrieval grounded on real chunks.
      expect((final.grounding ?? []).length).toBeGreaterThan(0);
      // Offline fallback produced grounded drafts; all passed verification.
      expect(final.generated.length).toBeGreaterThan(0);
      expect(final.verified.length).toBeGreaterThan(0);
      // Save wrote (mocked) rows with the save_question field shape.
      expect(final.savedIds.length).toBeGreaterThan(0);
      expect(createSpy).toHaveBeenCalled();
      const savedData = createSpy.mock.calls[0][0].data;
      expect(savedData.isAIGenerated).toBe(true);
      expect(savedData.reviewStatus).toBe('pending');
      expect(JSON.parse(savedData.tags)).toContain('langgraph');
      expect(JSON.parse(savedData.citations).length).toBeGreaterThan(0);

      // Checkpoints persisted for this thread (PostgresSaver, live DB).
      const rows = await checkpointQuery<{ n: number }>(
        'SELECT count(*)::int AS n FROM checkpoints WHERE thread_id = $1',
        [threadId],
      );
      expect(rows[0]?.n ?? 0).toBeGreaterThan(0);
    },
  );
});
'''

if INTEGRATION.exists() and "live integration" in INTEGRATION.read_text():
    print("[integration test] already exists, skipping")
else:
    INTEGRATION.write_text(INTEGRATION_SRC)
    print(f"[integration test] wrote {len(INTEGRATION_SRC)} bytes")
