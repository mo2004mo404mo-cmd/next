/**
 * Structured clarification — the shared contract behind the agent's
 * `ask_user` tool.
 *
 * When the agent needs more information from the learner before it can do
 * the job well (scope, preferences, choices between options, missing
 * parameters), it calls `ask_user` with a question plus STRUCTURED inputs
 * (checkboxes, radio choices, dropdowns, text fields). The runtime forwards
 * the payload to the SSE client as a `clarification_required` event, the
 * chat renders an interactive form card, and the learner's answers come
 * back as the NEXT USER MESSAGE (formatted by formatClarificationAnswers)
 * — so the conversation history, thread store, and every recovery path
 * keep working unchanged.
 *
 * This module is deliberately dependency-light (zod only, no langchain/db)
 * because BOTH sides import it:
 *   - server: the tool schema + bus payload type (tools/ask-user.ts)
 *   - client: defensive parsing of SSE payloads and persisted tool args,
 *     plus answer formatting for the submit path (useAgentV2Stream /
 *     MedQAgentV3 / MedQAgentTimeline).
 */

/** Input widget kinds the chat form card can render. */
export type ClarificationInputType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'radio'
  | 'checkbox'
  | 'number'
  | 'date';

/** One selectable choice for select/multiselect/radio inputs. */
export interface ClarificationInputOption {
  value: string;
  label: string;
}

/** One field of the clarification form. */
export interface ClarificationInput {
  id: string;
  type: ClarificationInputType;
  label: string;
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  defaultValue?: string;
  /** Only meaningful for select/multiselect/radio. */
  options?: ClarificationInputOption[];
}

/** Wire payload (SSE `clarification_required` event + persisted tool args). */
export interface ClarificationPayload {
  clarificationId: string;
  title?: string;
  question: string;
  inputs: ClarificationInput[];
  /** Whether the learner may skip answering (default true). */
  allowSkip?: boolean;
}

/** Learner answers keyed by input id. Checkbox is 'yes'/'no'; multiselect
 * values are joined with a separator inside a single string. */
export type ClarificationAnswers = Record<string, string>;

import { z } from 'zod';

/** The zod schema the `ask_user` tool validates its arguments against. */
export const askUserSchema = z.object({
  title: z.string().max(120).optional().describe(
    'Short card title, e.g. "Quick questions before I build your quiz". Omit for a default.',
  ),
  question: z.string().min(3).max(1000).describe(
    'The question you need answered, in plain learner-facing language. One focused question per call.',
  ),
  inputs: z
    .array(
      z.object({
        id: z.string().regex(/^[A-Za-z0-9_-]{1,40}$/).describe(
          'Stable field id, e.g. "topics" or "question_count"',
        ),
        type: z.enum(['text', 'textarea', 'select', 'multiselect', 'radio', 'checkbox', 'number', 'date']).describe(
          'Widget kind: multiselect = checkboxes (pick several); radio/select = pick exactly one; checkbox = a single yes/no toggle; text/textarea = free text; number/date = typed values',
        ),
        label: z.string().min(1).max(120).describe('Field label shown to the learner'),
        placeholder: z.string().max(120).optional().describe('Placeholder for text/textarea/number inputs'),
        helpText: z.string().max(200).optional().describe('One-line hint under the label'),
        required: z.boolean().optional().describe('Whether the learner must fill this field (default false)'),
        defaultValue: z.string().max(200).optional().describe('Pre-selected value / checked state ("yes"/"no")'),
        options: z
          .array(
            z.object({
              value: z.string().min(1).max(120),
              label: z.string().min(1).max(120),
            }),
          )
          .min(1)
          .max(8)
          .optional()
          .describe('The choices — REQUIRED for select/multiselect/radio inputs'),
      }),
    )
    .min(1)
    .max(8)
    .describe('The form fields (1-8). Prefer 2-4 focused fields over a wall of questions.'),
  allowSkip: z.boolean().optional().describe(
    'Whether the learner may skip the form entirely (default true). Set false only when you truly cannot proceed without an answer.',
  ),
});

export type AskUserArgs = z.infer<typeof askUserSchema>;

const INPUT_TYPES: ClarificationInputType[] = [
  'text', 'textarea', 'select', 'multiselect', 'radio', 'checkbox', 'number', 'date',
];

function str(value: unknown, max: number): string | undefined {
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : undefined;
}

/**
 * Defensively normalize ANY unknown object (SSE payload, persisted tool
 * args, replayed event) into a ClarificationPayload — or null when it is
 * not a valid clarification. The client never trusts the wire shape.
 */
export function normalizeClarificationPayload(raw: unknown): ClarificationPayload | null {
  if (!raw || typeof raw !== 'object') return null;
  const record = raw as Record<string, unknown>;

  const question = str(record.question, 1000);
  if (!question) return null;

  const rawInputs = Array.isArray(record.inputs) ? record.inputs.slice(0, 8) : [];
  const inputs: ClarificationInput[] = [];
  for (const item of rawInputs) {
    if (!item || typeof item !== 'object') continue;
    const input = item as Record<string, unknown>;
    const id = str(input.id, 40);
    const label = str(input.label, 120);
    if (!id || !label) continue;
    const type = INPUT_TYPES.includes(input.type as ClarificationInputType)
      ? (input.type as ClarificationInputType)
      : 'text';
    const options = Array.isArray(input.options)
      ? input.options
          .slice(0, 8)
          .map((option) => {
            if (!option || typeof option !== 'object') return null;
            const value = str((option as Record<string, unknown>).value, 120);
            const optionLabel = str((option as Record<string, unknown>).label, 120) ?? value;
            return value ? { value, label: optionLabel } : null;
          })
          .filter((option): option is ClarificationInputOption => option !== null)
      : undefined;
    if ((type === 'select' || type === 'multiselect' || type === 'radio') && (!options || options.length === 0)) {
      continue; // a choice input without choices is unusable — drop the field
    }
    inputs.push({
      id,
      type,
      label,
      placeholder: str(input.placeholder, 120),
      helpText: str(input.helpText, 200),
      required: input.required === true,
      defaultValue: str(input.defaultValue, 200),
      ...(options && options.length > 0 ? { options } : {}),
    });
  }
  if (inputs.length === 0) return null;

  return {
    clarificationId: str(record.clarificationId, 64) ?? `clar-${Date.now()}`,
    title: str(record.title, 120),
    question,
    inputs,
    allowSkip: record.allowSkip === false ? false : true,
  };
}

/** Separator used inside one multiselect answer string. */
export const MULTI_VALUE_SEPARATOR = ', ';

/**
 * Render the learner's form answers as the NEXT USER MESSAGE the agent will
 * read. Shaped for model consumption: an explicit header naming the
 * question, then one line per field, marking skipped optional fields so the
 * agent knows they were deliberately left blank (not lost).
 */
export function formatClarificationAnswers(
  payload: ClarificationPayload,
  answers: ClarificationAnswers,
  skipped: boolean,
): string {
  const lines: string[] = [];
  for (const input of payload.inputs) {
    const raw = answers[input.id];
    const value = typeof raw === 'string' ? raw.trim() : '';
    if (input.type === 'checkbox') {
      const yes = value === 'yes';
      lines.push(`- ${input.label}: ${yes ? 'Yes' : 'No'}`);
    } else if (value) {
      lines.push(`- ${input.label}: ${value}`);
    } else if (input.required) {
      lines.push(`- ${input.label}: (no answer given)`);
    } else {
      lines.push(`- ${input.label}: (skipped)`);
    }
  }
  if (skipped) {
    return `[I skipped your question form — "${payload.question.slice(0, 120)}"]\nProceed with your best judgment, or tell me what you'd minimally need to know.`;
  }
  return [
    `Here are my answers to your question — "${payload.question.slice(0, 160)}"`,
    ...lines,
  ].join('\n');
}
