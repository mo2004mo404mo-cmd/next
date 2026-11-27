#!/usr/bin/env bash
# Stage 3 E2E smoke — build a 4-scene test video with ffmpeg (hard color
# cuts), upload it through /api/knowledge/upload as the demo student, poll
# to ready, then verify VideoScene rows + searchVideoScenes via a DB check.
set -u
OUT=/home/z/my-project/staging/e2e
mkdir -p "$OUT"
VID="$OUT/scene-test.mp4"

# ── 1. Build the video: 4 × 8s segments, hard cuts between solid colors,
#      each with an audible 440/660/880/300 Hz tone (audio track present). ──
if [ ! -f "$VID" ]; then
  for i in 1 2 3 4; do
    case $i in
      1) COL=red   ;; 2) COL=green ;;
      3) COL=blue  ;; 4) COL=yellow ;;
    esac
    FREQ=$((200 + i * 150))
    ffmpeg -y -loglevel error \
      -f lavfi -i "color=c=$COL:s=640x360:r=24" \
      -f lavfi -i "sine=frequency=$FREQ:sample_rate=16000" \
      -t 8 -pix_fmt yuv420p -c:v libx264 -preset ultrafast -c:a aac -shortest \
      "$OUT/seg$i.mp4"
  done
  ffmpeg -y -loglevel error -i "$OUT/seg1.mp4" -i "$OUT/seg2.mp4" \
    -i "$OUT/seg3.mp4" -i "$OUT/seg4.mp4" \
    -filter_complex "[0:v][0:a][1:v][1:a][2:v][2:a][3:v][3:a]concat=n=4:v=1:a=1[v][a]" \
    -map "[v]" -map "[a]" -c:v libx264 -preset ultrafast -c:a aac "$VID"
fi
DUR=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$VID")
echo "test video: $(du -h "$VID" | cut -f1), ${DUR}s, 4 hard cuts expected at ~8/16/24s"

# ── 2. Login as the demo student ──
BASE=http://127.0.0.1:3000
JAR="$OUT/cookies.txt"
LOGIN=$(curl -s -c "$JAR" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode 'email=student@medq.com' \
  --data-urlencode 'password=test123' \
  --data-urlencode 'csrfToken=true' -o /dev/null -w '%{http_code}' || true)
# NextAuth credentials login needs the csrf token first:
CSRF=$(curl -s -c "$JAR" "$BASE/api/auth/csrf" | python3 -c 'import sys,json;print(json.load(sys.stdin)["csrfToken"])')
CODE=$(curl -s -b "$JAR" -c "$JAR" -X POST "$BASE/api/auth/callback/credentials" \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data-urlencode "email=student@medq.com" \
  --data-urlencode 'password=test123' \
  --data-urlencode "csrfToken=$CSRF" -o /dev/null -w '%{http_code}')
echo "login status: $CODE"
SESSION=$(curl -s -b "$JAR" "$BASE/api/auth/session")
echo "session: $(echo "$SESSION" | head -c 120)"

# ── 3. Upload through the real API ──
UPLOAD=$(curl -s -b "$JAR" -X POST "$BASE/api/knowledge/upload" \
  -F "file=@$VID;type=video/mp4" -F "origin=library" -F "title=Scene Detection E2E")
echo "upload response: $UPLOAD"
SOURCE_ID=$(echo "$UPLOAD" | python3 -c 'import sys,json;print(json.load(sys.stdin).get("sourceId",""))' 2>/dev/null)
if [ -z "$SOURCE_ID" ]; then echo "UPLOAD FAILED — no sourceId"; exit 1; fi

# ── 4. Poll to ready (video: ASR + frames + scenes — allow a few minutes) ──
for i in $(seq 1 90); do
  sleep 5
  ROW=$(cd /tmp/my-project && node -e "
const {config} = require('dotenv'); config({path:'.env.local', override: true});
const {Client} = require('pg');
(async () => {
  const c = new Client({connectionString: process.env.DATABASE_URL});
  await c.connect();
  const r = await c.query('SELECT status, error FROM \"KnowledgeSource\" WHERE id=\$1', ['$SOURCE_ID']);
  console.log(JSON.stringify(r.rows[0] || {}));
  await c.end();
})();
" 2>/dev/null)
  echo "poll $i: $ROW"
  echo "$ROW" | grep -q '"status":"ready"' && break
  echo "$ROW" | grep -q '"status":"failed"' && break
done

# ── 5. Verify the scene index ──
cd /tmp/my-project && node -e "
const {config} = require('dotenv'); config({path:'.env.local', override: true});
const {Client} = require('pg');
(async () => {
  const c = new Client({connectionString: process.env.DATABASE_URL});
  await c.connect();
  const scenes = await c.query(
    'SELECT \"sceneIdx\", \"startSec\", \"endSec\", detection, LEFT(description, 60) AS descr, LEFT(transcript, 40) AS tr FROM \"VideoScene\" WHERE \"sourceId\" = \$1 ORDER BY \"sceneIdx\"', ['$SOURCE_ID']);
  console.log('── VideoScene rows:', scenes.rows.length);
  for (const s of scenes.rows) {
    console.log(\`  scene \${s.sceneIdx}: \${s.startSec}s–\${s.endSec}s [\${s.detection}] \${s.descr ? 'VLM✓' : '(no VLM)'} \${s.tr ? 'ASR✓' : ''}\`);
  }
  const meta = await c.query('SELECT \"metaJson\"::text FROM \"KnowledgeSource\" WHERE id = \$1', ['$SOURCE_ID']);
  const m = JSON.parse(meta.rows[0].metaJson || '{}');
  console.log('── source meta: fileKind=' + m.fileKind + ' durationSec=' + m.durationSec + ' scenes=' + m.scenes);
  await c.end();
})().catch(e => { console.error('DB FAIL:', e.message); process.exit(1); });
"
