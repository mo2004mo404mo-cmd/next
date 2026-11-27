#!/bin/bash
# Task 39 E2E: floating assistant illustration via the complete chat v2 agent.
# Logs in (NextAuth CSRF dance), asks the assistant for a medical illustration,
# and verifies the generate_medical_illustration tool now succeeds through the
# ZAI fallback (no more "Seedream generation failed (401)").
set -u
BASE="http://localhost:3000"
JAR=/tmp/medq-chat39-cookies.txt
rm -f "$JAR"

echo "[1] CSRF + login (student@medq.com)..."
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | python3 -c 'import json,sys; print(json.load(sys.stdin)["csrfToken"])')
LOGIN_CODE=$(curl -s -o /dev/null -w "%{http_code}" -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/api/auth/session")
echo "    login -> $LOGIN_CODE"
SESSION=$(curl -s -b "$JAR" "$BASE/api/auth/session")
echo "$SESSION" | python3 -c 'import json,sys; d=json.load(sys.stdin); print("    user:", (d.get("user") or {}).get("email", "NOT LOGGED IN"))'

echo "[2] Sending illustration request to floating assistant (chat v2 SSE)..."
MSG="Please generate a medical illustration of the cardiac conduction system (SA node, AV node, bundle of His, Purkinje fibers) and give me the image URL."
START=$(date +%s)
curl -s -N --max-time 280 -b "$JAR" \
  -X POST "$BASE/api/agent/chat/v2" \
  -H "Content-Type: application/json" \
  -H "Accept: text/event-stream" \
  -d "{\"message\": $(python3 -c 'import json,sys; print(json.dumps(sys.argv[1]))' "$MSG"), \"currentTab\": \"dashboard\"}" \
  > /tmp/medq-chat39-sse.txt
END=$(date +%s)
echo "    stream closed after $((END-START))s ($(wc -l < /tmp/medq-chat39-sse.txt) lines)"

echo "[3] Analysis..."
python3 - <<'PYEOF'
import json, re, os

# SSE frames: "event: <type>" line followed by "data: <json>" line.
events = []
current_type = None
for line in open('/tmp/medq-chat39-sse.txt'):
    line = line.strip()
    if line.startswith('event:'):
        current_type = line[6:].strip()
    elif line.startswith('data:'):
        try:
            events.append({'type': current_type, **json.loads(line[5:].strip())})
        except Exception:
            pass
        current_type = None

tool_calls = [e for e in events if e.get('type') == 'tool.call']
tool_results = [e for e in events if e.get('type') == 'tool.result']
errors = [e for e in events if e.get('type') == 'error']
final_text = ' '.join(e.get('text', '') for e in events if e.get('type') == 'text.delta')

print(f"    events={len(events)} tool_calls={len(tool_calls)} tool_results={len(tool_results)} errors={len(errors)}")
for e in tool_calls:
    print(f"    TOOL.CALL: {e.get('toolName')}")
for e in tool_results:
    print(f"    TOOL.RESULT [{e.get('toolName')}] status={e.get('status')}: {str(e.get('result'))[:200]}")

urls = re.findall(r'/generated/[A-Za-z0-9._-]+', json.dumps(events))
print(f"    generated URLs in stream: {urls}")

if errors:
    print("    ERRORS:", json.dumps(errors)[:400])

ok = True
names = [ e.get("toolName", "") for e in tool_calls ]
if 'generate_medical_illustration' not in names:
    print("    ❌ generate_medical_illustration was never called")
    ok = False
if 'Seedream generation failed' in json.dumps(events):
    print("    ❌ Seedream 401 still present")
    ok = False
if not urls:
    print("    ❌ no /generated/ URL in stream")
    ok = False
for u in set(urls):
    path = os.path.join('/home/z/my-project/public', u.lstrip('/'))
    exists = os.path.exists(path)
    size = os.path.getsize(path) if exists else 0
    print(f"    file {u}: exists={exists} size={size}")
    if not exists or size < 5000:
        ok = False
print("\n    ✅ FLOATING ASSISTANT ILLUSTRATION E2E PASSED" if ok else "\n    ❌ E2E FAILED")
exit(0 if ok else 1)
PYEOF
