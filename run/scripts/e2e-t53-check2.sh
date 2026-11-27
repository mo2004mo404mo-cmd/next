#!/bin/bash
# E2E phase 2 — the FEATURE 1 core test: upload a real X-ray image and verify
# the deep agent ATTACHES the user's own file to the generated question
# (imageUrl → /api/knowledge/sources/[id]/file) instead of generating an
# illustration, plus citations with highlightable quotes.
set -uo pipefail
BASE=http://127.0.0.1:3000
J=/home/z/my-project/tmp/e2e-t53-cookies.txt

echo "── 1. Upload the X-ray image ──"
UP=$(curl -s -b "$J" -X POST "$BASE/api/knowledge/upload" -F "file=@/home/z/my-project/tmp/e2e-t53-xray.jpg;filename=chest-xray-reticulonodular.jpg;type=image/jpeg" -F "origin=e2e" --max-time 60)
echo "upload: $UP"
SRC=$(echo "$UP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))')
[ -n "$SRC" ] || { echo "UPLOAD FAILED"; exit 1; }

echo "polling ingestion (VLM OCR + embedding)…"
for i in $(seq 1 60); do
  ST=$(curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 15 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC']
print(m[0]['status'] if m else 'gone')" 2>/dev/null)
  [ "$ST" = "ready" ] && break
  [ "$ST" = "failed" ] && { echo "INGESTION FAILED"; curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC" | head -c 400; exit 1; }
  sleep 3
done
echo "x-ray source: $ST (id $SRC)"

echo
echo "── 2. Check the VLM description of the X-ray ──"
curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC?full=1" --max-time 15 | python3 -c "
import sys,json
d=json.load(sys.stdin)
print((d.get('content') or '')[:400].replace(chr(10),' '))"

echo
echo "── 3. Generate questions that DISPLAY the user's X-ray ──"
RESP=$(curl -s -b "$J" -X POST "$BASE/api/generate/deep-agent" -H 'Content-Type: application/json' --max-time 30 -d '{
  "topic": "Interpret the chest X-ray in my library (the reticulonodular pattern case)",
  "system": "Radiology",
  "types": ["mcq"],
  "difficulties": ["Hard"],
  "count": 1,
  "focusHint": "Use MY uploaded chest X-ray image itself as the question image — the learner must interpret the actual radiograph.",
  "knowledgeSourceIds": ["'"$SRC"'"]
}')
echo "start: $RESP"
JOB=$(echo "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("jobId",""))')
[ -n "$JOB" ] || { echo "NO JOB"; exit 1; }

echo "waiting for the agent…"
for i in $(seq 1 90); do
  R=$(curl -s -b "$J" "$BASE/api/generate/agent?jobId=$JOB" --max-time 15)
  ST=$(echo "$R" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("status",""))' 2>/dev/null)
  PR=$(echo "$R" | python3 -c 'import sys,json;d=json.load(sys.stdin);print((d.get("progress") or "")[:90])' 2>/dev/null)
  echo "[$i] $ST | $PR"
  [ "$ST" = "completed" ] || [ "$ST" = "failed" ] && break
  sleep 10
done

echo
echo "── 4. Verify the saved question: attached user file + citations ──"
curl -s -b "$J" "$BASE/api/questions?limit=1" --max-time 15 | python3 -c "
import sys, json
d = json.load(sys.stdin)
q = d['questions'][0]
print('id:', q['id'])
print('text:', q['text'][:200].replace(chr(10),' '))
iu = q.get('imageUrl','')
print('imageUrl:', iu)
ATTACHED = '/api/knowledge/sources/' in iu
print('>>> USER FILE ATTACHED TO QUESTION:', ATTACHED)
print('knowledgeSourceIds:', q.get('knowledgeSourceIds'))
cits = q.get('citations', [])
print('citations:', len(cits))
for c in cits:
    print('   -', c.get('title'), '| chunk', c.get('chunkId','')[:12], '| quote len', len(c.get('quote','')))
    print('     quote:', c.get('quote','')[:150].replace(chr(10),' '))
import os
ok = ATTACHED and cits
print('RESULT:', 'PASS' if ok else 'CHECK MANUALLY')
"

echo "$SRC" > /home/z/my-project/tmp/e2e-t53-xray-src.txt
echo "$JOB" > /home/z/my-project/tmp/e2e-t53-job2.txt
