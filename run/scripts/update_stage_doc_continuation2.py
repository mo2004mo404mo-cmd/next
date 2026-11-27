"""Append continuation-2 section to docs/stage-completion.md covering the
production GraphDeps wiring, graph-runs API, zero-draft termination fix,
and httpFetch adapter migration.
"""
from pathlib import Path

DOC = Path("/tmp/my-project/docs/stage-completion.md")
src = DOC.read_text()

APPENDIX = """

---

## Continuation session 2 (2026-11-03, production wiring)

Stage 11 Phase C+D landed: the explicit StateGraph is now a REAL production
path, not a test-only skeleton.

### Production GraphDeps (`src/lib/agent/graph-deps.ts`, NEW)
`createProductionGraphDeps(opts)` implements all six nodes with real
delegations:
- **plan** — pure deterministic type×difficulty coverage plan + weak-topics
  + focus-hint lines (`buildPlanCoverage`, exported, no LLM).
- **ground** — `retrieveKnowledgeHybrid(userId, topic, { sourceIds, topK })`
  → `GroundingChunk[]` (chunk content carried into state via the new
  `grounding` channel) + `retrievedChunkIds`.
- **generate_batch** — `knowledgeLLM` with a JSON-array prompt grounded on
  the passages; robust JSON parse (`parseDraftsJson`); citation `[K#]` →
  (sourceId, chunkId) mapping from the grounding set; **offline fallback**
  (`buildOfflineDrafts`) builds deterministic short-answer drafts from the
  grounding content tagged `graph-offline` so the graph completes with zero
  LLM access; consumes (clears) the `feedback` channel.
- **verify** — deterministic validation (`validateDraft`: stem >= 20 chars,
  explanation >= 30, MCQ >= 2 options, answer matches an option, difficulty
  in the allowed list — the SAME rules as `save_question`) + stem-dedup
  against already-verified drafts; processes only NEW drafts via the
  `verifiedCount` offset channel.
- **save** — `db.question.create` per unsaved verified draft with the exact
  `save_question` field shape (isAIGenerated, reviewStatus 'pending',
  citations with title/excerpt, knowledgeSourceIds, sources, langgraph tag).
- **refine** — builds a feedback string from the flagged drafts for the
  next generate pass; clears `toRefine`.

### State extension (`question-generation-graph.ts`)
New channels (all additive, defaults preserve old behavior):
- `grounding: GroundingChunk[]` (replace-last)
- `feedback: string` (replace-last)
- `verifiedCount: number` (replace)
`DraftQuestion` extended with `mnemonic?/clinicalPearl?/topic?/tags?/
citations?`.

### Zero-draft termination guard (`question-generation-graph.ts`)
Fixed a REAL infinite-loop gap: when a `generate_batch` pass produces zero
drafts (empty library + offline fallback returns `[]`), the routing used to
spin `generate_batch → generate_batch` until the recursion limit. Now the
wrapper routes to `verify` (terminating the run) and records
`'generate_batch pass produced 0 drafts — terminating early'` on the
errors channel. Covered by a dedicated test.

### Graph-runs inspection API (`src/app/api/agent/graph-runs/route.ts`, NEW)
Time-travel debugging surface over the PostgresSaver's own tables (read via
the shared pool from `checkpoint-postgres.ts` — no Prisma models involved):
- `GET /api/agent/graph-runs` — recent threads (checkpoint count,
  first/last ts, node names).
- `GET ?threadId=<id>` — full checkpoint timeline: step, source, ts,
  checkpointId, and per-checkpoint writes (node, channel, decoded preview).
- Educator/admin gated (`User.role` check; visitors rejected).
- SQL verified live: the integration thread shows the full
  `__start__ → planner → ground → generate_batch → verify → save`
  timeline with per-node write previews.

### checkpoint-postgres.ts additions
- `getCheckpointPool()` — lazy shared pg Pool (no `setup()`).
- `checkpointQuery(sql, params)` — read-only query helper over the shared
  pool, used by the graph-runs API.

### httpFetch adapter migration (Stage 9 completion)
- `ssrf-guard.ts` gained `httpFetch(url, init)` — production-gated:
  `NODE_ENV=production` → `safeFetch` (pre-flight + connect-time DNS pin);
  dev → global `fetch` (localhost gateways keep working, mirroring the
  route-level gating).
- Swapped into the BYOK-exposed adapter sites:
  `openai-image-adapter.ts` (2 sites) and `tts-providers.ts`
  (openai-tts + lemonade-tts, 2 sites). Managed-provider adapters
  (seedream/qwen/kling/…) keep operator-pinned baseUrls on global fetch.

### Test totals (updated)
| File | Tests |
|---|---|
| `test/chunking.test.ts` | 19 |
| `test/scene-segmentation.test.ts` | 17 |
| `test/server-file-extract.test.ts` | 7 |
| `test/spreadsheet-query.test.ts` | 13 |
| `test/ssrf-guard.test.ts` | 20 |
| `test/visitor-strategy.test.ts` | 17 |
| `test/question-generation-graph.test.ts` | 13 (+1 zero-draft termination) |
| `test/graph-deps.test.ts` | 32 (NEW — pure fns + deps with mocked LLM/db) |
| `test/graph-production.integration.test.ts` | 1 (NEW — LIVE: real retrieval + real PostgresSaver + spied save) |
| **Total** | **139** |

(The live integration test ran a real end-to-end production graph:
hybrid retrieval `"clinical medicine" → 8/32 chunks (dense=32 bm25=32
expand=3 rerank=true, 19.4s)`, offline-fallback drafts, verification,
mocked save with the exact `save_question` field shape, and 7 PostgresSaver
checkpoint rows persisted for the thread.)

### Verification
- Full vitest suite: **140 tests, 9 files, all passing** (~46 s including
  the live DB integration).
- Targeted `tsc` over all new/modified files: 0 errors (13 pre-existing
  transitive errors in `src/lib/store/settings.ts` / `src/lib/ai/*` /
  `resolve-model.ts` are unchanged and covered by
  `next.config.ts:typescript.ignoreBuildErrors`).
- graph-runs SQL verified against the live embedded Postgres (list +
  detail queries, join fan-out fixed with `count(DISTINCT …)`).

### Patch scripts (continuation 2)
- `patch_graph_state_extension.py`
- `patch_graph_deps.py`
- `fix_zero_draft_termination.py`
- `patch_graph_runs_api.py`
- `patch_adapter_http_fetch.py`

### Remaining follow-ups
1. **Route cutover (opt-in)**: add a `useGraph=1` flag (or a staged
   rollout env `MEDQ_QGEN_ENGINE=graph`) to the question-generation entry
   route that swaps `runDeepAgentQuestionGeneration` for
   `runQuestionGenerationGraph(…, createProductionGraphDeps(),
   { checkpointer: buildPostgresSaver() })`, then A/B compare quality and
   latency against the deep-agent path on the same topics.
2. **Graph-runs admin UI**: a small `/admin/graph-runs` page rendering the
   inspection API (thread list → timeline → write previews).
3. **Full `next build --webpack`** on an 8GB+ host (the 4GB sandbox cannot
   finish the 9–14 min build within tool timeouts).
"""

if "Continuation session 2" in src:
    print("[stage-completion.md] continuation 2 already present, skipping")
else:
    DOC.write_text(src.rstrip() + "\n" + APPENDIX + "\n")
    print("[stage-completion.md] appended continuation session 2")
