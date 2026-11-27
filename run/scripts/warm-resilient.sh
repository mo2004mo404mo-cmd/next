#!/bin/bash
# Resilient route warmer: warms routes ONE at a time; if the dev server gets
# OOM-killed mid-compile, relaunches it (turbopack persistent cache makes
# previously-compiled routes fast) and retries the route.
cd /home/z/my-project

ROUTES=(
  "GET /api/exam-sim/history|"
  "GET /exam/take|"
  "GET /api/questions?limit=3|"
  "GET /api/agent/tasks|"
)

ensure_server() {
  if curl -s -o /dev/null --max-time 8 http://127.0.0.1:3000/ 2>/dev/null; then
    return 0
  fi
  echo "  [relaunch] server down — restarting..."
  pkill -f "next dev -p 3000" 2>/dev/null
  pkill -f "next-server" 2>/dev/null
  sleep 3
  ( setsid bash -c 'bash .zscripts/dev.sh > .zscripts/dev.log 2>&1' & )
  for i in $(seq 1 12); do
    if curl -s -o /dev/null --max-time 100 http://127.0.0.1:3000/ 2>/dev/null; then
      echo "  [relaunch] server up (probe #$i)"
      sleep 8
      return 0
    fi
    sleep 15
  done
  echo "  [relaunch] FAILED"
  return 1
}

for entry in "${ROUTES[@]}"; do
  method="${entry%%|*}"
  route="${entry#*|}"
  for attempt in 1 2 3; do
    ensure_server || break
    if [ "$method" = "GET" ]; then
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 150 "http://127.0.0.1:3000$route")
    else
      code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 150 "http://127.0.0.1:3000$route" -X POST -H 'Content-Type: application/json' -d '{}')
    fi
    echo "attempt $attempt: $method $code $route"
    if [ "$code" != "000" ]; then
      break  # route answered (any HTTP code means it compiled)
    fi
    sleep 5
  done
  sleep 10
done

echo "--- final ---"
curl -s -o /dev/null -w "root: %{http_code}\n" --max-time 30 http://127.0.0.1:3000/
free -m | head -2
