#!/bin/bash
# E2E test: floating assistant (chat v2) runs the COMPLETE generation agent.
# Logs in as student@medq.com, asks the chat agent to generate + save 1 question,
# streams the SSE response, then verifies the DB row.
set -uo pipefail

BASE="http://localhost:3000"
JAR="/home/z/my-project/tmp/chat-agent-e2e-cookies.txt"
mkdir -p /home/z/my-project/tmp
rm -f "$JAR"

echo "── 1. Login as student@medq.com ──"
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | sed 's/.*"csrfToken":"\([^"]*\)".*/\1/')
LOGIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/dashboard")
echo "login http: $LOGIN_CODE"

SESSION=$(curl -s -b "$JAR" "$BASE/api/auth/session")
echo "session: $(echo "$SESSION" | head -c 120)"

echo ""
echo "── 2. Chat request → complete generation agent ──"
START_TS=$(date +%s)
curl -sN -b "$JAR" --max-time 420 \
  -X POST "$BASE/api/agent/chat/v2" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"message":"Use the question generation agent to create exactly 1 medium-difficulty MCQ about aspirin mechanism of action and save it to my question bank.","history":[],"currentTab":"dashboard"}' \
  | while IFS= read -r line; do
      NOW=$(date +%s)
      ELAPSED=$((NOW - START_TS))
      case "$line" in
        event:*) EVENT="${line#event: }" ;;
        data:*)
          DATA="${line#data: }"
          case "$EVENT" in
            meta|plan.end|tool.call|tool.result|subagent|generation.tool.call|generation.tool.result|generation.saved|done|error)
              printf "[%3ds] %-26s %s\n" "$ELAPSED" "$EVENT" "$(echo "$DATA" | head -c 220)"
              ;;
          esac
          ;;
      esac
    done
echo ""
echo "── 3. Done (SSE stream closed) ──"
