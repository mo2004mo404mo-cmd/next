#!/bin/bash
# E2E verification for Task 55 —
#   FEATURE 1: question agent ANALYZES the user's own videos (technique demos,
#              operation recordings) and builds "watch then answer" questions
#              from what the video actually shows.
#   FEATURE 2: citation click opens the ORIGINAL FILE (not extracted content)
#              with scroll + highlight (PDF page locate / media seek).
set -uo pipefail
BASE=http://127.0.0.1:3000
J=/home/z/my-project/tmp/e2e-t55-cookies.txt
rm -f "$J"

echo "── 1. Login ──"
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
[ "$EMAIL" = "student@medq.com" ] || { echo "LOGIN FAILED"; exit 1; }

echo
echo "── 2. FEATURE 1: upload the technique-demo VIDEO ──"
UP=$(curl -s -b "$J" -X POST "$BASE/api/knowledge/upload" \
  -F "file=@/home/z/my-project/tmp/e2e-t55-technique.mp4;filename=suture-technique-demo.mp4;type=video/mp4" \
  -F "origin=e2e" --max-time 60)
echo "upload: $UP"
SRC=$(echo "$UP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))')
[ -n "$SRC" ] || { echo "UPLOAD FAILED"; exit 1; }

echo "polling video ingestion (frame VLM + ASR)…"
for i in $(seq 1 60); do
  ST=$(curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 15 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC']
print(m[0]['status'] if m else 'gone')" 2>/dev/null)
  [ "$ST" = "ready" ] && break
  [ "$ST" = "failed" ] && { echo "INGESTION FAILED"; curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC" | head -c 500; exit 1; }
  sleep 3
done
echo "video source: $ST (sourceId $SRC)"

echo
echo "── 3. Video source detail: original retained + timestamped content ──"
curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC?full=1&chunks=all" --max-time 20 | python3 -c "
import sys,json
d=json.load(sys.stdin)
s=d['source']
print('hasOriginal:', s.get('hasOriginal'), '| originalMime:', s.get('originalMime'))
c=(d.get('content') or '')
print('content head:', c[:300].replace(chr(10),' | '))
import re
ts=re.findall(r'\[\d{1,2}:\d{2}\]', c)
print('timestamps found:', len(ts), ts[:6])
chunks=d.get('chunks') or []
print('chunks:', len(chunks), '| first chunk has ts:', bool(ts) or any(re.findall(r'\[\d{1,2}:\d{2}\]', ch.get('content',''))) for ch in chunks[:3])"

echo
echo "── 4. FEATURE 1: deep-agent run on the technique video ──"
RESP=$(curl -s -b "$J" -X POST "$BASE/api/generate/deep-agent" -H 'Content-Type: application/json' --max-time 30 -d '{
  "topic": "Identify the suture technique demonstrated in my video",
  "system": "Surgery",
  "types": ["mcq"],
  "difficulties": ["Medium"],
  "count": 1,
  "focusHint": "Watch the technique video in my library and ask which technique is demonstrated (watch-then-answer).",
  "knowledgeSourceIds": ["'"$SRC"'"]
}')
echo "start: $RESP"
JOB=$(echo "$RESP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("jobId",""))')
[ -n "$JOB" ] || { echo "NO JOB"; exit 1; }

EVENTS=/home/z/my-project/tmp/e2e-t55-job-events.txt
: > "$EVENTS"
for i in $(seq 1 90); do
  R=$(curl -s -b "$J" "$BASE/api/generate/agent?jobId=$JOB" --max-time 15)
  ST=$(echo "$R" | python3 -c 'import sys,json;d=json.load(sys.stdin);print(d.get("status",""))' 2>/dev/null)
  PR=$(echo "$R" | python3 -c 'import sys,json;d=json.load(sys.stdin);print((d.get("progress") or "")[:110])' 2>/dev/null)
  echo "[$i] $ST | $PR" | tee -a "$EVENTS"
  [ "$ST" = "completed" ] || [ "$ST" = "failed" ] && break
  sleep 10
done
echo "── analyze_library_video tool usage in the run ──"
rg -o "analyze_library_video" "$EVENTS" | head -3 || echo "NOT SEEN IN PROGRESS LINES (checking full events…)"
curl -s -b "$J" "$BASE/api/generate/agent?jobId=$JOB" --max-time 20 | python3 -c "
import sys,json
d=json.load(sys.stdin)
evs=d.get('events') or []
tools=[e.get('tool') for e in evs if e.get('type')=='tool_start']
print('tool calls:', tools)
print('analyze_library_video called:', 'analyze_library_video' in tools)"

echo
echo "── 5. The saved question: video attached + watch cue + citations ──"
curl -s -b "$J" "$BASE/api/questions?limit=3" --max-time 15 | python3 -c "
import sys, json
d = json.load(sys.stdin)
q = d['questions'][0]
print('id:', q['id'])
print('text:', q['text'][:260].replace(chr(10),' '))
print('videoUrl:', q.get('videoUrl',''))
print('watch cue 🎬 in stem:', '🎬' in q['text'] or 'watch' in q['text'].lower())
cits = q.get('citations')
if isinstance(cits, str):
    try: cits = json.loads(cits)
    except Exception: cits = []
print('citations:', len(cits or []))
for c in (cits or [])[:2]:
    print('  cite →', c.get('sourceId'), '| quote head:', (c.get('quote') or '')[:110].replace(chr(10),' '))
    import re
    m=re.findall(r'\[(\d{1,2}):(\d{2})\]', c.get('quote') or '')
    print('  cited timestamp:', m[0] if m else 'none')
open('/home/z/my-project/tmp/e2e-t55-qid.txt','w').write(q['id'])"

echo
echo "── 6. FEATURE 2: citation lands on the ORIGINAL file ──"
# The question's citations point at the video source → the viewer must open
# the ORIGINAL tab and seek the player to the cited [mm:ss] moment.
QID=$(cat /home/z/my-project/tmp/e2e-t55-qid.txt)
curl -s -b "$J" "$BASE/api/questions?limit=3" --max-time 15 | python3 -c "
import sys, json
d = json.load(sys.stdin)
q = [x for x in d['questions'] if x['id']=='$QID'][0]
cits = q.get('citations')
if isinstance(cits, str):
    try: cits = json.loads(cits)
    except Exception: cits = []
c = (cits or [{}])[0]
print('CITE_SOURCE=' + (c.get('sourceId') or ''))
print('CITE_CHUNK=' + (c.get('chunkId') or ''))
print('CITE_QUOTE=' + (c.get('quote') or '')[:200].replace(chr(10),' '))" > /home/z/my-project/tmp/e2e-t55-cite.txt
cat /home/z/my-project/tmp/e2e-t55-cite.txt
CITE_SRC=$(rg -o "CITE_SOURCE=\S+" /home/z/my-project/tmp/e2e-t55-cite.txt | cut -d= -f2)
curl -s -b "$J" -o /dev/null -w "original file serving: %{http_code} type=%{content_type} bytes=%{size_download}\n" "$BASE/api/knowledge/sources/$CITE_SRC/file" --max-time 20

echo
echo "── 7. FEATURE 2 (PDF path): find an existing question citing the PDF ──"
curl -s -b "$J" "$BASE/api/questions?limit=50" --max-time 20 | python3 -c "
import sys, json
d = json.load(sys.stdin)
found = None
for q in d['questions']:
    cits = q.get('citations')
    if isinstance(cits, str):
        try: cits = json.loads(cits)
        except Exception: cits = []
    for c in (cits or []):
        if c.get('fileKind') in (None, 'document', 'pdf') or (c.get('quote') or '')[:1].isupper():
            # PDF chunk quotes are plain prose; verify the source kind below
            found = (q['id'], c.get('sourceId'), c.get('chunkId'), (c.get('quote') or '')[:150])
            break
    if found: break
print('PDF_CITE_QID=' + (found[0] if found else ''))
print('PDF_CITE_SRC=' + (found[1] if found else ''))
print('PDF_CITE_QUOTE=' + (found[3] if found else '').replace(chr(10),' '))" > /home/z/my-project/tmp/e2e-t55-pdfcite.txt
cat /home/z/my-project/tmp/e2e-t55-pdfcite.txt
PDF_SRC=$(rg -o "PDF_CITE_SRC=\S+" /home/z/my-project/tmp/e2e-t55-pdfcite.txt | cut -d= -f2)
if [ -n "$PDF_SRC" ]; then
  curl -s -b "$J" "$BASE/api/knowledge/sources/$PDF_SRC?full=1" --max-time 20 | python3 -c "
import sys,json
d=json.load(sys.stdin)
s=d['source']
print('pdf source kind:', s.get('fileKind'), '| mime:', s.get('originalMime'), '| hasOriginal:', s.get('hasOriginal'))"
fi

echo
echo "E2E script part 1 done. sourceId=$SRC job=$JOB"
echo "$SRC" > /home/z/my-project/tmp/e2e-t55-src.txt
