#!/bin/bash
# Patient dev-server restart: single spaced probes (no overlapping compiles).
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

pkill -f "next dev -p 3000" 2>/dev/null
pkill -f "next-server" 2>/dev/null
sleep 3

( setsid bash -c 'bash .zscripts/dev.sh > .zscripts/dev.log 2>&1' & )

# Probe every 25s with a long per-request timeout — never overlap compiles.
for i in $(seq 1 10); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 120 http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then
    echo "server up after probe #$i"
    break
  fi
  echo "probe #$i -> $code, waiting 25s..."
  sleep 25
done

# Settle: let turbopack flush, confirm process alive
sleep 10
if ps -p "$(cat .zscripts/dev.pid 2>/dev/null)" > /dev/null 2>&1; then
  echo "daemon alive (pid $(cat .zscripts/dev.pid))"
else
  echo "WARN: daemon process not found"
fi
free -m | head -2
