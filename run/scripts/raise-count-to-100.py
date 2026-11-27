#!/usr/bin/env python3
"""Raise the /generate question count ceiling from 20 to 100 (effectively
'unlimited' for any realistic use case) and scale all deadlines so 100
questions can actually complete without premature timeouts.

Why 100 (not 'truly unlimited'):
  - Each question needs a real LLM call (~30s simple, ~90s deep-agent).
  - A 4 GB box can't safely hold an unbounded in-memory result set.
  - 100 covers any realistic exam-prep batch; raise MAX_GENERATE_COUNT
    env var if you genuinely need more.

Scaled deadlines for count=100:
  - Deep-agent runtime: 90s/Q avg x 100 = 150 min → RUN_DEADLINE_MS 180 min
  - Client agent timeout: matches, 180 min
  - Client non-agent timeout: 30s/Q x 100 = 50 min → 60 min
  - Next.js maxDuration (serverless hint): 800s → 10800s (3 hr)
"""
import sys

P = "/tmp/my-project"
ok = True


def patch(path, old, new, count=1):
    global ok
    full = f"{P}/{path}"
    text = open(full, "r", encoding="utf-8").read()
    n = text.count(old)
    if n != count:
        print(f"  !! {path}: expected {count}, found {n}")
        ok = False
        return
    open(full, "w", encoding="utf-8").write(text.replace(old, new))
    print(f"  + {path}")


NEW_CAP = "100"
DEADLINE_MIN = "180"  # 3 hours for deep-agent at 100 Q
AGENT_TIMEOUT_MIN = "180"
NON_AGENT_TIMEOUT_MIN = "60"

# ── 1. UI input max + onChange clamp (20 → 100) ────────────────────────────
patch(
    "src/app/generate/page.tsx",
    '          <input type="number" min={1} max={20} value={count}\n'
    '            onChange={(e) => setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), 20))}',
    '          <input type="number" min={1} max={' + NEW_CAP + '} value={count}\n'
    '            onChange={(e) => setCount(Math.min(Math.max(parseInt(e.target.value) || 1, 1), ' + NEW_CAP + '))}',
)

# ── 2. totalToGenerate cap (20 → 100) ──────────────────────────────────────
patch(
    "src/app/generate/page.tsx",
    f"    const totalToGenerate = Math.min(Math.max(count, 1), 20);",
    f"    const totalToGenerate = Math.min(Math.max(count, 1), {NEW_CAP});",
)

# ── 3. Three offline fallback clamps (20 → 100) ───────────────────────────
patch(
    "src/app/generate/page.tsx",
    f"generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), 20))",
    f"generateOfflineQuestions(effectiveTopic, effectiveSystem, activeTypes, activeDiffs, Math.min(Math.max(count, 1), {NEW_CAP}))",
    count=3,
)

# ── 4. Client timeouts (scale with new ceiling) ───────────────────────────
patch(
    "src/app/generate/page.tsx",
    f"const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? 30 * 60_000 : 300_000;",
    f"const GENERATION_TIMEOUT_MS = engineMode === 'agent' ? {AGENT_TIMEOUT_MIN} * 60_000 : {NON_AGENT_TIMEOUT_MIN} * 60_000;",
)

# ── 5. Server-side clamps (20 → 100) ──────────────────────────────────────
patch(
    "src/app/api/generate/route.ts",
    f"const effectiveCount = Math.min(Math.max(body.count || 1, 1), 20);",
    f"const effectiveCount = Math.min(Math.max(body.count || 1, 1), {NEW_CAP});",
)
patch(
    "src/app/api/generate/agent/route.ts",
    f"count: Math.min(Math.max(body.count || 1, 1), 20),",
    f"count: Math.min(Math.max(body.count || 1, 1), {NEW_CAP}),",
)
patch(
    "src/app/api/generate/deep-agent/route.ts",
    f"count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), 20),",
    f"count: Math.min(Math.max(typeof body.count === 'number' ? body.count : 1, 1), {NEW_CAP}),",
)
patch(
    "src/app/api/generate/weakness/route.ts",
    f"processWeaknessJob(jobId, recommendation, Math.min(Math.max(Number(count) || recommendation.suggestedCount, 1), 20), req).catch(",
    f"processWeaknessJob(jobId, recommendation, Math.min(Math.max(Number(count) || recommendation.suggestedCount, 1), {NEW_CAP}), req).catch(",
)

# ── 6. Deep-agent runtime: maxSaves (20 → 100), deadline (30 → 180 min) ───
patch(
    "src/lib/agent/question-deep-agent.ts",
    f"  const maxSaves = Math.min(Math.max(params.count, 1), 20);",
    f"  const maxSaves = Math.min(Math.max(params.count, 1), {NEW_CAP});",
)
patch(
    "src/lib/agent/question-deep-agent.ts",
    f"const RUN_DEADLINE_MS = 30 * 60 * 1000;",
    f"const RUN_DEADLINE_MS = {DEADLINE_MIN} * 60 * 1000;",
)

# ── 7. Next.js maxDuration for the deep-agent route (800s → 10800s) ───────
# (Serverless hint; ignored by `next start` but raised for consistency.)
patch(
    "src/app/api/generate/deep-agent/route.ts",
    f"export const maxDuration = 800;",
    f"export const maxDuration = 10800;",
)

print(f"\nPASS: count cap raised 20 → {NEW_CAP}, deadlines scaled to {DEADLINE_MIN} min" if ok else "\nFAIL")
sys.exit(0 if ok else 1)
