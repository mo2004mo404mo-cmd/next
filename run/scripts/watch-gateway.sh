#!/bin/bash
# Watch for ZAI gateway recovery; write status file when recovered
KEY=$(python3 -c "import json;print(json.load(open('/etc/.z-ai-config'))['apiKey'])")
OUT=/home/z/my-project/tmp/gateway-status.txt
for i in $(seq 1 240); do
  R=$(curl -s --max-time 45 https://internal-api.z.ai/v1/chat/completions \
    -H "Content-Type: application/json" -H "Authorization: Bearer $KEY" \
    -d '{"model":"zai-llm","messages":[{"role":"user","content":"Say OK"}],"max_tokens":10}' 2>/dev/null | head -c 200)
  TS=$(date +%H:%M:%S)
  if echo "$R" | grep -q '"content"'; then
    echo "RECOVERED at $TS: $R" >> $OUT
    exit 0
  else
    echo "attempt $i ($TS): $R" >> $OUT
  fi
  sleep 45
done
echo "GAVE UP after 240 attempts" >> $OUT
