/**
 * THE chat-agent tool registry — single source of truth.
 *
 * History: MedQ grew TWO independent registries. tools/index.ts exported
 * buildMedQTools (imported by nobody — dead code), while the live chat agent
 * assembled its tool array inline in deep-agent-runtime.ts. The image-search
 * bug (2026-10-23) happened exactly because of this split: the tool was
 * registered in the dead registry and the chat agent never saw it. This
 * module is the fix: ONE builder the chat agent (and only the chat agent)
 * consumes. Every tool the floating assistant can call is listed here, and
 * every tool passes through withExecutionTelemetry so AgentToolExecution
 * rows capture status/latency/IO for analytics and debugging.
 *
 * The generation agent (question-deep-agent.ts) keeps its own smaller set —
 * it is a different agent with a different job — but wraps its tools with
 * the same telemetry helper.
 */
import type { DynamicStructuredTool } from '@langchain/core/tools';
import type { BaseChatModel } from '@langchain/core/language_models/chat_models';
import type { MedQToolContext } from '../types';
import { createMemoryTools } from '../deep-agent-tools';
import { withExecutionTelemetry } from './telemetry';
import { createArtifactTool } from './artifacts';
import { createDocumentTool } from './documents';
import { createWordDocumentTool, createSpreadsheetTool, createPresentationTool } from './office';
import { createChartTool } from './chart';
import {
  createImageEditTool,
  createAudioTranscriptionTool,
  createSpeechSynthesisTool,
  createVideoAnalysisTool,
  createVideoSearchTool,
  createVideoGenerationTool,
} from './media';
import { createArtifactSearchTool } from './discovery';
import { createScheduleTaskTool, createListScheduledTasksTool } from './scheduling';
import { createSearchKnowledgeTool } from './knowledge';
import { createVideoSceneSearchTool } from './video-search';
import { createQuerySpreadsheetTool } from './spreadsheet';
import { createFlashcardTools } from './flashcards';
import { createStudyInsightTools } from './study-insights';
import { createManageSkillsTool } from './manage-skills';
import { createAskUserTool } from './ask-user';
import { createMedicalFetchTool } from './web-fetch';
import { createRunCodeTool } from './run-code';
import { createBrowserSnapshotTool, createBrowserInteractTool } from './browser';
import { createGitTools } from './git';
import { createTaskTools } from './tasks';
import { createAsyncTaskTools } from './async-tasks';
import { createMessagingTools } from './messaging';
import { withApprovalGate } from '../approvals/service';
import { createUiActionTool } from './ui-action';

export interface ChatAgentToolOptions {
  /** Telemetry context (userId/threadId written to every AgentToolExecution row). */
  ctx: MedQToolContext;
  /** The signed-in user id — gates bank/db-writing tools. Null for guests. */
  userId?: string | null;
  /** Multimodal tool set (shared instance with the question-author subagent). */
  multimodalTools: DynamicStructuredTool[];
  /** run_question_generation_agent (signed-in only; built by the runtime). */
  generationAgentTool?: DynamicStructuredTool | null;
  /** save_question single-save bridge (signed-in only; built by the runtime). */
  saveQuestionTool?: DynamicStructuredTool | null;
  /** MCP tools (mcp__<server>__<tool>) from the user's configured servers. */
  mcpTools?: DynamicStructuredTool[];
  /** Shared fast model for per-task routing inside tools (unread digests run
   * their map-reduce on it — same instance the study-coach subagent uses). */
  fastModel?: BaseChatModel | null;
  /** Abort signal for the current run — the HITL approval wait rejects on
   * client disconnect so the graph never lingers on a dead connection. */
  abortSignal?: AbortSignal;
  /** 'off' disables HITL gating for this run (autonomous scheduled / background
   * job executions — no human is watching, so approval cards can never be
   * answered; the job's scheduling was itself approved at creation time). */
  hitl?: 'on' | 'off';
}

/**
 * Build the chat agent's complete tool set. Registration mistakes are
 * structurally impossible now: a tool not present in THIS array cannot be
 * called by the floating assistant, and everything here is telemetry-wrapped.
 */
export function buildChatAgentTools(options: ChatAgentToolOptions): DynamicStructuredTool[] {
  const { ctx, userId, multimodalTools } = options;
  const [analyzeWeaknessesTool, examBlueprintTool] = createStudyInsightTools(ctx);
  const tools: DynamicStructuredTool[] = [
    // ── Question generation (the Generate-tab engine, as a chat tool) ──
    ...(options.generationAgentTool ? [options.generationAgentTool] : []),
    // ── save_question bridge (single saves of written-out questions) ──
    ...(options.saveQuestionTool ? [options.saveQuestionTool] : []),
    // ── Multimodal: search references/images, illustration, audio, vision,
    //    lab panels (shared with the question-author subagent) ──
    ...multimodalTools,
    // ── Full-article retrieval for one known reference (the system prompt
    //    already steers "prefer fetch_medical_reference" — this registration
    //    makes that true; found unregistered in the audit round 3) ──
    createMedicalFetchTool(ctx),
    // ── Lecture recordings / dictations: attachment:// refs → ffmpeg + VAD
    //    segmentation ASR pipeline (handles long recordings) ──
    createAudioTranscriptionTool(),
    // ── Long-term memory ──
    ...createMemoryTools(ctx),
    // ── Artifacts + documents ──
    createArtifactTool(ctx),
    createDocumentTool(ctx),
    createWordDocumentTool(ctx),
    createSpreadsheetTool(ctx),
    createPresentationTool(ctx),
    createChartTool(ctx),
    createImageEditTool(ctx),
    createSpeechSynthesisTool(ctx),
    // ── Video understanding + search: analyze_video_material (URL or
    //    attachment:// uploads, via ZAI createVision with video_url content
    //    for short clips, frame-sampling for longer recordings) and
    //    search_medical_videos (finds real medical videos online via ZAI
    //    image-search as a proxy). Together these let the agent answer
    //    "find me a video on lumbar puncture and summarize the steps". ──
    createVideoAnalysisTool(ctx),
    createVideoSearchTool(),
    createVideoGenerationTool(ctx),
    createArtifactSearchTool(ctx),
    // ── Study intelligence: SM-2 flashcards, weakness analysis, exam
    //    blueprints (flashcards/weakness need a real account; the blueprint
    //    tool is stateless and works for guests too) ──
    ...(userId ? createFlashcardTools(ctx) : []),
    ...(userId ? [analyzeWeaknessesTool] : []),
    examBlueprintTool,
    // ── Scheduled agent jobs: cron + one-shot creation, read-only listing ──
    ...(userId ? [createScheduleTaskTool(ctx), createListScheduledTasksTool(ctx)] : []),
    // ── Knowledge library retrieval ([K#] citations) ──
    ...(userId ? [createSearchKnowledgeTool(ctx)] : []),
    // ── Video scene search ([V#] timestamped scenes, Stage 3) + structured
    //    spreadsheet queries over retained .xlsx uploads (Stage 10) ──
    ...(userId ? [createVideoSceneSearchTool(ctx), createQuerySpreadsheetTool(ctx)] : []),
    // ── Skill authoring loop (manage_skills → workspace sync → load_skill):
    //    registered here after the audit found it built but never wired —
    //    the "closed learning loop" was dead code without this line ──
    ...(userId ? [createManageSkillsTool(ctx)] : []),
    // ── Structured clarification (ask_user → interactive form card): the
    //    model asks its follow-up questions as checkboxes/choices/text
    //    fields instead of prose. Available to guests too — it is pure UI,
    //    no persistence side effects ──
    createAskUserTool(ctx),
    // ── App control (ui_action → live UI execution): drives the learner's
    //    screen — navigation, dialogs, form fills, highlights. Pure UI,
    //    fire-and-forget; guests included ──
    createUiActionTool(ctx),
    // ── Sandboxed computation (JS VM; Python/Bash in the workspace jail) ──
    createRunCodeTool(ctx),
    // ── Browser sandbox (structural page snapshots + interaction), gated ──
    createBrowserSnapshotTool(ctx),
    createBrowserInteractTool(ctx),
    // ── Workspace git (status/diff/log/branch/checkout/commit/pull/push/init) ──
    ...(userId ? createGitTools(ctx) : []),
    // ── Visible task list (task_create / task_update / task_list) ──
    ...(userId ? createTaskTools(ctx) : []),
    // ── Messaging (Messages-tab capabilities: rooms, unread digests, DMs,
    //    groups, push notifications — sends are HITL-gated) ──
    ...(userId ? createMessagingTools(ctx, { fastModel: options.fastModel }) : []),
    // ── Async subagents over the durable queue (start/check/update/cancel/list) ──
    ...(userId ? createAsyncTaskTools(ctx) : []),
    // ── MCP tools from the user's configured servers (gated by dynamic specs) ──
    ...(options.mcpTools ?? []),
  ];

  // HITL gate — consequential tools (bank writes, scheduling, media
  // generation, knowledge ingestion) pause for an explicit user decision
  // before executing. Read-only tools pass straight through. The gate is a
  // no-op when MEDQ_AGENT_HITL=off or the user has "allowed" the capability.
  // Applied INSIDE the telemetry wrapper so AgentToolExecution rows measure
  // the real (approval-inclusive) execution time.
  const gated = tools.map((tool) =>
    withApprovalGate(tool, {
      userId,
      threadId: ctx.threadId,
      signal: options.abortSignal,
      hitl: options.hitl,
    }),
  );

  // Telemetry choke point: EVERY tool execution lands in AgentToolExecution
  // (status, latency, capped input/output). Best-effort — a telemetry failure
  // must never break a tool call.
  return gated.map((tool) => withExecutionTelemetry(tool, ctx));
}
