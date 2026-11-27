/**
 * Shared types for the MedQ Agent runtime.
 *
 * Layer boundaries (separation of concerns):
 *   - types.ts        : cross-cutting type contracts only
 *   - config.ts       : provider/model resolution & routing
 *   - prompts/        : system prompt assembly
 *   - tools/          : agent tool implementations
 *   - subagents/      : specialist fleet definitions
 *   - skills/         : SKILL.md packs + workspace sync
 *   - memory/         : long-term memory service
 *   - artifacts/      : deliverable persistence
 *   - runtime/        : deep agent assembly + event streaming
 */

/** Wire protocol streamed from the agent runtime to SSE clients. */
export type AgentRuntimeEvent =
  | { type: 'status'; model: string }
  | { type: 'token'; text: string }
  | { type: 'plan'; todos: unknown[] }
  | { type: 'tool_start'; tool: string; id?: string; args?: unknown }
  | { type: 'tool_end'; tool: string; id?: string; excerpt?: string; result?: string; status?: string }
  | { type: 'subagent'; name: string; event: 'started' | 'completed' }
  | { type: 'memory'; summaryTurnCount: number; episodes: Array<{ content: string; scope: string }> }
  | { type: 'approval_required'; approval: ApprovalWirePayload }
  | { type: 'clarification_required'; clarification: ClarificationWirePayload }
  | { type: 'model_fallback'; from: string; to: string; reason: string }
  | { type: 'paused'; reason: 'awaiting_approval' }
  | { type: 'error'; error: string }
  | { type: 'done'; text: string };

/**
 * HITL approval request payload (SSE `approval_required` event → approval
 * card UI). `approvalId` references the AgentApproval row; `threadId` is the
 * checkpoint thread the graph is parked on and must be sent back on resume.
 */
export interface ApprovalWirePayload {
  approvalId: string;
  threadId: string;
  tool: string;
  capability: string;
  args: unknown;
  description?: string;
}

/** Structured clarification payload (SSE `clarification_required` event →
 * interactive form card UI). Emitted by the ask_user tool through the
 * in-process bus; answers return as the NEXT USER MESSAGE, so there is no
 * server-side wait and no resume id — the card is fire-and-display. */
export interface ClarificationWirePayload {
  clarificationId: string;
  title?: string;
  question: string;
  inputs: Array<{
    id: string;
    type: 'text' | 'textarea' | 'select' | 'multiselect' | 'radio' | 'checkbox' | 'number' | 'date';
    label: string;
    placeholder?: string;
    helpText?: string;
    required?: boolean;
    defaultValue?: string;
    options?: Array<{ value: string; label: string }>;
  }>;
  allowSkip?: boolean;
}

/**
 * Decision fed back into the parked graph on resume — one per interrupted
 * tool call (the SDK validates the count). The approvals service expands a
 * single user verdict into N identical decisions.
 */
export type ApprovalResumeDecision =
  | { type: 'approve' }
  | { type: 'reject'; message?: string };

/** Resolved chat-model configuration (any OpenAI-compatible endpoint). */
export interface AgentChatConfig {
  baseUrl: string;
  apiKey: string;
  model: string;
  defaultHeaders?: Record<string, string>;
  source: string;
}

/** Context handed to every tool factory (tenant scoping, no UI concerns). */
export interface MedQToolContext {
  /** Authenticated user id or guest id (tenant key for memory/artifacts/skills). */
  userId: string;
  /** Optional conversation thread id for artifact attribution. */
  threadId?: string;
}

/** Chat history entry accepted by the runtime (rendered into the graph). */
export interface AgentHistoryEntry {
  role: string;
  content: string;
}
