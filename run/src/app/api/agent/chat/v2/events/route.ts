/**
 * GET /api/agent/chat/v2/events?requestId=<id>&from=<seq> — re-attach to a
 * live (or just-finished) agent run.
 *
 * STREAM-INTERRUPTION RECOVERY + REFRESH PERSISTENCE, the live half:
 *
 *   - The POST /v2 route appends EVERY SSE frame it emits to the run's
 *     in-process ring buffer (runs/registry.ts). That buffer is the
 *     replayable history of the turn — plan, tool calls/results, approval
 *     requests, streaming text, done.
 *   - This endpoint replays the buffered frames with seq >= `from`, then
 *     streams the LIVE tail as the run continues, then closes when the run
 *     finishes. `from` mirrors the number of events the caller already
 *     processed, so a dropped wire resumes EXACTLY where it died; a page
 *     reload passes from=0 and rebuilds the whole in-flight turn.
 *   - Unknown/expired request (server restarted, TTL passed) → 404: the
 *     client falls back to the thread-store polling recovery.
 *
 * Auth: the run's owner may re-attach; guest runs (no owner recorded)
 * remain open — consistent with the app's guest model. Owners are verified
 * against the resolved user id, never against a client-supplied value.
 */
import { NextRequest } from 'next/server';
import { getRunEventBuffer } from '@/lib/agent/runs/registry';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';

const logger = createLogger('AgentEvents');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function sseFrame(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

export async function GET(req: NextRequest) {
  const requestId = req.nextUrl.searchParams.get('requestId') ?? '';
  const fromRaw = Number(req.nextUrl.searchParams.get('from') ?? '0');
  const from = Number.isFinite(fromRaw) && fromRaw > 0 ? Math.floor(fromRaw) : 1;

  if (!requestId || !/^[a-zA-Z0-9-]{8,64}$/.test(requestId)) {
    return new Response(JSON.stringify({ error: 'Invalid requestId' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const run = getRunEventBuffer(requestId);
  if (!run) {
    return new Response(JSON.stringify({ error: 'Run not found or expired' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const userId = await resolveUserId().catch(() => null);
  if (run.userId && run.userId !== userId) {
    // Do not leak the existence of other users' runs.
    return new Response(JSON.stringify({ error: 'Run not found or expired' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let closed = false;
      const write = (chunk: string) => {
        if (closed || req.signal.aborted) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          closed = true;
        }
      };

      // ── Phase 1: replay ──
      const { frames, truncated } = run.buffer.snapshot(from);
      write(sseFrame('reattach', {
        requestId,
        threadId: run.threadId,
        replayFrom: frames.length > 0 ? frames[0].seq : from,
        truncated,
        finished: run.buffer.isClosed(),
      }));
      for (const frame of frames) {
        write(sseFrame(frame.event, frame.data));
      }

      // ── Phase 2: live tail ──
      // Drain-then-wait: write everything that is already new, THEN suspend
      // on wait() until the next append or close. wait() only resumes on a
      // NEW frame (append/close), so the loop idles at zero CPU between
      // frames — never hot-spins (see RunEventBuffer.wait for the incident
      // note). The heartbeat below keeps proxies from reaping the idle wire
      // during long tool calls (mirrors the POST route's 5s padded ping —
      // the pad defeats Next's compression-layer buffering, the 5s cadence
      // every idle-reaper).
      const drain = () => {
        const { frames: tail } = run.buffer.snapshot(run.buffer.nextSeq);
        for (const frame of tail) {
          write(sseFrame(frame.event, frame.data));
        }
      };
      const PING_PAD = '.'.repeat(2048);
      const heartbeat = setInterval(
        () => write(sseFrame('ping', { ts: Date.now(), pad: PING_PAD })),
        5_000,
      );
      try {
        drain(); // frames that landed between the replay and this loop
        while (!run.buffer.isClosed() && !req.signal.aborted) {
          await run.buffer.wait();
          drain();
        }
        drain(); // final frames racing close() (close wakes waiters, but an
                 // append+close pair can land between the last drain and the
                 // isClosed() check)
        write(sseFrame('reattach.end', { requestId, finished: true }));
      } catch (error) {
        logger.warn({ requestId, error }, 'Run event replay stream failed');
      } finally {
        clearInterval(heartbeat);
        closed = true;
        try { controller.close(); } catch { /* already closed */ }
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      // Bypass Next's response compression (buffers small SSE writes —
      // same rationale as the POST stream route).
      'Content-Encoding': 'identity',
      'x-request-id': requestId,
    },
  });
}
