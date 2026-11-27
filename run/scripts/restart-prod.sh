#!/bin/bash
# Restart the MedQ PRODUCTION server (port 3000).
#
# Background: the 4GB box repeatedly OOM-killed the dev server (next-server
# settles at ~3.2GB RSS after compiling the root SPA — right at the kernel's
# kill line). Since 2026-10-08 the app is served from a production build
# (~430MB steady RSS, 6ms responses). Use this script after a crash/reboot;
# use build-prod.sh after changing source code.
#
# Portable: resolves the project root from this script's location.
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$APP_ROOT"
mkdir -p tmp

# Stop anything on port 3000 (prod server or a leftover dev server).
pkill -f "next start -p 3000" 2>/dev/null
pkill -f "next dev -p 3000" 2>/dev/null
pkill -f "next-server" 2>/dev/null
sleep 3

if [ ! -f .next/BUILD_ID ]; then
  echo "ERROR: no production build found (.next/BUILD_ID missing)."
  echo "Run scripts/build-prod.sh first."
  exit 1
fi

( setsid bash -c 'node_modules/.bin/next start -p 3000 > tmp/prod-server.log 2>&1' & )

for i in $(seq 1 10); do
  # -L: "/" 307-redirects to /home (auth middleware); follow it to get the real 200.
  code=$(curl -sL -o /dev/null -w "%{http_code}" --max-time 10 http://127.0.0.1:3000/ 2>/dev/null)
  if [ "$code" = "200" ]; then
    echo "production server up (probe #$i, HTTP 200)"
    free -m | head -2
    exit 0
  fi
  echo "probe #$i -> $code, waiting 5s..."
  sleep 5
done
echo "WARN: server did not answer; check tmp/prod-server.log"
exit 1
