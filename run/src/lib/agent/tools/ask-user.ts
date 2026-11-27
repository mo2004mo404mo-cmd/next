/**
 * ask_user — the agent's STRUCTURED clarification tool.
 *
 * "When the agent needs more information" the model used to ask in plain
 * prose, which forced the learner to type free-text answers. This tool
 * renders the question as an INTERACTIVE FORM (checkboxes, radio choices,
 * dropdowns, text fields) in the chat panel instead:
 *
 *   1. the model calls ask_user with { question, inputs[] } (zod-validated
 *      by the shared contract in ../clarification.ts);
 *   2. the tool publishes the payload on an in-process bus (mirroring the
 *      HITL approval bus) and returns immediately — it does NOT block;
 *   3. streamMedQDeepAgent subscribes to the bus and forwards the payload
 *      to the SSE client as a `clarification_required` event;
 *   4. the chat renders the form card; the learner submits (or skips);
 *   5. the answers are formatted by formatClarificationAnswers and sent as
 *      the NEXT USER MESSAGE — so history, the thread store, and every
 *      recovery path keep working unchanged.
 *
 * The tool result tells the model to END ITS TURN and wait; the answers
 * arrive as a fresh user message on the next run.
 */
import { randomUUID } from 'crypto';
import { DynamicStructuredTool } from '@langchain/core/tools';
import {
  askUserSchema,
  normalizeClarificationPayload,
  type ClarificationPayload,
} from '../clarification';
import type { MedQToolContext } from '../types';

/** Payload enriched with the caller's scope so the runtime can route the
 * SSE event to the right stream (userId/threadId match, like approvals). */
export interface ClarificationBusPayload extends ClarificationPayload {
  userId: string;
  threadId?: string;
}

const globalForClarifications = globalThis as typeof globalThis & {
  __medqClarificationListeners?: Set<(payload: ClarificationBusPayload) => void>;
};

const listeners: Set<(payload: ClarificationBusPayload) => void> =
  globalForClarifications.__medqClarificationListeners ?? new Set();
globalForClarifications.__medqClarificationListeners = listeners;

/** Subscribe to new clarification requests (the runtime forwards them to SSE). */
export function subscribeClarifications(
  listener: (payload: ClarificationBusPayload) => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function createAskUserTool(ctx: MedQToolContext): DynamicStructuredTool {
  return new DynamicStructuredTool({
    name: 'ask_user',
    description:
      'Ask the learner a question as an INTERACTIVE FORM (checkboxes, choice buttons, dropdowns, text fields). Use this INSTEAD OF asking any question in plain text — whenever you need scope, preferences, a choice between options, or missing parameters before proceeding. ' +
      'List the concrete choices as multiselect/radio options with value/label pairs; use text fields only for genuinely free-form input. ' +
      'After calling it, END YOUR TURN — the learner answers through the form and their answers arrive as the next message. ' +
      'If the request is already clear, do not call this. Never call it twice in one turn.',
    schema: askUserSchema,
    func: async (args) => {
      const payload = normalizeClarificationPayload({
        ...args,
        clarificationId: `clar-${randomUUID().slice(0, 18)}`,
      });
      if (!payload) {
        return JSON.stringify({
          displayed: false,
          error: 'Invalid clarification form (no usable inputs) — ask the question in plain text instead.',
        });
      }
      const bus: ClarificationBusPayload = {
        ...payload,
        userId: ctx.userId,
        ...(ctx.threadId ? { threadId: ctx.threadId } : {}),
      };
      for (const listener of listeners) {
        try {
          listener(bus);
        } catch {
          // one broken subscriber must not break the tool
        }
      }
      return JSON.stringify({
        displayed: true,
        question: payload.question,
        fields: payload.inputs.length,
        guidance:
          'The interactive question form is now shown to the learner. ' +
          'END YOUR TURN NOW with no further tool calls — do not answer for them, do not re-ask in text. ' +
          'Their answers will arrive as the next user message; continue from those.',
      });
    },
  });
}
