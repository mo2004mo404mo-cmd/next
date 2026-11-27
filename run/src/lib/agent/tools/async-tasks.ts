/**
 * Background task tools — the docs' AsyncSubAgent capability, MedQ-native.
 *
 * The deepagents JS package ships async subagents as remote Agent-Protocol
 * servers (LangGraph SDK). MedQ already owns a superior substrate for
 * background agent work: the durable AgentJob queue (lease semantics,
 * retries, cancellation, detached execution, completion notifications). These
 * five tools provide the package's start/check/update/cancel/list semantics,
 * but dispatch to the local queue, so background specialists work with MedQ
 * auth, telemetry and notifications instead of a remote protocol server.
 *
 * NAMING NOTE: the package reserves the exact names start_async_task etc. in
 * BUILTIN_TOOL_NAMES (a ConfigurationError fires on collision even when the
 * async-subagent middleware is not used), so the MedQ-native family is named
 * start/check/update/cancel/list_background_task.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '@/lib/db';
import { enqueue, listJobs, requestCancel, getJobWithEvents } from '../queue/service';
import { ensureWorkerStarted } from '../queue/worker';
import type { MedQToolContext } from '../types';

function jobStatusToTaskStatus(status: string): 'pending' | 'running' | 'success' | 'error' | 'cancelled' {
  switch (status) {
    case 'pending': return 'pending';
    case 'leased': return 'running';
    case 'processing': return 'running';
    case 'done': return 'success';
    case 'failed': return 'error';
    case 'cancelled': return 'cancelled';
    default: return 'pending';
  }
}

export function createAsyncTaskTools(ctx: MedQToolContext): DynamicStructuredTool[] {
  const userId = ctx.userId;

  const startAsyncTask = new DynamicStructuredTool({
    name: 'start_background_task',
    description:
      'Launch a background agent task that runs detached from this conversation (the learner can close the tab). ' +
      'Use for long-running work worth parallelizing: deep research sweeps, large question-generation batches, multi-document analysis. ' +
      'Returns a taskId immediately — poll it with check_background_task, list all with list_background_tasks. The learner gets a notification with the result when it finishes.',
    schema: z.object({
      description: z.string().min(8).max(4000).describe('The complete, self-contained task prompt for the background agent (it will NOT see this conversation)'),
      agentName: z.string().max(60).optional().describe('Optional short label for the kind of specialist, e.g. "researcher"'),
    }),
    func: async ({ description, agentName }) => {
      try {
        ensureWorkerStarted();
        const job = await enqueue({
          userId,
          kind: 'agent.run',
          payload: {
            message: `You are a background task${agentName ? ` (${agentName})` : ''} for a MedQ learner. Complete it autonomously and produce a concise, self-contained final result (the learner reads it as a notification — do not ask questions).\n\nTask: ${description}`,
            threadId: ctx.threadId ?? undefined,
          },
        });
        return JSON.stringify({
          taskId: job.id,
          status: 'pending',
          note: 'Task queued. Poll with check_background_task (taskId above).',
        });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const checkAsyncTask = new DynamicStructuredTool({
    name: 'check_background_task',
    description:
      'Check the live status of a background task started with start_background_task. Returns status (pending/running/success/error/cancelled), progress and the latest result text when finished.',
    schema: z.object({
      taskId: z.string().min(6).max(64).describe('The taskId returned by start_background_task'),
    }),
    func: async ({ taskId }) => {
      try {
        const job = await getJobWithEvents(taskId, userId);
        if (!job) return JSON.stringify({ error: 'Task not found (wrong id or not yours).' });
        const lastText = [...job.events].reverse().find((e) => e.type === 'text');
        return JSON.stringify({
          taskId,
          status: jobStatusToTaskStatus(job.status),
          progress: job.progress ?? 0,
          attempts: job.attempts,
          lastActivity: lastText ? String(lastText.text ?? '').slice(0, 2000) : null,
          createdAt: job.createdAt,
          finalText: job.finalText ? job.finalText.slice(0, 2000) : null,
        });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const updateAsyncTask = new DynamicStructuredTool({
    name: 'update_background_task',
    description:
      'Send a follow-up message to a background task. If the task has not started yet, the message is appended to its prompt; if it is already running or finished, a NEW background run is launched on the same conversation thread and its taskId is returned.',
    schema: z.object({
      taskId: z.string().min(6).max(64).describe('The taskId to update'),
      message: z.string().min(1).max(4000).describe('The follow-up instruction or extra context for the task'),
    }),
    func: async ({ taskId, message }) => {
      try {
        const raw = await db.agentJob.findFirst({ where: { id: taskId, userId } });
        if (!raw) return JSON.stringify({ error: 'Task not found (wrong id or not yours).' });
        const payload = JSON.parse(raw.payloadJson) as { message?: string; threadId?: string };
        if (raw.status === 'pending') {
          // Not leased yet — safely extend the queued prompt.
          const merged = `${payload.message ?? ''}\n\n[Follow-up]: ${message}`;
          await db.agentJob.update({
            where: { id: taskId },
            data: { payloadJson: JSON.stringify({ ...payload, message: merged }) },
          });
          return JSON.stringify({ taskId, updated: true, mode: 'queued-prompt-extended' });
        }
        // Running / done — launch a follow-up run on the same thread.
        const next = await enqueue({
          userId,
          kind: 'agent.run',
          payload: {
            message: `Continuation of a background task. Earlier task id: ${taskId}.\n\nFollow-up instruction: ${message}`,
            ...(payload.threadId ? { threadId: payload.threadId } : {}),
          },
        });
        return JSON.stringify({ taskId: next.id, updated: true, mode: 'new-run', previousTaskId: taskId, previousStatus: jobStatusToTaskStatus(raw.status) });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const cancelAsyncTask = new DynamicStructuredTool({
    name: 'cancel_background_task',
    description: 'Cancel a background task by id. Pending tasks are removed; running tasks stop at their next checkpoint.',
    schema: z.object({
      taskId: z.string().min(6).max(64).describe('The taskId to cancel'),
    }),
    func: async ({ taskId }) => {
      try {
        const job = await getJobWithEvents(taskId, userId);
        if (!job) return JSON.stringify({ error: 'Task not found (wrong id or not yours).' });
        await requestCancel(taskId, userId);
        return JSON.stringify({ taskId, cancelled: true });
      } catch (error) {
        return JSON.stringify({ error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const listAsyncTasks = new DynamicStructuredTool({
    name: 'list_background_tasks',
    description:
      'List the learner\'s background agent tasks (from start_background_task), newest first, with live statuses. Optional statusFilter: pending | running | success | error | cancelled.',
    schema: z.object({
      statusFilter: z.string().optional().nullable().describe('Optional status filter'),
    }),
    func: async ({ statusFilter }) => {
      try {
        const jobs = await listJobs(userId, 30);
        const wanted = statusFilter ? jobStatusToTaskStatus(statusFilter) : null;
        const rows = jobs
          .map((job) => ({
            taskId: job.id,
            status: jobStatusToTaskStatus(job.status),
            progress: job.progress ?? 0,
            createdAt: job.createdAt.getTime(),
            finishedAt: job.finishedAt ? job.finishedAt.getTime() : null,
          }))
          .filter((row) => !wanted || row.status === wanted);
        return JSON.stringify({ tasks: rows, count: rows.length });
      } catch (error) {
        return JSON.stringify({ tasks: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [startAsyncTask, checkAsyncTask, updateAsyncTask, cancelAsyncTask, listAsyncTasks];
}

export const ASYNC_TASK_TOOL_NAMES = [
  'start_background_task',
  'check_background_task',
  'update_background_task',
  'cancel_background_task',
  'list_background_tasks',
] as const;
