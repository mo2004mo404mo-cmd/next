#!/bin/bash
# OPTIONAL standalone mode for the freellmapi AI Router (debugging only).
#
# Since 2026-10-21 (#MEDQ-embedded) the router runs INSIDE the Next.js
# process and boots with the app — you do NOT need this script for normal
# operation. Run it only to isolate a router problem from the app: it serves
# the same Express app on 127.0.0.1:3002, and the app's upstream resolver
# automatically falls back to it when no embedded router is running (an
# explicit FREELLMAPI_UPSTREAM env var overrides both).
#
# SQLite DB lives at freellmapi/server/data/freeapi.db (persists keys,
# model catalog, analytics). Catalog syncs from freellmapi.co twice daily.
# NOTE: never run standalone + embedded at the same time — two instances
# would double the background services against the same SQLite DB.
set -uo pipefail
cd /home/z/my-project/freellmapi

mkdir -p server/data

# Idempotent: kill a previous instance first.
# NOTE: matching by command line is unreliable — under setsid the process shows
# as bare "node server/dist/index.js" (cwd-relative), so the old full-path
# pattern missed it and the freshly built dist was never loaded (the port
# stayed bound by the stale process and /livez answered from the OLD code).
# Kill by the PID that actually owns :3002, falling back to pattern matches.
OLD_PID=$(ss -tlnp 2>/dev/null | awk '/:3002 /{print $NF}' | grep -oP 'pid=\K[0-9]+' | head -1)
if [ -n "${OLD_PID}" ]; then
  kill "${OLD_PID}" 2>/dev/null
  sleep 1
fi
pkill -f "freellmapi/server/dist/index.js" 2>/dev/null
pkill -f "node server/dist/index.js" 2>/dev/null
sleep 1

( setsid env \
    NODE_ENV=production \
    PORT=3002 \
    HOST=127.0.0.1 \
    FREELLMAPI_INSTALL_METHOD=selfhost \
    node server/dist/index.js \
    > server/data/freellmapi.log 2>&1 & )

# Wait for readiness.
for i in $(seq 1 30); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://127.0.0.1:3002/livez 2>/dev/null)
  if [ "$code" = "200" ]; then echo "freellmapi sidecar up (HTTP $code)"; exit 0; fi
  sleep 2
done
echo "WARN: freellmapi sidecar did not answer /livez in 60s — check server/data/freellmapi.log"
exit 1
