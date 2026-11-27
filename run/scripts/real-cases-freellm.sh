#!/bin/bash
# real-cases-freellm.sh — REAL end-to-end cases in freellm. No guide, no mocks:
# every call below hits the live sidecar through MedQ :3000, exactly the way
# the dashboard does it, and every provider/model/chat is real.
#
#   CASE 1  add a built-in provider with NO key   (Kilo Gateway, keyless)
#   CASE 2  add a built-in provider, anonymous    (LLM7.io, free tier)
#   CASE 3  add a CUSTOM provider                 (Z.AI gateway at ollama2.space-z.ai)
#   CASE 4  discover models on that endpoint      (real /v1/models call)
#   CASE 5  register the discovered models
#   CASE 6  add a custom model BY HAND            (typed, not discovered)
#   CASE 7  test a model                          (health probe)
#   CASE 8  USE them                              (real chats through the router)
#
# Idempotent: re-running first removes the rows these cases create.
set -uo pipefail
B=http://127.0.0.1:3000
JAR=/tmp/real-cases.jar
OUT=/tmp/real-cases.json
ZAI_URL=https://ollama2.space-z.ai/v1

jqn() { node -pe "try{ $1 }catch(e){ 'ERR '+e.message }" < "$OUT" 2>/dev/null; }

echo "═══ 0. login (MedQ session → sidecar bridge token) ═══"
rm -f "$JAR"
CSRF=$(curl -s -c "$JAR" "$B/api/auth/csrf" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).csrfToken')
curl -s -b "$JAR" -c "$JAR" -X POST "$B/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=admin@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$B/" -o /dev/null
TOKEN=$(curl -s -b "$JAR" -X POST "$B/api/freellmapi-bridge" | node -pe 'try{JSON.parse(require("fs").readFileSync(0,"utf8")).token||""}catch(e){""}')
[ -z "$TOKEN" ] && { echo "✗ bridge failed"; exit 1; }
echo "✓ bridge token OK"
AUTH="Authorization: Bearer $TOKEN"
CT='Content-Type: application/json'

echo "═══ 0b. clean slate (remove rows from a previous run of this demo) ═══"
# custom model rows first (they would collide with "add by hand" otherwise)
curl -s -m 20 "$B/freellmapi/api/models" -H "$AUTH" -o "$OUT"
node -e '
const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const arr=Array.isArray(m)?m:(m.models||m.data||[]);
const rows=arr.filter(x=>x.platform==="custom"&&String(x.modelId).startsWith("zai-"));
console.log(rows.length? "   removing custom model rows: "+rows.map(x=>`#${x.id} ${x.modelId}`).join(", "):"   no custom model rows to remove");
require("fs").writeFileSync("/tmp/real-cases-modelids.txt", rows.map(x=>x.id).join("\n")+"\n");
' "$OUT"
while read -r MID; do [ -n "$MID" ] && curl -s -X DELETE "$B/freellmapi/api/models/custom/$MID" -H "$AUTH" -o /dev/null; done < /tmp/real-cases-modelids.txt
# then the key rows
curl -s -m 10 "$B/freellmapi/api/keys" -H "$AUTH" -o "$OUT"
node -e '
const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const arr=Array.isArray(k)?k:(k.keys||[]);
const stale=arr.filter(x=>String(x.baseUrl||"").includes("ollama2.space-z.ai")||["kilo","llm7"].includes(x.platform));
console.log(stale.length? "   removing: "+stale.map(x=>`#${x.id} ${x.platform}`).join(", "):"   nothing to remove");
require("fs").writeFileSync("/tmp/real-cases-stale.txt", stale.map(x=>x.id).join("\n")+"\n");
' "$OUT"
while read -r ID; do [ -n "$ID" ] && curl -s -X DELETE "$B/freellmapi/api/keys/$ID" -H "$AUTH" -o /dev/null; done < /tmp/real-cases-stale.txt

echo "═══ CASE 1 — add a BUILT-IN provider, no key needed (Kilo Gateway) ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/keys" -H "$AUTH" -H "$CT" \
  -d '{"platform":"kilo","label":"Kilo Gateway (free, no key)"}' -o "$OUT"
echo "   response: $(head -c 220 "$OUT"; echo)"
curl -s -m 10 "$B/freellmapi/api/keys" -H "$AUTH" -o "$OUT"
node -pe 'const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(k)?k:(k.keys||[]); const row=arr.find(x=>x.platform==="kilo"); row?`✓ kilo row #${row.id} stored, enabled=${row.enabled}`:"✗ kilo row NOT found"' "$OUT"

echo "═══ CASE 2 — add a second BUILT-IN provider (LLM7.io, anonymous free) ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/keys" -H "$AUTH" -H "$CT" \
  -d '{"platform":"llm7","key":"no-key","label":"LLM7 (anonymous free tier)"}' -o "$OUT"
echo "   response: $(head -c 220 "$OUT"; echo)"
curl -s -m 10 "$B/freellmapi/api/keys" -H "$AUTH" -o "$OUT"
node -pe 'const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(k)?k:(k.keys||[]); const row=arr.find(x=>x.platform==="llm7"); row?`✓ llm7 row #${row.id} stored, enabled=${row.enabled}`:"✗ llm7 row NOT found"' "$OUT"

echo "═══ CASE 3 — add a CUSTOM provider (the real Z.AI gateway) ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/keys/custom" -H "$AUTH" -H "$CT" \
  -d "{\"baseUrl\":\"$ZAI_URL\",\"label\":\"Z.AI Gateway (ollama2)\",\"models\":[\"zai-llm\"]}" -o "$OUT"
echo "   response: $(head -c 260 "$OUT"; echo)"
CUSTOM_KEY_ID=$(jqn 'JSON.stringify(JSON.parse(require("fs").readFileSync(0,"utf8")).keyId)')
echo "   custom endpoint keyId = $CUSTOM_KEY_ID"

echo "═══ CASE 4 — DISCOVER models on the custom endpoint ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/keys/custom/discover-models" -H "$AUTH" -H "$CT" \
  -d "{\"baseUrl\":\"$ZAI_URL\"}" -o "$OUT"
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); `✓ found ${r.total} models: ${r.models.map(m=>m.id+(m.registered?" ✓reg":"")).join(", ")}`' "$OUT"

echo "═══ CASE 5 — REGISTER the discovered models (6 service models) ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/keys/custom" -H "$AUTH" -H "$CT" \
  -d "{\"baseUrl\":\"$ZAI_URL\",\"models\":[\"zai-web-search\",\"zai-web-reader\",\"zai-tts\",\"zai-asr\",\"zai-image-gen\",\"zai-image-edit\"]}" -o "$OUT"
echo "   response: $(head -c 260 "$OUT"; echo)"

echo "═══ CASE 6 — add a custom model BY HAND (typed, not from discovery) ═══"
curl -s -m 30 -X POST "$B/freellmapi/api/models" -H "$AUTH" -H "$CT" \
  -d "{\"platform\":\"custom\",\"modelId\":\"zai-vision\",\"displayName\":\"Z.AI Vision\",\"keyId\":$CUSTOM_KEY_ID,\"supportsVision\":true}" -o "$OUT"
echo "   response: $(head -c 260 "$OUT"; echo)"

echo "═══ what the Models page shows now ═══"
curl -s -m 20 "$B/freellmapi/api/models" -H "$AUTH" -o "$OUT"
node -pe 'const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(m)?m:(m.models||m.data||[]); const c=arr.filter(x=>x.platform==="custom"); `✓ catalog total=${arr.length} | custom rows=${c.length}: ${c.map(x=>x.modelId).join(", ")}`' "$OUT"
VISION_DB_ID=$(jqn '(JSON.parse(require("fs").readFileSync(0,"utf8")).find(x=>x.platform==="custom"&&x.modelId==="zai-vision")||{}).id')
echo "   zai-vision db id = $VISION_DB_ID"

echo "═══ CASE 7 — TEST the manually added model (health probe) ═══"
if [ -n "$VISION_DB_ID" ] && [ "$VISION_DB_ID" != "undefined" ]; then
  curl -s -m 60 -X POST "$B/freellmapi/api/models/$VISION_DB_ID/test" -H "$AUTH" -H "$CT" -d '{}' -o "$OUT"
  echo "   response: $(head -c 300 "$OUT"; echo)"
fi

echo "═══ CASE 8 — USE them: real chats through the router (/v1, unified key) ═══"
UKEY=$(curl -s -m 10 "$B/freellmapi/api/settings/api-key" -H "$AUTH" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).apiKey||""')
echo "   unified key: ${UKEY:0:8}…"

echo "   ── 8a. chat via the CUSTOM provider model (zai-llm) ──"
curl -s -m 90 -X POST "$B/v1/chat/completions" -H "Authorization: Bearer $UKEY" -H "$CT" \
  -d '{"model":"zai-llm","messages":[{"role":"user","content":"Reply with exactly: CUSTOM-PROVIDER-WORKS"}],"max_tokens":30}' -o "$OUT"
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); r.choices?`✓ zai-llm answered: "${r.choices[0].message.content.slice(0,120).trim()}"`:`   upstream said: ${JSON.stringify(r).slice(0,180)}`' "$OUT"

echo "   ── 8b. chat via the BUILT-IN kilo keyless model ──"
curl -s -m 90 -X POST "$B/v1/chat/completions" -H "Authorization: Bearer $UKEY" -H "$CT" \
  -d '{"model":"liquid/lfm-2.5-2.6b:free","messages":[{"role":"user","content":"Reply with exactly: KILO-BUILT-IN-WORKS"}],"max_tokens":40}' -o "$OUT"
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); r.choices?`✓ kilo answered: "${String(r.choices[0].message.content||"").slice(0,120).trim()}"`:`   upstream said: ${JSON.stringify(r).slice(0,180)}`' "$OUT"

echo "   ── 8c. chat via the BUILT-IN llm7 model ──"
curl -s -m 90 -X POST "$B/v1/chat/completions" -H "Authorization: Bearer $UKEY" -H "$CT" \
  -d '{"model":"mistral-Nemo-Instruct-2407","messages":[{"role":"user","content":"Reply with exactly: LLM7-BUILT-IN-WORKS"}],"max_tokens":30}' -o "$OUT"
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); r.choices?`✓ llm7 answered: "${r.choices[0].message.content.slice(0,120).trim()}"`:`   upstream said: ${JSON.stringify(r).slice(0,180)}`' "$OUT"

echo "   ── 8d. streaming (SSE) through the same door ──"
curl -s -m 90 -N -X POST "$B/v1/chat/completions" -H "Authorization: Bearer $UKEY" -H "$CT" \
  -d '{"model":"mistral-Nemo-Instruct-2407","messages":[{"role":"user","content":"Count from one to five, digits only, comma separated."}],"max_tokens":40,"stream":true}' | head -c 500; echo

echo "═══ MedQ link: the router models inside MedQ itself ═══"
curl -s -m 15 -b "$JAR" "$B/api/providers" -o "$OUT"
node -e '
const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const s=JSON.stringify(r);
console.log(s.includes("medq-router")? "✓ medq-router provider visible to MedQ (models in MedQ model pickers)": "✗ medq-router not found");
' "$OUT"

echo "═══ final state ═══"
bash /home/z/my-project/scripts/check-freellm-state.sh 2>/dev/null | grep -E "^(#|   (total|✓))" | head -8
echo "═══ DONE — all real cases executed ═══"
