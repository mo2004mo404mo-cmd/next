/**
 * ui_action — the agent's APP CONTROL tool.
 *
 * Lets the chat agent actually OPERATE the learner's MedQ UI: open tabs,
 * switch modules, open dialogs, fill form fields, click buttons, highlight
 * elements, trigger downloads — instead of only telling the learner what to
 * click. Mirrors the ask_user pattern:
 *
 *   1. the model calls ui_action with { actions: [...] } (each entry is one
 *      UIAction payload understood by the client's UIActionEngine);
 *   2. the tool validates the action types, publishes the payload on an
 *      in-process bus and returns immediately — it does NOT block;
 *   3. streamMedQDeepAgent subscribes to the bus and forwards the payload
 *      to the SSE client as the existing `actions` event;
 *   4. the chat panel executes each action LIVE on arrival (and deduplicates
 *      the turn-end replay) through useUIActionEngine, then shows receipts
 *      ("Opened Question Bank") under the assistant message.
 *
 * Fire-and-forget by design: execution feedback reaches the learner as
 * on-screen receipts, and the model summarizes what it did in its reply —
 * the same honesty contract as the rest of the agent.
 */
import { DynamicStructuredTool } from '@langchain/core/tools';
import { z } from 'zod';
import type { MedQToolContext } from '../types';

/** Action types the client UIActionEngine actually implements. Anything
 * outside this list is rejected server-side so the model cannot fire
 * dead payloads. */
export const UI_ACTION_TYPES = new Set([
  // Navigation
  'navigate', 'go_back', 'navigate_module',
  // UI control
  'open_dialog', 'close_dialog', 'switch_tab', 'toggle_panel', 'toggle_section',
  'set_focus', 'scroll_to', 'select_element',
  // Forms
  'autofill_form', 'validate_form', 'submit_form', 'clear_form', 'explain_field', 'suggest_field',
  // CRUD
  'create_record', 'edit_record', 'view_record', 'delete_record',
  'archive_record', 'duplicate_record', 'restore_record',
  // Visual guidance
  'highlight_element', 'clear_highlight', 'show_tooltip', 'start_tour', 'next_tour_step',
  'end_tour', 'explain_context',
  // Interaction
  'click_button', 'trigger_action', 'dispatch_event',
  // Legacy bridges
  'navigate_to_tab', 'search_content', 'generate_questions', 'start_quiz', 'look_up_drug',
  'create_flashcard', 'set_study_timer', 'bookmark_content', 'explain_concept',
  'get_study_plan', 'review_weak_areas', 'answer_medical_question',
  // v4/v5
  'analyze_file', 'organize_file', 'download', 'open_url',
]);

/** Payload enriched with the caller's scope so the runtime can route the
 * SSE event to the right stream (thread match, like approvals). */
export interface UiActionBusPayload {
  userId: string;
  threadId?: string;
  actions: Array<Record<string, unknown>>;
}

const globalForUiActions = globalThis as typeof globalThis & {
  __medqUiActionListeners?: Set<(payload: UiActionBusPayload) => void>;
};

const listeners: Set<(payload: UiActionBusPayload) => void> =
  globalForUiActions.__medqUiActionListeners ?? new Set();
globalForUiActions.__medqUiActionListeners = listeners;

/** Subscribe to new ui_action dispatches (the runtime forwards them to SSE). */
export function subscribeUiActions(
  listener: (payload: UiActionBusPayload) => void,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const uiActionSchema = z.object({
  actions: z
    .array(z.record(z.unknown()))
    .min(1)
    .max(6)
    .describe('1-6 UI actions to execute on the learner\'s screen, each an object with a `type` field plus its parameters.'),
});

export function createUiActionTool(ctx: MedQToolContext): DynamicStructuredTool {
  return new DynamicStructuredTool({
    name: 'ui_action',
    description:
      'Operate the MedQ app UI for the learner — open tabs/pages, switch modules, open dialogs and panels, fill form fields, click buttons, highlight or scroll to elements, trigger downloads. Use it whenever the learner asks you to SHOW/OPEN/GO TO something ("open the question bank", "show my flashcards", "take me to the exam simulator") or when doing so obviously helps (you saved questions → open the bank filtered to them). ' +
      'Each action: {"type":"navigate","target":"bank"} — navigation targets are MedQ tab keys like home/bank/generate/flashcards/exams/messages/insights. Other examples: {"type":"switch_tab","tabId":"create"}, {"type":"autofill_form","formId":"...","values":{...}}, {"type":"click_button","selector":"..."}, {"type":"highlight_element","selector":"...","message":"this is the import button"}. ' +
      'Prefer ONE navigate action over many small steps. Do not use it to read data (you have tools for that) — this only drives the screen.',
    schema: uiActionSchema,
    func: async (args) => {
      const valid: Array<Record<string, unknown>> = [];
      const rejected: string[] = [];
      for (const raw of args.actions) {
        const type = typeof raw.type === 'string' ? raw.type : '';
        if (!type || !UI_ACTION_TYPES.has(type)) {
          rejected.push(type || '(missing type)');
          continue;
        }
        // Normalize common near-misses so small model slips still land:
        // switch_tab/tabId is valid client-side; navigate uses target.
        valid.push(raw);
      }
      if (valid.length === 0) {
        return JSON.stringify({
          dispatched: false,
          error: `No valid actions. Allowed types include: ${[...UI_ACTION_TYPES].slice(0, 12).join(', ')}… Rejected: ${rejected.join(', ')}.`,
        });
      }
      const payload: UiActionBusPayload = {
        userId: ctx.userId,
        ...(ctx.threadId ? { threadId: ctx.threadId } : {}),
        actions: valid,
      };
      for (const listener of listeners) {
        try {
          listener(payload);
        } catch {
          // one broken subscriber must not break the tool
        }
      }
      return JSON.stringify({
        dispatched: true,
        count: valid.length,
        types: valid.map((a) => a.type),
        ...(rejected.length ? { rejected } : {}),
        guidance:
          'The action(s) were dispatched to the learner\'s screen and will execute live. ' +
          'In your final reply, say in one short sentence what you did (e.g. "Opened the Question Bank for you") — do not claim anything beyond the dispatched actions.',
      });
    },
  });
}
