#!/bin/bash
# E2E verification for Task 51 (weak-topics wiring + generation fallback + heartbeat)
set -uo pipefail
BASE=http://127.0.0.1:3000
J=/home/z/my-project/tmp/e2e-t51-cookies.txt
rm -f "$J"

echo "── 1. Login (student@medq.com) ──"
rm -f "$J"
CSRF=$(curl -s -c "$J" "$BASE/api/auth/csrf" --max-time 10 | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$J" -c "$J" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null --max-time 15
SESSION=$(curl -s -b "$J" "$BASE/api/auth/session" --max-time 10)
EMAIL=$(echo "$SESSION" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("user",{}).get("email","NONE"))' 2>/dev/null || echo NONE)
echo "logged in as: $EMAIL"

echo
echo "── 2. DB-backed endpoints ──"
curl -s -b "$J" -o /dev/null -w "/api/questions: %{http_code}\n" "$BASE/api/questions?limit=3" --max-time 15
curl -s -b "$J" -o /dev/null -w "/api/agent/tasks: %{http_code}\n" "$BASE/api/agent/tasks" --max-time 15

echo
echo "── 3. Scheduled task state ──"
TASKS=$(curl -s -b "$J" "$BASE/api/agent/tasks" --max-time 15)
echo "$TASKS" | head -c 700
echo

echo
echo "── 4. Weakness analysis (feeds weakTopics) ──"
curl -s -b "$J" "$BASE/api/generate/weakness" --max-time 30 | head -c 500
echo
