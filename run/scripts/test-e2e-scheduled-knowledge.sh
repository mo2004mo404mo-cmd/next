#!/bin/bash
# E2E test: scheduled agent jobs + knowledge upload (three new features).
#
# 1. Login as student
# 2. POST /api/agent/tasks — one-shot job firing in ~25s with a generation prompt
# 3. Poll the AgentJob row until done (worker processes it) → check Notification + saved question
# 4. POST /api/knowledge/upload (multipart .md file) → check sourceId + chunks + status ready
set -uo pipefail

BASE="http://localhost:3000"
JAR="/home/z/my-project/tmp/e2e3-cookies.txt"
mkdir -p /home/z/my-project/tmp
rm -f "$JAR"

echo "── 1. Login as student@medq.com ──"
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | sed 's/.*"csrfToken":"\([^"]*\)".*/\1/')
curl -s -o /dev/null -b "$JAR" -c "$JAR" \
  -X POST "$BASE/api/auth/callback/credentials" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/dashboard"
curl -s -b "$JAR" "$BASE/api/auth/session" | head -c 50; echo

echo ""
echo "── 2. Create one-shot scheduled job (fires in ~25s) ──"
RUN_AT=$(date -u -d "+25 seconds" +%Y-%m-%dT%H:%M:%SZ)
CREATE=$(curl -s -b "$JAR" -X POST "$BASE/api/agent/tasks" \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"E2E Cushing test\",\"prompt\":\"Generate exactly 1 easy MCQ about Cushing syndrome and save it to my question bank with the run_question_generation_agent tool.\",\"runAt\":\"$RUN_AT\",\"timezone\":\"UTC\"}")
echo "$CREATE" | head -c 300; echo
TASK_ID=$(echo "$CREATE" | sed 's/.*"task":{"id":"\([^"]*\)".*/\1/')
echo "task id: $TASK_ID"

echo ""
echo "── 3. Verify task list endpoint ──"
curl -s -b "$JAR" "$BASE/api/agent/tasks" | head -c 300; echo

echo ""
echo "── 4. Knowledge upload (multipart) ──"
cat > /tmp/e2e-lecture.md << 'EOF'
# Adrenal Cortex Physiology

The adrenal cortex has three zones: zona glomerulosa (aldosterone), zona fasciculata (cortisol),
and zona reticularis (androgens). Cortisol follows a diurnal rhythm, peaks at 8 AM, and is
released under ACTH control from the anterior pituitary. Cushing syndrome results from chronic
glucocorticoid excess: central obesity, moon facies, buffalo hump, purple striae, hypertension,
and hyperglycemia. The dexamethasone suppression test distinguishes ACTH-dependent causes.
Conn syndrome (primary hyperaldosteronism) causes resistant hypertension with hypokalemia and
metabolic alkalosis. Addison disease is primary adrenal insufficiency: fatigue, hyperpigmentation,
hyponatremia, hyperkalemia, and low cortisol with HIGH ACTH.
EOF
UP=$(curl -s -b "$JAR" -X POST "$BASE/api/knowledge/upload" \
  -F "file=@/tmp/e2e-lecture.md;type=text/markdown" \
  -F "origin=e2e")
echo "$UP" | head -c 300; echo
SOURCE_ID=$(echo "$UP" | sed 's/.*"sourceId":"\([^"]*\)".*/\1/')
echo "source id: $SOURCE_ID"

echo ""
echo "── 5. Wait for the scheduled job to fire + run (tick 15s + agent run) ──"
for i in $(seq 1 40); do
  sleep 10
  STATUS=$(bun -e "
const {SQL} = require('bun');
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const j = await db\`SELECT id, status, progress, \"lastError\" FROM \"AgentJob\" ORDER BY \"createdAt\" DESC LIMIT 1\`;
const n = await db\`SELECT id, title FROM \"Notification\" WHERE type='system' ORDER BY \"createdAt\" DESC LIMIT 1\`;
const q = await db\`SELECT id, topic FROM \"Question\" WHERE topic ILIKE '%cushing%' ORDER BY \"createdAt\" DESC LIMIT 1\`;
console.log(JSON.stringify({job: j[0] ?? null, notif: n[0] ? {title: n[0].title} : null, question: q[0] ? {topic: q[0].topic} : null}));
db.close();" 2>/dev/null)
  echo "[$((i*10))s] $STATUS"
  if echo "$STATUS" | grep -q '"status":"done"'; then
    if echo "$STATUS" | grep -q '"question":{"topic"'; then break; fi
    # job done but question might still be saving; check once more then break
    sleep 10
    break
  fi
done

echo ""
echo "── 6. Final DB state ──"
bun -e "
const {SQL} = require('bun');
const db = new SQL('postgresql://postgres:postgres@localhost:5432/nextapp');
const jobs = await db\`SELECT id, kind, status, progress, attempts FROM \"AgentJob\" ORDER BY \"createdAt\" DESC LIMIT 3\`;
const tasks = await db\`SELECT name, status, \"lastRunAt\", \"nextRunAt\" FROM \"AgentScheduledTask\" ORDER BY \"createdAt\" DESC LIMIT 3\`;
const notifs = await db\`SELECT title, LEFT(message, 120) AS msg FROM \"Notification\" WHERE type='system' ORDER BY \"createdAt\" DESC LIMIT 2\`;
const ks = await db\`SELECT name, status FROM \"KnowledgeSource\" ORDER BY \"createdAt\" DESC LIMIT 2\`;
const kc = await db\`SELECT COUNT(*)::int AS c FROM \"KnowledgeChunk\" WHERE \"sourceId\"='\${'${SOURCE_ID}'}'\`;
console.log('JOBS:', JSON.stringify(jobs));
console.log('TASKS:', JSON.stringify(tasks));
console.log('NOTIFS:', JSON.stringify(notifs));
console.log('SOURCES:', JSON.stringify(ks));
console.log('CHUNKS for uploaded source:', JSON.stringify(kc));
db.close();" 2>/dev/null
