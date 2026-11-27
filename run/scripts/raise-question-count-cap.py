#!/usr/bin/env python3
"""Raise the /generate question count ceiling from 5/8/10 → 20 everywhere.

Fixes two user-reported bugs:
  1. UI input capped at 10 (can't request more)
  2. Even typing 10 only yields 5 (multiple server-side clamps at 5)

Also scales the deep-agent runtime deadline and client-side agent timeout so
20 questions can actually complete without a premature "timed out" toast.
"""
import sys

ROOT = "/tmp/my-project"
ok = True


def patch(path, old, new, count=1):
    global ok
    with open(path, "r", encoding="utf-8") as f:
        text = f.read()
    n = text.count(old)
    if n != count:
        print(f"  !! {path}: expected {count} occurrence(s), found {n}")
        ok = False
        return
    with open(path, "w", encoding="utf-8") as f:
        f.write(text.replace(old, new))
    print(f"  ✓ {path}")


# ── 1. Client UI: input max + totalToGenerate cap (10 → 20) ─────────────────
PAGE = f"{ROOT}/src/app/generate/page.tsx"

# Input element: max={10} + onChange clamp 10
patch(
    PAGE,
    '          <input type="number" min={1} max={10} value={count}\n'
    '            onChange={(e) => setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 10))}',
    '          <input type="number" min={1} max={20} value={count}\n'
    '            onChange={(e) => setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 20))}',
)

# totalToGenerate cap: 10 → 20
patch(
    PAGE,
    "    const totalToGenerate = Math.min(Math.max(count, 1), 10);",
    "    const totalToGenerate = Math.min(Math.max(count, 1), 20);",
)

# Offline template fallbacks (3 occurrences, all 10 → 20)
patch(
    PAGE,
    "generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 10))",
    "generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 20))",
    count=3,
)

# Browser-AI offline prompt: hardcodes Math.min(count, 5) — honor the full count
patch(
    PAGE,
    'const prompt = `Generate ${Math.min(count, 5)} medical questions about "${effectiveTopic}" in the ${effectiveSystem} system. ',
    'const prompt = `Generate ${totalToGenerate} medical questions about "${effectiveTopic}" in the ${effectiveSystem} system. ',
)

# Client timeout for agent mode: 8 min → 30 min (deep-agent at ~75s/Q × 20 ≈ 25 min)
patch(
    PAGE,
    "const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? 480_000 : 120_000;",
    "const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? 30 * 60_000 : 300_000;",
)

# ── 2. Server: all count clamps 5 → 20 ──────────────────────────────────────
patch(
    f"{ROOT}/src/app/api/generate/route.ts",
    "const effectiveCount = Math.min(Math.max(body.count || 1, 1), 5);",
    "const effectiveCount = Math.min(Math.max(body.count || 1, 1), 20);",
)
patch(
    f"{ROOT}/src/app/api/generate/agent/route.ts",
    "count: Math.min(Math.max(body.count || 1, 1), 5),",
    "count: Math.min(Math.max(body.count || 1, 1), 20),",
)
patch(
    f"{ROOT}/src/app/api/generate/deep-agent/route.ts",
    "count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 5),",
    "count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 20),",
)
patch(
    f"{ROOT}/src/app/api/generate/weakness/route.ts",
    "processWeaknessJob(jobId, recommendation, Math.min(Math.max(Number(count) || recommendation.suggestedCount, 1), 5), req).catch(",
    "processWeaknessJob(jobId, recommendation, Math.min(Math.max(Number(count) || recommendation.suggestedCount, 1), 20), req).catch(",
)

# ── 3. Deep-agent runtime: maxSaves 8 → 20, deadline 12 min → 30 min ────────
patch(
    f"{ROOT}/src/lib/agent/question-deep-agent.ts",
    "  const maxSaves = Math.min(Math.max(params.count, 1), 8);",
    "  const maxSaves = Math.min(Math.max(params.count, 1), 20);",
)
patch(
    f"{ROOT}/src/lib/agent/question-deep-agent.ts",
    "const RUN_DEADLINE_MS = 12 * 60 * 1000;",
    "const RUN_DEADLINE_MS = 30 * 60 * 1000;",
)

print("\n✓ All count caps raised to 20." if ok else "\n✗ Some patches did not apply!")
sys.exit(0 if ok else 1)
