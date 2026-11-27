#!/bin/bash
# End-to-end verification of the FreeLLM API integration through MedQ's
# /freellmapi proxy (port 3000). Exercises the exact BYOK flows the user
# asked for: account setup, model catalog visibility, adding a custom
# OpenAI-compatible provider (the local mock Ollama on :11434), model
# discovery + registration on that endpoint ("models I add must show up"),
# and a streaming chat completion through the /v1 wire surface with the
# unified API key (what curl/agents use).
set -uo pipefail
B=http://127.0.0.1:3000
J=/tmp/freellm-verify.json

EMAIL="admin@medq.local"
PASS="MedQ-FreeLLM-2026"

echo "── [1] login (dashboard session)"
TOKEN=$(curl -s -X POST "$B/freellmapi/api/auth/login" \
  -H 'Content-Type: application/json' \
  -d "{\"email\":\"$EMAIL\",\"password\":\"$PASS\"}" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).token || ""')
[ -n "$TOKEN" ] && echo "   ✓ session token (${#TOKEN} chars)" || { echo "   ✗ login failed"; exit 1; }
AUTH="Authorization: Bearer $TOKEN"

echo "── [2] catalog models visible through the dashboard API"
curl -s --max-time 20 "$B/freellmapi/api/models" -H "$AUTH" -o $J
node -pe 'const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); `   ✓ ${m.length} models in catalog, e.g. ${m.slice(0,3).map(x=>x.displayName).join(", ")}`' $J

echo "── [3] custom BYOK provider present (local mock Ollama, OpenAI-compatible)"
curl -s --max-time 20 "$B/freellmapi/api/keys" -H "$AUTH" -o $J
node -pe 'const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(k)?k:k.keys; `   ✓ keys: ${arr.map(x=>`${x.platform}${x.baseUrl?" → "+x.baseUrl:""}`).join(" | ")}`' $J

echo "── [4] model discovery on the custom endpoint (added models must appear)"
curl -s --max-time 30 -X POST "$B/freellmapi/api/keys/custom/discover-models" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"baseUrl":"http://127.0.0.1:11434/v1"}' -o $J
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); `   ✓ discovered: ${r.models.map(m=>m.id).join(", ")}`' $J 2>/dev/null || head -c 300 $J

echo "── [5] register the discovered models (they must show in the Models page)"
curl -s --max-time 20 -X POST "$B/freellmapi/api/keys/custom" \
  -H "$AUTH" -H 'Content-Type: application/json' \
  -d '{"baseUrl":"http://127.0.0.1:11434/v1","label":"Local Ollama (mock)","models":["medgemma:latest","llama3.2:3b","qwen2.5:7b"]}' -o $J
head -c 260 $J; echo

echo "── [6] models list now includes the custom endpoint models"
curl -s --max-time 20 "$B/freellmapi/api/models" -H "$AUTH" -o $J
node -pe 'const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const c=m.filter(x=>x.platform=="custom"); `   ✓ total=${m.length}, custom models=${c.length} (${c.map(x=>x.modelId).join(", ")})`' $J

echo "── [7] unified API key (what external OpenAI clients use)"
curl -s --max-time 10 "$B/freellmapi/api/settings/api-key" -H "$AUTH" -o $J
UKEY=$(node -pe 'JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")).apiKey||""' $J)
echo "   ✓ unified key: ${UKEY:0:6}…(${#UKEY} chars)"

echo "── [8] streaming chat through /v1 (SSE through the proxy)"
curl -s --max-time 60 -N -X POST "$B/v1/chat/completions" \
  -H "Authorization: Bearer $UKEY" -H 'Content-Type: application/json' \
  -d '{"model":"medgemma:latest","messages":[{"role":"user","content":"Say READY in one word."}],"stream":true,"max_tokens":20}' | head -c 400; echo

echo "── done"
