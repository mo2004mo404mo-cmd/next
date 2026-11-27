#!/bin/bash
# Warm exam-sim-related routes sequentially (one compile at a time to avoid OOM).
cd /home/z/my-project

warm_get() {
  local route="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 150 "http://127.0.0.1:3000$route")
  echo "GET  $code  $route"
  sleep 3
}

warm_post() {
  local route="$1"
  local body="$2"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 150 "http://127.0.0.1:3000$route" -X POST -H 'Content-Type: application/json' -d "$body")
  echo "POST $code  $route"
  sleep 3
}

warm_get "/api/auth/session"
warm_get "/api/questions?limit=3"
warm_get "/api/dashboard"
warm_get "/api/exam-sim/history"
warm_get "/bank"
warm_get "/exam/take"
free -m | head -2
