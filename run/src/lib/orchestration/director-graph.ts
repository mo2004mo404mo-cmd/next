/**
 * Ported from OpenMAIC (https://github.com/THU-MAIC/OpenMAIC)
 * License: MIT — Attribution preserved.
 * Original: lib/orchestration/director-graph.ts
 *
 * Director Graph — stateless state-machine variant for MedQ.
 *
 * OpenMAIC's original director-graph.ts is built on `@langchain/langgraph`:
 * it compiles a StateGraph with two nodes (`director` and `agent_generate`)
 * connected by a conditional edge, and streams events via LangGraph's custom
 * stream mode. MedQ does NOT want LangGraph as a dependency, so this file
 * provides the SAME exported API (`createOrchestrationGraph`,
 * `buildInitialState`) but implements the director loop as a plain async
 * generator — a hand-rolled state machine.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * State machine topology (single-round, mirrors the LangGraph original):
 *
 *   START → director ──(END)──────────────────────────→ END
 *              │
 *              └─(next_agent)→ agent_generate ──→ END
 *
 * Each request runs at most one director→agent cycle. The client serializes
 * multiple requests to drive multi-agent discussions. There is no maxTurns
 * cap inside the loop — the topology itself is the bound. (The "6 turns per
 * scene" rule mentioned in the task brief is enforced by the chat route that
 * drives this loop, not inside it. The director's LLM decision is the primary
 * "done" signal; if the LLM refuses to emit END, the chat route stops calling
 * after 6 turns.)
 *
 * ─────────────────────────────────────────────────────────────────────────
 * State shape (mirrors the LangGraph `OrchestratorState` annotation):
 *
 *   {
 *     messages, storeState, availableAgentIds, languageModel, thinkingConfig,
 *     discussionContext, triggerAgentId, userProfile, agentConfigOverrides,
 *     currentAgentId, turnCount, agentResponses, whiteboardLedger,
 *     shouldEnd, totalActions,
 *   }
 *
 * The director's "done" conditions:
 *   - Single agent: dispatch on turn 0; cue user on turn 1+ (end).
 *   - Multi agent with trigger on turn 0: dispatch trigger (skip LLM).
 *   - Multi agent otherwise: LLM decides next_agent / USER / END.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * MedQ-specific extensions:
 *   - `OrchestrationAICallFn` — adapter-agnostic streaming LLM call. MedQ's
 *     chat route passes a ZAI-backed implementation; OpenMAIC's `LanguageModel`
 *     path is preserved for callers that wire one up. The adapter internally
 *     prefers `aiCallFn` when both are present.
 */

import type { LanguageModel } from 'ai';

import { AISdkLangGraphAdapter, type StreamChunk } from './ai-sdk-adapter';
import {
  SystemMessage,
  HumanMessage,
  AIMessage,
  type BaseMessage,
} from './ai-sdk-adapter';
import type {
  StatelessEvent,
  StatelessChatRequest,
} from '@/lib/types/chat';
import type { ThinkingConfig } from '@/lib/types/provider';
import type { AgentConfig } from '@/lib/orchestration/registry/types';
import { useAgentRegistry } from '@/lib/orchestration/registry/store';
import { buildStructuredPrompt } from './prompt-builder';
import { summarizeConversation } from './summarizers/conversation-summary';
import { convertMessagesToOpenAI } from './summarizers/message-converter';
import { buildDirectorPrompt, parseDirectorDecision } from './director-prompt';
import { getEffectiveActions } from './tool-schemas';
import type { AgentTurnSummary, WhiteboardActionRecord } from './types';
import {
  parseStructuredChunk,
  createParserState,
  finalizeParser,
} from './stateless-generate';
import { createLogger } from '@/lib/logger';

const log = createLogger('DirectorGraph');

// ==================== AICallFn contract ====================

/**
 * MedQ-side streaming LLM call. The ported director loop accepts an
 * implementation of this function (typically wrapping ZAI's streaming chat
 * API) and uses it to drive both director and agent generation.
 *
 * Same shape as `AICallFn` in `./ai-sdk-adapter.ts` — re-declared here so
 * `stateless-generate.ts` can import it from `./director-graph` without a
 * circular dependency on `./ai-sdk-adapter`.
 */
export type OrchestrationAICallFn = (
  messages: Array<{ role: 'system' | 'user' | 'assistant'; content: string }>,
  options?: { signal?: AbortSignal; thinking?: ThinkingConfig },
) => AsyncGenerator<StreamChunk>;

// ==================== State Definition ====================

/**
 * Orchestration state — the plain object that flows through the state machine.
 * Mirrors the LangGraph `OrchestratorState` annotation field-for-field.
 */
export interface OrchestratorState {
  // Input (set once at graph entry)
  messages: StatelessChatRequest['messages'];
  storeState: StatelessChatRequest['storeState'];
  availableAgentIds: string[];
  languageModel: LanguageModel | null;
  thinkingConfig: ThinkingConfig | null;
  discussionContext: { topic: string; prompt?: string } | null;
  triggerAgentId: string | null;
  userProfile: { nickname?: string; bio?: string } | null;
  /** Request-scoped agent configs for generated agents (not in the default registry) */
  agentConfigOverrides: Record<string, AgentConfig>;

  // Mutable (updated by nodes)
  currentAgentId: string | null;
  turnCount: number;
  agentResponses: AgentTurnSummary[];
  whiteboardLedger: WhiteboardActionRecord[];
  shouldEnd: boolean;
  totalActions: number;

  /** MedQ-side streaming LLM call (typically ZAI-backed). Preferred over `languageModel`. */
  aiCallFn: OrchestrationAICallFn | null;
}

/**
 * Look up an agent config: request-scoped overrides first, then global registry.
 * This keeps the server stateless — generated agent configs travel with the request.
 */
function resolveAgent(state: OrchestratorState, agentId: string): AgentConfig | undefined {
  return state.agentConfigOverrides[agentId] ?? useAgentRegistry.getState().getAgent(agentId);
}

// ==================== Stream options ====================

interface StreamOptions {
  signal?: AbortSignal;
}

interface OrchestrationGraph {
  stream(state: OrchestratorState, options?: StreamOptions): AsyncGenerator<StatelessEvent>;
}

// ==================== Director Node ====================

/**
 * Unified director: decides which agent speaks next.
 *
 * Strategy varies by agent count:
 *   Single agent — pure code logic, zero LLM calls:
 *     turn 0: dispatch the sole agent
 *     turn 1+: cue user to speak (keeps session active for follow-ups)
 *
 *   Multi agent — LLM-based with code fast-paths:
 *     turn 0 + triggerAgentId: dispatch trigger agent (skip LLM)
 *     otherwise: LLM decides next agent / USER / END
 */
async function* directorNode(
  state: OrchestratorState,
  options: StreamOptions,
): AsyncGenerator<StatelessEvent> {
  const isSingleAgent = state.availableAgentIds.length <= 1;

  // ── Single agent: code-only director ──
  if (isSingleAgent) {
    const agentId = state.availableAgentIds[0] || 'default-1';

    if (state.turnCount === 0) {
      // First turn: dispatch the agent
      log.info(`[Director] Single agent: dispatching "${agentId}"`);
      yield { type: 'thinking', data: { stage: 'agent_loading', agentId } };
      state.currentAgentId = agentId;
      state.shouldEnd = false;
      return;
    }

    // Agent already responded: cue user for follow-up
    log.info(`[Director] Single agent: cueing user after "${agentId}"`);
    yield { type: 'cue_user', data: { fromAgentId: agentId } };
    state.shouldEnd = true;
    return;
  }

  // ── Multi agent: fast-path for first turn with trigger ──
  if (state.turnCount === 0 && state.triggerAgentId) {
    const triggerId = state.triggerAgentId;
    if (state.availableAgentIds.includes(triggerId)) {
      log.info(`[Director] First turn: dispatching trigger agent "${triggerId}"`);
      yield {
        type: 'thinking',
        data: { stage: 'agent_loading', agentId: triggerId },
      };
      state.currentAgentId = triggerId;
      state.shouldEnd = false;
      return;
    }
    log.warn(
      `[Director] Trigger agent "${triggerId}" not in available agents, falling through to LLM`,
    );
  }

  // ── Multi agent: LLM-based decision ──
  const agents: AgentConfig[] = state.availableAgentIds
    .map((id) => resolveAgent(state, id))
    .filter((a): a is AgentConfig => a != null);

  if (agents.length === 0) {
    state.shouldEnd = true;
    return;
  }

  yield { type: 'thinking', data: { stage: 'director' } };

  const openaiMessages = convertMessagesToOpenAI(state.messages);
  const conversationSummary = summarizeConversation(openaiMessages);

  const prompt = buildDirectorPrompt(
    agents,
    conversationSummary,
    state.agentResponses,
    state.turnCount,
    state.discussionContext,
    state.triggerAgentId,
    state.whiteboardLedger,
    state.userProfile || undefined,
    state.storeState.whiteboardOpen,
  );

  const adapter = new AISdkLangGraphAdapter(
    // The director path always prefers the AICallFn if MedQ provided one.
    // Fall back to the LanguageModel (which the adapter will stub-throw on
    // if no AICallFn is wired up).
    (state.aiCallFn ?? state.languageModel) as LanguageModel | OrchestrationAICallFn,
    state.thinkingConfig ?? undefined,
  );

  try {
    const result = await adapter._generate(
      [new SystemMessage(prompt), new HumanMessage('Decide which agent should speak next.')],
      { signal: options.signal },
    );

    const content = result.generations[0]?.text || '';
    log.info(`[Director] Raw decision: ${content}`);

    const decision = parseDirectorDecision(content);

    if (decision.shouldEnd || !decision.nextAgentId) {
      log.info('[Director] Decision: END');
      state.shouldEnd = true;
      return;
    }

    if (decision.nextAgentId === 'USER') {
      log.info('[Director] Decision: cue USER to speak');
      yield {
        type: 'cue_user',
        data: { fromAgentId: state.currentAgentId || undefined },
      };
      state.shouldEnd = true;
      return;
    }

    const agentExists = agents.some((a) => a.id === decision.nextAgentId);
    if (!agentExists) {
      log.warn(`[Director] Unknown agent "${decision.nextAgentId}", ending`);
      state.shouldEnd = true;
      return;
    }

    yield {
      type: 'thinking',
      data: { stage: 'agent_loading', agentId: decision.nextAgentId },
    };

    log.info(`[Director] Decision: dispatch agent "${decision.nextAgentId}"`);
    state.currentAgentId = decision.nextAgentId;
    state.shouldEnd = false;
  } catch (error) {
    log.error('[Director] Error:', error);
    state.shouldEnd = true;
  }
}

// ==================== Agent Generate Node ====================

/**
 * Run generation for one agent. Streams agent_start, text_delta,
 * action, and agent_end events via the generator's yields.
 */
async function* runAgentGeneration(
  state: OrchestratorState,
  agentId: string,
  options: StreamOptions,
): AsyncGenerator<StatelessEvent> {
  const agentConfig = resolveAgent(state, agentId);
  if (!agentConfig) {
    throw new Error(`Agent not found: ${agentId}`);
  }

  const messageId = `assistant-${agentId}-${Date.now()}`;

  yield {
    type: 'agent_start',
    data: {
      messageId,
      agentId,
      agentName: agentConfig.name,
      agentAvatar: agentConfig.avatar,
      agentColor: agentConfig.color,
    },
  };

  // Compute effective actions: filter by scene type for defense-in-depth
  // e.g. spotlight/laser stripped for non-slide scenes even if in static allowedActions
  const currentScene = state.storeState.currentSceneId
    ? state.storeState.scenes.find((s) => s.id === state.storeState.currentSceneId)
    : undefined;
  const sceneType = currentScene?.type;
  const effectiveActions = getEffectiveActions(agentConfig.allowedActions, sceneType);

  const discussionContext = state.discussionContext || undefined;
  const systemPrompt = buildStructuredPrompt(
    agentConfig,
    state.storeState,
    discussionContext,
    state.whiteboardLedger,
    state.userProfile || undefined,
    state.agentResponses,
  );
  const openaiMessages = convertMessagesToOpenAI(state.messages, agentId);
  const adapter = new AISdkLangGraphAdapter(
    (state.aiCallFn ?? state.languageModel) as LanguageModel | OrchestrationAICallFn,
    state.thinkingConfig ?? undefined,
  );

  const lcMessages: BaseMessage[] = [
    new SystemMessage(systemPrompt),
    ...openaiMessages.map((m) =>
      m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content),
    ),
  ];

  // Ensure the message list ends with a HumanMessage.
  // After agent-aware role mapping, other agents' messages become user role,
  // so trailing AIMessage is less likely. But guard against edge cases
  // (e.g. agent's own previous response is last in history).
  const lastMsg = lcMessages[lcMessages.length - 1];
  if (!lcMessages.some((m) => m instanceof HumanMessage)) {
    lcMessages.push(new HumanMessage('Please begin.'));
  } else if (lastMsg instanceof AIMessage) {
    lcMessages.push(new HumanMessage("It's your turn to speak. Respond from your perspective."));
  }

  const parserState = createParserState();
  let fullText = '';
  let actionCount = 0;
  const whiteboardActions: WhiteboardActionRecord[] = [];

  try {
    for await (const chunk of adapter.streamGenerate(lcMessages, {
      signal: options.signal,
    })) {
      if (chunk.type === 'delta') {
        const parseResult = parseStructuredChunk(chunk.content, parserState);

        // Emit events in original interleaved order via the `ordered` array.
        // The ordered array tracks complete items from Step 5 of the parser;
        // trailing partial text deltas (Step 6) are in textChunks but not in ordered.
        let emittedTextCount = 0;
        if (parseResult.ordered.length > 0 || parseResult.textChunks.length > 0) {
          log.debug(
            `[AgentGenerate] Parse: ordered=${parseResult.ordered.length} (${parseResult.ordered.map((e) => e.type).join(',')}), textChunks=${parseResult.textChunks.length}, actions=${parseResult.actions.length}, done=${parseResult.isDone}`,
          );
        }
        for (const entry of parseResult.ordered) {
          if (entry.type === 'text') {
            const rawText = parseResult.textChunks[entry.index];
            if (!rawText) {
              log.warn(
                `[AgentGenerate] Ordered text entry index=${entry.index} but textChunks[${entry.index}] is empty`,
              );
              continue;
            }
            const text = rawText.replace(/^>+\s?/gm, '');
            if (!text) continue;
            fullText += text;
            yield {
              type: 'text_delta',
              data: { content: text, messageId },
            };
            emittedTextCount++;
          } else if (entry.type === 'action') {
            const ac = parseResult.actions[entry.index];
            if (!ac) continue;
            if (!effectiveActions.includes(ac.actionName)) {
              log.warn(
                `[AgentGenerate] Agent ${agentConfig.name} attempted disallowed action: ${ac.actionName}, skipping`,
              );
              continue;
            }
            actionCount++;
            // Record whiteboard actions to the ledger
            if (ac.actionName.startsWith('wb_')) {
              whiteboardActions.push({
                actionName: ac.actionName as WhiteboardActionRecord['actionName'],
                agentId,
                agentName: agentConfig.name,
                params: ac.params,
              });
            }
            yield {
              type: 'action',
              data: {
                actionId: ac.actionId,
                actionName: ac.actionName,
                params: ac.params,
                agentId,
                messageId,
              },
            };
          }
        }

        // Emit trailing partial text deltas not covered by ordered
        for (let i = emittedTextCount; i < parseResult.textChunks.length; i++) {
          const rawText = parseResult.textChunks[i];
          if (!rawText) continue;
          const text = rawText.replace(/^>+\s?/gm, '');
          if (!text) continue;
          fullText += text;
          yield {
            type: 'text_delta',
            data: { content: text, messageId },
          };
        }
      }
    }

    // Finalize: emit any remaining content if the model didn't produce valid JSON
    const finalResult = finalizeParser(parserState);
    for (const entry of finalResult.ordered) {
      if (entry.type === 'text') {
        const rawText = finalResult.textChunks[entry.index];
        if (!rawText) continue;
        const text = rawText.replace(/^>+\s?/gm, '');
        if (!text) continue;
        fullText += text;
        yield {
          type: 'text_delta',
          data: { content: text, messageId },
        };
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw error;
    }
    log.error(`[AgentGenerate] Error for ${agentConfig.name}:`, error);
    yield {
      type: 'error',
      data: { message: error instanceof Error ? error.message : String(error) },
    };
  }

  yield {
    type: 'agent_end',
    data: { messageId, agentId },
  };

  // Persist turn summary into state — director-graph's agent_generate node
  // returns this as its state update; here we mutate state in place so the
  // outer loop can read it.
  state.turnCount = state.turnCount + 1;
  state.totalActions = state.totalActions + actionCount;
  state.agentResponses = [
    ...state.agentResponses,
    {
      agentId,
      agentName: agentConfig.name,
      contentPreview: fullText.slice(0, 300),
      actionCount,
      whiteboardActions,
    },
  ];
  state.whiteboardLedger = [...state.whiteboardLedger, ...whiteboardActions];
  state.currentAgentId = null;

  if (!fullText && actionCount === 0) {
    log.warn(
      `[AgentGenerate] Agent "${agentConfig.name}" produced empty response (no text, no actions)`,
    );
  }
}

// ==================== Graph Construction ====================

/**
 * Create the orchestration graph — state-machine variant.
 *
 * Topology (mirrors the LangGraph original):
 *   START → director ──(end)──→ END
 *              │
 *              └─(next)→ agent_generate ──→ END
 *
 * Single-round contract: each request runs at most one director→agent cycle.
 * Multi-agent discussions arise from the client serializing requests; the
 * server loop does not iterate. There is no `maxTurns` — the topology itself
 * is the bound.
 *
 * MedQ note: the original `LangGraphRunnableConfig` parameter (with its
 * `writer()` and `signal`) is replaced by a plain `StreamOptions` ({ signal? }).
 * Events are yielded directly from the async generator instead of being pushed
 * through `config.writer()`.
 */
export function createOrchestrationGraph(): OrchestrationGraph {
  return {
    async *stream(state, options) {
      // ── Director node ──
      yield* directorNode(state, options ?? {});

      if (state.shouldEnd) {
        return;
      }

      // ── Agent generate node ──
      const agentId = state.currentAgentId;
      if (!agentId) {
        state.shouldEnd = true;
        return;
      }

      yield* runAgentGeneration(state, agentId, options ?? {});

      // agent_generate → END (single-round contract; client loops externally).
    },
  };
}

/**
 * Build initial state for the orchestration graph from a StatelessChatRequest
 * and a pre-created LanguageModel instance (OpenMAIC path) OR an AICallFn
 * (MedQ path).
 *
 * MedQ extensions:
 *   - `languageModel` is now nullable (`LanguageModel | null`) so callers that
 *     only have an `AICallFn` can pass `null`.
 *   - Optional `aiCallFn` parameter — when provided, the adapter prefers it
 *     over `languageModel`. This is how MedQ's ZAI-backed chat route plugs in.
 */
export function buildInitialState(
  request: StatelessChatRequest,
  languageModel: LanguageModel | null,
  thinkingConfig?: ThinkingConfig,
  aiCallFn?: OrchestrationAICallFn | null,
): OrchestratorState {
  // Build request-scoped agent config overrides for generated agents.
  // These travel with each request — no server-side persistence needed.
  const agentConfigOverrides: Record<string, AgentConfig> = {};
  if (request.config.agentConfigs?.length) {
    for (const cfg of request.config.agentConfigs) {
      agentConfigOverrides[cfg.id] = {
        ...cfg,
        isDefault: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  }

  const discussionContext = request.config.discussionTopic
    ? {
        topic: request.config.discussionTopic,
        prompt: request.config.discussionPrompt,
      }
    : null;

  const incoming = request.directorState;
  const turnCount = incoming?.turnCount ?? 0;

  return {
    messages: request.messages,
    storeState: request.storeState,
    availableAgentIds: request.config.agentIds,
    languageModel,
    thinkingConfig: thinkingConfig ?? null,
    discussionContext,
    triggerAgentId: request.config.triggerAgentId || null,
    userProfile: request.userProfile || null,
    agentConfigOverrides,
    currentAgentId: null,
    turnCount,
    agentResponses: incoming?.agentResponses ?? [],
    whiteboardLedger: incoming?.whiteboardLedger ?? [],
    shouldEnd: false,
    totalActions: 0,
    aiCallFn: aiCallFn ?? null,
  };
}
