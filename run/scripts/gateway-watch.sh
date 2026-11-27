#!/bin/bash
# Watch the z.ai inference gateway and log recovery. Runs ~2h, 5-min interval.
source /home/z/my-project/.env
for i in $(seq 1 24); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 30 "https://ollama2.space-z.ai/v1/chat/completions" \
    -H "Authorization: Bearer $OLLAMA_API_KEY" -H "Content-Type: application/json" \
    -d '{"model":"zai-llm","messages":[{"role":"user","content":"hi"}],"max_tokens":1}')
  echo "$(date -u +%H:%M:%SZ) gateway HTTP $code" >> /home/z/my-project/tmp/gateway-watch.log
  [ "$code" = "200" ] && { echo "$(date -u +%H:%M:%SZ) RECOVERED" >> /home/z/my-project/tmp/gateway-watch.log; break; }
  sleep 300
done
