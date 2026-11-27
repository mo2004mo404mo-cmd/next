import { db } from '../../db';
import { createLogger } from '../../logger';

const log = createLogger('AgentQueue');

/**
 * Durable job queue — DB-backed with leases, retries, cancellation.
 * Ported from hermes `lib/queue/queue.ts` (BullMQ-shaped interface), re-scoped
 * from workspaceId to MedQ's userId tenancy, plus an append-only event stream
 * (AgentJobEvent rows) that replaces MedQ's old in-memory job events array.
 *
 * Lease semantics: a worker claims a job by flipping status to 'leased' with a
 * lease deadline; expired leases are reaped; failures retry with capped
 * attempts and exponential backoff. The interface is deliberately
 * BullMQ-shaped so a Redis deployment is a drop-in swap of this module.
 */

export type AgentJobKind = 'agent.run' | 'task.run' | 'notify.send';
export type AgentJobStatus = 'pending' | 'leased' | 'done' | 'failed' | 'cancelled';

export interface EnqueueParams {
  userId: string;
  kind: AgentJobKind;
  payload: Record<string, unknown>;
  priority?: number;
  maxAttempts?: number;
  scheduledTaskId?: string | null;
  delayMs?: number;
}

export async function enqueue(params: EnqueueParams) {
  return db.agentJob.create({
    data: {
      userId: params.userId,
      kind: params.kind,
      payloadJson: JSON.stringify(params.payload),
      priority: params.priority ?? 50,
      maxAttempts: params.maxAttempts ?? 3,
      scheduledTaskId: params.scheduledTaskId ?? undefined,
      availableAt: new Date(Date.now() + (params.delayMs ?? 0)),
    },
  });
}

const LEASE_MS = 5 * 60_000;

/** Claim the next runnable job (priority → availability → FIFO). */
export async function leaseJob(workerId: string) {
  return db.$transaction(async (tx) => {
    // Reap expired leases first.
    await tx.agentJob.updateMany({
      where: { status: 'leased', leaseUntil: { lt: new Date() } },
      data: { status: 'pending', leasedBy: null, leaseUntil: null },
    });
    const job = await tx.agentJob.findFirst({
      where: {
        status: 'pending',
        availableAt: { lte: new Date() },
        cancelRequested: false,
      },
      orderBy: [{ priority: 'asc' }, { createdAt: 'asc' }],
    });
    if (!job) return null;
    return tx.agentJob.update({
      where: { id: job.id },
      data: {
        status: 'leased',
        leasedBy: workerId,
        leaseUntil: new Date(Date.now() + LEASE_MS),
        attempts: { increment: 1 },
        startedAt: job.startedAt ?? new Date(),
      },
    });
  });
}

export async function completeJob(jobId: string) {
  await db.agentJob.update({
    where: { id: jobId },
    data: { status: 'done', finishedAt: new Date(), progress: 100 },
  });
}

export async function failJob(jobId: string, error: string) {
  const job = await db.agentJob.findUnique({ where: { id: jobId } });
  if (!job) return;
  const exhausted = job.attempts >= job.maxAttempts;
  await db.agentJob.update({
    where: { id: jobId },
    data: {
      status: exhausted ? 'failed' : 'pending',
      lastError: error.slice(0, 1000),
      finishedAt: exhausted ? new Date() : null,
      // Exponential backoff between attempts.
      availableAt: exhausted ? undefined : new Date(Date.now() + Math.min(2 ** job.attempts * 5_000, 120_000)),
    },
  });
}

/** Mark a job cancelled (deep-agent cancel parity — never retried). */
export async function cancelJob(jobId: string) {
  await db.agentJob.update({
    where: { id: jobId },
    data: { status: 'cancelled', cancelRequested: true, finishedAt: new Date() },
  }).catch(() => undefined);
}

export async function updateProgress(jobId: string, progress: number) {
  await db.agentJob
    .update({ where: { id: jobId }, data: { progress: Math.max(0, Math.min(100, Math.round(progress))) } })
    .catch(() => undefined);
}

export async function requestCancel(jobId: string, userId: string) {
  await db.agentJob.updateMany({ where: { id: jobId, userId }, data: { cancelRequested: true } });
}

export async function listJobs(userId: string, limit = 30) {
  return db.agentJob.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

// ── Job event stream (replaces the old in-memory AgentJob.events array) ──

export interface JobEventPayload {
  type: 'progress' | 'text' | 'tool_call' | 'tool_result' | 'subagent' | 'done' | 'error' | 'notice';
  ts: number;
  text?: string;
  name?: string;
  args?: Record<string, unknown>;
  iteration?: number;
  result?: Record<string, unknown>;
  failed?: boolean;
  subagent?: string;
  event?: string;
  [key: string]: unknown;
}

/** Append one event to a job's stream (auto seq). */
export async function appendJobEvent(jobId: string, payload: JobEventPayload) {
  const last = await db.agentJobEvent.findFirst({ where: { jobId }, orderBy: { seq: 'desc' }, select: { seq: true } });
  const seq = (last?.seq ?? -1) + 1;
  await db.agentJobEvent.create({
    data: { jobId, seq, type: payload.type, payloadJson: JSON.stringify(payload) },
  });
}

/** Read a job's events after a cursor (the polling contract the UI already uses). */
export async function listJobEvents(jobId: string, sinceSeq = -1) {
  const rows = await db.agentJobEvent.findMany({
    where: { jobId, seq: { gt: sinceSeq } },
    orderBy: { seq: 'asc' },
  });
  return rows.map((row) => ({ seq: row.seq, ...JSON.parse(row.payloadJson) as JobEventPayload }));
}

/** Job + events snapshot for the polling endpoint (old getAgentJob shape). */
export async function getJobWithEvents(jobId: string, userId?: string | null) {
  const job = await db.agentJob.findUnique({ where: { id: jobId } });
  if (!job) return null;
  if (userId && job.userId !== userId) return null;
  const events = await listJobEvents(jobId);
  return {
    id: job.id,
    status: job.status,
    message: (JSON.parse(job.payloadJson) as { message?: string }).message ?? '',
    events,
    finalText: events.filter((e) => e.type === 'text').map((e) => e.text ?? '').join('') || null,
    error: job.lastError,
    progress: job.progress,
    attempts: job.attempts,
    kind: job.kind,
    createdAt: job.createdAt.getTime(),
    updatedAt: job.updatedAt.getTime(),
  };
}

/** Map DB status → the old in-memory status vocabulary the UI expects. */
export function jobDisplayStatus(status: string): 'pending' | 'processing' | 'completed' | 'failed' {
  switch (status) {
    case 'done': return 'completed';
    case 'leased': return 'processing';
    case 'failed': return 'failed';
    case 'cancelled': return 'failed';
    default: return 'pending';
  }
}

export { log };
