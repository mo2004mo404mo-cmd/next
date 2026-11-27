#!/bin/bash
# E2E test: search_medical_references must return REAL references via the ZAI
# gateway fallback (fix: resolveWebSearchApiKey single-arg overload bug leaked
# the literal providerId 'tavily' in as the API key -> Bearer tavily -> 401 on
# every search; the deep agent's copy had no ZAI fallback either).
#
# Flow: login -> chat SSE "generate 1 MCQ ... with an image and save it"
# -> assert no 401/Unauthorized text anywhere in the stream, search tool calls
# complete, illustration generated, question saved WITH imageUrl.
set -uo pipefail

BASE="http://localhost:3000"
JAR="/home/z/my-project/tmp/search-fix-e2e-cookies.txt"
RAW="/home/z/my-project/tmp/search-fix-e2e-stream.txt"
mkdir -p /home/z/my-project/tmp
rm -f "$JAR" "$RAW"

echo "── 1. Login as student@medq.com ──"
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | sed 's/.*"csrfToken":"\([^"]*\)".*/\1/')
curl -s -o /dev/null -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/dashboard"
curl -s -b "$JAR" "$BASE/api/auth/session" | head -c 60; echo

echo ""
echo "── 2. Chat request: generate 1 MCQ about acromegaly with an image ──"
START_TS=$(date +%s)
curl -sN -b "$JAR" --max-time 420 \
  -X POST "$BASE/api/agent/chat/v2" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d '{"message":"generate 1 easy MCQ about acromegaly with an image and save it","history":[],"currentTab":"bank"}' \
  > "$RAW" &
CURL_PID=$!

# Live progress view while capturing the raw stream
tail -f "$RAW" 2>/dev/null | while IFS= read -r line; do
  TS=$(( $(date +%s) - START_TS ))
  case "$line" in
    "event: tool.call"*|"event: generation.tool.call"*|"data: generation.saved"*|"event: subagent"*|"event: done"*|"event: error"*)
      echo "[${TS}s] $line" | head -c 300; echo;;
  esac
done &
TAIL_PID=$!

wait $CURL_PID
kill $TAIL_PID 2>/dev/null

echo ""
echo "── 3. Stream analysis ──"
echo "inner generation.tool.call events        : $(grep -c 'event: generation.tool.call' "$RAW")"
echo "search_medical_references (inner+outer)  : $(grep -c 'search_medical_references' "$RAW")"
echo "401 / Unauthorized text in stream        : $(grep -ciE '401|unauthorized' "$RAW")  (MUST be 0)"
echo "generate_medical_illustration calls      : $(grep -c 'generate_medical_illustration' "$RAW")"
echo "generation.saved events (inner saves)    : $(grep -c 'generation.saved' "$RAW")"
echo "save_question calls (outer fallback)     : $(grep -c '"toolName":"save_question"' "$RAW")"
echo "done event                               : $(grep -c 'event: done' "$RAW")"
echo "error events                             : $(grep -c 'event: error' "$RAW")"
echo "429 rate-limit hits                      : $(grep -ciE '429|too many requests' "$RAW")"
echo ""
echo "── 4. DB check: acromegaly question with imageUrl? ──"
cat > /home/z/my-project/tmp/check-acromegaly.ts << 'EOF'
import { SQL } from 'bun';
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const qs = await db`SELECT id, topic, difficulty, "imageUrl", LEFT(text, 70) as preview, "createdAt" FROM "Question" WHERE topic ILIKE '%acromegaly%' ORDER BY "createdAt" DESC LIMIT 2`;
if (qs.length === 0) { console.log('NO acromegaly question saved'); }
for (const q of qs) console.log(new Date(q.createdAt).toISOString(), '|', q.topic, '|', q.difficulty, '| img:', (q.imageUrl && q.imageUrl.length > 0) ? q.imageUrl : 'NONE', '|', q.preview.replace(/\n/g, ' '));
db.close();
EOF
bun run /home/z/my-project/tmp/check-acromegaly.ts
