import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';
import { saveMemory, searchMemories, forgetMemory, updateMemory, listMemories } from '../memory/service';

/**
 * Memory tools — the agent's hands for long-term personalization.
 *
 * Five tools (hermes 5-op parity: save/search/update/forget/list):
 *   save_memory    — persist durable learner facts (upsert by key)
 *   search_memory  — recall what is known about this learner
 *   update_memory  — edit a stored memory's content/importance by id
 *   forget_memory  — remove stale/incorrect facts by id
 *   list_memory    — browse recent memories (planning / consolidation)
 *
 * All tools are tenant-scoped through the MedQToolContext captured at
 * agent-build time — the model never sees or controls the user id.
 */
export function createMemoryTools(ctx: MedQToolContext) {
  const saveMemoryTool = new DynamicStructuredTool({
    name: 'save_memory',
    description:
      'Save a durable fact about this learner to long-term memory. Use for stable, useful information: year of study, specialty goals, weak topics, preferred explanation style, exam dates. NOT for transient chat details. Providing a key updates the existing memory with that key.',
    schema: z.object({
      scope: z.enum(['profile', 'study', 'fact', 'conversation', 'semantic']).describe('profile = who they are, study = how/what they study, fact = learned knowledge, conversation = working notes for the current thread, semantic = auto-extracted interaction facts'),
      content: z.string().min(3).max(400).describe('The fact, written in third person, e.g. "Struggles with renal physiology; asks for analogies"'),
      key: z.string().max(120).optional().describe('Short stable key for upsert, e.g. "weak-topic-renal"'),
      importance: z.number().min(0).max(1).optional().describe('0-1, default 0.5; use 0.8+ for core facts'),
    }),
    func: async (input) => {
      try {
        const entry = await saveMemory({ userId: ctx.userId, ...input });
        return JSON.stringify({ saved: true, id: entry.id, scope: entry.scope, key: entry.key });
      } catch (error) {
        return JSON.stringify({ saved: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const searchMemoryTool = new DynamicStructuredTool({
    name: 'search_memory',
    description:
      'Search long-term memory for what is known about this learner (preferences, weak topics, past interactions). Use before personalizing an answer or study plan.',
    schema: z.object({
      query: z.string().min(2).describe('What to recall, e.g. "cardiology weak areas"'),
      limit: z.number().int().min(1).max(10).optional().describe('Max results, default 6'),
    }),
    func: async ({ query, limit }) => {
      try {
        const results = await searchMemories(ctx.userId, query, limit ?? 6);
        if (results.length === 0) return JSON.stringify({ memories: [], note: 'No stored memories match yet.' });
        return JSON.stringify({
          memories: results.map((entry) => ({
            scope: entry.scope,
            key: entry.key,
            content: entry.content,
            relevance: Math.round(Math.min(entry.score / 3, 1) * 100) / 100,
          })),
        });
      } catch (error) {
        return JSON.stringify({ memories: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const updateMemoryTool = new DynamicStructuredTool({
    name: 'update_memory',
    description:
      'Edit a stored memory by id — refine wording or importance (ids come from search_memory or list_memory). Prefer save_memory with the same key for simple upserts.',
    schema: z.object({
      memoryId: z.string().min(1).describe('The memory id to update'),
      content: z.string().min(3).max(400).optional().describe('New content (omit to keep)'),
      importance: z.number().min(0).max(1).optional().describe('New importance (omit to keep)'),
    }),
    func: async ({ memoryId, content, importance }) => {
      try {
        const entry = await updateMemory(ctx.userId, memoryId, { content, importance });
        if (!entry) return JSON.stringify({ updated: false, error: 'Memory not found' });
        return JSON.stringify({ updated: true, id: entry.id, scope: entry.scope, key: entry.key });
      } catch (error) {
        return JSON.stringify({ updated: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const listMemoryTool = new DynamicStructuredTool({
    name: 'list_memory',
    description:
      'List the learner\'s most recent memories (all scopes, newest first). Use to review what is already stored before saving duplicates or when search terms are uncertain.',
    schema: z.object({
      limit: z.number().int().min(1).max(50).optional().describe('Max results, default 20'),
    }),
    func: async ({ limit }) => {
      try {
        const entries = await listMemories(ctx.userId, Math.min(limit ?? 20, 50));
        return JSON.stringify({
          memories: entries.map((e) => ({ id: e.id, scope: e.scope, key: e.key, content: e.content, importance: e.importance })),
        });
      } catch (error) {
        return JSON.stringify({ memories: [], error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  const forgetMemoryTool = new DynamicStructuredTool({
    name: 'forget_memory',
    description:
      'Delete an outdated or incorrect memory by its id (ids are returned by search_memory). Use when the learner corrects a stored fact, then save the corrected version with save_memory.',
    schema: z.object({
      memoryId: z.string().min(1).describe('The memory id to delete'),
    }),
    func: async ({ memoryId }) => {
      try {
        const removed = await forgetMemory(ctx.userId, memoryId);
        return JSON.stringify({ removed });
      } catch (error) {
        return JSON.stringify({ removed: false, error: error instanceof Error ? error.message : String(error) });
      }
    },
  });

  return [saveMemoryTool, searchMemoryTool, updateMemoryTool, forgetMemoryTool, listMemoryTool];
}
