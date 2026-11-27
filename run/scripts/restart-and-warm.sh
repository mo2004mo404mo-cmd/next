#!/bin/bash
# Restart dev server + sequential warmup with memory monitoring (runbook pattern v2)
set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

echo "[1/3] killing any existing dev server..."
pkill -f "next dev -p 3000" 2>/dev/null
pkill -f "next-server" 2>/dev/null
pkill -f "bun run dev" 2>/dev/null
pkill -f "dev/build/postcss" 2>/dev/null
sleep 3

echo "[2/3] launching dev.sh detached (setsid orphan pattern)..."
( setsid bash -c 'bash .zscripts/dev.sh > .zscripts/dev.log 2>&1' & )

for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then echo "  server up (HTTP $code) after ~$((i*2))s"; break; fi
  sleep 2
done

echo "[3/3] sequential warmup (no parallel clients; one compile at a time)..."
warm() {
  local route="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 150 "http://127.0.0.1:3000$route")
  local rss
  rss=$(ps -o rss= -C node --no-headers 2>/dev/null | awk '{s+=$1} END {printf "%.0f", s/1024}')
  echo "  $code  $route  (node RSS ~${rss}MB)"
  sleep 3
}
for r in / /api/auth/session /api/questions?limit=5 /api/dashboard /api/achievements \
         /api/subscription "/api/ads/campaigns?placement=dashboard_top" /api/review-hub \
         "/api/streaks?range=365" /bank /messages /flashcards /generate; do
  warm "$r"
done
echo "--- final memory ---"
free -m | head -2
echo "WARMUP COMPLETE"
