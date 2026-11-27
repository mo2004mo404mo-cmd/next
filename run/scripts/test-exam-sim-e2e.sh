#!/bin/bash
# E2E: Exam Simulator API flow (Task 47, Feature 6)
#   login → start exam → verify no answer-key leak → submit answers → verify
#   score report (band, perOrgan, perTask, results with explanations) → history
set -uo pipefail
cd /home/z/my-project

BASE="http://127.0.0.1:3000"
COOKIES="tmp/exam-sim-e2e-cookies.txt"
rm -f "$COOKIES"

echo "== [1] login =="
CSRF=$(curl -s -c "$COOKIES" "$BASE/api/auth/csrf" | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
curl -s -b "$COOKIES" -c "$COOKIES" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "csrfToken=$CSRF" \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode "password=test123" \
  --data-urlencode "callbackUrl=$BASE/" -o /dev/null
SESSION_OK=$(curl -s -b "$COOKIES" "$BASE/api/auth/session" | python3 -c 'import sys,json;d=json.load(sys.stdin);print("yes" if d.get("user",{}).get("email")=="student@medq.com" else "no")')
echo "   logged in: $SESSION_OK"
[ "$SESSION_OK" = "yes" ] || { echo "FAIL: login"; exit 1; }

echo "== [2] start 20-question exam =="
START_JSON=$(curl -s -b "$COOKIES" -X POST "$BASE/api/exam-sim/start" \
  -H 'Content-Type: application/json' -d '{"count":20,"durationMinutes":30}')
echo "$START_JSON" > tmp/exam-sim-start.json
python3 - <<'EOF'
import json
d = json.load(open('tmp/exam-sim-start.json'))
qs = d.get('questions', [])
print(f"   examId: {d.get('examId')}")
print(f"   count:  {d.get('count')}  duration: {d.get('durationMinutes')}min")
print(f"   blueprint: {list(d.get('blueprintBreakdown', {}).items())[:4]}")
leak = [q for q in qs if q.get('answer') or q.get('explanation')]
print(f"   answer-key leak during exam: {'NONE' if not leak else f'FAIL: {len(leak)}'}")
optless = [q for q in qs if not q.get('options')]
print(f"   questions with options: {len(qs)-len(optless)}/{len(qs)}")
assert d.get('examId'), 'no examId'
assert len(qs) >= 5, 'too few questions'
assert not leak, 'ANSWER KEY LEAKED to client during exam'
open('tmp/exam-sim-ids.txt','w').write(json.dumps({'examId': d['examId'], 'questions': [{'id': q['id'], 'options': q['options'], 'type': q.get('type')} for q in qs]}))
EOF
[ $? -eq 0 ] || { echo "FAIL: start"; exit 1; }

echo "== [3] submit answers =="
python3 - <<'EOF'
import json, random
random.seed(47)
d = json.load(open('tmp/exam-sim-ids.txt'))
answers = {}
for q in d['questions']:
    opts = q['options'] if isinstance(q['options'], list) else []
    if opts:
        answers[q['id']] = random.choice(opts)   # random answers → realistic score band
    else:
        answers[q['id']] = 'True'
json.dump({'examId': d['examId'], 'answers': answers}, open('tmp/exam-sim-submit.json','w'))
print(f"   answered {len(answers)}/{len(d['questions'])}")
EOF
EXAM_ID=$(python3 -c 'import json;print(json.load(open("tmp/exam-sim-submit.json"))["examId"])')
SUBMIT_JSON=$(curl -s -b "$COOKIES" -X POST "$BASE/api/exam-sim/$EXAM_ID/submit" \
  -H 'Content-Type: application/json' -d "$(python3 -c 'import json;print(json.dumps({"answers":json.load(open("tmp/exam-sim-submit.json"))["answers"]}))')")
echo "$SUBMIT_JSON" > tmp/exam-sim-report.json
python3 - <<'EOF'
import json
r = json.load(open('tmp/exam-sim-report.json'))
print(f"   score:   {r.get('score')}/{r.get('total')}  ({r.get('percentage')}%)")
print(f"   band:    {r.get('band')}")
print(f"   perOrgan rows: {len(r.get('perOrgan', []))}  weakest: {r['perOrgan'][0] if r.get('perOrgan') else None}")
print(f"   perTask rows:  {len(r.get('perTask', []))}")
results = r.get('results', [])
with_exp = [x for x in results if x.get('question') and x['question'].get('explanation')]
print(f"   results with full question+explanation for review: {len(with_exp)}/{len(results)}")
assert r.get('total', 0) >= 5, 'report missing total'
assert r.get('band'), 'report missing band'
assert r.get('perOrgan') is not None, 'report missing perOrgan breakdown'
assert len(with_exp) == len(results), 'review rows missing explanations'
EOF
[ $? -eq 0 ] || { echo "FAIL: submit/report"; exit 1; }

echo "== [4] history =="
curl -s -b "$COOKIES" "$BASE/api/exam-sim/history" | python3 -c '
import sys, json
h = json.load(sys.stdin).get("attempts", [])
print(f"   attempts recorded: {len(h)}  latest: {h[0][\"score\"]}/{h[0][\"totalQuestions\"]} ({h[0][\"percentage\"]:.1f}%)" if h else "   none recorded")
assert h, "no attempts in history"
'

echo ""
echo "RESULT: EXAM-SIM API E2E PASSED"
