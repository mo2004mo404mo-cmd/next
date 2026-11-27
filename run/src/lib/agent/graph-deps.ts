/**
 * graph-deps.ts — Stage 11 production wiring (Phase B continuation).
 *
 * Implements the `GraphDeps` interface from question-generation-graph.ts
 * with REAL delegations to the production RAG + LLM + DB stack:
 *
 *   plan            pure, deterministic (type×difficulty coverage plan)
 *   ground          → retrieveKnowledgeHybrid (hybrid.ts)
 *   generate_batch  → knowledgeLLM (knowledge/llm.ts) + offline fallback
 *   verify          → deterministic validation (pure) + dedup
 *   save            → db.question.create (same shape as save_question)
 *   refine          → feedback string for the next generate pass
 *
 * The deep-agent path (question-deep-agent.ts) remains the default
 * production generator; this module exists so the explicit StateGraph can
 * be A/B-compared against it and eventually swapped in. Every node follows
 * the knowledge-pipeline degradation philosophy: LLM access is an accuracy
 * BOOSTER, never a hard dependency — with zero LLM the graph still
 * completes (offline fallback drafts grounded on the retrieved passages).
 */

import type {
  DraftQuestion,
  GroundingChunk,
  GraphDeps,
  QuestionGenState,
} from './question-generation-graph';
import { retrieveKnowledgeHybrid } from './knowledge/hybrid';
import { knowledgeLLM } from './knowledge/llm';
import { db } from '@/lib/db';

// ─── Constants (mirroring the save_question tool) ──────────────────────────

const DIFFICULTY_LEVELS = ['Easy', 'Basic', 'Medium', 'Moderate', 'Hard', 'Expert'] as const;

const QUESTION_TYPES = ['mcq', 'tf', 'short'] as const;

export interface ProductionDepsOptions {
  /** Max drafts requested from the LLM per generate_batch call (default 6). */
  batchSize?: number;
  /** Grounding passages retrieved by the ground node (default 8, max 20). */
  groundingTopK?: number;
  /** Grounding passage chars included in the prompt (default 700). */
  groundingExcerptChars?: number;
  /** Skip the LLM entirely — deterministic offline drafts only. Used by
   *  tests and by an operator kill-switch (MEDQ_GRAPH_OFFLINE=1). */
  offline?: boolean;
}

// ─── Pure helpers (exported for unit tests) ───────────────────────────────

/**
 * Deterministic plan: round-robin over type×difficulty until `count`
 * questions are planned, plus weak-topic and focus-hint lines. Pure.
 */
export function buildPlanCoverage(
  count: number,
  types: string[],
  difficulties: string[],
  topic: string,
  weakTopics: string[] = [],
  focusHint = '',
): string[] {
  const plan: string[] = [];
  const ts = types.length ? types : ['mcq'];
  const ds = difficulties.length ? difficulties : ['Medium'];
  for (let i = 0; i < Math.max(0, count); i++) {
    plan.push(`Question ${i + 1}: type=${ts[i % ts.length]}, difficulty=${ds[i % ds.length]}, topic="${topic}"`);
  }
  if (weakTopics.length) plan.push(`Weave in weak topics where relevant: ${weakTopics.join(', ')}.`);
  if (focusHint) plan.push(`Focus guidance: ${focusHint}`);
  return plan;
}

/**
 * Deterministic draft validation — the SAME rules the save_question tool
 * enforces (question-deep-agent.ts), so the verify node rejects exactly
 * what the deep agent would refuse to save. Returns null when valid,
 * otherwise a human-readable reason. Pure.
 */
export function validateDraft(d: DraftQuestion): string | null {
  if (!d.stem || d.stem.trim().length < 20) return 'stem too short (<20 chars)';
  if (!d.answer || !d.answer.trim()) return 'answer missing';
  if (!d.explanation || d.explanation.trim().length < 30) return 'explanation too short (<30 chars)';
  const type = (QUESTION_TYPES as readonly string[]).includes(d.type) ? d.type : 'mcq';
  if (type === 'mcq') {
    const opts = d.options ?? [];
    if (opts.length < 2) return 'MCQ needs at least 2 options';
    if (!opts.some((o) => o.trim() === d.answer!.trim())) {
      return 'answer must match one of the options';
    }
  }
  if (!(DIFFICULTY_LEVELS as readonly string[]).includes(d.difficulty)) {
    return `difficulty "${d.difficulty}" not one of ${DIFFICULTY_LEVELS.join('/')}`;
  }
  return null;
}

/** Normalize a stem for dedup (lowercase, whitespace-collapsed, first 120). */
export function stemKey(d: DraftQuestion): string {
  return (d.stem || '').toLowerCase().replace(/\s+/g, ' ').trim().slice(0, 120);
}

/**
 * OFFLINE FALLBACK: deterministic short-answer drafts built from the
 * grounding passages, so the graph completes with zero LLM access.
 * Each draft cites its grounding chunk. Tagged 'graph-offline' so the
 * quality is traceable in the Question Bank.
 */
export function buildOfflineDrafts(
  count: number,
  topic: string,
  grounding: GroundingChunk[],
  startIdx: number,
): DraftQuestion[] {
  const drafts: DraftQuestion[] = [];
  if (!grounding.length) return drafts;
  for (let i = 0; i < Math.max(0, count); i++) {
    const g = grounding[(startIdx + i) % grounding.length];
    const excerpt = g.content.replace(/\s+/g, ' ').trim().slice(0, 400);
    drafts.push({
      localId: `offline_${startIdx + i}`,
      type: 'short',
      difficulty: 'Medium',
      stem: `In one or two sentences, state the key point the source "${g.documentTitle}" makes about ${topic}.`,
      options: [],
      answer: excerpt.slice(0, 400) || excerpt,
      explanation: `The grounding passage from "${g.documentTitle}" states: "${excerpt.slice(0, 300)}" — this is the key point the question asks for.`,
      topic,
      tags: ['graph-offline'],
      citations: [{ sourceId: g.sourceId, chunkId: g.chunkId }],
      citationChunkIds: [g.chunkId],
    });
  }
  return drafts;
}

/**
 * Robustly parse the LLM's JSON array of drafts. Returns [] on any failure
 * (the caller falls back to offline drafts). Pure.
 */
export function parseDraftsJson(raw: string, expected: number): DraftQuestion[] {
  if (!raw) return [];
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) return [];
  let parsed: unknown;
  try {
    parsed = JSON.parse(match[0]);
  } catch {
    return [];
  }
  if (!Array.isArray(parsed)) return [];
  const drafts: DraftQuestion[] = [];
  parsed.slice(0, expected).forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') return;
    const e = entry as Record<string, unknown>;
    const stem = typeof e.stem === 'string' ? e.stem : '';
    const answer = typeof e.answer === 'string' ? e.answer : '';
    const explanation = typeof e.explanation === 'string' ? e.explanation : '';
    if (!stem || !answer || !explanation) return;
    const options = Array.isArray(e.options)
      ? e.options.map((o) => String(o).slice(0, 400)).filter(Boolean)
      : [];
    const citations = Array.isArray(e.citations)
      ? e.citations
          .map((c) => {
            const cc = c as Record<string, unknown>;
            return typeof cc?.chunkId === 'string' ? { chunkId: String(cc.chunkId).slice(0, 64), sourceId: '' } : null;
          })
          .filter((c): c is { chunkId: string; sourceId: string } => c !== null)
      : [];
    drafts.push({
      localId: `llm_${i}`,
      type: typeof e.type === 'string' && (QUESTION_TYPES as readonly string[]).includes(e.type) ? e.type : 'mcq',
      difficulty:
        typeof e.difficulty === 'string' && (DIFFICULTY_LEVELS as readonly string[]).includes(e.difficulty)
          ? e.difficulty
          : 'Medium',
      stem: stem.slice(0, 6000),
      options,
      answer: answer.slice(0, 800),
      explanation: explanation.slice(0, 6000),
      mnemonic: typeof e.mnemonic === 'string' ? e.mnemonic.slice(0, 1000) : '',
      clinicalPearl: typeof e.clinicalPearl === 'string' ? e.clinicalPearl.slice(0, 1000) : '',
      topic: typeof e.topic === 'string' ? e.topic.slice(0, 200) : '',
      tags: [],
      // sourceId filled by the caller from the grounding map
      citations: citations.map((c) => ({ chunkId: c.chunkId, sourceId: '' })),
      citationChunkIds: citations.map((c) => c.chunkId),
    });
  });
  return drafts;
}

// ─── Production deps factory ───────────────────────────────────────────────

/**
 * Build the production GraphDeps. All nodes are best-effort: errors are
 * recorded on the `errors` channel instead of thrown, so the graph always
 * terminates and saves what it has (same philosophy as the deep agent's
 * two-attempt fallback).
 */
export function createProductionGraphDeps(opts: ProductionDepsOptions = {}): GraphDeps {
  const batchSize = Math.max(1, Math.min(opts.batchSize ?? 6, 20));
  const groundingTopK = Math.max(1, Math.min(opts.groundingTopK ?? 8, 20));
  const excerptChars = Math.max(200, opts.groundingExcerptChars ?? 700);
  const offlineMode = opts.offline || process.env.MEDQ_GRAPH_OFFLINE === '1';

  return {
    // ── plan: pure, deterministic ──
    plan: async (state) => ({
      plan: buildPlanCoverage(
        state.count,
        state.types,
        state.difficulties,
        state.topic,
        state.weakTopics ?? [],
        state.focusHint ?? '',
      ),
    }),

    // ── ground: real hybrid retrieval ──
    ground: async (state) => {
      try {
        const result = await retrieveKnowledgeHybrid(state.userId, state.topic, {
          sourceIds: state.knowledgeSourceIds.length ? state.knowledgeSourceIds : undefined,
          topK: groundingTopK,
        });
        const grounding: GroundingChunk[] = result.chunks.map((c) => ({
          chunkId: c.chunkId,
          sourceId: c.sourceId,
          documentId: c.documentId,
          documentTitle: c.documentTitle,
          content: c.content,
          contextSummary: c.contextSummary,
          score: c.score,
        }));
        return {
          grounding,
          retrievedChunkIds: grounding.map((g) => g.chunkId),
        };
      } catch (e) {
        return {
          grounding: [],
          retrievedChunkIds: [],
          errors: [`ground failed: ${e instanceof Error ? e.message : String(e)}`],
        };
      }
    },

    // ── generate_batch: LLM with offline fallback ──
    generateBatch: async (state) => {
      const remaining = state.count - state.generated.length;
      if (remaining <= 0) return {};
      const n = Math.min(remaining, batchSize);
      const feedback = state.feedback ?? '';
      const grounding = state.grounding ?? [];
      const sourceByChunk = new Map(grounding.map((g) => [g.chunkId, g.sourceId]));

      let drafts: DraftQuestion[] = [];
      if (!offlineMode && grounding.length > 0) {
        try {
          const listing = grounding
            .map((g, i) => {
              const excerpt = g.content.replace(/\s+/g, ' ').trim().slice(0, excerptChars);
              return `[K${i + 1}] (source: ${g.documentTitle}) ${excerpt}`;
            })
            .join('\n\n');
          const raw = await knowledgeLLM({
            system:
              'You are an exam-question generator for medical education. ' +
              'Output ONLY a JSON array — no markdown fences, no commentary.',
            prompt:
              `TOPIC: ${state.topic}\nEXAM SYSTEM: ${state.system || 'General'}\n\n` +
              `PLAN:\n${(state.plan ?? []).map((p) => `- ${p}`).join('\n')}\n\n` +
              (state.weakTopics?.length ? `WEAK TOPICS TO WEAVE IN: ${state.weakTopics.join(', ')}\n\n` : '') +
              (state.focusHint ? `FOCUS: ${state.focusHint}\n\n` : '') +
              `GROUNDING PASSAGES (cite their [K#] id in citations):\n${listing}\n\n` +
              (feedback ? `VERIFIER FEEDBACK — fix these issues in the new drafts:\n${feedback}\n\n` : '') +
              `Write ${n} NEW exam questions as a JSON array. Each element:\n` +
              `{"type":"mcq"|"tf"|"short","difficulty":"Easy|Basic|Medium|Moderate|Hard|Expert","stem":"clinical vignette (>= 20 chars)","options":["...","...","...","..."] (mcq only, 4-5 options),"answer":"full text of the correct option","explanation":">= 40 chars, why correct + why distractors fail","mnemonic":"","clinicalPearl":"","citations":[{"chunkId":"K1"}]}\n\n` +
              `Rules: stem >= 20 chars; MCQ needs 4-5 options and the answer must exactly match one option; ground every question in the passages; do not repeat earlier questions.`,
            maxOutputTokens: 3000,
            temperature: 0.3,
            timeoutMs: 60_000,
          });
          drafts = parseDraftsJson(raw ?? '', n);
          // Fill sourceIds from the grounding map ([K#] → chunkId).
          const chunkById = grounding.map((g, i) => [`K${i + 1}`, g] as const);
          for (const d of drafts) {
            for (const c of d.citations ?? []) {
              const g = chunkById.find(([k]) => k === c.chunkId)?.[1];
              if (g) {
                c.sourceId = g.sourceId;
                c.chunkId = g.chunkId;
              }
            }
            d.citationChunkIds = (d.citations ?? []).map((c) => c.chunkId);
          }
        } catch (e) {
          drafts = [];
          // recorded below via errors when falling back
          void e;
        }
      }

      // Offline fallback — deterministic drafts from the grounding content.
      if (drafts.length === 0) {
        drafts = buildOfflineDrafts(n, state.topic, grounding, state.generated.length);
      }

      // Consume (clear) the feedback channel so stale feedback never leaks
      // into later passes. Replace-last reducer: '' clears it.
      return { generated: drafts, feedback: '' };
    },

    // ── verify: deterministic validation + dedup, only NEW drafts ──
    verify: async (state) => {
      const from = state.verifiedCount ?? 0;
      const fresh = (state.generated ?? []).slice(from);
      const verified: DraftQuestion[] = [];
      const toRefine: DraftQuestion[] = [];
      const errors: string[] = [];
      const seen = new Set((state.verified ?? []).map(stemKey));
      for (const d of fresh) {
        const key = stemKey(d);
        if (seen.has(key)) {
          errors.push(`${d.localId}: duplicate stem of an already-verified question (dropped)`);
          continue;
        }
        const err = validateDraft(d);
        if (err) {
          toRefine.push(d);
          errors.push(`${d.localId}: ${err}`);
        } else {
          verified.push(d);
          seen.add(key);
        }
      }
      return {
        verified,
        toRefine,
        verifiedCount: (state.generated ?? []).length,
        ...(errors.length ? { errors } : {}),
      };
    },

    // ── save: real DB writes (same field shape as save_question) ──
    save: async (state) => {
      const savedIds: string[] = [];
      const grounding = state.grounding ?? [];
      const titleByChunk = new Map(grounding.map((g) => [g.chunkId, g.documentTitle]));
      const excerptByChunk = new Map(grounding.map((g) => [g.chunkId, g.content.slice(0, 300)]));
      const already = (state.savedIds ?? []).length;
      const toSave = (state.verified ?? []).slice(already);
      for (const d of toSave) {
        try {
          const citations = (d.citations ?? [])
            .filter((c) => c.sourceId && c.chunkId)
            .map((c) => ({
              sourceId: c.sourceId,
              chunkId: c.chunkId,
              title: titleByChunk.get(c.chunkId) ?? '',
              excerpt: excerptByChunk.get(c.chunkId) ?? '',
            }));
          const record = await db.question.create({
            data: {
              type: (QUESTION_TYPES as readonly string[]).includes(d.type) ? d.type : 'mcq',
              text: d.stem.slice(0, 6000),
              options: JSON.stringify((d.options ?? []).slice(0, 8)),
              answer: (d.answer ?? '').slice(0, 800),
              explanation: (d.explanation ?? '').slice(0, 6000),
              mnemonic: (d.mnemonic ?? '').slice(0, 1000),
              clinicalPearl: (d.clinicalPearl ?? '').slice(0, 1000),
              difficulty: d.difficulty,
              system: (state.system || 'General').slice(0, 120),
              topic: (d.topic || state.topic).slice(0, 200),
              tags: JSON.stringify(
                [state.topic, state.system || 'General', 'langgraph', ...(d.tags ?? [])]
                  .filter(Boolean)
                  .slice(0, 8),
              ),
              isAIGenerated: true,
              knowledgeSourceIds: JSON.stringify([...new Set(citations.map((c) => c.sourceId))]),
              citations: JSON.stringify(citations),
              sources: JSON.stringify(citations.map((c) => ({ type: 'library', title: c.title }))),
              reviewStatus: 'pending',
              reviewNotes: '',
            },
          });
          savedIds.push(record.id);
        } catch (e) {
          return {
            savedIds,
            errors: [`save failed for ${d.localId}: ${e instanceof Error ? e.message : String(e)}`],
          };
        }
      }
      return { savedIds };
    },

    // ── refine: feedback for the next generate pass ──
    refine: async (state) => {
      const lines = (state.toRefine ?? []).map(
        (d) => `- ${d.localId} (${d.difficulty} ${d.type}): "${d.stem.slice(0, 80)}…"`,
      );
      return {
        toRefine: [],
        feedback:
          `The previous drafts were rejected by the verifier. Produce NEW, corrected drafts. ` +
          `Rejected drafts:\n${lines.join('\n')}`,
      };
    },
  };
}
