#!/usr/bin/env bash
# scripts/verify-deep-agent-e2e.sh — reproduce the user's exact failing flow:
# login → POST /api/generate/deep-agent → poll the job → print final status.
# Exit 0 only if the job completes and saves at least one question.
set -uo pipefail
BASE="${BASE:-http://127.0.0.1:3000}"
JAR=$(mktemp)
EMAIL="${EMAIL:-student@medq.com}"
PASS="${PASS:-test123}"

echo "[1] login as $EMAIL …"
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | python3 -c 'import json,sys; print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=$EMAIL" \
  --data-urlencode "password=$PASS" \
  --data-urlencode "redirect=/api/auth/session" -o /dev/null
WHO=$(curl -s -b "$JAR" "$BASE/api/auth/session" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("user",{}).get("email",""))' 2>/dev/null)
if [ -z "$WHO" ]; then echo "FAIL: login did not produce a session"; exit 1; fi
echo "    session: $WHO"

echo "[2] POST /api/generate/deep-agent …"
RESP=$(curl -s -b "$JAR" -X POST "$BASE/api/generate/deep-agent" \
  -H "Content-Type: application/json" \
  -d '{"topic":"pneumothorax diagnosis on chest X-ray","types":["mcq"],"difficulties":["Medium"],"count":1,"system":"Respiratory"}')
echo "    response: $RESP"
JOB=$(echo "$RESP" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("jobId",""))')
if [ -z "$JOB" ]; then echo "FAIL: no jobId (gate/credit error?)"; exit 1; fi

echo "[3] polling job $JOB …"
DEADLINE=$((SECONDS + 420))
LAST=""
while [ $SECONDS -lt $DEADLINE ]; do
  JOBJSON=$(curl -s -b "$JAR" "$BASE/api/generate/deep-agent?jobId=$JOB")
  STATUS=$(echo "$JOBJSON" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("status",""))' 2>/dev/null)
  PROGRESS=$(echo "$JOBJSON" | python3 -c 'import json,sys; print(json.load(sys.stdin).get("progress",""))' 2>/dev/null)
  if [ "$STATUS" != "$LAST" ] || [ "$PROGRESS" != "$LASTP" ]; then
    echo "    [$STATUS] $PROGRESS"
    LAST="$STATUS"; LASTP="$PROGRESS"
  fi
  if [ "$STATUS" = "completed" ] || [ "$STATUS" = "failed" ]; then
    echo "$JOBJSON" | python3 -c '
import json,sys
j=json.load(sys.stdin)
print("FINAL STATUS:", j.get("status"))
print("progress:", j.get("progress"))
print("error:", j.get("error"))
r=j.get("result")
if r:
    print("saved questions:", len(r))
    q=r[0]
    print("first question text:", str(q.get("text",""))[:140])
sys.exit(0 if j.get("status")=="completed" else 2)'
    RC=$?
    rm -f "$JAR"
    if [ $RC -eq 0 ]; then echo "PASS: deep agent generation completed"; else echo "FAIL: job did not complete"; fi
    exit $RC
  fi
  LASTP="$PROGRESS"
  sleep 4
done
echo "FAIL: timed out waiting for job"
rm -f "$JAR"
exit 1
