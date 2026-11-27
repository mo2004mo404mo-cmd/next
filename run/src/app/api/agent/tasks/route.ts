/**
 * Scheduled agent jobs API — the REST layer behind the assistant panel's
 * Scheduled section (clock icon) and the schedule_task chat tool.
 *
 * GET   /api/agent/tasks            — list the user's scheduled jobs
 * POST  /api/agent/tasks            — create one (cron + IANA tz, or one-shot)
 *
 * Per-job control (pause/resume/run-now/delete) lives at
 * /api/agent/tasks/[id].
 */
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveUserId, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { cronExpressionSchema, computeNextRun, describeCron } from '@/lib/agent/scheduler/cron';
import { ensureWorkerStarted } from '@/lib/agent/queue/worker';
import { audit } from '@/lib/agent/audit';

export const runtime = 'nodejs';

export const GET = withErrorHandler(async () => {
  const userId = await resolveUserId();
  ensureWorkerStarted();
  const tasks = await db.agentScheduledTask.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    select: {
      id: true, name: true, prompt: true, cron: true, runAt: true, timezone: true,
      status: true, lastRunAt: true, nextRunAt: true, createdAt: true,
    },
  });
  return NextResponse.json({
    tasks: tasks.map((t) => ({
      ...t,
      recurrence: t.cron ? describeCron(t.cron, t.timezone) : (t.runAt ? `one-shot ${t.runAt.toISOString()}` : ''),
    })),
  });
});

export const POST = withErrorHandler(async (req: NextRequest) => {
  const userId = await resolveUserId();
  const body = await req.json().catch(() => ({})) as {
    name?: unknown;
    prompt?: unknown;
    cron?: unknown;
    runAt?: unknown;
    timezone?: unknown;
  };

  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : '';
  const cron = typeof body.cron === 'string' && body.cron.trim() ? body.cron.trim() : null;
  const timezone = typeof body.timezone === 'string' && body.timezone.trim() ? body.timezone.trim() : 'UTC';
  const runAt = typeof body.runAt === 'string' ? new Date(body.runAt) : null;

  if (name.length < 3) return badRequest('name must be at least 3 characters');
  if (prompt.length < 10) return badRequest('prompt must be at least 10 characters');
  if (!cron && !runAt) return badRequest('Provide either a cron expression or a runAt datetime');
  if (cron && !cronExpressionSchema.safeParse(cron).success) {
    return badRequest('Invalid 5-field cron expression (e.g. "0 21 * * SUN")');
  }
  if (runAt && Number.isNaN(runAt.getTime())) return badRequest('Invalid runAt datetime (expected ISO 8601)');

  const nextRunAt = computeNextRun(cron, runAt, timezone);
  if (!nextRunAt) return badRequest('Could not compute the next run time for this schedule');

  const task = await db.agentScheduledTask.create({
    data: {
      userId,
      name: name.slice(0, 80),
      prompt: prompt.slice(0, 2000),
      cron,
      runAt,
      timezone,
      nextRunAt,
      status: 'active',
    },
  });
  ensureWorkerStarted();
  await audit({ userId, action: 'schedule.create', target: task.name, detail: { cron, nextRunAt: nextRunAt.toISOString(), via: 'api' } });

  return NextResponse.json({
    task: { ...task, recurrence: cron ? describeCron(cron, timezone) : `one-shot ${runAt?.toISOString() ?? ''}` },
  });
});
