#!/usr/bin/env python3
"""Q1 fix: image extraction no longer blocks question extraction to failure.

The Bank question extractor runs a sequential VLM pass over every embedded
image on pass 1. With many images (PPTX decks, illustrated DOCX/PDF) this
monopolizes the Z.AI gateway: every image takes ~5-15s plus 429 backoff,
which burns the whole 20-min pass budget on VLM alone -- leaving no time
for the text-extraction LLM to pull questions out of the OCR'd slide text.
Observed in production: jobs with 7 MB of images all die at pass 1 with
"Extraction did not complete (rate-limited for too long)".

Fix: introduce a dedicated VLM time budget (default 4 min). When it's spent
we STOP starting new VLM calls but CONTINUE the job -- text extraction
proceeds on whatever OCR text was already collected. Skipped images are
counted and surfaced in the operator log.
"""
import sys

P = "/tmp/my-project/src/app/api/questions/import/extract/route.ts"
ok = True


def patch(old, new, count=1):
    global ok
    text = open(P, "r", encoding="utf-8").read()
    n = text.count(old)
    if n != count:
        print(f"  !! expected {count}, found {n}: {old[:70]}...")
        ok = False
        return
    open(P, "w", encoding="utf-8").write(text.replace(old, new))
    print(f"  + patched: {old[:70]}...")


# (Patch #1 may already have inserted the constant — dedupe if so.)
def patch_dedupe(needle_full, keep_one_line):
    """Remove duplicate occurrences of a block, keeping only one copy."""
    global ok
    text = open(P, "r", encoding="utf-8").read()
    first = text.find(needle_full)
    if first < 0:
        return
    second = text.find(needle_full, first + 1)
    if second < 0:
        return  # only one copy — nothing to dedupe
    # remove the second copy
    open(P, "w", encoding="utf-8").write(text[:first + len(needle_full)] + text[second + len(needle_full):])
    print(f"  + deduped: {needle_full[:60]}...")


_vlm_block = (
    'const JOB_DEADLINE_MS = 20 * 60_000;\n'
    '/** Hard time budget for the VLM image pass on pass 1. VLM calls are\n'
    ' *  sequential and share the Z.AI gateway rate-limit budget with text\n'
    ' *  extraction -- a deck with 20+ images can otherwise eat the whole\n'
    ' *  20-min pass on VLM alone, leaving no time to actually pull the\n'
    ' *  questions out of the OCR\'d slide text. When this budget is hit we\n'
    ' *  STOP starting new VLM calls but CONTINUE the job: text extraction\n'
    ' *  proceeds on whatever image OCR was already collected, and skipped\n'
    ' *  images are simply not analyzed (worst case: question stem without\n'
    ' *  the figure\'s text context -- far better than failing the whole job). */\n'
    'const VLM_TIME_BUDGET_MS = Number(process.env.EXTRACT_VLM_BUDGET_MS || 4 * 60_000);'
)
patch_dedupe(_vlm_block, "const VLM_TIME_BUDGET_MS")

# 1. VLM time-budget constant next to the other deadlines (only inserts if missing)
def patch_if_absent(marker, new_text):
    text = open(P, "r", encoding="utf-8").read()
    if "VLM_TIME_BUDGET_MS" in text:
        print("  + already present (skipped): VLM_TIME_BUDGET_MS")
        return
    if marker not in text:
        print(f"  !! marker not found: {marker[:60]}")
        global ok; ok = False
        return
    open(P, "w", encoding="utf-8").write(text.replace(marker, new_text))
    print(f"  + inserted: VLM_TIME_BUDGET_MS")

# 2. Track VLM time spent + skipped count, and bail out of the image loop
#    when budget exhausted. Insert timer before loop; check at top of each iter.
patch(
    "        const vlmResults: ImageVlmResult[] = [];\n"
    "        let visionDone = 0;\n"
    "        let consecutiveVlmFailures = 0;\n"
    "        for (const img of images) {",
    "        const vlmResults: ImageVlmResult[] = [];\n"
    "        let visionDone = 0;\n"
    "        let consecutiveVlmFailures = 0;\n"
    "        const vlmStartedAt = Date.now();\n"
    "        let vlmSkipped = 0;\n"
    "        for (const img of images) {",
)

# 3. Budget check at top of loop body (before cancellation check)
patch(
    "          // Cancellation check — stop starting new VLM calls. The in-flight\n"
    "          // call (if any) will finish (~5–10s) and then we exit.\n"
    "          if (CANCELLED.has(jobId)) {",
    "          // VLM time budget — stop starting new VLM calls once the pass's\n"
    "          // VLM slice is exhausted. The text-extraction LLM still runs on\n"
    "          // whatever OCR text we already collected; remaining images are\n"
    "          // counted as skipped (worst case: a question stem loses its\n"
    "          // figure's text context — better than failing the whole job).\n"
    "          if (Date.now() - vlmStartedAt > VLM_TIME_BUDGET_MS) {\n"
    "            vlmSkipped = images.length - visionDone;\n"
    "            console.warn(\n"
    "              `[Question Extract] job ${jobId}: VLM time budget exhausted after ${visionDone}/${images.length} image(s) — skipping remaining ${vlmSkipped}, text extraction will continue`,\n"
    "            );\n"
    "            break;\n"
    "          }\n"
    "          // Cancellation check — stop starting new VLM calls. The in-flight\n"
    "          // call (if any) will finish (~5–10s) and then we exit.\n"
    "          if (CANCELLED.has(jobId)) {",
)

# 4. Surface skip count in the post-VLM log line
patch(
    "        console.log(\n"
    "          `[Question Extract] job ${jobId}: VLM pass done — ${inlined.length} image(s) inlined next to their slide text, ${leftover.length} at top of file; merged text is now ${text.length.toLocaleString()} chars (was ${row.text.length.toLocaleString()})`,\n"
    "        );",
    "        console.log(\n"
    "          `[Question Extract] job ${jobId}: VLM pass done — ${inlined.length} image(s) inlined next to their slide text, ${leftover.length} at top of file${vlmSkipped ? `, ${vlmSkipped} skipped (VLM time budget)` : ''}; merged text is now ${text.length.toLocaleString()} chars (was ${row.text.length.toLocaleString()})`,\n"
    "        );",
)

print("\nPASS: Q1 patch applied" if ok else "\nFAIL: some patches did not apply")
sys.exit(0 if ok else 1)
