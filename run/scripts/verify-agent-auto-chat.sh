#!/usr/bin/env bash
# E2E: floating assistant "Auto" mode after the MEDQ_AGENT_API_KEY restore +
# 'auto' normalization fix.
#   [1] POST /api/agent/chat/v2 with NO model field (picker "Auto" omits it)
#   [2] POST /api/agent/chat/v2 with model:"auto" (defense-in-depth path)
# Both must stream a meta event (model zai-llm via the FreeLLM router) and
# real tokens, with no error event.
set -uo pipefail
BASE="${BASE:-http://127.0.0.1:3000}"
EMAIL="${EMAIL:-student@medq.com}"
PASS="${PASS:-test123}"
JAR=$(mktemp)

CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | python3 -c 'import json,sys; print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=$EMAIL" \
  --data-urlencode "password=$PASS" \
  --data-urlencode "redirect=/api/auth/session" -o /dev/null
WHO=$(curl -s -b "$JAR" "$BASE/api/auth/session" | python3 -c 'import json,sys; d=json.load(sys.stdin); print(d.get("user",{}).get("email",""))' 2>/dev/null)
echo "[0] login: $WHO"
[ -n "$WHO" ] || { echo "FAIL: no session"; exit 1; }

run_turn() {
  local label="$1" body="$2" out="/tmp/chatv2-$3.out"
  curl -s -N -b "$JAR" -X POST "$BASE/api/agent/chat/v2" \
    -H 'Content-Type: application/json' -d "$body" > "$out"
  local meta=$(rg -o '"model":"[^"]+"' "$out" | head -1)
  local tokens=$(rg -c 'event: text.delta' "$out" 2>/dev/null || echo 0)
  local err=$(rg -o 'event: error.*' "$out" | head -1)
  local done=$(rg -c 'event: done' "$out" 2>/dev/null || echo 0)
  echo "[$label] meta=$meta text.delta_frames=$tokens done=$done ${err:+ERROR=$err}"
  # first streamed words
  rg -o '"text":"[^"]{1,60}' "$out" | head -1 | sed 's/^/    first tokens: /'
}

run_turn "1 no-model (Auto)" '{"message":"hi","currentTab":"home"}' nomodel
run_turn "2 model=auto"      '{"message":"hi","model":"auto","currentTab":"home"}' auto
rm -f "$JAR"
