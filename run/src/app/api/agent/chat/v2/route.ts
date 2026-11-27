/**
 * Streaming chat endpoint for the MedQ deep-agent experience.
 *
 * This file is the HTTP boundary between the client and the deep agent runtime.
 * It performs request validation, identifies the caller, checks throttling,
 * preserves chat history, and then forwards the model stream as SSE events so the
 * browser can render a live conversation experience.
 *
 * High-level flow:
 * 1. Parse and validate the incoming chat payload.
 * 2. Resolve the user (signed-in user or guest fallback).
 * 3. Rate-limit the request before starting a model call.
 * 4. Clean and trim prior chat history for the model.
 * 5. Persist the user turn to the thread store.
 * 6. Start a streaming response and consume the deep-agent output.
 * 7. Convert runtime events to SSE messages for the frontend.
 * 8. Save the final assistant response and tool trace.
 */
import { NextRequest } from 'next/server';
import { streamMedQDeepAgent } from '@/lib/agent/deep-agent-runtime';
import type { DeepAgentEvent } from '@/lib/agent/question-deep-agent';
import { logger } from '../../../../../../lib/logger';
import { resolveUserId } from '@/lib/auth-helpers';
import { rateLimit } from '@/lib/security/rate-limit';
import { appendAssistantMessage, appendUserMessage } from '@/lib/agent/threads/service';
import type { AgentHistoryEntry } from '@/lib/agent/deep-agent-runtime';
import { registerAttachment } from '@/lib/agent/attachment-registry';
import { registerActiveRun, unregisterActiveRun, RunEventBuffer } from '@/lib/agent/runs/registry';
import { stripFabricatedDeliverableClaims } from '@/lib/agent/anti-fabrication';

export const runtime = 'nodejs';
export const maxDuration = 300;

/**
 * Translate raw agent/backend errors into something a medical student can
 * read and act on. The shared z.ai LLM gateway periodically rate-limit
 * storms (surfacing as "500 ... status 429 ... Too many requests") — the
 * raw string is alarming and technical, so it gets a friendly explanation
 * plus a concrete next step. Everything else passes through unchanged so
 * real bugs stay diagnosable.
 */
function friendlyAgentError(raw: string): string {
  if (/\b429\b|too many requests|rate.?limit/i.test(raw)) {
    return 'The AI service is very busy right now (provider rate limit) and could not answer this message. Nothing was lost — please try again in a few minutes.';
  }
  if (/timeout|timed out|ETIMEDOUT|ECONNRESET|fetch failed|network/i.test(raw)) {
    return 'The AI service took too long to respond and the connection was dropped. Please try again — shorter messages usually get through faster.';
  }
  return raw;
}

/**
 * Encodes an application event into the format expected by the browser's SSE listener.
 *
 * The frontend waits for lines such as:
 *   event: text.delta
 *   data: {"text":"hello"}
 *
 * We centralize the serialization here so all server events follow the same wire format.
 */
function event(type: string, data: unknown) {
  return `event: ${type}\ndata: ${JSON.stringify(data)}\n\n`;
}

/**
 * Converts the raw todo list from the runtime into the structure the UI expects.
 *
 * Different models can emit different todo shapes. This normalizes them so the
 * client can render a consistent plan with ids, descriptions, and optional tool hints.
 * write_todos (todoListMiddleware) steps carry an explicit status —
 * pending/in_progress/completed — passed through for per-step rendering.
 */
function planFromTodos(todos: unknown) {
  const steps = Array.isArray(todos)
    ? todos.map((todo, index) => {
      const item = todo && typeof todo === 'object' ? todo as Record<string, unknown> : {};
      const rawStatus = item.status;
      return {
        id: String(item.id ?? item.content ?? `step-${index + 1}`),
        description: String(item.content ?? item.description ?? item.title ?? `Step ${index + 1}`),
        toolHint: typeof item.tool === 'string' ? item.tool : undefined,
        status: rawStatus === 'pending' || rawStatus === 'in_progress' || rawStatus === 'completed'
          ? rawStatus
          : undefined,
      };
    })
    : [];

  return {
    reasoning: 'Hermes agent execution plan',
    needsTools: steps.length > 0,
    steps,
  };
}
/** Best-effort parse of tool args arriving as a JSON string into the
 * object the UI's arg summarizer expects (string args render as {}). */
function safeParseArgs(args: unknown): unknown {
  if (typeof args !== 'string' || !args.trim()) return args ?? {};
  try { return JSON.parse(args); } catch { return args; }
}

export interface SSEWriteContext {
  threadId: string;
  /** Stable request id shared by the client stream and server logs. */
  requestId: string;
}

/**
 * Handles a single chat submission from the browser.
 *
 * The route is responsible for four main concerns:
 * 1. validating the incoming payload and required message text,
 * 2. securing the request with user and rate-limit checks,
 * 3. sending the sanitized context to the deep agent runtime,
 * 4. streaming back incremental state while saving the final conversation.
 */
export async function POST(request: NextRequest) {
  // Step 1: create a request-scoped correlation id so logs and the client can be
  // matched to the same request, even if the runtime emits many events.
  const requestId = crypto.randomUUID();

  // Step 2: parse the JSON payload defensively. If the client sends malformed JSON,
  // we still continue with an empty object instead of crashing the request.
  const body = await request.json().catch(() => ({})) as {
    message?: unknown;
    currentTab?: string;
    uiContext?: string;
    fileAttachments?: unknown[];
    history?: unknown;
    threadId?: string;
    model?: string;
  };

  // Step 3: require a non-empty user message before we do anything expensive.
  const message = typeof body.message === 'string' ? body.message : '';
  if (!message.trim()) {
    return new Response(event('error', { message: 'Message is required', requestId }), {
      status: 400,
      headers: { 'Content-Type': 'text/event-stream', 'x-request-id': requestId },
    });
  }

  // Step 4: resolve the caller identity. This allows signed-in users and guest users
  // to share a consistent conversation model without duplicating route logic.
  const userId = await resolveUserId().catch(() => null);

  // Step 5: create a per-user or per-IP key for the rate limiter. The goal is to stop
  // spam before the model call and tool execution begin.
  const rlKey = `agent:chat:${userId ?? request.headers.get('x-forwarded-for') ?? 'unknown'}`;
  const rl = await rateLimit({ key: rlKey, max: 30, windowMs: 60_000 });
  if (!rl.ok) {
    return new Response(
      event('error', { message: 'Rate limit reached (30 messages/minute). Please wait a moment.', requestId }),
      {
        status: 429,
        headers: {
          'Content-Type': 'text/event-stream',
          'Retry-After': String(Math.ceil((rl.resetAt - Date.now()) / 1000)),
          'x-request-id': requestId,
        },
      },
    );
  }

  // Step 6: normalize model selection from the client. The UI may send a value like
  // "providerId:modelId", "auto", or nothing at all. Undefined means "use the runtime default".
  // "auto" is normalized to undefined here as well — the runtime treats both the
  // same way (env chain → managed Z.AI), and resolveModel must never see "auto"
  // (parseModelString maps it to a keyless zai:auto pick).
  const rawModel = typeof body.model === 'string' ? body.model.trim() : '';
  const modelString = rawModel && rawModel !== 'auto' ? rawModel : undefined;

  // Step 7: sanitize and trim the recent conversation history. We only keep user and
  // assistant entries, and we cap the total to the most recent 12 turns.
  const history: AgentHistoryEntry[] = Array.isArray(body.history)
    ? body.history
      .filter((entry): entry is AgentHistoryEntry => {
        if (!entry || typeof entry !== 'object') return false;
        const item = entry as Record<string, unknown>;
        return (item.role === 'user' || item.role === 'assistant') && typeof item.content === 'string';
      })
      .slice(-12)
    : [];

  // Step 8: ensure we always have a thread id. This is used both for persistence and
  // for continuity inside the deep-agent runtime.
  const threadId = typeof body.threadId === 'string' && body.threadId.trim() ? body.threadId.trim() : crypto.randomUUID();

  // Step 9: compose a single text blob from tabs, UI state, and uploaded file data so the
  // model understands the current app context and the user request together.
  // Attachments that were auto-ingested into the knowledge library are
  // described as retrievable sources (search_knowledge_base) instead of being
  // dumped as raw JSON — the full content never needs to fit in the prompt.
  // Binary attachments (images/audio) carry a dataUrl: instead of bloating
  // the prompt with megabytes of base64, each is registered server-side and
  // the model gets a short attachment://<id> reference it can pass to the
  // vision / transcription tools.
  const attachments = Array.isArray(body.fileAttachments) ? body.fileAttachments as Array<{
    id?: unknown; name?: unknown; type?: unknown; size?: unknown;
    extractedText?: unknown; knowledge?: unknown; dataUrl?: unknown;
    analysis?: { classification?: unknown; summary?: unknown };
  }> : [];
  const attachmentRefs: string[] = [];
  const attachmentContext = attachments.length > 0
    ? (() => {
        const ingested = attachments.filter((a) => a && typeof a === 'object' && (a as { knowledge?: unknown }).knowledge);
        const plain = attachments.filter((a) => a && typeof a === 'object' && !(a as { knowledge?: unknown }).knowledge);
        const parts: string[] = [];
        if (ingested.length > 0) {
          const lines = ingested.map((a) => {
            const k = (a as { knowledge?: { title?: unknown; chunks?: unknown } }).knowledge;
            return `- "${String((a as { name?: unknown }).name ?? k?.title ?? 'document')}" (${k?.chunks ?? '?'} chunks ingested)`;
          });
          parts.push(
            `The user attached documents that have been INGESTED into their knowledge library:\n${lines.join('\n')}\nUse search_knowledge_base to retrieve their content when answering or generating questions from them, and tell the user these files are now part of their knowledge library.`,
          );
        }
        if (plain.length > 0) {
          // Register binary payloads (dataUrl) and replace them with short refs.
          const described = plain.map((a) => {
            const name = String((a as { name?: unknown }).name ?? 'file');
            const dataUrl = (a as { dataUrl?: unknown }).dataUrl;
            if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
              const id = typeof (a as { id?: unknown }).id === 'string' ? (a as { id: string }).id : `att-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
              const ref = registerAttachment(id, dataUrl, name);
              if (ref) {
                const kind = /^data:image\//.test(dataUrl) ? 'image'
                  : /^data:audio\//.test(dataUrl) ? 'audio'
                  : /^data:video\//.test(dataUrl) ? 'video' : 'file';
                if (kind !== 'file') attachmentRefs.push(`- "${name}" (${kind}): ${ref}`);
                return {
                  id: (a as { id?: unknown }).id,
                  name,
                  type: (a as { type?: unknown }).type,
                  size: (a as { size?: unknown }).size,
                  binaryRef: ref,
                  binaryKind: kind,
                  extractedText: (a as { extractedText?: unknown }).extractedText,
                  analysis: (a as { analysis?: unknown }).analysis,
                };
              }
            }
            return a;
          });
          parts.push(`Uploaded file context:\n${JSON.stringify(described)}`);
          if (attachmentRefs.length > 0) {
            parts.push(
              'Binary attachments registered for this turn (pass the reference EXACTLY as shown to the matching tool):\n' +
              `${attachmentRefs.join('\n')}\n` +
              'Use analyze_visual_material with imageUrl="<image ref>" to see/analyze an uploaded image, edit_medical_illustration with image_url="<image ref>" to edit one, and transcribe_audio with audio_url="<audio ref>" to transcribe uploaded audio. Never invent or truncate these references.',
            );
          }
        }
        return parts.join('\n\n');
      })()
    : '';
  const context = [
    body.currentTab ? `Active MedQ tab: ${body.currentTab}` : '',
    body.uiContext ? `Current app context:\n${body.uiContext}` : '',
    attachmentContext,
  ].filter(Boolean).join('\n\n');

  // Step 10: persist the user message early so the thread list updates immediately.
  // This is intentionally non-blocking and non-fatal; the sidebar is convenience state,
  // while the real response still flows through the agent runtime.
  if (userId) {
    void appendUserMessage(threadId, userId, message.trim()).catch(() => { });
  }

  // Step 11: start the SSE stream and gather the emitted runtime events.
  //
  // ── Detached-run architecture (stream-interruption fix) ──
  // The run's lifetime is decoupled from the SSE wire. `request.signal`
  // aborts the moment the browser reloads / the proxy severs the connection —
  // wiring it straight into the runtime used to kill the LLM stream mid-token,
  // persist a truncated answer, and the client would restore that partial text
  // as if it were final (the exact "streaming stops halfway" bug). Instead the
  // runtime gets a RUN-scoped controller: a disconnect merely stops SSE writes
  // (the `write` guard below), while the run keeps executing server-side and
  // persists the COMPLETE answer to the thread — the reloaded client's restore
  // monitor polls the thread and picks it up.
  //
  // The run stays cancellable through the registry: the UI Stop button posts
  // to /api/agent/chat/v2/cancel, which aborts `runAbort` here. A hard-cap
  // timer is the safety net so a detached run can never outlive its budget.
  const runAbort = new AbortController();
  const RUN_HARD_CAP_MS = 360_000; // 6 min — maxDuration (300s) + margin
  const runCapTimer = setTimeout(() => {
    if (!runAbort.signal.aborted) {
      logger.warn({ requestId, threadId, userId }, 'Run hard-cap reached — aborting detached run');
      runAbort.abort();
    }
  }, RUN_HARD_CAP_MS);
  // The run's replayable event buffer — every write() below appends here
  // so a dropped wire or a page reload can re-attach via
  // GET /v2/events?requestId=&from= and resume the LIVE stream (see
  // runs/registry.ts). Unregistering the run closes the buffer and keeps
  // it replayable for the TTL window.
  const runEvents = new RunEventBuffer();
  registerActiveRun({
    requestId,
    // Guests resolve to a stable fallback id, so this is virtually always
    // set; an (impossible-in-practice) null user simply yields an
    // uncancellable-but-hard-capped detached run.
    ...(userId ? { userId } : {}),
    threadId,
    abort: runAbort,
    startedAt: Date.now(),
    events: runEvents,
  });
  request.signal.addEventListener('abort', () => {
    // Client wire is gone. Deliberately DO NOT abort the run — detach instead.
    // The SSE write guards no-op from here on; persistence still happens.
    logger.info({ requestId, threadId, userId }, 'Client disconnected mid-run — run continues detached server-side');
  }, { once: true });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // This helper writes one SSE frame at a time. It intentionally ignores writes after
      // the client disconnects to avoid queueing data into a dead stream. The frame is
      // ALWAYS appended to the run event buffer first — even after the wire is gone —
      // so a re-attaching client (mid-stream drop or page reload) can replay it.
      const write = (type: string, data: unknown) => {
        runEvents.append(type, data);
        if (request.signal.aborted) return;
        try {
          controller.enqueue(encoder.encode(event(type, data)));
        } catch {
          // The client may cancel the stream before the abort signal is propagated.
        }
      };

      // Attach the request-scoped context used for tracing logs and the final persistence step.
      const ctx: SSEWriteContext = { threadId, requestId };
      const toolCalls: Array<{ id?: string; name: string; args?: unknown }> = [];
      const toolResults: Array<{ toolCallId?: string; toolName: string; content: string; isError?: boolean }> = [];

      // Open tool-call correlation: the runtime's tool_start/tool_end now carry
      // matching ids (tool_call id ↔ tool_call_id). tool.result frames pair
      // with the exact open tool.call by id; the FIFO queue is only a fallback
      // for providers that omit ids — a call must NEVER be conflated with a
      // result just because it happened to be next in line.
      const openToolCallIds: string[] = [];
      const openToolCallSet = new Set<string>();
      const pairToolResultId = (serverId: unknown): string | undefined => {
        if (typeof serverId === 'string' && openToolCallSet.has(serverId)) {
          openToolCallSet.delete(serverId);
          const idx = openToolCallIds.indexOf(serverId);
          if (idx >= 0) openToolCallIds.splice(idx, 1);
          return serverId;
        }
        return openToolCallIds.shift();
      };

      // Inner question-generation agent bookkeeping: inner tool_start events
      // now carry their own correlation ids (tool_call ids for the
      // orchestrator's calls; generated callIds for instrumented subagent
      // tools) — pair results by id, FIFO only as a fallback.
      let genToolSeq = 0;
      const openGenToolIds: string[] = [];
      const openGenToolSet = new Set<string>();
      const pairGenToolResultId = (serverId: unknown): string => {
        if (typeof serverId === 'string' && openGenToolSet.has(serverId)) {
          openGenToolSet.delete(serverId);
          const idx = openGenToolIds.indexOf(serverId);
          if (idx >= 0) openGenToolIds.splice(idx, 1);
          return serverId;
        }
        genToolSeq += 1;
        return openGenToolIds.shift() ?? `gen-tool-${genToolSeq}`;
      };

      let finalText = '';
      let toolIndex = 0;
      // Whether a terminal event (done | error) reached the wire this run.
      // If the runtime generator ends silently — a provider stream that
      // closes without a final message, a merged-iterator early return — the
      // client's consumeSSEStream would just see EOF and the turn would hang
      // as "working…" forever with its partial text dropped. The post-loop
      // guard below synthesizes the terminal event so EVERY run ends with an
      // explicit done or error.
      let wroteTerminal = false;

      // ── SSE heartbeat ──
      // The fronting ALB / preview gateway drops idle connections (~20-60s
      // depending on the hop) and Next's response compression BUFFERS small
      // writes (a ~40-byte ping sits in the zlib buffer for tens of seconds
      // — observed as the client's stale-wire reconnect banner during long
      // tool calls). Two counters, applied together:
      //   • 5s cadence (was 10s) — comfortably under every idle-reaper;
      //   • ~2KB padded frames — each ping FLUSHES the compression buffer
      //     on its own instead of accumulating ~25s worth of tiny frames.
      // A REAL SSE data event (not a comment frame) always counts as
      // traffic for proxies; the client's event switch ignores `ping`.
      const PING_PAD = '.'.repeat(2048);
      const heartbeat = setInterval(() => {
        if (request.signal.aborted) return;
        try {
          controller.enqueue(
            encoder.encode(`event: ping\ndata: {"ts":${Date.now()},"pad":"${PING_PAD}"}\n\n`),
          );
        } catch {
          // The client may cancel the stream before the abort signal is propagated.
        }
      }, 5_000);

      try {
        // The deep-agent runtime emits a sequence of structured events. We consume them
        // and decide which ones should be forwarded to the client as SSE updates.
        for await (const data of streamMedQDeepAgent(message.trim(), context, {
          modelString,
          userId,
          threadId,
          history,
          signal: runAbort.signal,
        })) {
          // Capture incremental text and tool-call metadata for thread
          // persistence. Tool RESULTS are persisted in the switch below,
          // where they pair with their call by correlation id.
          if (data.type === 'token' && typeof data.text === 'string') {
            finalText += data.text;
          } else if (data.type === 'tool_start' && typeof data.tool === 'string') {
            toolCalls.push({ id: typeof data.id === 'string' ? data.id : undefined, name: data.tool, args: data.args });
          }

          // Log every runtime event with request correlation metadata for debugging and
          // observability. This helps match a frontend event with the backend model stream.
          logger.info({ requestId: ctx.requestId, threadId, userId, type: data.type, data }, 'Deep agent event');

          switch (data.type) {
            case 'status':
              write('meta', { requestId: ctx.requestId, threadId, model: data.model });
              break;
            case 'token':
              write('text.delta', { text: data.text });
              break;
            case 'plan':
              write('plan.start', {});
              write('plan.end', { plan: planFromTodos(data.todos) });
              break;
            case 'tool_start': {
              toolIndex += 1;
              const callId = typeof data.id === 'string' && data.id ? data.id : `deep-agent-tool-${toolIndex}`;
              openToolCallIds.push(callId);
              openToolCallSet.add(callId);
              write('tool.call', { toolName: data.tool, args: safeParseArgs(data.args), id: callId });
              break;
            }
            case 'tool_end': {
              const resultId = pairToolResultId(data.id) ?? `deep-agent-tool-${toolIndex}`;
              toolResults.push({
                toolCallId: resultId,
                toolName: data.tool,
                content: (typeof data.result === 'string' ? data.result : data.excerpt ?? '').slice(0, 8000),
                isError: data.status === 'error',
              });
              write('tool.result', {
                toolName: data.tool,
                result: data.result ?? data.excerpt ?? '',
                excerpt: data.excerpt ?? '',
                status: data.status,
                id: resultId,
                // [K#] knowledge citations for hover-cards (search_knowledge only)
                citations: data.citations,
                // [S#] web citations for clickable source cards
                // (search_medical_references only)
                webCitations: data.webCitations,
              });
              break;
            }
            case 'subagent':
              write('subagent', { name: data.name, event: data.event });
              break;
            case 'subagent_delta':
              // Live narration from inside a `task` subagent (docs' specialist
              // streaming cards). Replays identically on re-attach.
              write('subagent.delta', { name: data.name, text: data.text });
              break;
            case 'generation_event': {
              // Live activity from the COMPLETE question-generation agent the
              // chat agent launched through run_question_generation_agent.
              // Mapped onto chat SSE events so the floating assistant panel
              // shows the sub-agent working in real time.
              const inner = data.event as DeepAgentEvent;
              switch (inner.type) {
                case 'plan':
                  // Surface the generation agent's own todo plan in the PlanCard.
                  write('plan.start', {});
                  write('plan.end', { plan: planFromTodos(inner.todos) });
                  break;
                case 'tool_start': {
                  genToolSeq += 1;
                  const genId = typeof inner.id === 'string' && inner.id ? inner.id : `gen-tool-${genToolSeq}`;
                  openGenToolIds.push(genId);
                  openGenToolSet.add(genId);
                  toolCalls.push({ id: genId, name: inner.tool, args: inner.args });
                  // The CALL side: real parsed args (previously hardcoded {}
                  // here, which surfaced as the empty "Request {}" cards).
                  write('generation.tool.call', { toolName: inner.tool, args: safeParseArgs(inner.args), id: genId });
                  break;
                }
                case 'tool_end': {
                  const genId = pairGenToolResultId(inner.id);
                  toolResults.push({ toolCallId: genId, toolName: inner.tool, content: (inner.excerpt ?? '').slice(0, 8000), isError: !inner.ok });
                  // The RESULT side: a real excerpt of what the tool returned
                  // (previously the literal string 'completed').
                  write('generation.tool.result', {
                    toolName: inner.tool,
                    result: inner.excerpt ?? (inner.ok ? 'completed' : 'failed'),
                    excerpt: inner.excerpt ?? '',
                    status: inner.ok ? 'ok' : 'error',
                    durationMs: inner.durationMs,
                    id: genId,
                  });
                  break;
                }
                case 'subagent':
                  write('subagent', { name: inner.name, event: inner.event });
                  break;
                case 'saved':
                  write('generation.saved', { question: inner.question, index: inner.index });
                  break;
                default:
                  // inner status / done / error are folded into the wrapper
                  // tool result and the chat agent's final summary text.
                  break;
              }
              break;
            }
            case 'memory':
              write('memory', {
                summaryTurnCount: data.summaryTurnCount,
                episodes: data.episodes.map((entry) => ({
                  score: 0.8,
                  userMessage: `${entry.scope}: ${entry.content}`,
                  createdAt: new Date().toISOString(),
                })),
              });
              break;
            case 'approval_required':
              write('approval_required', { ...data.approval });
              break;
            case 'clarification_required':
              // ask_user's interactive form card — the client renders the
              // fields; answers return as the next user message.
              write('clarification_required', { ...data.clarification });
              break;
            case 'ui_actions':
              // ui_action tool dispatches — mapped onto the client's existing
              // `actions` event (AgentAction shape: the full payload rides in
              // uiAction; the client executes them LIVE and deduplicates the
              // turn-end replay via finalizeTurn).
              write('actions', {
                actions: (Array.isArray(data.actions) ? data.actions : []).map(
                  (raw: Record<string, unknown>) => ({
                    type: String(raw.type ?? 'unknown'),
                    params: raw,
                    description: `UI action: ${String(raw.type ?? 'unknown')}`,
                    uiAction: raw,
                  }),
                ),
              });
              break;
            case 'model_fallback':
              write('model.fallback', { from: data.from, to: data.to, reason: data.reason, threadId: ctx.threadId });
              break;
            case 'paused':
              write('paused', { reason: data.reason, threadId: ctx.threadId });
              break;
            case 'done': {
              finalText = data.text || finalText;
              // ── Anti-fabrication guard ──
              // The fast model occasionally pattern-matches earlier
              // successful turns and writes a "✅ Created Successfully!"
              // report with a fabricated image/artifact link WITHOUT any
              // tool call (observed live twice in the "Medical Image
              // Creation Skill" chat). Cross-check every deliverable
              // reference against reality (disk + artifact store + this
              // turn's tool results) and strip the fabricated ones before
              // the answer reaches the client or the thread store.
              const fabrication = await stripFabricatedDeliverableClaims(finalText, toolResults, userId);
              if (fabrication.removed.length > 0) {
                logger.warn(
                  { requestId: ctx.requestId, threadId, userId, removed: fabrication.removed },
                  'Anti-fabrication guard: removed unverified deliverable claims from the final answer',
                );
                finalText = fabrication.text;
              }
              wroteTerminal = true;
              write('done', { text: finalText, llmCallCount: typeof data.llmCalls === 'number' && data.llmCalls > 0 ? data.llmCalls : 1 });
              break;
            }
            case 'error':
              wroteTerminal = true;
              write('error', { message: friendlyAgentError(String(data.error)) });
              break;
          }
        }

        // ── Terminal-event guarantee ──
        // The runtime ended without done/error (silent generator end). Give
        // the client an honest terminal frame: whatever text/tools were
        // produced is the answer (the finally block below persists it); an
        // entirely empty run is an error, not a silent success.
        if (!wroteTerminal && !request.signal.aborted) {
          if (finalText.trim() !== '' || toolResults.length > 0) {
            logger.warn({ requestId: ctx.requestId, threadId, userId }, 'Deep agent stream ended without a terminal event — synthesizing done');
            // Same anti-fabrication guard on the synthesized path.
            const fabrication = await stripFabricatedDeliverableClaims(finalText, toolResults, userId);
            if (fabrication.removed.length > 0) {
              logger.warn(
                { requestId: ctx.requestId, threadId, userId, removed: fabrication.removed },
                'Anti-fabrication guard: removed unverified deliverable claims from the synthesized done',
              );
              finalText = fabrication.text;
            }
            write('done', {
              text: finalText || '(the run produced tool results but no final text)',
              llmCallCount: 1,
            });
          } else {
            logger.warn({ requestId: ctx.requestId, threadId, userId }, 'Deep agent stream ended empty without a terminal event — synthesizing error');
            write('error', {
              message: 'The response ended unexpectedly early. Please try again — the message was not lost.',
              requestId: ctx.requestId,
            });
          }
        }
      } catch (error) {
        // If the runtime fails midway, we still send a final error event so the client
        // can surface the failure instead of sitting on a dead stream.
        logger.error({ requestId: ctx.requestId, threadId, userId, error }, 'Deep agent request failed');
        write('error', {
          message: friendlyAgentError(error instanceof Error ? error.message : String(error)),
          requestId: ctx.requestId,
        });
      } finally {
        clearInterval(heartbeat);
        clearTimeout(runCapTimer);
        unregisterActiveRun(requestId);

        // Save the final assistant response whenever the run produced content —
        // INCLUDING when the client's connection dropped mid-stream (proxy idle
        // timeout, mobile network switch, laptop sleep, page reload). With the
        // detached-run architecture the deep-agent run keeps executing
        // server-side and finishes normally, so the persisted row is the
        // COMPLETE answer; the reloaded client polls the thread and recovers it
        // (see useAgentV2Stream recovery + the V3 restore monitor).
        // The only skips: the approval-paused turn (the follow-up resume call
        // appends the final message) and a genuinely empty run.
        //
        // A run that was ABORTED mid-generation (explicit Stop via the cancel
        // endpoint, or the hard-cap safety net) may still have partial text —
        // persist it, but flagged `interrupted` so the restore path tells the
        // user the answer is incomplete instead of passing it off as final.
        const paused = finalText === '' && toolCalls.length === 0 && toolResults.length === 0;
        const produced = finalText !== '' || toolCalls.length > 0 || toolResults.length > 0;
        const interrupted = runAbort.signal.aborted && finalText !== '';
        // ask_user turns legitimately end with no narration (the runtime
        // hard-stops the model at the form). The persisted message still
        // needs non-empty content — the thread-switch/refresh restore drops
        // empty rows, and it is the row that re-derives the unanswered form
        // from its tool call args.
        const askedClarification = toolCalls.some((c) => (c.name ?? '') === 'ask_user');
        if (userId && !paused && produced) {
          void appendAssistantMessage(
            threadId,
            finalText
              || (askedClarification
                ? '(question form shown — answer it to continue)'
                : '(tool run interrupted — no text was produced)'),
            {
              ...(toolCalls.length || toolResults.length ? { toolCalls, toolResults } : {}),
              interrupted,
            },
          ).catch(() => { });
        }

        if (!request.signal.aborted) {
          try {
            controller.close();
          } catch {
            // Closing an already-canceled response stream is harmless and should not throw.
          }
        }
      }
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      // Bypass Next's response compression: its zlib layer buffers small
      // SSE writes, delaying pings/token deltas by tens of seconds — the
      // direct cause of the client's stale-wire reconnects on long turns.
      // 'identity' makes the compression layer skip this response entirely.
      'Content-Encoding': 'identity',
      'x-request-id': requestId,
      'x-thread-id': threadId,
    },
  });
}