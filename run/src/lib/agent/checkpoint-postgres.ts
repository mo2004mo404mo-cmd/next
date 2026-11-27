/**
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


// ── Inspection query helper (graph-runs API) ──────────────────────────────
//
// The PostgresSaver tables (`checkpoints`, `checkpoint_writes`) are NOT
// Prisma-modeled — the saver owns that schema. The graph-runs inspection
// API reads them through THIS module's shared pool so the API and the
// saver never open separate connection pools to the same database.

/**
 * Get (or lazily create) the shared checkpoint pg Pool. Does NOT run
 * setup() — use only when the tables are known to exist (i.e. after a
 * buildPostgresSaver() somewhere in the process, or for read-only
// inspection against a pre-existing schema).
 */
export function getCheckpointPool(): Pool {
  if (!_pool) {
    _pool = new Pool({ connectionString: resolveConnectionString(), max: 4 });
    process.once('beforeExit', () => {
      _pool?.end().catch(() => {});
    });
  }
  return _pool;
}

/**
 * Run a read-only query against the PostgresSaver's tables through the
 * shared pool. Returns the pg result rows.
 */
export async function checkpointQuery<T = Record<string, unknown>>(
  sql: string,
  params: unknown[] = [],
): Promise<T[]> {
  const pool = getCheckpointPool();
  const result = await pool.query(sql, params as never[]);
  return result.rows as T[];
}

