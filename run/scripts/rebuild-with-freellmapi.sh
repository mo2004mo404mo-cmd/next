#!/bin/bash
# RAM-safe production rebuild for the 4GB sandbox (runbook pattern from
# next.config.ts comments): stop the RAM-heavy residents first, build with
# webpack + 1792MB heap cap (minify & cache already disabled in next.config),
# then restart next and warm the critical routes serially (never parallel —
# parallel clients OOM'd this box before).
#
# NOTE (#MEDQ-embedded, 2026-10-21): the freellmapi AI Router is EMBEDDED in
# the Next.js process — no separate sidecar restart step any more (starting
# one would double-boot the router against the same SQLite DB).
set -uo pipefail
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"

log() { echo "[$(date +%H:%M:%S)] $*"; }

log "[1/5] stopping residents (next-server, any standalone sidecar leftover, agent-browser + its chrome children)..."
pkill -f "next-server" 2>/dev/null
pkill -f "npm exec next start" 2>/dev/null
pkill -f "freellmapi/server/dist/index.js" 2>/dev/null
pkill -f "node server/dist/index.js" 2>/dev/null
pkill -f "agent-browser" 2>/dev/null
# agent-browser's chrome children have their own cmdline — kill them too or
# they hold ~1.2GB RAM and the build's static-gen worker OOMs (observed:
# next-server worker at 3.1GB anon-rss killed by kernel mid static-gen).
pkill -f "agent-browser-chrome" 2>/dev/null
pkill -f "/.agent-browser/browsers/" 2>/dev/null
sleep 3

log "[2/5] starting memory monitor (every 10s → /tmp/build-mem.log)..."
( while true; do
    free -m | awk '/^Mem:/{printf "%s used=%s avail=%s\n", strftime("%H:%M:%S"), $3, $7}'
    ps -eo rss=,comm= --sort=-rss | head -3 | awk '{printf "    top-rss: %sMB %s\n", int($1/1024), $2}'
    sleep 10
  done > /tmp/build-mem.log 2>&1 ) &
MON_PID=$!

log "[3/5] next build --webpack (NODE_OPTIONS=--max-old-space-size=1792)..."
BUILD_RC=0
NODE_OPTIONS='--max-old-space-size=1792' npx next build --webpack 2>&1 | tee /tmp/next-build.log | tail -40
BUILD_RC=${PIPESTATUS[0]}

kill $MON_PID 2>/dev/null

if [ "$BUILD_RC" != "0" ]; then
  log "BUILD FAILED (rc=$BUILD_RC) — tail of build log:"
  tail -25 /tmp/next-build.log
  log "restarting services anyway so the app stays up on the last good build..."
fi

log "[4/5] starting next start -p 3000 (detached)..."
# NOTE: invoke the local binary directly — under `npm exec` inside setsid,
# `-p` gets eaten by npm and next receives `3000` as a project directory.
( setsid bash -c './node_modules/.bin/next start -p 3000 > /tmp/next-start.log 2>&1' & )

for i in $(seq 1 60); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 3 http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then log "  next up (HTTP $code) after ~$((i*2))s"; break; fi
  sleep 2
done

log "[5/5] serial warmup of critical routes..."
warm() {
  local route="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 120 "http://127.0.0.1:3000$route")
  log "  $code  $route"
  sleep 3
}
warm /
warm /freellm
warm /freellmapi/livez
warm /freellmapi/

log "done. build rc=$BUILD_RC"
exit $BUILD_RC
