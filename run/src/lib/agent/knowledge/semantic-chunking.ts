/**
 * knowledge/semantic-chunking.ts — embedding-guided topic segmentation.
 *
 * WHAT CHANGED vs chunkTextQuality (structure-aware, fixed-size packing):
 * the old chunker packs sentences up to a fixed 900-char budget and cuts
 * wherever the budget fills — topic shifts mid-budget land inside chunks and
 * two different topics share a chunk, which (measured user feedback) made
 * citations "not closely related to the question" and the retrieved context
 * incomplete: a chunk spanning two topics dilutes the embedding (neither
 * topic matches precisely) and the citation quote drags in off-topic
 * sentences.
 *
 * SEMANTIC CHUNKING (this module) lets the EMBEDDING MODEL place the cuts:
 *
 *   1. UNITS — text → paragraphs (dangling fragments pre-joined, shared
 *      helper with the structural chunker) → sentence units carrying
 *      structure metadata (heading / list-item / paragraph-start), via the
 *      abbreviation-aware splitter.
 *   2. EMBED — every unit is embedded with the SAME provider used for the
 *      index (bge-small locally), so boundary decisions use real semantics.
 *      Cost scales with characters (not sentence count), so sentence-level
 *      granularity — the finest boundary signal — comes at no extra price
 *      vs coarser blocks. Huge documents are sliced at paragraph boundaries
 *      (SLICE_UNITS) to bound memory; each slice adapts independently.
 *   3. BOUNDARY SCORES — for each adjacent pair, distance = 1 − cosine, plus
 *      structure adjustments: paragraph breaks are slightly more cut-worthy,
 *      boundaries INSIDE a bullet list are heavily penalized (a list is one
 *      answering unit — questions like "which of these drugs…" need the whole
 *      list), and a sentence ending in ":" never detaches from its list.
 *   4. CUT COST — the adaptive "strong boundary" level = `hardPercentile`
 *      (default 68th) of the slice's OWN boundary-score distribution. No
 *      absolute threshold that breaks across embedders; homogeneous text
 *      yields near-zero surpluses and falls back to size-driven behavior
 *      automatically.
 *   5. OPTIMAL DP SEGMENTATION — heading-delimited segments are split by
 *      dynamic programming: maximize Σ (boundaryScore − CUT_COST) over the
 *      chosen cuts minus a quadratic pull of every chunk toward targetSize,
 *      subject to HARD bounds [minSize, maxSize]. Properties this buys over
 *      greedy threshold cutting (measured failure on a 438 KB textbook:
 *      greedy fired at 91% of boundaries → 888 shards averaging 492 chars):
 *        * chunk sizes are guaranteed well-formed (300–1400) by construction;
 *        * a cut only happens when its boundary is genuinely stronger than
 *          the cost — weak-boundary clusters no longer shatter the document;
 *        * when a cut is unavoidable (maxSize), the DP picks the BEST place,
 *          not the first place;
 *        * homogeneous documents stop at ~targetSize chunks (size term
 *          dominates), exactly like the old chunker but sentence-aligned.
 *   6. POST-PASS — tiny fragments (< 100 chars, e.g. a lone sub-heading)
 *      merge forward so headings stay attached to their sections; a trailing
 *      fragment < minSize/2 folds into the previous chunk when it fits.
 *
 * FAILURE MODEL: any embedding error, shape mismatch or empty result throws
 * to the caller, which falls back to chunkTextQuality — the pipeline is
 * never blocked by this module (see chunkKnowledge in pipeline.ts).
 */

import {
  chunkTextQuality,
  splitSentences,
  isHeadingLine,
  isStructuralLine,
  joinParagraphFragments,
} from './text-quality';

// ─── Public types ──────────────────────────────────────────────────────────

/** Passage-side embed function (no query prefix). */
export type EmbedFn = (texts: string[]) => Promise<Float32Array[]>;

export interface SemanticChunkOptions {
  /** Minimum chunk size (default 300). Enforced as a hard DP bound; only
   *  complete structural sections (heading + short body) may be smaller. */
  minSize?: number;
  /** Chunks are quadratically pulled toward this size (default 900 — keeps
   *  the average chunk near the historical size). */
  targetSize?: number;
  /** Hard ceiling (default 1400): a cut is forced at the best boundary in
   *  the window. 1400 + context blurb stays inside bge's 512-token window. */
  maxSize?: number;
  /** Percentile of boundary scores treated as the "strong boundary" cut cost
   *  (default 68 — roughly the top third of boundaries are worth cutting). */
  hardPercentile?: number;
  /** Live progress note (UI stage detail). */
  onProgress?: (note: string) => void;
}

export interface SemanticChunkStats {
  units: number;
  cuts: number;
  /** Adaptive strong-boundary level (p68 of this document's scores). */
  cutCost: number;
  /** Mean adjacent-unit cosine INSIDE chunks (higher = coherent). */
  avgWithinSim: number;
  /** Mean adjacent-unit cosine AT the chosen cut boundaries (lower = cuts
   *  land on real topic shifts). avgWithin − avgCross > 0 is the signature
   *  of successful semantic segmentation. */
  avgCrossSim: number;
  elapsedMs: number;
}

export interface SemanticChunkResult {
  chunks: string[];
  method: 'semantic' | 'structural-fallback' | 'single';
  stats: SemanticChunkStats;
}

// ─── Tunables ──────────────────────────────────────────────────────────────

/** Upper bound of units embedded per slice (huge docs are sliced at
 *  paragraph boundaries; each slice is segmented independently). */
const SLICE_UNITS = 3000;
/** Oversized single units (run-ons) are pre-split at this size. */
const RUNON_SPLIT = 1100;
/** Chunks below this length merge forward into the next chunk (sub-heading
 *  fragments stay attached to their section). */
const TINY_CHUNK = 100;
/** Relaxed minimum for the FINAL chunk of a segment (post-pass merges it
 *  backward when it is small). */
const MIN_TAIL = 120;
/** Structure adjustments added to the raw 1 − cosine distance. */
const PARA_START_BONUS = 0.12;
const IN_LIST_PENALTY = 0.5;
const LEADIN_PENALTY = 0.3;
/** Quadratic pull of chunk length toward targetSize (score units). */
const SIZE_KAPPA = 0.6;

// ─── Unit model ────────────────────────────────────────────────────────────

interface Unit {
  text: string;
  /** First unit of its paragraph. */
  paraStart: boolean;
  /** First unit of its source line (paragraph → \n\n, line → \n, else ' '). */
  lineStart: boolean;
  /** Unit belongs to a bullet / numbered / lettered list item. */
  listItem: boolean;
  /** The line is a Title-Case / ALL-CAPS heading. */
  heading: boolean;
  /** Consecutive list items share a list-block id; prose units use -1. */
  listBlock: number;
}

/** Split text into sentence units carrying structure metadata. */
function buildUnits(text: string, runOnSplit: number): Unit[] {
  const normalized = text.replace(/\r\n?/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  if (!normalized) return [];

  const paragraphs = normalized.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  const joined = joinParagraphFragments(paragraphs);

  const units: Unit[] = [];
  let listBlock = -1;
  let prevWasList = false;

  for (const paragraph of joined) {
    const lines = paragraph.split('\n').map((l) => l.trim()).filter(Boolean);
    let firstInPara = true;

    for (const line of lines) {
      const heading = isHeadingLine(line);
      const listMarker = !heading && isStructuralLine(line);

      if (listMarker && !prevWasList) listBlock += 1;

      if (heading) {
        // Headings are atomic — never sentence-split.
        units.push({
          text: line,
          paraStart: firstInPara,
          lineStart: true,
          listItem: false,
          heading: true,
          listBlock: -1,
        });
        prevWasList = false;
      } else {
        // Prose or list line → sentences. All sentences of the line inherit
        // the list flags so a bullet's continuation is never cut from its
        // marker sentence mid-list-item.
        let pieces = splitSentences(line);
        if (pieces.length === 0) pieces = [line];
        if (line.length > runOnSplit) {
          // Punctuation-free run-on longer than the budget — word-boundary
          // pieces via the structural chunker (never cuts mid-word).
          pieces = chunkTextQuality(line, { size: runOnSplit, overlap: 0 });
        }
        for (let s = 0; s < pieces.length; s++) {
          if (!pieces[s]) continue;
          units.push({
            text: pieces[s],
            paraStart: firstInPara && s === 0,
            lineStart: s === 0,
            listItem: listMarker,
            heading: false,
            listBlock: listMarker ? listBlock : -1,
          });
        }
        prevWasList = listMarker;
      }
      firstInPara = false;
    }
  }
  return units.filter((u) => u.text.length > 0);
}

/** Reassemble units into text, restoring paragraph/line structure. */
function joinUnits(units: Unit[]): string {
  let out = '';
  for (let k = 0; k < units.length; k++) {
    const u = units[k];
    if (k === 0) out = u.text;
    else if (u.paraStart) out += `\n\n${u.text}`;
    else if (u.lineStart) out += `\n${u.text}`;
    else out += ` ${u.text}`;
  }
  return out;
}

// ─── Math helpers ──────────────────────────────────────────────────────────

/** True cosine (embedders are pre-normalized, but stay correct regardless). */
function cosine(a: Float32Array, b: Float32Array): number {
  const len = Math.min(a.length, b.length);
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < len; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom > 0 ? dot / denom : 0;
}

function percentile(values: number[], p: number): number {
  if (values.length === 0) return Number.POSITIVE_INFINITY;
  const sorted = [...values].sort((x, y) => x - y);
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.ceil((p / 100) * sorted.length) - 1));
  return sorted[idx];
}

function mean(values: number[]): number {
  if (values.length === 0) return 0;
  return values.reduce((s, v) => s + v, 0) / values.length;
}

// ─── DP segmentation ───────────────────────────────────────────────────────

/** Quadratic pull of a chunk's length toward targetSize, in score units. */
function sizePenalty(len: number, target: number): number {
  const rel = (len - target) / target;
  return SIZE_KAPPA * rel * rel;
}

/**
 * Optimal segmentation of ONE heading-delimited segment (units s..e
 * inclusive): choose cut positions maximizing
 *   Σ (boundaryScore − cutCost)  −  Σ sizePenalty(chunk)
 * subject to every chunk's length ∈ [minSize, maxSize] (final chunk may go
 * down to MIN_TAIL). Returns the cut unit indexes (global) where a new
 * chunk starts, or null when the segment cannot be validly split (emitted
 * as one chunk by the caller).
 */
function segmentRangeDP(
  units: Unit[],
  prefix: number[], // prefix[k] = chars of units 0..k-1 (+1 separator each)
  adjusted: number[], // boundary score, index = LEFT unit
  eligible: boolean[], // boundary may host a semantic cut (not before headings)
  s: number,
  e: number,
  cfg: { minSize: number; targetSize: number; maxSize: number; cutCost: number },
): number[] | null {
  const n = e - s + 1;
  const len = (i: number, j: number) => prefix[j] - prefix[i]; // units i..j-1

  const NEG = Number.NEGATIVE_INFINITY;
  const dp = new Array<number>(n + 1).fill(NEG);
  const back = new Array<number>(n + 1).fill(-1);
  dp[0] = 0;

  for (let j = 1; j <= n; j++) {
    const minChunk = j === n ? Math.min(cfg.minSize, MIN_TAIL) : cfg.minSize;
    // Candidate starts i (chunk = segment units i..j-1 → global s+i..s+j-1).
    for (let i = j - 1; i >= 0; i--) {
      const chunkLen = len(s + i, s + j);
      if (chunkLen > cfg.maxSize) break; // grows as i decreases — stop early
      if (chunkLen < minChunk) continue;
      if (dp[i] === NEG) continue;
      // Reward of cutting at boundary before segment-unit i (i > 0): the
      // boundary sits between global units s+i-1 and s+i.
      let reward = 0;
      if (i > 0) {
        const b = s + i - 1; // global boundary index
        reward = (eligible[b] ? adjusted[b] : adjusted[b] - 0.5) - cfg.cutCost;
      }
      const score = dp[i] + reward - sizePenalty(chunkLen, cfg.targetSize);
      if (score > dp[j]) {
        dp[j] = score;
        back[j] = i;
      }
      if (i === 0) break;
    }
  }

  if (dp[n] === NEG) return null; // pathological unit sizes — caller emits whole segment

  // Backtrack: chunk starts (global unit indexes).
  const cuts: number[] = [];
  let j = n;
  while (j > 0) {
    const i = back[j];
    if (i > 0) cuts.push(s + i);
    j = i;
  }
  return cuts.reverse();
}

// ─── Slice segmentation (embed + score + DP) ───────────────────────────────

interface SliceSegmentation {
  ranges: Array<[number, number]>; // inclusive [firstUnit, lastUnit]
  cutBoundaryIndexes: number[]; // unit i where a cut landed between i and i+1
  cutCost: number;
  sims: number[]; // adjacent-unit cosine per boundary (index = left unit)
}

/**
 * Embed the slice's units and run DP segmentation over heading-delimited
 * segments. Deterministic given the embeddings.
 */
async function segmentSlice(
  units: Unit[],
  embed: EmbedFn,
  cfg: { minSize: number; targetSize: number; maxSize: number; hardPercentile: number },
  onProgress?: (note: string) => void,
): Promise<SliceSegmentation> {
  const n = units.length;
  onProgress?.(`Embedding ${n} sentences for boundary analysis`);

  const vectors = await embed(units.map((u) => u.text));
  if (vectors.length !== n) {
    throw new Error(`semantic-chunking: embedder returned ${vectors.length}/${n} vectors`);
  }

  // Adjacent cosine + structure-adjusted boundary scores.
  const sims: number[] = new Array(Math.max(0, n - 1));
  const adjusted: number[] = new Array(Math.max(0, n - 1));
  const eligible: boolean[] = new Array(Math.max(0, n - 1));

  for (let i = 0; i + 1 < n; i++) {
    const sim = cosine(vectors[i], vectors[i + 1]);
    sims[i] = sim;
    const next = units[i + 1];
    const prev = units[i];
    const sameList =
      prev.listItem && next.listItem && prev.listBlock === next.listBlock && prev.listBlock >= 0;
    const leadIn = /[:;]\s*$/.test(prev.text); // "Management includes:" → its list
    let score = 1 - sim;
    if (next.paraStart) score += PARA_START_BONUS;
    if (sameList) score -= IN_LIST_PENALTY;
    if (leadIn && next.listItem) score -= LEADIN_PENALTY;
    // Heading boundaries are structurally forced — keep them out of the
    // score distribution so they don't skew the percentile.
    eligible[i] = !next.heading;
    adjusted[i] = score;
  }

  const eligibleScores = adjusted.filter((_, i) => eligible[i]);
  const cutCost = percentile(eligibleScores, cfg.hardPercentile);

  // Prefix lengths for O(1) chunk-length queries.
  const prefix = new Array<number>(n + 1).fill(0);
  for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + units[i].text.length + 1;

  // Heading-delimited segments: a heading ALWAYS starts a new chunk.
  const segments: Array<[number, number]> = [];
  {
    let start = 0;
    for (let i = 1; i < n; i++) {
      if (units[i].heading) {
        segments.push([start, i - 1]);
        start = i;
      }
    }
    segments.push([start, n - 1]);
  }

  const ranges: Array<[number, number]> = [];
  const cutBoundaryIndexes: number[] = [];

  for (const [s, e] of segments) {
    if (s > e) continue; // defensive
    const segLen = prefix[e + 1] - prefix[s];
    if (segLen <= cfg.maxSize && segLen < cfg.minSize) {
      // Complete short section (heading + body): one chunk as-is.
      ranges.push([s, e]);
      continue;
    }
    const cuts = segmentRangeDP(units, prefix, adjusted, eligible, s, e, { ...cfg, cutCost });
    if (cuts === null) {
      // Not splittable within bounds — one (possibly oversized) chunk.
      ranges.push([s, e]);
      continue;
    }
    let prevEnd = s;
    for (const c of cuts) {
      ranges.push([prevEnd, c - 1]);
      cutBoundaryIndexes.push(c - 1);
      prevEnd = c;
    }
    ranges.push([prevEnd, e]);
  }

  return { ranges, cutBoundaryIndexes, cutCost, sims };
}

// ─── Main entry point ──────────────────────────────────────────────────────

/**
 * Semantic chunking — embedding-guided topic segmentation with size bounds.
 * See the module docstring for the algorithm and the failure model. Throws
 * ONLY on embedding problems; the caller (pipeline.chunkKnowledge) falls
 * back to the structural chunker.
 */
export async function chunkTextSemantic(
  text: string,
  embed: EmbedFn,
  opts: SemanticChunkOptions = {},
): Promise<SemanticChunkResult> {
  const started = Date.now();
  const minSize = Math.max(120, opts.minSize ?? 300);
  const targetSize = Math.max(minSize, opts.targetSize ?? 900);
  const maxSize = Math.max(targetSize, opts.maxSize ?? 1400);
  const hardPercentile = Math.min(90, Math.max(55, opts.hardPercentile ?? 68));
  const onProgress = opts.onProgress;

  const trimmed = text.trim();
  if (!trimmed) {
    return { chunks: [], method: 'structural-fallback', stats: emptyStats(Date.now() - started) };
  }

  // Small inputs are not worth an embedding round-trip.
  if (trimmed.length <= minSize) {
    return { chunks: [trimmed], method: 'single', stats: emptyStats(Date.now() - started) };
  }

  const units = buildUnits(trimmed, RUNON_SPLIT);
  if (units.length === 0) {
    return {
      chunks: chunkTextQuality(trimmed),
      method: 'structural-fallback',
      stats: emptyStats(Date.now() - started),
    };
  }
  onProgress?.(`Analyzing ${units.length} sentences`);

  // Slice huge unit lists at paragraph boundaries so embedding calls and
  // percentile statistics stay local and bounded.
  const slices: Array<[number, number]> = [];
  {
    let start = 0;
    while (start < units.length) {
      let end = Math.min(start + SLICE_UNITS, units.length);
      if (end < units.length) {
        while (end > start + SLICE_UNITS / 2 && !units[end].paraStart && !units[end].heading) end -= 1;
      }
      slices.push([start, end - 1]);
      start = end;
    }
  }

  const chunks: string[] = [];
  const withinSims: number[] = [];
  const crossSims: number[] = [];
  let cuts = 0;
  let cutCost = 0;

  for (const [from, to] of slices) {
    const sliceUnits = units.slice(from, to + 1);
    const seg = await segmentSlice(
      sliceUnits,
      embed,
      { minSize, targetSize, maxSize, hardPercentile },
      onProgress,
    );
    cutCost = seg.cutCost;

    for (const [a, b] of seg.ranges) {
      const piece = joinUnits(sliceUnits.slice(a, b + 1)).trim();
      if (piece) chunks.push(piece);
    }
    cuts += seg.cutBoundaryIndexes.length;

    // Coherence metrics: within-chunk adjacency vs chosen cut boundaries.
    const cutSet = new Set(seg.cutBoundaryIndexes);
    for (let b = 0; b + 1 < sliceUnits.length; b++) {
      if (cutSet.has(b)) crossSims.push(seg.sims[b]);
      else withinSims.push(seg.sims[b]);
    }
  }

  onProgress?.(`Placed ${cuts} topic boundaries → ${chunks.length} passages`);

  // Post-pass 1: tiny fragments (lone sub-headings) merge FORWARD so the
  // heading stays attached to its section.
  for (let i = 0; i + 1 < chunks.length; i++) {
    if (chunks[i].length < TINY_CHUNK) {
      chunks[i + 1] = `${chunks[i]}\n\n${chunks[i + 1]}`;
      chunks.splice(i, 1);
      i -= 1; // recheck the merged slot
    }
  }
  // Post-pass 2: a trailing fragment below minSize/2 folds into the previous
  // chunk when the combination stays under a small tolerance.
  if (chunks.length >= 2) {
    const last = chunks[chunks.length - 1];
    const prev = chunks[chunks.length - 2];
    if (last.length < minSize / 2 && prev.length + last.length + 2 <= maxSize * 1.15) {
      chunks.splice(chunks.length - 2, 2, `${prev}\n\n${last}`);
    }
  }

  const stats: SemanticChunkStats = {
    units: units.length,
    cuts,
    cutCost: Number.isFinite(cutCost) ? Number(cutCost.toFixed(3)) : 0,
    avgWithinSim: Number(mean(withinSims).toFixed(3)),
    avgCrossSim: Number(mean(crossSims).toFixed(3)),
    elapsedMs: Date.now() - started,
  };

  return {
    chunks: chunks.length > 0 ? chunks : chunkTextQuality(trimmed),
    method: 'semantic',
    stats,
  };
}

function emptyStats(elapsedMs: number): SemanticChunkStats {
  return {
    units: 0,
    cuts: 0,
    cutCost: 0,
    avgWithinSim: 0,
    avgCrossSim: 0,
    elapsedMs,
  };
}
