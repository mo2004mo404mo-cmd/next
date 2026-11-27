/**
 * In-process registry of ACTIVE deep-agent runs (chat v2 streaming turns).
 *
 * WHY THIS EXISTS
 * ───────────────
 * A run's lifetime must be decoupled from the SSE connection that started
 * it. When the browser reloads mid-stream (or a proxy severs the wire) the
 * HTTP request aborts — but the run should KEEP EXECUTING server-side so
 * the finished answer lands in the thread store, where the client's
 * restore monitor picks it up. That is "detached continuation".
 *
 * The registry provides the OTHER half of that contract: an explicit,
 * authenticated kill switch. The UI's Stop button aborts the local fetch
 * AND posts to /api/agent/chat/v2/cancel, which looks the run up here and
 * aborts it. Without this, detached runs would be uncancellable.
 *
 * RUN EVENT BUFFER (refresh persistence + stream-interruption recovery)
 * ─────────────────────────────────────────────────────────────────────
 * Every SSE frame the chat route emits is ALSO appended to the run's
 * in-process ring buffer (GET /api/agent/chat/v2/events?requestId=&from=).
 * A client that drops mid-stream — or a browser that reloads mid-run —
 * re-attaches with `from` = the number of events it already processed and
 * receives (1) a replay of everything it missed, then (2) the live tail
 * until the run finishes. That upgrades "poll the thread blindly for the
 * finished answer" to a true stream resume: tool chips, plan, approvals
 * and streaming text all continue exactly where the wire died.
 *
 * Buffers survive their run for a short TTL after completion (late
 * reconnects still get the full replay incl. the terminal done event);
 * after that the thread store is the source of truth as before.
 */

export interface ActiveRun {
  /** Correlation id shared with the client (x-request-id / SSE meta event). */
  requestId: string;
  /** Owner — the cancel endpoint verifies the caller matches before aborting.
   *  Optional only because the chat route's userId is `string | null`; an
   *  absent owner simply means the run cannot be cancelled via the endpoint
   *  (the hard-cap timer still bounds it). */
  userId?: string;
  /** Thread the run is appending to (for diagnostics). */
  threadId: string;
  /** Aborts the runtime stream, tool calls and inner agents. */
  abort: AbortController;
  startedAt: number;
  /** Event ring buffer for re-attach/replay (see header). */
  events: RunEventBuffer;
}

/** One buffered SSE frame (event name + JSON payload), with its absolute seq. */
export interface RunEventFrame {
  seq: number;
  event: string;
  data: unknown;
}

/** How many frames a run buffer keeps (long runs stay re-attachable for
 *  recent history; the thread store covers completed turns). */
const RUN_BUFFER_MAX_FRAMES = 4000;
/** How long a FINISHED run's buffer stays replayable after completion. */
const FINISHED_BUFFER_TTL_MS = 5 * 60_000;

/**
 * Append-only event log with absolute sequence numbers and close semantics.
 *
 * - `append` assigns seq = previous + 1 (first frame is seq 1).
 * - `snapshot(from)` returns every frame with seq >= from that is still
 *   retained (oldest may have rolled off in very long runs).
 * - `wait()` resolves when a NEW frame lands or the buffer closes — the
 *   events endpoint uses it to stream the live tail after replay.
 * - `close()` marks the run finished; waiters wake; appends become no-ops.
 */
export class RunEventBuffer {
  private frames: RunEventFrame[] = [];
  private waiters: Array<() => void> = [];
  private closed = false;
  private lastSeq = 0;

  append(event: string, data: unknown): void {
    if (this.closed) return;
    this.lastSeq += 1;
    this.frames.push({ seq: this.lastSeq, event, data });
    if (this.frames.length > RUN_BUFFER_MAX_FRAMES) {
      this.frames.splice(0, this.frames.length - RUN_BUFFER_MAX_FRAMES);
    }
    this.wake();
  }

  close(): void {
    this.closed = true;
    this.wake();
  }

  isClosed(): boolean {
    return this.closed;
  }

  /** Next sequence number a fully-caught-up consumer would ask for. */
  get nextSeq(): number {
    return this.lastSeq + 1;
  }

  /** Frames with seq >= from, plus whether older frames rolled off. */
  snapshot(from: number): { frames: RunEventFrame[]; truncated: boolean; nextSeq: number } {
    const frames = from <= 1 ? this.frames : this.frames.filter((f) => f.seq >= from);
    return {
      frames,
      truncated: frames.length > 0 ? frames[0].seq > Math.max(from, 1) : false,
      nextSeq: this.nextSeq,
    };
  }

  /** Suspend until the NEXT frame is appended or the buffer closes.
   *
   *  ⚠️ NEVER resolve on "frames exist" — the buffer is append-only (frames
   *  are never removed), so a frames.length shortcut would make every wait()
   *  return instantly and hot-spin the consuming endpoint's drain loop at
   *  100% CPU for the whole life of a live run (found in E2E: the server's
   *  event loop starved the moment a client re-attached to an active run).
   *  Callers drain with snapshot(nextSeq) BEFORE waiting, so "already
   *  buffered" frames are never missed by suspending here. */
  wait(): Promise<void> {
    if (this.closed) return Promise.resolve();
    return new Promise<void>((resolve) => {
      this.waiters.push(resolve);
    });
  }

  private wake(): void {
    const waiters = this.waiters;
    this.waiters = [];
    for (const resolve of waiters) resolve();
  }
}

const activeRuns = new Map<string, ActiveRun>();

interface FinishedRun {
  buffer: RunEventBuffer;
  userId?: string;
  threadId: string;
  closedAt: number;
}

/** Finished runs whose buffers stay replayable for the TTL window. */
const finishedRuns = new Map<string, FinishedRun>();

function sweepFinishedRuns(): void {
  const now = Date.now();
  for (const [id, entry] of finishedRuns) {
    if (now - entry.closedAt > FINISHED_BUFFER_TTL_MS) finishedRuns.delete(id);
  }
}

export function registerActiveRun(run: ActiveRun): void {
  activeRuns.set(run.requestId, run);
}

export function unregisterActiveRun(requestId: string): void {
  const run = activeRuns.get(requestId);
  if (run) {
    run.events.close();
    finishedRuns.set(requestId, {
      buffer: run.events,
      userId: run.userId,
      threadId: run.threadId,
      closedAt: Date.now(),
    });
    sweepFinishedRuns();
    activeRuns.delete(requestId);
    return;
  }
  // Never registered (or already unregistered) — nothing to preserve.
  activeRuns.delete(requestId);
}

export function getActiveRun(requestId: string): ActiveRun | undefined {
  return activeRuns.get(requestId);
}

/** Look up a run's replayable event buffer (active OR recently finished).
 *  Returns null when unknown or expired — the caller answers 404 and the
 *  client falls back to thread-store polling. */
export function getRunEventBuffer(
  requestId: string,
): { buffer: RunEventBuffer; userId?: string; threadId: string; finished: boolean } | null {
  const active = activeRuns.get(requestId);
  if (active) {
    return { buffer: active.events, userId: active.userId, threadId: active.threadId, finished: false };
  }
  sweepFinishedRuns();
  const finished = finishedRuns.get(requestId);
  if (finished) {
    return { buffer: finished.buffer, userId: finished.userId, threadId: finished.threadId, finished: true };
  }
  return null;
}

/**
 * Abort a registered run on behalf of its owner.
 * Returns the outcome so the cancel endpoint can answer honestly:
 *  - cancelled: the run existed, belonged to the caller, and is now aborted
 *  - not_found: no such run (already finished, or never existed) — idempotent OK
 *  - forbidden: the run exists but belongs to a different user — do not leak
 */
export function cancelActiveRun(requestId: string, userId: string): { cancelled: boolean; reason?: 'not_found' | 'forbidden' } {
  const run = activeRuns.get(requestId);
  if (!run) return { cancelled: false, reason: 'not_found' };
  if (run.userId !== userId) return { cancelled: false, reason: 'forbidden' };
  run.abort.abort();
  return { cancelled: true };
}
