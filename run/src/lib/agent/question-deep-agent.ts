/**
 * REAL Deep Agent Question Generation Runtime (deepagents / LangGraph)
 *
 * Replaces the scripted 6-stage pipeline (question-agent.ts) with a genuinely
 * autonomous agent built on the `deepagents` framework — the same engine that
 * powers the MedQ chat assistant (/api/agent/chat/v2):
 *
 *   - The agent maintains its OWN todo list (plan) and decides its steps.
 *   - It delegates question authoring to a specialized question-author subagent.
 *   - It calls real tools: web search, image generation, audio, vision, RAG
 *     retrieval over the user's knowledge library.
 *   - It saves each finished question itself through the `save_question` tool —
 *     the pipeline is not post-processing model output, the agent ACTS.
 *
 * Event stream: runDeepAgentQuestionGeneration() is an async generator that
 * yields structured events (plan / tool / subagent / saved / done / error) the
 * route layer maps onto the job store so the Generate tab shows live agent
 * activity through the existing socket/polling UI.
 */

import { HumanMessage } from '@langchain/core/messages';
import { CallbackManager } from '@langchain/core/callbacks/manager';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { ChatOpenAI } from '@langchain/openai';
import { z } from 'zod';
import { createDeepAgent, FilesystemBackend, CompositeBackend, type SubAgent } from 'deepagents';
import fs from 'node:fs';
import path from 'node:path';

import { db } from '@/lib/db';
import { createMultimodalTools, instrumentToolsForActivity, type ToolActivityEvent } from './deep-agent-tools';
import { withExecutionTelemetry } from './tools/telemetry';
import { ensureAgentWorkspace, agentWorkspaceRoot } from './skills/workspace';
import { syncSkillsToWorkspace } from './skills/loader';
import {
  resolveMedQAgentConfig,
  zaiFallbackConfig,
  zaiGatewayHeaders,
  isProviderOverloadError,
  type MedQProviderOverride,
} from './deep-agent-runtime';
import {
  retrieveKnowledgeHybrid,
  judgeCitationSupport,
  answerTokenCoverage,
  JUDGE_MAX_CANDIDATES,
  type HybridChunk,
} from './knowledge/hybrid';
import { retainedOriginalPath, readRetainedOriginal } from './knowledge/file-store';
import { searchVideoScenes, listVideoScenes, formatVideoSceneContext } from './knowledge/video-scenes';
import { describeImage, analyzeVideoFrames } from './knowledge/ingest-media';
import { trimToSentence, buildCitationQuote } from './knowledge/text-quality';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** One retained original media file the agent may attach to a question. */
interface LibraryMediaEntry {
  sourceId: string;
  name: string;
  /** image | audio | video | pdf */
  kind: 'image' | 'audio' | 'video' | 'pdf';
  mime: string;
  /** Short auto-generated description of the file's content (VLM OCR / doc head). */
  description: string;
}

export interface DeepAgentGenerationParams {
  topic: string;
  system: string;
  types: string[];
  difficulties: string[];
  count: number;
  /** Weakness-targeted generation (from attempt analytics). */
  weakTopics?: string[];
  /** Extra planner guidance. */
  focusHint?: string;
  /** RAG grounding: KnowledgeSource ids (already ownership-filtered). */
  knowledgeSourceIds?: string[];
  /** Owner of the knowledge sources. */
  userId?: string;
  /** Optional user-selected model ("providerId:modelId"). */
  modelString?: string;
  /** Cooperative cancellation: checked between agent steps so a client abort
   *  stops the run instead of grinding the LLM gateway for minutes. */
  signal?: AbortSignal;
  /** Explicit provider to run against (e.g. the Z.AI fallback when the primary
   *  gateway is rate-limit-storming). Set by callers that already detected the
   *  overload — the two-attempt wrapper in this module sets it for attempt 2. */
  providerOverride?: MedQProviderOverride;
}

export type DeepAgentEvent =
  | { type: 'status'; model: string }
  | { type: 'plan'; todos: unknown[] }
  /** A tool CALL — the request side. Args are the parsed input object.
   * `id` correlates this call with its eventual tool_end (tool_call id for
   * the orchestrator's own tools; a generated callId for instrumented
   * subagent tools). A call is NOT a result: the UI must never imply
   * success from this event alone. */
  | { type: 'tool_start'; tool: string; id?: string; args?: unknown }
  /** A tool RESULT — the outcome side. `excerpt` previews the payload,
   * `ok` is false when the tool threw, `durationMs` is the execution time. */
  | { type: 'tool_end'; tool: string; ok: boolean; id?: string; excerpt?: string; durationMs?: number }
  | { type: 'subagent'; name: string; event: 'started' | 'completed' }
  | { type: 'saved'; question: Record<string, unknown>; index: number }
  | { type: 'done'; saved: number; requested: number }
  | { type: 'error'; error: string };

/** One saved question as returned to the client (options/tags parsed). */
type SavedQuestion = Record<string, unknown>;

// ---------------------------------------------------------------------------
// Model resolution — user selection > DB default > env default
// ---------------------------------------------------------------------------

async function resolveGenerationModel(params: DeepAgentGenerationParams) {
  // Caller-detected provider override (Z.AI fallback) wins — it means the
  // primary gateway already failed for this session/run.
  if (params.providerOverride) {
    const o = params.providerOverride;
    return {
      apiKey: o.apiKey,
      baseUrl: o.baseUrl,
      model: o.model,
      label: o.label,
      defaultHeaders: o.defaultHeaders,
    };
  }
  // Prefer an explicit model string; then the user's saved default; then the
  // shared agent config (MEDQ_AGENT_MODEL / OPENAI_MODEL / DEFAULT_MODEL).
  // "auto" (or a blank string) = "no selection" — the same contract as the
  // ModelPicker's Auto option. It must not reach resolveModel:
  // parseModelString("auto") maps it to a keyless zai:auto pick.
  const requested = typeof params.modelString === 'string' ? params.modelString.trim() : '';
  if (requested && requested !== 'auto') {
    try {
      const { resolveModel } = await import('@/lib/server/resolve-model');
      const resolved = await resolveModel({
        modelString: requested,
        userId: params.userId,
      });
      if (resolved?.apiKey) {
        // Z.AI's gateway needs its session headers (X-Token) — Bearer alone
        // is rejected. Other providers carry no extra headers.
        const { readConfig: readZaiConfig } = await import('@/lib/zai');
        const zai = resolved.providerId === 'zai' ? readZaiConfig() : null;
        return {
          apiKey: resolved.apiKey,
          baseUrl: resolved.baseUrl,
          model: resolved.modelId,
          label: `${resolved.providerId}:${resolved.modelId}`,
          ...(zai ? { defaultHeaders: zaiGatewayHeaders(zai) } : {}),
        };
      }
    } catch { /* fall through to shared config */ }
  }

  if (params.userId) {
    try {
      const user = await db.user.findUnique({
        where: { id: params.userId },
        select: { defaultModel: true },
      });
      if (user?.defaultModel && user.defaultModel.trim() && user.defaultModel.trim() !== 'auto') {
        const { resolveModel } = await import('@/lib/server/resolve-model');
        const resolved = await resolveModel({
          modelString: user.defaultModel,
          userId: params.userId,
        });
        if (resolved?.apiKey) {
          const { readConfig: readZaiConfig } = await import('@/lib/zai');
          const zai = resolved.providerId === 'zai' ? readZaiConfig() : null;
          return {
            apiKey: resolved.apiKey,
            baseUrl: resolved.baseUrl,
            model: resolved.modelId,
            label: `${resolved.providerId}:${resolved.modelId}`,
            ...(zai ? { defaultHeaders: zaiGatewayHeaders(zai) } : {}),
          };
        }
      }
    } catch { /* fall through to shared config */ }
  }

  const config = resolveMedQAgentConfig();
  return { ...config, label: config.model };
}

// ---------------------------------------------------------------------------
// Library media discovery — which attached sources have retained ORIGINALS
// (the user's own X-rays, auscultation recordings, lecture videos, PDFs) that
// can be displayed inside generated questions.
// ---------------------------------------------------------------------------

async function loadLibraryMedia(
  userId: string | undefined,
  sourceIds: string[] | undefined,
): Promise<LibraryMediaEntry[]> {
  if (!userId || !sourceIds?.length) return [];
  const sources = await db.knowledgeSource.findMany({
    where: { id: { in: sourceIds }, userId, status: 'ready' },
    select: { id: true, name: true, fileKind: true, metaJson: true },
    take: 20,
  });
  const entries: LibraryMediaEntry[] = [];
  for (const s of sources) {
    const hasOriginal = retainedOriginalPath(s.id) !== null;
    if (!hasOriginal) continue;
    let mime = '';
    try {
      const meta = s.metaJson ? (JSON.parse(s.metaJson) as Record<string, unknown>) : {};
      mime = typeof meta.originalMime === 'string' ? meta.originalMime : typeof meta.audioMime === 'string' ? meta.audioMime : '';
    } catch { /* ignore */ }
    const fileKind = s.fileKind || '';
    const kind: LibraryMediaEntry['kind'] | null =
      fileKind === 'image' || mime.startsWith('image/') ? 'image'
      : fileKind === 'video' || mime.startsWith('video/') ? 'video'
      : fileKind === 'audio' || mime.startsWith('audio/') ? 'audio'
      : mime === 'application/pdf' ? 'pdf'
      : null;
    if (!kind) continue;
    // A short content description helps the agent decide WHICH file fits a
    // question without calling the analysis tool first.
    const doc = await db.knowledgeDocument.findFirst({
      where: { sourceId: s.id },
      select: { content: true },
    });
    const description = (doc?.content ?? '')
      .replace(/[#*`>\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 320);
    entries.push({ sourceId: s.id, name: s.name, kind, mime, description });
  }
  return entries;
}

function mediaUrlFor(sourceId: string): string {
  return `/api/knowledge/sources/${sourceId}/file`;
}

// ---------------------------------------------------------------------------
// save_question — the tool that makes the agent REAL
// ---------------------------------------------------------------------------

const DIFFICULTY_LEVELS = ['Easy', 'Basic', 'Medium', 'Moderate', 'Hard', 'Expert'] as const;

function createSaveQuestionTool(
  params: DeepAgentGenerationParams,
  saved: SavedQuestion[],
  maxSaves: number,
  libraryMedia: LibraryMediaEntry[],
) {
  // Allowlist of sourceIds whose ORIGINAL files may be attached — the agent
  // physically cannot attach files the user didn't upload and select.
  const attachable = new Map(libraryMedia.map((m) => [m.sourceId, m]));

  return new DynamicStructuredTool({
    name: 'save_question',
    description: [
      'Save ONE complete, finished exam question to the MedQ question bank.',
      'Call this tool once per question, immediately after the question is finalized.',
      'Every question you produce MUST be saved through this tool — never report questions as done without saving them.',
      'For MCQ questions provide 4-5 options and set answer to the full text of the correct option.',
      'When the question should DISPLAY one of the user\'s own files (X-ray, photo, recording, video), pass that file\'s sourceId in attachSourceMediaId — never invent media URLs.',
      'Pass citations (sourceId + chunkId pairs returned by search_knowledge_base / the grounding material) for EVERY passage that grounded the question, so the user can verify it against the highlighted source.',
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
      system: z.string().default(''),
      topic: z.string().default(''),
      tags: z.array(z.string()).default([]),
      imageUrl: z.string().default('').describe('Media URL returned by your media tools ONLY — never invented'),
      audioUrl: z.string().default('').describe('Media URL returned by your media tools ONLY — never invented'),
      illustrationDescription: z.string().default(''),
      attachSourceMediaId: z.string().default('').describe('sourceId of a file from the MEDIA LIBRARY section to display inside this question (X-ray, image, audio, video). Leave empty when no library file fits.'),
      citations: z.array(z.object({
        sourceId: z.string().describe('Knowledge source id (from the grounding material or search results)'),
        chunkId: z.string().describe('The chunk id (K# id) of the exact passage used'),
      })).default([]).describe('Passages that grounded this question — enables highlight-in-source verification'),
      videoScene: z.object({
        sourceId: z.string().min(5).describe('sourceId of the cited video (must be in the MEDIA LIBRARY)'),
        startSec: z.number().min(0).describe('Scene span start in seconds (from search_video_scenes / analyze_library_video)'),
        endSec: z.number().min(0).describe('Scene span end in seconds'),
      }).optional().describe('Timestamped video citation — the player deep-links to this exact span (mediaTimeSec)'),
    }),
    func: async (q) => {
      if (saved.length >= maxSaves) {
        return JSON.stringify({ saved: false, reason: `Save limit reached (${maxSaves}). Stop generating.` });
      }
      const type = ['mcq', 'tf', 'short'].includes(q.type) ? q.type : 'mcq';
      const options = Array.isArray(q.options)
        ? q.options.map((o) => String(o).slice(0, 400)).filter(Boolean)
        : [];
      if (type === 'mcq' && options.length < 2) {
        return JSON.stringify({ saved: false, reason: 'MCQ questions need at least 2 options. Fix and re-save.' });
      }
      if (type !== 'mcq' && options.length > 0 && !options.includes(q.answer)) {
        // non-MCQ: options are optional, keep only if meaningful
        if (options.length < 2) { /* drop stray single option */ }
      }
      const difficulty = DIFFICULTY_LEVELS.includes(q.difficulty as typeof DIFFICULTY_LEVELS[number])
        ? q.difficulty
        : 'Medium';
      const tags = [
        params.topic,
        params.system || 'General',
        'deep-agent',
        q.topic || '',
        ...(Array.isArray(q.tags) ? q.tags.map((t) => String(t).slice(0, 60)) : []),
      ]
        .filter(Boolean)
        .slice(0, 8);

      // ── Attach one of the user's OWN files (X-ray / photo / audio / video) ──
      // Resolved server-side from the allowlist, so the media URL is always
      // real and owner-gated; the kind decides which question field it lands in.
      let imageUrl = String(q.imageUrl || '').slice(0, 1000);
      let audioUrl = String(q.audioUrl || '').slice(0, 1000);
      let videoUrl = '';
      let attachedMediaNote = '';
      const attachId = String(q.attachSourceMediaId || '').trim();
      if (attachId) {
        const media = attachable.get(attachId);
        if (!media) {
          return JSON.stringify({
            saved: false,
            reason: `attachSourceMediaId "${attachId}" is not in the MEDIA LIBRARY. Use one of: ${[...attachable.keys()].join(', ')}.`,
          });
        }
        const url = mediaUrlFor(media.sourceId);
        if (media.kind === 'image') imageUrl = url;
        else if (media.kind === 'audio') audioUrl = url;
        else if (media.kind === 'video') videoUrl = url;
        attachedMediaNote = `attached user file "${media.name}" (${media.kind})`;
      }

      // ── Citations: VERIFY the (sourceId, chunkId) pairs against the answer ──
      // Three layers (each fixes a measured failure mode):
      //   1. AGENT PICKS — the pairs the agent passed, validated against the
      //      DB (owner + attached-sources only).
      //   2. CORRECTIVE RETRIEVAL — answer-support reranked retrieval over the
      //      attached sources with question+answer as the query: surfaces
      //      answer-bearing chunks the agent never cited. The agent picks
      //      citations by topical reading; the reranker's rubric demands the
      //      passage STATE the answer fact.
      //   3. CONJUNCTION GATE — an LLM judge (answer-support rubric, shared
      //      with the reranker) AND a token answer-coverage score must AGREE:
      //      judge >= 7 AND coverage >= 0.15. The judge alone over-scores
      //      on-topic lists; the token scorer alone under-measures
      //      paraphrased mechanisms (~0.48) — together they keep only real
      //      answer-bearing passages, and honestly drop citations when the
      //      answer isn't in the corpus.
      const citations: Array<Record<string, unknown>> = [];
      const rawCitations = Array.isArray(q.citations) ? q.citations.slice(0, 5) : [];
      const citedSourceIds = new Set<string>();
      if (rawCitations.length && params.userId) {
        try {
          // Union pool: agent picks + corrective retrieval, deduped.
          const pool = new Map<string, {
            chunkId: string;
            content: string;
            sourceId: string;
            documentId: string;
            title: string;
            fileKind: string;
          }>();

          // 1) agent picks (best-effort provenance — DB-validated)
          const chunkRows = await db.knowledgeChunk.findMany({
            where: {
              id: { in: rawCitations.map((c) => String(c.chunkId || '')).filter(Boolean) },
              sourceId: { in: params.knowledgeSourceIds ?? [] },
              source: { userId: params.userId },
            },
            select: { id: true, sourceId: true, documentId: true, content: true, source: { select: { name: true, fileKind: true } } },
            take: 10,
          });
          for (const row of chunkRows) {
            pool.set(row.id, {
              chunkId: row.id,
              content: row.content,
              sourceId: row.sourceId,
              documentId: row.documentId,
              title: row.source.name,
              fileKind: row.source.fileKind || 'document',
            });
          }

          // 2) corrective retrieval (answer-support mode, full question+answer)
          const answerText = String(q.answer || '');
          const questionText = String(q.text || '')
            .replace(/<[^>]*>/g, ' ')
            .replace(/&#?[a-z0-9]+;/gi, ' ');
          try {
            const corrective = await retrieveKnowledgeHybrid(
              params.userId,
              `${questionText} ${answerText}`.slice(0, 900),
              {
                sourceIds: params.knowledgeSourceIds,
                topK: 8,
                rerankMode: 'answer-support',
                answerContext: {
                  answer: answerText,
                  rationale: String(q.explanation || '').slice(0, 900),
                },
                skipLog: true,
              },
            );
            // Resolve real source name + fileKind for the corrective hits
            // (HybridChunk only carries the document title).
            const newSourceIds = [...new Set(corrective.chunks.map((c) => c.sourceId))]
              .filter((sid) => ![...pool.values()].some((p) => p.sourceId === sid));
            const sourceRows = newSourceIds.length
              ? await db.knowledgeSource.findMany({
                  where: { id: { in: newSourceIds } },
                  select: { id: true, name: true, fileKind: true },
                })
              : [];
            const sourceById = new Map(sourceRows.map((r) => [r.id, r]));
            for (const chunk of corrective.chunks) {
              if (pool.has(chunk.chunkId)) continue;
              const src = sourceById.get(chunk.sourceId);
              pool.set(chunk.chunkId, {
                chunkId: chunk.chunkId,
                content: chunk.content,
                sourceId: chunk.sourceId,
                documentId: chunk.documentId,
                title: src?.name || chunk.documentTitle,
                fileKind: src?.fileKind || 'document',
              });
            }
          } catch { /* corrective retrieval is best-effort */ }

          // 3) judge + coverage conjunction gate
          const candidates = [...pool.values()].slice(0, JUDGE_MAX_CANDIDATES);
          if (candidates.length > 0 && answerText.trim()) {
            const verdicts = await judgeCitationSupport(
              undefined,
              answerText,
              questionText,
              candidates.map((c) => ({ chunkId: c.chunkId, content: c.content })),
              String(q.explanation || '').slice(0, 900),
            );
            const verdictMap = new Map(verdicts.map((v) => [v.chunkId, v.score]));
            const kept = candidates
              .map((c) => ({
                ...c,
                judgeScore: verdictMap.get(c.chunkId) ?? 0,
                coverage: answerTokenCoverage(c.content, answerText),
              }))
              // CONJUNCTION GATE: semantic AND token evidence must agree.
              .filter((c) => c.judgeScore >= 7 && c.coverage >= 0.15)
              .sort((a, b) => b.judgeScore - a.judgeScore || b.coverage - a.coverage)
              .slice(0, 4);

            for (const c of kept) {
              citedSourceIds.add(c.sourceId);
              citations.push({
                sourceId: c.sourceId,
                chunkId: c.chunkId,
                documentId: c.documentId,
                title: c.title,
                fileKind: c.fileKind,
                // ANSWER-ANCHORED, sentence-complete quote: scored against
                // question + answer so the highlighted passage contains the
                // answer-relevant sentences (the viewer's answer scope).
                quote: buildCitationQuote(String(c.content), `${questionText} ${answerText}`, 400),
                // Full chunk inline: the viewer's "full chunk" scope and
                // offline verification both work without refetching.
                chunkContent: String(c.content),
                answerCoverage: Number(c.coverage.toFixed(2)),
                judgeScore: c.judgeScore,
              });
            }
          }
        } catch { /* citations are best-effort provenance */ }
      }

      // ── Timestamped video citation (Stage 3 mediaTimeSec) ──
      let videoSourceId = '';
      let videoSceneStart = 0;
      let videoSceneEnd = 0;
      if (q.videoScene?.sourceId) {
        const media = attachable.get(q.videoScene.sourceId);
        if (media && media.kind === 'video') {
          let sStart = Math.max(0, Number(q.videoScene.startSec) || 0);
          let sEnd = Math.max(0, Number(q.videoScene.endSec) || 0);
          if (sEnd < sStart) [sStart, sEnd] = [sEnd, sStart];
          videoSourceId = q.videoScene.sourceId;
          videoSceneStart = sStart;
          videoSceneEnd = sEnd;
          // A scene citation implies the video should display with the question.
          if (!videoUrl && !attachId) videoUrl = mediaUrlFor(q.videoScene.sourceId);
        }
      }

      const sourcesJson = citations.length
        ? citations.map((c) => ({ type: 'library', title: String(c.title) }))
        : [];

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
          system: (q.system || params.system || 'General').slice(0, 120),
          topic: (q.topic || params.topic).slice(0, 200),
          tags: JSON.stringify(tags),
          isAIGenerated: true,
          imageUrl,
          audioUrl,
          videoUrl,
          videoSourceId,
          videoSceneStart,
          videoSceneEnd,
          illustrationDescription: String(q.illustrationDescription || '').slice(0, 1000),
          // Provenance: which library sources + exact passages grounded this question
          knowledgeSourceIds: JSON.stringify([...citedSourceIds]),
          citations: JSON.stringify(citations),
          sources: JSON.stringify(sourcesJson),
          reviewStatus: 'pending',
          reviewNotes: '',
        },
      });

      const savedQuestion: SavedQuestion = {
        ...record,
        options: JSON.parse(record.options),
        tags: JSON.parse(record.tags),
        mediaGeneratedBy: 'deep-agent',
      };
      saved.push(savedQuestion);
      const index = saved.length;

      return JSON.stringify({
        saved: true,
        id: record.id,
        index,
        ...(citations.length ? { citations: citations.length } : {}),
        ...(attachedMediaNote ? { media: attachedMediaNote } : {}),
        message: `Question ${index} saved (id ${record.id})${citations.length ? `, ${citations.length} citation${citations.length > 1 ? 's' : ''}` : ''}${attachedMediaNote ? `, ${attachedMediaNote}` : ''}. Continue with the next question or summarize when done.`,
      });
    },
  });
}

// ---------------------------------------------------------------------------
// RAG retrieval tool (grounding on demand)
// ---------------------------------------------------------------------------

function createKnowledgeSearchTool(userId?: string, sourceIds?: string[]) {
  return new DynamicStructuredTool({
    name: 'search_knowledge_base',
    description: [
      'Search the user\'s own knowledge library (lecture notes, PDFs, transcripts) for passages that ground the questions.',
      'Use it when the provided source material is insufficient for the requested topic.',
      'Every returned passage carries its sourceId and chunkId — pass those pairs into save_question.citations so each question is verifiable against the highlighted source passage.',
    ].join(' '),
    schema: z.object({
      query: z.string().min(3).describe('Focused query into the knowledge library'),
    }),
    func: async ({ query }) => {
      if (!userId || !sourceIds?.length) {
        return JSON.stringify({ passages: [], note: 'No knowledge sources are attached to this request.' });
      }
      try {
        const result = await retrieveKnowledgeHybrid(userId, query, { sourceIds, topK: 5 });
        const passages = result.chunks.map((c: HybridChunk) => ({
          sourceId: c.sourceId,
          chunkId: c.chunkId,
          source: c.documentTitle ?? 'source',
          excerpt: trimToSentence(String(c.content ?? ''), 700),
        }));
        return JSON.stringify({ passages });
      } catch (err) {
        return JSON.stringify({ passages: [], error: err instanceof Error ? err.message : 'retrieval failed' });
      }
    },
  });
}

// ---------------------------------------------------------------------------
// analyze_library_image — study one of the user's OWN retained images
// (X-rays, microscopy, ECG scans, anatomy photos) before writing questions
// about it. The file never leaves the server: it is read from the retained
// store and passed to the vision model as a data URL.
// ---------------------------------------------------------------------------

function createVideoSceneSearchTool(userId?: string, sourceIds?: string[]) {
  return new DynamicStructuredTool({
    name: 'search_video_scenes',
    description: [
      'Semantic search over the user\'s UPLOADED videos (MEDIA LIBRARY) at SCENE granularity.',
      'Each hit is a timestamped span (mediaTimeSec) with what was SHOWN (frame description) and what was SAID (transcript) in that span.',
      'Use for "what happens at 12:34", "find the segment where they demonstrate intubation", "what was on screen during the explanation of X".',
      'When a question targets a specific video moment, pass the scene\'s sourceId + startSec/endSec into save_question.videoScene so the player can deep-link to it.',
      'NOT for finding videos online (use web search).',
    ].join(' '),
    schema: z.object({
      query: z.string().min(2).max(2_000).describe('What to look for in the video library'),
      top_k: z.number().int().min(1).max(20).optional().describe('Max scenes to return (default 6)'),
    }),
    func: async ({ query, top_k }) => {
      if (!userId) {
        return JSON.stringify({ ok: true, note: 'No user context — no video library available.' });
      }
      try {
        const hits = await searchVideoScenes(userId, query, {
          ...(sourceIds?.length ? { sourceIds } : {}),
          topK: top_k ?? 6,
        });
        if (hits.length === 0) {
          return JSON.stringify({
            ok: true,
            note: 'No video scenes matched. Check the MEDIA LIBRARY list — only uploaded/imported videos have scene indexes.',
          });
        }
        return JSON.stringify({
          ok: true,
          context: formatVideoSceneContext(hits),
          scenes: hits.map((hit, i) => ({
            ref: `V${i + 1}`,
            sourceId: hit.sourceId,
            sourceName: hit.sourceName,
            sceneIdx: hit.sceneIdx,
            mediaTimeSec: Math.round(hit.startSec),
            startSec: hit.startSec,
            endSec: hit.endSec,
            relevance: Math.round(Math.max(hit.score, 0) * 100),
          })),
        });
      } catch (error) {
        return JSON.stringify({ ok: false, error: error instanceof Error ? error.message.slice(0, 200) : String(error) });
      }
    },
  });
}

function createAnalyzeLibraryImageTool(userId?: string, libraryMedia: LibraryMediaEntry[] = []) {
  const images = new Map(libraryMedia.filter((m) => m.kind === 'image').map((m) => [m.sourceId, m]));
  return new DynamicStructuredTool({
    name: 'analyze_library_image',
    description: [
      'Analyze one of the user\'s own uploaded images (from the MEDIA LIBRARY section) with a vision model.',
      'Use it BEFORE writing a question that hinges on interpreting that image — e.g. read an X-ray\'s findings, identify a microscopy specimen, interpret an ECG scan.',
      'Returns a detailed medical description you can build the question and options around.',
    ].join(' '),
    schema: z.object({
      sourceId: z.string().min(5).describe('The sourceId of an image listed in the MEDIA LIBRARY section'),
      question: z.string().min(5).describe('What medical details to extract from the image (be specific: modality, region, findings)')
    }),
    func: async ({ sourceId, question }) => {
      const media = images.get(sourceId);
      if (!media) {
        return JSON.stringify({
          error: `sourceId "${sourceId}" is not an image in the MEDIA LIBRARY. Available images: ${[...images.keys()].join(', ') || '(none)'}.`,
        });
      }
      if (!userId) return JSON.stringify({ error: 'No user context — cannot read library files.' });
      const file = readRetainedOriginal(sourceId);
      if (!file) return JSON.stringify({ error: 'The original image bytes are not available for this source.' });
      try {
        const mime = media.mime.startsWith('image/') && media.mime !== 'image/heic' ? media.mime : 'image/jpeg';
        const description = await describeImage(
          file.buffer,
          mime,
          `You are a medical educator analyzing the user's uploaded image for exam-question authoring. Question focus: ${question}. Describe: 1) modality/type and overall quality, 2) the key anatomical structures visible, 3) abnormal findings / pathology with their location, 4) the classic diagnosis(es) this image illustrates, 5) discriminating features that separate the likely answer from look-alikes. Be precise and factual.`,
        );
        if (!description) {
          return JSON.stringify({ error: 'Vision analysis is unavailable right now — write the question from the stored description in the MEDIA LIBRARY entry instead.' });
        }
        return JSON.stringify({ sourceId, name: media.name, analysis: description });
      } catch (err) {
        return JSON.stringify({ error: `Image analysis failed: ${err instanceof Error ? err.message.slice(0, 200) : 'unknown'}` });
      }
    },
  });
}

// ---------------------------------------------------------------------------
// analyze_library_video — study one of the user's OWN retained videos
// (operation recordings, technique demonstrations, clinical skills clips)
// before writing "watch then answer" questions about them. Evenly-sampled
// frames are described by the vision model against the agent's specific
// question focus, and the stored transcript (with [mm:ss] timestamps) is
// merged in so the agent sees BOTH what is shown and what is said.
// ---------------------------------------------------------------------------

function createAnalyzeLibraryVideoTool(userId?: string, libraryMedia: LibraryMediaEntry[] = []) {
  const videos = new Map(libraryMedia.filter((m) => m.kind === 'video').map((m) => [m.sourceId, m]));
  return new DynamicStructuredTool({
    name: 'analyze_library_video',
    description: [
      'Analyze one of the user\'s own uploaded videos (from the MEDIA LIBRARY section): what is shown on screen across its timeline.',
      'Use it BEFORE writing a "watch the video and answer" question — e.g. identify the surgical technique demonstrated, the clinical procedure steps, or the examination maneuver performed.',
      'Returns per-timestamp frame descriptions plus the spoken transcript, so the question and options can hinge on what the video ACTUALLY shows.',
    ].join(' '),
    schema: z.object({
      sourceId: z.string().min(5).describe('The sourceId of a video listed in the MEDIA LIBRARY section'),
      question: z.string().min(5).describe('What to look for in the video (be specific: which technique / procedure / signs to identify)'),
    }),
    func: async ({ sourceId, question }) => {
      const media = videos.get(sourceId);
      if (!media) {
        return JSON.stringify({
          error: `sourceId "${sourceId}" is not a video in the MEDIA LIBRARY. Available videos: ${[...videos.keys()].join(', ') || '(none)'}.`,
        });
      }
      if (!userId) return JSON.stringify({ error: 'No user context — cannot read library files.' });
      const file = readRetainedOriginal(sourceId);
      if (!file) return JSON.stringify({ error: 'The original video bytes are not available for this source.' });
      if (file.buffer.length > 300 * 1024 * 1024) {
        return JSON.stringify({ error: 'This video is too large to analyze inline (over 300 MB) — write the question from the stored description in the MEDIA LIBRARY entry instead.' });
      }
      try {
        // Stored transcript (ASR ran at ingestion; carries [mm:ss] stamps).
        const doc = await db.knowledgeDocument.findFirst({
          where: { sourceId },
          select: { content: true },
        });
        const transcriptExcerpt = trimToSentence(doc?.content ?? '', 3500);

        // Stage 3 fast path: the stored scene timeline (ingestion-time VLM +
        // ASR, per scene) answers most "what happens in this video" questions
        // WITHOUT re-running ffmpeg + frame VLM. Only fall back to a live
        // analyzeVideoFrames pass when no scene index was persisted.
        const storedScenes = await listVideoScenes(userId, sourceId);
        if (storedScenes.length > 0) {
          return JSON.stringify({
            sourceId,
            name: media.name,
            durationSec: Math.round(storedScenes[storedScenes.length - 1].endSec),
            sceneTimeline: storedScenes.map((s) =>
              `[${fmtVideoTimestamp(s.startSec)}–${fmtVideoTimestamp(s.endSec)}] ` +
              [s.description, s.transcript].filter(Boolean).join(' — ') || '(no content extracted)',
            ),
            note: 'Stored scene timeline from ingestion. For save_question.videoScene use sourceId ' + sourceId + ' and the scene startSec/endSec that matches your focus.',
            ...(transcriptExcerpt ? { transcriptExcerpt } : {}),
          });
        }

        const frames = await analyzeVideoFrames(
          file.buffer,
          `You are a medical educator analyzing a frame from the user's uploaded video for exam-question authoring. Question focus: ${question}. Describe what is visibly happening in this frame: 1) the setting (OR / clinic / bedside / lab / microscope), 2) the technique, procedure or maneuver being performed and WHICH step it looks like, 3) instruments, anatomy or pathology visible, 4) any on-screen text or captions. Be precise and factual.`,
        );
        if (!frames) {
          return JSON.stringify({
            sourceId,
            name: media.name,
            note: 'Frame analysis is unavailable right now — write the question from the stored description and transcript below.',
            ...(transcriptExcerpt ? { transcriptExcerpt } : {}),
          });
        }
        return JSON.stringify({
          sourceId,
          name: media.name,
          durationSec: Math.round(frames.durationSec),
          frameAnalysis: frames.frames.map((f) => `[${fmtVideoTimestamp(f.offsetSec)}] ${f.description}`),
          ...(transcriptExcerpt ? { transcriptExcerpt } : {}),
        });
      } catch (err) {
        return JSON.stringify({ error: `Video analysis failed: ${err instanceof Error ? err.message.slice(0, 200) : 'unknown'}` });
      }
    },
  });
}

/** mm:ss for the frame analysis notes. */
function fmtVideoTimestamp(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.round(sec % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// The question-author subagent
// ---------------------------------------------------------------------------

function buildQuestionAuthorSubagent(tools: ReturnType<typeof createMultimodalTools>): SubAgent {
  return {
    name: 'question-author',
    description: 'Specialist medical question writer. Produces exam-ready questions as a strict JSON array with full explanations and media requirements.',
    systemPrompt: [
      'You are the Question Author subagent for MedQ.',
      'Write medically accurate, exam-style questions for the delegated request.',
      'Match the requested types, difficulties, and count EXACTLY.',
      'Return ONLY a JSON array. Each object must have: type (mcq|tf|short), text, options, answer, explanation, mnemonic, clinicalPearl, distractorAnalysis, difficulty, system, topic, tags, mediaRequirements.',
      'mediaRequirements is an array of { type: image|audio, required: boolean, purpose, prompt }. Use [] when no media is needed.',
      'NEVER invent imageUrl or audioUrl values — those are supplied later by media tools.',
      'For auscultation/heart-sound/lung-sound questions require audio; for anatomy/imaging/ECG/microscopy require an image.',
      'When a question hinges on interpreting laboratory values, list the values in mediaRequirements.purpose (test, result, units, reference range, H/L flags) so the orchestrator can render them with render_lab_panel, and ALSO write the key values as a compact plain-text table (Test | Result | Reference, one per line) inside the question text.',
      'For anatomy figures, write illustration prompts that demand CLEARLY LABELED diagrams with leader lines and annotation arrows.',
      'You may use search_medical_references for current evidence and analyze_visual_material when a visual reference must be interpreted.',
    ].join('\n'),
    tools,
  };
}

/** Extract the subagent name from a `task` tool call's args
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

// ---------------------------------------------------------------------------
// Orchestrator system prompt
// ---------------------------------------------------------------------------

function buildOrchestratorPrompt(
  params: DeepAgentGenerationParams,
  grounding: string,
  libraryMedia: LibraryMediaEntry[] = [],
): string {
  const lines = [
    'Generate the requested medical questions now.',
    `Topic: ${params.topic}`,
    `Medical system: ${params.system || 'General'}`,
    `Question types: ${params.types.join(', ')}`,
    `Difficulty: ${params.difficulties.join(', ')}`,
    `Count: exactly ${params.count} question${params.count > 1 ? 's' : ''}`,
  ];
  if (params.weakTopics?.length) lines.push(`Learner weak areas to target: ${params.weakTopics.join('; ')}`);
  if (params.focusHint) lines.push(`Extra guidance: ${params.focusHint}`);
  if (grounding) lines.push(`\nGrounding source material from the user's knowledge library:\n${grounding}`);
  // ── The user's own retained files (X-rays, auscultation audio, lecture
  // videos, PDFs). Their originals can be DISPLAYED inside questions —
  // "show my X-ray and ask me about it". ──
  if (libraryMedia.length) {
    const mediaLines = libraryMedia.map((m) =>
      `- sourceId: ${m.sourceId} | file: "${m.name}" | kind: ${m.kind}${m.mime ? ` (${m.mime})` : ''} | content: ${m.description || '(no description)'}`,
    );
    lines.push(
      '\nMEDIA LIBRARY — the user\'s OWN uploaded files (originals are retained on this server):',
      ...mediaLines,
      'RULES FOR USING THESE FILES:',
      '1. When a question should let the learner INTERPRET one of these files (e.g. "What abnormality is seen in this chest X-ray?"), you MUST attach it: analyze the image first with analyze_library_image (for images) or analyze_library_video (for videos), then pass that file\'s sourceId into save_question.attachSourceMediaId. The system resolves the display URL — never write file URLs yourself.',
      '2. Image questions should reference the displayed finding IN the stem ("The radiograph below shows…") and keep mediaRequirements empty — the real file replaces a generated illustration.',
      '3. Audio (auscultation recordings, heart sounds) → attachSourceMediaId works the same way; write a listening cue in the stem (include the character 🔊, e.g. "🔊 Auscultate the recording above") so the player shows BEFORE the answer is revealed — the learner listens and answers.',
      '4. Files that don\'t fit the requested topic can be ignored; NEVER force a weak match — write a text/generated-image question instead.',
      '5. Video files (operation recordings, technique demonstrations, clinical skills clips) → ALWAYS analyze first with analyze_library_video, then attach via attachSourceMediaId and write a watch cue in the stem (include the character 🎬, e.g. "🎬 Watch the video above, then answer"). The question should hinge on what the video actually shows — e.g. "Which technique is demonstrated in the video above?" — with distractors that are plausible look-alike techniques/procedures.',
    );
  }
  // Media intent: when the user's request (topic / focusHint) explicitly asks
  // for images, make that requirement UNMISSABLE so the author subagent emits
  // mediaRequirements and the agent generates images instead of saving
  // imageless questions (observed failure: "short stature with images" runs
  // that saved every question with an empty imageUrl).
  const mediaIntent = /image|illustrat|photo|picture|diagram|visual|x-?ray|ecg|ekg|microscop|mri|ct scan|ultrasound|sonograph|scan|radiograph/i
    .test(`${params.topic} ${params.focusHint ?? ''} ${params.types.join(' ')}`);
  const hasUsableLibraryImage = libraryMedia.some((m) => m.kind === 'image');
  if (mediaIntent && hasUsableLibraryImage) {
    lines.push(
      'MEDIA REQUIREMENT (imaging was requested AND the user\'s own image files are attached): prefer the USER\'S OWN images over generated illustrations — every imaging question should attach a library image via save_question.attachSourceMediaId after analyzing it with analyze_library_image. Fall back to generate_medical_illustration only when no library image fits the specific question.',
    );
  } else if (mediaIntent) {
    lines.push(
      'MEDIA REQUIREMENT (user explicitly requested images): every question MUST include a required image entry in mediaRequirements, and you MUST generate each image with generate_medical_illustration BEFORE saving that question, passing the returned URL into save_question.imageUrl.',
      'If an image generation fails after one retry, save that question without an image and clearly report which questions ended up imageless.',
    );
  }
  // Video intent: the user asked about videos / techniques / operations AND
  // attached their own video files → those clips become the question stimuli.
  const videoIntent = /video|clip|footage|technique|operation|surgery|surgical|procedure|endoscop|laparoscop|demonstration|catheter|suture|intubat|clinical skill/i
    .test(`${params.topic} ${params.focusHint ?? ''} ${params.types.join(' ')}`);
  const hasUsableLibraryVideo = libraryMedia.some((m) => m.kind === 'video');
  if (videoIntent && hasUsableLibraryVideo) {
    lines.push(
      'VIDEO REQUIREMENT (video/technique content was requested AND the user\'s own video files are attached): build "watch then answer" questions around the USER\'S OWN videos — analyze each one with analyze_library_video FIRST, then attach it via save_question.attachSourceMediaId with a 🎬 watch cue in the stem. The options must be plausible technique/procedure look-alikes discriminated by what the video actually shows.',
    );
  }
  // Lab-panel intent: questions that hinge on interpreting lab values get a
  // deterministic SVG lab report (exact numbers, clean layout) instead of an
  // LLM-drawn image, PLUS the values written into the stem text so they are
  // readable without the image.
  const labIntent = /lab|labs|panel|cbc|bmp|cmp|abg|blood gas|liver function|lft|renal function|rft|thyroid function|tsh|t4|electrolyt|potassium|sodium|creatinine|hemoglobin|platelet|wbc|urinalysis|lipid profile|hba1c/i
    .test(`${params.topic} ${params.focusHint ?? ''}`);
  if (labIntent || mediaIntent) {
    lines.push(
      'LAB PANEL REQUIREMENT: any question whose stem depends on interpreting laboratory values MUST call render_lab_panel with the structured values (test, result, units, reference, H/L flags) and pass the returned URL into save_question.imageUrl. ALSO write the key values as a compact plain-text table inside the question text (Test | Result | Reference, one per line) so the values stay readable without the image. Do NOT use generate_medical_illustration for lab-value tables.',
    );
  }
  lines.push(
    'Workflow: delegate authoring to the question-author subagent (task tool), then call save_question for EVERY question in its JSON array.',
    'If mediaRequirements demands an image or audio, generate it with generate_medical_illustration / generate_medical_audio FIRST and pass the returned URL into save_question.',
    'For anatomy or imaging-style figures, request CLEARLY LABELED diagrams: the illustration prompt must ask for labeled annotations with leader lines (e.g. "labeled anatomical diagram with arrows pointing to each structure").',
    'CITATIONS: every question grounded in the attached source material MUST carry its passages in save_question.citations (sourceId + chunkId pairs from the grounding material above or from search_knowledge_base results) so the user can verify each question against the highlighted source.',
    'Finish with a one-line summary of how many questions you saved.',
  );
  return lines.join('\n');
}

// ---------------------------------------------------------------------------
// Main entry — async generator of agent events
// ---------------------------------------------------------------------------

/** Wall-clock guard so a stuck agent cannot run forever. */
const RUN_DEADLINE_MS = 180 * 60 * 1000;

export async function* runDeepAgentQuestionGeneration(
  params: DeepAgentGenerationParams,
): AsyncGenerator<DeepAgentEvent> {
  const startedAt = Date.now();
  const saved: SavedQuestion[] = [];
  const maxSaves = Math.min(Math.max(params.count, 1), 100);

  // ── Model ──
  const config = await resolveGenerationModel(params);
  if (!config.apiKey) {
    yield { type: 'error', error: 'No AI provider is configured for the deep agent. Set a provider key or DEFAULT_MODEL.' };
    return;
  }
  // Built separately so TS keeps the ClientOptions shape (a conditional
  // spread widens defaultHeaders to {} and fails the overload — same lesson
  // as deep-agent-runtime).
  const modelConfiguration: { baseURL?: string; defaultHeaders?: Record<string, string> } = {
    baseURL: config.baseUrl,
  };
  if (config.defaultHeaders) modelConfiguration.defaultHeaders = config.defaultHeaders;
  const model = new ChatOpenAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature: 0.3,
    configuration: modelConfiguration,
    // Retry through short z.ai-gateway 429/5xx storms (see deep-agent-runtime).
    maxRetries: 4,
  });
  yield { type: 'status', model: config.label };

  // ── RAG grounding (batch-level retrieval, once) ──
  // Each passage carries its (sourceId, chunkId) so the agent can pass them
  // into save_question.citations → highlight-in-source verification.
  let grounding = '';
  if (params.userId && params.knowledgeSourceIds?.length) {
    try {
      const result = await retrieveKnowledgeHybrid(params.userId, params.topic, {
        sourceIds: params.knowledgeSourceIds,
        topK: 8,
      });
      if (result.chunks.length) {
        grounding = result.chunks
          .map(
            (c: HybridChunk, i: number) =>
              `[${i + 1}] (sourceId ${c.sourceId}, chunkId ${c.chunkId}, from "${c.documentTitle ?? 'source'}")\n${trimToSentence(String(c.content ?? ''), 900)}`,
          )
          .join('\n\n');
      }
    } catch { /* grounding is best-effort */ }
  }

  // ── The user's own retained media files (X-rays, audio, video, PDFs) ──
  const libraryMedia = await loadLibraryMedia(params.userId, params.knowledgeSourceIds).catch(() => []);

  // ── Tools & subagent ──
  const multimodalTools = createMultimodalTools(resolveMedQAgentConfig);
  const saveTool = createSaveQuestionTool(params, saved, maxSaves, libraryMedia);

  // ── Tool activity instrumentation (tool call ≠ tool result) ──
  // Tools the SUBAGENT executes are invisible to this graph's 'updates'
  // stream (their ToolMessages live inside the subagent's opaque state), so
  // their cards would sit on "waiting for the result…" forever. The subagent
  // gets an INSTRUMENTED copy of the multimodal tools: each invocation pushes
  // a tool_start (parsed args) and a tool_end (excerpt + ok + duration) into
  // activityQueue, which the stream loop below drains between stream items.
  // The orchestrator keeps the plain tools — its own calls are already
  // observable through the 'updates' stream (AIMessage tool_calls +
  // ToolMessages), and double-instrumenting would duplicate events.
  const activityQueue: ToolActivityEvent[] = [];
  const instrumentedSubagentTools = instrumentToolsForActivity(multimodalTools, (event) => activityQueue.push(event));

  const tools = [
    saveTool,
    createKnowledgeSearchTool(params.userId, params.knowledgeSourceIds),
    createVideoSceneSearchTool(params.userId, params.knowledgeSourceIds),
    createAnalyzeLibraryImageTool(params.userId, libraryMedia),
    createAnalyzeLibraryVideoTool(params.userId, libraryMedia),
    ...multimodalTools,
  ].map((tool) =>
    // AgentToolExecution telemetry — same wrapper the chat registry uses, so
    // generation-agent tool runs land in the same usage tables (kind is
    // distinguishable via the parent AgentRun row: kind 'job' / generation).
    withExecutionTelemetry(tool, { userId: params.userId ?? 'guest' }),
  );

  // ── Persistent per-user filesystem + skills (same wiring as the chat agent) ──
  // The generation agent works in the SAME jailed workspace, so drafts and
  // intermediate files it writes are visible to the chat agent and persist
  // across runs. Enabled AgentSkill rows sync into <workspace>/skills/ and
  // load through the harness's load_skill tool (progressive disclosure).
  const fsUserId = params.userId ?? 'guest';
  let workspaceBackend: FilesystemBackend | CompositeBackend | null = null;
  try {
    const userBackend = new FilesystemBackend({
      rootDir: ensureAgentWorkspace(fsUserId),
      virtualMode: true,
    });
    // Same composite routing + permissions as the chat agent: agent
    // internals (/conversation_history/) go to a separate persistent dir so
    // they never mix with the learner's files.
    const internalDir = path.join(agentWorkspaceRoot(fsUserId), 'internal');
    fs.mkdirSync(internalDir, { recursive: true });
    workspaceBackend = new CompositeBackend(userBackend, {
      '/conversation_history': new FilesystemBackend({ rootDir: internalDir, virtualMode: true }),
    });
  } catch {
    workspaceBackend = null;
  }
  const skillsSync = await syncSkillsToWorkspace(fsUserId).catch(() => ({ skillsPath: null, count: 0 }));

  const agent = createDeepAgent({
    name: 'medq-generation-agent',
    model,
    systemPrompt: [
      'You are the MedQ Question Generation Agent, an autonomous deep agent that produces and SAVES exam questions.',
      'You plan your work with the todo list, delegate question writing to the question-author subagent, generate media when required, and save every finished question with the save_question tool.',
      'You have a persistent workspace with file tools (ls, read_file, write_file, edit_file, glob, grep) — use it for drafts and working notes; files survive across runs.',
      'The save_question tool is the ONLY way a question counts as done — never claim completion without saving.',
      'Only pass media URLs that were actually returned by your media tools. Never fabricate URLs.',
      'Keep every question medically accurate; when unsure, search for evidence with search_medical_references.',
    ].join('\n'),
    subagents: [buildQuestionAuthorSubagent(instrumentedSubagentTools)],
    ...(workspaceBackend ? { backend: workspaceBackend } : {}),
    permissions: [
      { operations: ['read', 'write'], paths: ['/conversation_history/**'], mode: 'deny' },
      { operations: ['write'], paths: ['/skills/**'], mode: 'deny' },
    ],
    ...(skillsSync.skillsPath ? { skills: [skillsSync.skillsPath] } : {}),
    tools,
  });

  // ── Stream the agent run ──
  const prompt = buildOrchestratorPrompt(params, grounding, libraryMedia);
  // Per-run tracker: how many saves have already been emitted as events.
  let lastSavedEmitted = 0;
  // Dedupe guards: an AIMessage/ToolMessage can reappear in updates after a
  // checkpoint replay (resume/interrupt) — never emit the same call or
  // result twice for one run.
  const emittedToolStartIds = new Set<string>();
  const emittedToolEndIds = new Set<string>();
  // Name of the subagent the in-flight `task` call delegated to (extracted
  // from the task tool_call args; fallback 'question-author').
  let lastTaskSubagent = 'question-author';
  type AgentUpdate = { todos?: unknown[]; messages?: unknown[] };

  // Cooperative cancellation checkpoint #0: never start work that was already
  // cancelled (e.g. the client aborted while the route was still wiring up).
  if (params.signal?.aborted) {
    yield { type: 'error', error: 'Cancelled before the agent started.' };
    return;
  }

  try {
    const stream = await agent.stream(
      { messages: [new HumanMessage(prompt)] },
      {
        streamMode: ['updates', 'messages'],
        configurable: { user_id: params.userId ?? undefined },
        // SEVER ambient callback inheritance. Without an explicit callbacks
        // manager, LangChain merges the ambient (AsyncLocalStorage) callbacks
        // of whatever graph is executing ABOVE this run — when the chat agent
        // invokes this generator inside a tool, every token this agent (and
        // its subagents) produces also fires the OUTER graph's message-stream
        // handlers: duplicate tool cards in the UI, subagent narration and
        // raw tool-result JSON leaking into the chat answer text. An explicit
        // (empty) manager replaces the inherited one, so this run's events
        // surface only through its own stream + the activity queue below.
        // Other ambient config keys (notably `signal` — client-abort
        // propagation) still inherit as before.
        callbacks: new CallbackManager(),
      } as never,
    );

    for await (const item of stream as AsyncIterable<[string, unknown]>) {
      if (Date.now() - startedAt > RUN_DEADLINE_MS) {
        yield { type: 'error', error: 'Deep agent run exceeded the 12-minute deadline.' };
        break;
      }
      // Cooperative cancellation checkpoint: checked on EVERY stream item so
      // an aborted client stops this run at the next agent step instead of
      // continuing to hammer the LLM gateway (and triggering 429 storms).
      if (params.signal?.aborted) {
        yield { type: 'error', error: 'Cancelled by the user.' };
        break;
      }

      // Drain instrumented tool activity that was recorded while the stream
      // was silent (the subagent executing tools) BEFORE the next stream item,
      // so the client observes call → result in true arrival order.
      while (activityQueue.length > 0) {
        const ev = activityQueue.shift()!;
        yield ev.type === 'tool_start'
          ? { type: 'tool_start', tool: ev.tool, id: ev.callId, args: ev.args }
          : { type: 'tool_end', tool: ev.tool, id: ev.callId, ok: ev.ok ?? true, excerpt: ev.excerpt, durationMs: ev.durationMs };
      }

      const [mode, payload] = item;

      if (mode === 'messages') {
        // Token chunks carry no reliable per-call metadata here — tool calls
        // are emitted from the complete AIMessages in 'updates' (full parsed
        // args + ids), and subagent-executed tools from the activity queue.
        continue;
      }

      if (mode === 'updates') {
        const updates = payload as Record<string, unknown>;
        for (const [node, value] of Object.entries(updates)) {
          const update = value as AgentUpdate | null;
          if (Array.isArray(update?.todos) && update.todos.length) {
            yield { type: 'plan', todos: update.todos };
          }
          for (const messageValue of update?.messages ?? []) {
            const message = messageValue as {
              constructor?: { name?: string };
              name?: string;
              content?: unknown;
              status?: string;
              tool_calls?: Array<{ id?: unknown; name?: unknown; args?: unknown }>;
              tool_call_id?: unknown;
            };
            const className = message?.constructor?.name ?? '';

            // A complete model turn: its tool_calls are the CALL side of the
            // contract — full parsed args + the provider's tool_call ids.
            if (className.includes('AIMessage')) {
              for (const toolCall of message.tool_calls ?? []) {
                if (typeof toolCall?.name !== 'string' || !toolCall.name) continue;
                const callId = typeof toolCall.id === 'string' ? toolCall.id : undefined;
                if (callId && emittedToolStartIds.has(callId)) continue;
                if (callId) emittedToolStartIds.add(callId);
                yield { type: 'tool_start', tool: toolCall.name, id: callId, args: toolCall.args };
                // The `task` tool IS subagent delegation (deepagents
                // convention) — surface which specialist took over.
                if (toolCall.name === 'task') {
                  lastTaskSubagent = subagentNameFromArgs(toolCall.args) ?? lastTaskSubagent;
                  yield { type: 'subagent', name: lastTaskSubagent, event: 'started' };
                }
              }
              continue;
            }

            if (className.includes('ToolMessage')) {
              const tool = message.name ?? node;
              const ok = message.status !== 'error';
              const content = typeof message.content === 'string' ? message.content : undefined;
              const resultId = typeof message.tool_call_id === 'string' ? message.tool_call_id : undefined;
              if (resultId && emittedToolEndIds.has(resultId)) continue;
              if (resultId) emittedToolEndIds.add(resultId);
              yield {
                type: 'tool_end',
                tool,
                ok,
                id: resultId,
                excerpt: content ? content.slice(0, 600) : undefined,
              };

              // The `task` ToolMessage marks the subagent run completing.
              if (tool === 'task') {
                yield { type: 'subagent', name: lastTaskSubagent, event: 'completed' };
              }

              // Emit every question the agent saved through the tool
              if (tool === 'save_question') {
                const newlySaved = saved.slice(lastSavedEmitted);
                lastSavedEmitted = saved.length;
                for (let i = 0; i < newlySaved.length; i++) {
                  yield { type: 'saved', question: newlySaved[i], index: lastSavedEmitted - newlySaved.length + i + 1 };
                }
              }
            }
          }
        }
      }
    }
    // Final drain: tool activity recorded after the last stream item (e.g.
    // the final tool_end while the graph was closing out).
    while (activityQueue.length > 0) {
      const ev = activityQueue.shift()!;
      yield ev.type === 'tool_start'
        ? { type: 'tool_start', tool: ev.tool, id: ev.callId, args: ev.args }
        : { type: 'tool_end', tool: ev.tool, id: ev.callId, ok: ev.ok ?? true, excerpt: ev.excerpt, durationMs: ev.durationMs };
    }
  } catch (err) {
    yield { type: 'error', error: err instanceof Error ? err.message : String(err) };
  }

  yield { type: 'done', saved: saved.length, requested: params.count };
}

// ---------------------------------------------------------------------------
// Convenience wrapper for non-streaming callers (tests / future reuse)
// ---------------------------------------------------------------------------

export async function generateQuestionsWithDeepAgent(
  params: DeepAgentGenerationParams,
): Promise<SavedQuestion[]> {
  const saved: SavedQuestion[] = [];
  for await (const event of runDeepAgentQuestionGeneration(params)) {
    if (event.type === 'saved') saved.push(event.question);
    if (event.type === 'error') throw new Error(event.error);
  }
  return saved;
}

// ---------------------------------------------------------------------------
// Two-attempt wrapper: primary provider → automatic Z.AI fallback
// ---------------------------------------------------------------------------

/**
 * Run the generation agent with the same outage-resilience the chat agent has
 * (deep-agent-runtime's streamMedQDeepAgent): attempt 1 runs the configured
 * primary provider; if it fails with a rate-limit / 5xx / network error BEFORE
 * any question was saved, the whole run is retried once through the managed
 * Z.AI service (readConfig discovery, verified working during the 2026-10-08
 * gateway storm). A run that already saved questions is never restarted —
 * partial work must not be duplicated.
 *
 * Callers that already know the primary is down (the chat runtime passing its
 * own providerOverride) can set params.providerOverride, in which case BOTH
 * attempts use it and no second fallback layer exists.
 */
export async function* runDeepAgentQuestionGenerationWithFallback(
  params: DeepAgentGenerationParams,
): AsyncGenerator<DeepAgentEvent> {
  let savedSoFar = 0;

  for (let attempt = 1; attempt <= 2; attempt++) {
    // Attempt 2 always runs on the Z.AI backup (attempt 1 just failed with an
    // overload error and saved nothing). Attempt 1 uses the caller's override
    // when one was provided (the chat runtime already detected the outage).
    const override: MedQProviderOverride | undefined =
      attempt === 1 ? params.providerOverride : zaiFallbackConfig() ?? undefined;
    let retryOnBackup = false;

    for await (const event of runDeepAgentQuestionGeneration({
      ...params,
      providerOverride: override,
    })) {
      if (event.type === 'saved') savedSoFar += 1;
      // Overload before anything was saved, no caller override, and the backup
      // service is configured → stop consuming attempt 1 and restart the whole
      // run on the backup. (Breaking here also discards attempt 1's trailing
      // `done` event, so the caller never sees a premature completion.)
      if (
        event.type === 'error' &&
        attempt === 1 &&
        !params.providerOverride &&
        savedSoFar === 0 &&
        isProviderOverloadError(event.error) &&
        zaiFallbackConfig()
      ) {
        console.info(
          `[question-deep-agent] Primary provider overloaded (${event.error.slice(0, 160)}) — retrying the generation run on the built-in Z.AI backup service`,
        );
        retryOnBackup = true;
        break;
      }
      // Tag the backup run's status line so progress UIs show the handoff.
      if (attempt === 2 && event.type === 'status') {
        yield { type: 'status', model: `${event.model} · backup` };
        continue;
      }
      yield event;
    }

    if (retryOnBackup) continue;
    return;
  }
}
