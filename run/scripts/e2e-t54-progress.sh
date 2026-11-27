#!/bin/bash
# E2E verification for Task 54 — upload/processing PROGRESS UX:
#   1. Server-side stage tracking: upload a PDF and RAPID-poll the sources
#      list while it ingests → meta.progress must appear with real stages
#      (extracting → storing → chunking → enriching → embedding → saving)
#      and a monotonically increasing percent.
#   2. Progress is stripped from the list once the source is ready.
#   3. Byte-progress upload endpoint still returns sourceId immediately.
set -uo pipefail
BASE=http://127.0.0.1:3000
J=/home/z/my-project/tmp/e2e-t54-cookies.txt
rm -f "$J"

echo "── 1. Login (student@medq.com) ──"
CSRF=$(curl -s -c "$J" "$BASE/api/auth/csrf" --max-time 10 | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$J" -c "$J" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null --max-time 15
EMAIL=$(curl -s -b "$J" "$BASE/api/auth/session" --max-time 10 | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("user",{}).get("email","NONE"))' 2>/dev/null || echo NONE)
echo "logged in as: $EMAIL"
[ "$EMAIL" = "student@medq.com" ] || { echo "LOGIN FAILED"; exit 1; }

echo
echo "── 2. Upload a 1.3MB PDF (measured transfer + background ingestion) ──"
PDF=/home/z/my-project/tmp/e2e-t54-upload.pdf
cp /home/z/my-project/upload/file-store/cmv3ou594000kvfnl8pa34tdu.bin "$PDF"
T0=$(date +%s%3N)
UP=$(curl -s -b "$J" -X POST "$BASE/api/knowledge/upload" -F "file=@$PDF;type=application/pdf" -F "origin=e2e" --max-time 90)
T1=$(date +%s%3N)
echo "upload response: $UP"
echo "HTTP upload took $((T1-T0))ms"
SRC=$(echo "$UP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))')
[ -n "$SRC" ] || { echo "UPLOAD FAILED"; exit 1; }

echo
echo "── 3. RAPID-poll during ingestion → capture meta.progress stages ──"
SEEN=""
LAST_PCT=0
MONOTONIC=OK
for i in $(seq 1 60); do
  ROW=$(curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 10 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC']
if not m: print('gone'); sys.exit()
s=m[0]
prog=(s.get('meta') or {}).get('progress')
if s['status']=='ready': print('READY')
elif s['status']=='failed': print('FAILED:'+(s.get('error') or '?'))
elif prog: print(f\"{s['status']}|{prog.get('stage')}|{prog.get('percent')}|{prog.get('note','')}\")
else: print(s['status']+'|no-progress-yet')" 2>/dev/null)
  echo "  poll $i: $ROW"
  if [[ "$ROW" == READY ]]; then break; fi
  if [[ "$ROW" == FAILED* || "$ROW" == "gone" ]]; then echo "INGESTION FAILED: $ROW"; exit 1; fi
  if [[ "$ROW" == *"|"* ]]; then
    STAGE=$(echo "$ROW" | cut -d'|' -f2)
    PCT=$(echo "$ROW" | cut -d'|' -f3)
    if [[ -n "$STAGE" && ! "$SEEN" == *"$STAGE"* ]]; then SEEN="$SEEN $STAGE"; fi
    if [[ "$PCT" =~ ^[0-9]+$ ]] && [ "$PCT" -lt "$LAST_PCT" ]; then MONOTONIC="VIOLATED ($LAST_PCT→$PCT)"; fi
    [[ "$PCT" =~ ^[0-9]+$ ]] && LAST_PCT=$PCT
  fi
  sleep 1
done

echo
echo "stages seen:$SEEN"
echo "percent monotonic: $MONOTONIC (last: $LAST_PCT%)"

echo
echo "── 4. After ready: progress stripped from the list response ──"
curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 10 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC']
if not m: print('SOURCE GONE'); sys.exit(1)
s=m[0]
meta=s.get('meta') or {}
print('status:', s['status'])
print('progress stripped:', 'progress' not in meta)
print('chunks:', meta.get('chunks'))
print('originalMime:', meta.get('originalMime'))"

echo
echo "── 5. Cleanup: delete the e2e test source ──"
curl -s -b "$J" -X DELETE "$BASE/api/knowledge/sources/$SRC" --max-time 15 | head -c 200; echo

echo
echo "E2E DONE"
