#!/bin/bash
# E2E verification for Task 53 — the three new features:
#   1. Multimedia questions from the user's own data (image/audio/video attachment)
#   2. Original-view file preview (PDF/image/audio/video serving, Range, download)
#   3. Advanced citations with highlight-in-source (chunk-level provenance)
set -uo pipefail
BASE=http://127.0.0.1:3000
J=/home/z/my-project/tmp/e2e-t53-cookies.txt
rm -f "$J"

echo "── 1. Login (student@medq.com) ──"
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
echo "── 2. FEATURE: upload an IMAGE (the 'X-ray' of the test) ──"
IMG=/home/z/my-project/public/generated/agent-05b6a4f0-819.jpg
UP=$(curl -s -b "$J" -X POST "$BASE/api/knowledge/upload" -F "file=@$IMG;type=image/jpeg" -F "origin=e2e" --max-time 60)
echo "upload response: $UP"
SRC=$(echo "$UP" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))')
[ -n "$SRC" ] || { echo "UPLOAD FAILED"; exit 1; }

echo "polling ingestion (VLM OCR + embedding)…"
for i in $(seq 1 40); do
  ST=$(curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 15 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC']
print(m[0]['status'] if m else 'gone')" 2>/dev/null)
  [ "$ST" = "ready" ] && break
  [ "$ST" = "failed" ] && { echo "INGESTION FAILED:"; curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC" | python3 -m json.tool | head -30; exit 1; }
  sleep 3
done
echo "image source status: $ST (sourceId $SRC)"

echo
echo "── 3. FEATURE: original-file serving (owner-gated, inline, Range) ──"
curl -s -b "$J" -o /dev/null -w "GET file: %{http_code} type=%{content_type} size=%{size_download}\n" "$BASE/api/knowledge/sources/$SRC/file" --max-time 20
curl -s -b "$J" -o /dev/null -w "GET file (Range 0-99): %{http_code} size=%{size_download}\n" -H "Range: bytes=0-99" "$BASE/api/knowledge/sources/$SRC/file" --max-time 20
curl -s -b "$J" -D - -o /dev/null "$BASE/api/knowledge/sources/$SRC/file?download=1" --max-time 20 | grep -i "content-disposition" | head -1
# ownership gate: no cookie → 401
curl -s -o /dev/null -w "GET file (no auth): %{http_code}\n" "$BASE/api/knowledge/sources/$SRC/file" --max-time 20

echo
echo "── 4. Detail endpoint: hasOriginal + originalMime + chunk ids ──"
curl -s -b "$J" "$BASE/api/knowledge/sources/$SRC?full=1&chunks=all" --max-time 20 | python3 -c "
import sys,json
d=json.load(sys.stdin)
s=d['source']
print('hasOriginal:', s.get('hasOriginal'), '| originalMime:', s.get('originalMime'))
print('fileKind:', s.get('fileKind'), '| meta.originalMime:', (s.get('meta') or {}).get('originalMime'))
chunks=d.get('chunks',[])
print('chunks:', len(chunks), '| first chunk has id:', bool(chunks and chunks[0].get('id')))
print('content preview:', (d.get('content') or '')[:160].replace(chr(10),' '))"

echo
echo "── 5. FEATURE: PDF upload + Adobe-style preview serving ──"
# Build a small real PDF with reportlab if present, else grab one from the repo
PDF=$(ls /home/z/my-project/download/*.pdf 2>/dev/null | head -1)
if [ -z "$PDF" ]; then
  python3 - << 'PYEOF'
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas
c = canvas.Canvas("/home/z/my-project/tmp/e2e-t53-test.pdf", pagesize=A4)
c.setFont("Helvetica", 14)
c.drawString(72, 800, "Chest X-ray Interpretation Primer")
c.setFont("Helvetica", 11)
y = 770
for line in [
  "Cardiomegaly on chest radiograph is suggested by a cardiothoracic ratio above 0.5",
  "on a PA film. A globular heart silhouette with clear lung fields suggests a",
  "pericardial effusion, whereas generalised cardiomegaly with pulmonary vascular",
  "congestion points to decompensated heart failure. Look for Kerley B lines,",
  "pleural effusions and upper-lobe venous diversion when assessing for the latter.",
  "Pneumothorax appears as a hyperlucent avascular zone with a visible pleural line;",
  "tension pneumothorax additionally shows mediastinal shift AWAY from the lesion.",
]:
    c.drawString(72, y, line); y -= 18
c.save()
PYEOF
  PDF=/home/z/my-project/tmp/e2e-t53-test.pdf
fi
echo "pdf: $PDF"
UP2=$(curl -s -b "$J" -X POST "$BASE/api/knowledge/upload" -F "file=@$PDF;type=application/pdf" -F "origin=e2e" --max-time 90)
echo "pdf upload response: $UP2"
SRC2=$(echo "$UP2" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))')
for i in $(seq 1 30); do
  ST2=$(curl -s -b "$J" "$BASE/api/knowledge/sources" --max-time 15 | python3 -c "
import sys,json
srcs=json.load(sys.stdin)['sources']
m=[s for s in srcs if s['id']=='$SRC2']
print(m[0]['status'] if m else 'gone')" 2>/dev/null)
  [ "$ST2" = "ready" ] && break
  [ "$ST2" = "failed" ] && break
  sleep 2
done
echo "pdf source status: $ST2"
curl -s -b "$J" -o /dev/null -w "GET pdf file: %{http_code} type=%{content_type} size=%{size_download}\n" "$BASE/api/knowledge/sources/$SRC2/file" --max-time 20

echo
echo "── 6. FEATURE: multimedia question generation (image attached + citations) ──"
echo "starting deep-agent run: 'chest X-ray' with the image + pdf sources attached…"
curl -s -b "$J" -X POST "$BASE/api/generate/deep-agent" -H 'Content-Type: application/json' --max-time 30 -d '{
  "topic": "Chest X-ray interpretation",
  "system": "Radiology",
  "types": ["mcq"],
  "difficulties": ["Moderate"],
  "count": 2,
  "knowledgeSourceIds": ["'"$SRC"'", "'"$SRC2"'"]
}' | head -c 300
echo
echo "(generation runs in background — check job store)"

echo "$SRC" > /home/z/my-project/tmp/e2e-t53-src.txt
echo "$SRC2" > /home/z/my-project/tmp/e2e-t53-src2.txt
echo
echo "PHASE 1 COMPLETE — sourceIds: image=$SRC pdf=$SRC2"
