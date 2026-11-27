import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { callChat } from '@/lib/ai/unified-llm';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import {
  EXPLAIN_BATCH_SIZE,
  EXPLAIN_MAX_QUESTION_IDS,
  MIN_EXPLANATION_CHARS,
  planBatches,
  pendingBatchIdxs,
  explainSystemPrompt,
  buildExplainPrompt,
  parseExplanationsJson,
  markdownToSafeHtml,
  type QuestionSnapshot,
  type ExplanationItem,
} from '@/lib/explanation-plan';

/**
 * POST   /api/questions/explain  → { jobId, total }   (background job)
 * GET    /api/questions/explain?jobId=…               (poll / fast-resume)
 * GET    /api/questions/explain                       ({missing,total} — confirm-step data)
 * DELETE /api/questions/explain?jobId=…               (discard finished job)
 *
 * Batch AI explanation generator — writes RICH, structured teaching
 * explanations (see src/lib/explanation-plan.ts for the quality contract)
 * onto Question rows that lack them (or regenerate them with overwrite).
 *
 * ── RESUMABLE MULTI-PASS (the architecture that never loses work) ──
 * The target question-id list is FROZEN in the job row at creation. Batches
 * are deterministic slices of that list. As each batch settles, its result
 * ({explained: [ids]}) is persisted into the row's chunkResults — so:
 *   • every write is durable the moment it happens (partial progress is
 *     real progress — refreshing the bank shows explained questions mid-job)
 *   • a job interrupted by rate limits, a server restart, or the pass
 *     deadline PAUSES instead of failing: status stays "processing", the
 *     heartbeat stops, and the next GET poll (after FAST_RESUME_MS) claims
 *     the row at the DB level and re-kicks a NEW PASS over only the
 *     still-pending batches
 *   • after MAX_PASSES the job settles HONESTLY from the live database
 *     (written / failed counted from the Question rows themselves, never
 *     from in-memory counters)
 *
 * ── PROVIDER STACK ──
 * Primary AND fallback: both go through callChat forced via x-model
 * = medq-router:auto, which routes through the in-process FreeLLM API
 * (the MedQ AI Router) — same surface the MedQ assistant uses. BYOK
 * multi-endpoint failover is included (see lib/ai/unified-llm.ts). The
 * fallback is gated by a global admission gate (`__qExplainRouterGate`)
 * so concurrent batches share one budget and don't manufacture a 429
 * storm against the upstream provider. A circuit breaker skips a
 * repeatedly-failing primary for the rest of a pass; a cross-pass latch
 * marks it dead for the job.
 */

// ── Tuning constants ──

const PRIMARY_TIMEOUT_MS = 120_000;
const FALLBACK_TIMEOUT_MS = 180_000;
/** Two batches in flight — explanations are long outputs; more parallelism
 *  multiplies rate-limit pressure for little wall-time gain. */
const BATCH_CONCURRENCY = 2;
/** After this many CONSECUTIVE primary failures, the rest of the pass goes
 *  straight to the router fallback. */
const PRIMARY_BREAKER_THRESHOLD = 2;
/** Total primary failures across passes that latches primaryDead for the
 *  whole job (it's not coming back — stop burning 2-minute timeouts). */
const PRIMARY_LATCH_FAILURES = 4;
const ZAI_MAX_ATTEMPTS = 5;
const ZAI_RETRY_BASE_MS = 6_000;
/** A settled-but-paused job (no heartbeat) is re-kicked by the next poll
 *  after this long — fast enough to feel automatic, slow enough to give a
 *  rate-limited gateway a real cool-down. */
const FAST_RESUME_MS = 90_000;
/** Heartbeat while running (bumps updatedAt so the resume check leaves
 *  LIVE jobs alone). */
const HEARTBEAT_MS = 30_000;
/** Finished rows stay retrievable this long, then POST-side cleanup drops them. */
const JOB_TTL_MS = 24 * 60 * 60_000;
/** ONE explanation job on the whole server at a time (shared AI budget). */
const MAX_RUNNING_GLOBAL = 1;
/** Memory guard. */
const MAX_TOTAL_JOBS = 20;
/** Passes before honest settlement (each pass = one sweep + retry round). */
const MAX_PASSES = 6;
/** A job whose startedAt predates this AND isn't live has survived too many
 *  failed resumes — fail it honestly instead of resume-looping forever. */
const ZOMBIE_FAIL_MS = 60 * 60_000;

/** Live runners in THIS process (globalThis so dev HMR keeps it). */
const LIVE: Set<string> =
  ((globalThis as Record<string, unknown>).__qExplainLive as Set<string>) ??
  (((globalThis as Record<string, unknown>).__qExplainLive = new Set<string>()) as Set<string>);

/** Serialized chunkResults persistence per job — two workers settling
 *  batches concurrently must not read-modify-write the row out of order. */
const CHAINS: Map<string, Promise<void>> =
  ((globalThis as Record<string, unknown>).__qExplainChains as Map<string, Promise<void>>) ??
  (((globalThis as Record<string, unknown>).__qExplainChains = new Map<string, Promise<void>>()) as Map<string, Promise<void>>);

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

function isRateLimitError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /\b429\b|too many requests|rate.?limit/i.test(msg);
}

function isNoProviderError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return /no model could be resolved|no provider|setup_providers/i.test(msg);
}

// ── FreeLLM AI Router fallback ──
//
// The fallback uses callChat forced through the MedQ AI Router
// (medq-router:auto) so it goes through the in-process FreeLLM API —
// matching the MedQ assistant. We build a synthetic NextRequest with an
// x-model header so resolveModelFromRequest picks medq-router:auto
// regardless of the user's configured default. The original primary call
// above already routes through callChat (so BYOK / DEFAULT_MODEL users
// hit FreeLLM when their default is medq-router:auto), but the fallback
// is the safety net when the primary returns thin/garbage output, so it
// must ALSO use FreeLLM — not the bare ZAI SDK — to keep behavior
// consistent with the rest of the app.

/** The model id forced on the fallback. Override via env if needed. */
const FALLBACK_MODEL = process.env.EXPLAIN_FALLBACK_MODEL || 'medq-router:auto';

interface RouterGate {
  active: number;
  spacingMs: number;
  lastStart: number;
  waiters: Array<() => void>;
}
const ROUTER_MAX_IN_FLIGHT = 2;
const ROUTER_SPACING_FLOOR_MS = 1_200;
const ROUTER_SPACING_CEIL_MS = 30_000;
const routerGate: RouterGate =
  ((globalThis as Record<string, unknown>).__qExplainRouterGate as RouterGate) ??
  (((globalThis as Record<string, unknown>).__qExplainRouterGate = {
    active: 0,
    spacingMs: ROUTER_SPACING_FLOOR_MS,
    lastStart: 0,
    waiters: [],
  }) as RouterGate);

function routerAcquire(): Promise<(success: boolean) => void> {
  return new Promise((resolveReady) => {
    const start = () => {
      routerGate.active++;
      const wait = routerGate.lastStart + routerGate.spacingMs - Date.now();
      const go = () => {
        routerGate.lastStart = Date.now();
        resolveReady((success: boolean) => {
          routerGate.active--;
          routerGate.spacingMs = success
            ? Math.max(routerGate.spacingMs * 0.7, ROUTER_SPACING_FLOOR_MS)
            : Math.min(routerGate.spacingMs * 2, ROUTER_SPACING_CEIL_MS);
          const next = routerGate.waiters.shift();
          if (next) next();
        });
      };
      if (wait > 0) sleep(wait).then(go);
      else go();
    };
    if (routerGate.active < ROUTER_MAX_IN_FLIGHT) start();
    else routerGate.waiters.push(start);
  });
}

function withTimeout<T>(p: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutP = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms);
  });
  return Promise.race([p, timeoutP]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

/**
 * Build a synthetic NextRequest with x-model = FALLBACK_MODEL so that
 * resolveModelFromRequest() (called inside callChat) routes the request
 * through the MedQ AI Router regardless of the original request's headers
 * or the user's saved default model. The original request's auth context
 * (cookies) is preserved so BYOK endpoint lookup still works — the
 * medq-router endpoint is a UserApiKey row owned by the signed-in user.
 */
function buildRouterRequest(req: Request): NextRequest {
  const url = new URL(req.url);
  const init: RequestInit & { headers: Record<string, string> } = {
    method: req.method,
    headers: { 'x-model': FALLBACK_MODEL },
  };
  // Forward auth + content-type so user context survives.
  const forwardHeaders = [
    'cookie',
    'authorization',
    'content-type',
    'x-api-key',
    'x-base-url',
    'x-provider-type',
  ];
  for (const h of forwardHeaders) {
    const v = req.headers.get(h);
    if (v) init.headers[h] = v;
  }
  return new NextRequest(url, init);
}

async function routerExplainOnce(
  routerReq: NextRequest,
  system: string,
  prompt: string,
): Promise<string> {
  const release = await routerAcquire();
  try {
    const text = await callChat(routerReq, {
      system,
      prompt,
      stage: 'explain',
      maxOutputTokens: 6_000,
      temperature: 0.3,
      maxRetries: 0,
    });
    release(true);
    return text || '';
  } catch (err) {
    release(!isRateLimitError(err));
    throw err;
  }
}

async function routerExplain(
  routerReq: NextRequest,
  system: string,
  prompt: string,
): Promise<string> {
  for (let attempt = 1; ; attempt++) {
    try {
      return await withTimeout(
        routerExplainOnce(routerReq, system, prompt),
        FALLBACK_TIMEOUT_MS,
        `Router fallback (attempt ${attempt})`,
      );
    } catch (err) {
      if (attempt >= ZAI_MAX_ATTEMPTS || !isRateLimitError(err)) throw err;
      const backoff = ZAI_RETRY_BASE_MS * 2 ** (attempt - 1) + Math.floor(Math.random() * 2_000);
      console.warn(
        `[Question Explain] router rate-limited (attempt ${attempt}/${ZAI_MAX_ATTEMPTS}, gate spacing ${Math.round(routerGate.spacingMs / 1000)}s) — retrying in ${Math.round(backoff / 1000)}s`,
      );
      await sleep(backoff);
    }
  }
}

// ── Job state helpers ──

interface BatchSettlement {
  explained: string[];
}

function parseChunkResults(raw: string | null | undefined): Array<BatchSettlement | null> {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.map((entry) => {
      if (entry && typeof entry === 'object' && Array.isArray((entry as BatchSettlement).explained)) {
        const ids = (entry as BatchSettlement).explained.filter((id) => typeof id === 'string');
        return { explained: ids } satisfies BatchSettlement;
      }
      return null;
    });
  } catch {
    return [];
  }
}

/** Persist one batch settlement through the job's serialized write chain. */
function persistBatch(jobId: string, batchIdx: number, settled: BatchSettlement | null): Promise<void> {
  const run = (async () => {
    const row = await db.explanationJob.findUnique({
      where: { id: jobId },
      select: { chunkResults: true },
    });
    if (!row) return;
    const results = parseChunkResults(row.chunkResults);
    while (results.length <= batchIdx) results.push(null);
    results[batchIdx] = settled;
    await db.explanationJob.update({
      where: { id: jobId },
      data: { chunkResults: JSON.stringify(results) },
    });
  })();
  const prev = CHAINS.get(jobId) ?? Promise.resolve();
  const next = prev.then(() => run, () => run);
  CHAINS.set(jobId, next.catch(() => {}));
  return next;
}

function bumpProgress(jobId: string, done: number, total: number): Promise<unknown> {
  return db.explanationJob
    .update({ where: { id: jobId }, data: { progressDone: done, progressTotal: total } })
    .catch(() => {});
}

// ── The batch worker ──

/** Load the still-explainable questions for a batch (resume-safe: deleted
 *  questions and — without overwrite — already-explained ones are skipped). */
async function loadBatchQuestions(
  ids: string[],
  overwrite: boolean,
): Promise<QuestionSnapshot[]> {
  const rows = await db.question.findMany({
    where: { id: { in: ids } },
    select: { id: true, text: true, type: true, options: true, answer: true, explanation: true },
  });
  const byId = new Map(rows.map((r) => [r.id, r]));
  const out: QuestionSnapshot[] = [];
  for (const id of ids) {
    const row = byId.get(id);
    if (!row) continue; // deleted since the plan froze — skip honestly
    if (!overwrite && row.explanation && row.explanation.trim() !== '') continue; // explained meanwhile
    let options: string[] = [];
    try {
      const parsed = JSON.parse(row.options ?? '[]');
      if (Array.isArray(parsed)) options = parsed.map(String);
    } catch { /* leave empty */ }
    out.push({ id: row.id, text: row.text, type: row.type, options, answer: row.answer });
  }
  return out;
}

/** Write one explanation item. Idempotent unless the job runs overwrite. */
async function writeExplanation(item: ExplanationItem, overwrite: boolean): Promise<boolean> {
  const data = {
    explanation: markdownToSafeHtml(item.explanation),
    ...(item.distractorAnalysis ? { distractorAnalysis: markdownToSafeHtml(item.distractorAnalysis) } : {}),
    ...(item.clinicalPearl ? { clinicalPearl: markdownToSafeHtml(item.clinicalPearl) } : {}),
    ...(item.mnemonic ? { mnemonic: markdownToSafeHtml(item.mnemonic) } : {}),
  };
  // Never clobber an existing explanation unless the job explicitly regenerates.
  // (`explanation` is non-nullable with default '' — empty string = missing.)
  const where = overwrite ? { id: item.id } : { id: item.id, explanation: '' };
  const res = await db.question.updateMany({ where, data });
  return res.count > 0;
}

interface Breaker {
  skipPrimary: () => boolean;
  onPrimaryFail: () => void;
  onPrimarySuccess: () => void;
}

/**
 * Explain ONE batch: primary callChat → quality-validate → write; on
 * failure (or zero valid items) the ZAI fallback gets a shot. Returns the
 * ids actually written, or null when the batch remains unexplained (retry
 * round / next pass).
 */
async function explainBatch(
  req: Request,
  ids: string[],
  overwrite: boolean,
  breaker: Breaker,
  forceFallback: boolean,
): Promise<BatchSettlement | null> {
  const questions = await loadBatchQuestions(ids, overwrite);
  if (questions.length === 0) return { explained: [] }; // nothing to do — settled

  const system = explainSystemPrompt();
  const prompt = buildExplainPrompt(questions);
  const requestedIds = questions.map((q) => q.id);

  let raw = '';
  let usedPrimary = false;

  if (forceFallback || breaker.skipPrimary()) {
    // skip — straight to fallback
  } else {
    const abort = new AbortController();
    const timer = setTimeout(() => abort.abort(), PRIMARY_TIMEOUT_MS);
    // Use the router-forced request so the primary ALSO goes through the
    // MedQ AI Router (in-process FreeLLM API), matching the MedQ assistant.
    // This makes every explain call — primary or fallback — hit FreeLLM
    // and show up in the [Proxy] log, regardless of the user's saved
    // default model.
    const routerReq = buildRouterRequest(req);
    try {
      raw = await withTimeout(
        callChat(routerReq, {
          system,
          prompt,
          stage: 'explain',
          maxOutputTokens: 6000,
          temperature: 0.3,
          maxRetries: 0,
          abortSignal: abort.signal,
        }),
        PRIMARY_TIMEOUT_MS,
        'Explanation primary',
      );
      usedPrimary = true;
    } catch (err) {
      breaker.onPrimaryFail();
      console.warn('[Question Explain] primary failed:', err instanceof Error ? err.message : err);
    } finally {
      clearTimeout(timer);
    }
  }

  let parsed = await parseExplanationsJson(raw, requestedIds);

  // Zero valid items (thin/garbage/truncated) → one fallback attempt via
  // the MedQ AI Router (in-process FreeLLM API). Same behavior as the
  // MedQ assistant: route through medq-router:auto so BYOK endpoints
  // (round-robin + failover) get used, and the call shows up in the
  // [Proxy] log. The synthetic request forces x-model=medq-router:auto
  // regardless of the user's configured default model.
  if (parsed.items.length === 0) {
    const routerReq = buildRouterRequest(req);
    console.warn(
      `[Question Explain] primary produced ${parsed.items.length} valid explanations (${questions.length} asked) — trying router fallback (${FALLBACK_MODEL})`,
    );
    try {
      raw = await routerExplain(routerReq, system, prompt);
      parsed = await parseExplanationsJson(raw, requestedIds);
    } catch (err) {
      console.warn('[Question Explain] router fallback failed:', err instanceof Error ? err.message : err);
    }
  }

  if (usedPrimary && parsed.items.length > 0) breaker.onPrimarySuccess();
  if (parsed.items.length === 0) return null; // batch remains pending

  const written: string[] = [];
  for (const item of parsed.items) {
    try {
      const ok = await writeExplanation(item, overwrite);
      if (ok) written.push(item.id);
    } catch (err) {
      console.error(`[Question Explain] write failed for ${item.id}:`, err);
    }
  }
  return { explained: written };
}

// ── The job runner (multi-pass, pausable, honest) ──

interface JobMeta {
  primaryFailures?: number;
  primaryDead?: boolean;
  passNo?: number;
}

function parseMeta(raw: string | null | undefined): JobMeta {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? (parsed as JobMeta) : {};
  } catch {
    return {};
  }
}

async function runJob(jobId: string, req: Request): Promise<void> {
  if (LIVE.has(jobId)) return;
  LIVE.add(jobId);

  const row0 = await db.explanationJob.findUnique({ where: { id: jobId } });
  if (!row0 || row0.status === 'done' || row0.status === 'error') {
    LIVE.delete(jobId);
    return;
  }

  const meta: JobMeta = parseMeta(row0.metaJson);
  const overwrite = row0.overwrite;

  let progressDone = 0;
  const heartbeat = setInterval(() => {
    void db.explanationJob
      .update({ where: { id: jobId }, data: { progressDone } })
      .catch(() => {});
  }, HEARTBEAT_MS);

  try {
    const frozenIds: string[] = (() => {
      try {
        const parsed = JSON.parse(row0.questionIds);
        return Array.isArray(parsed) ? parsed.filter((id) => typeof id === 'string') : [];
      } catch {
        return [];
      }
    })();

    const batches = planBatches(frozenIds);
    const chunkResults = parseChunkResults(row0.chunkResults);
    while (chunkResults.length < batches.length) chunkResults.push(null);

    // Each (re)start of the runner = a new PASS with a fresh deadline clock.
    const passNo = (meta.passNo ?? 0) + 1;
    meta.passNo = passNo;
    const wallStart = Date.now();
    const PASS_DEADLINE_MS = 20 * 60_000;

    await db.explanationJob.update({
      where: { id: jobId },
      data: {
        status: 'processing',
        startedAt: new Date(),
        passCount: passNo,
        progressTotal: batches.length,
        progressDone: chunkResults.filter((r) => r !== null).length,
        metaJson: JSON.stringify(meta),
      },
    });
    progressDone = chunkResults.filter((r) => r !== null).length;

    // Round 1 uses the primary (unless the breaker is open); the retry round
    // below flips forceAllFallback to skip the primary entirely (minimum
    // rate-limit pressure).
    let forceAllFallback = false;
    const breaker: Breaker = {
      skipPrimary: () =>
        forceAllFallback ||
        meta.primaryDead === true ||
        (meta.primaryFailures ?? 0) >= PRIMARY_BREAKER_THRESHOLD,
      onPrimaryFail: () => {
        meta.primaryFailures = (meta.primaryFailures ?? 0) + 1;
        if ((meta.primaryFailures ?? 0) >= PRIMARY_LATCH_FAILURES) meta.primaryDead = true;
      },
      onPrimarySuccess: () => {
        meta.primaryFailures = 0;
      },
    };

    const pending = pendingBatchIdxs(chunkResults);
    console.log(
      `[Question Explain] job ${jobId}: pass ${passNo}/${MAX_PASSES} — ${pending.length} of ${batches.length} batch(es) pending (${row0.total} questions, overwrite=${overwrite})`,
    );

    // ── Round 1: worker pool over pending batches ──
    let next = 0;
    const worker = async (): Promise<void> => {
      for (;;) {
        const i = pending[next++];
        if (i === undefined) return;
        if (Date.now() - wallStart > PASS_DEADLINE_MS) return; // pause, don't drop
        try {
          const settled = await explainBatch(req, batches[i], overwrite, breaker, forceAllFallback);
          if (settled) chunkResults[i] = settled;
          await persistBatch(jobId, i, settled);
        } catch (err) {
          console.error(`[Question Explain] batch ${i + 1}/${batches.length} failed:`, err);
          // No-provider fast fail — the whole job cannot proceed.
          if (isNoProviderError(err)) throw err;
        } finally {
          progressDone++;
          void bumpProgress(jobId, progressDone, batches.length);
        }
      }
    };
    await Promise.all(
      Array.from({ length: Math.min(BATCH_CONCURRENCY, Math.max(pending.length, 1)) }, () => worker()),
    );

    // ── Round 2: sequential retry (skip the primary — minimum pressure) ──
    const retryIdx = pendingBatchIdxs(chunkResults);
    if (retryIdx.length > 0) {
      console.warn(
        `[Question Explain] pass ${passNo} retry round: ${retryIdx.length} batch(es) sequentially`,
      );
      forceAllFallback = true;
      for (const i of retryIdx) {
        if (Date.now() - wallStart > PASS_DEADLINE_MS) break;
        try {
          const settled = await explainBatch(req, batches[i], overwrite, breaker, true);
          if (settled) chunkResults[i] = settled;
          await persistBatch(jobId, i, settled);
        } catch (err) {
          if (isNoProviderError(err)) throw err;
          console.error(`[Question Explain] retry batch ${i + 1}/${batches.length} failed:`, err);
        }
      }
    }

    // ── Still pending? PAUSE (resumable) or settle ──
    const stillPending = pendingBatchIdxs(chunkResults);
    if (stillPending.length > 0 && passNo < MAX_PASSES) {
      console.warn(
        `[Question Explain] job ${jobId} PAUSING after pass ${passNo} — ${stillPending.length} batch(es) pending; resumable on the next poll`,
      );
      await db.explanationJob.update({
        where: { id: jobId },
        data: { metaJson: JSON.stringify(meta), progressDone, progressTotal: batches.length },
      });
      return; // row stays "processing"; no heartbeat → stale → resume
    }

    // ── Settle honestly from the live DB ──
    const settled = await settleJob(jobId, frozenIds);
    console.log(
      `[Question Explain] job ${jobId} settled: written=${settled.written} failed=${settled.failed}` +
      `${stillPending.length > 0 ? ` (${stillPending.length} batch(es) never completed)` : ''}`,
    );
  } catch (err) {
    console.error('[Question Explain] job crashed:', err);
    const message = isNoProviderError(err)
      ? 'No AI provider is configured. Add your API key under Settings → AI Providers (or set DEFAULT_MODEL / run a local Ollama), then try again.'
      : 'Explanation generation failed unexpectedly. Please try again — already-written explanations are kept.';
    await db.explanationJob
      .update({
        where: { id: jobId },
        data: { status: 'error', error: message, finishedAt: new Date() },
      })
      .catch(() => {});
  } finally {
    clearInterval(heartbeat);
    LIVE.delete(jobId);
    CHAINS.delete(jobId);
  }
}

/** Final settlement — counted from what THIS job actually wrote (the
 *  persisted chunkResults), never from in-memory counters. */
async function settleJob(jobId: string, frozenIds: string[]) {
  const row = await db.explanationJob.findUnique({
    where: { id: jobId },
    select: { chunkResults: true },
  });
  const chunkResults = parseChunkResults(row?.chunkResults);
  const writtenIds = new Set<string>();
  for (const settled of chunkResults) {
    for (const id of settled?.explained ?? []) writtenIds.add(id);
  }
  // Cross-check against the live DB: a written id must still exist with a
  // non-empty explanation (guards against a later manual wipe).
  const confirmed = await db.question.count({
    where: { id: { in: [...writtenIds] }, explanation: { not: '' } },
  });
  const written = confirmed;
  const failed = Math.max(frozenIds.length - written, 0);
  await db.explanationJob.update({
    where: { id: jobId },
    data: { status: 'done', written, failed, finishedAt: new Date() },
  });
  return { written, failed };
}

// ── HTTP surface ──

async function cleanupJobs(): Promise<void> {
  const cutoff = new Date(Date.now() - JOB_TTL_MS);
  await db.explanationJob.deleteMany({ where: { createdAt: { lt: cutoff } } }).catch(() => {});
}

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body || typeof body !== 'object') {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const bodyRec = body as { questionIds?: unknown; overwrite?: unknown };
  const overwrite = bodyRec.overwrite === true;
  let questionIds: string[] | null = null;
  if (Array.isArray(bodyRec.questionIds)) {
    questionIds = bodyRec.questionIds
      .filter((id): id is string => typeof id === 'string' && id.trim() !== '')
      .map((id) => id.trim())
      .slice(0, EXPLAIN_MAX_QUESTION_IDS);
    if (questionIds.length === 0) {
      return NextResponse.json({ error: 'questionIds must be a non-empty array' }, { status: 400 });
    }
  }

  await cleanupJobs();

  // Zombie sweep: paused jobs whose owner stopped polling get this long
  // before another POST kills them (a paused job could still resume).
  await db.explanationJob
    .updateMany({
      where: {
        status: { in: ['pending', 'processing'] },
        updatedAt: { lt: new Date(Date.now() - ZOMBIE_FAIL_MS) },
      },
      data: {
        status: 'error',
        error: 'Explanation generation was interrupted and never resumed. Please try again — already-written explanations are kept.',
        finishedAt: new Date(),
      },
    })
    .catch(() => {});

  const running = await db.explanationJob.count({
    where: { status: { in: ['pending', 'processing'] }, createdAt: { gt: new Date(Date.now() - JOB_TTL_MS) } },
  });
  if (running >= MAX_RUNNING_GLOBAL) {
    return NextResponse.json(
      { error: 'Another explanation job is still running — wait for it to finish or resume, then try again.' },
      { status: 429 },
    );
  }
  const total = await db.explanationJob.count();
  if (total >= MAX_TOTAL_JOBS) {
    return NextResponse.json({ error: 'Too many explanation jobs. Please retry later.' }, { status: 503 });
  }

  // ── Freeze the target list ──
  let frozenIds: string[];
  let scope: string;
  if (questionIds) {
    // Selected mode: only ids that exist AND (without overwrite) still lack
    // an explanation. (explanation is non-nullable, default '' = missing.)
    const rows = await db.question.findMany({
      where: {
        id: { in: questionIds },
        ...(overwrite ? {} : { explanation: '' }),
      },
      select: { id: true },
    });
    const byId = new Set(rows.map((r) => r.id));
    frozenIds = questionIds.filter((id) => byId.has(id));
    scope = 'selected';
  } else {
    // Whole-bank mode: every question lacking an explanation (the Question
    // table is a shared pool — jobs are user-scoped, questions are not).
    const rows = await db.question.findMany({
      where: { explanation: '' },
      select: { id: true },
      orderBy: { createdAt: 'asc' },
      take: EXPLAIN_MAX_QUESTION_IDS,
    });
    frozenIds = rows.map((r) => r.id);
    scope = 'missing';
  }

  if (frozenIds.length === 0) {
    return NextResponse.json(
      { error: overwrite ? 'None of the selected questions exist.' : 'No questions need explanations — every question already has one. 🎉' },
      { status: 400 },
    );
  }

  const job = await db.explanationJob.create({
    data: {
      userId,
      status: 'pending',
      scope,
      overwrite,
      questionIds: JSON.stringify(frozenIds),
      total: frozenIds.length,
    },
  });

  void runJob(job.id, req).catch(() => {});

  return NextResponse.json({ jobId: job.id, total: frozenIds.length }, { status: 202 });
});

export const GET = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const jobId = new URL(req.url).searchParams.get('jobId');
  if (!jobId) {
    // Confirm-step data: how many questions lack an explanation.
    const [missing, total] = await Promise.all([
      db.question.count({ where: { explanation: '' } }),
      db.question.count(),
    ]);
    return NextResponse.json({ missing, total });
  }

  let job = await db.explanationJob.findUnique({ where: { id: jobId } });
  if (!job || job.userId !== userId) {
    return NextResponse.json({ error: 'Explanation job not found — it may have expired.' }, { status: 404 });
  }

  if (job.status === 'pending' || job.status === 'processing') {
    // Zombie: started long ago, not live here, and even resumes haven't saved it.
    if (job.startedAt.getTime() < Date.now() - ZOMBIE_FAIL_MS && !LIVE.has(jobId)) {
      await db.explanationJob
        .update({
          where: { id: jobId },
          data: {
            status: 'error',
            error: 'This explanation job could not complete — the AI service was unavailable for too long. Already-written explanations are kept; please try again.',
            finishedAt: new Date(),
          },
        })
        .catch(() => {});
      return NextResponse.json({
        status: 'error',
        error: 'This explanation job could not complete — the AI service was unavailable for too long. Already-written explanations are kept; please try again.',
      });
    }
    // Fast resume: a paused (or restarted) job with no heartbeat gets
    // claimed at the DB level and re-kicked into a new pass.
    const staleBefore = new Date(Date.now() - FAST_RESUME_MS);
    if (job.updatedAt < staleBefore && !LIVE.has(jobId)) {
      const claimed = await db.explanationJob.updateMany({
        where: { id: jobId, updatedAt: { lt: staleBefore }, status: { in: ['pending', 'processing'] } },
        data: { status: 'processing' }, // bumps updatedAt via @updatedAt
      });
      if (claimed.count === 1) {
        console.log(`[Question Explain] resuming paused job ${jobId} into a new pass`);
        void runJob(jobId, req).catch(() => {});
        job = { ...job, status: 'processing', updatedAt: new Date() };
      }
    }
  }

  if (job.status === 'pending' || job.status === 'processing') {
    const chunkResults = parseChunkResults(job.chunkResults);
    const settledBatches = chunkResults.filter((r) => r !== null).length;
    const writtenSoFar = chunkResults.reduce(
      (acc, r) => acc + (r ? r.explained.length : 0),
      0,
    );
    return NextResponse.json({
      status: 'running',
      startedAt: job.startedAt.getTime(),
      progress: { done: settledBatches, total: chunkResults.length || job.progressTotal },
      written: writtenSoFar,
      totalQuestions: job.total,
      pass: job.passCount || 1,
      serverUpdatedAt: job.updatedAt.getTime(),
    });
  }
  if (job.status === 'done') {
    return NextResponse.json({
      status: 'done',
      written: job.written ?? 0,
      failed: job.failed ?? 0,
      totalQuestions: job.total,
    });
  }
  return NextResponse.json({ status: 'error', error: job.error || 'Explanation generation failed' });
});

export const DELETE = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return NextResponse.json({ error: 'User not found' }, { status: 401 });

  const jobId = new URL(req.url).searchParams.get('jobId');
  if (!jobId) return NextResponse.json({ error: 'Missing jobId' }, { status: 400 });

  const job = await db.explanationJob.findUnique({ where: { id: jobId } });
  if (!job || job.userId !== userId) {
    return NextResponse.json({ error: 'Explanation job not found' }, { status: 404 });
  }
  if (job.status === 'pending' || job.status === 'processing') {
    return NextResponse.json(
      { error: 'Cannot delete a running explanation job — it will pause and resume automatically; let it finish or expire.' },
      { status: 409 },
    );
  }
  await db.explanationJob.delete({ where: { id: jobId } });
  return NextResponse.json({ deleted: true });
});
