/**
 * question-generation-graph.ts — Stage 11 Phase A.
 *
 * An EXPLICIT LangGraph.js StateGraph that orchestrates the
 * question-generation flow with the same six stages as the production
 * question-deep-agent.ts (planner → ground → generate_batch → verify →
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
  Command,
} from '@langchain/langgraph';
import { MemorySaver, type BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';

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
  /** Optional memory aid. */
  mnemonic?: string;
  /** Optional high-yield clinical pearl. */
  clinicalPearl?: string;
  /** Question-specific topic override (defaults to the run topic). */
  topic?: string;
  /** Free-form tags (max 8 survive to the DB row). */
  tags?: string[];
  /** Citations backing the question, format matches HybridChunk. */
  citationChunkIds?: string[];
  /** Full (sourceId, chunkId) citation pairs — written by the production
   *  generate node from the grounding passages, saved by the save node. */
  citations?: Array<{ sourceId: string; chunkId: string }>;
}

/** One grounding passage carried from the ground node into the generate
 *  prompt. Mirrors the subset of HybridChunk the prompt actually needs. */
export interface GroundingChunk {
  chunkId: string;
  sourceId: string;
  documentId: string;
  documentTitle: string;
  content: string;
  /** Contextual-retrieval blurb (may be empty for legacy chunks). */
  contextSummary?: string;
  /** Final relevance score (post-rerank when available). */
  score?: number;
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
  // ── Inputs (each declared as its own channel so they survive into state) ──
  topic: Annotation<string>({
    reducer: (_prev, next) => next ?? _prev ?? '',
    default: () => '',
  }),
  system: Annotation<string>({
    reducer: (_prev, next) => next ?? _prev ?? '',
    default: () => '',
  }),
  types: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  difficulties: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  count: Annotation<number>({
    reducer: (_prev, next) => next ?? _prev ?? 0,
    default: () => 0,
  }),
  knowledgeSourceIds: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  userId: Annotation<string>({
    reducer: (_prev, next) => next ?? _prev ?? '',
    default: () => '',
  }),
  weakTopics: Annotation<string[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  focusHint: Annotation<string>({
    reducer: (_prev, next) => next ?? _prev ?? '',
    default: () => '',
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

  // ── Production-wiring channels (graph-deps.ts) ──
  /** Grounding passages (chunk content) retrieved by the ground node.
   *  Replace-last reducer: each ground pass replaces the previous set. */
  grounding: Annotation<GroundingChunk[]>({
    reducer: (_prev, next) => next ?? _prev ?? [],
    default: () => [],
  }),
  /** Feedback from the refine node, consumed (and cleared) by the next
   *  generate_batch pass. Replace-last reducer. */
  feedback: Annotation<string>({
    reducer: (_prev, next) => next ?? _prev ?? '',
    default: () => '',
  }),
  /** How many entries of `generated` have already been through verify.
   *  Lets the second verify pass (after the refine loop) process only the
   *  NEW drafts instead of re-verifying (and double-counting) old ones. */
  verifiedCount: Annotation<number>({
    reducer: (_prev, next) => (typeof next === 'number' ? next : _prev ?? 0),
    default: () => 0,
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


// ─── Compiled graph type ──────────────────────────────────────────────────
//
// langgraph 1.5.3's `CompiledStateGraph` requires 2-10 type arguments. We
// avoid spelling them out by inferring the return type of `.compile()`.
// The caller only needs `.invoke()` and the result type, both of which are
// preserved by the inference.
type CompiledQuestionGenGraph = ReturnType<
  ReturnType<typeof buildQuestionGenerationGraphBlueprint>['compile']
>;


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
/**
 * Wrap a deps.generateBatch in a node that returns a Command with the
 * routing decision baked in. langgraph 1.x removed addConditionalEdges;
 * nodes return Command({ update, goto }) to route conditionally.
 */
function makeGenerateBatchNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    let patch = await deps.generateBatch(state);
    // The `generated` reducer CONCATENATES prev + next, so the post-patch
    // length is state.generated.length + patch.generated.length — NOT
    // patch.generated.length alone. Routing on the wrong value loops forever.
    const produced = patch.generated?.length ?? 0;
    const postLength = (state.generated?.length ?? 0) + produced;
    let next: 'verify' | 'generate_batch';
    if (postLength >= state.count) {
      next = 'verify';
    } else if (produced === 0) {
      // A pass produced NOTHING (LLM unavailable + no grounding passages,
      // or a hard failure). Looping again would spin to the recursion limit
      // with nothing changing — terminate: verify and save whatever exists,
      // with the reason recorded on the errors channel.
      next = 'verify';
      patch = {
        ...patch,
        errors: [
          ...(patch.errors ?? []),
          'generate_batch pass produced 0 drafts — terminating early (saving what exists)',
        ],
      };
    } else {
      next = 'generate_batch';
    }
    return new Command({ update: patch, goto: next });
  };
}

function makeVerifyNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    const patch = await deps.verify(state);
    // `toRefine` reducer REPLACES (not concat), so patch.toRefine IS the
    // post-patch value. `attempt` reducer accepts explicit numbers, so
    // patch.attempt (if a number) IS the post-patch value.
    const postToRefineLength = patch.toRefine?.length ?? state.toRefine?.length ?? 0;
    const postAttempt =
      typeof patch.attempt === 'number' ? patch.attempt : (state.attempt ?? 0) + 1;
    let next: 'save' | 'refine';
    if (postToRefineLength === 0) next = 'save';
    else if (postAttempt >= MAX_REFINE_ATTEMPTS) next = 'save';
    else next = 'refine';
    return new Command({ update: patch, goto: next });
  };
}

export function buildQuestionGenerationGraphBlueprint(deps: GraphDeps) {
  return new StateGraph(GraphState)
    .addNode('planner', deps.plan)
    .addNode('ground', deps.ground)
    .addNode('generate_batch', makeGenerateBatchNode(deps), {
      ends: ['verify', 'generate_batch'],
    })
    .addNode('verify', makeVerifyNode(deps), {
      ends: ['save', 'refine'],
    })
    .addNode('save', deps.save)
    .addNode('refine', deps.refine)
    .addEdge(START, 'planner')
    .addEdge('planner', 'ground')
    .addEdge('ground', 'generate_batch')
    .addEdge('refine', 'generate_batch')
    .addEdge('save', END);
}

/** Build and compile the graph with a checkpointer.
 *
 *  Default: MemorySaver (in-process, lost on restart).
 *  Production (Phase B): pass `await buildPostgresSaver()` from
 *  checkpoint-postgres.ts so checkpoints persist across server restarts
 *  and are queryable for time-travel debugging.
 *
 *  The checkpointer may be BaseCheckpointSaver (sync) or a
 *  Promise<BaseCheckpointSaver> (resolved before compile). The async form
 *  lets callers lazy-load the PostgresSaver without blocking module init.
 */
export async function buildQuestionGenerationGraph(
  deps: GraphDeps,
  opts?: { checkpointer?: BaseCheckpointSaver | Promise<BaseCheckpointSaver> },
): Promise<CompiledQuestionGenGraph> {
  const checkpointer = opts?.checkpointer
    ? await Promise.resolve(opts.checkpointer)
    : new MemorySaver();
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
  opts?: {
    threadId?: string;
    maxIterations?: number;
    /** Override the checkpointer. Default: MemorySaver. Production:
     *  pass `buildPostgresSaver()` for persistent checkpointing. */
    checkpointer?: BaseCheckpointSaver | Promise<BaseCheckpointSaver>;
  },
): Promise<QuestionGenState> {
  const graph = await buildQuestionGenerationGraph(deps, { checkpointer: opts?.checkpointer });
  const threadId = opts?.threadId ?? `qg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const config = { configurable: { thread_id: threadId }, recursionLimit: opts?.maxIterations ?? 25 };
  const result = await graph.invoke({ ...inputs }, config);
  return result as QuestionGenState;
}
