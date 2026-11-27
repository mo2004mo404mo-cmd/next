#!/bin/bash
# check-freellm-state.sh — snapshot of the freellm sidecar state through the
# MedQ proxy: auth status, keys, catalog size, unified key, llm7/kilo/custom
# model counts. Pure curl + node -pe (no bun needed).
set -uo pipefail
B=http://127.0.0.1:3000
JAR=/tmp/freellm-state.jar
OUT=/tmp/freellm-state.json
rm -f "$JAR" "$OUT"

echo "── sidecar auth status (fresh DB? needsSetup?)"
curl -s -m 8 http://127.0.0.1:3002/api/auth/status | head -c 300; echo

echo "── MedQ login (NextAuth credentials)"
CSRF=$(curl -s -c "$JAR" "$B/api/auth/csrf" | node -pe 'JSON.parse(require("fs").readFileSync(0,"utf8")).csrfToken')
curl -s -b "$JAR" -c "$JAR" -X POST "$B/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=admin@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$B/" -o /dev/null -w "   login http %{http_code}\n"

TOKEN=$(curl -s -b "$JAR" -X POST "$B/api/freellmapi-bridge" | node -pe 'try{JSON.parse(require("fs").readFileSync(0,"utf8")).token||""}catch(e){""}')
if [ -z "$TOKEN" ]; then echo "   ✗ bridge failed"; exit 1; fi
echo "   ✓ bridge token (${#TOKEN} chars)"
AUTH="Authorization: Bearer $TOKEN"
echo "$TOKEN" > /tmp/freellm-token.txt

echo "── keys currently stored"
curl -s -m 10 "$B/freellmapi/api/keys" -H "$AUTH" -o "$OUT"
node -pe 'const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(k)?k:(k.keys||[]); arr.length===0?"   (none — empty sidecar)":arr.map(x=>`#${x.id} ${x.platform}${x.baseUrl?" → "+x.baseUrl:""} (${(x.models||[]).length} models) enabled=${x.enabled}`).join("\n   ")' "$OUT"

echo "── catalog models"
curl -s -m 20 "$B/freellmapi/api/models" -H "$AUTH" -o "$OUT"
node -pe 'const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(m)?m:(m.models||m.data||[]); const by={}; for(const x of arr) by[x.platform]=(by[x.platform]||0)+1; `   total=${arr.length} | custom=${by.custom||0} | llm7=${by.llm7||0} | kilo=${by.kilo||0}`' "$OUT"
node -pe 'const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); const arr=Array.isArray(m)?m:(m.models||m.data||[]); const l=arr.filter(x=>x.platform==="llm7").slice(0,8).map(x=>x.modelId||x.id); l.length?`   llm7 sample: ${l.join(", ")}`:""' "$OUT"

echo "── unified API key"
curl -s -m 10 "$B/freellmapi/api/settings/api-key" -H "$AUTH" -o "$OUT"
node -pe 'const r=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8")); r.apiKey?`   ✓ ${r.apiKey.slice(0,8)}… (${r.apiKey.length} chars)`:JSON.stringify(r).slice(0,200)' "$OUT"
