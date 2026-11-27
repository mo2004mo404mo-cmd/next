#!/usr/bin/env bash
# MedQ — one-shot installer
#
# Runs the full bootstrap sequence:
#   1. Install MedQ Next.js dependencies (bun install)
#   2. Install FreeLLM API sidecar dependencies + better-sqlite3 native rebuild
#   3. Start embedded PostgreSQL (creates the cluster on first run)
#   4. Generate Prisma client + push schema to DB
#   5. (Optional) Restore the SQL data backup
#   6. Start the production server on port 3000
#
# Re-runnable: detects what's already done and skips it. Safe to re-run after
# a partial failure.
#
# Usage:
#   ./INSTALL.sh                # full install + start
#   ./INSTALL.sh --no-backup   # skip the 1.8GB SQL restore
#   ./INSTALL.sh --no-start     # install only, don't start the server
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

RESTORE_BACKUP=1
START_SERVER=1
for arg in "$@"; do
  case "$arg" in
    --no-backup) RESTORE_BACKUP=0 ;;
    --no-start)  START_SERVER=0 ;;
    -h|--help)
      grep -E '^#' "$0" | sed 's/^# \{0,1\}//'
      exit 0
      ;;
    *) echo "Unknown arg: $arg" >&2; exit 2 ;;
  esac
done

log()  { printf '\033[1;36m[%s]\033[0m %s\n' "$(date +%H:%M:%S)" "$*"; }
ok()   { printf '\033[1;32m[%s] OK\033[0m  %s\n' "$(date +%H:%M:%S)" "$*"; }
warn() { printf '\033[1;33m[%s] WARN\033[0m %s\n' "$(date +%H:%M:%S)" "$*" >&2; }
fail() { printf '\033[1;31m[%s] FAIL\033[0m %s\n' "$(date +%H:%M:%S)" "$*" >&2; exit 1; }

# Pre-flight: check for required tools
command -v bun   >/dev/null || fail "bun is required (install from https://bun.sh)"
command -v node  >/dev/null || fail "node is required (Node 20+)"
command -v npm   >/dev/null || fail "npm is required"

# ─────────────────────────────────────────────────────────────────────────────
log "Step 1/6 — Install MedQ Next.js dependencies (bun install)"
# ─────────────────────────────────────────────────────────────────────────────
if [ -d node_modules ] && [ -f node_modules/.bin/next ]; then
  ok "node_modules already present — skipping"
else
  bun install || fail "bun install failed"
  ok "MedQ dependencies installed"
fi

# ─────────────────────────────────────────────────────────────────────────────
log "Step 2/6 — Install FreeLLM API sidecar dependencies (npm install)"
# ─────────────────────────────────────────────────────────────────────────────
if [ -d freellmapi/node_modules/better-sqlite3 ] && \
   [ -d freellmapi/node_modules/compression ]; then
  ok "freellmapi node_modules already present — skipping"
else
  ( cd freellmapi && npm install --omit=optional ) || fail "freellmapi npm install failed"
  ok "freellmapi dependencies installed"
fi

# Better-sqlite3 native binding — needs to be rebuilt for the host Node version
if ! node -e "require('better-sqlite3')" 2>/dev/null; then
  log "  rebuilding better-sqlite3 native binding..."
  ( cd freellmapi && npm install better-sqlite3 && npm rebuild better-sqlite3 ) \
    || fail "better-sqlite3 rebuild failed"
  ok "better-sqlite3 native binding ready"
else
  ok "better-sqlite3 already loadable"
fi

# ICU library symlinks (only needed on hosts where libicui18n.so.60 isn't on the system path)
PG_LIB="$SCRIPT_DIR/.pg-embed/node_modules/@embedded-postgres/linux-x64/native/lib"
if [ -d "$PG_LIB" ] && [ ! -L "$PG_LIB/libicui18n.so.60" ] && [ -f "$PG_LIB/libicui18n.so.60.2" ]; then
  log "  creating ICU 60 library symlinks..."
  ln -sf libicudata.so.60.2 "$PG_LIB/libicudata.so.60"
  ln -sf libicui18n.so.60.2 "$PG_LIB/libicui18n.so.60"
  ln -sf libicuuc.so.60.2   "$PG_LIB/libicuuc.so.60"
  ok "ICU symlinks created"
fi

# ─────────────────────────────────────────────────────────────────────────────
log "Step 3/6 — Start embedded PostgreSQL (creates the cluster on first run)"
# ─────────────────────────────────────────────────────────────────────────────
bash scripts/setup-postgres.sh || fail "embedded PostgreSQL failed to start"
ok "PostgreSQL ready at postgresql://postgres:postgres@127.0.0.1:5432/nextapp"

# ─────────────────────────────────────────────────────────────────────────────
log "Step 4/6 — Generate Prisma client + push schema to DB"
# ─────────────────────────────────────────────────────────────────────────────
bunx prisma generate || fail "prisma generate failed"
bunx prisma db push  || fail "prisma db push failed"
ok "Prisma client generated; schema pushed"

# ─────────────────────────────────────────────────────────────────────────────
if [ "$RESTORE_BACKUP" = "1" ] && [ -f db/medq-backup-*.sql ]; then
  log "Step 5/6 — Restore the SQL data backup ($(ls -lh db/medq-backup-*.sql | awk '{print $5}'))"
  if command -v psql >/dev/null; then
    psql "postgresql://postgres:postgres@127.0.0.1:5432/nextapp" \
      -f $(ls db/medq-backup-*.sql | head -1) || warn "SQL restore failed (continuing — app still works with a fresh DB)"
    ok "SQL backup restored"
  else
    warn "psql not installed — skipping SQL restore (app still works with a fresh DB)"
  fi
else
  log "Step 5/6 — SQL backup restore skipped"
fi

# ─────────────────────────────────────────────────────────────────────────────
if [ "$START_SERVER" = "1" ]; then
  log "Step 6/6 — Build + start the production server on port 3000"
  if [ ! -f .next/BUILD_ID ]; then
    log "  no production build found — running scripts/build-prod.sh (~2 min on 4GB RAM)..."
    bash scripts/build-prod.sh || fail "production build failed"
  else
    ok ".next/BUILD_ID already present — skipping build"
  fi
  bash scripts/restart-prod.sh || fail "production server failed to start"
  ok "MedQ is live at http://localhost:3000"
  echo ""
  echo "  Dashboard (AI Router):  http://localhost:3000/freellmapi/"
  echo "  Short URL:              http://localhost:3000/freellm/"
  echo "  MedQ app:               http://localhost:3000/"
else
  log "Step 6/6 — server start skipped (--no-start)"
fi

echo ""
ok "Done. MedQ is ready."
