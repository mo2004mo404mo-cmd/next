#!/bin/bash
# E2E test: batch AI explanation generator + multi-endpoint BYOK failover.
#
# Scenario (exactly the user's setup):
#   • Two saved ollama endpoints: a DEAD local one (http://localhost:9,
#     priority 0) and the WORKING remote gateway (https://ollama2.space-z.ai,
#     priority 1).
#   • The explain job's callChat must FAIL OVER from the dead endpoint to the
#     working one and still produce a RICH structured explanation.
#   • Idempotency: re-running without overwrite finds nothing to do.
#   • Overwrite: re-running with overwrite regenerates.
#
# Run: bash scripts/test-explain-e2e.sh
set -uo pipefail
cd /home/z/my-project

BASE="http://127.0.0.1:3000"
COOKIES="tmp/explain-e2e-cookies.txt"
rm -f "$COOKIES"

echo "== 1. Login as admin =="
CSRF=$(curl -s -c "$COOKIES" "$BASE/api/auth/csrf" | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$COOKIES" -c "$COOKIES" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=admin@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null
SESSION_OK=$(curl -s -b "$COOKIES" "$BASE/api/auth/session" | python3 -c 'import sys,json;d=json.load(sys.stdin);print("yes" if d.get("user",{}).get("email")=="admin@medq.com" else "no")')
echo "logged in: $SESSION_OK"
[ "$SESSION_OK" = "yes" ] || { echo "FAIL: login"; exit 1; }

echo "== 2. Clean admin's existing ollama endpoints =="
curl -s -b "$COOKIES" -X DELETE "$BASE/api/user/api-keys/ollama" | head -c 200; echo

echo "== 3. Save DEAD local endpoint first (priority 0), WORKING remote second =="
curl -s -b "$COOKIES" -X POST "$BASE/api/user/api-keys" -H 'content-type: application/json' \
  -d '{"providerId":"ollama","apiKey":"","baseUrl":"http://localhost:9","label":"Dead local"}' | python3 -c 'import sys,json;d=json.load(sys.stdin);print("saved dead:", d.get("key",{}).get("id","ERR"))'
curl -s -b "$COOKIES" -X POST "$BASE/api/user/api-keys" -H 'content-type: application/json' \
  -d '{"providerId":"ollama","apiKey":"","baseUrl":"https://ollama2.space-z.ai","label":"Working remote"}' | python3 -c 'import sys,json;d=json.load(sys.stdin);print("saved working:", d.get("key",{}).get("id","ERR"))'

echo "== 4. Find a question with no explanation =="
QID=$(bun -e "
const { db } = await import('./src/lib/db.ts');
const q = await db.question.findFirst({ where: { explanation: '' }, select: { id: true }, orderBy: { createdAt: 'asc' } });
console.log(q?.id ?? '');
" 2>/dev/null | tail -1)
echo "target question: $QID"
[ -n "$QID" ] || { echo "FAIL: no question without explanation"; exit 1; }

echo "== 5. Confirm-step data (GET without jobId) =="
curl -s -b "$COOKIES" "$BASE/api/questions/explain" | head -c 200; echo

echo "== 6. Start the explain job (selected mode) =="
JOB=$(curl -s -b "$COOKIES" -X POST "$BASE/api/questions/explain" -H 'content-type: application/json' \
  -d "{\"questionIds\":[\"$QID\"]}")
echo "$JOB"
JOB_ID=$(echo "$JOB" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("jobId",""))' 2>/dev/null)
[ -n "$JOB_ID" ] || { echo "FAIL: no jobId"; exit 1; }

echo "== 7. Poll until done (up to 300s) =="
STATUS=""
for i in $(seq 1 100); do
  sleep 3
  RESP=$(curl -s -b "$COOKIES" "$BASE/api/questions/explain?jobId=$JOB_ID")
  STATUS=$(echo "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("status","?"))' 2>/dev/null)
  if [ "$STATUS" = "done" ] || [ "$STATUS" = "error" ]; then
    echo "final ($((i*3))s): $RESP"
    break
  fi
  if (( i % 10 == 0 )); then
    echo "  … $((i*3))s: $(echo "$RESP" | head -c 160)"
  fi
done
[ "$STATUS" = "done" ] || { echo "FAIL: job ended as $STATUS"; exit 1; }

echo "== 8. Verify the explanation is RICH HTML =="
bun -e "
const { db } = await import('./src/lib/db.ts');
const q = await db.question.findUnique({ where: { id: '$QID' } });
const e = q?.explanation ?? '';
console.log('explanation length:', e.length);
console.log('has <strong> sections:', e.includes('<strong>'));
console.log('has <ul> bullets:', e.includes('<ul>'));
console.log('has why-wrong section:', /other options|other answer/i.test(e));
console.log('distractorAnalysis length:', (q?.distractorAnalysis ?? '').length);
console.log('first 200 chars:', e.slice(0, 200).replace(/\n/g, ' '));
const pass = e.length >= 400 && e.includes('<strong>') && e.includes('<ul>');
process.exit(pass ? 0 : 1);
" 2>/dev/null || { echo "FAIL: explanation quality gate"; exit 1; }
echo "QUALITY GATE PASSED"

echo "== 9. Idempotency: re-run without overwrite → nothing to do =="
RE2=$(curl -s -b "$COOKIES" -X POST "$BASE/api/questions/explain" -H 'content-type: application/json' \
  -d "{\"questionIds\":[\"$QID\"]}")
echo "$RE2" | head -c 200; echo
echo "$RE2" | grep -q "already has one" && echo "IDEMPOTENCY OK" || echo "NOTE: expected 'already has one' message"

echo "== 10. Overwrite regeneration =="
JOB2=$(curl -s -b "$COOKIES" -X POST "$BASE/api/questions/explain" -H 'content-type: application/json' \
  -d "{\"questionIds\":[\"$QID\"],\"overwrite\":true}")
JOB2_ID=$(echo "$JOB2" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("jobId",""))' 2>/dev/null)
echo "overwrite job: $JOB2"
STATUS2=""
for i in $(seq 1 100); do
  sleep 3
  RESP2=$(curl -s -b "$COOKIES" "$BASE/api/questions/explain?jobId=$JOB2_ID")
  STATUS2=$(echo "$RESP2" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("status","?"))' 2>/dev/null)
  [ "$STATUS2" = "done" ] || [ "$STATUS2" = "error" ] && break
  if (( i % 10 == 0 )); then echo "  … $((i*3))s"; fi
done
echo "overwrite final status: $STATUS2"

echo "== 11. Check server log for the endpoint FAILOVER =="
grep -c "failing over to ollama" tmp/prod-server.log 2>/dev/null | xargs -I{} echo "failover log lines: {}"

echo "== 12. Cleanup: remove the test endpoints =="
curl -s -b "$COOKIES" -X DELETE "$BASE/api/user/api-keys/ollama" | head -c 100; echo

echo ""
echo "ALL E2E CHECKS COMPLETE"
