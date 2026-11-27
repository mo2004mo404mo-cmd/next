#!/bin/bash
# revive-dev.sh — one-command recovery for the 4GB sandbox.
#
# Recovers from the two recurring failure modes:
#   1. Sandbox recycled → embedded PG + dev server both dead (cold start)
#   2. Dev server OOM-killed under concurrent route compiles → PG alive,
#      Next dead, .next/dev cache possibly corrupted mid-compile
#
# Safe to run repeatedly (idempotent). Warms ONE route at a time so the
# root SPA compile doesn't race other compiles for the 4GB budget.
set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

echo "[1/5] starting embedded PostgreSQL (if down)..."
PG_UP=false
if ss -lntp 2>/dev/null | grep -q ':5432'; then
  echo "  postgres already listening on :5432"
  PG_UP=true
else
  if bash scripts/setup-postgres.sh >/dev/null 2>&1; then
    echo "  postgres started"
    PG_UP=true
  else
    echo "  ERROR: postgres failed to start"; exit 1
  fi
fi

echo "[2/5] killing any zombie next processes..."
pkill -f "next dev -p 3000" 2>/dev/null
pkill -f "next-server" 2>/dev/null
pkill -f "next start -p 3000" 2>/dev/null
sleep 3

echo "[3/5] clearing stale dev cache + lock (corrupted by OOM mid-compile)..."
rm -f .next/lock 2>/dev/null
rm -rf .next/dev 2>/dev/null

echo "[4/5] launching dev server (detached, 2GB heap cap)..."
mkdir -p .zscripts
( setsid bash -c 'bash .zscripts/dev.sh > .zscripts/dev.log 2>&1' & )

READY=false
for i in $(seq 1 30); do
  if grep -q "Ready in" .zscripts/dev.log 2>/dev/null; then
    echo "  Ready after ~$((i*2))s"
    READY=true
    break
  fi
  sleep 2
done
if [ "$READY" != "true" ]; then
  echo "  ERROR: dev server did not report Ready — check .zscripts/dev.log"
  exit 1
fi

echo "[5/5] warming /api/auth/session (light, confirms DB→PostgreSQL)..."
code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 120 http://127.0.0.1:3000/api/auth/session 2>/dev/null)
if [ "$code" = "200" ]; then
  echo "  /api/auth/session → 200 (DB wired to PostgreSQL)"
else
  echo "  WARN: /api/auth/session → $code (first compile may need more time)"
fi

echo ""
echo "=== status ==="
ss -lntp 2>/dev/null | grep -E '5432|3000' | sed 's/^/  /'
free -m | head -2 | sed 's/^/  /'
echo "recovery complete — server is live on :3000"
