#!/bin/bash
# Embedded PostgreSQL 17.5 setup for MedQ (user-space, no root required)
# Starts postgres on 127.0.0.1:5432 with user postgres/postgres, db nextapp.
#
# Portable: resolves the project root from this script's location, so the
# zip can be extracted anywhere and the script still finds .pg-embed/.
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PG_NATIVE="$APP_ROOT/.pg-embed/node_modules/@embedded-postgres/linux-x64/native"
PGDATA="$APP_ROOT/.pg-embed/data"
PGLOG="$APP_ROOT/.pg-embed/postgres.log"
export LD_LIBRARY_PATH="$PG_NATIVE/lib"

cd "$PG_NATIVE"

# 1. Init cluster if missing
if [ ! -f "$PGDATA/PG_VERSION" ]; then
  echo "[pg] initializing cluster at $PGDATA"
  ./bin/initdb -D "$PGDATA" -U postgres -A trust -E UTF8 --locale=C >/dev/null
  # Listen on localhost only
  cat >> "$PGDATA/postgresql.conf" <<EOF
listen_addresses = '127.0.0.1'
port = 5432
max_connections = 200
shared_buffers = 256MB
EOF
  echo "[pg] cluster initialized"
fi

# 2. Start if not running
if ./bin/pg_ctl -D "$PGDATA" status >/dev/null 2>&1; then
  echo "[pg] postgres already running"
else
  echo "[pg] starting postgres..."
  ./bin/pg_ctl -D "$PGDATA" -l "$PGLOG" -w -t 60 start
fi

# 3. Create nextapp database if missing (no psql in bundle -> use bun + pg)
cat > "$SCRIPT_DIR/create-db.mjs" <<'EOF'
import pg from 'pg';
const client = new pg.Client({ host: '127.0.0.1', port: 5432, user: 'postgres', password: 'postgres', database: 'postgres' });
await client.connect();
const res = await client.query("SELECT 1 FROM pg_database WHERE datname = 'nextapp'");
if (res.rowCount === 0) {
  await client.query('CREATE DATABASE nextapp');
  console.log('[pg] database nextapp created');
} else {
  console.log('[pg] database nextapp already exists');
}
await client.end();
EOF
cd "$APP_ROOT/.pg-embed" && bun add pg@8.16.3 >/dev/null 2>&1
bun "$SCRIPT_DIR/create-db.mjs"

echo "[pg] ready: postgresql://postgres:postgres@127.0.0.1:5432/nextapp"
