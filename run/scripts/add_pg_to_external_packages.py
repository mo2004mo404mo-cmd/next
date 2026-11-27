"""Add pg + langgraph-checkpoint-postgres to serverExternalPackages.

The new PostgresSaver deps (pg, postgres-array, @langchain/langgraph-checkpoint-postgres)
are heavy CJS packages that bloat the webpack module graph and slow the
production build past the 9-min timeout. They're server-only — add them to
next.config.ts's serverExternalPackages list so webpack resolves them at
runtime via plain node_modules imports instead of bundling.

Idempotent.
"""
from pathlib import Path

CONFIG = Path("/tmp/my-project/next.config.ts")
src = CONFIG.read_text()

# The list ends with 'langchain' entry. Insert our new entries before the
# closing bracket of the serverExternalPackages array.
OLD = """    'langchain', // middleware catalog (todoList/retry/limits) — barrel has no
    // subpath exports and bundling the FULL langchain package OOM-kills the
    // 4GB-box build worker; dual-format (cjs+esm) so runtime require is safe.
  ],"""

NEW = """    'langchain', // middleware catalog (todoList/retry/limits) — barrel has no
    // subpath exports and bundling the FULL langchain package OOM-kills the
    // 4GB-box build worker; dual-format (cjs+esm) so runtime require is safe.
    // ── Stage 11 Phase B: PostgresSaver deps ──
    'pg', // node-postgres driver — CJS, heavy, only used by checkpoint-postgres.ts
    'postgres-array', // pg dep — CJS parser, no browser need
    '@langchain/langgraph-checkpoint-postgres', // PostgresSaver — server-only
  ],"""

if "Stage 11 Phase B: PostgresSaver deps" in src:
    print("[next.config.ts] already has Stage 11B entries, skipping")
else:
    if OLD in src:
        CONFIG.write_text(src.replace(OLD, NEW, 1))
        print("[next.config.ts] added pg + langgraph-checkpoint-postgres to serverExternalPackages")
    else:
        print("[next.config.ts] WARNING: anchor not found")
