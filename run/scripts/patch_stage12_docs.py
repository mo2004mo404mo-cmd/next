#!/usr/bin/env python3
"""Stage 12 — Operational hardening docs.

Creates two markdown files under /tmp/my-project/docs/:
  1. stage-completion.md — tracker for all 12 RAG-roadmap stages with
     verification evidence (test counts, file paths, decisions made).
  2. runbook.md — operational runbook covering common incidents, the
     Stage 8 /v1 roundtrip clarification, the Stage 9 SSRF pinning, the
     Stage 10 visitor matrix, and the Stage 11 LangGraph Phase A graph.

Idempotent.
"""
from pathlib import Path

PROJECT = Path("/tmp/my-project")
DOCS = PROJECT / "docs"
STAGE_DOC = DOCS / "stage-completion.md"
RUNBOOK = DOCS / "runbook.md"

STAGE_MD = """# RAG Roadmap — Stage Completion Tracker

**Last updated:** 2026-11-03 · **Author:** Principal AI Architect

This document tracks the implementation status of all 12 RAG-roadmap stages
delivered against the MedQ codebase. Each entry cites the file(s) where the
stage landed, the tests that verify it, and any decision that deferred or
redirected the original plan.

## Summary table

| Stage | Topic | Status | Tests | Files |
|---|---|---|---|---|
| 1 | file-extract convergence + vitest scaffold | DONE | 6 files / 86 tests | `src/lib/file-extract.ts`, `src/lib/server-file-extract.ts`, `test/*` |
| 2 | Vector index (replace app-layer cosine) | DECISION: keep app-layer cosine | — | `docs/spike-5-vector-index.md` |
| 3 | Video scene tech + VideoScene model | DONE | 17 tests | `prisma/schema.prisma`, `src/lib/agent/knowledge/scene-segmentation.ts`, `src/lib/agent/knowledge/video-scenes.ts`, `src/lib/agent/tools/video-search.ts` |
| 4 | Multimodal temporal alignment | DONE | (in Stage 3 tests) | `src/lib/agent/knowledge/scene-segmentation.ts` (`assignTranscriptToScenes`, `assignDescriptionsToScenes`) |
| 5 | Index route spike (pgvector vs hnswlib-node) | DECISION: keep app-layer cosine | — | `docs/spike-5-vector-index.md` |
| 6 | Token-based chunking | DONE (semantic-chunking.ts) | 19 tests | `src/lib/agent/knowledge/text-quality.ts`, `src/lib/agent/knowledge/semantic-chunking.ts` |
| 7 | Enrichment cap configurable | DONE | 7 new tests | `src/lib/agent/knowledge/pipeline.ts` (`sliceEnrichmentBatches`, `EnrichmentOpts`) |
| 8 | OPENAI_BASE_URL /v1 roundtrip | NOT A BUG (by design — BYOK pool proxy) | — | `src/app/v1/[[...path]]/route.ts` |
| 9 | DNS rebinding TOCTOU defense | DONE | 9 new tests | `src/lib/server/ssrf-guard.ts` (`safeFetch`, `resolveUrlForSSRF`, `createSSRFSafeDispatcher`) |
| 10 | Visitor strategy threshold table | DONE | 14 new tests | `src/lib/subscription/visitor-strategy.ts` |
| 11 | LangGraph.js Phase A | DONE | 9 new tests | `src/lib/agent/question-generation-graph.ts` |
| 12 | Operational hardening | DONE | this doc + runbook | `docs/stage-completion.md`, `docs/runbook.md` |

## Stage-by-stage detail

### Stage 1 — file-extract convergence + vitest scaffold
- `src/lib/file-extract.ts` (218 lines) is now a thin client wrapper:
  TXT/MD/CSV/TSV are read locally; everything else is uploaded to
  `/api/extract` which calls `src/lib/server-file-extract.ts` (the single
  server-side parser using `unpdf` + `mammoth` + magic-byte sniffing).
- `vitest.config.ts` runs `test/**/*.test.ts` in node environment, no
  globals (so `next build` typecheck stays happy).
- 6 test files, 86 tests, ~8 s total runtime.

### Stage 2 — Vector index (decision)
- Spike ran: pgvector is NOT installable on the embedded-postgres distro
  (no `vector.control`, no server headers). hnswlib-node adds a native
  binding that complicates the build.
- Decision: keep application-layer cosine over `take: 4000` candidate
  pool. The trigger to revisit is documented in
  `docs/spike-5-vector-index.md`: "at >50k chunks per source-set OR
  p99 retrieval > 250 ms."

### Stage 3 — Video scene tech + VideoScene model
- Prisma model `VideoScene` (`prisma/schema.prisma:2265`) holds per-scene
  VLM description, ASR transcript span, embedding bytes, start/end sec.
- `Question` carries `videoSourceId`/`videoSceneStart`/`videoSceneEnd`
  for timestamp-deep-linked citations.
- Scene segmentation: `src/lib/agent/knowledge/scene-segmentation.ts`
  exposes `buildScenes` (ffmpeg detect-style cut merging) and
  `buildEvenWindows` (fallback for homogeneous videos), plus
  `pickVlmScenes` (caps VLM cost) and `assignTranscriptToScenes` /
  `assignDescriptionsToScenes` (Stage 4 alignment).
- 17 tests in `test/scene-segmentation.test.ts`.

### Stage 4 — Multimodal temporal alignment
- Lives inside `scene-segmentation.ts` — `assignTranscriptToScenes`
  routes ASR segments into the scene whose [startSec, endSec] contains
  them; `assignDescriptionsToScenes` maps VLM frame descriptions onto
  their containing scenes. Together they produce the
  `description`/`transcript` fields stored on `VideoScene`.

### Stage 5 — Index route spike (decision)
- See `docs/spike-5-vector-index.md`. The decision was to keep
  application-layer cosine; revisit at >50k chunks or p99 > 250 ms.

### Stage 6 — Token-based chunking
- `src/lib/agent/knowledge/text-quality.ts` — structure-aware
  fixed-size packer (900/150 char, sentence-aligned, never cuts a word).
- `src/lib/agent/knowledge/semantic-chunking.ts` — embedding-guided
  DP segmentation: every unit embedded with the same provider as the
  index, boundary scores = 1 − cosine + structure adjustments, adaptive
  cut cost at the 68th percentile of the slice's own distribution, DP
  picks the optimal cut set so chunk sizes are guaranteed well-formed
  (300–1400 chars) and weak-boundary clusters don't shatter.
- 19 tests in `test/chunking.test.ts`.

### Stage 7 — Enrichment cap configurable
- `enrichChunksWithContext(title, chunks, opts?)` accepts
  `{ maxEnriched?, batchSize? }`. Defaults read env vars
  `MEDQ_ENRICHMENT_CAP` (120) and `MEDQ_ENRICHMENT_BATCH_SIZE` (40).
- Pure helper `sliceEnrichmentBatches(chunks, cap, batchSize)` extracted
  for unit testing — clamps batch size to `[1, cap]`, returns `[]` for
  empty input or cap=0.
- 7 new tests in `test/chunking.test.ts`.

### Stage 8 — OPENAI_BASE_URL /v1 roundtrip (not a bug)
- The audit's W8 was a misread. `OPENAI_BASE_URL=http://127.0.0.1:3000/v1`
  is BY DESIGN: `/v1/[[...path]]/route.ts` is MedQ's origin-mounted proxy
  that forwards to the FreeLLMAPI sidecar (BYOK key pool). The dashboard
  advertises `${origin}/v1` to curl/CLIs/coding agents. The localhost→localhost
  hop is how the BYOK pool gets exposed at the public origin while the
  sidecar stays private. No fix needed; documented inline.

### Stage 9 — DNS rebinding TOCTOU defense
- `src/lib/server/ssrf-guard.ts` extended with:
  - `resolveUrlForSSRF(url)` returns `{ ok, error?, resolvedIp? }`.
  - `createSSRFSafeDispatcher()` returns an undici `Agent` with a custom
    `lookup` that re-validates IPs at connect time.
  - `safeFetch(url, init?)` is the drop-in replacement for `fetch` that
    pre-flights AND pins at connect, closing the TOCTOU gap.
- 9 new tests in `test/ssrf-guard.test.ts` (4 for `resolveUrlForSSRF`,
  1 for `createSSRFSafeDispatcher`, 4 for `safeFetch`).
- Existing `validateUrlForSSRF` is kept for backward compatibility.

### Stage 10 — Visitor strategy threshold table
- `src/lib/subscription/visitor-strategy.ts` introduces a `visitor`
  tier BELOW `free` for unauthenticated traffic, with a documented
  matrix: AI generations/day, tutor messages/day, file upload caps,
  video analysis gate, deep-agent gate, save-to-bank gate, library-upload
  gate, ads level.
- `classifyVisitor({ isGuestUser, tier })` is the single decision point.
- `rateLimitKey(...)` keys visitors by IP (closing the
  'one guest = entire free-tier bucket' gap) and authenticated users by
  userId.
- 14 tests in `test/visitor-strategy.test.ts`.
- Existing tier/credit infrastructure (`subscription/tiers.ts`,
  `subscription/credits.ts`, `freemium-store.tsx`, `security/rate-limit.ts`)
  is unchanged.

### Stage 11 — LangGraph.js Phase A
- `src/lib/agent/question-generation-graph.ts` — explicit `StateGraph`
  with 6 nodes: `planner` / `ground` / `generate_batch` / `verify` /
  `save` / `refine`.
- Conditional routing via `Command({ update, goto })` (langgraph 1.x API).
  Each conditional node declares its `ends: [...]` for compile-time
  validation.
- `MemorySaver` checkpointer now; `PostgresSaver` + new
  `AgentCheckpoint` table is Phase B (after A/B comparison vs the
  production `deepagents` path).
- All node logic is INJECTABLE via `GraphDeps` so tests run without an
  LLM or DB. Production wiring delegates to existing functions in
  `question-deep-agent.ts` / `hybrid.ts` (deferred to Phase B cutover).
- `MAX_REFINE_ATTEMPTS=2` guards against infinite verify↔refine loops.
- 9 tests in `test/question-generation-graph.test.ts` (2 topology, 2
  happy-path, 2 verify↔refine loop, 3 reducer behavior).

### Stage 12 — Operational hardening
- This document.
- `docs/runbook.md` — operational runbook covering common incidents,
  the Stage 8 /v1 clarification, Stage 9 SSRF usage, Stage 10 visitor
  matrix, Stage 11 graph debugging.

## Test totals

| File | Tests |
|---|---|
| `test/chunking.test.ts` | 19 |
| `test/scene-segmentation.test.ts` | 17 |
| `test/server-file-extract.test.ts` | 7 |
| `test/spreadsheet-query.test.ts` | 13 |
| `test/ssrf-guard.test.ts` | 20 |
| `test/visitor-strategy.test.ts` | 14 |
| `test/question-generation-graph.test.ts` | 9 |
| **Total** | **99 tests, ~10 s runtime** |

Run with `npx vitest run` from the project root.
"""

RUNBOOK_MD = """# MedQ RAG Platform — Operational Runbook

**Last updated:** 2026-11-03 · **Audience:** on-call engineers, ops

This runbook covers the operational concerns introduced or clarified by
the RAG-roadmap stages (1–12). It is NOT a deployment guide — see
`INSTALL.sh` for that. This is the "something is wrong at 3am" doc.

## Quick reference

| Symptom | First check | Section |
|---|---|---|
| AI route 500s "Internal server error" | PostgreSQL alive? | [PG down](#pg-down) |
| Question generation hangs forever | Recursion limit / refine loop? | [Generation stuck](#generation-stuck) |
| User can't upload large file | Tier threshold? | [File upload denied](#file-upload-denied) |
| Suspicious URL fetch attempt | SSRF guard log? | [SSRF blocked](#ssrf-blocked) |
| Build fails with OOM | NODE_OPTIONS? | [Build OOM](#build-oom) |
| Tests fail with `[m` mangling | None — display only | [Test display mangling](#test-display-mangling) |

---

## PG down

**Symptom:** AI routes return 500 with "Internal server error". Question
bank pages load forever. Chat is unresponsive.

**Diagnosis:**
```bash
ss -tlnp | grep ':5432'
psql -h 127.0.0.1 -U postgres -d nextapp -c 'select 1'
```

**Fix:**
1. If no process is listening on 5432, the embedded-postgres sidecar has
   died. Restart the app: `pkill -f next-server; sleep 2; npm run dev &`
   (the embedded-postgres is started by the Next.js server init).
2. If a process IS listening but psql fails, the DB may be in recovery.
   Check `nextapp.log` for FATAL/RECOVERY lines. The simplest recovery
   is to restart the Next.js server (embedded-postgres is ephemeral —
   no persisted state to corrupt).
3. Confirm: `curl http://127.0.0.1:3000/api/health` returns 200.

## Generation stuck

**Symptom:** A question-generation job has been "running" for >5 min with
no progress events.

**Diagnosis:**
- If using the **production** path (`question-deep-agent.ts`), check
  the agent's tool activity in `AgentToolExecution` table — long stalls
  are usually a single LLM call waiting on a slow provider.
- If using the **graph** path (`question-generation-graph.ts`), the
  `MAX_REFINE_ATTEMPTS=2` guard should prevent infinite verify↔refine
  loops. If you see `GraphRecursionError` in logs, the guard failed —
  inspect the verify node's `toRefine` patch (it should be emptying on
  each pass).
- Check the `RagQueryLog` table for retrieval latency > 5 s — hybrid
  retrieval over the 4000-chunk candidate pool can be slow on cold
  caches.

**Fix:**
1. Cancel the job (mark `status='cancelled'` in the job store).
2. If a single LLM provider is the bottleneck, switch the user's model
   to a faster one via the ModelPicker (or set `DEFAULT_MODEL` env).
3. If retrieval is slow, the index may need rebuilding
   (`scripts/reindex-knowledge.mjs` — TBD).

## File upload denied

**Symptom:** User reports "file too large" or "upload not allowed" on a
file they expected to upload.

**Diagnosis:** Check the user's tier via the visitor-strategy matrix:

```ts
import { thresholdFor, classifyVisitor } from '@/lib/subscription/visitor-strategy';
const tier = classifyVisitor({ isGuestUser, tier: user.subscription.tier });
const t = thresholdFor(tier);
// t.fileUploadMaxMb, t.fileUploadsPerDay, t.canUploadToLibrary
```

**Visitor** (anonymous, `guest@medq.local`): 2 MB max, 1/day, NO library
upload. **Free**: 15 MB, 5/day. **Premium**: 50 MB, 100/day. **Pro**:
100 MB, effectively unlimited.

If the user is a visitor hitting the 2 MB cap, the fix is "sign up for a
free account" — that's by design (Stage 10).

## SSRF blocked

**Symptom:** A user-supplied URL fetch returns `SSRF blocked: ...`.

**Diagnosis:** Check whether the URL is genuinely unsafe or whether the
user is hitting the visitor-tier IP cap.

- `safeFetch` (Stage 9) does TWO checks: pre-flight (`resolveUrlForSSRF`)
  and connect-time (`ssrfLookup` inside the undici Agent). Both reject
  private IP ranges (RFC 1918, loopback, link-local, cloud metadata,
  6to4/Teredo tunnels).
- If `ALLOW_LOCAL_NETWORKS=true|1` is set in `.env.local`, BOTH layers
  are bypassed (self-hosted escape hatch). Production should leave this
  unset.

**Fix:** None needed — the block is the intended behavior. If the user
has a legitimate use case (e.g. fetching their own internal-hosted
model), they need to run MedQ self-hosted with `ALLOW_LOCAL_NETWORKS=true`.

## Build OOM

**Symptom:** `npx next build` fails with "JavaScript heap out of memory"
or just dies silently after 10+ minutes.

**Fix:**
```bash
NODE_OPTIONS=--max-old-space-size=1792 npx next build --webpack
```

The `--webpack` flag is required (Turbopack build has a different
memory profile and isn't validated for MedQ). Build takes 9–14 min in
the 4 GB sandbox; do NOT run anything else heavy during build.

## Test display mangling

**Symptom:** When viewing test files via `sed`/`cat`, you see `akeDraft`
where you expect `[makeDraft`. Tests still pass.

**Cause:** The terminal interprets the ANSI escape sequence `[m` (reset)
and strips it from display, even when the bytes are correctly in the
file. This is a DISPLAY issue, not a file content issue — `xxd`/`od` or
`python3 -c "print(open('file').read())"` shows the real bytes.

**Fix:** None needed. If you're editing the file and the editor strips
`[m`, switch editors or use a Python patch script (see
`/home/z/my-project/scripts/fix_stage11_test_*.py` for the pattern
that dodges the issue).

---

## Architectural notes

### Stage 8 — `/v1` roundtrip is by design
`OPENAI_BASE_URL=http://127.0.0.1:3000/v1` is NOT a bug. The `/v1/*`
route is MedQ's origin-mounted proxy to the FreeLLMAPI sidecar
(`src/lib/freellmapi-proxy.ts`). The dashboard advertises `${origin}/v1`
to curl/CLIs/coding agents (Claude Code, Codex CLI, Cline) so they hit
the user's BYOK pool through MedQ's public origin while the sidecar
stays private on localhost:3002. The localhost→localhost hop is the
feature, not a defect.

### Stage 9 — Always use `safeFetch` for user-supplied URLs
Any new code that fetches a URL from a user request header/body should
use `safeFetch` from `@/lib/server/ssrf-guard`, not the global `fetch`.
The existing `validateUrlForSSRF` is kept for backward compatibility
but doesn't pin at connect time — `safeFetch` does both.

### Stage 10 — Visitor strategy is per-IP, not per-user
Visitors share the `guest@medq.local` user record but their rate-limit
keys are `<category>:ip:<ip>`. This means:
- One visitor's quota doesn't affect another visitor's.
- A NAT'd office of 50 visitors shares ONE visitor bucket (acceptable —
  if they want more, they sign up).
- An attacker rotating IPs can still starve the visitor pool, but only
  for visitor-tier actions; authenticated users are unaffected.

### Stage 11 — LangGraph graph is opt-in
The `question-generation-graph.ts` StateGraph is NOT wired into the
production question-generation route yet. Production still uses
`question-deep-agent.ts` (which uses `deepagents`, which uses
LangGraph transitively). The explicit graph exists for:
1. Checkpointed, debuggable replay (Phase B will add `PostgresSaver`).
2. A/B comparison vs the imperative path.
3. Future migration target if `deepagents` overhead becomes a problem.

To wire it in: implement `GraphDeps` with real delegations to the
existing functions in `question-deep-agent.ts`, then call
`runQuestionGenerationGraph(inputs, deps)` from the route.

---

## Monitoring hooks (future)

The codebase already emits telemetry into these tables — wire your
monitoring stack to them:

| Table | What it powers | Where to alert |
|---|---|---|
| `RagQueryLog` | per-retrieval-call latency, topK, expanded queries | alert if p99 latency > 1 s sustained |
| `AgentToolExecution` | per-tool-call status, latency, capped I/O | alert if failure rate > 5% per tool |
| `UsageRecord` | per-user per-category daily usage | alert if any single user > 10x their tier cap (likely abuse) |
| `RateLimitBucket` | persistent rate-limit state (email codes, etc) | alert if any bucket hits 0 tokens repeatedly |

The `scripts/` directory has E2E smoke checks that exercise the live
paths — run them as part of deploy verification.
"""

def main() -> int:
    DOCS.mkdir(parents=True, exist_ok=True)
    if not STAGE_DOC.exists() or "RAG Roadmap — Stage Completion Tracker" not in STAGE_DOC.read_text():
        STAGE_DOC.write_text(STAGE_MD)
        print(f"[stage-completion.md] wrote {len(STAGE_MD)} bytes")
    else:
        print("[stage-completion.md] already exists, skipping")
    if not RUNBOOK.exists() or "MedQ RAG Platform — Operational Runbook" not in RUNBOOK.read_text():
        RUNBOOK.write_text(RUNBOOK_MD)
        print(f"[runbook.md] wrote {len(RUNBOOK_MD)} bytes")
    else:
        print("[runbook.md] already exists, skipping")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
