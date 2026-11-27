"""Stage 11 Phase B — PostgresSaver integration.

Creates:
  1. src/lib/agent/checkpoint-postgres.ts — factory that builds a
     PostgresSaver from DATABASE_URL, calls setup() once (idempotent),
     memoizes the singleton. Used by the LangGraph question-generation
     graph for production replay/debugging.
  2. Updates src/lib/agent/question-generation-graph.ts to accept an
     optional checkpointer override (default: MemorySaver; production:
     PostgresSaver via buildPostgresSaver()).
  3. Adds 3 tests to test/question-generation-graph.test.ts covering the
     checkpointer override path (with a stub checkpointer, no real DB).

The PostgresSaver creates its OWN tables (`checkpoints`, `writes`) via
setup() — these are NOT modeled in Prisma because the saver owns the
schema. A future migration can add `AgentCheckpoint` as a Prisma model if
we want queryable checkpoint metadata; for now, the saver's tables are
opaque checkpoint blobs.

Idempotent.
"""
from pathlib import Path
import re

PROJECT = Path("/tmp/my-project")
CHECKPOINT_FILE = PROJECT / "src/lib/agent/checkpoint-postgres.ts"
GRAPH_FILE = PROJECT / "src/lib/agent/question-generation-graph.ts"
TEST_FILE = PROJECT / "test/question-generation-graph.test.ts"

# ── 1. checkpoint-postgres.ts ──
CHECKPOINT_SRC = '''/**
 * checkpoint-postgres.ts — Stage 11 Phase B.
 *
 * Factory for a `PostgresSaver` checkpointer backed by the same embedded
 * PostgreSQL that Prisma uses (DATABASE_URL). The LangGraph
 * question-generation graph (and future graphs) pass this saver to
 * `.compile({ checkpointer })` so every node transition is persisted to
 * Postgres — enabling time-travel debugging and checkpoint replay across
 * server restarts.
 *
 * ── Schema ownership ──
 * PostgresSaver creates its own tables (`checkpoints`, `writes`) via
 * `saver.setup()`. These are NOT Prisma-modeled — the saver owns the
 * schema. A future migration can add an `AgentCheckpoint` Prisma model if
 * we want queryable metadata; for now the saver's tables are opaque
 * checkpoint blobs.
 *
 * ── Lifecycle ──
 * The Pool and Saver are singletons (memoized on first call). setup()
 * runs once per process; subsequent callers reuse the prepared saver.
 * On server shutdown, the Pool is closed via Node's beforeExit hook.
 */

import { Pool } from 'pg';
import { PostgresSaver } from '@langchain/langgraph-checkpoint-postgres';
import { type BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';
import { config as loadDotenv } from 'dotenv';

let _pool: Pool | null = null;
let _saver: PostgresSaver | null = null;
let _setupPromise: Promise<PostgresSaver> | null = null;

/**
 * Resolve the DATABASE_URL the same way src/lib/db.ts does: prefer the
 * .env.local value when the shell value isn't a postgres URL (the shell
 * sometimes inherits a stale SQLite `file:` URL from the fullstack-dev
 * template).
 */
function resolveConnectionString(): string {
  // Mirror src/lib/db.ts: load .env.local with override so the postgres
  // value wins over the stale shell `file:` URL.
  loadDotenv({ override: true });
  const { parsed } = loadDotenv({ path: '.env.local', override: true });
  const envUrl = process.env.DATABASE_URL;
  const fileUrl = parsed?.DATABASE_URL;
  const conn = envUrl && envUrl.startsWith('postgres') ? envUrl : fileUrl ?? envUrl;
  if (!conn) {
    throw new Error('DATABASE_URL is not defined — cannot build PostgresSaver');
  }
  return conn;
}

/**
 * Build (or return the memoized) PostgresSaver singleton.
 *
 *   - First call: creates a `pg.Pool` from DATABASE_URL, wraps it in a
 *     `PostgresSaver`, and runs `await saver.setup()` to create the
 *     `checkpoints` and `writes` tables if they don't exist.
 *   - Subsequent calls: return the same saver (setup is idempotent so
 *     even concurrent first calls are safe via the shared promise).
 *
 * Throws if DATABASE_URL is unset or the connection fails.
 */
export async function buildPostgresSaver(): Promise<BaseCheckpointSaver> {
  if (_saver) return _saver;
  if (_setupPromise) return _setupPromise;

  _setupPromise = (async () => {
    const conn = resolveConnectionString();
    _pool = new Pool({ connectionString: conn, max: 4 });
    const saver = new PostgresSaver(_pool);
    // setup() is idempotent — creates the tables if missing, no-op otherwise.
    // We MUST await this before the saver can be used.
    await saver.setup();
    _saver = saver;

    // Close the Pool on process exit so embedded-postgres shutdown is clean.
    process.once('beforeExit', () => {
      _pool?.end().catch(() => {});
    });

    return saver;
  })();

  return _setupPromise;
}

/**
 * Test-only: reset the singleton. Used by unit tests that need to inject
 * a stub Pool/Saver. NEVER call this from production code.
 */
export function __resetForTest(): void {
  _pool = null;
  _saver = null;
  _setupPromise = null;
}
'''

# ── 2. Update question-generation-graph.ts to accept checkpointer override ──
graph_src = GRAPH_FILE.read_text()

OLD_BUILD = """/** Build and compile the graph with a MemorySaver checkpointer.
 *  Phase B will accept a PostgresSaver here. */
export function buildQuestionGenerationGraph(deps: GraphDeps): CompiledStateGraph {
  const checkpointer = new MemorySaver();
  return buildQuestionGenerationGraphBlueprint(deps).compile({ checkpointer });
}"""

NEW_BUILD = """/** Build and compile the graph with a checkpointer.
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
): Promise<CompiledStateGraph> {
  const checkpointer = opts?.checkpointer
    ? await Promise.resolve(opts.checkpointer)
    : new MemorySaver();
  return buildQuestionGenerationGraphBlueprint(deps).compile({ checkpointer });
}"""

OLD_IMPORTS = """import {
  StateGraph,
  END,
  START,
  Annotation,
  Command,
  type CompiledStateGraph,
} from '@langchain/langgraph';
import { MemorySaver } from '@langchain/langgraph-checkpoint';"""

NEW_IMPORTS = """import {
  StateGraph,
  END,
  START,
  Annotation,
  Command,
  type CompiledStateGraph,
} from '@langchain/langgraph';
import { MemorySaver, type BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';"""

# Update runQuestionGenerationGraph to await the now-async buildQuestionGenerationGraph
OLD_RUN = """export async function runQuestionGenerationGraph(
  inputs: GraphInputs,
  deps: GraphDeps,
  opts?: { threadId?: string; maxIterations?: number },
): Promise<QuestionGenState> {
  const graph = buildQuestionGenerationGraph(deps);
  const threadId = opts?.threadId ?? `qg_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  const config = { configurable: { thread_id: threadId }, recursionLimit: opts?.maxIterations ?? 25 };
  const result = await graph.invoke({ ...inputs }, config);
  return result as QuestionGenState;
}"""

NEW_RUN = """export async function runQuestionGenerationGraph(
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
}"""

if "BaseCheckpointSaver" in graph_src and "opts?: { checkpointer?" in graph_src:
    print("[question-generation-graph.ts] already has checkpointer override, skipping")
else:
    new_src = graph_src
    if OLD_IMPORTS in new_src:
        new_src = new_src.replace(OLD_IMPORTS, NEW_IMPORTS, 1)
        print("[question-generation-graph.ts] updated imports to include BaseCheckpointSaver")
    if OLD_BUILD in new_src:
        new_src = new_src.replace(OLD_BUILD, NEW_BUILD, 1)
        print("[question-generation-graph.ts] made buildQuestionGenerationGraph async + checkpointer-aware")
    if OLD_RUN in new_src:
        new_src = new_src.replace(OLD_RUN, NEW_RUN, 1)
        print("[question-generation-graph.ts] updated runQuestionGenerationGraph to await build")
    else:
        # Try to find the existing runQuestionGenerationGraph (might have been edited)
        print("[question-generation-graph.ts] WARNING: OLD_RUN anchor not found")
    GRAPH_FILE.write_text(new_src)

# ── 3. Add Phase B tests ──
TEST_APPENDIX = '''

// ── Stage 11 Phase B: checkpointer override ────────────────────────────────

import { MemorySaver, type BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';

describe('buildQuestionGenerationGraph — checkpointer override (Phase B)', () => {
  it('accepts a sync BaseCheckpointSaver instance', async () => {
    const { buildQuestionGenerationGraph } = await import('@/lib/agent/question-generation-graph');
    const custom = new MemorySaver();
    const deps = happyPathDeps(3);
    const graph = await buildQuestionGenerationGraph(deps, { checkpointer: custom });
    expect(graph).toBeDefined();
    // Verify the graph still runs end-to-end.
    const result = await graph.invoke(
      { topic: 'X', system: 'Y', types: ['mcq'], difficulties: ['medium'], count: 2, knowledgeSourceIds: [], userId: 'u' },
      { configurable: { thread_id: 't_custom_sync' }, recursionLimit: 25 },
    );
    expect(result).toBeDefined();
  });

  it('accepts a Promise<BaseCheckpointSaver> (lazy-loaded saver)', async () => {
    const { buildQuestionGenerationGraph } = await import('@/lib/agent/question-generation-graph');
    // Simulate the production pattern: buildPostgresSaver() returns a Promise.
    const lazySaver = Promise.resolve(new MemorySaver() as BaseCheckpointSaver);
    const deps = happyPathDeps(2);
    const graph = await buildQuestionGenerationGraph(deps, { checkpointer: lazySaver });
    expect(graph).toBeDefined();
    const result = await graph.invoke(
      { topic: 'X', system: 'Y', types: ['mcq'], difficulties: ['medium'], count: 2, knowledgeSourceIds: [], userId: 'u' },
      { configurable: { thread_id: 't_custom_async' }, recursionLimit: 25 },
    );
    expect(result).toBeDefined();
  });

  it('runQuestionGenerationGraph accepts checkpointer override via opts', async () => {
    const { runQuestionGenerationGraph } = await import('@/lib/agent/question-generation-graph');
    const custom = new MemorySaver();
    const inputs = makeInputs(2);
    const deps = happyPathDeps(2);
    const final = await runQuestionGenerationGraph(inputs, deps, { checkpointer: custom });
    expect(final.savedIds.length).toBeGreaterThanOrEqual(2);
  });
})

import { describe as _describe2, it as _it2, expect as _expect2 } from 'vitest';
'''

# Actually let me rewrite the test appendix more carefully — the duplicate imports at the end are wrong.
# Let me fix the appendix.
TEST_APPENDIX_FIXED = '''

// ── Stage 11 Phase B: checkpointer override ────────────────────────────────

import { MemorySaver, type BaseCheckpointSaver } from '@langchain/langgraph-checkpoint';

describe('buildQuestionGenerationGraph — checkpointer override (Phase B)', () => {
  it('accepts a sync BaseCheckpointSaver instance', async () => {
    const custom = new MemorySaver();
    const deps = happyPathDeps(3);
    const graph = await buildQuestionGenerationGraph(deps, { checkpointer: custom });
    expect(graph).toBeDefined();
    // Verify the graph still runs end-to-end.
    const result = await graph.invoke(
      { topic: 'X', system: 'Y', types: ['mcq'], difficulties: ['medium'], count: 2, knowledgeSourceIds: [], userId: 'u' },
      { configurable: { thread_id: 't_custom_sync' }, recursionLimit: 25 },
    );
    expect(result).toBeDefined();
  });

  it('accepts a Promise<BaseCheckpointSaver> (lazy-loaded saver)', async () => {
    // Simulate the production pattern: buildPostgresSaver() returns a Promise.
    const lazySaver = Promise.resolve(new MemorySaver() as BaseCheckpointSaver);
    const deps = happyPathDeps(2);
    const graph = await buildQuestionGenerationGraph(deps, { checkpointer: lazySaver });
    expect(graph).toBeDefined();
    const result = await graph.invoke(
      { topic: 'X', system: 'Y', types: ['mcq'], difficulties: ['medium'], count: 2, knowledgeSourceIds: [], userId: 'u' },
      { configurable: { thread_id: 't_custom_async' }, recursionLimit: 25 },
    );
    expect(result).toBeDefined();
  });

  it('runQuestionGenerationGraph accepts checkpointer override via opts', async () => {
    const custom = new MemorySaver();
    const inputs = makeInputs(2);
    const deps = happyPathDeps(2);
    const final = await runQuestionGenerationGraph(inputs, deps, { checkpointer: custom });
    expect(final.savedIds.length).toBeGreaterThanOrEqual(2);
  });
});
'''

test_src = TEST_FILE.read_text()
if "Phase B: checkpointer override" in test_src:
    print("[question-generation-graph.test.ts] Phase B tests already present, skipping")
else:
    TEST_FILE.write_text(test_src.rstrip() + "\n" + TEST_APPENDIX_FIXED + "\n")
    print("[question-generation-graph.test.ts] appended Phase B tests")

# ── 4. Write checkpoint-postgres.ts ──
if not CHECKPOINT_FILE.exists():
    CHECKPOINT_FILE.write_text(CHECKPOINT_SRC)
    print(f"[checkpoint-postgres.ts] wrote {len(CHECKPOINT_SRC)} bytes")
else:
    existing = CHECKPOINT_FILE.read_text()
    if "buildPostgresSaver" in existing:
        print("[checkpoint-postgres.ts] already exists with buildPostgresSaver, skipping")
    else:
        CHECKPOINT_FILE.write_text(CHECKPOINT_SRC)
        print(f"[checkpoint-postgres.ts] overwrote {len(CHECKPOINT_SRC)} bytes")
