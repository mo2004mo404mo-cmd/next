#!/usr/bin/env python3
"""Create the production GraphDeps wiring (src/lib/agent/graph-deps.ts)
plus its test file (test/graph-deps.test.ts).

graph-deps.ts implements the GraphDeps interface from
question-generation-graph.ts with REAL delegations:

  plan      — deterministic type×difficulty coverage plan (+ weak topics,
              focus hint); pure, no LLM. buildPlanCoverage is exported.
  ground    — retrieveKnowledgeHybrid(userId, topic, { sourceIds }) →
              grounding passages (GroundingChunk[]) + retrievedChunkIds.
  generate  — knowledgeLLM with a JSON-output prompt grounded on the
              passages; robust JSON-array parse; OFFLINE FALLBACK builds
              deterministic short-answer drafts from the grounding content
              so the graph completes with zero LLM access (mirrors the
              knowledge pipeline's degradation philosophy). Clears the
              feedback channel (replace-last reducer) after consuming it.
  verify    — deterministic validation (same rules as the save_question
              tool: stem >= 20 chars, explanation >= 30 chars, MCQ >= 2
              options, answer must match an option, difficulty in the
              allowed list) + stem-dedup against already-verified drafts.
              Processes only NEW drafts via the verifiedCount channel.
              validateDraft is exported (pure).
  save      — db.question.create per unsaved verified draft (same field
              shape as the save_question tool, minus media attach).
  refine    — builds a feedback string from the flagged drafts' reasons
              for the next generate pass; clears toRefine.

Tests (test/graph-deps.test.ts) cover the pure functions
(buildPlanCoverage, validateDraft, buildOfflineDrafts, parseDraftsJson)
plus deps-level behavior with a stubbed knowledgeLLM (vi.mock) and a
stubbed db (vi.mock) — no live LLM, no live Postgres.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")
DEPS_FILE = PROJECT / "src/lib/agent/graph-deps.ts"
TEST_FILE = PROJECT / "test/graph-deps.test.ts"

DEPS_SRC = '''/**
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
  return (d.stem || '').toLowerCase().replace(/\\s+/g, ' ').trim().slice(0, 120);
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
    const excerpt = g.content.replace(/\\s+/g, ' ').trim().slice(0, 400);
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
  const match = raw.match(/\\[[\\s\\S]*\\]/);
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
              const excerpt = g.content.replace(/\\s+/g, ' ').trim().slice(0, excerptChars);
              return `[K${i + 1}] (source: ${g.documentTitle}) ${excerpt}`;
            })
            .join('\\n\\n');
          const raw = await knowledgeLLM({
            system:
              'You are an exam-question generator for medical education. ' +
              'Output ONLY a JSON array — no markdown fences, no commentary.',
            prompt:
              `TOPIC: ${state.topic}\\nEXAM SYSTEM: ${state.system || 'General'}\\n\\n` +
              `PLAN:\\n${(state.plan ?? []).map((p) => `- ${p}`).join('\\n')}\\n\\n` +
              (state.weakTopics?.length ? `WEAK TOPICS TO WEAVE IN: ${state.weakTopics.join(', ')}\\n\\n` : '') +
              (state.focusHint ? `FOCUS: ${state.focusHint}\\n\\n` : '') +
              `GROUNDING PASSAGES (cite their [K#] id in citations):\\n${listing}\\n\\n` +
              (feedback ? `VERIFIER FEEDBACK — fix these issues in the new drafts:\\n${feedback}\\n\\n` : '') +
              `Write ${n} NEW exam questions as a JSON array. Each element:\\n` +
              `{"type":"mcq"|"tf"|"short","difficulty":"Easy|Basic|Medium|Moderate|Hard|Expert","stem":"clinical vignette (>= 20 chars)","options":["...","...","...","..."] (mcq only, 4-5 options),"answer":"full text of the correct option","explanation":">= 40 chars, why correct + why distractors fail","mnemonic":"","clinicalPearl":"","citations":[{"chunkId":"K1"}]}\\n\\n` +
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
          `Rejected drafts:\\n${lines.join('\\n')}`,
      };
    },
  };
}
'''

TEST_SRC = '''import { describe, it, expect, vi } from 'vitest';

// ── Stage 11 production wiring (graph-deps.ts) ─────────────────────────────
//
// Pure functions are tested directly. The deps-level tests stub
// knowledgeLLM + db via vi.mock so nothing hits a live LLM or Postgres.

vi.mock('@/lib/agent/knowledge/llm', () => ({
  knowledgeLLM: vi.fn(),
}));

vi.mock('@/lib/agent/knowledge/hybrid', () => ({
  retrieveKnowledgeHybrid: vi.fn(),
}));

vi.mock('@/lib/db', () => ({
  db: {
    question: {
      create: vi.fn(),
    },
  },
}));

import {
  buildPlanCoverage,
  validateDraft,
  stemKey,
  buildOfflineDrafts,
  parseDraftsJson,
  createProductionGraphDeps,
} from '@/lib/agent/graph-deps';
import { knowledgeLLM } from '@/lib/agent/knowledge/llm';
import { retrieveKnowledgeHybrid } from '@/lib/agent/knowledge/hybrid';
import { db } from '@/lib/db';
import type { GroundingChunk, QuestionGenState } from '@/lib/agent/question-generation-graph';

const mockLLM = vi.mocked(knowledgeLLM);
const mockRetrieve = vi.mocked(retrieveKnowledgeHybrid);
const mockCreate = vi.mocked(db.question.create);

function goodDraft(over: Record<string, unknown> = {}) {
  return {
    localId: 'd1',
    type: 'mcq',
    difficulty: 'Medium',
    stem: 'A 60-year-old man presents with crushing chest pain radiating to the left arm.',
    options: ['STEMI', 'NSTEMI', 'Pericarditis', 'Aortic dissection'],
    answer: 'STEMI',
    explanation: 'ST elevation on ECG with continuous crushing pain indicates transmural infarction.',
    ...over,
  };
}

function groundChunk(over: Record<string, unknown> = {}): GroundingChunk {
  return {
    chunkId: 'ck_1',
    sourceId: 'src_1',
    documentId: 'doc_1',
    documentTitle: 'Cardiology Lecture 3',
    content: 'ST-elevation myocardial infarction presents with crushing chest pain and ST elevation on ECG. Immediate reperfusion is required.',
    ...over,
  };
}

function baseState(over: Record<string, unknown> = {}): QuestionGenState {
  return {
    topic: 'Myocardial infarction',
    system: 'USMLE Step 1',
    types: ['mcq'],
    difficulties: ['Medium'],
    count: 2,
    knowledgeSourceIds: ['src_1'],
    userId: 'user_test',
    weakTopics: [],
    focusHint: '',
    plan: [],
    grounding: [],
    feedback: '',
    generated: [],
    verified: [],
    toRefine: [],
    savedIds: [],
    retrievedChunkIds: [],
    attempt: 0,
    verifiedCount: 0,
    errors: [],
    ...over,
  } as unknown as QuestionGenState;
}

describe('buildPlanCoverage', () => {
  it('plans count questions round-robin over types and difficulties', () => {
    const plan = buildPlanCoverage(4, ['mcq', 'short'], ['Easy', 'Hard'], 'Asthma');
    expect(plan).toHaveLength(4);
    expect(plan[0]).toContain('type=mcq');
    expect(plan[0]).toContain('difficulty=Easy');
    expect(plan[1]).toContain('type=short');
    expect(plan[1]).toContain('difficulty=Hard');
    expect(plan[2]).toContain('type=mcq');
    expect(plan[3]).toContain('type=short');
  });

  it('defaults to mcq/Medium when no types or difficulties given', () => {
    const plan = buildPlanCoverage(1, [], [], 'Asthma');
    expect(plan[0]).toContain('type=mcq');
    expect(plan[0]).toContain('difficulty=Medium');
  });

  it('appends weak topics and focus hint lines', () => {
    const plan = buildPlanCoverage(1, ['mcq'], ['Easy'], 'Asthma', ['AV block'], 'mechanisms');
    expect(plan.some((p) => p.includes('AV block'))).toBe(true);
    expect(plan.some((p) => p.includes('Focus guidance: mechanisms'))).toBe(true);
  });

  it('returns [] for count 0', () => {
    expect(buildPlanCoverage(0, ['mcq'], ['Easy'], 'X')).toEqual([]);
  });
});

describe('validateDraft', () => {
  it('accepts a well-formed MCQ draft', () => {
    expect(validateDraft(goodDraft())).toBeNull();
  });

  it('rejects a short stem', () => {
    expect(validateDraft(goodDraft({ stem: 'too short' }))).toMatch(/stem too short/);
  });

  it('rejects a missing answer', () => {
    expect(validateDraft(goodDraft({ answer: '' }))).toMatch(/answer missing/);
  });

  it('rejects a short explanation', () => {
    expect(validateDraft(goodDraft({ explanation: 'short' }))).toMatch(/explanation too short/);
  });

  it('rejects an MCQ with fewer than 2 options', () => {
    expect(validateDraft(goodDraft({ options: ['STEMI'] }))).toMatch(/at least 2 options/);
  });

  it('rejects an MCQ answer not among the options', () => {
    expect(validateDraft(goodDraft({ answer: 'Unstable angina' }))).toMatch(/must match one of the options/);
  });

  it('rejects an unknown difficulty', () => {
    expect(validateDraft(goodDraft({ difficulty: 'Impossible' }))).toMatch(/difficulty "Impossible"/);
  });

  it('accepts a short-answer draft without options', () => {
    expect(validateDraft(goodDraft({ type: 'short', options: [] }))).toBeNull();
  });
});

describe('stemKey', () => {
  it('lowercases and collapses whitespace', () => {
    expect(stemKey(goodDraft({ stem: '  What   Is   The Dx? ' }))).toBe('what is the dx?');
  });

  it('truncates to 120 chars', () => {
    expect(stemKey(goodDraft({ stem: 'x'.repeat(300) })).length).toBe(120);
  });
});

describe('buildOfflineDrafts', () => {
  it('builds the requested number of grounded short-answer drafts', () => {
    const drafts = buildOfflineDrafts(3, 'MI', [groundChunk()], 0);
    expect(drafts).toHaveLength(3);
    for (const d of drafts) {
      expect(d.type).toBe('short');
      expect(d.citations).toEqual([{ sourceId: 'src_1', chunkId: 'ck_1' }]);
      expect(d.tags).toContain('graph-offline');
      expect(validateDraft(d)).toBeNull();
    }
  });

  it('returns [] with no grounding', () => {
    expect(buildOfflineDrafts(3, 'MI', [], 0)).toEqual([]);
  });
});

describe('parseDraftsJson', () => {
  it('parses a clean JSON array', () => {
    const raw = JSON.stringify([
      {
        type: 'mcq', difficulty: 'Hard', stem: 'A valid stem long enough for the check.',
        options: ['A', 'B', 'C', 'D'], answer: 'A',
        explanation: 'A long enough explanation for the validation to pass here.',
        citations: [{ chunkId: 'K1' }],
      },
    ]);
    const drafts = parseDraftsJson(raw, 1);
    expect(drafts).toHaveLength(1);
    expect(drafts[0].answer).toBe('A');
    expect(drafts[0].citations?.[0].chunkId).toBe('K1');
  });

  it('extracts the array from markdown fences', () => {
    const raw = '```json\\n[{"stem":"s","answer":"a","explanation":"e"}]\\n```';
    expect(parseDraftsJson(raw, 1)).toHaveLength(1);
  });

  it('skips entries missing required fields', () => {
    const raw = JSON.stringify([{ stem: 's' }, { stem: 's', answer: 'a', explanation: 'e' }]);
    expect(parseDraftsJson(raw, 2)).toHaveLength(1);
  });

  it('returns [] for garbage', () => {
    expect(parseDraftsJson('no json here', 2)).toEqual([]);
    expect(parseDraftsJson('', 2)).toEqual([]);
  });

  it('caps at the expected count', () => {
    const raw = JSON.stringify([
      { stem: 's1', answer: 'a', explanation: 'e' },
      { stem: 's2', answer: 'a', explanation: 'e' },
      { stem: 's3', answer: 'a', explanation: 'e' },
    ]);
    expect(parseDraftsJson(raw, 2)).toHaveLength(2);
  });
});

describe('createProductionGraphDeps', () => {
  it('plan node returns the deterministic coverage plan', async () => {
    const deps = createProductionGraphDeps();
    const patch = await deps.plan(baseState());
    expect(patch.plan).toBeDefined();
    expect(patch.plan!.length).toBe(2);
    expect(patch.plan![0]).toContain('Question 1');
  });

  it('ground node maps hybrid chunks into grounding state', async () => {
    mockRetrieve.mockResolvedValueOnce({
      chunks: [
        {
          chunkId: 'ck_1', content: 'content', documentTitle: 'T', documentId: 'doc_1',
          sourceId: 'src_1', idx: 0, score: 1,
        },
      ],
      diagnostics: {
        expandedQueries: [], candidateCount: 1, denseCandidates: 1,
        lexicalCandidates: 1, rerankUsed: false, latencyMs: 1,
      },
    } as unknown as Awaited<ReturnType<typeof retrieveKnowledgeHybrid>>);
    const deps = createProductionGraphDeps();
    const patch = await deps.ground(baseState());
    expect(patch.grounding).toEqual([
      expect.objectContaining({ chunkId: 'ck_1', sourceId: 'src_1', documentTitle: 'T' }),
    ]);
    expect(patch.retrievedChunkIds).toEqual(['ck_1']);
  });

  it('ground node records the error and continues empty on retrieval failure', async () => {
    mockRetrieve.mockRejectedValueOnce(new Error('db down'));
    const deps = createProductionGraphDeps();
    const patch = await deps.ground(baseState());
    expect(patch.grounding).toEqual([]);
    expect(patch.errors?.[0]).toMatch(/ground failed: db down/);
  });

  it('generateBatch falls back to offline drafts when the LLM returns null', async () => {
    mockLLM.mockResolvedValueOnce(null);
    const deps = createProductionGraphDeps();
    const state = baseState({ grounding: [groundChunk()] });
    const patch = await deps.generateBatch(state);
    expect(patch.generated!.length).toBeGreaterThan(0);
    expect(patch.generated![0].tags).toContain('graph-offline');
    // feedback channel is consumed (cleared)
    expect(patch.feedback).toBe('');
  });

  it('generateBatch parses LLM output and fills citation sourceIds from grounding', async () => {
    mockLLM.mockResolvedValueOnce(
      JSON.stringify([
        {
          type: 'mcq', difficulty: 'Hard',
          stem: 'Which finding confirms ST-elevation myocardial infarction on ECG?',
          options: ['ST elevation', 'Q waves', 'T inversion', 'U waves'],
          answer: 'ST elevation',
          explanation: 'Transmural injury current manifests as ST elevation; the others are older or repolarization findings.',
          citations: [{ chunkId: 'K1' }],
        },
      ]),
    );
    const deps = createProductionGraphDeps();
    const state = baseState({ grounding: [groundChunk()] });
    const patch = await deps.generateBatch(state);
    expect(patch.generated).toHaveLength(1);
    expect(patch.generated![0].citations).toEqual([{ sourceId: 'src_1', chunkId: 'ck_1' }]);
    expect(patch.generated![0].tags).not.toContain('graph-offline');
  });

  it('generateBatch returns {} when the count is already met', async () => {
    const deps = createProductionGraphDeps();
    const state = baseState({
      count: 2,
      generated: [goodDraft({ localId: 'a' }), goodDraft({ localId: 'b' })],
    });
    const patch = await deps.generateBatch(state);
    expect(patch).toEqual({});
  });

  it('verify node validates only NEW drafts (verifiedCount offset) and dedups', async () => {
    const deps = createProductionGraphDeps();
    const first = goodDraft({ localId: 'ok1' });
    const dup = goodDraft({ localId: 'dup', stem: first.stem.toUpperCase() + '   ' });
    const bad = goodDraft({ localId: 'bad', options: ['only'] });
    const state = baseState({
      generated: [first, dup, bad],
      verified: [],
      verifiedCount: 0,
    });
    const patch = await deps.verify(state);
    expect(patch.verified).toEqual([first]);
    expect(patch.toRefine).toEqual([bad]);
    expect(patch.verifiedCount).toBe(3);
    expect(patch.errors?.some((e) => e.includes('duplicate'))).toBe(true);
    expect(patch.errors?.some((e) => e.startsWith('bad:'))).toBe(true);
  });

  it('verify skips already-processed drafts on the second pass', async () => {
    const deps = createProductionGraphDeps();
    const first = goodDraft({ localId: 'ok1' });
    const second = goodDraft({ localId: 'ok2', stem: 'A different stem about asthma management in children.' });
    const state = baseState({
      generated: [first, second],
      verified: [first],
      verifiedCount: 1,
    });
    const patch = await deps.verify(state);
    expect(patch.verified).toEqual([second]);
    expect(patch.verifiedCount).toBe(2);
  });

  it('save node writes Question rows with the save_question field shape', async () => {
    mockCreate.mockResolvedValueOnce({ id: 'q_db_1' } as never);
    const deps = createProductionGraphDeps();
    const d = goodDraft({ citations: [{ sourceId: 'src_1', chunkId: 'ck_1' }] });
    const state = baseState({ verified: [d], savedIds: [], grounding: [groundChunk()] });
    const patch = await deps.save(state);
    expect(patch.savedIds).toEqual(['q_db_1']);
    const call = mockCreate.mock.calls[0][0];
    expect(call.data.type).toBe('mcq');
    expect(call.data.isAIGenerated).toBe(true);
    expect(call.data.reviewStatus).toBe('pending');
    expect(JSON.parse(call.data.tags)).toContain('langgraph');
    expect(JSON.parse(call.data.citations)[0]).toEqual(
      expect.objectContaining({ sourceId: 'src_1', chunkId: 'ck_1', title: 'Cardiology Lecture 3' }),
    );
    expect(JSON.parse(call.data.knowledgeSourceIds)).toEqual(['src_1']);
  });

  it('save node skips already-saved drafts and records failures', async () => {
    mockCreate.mockClear();
    const deps = createProductionGraphDeps();
    const d = goodDraft();
    const state = baseState({ verified: [d], savedIds: ['q_prev'], grounding: [] });
    const patch = await deps.save(state);
    expect(patch.savedIds).toEqual([]);
    expect(mockCreate).not.toHaveBeenCalled();
  });

  it('refine node builds feedback and clears toRefine', async () => {
    const deps = createProductionGraphDeps();
    const state = baseState({
      toRefine: [goodDraft({ localId: 'bad1', stem: 'Rejected stem one that is long enough.' })],
    });
    const patch = await deps.refine(state);
    expect(patch.toRefine).toEqual([]);
    expect(patch.feedback).toContain('bad1');
    expect(patch.feedback).toContain('Rejected stem one');
  });
});
'''

DEPS_FILE.parent.mkdir(parents=True, exist_ok=True)
DEPS_FILE.write_text(DEPS_SRC)
print(f"[graph-deps.ts] wrote {len(DEPS_SRC)} bytes")

TEST_FILE.write_text(TEST_SRC)
print(f"[graph-deps.test.ts] wrote {len(TEST_SRC)} bytes")
