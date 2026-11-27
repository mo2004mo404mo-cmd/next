/**
 * Runtime for the MedQ deep-agent assistant.
 *
 * This module assembles the model, registers multimodal tools, and exposes
 * the event stream used by the chat API to emit status, tool, and final text
 * updates as the agent works through a medical task.
 */
import { AIMessage, HumanMessage, SystemMessage } from '@langchain/core/messages';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import fs from 'node:fs';
import path from 'node:path';

import { db } from '@/lib/db';

// Deep-agent framework entrypoints used to assemble the multi-step medical assistant.
import {
  createDeepAgent,
  FilesystemBackend,
  CompositeBackend,
  createMemoryMiddleware,
  type SubAgent,
} from 'deepagents';
// Fault-tolerance, task-planning and interpreter middleware (docs parity —
// the JS docs' middleware catalog ships inside the `langchain` package and
// `@langchain/quickjs`; both are peer-compatible with deepagents 1.13.4).
import {
  todoListMiddleware,
  modelRetryMiddleware,
  modelCallLimitMiddleware,
  toolCallLimitMiddleware,
  toolErrorMiddleware,
  type AgentMiddleware,
} from 'langchain';
import { createCodeInterpreterMiddleware } from '@langchain/quickjs';
import { withApprovalGate } from './approvals/service';

import { createMemoryTools, createMultimodalTools, type MedQToolContext } from './deep-agent-tools';
import { buildMemoryContext } from './memory/context';
import { extractAndStoreMemories } from './memory/service';
import { maybeGenerateThreadTitle } from './threads/title';
import { createScheduleTaskTool, createListScheduledTasksTool } from './tools/scheduling';
import { createSearchKnowledgeTool } from './tools/knowledge';
import { ensureAgentWorkspace, agentWorkspaceRoot } from './skills/workspace';
import { syncSkillsToWorkspace } from './skills/loader';
import { buildMcpTools } from './mcp/loader';
import { ensureMedQHarnessProfile } from './harness-profile';
import { resolveAgentKeyPool, nextPoolKey, poolBaseUrl, normalizeBaseUrl } from './provider/key-pool';
import { buildFastModel } from './provider/fast-model';
export { createMemoryTools } from './deep-agent-tools';
export type { MedQToolContext } from './deep-agent-tools';

// Type-only import (erased at runtime): question-deep-agent imports
// resolveMedQAgentConfig from THIS module, so a value import would create a
// module-init cycle. The generation runtime itself is loaded lazily inside
// the run_question_generation_agent tool via dynamic import().
import type { DeepAgentEvent } from './question-deep-agent';

// Provider/model resolution used to honor user-selected models and runtime config.
import { resolveModel } from '@/lib/server/resolve-model';
import { buildChatAgentTools } from './tools/chat-registry';
import { subscribeApprovalRequests } from './approvals/service';
import { subscribeClarifications } from './tools/ask-user';
import { subscribeUiActions } from './tools/ui-action';
import { readConfig as readZaiConfig } from '../zai';

/** Starter template for the user's AGENTS.md persistent-instruction file
 * (docs' memory pattern). Seeded once per workspace; afterwards the learner
 * owns the file — the agent edits it on request, never re-seeds. */
const AGENTS_MD_TEMPLATE = `# AGENTS.md — my persistent instructions

Everything in this file is loaded into the AI assistant's instructions at the
start of every conversation. Keep it short and specific.

## About me
- I'm a medical learner preparing for: —

## How to help me
- Explain the reasoning step by step before giving the answer
- Show the calculation whenever you do dose or unit math

## Preferences
- Language: English
- Use metric units (mg, mL, kg)

> Tip: ask the assistant in chat to update this file — e.g. "remember that I
> prefer flashcards over long summaries" — and it will edit AGENTS.md for you.
`;

const AGENT_LOG_COLORS = {
  info: '\x1b[36m',
  tool: '\x1b[35m',
  success: '\x1b[32m',
  error: '\x1b[31m',
} as const;

function logAgentEvent(tone: keyof typeof AGENT_LOG_COLORS, message: string) {
  const colorEnabled = process.env.NO_COLOR === undefined &&
    process.env.FORCE_COLOR !== '0' &&
    (process.stdout.isTTY || process.env.FORCE_COLOR === '1');
  const prefix = colorEnabled
    ? `${AGENT_LOG_COLORS[tone]}[MedQ Agent]\x1b[0m`
    : '[MedQ Agent]';
  const log = tone === 'error' ? console.error : console.info;
  log(`${prefix} ${message}`);
}

/**
 * The runtime sits between the route layer and the LLM provider.
 *
 * It resolves model configuration, registers tool functions the agent may invoke,
 * assembles the deep-agent graph with medical-specific prompts, and emits a
 * stream of structured events that the route then converts into SSE for the UI.
 *
 * In practice this file is the operational heart of the MedQ agent: model,
 * tools, memory context, and streaming execution all live here.
 */

/** A prior user or assistant turn included as context for the current request. */
export interface AgentHistoryEntry {
  role: 'user' | 'assistant';
  content: string;
}

/** Request-scoped context used to configure the agent and reconstruct the chat turn. */
export interface DeepAgentStreamOptions {
  /** Optional provider/model override from the chat model picker. */
  modelString?: string;
  /**
   * Pre-rendered long-term memory block (from buildMemoryContext) appended to
   * the system prompt. Built by streamMedQDeepAgent for signed-in users — the
   * recalled memories ground the turn in what the agent previously learned
   * about this user (profile / study habits / past facts). Best-effort: null
   * when the user has no memories or the lookup failed.
   */
  memoryContext?: string | null;
  /**
   * Internal: provider override used by the automatic Z.AI fallback. When
   * the primary provider (env-configured, e.g. the shared ollama gateway)
   * fails with a rate-limit/overload error before any content was streamed,
   * streamMedQDeepAgent retries the whole turn through this config instead.
   * Not part of the public API surface — set by the runtime itself.
   */
  providerOverride?: MedQProviderOverride;
  /** Authenticated user ID, used for provider key resolution and runtime metadata. */
  userId?: string | null;
  /** Stable conversation ID passed to the agent runtime. */
  threadId?: string;
  /** Telemetry label for the AgentRun row this stream writes (chat turn vs
   *  scheduled-job execution). Defaults to 'chat'. */
  runKind?: 'chat' | 'job';
  /** HITL approvals: 'off' runs gated tools without approval prompts — for
   *  autonomous executions (scheduled / background jobs) with no human
   *  watching. The job's SCHEDULING was itself approved at creation time.
   *  Defaults to on (the interactive chat experience). */
  hitl?: 'on' | 'off';
  /** Recent chat turns; the runtime keeps only the last 12. */
  history?: AgentHistoryEntry[];
  /** Request abort signal. Cancels the merged stream immediately and stops the
   *  embedded generation agent at its next checkpoint (cooperative cancel). */
  signal?: AbortSignal;
  /**
   * Live events emitted by the embedded question-generation agent while it
   * runs inside a chat tool call. The chat stream wires this to an event queue
   * so inner activity (plan / tools / subagent / saves) reaches the SSE client
   * in real time instead of after the whole tool call finishes.
   */
  onGenerationEvent?: (event: DeepAgentEvent) => void;
}

/** Explicit LLM provider config the deep agent runs against. */
export interface MedQProviderOverride {
  baseUrl: string;
  apiKey: string;
  model: string;
  /** Extra gateway headers (e.g. Z.AI's X-Z-AI-From / X-Token). */
  defaultHeaders?: Record<string, string>;
  /** Short human-readable label surfaced in the status event / logs. */
  label: string;
}

/**
 * Build a fallback provider config from the managed Z.AI deployment config
 * (`.z-ai-config` — project / home / /etc, same discovery the
 * z-ai-web-dev-sdk uses). Returns null when Z.AI is not configured, in which
 * case no fallback happens and the primary error propagates as before.
 *
 * Verified working (2026-10-08): while the shared ollama gateway was in a
 * sustained 429 storm, this endpoint answered normal LangChain invoke /
 * stream / tool-call round-trips.
 *
 * Exported for question-deep-agent.ts, whose generation runs use the same
 * two-attempt fallback pattern as the chat stream below.
 */
/** Z.AI gateway session headers (the gateway requires X-Token, not just
 * Bearer — see src/lib/zai.ts). Shared by the fallback config and direct
 * zai-resolved model picks. */
export function zaiGatewayHeaders(zai: { token?: string; chatId?: string; userId?: string }): Record<string, string> {
  const headers: Record<string, string> = { 'X-Z-AI-From': 'Z' };
  if (zai.token) headers['X-Token'] = zai.token;
  if (zai.chatId) headers['X-Chat-Id'] = zai.chatId;
  if (zai.userId) headers['X-User-Id'] = zai.userId;
  return headers;
}

export function zaiFallbackConfig(): MedQProviderOverride | null {
  try {
    const zai = readZaiConfig();
    if (!zai?.apiKey || !zai.baseUrl) return null;
    const model = process.env.ZAI_FALLBACK_MODEL || 'glm-4.5';
    return {
      baseUrl: zai.baseUrl,
      apiKey: zai.apiKey,
      model,
      defaultHeaders: zaiGatewayHeaders(zai),
      label: `zai:${model}`,
    };
  } catch {
    return null;
  }
}

/**
 * Provider-side overload/transient errors worth a fallback retry: rate
 * limits (429 / "too many requests" — the shared gateway wraps these in a
 * 500), other 5xx statuses, and network-level failures. Anything else
 * (validation, auth, code bugs) propagates unchanged.
 *
 * Exported for question-deep-agent.ts (generation-run fallback wrapper).
 */
export function isProviderOverloadError(error: unknown): boolean {
  const msg = error instanceof Error ? error.message : String(error);
  if (/\b429\b|too many requests|rate.?limit/i.test(msg)) return true;
  if (/\b(?:500|502|503|504)\b/.test(msg) && /status|http/i.test(msg)) return true;
  return /ECONNRESET|ETIMEDOUT|EAI_AGAIN|fetch failed|network|timeout|timed out/i.test(msg);
}

/**
 * The full set of multimodal tools exposed to the MedQ agent.
 *
 * The runtime intentionally exposes a narrow but useful set of capabilities:
 * search evidence, generate images, inspect visuals, and synthesize audio.
 * This keeps the agent grounded and avoids sprawl of unrelated tool actions.
 */
const multimodalTools = createMultimodalTools(resolveMedQAgentConfig);

/**
 * Question-authoring subagent.
 *
 * This delegated assistant is specialized for medical exam generation. It decides
 * whether an image, audio, or other media is required and emits structured JSON
 * rather than freeform prose.
 */
const multimodalQuestionAuthor: SubAgent = {
  name: 'multimodal-question-author',
  description: 'Creates exam-ready medical questions and identifies when an image, audio clip, video, or other media is required to answer them.',
  systemPrompt: [
    'You are the Multimodal Question Author for MedQ.',
    'Create medically accurate exam questions from the delegated request.',
    'A question must not depend on a modality that is absent. For auscultation, heart sounds, lung sounds, speech, or other audible findings, require audio. For anatomy, pathology, imaging, ECG, microscopy, or physical findings, require an image when the learner must inspect it.',
    'Return ONLY a JSON array. Each object must include: type, text, options, answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags, and mediaRequirements.',
    'mediaRequirements must be an array of objects with type (image|audio|video), required (boolean), purpose, and prompt. Use an empty array when no media is needed.',
    'Never invent imageUrl, audioUrl, or videoUrl values. Those fields must be omitted until a media generator supplies a real asset.',
    'You may use search_medical_references for current evidence, generate_medical_illustration when an image is required, generate_medical_audio for auscultation, narration, or spoken teaching, and analyze_visual_material when an uploaded image or visual reference must be interpreted before writing the question.',
    'Do not use image generation as a substitute for audio, video, ECG tracing, or an uploaded clinical recording.',
  ].join('\n'),
  tools: multimodalTools,
};

/**
 * Parsed [K#] knowledge citation attached to tool_end events for
 * search_knowledge, so the chat SSE client can render hover-cards.
 */
export interface KnowledgeCitationWire {
  ref: string;
  title: string;
  sourceId?: string;
  relevance?: number;
  excerpt?: string;
}

/** Web-search citation ([S#]) surfaced from search_medical_references so the
 *  chat UI can render clickable source cards instead of raw URL dumps. */
export interface WebCitationWire {
  ref: string;
  title: string;
  url: string;
  snippet?: string;
  host?: string;
  date?: string;
}

/** Parse a search_knowledge tool result JSON into structured citations,
 * including the per-ref passage excerpts extracted from the context block. */
function parseKnowledgeCitations(rawToolOutput: string): KnowledgeCitationWire[] | undefined {
  try {
    const parsed = JSON.parse(rawToolOutput) as {
      citations?: Array<{ ref?: unknown; title?: unknown; sourceId?: unknown; relevance?: unknown }>;
      context?: unknown;
    };
    if (!Array.isArray(parsed.citations)) return undefined;
    const excerptByRef = new Map<string, string>();
    if (typeof parsed.context === 'string') {
      for (const block of parsed.context.split(/\n(?=\[K\d+\])/)) {
        const m = /^\[K(\d+)\]/.exec(block.trim());
        if (m) {
          const body = block.trim().replace(/^\[K\d+\][^\n]*\n?/, '').trim();
          if (body) excerptByRef.set(`K${m[1]}`, body.slice(0, 400));
        }
      }
    }
    const citations: KnowledgeCitationWire[] = [];
    for (const c of parsed.citations) {
      if (!c || typeof c.ref !== 'string') continue;
      citations.push({
        ref: c.ref,
        title: typeof c.title === 'string' ? c.title : '',
        sourceId: typeof c.sourceId === 'string' ? c.sourceId : undefined,
        relevance: typeof c.relevance === 'number' ? c.relevance : undefined,
        excerpt: excerptByRef.get(c.ref),
      });
    }
    return citations.length > 0 ? citations : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Parse a search_medical_references tool result JSON into structured web
 * citations ([S#]) — mirrors parseKnowledgeCitations so the chat client can
 * render [S1]/[S2] markers as clickable source chips plus a web-sources card
 * instead of the model dumping raw URLs into the answer text.
 */
function parseWebCitations(rawToolOutput: string): WebCitationWire[] | undefined {
  try {
    const parsed = JSON.parse(rawToolOutput) as {
      results?: Array<{ title?: unknown; url?: unknown; snippet?: unknown; host?: unknown; date?: unknown }>;
    };
    if (!Array.isArray(parsed.results)) return undefined;
    const citations: WebCitationWire[] = [];
    for (let i = 0; i < parsed.results.length; i += 1) {
      const r = parsed.results[i];
      if (!r || typeof r.url !== 'string' || !/^https?:\/\//i.test(r.url)) continue;
      citations.push({
        ref: `S${i + 1}`,
        title: typeof r.title === 'string' && r.title ? r.title : r.url,
        url: r.url,
        snippet: typeof r.snippet === 'string' ? r.snippet.slice(0, 400) : undefined,
        host: typeof r.host === 'string' ? r.host : undefined,
        date: typeof r.date === 'string' ? r.date : undefined,
      });
    }
    return citations.length > 0 ? citations : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Event contract emitted by the streaming agent runtime.
 *
 * The route layer listens to these events and transforms them into browser-facing
 * SSE messages such as text deltas, tool calls, plans, and completion.
 */
export type AgentRuntimeEvent =
  | { type: 'status'; model: string }
  | { type: 'token'; text: string }
  | { type: 'plan'; todos: unknown[] }
  | { type: 'tool_start'; tool: string; id?: string; args?: unknown }
  | { type: 'tool_end'; tool: string; id?: string; excerpt?: string; result?: string; status?: string; citations?: KnowledgeCitationWire[]; webCitations?: WebCitationWire[] }
  | { type: 'subagent'; name: string; event: 'started' | 'completed' }
  | { type: 'subagent_delta'; name: string; text: string }
  | { type: 'memory'; summaryTurnCount: number; episodes: Array<{ content: string; scope: string }> }
  | { type: 'approval_required'; approval: ApprovalWirePayload }
  | { type: 'clarification_required'; clarification: import('./types').ClarificationWirePayload }
  | { type: 'ui_actions'; actions: Array<Record<string, unknown>> }
  | { type: 'model_fallback'; from: string; to: string; reason: string }
  | { type: 'paused'; reason: 'awaiting_approval' }
  | { type: 'error'; error: string }
  | { type: 'done'; text: string; llmCalls?: number }
  | { type: 'generation_event'; event: DeepAgentEvent };

type AgentMessageChunk = {
  content?: unknown;
  tool_call_chunks?: Array<{ name?: unknown; id?: unknown; index?: unknown; args?: unknown }>;
  constructor?: { name?: string };
};

type AgentUpdate = {
  todos?: unknown[];
  messages?: unknown[];
};

/**
 * Resolve configuration for the MedQ agent backend.
 *
 * This function reads environment variables and normalizes them into a single
 * provider configuration so the runtime can support OpenAI, Ollama, and other
 * provider-prefixed model strings without changing the rest of the code.
 */
export function resolveMedQAgentConfig() {
  const rawDefaultModel = process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || process.env.DEFAULT_MODEL || 'gpt-4o-mini';
  const defaultModel = rawDefaultModel.includes(':') ? rawDefaultModel.split(':').slice(1).join(':') : rawDefaultModel;
  const providerPrefix = rawDefaultModel.includes(':') ? rawDefaultModel.split(':')[0] : 'openai';

  let baseUrl = process.env.MEDQ_AGENT_BASE_URL || process.env.OPENAI_BASE_URL || process.env.OLLAMA_BASE_URL || 'https://api.openai.com/v1';
  let apiKey = process.env.MEDQ_AGENT_API_KEY || process.env.OPENAI_API_KEY || '';
  let model = process.env.MEDQ_AGENT_MODEL || process.env.OPENAI_MODEL || defaultModel;

  if (!apiKey && providerPrefix === 'ollama') {
    apiKey = 'ollama';
    baseUrl = process.env.MEDQ_AGENT_BASE_URL || process.env.OLLAMA_BASE_URL || baseUrl;
  }

  if (!apiKey && process.env.DEFAULT_MODEL && process.env.DEFAULT_MODEL.startsWith('ollama:')) {
    apiKey = 'ollama';
    baseUrl = process.env.OLLAMA_BASE_URL || baseUrl;
    model = process.env.DEFAULT_MODEL.split(':').slice(1).join(':') || model;
  }

  if (providerPrefix === 'ollama' && !/\/v1$/i.test(baseUrl)) {
    baseUrl = `${baseUrl.replace(/\/$/, '')}/v1`;
  }

  return {
    baseUrl: baseUrl.replace(/\/$/, ''),
    apiKey,
    model,
  };
}

function providerConfig() {
  return resolveMedQAgentConfig();
}

/**
 * Default provider chain for the Deep Agent when the caller didn't pick a
 * concrete model (ModelPicker "Auto", scheduled runs, agents v0 callers):
 *
 *   1. MEDQ_AGENT_* / OPENAI_* env chain — the deployment's primary, e.g. the
 *      FreeLLM router (MEDQ_AGENT_BASE_URL=http://127.0.0.1:3000/v1 + the
 *      unified key + MEDQ_AGENT_MODEL=zai-llm)
 *   2. Managed Z.AI service (.z-ai-config — project / home / /etc), with the
 *      gateway's session headers attached
 *
 * Mirrors resolveAgentChatConfig (agent/config.ts), which already treats
 * "auto" as "no selection".
 */
function defaultDeepAgentProviderConfig(): { baseUrl: string; apiKey: string; model: string; defaultHeaders?: Record<string, string> } {
  const envConfig = providerConfig();
  if (envConfig.apiKey) return envConfig;
  const zai = zaiFallbackConfig();
  if (zai) {
    return { baseUrl: zai.baseUrl, apiKey: zai.apiKey, model: zai.model, defaultHeaders: zai.defaultHeaders };
  }
  return envConfig; // keyless → createMedQDeepAgent throws the actionable error
}

// ---------------------------------------------------------------------------
// save_question — bridge to the Generate tab's deep-agent capability
// ---------------------------------------------------------------------------
//
// The floating assistant (chat v2) could already AUTHOR questions through the
// multimodal-question-author subagent, but the result only lived in the chat
// transcript — nothing reached the question bank. This tool gives the CHAT
// agent the same write capability the Generate tab agent has
// (question-deep-agent.ts): every question the user asks to "add to my bank"
// is validated and persisted with the same field mapping, tagged 'chat-agent'.

const CHAT_DIFFICULTY_LEVELS = ['Easy', 'Basic', 'Medium', 'Moderate', 'Hard', 'Expert'] as const;
const CHAT_MAX_SAVES_PER_TURN = 8;

function createChatSaveQuestionTool(
  userId: string,
  saved: Array<Record<string, unknown>>,
  maxSaves = CHAT_MAX_SAVES_PER_TURN,
) {
  return new DynamicStructuredTool({
    name: 'save_question',
    description: [
      'Save ONE complete, finished exam question to the user\'s MedQ question bank.',
      'SECONDARY PATH: use this only when the user asks to save a question that was ALREADY written out in this conversation.',
      'For generating NEW questions and adding them to the bank, use run_question_generation_agent instead — it is the complete pipeline.',
      'A question only counts as "added to the bank" once this tool returns saved:true — never claim it was added otherwise.',
      'For MCQ questions provide 4-5 options and set answer to the full text of the correct option.',
    ].join(' '),
    schema: z.object({
      type: z.enum(['mcq', 'tf', 'short']).describe('Question type'),
      text: z.string().min(20).describe('The clinical vignette / question stem'),
      options: z.array(z.string()).default([]).describe('Answer options (MCQ only)'),
      answer: z.string().min(1).describe('The correct answer (full option text for MCQ)'),
      explanation: z.string().min(30).describe('Why the answer is correct and why distractors fail'),
      mnemonic: z.string().default('').describe('Optional memory aid'),
      clinicalPearl: z.string().default('').describe('Optional high-yield clinical pearl'),
      distractorAnalysis: z.string().default('').describe('Optional per-distractor analysis'),
      difficulty: z.string().default('Medium'),
      system: z.string().default('General').describe('Medical system (e.g. Cardiovascular, Endocrine)'),
      topic: z.string().default('').describe('Specific topic of the question'),
      tags: z.array(z.string()).default([]),
      imageUrl: z.string().default('').describe('Media URL returned by your media tools ONLY — never invented'),
      audioUrl: z.string().default('').describe('Media URL returned by your media tools ONLY — never invented'),
      illustrationDescription: z.string().default(''),
    }),
    func: async (q) => {
      if (saved.length >= maxSaves) {
        return JSON.stringify({ saved: false, reason: `Save limit for this turn reached (${maxSaves}). Summarize what you saved so far.` });
      }
      const type = ['mcq', 'tf', 'short'].includes(q.type) ? q.type : 'mcq';
      const options = Array.isArray(q.options)
        ? q.options.map((o) => String(o).slice(0, 400)).filter(Boolean)
        : [];
      if (type === 'mcq' && options.length < 2) {
        return JSON.stringify({ saved: false, reason: 'MCQ questions need at least 2 options. Fix and re-save.' });
      }
      if (type === 'mcq' && !options.includes(q.answer)) {
        return JSON.stringify({ saved: false, reason: 'The answer must be the full text of one of the options. Fix and re-save.' });
      }
      const difficulty = CHAT_DIFFICULTY_LEVELS.includes(q.difficulty as typeof CHAT_DIFFICULTY_LEVELS[number])
        ? q.difficulty
        : 'Medium';
      const tags = [
        q.topic || '',
        q.system || 'General',
        'chat-agent',
        ...(Array.isArray(q.tags) ? q.tags.map((t) => String(t).slice(0, 60)) : []),
      ]
        .filter(Boolean)
        .slice(0, 8);

      try {
        const record = await db.question.create({
          data: {
            type,
            text: String(q.text).slice(0, 6000),
            options: JSON.stringify(options.slice(0, 8)),
            answer: String(q.answer).slice(0, 800),
            explanation: String(q.explanation).slice(0, 6000),
            mnemonic: String(q.mnemonic || '').slice(0, 1000),
            clinicalPearl: String(q.clinicalPearl || '').slice(0, 1000),
            distractorAnalysis: String(q.distractorAnalysis || '').slice(0, 4000),
            difficulty,
            system: String(q.system || 'General').slice(0, 120),
            topic: String(q.topic || '').slice(0, 200),
            tags: JSON.stringify(tags),
            isAIGenerated: true,
            imageUrl: (q.imageUrl || '').slice(0, 1000),
            audioUrl: (q.audioUrl || '').slice(0, 1000),
            illustrationDescription: String(q.illustrationDescription || '').slice(0, 1000),
            reviewStatus: 'pending',
            reviewNotes: '',
          },
        });

        saved.push({ ...record, options, tags, savedBy: 'chat-agent' });
        return JSON.stringify({
          saved: true,
          id: record.id,
          index: saved.length,
          message: `Question ${saved.length} saved to the question bank (id ${record.id}, pending review). Continue with the next question or summarize.`,
        });
      } catch (err) {
        return JSON.stringify({ saved: false, reason: err instanceof Error ? err.message : 'database write failed' });
      }
    },
  });
}

// ---------------------------------------------------------------------------
// run_question_generation_agent — the COMPLETE generation agent as a tool
// ---------------------------------------------------------------------------
//
// This is the bridge the floating assistant uses to run the Generate tab's
// ENTIRE deep agent (question-deep-agent.ts): the sub-agent plans its own
// todos, retrieves grounding passages from the user's knowledge library,
// delegates authoring to the question-author subagent, generates media when a
// question needs it, and saves every finished question itself. While it runs,
// every inner event is forwarded through `onEvent` so the chat stream can push
// it to the browser live (plan, tool calls, subagent transitions, saves).

function createQuestionGenerationAgentTool(
  userId: string,
  onEvent?: (event: DeepAgentEvent) => void,
  modelString?: string,
  signal?: AbortSignal,
  /** When the OUTER chat agent is already running on the Z.AI fallback, the
   *  embedded generation agent should use it too — otherwise the inner run
   *  hammers the same storming primary the outer attempt just escaped. */
  providerOverride?: MedQProviderOverride,
) {
  return new DynamicStructuredTool({
    name: 'run_question_generation_agent',
    description: [
      'Launch the COMPLETE MedQ question-generation deep agent — the exact engine behind the Generate tab.',
      'The sub-agent plans its own todo list, retrieves grounding passages from the user\'s knowledge library, delegates authoring to a specialized question-author subagent, generates images/audio when a question requires media, and SAVES every finished question to the user\'s question bank (as pending review).',
      'Use this for ANY request to generate AND add/create/save questions to the bank, even for a single question. Do not author or save those questions through any other path.',
      'Its live activity (plan, tool calls, saves) is streamed to the user automatically — you do not need to narrate each internal step.',
      'After it returns, briefly summarize what was saved (count, topics, difficulty) and note the questions are pending review in the bank.',
    ].join(' '),
    schema: z.object({
      topic: z.string().min(3).describe('The medical topic for the questions'),
      system: z.string().default('General').describe('Medical system, e.g. Cardiovascular, Endocrine, Pharmacology'),
      types: z.array(z.enum(['mcq', 'tf', 'short'])).min(1).default(['mcq']).describe('Question types to generate'),
      difficulties: z.array(z.string()).min(1).default(['Medium']).describe('Difficulties such as Easy, Medium, Hard'),
      count: z.number().int().min(1).max(8).describe('How many questions to generate (max 8 per run)'),
      focusHint: z.string().default('').describe('Optional extra guidance for the generator, e.g. target the learner\'s weak areas, or repeat the user\'s media request such as "include an image with every question"'),
      weakTopics: z.array(z.string()).max(8).optional().describe('The learner\'s measured weak areas to target (e.g. from the injected weak-topics context or their quiz analytics), e.g. ["Diabetic ketoacidosis (Endocrine)", "Antiarrhythmics (Pharmacology)"]. Pass these through whenever the request references weak topics so the author drills the right areas.'),
      useKnowledgeBase: z.boolean().default(true).describe('Ground the questions in the user\'s own knowledge library (lecture notes, PDFs) when sources exist'),
    }),
    func: async (p) => {
      // Ownership filter: only the caller's own knowledge sources (RAG grounding).
      let knowledgeSourceIds: string[] = [];
      if (p.useKnowledgeBase) {
        try {
          const sources = await db.knowledgeSource.findMany({
            where: { userId },
            select: { id: true },
          });
          knowledgeSourceIds = sources.map((s) => s.id).slice(0, 20);
        } catch { /* grounding is best-effort */ }
      }

      const saved: Array<Record<string, unknown>> = [];
      let runError: string | null = null;
      try {
        // Dynamic import: avoids a module-init cycle with question-deep-agent
        // (that module imports resolveMedQAgentConfig from this file).
        // WithFallback adds the primary→Z.AI backup retry for storms.
        const { runDeepAgentQuestionGenerationWithFallback } = await import('./question-deep-agent');
        for await (const event of runDeepAgentQuestionGenerationWithFallback({
          topic: p.topic,
          system: p.system || 'General',
          types: p.types,
          difficulties: p.difficulties,
          count: p.count,
          focusHint: p.focusHint || undefined,
          weakTopics: p.weakTopics?.length ? p.weakTopics : undefined,
          knowledgeSourceIds,
          modelString,
          userId,
          signal,
          providerOverride,
        })) {
          onEvent?.(event);
          if (event.type === 'saved') saved.push(event.question);
          if (event.type === 'error') runError = event.error;
          // Stop consuming the moment the client aborts — the pipeline's own
          // signal checkpoints stop the agent at its next step.
          if (signal?.aborted) break;
        }
      } catch (err) {
        runError = err instanceof Error ? err.message : String(err);
      }
      if (signal?.aborted && runError === null) runError = 'cancelled by the user';

      return JSON.stringify({
        ok: runError === null,
        savedCount: saved.length,
        requestedCount: p.count,
        error: runError ?? undefined,
        questions: saved.map((q, i) => ({
          index: i + 1,
          id: String(q.id ?? ''),
          type: String(q.type ?? 'mcq'),
          system: String(q.system ?? ''),
          topic: String(q.topic ?? ''),
          difficulty: String(q.difficulty ?? ''),
          preview: String(q.text ?? '').slice(0, 140),
        })),
        note: runError
          ? runError.includes('cancel')
            ? 'The run was cancelled by the user — acknowledge the cancellation and mention how many questions (if any) were already saved.'
            : 'The generation agent reported an error — apologize and suggest retrying. Never fabricate saved questions.'
          : saved.length < p.count
            ? `Only ${saved.length} of ${p.count} questions were saved — tell the user honestly and suggest retrying for the remaining ones.`
            : 'Summarize what was saved (count + topics + difficulty) and remind the user the new questions are pending review in the question bank.',
      });
    },
  });
}

// ---------------------------------------------------------------------------
// Async event queue + merged stream iterator
// ---------------------------------------------------------------------------
//
// LangGraph's agent.stream() does NOT yield items while a tool executes. A
// plain for-await would therefore starve the chat SSE stream for the entire
// (multi-minute) generation run. The generation tool pushes inner events into
// this queue; mergeAgentStreamWithGenerationEvents() races the agent stream
// against the queue so inner events reach the client the moment they happen.

class AsyncEventQueue<T> {
  private items: T[] = [];
  private waiters: Array<{ resolve: (v: T | undefined) => void; cancelled: boolean }> = [];
  private closed = false;
  private waiterByPromise = new Map<Promise<T | undefined>, { resolve: (v: T | undefined) => void; cancelled: boolean }>();

  push(item: T): void {
    if (this.closed) return;
    this.items.push(item);
    this.pump();
  }

  close(): void {
    this.closed = true;
    this.pump();
    for (const waiter of this.waiters.splice(0)) waiter.resolve(undefined);
  }

  /** Deliver buffered items to the OLDEST NON-CANCELLED waiter. A cancelled
   *  waiter can never receive an item — this is what makes zombie consumers
   *  (see cancel) unable to steal events from the live consumer. */
  private pump(): void {
    while (this.items.length > 0) {
      const idx = this.waiters.findIndex((w) => !w.cancelled);
      if (idx < 0) return;
      const [waiter] = this.waiters.splice(idx, 1);
      waiter.resolve(this.items.shift() as T);
    }
  }

  /** Next buffered item, or undefined once the queue is closed and drained. */
  next(): Promise<T | undefined> {
    if (this.items.length > 0) return Promise.resolve(this.items.shift() as T);
    if (this.closed) return Promise.resolve(undefined);
    const record = { resolve: undefined as unknown as (v: T | undefined) => void, cancelled: false };
    const promise = new Promise<T | undefined>((resolve) => { record.resolve = resolve; });
    this.waiters.push(record);
    this.waiterByPromise.set(promise, record);
    return promise;
  }

  /** Cancel a pending next() call. Its promise resolves with undefined and
   *  its waiter is retired — it can never consume an item afterwards.
   *
   *  ZOMBIE-CONSUMER FIX (2026-10-24): the Z.AI provider fallback abandons
   *  the first attempt's merged iterator mid-await; its outstanding next()
   *  promise used to stay registered as a queue waiter and would STEAL
   *  exactly one event (observed live: the approval_required frame vanished
   *  this way whenever a 429 forced the fallback). The abandoned merge's
   *  finally block now cancels its pending waits, so only the live attempt
   *  consumes. No-op for already-settled promises. */
  cancel(promise: Promise<T | undefined> | null): void {
    if (!promise) return;
    const record = this.waiterByPromise.get(promise);
    if (!record) return; // already settled & cleaned up
    record.cancelled = true;
    const idx = this.waiters.indexOf(record);
    if (idx >= 0) {
      this.waiters.splice(idx, 1);
      record.resolve(undefined);
    }
    this.waiterByPromise.delete(promise);
  }
}

type MergedStreamItem =
  | { kind: 'agent'; mode: string; payload: unknown }
  | { kind: 'generation'; event: DeepAgentEvent }
  | { kind: 'approval'; event: AgentRuntimeEvent };

/** One resolved winner of the agent-stream vs generation-queue race. */
type RaceWinner =
  | { source: 'agent'; result: IteratorResult<[string, unknown]> }
  | { source: 'event'; result: DeepAgentEvent | undefined }
  | { source: 'approval'; result: AgentRuntimeEvent | undefined }
  | { source: 'abort' };

/**
 * Yields agent stream items and generation-queue events in true arrival order.
 *
 * The losing promise of each Promise.race is kept and reused on the next loop
 * iteration, so no items are lost or duplicated when both sources are active.
 * The queue is closed as soon as the agent stream finishes; any events still
 * buffered are drained before the iterator completes.
 *
 * An optional AbortSignal participates in the same race: the moment the client
 * disconnects, the iterator returns immediately instead of continuing to
 * consume a stream nobody is reading (which would keep the whole agent graph,
 * its tools, and the LLM gateway busy for minutes after a cancel).
 */
async function* mergeAgentStreamWithGenerationEvents(
  agentStream: AsyncIterable<unknown>,
  generationEvents: AsyncEventQueue<DeepAgentEvent>,
  signal?: AbortSignal,
  approvalEvents?: AsyncEventQueue<AgentRuntimeEvent>,
): AsyncGenerator<MergedStreamItem> {
  const iterator = (agentStream as AsyncIterable<[string, unknown]>)[Symbol.asyncIterator]();
  let pendingAgent: Promise<IteratorResult<[string, unknown]>> | null = null;
  let pendingEvent: Promise<DeepAgentEvent | undefined> | null = null;
  let pendingApproval: Promise<AgentRuntimeEvent | undefined> | null = null;
  let agentDone = false;
  let eventsDone = false;
  let approvalsDone = false;

  // Resolves once the signal fires (already-fired signals resolve immediately).
  const abortPromise: Promise<'aborted'> | null = signal
    ? new Promise<'aborted'>((resolve) => {
        if (signal!.aborted) resolve('aborted');
        else signal!.addEventListener('abort', () => resolve('aborted'), { once: true });
      })
    : null;

  try {
    for (;;) {
      if (agentDone && eventsDone && approvalsDone) return;
      if (!agentDone && pendingAgent === null) pendingAgent = iterator.next();
      if (!eventsDone && pendingEvent === null) pendingEvent = generationEvents.next();
      if (!approvalsDone && approvalEvents && pendingApproval === null) pendingApproval = approvalEvents.next();

      const racers: Array<Promise<RaceWinner>> = [];
      if (pendingAgent !== null) {
        racers.push(pendingAgent.then((result) => ({ source: 'agent' as const, result })));
      }
      if (pendingEvent !== null) {
        racers.push(pendingEvent.then((result) => ({ source: 'event' as const, result })));
      }
      if (pendingApproval !== null) {
        racers.push(pendingApproval.then((result) => ({ source: 'approval' as const, result })));
      }
      if (abortPromise !== null) {
        racers.push(abortPromise.then(() => ({ source: 'abort' as const })));
      }
      if (racers.length === 0) return;

      const winner = await Promise.race(racers);
      if (winner.source === 'abort') {
        // Client is gone: stop streaming immediately. The generation tool holds
        // the same signal and stops the inner agent at its next checkpoint.
        generationEvents.close();
        approvalEvents?.close();
        return;
      }
      if (winner.source === 'agent') {
        pendingAgent = null;
        if (winner.result.done) {
          agentDone = true;
          generationEvents.close(); // drain whatever is left, then finish
          approvalEvents?.close();
          continue;
        }
        const [mode, payload] = winner.result.value;
        yield { kind: 'agent', mode, payload };
      } else if (winner.source === 'approval') {
        pendingApproval = null;
        if (winner.result === undefined) {
          approvalsDone = true;
          continue;
        }
        logAgentEvent(
          'info',
          `[APPROVAL-BUS] merge yielding ${
            (winner.result as { type?: string }).type === 'clarification_required'
              ? `clarification ${(winner.result as { clarification?: { clarificationId?: string } }).clarification?.clarificationId?.slice(0, 10)}`
              : `approval ${(winner.result as { approval?: { approvalId?: string } }).approval?.approvalId?.slice(0, 8)}`
          }`,
        );
        yield { kind: 'approval', event: winner.result };
      } else {
        pendingEvent = null;
        if (winner.result === undefined) {
          eventsDone = true;
          continue;
        }
        yield { kind: 'generation', event: winner.result };
      }
    }
  } finally {
    // ZOMBIE-CONSUMER FIX (2026-10-24): this iterator is exiting — normally,
    // through an error (the Z.AI fallback abandons attempt 1 mid-await), or
    // via for-await return() when the consumer's own body throws. Whatever
    // the exit path, retire our outstanding queue waits so the NEXT merged
    // iterator is the sole consumer. Without this, the abandoned attempt's
    // pending next() promises stayed registered as queue waiters and each
    // stole exactly one queued event — observed live as approval_required
    // frames vanishing whenever a 429 forced the provider fallback.
    // cancel() is a no-op for settled promises, so normal exits are safe.
    generationEvents.cancel(pendingEvent);
    approvalEvents?.cancel(pendingApproval);
    // Close the underlying agent-stream iterator too: when this merged
    // iterator is abandoned EARLY (the ask_user hard stop below, the provider
    // fallback abandonment, a consumer throw), the LangGraph stream would
    // otherwise stay open with a pending next() parked at its next yield —
    // its in-flight model request and graph task linger until GC. return()
    // is a no-op on the normal-completion path (iterator already done).
    try { void iterator.return?.(); } catch { /* already closed */ }
  }
}

/**
 * Build the deep-agent instance for one conversation turn.
 *
 * The caller may override the model, user, or thread context here, but the core
 * behavior remains the same: attach a medical system prompt, add the subagent,
 * and register the multimodal tools used during the session.
 */
export async function createMedQDeepAgent(options: DeepAgentStreamOptions = {}) {
  // "auto" (or a blank string) means "no selection" — the ModelPicker's Auto
  // option and resolveAgentChatConfig use the same contract. It must NOT be
  // forwarded to resolveModel: parseModelString("auto") maps it to the zai
  // provider with model id "auto", which resolves keyless on deployments
  // without a managed Z.AI config and surfaced as the cryptic "Configure
  // MEDQ_AGENT_API_KEY or OPENAI_API_KEY…" error.
  const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';

  const config = options.providerOverride
    ? options.providerOverride
    : requested && requested !== 'auto'
      ? await resolveModel({ modelString: requested, userId: options.userId ?? undefined })
        .then((resolved) => {
          if (resolved.apiKey) {
            // Z.AI's gateway authenticates with session headers, not just
            // Bearer — resolveModel's zai branch carries the key/URL but not
            // the headers, so attach them here.
            const zai = resolved.providerId === 'zai' ? readZaiConfig() : null;
            return zai ? { ...resolved, defaultHeaders: zaiGatewayHeaders(zai) } : resolved;
          }
          // Picked model resolved keyless (unknown provider, no BYOK
          // endpoint) — degrade to the default chain instead of failing the
          // turn with an env-vars error that doesn't match the symptom.
          logAgentEvent('info', `Model "${requested}" resolved without an API key — using the default agent provider`);
          return defaultDeepAgentProviderConfig();
        })
        .catch((error) => {
          logAgentEvent('info', `Model "${requested}" could not be resolved — using the default agent provider: ${error instanceof Error ? error.message : String(error)}`);
          return defaultDeepAgentProviderConfig();
        })
      : defaultDeepAgentProviderConfig();
  if (!config.apiKey) {
    throw new Error(
      'The MedQ agent has no LLM provider configured. Set MEDQ_AGENT_API_KEY ' +
        '(the FreeLLM unified key from the Keys page, together with MEDQ_AGENT_BASE_URL and MEDQ_AGENT_MODEL) ' +
        'or OPENAI_API_KEY, or configure .z-ai-config (Z.AI), to use the Deep Agent backend.',
    );
  }

  const defaultHeaders: Record<string, string> | undefined =
    'defaultHeaders' in config && config.defaultHeaders
      ? (config.defaultHeaders as Record<string, string>)
      : undefined;
  // Built separately so TS keeps the ClientOptions shape (a conditional
  // spread widens defaultHeaders to {} and fails the overload).
  const modelConfiguration: { baseURL?: string; defaultHeaders?: Record<string, string> } = {
    baseURL: config.baseUrl,
  };
  if (defaultHeaders) modelConfiguration.defaultHeaders = defaultHeaders;

  const model = new ChatOpenAI({
    apiKey: config.apiKey,
    model: 'modelId' in config ? config.modelId : config.model,
    temperature: 0.4,
    configuration: modelConfiguration,
    // The shared z.ai gateway intermittently 429-storms (returns 500 wrapping
    // "Too many requests"). The openai client retries 5xx/429 with exponential
    // backoff when maxRetries is raised — default 2 gives up too fast during
    // short storms, so brief outages self-heal instead of failing the chat.
    maxRetries: 4,
    // Request-level timeout (2026-10-25): a gateway that ACCEPTS the
    // connection but never answers used to park the turn forever — the
    // client's 3-minute no-data watchdog then aborted with "the AI provider
    // may be rate-limited or unreachable". Timing out the request surfaces
    // the error to the retry/fallback ladders instead (modelRetryMiddleware
    // → the Z.AI backup rung), so a hung call self-heals.
    timeout: 180_000,
  });
  const ctx: MedQToolContext = {
    userId: options.userId ?? options.threadId ?? 'guest',
    threadId: options.threadId,
  };

  // ── Per-task model routing: the FAST model ──
  // Routine auxiliary workloads (utility subagents, thread titles, chat
  // unread digests) run on a cheaper/faster model than the main reasoning
  // loop. Shared builder in provider/fast-model.ts keeps the routing rules in
  // one place — including the BYOK safety rule: when the user hand-picks a
  // model on a provider that is not the operator gateway and no explicit
  // fast endpoint/key is configured, the fast model is skipped and auxiliary
  // tasks inherit the picked model (nothing points glm-4.5-flash at a foreign
  // provider that does not serve it).
  const fastModel = buildFastModel(
    // A provider config without baseUrl (default endpoint) cannot be forwarded
    // as the fast model's primary — pass null so it falls back to the env chain.
    config.baseUrl ? { baseUrl: config.baseUrl, apiKey: config.apiKey, defaultHeaders } : null,
  );

  // ── Complete generation agent (Generate-tab engine) as a chat tool ──
  // This is the primary question-creation path for the floating assistant:
  // the chat agent delegates the WHOLE job (planning, RAG, subagent authoring,
  // media, saving) to the generation deep agent and narrates the result.
  // The request signal flows into the tool so a client cancel stops the inner
  // agent instead of letting it grind the LLM gateway in the background.
  const generationAgentTool = options.userId
    ? createQuestionGenerationAgentTool(
      options.userId,
      options.onGenerationEvent,
      options.modelString,
      options.signal,
      // When the chat turn itself is already on the Z.AI fallback (attempt 2
      // in streamMedQDeepAgent), the embedded generation agent must use it
      // too — its own ChatOpenAI would otherwise hit the storming primary.
      options.providerOverride,
    )
    : null;

  // ── save_question bridge (secondary: single saves of written-out questions) ──
  // Only signed-in users get the tool — guests cannot own bank entries.
  // `saved` is per-turn (createMedQDeepAgent is invoked once per chat turn),
  // so the cap and the tool's own feedback stay request-scoped.
  const chatSaved: Array<Record<string, unknown>> = [];
  const saveQuestionTool = options.userId
    ? createChatSaveQuestionTool(options.userId, chatSaved)
    : null;

  // ── MCP tools (DB-configured external servers) ──
  // Loads the user's enabled AgentMcpServer rows, connects and lists their
  // tools. Never throws — a broken server degrades to a log line + its DB
  // status flips to 'error'. Runs BEFORE the system prompt so the prompt can
  // tell the model which external tools exist this turn.
  ensureMedQHarnessProfile(typeof config.model === 'string' ? config.model : undefined);
  let mcpTools: DynamicStructuredTool[] = [];
  let mcpSummary: string | null = null;
  if (options.userId) {
    const mcp = await buildMcpTools(options.userId).catch(() => ({ tools: [], summary: null, errors: [] }));
    mcpTools = mcp.tools;
    mcpSummary = mcp.summary;
    for (const error of mcp.errors) {
      logAgentEvent('error', `MCP: ${error}`);
    }
  }

  const systemPrompt = [
    'You are MedQ Agent, a rigorous medical education assistant.',
    'Give educational explanations, distinguish established facts from uncertainty, and remind users to check current clinical guidance when relevant.',
    'Use your todo list for multi-step requests and provide a concise final answer.',
    'Do not present your response as a diagnosis or individualized treatment plan.',
    'You have a PERSISTENT personal workspace with file tools (ls, read_file, write_file, edit_file, glob, grep). Files you write there survive across conversations — use them for study notes, drafts, working documents and any output the learner may want later instead of pasting long content into chat. Reference saved files by their path so the learner can ask you to read them back.',
    'Your enabled skills are listed in the skills catalog (progressive disclosure): read a skill\'s SKILL.md with load_skill only when the task matches it, then follow its workflow.',
    'For question generation, delegate the authoring work to the multimodal-question-author subagent with the task tool. Do not write those questions directly.',
    'For evidence work, delegate to the literature-researcher subagent with the task tool whenever the request needs a multi-source evidence sweep — "what do current guidelines say about X", "compare these treatments", "find recent evidence", literature summaries with citations. It returns a structured, cited findings digest you synthesize for the learner; keep its [S#] source markers intact in your answer.',
    'For study planning, delegate to the study-coach subagent with the task tool whenever the learner wants a study plan, a study schedule, or asks "what should I focus on?" — it measures their real quiz performance, pulls the exam blueprint, checks their flashcard backlog, and creates the visible task list. Review and present its plan; do not hand-build plans from guessed weaknesses yourself.',
    'For anything about the learner\'s Messages tab, delegate to the communicator subagent with the task tool: listing their chat rooms and unread counts, summarizing/digesting a flooded group chat (it extracts meetings, exam schedules and deadlines as structured events and can push-notify them), reading recent messages, sending messages or DMs, or creating groups. It resolves rooms, digests unread floods and drafts sends — the learner approves every outgoing message.',
    generationAgentTool
      ? 'You have the run_question_generation_agent tool: the COMPLETE question-generation deep agent (the same engine as the Generate tab) — it plans its own work, grounds itself in the user\'s knowledge library, delegates authoring to a question-author subagent, generates media when needed, and saves every question to the question bank as pending review. Whenever the user wants questions generated AND added to their bank, ALWAYS use this tool with the requested parameters (topic, system, types, difficulties, count) — never author or save those questions through another path. Its live activity is shown to the user automatically. When the user asks for images, illustrations, or other media with their questions, repeat that requirement verbatim in the focusHint parameter (e.g. focusHint: "the user requested an image with every question") so the generation agent actually produces the media. When the request (or the injected scheduled-task context) references the learner\'s weak topics, pass those areas through the weakTopics parameter as well so the author drills exactly the right material.'
      : 'Question generation is available, but saving to the question bank requires a signed-in account — mention this if the user asks to add questions to their bank.',
    saveQuestionTool && generationAgentTool
      ? 'Use save_question ONLY when the user explicitly asks to save a single question that was already written out in this conversation.'
      : '',
    'When generate_medical_illustration returns an image URL, ALWAYS embed that image in your final reply using markdown image syntax — ![short description](url) — so the learner sees the illustration rendered inline in the chat panel instead of a bare URL.',
    'Never paste raw tool output JSON into your reply. After a tool returns, summarize its outcome in plain prose (what was saved/found, counts, key facts) — the user already sees each tool call and result in the activity timeline.',
    // ── Anti-fabrication guard (2026-10-25) ──
    // Observed live: on long-context turns the model produced a full
    // "✅ Infographic Created Successfully!" report WITHOUT calling any tool,
    // fabricating deliverable paths — because earlier turns in the history
    // ended that way. State the rule as a hard invariant.
    'HARD RULE — no fabricated deliverables: NEVER state or imply that an image, file, flashcard, skill, artifact, document, or any other deliverable was created, saved, or generated unless you called the corresponding tool IN THIS TURN and it returned success. File paths, image URLs, and artifact links may ONLY come from actual tool results of this turn — never from memory of earlier turns and never invented. If you have not yet run the tool, either call it now or tell the learner what you are about to do — do not write the success report first. If a tool call fails or times out, say so honestly and offer to retry.',
    options.userId
      ? 'You have schedule_task and list_scheduled_tasks. Whenever the user wants recurring automation — "every Sunday at 9pm generate 20 MCQs on my weak topics", "daily pharmacology micro-quiz", "remind me before my exam" — create a schedule_task (5-field cron + IANA timezone; default the timezone to the user\'s if they mention local times) instead of doing the work once. For weak-topic phrasing, keep it verbatim in the prompt: the runner injects their real weakest topics at fire time. Completed runs notify the user automatically.'
      : '',
    options.userId
      ? 'You have search_knowledge: hybrid semantic+keyword retrieval with [K#] citations over the user\'s own knowledge library (uploaded PDFs, lecture notes, transcripts). When the user references material they uploaded or asks for answers grounded in their library, search it FIRST (before web search) and cite passages as [K1], [K2]. When they attach a document in chat, it is ingested automatically — tell them it\'s now part of their knowledge library.'
      : '',
    'When you call search_medical_references, cite each source inline as [S1], [S2]… markers right after the claim it supports. NEVER paste raw URLs into your reply text — the interface renders [S#] markers as clickable source chips and lists every URL in a Web sources card automatically. search_medical_references is for textual evidence (facts, guidelines, papers, atlases as reading material). When the user wants to SEE actual images — "search for heart images", "find me images/diagrams/photos/histology slides/radiographs of X", the Image search skill, or ANY request to find or show real pictures online — call search_medical_images instead (do not generate images for that). After it returns, ALWAYS embed the most relevant images (typically 2-4, best quality) in your final reply using markdown image syntax — ![short caption](imageUrl) — with the imageUrl values the tool returned (they are local copies that always render); name the source site under or next to each image, and never answer an image-finding request with a list of website links alone.',
    'You have search_medical_videos and analyze_video_material: when the user wants to FIND videos online ("find a video on lumbar puncture", "search for cardiac auscultation tutorial videos") call search_medical_videos — it returns ranked results with direct video URLs (plus thumbnails + source pages) which you cite as [V1], [V2]… inline. When the user SHARES a video (uploads one in chat, or pastes a direct mp4/mov URL) and asks about its content ("what is shown", "describe the steps", "what anatomical structure is being demonstrated"), call analyze_video_material with the URL or attachment:// reference — it returns a timestamped summary the agent can answer "what happens at 2:30?" style questions against. For longer uploaded recordings (>2 min) the tool falls back to frame-sampling (ffmpeg → evenly-spaced frames → per-frame VLM description). For best results, after analyzing a video, summarize its key teaching points in prose AND embed the most informative thumbnail if one was returned by search_medical_videos.',
    'You have create_word_document with RICH FORMATTING: in addition to ## headings, bullets, and numbered lists, you can use colored callout boxes for clinical emphasis and embedded images. The callout syntax (markdown blockquote + emoji prefix) renders as a colored, bordered, shaded box in the .docx: > ⚠️ Caution: <text> (red — contraindications, severe ADRs, do-not-do rules), > 💡 Pearl: <text> (green — high-yield exam pearls, mnemonics), > 📌 Note: <text> (blue — general clarifications, definitions), > 🎯 Key Point: <text> (purple — must-remember takeaways), > ⚡ Warning: <text> (orange — red-flag symptoms, emergency signs), > 📚 Reference: <text> (gray — citations, source attribution). Inline **bold** and *italic* are preserved (use bold for drug names / doses / key terms). Embed images from search_medical_images or generate_medical_illustration results using ![caption](imageUrl) — they download and embed in the .docx automatically. Use 1–3 callouts per page for emphasis (too many dilutes their impact), and ALWAYS include at least one image on topics where a visual aid clearly helps (anatomy, histology, radiology, procedures). For multi-source study guides, synthesize content from search_medical_references (text), search_medical_images (figures), search_medical_videos (procedural demonstrations), and the user\'s uploaded library (search_knowledge) into a single coherent document with proper attribution.',
    'When the user attaches MULTIPLE files in one message, treat them as one coherent study set: analyze them together and cross-reference (e.g. merge lecture notes + slides into a single unified guide), separating them only when the request clearly targets one specific file.',
    'You have ask_user: whenever you would ask the learner a clarifying question in plain text — STOP, do not write the question in prose. Call ask_user instead with ONE focused question and structured inputs (multiselect = checkboxes for pick-several, radio or select = pick-one with concrete options, text for free-form). The learner answers through an interactive form card and their answers arrive as the next message. After ask_user returns, END YOUR TURN immediately — no further tool calls, no answering for them, no re-asking in text. HARD RULE: any mid-conversation question to the learner (which topics, how many questions, what format, what difficulty, preferences, choices between options, missing parameters) goes through ask_user, never through plain-text replies. When the request is already clear, just proceed — do not quiz the learner unnecessarily.',
    'You have ui_action: you can OPERATE the app on the learner\'s screen. Use it whenever they ask you to open/show/go to something ("open the question bank", "show my flashcards", "take me to the exam simulator") or when navigating for them obviously helps right after you produced something (saved questions → navigate to the bank; created flashcards → navigate to flashcards). One call takes 1-6 action objects: {"type":"navigate","target":"bank"} (tab keys: home, bank, generate, flashcards, exams, messages, insights, create), {"type":"switch_tab","tabId":"..."}, {"type":"open_dialog","dialogId":"..."}, {"type":"autofill_form","formId":"...","values":{...}}, {"type":"click_button","selector":"..."}, {"type":"highlight_element","selector":"...","message":"why this matters"}, {"type":"scroll_to","selector":"..."}. The actions execute live on their screen and receipts appear under your message — describe in one short sentence what you opened/did, and never claim an action beyond what you dispatched. Do NOT use ui_action to read data (use your data tools) — it only drives the screen. The learner\'s current tab arrives in the message envelope as "Active MedQ tab".',
    options.userId
      ? 'You have create_flashcards and flashcard_review_status. Whenever the user wants flashcards — "make flashcards from this" lecture/summary/document, mnemonics as cards, vocab drilling — call create_flashcards with concise front/back pairs batched in ONE call (up to 30). Cards enter the SM-2 spaced-repetition queue and are due immediately on the Flashcards page. When the user asks about their review backlog or you are planning a study session, check flashcard_review_status first.'
      : '',
    options.userId
      ? 'You have analyze_my_weaknesses: the learner\'s REAL quiz performance (accuracy by topic and organ system, attempt counts). Call it before ANY personalized study plan or "what should I focus on?" answer, then offer targeted follow-ups: a micro-drill via run_question_generation_agent on their worst topics, or a recurring schedule_task (weekly weak-topic quiz). Never guess weaknesses from conversation when you can measure them.'
      : '',
    // ── Newly registered capabilities (audit sprint) ──
    'You have run_code: sandboxed computation for exact numeric answers (dose math, unit conversions, biostatistics). ALWAYS use it instead of mental arithmetic for any non-trivial medical calculation.',
    'You have browser_snapshot and browser_interact: a sandboxed browser for structural page exploration (what a site offers, its sections and resources). For reading one article, prefer fetch_medical_reference.',
    options.userId
      ? 'You have task_create / task_update / task_list: a persistent, learner-visible task list for multi-step study plans — create tasks for each milestone and keep their statuses current.'
      : '',
    options.userId
      ? 'You have start_background_task / check_background_task / update_background_task / cancel_background_task / list_background_tasks: background agent tasks that run detached from this conversation. Use them for long-running work (deep research, large generation batches) — start the task, tell the learner it runs in the background (they get a notification with the result), and check it with check_background_task when they ask for status.'
      : '',
    options.userId
      ? 'You have manage_skills: create, IMPROVE, or delete reusable skills in the learner\'s personal skill library. When the learner asks to save a workflow as a skill ("remember this approach"), CREATE it — the skill appears in your catalog on the next turn. SELF-IMPROVEMENT LOOP: whenever a skill you used showed gaps in this run — missing steps you had to figure out, wrong or hallucinated tool names, unclear output format, constraints you discovered the hard way (e.g. a read-only path, a needed approval, a length limit) — IMPROVE it: pass the skill name, a short findings note describing the gaps, and the FULL rewritten body with the lessons baked in. The previous version is snapshotted to restorable history and the improved version is what you load next time. Do this whenever the learner asks you to improve/refine/update a skill, and proactively OFFER it (then apply on confirmation) when a run needed corrections. Built-in skills cannot be modified — if one needs tailoring, create a personal variant with your enhancements (e.g. "canvas-design-v2").'
      : '',
    mcpSummary
      ? `You have MCP tools from the learner's connected servers (names start with mcp__). ${mcpSummary} Each call runs on an external system the learner connected — use them when the task matches their purpose.`
      : '',
    'You have get_exam_blueprint: approximate published content weights for USMLE Step 1/2CK/3 and NCLEX-RN/PN. For ANY exam study-plan request, call it (pass weeksAvailable when known) and allocate study weeks proportional to the exam weights, boosting the learner\'s measured weak areas further when analyze_my_weaknesses data is available. Remind the learner to verify the exact weights against the current official test plan (USMLE.org / NCSBN).',
    // ── Long-term memory recall ──
    // Rendered by streamMedQDeepAgent via buildMemoryContext(userId, message):
    // the most relevant saved memories for THIS upcoming message, injected so
    // the agent starts the turn already knowing what it learned about the user
    // (profile layer, study struggles, facts from past conversations) without
    // needing to call search_memory first.
    ...(options.memoryContext ? [options.memoryContext] : []),
  ].filter(Boolean).join('\n');

  // ── Persistent per-user filesystem + skills (deepagents parity) ──
  // The agent's file tools (ls/read_file/write_file/edit_file/glob/grep) run
  // against the user's jailed workspace directory instead of the default
  // in-memory StateBackend — files written in one turn are readable in the
  // next, and across conversations. virtualMode jails every path inside the
  // root (traversal rejected by the backend itself, on top of the workspace
  // service's own NUL/lexical/symlink checks).
  // Enabled AgentSkill rows are synced into <workspace>/skills/<name>/SKILL.md
  // so the harness's skills middleware (progressive disclosure: catalog at
  // startup, load_skill on demand) picks them up.
  //
  // COMPOSITE ROUTING (docs parity): agent internals — the summarization
  // middleware's /conversation_history/ files — are routed to a SEPARATE
  // persistent directory OUTSIDE the user-facing jail, so the model's file
  // tools never list or mix them with the learner's own files. The framework
  // itself keeps writing them transparently through the same backend.
  const fsUserId = options.userId ?? 'guest';
  let workspaceBackend: FilesystemBackend | CompositeBackend | null = null;
  // memoryMiddleware (docs' AGENTS.md pattern): built when the jailed
  // workspace backend is available; declared out here so the createDeepAgent
  // call below can append it to the middleware array.
  let memoryMiddleware: AgentMiddleware | null = null;
  try {
    const workspaceDir = ensureAgentWorkspace(fsUserId);
    // AGENTS.md — the user's persistent instruction file. Seeded once so it
    // always exists (the docs' memory pattern: loaded into the system prompt
    // at startup, maintained by the agent via edit_file on request, visible
    // and deletable in the Files drawer like any other workspace file).
    const agentsMdPath = path.join(workspaceDir, 'AGENTS.md');
    if (!fs.existsSync(agentsMdPath)) {
      fs.writeFileSync(agentsMdPath, AGENTS_MD_TEMPLATE, 'utf8');
    }
    const userBackend = new FilesystemBackend({
      rootDir: workspaceDir,
      virtualMode: true,
    });
    // File-backed long-term instructions (docs' `memory` param — wired via
    // the exact underlying createMemoryMiddleware API). Complements MedQ's
    // DB-backed episodic memory: AGENTS.md is USER-authored persistent
    // instructions, memoryContext recalls agent-extracted episodes.
    memoryMiddleware = createMemoryMiddleware({
      backend: userBackend,
      sources: ['AGENTS.md'],
    });
    // Internal store: sibling dir of the jail (not reachable through the
    // user-facing root), still persistent across conversations.
    const internalDir = path.join(agentWorkspaceRoot(fsUserId), 'internal');
    fs.mkdirSync(internalDir, { recursive: true });
    const internalBackend = new FilesystemBackend({ rootDir: internalDir, virtualMode: true });
    workspaceBackend = new CompositeBackend(userBackend, {
      '/conversation_history': internalBackend,
    });
  } catch {
    workspaceBackend = null; // fall back to the framework default in-memory backend
  }
  const skillsSync = await syncSkillsToWorkspace(fsUserId).catch(() => ({ skillsPath: null, count: 0 }));

  // ── THE registry (single source of truth) ──
  // One builder assembles the chat agent's complete tool set AND wraps every
  // tool with the HITL gate + AgentToolExecution telemetry. Built BEFORE the
  // createDeepAgent call so the domain subagents below can share the exact
  // same gated/telemetry-wrapped instances (a subagent calling a gated tool
  // flows through the same approval card as the main agent).
  const chatTools = buildChatAgentTools({
    ctx,
    userId: options.userId ?? null,
    multimodalTools,
    abortSignal: options.signal,
    generationAgentTool,
    saveQuestionTool,
    mcpTools,
    fastModel,
    hitl: options.hitl,
  });
  const pickChatTools = (...names: string[]) => chatTools.filter((tool) => names.includes(tool.name));

  // ── Domain subagents (docs' subagents pattern: narrow specialists with
  // their own prompts + tool subsets, dispatched via the task tool). Both
  // tool sets are read-mostly: search/fetch/analyze/blueprint/task-list —
  // side-effectful capabilities stay on the main agent's mediated path. ──

  /** Evidence specialist: multi-source web + knowledge-library sweeps with
   * citations. Runs on the PRIMARY model — synthesis quality is the product. */
  const literatureResearcher: SubAgent = {
    name: 'literature-researcher',
    description:
      'Gathers and cites current medical evidence from the web and the learner\'s knowledge library for a focused clinical question — evidence sweeps, guideline checks, treatment comparisons, literature summaries.',
    systemPrompt: [
      'You are the Literature Researcher for MedQ.',
      'Given ONE focused question, gather evidence from multiple sources: search_medical_references for current evidence and guidelines, fetch_medical_reference to read one known article in full, search_knowledge when the learner\'s own uploaded material is relevant, and search_medical_images only when a visual is specifically needed.',
      'Prefer 3-6 high-quality, recent sources; cross-check claims across at least two when they are consequential.',
      'Return a structured findings digest: (1) a 2-3 sentence bottom line, (2) key findings as bullets, each tagged with [S1], [S2]… source markers matching the search results, (3) source list with titles and URLs, (4) open questions or contradictions between sources when present.',
      'Never invent a source, statistic, or guideline recommendation. When evidence is thin or conflicting, say so explicitly.',
      'Do not answer beyond the delegated question and do not write files — return the digest as your final message.',
    ].join('\n'),
    tools: pickChatTools('search_medical_references', 'fetch_medical_reference', 'search_medical_images', 'search_knowledge'),
  };

  /** Study-plan specialist: measures real performance and writes the visible
   * plan. Runs on the FAST model — routine synthesis where token cost
   * matters more than frontier reasoning (per-task model routing). */
  const studyCoach: SubAgent = {
    name: 'study-coach',
    description:
      'Builds a data-grounded study plan: measures the learner\'s real quiz performance, pulls the exam blueprint, checks their flashcard backlog, and creates the visible task list with priorities and milestones.',
    systemPrompt: [
      'You are the Study Coach for MedQ.',
      'ALWAYS measure before planning: call analyze_my_weaknesses first for the learner\'s real accuracy by topic and system, then get_exam_blueprint for the target exam\'s content weights, then flashcard_review_status for their review backlog.',
      'Allocate study time proportional to the exam blueprint weights, boosting the learner\'s measured weak areas further. Weakest topics get the earliest, most frequent slots.',
      'Create the plan as visible tasks with task_create (one per study block or milestone: topic, why it matters, target date) and keep statuses current with task_update as you finish.',
      'Return a concise plan summary: total weeks, the top 5 focus areas with the measured accuracy that justified each, the weekly rhythm, and how the flashcard backlog is folded in.',
      'If measurement tools return no data (new learner), say so and build a sensible blueprint-weighted starter plan instead of guessing weaknesses.',
      'Do not write files or generate questions — planning and task creation only.',
    ].join('\n'),
    tools: pickChatTools('analyze_my_weaknesses', 'get_exam_blueprint', 'flashcard_review_status', 'task_create', 'task_update', 'task_list'),
    // Per-task model routing (SubAgent.model): routine synthesis on the
    // fast/cheap model; omit when disabled → inherits the primary model.
    ...(fastModel ? { model: fastModel } : {}),
  };

  /** Communication specialist: the Messages tab as an agent — reads rooms,
   *  digests unread floods, drafts and sends messages/DMs/groups (sends stay
   *  HITL-gated even inside the subagent: the approval card flows to the
   *  user exactly like a main-agent send). Runs on the PRIMARY model —
   *  drafting messages other humans will read is quality-sensitive. */
  const communicator: SubAgent = {
    name: 'communicator',
    description:
      'Handles everything about the learner\'s Messages tab: lists rooms and unread counts, digests a flooded group chat into key points and extracted events (meetings, exam schedules, deadlines), reads recent messages, and drafts + sends messages, direct messages and new groups on the learner\'s behalf.',
    systemPrompt: [
      'You are the Communicator for MedQ — the learner\'s messaging assistant.',
      'ALWAYS call list_chat_rooms first to resolve room names/ids and see unread counts.',
      'For rooms with many unread messages, call summarize_unread_messages (it returns a digest plus structured events). Present the digest faithfully: overview, key topics, decisions, and the events (meetings, exam schedules, deadlines) with their dates.',
      'When events matter, offer to send each as a push notification via send_push_notification (one per event, short title + the date/time in the body) — the learner approves each send.',
      'To send anything, draft the message from the learner\'s ACTUAL words and intent — never invent content. Sends require the learner\'s approval and go out exactly as approved.',
      'For a new DM use start_direct_message (resolve the exact person first); for a new group use create_chat_group (exact member names).',
      'Reading never marks rooms as read — the learner\'s unread badge is untouched unless they ask.',
      'Return a concise report: what you read/digested, what was sent (room + message), and any events you flagged.',
    ].join('\n'),
    tools: pickChatTools(
      'list_chat_rooms',
      'read_chat_messages',
      'summarize_unread_messages',
      'send_chat_message',
      'start_direct_message',
      'create_chat_group',
      'send_push_notification',
    ),
  };

  return {
    model: typeof config.model === 'string'
      ? config.model
      : 'modelId' in config ? config.modelId : 'configured model',
    agent: createDeepAgent({
      name: 'medq-agent',
      model,
      systemPrompt,
      subagents: [multimodalQuestionAuthor, literatureResearcher, studyCoach, communicator],
      // Persistent jailed filesystem with internal routing (null → framework
      // default in-memory).
      ...(workspaceBackend ? { backend: workspaceBackend } : {}),
      // Filesystem permissions (docs parity): the model's FILE TOOLS may not
      // touch agent internals, and skills are authored exclusively through
      // manage_skills (DB is the source of truth — direct writes would drift
      // from the synced catalog). Middleware writes via the backend API
      // bypass these tool-level rules, so summarization still works.
      permissions: [
        { operations: ['read', 'write'], paths: ['/conversation_history/**'], mode: 'deny' },
        { operations: ['write'], paths: ['/skills/**'], mode: 'deny' },
      ],
      // Skill packs (progressive disclosure) — only when the sync produced any.
      ...(skillsSync.skillsPath ? { skills: [skillsSync.skillsPath] } : {}),
      // ── Middleware stack (docs parity: fault tolerance + planning +
      // interpreter + AGENTS.md memory) ──
      // Applied AFTER the framework's standard middleware (filesystem,
      // skills, subagents, summarization) — they compose, not replace.
      middleware: [
        // FAULT TOLERANCE (docs' resilience page):
        // • tool-error containment — a tool that THROWS (zod arg validation,
        // runtime crash) becomes an error ToolMessage the model can recover
        // from, instead of killing the whole graph run (observed: the second
        // task_update call with a cross-vocabulary status enum escaped
        // ToolNode's catch and failed the turn). LangGraph control-flow
        // signals (interrupts/cancels) always propagate, never converted.
        toolErrorMiddleware({
          onError: (error, request) => {
            // Abort/cancel must propagate — converting it would make an
            // aborted run look like a recoverable tool failure and the
            // model would keep generating.
            const name = error instanceof Error ? error.name : '';
            const message = error instanceof Error ? error.message : String(error);
            if (name === 'AbortError' || /abort|cancel/i.test(message.slice(0, 60))) return;
            return `[${request.toolCall.name}] failed: ${name || 'Error'}: ${message.slice(0, 400)} — fix the arguments and retry, or continue without this tool and say what you could not do.`;
          },
        }),
        // • model retries with exponential backoff — transient provider 429s
        //   (the Z.AI gateway storms) now recover INSIDE the same model call
        //   instead of failing the turn to the fallback chain. onFailure
        //   'error' re-raises after exhaustion so MedQ's Z.AI fallback loop
        //   still engages cleanly (attempt-2 rebuild on the backup provider).
        modelRetryMiddleware({
          maxRetries: 2,
          backoffFactor: 2,
          initialDelayMs: 1000,
          maxDelayMs: 8000,
          jitter: true,
          onFailure: 'error',
        }),
        // • runaway-run circuit breakers (docs' call-limit pattern). runLimit
        //   resets each turn; threadLimit needs a checkpointer so it is not
        //   set (MedQ's event-replay reattach serves cross-turn durability).
        modelCallLimitMiddleware({ runLimit: 60, exitBehavior: 'error' }),
        toolCallLimitMiddleware({ runLimit: 160, exitBehavior: 'error' }),
        // NOTE toolRetryMiddleware intentionally NOT wired: MedQ's tools are
        // side-effectful (save_question, schedule_task, manage_skills…) —
        // auto-retrying a timed-out call could double-execute the effect.
        // TASK PLANNING (docs' write_todos pattern): adds the write_todos
        // tool + `todos` state channel. Todo updates flow through the
        // existing updates-mode handler (update.todos → plan events →
        // ExecutionTimeline), now with explicit per-step status.
        todoListMiddleware(),
        // INTERPRETER (docs' interpreters/dynamic-subagents pattern): the
        // `eval` tool runs model-authored JavaScript in an isolated QuickJS
        // WASM context — state persists between evals, tools.* PTC calls
        // resolve to the agent's GATED tool instances, and task() dispatches
        // subagents programmatically (fan-out/classify-and-act patterns).
        // RAM-tuned for the 4GB box: 32MB QuickJS heap, 10s timeout,
        // 64 PTC calls, 4 concurrent subagent dispatches.
        (() => {
          const interpreter = createCodeInterpreterMiddleware({
            memoryLimitBytes: 32 * 1024 * 1024,
            executionTimeoutMs: 10_000,
            maxPtcCalls: 64,
            maxSubagentConcurrency: 4,
            // Read-only / idempotent tools only — anything side-effectful
            // stays human-mediated through the normal tool path.
            ptc: [
              'search_knowledge',
              'search_medical_references',
              'get_exam_blueprint',
              'analyze_my_weaknesses',
              'task_list',
              'list_scheduled_tasks',
              'list_background_tasks',
              'check_background_task',
            ],
          });
          // Gate the eval tool itself with the same HITL approval flow as
          // run_code (capability code.run) — executing model-authored code is
          // exactly what learners should confirm.
          const evalTool = (interpreter.tools ?? [])[0];
          if (evalTool) {
            return {
              ...interpreter,
              tools: [withApprovalGate(evalTool as never, {
                userId: options.userId ?? null,
                threadId: ctx.threadId,
                signal: options.signal,
                hitl: options.hitl,
              })] as never,
            };
          }
          return interpreter;
        })(),
        // MEMORY (docs' AGENTS.md pattern) — user-authored persistent
        // instructions from the jailed workspace, injected at startup.
        ...(memoryMiddleware ? [memoryMiddleware] : []),
      ] as AgentMiddleware[],
      // ── The registry-built tool set (the same instances shared with the
      // domain subagents above) ──
      tools: chatTools,
    }),
    // The provider config this agent instance actually runs on — the stream
    // loop uses it to decide whether a rate-limited attempt is eligible for
    // key-pool rotation (same endpoint, next key).
    provider: {
      baseUrl: config.baseUrl ?? '',
      apiKey: config.apiKey,
      model: typeof config.model === 'string' ? config.model : 'modelId' in config ? config.modelId : String(config.model),
      defaultHeaders,
    },
  };
}
export interface ApprovalWirePayload {
  approvalId: string;
  threadId: string;
  tool: string;
  capability: string;
  args: unknown;
  description?: string;
}
export interface MedQQuestionGenerationRequest {
  topic: string;
  system: string;
  types: string[];
  difficulties: string[];
  count: number;
  sourceText?: string;
}

/**
 * Extract a JSON array from a raw model response.
 *
 * Models sometimes return arrays wrapped in markdown fences or nested in a
 * content field. This helper tries to recover the useful array while tolerating
 * malformed output.
 */
function parseQuestionArray(value: unknown): unknown[] {
  const content = Array.isArray(value)
    ? value
    : value && typeof value === 'object' && 'content' in value
      ? (value as { content?: unknown }).content
      : value;
  if (Array.isArray(content)) return content;
  if (typeof content !== 'string') return [];
  const match = content.match(/\[[\s\S]*\]/);
  if (!match) return [];
  try {
    const parsed = JSON.parse(match[0]);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Generate a batch of medical questions from a structured request.
 *
 * This is a helper entrypoint for question generation flows that do not need a
 * live streaming UI. It builds a prompt, invokes the agent, and then extracts the
 * JSON array of generated questions.
 */
export async function generateMedQQuestions(request: MedQQuestionGenerationRequest): Promise<unknown[]> {
  const { agent } = await createMedQDeepAgent();
  const source = request.sourceText ? `\nSource material:\n${request.sourceText}` : '';
  const prompt = [
    'Generate the requested medical questions.',
    'You MUST call the multimodal-question-author subagent through the task tool and use its JSON output.',
    `Topic: ${request.topic}`,
    `Medical system: ${request.system}`,
    `Question types: ${request.types.join(', ')}`,
    `Difficulty: ${request.difficulties.join(', ')}`,
    `Count: ${request.count}`,
    'Return only the specialist JSON array with no markdown or commentary.',
    source,
  ].join('\n');
  const result = await agent.invoke({ messages: [new HumanMessage(prompt)] });
  const messages = (result as { messages?: unknown[] }).messages ?? [];
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const parsed = parseQuestionArray(messages[index]);
    if (parsed.length > 0) return parsed;
  }
  return parseQuestionArray(result);
}

/** Extract the subagent name from an outer-agent `task` tool call's args
 * (deepagents' task schema: { description, subagent_type, ... }). */
function subagentNameFromArgs(args: unknown): string | null {
  let obj: unknown = args;
  if (typeof args === 'string') {
    try { obj = JSON.parse(args); } catch { return null; }
  }
  if (!obj || typeof obj !== 'object') return null;
  const t = (obj as { subagent_type?: unknown }).subagent_type;
  return typeof t === 'string' && t.trim() ? t.trim() : null;
}

/**
 * Stream a single MedQ turn from the agent runtime.
 *
 * This generator is the bridge between the route layer and the deep-agent engine:
 * it sends a request into the graph, then yields events for each token, plan,
 * tool update, and final completion message so the UI can render them progressively.
 *
 * Tool-call modeling follows the "call ≠ result" contract: tool_start carries
 * the CALL (tool name + tool_call id + parsed args, taken from the complete
 * AIMessage of the model turn) and tool_end carries the RESULT (matched by
 * tool_call_id, with an excerpt + capped result text). A call that never
 * receives its tool_end stays "requested" in the UI — never assumed successful.
 */
export async function* streamMedQDeepAgent(
  message: string,
  context?: string,
  options: DeepAgentStreamOptions = {},
): AsyncGenerator<AgentRuntimeEvent> {
  // Live events from the embedded question-generation agent flow through this
  // queue. The generation tool pushes into it via onGenerationEvent while it
  // executes inside the agent stream; the merged iterator below races the
  // agent stream against the queue so inner events are yielded to the SSE
  // client in real time (LangGraph itself yields nothing during tool runs).
  const generationEvents = new AsyncEventQueue<DeepAgentEvent>();
  const runtimeOptions: DeepAgentStreamOptions = {
    ...options,
    onGenerationEvent: (event) => generationEvents.push(event),
  };

  // ── HITL approval events ──
  // The approval gate (tools/chat-registry.ts → approvals/service.ts) blocks
  // a gated tool until the user decides. The wait happens INSIDE the tool, so
  // the LangGraph stream is silent while it pends — the approval request is
  // published on an in-process bus and funneled through this queue so the
  // merged iterator yields it to the SSE client in real time (the route's
  // heartbeat keeps the wire alive while the tool waits).
  const approvalEvents = new AsyncEventQueue<AgentRuntimeEvent>();
  const scopeUserId = options.userId ?? 'guest';
  const unsubscribeApprovals = subscribeApprovalRequests((payload) => {
    // Scope by thread: the bus is process-global, so with two concurrent
    // turns one user's SSE stream would otherwise receive the other's
    // approval card. Payloads WITHOUT a threadId come from threadless flows
    // (scheduled / background jobs run through the queue worker with no
    // conversation) — they can never belong to a chat turn that knows its
    // own thread, and forwarding them used to inject phantom approval cards
    // into unrelated live conversations (observed live: a scheduled
    // question-generation task's approvals hijacking a different chat's
    // card mid-run).
    if (options.threadId && payload.threadId !== options.threadId) {
      return;
    }
    logAgentEvent('info', `[APPROVAL-BUS] listener fired for ${payload.tool} (${payload.approvalId.slice(0, 8)})`);
    approvalEvents.push({ type: 'approval_required', approval: payload });
  });

  // ── Structured clarification events (ask_user) ──
  // The ask_user tool does NOT block — it publishes the form payload on the
  // clarification bus and returns guidance that ends the model's turn. The
  // runtime forwards the payload through the same queue so the SSE client
  // renders the interactive form card; answers arrive as the next user
  // message on a fresh run. Scoped by user (and thread when present) so a
  // concurrent conversation never sees another learner's question form.
  const unsubscribeClarifications = subscribeClarifications((payload) => {
    if (payload.userId !== scopeUserId) return;
    // Same threadless-flow scoping as the approval bus: a clarification
    // published without a threadId cannot belong to a chat turn that knows
    // its thread — never render a stranger's form in this conversation.
    if (options.threadId && payload.threadId !== options.threadId) return;
    logAgentEvent('info', `[CLARIFICATION-BUS] listener fired (${payload.clarificationId.slice(0, 10)}, ${payload.inputs.length} fields)`);
    approvalEvents.push({ type: 'clarification_required', clarification: payload });
  });

  // ── App-control events (ui_action) ──
  // The ui_action tool does NOT block — it publishes the validated UI action
  // payloads on the ui-action bus and returns guidance. The runtime forwards
  // them through the same queue so the SSE client executes them LIVE on the
  // learner's screen (navigate / dialogs / form fills) while the turn is
  // still running. Thread-scoped like clarifications.
  const unsubscribeUiActions = subscribeUiActions((payload) => {
    if (payload.userId !== scopeUserId) return;
    if (options.threadId && payload.threadId !== options.threadId) return;
    logAgentEvent('info', `[UI-ACTION-BUS] listener fired (${payload.actions.length} action(s): ${payload.actions.map((a) => String(a.type ?? '?')).join(', ')})`);
    approvalEvents.push({ type: 'ui_actions', actions: payload.actions });
  });

  // ── Smalltalk fast path (greetings) ──
  // "hi" / "hello" / "hey" used to cost 4 LLM calls: the deep-agent graph
  // runs its full middleware stack (summarization check, todo planning,
  // second model turn, …) even for a greeting, then memory + title tasks
  // pile on. A pure greeting needs ONE call — stream it directly with a
  // minimal system prompt and skip the graph entirely. Thread persistence
  // is unaffected (the route persists from the streamed tokens). Any
  // failure falls through to the full agent path. Long/multiword messages,
  // anything with a question mark, and mid-conversation context-bearing
  // turns take the normal path.
  //
  // Listener hygiene: this block sits BEFORE the generator's main
  // try/finally (which unsubscribes the run-scoped buses). Exiting the
  // generator from HERE (turn done, client disconnected mid-greeting) would
  // leak the approval/clarification/ui-action listeners — so the finally
  // below cleans them up unless we deliberately fall through to the full
  // path (which owns cleanup from there on).
  const trimmedMessage = message.trim();
  if (
    trimmedMessage.length <= 25 &&
    !trimmedMessage.includes('?') &&
    /^(hi+|hello+|hey+|yo|sup|hiya|greetings|good\s*(morning|afternoon|evening)|salam|salaam|marhaba|as-?salamu\s+'?alaykum|مرحبا|أهلا|اهلاً?|هاي|صباح\s+الخير|مساء\s+الخير)[!,.\s]*$/i.test(trimmedMessage)
  ) {
    // True when we deliberately continue to the full agent path (the outer
    // finally owns cleanup in that case). False when the generator ENDS
    // here — success OR client disconnect — then this finally cleans up.
    let fastPathFallsThrough = false;
    try {
      // Same ladder as the full path, collapsed to two rungs: the configured
      // provider first, then the managed Z.AI backup. (Observed live: a
      // deployment whose primary endpoint is the keyless-fresh FreeLLM
      // router 502s zai-llm — without the backup rung the fast path fell
      // through to the 4-call graph and the "optimization" saved nothing.)
      const primary = options.providerOverride
        ? options.providerOverride
        : (() => {
            const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';
            if (requested && requested !== 'auto') {
              // Resolved lazily inside the try below (async).
              return null;
            }
            return defaultDeepAgentProviderConfig();
          })();
      const resolveFastCfg = async (): Promise<{ baseUrl: string; apiKey: string; model: string; defaultHeaders?: Record<string, string>; label: string } | null> => {
        if (primary) return { ...primary, label: 'modelId' in primary ? String(primary.modelId) : String(primary.model) };
        const requested = typeof options.modelString === 'string' ? options.modelString.trim() : '';
        const resolved = await resolveModel({ modelString: requested, userId: options.userId ?? undefined })
          .then((r) => (r.apiKey ? r : null))
          .catch(() => null);
        if (resolved) {
          const zai = resolved.providerId === 'zai' ? readZaiConfig() : null;
          return {
            baseUrl: resolved.baseUrl ?? '',
            apiKey: resolved.apiKey,
            model: resolved.modelId,
            ...(zai ? { defaultHeaders: zaiGatewayHeaders(zai) } : {}),
            label: resolved.modelId,
          };
        }
        return null;
      };
      const attemptCfgs: Array<{ baseUrl: string; apiKey: string; model: string; defaultHeaders?: Record<string, string>; label: string }> = [];
      const first = await resolveFastCfg();
      if (first && first.apiKey) attemptCfgs.push(first);
      const zaiBackup = zaiFallbackConfig();
      const primaryIsZai = first?.label === zaiBackup?.model;
      if (zaiBackup && !primaryIsZai) {
        attemptCfgs.push({ baseUrl: zaiBackup.baseUrl, apiKey: zaiBackup.apiKey, model: zaiBackup.model, ...(zaiBackup.defaultHeaders ? { defaultHeaders: zaiBackup.defaultHeaders } : {}), label: zaiBackup.model });
      }
      if (attemptCfgs.length === 0) {
        fastPathFallsThrough = true;
      } else {
      let fastText = '';
      for (let attempt = 0; attempt < attemptCfgs.length && !fastText.trim(); attempt++) {
        const cfg = attemptCfgs[attempt];
        try {
        const fastModel = new ChatOpenAI({
          apiKey: cfg.apiKey,
          model: cfg.model,
          temperature: 0.6,
          maxRetries: 2,
          timeout: 60_000,
          configuration: (() => {
            const headers = cfg.defaultHeaders as Record<string, string> | undefined;
            return headers ? { baseURL: cfg.baseUrl, defaultHeaders: headers } : { baseURL: cfg.baseUrl };
          })(),
        });
        if (attempt === 0) {
          const greetingHistory = (options.history ?? []).slice(-4).map((entry) =>
            entry.role === 'assistant' ? new AIMessage(entry.content) : new HumanMessage(entry.content),
          );
          logAgentEvent('info', `Smalltalk fast path (greeting) — single ${cfg.model} call instead of the full graph`);
          yield { type: 'status', model: cfg.model };
          const stream = await fastModel.stream([
            new SystemMessage(
              'You are MedQ Agent, a warm medical-education assistant. The learner just greeted you. Reply with ONE friendly sentence: greet them back and invite them to study — mention they can ask you to open any part of the app (question bank, flashcards, exams) or generate questions/flashcards on a topic. Match their language. No lists, no markdown.',
            ),
            ...greetingHistory,
            new HumanMessage(trimmedMessage),
          ]);
          for await (const chunk of stream) {
            const text = typeof chunk?.content === 'string' ? chunk.content : '';
            if (text) {
              fastText += text;
              yield { type: 'token', text };
            }
          }
        } else {
          // Backup rung: restart the (tiny) answer cleanly — the failed
          // attempt streamed nothing (it only ever fails on connection /
          // HTTP errors before tokens, or we wouldn't be retrying).
          logAgentEvent('info', `Smalltalk fast path — primary failed, retrying on the Z.AI backup (${cfg.model})`);
          yield { type: 'status', model: `${cfg.model} · backup` };
          const stream = await fastModel.stream([
            new SystemMessage(
              'You are MedQ Agent, a warm medical-education assistant. The learner just greeted you. Reply with ONE friendly sentence: greet them back and invite them to study — mention they can ask you to open any part of the app (question bank, flashcards, exams) or generate questions/flashcards on a topic. Match their language. No lists, no markdown.',
            ),
            new HumanMessage(trimmedMessage),
          ]);
          for await (const chunk of stream) {
            const text = typeof chunk?.content === 'string' ? chunk.content : '';
            if (text) {
              fastText += text;
              yield { type: 'token', text };
            }
          }
        }
        } catch (error) {
          if (attempt === attemptCfgs.length - 1) throw error;
          logAgentEvent('info', `Smalltalk fast path attempt ${attempt + 1} failed: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
      if (fastText.trim()) {
          yield { type: 'done', text: fastText, llmCalls: attemptCfgs.length > 1 ? 2 : 1 };
          return; // finally below cleans up (not falling through)
      }
        // Empty stream → fall through to the full path below.
        fastPathFallsThrough = true;
      }
    } catch {
      // Fast path failed — the full agent path below handles it (with its
      // own provider fallback ladder).
      fastPathFallsThrough = true;
    } finally {
      if (!fastPathFallsThrough) {
        unsubscribeApprovals();
        unsubscribeClarifications();
        unsubscribeUiActions();
        approvalEvents.close();
      }
    }
  }

  // ── Long-term memory recall ──
  // Best-effort BEFORE the turn starts: surface the most relevant saved
  // memories for the upcoming message into the system prompt (deep-agent /
  // hermes parity). Guest turns skip recall — the anonymous 'guest' pool is
  // shared across visitors, so silently injecting it would leak one
  // visitor's saved context into another's conversation. Signed-in users
  // only. A memory failure must never break the chat turn (null fallback).
  if (options.userId && !options.memoryContext) {
    try {
      runtimeOptions.memoryContext = await buildMemoryContext(options.userId, message);
    } catch {
      runtimeOptions.memoryContext = null;
    }
  }

  // ── Run-level telemetry (AgentRun row) ──
  // One row per turn: status / duration / model. Paired with the per-tool
  // AgentToolExecution rows the chat registry now writes, the usage tables
  // finally reflect reality. Best-effort — never breaks the chat turn.
  const runStartedAt = Date.now();
  let agentRunId: string | null = null;
  try {
    agentRunId = (
      await db.agentRun.create({
        data: {
          userId: options.userId ?? 'guest',
          ...(options.threadId ? { threadId: options.threadId } : {}),
          kind: options.runKind ?? 'chat',
          model: 'pending',
          status: 'running',
        },
      })
    ).id;
  } catch {
    agentRunId = null;
  }
  const finalizeAgentRun = (status: 'completed' | 'failed', model: string, error?: string) => {
    if (!agentRunId) return;
    void db.agentRun
      .update({
        where: { id: agentRunId },
        data: {
          status,
          model,
          ...(error ? { error: error.slice(0, 2000) } : {}),
          durationMs: Date.now() - runStartedAt,
          completedAt: new Date(),
        },
      })
      .catch(() => { /* best-effort */ });
  };
  let finalModel = 'unknown';

  // ── Provider resilience ladder (rate-limit mitigation) ──
  // Attempt 1 runs the configured primary provider (env chain, e.g. the
  // FreeLLM router). A rate-limit storm fails on the very FIRST LLM call —
  // before any token/tool event reached the client — so clean retries are
  // safe. The ladder, in order:
  //   1. primary provider (MEDQ_AGENT_* env chain)
  //   2. NEXT KEY in the MEDQ_AGENT_API_KEYS pool on the SAME endpoint
  //      (one hop per turn — covers sustained per-key quota exhaustion;
  //      brief storms are already absorbed in-call by maxRetries +
  //      modelRetryMiddleware)
  //   3. managed Z.AI backup service (.z-ai-config; verified working during
  //      the 2026-10-08 storm)
  // A mid-run failure after content was streamed is never retried — partial
  // output must not be duplicated.
  const keyPool = resolveAgentKeyPool();
  const poolBase = poolBaseUrl();
  const poolSpare = keyPool.size > 1 && !!poolBase;
  const zaiBackup = zaiFallbackConfig();
  const maxAttempts = 1 + (poolSpare ? 1 : 0) + (zaiBackup ? 1 : 0);
  let poolRotated = false;
  let fallbackOverride: MedQProviderOverride | undefined;

  try {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    let streamedContent = false;
    // The provider config THIS attempt actually ran on — captured for the
    // pool-rotation eligibility check in the catch below.
    let attemptProvider: { baseUrl: string; apiKey: string; model: string; defaultHeaders?: Record<string, string> } | undefined;
    try {
      const { agent, model, provider } = await createMedQDeepAgent({
        ...runtimeOptions,
        providerOverride: fallbackOverride,
      });
      attemptProvider = provider;
      finalModel = model;
      logAgentEvent('info', `Starting stream with model ${model}${attempt > 1 ? ` (${fallbackOverride?.label ?? 'backup'})` : ''}`);
      yield { type: 'status', model: attempt > 1 ? `${model} · backup` : model };

      const prompt = context ? `${message}\n\nCurrent MedQ context:\n${context}` : message;
      const history = (options.history ?? []).slice(-12).map((entry) =>
        entry.role === 'assistant' ? new AIMessage(entry.content) : new HumanMessage(entry.content),
      );
      const stream = await agent.stream(
        { messages: [...history, new HumanMessage(prompt)] },
        {
          streamMode: ['updates', 'messages'],
          configurable: {
            thread_id: options.threadId,
            user_id: options.userId ?? undefined,
          },
        } as never,
      );
      const output: string[] = [];
      // Full tool-result payloads seen this turn — used at completion to strip
      // verbatim echoes: some models (observed with GLM via the zai gateway)
      // open their post-tool turn by repeating the tool's return JSON verbatim
      // as text. The exact JSON never belongs in the user-facing answer.
      const toolResultContents: string[] = [];
      // Dedupe guards: AIMessages/ToolMessages can reappear in updates after
      // checkpoint replays (resume/interrupt) — never emit one call/result twice.
      const emittedToolStartIds = new Set<string>();
      const emittedToolEndIds = new Set<string>();
      // Subagent the in-flight `task` call delegated to (from its args).
      let lastTaskSubagent: string | null = null;
      // Honest LLM-call accounting for the done event: this graph's model
      // turns + inner-agent turns (approximated by its tool calls + one
      // planning turn) + each subagent takeover.
      let modelTurns = 0;
      let innerTurns = 0;

      // `ask_user` hard turn stop — see the ToolMessage branch below. The
      // label lets the innermost message loop end the WHOLE event loop the
      // moment the clarification form's tool result lands.
      eventLoop:
      for await (const item of mergeAgentStreamWithGenerationEvents(stream, generationEvents, options.signal, approvalEvents)) {
        // Approval request from the HITL gate — forwarded to the SSE client
        // so the approval card renders while the tool waits for the decision.
        if (item.kind === 'approval') {
          yield item.event;
          continue;
        }

        // Events from the embedded generation agent — forwarded verbatim so the
        // route can surface plan / tool / subagent / save activity live.
        if (item.kind === 'generation') {
          streamedContent = true;
          if (item.event.type === 'tool_start' || item.event.type === 'subagent') innerTurns += 1;
          yield { type: 'generation_event', event: item.event };
          continue;
        }

        const [mode, payload] = [item.mode, item.payload];
        if (mode === 'messages') {
          // The chat agent's OWN narration tokens. (Nested generation-agent
          // tokens no longer reach this handler — question-deep-agent severs
          // ambient callback inheritance on its own stream — so the answer
          // text stays clean of subagent narration and tool-result echoes.)
          //
          // SUBAGENT STREAMING (docs parity): chunks produced inside a `task`
          // subagent graph carry metadata.lc_agent_name (set by the deepagents
          // task tool) — those are routed to dedicated subagent_delta events
          // (rendered as live specialist cards) INSTEAD of the main answer
          // stream, so delegated narration never pollutes the final text.
          const [chunk, chunkMetadata] = payload as [AgentMessageChunk, {
            metadata?: { lc_agent_name?: string };
          } | undefined];
          const text = typeof chunk?.content === 'string' ? chunk.content : '';
          // Only the explicit lc_agent_name tag (set by the deepagents task
          // tool on the subagent's config) identifies subagent chunks — node
          // names are NOT reliable (the main agent's model node is 'model'
          // too, which would misroute post-delegation narration).
          const subagentName = chunkMetadata?.metadata?.lc_agent_name;
          if (text && subagentName && subagentName !== 'medq-agent') {
            streamedContent = true;
            yield { type: 'subagent_delta', name: subagentName, text };
            continue;
          }
          if (text) {
            streamedContent = true;
            output.push(text);
            yield { type: 'token', text };
          }
          continue;
        }

        if (mode === 'updates') {
          const updates = payload as Record<string, unknown>;
          for (const [node, value] of Object.entries(updates)) {
            const update = value as AgentUpdate | null;
            if (Array.isArray(update?.todos)) {
              streamedContent = true;
              yield { type: 'plan', todos: update.todos };
            }
            for (const messageUpdateValue of update?.messages ?? []) {
              const messageUpdate = messageUpdateValue as {
                constructor?: { name?: string };
                name?: string;
                content?: unknown;
                status?: string;
                tool_calls?: Array<{ id?: unknown; name?: unknown; args?: unknown }>;
                tool_call_id?: unknown;
              };
              const name = messageUpdate?.constructor?.name ?? '';

              // A complete model turn: its tool_calls are the CALL side —
              // full parsed args + the provider's tool_call ids, emitted once
              // per call (deduped). Replaces chunk-based emission, which
              // captured only the first args fragment per call.
              if (name.includes('AIMessage')) {
                const calls = messageUpdate.tool_calls ?? [];
                if (calls.length > 0 || typeof messageUpdate.content === 'string') modelTurns += 1;
                for (const toolCall of calls) {
                  if (typeof toolCall?.name !== 'string' || !toolCall.name) continue;
                  const callId = typeof toolCall.id === 'string' ? toolCall.id : undefined;
                  if (callId && emittedToolStartIds.has(callId)) continue;
                  if (callId) emittedToolStartIds.add(callId);
                  streamedContent = true;
                  logAgentEvent('tool', `Calling ${toolCall.name}${callId ? ` (${callId})` : ''}`);
                  yield { type: 'tool_start', tool: toolCall.name, id: callId, args: toolCall.args };
                  // The `task` tool IS subagent delegation (deepagents
                  // convention) — surface which specialist took over.
                  if (toolCall.name === 'task') {
                    lastTaskSubagent = subagentNameFromArgs(toolCall.args) ?? 'subagent';
                    yield { type: 'subagent', name: lastTaskSubagent, event: 'started' };
                  }
                }
                continue;
              }

              if (name.includes('ToolMessage')) {
                streamedContent = true;
                logAgentEvent(
                  messageUpdate.status === 'error' ? 'error' : 'success',
                  `${messageUpdate.status === 'error' ? 'Tool failed' : 'Tool completed'}: ${messageUpdate.name ?? node}`,
                );
                const toolName = messageUpdate.name ?? node;
                // Content may be a string OR an array of content blocks
                // (deepagents' read_file/ls/glob return [{type:"text",…}]
                // blocks). Normalizing to text here keeps tool_end excerpts,
                // thread persistence, and the UI's tool-result cards honest —
                // observed live: every read_file result persisted as "".
                let content: string | undefined;
                if (typeof messageUpdate.content === 'string') {
                  content = messageUpdate.content;
                } else if (Array.isArray(messageUpdate.content)) {
                  const text = (messageUpdate.content as Array<{ type?: string; text?: unknown }>)
                    .filter((block) => block && typeof block.text === 'string')
                    .map((block) => block.text as string)
                    .join('\n');
                  if (text) content = text;
                }
                const resultId = typeof messageUpdate.tool_call_id === 'string' ? messageUpdate.tool_call_id : undefined;
                if (resultId && emittedToolEndIds.has(resultId)) continue;
                if (resultId) emittedToolEndIds.add(resultId);
                if (content && content.length >= 20) toolResultContents.push(content);
                yield {
                  type: 'tool_end',
                  tool: toolName,
                  id: resultId,
                  excerpt: content ? content.slice(0, 600) : undefined,
                  result: content ? content.slice(0, 4000) : undefined,
                  status: messageUpdate.status ?? 'ok',
                  // Knowledge citations ([K#]) for the chat client's hover-cards —
                  // only search_knowledge returns them.
                  citations: toolName === 'search_knowledge' && content ? parseKnowledgeCitations(content) : undefined,
                  // Web citations ([S#]) from search_medical_references so the
                  // client renders source cards + clickable chips instead of
                  // the model pasting long raw URLs into the answer text.
                  webCitations:
                    toolName === 'search_medical_references' && content ? parseWebCitations(content) : undefined,
                };
                // ── ask_user: HARD turn stop ──
                // The tool has already displayed the interactive form (its
                // payload rode the clarification bus ahead of this event).
                // The model is INSTRUCTED to end its turn here, but
                // instruction-following varies — observed live (2026-10-24):
                // the model ignored the guidance and kept working
                // (write_todos, write_file, generate_medical_illustration…)
                // for the FULL 6-minute hard cap while the form sat disabled
                // behind the still-streaming turn. Breaking the event loop
                // here ends the model's turn AT the form: the LangGraph
                // stream is pull-driven, so abandoning it parks the graph
                // before any further nodes execute; the loop below then emits
                // a normal done and the client flips the form interactive.
                if (toolName === 'ask_user') {
                  logAgentEvent('info', 'ask_user form displayed — hard-stopping the model turn (answers arrive as the next user message)');
                  break eventLoop;
                }
                // The task ToolMessage marks the subagent run completing.
                if (toolName === 'task' && lastTaskSubagent) {
                  yield { type: 'subagent', name: lastTaskSubagent, event: 'completed' };
                  lastTaskSubagent = null;
                }
              }
            }
          }
        }
      }

      logAgentEvent('success', 'Stream completed');
      // On a client abort the merged iterator returns early; finish with whatever
      // partial text was already streamed (the route skips persistence for aborted
      // requests, so this only matters for logs and stream hygiene).
      //
      // Echo scrub: remove any verbatim tool-result JSON the model pasted into
      // its narration (observed: GLM opening its post-tool turn with the exact
      // {"ok":true,"savedCount":…} blob it just received). Only exact full-blob
      // matches are removed — legitimate prose summaries that quote a value or
      // embed a returned image URL in markdown are untouched.
      let finalText = output.join('');
      for (const content of toolResultContents) {
        if (finalText.includes(content)) finalText = finalText.split(content).join('');
      }
      finalText = finalText.replace(/\n{3,}/g, '\n\n').replace(/^[\s\n]+/, '').replace(/[\s\n]+$/, '\n');
      // ── Post-run memory extraction (best-effort, zero extra LLM calls) ──
      // Heuristically store what the user asked for + how the run resolved in
      // the auto-extraction 'semantic' layer, so future turns recall it even
      // when wording differs (deep-agent extractAndStore parity). Fire-and-
      // forget: never blocks the done event and never fails the turn.
      if (options.userId) {
        void extractAndStoreMemories({
          userId: options.userId,
          userMessage: message,
          assistantSummary: finalText.slice(0, 400),
          threadId: options.threadId,
        }).catch(() => { /* best-effort */ });
      }
      // ── LLM thread title (fast-model routing) ──
      // Replaces the first-message truncation with a real title — one tiny
      // fast-model call, first exchange only, fire-and-forget.
      if (options.userId && options.threadId) {
        void maybeGenerateThreadTitle(options.threadId, options.userId, `${message}\n\n${finalText.slice(0, 600)}`).catch(() => { /* best-effort */ });
      }
      yield { type: 'done', text: finalText, llmCalls: modelTurns + innerTurns + (innerTurns > 0 ? 1 : 0) };
      finalizeAgentRun('completed', finalModel);
      return;
    } catch (error) {
      // Only an overload failure with NOTHING streamed yet is eligible for
      // the resilience ladder — everything else propagates to the route's
      // error handling (friendly message + logger) unchanged.
      const reason = error instanceof Error ? error.message.slice(0, 160) : String(error).slice(0, 160);
      if (!streamedContent && isProviderOverloadError(error) && attempt < maxAttempts) {
        // (1) Key-pool rotation — same endpoint, next key. Only when the
        // failed attempt ran the env-configured provider the pool keys
        // belong to, and only once per turn.
        if (
          poolSpare && !poolRotated && attemptProvider &&
          normalizeBaseUrl(attemptProvider.baseUrl) === poolBase
        ) {
          const nextKey = nextPoolKey(keyPool, attemptProvider.apiKey);
          if (nextKey && nextKey !== attemptProvider.apiKey) {
            poolRotated = true;
            fallbackOverride = {
              baseUrl: attemptProvider.baseUrl,
              apiKey: nextKey,
              model: attemptProvider.model,
              defaultHeaders: attemptProvider.defaultHeaders,
              label: `${attemptProvider.model} · pool key`,
            };
            logAgentEvent('info', `Provider rate-limited (${reason}) — rotating to the next API key in the pool (${keyPool.size} configured)`);
            continue;
          }
        }
        // (2) Managed Z.AI backup service.
        if (zaiBackup && fallbackOverride !== zaiBackup) {
          logAgentEvent('info', `Provider overloaded (${reason}) — retrying this turn on the built-in Z.AI backup service`);
          fallbackOverride = zaiBackup;
          continue;
        }
      }
      finalizeAgentRun('failed', finalModel, error instanceof Error ? error.message : String(error));
      throw error;
    }
  }
  } finally {
    // HITL bus cleanup — the approval subscription lives for exactly one
    // run; leaving it subscribed would leak listeners across turns.
    unsubscribeApprovals();
    unsubscribeClarifications();
    unsubscribeUiActions();
    approvalEvents.close();
  }
}
