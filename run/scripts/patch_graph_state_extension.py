"""Extend question-generation-graph.ts state for production wiring.

Adds:
  - GroundingChunk interface (chunk content for the generate prompt)
  - DraftQuestion extensions: mnemonic?, clinicalPearl?, topic?, tags?,
    citations?: Array<{sourceId, chunkId}> (for the save node)
  - New state channels:
      grounding     — retrieved chunk contents (replace-last reducer)
      feedback      — refine→generate feedback channel (replace-last)
      verifiedCount — how many of `generated` have been through verify
                      (lets the verify node skip already-processed drafts
                      on the second pass of the refine loop)

All additive — existing channels and tests are unaffected (new channels
default to []/'' and only the production GraphDeps write to them).
"""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

# ── 1. Extend DraftQuestion + add GroundingChunk ──
OLD_DRAFT = """/** A draft question produced by the generate_batch node, pre-verification. */
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
}"""

NEW_DRAFT = """/** A draft question produced by the generate_batch node, pre-verification. */
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
}"""

if "GroundingChunk" in src:
    print("[graph] GroundingChunk already present, skipping draft extension")
else:
    if OLD_DRAFT in src:
        src = src.replace(OLD_DRAFT, NEW_DRAFT, 1)
        print("[graph] extended DraftQuestion + added GroundingChunk")
    else:
        raise SystemExit("[graph] FATAL: DraftQuestion anchor not found")

# ── 2. Add grounding / feedback / verifiedCount channels ──
OLD_CHANNELS = """  /** Best-effort errors (non-fatal; surfaced in the run result). */
  errors: Annotation<string[]>({
    reducer: (prev, next) => [...(prev ?? []), ...(next ?? [])],
    default: () => [],
  }),
});"""

NEW_CHANNELS = """  /** Best-effort errors (non-fatal; surfaced in the run result). */
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
});"""

if "verifiedCount" in src:
    print("[graph] channels already present, skipping")
else:
    if OLD_CHANNELS in src:
        src = src.replace(OLD_CHANNELS, NEW_CHANNELS, 1)
        print("[graph] added grounding/feedback/verifiedCount channels")
    else:
        raise SystemExit("[graph] FATAL: channels anchor not found")

GRAPH.write_text(src)
print("[graph] wrote", len(src), "bytes")
