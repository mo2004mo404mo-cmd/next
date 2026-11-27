#!/bin/bash
# E2E: Chat agent knowledge citations (Task 47, Feature 5)
#   login → chat v2 SSE "what do my notes say about diabetes? cite sources" →
#   verify tool.result for search_knowledge carries structured citations AND
#   the final text cites [K#] refs (the data the hover-cards render).
set -uo pipefail
cd /home/z/my-project

BASE="http://127.0.0.1:3000"
COOKIES="tmp/citation-e2e-cookies.txt"
STREAM="tmp/citation-e2e-stream.txt"
rm -f "$COOKIES" "$STREAM"

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

echo "== [2] knowledge-grounded chat turn (SSE) =="
timeout 260 curl -sN -b "$COOKIES" -X POST "$BASE/api/agent/chat/v2" \
  -H 'Content-Type: application/json' \
  -d '{"message":"According to my uploaded study notes, what are the key diagnostic criteria for diabetes? Cite your sources from my library."}' \
  > "$STREAM" 2>/dev/null
echo "   stream captured: $(wc -l < "$STREAM") lines, $(wc -c < "$STREAM") bytes"

echo "== [3] analysis =="
python3 - <<'EOF'
import json, re

events = []
data = None
for line in open('tmp/citation-e2e-stream.txt'):
    line = line.rstrip('\n')
    if line.startswith('event:'):
        events.append(line[6:].strip())
    elif line.startswith('data:'):
        try:
            data = json.loads(line[5:].strip())
        except Exception:
            data = None
        if data is not None:
            events.append(('payload', data))

search_results = []
final_text = ''
errors = []
for e in events:
    if isinstance(e, tuple):
        p = e[1]
        if p.get('toolName') == 'search_knowledge' and 'citations' in p:
            search_results.append(p)
        if 'text' in p and isinstance(p.get('text'), str) and len(p['text']) > 80:
            final_text = p['text']
        if p.get('message') and 'error' in str(p.get('message')).lower():
            errors.append(p['message'])

print(f"   search_knowledge tool.results with citations field: {len(search_results)}")
if search_results:
    cits = search_results[0].get('citations') or []
    print(f"   citations in first result: {len(cits)}")
    for c in cits[:3]:
        print(f"     {c.get('ref')}: {c.get('title','')[:50]}  rel={c.get('relevance')}  excerpt={len(c.get('excerpt') or '')} chars")
    assert cits, 'citations array empty'
    assert all('ref' in c and 'title' in c for c in cits), 'citation missing ref/title'
    assert any(c.get('excerpt') for c in cits), 'no excerpts parsed from context'

kcites = re.findall(r'\[K\d+\]', final_text)
print(f"   [K#] references in final text: {len(kcites)} {kcites[:5]}")
print(f"   final text excerpt: {final_text[:200]!r}")
assert len(search_results) >= 1, 'no search_knowledge result with citations in stream'
assert kcites, 'final text does not cite [K#] refs'
print("CITATIONS E2E OK")
EOF
