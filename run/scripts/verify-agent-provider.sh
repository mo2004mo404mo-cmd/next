#!/usr/bin/env bash
# Verify the Deep Agent's intended provider path: MedQ origin /v1 → freellm
# sidecar → ollama2 upstream (model zai-llm), using the unified key now in .env.
set -euo pipefail
BASE="${BASE:-http://127.0.0.1:3000}"
KEY=$(awk -F= '/^MEDQ_AGENT_API_KEY=/ {print $2}' /home/z/my-project/.env)

echo "[1] /v1/models (auth check)…"
MODELS=$(curl -s -o /tmp/v1models.json -w '%{http_code}' -H "Authorization: Bearer $KEY" "$BASE/v1/models")
echo "    HTTP $MODELS ($(python3 -c 'import json;d=json.load(open("/tmp/v1models.json"));print(len(d.get("data",[])))' 2>/dev/null || echo '?') models)"

echo "[2] /v1/chat/completions zai-llm 'hi'…"
CODE=$(curl -s -o /tmp/v1chat.json -w '%{http_code}' -m 60 \
  -H "Authorization: Bearer $KEY" -H 'Content-Type: application/json' \
  -d '{"model":"zai-llm","messages":[{"role":"user","content":"Say hi in exactly 3 words."}],"max_tokens":2000}' \
  "$BASE/v1/chat/completions")
echo "    HTTP $CODE"
python3 - <<'EOF'
import json
try:
    d = json.load(open('/tmp/v1chat.json'))
    ch = (d.get('choices') or [{}])[0]
    msg = ch.get('message') or {}
    content = msg.get('content') or ch.get('text') or ''
    print(f"    model={d.get('model')} finish={ch.get('finish_reason')} reply={content[:120]!r}")
except Exception as e:
    print('    parse fail:', e, open('/tmp/v1chat.json').read()[:300])
EOF
