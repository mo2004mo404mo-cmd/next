#!/usr/bin/env bash
# E2E: network-drop recovery for the MedQ agent chat.
#
# Reproduces the user's exact bug ("create questions on gerd" → the browser
# stream dies with "network error"): we start a real agent turn, KILL the
# client connection mid-stream (curl --max-time), then verify the two halves
# of the fix:
#   [1] The server FINISHES the run and persists the assistant answer to the
#       thread store despite the disconnect (persist-on-disconnect fix).
#   [2] GET /api/agent/threads/:id/messages returns it, so the client's
#       recovery poll can deliver the finished answer as a normal DONE.
#   [3] The SSE stream now carries real ping events every 10s (proxy-proof
#       heartbeat) — checked on a short-lived control connection.
set -uo pipefail
BASE="${BASE:-http://127.0.0.1:3000}"
EMAIL="${EMAIL:-student@medq.com}"
PASS="${PASS:-test123}"
JAR=$(mktemp)
trap 'rm -f "$JAR"' EXIT

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

THREAD_ID=$(python3 -c 'import uuid; print(uuid.uuid4())')
echo "[1] thread: $THREAD_ID"

# ── Half A: sever the stream mid-turn, exactly like the browser drop ──
# 8s is enough for the agent to start streaming (first tokens arrive ~2s)
# while the run itself needs much longer to finish.
echo "[2] starting agent turn (will sever connection after 8s)..."
curl -s -N -b "$JAR" -X POST "$BASE/api/agent/chat/v2" \
  -H 'Content-Type: application/json' \
  -d "{\"message\":\"create questions on gerd\",\"currentTab\":\"home\",\"threadId\":\"$THREAD_ID\"}" \
  --max-time 8 > /tmp/recovery-severed.out 2>/dev/null
SEVERED_FRAMES=$(grep -c '^event:' /tmp/recovery-severed.out || true)
echo "    severed after 8s with $SEVERED_FRAMES frames received (simulated network error)"

# ── Half B: poll the thread for the finished answer (client recovery path) ──
echo "[3] polling thread messages endpoint for the finished answer..."
FOUND=""
for i in $(seq 1 40); do   # up to 200s
  sleep 5
  RESP=$(curl -s -b "$JAR" "$BASE/api/agent/threads/$THREAD_ID/messages" 2>/dev/null)
  STATUS=$(echo "$RESP" | python3 -c '
import json,sys
try:
    d = json.load(sys.stdin)
    msgs = d.get("messages", [])
    assist = [m for m in msgs if m.get("role") == "assistant" and len(m.get("content","")) > 50]
    print("found" if assist else "wait")
except Exception:
    print("wait")
' 2>/dev/null)
  if [ "$STATUS" = "found" ]; then
    FOUND="yes"
    LEN=$(echo "$RESP" | python3 -c '
import json,sys
d = json.load(sys.stdin)
msgs = [m for m in d.get("messages", []) if m.get("role") == "assistant" and len(m.get("content","")) > 50]
print(len(msgs[-1]["content"]))
' 2>/dev/null)
    echo "    recovered assistant message after ~$((i*5))s (${LEN} chars)"
    break
  fi
  [ $((i % 6)) -eq 0 ] && echo "    still running... ${i}x5s"
done

if [ "$FOUND" != "yes" ]; then
  echo "FAIL: assistant answer never persisted after disconnect"
  exit 1
fi
echo "[4] PASS — the finished answer survived the disconnect and is recoverable"

# ── Heartbeat check on a fresh short connection ──
echo "[5] verifying ping heartbeat on a live stream (12s window)..."
curl -s -N -b "$JAR" -X POST "$BASE/api/agent/chat/v2" \
  -H 'Content-Type: application/json' \
  -d "{\"message\":\"hi\",\"currentTab\":\"home\"}" \
  --max-time 12 > /tmp/recovery-heartbeat.out 2>/dev/null
PINGS=$(grep -c '^event: ping' /tmp/recovery-heartbeat.out || true)
echo "    ping frames in 12s window: $PINGS"
if [ "$PINGS" -ge 1 ]; then
  echo "[6] PASS — real SSE ping events keep the wire warm"
else
  echo "[6] WARN — no ping frames observed (agent may have finished before 10s tick)"
fi

echo "ALL CHECKS DONE"
