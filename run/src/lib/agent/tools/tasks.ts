import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import { db } from '../../db';
import type { MedQToolContext } from '../types';

/**
 * Agent task tools — ported from hermes (task_create / task_update /
 * task_list over the AgentTask model). Gives the agent a persistent,
 * user-visible todo list that survives the conversation: study milestones,
 * revision checklists, multi-step deliverables the learner can track in the
 * Tasks tab.
 */
export function createTaskTools(ctx: MedQToolContext) {
  const taskCreate = new DynamicStructuredTool({
    name: 'task_create',
    description:
      'Create a trackable task on the learner\'s task list. Use for multi-step work (e.g. a 5-day revision plan) so progress is visible in the Tasks tab; update statuses as you complete steps.',
    schema: z.object({
      title: z.string().min(3).max(200).describe('Short task title, e.g. "Day 1: Cardiac physiology review"'),
      detail: z.string().max(2000).optional().describe('Optional longer description of what this task involves'),
      priority: z.enum(['low', 'medium', 'high']).optional().describe('Default medium'),
      dueAt: z.string().optional().describe('Optional ISO 8601 deadline'),
    }),
    func: async ({ title, detail, priority, dueAt }) => {
      try {
        const due = dueAt ? new Date(dueAt) : null;
        if (due && Number.isNaN(due.getTime())) {
          return JSON.stringify({ created: false, error: 'Invalid dueAt datetime (expected ISO 8601).' });
        }
        const task = await db.agentTask.create({
          data: {
            userId: ctx.userId,
            title,
            detail: detail ?? null,
            priority: priority ?? 'medium',
            dueAt: due,
            source: 'agent',
          },
        });
        return JSON.stringify({ created: true, taskId: task.id, title: task.title, status: task.status });
      } catch (error) {
        return JSON.stringify({ created: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const taskUpdate = new DynamicStructuredTool({
    name: 'task_update',
    description:
      'Update the status or priority of an existing task on the learner\'s list. Mark tasks in_progress when you start them and done when finished (ids come from task_create / task_list).',
    schema: z.object({
      taskId: z.string().min(1).describe('The task id to update'),
      // Tolerant enum: models see TWO status vocabularies (write_todos uses
      // pending/in_progress/completed; this list uses .../done) and reliably
      // cross-contaminate them. Accept the common aliases; normalize below.
      status: z
        .enum(['pending', 'in_progress', 'done', 'blocked', 'completed', 'finished', 'in-progress', 'todo'])
        .optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
    }),
    func: async ({ taskId, status, priority }) => {
      try {
        // Alias normalization → the DB enum.
        const normalized =
          status === 'completed' || status === 'finished' || status === 'todo'
            ? ('done' as const)
            : status === 'in-progress'
              ? ('in_progress' as const)
              : status;
        const task = await db.agentTask.updateMany({
          where: { id: taskId, userId: ctx.userId },
          data: {
            ...(normalized ? { status: normalized } : {}),
            ...(priority ? { priority } : {}),
          },
        });
        return JSON.stringify({ updated: task.count > 0, taskId });
      } catch (error) {
        return JSON.stringify({ updated: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const taskList = new DynamicStructuredTool({
    name: 'task_list',
    description: "List the learner's open tasks (pending, in progress, blocked) with priorities and due dates. Check this before planning study work to build on existing tasks.",
    schema: z.object({}),
    func: async () => {
      try {
        const tasks = await db.agentTask.findMany({
          where: { userId: ctx.userId, status: { in: ['pending', 'in_progress', 'blocked'] } },
          orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
          take: 30,
        });
        return JSON.stringify({
          tasks: tasks.map((task) => ({
            id: task.id,
            title: task.title,
            detail: task.detail,
            status: task.status,
            priority: task.priority,
            dueAt: task.dueAt?.toISOString() ?? null,
          })),
          count: tasks.length,
        });
      } catch (error) {
        return JSON.stringify({ tasks: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [taskCreate, taskUpdate, taskList];
}
