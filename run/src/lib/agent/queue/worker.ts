import { db } from '../../db';
import { streamMedQDeepAgent } from '../deep-agent-runtime';
import { leaseJob, completeJob, failJob, cancelJob, appendJobEvent, updateProgress, enqueue } from './service';
import { advanceCron } from '../scheduler/cron';
import { registerJobAbort, unregisterJobAbort } from './abort';
import { audit } from '../audit';
import { getWeakTopics, formatWeakTopics } from '../weak-topics';
import { createLogger } from '../../logger';
import { sendPushForNotification } from '../../server/push';

const log = createLogger('AgentWorker');

/**
 * In-process queue worker + scheduler tick — the hermes `mini-services/
 * agent-worker` sidecar responsibilities collapsed into the Next.js process
 * (single-instance deployments; the DB lease semantics keep it correct if a
 * future multi-instance deployment runs several workers).
 *
 * Loop every 2s: lease one job → execute → notify → done/fail.
 * Tick every 15s: due ScheduledTasks → enqueue task.run jobs → advance cron.
 *
 * The worker is started lazily (first schedule_task tool call or API hit) AND
 * eagerly on server boot via src/instrumentation.ts. Intervals are unref'd so
 * they never hold the process open.
 */

const JOB_LOOP_MS = 2000;
const TICK_LOOP_MS = 15000;

/** Stable per-process worker id (lease owner column). */
function workerId(): string {
  const runtime = globalThis as typeof globalThis & { __medqWorkerId?: string };
  if (!runtime.__medqWorkerId) {
    runtime.__medqWorkerId = `worker-${process.pid}-${Math.random().toString(36).slice(2, 8)}`;
  }
  return runtime.__medqWorkerId;
}

const runtime = globalThis as typeof globalThis & {
  __medqAgentWorkerStarted?: boolean;
};

export function ensureWorkerStarted(): void {
  if (runtime.__medqAgentWorkerStarted) return;
  runtime.__medqAgentWorkerStarted = true;

  const jobTimer = setInterval(() => {
    void processOneJob().catch((error) => log.warn?.('job loop error:', error));
  }, JOB_LOOP_MS);
  jobTimer.unref?.();

  const tickTimer = setInterval(() => {
    void schedulerTick().catch((error) => log.warn?.('scheduler tick error:', error));
  }, TICK_LOOP_MS);
  tickTimer.unref?.();

  log.info?.(`Agent worker started (${workerId()}) — job loop ${JOB_LOOP_MS}ms, scheduler tick ${TICK_LOOP_MS}ms`);
}

// ── Job execution ─────────────────────────────────────────────────────────

class CancelledError extends Error {}

async function processOneJob(): Promise<void> {
  const job = await leaseJob(workerId());
  if (!job) return;

  const payload = JSON.parse(job.payloadJson) as {
    message?: string;
    history?: Array<{ role: string; content: string }>;
    context?: string;
    modelString?: string;
    threadId?: string;
    weakTopics?: boolean;
  };
  const userId = job.userId;

  try {
    // task.run: scheduled autonomous execution. The prompt gets the
    // learner's weak-topic context injected when it references weak areas
    // ("generate 20 MCQs on my weak topics") so the run is personalized.
    const rawMessage = payload.message ?? '';
    let context = payload.context ?? '';
    if (job.kind === 'task.run') {
      const wantsWeak = /weak|struggl|worst|improve|focus on/i.test(rawMessage);
      const weakBlock = wantsWeak || payload.weakTopics ? formatWeakTopics(await getWeakTopics(userId)) : '';
      context = [context, weakBlock].filter(Boolean).join('\n\n');
    }
    const message = job.kind === 'task.run'
      ? `You are running a scheduled task for a MedQ learner. Complete it autonomously and produce a concise final result. The learner will read your result as a notification — do not ask them questions.\n\nTask: ${rawMessage}`
      : rawMessage;

    await appendJobEvent(job.id, { type: 'progress', ts: Date.now(), text: 'Agent is working…' });

    // Abort registry (deep-agent cancel parity): the cancel route can stop
    // this run mid-stream; the durable cancelRequested flag covers the gaps.
    const abortController = registerJobAbort(job.id);

    let progressStep = 0;
    let finalText = '';

    try {
      for await (const data of streamMedQDeepAgent(message, context, {
        modelString: payload.modelString,
        userId,
        threadId: payload.threadId,
        runKind: 'job',
        // Autonomous execution: no human is watching a scheduled/background
        // job, so HITL approval cards can never be answered — every gated
        // tool would wait the full 5-minute timeout, auto-reject, and fail
        // the job (observed: a scheduled question-generation task looping
        // through 11 failed runs on exactly this, and its threadless
        // approval publishes leaking as phantom cards into live chats).
        // The job's SCHEDULING was approved at creation time; executing it
        // needs no second confirmation.
        hitl: 'off',
        history: (payload.history ?? []).map((h) => ({ role: h.role === 'assistant' ? 'assistant' : 'user', content: h.content })),
        signal: abortController.signal,
      })) {
        switch (data.type) {
          case 'plan':
            if (Array.isArray(data.todos) && data.todos.length > 0) {
              await appendJobEvent(job.id, {
                type: 'progress',
                ts: Date.now(),
                text: `Planned ${data.todos.length} step${data.todos.length === 1 ? '' : 's'}…`,
              });
            }
            break;
          case 'tool_start':
            progressStep += 1;
            await appendJobEvent(job.id, { type: 'progress', ts: Date.now(), text: `Running ${data.tool}…` });
            await updateProgress(job.id, Math.min(90, 10 + progressStep * 15));
            break;
          case 'subagent':
            await appendJobEvent(job.id, {
              type: 'progress',
              ts: Date.now(),
              text: data.event === 'started' ? `Delegating to ${data.name}…` : `${data.name} finished.`,
            });
            break;
          case 'done':
            finalText = data.text || finalText;
            break;
          case 'error':
            if (abortController.signal.aborted || /cancel/i.test(data.error)) {
              throw new CancelledError(data.error);
            }
            throw new Error(data.error);
        }
      }
    } finally {
      unregisterJobAbort(job.id);
    }

    if (!finalText) {
      finalText = 'The agent completed without a final answer.';
    }
    await appendJobEvent(job.id, { type: 'text', ts: Date.now(), text: finalText });

    // In-app notification delivery (channel adapters are not ported; the
    // Notification model + existing notifications API is the MedQ-native way
    // the learner discovers completed background work).
    try {
      // Validate the userId still exists before creating a Notification row —
      // a user deletion (or a guest user whose session expired) leaves the
      // AgentJob orphaned, and the Notification.userId foreign key would
      // reject the insert with "Foreign key constraint violated on the
      // constraint: Notification_userId_fkey". The agent's actual work has
      // already completed by this point; we just skip the notification
      // delivery for orphaned jobs rather than failing the whole run.
      const userExists = await db.user.findUnique({ where: { id: userId }, select: { id: true } });
      if (!userExists) {
        log.warn?.(`Skipping notification for orphaned job ${job.id}: userId ${userId} not found in User table`);
      } else {
        const task = job.scheduledTaskId
          ? await db.agentScheduledTask.findUnique({ where: { id: job.scheduledTaskId } })
          : null;
        await db.notification.create({
          data: {
            userId,
            type: 'system',
            title: task ? `Scheduled task "${task.name}" completed` : 'Agent task completed',
            message: finalText.slice(0, 500),
            referenceId: job.id,
          },
        }).then((created) => {
          // System push to the user's subscribed devices (best-effort —
          // sendPushForNotification swallows its own errors, and job
          // completion must never block on a slow push service).
          void sendPushForNotification(created.id);
        });
      }
    } catch (error) {
      log.warn?.('notification create failed:', error);
    }

    await appendJobEvent(job.id, { type: 'done', ts: Date.now() });
    await completeJob(job.id);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    if (error instanceof CancelledError || (await abortWasRequested(job.id))) {
      await appendJobEvent(job.id, { type: 'notice', ts: Date.now(), text: 'Job cancelled.' });
      await cancelJob(job.id);
      log.info?.(`Job ${job.id} cancelled by request`);
      return;
    }
    await appendJobEvent(job.id, { type: 'error', ts: Date.now(), text: message });
    await failJob(job.id, message);
    log.warn?.(`Job ${job.id} failed (attempt ${job.attempts}):`, message);

    // Notify on the FINAL failure only (retries are silent — a rate-limited
    // gateway can 429 transiently; hammering the user with retry noise would
    // be worse than the retry itself). leaseJob increments `attempts` at
    // lease time, so the row we hold already counts THIS attempt — same
    // exhausted predicate as failJob. Silent-failure lesson from the chat
    // rate-limit incident: background work must surface its outcome.
    const exhausted = job.attempts >= job.maxAttempts;
    if (exhausted) {
      try {
        // Same orphaned-user guard as the success path — skip the
        // failure notification when the user has been deleted, instead of
        // logging a noisy FK violation every time the job retries.
        const userExists = await db.user.findUnique({ where: { id: userId }, select: { id: true } });
        if (!userExists) {
          log.warn?.(`Skipping failure notification for orphaned job ${job.id}: userId ${userId} not found`);
        } else {
          const task = job.scheduledTaskId
            ? await db.agentScheduledTask.findUnique({ where: { id: job.scheduledTaskId } })
            : null;
          await db.notification.create({
            data: {
              userId,
              type: 'system',
              title: task ? `Scheduled task "${task.name}" failed` : 'Agent task failed',
              message: `After ${job.maxAttempts} attempts the run could not complete: ${message.slice(0, 300)}`,
              referenceId: job.id,
            },
          }).then((created) => {
            // Same best-effort push as the completion path.
            void sendPushForNotification(created.id);
          });
        }
      } catch (notifyError) {
        log.warn?.('failure notification create failed:', notifyError);
      }
    }
  }
}

/** Best-effort cancellation check: the durable flag set by the cancel route. */
async function abortWasRequested(jobId: string): Promise<boolean> {
  try {
    const row = await db.agentJob.findUnique({ where: { id: jobId }, select: { cancelRequested: true } });
    return !!row?.cancelRequested;
  } catch {
    return false;
  }
}

// ── Scheduler tick ────────────────────────────────────────────────────────

async function schedulerTick(): Promise<void> {
  const due = await db.agentScheduledTask.findMany({
    where: { status: 'active', nextRunAt: { lte: new Date() } },
    take: 10,
  });
  for (const task of due) {
    try {
      await enqueue({
        userId: task.userId,
        kind: 'task.run',
        payload: { message: task.prompt, threadId: task.threadId ?? undefined },
        scheduledTaskId: task.id,
      });
      const next = task.cron ? advanceCron(task.cron, task.nextRunAt ?? new Date(), task.timezone) : null;
      await db.agentScheduledTask.update({
        where: { id: task.id },
        data: {
          lastRunAt: new Date(),
          nextRunAt: next,
          // one-shots (no cron) complete after firing
          status: task.cron ? 'active' : 'completed',
        },
      });
      await audit({ userId: task.userId, action: 'schedule.control', target: task.name, detail: { fired: true, nextRunAt: next } });
      log.info?.(`Scheduled task "${task.name}" fired (next: ${next?.toISOString() ?? 'done'})`);
    } catch (error) {
      log.warn?.(`Scheduler failed for task ${task.id}:`, error);
      await db.agentScheduledTask.update({
        where: { id: task.id },
        data: { status: 'failed' },
      }).catch(() => undefined);
    }
  }
}
