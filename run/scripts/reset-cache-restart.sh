#!/bin/bash
# Full dev server reset: clear potentially-corrupted Turbopack cache, restart, warm
set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

echo "[1/4] killing dev server..."
pkill -f "next dev -p 3000" 2>/dev/null
pkill -f "next-server" 2>/dev/null
pkill -f "bun run dev" 2>/dev/null
pkill -f "dev/build/postcss" 2>/dev/null
sleep 3

echo "[2/4] clearing .next cache (corruption from OOM kill mid-write)..."
rm -rf .next

echo "[3/4] relaunching dev.sh detached..."
( setsid bash -c 'bash .zscripts/dev.sh > .zscripts/dev.log 2>&1' & )

for i in $(seq 1 90); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then echo "  server up after ~$((i*2))s"; break; fi
  sleep 2
done

echo "[4/4] sequential warmup (one route at a time)..."
warm() {
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 180 "http://127.0.0.1:3000$1")
  echo "  $code  $1"
  sleep 3
}
for r in / /api/auth/session "/api/questions?page=1&limit=20" /api/bookmarks /bank; do
  warm "$r"
done
free -m | head -2
echo "RESET+WARMUP COMPLETE"
