"""Rewrite GraphState to declare each input field as its own Annotation
channel. The previous ...Annotation<GraphInputs> spread did not create
per-field channels, so inputs like `count` were lost (undefined) and the
graph looped forever on `state.generated.length >= state.count`."""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

OLD_STATE = """export const GraphState = Annotation.Root({
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
});"""

NEW_STATE = """export const GraphState = Annotation.Root({
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
});"""

if OLD_STATE in src:
    src = src.replace(OLD_STATE, NEW_STATE)
    GRAPH.write_text(src)
    print("[graph] rewrote GraphState with per-field channels")
else:
    print("[graph] WARNING: OLD_STATE anchor not found")
