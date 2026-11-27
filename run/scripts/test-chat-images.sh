#!/bin/bash
# E2E test: "generate questions WITH IMAGES" through the floating assistant.
# Verifies the media-honoring fix: the generation agent must call
# generate_medical_illustration and save questions with a REAL imageUrl
# (the observed bug: imageless saves for explicit image requests).
set -uo pipefail

BASE="http://localhost:3000"
JAR="/home/z/my-project/tmp/chat-images-e2e-cookies.txt"
mkdir -p /home/z/my-project/tmp
rm -f "$JAR"

echo "── 1. Login as student@medq.com ──"
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | sed 's/.*"csrfToken":"\([^"]*\)".*/\1/')
curl -s -o /dev/null -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/dashboard"

SESSION=$(curl -s -b "$JAR" "$BASE/api/auth/session" | head -c 80)
echo "session: $SESSION"

echo ""
echo "── 2. Chat request: generate 1 question about gigantism WITH an image ──"
START_TS=$(date +%s)
curl -sN -b "$JAR" --max-time 420 \
  -X POST "$BASE/api/agent/chat/v2" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"message":"generate 1 easy MCQ about gigantism with an image and save it","history":[],"currentTab":"bank"}' \
  | while IFS= read -r line; do
      TS=$(( $(date +%s) - START_TS ))
      case "$line" in
        "event: "*|"data: tool.call"*|"data: generation.tool.call"*|"data: generation.saved"*|"data: done"*|"data: error"*)
          echo "[${TS}s] $line" | head -c 400; echo;;
      esac
    done

echo ""
echo "── 3. DB check: gigantism question with imageUrl? ──"
bun run /home/z/my-project/scripts/check-gigantism.ts
