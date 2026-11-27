#!/bin/bash
# MedQ — one-command resume (after a sandbox restart / process recycle)
#
# Usage: bash START.sh (from the project root, any path)
set -euo pipefail

APP_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$APP_ROOT"
mkdir -p "$APP_ROOT/tmp"

echo "[1/4] Starting embedded PostgreSQL..."
bash scripts/setup-postgres.sh

echo "[2/4] Ensuring Prisma client is generated..."
[ -d src/generated ] || bunx prisma generate

echo "[3/4] Starting the chat socket service on port 3004..."
if [ -f "$APP_ROOT/mini-services/chat-service/index.ts" ]; then
  pkill -f "chat-service/index.ts" 2>/dev/null || true
  setsid bash -c "cd $APP_ROOT/mini-services/chat-service && node index.ts > $APP_ROOT/tmp/chat-service.log 2>&1" &
  echo "  chat-service starting (pid $!)..."
  sleep 1
else
  echo "  WARNING: chat-service missing — calls will not signal."
fi

echo "[4/4] Starting the production server on port 3000..."
bash scripts/restart-prod.sh

echo ""
echo "MedQ is live:"
echo "  App:            http://localhost:3000/"
echo "  AI Router:      http://localhost:3000/freellmapi/  (or /freellm/)"
echo "  Chat service:   http://127.0.0.1:3004"
echo "  Demo accounts:  student@medq.com | educator@medq.com | admin@medq.com  (pw: test123)"
