/**
 * Per-job control for scheduled agent jobs — /api/agent/tasks/[id]
 *
 * PATCH   { action: 'pause' | 'resume' | 'run-now' }  — control a job
 * DELETE  — remove it permanently
 *
 * "run-now" enqueues a task.run job immediately (the scheduler tick keeps the
 * recurring nextRunAt untouched — this is an extra manual fire).
 */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { computeNextRun } from '@/lib/agent/scheduler/cron';
import { ensureWorkerStarted } from '@/lib/agent/queue/worker';
import { enqueue } from '@/lib/agent/queue/service';
import { audit } from '@/lib/agent/audit';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ id: string }> };

async function ownedTask(userId: string, id: string) {
  return db.agentScheduledTask.findFirst({ where: { id, userId } });
}

export const PATCH = withErrorHandler(async (req: NextRequest, ctx: Ctx) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  const task = await ownedTask(userId, id);
  if (!task) return NextResponse.json({ error: 'Scheduled job not found' }, { status: 404 });

  const body = await req.json().catch(() => ({})) as { action?: unknown };
  const action = typeof body.action === 'string' ? body.action : '';

  ensureWorkerStarted();

  if (action === 'pause') {
    const updated = await db.agentScheduledTask.update({ where: { id }, data: { status: 'paused' } });
    await audit({ userId, action: 'schedule.control', target: task.name, detail: { paused: true } });
    return NextResponse.json({ task: updated });
  }

  if (action === 'resume') {
    if (task.status !== 'paused') return NextResponse.json({ error: 'Job is not paused' }, { status: 400 });
    // Recompute nextRun from now so a long-paused job does not fire a burst
    // of missed runs; one-shots that already fired cannot be resumed.
    if (!task.cron && task.runAt && task.runAt.getTime() < Date.now()) {
      return NextResponse.json({ error: 'This one-shot job already ran — create a new one instead' }, { status: 400 });
    }
    const nextRunAt = task.cron
      ? computeNextRun(task.cron, null, task.timezone, new Date())
      : task.runAt;
    const updated = await db.agentScheduledTask.update({ where: { id }, data: { status: 'active', nextRunAt } });
    await audit({ userId, action: 'schedule.control', target: task.name, detail: { resumed: true, nextRunAt: nextRunAt?.toISOString() ?? null } });
    return NextResponse.json({ task: updated });
  }

  if (action === 'run-now') {
    const job = await enqueue({
      userId,
      kind: 'task.run',
      payload: { message: task.prompt, threadId: task.threadId ?? undefined },
      scheduledTaskId: task.id,
    });
    await db.agentScheduledTask.update({ where: { id }, data: { lastRunAt: new Date() } });
    await audit({ userId, action: 'schedule.control', target: task.name, detail: { manualRun: true, jobId: job.id } });
    return NextResponse.json({ queued: true, jobId: job.id, note: 'The agent is running this job now — you will get a notification with the result.' });
  }

  return NextResponse.json({ error: 'action must be "pause", "resume", or "run-now"' }, { status: 400 });
});

export const DELETE = withErrorHandler(async (_req: NextRequest, ctx: Ctx) => {
  const userId = await resolveUserId();
  const { id } = await ctx.params;
  const task = await ownedTask(userId, id);
  if (!task) return NextResponse.json({ error: 'Scheduled job not found' }, { status: 404 });
  await db.agentScheduledTask.delete({ where: { id } });
  await audit({ userId, action: 'schedule.control', target: task.name, detail: { deleted: true } });
  return NextResponse.json({ deleted: true });
});
