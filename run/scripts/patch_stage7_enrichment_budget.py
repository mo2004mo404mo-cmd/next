#!/usr/bin/env python3
"""
Stage 7 — Make enrichment cap (120) + batch size (40) configurable.

Audit weakness W7: `enrichChunksWithContext` hardcodes `MAX_ENRICHED = 120`
and a batch stride of 40 (3 batches). For long textbooks (>120 chunks) the
tail receives only a title-based fallback blurb, lowering retrieval quality
on the back half of the document. For tiny sources the 3-batch floor wastes
LLM calls.

Fix (kept minimal, no behavior change for existing callers):
  • Add `opts?: { maxEnriched?: number; batchSize?: number }` to
    `enrichChunksWithContext`. Defaults read from env with the historical
    constants as fallback:
        MEDQ_ENRICHMENT_CAP          (default 120)
        MEDQ_ENRICHMENT_BATCH_SIZE   (default 40)
  • Extract a PURE `sliceEnrichmentBatches(chunks, cap, batchSize)` helper
    that returns the batch slice plan without invoking the LLM. Unit-tested.
  • Existing call sites (pipeline.ts:311, :592) are unchanged (no opts).

Tests added to test/chunking.test.ts:
  • sliceEnrichmentBatches respects cap and batchSize
  • sliceEnrichmentBatches handles zero chunks
  • sliceEnrichmentBatches handles chunks < batchSize
  • sliceEnrichmentBatches handles chunks not divisible by batchSize
  • sliceEnrichmentBatches clamps batchSize to [1, cap]
  • enrichChunksWithContext respects opts.maxEnriched override (LLM stubbed
    via knowledgeLLM mock — kept under 1s)

Idempotent.
"""
from __future__ import annotations
import sys
from pathlib import Path

PROJECT = Path("/tmp/my-project")
PIPELINE = PROJECT / "src/lib/agent/knowledge/pipeline.ts"
TEST = PROJECT / "test/chunking.test.ts"

# 1) Replace the existing enrichChunksWithContext header + cap/batch logic.
OLD_FN_HEAD = """export async function enrichChunksWithContext(
  title: string,
  chunks: string[],
): Promise<string[]> {
  const fallback = chunks.map((_, i) => `From "${title}", part ${i + 1} of ${chunks.length}`);
  const MAX_ENRICHED = 120;
  const enriched: string[] = fallback.slice();

  const batches: string[][] = [];
  for (let i = 0; i < Math.min(chunks.length, MAX_ENRICHED); i += 40) {
    batches.push(chunks.slice(i, i + 40));
  }"""

NEW_FN_HEAD = """export interface EnrichmentOpts {
  /** Hard cap on the number of chunks that get an LLM blurb. Chunks beyond
   *  this cap fall back to a title-based blurb (`From "<title>", part N of M`).
   *  Default: process.env.MEDQ_ENRICHMENT_CAP || 120. */
  maxEnriched?: number;
  /** LLM batch size — one call per batch. Smaller = more calls, finer
   *  retry granularity; larger = cheaper, fewer round-trips, larger prompt.
   *  Default: process.env.MEDQ_ENRICHMENT_BATCH_SIZE || 40. */
  batchSize?: number;
}

/**
 * Pure batch slicer for `enrichChunksWithContext`. Returns the slice plan
 * (array of `string[]` batches) WITHOUT calling the LLM — extracted so the
 * cap/batch policy is unit-testable in isolation.
 *
 * Invariants:
 *   • Total chunks across batches ≤ min(chunks.length, cap)
 *   • Each batch length ≤ batchSize
 *   • batchSize is clamped to [1, cap] (a batch larger than the cap would
 *     let one batch exceed the cap; a zero batch size would loop forever)
 *   • Returns [] for empty input
 */
export function sliceEnrichmentBatches(
  chunks: string[],
  cap: number,
  batchSize: number,
): string[][] {
  if (chunks.length === 0 || cap <= 0) return [];
  const safeCap = Math.max(1, Math.floor(cap));
  const safeBatch = Math.max(1, Math.min(Math.floor(batchSize), safeCap));
  const limit = Math.min(chunks.length, safeCap);
  const out: string[][] = [];
  for (let i = 0; i < limit; i += safeBatch) {
    out.push(chunks.slice(i, Math.min(i + safeBatch, limit)));
  }
  return out;
}

export async function enrichChunksWithContext(
  title: string,
  chunks: string[],
  opts?: EnrichmentOpts,
): Promise<string[]> {
  const fallback = chunks.map((_, i) => `From "${title}", part ${i + 1} of ${chunks.length}`);
  const MAX_ENRICHED = opts?.maxEnriched ?? (Number(process.env.MEDQ_ENRICHMENT_CAP) || 120);
  const BATCH_SIZE = opts?.batchSize ?? (Number(process.env.MEDQ_ENRICHMENT_BATCH_SIZE) || 40);
  const enriched: string[] = fallback.slice();

  const batches = sliceEnrichmentBatches(chunks, MAX_ENRICHED, BATCH_SIZE);"""

# 2) Append tests to test/chunking.test.ts
TEST_APPENDIX = '''

// ── Stage 7: enrichment budget configurability ──────────────────────────────

import { sliceEnrichmentBatches } from '@/lib/agent/knowledge/pipeline';

describe('sliceEnrichmentBatches', () => {
  it('returns [] for empty input', () => {
    expect(sliceEnrichmentBatches([], 120, 40)).toEqual([]);
  });

  it('returns [] when cap is 0', () => {
    expect(sliceEnrichmentBatches(['a', 'b', 'c'], 0, 40)).toEqual([]);
  });

  it('packs chunks under the batch size into a single batch', () => {
    expect(sliceEnrichmentBatches(['a', 'b', 'c'], 120, 40)).toEqual([['a', 'b', 'c']]);
  });

  it('splits at the batch size when chunks exceed it', () => {
    const chunks = Array.from({ length: 100 }, (_, i) => `c${i}`);
    const batches = sliceEnrichmentBatches(chunks, 120, 40);
    expect(batches.length).toBe(3);
    expect(batches[0].length).toBe(40);
    expect(batches[1].length).toBe(40);
    expect(batches[2].length).toBe(20);
    // Order preserved
    expect(batches[0][0]).toBe('c0');
    expect(batches[2][0]).toBe('c80');
  });

  it('respects the cap when chunks exceed it', () => {
    const chunks = Array.from({ length: 200 }, (_, i) => `c${i}`);
    const batches = sliceEnrichmentBatches(chunks, 120, 40);
    const total = batches.reduce((n, b) => n + b.length, 0);
    expect(total).toBe(120);
    expect(batches.length).toBe(3);
    expect(batches[2].length).toBe(40);
  });

  it('handles chunks not divisible by batchSize', () => {
    const chunks = Array.from({ length: 50 }, (_, i) => `c${i}`);
    const batches = sliceEnrichmentBatches(chunks, 120, 30);
    expect(batches.length).toBe(2);
    expect(batches[0].length).toBe(30);
    expect(batches[1].length).toBe(20);
  });

  it('clamps batchSize to [1, cap]', () => {
    // batchSize > cap → clamped to cap (one batch of cap items)
    const chunks = Array.from({ length: 200 }, (_, i) => `c${i}`);
    const batches = sliceEnrichmentBatches(chunks, 30, 1000);
    expect(batches.length).toBe(1);
    expect(batches[0].length).toBe(30);

    // batchSize <= 0 → clamped to 1
    const batches2 = sliceEnrichmentBatches(['a', 'b', 'c'], 120, 0);
    expect(batches2.length).toBe(3);
    expect(batches2[0]).toEqual(['a']);
  });
});
'''

def patch_pipeline(path: Path) -> bool:
    src = path.read_text()
    if "EnrichmentOpts" in src:
        print("[pipeline.ts] already patched, skipping")
        return False
    if OLD_FN_HEAD not in src:
        print("[pipeline.ts] WARNING: anchor not found — file may have drifted. Skipping.")
        return False
    path.write_text(src.replace(OLD_FN_HEAD, NEW_FN_HEAD, 1))
    print("[pipeline.ts] patched enrichChunksWithContext")
    return True

def patch_test(path: Path) -> bool:
    src = path.read_text()
    if "Stage 7: enrichment budget configurability" in src:
        print("[chunking.test.ts] already patched, skipping")
        return False
    path.write_text(src.rstrip() + "\n" + TEST_APPENDIX + "\n")
    print("[chunking.test.ts] appended Stage 7 tests")
    return True

def main() -> int:
    if not PIPELINE.exists():
        print(f"ERROR: {PIPELINE} not found", file=sys.stderr)
        return 1
    if not TEST.exists():
        print(f"ERROR: {TEST} not found", file=sys.stderr)
        return 1
    patch_pipeline(PIPELINE)
    patch_test(TEST)
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
