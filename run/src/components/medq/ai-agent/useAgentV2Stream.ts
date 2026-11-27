'use client';

/**
 * useAgentV2Stream — React hook that consumes the v2 SSE agent endpoint.
 *
 * Replaces the existing fetch-then-render pattern in MedQAgent.tsx with a
 * streaming-first approach. Surfaces incremental state via a reducer so the
 * UI can show:
 *
 *   - Plan card  (the planner's reasoning + ordered steps)
 *   - Step progress (which step is executing, how many tool calls)
 *   - Tool call spinners (live as the executor dispatches each tool)
 *   - Streaming text (token-by-token deltas)
 *   - Memory badge ("I recalled 3 past turns from your history")
 *   - Final actions / cards / multimodal batches
 *   - Error / blocked states
 *
 * Usage:
 *
 *   const agent = useAgentV2Stream();
 *   await agent.send({ message: 'make me a study plan', currentTab: 'dashboard' });
 *   // agent.state.plan, agent.state.streamingText, agent.state.toolCalls, etc.
 *
 * The hook uses fetch + ReadableStream (NOT EventSource, which doesn't
 * support POST bodies). All parsing is done locally — no external SSE lib.
 */

import { useReducer, useCallback, useRef, useState } from 'react';
import {
  normalizeClarificationPayload,
  type ClarificationPayload,
} from '@/lib/agent/clarification';

// ─── Types ──────────────────────────────────────────────────────────────

export interface PlanStep {
  id: string;
  description: string;
  toolHint?: string;
  expectedArgs?: string;
  /** Explicit per-step status from write_todos (todoListMiddleware) —
   * pending/in_progress/completed. Absent for inferred plans. */
  status?: 'pending' | 'in_progress' | 'completed';
}

export interface Plan {
  reasoning: string;
  needsTools: boolean;
  steps: PlanStep[];
}

export interface ToolCall {
  id: string;           // synthetic, generated client-side
  toolName: string;
  args: unknown;
  status: 'running' | 'completed' | 'failed';
  result?: string;
  startedAt: number;
  endedAt?: number;
}

export interface RecalledEpisode {
  score: number;
  userMessage: string;
  createdAt: string;
}

export interface AgentAction {
  type: string;
  params: Record<string, unknown>;
  description: string;
  uiAction?: Record<string, unknown>;
}

export interface MessageCard {
  type: string;
  title: string;
  subtitle?: string;
  details?: Record<string, string>;
  action?: { label: string; tab: string };
  [k: string]: unknown;
}

export interface MultimodalBlock {
  type: string;
  [k: string]: unknown;
}

/** One [K#] knowledge citation collected from search_knowledge tool results. */
export interface KnowledgeCitation {
  ref: string;
  title: string;
  sourceId?: string;
  relevance?: number;
  excerpt?: string;
}

/** Web citation ([S#]) from search_medical_references — rendered as a
 *  clickable source chip inline and a web-sources card under the message. */
export interface WebCitation {
  ref: string;
  title: string;
  url: string;
  snippet?: string;
  host?: string;
  date?: string;
}

/** The full question payload attached to `generation.saved` cards so the chat
 *  can render an interactive (answerable) question card instead of a preview. */
export interface SavedQuestionPayload {
  id: string;
  type: string;
  text: string;
  options: string[];
  answer: string;
  explanation: string;
  mnemonic?: string;
  clinicalPearl?: string;
  difficulty?: string;
  system?: string;
  topic?: string;
  imageUrl?: string;
  reviewStatus?: string;
}

/** Trim the raw saved-question record to the fields the interactive card needs
 *  (keeps persisted chat messages lean — no tags arrays, no audit fields). */
function toQuestionPayload(raw: Record<string, unknown>): SavedQuestionPayload {
  const options = Array.isArray(raw.options)
    ? raw.options.map((o) => String(o)).filter(Boolean)
    : typeof raw.options === 'string'
      ? (() => { try { const p = JSON.parse(raw.options); return Array.isArray(p) ? p.map(String) : []; } catch { return []; } })()
      : [];
  return {
    id: String(raw.id ?? ''),
    type: String(raw.type ?? 'mcq'),
    text: String(raw.text ?? ''),
    options,
    answer: String(raw.answer ?? ''),
    explanation: String(raw.explanation ?? ''),
    mnemonic: raw.mnemonic ? String(raw.mnemonic) : undefined,
    clinicalPearl: raw.clinicalPearl ? String(raw.clinicalPearl) : undefined,
    difficulty: raw.difficulty ? String(raw.difficulty) : undefined,
    system: raw.system ? String(raw.system) : undefined,
    topic: raw.topic ? String(raw.topic) : undefined,
    imageUrl: raw.imageUrl ? String(raw.imageUrl) : undefined,
    reviewStatus: raw.reviewStatus ? String(raw.reviewStatus) : undefined,
  };
}

/** Live HITL approval request surfaced by the agent mid-run. */
export interface PendingApproval {
  approvalId: string;
  threadId: string;
  tool: string;
  capability: string;
  args: unknown;
  description?: string;
}

/** Live ask_user form surfaced by the agent (component-held so it survives
 * the turn's completion — the learner answers at their own pace). */
export type PendingClarification = ClarificationPayload;

/** A `task`-delegated specialist streaming live in the turn (docs' subagent cards). */
export interface SubagentStream {
  name: string;
  text: string;
  status: 'running' | 'completed';
}

export interface AgentV2State {
  /** 'idle' | 'classifying' | 'planning' | 'executing' | 'awaiting_approval' | 'recovering' | 'done' | 'error' | 'blocked' */
  phase: 'idle' | 'classifying' | 'planning' | 'executing' | 'awaiting_approval' | 'recovering' | 'done' | 'error' | 'blocked';
  /** The plan, once received from the planner */
  plan: Plan | null;
  /** Index of the currently-executing step (0-based) */
  currentStepIndex: number;
  /** Step results: per-step tool call count + elapsedMs */
  stepResults: Array<{ toolCalls: number; elapsedMs: number; done: boolean }>;
  /** Live tool calls (completed + in-flight) */
  toolCalls: ToolCall[];
  /** Streaming text — concatenated deltas so far */
  streamingText: string;
  /** Memory recall info */
  memory: { summaryTurnCount: number; episodes: RecalledEpisode[] } | null;
  /** Final actions emitted by the agent */
  actions: AgentAction[];
  /** Final cards emitted by the agent */
  cards: MessageCard[];
  /** Final multimodal blocks emitted by the agent */
  multimodal: MultimodalBlock[];
  /** Knowledge citations ([K#]) collected from search_knowledge tool results */
  citations: KnowledgeCitation[];
  /** Web citations ([S#]) collected from search_medical_references tool results */
  webCitations: WebCitation[];
  /** Final text (== streamingText at end, possibly modified by guardrails) */
  finalText: string;
  /** LLM call count for observability */
  llmCallCount: number;
  /** Error message, if phase === 'error' */
  error: string | null;
  /** Request ID for cross-referencing with logs */
  requestId: string | null;
  /** Pending human-in-the-loop approval (set while the agent waits on a
   * gated tool; cleared when the turn completes or the user decides). */
  pendingApproval: PendingApproval | null;
  /** The decision the user gave for pendingApproval ('approved' flips the
   * card, then the run continues; 'rejected' likewise). */
  approvalDecision: 'approved' | 'rejected' | null;
  /** Live specialist subagent streams (task-tool delegations). Cards are
   * created lazily on the first subagent.delta frame and completed by the
   * subagent completed event / turn end. */
  subagents: SubagentStream[];
  /** True when finalText is a PARTIAL answer persisted after an interruption
   *  (user Stop, abort) rather than a completed run — the UI marks the
   *  message "may be incomplete" instead of presenting it as final. */
  interrupted?: boolean;
}

const INITIAL_STATE: AgentV2State = {
  phase: 'idle',
  plan: null,
  currentStepIndex: -1,
  stepResults: [],
  toolCalls: [],
  streamingText: '',
  memory: null,
  actions: [],
  cards: [],
  multimodal: [],
  citations: [],
  webCitations: [],
  finalText: '',
  llmCallCount: 0,
  error: null,
  requestId: null,
  pendingApproval: null,
  approvalDecision: null,
  subagents: [],
  interrupted: false,
};

// ─── Reducer ────────────────────────────────────────────────────────────

type Action =
  | { type: 'RESET' }
  | { type: 'START' }
  | { type: 'META'; requestId: string }
  | { type: 'PLAN_START' }
  | { type: 'PLAN_END'; plan: Plan }
  | { type: 'PLAN_ERROR'; error: string }
  | { type: 'STEP_START'; stepIndex: number; totalSteps: number }
  | { type: 'STEP_END'; stepIndex: number; elapsedMs: number; toolCalls: number }
  | { type: 'TOOL_CALL'; id: string; toolName: string; args: unknown }
  | { type: 'TOOL_RESULT'; id: string; result: string; failed?: boolean }
  | { type: 'TOOL_ANNOTATE_SUBAGENT'; subagent: string; fallbackId: string }
  | { type: 'CITATIONS'; citations: KnowledgeCitation[] }
  | { type: 'WEB_CITATIONS'; webCitations: WebCitation[] }
  | { type: 'TEXT_DELTA'; text: string }
  | { type: 'MEMORY'; summaryTurnCount: number; episodes: RecalledEpisode[] }
  | { type: 'ACTIONS'; actions: AgentAction[] }
  | { type: 'CARDS'; cards: MessageCard[] }
  | { type: 'MULTIMODAL'; blocks: MultimodalBlock[] }
  | { type: 'DONE'; text: string; llmCallCount: number; interrupted?: boolean }
  | { type: 'ERROR'; message: string }
  | { type: 'RECOVERING' }
  | { type: 'APPROVAL_REQUIRED'; approval: PendingApproval }
  | { type: 'APPROVAL_DECIDED'; decision: 'approved' | 'rejected' }
  | { type: 'SUBAGENT_DELTA'; name: string; text: string }
  | { type: 'SUBAGENT_STATUS'; name: string; status: 'running' | 'completed' };

function reducer(state: AgentV2State, action: Action): AgentV2State {
  switch (action.type) {
    case 'RESET':
      return { ...INITIAL_STATE };
    case 'START':
      return { ...INITIAL_STATE, phase: 'classifying' };
    case 'META':
      return { ...state, requestId: action.requestId };
    case 'PLAN_START':
      return { ...state, phase: 'planning' };
    case 'PLAN_END':
      return {
        ...state,
        phase: 'executing',
        plan: action.plan,
        // Pre-fill stepResults with empty slots if there are steps
        stepResults: action.plan.steps.map(() => ({ toolCalls: 0, elapsedMs: 0, done: false })),
        currentStepIndex: action.plan.steps.length > 0 ? 0 : -1,
      };
    case 'PLAN_ERROR':
      // Fallback path — planner failed, executor goes single-shot
      return { ...state, phase: 'executing', plan: null };
    case 'STEP_START':
      return { ...state, currentStepIndex: action.stepIndex };
    case 'STEP_END': {
      const next = [...state.stepResults];
      if (next[action.stepIndex]) {
        next[action.stepIndex] = {
          toolCalls: action.toolCalls,
          elapsedMs: action.elapsedMs,
          done: true,
        };
      }
      return { ...state, stepResults: next };
    }
    case 'TOOL_CALL':
      return {
        ...state,
        toolCalls: [
          ...state.toolCalls,
          {
            id: action.id,
            toolName: action.toolName,
            args: action.args,
            status: 'running',
            startedAt: Date.now(),
          },
        ],
      };
    case 'TOOL_RESULT': {
      const nextStatus: ToolCall['status'] = action.failed ? 'failed' : 'completed';
      return {
        ...state,
        toolCalls: state.toolCalls.map(tc =>
          tc.id === action.id
            ? { ...tc, status: nextStatus, result: action.result, endedAt: Date.now() }
            : tc,
        ),
      };
    }
    case 'TOOL_ANNOTATE_SUBAGENT': {
      // A `task` delegation: rename the LAST still-running plain task chip to
      // `task → <specialist> subagent` so one delegation = ONE chip (the chip
      // completes via the task tool result, not a separate subagent chip).
      for (let i = state.toolCalls.length - 1; i >= 0; i -= 1) {
        const tc = state.toolCalls[i];
        if (tc.toolName === 'task' && tc.status === 'running') {
          const next = [...state.toolCalls];
          next[i] = { ...tc, toolName: `task → ${action.subagent} subagent` };
          return { ...state, toolCalls: next };
        }
      }
      // Defensive fallback: no pending task chip (a subagent event without
      // its task call — e.g. an older server) — still show the delegation.
      return {
        ...state,
        toolCalls: [...state.toolCalls, {
          id: action.fallbackId,
          toolName: `task → ${action.subagent} subagent`,
          args: {},
          status: 'running' as const,
          startedAt: Date.now(),
        }],
      };
    }
    case 'CITATIONS': {
      // Merge by ref — later searches overwrite earlier refs with the same
      // number (the agent's citations refer to its most recent retrieval).
      const byRef = new Map(state.citations.map((c) => [c.ref, c]));
      for (const c of action.citations) byRef.set(c.ref, c);
      return { ...state, citations: [...byRef.values()] };
    }
    case 'WEB_CITATIONS': {
      const byRef = new Map(state.webCitations.map((c) => [c.ref, c]));
      for (const c of action.webCitations) byRef.set(c.ref, c);
      return { ...state, webCitations: [...byRef.values()] };
    }
    case 'TEXT_DELTA':
      return { ...state, phase: 'executing', streamingText: state.streamingText + action.text };
    case 'MEMORY':
      return { ...state, memory: { summaryTurnCount: action.summaryTurnCount, episodes: action.episodes } };
    case 'ACTIONS':
      return { ...state, actions: action.actions };
    case 'CARDS':
      return { ...state, cards: action.cards };
    case 'MULTIMODAL':
      return { ...state, multimodal: action.blocks };
    case 'DONE':
      return { ...state, phase: 'done', finalText: action.text, llmCallCount: action.llmCallCount, interrupted: action.interrupted === true, pendingApproval: null, approvalDecision: null };
    case 'ERROR':
      return { ...state, phase: 'error', error: action.message, pendingApproval: null, approvalDecision: null };
    case 'RECOVERING':
      // The SSE wire died mid-turn but the server-side agent run continues
      // and will persist the finished answer — the client is now polling the
      // thread store for it. Same visual surface as 'executing' (spinner keeps
      // running, partial text stays on screen) with an honest phase label.
      // The pendingApproval card SURVIVES: the parked tool is still waiting
      // server-side and the decision POST is wire-independent. Wiping the
      // card here used to strand the run behind a vanished approval form
      // until the 6-minute hard-cap killed it (observed live, run 93065f13).
      return { ...state, phase: 'recovering' };
    case 'APPROVAL_REQUIRED':
      // A gated tool paused for a human decision. The run is still live —
      // the phase tells the status badge to show "waiting for you" instead
      // of a generic spinner.
      return { ...state, phase: 'awaiting_approval', pendingApproval: action.approval, approvalDecision: null };
    case 'APPROVAL_DECIDED':
      // The user answered the card — resume the executing visual state; the
      // server-side tool unblocks and its result arrives as a normal
      // tool.result / token stream from here.
      return { ...state, phase: 'executing', approvalDecision: action.decision };
    case 'SUBAGENT_DELTA': {
      // Append live narration to the specialist's card (lazy-create). Text is
      // capped so a pathological delegation can't balloon client memory.
      const MAX_SUBAGENT_TEXT = 6000;
      const existing = state.subagents.find((s) => s.name === action.name);
      if (!existing) {
        return {
          ...state,
          subagents: [...state.subagents, { name: action.name, text: action.text.slice(0, MAX_SUBAGENT_TEXT), status: 'running' }],
        };
      }
      return {
        ...state,
        subagents: state.subagents.map((s) =>
          s.name === action.name
            ? { ...s, text: (s.text + action.text).slice(0, MAX_SUBAGENT_TEXT) }
            : s,
        ),
      };
    }
    case 'SUBAGENT_STATUS': {
      const existing = state.subagents.find((s) => s.name === action.name);
      if (!existing) return state; // no card yet — nothing to mark
      return {
        ...state,
        subagents: state.subagents.map((s) =>
          s.name === action.name
            ? { ...s, status: action.status, ...(action.status === 'running' ? { text: '' } : {}) }
            : s,
        ),
      };
    }
    default:
      return state;
  }
}

// ─── SSE parsing ────────────────────────────────────────────────────────

/** How a consumeSSEStream call ended. */
type SSEConsumptionStatus = 'eof' | 'aborted' | 'recycled';

/**
 * Minimal SSE parser. Reads chunked text from a ReadableStream, buffers
 * partial events, and dispatches complete {event, data} pairs to the
 * provided callback.
 *
 * SSE wire format:
 *   event: <name>\n
 *   data: <json>\n\n
 *
 * Lines are LF-terminated; events separated by a blank line.
 *
 * Proactive wire recycling: the preview gateway caps SSE connections at
 * ~3 minutes of TOTAL lifetime (observed live: the wire died at exactly
 * ~181s while 10s heartbeats flowed — an absolute cap, not an idle
 * reaper). Pass `recycleAt` (epoch ms) to swap the wire BEFORE the cap
 * kills it: on the deadline the reader is cancelled (graceful teardown —
 * the in-flight read settles as EOF, no exception path) and the function
 * returns 'recycled' so the caller can re-attach seamlessly through the
 * events replay instead of entering the visible "connection interrupted"
 * recovery.
 */
async function consumeSSEStream(
  body: ReadableStream<Uint8Array>,
  onEvent: (event: string, data: unknown) => void,
  signal?: AbortSignal,
  recycleAt?: number,
  staleAfterMs?: number,
): Promise<SSEConsumptionStatus> {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let recycled = false;
  let recycleTimer: ReturnType<typeof setTimeout> | null = null;
  let lastEventAt = Date.now();
  let staleTimer: ReturnType<typeof setInterval> | null = null;
  const recycleNow = () => {
    recycled = true;
    // reader.cancel() fulfills the pending read() with {done:true} and
    // tears the connection down cleanly — no dangling fetch, no half-read.
    void reader.cancel().catch(() => { /* already errored/closed */ });
  };
  if (recycleAt !== undefined) {
    const remaining = recycleAt - Date.now();
    if (remaining <= 0) recycleNow();
    else recycleTimer = setTimeout(recycleNow, remaining);
  }
  // Stale-wire sentinel: pings every 10s mean a silent wire is a dying wire.
  // Fires the SAME graceful recycle as the planned swap (returns
  // 'recycled'), so the caller re-attaches silently instead of waiting for
  // EOF/watchdog. Skipped while polling-style usage (no events expected) —
  // callers that expect silence simply don't pass staleAfterMs.
  if (staleAfterMs !== undefined) {
    staleTimer = setInterval(() => {
      if (Date.now() - lastEventAt > staleAfterMs) recycleNow();
    }, 5_000);
  }

  try {
    while (true) {
      if (signal?.aborted) break;
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });

      // Split on double-newline (event boundary) — but be careful: a chunk
      // may end mid-event. Only process complete events.
      let sepIdx: number;
      while ((sepIdx = buffer.indexOf('\n\n')) >= 0) {
        const rawEvent = buffer.slice(0, sepIdx);
        buffer = buffer.slice(sepIdx + 2);
        const parsed = parseSSEEvent(rawEvent);
        if (parsed) {
          lastEventAt = Date.now();
          onEvent(parsed.event, parsed.data);
        }
      }
    }
    // Flush any trailing event (server may not have sent final \n\n)
    if (buffer.trim()) {
      const parsed = parseSSEEvent(buffer);
      if (parsed) {
        lastEventAt = Date.now();
        onEvent(parsed.event, parsed.data);
      }
    }
  } finally {
    if (recycleTimer !== null) clearTimeout(recycleTimer);
    if (staleTimer !== null) clearInterval(staleTimer);
    reader.releaseLock();
  }
  if (recycled) return 'recycled';
  if (signal?.aborted) return 'aborted';
  return 'eof';
}

function parseSSEEvent(raw: string): { event: string; data: unknown } | null {
  let event = 'message';
  const dataLines: string[] = [];
  for (const line of raw.split('\n')) {
    if (line.startsWith('event:')) event = line.slice(6).trim();
    else if (line.startsWith('data:')) dataLines.push(line.slice(5).trim());
  }
  if (dataLines.length === 0) return null;
  const dataStr = dataLines.join('\n');
  try {
    return { event, data: JSON.parse(dataStr) };
  } catch {
    return { event, data: dataStr };
  }
}

// ─── Live re-attach (stream-interruption recovery) ───────────────────────
//
// The server keeps a replayable ring buffer of every SSE frame a run emits
// (runs/registry.ts) and exposes it at GET /v2/events?requestId=&from=.
// `from` is 1-based and mirrors the number of BUFFERED events the client
// already processed — so a dropped wire resumes exactly where it died and a
// page reload (from=1) rebuilds the whole in-flight turn: tool chips, plan,
// approvals and streaming text all re-render through the same reducer.
//
// This key stores the in-flight turn's requestId so a freshly reloaded panel
// can find the run. Written on the `meta` event, cleared when the turn ends
// locally (done/error/cancel) or when re-attach discovers the run is gone.
const ACTIVE_REQUEST_KEY = 'medq-agent-active-request';

function persistActiveRequest(requestId: string): void {
  try { localStorage.setItem(ACTIVE_REQUEST_KEY, requestId); } catch { /* private mode */ }
}

function clearActiveRequest(): void {
  try { localStorage.removeItem(ACTIVE_REQUEST_KEY); } catch { /* private mode */ }
}

function readActiveRequest(): string | null {
  try { return localStorage.getItem(ACTIVE_REQUEST_KEY); } catch { return null; }
}

/** Frame types the server buffers — the client's event counter must advance
 *  on exactly these (and only these) so `from` stays in sync. The events
 *  endpoint's own control frames (ping/reattach/reattach.end) are never
 *  buffered and must not be counted. */
function isCountedRunEvent(event: string): boolean {
  return event !== 'ping' && event !== 'reattach' && event !== 'reattach.end';
}

/** Proactively swap the SSE wire this far into its lifetime — before the
 *  gateway's connection lifetime cap kills it (heartbeats prevent
 *  idle-reaping but not an absolute lifetime cap; the previously observed
 *  cap was ~181s on the team VPS, and sandbox preview gateways can be
 *  tighter). A swap re-attaches via GET /v2/events, which replays every
 *  buffered frame the client missed — lossless, and invisible to the user
 *  when done on purpose (no RECOVERING phase, no banner, no toast).
 *  2026-10-25: 150s → 110s after background-tab timer throttling made the
 *  recycle fire late (server saw the POST wire die at ~181s). Now 110s →
 *  60s: the sandbox preview gateway proved tighter than 181s (users still
 *  saw "Connection interrupted" on long turns), and a swap costs one cheap
 *  re-attach — 60s keeps ~30s+ of throttle margin under any plausible cap
 *  while costing at most one extra silent swap per long turn. */
const WIRE_RECYCLE_MS = 60_000;

/** A healthy wire delivers a server ping every 10s. If NOTHING arrives for
 *  this long (3+ missed heartbeats), the wire is going dark — a gateway
 *  stall, a throttled/frozen page that just woke up to a dead socket, or an
 *  upstream hiccup. Swapping it proactively (same lossless replay path as a
 *  planned recycle) turns what used to be a 3-minute "No data from the
 *  server" watchdog abort into a sub-minute silent reconnect. Checked from
 *  INSIDE the read loop's companion interval, so it also fires right after a
 *  frozen tab unfreezes (the pending read resolves with EOF or stale data,
 *  the gap check trips, the wire swaps — no user-visible interruption). */
const WIRE_STALE_MS = 35_000;

/** How long the initial POST may take to return response HEADERS.
 * The route flushes SSE headers within milliseconds of receiving the
 * request, so a POST that hasn't produced headers in this window is a
 * black-holed connection (preview-gateway hiccup — observed live: a
 * "Create flashcards…" turn whose POST never reached the app; zero
 * server-side events, yet the client sat on the pending fetch for the
 * full 3-minute watchdog before erroring). Killing the wire here and
 * probing whether the server got the turn turns that dead end into an
 * invisible retry — the same recovery the 502/503/504 path already had. */
const POST_HEADERS_TIMEOUT_MS = 30_000;

/** Same idea for the re-attach GET /events fetches: a re-attach that
 * hasn't produced headers in this window is a dead wire, not a slow one
 * (the events endpoint also flushes immediately). Without this, one
 * black-holed re-attach would eat the whole stall-watchdog budget. */
const REATTACH_HEADERS_TIMEOUT_MS = 20_000;

/** Dependencies the shared turn-event handler needs from its driving turn. */
interface TurnHandlerDeps {
  /** Dispatch + mirror the action into the turn's final state. */
  applyAction: (action: Action) => void;
  /** The hook's per-client tool-call counter (reset by the driving turn). */
  toolCallCounterRef: { current: number };
  /** Bump the turn's processed-event counter (re-attach resume position). */
  noteEvent: () => void;
  /** meta event arrived — record + persist the run's requestId. */
  onMeta: (requestId: string) => void;
  /** Terminal events. */
  onComplete: (text: string) => void;
  onError: (message: string) => void;
  /** ask_user fired — surface the interactive form to the UI (component
   * state, NOT turn state: the card must outlive the turn's DONE so the
   * learner can still answer after the agent finishes). */
  onClarification?: (payload: PendingClarification) => void;
}

/**
 * Create the turn event handler — the single SSE switch shared by send()
 * AND reattach(). Owns the per-stream pairing maps (server tool_call id →
 * client chip id, generation-agent ids, subagent orphans, saved-question
 * cards). A re-attached stream MUST reuse the same handler instance so a
 * tool.call from before the wire drop still pairs with its result after
 * the resume.
 */
function createTurnEventHandler(deps: TurnHandlerDeps) {
  // Track tool calls so we can correlate TOOL_CALL → TOOL_RESULT. The
  // server pairs results to calls by correlation id (tool_call ids);
  // serverIdToClient maps those to this client's chip ids, with a FIFO
  // fallback for providers that omit ids. A result for an unknown id
  // never silently completes a different call.
  const pendingToolCalls: string[] = [];
  const serverIdToClient = new Map<string, string>();

  // Inner question-generation agent: same id-based pairing for its tool
  // chips, plus a card per saved question.
  let genToolCounter = 0;
  const pendingGenToolCalls: string[] = [];
  const genServerIdToClient = new Map<string, string>();
  let subagentCounter = 0;
  // Subagent chips created WITHOUT a preceding task chip (defensive
  // path only) — completed by their own subagent completed event.
  const orphanSubagentChips: string[] = [];
  const savedCards: MessageCard[] = [];

  return (event: string, data: unknown) => {
    if (isCountedRunEvent(event)) deps.noteEvent();
    const payload = data as Record<string, unknown>;
    switch (event) {
      case 'ping':
        // Server keep-alive frame (every 10s during silent agent steps).
        // Pure wire-warming — nothing to render.
        break;
      case 'meta':
        if (typeof payload.requestId === 'string') {
          deps.onMeta(payload.requestId);
          deps.applyAction({ type: 'META', requestId: payload.requestId });
        }
        break;
      case 'plan.start':
        deps.applyAction({ type: 'PLAN_START' });
        break;
      case 'plan.end':
        if (payload && typeof payload.plan === 'object') deps.applyAction({ type: 'PLAN_END', plan: payload.plan as Plan });
        break;
      case 'plan.error':
        deps.applyAction({ type: 'PLAN_ERROR', error: typeof payload.error === 'string' ? payload.error : 'unknown' });
        break;
      case 'step.start':
        deps.applyAction({ type: 'STEP_START', stepIndex: Number(payload.index ?? 0), totalSteps: Number(payload.total ?? 0) });
        break;
      case 'step.end':
        deps.applyAction({ type: 'STEP_END', stepIndex: Number(payload.index ?? 0), elapsedMs: Number(payload.elapsedMs ?? 0), toolCalls: Number(payload.toolCalls ?? 0) });
        break;
      case 'tool.call': {
        const id = `tc-${++deps.toolCallCounterRef.current}`;
        pendingToolCalls.push(id);
        if (typeof payload.id === 'string' && payload.id) serverIdToClient.set(payload.id, id);
        deps.applyAction({ type: 'TOOL_CALL', id, toolName: String(payload.toolName ?? 'unknown'), args: payload.args ?? {} });
        break;
      }
      case 'tool.result': {
        const serverId = typeof payload.id === 'string' ? payload.id : undefined;
        const mapped = serverId ? serverIdToClient.get(serverId) : undefined;
        const id = mapped ?? pendingToolCalls.shift() ?? `tc-${deps.toolCallCounterRef.current}`;
        if (mapped && serverId) {
          serverIdToClient.delete(serverId);
          const idx = pendingToolCalls.indexOf(mapped);
          if (idx >= 0) pendingToolCalls.splice(idx, 1);
        }
        deps.applyAction({
          type: 'TOOL_RESULT',
          id,
          result: typeof payload.result === 'string' ? payload.result : String(payload.result ?? ''),
          failed: payload.status === 'error',
        });
        // Knowledge citations ([K#]) surfaced by search_knowledge — the
        // server parses the tool JSON and attaches structured citations.
        if (Array.isArray(payload.citations) && payload.citations.length > 0) {
          deps.applyAction({ type: 'CITATIONS', citations: payload.citations as KnowledgeCitation[] });
        }
        // Web citations ([S#]) surfaced by search_medical_references —
        // rendered as clickable source chips + a web-sources card.
        if (Array.isArray(payload.webCitations) && payload.webCitations.length > 0) {
          deps.applyAction({ type: 'WEB_CITATIONS', webCitations: payload.webCitations as WebCitation[] });
        }
        break;
      }
      // ── Inner question-generation agent activity (complete agent) ──
      case 'generation.tool.call': {
        genToolCounter += 1;
        const genId = `gen-tc-${genToolCounter}`;
        pendingGenToolCalls.push(genId);
        if (typeof payload.id === 'string' && payload.id) genServerIdToClient.set(payload.id, genId);
        deps.applyAction({ type: 'TOOL_CALL', id: genId, toolName: String(payload.toolName ?? 'generation tool'), args: payload.args ?? {} });
        break;
      }
      case 'generation.tool.result': {
        const serverId = typeof payload.id === 'string' ? payload.id : undefined;
        const mapped = serverId ? genServerIdToClient.get(serverId) : undefined;
        const genId = mapped ?? pendingGenToolCalls.shift() ?? `gen-tc-${genToolCounter}`;
        if (mapped && serverId) {
          genServerIdToClient.delete(serverId);
          const idx = pendingGenToolCalls.indexOf(mapped);
          if (idx >= 0) pendingGenToolCalls.splice(idx, 1);
        }
        deps.applyAction({
          type: 'TOOL_RESULT',
          id: genId,
          result: typeof payload.result === 'string' ? payload.result : String(payload.result ?? ''),
          failed: payload.status === 'error',
        });
        if (Array.isArray(payload.citations) && payload.citations.length > 0) {
          deps.applyAction({ type: 'CITATIONS', citations: payload.citations as KnowledgeCitation[] });
        }
        break;
      }
      case 'subagent': {
        // The generation agent delegating to a specialist subagent.
        // ONE chip per delegation: the plain task chip (from
        // generation.tool.call) is RENAMED to `task → <name> subagent`
        // instead of spawning a duplicate chip. Completion arrives via
        // the task tool result; the fallbackId only becomes a real chip
        // on the defensive orphan path (no task chip seen), in which
        // case this completed event closes it. When the task chip path
        // ran, the id matches nothing and the action is a no-op.
        const name = String(payload.name ?? 'subagent');
        if (payload.event === 'started') {
          subagentCounter += 1;
          const fallbackId = `sub-tc-${subagentCounter}`;
          deps.applyAction({ type: 'TOOL_ANNOTATE_SUBAGENT', subagent: name, fallbackId });
          orphanSubagentChips.push(fallbackId);
          // A NEW delegation to a known specialist resets its stream card.
          deps.applyAction({ type: 'SUBAGENT_STATUS', name, status: 'running' });
        } else {
          const orphanId = orphanSubagentChips.shift();
          if (orphanId) deps.applyAction({ type: 'TOOL_RESULT', id: orphanId, result: `${name} subagent returned` });
          deps.applyAction({ type: 'SUBAGENT_STATUS', name, status: 'completed' });
        }
        break;
      }
      case 'subagent.delta': {
        // Live narration from inside a task-tool specialist — the docs'
        // dedicated subagent cards with streaming content.
        const name = String(payload.name ?? 'subagent');
        const text = typeof payload.text === 'string' ? payload.text : '';
        if (text) deps.applyAction({ type: 'SUBAGENT_DELTA', name, text });
        break;
      }
      case 'generation.saved': {
        // A question the generation agent saved to the bank — show it as a
        // live INTERACTIVE card under the streaming turn (and in the
        // final message). The full question payload (options, answer,
        // explanation, image) rides along so the card is answerable.
        const q = (payload.question ?? {}) as Record<string, unknown>;
        const index = Number(payload.index ?? savedCards.length + 1);
        savedCards.push({
          type: 'question',
          title: `Question ${index} saved — ${String(q.topic ?? 'New question')}`,
          subtitle: [String(q.difficulty ?? ''), String(q.type ?? ''), String(q.system ?? '')].filter(Boolean).join(' · ') || 'Pending review',
          details: {
            Question: `${String(q.text ?? '').slice(0, 110)}…`,
            Answer: String(q.answer ?? ''),
            Status: 'Saved to the question bank — pending review',
          },
          question: toQuestionPayload(q),
          action: { label: 'Open Question Bank', tab: 'bank' },
        });
        deps.applyAction({ type: 'CARDS', cards: [...savedCards] });
        break;
      }
      case 'text.delta':
        if (typeof payload.text === 'string') deps.applyAction({ type: 'TEXT_DELTA', text: payload.text });
        break;
      case 'approval_required': {
        // HITL gate: a consequential tool (bank write, scheduling, media
        // generation…) is paused waiting for the user's decision. The
        // run stays alive server-side; approve/reject comes back via
        // resolveApproval() → POST /api/agent/approvals/[id].
        const approval = payload as unknown as PendingApproval;
        if (typeof approval.approvalId === 'string' && approval.approvalId) {
          deps.applyAction({
            type: 'APPROVAL_REQUIRED',
            approval: {
              approvalId: approval.approvalId,
              threadId: String(approval.threadId ?? ''),
              tool: String(approval.tool ?? 'unknown tool'),
              capability: String(approval.capability ?? ''),
              args: approval.args ?? {},
              description: typeof approval.description === 'string' ? approval.description : undefined,
            },
          });
        }
        break;
      }
      case 'clarification_required': {
        // ask_user: the agent asked its question as a structured form.
        // Defensively normalized (the wire is never trusted); duplicates on
        // re-attach replay are idempotent at the component level.
        const clarification = normalizeClarificationPayload(payload);
        if (clarification) deps.onClarification?.(clarification);
        break;
      }
      case 'memory':
        deps.applyAction({
          type: 'MEMORY',
          summaryTurnCount: Number(payload.summaryTurnCount ?? 0),
          episodes: Array.isArray(payload.episodes) ? (payload.episodes as RecalledEpisode[]) : [],
        });
        break;
      case 'actions':
        if (Array.isArray(payload.actions)) deps.applyAction({ type: 'ACTIONS', actions: payload.actions as AgentAction[] });
        break;
      case 'cards':
        if (Array.isArray(payload.cards)) deps.applyAction({ type: 'CARDS', cards: payload.cards as MessageCard[] });
        break;
      case 'multimodal':
        if (Array.isArray(payload.blocks)) deps.applyAction({ type: 'MULTIMODAL', blocks: payload.blocks as MultimodalBlock[] });
        break;
      case 'done': {
        const text = typeof payload.text === 'string' ? payload.text : '';
        const doneAction = { type: 'DONE' as const, text, llmCallCount: Number(payload.llmCallCount ?? 0) };
        deps.applyAction(doneAction);
        deps.onComplete(text);
        break;
      }
      case 'error': {
        const message = typeof payload.message === 'string' ? payload.message : 'unknown error';
        deps.applyAction({ type: 'ERROR', message });
        deps.onError(message);
        break;
      }
    }
  };
}

// ─── Network-drop recovery ───────────────────────────────────────────────
//
// A streaming response can die mid-turn for reasons outside the app's
// control: an idle-happy proxy between the browser and the server, a mobile
// network switch, a laptop sleeping. The server-side agent run survives the
// disconnect, finishes, and persists the final assistant message to the
// thread store — so instead of dead-ending the turn with Chrome's bare
// "network error" TypeError, poll the thread for the finished answer and
// deliver it as a normal DONE.

/** How often the recovery poll hits the thread endpoint. */
const RECOVERY_POLL_INTERVAL_MS = 3_000;
/** How long to keep polling before giving up (long agent runs can take minutes). */
const RECOVERY_TIMEOUT_MS = 150_000;
/** Clock-skew slack when matching persisted messages to the current turn. */
const RECOVERY_TIME_SLACK_MS = 5_000;

/** True when a thrown message looks like a transport failure (not an app error). */
function isNetworkFailure(message: string): boolean {
  return /network|failed to fetch|fetch failed|connection|econnreset|socket|terminated|abnormal/i.test(message);
}

type RecoveryResult =
  | { status: 'found'; text: string }
  | { status: 'timeout' }
  | { status: 'cancelled' };

/**
 * Poll GET /api/agent/threads/:id/messages until an assistant reply that
 * belongs to the current turn appears (the server run finishing + persisting
 * it), the caller cancels, or the deadline passes.
 */
async function pollThreadForAssistantReply(
  threadId: string,
  turnStartedAt: number,
  isCancelled: () => boolean,
  /**
   * When provided, only assistant messages persisted AFTER this turn's user
   * message (matched by content + recency) are accepted. Both timestamps come
   * from the server DB — the same clock — so the comparison is exact and
   * prevents a fast follow-up turn from recovering the PREVIOUS turn's answer
   * when both fall inside the client-vs-server clock-skew slack window.
   */
  turnUserMessage?: string,
  /** Optional override of the poll deadline (default 150s). The short
   * stream-end recovery path uses ~15s: the server's finally-block persists
   * the answer almost immediately after the wire ends. */
  timeoutMs: number = RECOVERY_TIMEOUT_MS,
): Promise<RecoveryResult> {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    await new Promise((resolve) => setTimeout(resolve, RECOVERY_POLL_INTERVAL_MS));
    if (isCancelled()) return { status: 'cancelled' };
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(threadId)}/messages`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const payload = await res.json() as {
          messages?: Array<{ role?: string; content?: string; createdAt?: string }>;
        };
        const messages = payload.messages ?? [];
        // This turn's user message, once the server persists it (0 until then).
        const turnUserCreatedAt = turnUserMessage !== undefined
          ? Math.max(0, ...messages
              .filter((m) =>
                m.role === 'user'
                && typeof m.content === 'string'
                && m.content.trim() === turnUserMessage.trim()
                && !!m.createdAt
                && Date.parse(m.createdAt) >= turnStartedAt - RECOVERY_TIME_SLACK_MS)
              .map((m) => Date.parse(m.createdAt as string)))
          : 0;
        const reply = messages
          .filter((m): m is { role: string; content: string; createdAt?: string } =>
            m.role === 'assistant'
            && typeof m.content === 'string'
            && m.content.trim() !== ''
            && m.content !== '(empty response)')
          .filter((m) => {
            const created = m.createdAt ? Date.parse(m.createdAt) : NaN;
            if (!Number.isFinite(created)) return false;
            if (turnUserCreatedAt > 0 && created <= turnUserCreatedAt) return false;
            return created >= turnStartedAt - RECOVERY_TIME_SLACK_MS;
          })
          .pop();
        if (reply) return { status: 'found', text: reply.content };
      }
    } catch {
      // A failed poll (transient network blip) is not fatal — keep trying
      // until the deadline; the next poll usually succeeds.
    }
  }
  return { status: 'timeout' };
}

/**
 * Probe whether the server already received THIS turn. The v2 chat route
 * persists the user message to the thread store within ~a second of the turn
 * starting (step 10 of the route, before the SSE stream does any real work),
 * so its presence separates the two faces of a gateway 502/503/504:
 *
 *   - user message present  → the app got the turn and is (or was) running it
 *     → do NOT re-send the POST; poll for the finished assistant reply
 *   - user message absent   → the app never received the request
 *     → re-sending the POST is safe (nothing executed server-side)
 *
 * Probes for up to 10s (persist is async, and the poll itself can fail
 * transiently while the gateway recovers).
 */
async function waitForTurnUserMessage(
  threadId: string,
  message: string,
  turnStartedAt: number,
  isCancelled: () => boolean,
): Promise<boolean> {
  const deadline = Date.now() + 10_000;
  const needle = message.trim();
  while (Date.now() < deadline) {
    if (isCancelled()) return false;
    try {
      const res = await fetch(`/api/agent/threads/${encodeURIComponent(threadId)}/messages`, {
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        const payload = await res.json() as {
          messages?: Array<{ role?: string; content?: string; createdAt?: string }>;
        };
        const found = (payload.messages ?? []).some((m) => {
          if (m.role !== 'user' || typeof m.content !== 'string') return false;
          const created = m.createdAt ? Date.parse(m.createdAt) : NaN;
          return m.content.trim() === needle
            && Number.isFinite(created)
            && created >= turnStartedAt - RECOVERY_TIME_SLACK_MS;
        });
        if (found) return true;
      }
    } catch {
      // A failed probe (the gateway is still hiccuping) is not proof of
      // anything — keep probing until the deadline.
    }
    await new Promise((resolve) => setTimeout(resolve, 1_500));
  }
  return false;
}

// ─── Hook ───────────────────────────────────────────────────────────────

export interface UseAgentV2Options {
  /** Endpoint URL (default: /api/agent/chat/v2) */
  endpoint?: string;
  /** Called when the agent reaches 'done' state with the final text */
  onComplete?: (text: string, state: AgentV2State) => void;
  /** Called when the agent reaches 'error' state */
  onError?: (message: string) => void;
  /** Called when the agent asks a structured question (ask_user) — the UI
   * owns the form card lifecycle from here (it outlives the turn). */
  onClarification?: (payload: ClarificationPayload) => void;
}

export interface AgentFileAttachmentSummary {
  id: string;
  name: string;
  type: string;
  size: number;
  extractedText?: string;
  knowledge?: {
    sourceId: string;
    chunks: number;
    title: string;
  };
  analysis?: {
    classification?: string;
    summary?: string;
    organization?: string;
  };
}

export interface SendArgs {
  message: string;
  history?: Array<{ role: string; content: string }>;
  currentTab?: string;
  uiContext?: string;
  fileAttachments?: AgentFileAttachmentSummary[];
  /** Selected chat model as "providerId:modelId" (e.g. "medq-router:medgemma:latest").
   *  Empty/undefined = server default (DEFAULT_MODEL env / user default). The
   *  /api/agent/chat/v2 route resolves it through the same BYOK-aware resolver
   *  as every other MedQ generation surface, so BYOK router models route
   *  through the FreeLLM AI Router. */
  model?: string;
}

export function useAgentV2Stream(options: UseAgentV2Options = {}) {
  const endpoint = options.endpoint ?? '/api/agent/chat/v2';
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  // RequestId of the in-flight turn (from the run's `meta` SSE event). The
  // Stop button needs it to tell the SERVER to abort the detached run —
  // since runs survive client disconnects (refresh recovery), aborting the
  // local fetch alone no longer stops server-side execution.
  const activeRequestIdRef = useRef<string | null>(null);
  // Server thread continuation: initialize from storage so a reload
  // mid-conversation keeps appending to the SAME thread instead of minting a
  // new one. localStorage (primary — survives new tabs); sessionStorage kept
  // as a legacy fallback from before the refresh-persistence fix. The V3
  // panel persists 'medq-agent-thread-id' on every turn and via setThreadId
  // when the history switcher adopts a thread.
  const threadIdRef = useRef<string | null>(
    typeof window === 'undefined' ? null : localStorage.getItem('medq-agent-thread-id') ?? sessionStorage.getItem('medq-agent-thread-id'),
  );
  // Map server-side tool calls to client-side IDs so we can update status
  // when the result comes back. Keyed by `${toolName}-${callIndex}`.
  const toolCallIdMap = useRef<Map<string, string>>(new Map());
  const toolCallCounter = useRef(0);

  const send = useCallback(async (args: SendArgs): Promise<AgentV2State> => {
    let finalState: AgentV2State = INITIAL_STATE;
    // When this turn started — used by the network-drop recovery below to
    // only accept assistant messages that belong to THIS turn.
    const turnStartedAt = Date.now();
    // Dispatch to the live reducer state AND mirror every action into
    // finalState, so the value returned by send() carries the FULL turn
    // (plan / toolCalls / memory / cards) — not just the final done/error.
    // Without this, the completed assistant message would lose its snapshot.
    const applyAction = (action: Action) => {
      dispatch(action);
      finalState = reducer(finalState, action);
      return action;
    };

    // Reset state for the new turn
    applyAction({ type: 'RESET' });
    applyAction({ type: 'START' });
    setIsStreaming(true);
    toolCallIdMap.current.clear();
    toolCallCounter.current = 0;

    const controller = new AbortController();
    abortRef.current = controller;

    // ── Stall watchdog ──
    // A hung SSE stream (e.g. the LLM gateway rate-limiting with no bytes at
    // all) used to leave the UI in "working…" forever with no way to tell a
    // dead stream from a slow one. If NO event arrives for this long, kill
    // the CURRENT WIRE ONLY — the turn controller (user Stop) stays alive, so
    // the drop flows into the existing recovery ladders: a mid-body abort
    // returns 'aborted' from consumeSSEStream → RECOVERING → re-attach →
    // thread-poll; a pre-headers abort throws into the catch below, which
    // runs the same ladder. The user NEVER sees a dead-end error while the
    // server might still be finishing the run — the client keeps waiting
    // (re-attach deadline 8 min > the 6-min server hard cap, then a final
    // thread-store poll for the persisted reply). The hard error survives
    // only as the last resort after every recovery path is exhausted.
    // Re-armable: the transient-gateway recovery below stops it while polling
    // (no SSE events arrive during a poll — an armed watchdog would misread
    // that as a stall and abort the recovery) and re-arms it before a retry.
    const STALL_TIMEOUT_MS = 240_000;
    let lastEventAt = Date.now();
    let stalled = false;
    let postTimedOut = false;
    // Kills whichever wire is currently active (POST fetch, POST body, or a
    // re-attach wire). Each fetch site registers its own controller here.
    let abortCurrentWire: (() => void) | null = null;
    const watchdogTick = () => {
      if (Date.now() - lastEventAt > STALL_TIMEOUT_MS) {
        stalled = true;
        abortCurrentWire?.();
      }
    };
    let watchdog: ReturnType<typeof setInterval> | null = setInterval(watchdogTick, 5_000);
    const stopWatchdog = () => {
      if (watchdog !== null) {
        clearInterval(watchdog);
        watchdog = null;
      }
    };
    const startWatchdog = () => {
      lastEventAt = Date.now();
      if (watchdog === null) watchdog = setInterval(watchdogTick, 5_000);
    };
    // ── Shared turn event handler + live re-attach ──
    // One handler instance per send() call: the POST stream, and any
    // re-attached /events stream after a wire drop, all dispatch through
    // it, so server tool_call ids stay paired with client chip ids across
    // the resume. `eventsSeen` counts processed BUFFERED events (the
    // server's ring-buffer position) — the re-attach resume cursor.
    let eventsSeen = 0;
    const handleTurnEvent = createTurnEventHandler({
      applyAction,
      toolCallCounterRef: toolCallCounter,
      noteEvent: () => { eventsSeen += 1; },
      onMeta: (requestId) => {
        activeRequestIdRef.current = requestId;
        persistActiveRequest(requestId);
      },
      onComplete: (text) => { options.onComplete?.(text, finalState); },
      onError: (message) => { options.onError?.(message); },
      onClarification: (payload) => { options.onClarification?.(payload); },
    });
    const onTurnEvent = (event: string, data: unknown) => {
      lastEventAt = Date.now();
      handleTurnEvent(event, data);
    };

    /** Re-attach to the still-running server-side run. Returns true when a
     *  terminal event arrived through the (re-attached) stream. 404 → the
     *  run is gone (expired / server restarted): fall back to thread
     *  polling. Planned wire recycles (preempting the gateway's ~3-minute
     *  absolute connection cap) NEVER count against the retry budget — only
     *  genuine failures do, and a wire that stayed healthy for a minute
     *  resets the strike counter so scattered blips can't exhaust it across
     *  a long run. The wall-clock bound keeps the loop finite even if a
     *  server bug never closes the run's event buffer. */
    const tryReattach = async (): Promise<boolean> => {
      let failures = 0;
      const overallDeadline = Date.now() + 480_000; // 8 min — past the 6-min run hard-cap
      while (Date.now() < overallDeadline) {
        const requestId = activeRequestIdRef.current;
        if (!requestId || controller.signal.aborted || stalled) return false;
        // Per-wire controller: user Stop and the stall watchdog kill THIS
        // wire; the pre-headers deadline below kills it if the GET never
        // answers. The turn itself is never aborted by any of them.
        const wireCtl = new AbortController();
        const chainTurnAbort = () => wireCtl.abort();
        controller.signal.addEventListener('abort', chainTurnAbort, { once: true });
        abortCurrentWire = () => wireCtl.abort();
        const headersTimer = setTimeout(() => wireCtl.abort(), REATTACH_HEADERS_TIMEOUT_MS);
        try {
          const rres = await fetch(`${endpoint}/events?requestId=${encodeURIComponent(requestId)}&from=${eventsSeen + 1}`, {
            headers: { Accept: 'text/event-stream' },
            signal: wireCtl.signal,
          });
          // Headers arrived — the deadline has served its purpose; disarm it
          // so it can never fire mid-body and kill a healthy stream.
          clearTimeout(headersTimer);
          if (rres.status === 404) return false;
          if (!rres.ok || !rres.body) {
            failures += 1;
            if (failures >= 3) return false;
            await new Promise((r) => setTimeout(r, 800));
            continue;
          }
          startWatchdog();
          const wireStartedAt = Date.now();
          const status = await consumeSSEStream(rres.body, onTurnEvent, wireCtl.signal, Date.now() + WIRE_RECYCLE_MS, WIRE_STALE_MS);
          if (finalState.phase === 'done' || finalState.phase === 'error') return true;
          // Planned swap — open the next wire with a fresh deadline.
          if (status === 'recycled') continue;
          if (controller.signal.aborted || stalled) return false;
          // EOF without a terminal event: the wire died (gateway hiccup).
          // A wire that lived a while proves the path works — don't let
          // scattered blips exhaust the budget across a long run.
          if (Date.now() - wireStartedAt >= 60_000) failures = 0;
          failures += 1;
          if (failures >= 3) return false;
          await new Promise((r) => setTimeout(r, 600));
        } catch {
          if (controller.signal.aborted || stalled) return false;
          failures += 1;
          if (failures >= 3) return false;
          await new Promise((r) => setTimeout(r, 800));
        } finally {
          clearTimeout(headersTimer);
          controller.signal.removeEventListener('abort', chainTurnAbort);
          abortCurrentWire = null;
        }
      }
      return finalState.phase === 'done' || finalState.phase === 'error';
    };
    try {
      // ── Request with transient-gateway recovery ──
      // The preview gateway's ALB occasionally answers a POST with its own
      // HTML 502/503/504 page — either the request never reached the app
      // server, or it did and the response wire died later. Dead-ending the
      // turn with the raw HTML page used to discard answers the server had
      // already produced and persisted (observed live: a "create heart image"
      // turn completed server-side — image generated and saved — while the UI
      // showed "HTTP 502: <html>…"). Recover instead:
      //   1. this turn's user message already in the thread store → the
      //      server IS running the turn → poll for the finished reply
      //   2. no user message after a short probe → the server never got the
      //      request → retry the POST (safe: nothing ran server-side)
      // 2026-10-25: the same recovery now also covers a POST that never
      // returns headers at all (black-holed connection) via the
      // POST_HEADERS_TIMEOUT_MS deadline, and MAX_ATTEMPTS rose to 3 so a
      // headers timeout plus a 502 can both be retried in one turn.
      const MAX_ATTEMPTS = 3;
      const GATEWAY_BACKOFF_MS = 1_500;
      const isTransientGatewayStatus = (status: number) =>
        status === 502 || status === 503 || status === 504;
      const buildRequestBody = () => JSON.stringify({
        message: args.message,
        history: args.history ?? [],
        currentTab: args.currentTab,
        uiContext: args.uiContext,
        fileAttachments: args.fileAttachments,
        threadId: threadIdRef.current,
        ...(args.model ? { model: args.model } : {}),
      });

      let res: Response | null = null;
      // The wire controller of the attempt that won (its body is consumed
      // after the loop) — kept alive so user Stop and the stall watchdog can
      // still kill that wire mid-stream.
      let postWireCtl: AbortController | null = null;
      // Detaches the PREVIOUS attempt's turn-abort chain (only used when
      // retrying — the winning attempt keeps its chain for the body).
      let detachPrevWire: (() => void) | null = null;
      // Set when a recovery path delivered the turn's final result on its own.
      let recovered = false;
      for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
        detachPrevWire?.();
        // Per-wire controller: user Stop, the pre-headers deadline and the
        // stall watchdog kill THIS wire — never the turn itself. A dead wire
        // flows into the probe/retry below or the recovery ladders instead
        // of dead-ending the turn with an error.
        const wireCtl = new AbortController();
        const chainTurnAbort = () => wireCtl.abort();
        if (controller.signal.aborted) wireCtl.abort();
        else controller.signal.addEventListener('abort', chainTurnAbort, { once: true });
        detachPrevWire = () => controller.signal.removeEventListener('abort', chainTurnAbort);
        postWireCtl = wireCtl;
        abortCurrentWire = () => wireCtl.abort();
        postTimedOut = false;
        const headersTimer = setTimeout(() => {
          postTimedOut = true;
          wireCtl.abort();
        }, POST_HEADERS_TIMEOUT_MS);
        try {
          res = await fetch(endpoint, {
            method: 'POST',
            headers: {
              'Accept': 'text/event-stream',
              'Content-Type': 'application/json',
            },
            body: buildRequestBody(),
            signal: wireCtl.signal,
          });
        } catch (err) {
          // Headers never arrived. User Stop → let the outer catch handle
          // the cancel; an unexpected abort → surface it; a headers deadline
          // or watchdog stall → res = null and let the probe below decide.
          res = null;
          if (controller.signal.aborted) throw err;
          if (!postTimedOut && !stalled) throw err;
        } finally {
          // Headers arrived (or the wire died pre-headers) — disarm the
          // deadline so it can never fire during the body stream.
          clearTimeout(headersTimer);
        }

        if (res !== null) {
          const threadId = res.headers.get('x-thread-id');
          if (threadId) {
            threadIdRef.current = threadId;
            // Persist IMMEDIATELY (not after the turn completes): a refresh
            // mid-run must still find the thread id so the panel's pending-reply
            // monitor can poll for the server-side answer. The header arrives
            // before any streaming work begins, so this is the earliest durable
            // point of the turn.
            try {
              localStorage.setItem('medq-agent-thread-id', threadId);
              sessionStorage.setItem('medq-agent-thread-id', threadId);
            } catch { /* private mode */ }
          }

          if (
            res.ok
            || !isTransientGatewayStatus(res.status)
            || attempt === MAX_ATTEMPTS
            || controller.signal.aborted
          ) {
            break;
          }
        }

        // The wire died before headers (black hole / watchdog stall), the
        // gateway answered 502/503/504, or a poll timed out — attempts remain.
        // First find out whether the server actually received this turn — its
        // user message is persisted within ~a second of the turn starting.
        stopWatchdog();
        if (threadIdRef.current) {
          const serverHasTurn = await waitForTurnUserMessage(
            threadIdRef.current,
            args.message,
            turnStartedAt,
            () => abortRef.current?.signal.aborted === true,
          );
          if (serverHasTurn) {
            // The server is running (or ran) this turn — the finished answer
            // will land in the thread store. Poll for it and deliver a normal
            // DONE instead of an error card.
            applyAction({ type: 'RECOVERING' });
            finalState = reducer(finalState, { type: 'RECOVERING' });
            const recovery = await pollThreadForAssistantReply(
              threadIdRef.current,
              turnStartedAt,
              () => abortRef.current?.signal.aborted === true,
              args.message,
            );
            if (recovery.status === 'found') {
              const doneAction = { type: 'DONE' as const, text: recovery.text, llmCallCount: 1 };
              applyAction(doneAction);
              finalState = reducer(finalState, doneAction);
              options.onComplete?.(recovery.text, finalState);
              recovered = true;
              break;
            }
            if (recovery.status === 'cancelled') {
              // User hit Stop while recovering — mirror the normal cancel
              // behavior: keep whatever text already streamed.
              const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
              applyAction(doneAction);
              finalState = reducer(finalState, doneAction);
              recovered = true;
              break;
            }
            // Poll timed out without a reply (run took >150s or died
            // server-side) — fall through to the retry; a possible duplicate
            // turn is still better than dead-ending the user.
          }
        }
        // No thread id (first turn — the dead wire swallowed the x-thread-id
        // header) or no trace of the turn server-side → almost certainly
        // never received. Back off, re-arm the watchdog, re-send the POST.
        await new Promise((resolve) => setTimeout(resolve, GATEWAY_BACKOFF_MS));
        if (controller.signal.aborted) break;
        res = null;
        startWatchdog();
      }
      if (recovered) return finalState;

      // User hit Stop during recovery/backoff — mirror the normal cancel
      // path instead of surfacing the swallowed gateway error.
      if (controller.signal.aborted) {
        const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
        applyAction(doneAction);
        finalState = reducer(finalState, doneAction);
        return finalState;
      }

      if (!res || !res.ok) {
        // res === null after 3 attempts whose wires never produced headers:
        // every POST was black-holed. That is a connection problem, not an
        // HTTP status — say so plainly instead of "HTTP 0".
        if (!res) {
          const msg = 'The server could not be reached (the connection never started after several tries). Please check your connection and try again — your message was not lost.';
          dispatch({ type: 'ERROR', message: msg });
          options.onError?.(msg);
          return { ...INITIAL_STATE, phase: 'error', error: msg };
        }
        const text = await res.text().catch(() => '');
        // Never surface a gateway's HTML error page verbatim — a wall of
        // "<html><head><title>502 Bad Gateway…" is noise to the user. App-level
        // JSON errors (4xx from our own API) keep their informative bodies.
        const isHtmlBody = text.includes('<html') || text.trimStart().startsWith('<');
        const statusLabel = res ? `HTTP ${res.status}` : 'HTTP 0 (no response)';
        const msg = isHtmlBody
          ? `The server is temporarily unreachable (${statusLabel}). This is usually a brief gateway hiccup — please try again in a moment.`
          : `${statusLabel}: ${text.slice(0, 200)}`;
        dispatch({ type: 'ERROR', message: msg });
        options.onError?.(msg);
        return { ...INITIAL_STATE, phase: 'error', error: msg };
      }

      if (!res.body) {
        const msg = 'No response body';
        dispatch({ type: 'ERROR', message: msg });
        options.onError?.(msg);
        return { ...INITIAL_STATE, phase: 'error', error: msg };
      }

      // Consume the POST stream with the shared turn handler. If the wire
      // drops, the recovery paths below re-attach through GET /v2/events
      // with the SAME handler (pairing maps preserved). The recycle
      // deadline swaps the wire before the gateway's ~3-minute absolute
      // connection cap can kill it — a planned swap is lossless (the
      // re-attach replays every buffered frame) and never surfaces as an
      // interruption. The wire uses the winning attempt's controller: user
      // Stop and the stall watchdog can still kill it mid-body, flowing into
      // the recovery ladder instead of dead-ending the turn.
      const postStatus = await consumeSSEStream(res.body, onTurnEvent, postWireCtl?.signal ?? controller.signal, Date.now() + WIRE_RECYCLE_MS, WIRE_STALE_MS);

      // ── Stream-ended-without-terminal-event recovery ──
      // The server now guarantees a done/error frame (terminal-event guard
      // in /api/agent/chat/v2), so reaching here with a non-terminal phase
      // means the wire was severed without a client-side exception (proxy
      // close races) or the frame was lost in flight. NEVER drop the turn:
      // first re-attach to the live run (its event buffer replays exactly
      // what this client missed, then streams the tail); if the run is gone,
      // poll the thread store for the finished reply (short deadline — the
      // route's finally block persists almost immediately), and fall back to
      // keeping whatever partial text already streamed as the answer.
      if (
        finalState.phase !== 'done'
        && finalState.phase !== 'error'
        && !controller.signal.aborted
      ) {
        stopWatchdog();
        // A planned wire swap (gateway connection-cap preemption) continues
        // the SAME turn on a fresh wire — no RECOVERING phase, no banner,
        // no toast: to the user nothing happened. Only a genuine (unplanned)
        // drop announces itself through the recovery UI (which carries its
        // own grace delays downstream).
        if (postStatus !== 'recycled') {
          applyAction({ type: 'RECOVERING' });
          finalState = reducer(finalState, { type: 'RECOVERING' });
        }
        // Live re-attach first — resume the stream exactly where it died.
        if (await tryReattach()) {
          return finalState;
        }
        stopWatchdog();
        const recovery = threadIdRef.current
          ? await pollThreadForAssistantReply(
              threadIdRef.current,
              turnStartedAt,
              () => abortRef.current?.signal.aborted === true,
              args.message,
              15_000,
            )
          : { status: 'timeout' } as RecoveryResult;
        if (recovery.status === 'found') {
          const doneAction = { type: 'DONE' as const, text: recovery.text, llmCallCount: 1 };
          applyAction(doneAction);
          finalState = reducer(finalState, doneAction);
          options.onComplete?.(recovery.text, finalState);
        } else if (finalState.streamingText.trim() !== '') {
          // Keep the partial answer — an incomplete response is far better
          // than a vanished one, and the thread store has the canonical copy.
          const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
          applyAction(doneAction);
          finalState = reducer(finalState, doneAction);
          options.onComplete?.(finalState.streamingText, finalState);
        } else if (recovery.status === 'cancelled') {
          const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
          applyAction(doneAction);
          finalState = reducer(finalState, doneAction);
        } else {
          const msg = 'The response ended before completing. Please try again — your message was not lost.';
          applyAction({ type: 'ERROR', message: msg });
          finalState = reducer(finalState, { type: 'ERROR', message: msg });
          options.onError?.(msg);
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        if (controller.signal.aborted) {
          // User-initiated cancel: keep whatever text already streamed so the
          // partial answer is preserved on the completed message.
          const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
          applyAction(doneAction);
          finalState = reducer(finalState, doneAction);
        } else if (stalled) {
          // ── Stall recovery (used to be a dead-end error) ──
          // The watchdog killed the wire after a long silence. The run may
          // still be executing server-side (detached-run architecture) or its
          // finished reply may already be persisted — run the FULL recovery
          // ladder before ever surfacing an error: live re-attach (lossless
          // event replay), then thread-store polling (the run's hard cap and
          // persistence guarantee it ends there), then the partial answer.
          stopWatchdog();
          applyAction({ type: 'RECOVERING' });
          finalState = reducer(finalState, { type: 'RECOVERING' });
          if (threadIdRef.current && await tryReattach()) {
            return finalState;
          }
          stopWatchdog();
          const recovery = threadIdRef.current
            ? await pollThreadForAssistantReply(
                threadIdRef.current,
                turnStartedAt,
                () => abortRef.current?.signal.aborted === true,
                args.message,
              )
            : { status: 'timeout' } as RecoveryResult;
          if (recovery.status === 'found') {
            const doneAction = { type: 'DONE' as const, text: recovery.text, llmCallCount: 1 };
            applyAction(doneAction);
            finalState = reducer(finalState, doneAction);
            options.onComplete?.(recovery.text, finalState);
          } else if (finalState.streamingText.trim() !== '') {
            const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
            applyAction(doneAction);
            finalState = reducer(finalState, doneAction);
            options.onComplete?.(finalState.streamingText, finalState);
          } else if (recovery.status === 'cancelled') {
            const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
            applyAction(doneAction);
            finalState = reducer(finalState, doneAction);
          } else {
            const msg = 'The server stopped responding before finishing the answer and it could not be recovered. Please try again — your message was not lost.';
            applyAction({ type: 'ERROR', message: msg });
            finalState = reducer(finalState, { type: 'ERROR', message: msg });
            options.onError?.(msg);
          }
        } else {
          // Abort without user stop or stall (defensive): keep whatever text
          // already streamed so the partial answer is preserved.
          const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
          applyAction(doneAction);
          finalState = reducer(finalState, doneAction);
        }
      } else {
        const msg = err instanceof Error ? err.message : String(err);
        // ── Network-drop recovery ──
        // Chrome surfaces a mid-stream connection failure as a bare
        // TypeError "network error"; Safari/Firefox use "Failed to fetch" /
        // "NetworkError…". The agent run does NOT die with the wire — the
        // server finishes it and (since the persist-on-disconnect fix in
        // /api/agent/chat/v2) saves the full answer to the thread store.
        // Poll for that finished message and deliver it as a normal DONE
        // instead of dead-ending the turn.
        if (threadIdRef.current && isNetworkFailure(msg)) {
          // Stop the stall watchdog before polling: no SSE events will arrive
          // during recovery, so it would otherwise fire at 180s and abort the
          // controller — which the isCancelled() check below would misread as
          // a user cancellation.
          stopWatchdog();
          applyAction({ type: 'RECOVERING' });
          finalState = reducer(finalState, { type: 'RECOVERING' });
          // ── Live re-attach first ──
          // The detached run is almost certainly still executing server-side;
          // its replayable event buffer resumes the stream right where the
          // wire died (tool progress included) instead of blind-polling.
          if (await tryReattach()) {
            return finalState;
          }
          const recovery = await pollThreadForAssistantReply(
            threadIdRef.current,
            turnStartedAt,
            () => abortRef.current?.signal.aborted === true,
            args.message,
          );
          if (recovery.status === 'found') {
            const doneAction = { type: 'DONE' as const, text: recovery.text, llmCallCount: 1 };
            applyAction(doneAction);
            finalState = reducer(finalState, doneAction);
            options.onComplete?.(recovery.text, finalState);
          } else if (recovery.status === 'cancelled') {
            // User hit Stop while we were recovering — mirror the normal
            // cancel behavior: keep whatever text already streamed.
            const doneAction = { type: 'DONE' as const, text: finalState.streamingText, llmCallCount: 0, interrupted: true };
            applyAction(doneAction);
            finalState = reducer(finalState, doneAction);
          } else {
            const friendly = 'The connection to the server was lost and the finished answer could not be recovered. Please try sending the message again.';
            applyAction({ type: 'ERROR', message: friendly });
            finalState = reducer(finalState, { type: 'ERROR', message: friendly });
            options.onError?.(friendly);
          }
        } else {
          applyAction({ type: 'ERROR', message: msg });
          finalState = reducer(finalState, { type: 'ERROR', message: msg });
          options.onError?.(msg);
        }
      }
    } finally {
      stopWatchdog();
      setIsStreaming(false);
      abortRef.current = null;
      activeRequestIdRef.current = null;
      // The turn is over locally — a later reload no longer needs to find
      // this run (the thread store has the finished answer).
      clearActiveRequest();
    }

    return finalState;
  }, [endpoint, options]);

  const cancel = useCallback(() => {
    // ── Server-side cancellation of the detached run ──
    // Chat v2 runs are decoupled from this SSE wire: a page reload or proxy
    // drop leaves the run executing server-side on purpose (so the finished
    // answer lands in the thread and gets restored). Consequently, aborting
    // the fetch below does NOT stop the run anymore — an explicit Stop must
    // also POST the kill switch. Fire-and-forget with keepalive so the call
    // races ahead of the wire teardown. Best-effort: a lost call falls back
    // to the server's hard-cap timer.
    const requestId = activeRequestIdRef.current;
    if (requestId) {
      try {
        void fetch(`${endpoint}/cancel`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ requestId }),
          keepalive: true,
        }).catch(() => { /* best-effort */ });
      } catch {
        // Network already down — the run's hard cap bounds it.
      }
    }
    abortRef.current?.abort();
    setIsStreaming(false);
    clearActiveRequest();
  }, [endpoint]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
    setIsStreaming(false);
  }, []);

  /**
   * Submit thumbs-up / thumbs-down feedback for the current turn.
   * Returns true on success.
   */
  const submitFeedback = useCallback(async (
    feedback: 'positive' | 'negative',
    extra?: { reason?: string; userMessage?: string; agentResponse?: string },
  ): Promise<boolean> => {
    try {
      const res = await fetch('/api/agent/feedback/v2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          feedback,
          threadId: threadIdRef.current ?? undefined,
          userMessage: extra?.userMessage ?? '',
          agentResponse: extra?.agentResponse ?? state.finalText,
          reason: extra?.reason,
          inputClass: 'medical', // server has the real classification if needed
          violations: [],
          llmCallCount: state.llmCallCount,
          toolCalls: state.toolCalls.map(tc => tc.toolName),
          requestId: state.requestId,
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, [state.finalText, state.llmCallCount, state.toolCalls, state.requestId]);

  /** Adopt (or clear) the server thread the next send() continues in.
   *
   * Used by the thread-history switcher: picking a past conversation sets the
   * ref so the next turn APPENDS to that thread instead of starting a new one;
   * "New chat" clears it so the next turn mints a fresh thread id. Also
   * mirrors the choice into sessionStorage ('medq-agent-thread-id') so a
   * reload mid-conversation restores the same thread. Must not run while a
   * turn is streaming — callers guard with isStreaming. */
  const setThreadId = useCallback((id: string | null) => {
    threadIdRef.current = id;
    try {
      if (id) {
        localStorage.setItem('medq-agent-thread-id', id);
        sessionStorage.setItem('medq-agent-thread-id', id);
      } else {
        localStorage.removeItem('medq-agent-thread-id');
        sessionStorage.removeItem('medq-agent-thread-id');
      }
    } catch { /* storage unavailable — in-memory ref stands */ }
  }, []);

  /** Deliver a HITL decision for a pending approval.
   *
   * Updates the local state optimistically (card flips to approved/rejected,
   * phase returns to 'executing') and POSTs the decision to the server. The
   * parked tool call unblocks server-side; its result and the rest of the
   * turn arrive through the still-open SSE stream. Returns true when the
   * server accepted the decision. */
  const resolveApproval = useCallback(async (
    approvalId: string,
    approved: boolean,
    remember?: 'allow' | null,
    /** User-edited replacement arguments (approve-with-changes) — the
     *  approval card's argument editor. Omitted/invalid JSON keeps the
     *  model's original args. */
    modifiedArgs?: Record<string, unknown> | null,
  ): Promise<boolean> => {
    dispatch({ type: 'APPROVAL_DECIDED', decision: approved ? 'approved' : 'rejected' });
    try {
      const res = await fetch(`/api/agent/approvals/${encodeURIComponent(approvalId)}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          approved,
          remember: remember ?? null,
          ...(approved && modifiedArgs && typeof modifiedArgs === 'object' ? { args: modifiedArgs } : {}),
        }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }, []);

  /** Re-attach to a still-running server-side turn after a page reload.
   *
   * The chat route buffers every SSE frame of a run; a reload mid-run leaves
   * that run executing detached while the freshly mounted panel has NO local
   * turn state. This method rebuilds the turn LIVE: it replays the run's
   * buffered events from seq 1 through the same reducer (plan, tool chips,
   * streaming text, approval cards all re-render), then streams the tail
   * until the run finishes.
   *
   * Returns the turn's final state, or null when the run is unknown/expired
   * (server restarted, TTL passed) — the caller then falls back to the
   * thread-store restore/poll path. Must not be called while a turn is
   * already streaming. */
  const reattach = useCallback(async (
    requestId: string,
    userMessage: string,
  ): Promise<AgentV2State | null> => {
    if (!requestId || isStreaming) return null;
    let finalState: AgentV2State = INITIAL_STATE;
    const applyAction = (action: Action) => {
      dispatch(action);
      finalState = reducer(finalState, action);
      return action;
    };
    const turnStartedAt = Date.now();

    const controller = new AbortController();
    abortRef.current = controller;
    activeRequestIdRef.current = requestId;
    applyAction({ type: 'RESET' });
    applyAction({ type: 'START' });
    applyAction({ type: 'META', requestId });
    toolCallIdMap.current.clear();
    toolCallCounter.current = 0;
    setIsStreaming(true);

    let eventsSeen = 0;
    const handleTurnEvent = createTurnEventHandler({
      applyAction,
      toolCallCounterRef: toolCallCounter,
      noteEvent: () => { eventsSeen += 1; },
      onMeta: (rid) => {
        activeRequestIdRef.current = rid;
        persistActiveRequest(rid);
      },
      onComplete: (text) => { options.onComplete?.(text, finalState); },
      onError: (message) => { options.onError?.(message); },
      onClarification: (payload) => { options.onClarification?.(payload); },
    });
    const onTurnEvent = (event: string, data: unknown) => handleTurnEvent(event, data);

    const tryResume = async (): Promise<boolean> => {
      // Same recycle-aware loop as the live turn's tryReattach: planned wire
      // swaps (gateway connection-cap preemption) never count against the
      // failure budget; a wall-clock bound keeps the loop finite.
      let failures = 0;
      const overallDeadline = Date.now() + 480_000;
      while (Date.now() < overallDeadline) {
        if (controller.signal.aborted) return false;
        try {
          const res = await fetch(`${endpoint}/events?requestId=${encodeURIComponent(requestId)}&from=${eventsSeen + 1}`, {
            headers: { Accept: 'text/event-stream' },
            signal: controller.signal,
          });
          if (res.status === 404) return false;
          if (!res.ok || !res.body) {
            failures += 1;
            if (failures >= 3) return false;
            await new Promise((r) => setTimeout(r, 800));
            continue;
          }
          const wireStartedAt = Date.now();
          const status = await consumeSSEStream(res.body, onTurnEvent, controller.signal, Date.now() + WIRE_RECYCLE_MS, WIRE_STALE_MS);
          if (finalState.phase === 'done' || finalState.phase === 'error') return true;
          if (status === 'recycled') continue;
          if (Date.now() - wireStartedAt >= 60_000) failures = 0;
          failures += 1;
          if (failures >= 3) return false;
          await new Promise((r) => setTimeout(r, 600));
        } catch {
          if (controller.signal.aborted) return false;
          failures += 1;
          if (failures >= 3) return false;
          await new Promise((r) => setTimeout(r, 800));
        }
      }
      return finalState.phase === 'done' || finalState.phase === 'error';
    };

    try {
      const res = await fetch(`${endpoint}/events?requestId=${encodeURIComponent(requestId)}&from=1`, {
        headers: { Accept: 'text/event-stream' },
        signal: controller.signal,
      });
      if (!res.ok || !res.body) {
        // 404/expired → the run is gone: clear the stored key so future
        // panel opens stop probing it. Any OTHER failure (network blip,
        // transient 5xx) keeps the key — a later reload can retry.
        if (res.status === 404) {
          clearActiveRequest();
          return null;
        }
        return null;
      }
      const mainStatus = await consumeSSEStream(res.body, onTurnEvent, controller.signal, Date.now() + WIRE_RECYCLE_MS, WIRE_STALE_MS);

      if (
        finalState.phase !== 'done'
        && finalState.phase !== 'error'
        && !controller.signal.aborted
      ) {
        // Planned recycle → silent continuation (see send()); only a
        // genuine drop announces the recovery phase.
        if (mainStatus !== 'recycled') applyAction({ type: 'RECOVERING' });
        if (await tryResume()) return finalState;
        // Run still live but the re-attached wire keeps dying — poll the
        // thread store for the finished reply, same as the drop path.
        const recovery = threadIdRef.current
          ? await pollThreadForAssistantReply(
              threadIdRef.current,
              turnStartedAt - 10 * 60_000, // the turn began before this reload
              () => abortRef.current?.signal.aborted === true,
              userMessage,
            )
          : { status: 'timeout' } as RecoveryResult;
        if (recovery.status === 'found') {
          const doneAction = { type: 'DONE' as const, text: recovery.text, llmCallCount: 1 };
          applyAction(doneAction);
        } else if (finalState.streamingText.trim() !== '') {
          applyAction({ type: 'DONE', text: finalState.streamingText, llmCallCount: 0, interrupted: true });
        } else {
          applyAction({ type: 'ERROR', message: 'The response ended before completing. Use retry on your message to send it again.' });
        }
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        // User-initiated cancel — keep whatever replayed so far.
        applyAction({ type: 'DONE', text: finalState.streamingText, llmCallCount: 0, interrupted: true });
      } else {
        // Network failure mid-re-attach (page unloading, wire drop). NEVER
        // dead-end with a raw "Failed to fetch" card — the server-side run
        // is still alive. Poll the thread for the finished reply; only an
        // exhausted poll (no partial text) surfaces an honest error.
        applyAction({ type: 'RECOVERING' });
        const recovery = threadIdRef.current
          ? await pollThreadForAssistantReply(
              threadIdRef.current,
              turnStartedAt - 10 * 60_000,
              () => abortRef.current?.signal.aborted === true,
              userMessage,
            )
          : { status: 'timeout' } as RecoveryResult;
        if (recovery.status === 'found') {
          applyAction({ type: 'DONE', text: recovery.text, llmCallCount: 1 });
        } else if (finalState.streamingText.trim() !== '') {
          applyAction({ type: 'DONE', text: finalState.streamingText, llmCallCount: 0, interrupted: true });
        } else {
          applyAction({ type: 'ERROR', message: 'The connection was lost before the answer could be recovered. Use retry on your message to send it again.' });
        }
      }
    } finally {
      setIsStreaming(false);
      abortRef.current = null;
      activeRequestIdRef.current = null;
      // Clear the stored request id only when the turn reached a terminal
      // state — a non-terminal exit (page unloading mid-poll) leaves it so
      // the NEXT page load can re-attach to the still-running turn.
      if (finalState.phase === 'done' || finalState.phase === 'error' || controller.signal.aborted) {
        clearActiveRequest();
      }
    }

    return finalState;
  }, [endpoint, isStreaming, options]);

  return {
    state,
    isStreaming,
    send,
    cancel,
    reset,
    submitFeedback,
    /** Deliver an approval decision for the pending HITL request. */
    resolveApproval,
    /** Re-attach to a live server-side run after a page reload (refresh
     *  persistence with full live tool progress). Returns null when the
     *  run is gone — caller falls back to thread-store restore. */
    reattach,
    /** Current server thread id (null before the first turn) — used by the
     *  UI to restore persisted history after a reload mid-conversation. */
    getThreadId: () => threadIdRef.current,
    /** Switch the active server thread (history switcher / new chat). */
    setThreadId,
  };
}
