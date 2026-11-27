#!/bin/bash
# reset-freellm-demo.sh — put the sidecar back to the pre-demo state:
# no zai custom models, no Z.AI/kilo/llm7 key rows. Used before recording the
# real-cases video so the UI flow starts from scratch, exactly like the API
# dry-run did (scripts/real-cases-freellm.sh section 0b).
set -uo pipefail
B=http://127.0.0.1:3000
JAR=/tmp/reset-demo.jar
OUT=/tmp/reset-demo.json
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
AUTH="Authorization: Bearer $TOKEN"

# custom CHAT model rows (all platform=custom rows, not just zai-*)
curl -s -m 20 "$B/freellmapi/api/models" -H "$AUTH" -o "$OUT"
node -e '
const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const arr=Array.isArray(m)?m:(m.models||m.data||[]);
const rows=arr.filter(x=>x.platform==="custom");
console.log(rows.length? "custom chat rows to remove: "+rows.map(x=>x.modelId).join(", "):"no custom chat rows");
require("fs").writeFileSync("/tmp/reset-modelids.txt", rows.map(x=>x.id).join("\n")+"\n");
' "$OUT"
while read -r MID; do [ -n "$MID" ] && curl -s -X DELETE "$B/freellmapi/api/models/custom/$MID" -H "$AUTH" -o /dev/null; done < /tmp/reset-modelids.txt

# custom MEDIA model rows (tts/asr/image live in a separate table)
curl -s -m 20 "$B/freellmapi/api/media" -H "$AUTH" -o "$OUT"
node -e '
const m=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const arr=Array.isArray(m)?m:(m.models||m.data||m.media||[]);
const rows=(Array.isArray(arr)?arr:[]).filter(x=>x.platform==="custom"&&String(x.modelId||x.model||x.id).includes("zai"));
console.log(rows.length? "custom media rows to remove: "+rows.map(x=>x.modelId||x.model).join(", "):"no custom media rows");
require("fs").writeFileSync("/tmp/reset-mediaids.txt", rows.map(x=>x.id).join("\n")+"\n");
' "$OUT"
while read -r MID; do [ -n "$MID" ] && curl -s -X DELETE "$B/freellmapi/api/media/custom/$MID" -H "$AUTH" -o /dev/null; done < /tmp/reset-mediaids.txt

curl -s -m 10 "$B/freellmapi/api/keys" -H "$AUTH" -o "$OUT"
node -e '
const k=JSON.parse(require("fs").readFileSync(process.argv[1],"utf8"));
const arr=Array.isArray(k)?k:(k.keys||[]);
const stale=arr.filter(x=>String(x.baseUrl||"").includes("ollama2.space-z.ai")||["kilo","llm7"].includes(x.platform));
console.log(stale.length? "key rows to remove: "+stale.map(x=>`#${x.id} ${x.platform}`).join(", "):"no key rows");
require("fs").writeFileSync("/tmp/reset-keyids.txt", stale.map(x=>x.id).join("\n")+"\n");
' "$OUT"
while read -r KID; do [ -n "$KID" ] && curl -s -X DELETE "$B/freellmapi/api/keys/$KID" -H "$AUTH" -o /dev/null; done < /tmp/reset-keyids.txt

echo "✓ demo state reset (fresh start for recording)"
