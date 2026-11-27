#!/usr/bin/env python3
"""
Stage 11 (Phase A) — LangGraph.js question-generation-graph.ts.

Audit weakness W5: director-graph.ts is a hand-rolled state machine; the
question-generation pipeline (question-deep-agent.ts) is a 1,200-line
imperative flow with no checkpointing, no time-travel debugging, no
graph-visual introspection. The audit proposed LangGraph.js Phase A:
build an EXPLICIT StateGraph for the question-generation flow.

This Phase A is intentionally minimal:
  • New file src/lib/agent/question-generation-graph.ts
  • StateGraph with 6 nodes: plan / ground / generate_batch / verify / save / refine
  • Conditional edges for the verify↔refine loop (maxAttempts guard)
  • MemorySaver checkpointing (PostgresSaver is Phase B; needs new table)
  • All node logic is INJECTABLE via GraphDeps so tests run without an LLM
  • Production wiring delegates to existing question-deep-agent.ts funcs
    (does NOT replace the production path — runs alongside as opt-in)

Why minimal: the production question-deep-agent.ts already uses `deepagents`
(which uses LangGraph transitively). Phase A proves the EXPLICIT StateGraph
architecture works for MedQ's flow, deferring the production cutover and
PostgresSaver + AgentCheckpoint table to Phase B (after evaluation).

Files written:
  • src/lib/agent/question-generation-graph.ts (new, ~250 lines)
  • test/question-generation-graph.test.ts (new, 5 tests, no LLM/DB)

Idempotent.
"""
from __future__ import annotations
import sys
from pathlib import Path

PROJECT = Path("/tmp/my-project")
GRAPH_FILE = PROJECT / "src/lib/agent/question-generation-graph.ts"
TEST_FILE = PROJECT / "test/question-generation-graph.test.ts"

GRAPH_SRC = '''/**
 * question-generation-graph.ts — Stage 11 Phase A.
 *
 * An EXPLICIT LangGraph.js StateGraph that orchestrates the
 * question-generation flow with the same six stages as the production
 * question-deep-agent.ts (plan → ground → generate_batch → verify →
 * save → refine), but with:
 *
 *   • checkpointed state (MemorySaver now; PostgresSaver + AgentCheckpoint
 *     table in Phase B) — every node transition is replayable for debugging
 *   • injectable node implementations (GraphDeps) — tests run without an
 *     LLM or DB by passing stubs that return canned state patches
 *   • conditional edges for the verify↔refine loop with a maxAttempts guard
 *     so the graph terminates even if verification never converges
 *
 * This module is opt-in: it does NOT replace question-deep-agent.ts. The
 * production runtime can choose to call runQuestionGenerationGraph() with
 * real deps (delegating to the same functions question-deep-agent.ts uses)
 * or keep using the imperative path. The graph exists to:
 *   1. give us a checkpointed, debuggable surface for the question flow,
 *   2. let us A/B compare graph-driven vs imperative generation,
 *   3. make Phase B (PostgresSaver + UI replay) a small additive change.
 */

import {
  StateGraph,
  END,
  START,
  Annotation,
  type CompiledStateGraph,
} from '@langchain/langgraph';
import { MemorySaver } from '@langchain/langgraph-checkpoint';

// ─── Types ─────────────────────────────────────────────────────────────────

/** A draft question produced by the generate_batch node, pre-verification. */
export interface DraftQuestion {
  /** Stable id within the run — used for dedup between generate and refine. */
  localId: string;
  type: string;
  difficulty: string;
  stem: string;
  options?: string[];
  answer?: string;
  explanation?: string;
  /** Citations backing the question, format matches HybridChunk. */
  citationChunkIds?: string[];
}

/** Per-attempt verification verdict for one draft. */
export interface VerificationVerdict {
  localId: string;
  /** ok = the draft is ready to save; refine = needs another generate pass. */
  verdict: 'ok' | 'refine';
  reason?: string;
}

/** Inputs that started the run (immutable after plan). */
export interface GraphInputs {
  topic: string;
  system: string;
  types: string[];
  difficulties: string[];
  count: number;
  knowledgeSourceIds: string[];
  userId: string;
  /** Optional weak-topics hint (from attempt analytics). */
  weakTopics?: string[];
  /** Optional focus hint from the user. */
  focusHint?: string;
}

/** The full graph state. Each field has a reducer that controls how node
 *  return values merge into the running state. */
export const GraphState = Annotation.Root({
  // ── Inputs (set once, never patched) ──
  ...Annotation<GraphInputs>({
    reducer: (_prev, next) => next ?? _prev,
    default: () => ({
      topic: '',
      system: '',
      types: [],
      difficulties: [],
      count: 0,
      knowledgeSourceIds: [],
      userId: '',
    }),
  }),

  // ── Working state (accumulates across nodes) ──
  /** Plan items the generate_batch node iterates over. */
  plan: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  /** RAG chunks retrieved by ground, available to generate_batch and verify. */
  retrievedChunkIds: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  /** All drafts produced so far (across attempts). */
  generated: Annotation<DraftQuestion[]>({
    reducer: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  }),
  /** Drafts that passed verification. */
  verified: Annotation<DraftQuestion[]>({
    reducer: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  }),
  /** Drafts flagged for refinement (consumed by refine, cleared after). */
  toRefine: Annotation<DraftQuestion[]>({
    reducer: (_prev, next) => next ?? [],
    default: () => [],
  }),
  /** Saved question ids (DB rows). */
  savedIds: Annotation<string[]>({
    reducer: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  }),
  /** Refinement attempt counter (guard against infinite loop). */
  attempt: Annotation<number>({
    reducer: (_prev, next) => (typeof next === 'number' ? next : (_prev ?? 0) + 1),
    default: () => 0,
  }),
  /** Best-effort errors (non-fatal; surfaced in the run result). */
  errors: Annotation<string[]>({
    reducer: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  }),
});

export type QuestionGenState = typeof GraphState.State;

// ─── Dependency injection ──────────────────────────────────────────────────

/** Injectable node implementations. Tests pass stubs; production wires
 *  these to the existing functions in question-deep-agent.ts / hybrid.ts.
 *
 *  Each node receives the current state and returns a partial state patch
 *  (the reducers above control how the patch merges). */
export interface GraphDeps {
  plan: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
  ground: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
  generateBatch: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
  verify: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
  save: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
  refine: (state: QuestionGenState) => Promise<Partial<QuestionGenState>>;
}

/** Loop guard: refine can run at most MAX_ATTEMPTS times before the graph
 *  short-circuits to save with whatever has been verified so far. */
export const MAX_REFINE_ATTEMPTS = 2;

// ─── Conditional edge routing ──────────────────────────────────────────────

/** After generate_batch: if we have at least `count` drafts, verify them;
 *  otherwise loop back to generate another batch. */
function routeAfterGenerate(state: QuestionGenState): 'verify' | 'generate_batch' {
  if (state.generated.length >= state.count) return 'verify';
  return 'generate_batch';
}

/** After verify: if every draft is verified, save; if any are flagged for
 *  refine AND we haven't exhausted attempts, refine; otherwise save what
 *  we have. */
function routeAfterVerify(state: QuestionGenState): 'save' | 'refine' {
  if (state.toRefine.length === 0) return 'save';
  if (state.attempt >= MAX_REFINE_ATTEMPTS) return 'save';
  return 'refine';
}

// ─── Graph construction ────────────────────────────────────────────────────

/** Build the (uncompiled) StateGraph. Exposed for tests that want to assert
 *  on the graph topology without compiling. */
export function buildQuestionGenerationGraphBlueprint(deps: GraphDeps) {
  return new StateGraph(GraphState)
    .addNode('plan', deps.plan)
    .addNode('ground', deps.ground)
    .addNode('generate_batch', deps.generateBatch)
    .addNode('verify', deps.verify)
    .addNode('save', deps.save)
    .addNode('refine', deps.refine)
    .addEdge(START, 'plan')
    .addEdge('plan', 'ground')
    .addEdge('ground', 'generate_batch')
    .addConditionalEdges('generate_batch', routeAfterGenerate)
    .addConditionalEdges('verify', routeAfterVerify)
    .addEdge('refine', 'generate_batch')
    .addEdge('save', END);
}

/** Build and compile the graph with a MemorySaver checkpointer.
 *  Phase B will accept a PostgresSaver here. */
export function buildQuestionGenerationGraph(deps: GraphDeps): CompiledStateGraph {
  const checkpointer = new MemorySaver();
  return buildQuestionGenerationGraphBlueprint(deps).compile({ checkpointer });
}

// ─── Runner ────────────────────────────────────────────────────────────────

/** Run the graph with the given inputs. Returns the final state.
 *
 *  The thread_id is auto-generated (uuid) so each run gets its own
 *  checkpoint stream; pass an explicit threadId for replay. */
export async function runQuestionGenerationGraph(
  inputs: GraphInputs,
  deps: GraphDeps,
  opts?: { threadId?: string; maxIterations?: number },
): Promise<QuestionGenState> {
  const graph = buildQuestionGenerationGraph(deps);
  const threadId = opts?.threadId ?? `qg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const config = { configurable: { thread_id: threadId }, recursionLimit: opts?.maxIterations ?? 25 };
  const result = await graph.invoke({ ...inputs }, config);
  return result as QuestionGenState;
}
'''

TEST_SRC = '''import { describe, it, expect } from 'vitest';
import {
  buildQuestionGenerationGraphBlueprint,
  buildQuestionGenerationGraph,
  runQuestionGenerationGraph,
  GraphState,
  MAX_REFINE_ATTEMPTS,
  type GraphDeps,
  type GraphInputs,
  type QuestionGenState,
  type DraftQuestion,
} from '@/lib/agent/question-generation-graph';

// ── Stage 11 Phase A: graph topology + state machine tests ───────────────────
//
// All tests run with STUB deps — no LLM, no DB. They assert on the graph's
// state transitions and reducer behavior, which is the only thing Phase A
// needs to prove correct. Production wiring (delegating to question-deep-
// agent.ts functions) is verified by the scripts/ E2E smoke checks.

function makeInputs(count = 3): GraphInputs {
  return {
    topic: 'Cardiac arrhythmias',
    system: 'USMLE Step 1',
    types: ['mcq'],
    difficulties: ['medium'],
    count,
    knowledgeSourceIds: ['ks_1', 'ks_2'],
    userId: 'user_test',
    weakTopics: ['AV block'],
    focusHint: 'mechanism over diagnosis',
  };
}

function makeDraft(localId: string): DraftQuestion {
  return {
    localId,
    type: 'mcq',
    difficulty: 'medium',
    stem: `Sample stem for ${localId}`,
    options: ['A', 'B', 'C', 'D'],
    answer: 'A',
    explanation: 'because',
    citationChunkIds: ['ck_1'],
  };
}

/** A deps bundle where every node succeeds and the flow terminates in one
 *  pass through plan → ground → generate_batch → verify → save. */
function happyPathDeps(count: number): GraphDeps {
  let planned = false;
  let grounded = false;
  let saved = false;
  return {
    plan: async (s) => {
      planned = true;
      return { plan: [`cover ${s.topic}`, `cover ${s.system}`] };
    },
    ground: async (s) => {
      grounded = true;
      return { retrievedChunkIds: s.knowledgeSourceIds };
    },
    generateBatch: async (s) => {
      // Generate `count` drafts in one shot.
      const drafts = Array.from({ length: s.count }, (_, i) => makeDraft(`d${i}`));
      return { generated: drafts };
    },
    verify: async (s) => {
      // Everything passes.
      return { verified: s.generated, toRefine: [] };
    },
    save: async (s) => {
      saved = true;
      return { savedIds: s.verified.map((d) => `q_${d.localId}`) };
    },
    refine: async () => ({}),
  };
}

describe('buildQuestionGenerationGraphBlueprint', () => {
  it('constructs a StateGraph with all 6 nodes (does not throw)', () => {
    const deps = happyPathDeps(3);
    expect(() => buildQuestionGenerationGraphBlueprint(deps)).not.toThrow();
  });
});

describe('buildQuestionGenerationGraph', () => {
  it('compiles with a MemorySaver (does not throw)', () => {
    const deps = happyPathDeps(3);
    expect(() => buildQuestionGenerationGraph(deps)).not.toThrow();
  });
});

describe('runQuestionGenerationGraph — happy path', () => {
  it('runs plan → ground → generate_batch → verify → save in one pass', async () => {
    const inputs = makeInputs(3);
    const deps = happyPathDeps(3);
    const final = await runQuestionGenerationGraph(inputs, deps);
    expect(final.generated.length).toBeGreaterThanOrEqual(3);
    expect(final.verified.length).toBeGreaterThanOrEqual(3);
    expect(final.savedIds.length).toBeGreaterThanOrEqual(3);
  });

  it('preserves inputs (topic, userId) into the final state', async () => {
    const inputs = makeInputs(2);
    const deps = happyPathDeps(2);
    const final = await runQuestionGenerationGraph(inputs, deps);
    expect(final.topic).toBe('Cardiac arrhythmias');
    expect(final.userId).toBe('user_test');
  });
});

describe('runQuestionGenerationGraph — verify↔refine loop', () => {
  it('loops back to generate_batch when verify flags drafts for refine', async () => {
    const inputs = makeInputs(2);
    let refineCalled = 0;
    let generateCount = 0;
    const deps: GraphDeps = {
      plan: async (s) => ({ plan: [`cover ${s.topic}`] }),
      ground: async (s) => ({ retrievedChunkIds: s.knowledgeSourceIds }),
      generateBatch: async (s) => {
        generateCount++;
        // First pass: 2 drafts that will be flagged.
        // Second pass: 2 NEW drafts that will pass.
        if (generateCount === 1) {
          return { generated: [makeDraft('g1'), makeDraft('g2')] };
        }
        return { generated: [makeDraft('g3'), makeDraft('g4')] };
      },
      verify: async (s) => {
        // First verify: flag everything for refine.
        // Second verify: pass everything.
        if (s.attempt === 0) {
          return { verified: [], toRefine: s.generated, attempt: 1 };
        }
        return { verified: s.generated, toRefine: [] };
      },
      save: async (s) => ({ savedIds: s.verified.map((d) => `q_${d.localId}`) }),
      refine: async (s) => {
        refineCalled++;
        return { toRefine: [], plan: [...s.plan, `refine pass ${refineCalled}`] };
      },
    };
    const final = await runQuestionGenerationGraph(inputs, deps);
    expect(refineCalled).toBe(1);
    expect(final.attempt).toBe(1);
    expect(final.verified.length).toBeGreaterThanOrEqual(2);
    expect(final.savedIds.length).toBeGreaterThanOrEqual(2);
  });

  it('terminates after MAX_REFINE_ATTEMPTS even if verify never converges', async () => {
    const inputs = makeInputs(2);
    let refineCalled = 0;
    const deps: GraphDeps = {
      plan: async (s) => ({ plan: [`cover ${s.topic}`] }),
      ground: async (s) => ({ retrievedChunkIds: s.knowledgeSourceIds }),
      generateBatch: async () => ({ generated: [makeDraft('x')] }),
      // Always flag everything for refine — never converges.
      verify: async (s) => ({
        verified: [],
        toRefine: s.generated,
        attempt: s.attempt + 1,
      }),
      save: async (s) => ({ savedIds: s.verified.map((d) => `q_${d.localId}`) }),
      refine: async (s) => {
        refineCalled++;
        return { toRefine: [], plan: [...(s.plan ?? []), `r${refineCalled}`] };
      },
    };
    const final = await runQuestionGenerationGraph(inputs, deps);
    // Graph should have given up refining after MAX_REFINE_ATTEMPTS and gone to save.
    expect(refineCalled).toBeLessThanOrEqual(MAX_REFINE_ATTEMPTS);
    // With no drafts verified, save should produce no ids.
    expect(final.savedIds).toEqual([]);
  });
});

describe('GraphState reducers', () => {
  it('generated reducer concatenates across nodes', () => {
    const r = GraphState.channels.generated.reducer;
    const out = r([makeDraft('a')], [makeDraft('b'), makeDraft('c')]);
    expect(out?.length).toBe(3);
  });

  it('toRefine reducer replaces (does not concat)', () => {
    const r = GraphState.channels.toRefine.reducer;
    const out = r([makeDraft('a')], [makeDraft('b')]);
    expect(out?.length).toBe(1);
    expect(out?.[0].localId).toBe('b');
  });

  it('attempt reducer accepts explicit numbers', () => {
    const r = GraphState.channels.attempt.reducer;
    expect(r(2, 5)).toBe(5);
    expect(r(2, undefined)).toBe(3);
  });
});
'''

def write_file(path: Path, content: str, label: str) -> None:
    if path.exists():
        # Idempotency: check for our unique marker.
        existing = path.read_text()
        if "Stage 11 Phase A" in existing or "question-generation-graph" in existing:
            print(f"[{label}] already exists, skipping")
            return
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(content)
    print(f"[{label}] wrote {len(content)} bytes")

def main() -> int:
    write_file(GRAPH_FILE, GRAPH_SRC, "question-generation-graph.ts")
    write_file(TEST_FILE, TEST_SRC, "question-generation-graph.test.ts")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
