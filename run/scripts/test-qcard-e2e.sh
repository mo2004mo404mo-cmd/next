#!/bin/bash
# E2E: chat agent question generation (Task 47, Feature 4)
#   login → chat v2 SSE "generate 1 easy MCQ about asthma and save it" →
#   verify generation.saved carries the FULL question payload (id, options,
#   answer, explanation) that ChatQuestionCard renders as an interactive card.
set -uo pipefail
cd /home/z/my-project

BASE="http://127.0.0.1:3000"
COOKIES="tmp/qcard-e2e-cookies.txt"
STREAM="tmp/qcard-e2e-stream.txt"
rm -f "$COOKIES" "$STREAM"

CSRF=$(curl -s -c "$COOKIES" "$BASE/api/auth/csrf" | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$COOKIES" -c "$COOKIES" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null
SESSION_OK=$(curl -s -b "$COOKIES" "$BASE/api/auth/session" | python3 -c 'import sys,json;d=json.load(sys.stdin);print("yes" if d.get("user",{}).get("email")=="student@medq.com" else "no")')
echo "logged in: $SESSION_OK"
[ "$SESSION_OK" = "yes" ] || { echo "FAIL: login"; exit 1; }

echo "chat turn: generate 1 easy MCQ about asthma and save it (SSE, up to 280s)..."
timeout 280 curl -sN -b "$COOKIES" -X POST "$BASE/api/agent/chat/v2" \
  -H 'Content-Type: application/json' \
  -d '{"message":"generate 1 easy MCQ question about asthma and save it to my question bank"}' \
  > "$STREAM" 2>/dev/null
echo "stream captured: $(wc -l < "$STREAM") lines, $(wc -c < "$STREAM") bytes"

python3 - <<'EOF'
import json

saved = []
final_text = ''
events = set()
for line in open('tmp/qcard-e2e-stream.txt'):
    line = line.rstrip('\n')
    if line.startswith('event:'):
        events.add(line[6:].strip())
    elif line.startswith('data:'):
        try:
            p = json.loads(line[5:].strip())
        except Exception:
            continue
        if isinstance(p, dict):
            if 'question' in p and isinstance(p['question'], dict):
                saved.append(p)
            if isinstance(p.get('text'), str) and len(p['text']) > 80:
                final_text = p['text']

print(f"event types seen: {sorted(events)}")
print(f"generation.saved events: {len(saved)}")
ok = True
for s in saved:
    q = s['question']
    print(f"  #{s.get('index')}: id={q.get('id','?')[:14]}  topic={q.get('topic','')[:30]}")
    print(f"      type={q.get('type')}  difficulty={q.get('difficulty')}")
    opts = q.get('options')
    opts = opts if isinstance(opts, list) else json.loads(opts or '[]')
    print(f"      options: {len(opts)}  answer: {str(q.get('answer',''))[:60]!r}")
    print(f"      explanation: {len(str(q.get('explanation','')))} chars  image: {q.get('imageUrl','') or '-'}")
    if not q.get('id'): ok = False; print('      FAIL: missing id')
    if not opts: ok = False; print('      FAIL: missing options')
    if not q.get('answer'): ok = False; print('      FAIL: missing answer')
    if len(str(q.get('explanation',''))) < 30: ok = False; print('      FAIL: missing explanation')

if not saved:
    print('FAIL: no generation.saved event captured (server may have died mid-stream)')
    print(f'stream tail: {open("tmp/qcard-e2e-stream.txt").read()[-400:]!r}')
    exit(1)
assert ok, 'payload incomplete'
print('QUESTION-PAYLOAD E2E OK')
EOF
