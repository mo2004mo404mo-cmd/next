/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/types/chat.ts
 *
 * MedQ only needs the Stateless Multi-Agent API types from this module:
 *   - StatelessChatRequest (request shape for the stateless chat route)
 *   - StatelessEvent (SSE events emitted by the stateless generator)
 *   - ParsedAction (parsed action from structured JSON output)
 *   - ChatMessageMetadata (per-message metadata used by message-converter)
 *   - DirectorState (accumulated director state passed between requests)
 *
 * OpenMAIC's chat.ts also defines a session-based ChatSession / SessionEvent
 * API (used by the legacy session-based route). MedQ is stateless-only, so
 * those types are omitted to keep the surface area minimal.
 */

import type { UIMessage } from 'ai';
import type { ThinkingConfig } from './provider';
import type { Stage, Scene, StageMode } from '@/lib/types/stage';
import type {
  AgentTurnSummary,
  WhiteboardActionRecord,
} from '@/lib/orchestration/types';

// ==================== Chat Message Metadata ====================

/**
 * Metadata attached to chat messages.
 * Ported verbatim — used by message-converter.ts to attribute speaker names
 * and by director-graph.ts to detect interrupted messages.
 */
export interface ChatMessageMetadata {
  senderName?: string;
  senderAvatar?: string;
  originalRole?: 'teacher' | 'agent' | 'user';
  actions?: MessageAction[];
  agentId?: string;
  agentColor?: string;
  createdAt?: number;
  interrupted?: boolean;
}

/**
 * Action buttons that can be attached to messages.
 * Ported verbatim — used by ChatMessageMetadata.actions.
 */
export interface MessageAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'spotlight' | 'highlight' | 'reset' | 'insert' | 'draw';
}

// ==================== Stateless Multi-Agent API Types ====================

/**
 * Accumulated director state passed between per-agent requests.
 * Client-maintained — backend is stateless.
 */
export interface DirectorState {
  turnCount: number;
  agentResponses: AgentTurnSummary[];
  whiteboardLedger: WhiteboardActionRecord[];
}

/**
 * Request body for the stateless chat API.
 * All state is sent from the client on each request.
 *
 * MedQ note: OpenMAIC's full StatelessChatRequest also carries `apiKey`,
 * `baseUrl`, `model`, `providerType` for OpenAI-compatible providers. MedQ
 * uses ZAI exclusively and authenticates via .z-ai-config, so those fields
 * are kept optional for type compatibility but are ignored by the ZAI adapter.
 */
export interface StatelessChatRequest {
  /** Conversation history (client-maintained) */
  messages: UIMessage<ChatMessageMetadata>[];
  /** Current application state */
  storeState: {
    stage: Stage | null;
    scenes: Scene[];
    currentSceneId: string | null;
    mode: StageMode;
    whiteboardOpen: boolean;
  };
  /** Agent configuration */
  config: {
    agentIds: string[];
    sessionType?: 'qa' | 'discussion';
    /** Discussion topic (for agent-initiated discussions) */
    discussionTopic?: string;
    /** Discussion prompt (for agent-initiated discussions) */
    discussionPrompt?: string;
    /** Which agent should speak first in a discussion */
    triggerAgentId?: string;
    /** Full agent configs for generated (non-default) agents that aren't in the server-side registry */
    agentConfigs?: Array<{
      id: string;
      name: string;
      role: string;
      persona: string;
      avatar: string;
      color: string;
      allowedActions: string[];
      priority: number;
      isGenerated?: boolean;
      boundStageId?: string;
    }>;
  };
  /** Accumulated director state from previous per-agent requests */
  directorState?: DirectorState;
  /** User profile for personalization */
  userProfile?: {
    nickname?: string;
    bio?: string;
  };
  /** OpenAI-compatible API credentials (ignored by ZAI adapter, kept for type compat). */
  apiKey?: string;
  baseUrl?: string;
  model?: string;
  providerType?: string;
  /**
   * Opt-in: enable provider-side thinking for this request. Default is
   * `{ enabled: false }` (low-latency chat).
   */
  thinking?: ThinkingConfig;
  /** UI-selected per-model thinking config. Takes precedence over `thinking`. */
  thinkingConfig?: ThinkingConfig;
}

/**
 * Parsed action from structured output.
 * Ported verbatim — emitted by parseStructuredChunk() in stateless-generate.ts.
 */
export interface ParsedAction {
  actionId: string;
  actionName: string;
  params: Record<string, unknown>;
}

/** @deprecated Use ParsedAction instead (kept for type compat with OpenMAIC callers). */
export type ParsedToolCall = ParsedAction;

// ==================== ChatSession (minimal stub) ====================

/**
 * Minimal `ChatSession` stub.
 *
 * OpenMAIC's chat.ts defines a full session-based API (ChatSession,
 * SessionEvent, CreateSessionRequest, SendMessageRequest, ToolResultsRequest,
 * toSessionListItem, LectureNoteEntry) that MedQ is stateless-only and does
 * not implement. The ported stage store (`lib/store/stage.ts`) and
 * stage-storage (`lib/utils/stage-storage.ts`) carry a `chats: ChatSession[]`
 * field for compat with the OpenMAIC shape; this minimal interface satisfies
 * the type. When / if the session-based chat API is ported, replace this
 * stub with the real port.
 */
export type SessionType = 'qa' | 'discussion' | 'lecture';
export type SessionStatus = 'idle' | 'active' | 'interrupted' | 'completed' | 'error';

/**
 * Session configuration. Mirrors OpenMAIC verbatim.
 */
export interface SessionConfig {
  agentIds: string[];
  triggerAgentId?: string;
  defaultAgentId?: string;
}

export interface ChatSession {
  id: string;
  stageId?: string;
  type: SessionType;
  title: string;
  status: SessionStatus;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[];
  config?: SessionConfig;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolCalls?: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingToolCalls?: any[];
  createdAt?: number;
  updatedAt?: number;
  sceneId?: string;
  lastActionIndex?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

/**
 * Lecture-note item — a single speech text or action badge in a lecture
 * note. Mirrors OpenMAIC verbatim. Used by the ported chat-area / lecture-
 * notes-view. Built from Scene.actions and displayed in the Notes tab.
 */
export type LectureNoteItem =
  | { kind: 'speech'; text: string }
  | { kind: 'action'; type: string; label?: string };

/**
 * A completed lecture note entry for one scene. Mirrors OpenMAIC verbatim.
 */
export interface LectureNoteEntry {
  sceneId: string;
  sceneTitle: string;
  sceneOrder: number;
  items: LectureNoteItem[];
  completedAt: number;
}

/**
 * Server-Sent Events for stateless chat API.
 * Ported verbatim — emitted by statelessGenerate() and the director loop.
 */
export type StatelessEvent =
  | {
      type: 'agent_start';
      data: {
        messageId: string;
        agentId: string;
        agentName: string;
        agentAvatar?: string;
        agentColor?: string;
      };
    }
  | { type: 'agent_end'; data: { messageId: string; agentId: string } }
  | { type: 'text_delta'; data: { content: string; messageId?: string } }
  | {
      type: 'action';
      data: {
        actionId: string;
        actionName: string;
        params: Record<string, unknown>;
        agentId: string;
        messageId?: string;
      };
    }
  | {
      type: 'thinking';
      data: { stage: 'director' | 'agent_loading'; agentId?: string };
    }
  | { type: 'cue_user'; data: { fromAgentId?: string; prompt?: string } }
  | {
      type: 'done';
      data: {
        totalActions: number;
        totalAgents: number;
        agentHadContent?: boolean;
        directorState?: DirectorState;
      };
    }
  | { type: 'error'; data: { message: string } };

/**
 * Pending tool call request sent to client for execution.
 * Ported verbatim from OpenMAIC.
 */
export interface ToolCallRequest {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  agentId: string;
  status: 'pending' | 'executing';
  requestedAt: number;
}

/**
 * Completed tool call record with result.
 * Ported verbatim from OpenMAIC.
 */
export interface ToolCallRecord {
  toolCallId: string;
  toolName: string;
  args: Record<string, unknown>;
  agentId: string;
  result?: unknown;
  error?: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  requestedAt: number;
  completedAt?: number;
}

/**
 * Persistent chat-session record (Dexie row shape).
 * Ported from OpenMAIC for use by `lib/utils/chat-storage.ts` and
 * `lib/utils/database.ts`. Uses concrete types instead of `any` for
 * `messages`, `toolCalls`, and `pendingToolCalls` so consumers can
 * safely destructure.
 */
export interface ChatSessionRecord {
  id: string;
  stageId?: string;
  type: SessionType;
  title: string;
  status: SessionStatus;
  messages: Array<Record<string, unknown>>;
  config?: SessionConfig;
  toolCalls?: ToolCallRecord[];
  pendingToolCalls?: ToolCallRequest[];
  createdAt?: number;
  updatedAt?: number;
  sceneId?: string;
  lastActionIndex?: number;
  [key: string]: unknown;
}
