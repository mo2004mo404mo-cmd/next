#!/bin/bash
# E2E: deep-agent question generation through the HTTP API (provider fix)
#   login → POST /api/generate/deep-agent → poll job → verify completed
#   Previously failed with "No AI provider is configured for the deep agent."
set -uo pipefail
cd /home/z/my-project

BASE="http://127.0.0.1:3000"
COOKIES="tmp/deepagent-e2e-cookies.txt"
rm -f "$COOKIES"

echo "== [1] login =="
CSRF=$(curl -s -c "$COOKIES" "$BASE/api/auth/csrf" | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$COOKIES" -c "$COOKIES" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null
SESSION_OK=$(curl -s -b "$COOKIES" "$BASE/api/auth/session" | python3 -c 'import sys,json;d=json.load(sys.stdin);print("yes" if d.get("user",{}).get("email")=="student@medq.com" else "no")')
echo "   logged in: $SESSION_OK"
[ "$SESSION_OK" = "yes" ] || { echo "FAIL: login"; exit 1; }

echo "== [2] POST /api/generate/deep-agent =="
RESP=$(curl -s -b "$COOKIES" -X POST "$BASE/api/generate/deep-agent" \
  -H 'Content-Type: application/json' \
  -d '{"topic":"Neonatal jaundice evaluation","system":"Pediatrics","types":["mcq"],"difficulties":["Medium"],"count":1}')
echo "   response: $RESP"
JOB_ID=$(echo "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("jobId",""))')
[ -n "$JOB_ID" ] || { echo "FAIL: no jobId"; exit 1; }

echo "== [3] poll job $JOB_ID =="
DEADLINE=$((SECONDS + 420))
while [ $SECONDS -lt $DEADLINE ]; do
  JOB=$(curl -s -b "$COOKIES" "$BASE/api/generate/deep-agent?jobId=$JOB_ID")
  STATUS=$(echo "$JOB" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("status",""))')
  PROGRESS=$(echo "$JOB" | python3 -c 'import sys,json;print((json.load(sys.stdin).get("progress") or "")[:90])' 2>/dev/null)
  echo "   [${SECONDS}s] $STATUS — $PROGRESS"
  case "$STATUS" in
    completed) break ;;
    failed) echo "   FULL ERROR:"; echo "$JOB" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("error",""))'; exit 1 ;;
  esac
  sleep 8
done

echo "== [4] analysis =="
python3 - <<EOF
import json
job = json.loads('''$JOB''')
status = job.get('status')
result = job.get('result') or []
error = job.get('error')
print('   status      :', status)
print('   error       :', error)
print('   questions   :', len(result))
for q in result[:3]:
    print('   -', q.get('id'), '|', q.get('topic'), '|', q.get('type'), '|', (q.get('text') or '')[:70])
ids = [q.get('id') for q in result if q.get('id')]
open('tmp/deepagent-e2e-question-ids.txt','w').write('\n'.join(ids))
ok = status == 'completed' and len(result) >= 1 and 'No AI provider' not in str(error)
print('   VERDICT     :', 'PASS' if ok else 'FAIL')
exit(0 if ok else 1)
EOF
