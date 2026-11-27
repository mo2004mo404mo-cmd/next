/**
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
              count(DISTINCT c.checkpoint_id)::int AS checkpoints,
              min((c.checkpoint->>'ts')) AS first_ts,
              max((c.checkpoint->>'ts')) AS last_ts,
              array_agg(DISTINCT regexp_replace(w.task_path, '^.*,[[:space:]]*', ''))
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
