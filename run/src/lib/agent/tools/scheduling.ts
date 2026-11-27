import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '../../db';
import type { MedQToolContext } from '../types';
import { cronExpressionSchema, computeNextRun, describeCron } from '../scheduler/cron';
import { ensureWorkerStarted } from '../queue/worker';
import { audit } from '../audit';

/**
 * schedule_task — natural-language scheduling tool, ported from hermes
 * (`schedule_task`, capability schedule.create). Lets the agent create
 * recurring (5-field cron + IANA timezone) or one-shot scheduled agent runs
 * on the user's behalf: "every Monday 9am, quiz me on this week's pharmacology".
 *
 * The worker's scheduler tick fires due tasks and enqueues task.run jobs; each
 * completed run delivers an in-app notification with the agent's result.
 */
export function createScheduleTaskTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'schedule_task',
    description:
      'Schedule a recurring or one-shot automated agent task for the learner. Use for spaced repetition prompts, weekly review sessions, exam countdown reminders, or scheduled question generation (e.g. "every Sunday at 9pm, generate 20 MCQs on my weak topics"). The prompt may reference "my weak topics" — the runner injects the learner\'s actual weakest topics from their quiz history at fire time. Requires either a cron expression with timezone, or a one-shot runAt ISO time.',
    schema: z.object({
      name: z.string().min(3).max(80).describe('Short task name, e.g. "Weekly pharm review"'),
      prompt: z.string().min(10).max(2000).describe('What the agent should do each run, e.g. "Generate 5 pharmacology MCQs on a random system and deliver as a mini quiz"'),
      cron: z.string().optional().describe('5-field cron expression for recurring tasks, e.g. "0 9 * * MON" = every Monday 09:00. Omit for one-shot.'),
      runAt: z.string().optional().describe('ISO 8601 datetime for a one-shot task, e.g. "2026-10-01T09:00:00Z". Omit when cron is given.'),
      timezone: z.string().optional().describe('IANA timezone for the cron schedule, e.g. "Africa/Cairo". Default UTC.'),
    }),
    func: async ({ name, prompt, cron, runAt, timezone }) => {
      try {
        if (!cron && !runAt) {
          return JSON.stringify({ scheduled: false, error: 'Provide either a cron expression or a runAt datetime.' });
        }
        if (cron && !cronExpressionSchema.safeParse(cron).success) {
          return JSON.stringify({ scheduled: false, error: 'Invalid cron expression (expected 5-field cron, e.g. "0 9 * * MON").' });
        }
        const tz = timezone || 'UTC';
        const runAtDate = runAt ? new Date(runAt) : null;
        if (runAtDate && Number.isNaN(runAtDate.getTime())) {
          return JSON.stringify({ scheduled: false, error: 'Invalid runAt datetime (expected ISO 8601).' });
        }
        const nextRunAt = computeNextRun(cron ?? null, runAtDate, tz);
        if (!nextRunAt) {
          return JSON.stringify({ scheduled: false, error: 'Could not compute the next run time.' });
        }
        const task = await db.agentScheduledTask.create({
          data: {
            userId: ctx.userId,
            name,
            prompt,
            cron: cron ?? null,
            runAt: runAtDate,
            timezone: tz,
            nextRunAt,
            status: 'active',
            ...(ctx.threadId ? { threadId: ctx.threadId } : {}),
          },
        });
        ensureWorkerStarted();
        await audit({ userId: ctx.userId, action: 'schedule.create', target: name, detail: { cron: cron ?? null, nextRunAt: nextRunAt.toISOString() } });
        return JSON.stringify({
          scheduled: true,
          taskId: task.id,
          name,
          recurrence: cron ? `${describeCron(cron, tz)} — cron "${cron}"` : `one-shot at ${runAtDate?.toISOString()}`,
          nextRunAt: nextRunAt.toISOString(),
          note: 'The job appears in the assistant panel\'s Scheduled section (clock icon) where the learner can pause, resume, run it now, or delete it. Each completed run also sends the learner a notification with the result.',
        });
      } catch (error) {
        return JSON.stringify({ scheduled: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}

/**
 * list_scheduled_tasks — lets the agent answer "what are my scheduled jobs?"
 * and confirm schedule details (next run, recurrence, status) without hitting
 * the REST API. Read-only, scoped to the current user.
 */
export function createListScheduledTasksTool(ctx: MedQToolContext) {
  return new DynamicStructuredTool({
    name: 'list_scheduled_tasks',
    description: "List the learner's scheduled agent jobs with their recurrence, status, and next run time. Use when they ask about their scheduled jobs, automations, or recurring generations.",
    schema: z.object({}),
    func: async () => {
      try {
        ensureWorkerStarted();
        const tasks = await db.agentScheduledTask.findMany({
          where: { userId: ctx.userId },
          orderBy: { createdAt: 'desc' },
          take: 20,
          select: {
            id: true, name: true, prompt: true, cron: true, runAt: true,
            timezone: true, status: true, lastRunAt: true, nextRunAt: true,
          },
        });
        if (tasks.length === 0) {
          return JSON.stringify({ tasks: [], note: 'No scheduled jobs yet. Offer to create one, e.g. a weekly weak-topic question generation.' });
        }
        return JSON.stringify({
          tasks: tasks.map((t) => ({
            id: t.id,
            name: t.name,
            prompt: t.prompt.slice(0, 160),
            recurrence: t.cron ? describeCron(t.cron, t.timezone) : `one-shot ${t.runAt?.toISOString() ?? ''}`,
            status: t.status,
            lastRunAt: t.lastRunAt?.toISOString() ?? null,
            nextRunAt: t.nextRunAt?.toISOString() ?? null,
          })),
          note: 'Jobs can be paused, resumed, run now, or deleted from the assistant panel\'s Scheduled section (clock icon).',
        });
      } catch (error) {
        return JSON.stringify({ tasks: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });
}
