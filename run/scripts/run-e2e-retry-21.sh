#!/bin/bash
# Retry driver — the shared ASR quota swings open/closed minute-to-minute.
# Re-runs the E2E until it passes or attempts run out (pipefail: a failing
# bunx run must fail the pipeline even when grep still prints lines).
set -o pipefail
cd /home/z/my-project
for i in $(seq 1 14); do
  echo "=== E2E attempt $i ($(date -u +%T)) ==="
  if bunx tsx scripts/test-audio-e2e-21.ts 2>&1 | grep -vE "^    at |node_modules|injected env"; then
    echo "=== E2E PASSED (attempt $i) ==="
    exit 0
  fi
  echo "=== attempt $i failed, cooling down 75s ==="
  sleep 75
done
echo "=== E2E still failing after 14 attempts ==="
exit 1
