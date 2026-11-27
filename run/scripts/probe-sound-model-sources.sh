#!/bin/bash
# Probe capabilities for agent sound-search + 3D model search
# 1. ffmpeg availability (transcode ogg -> mp3/wav)
# 2. Wikimedia Commons API search for clinical audio (heart sounds)
# 3. Direct download of an audio file + magic bytes
# 4. Sketchfab public search API for 3D anatomy models

echo "=== 1. ffmpeg ==="
which ffmpeg && ffmpeg -version 2>/dev/null | head -1 || echo "NO FFMPEG"

echo ""
echo "=== 2. Wikimedia Commons audio search: 'aortic stenosis murmur' ==="
curl -s --max-time 20 "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=aortic+stenosis+murmur+filetype:audio&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url%7Cmime%7Csize" \
  | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    pages = d.get('query',{}).get('pages',{})
    for p in pages.values():
        ii = (p.get('imageinfo') or [{}])[0]
        print(f\"  {p.get('title','?')[:70]} | {ii.get('mime','?')} | {ii.get('size',0)} bytes | {ii.get('url','')[:90]}\")
    if not pages: print('  NO RESULTS')
except Exception as e:
    print('  PARSE FAIL:', e)
"

echo ""
echo "=== 2b. Commons audio search: 'heart sound' ==="
curl -s --max-time 20 "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=heart+sound+filetype:audio&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url%7Cmime%7Csize" \
  | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    pages = d.get('query',{}).get('pages',{})
    for p in pages.values():
        ii = (p.get('imageinfo') or [{}])[0]
        print(f\"  {p.get('title','?')[:70]} | {ii.get('mime','?')} | {ii.get('size',0)} bytes | {ii.get('url','')[:90]}\")
    if not pages: print('  NO RESULTS')
except Exception as e:
    print('  PARSE FAIL:', e)
"

echo ""
echo "=== 3. Direct audio download test (Commons file) ==="
URL=$(curl -s --max-time 20 "https://commons.wikimedia.org/w/api.php?action=query&format=json&generator=search&gsrsearch=heart+sounds+filetype:audio&gsrnamespace=6&gsrlimit=3&prop=imageinfo&iiprop=url%7Cmime" | python3 -c "
import json,sys
d = json.load(sys.stdin)
pages = d.get('query',{}).get('pages',{})
for p in pages.values():
    ii = (p.get('imageinfo') or [{}])[0]
    if ii.get('url'): print(ii['url']); break
")
if [ -n "$URL" ]; then
  echo "  downloading: $URL"
  curl -s --max-time 30 -A "MedQ-education-agent/1.0 (test)" -o /tmp/sound_test.bin "$URL"
  ls -la /tmp/sound_test.bin
  file /tmp/sound_test.bin 2>/dev/null || xxd /tmp/sound_test.bin | head -2
else
  echo "  no URL found"
fi

echo ""
echo "=== 4. Sketchfab public search: 'heart anatomy' ==="
curl -s --max-time 20 "https://api.sketchfab.com/v3/search?type=models&q=heart+anatomy&count=6" \
  | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    for r in d.get('results',[]):
        print(f\"  {r.get('name','?')[:60]} | uid={r.get('uid')} | downloads={r.get('isDownloadable')} | license={(r.get('license') or {}).get('label') if isinstance(r.get('license'),dict) else r.get('license')}\")
    if not d.get('results'): print('  NO RESULTS / keys:', list(d.keys())[:10])
except Exception as e:
    print('  PARSE FAIL:', e)
"

echo ""
echo "=== 4b. Sketchfab search: 'skeleton anatomy' ==="
curl -s --max-time 20 "https://api.sketchfab.com/v3/search?type=models&q=skeleton+anatomy&count=6&downloadable=false" \
  | python3 -c "
import json,sys
try:
    d = json.load(sys.stdin)
    for r in d.get('results',[]):
        print(f\"  {r.get('name','?')[:60]} | uid={r.get('uid')}\")
    if not d.get('results'): print('  NO RESULTS / keys:', list(d.keys())[:10])
except Exception as e:
    print('  PARSE FAIL:', e)
"

echo ""
echo "=== 5. z-ai web_search for heart sounds (what results look like) ==="
cd /home/z/my-project && timeout 40 bun -e "
const mod = await import('z-ai-web-dev-sdk');
const ZAI = mod.default; const zai = await ZAI.create();
const results = await zai.functions.invoke('web_search', { query: 'aortic stenosis murmur audio recording mp3', num: 8 });
for (const r of results || []) {
  console.log('  -', String(r.name||'').slice(0,70), '|', String(r.url||'').slice(0,90));
}
" 2>&1 | head -15
