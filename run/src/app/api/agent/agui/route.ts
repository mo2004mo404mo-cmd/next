/**
 * GET /api/agent/agui?requestId=<id>&from=<seq> — AG-UI protocol adapter.
 *
 * Exposes a live (or just-finished) MedQ agent run as an AG-UI-compatible
 * event stream (https://docs.ag-ui.com/concepts/events): any AG-UI client
 * (CopilotKit, agent-ui, custom) can subscribe to a MedQ turn without knowing
 * MedQ's native frame vocabulary.
 *
 * Internally this is a TRANSLATOR over the same run event buffer the native
 * re-attach endpoint replays (runs/registry.ts) — one source of truth, two
 * wire protocols:
 *
 *   MedQ frame            →  AG-UI event(s)
 *   ─────────────────────────────────────────────
 *   meta                  →  RUN_STARTED
 *   text.delta            →  TEXT_MESSAGE_START / CONTENT / (END on done)
 *   tool.call             →  TOOL_CALL_START + TOOL_CALL_ARGS
 *   tool.result           →  TOOL_CALL_END
 *   subagent(.delta)      →  CUSTOM
 *   approval_required     →  CUSTOM (approval_required)
 *   plan.end              →  CUSTOM (plan)
 *   done                  →  TEXT_MESSAGE_END + RUN_FINISHED
 *   error                 →  RUN_ERROR
 *
 * Auth mirrors the native events endpoint: owner-verified, guests open.
 */
import { NextRequest } from 'next/server';
import { getRunEventBuffer } from '@/lib/agent/runs/registry';
import { resolveUserId } from '@/lib/auth-helpers';
import { createLogger } from '@/lib/logger';

const logger = createLogger('AgentAgui');

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 300;

function aguiEvent(payload: Record<string, unknown>): string {
  return `data: ${JSON.stringify({ timestamp: Date.now(), ...payload })}\n\n`;
}

function randomId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID().replace(/-/g, '').slice(0, 20)}`;
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
    return new Response(JSON.stringify({ error: 'Run not found or expired' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const encoder = new TextEncoder();
  const messageId = randomId('msg');
  const runId = randomId('run');
  let messageOpen = false;
  let textStarted = false;

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

      write(aguiEvent({ type: 'RUN_STARTED', threadId: run.threadId, runId }));

      const translate = (event: string, data: unknown) => {
        const d = (data ?? {}) as Record<string, unknown>;
        switch (event) {
          case 'text.delta': {
            if (!messageOpen) {
              messageOpen = true;
              write(aguiEvent({ type: 'TEXT_MESSAGE_START', messageId, role: 'assistant' }));
            }
            textStarted = true;
            write(aguiEvent({ type: 'TEXT_MESSAGE_CONTENT', messageId, delta: String(d.text ?? '') }));
            break;
          }
          case 'tool.call': {
            const id = typeof d.id === 'string' && d.id ? d.id : randomId('tool');
            write(aguiEvent({ type: 'TOOL_CALL_START', toolCallId: id, toolCallName: String(d.toolName ?? 'unknown') }));
            try {
              write(aguiEvent({ type: 'TOOL_CALL_ARGS', toolCallId: id, delta: JSON.stringify(d.args ?? {}) }));
            } catch { /* non-serializable args — START carries the name */ }
            break;
          }
          case 'tool.result': {
            const id = typeof d.id === 'string' && d.id ? d.id : randomId('tool');
            write(aguiEvent({ type: 'TOOL_CALL_END', toolCallId: id }));
            break;
          }
          case 'subagent':
          case 'subagent.delta':
            write(aguiEvent({ type: 'CUSTOM', name: event === 'subagent' ? 'subagent' : 'subagent_delta', value: d }));
            break;
          case 'approval_required':
            write(aguiEvent({ type: 'CUSTOM', name: 'approval_required', value: d }));
            break;
          case 'clarification_required':
            write(aguiEvent({ type: 'CUSTOM', name: 'clarification_required', value: d }));
            break;
          case 'plan.end':
            write(aguiEvent({ type: 'CUSTOM', name: 'plan', value: d.plan ?? null }));
            break;
          case 'done': {
            if (messageOpen) {
              write(aguiEvent({ type: 'TEXT_MESSAGE_END', messageId }));
              messageOpen = false;
            }
            write(aguiEvent({ type: 'RUN_FINISHED', threadId: run.threadId, runId }));
            break;
          }
          case 'error': {
            if (messageOpen) {
              write(aguiEvent({ type: 'TEXT_MESSAGE_END', messageId }));
              messageOpen = false;
            }
            write(aguiEvent({
              type: 'RUN_ERROR',
              message: String(d.message ?? 'unknown error'),
              code: 'MEDQ_RUN_ERROR',
            }));
            break;
          }
          default:
            break; // meta/ping/reattach/memory/… — protocol-internal frames
        }
      };

      const { frames } = run.buffer.snapshot(from);
      for (const frame of frames) translate(frame.event, frame.data);

      const drain = () => {
        const { frames: tail } = run.buffer.snapshot(run.buffer.nextSeq);
        for (const frame of tail) translate(frame.event, frame.data);
      };
      const heartbeat = setInterval(() => {
        write(`: keep-alive\n\n`);
      }, 10_000);
      try {
        drain();
        while (!run.buffer.isClosed() && !req.signal.aborted) {
          await run.buffer.wait();
          drain();
        }
        drain();
        // Run closed without a terminal frame (wired cut) — close the AG-UI
        // message/run honestly if anything is still open.
        if (messageOpen) {
          write(aguiEvent({ type: 'TEXT_MESSAGE_END', messageId }));
          messageOpen = false;
        }
        write(aguiEvent({ type: 'RUN_FINISHED', threadId: run.threadId, runId }));
      } catch (error) {
        logger.warn({ requestId, error }, 'AG-UI adapter stream failed');
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
      'x-agui-protocol': '1',
      'x-request-id': requestId,
    },
  });
}
