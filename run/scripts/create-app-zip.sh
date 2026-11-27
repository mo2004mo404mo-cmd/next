#!/bin/bash
# create-app-zip.sh — package the MedQ app into a single restorable zip.
#
# Contents (PRIVATE backup — contains live secrets, do NOT redistribute):
#   - full source: src, prisma, scripts, public, lib, types, upload, configs
#   - .env (live secrets — needed to run the app as-is after restore)
#   - freellmapi/ (embedded AI router) incl. server/data/freeapi.db with the
#     encrypted provider keys + freellmapi/.env ENCRYPTION_KEY that unlocks
#     them
#   - fresh data backup: db/medq-backup-<today>.sql (via scripts/dump-db.ts)
#   - worklog.md + RESTORE.md (restore runbook + credentials trail)
#   - upload/file-store (retained user files referenced by saved questions)
#
# Excluded: node_modules at ANY depth (root: bun install; freellmapi: npm
# install), .next (rebuild), .git (scaffold-only history, 167MB, no app
# value), skills + tool-results (workspace tooling), tmp, download (zip
# destination), logs, old db/medq-backup-*.sql generations (only today's
# fresh dump ships — older ones stay on the server disk), public/*.zip
# (previously-served delivery zip), src/generated (Prisma client —
# `bunx prisma generate` recreates it), freeapi.db -wal/-shm scratch
# (freeapi.db is wal-checkpointed to a self-contained state before zipping).
#
# Usage: bash scripts/create-app-zip.sh
set -euo pipefail

cd /home/z/my-project
TODAY=$(date +%Y%m%d)
TSTAMP=$(date -u +%Y%m%d-%H%MZ)
DUMP="db/medq-backup-${TODAY}.sql"
ZIP="download/medq-app-backup-${TSTAMP}.zip"

mkdir -p download tmp

echo "── 0. Checkpoint router SQLite (make freeapi.db self-contained) ──"
if bun -e 'import { Database } from "bun:sqlite";
const db = new Database("freellmapi/server/data/freeapi.db");
db.exec("PRAGMA busy_timeout = 5000");
db.exec("PRAGMA wal_checkpoint(TRUNCATE)");
db.close();' 2>tmp/wal-ckpt.err; then
  echo "   checkpoint OK — wal flushed into freeapi.db"
else
  echo "   WARN: checkpoint busy — shipping db+wal+shm trio instead"
  head -3 tmp/wal-ckpt.err || true
fi
WALBYTES=$(stat -c %s freellmapi/server/data/freeapi.db-wal 2>/dev/null || echo 0)
SQLITE_SCRATCH=()
if [ "${WALBYTES}" = "0" ]; then
  SQLITE_SCRATCH=("freellmapi/server/data/freeapi.db-wal" "freellmapi/server/data/freeapi.db-shm")
fi

echo ""
echo "── 1. Fresh DB data backup → ${DUMP} ──"
OLD_COUNT=-1
if [ -f "${DUMP}" ]; then
  cp "${DUMP}" "tmp/medq-backup-${TODAY}.prezip.bak.sql"
  OLD_COUNT=$(grep -c '^INSERT' "${DUMP}" || true)
  echo "   overwriting existing dump (${OLD_COUNT} inserts) — safety copy in tmp/"
fi
# dump-db.ts writes the file itself via Bun.write(OUT) — do NOT redirect
# stdout to the same path: the redirect opens the file at offset 0 and the
# script's trailing console.log("wrote ...") lands there, clobbering the SQL
# header (observed: "wrote db/... 3257 rows\n)\n" replaced the first lines).
# Pass the path as argv instead; the status line goes to the terminal.
bun run scripts/dump-db.ts "${DUMP}"
NEW_COUNT=$(grep -c '^INSERT' "${DUMP}" || true)
echo "   $(du -h "${DUMP}" | cut -f1), ${NEW_COUNT} inserts"
if [ "${OLD_COUNT}" -gt 0 ] && [ "${NEW_COUNT}" -lt $((OLD_COUNT * 90 / 100)) ]; then
  echo "   FATAL: fresh dump lost >10% of rows — restoring safety copy, aborting"
  cp "tmp/medq-backup-${TODAY}.prezip.bak.sql" "${DUMP}"
  exit 1
fi

# old dump generations stay out of the zip — only the fresh one ships
OLD_DUMPS=()
for f in db/medq-backup-*.sql; do
  [ -f "${f}" ] || continue
  [ "${f}" = "${DUMP}" ] || OLD_DUMPS+=("${f}")
done

echo ""
echo "── 2. Zipping app ──"
rm -f "${ZIP}"
zip -r -q "${ZIP}" . \
  -x "node_modules/*" \
     "*/node_modules/*" \
     ".git/*" \
     "*/.git/*" \
     ".next/*" \
     "skills/*" \
     "tool-results/*" \
     "tmp/*" \
     "download/*" \
     "dev.log" \
     ".job-store.json" \
     "tsconfig.tsbuildinfo" \
     "next-env.d.ts" \
     "*.log" \
     ".zscripts/*" \
     "public/*.zip" \
     "src/generated/*" \
     ".env.example" \
     ${SQLITE_SCRATCH[@]+"${SQLITE_SCRATCH[@]}"} \
     ${OLD_DUMPS[@]+"${OLD_DUMPS[@]}"}

echo ""
echo "── 3. Verification ──"
# NOTE: do NOT pipe large listings into `grep -q` under `set -o pipefail` —
# grep -q exits at the first match, the upstream writer takes a SIGPIPE (141)
# and the whole pipeline reports failure (false "missing"). All checks below
# grep a listing FILE (no pipe) or use `grep -c`, which reads all input.
unzip -t "${ZIP}" > /dev/null && echo "   zip integrity OK"
LISTING="tmp/zip-names.txt"
unzip -Z1 "${ZIP}" > "${LISTING}"

BAD=$(grep -E 'node_modules/|(^|/)\.git/|^\.next/|^skills/|^tool-results/|^tmp/|^download/|^public/[^/]*\.zip$|freeapi\.db-(wal|shm)$' "${LISTING}" || true)
if [ -n "${BAD}" ]; then
  echo "   FAIL: forbidden entries leaked into the zip:"
  printf '%s\n' "${BAD}" | head -5
  exit 1
fi
echo "   no node_modules / .git / .next / old zips / sqlite scratch leaked"

SQLDUMPS=$(grep -E '^db/medq-backup-[^/]*\.sql$' "${LISTING}" || true)
SQLCOUNT=$(grep -c -E '^db/medq-backup-[^/]*\.sql$' "${LISTING}" || true)
if [ "${SQLCOUNT}" != "1" ] || [ "${SQLDUMPS}" != "${DUMP}" ]; then
  echo "   FAIL: expected exactly the fresh dump in db/, got: ${SQLDUMPS}"
  exit 1
fi
echo "   db/ ships exactly the fresh dump (${DUMP})"

MISSING=0
for must in \
  ".env" "RESTORE.md" "worklog.md" "package.json" "bun.lock" "tsconfig.json" \
  "next.config.ts" "prisma/schema.prisma" "prisma.config.ts" "Caddyfile" \
  "src/lib/ai/local-probes.ts" \
  "src/lib/agent/anti-fabrication.ts" \
  "src/lib/agent/clarification.ts" \
  "src/lib/agent/tools/ask-user.ts" \
  "src/lib/agent/deep-agent-runtime.ts" \
  "src/components/medq/ai-agent/useAgentV2Stream.ts" \
  "src/components/medq/ai-agent/AgentMarkdown.tsx" \
  "src/app/api/knowledge/upload/route.ts" \
  "src/app/api/agent/feedback/v2/route.ts" \
  "src/app/api/medq-agent/skills/route.ts" \
  "src/app/api/medq-agent/artifacts/[id]/route.ts" \
  "src/app/api/agent/threads/route.ts" \
  "scripts/test-cite-regex.mjs" \
  "scripts/build-prod.sh" "scripts/restart-prod.sh" \
  "scripts/dump-db.ts" "scripts/setup-postgres.sh" "scripts/create-app-zip.sh" \
  "public/sw.js" "public/offline.html" "public/offline-bank.html" \
  "public/manifest.json" \
  "src/components/medq/ServiceWorkerRegistrar.tsx" \
  "src/components/medq/usePushNotifications.ts" \
  "src/lib/offline-queue.ts" "src/lib/offline-response.ts" \
  "freellmapi/.env" "freellmapi/SETUP.md" \
  "freellmapi/server/data/freeapi.db" \
  "freellmapi/client/dist-freellm/index.html" \
  "${DUMP}"; do
  if ! grep -qx -F -- "${must}" "${LISTING}"; then
    echo "   FAIL: missing expected file: ${must}"
    MISSING=1
  fi
done
if [ "${MISSING}" = "1" ]; then
  exit 1
fi
echo "   all must-have files present (incl. local-probes.ts + router db)"

ENVC=$(unzip -p "${ZIP}" .env | grep -c '^NEXTAUTH_SECRET=..' || true)
if [ "${ENVC:-0}" -ge 1 ]; then
  echo "   .env: live secrets intact (private backup)"
else
  echo "   FAIL: .env secrets missing"; exit 1
fi
FENVC=$(unzip -p "${ZIP}" freellmapi/.env | grep -c '^ENCRYPTION_KEY=..' || true)
if [ "${FENVC:-0}" -ge 1 ]; then
  echo "   freellmapi/.env: ENCRYPTION_KEY intact"
else
  echo "   FAIL: freellmapi ENCRYPTION_KEY missing"; exit 1
fi
AGENTSRC="src/components/medq/ai-agent/useAgentV2Stream.ts"
AG=$(unzip -p "${ZIP}" "${AGENTSRC}" 2>/dev/null | grep -c 'waitForTurnUserMessage' || true)
if [ "${AG:-0}" -ge 1 ]; then
  echo "   502-recovery fix (waitForTurnUserMessage) present"
else
  echo "   WARN: waitForTurnUserMessage not found in ${AGENTSRC}"
fi
AMDSRC="src/components/medq/ai-agent/AgentMarkdown.tsx"
CIT=$(unzip -p "${ZIP}" "${AMDSRC}" 2>/dev/null | grep -c 'medq-cite' || true)
if [ "${CIT:-0}" -ge 1 ]; then
  echo "   citation-chip fix (medq-cite pipeline) present (${CIT} refs)"
else
  echo "   WARN: medq-cite not found in ${AMDSRC}"
fi
UPROUTE="src/app/api/knowledge/upload/route.ts"
UP=$(unzip -p "${ZIP}" "${UPROUTE}" 2>/dev/null | grep -c 'knowledge' || true)
if [ "${UP:-0}" -ge 1 ]; then
  echo "   capability-fix routes present (knowledge/upload verified)"
else
  echo "   WARN: knowledge/upload route empty or missing"
fi
SWSRC="public/sw.js"
SWV=$(unzip -p "${ZIP}" "${SWSRC}" 2>/dev/null | grep -c "SW_VERSION = 'v22'" || true)
SWPUSH=$(unzip -p "${ZIP}" "${SWSRC}" 2>/dev/null | grep -c 'pushsubscriptionchange' || true)
SWFETCH=$(unzip -p "${ZIP}" "${SWSRC}" 2>/dev/null | grep -c "addEventListener('fetch'" || true)
if [ "${SWV:-0}" -ge 1 ] && [ "${SWPUSH:-0}" -ge 1 ] && [ "${SWFETCH:-0}" -ge 1 ]; then
  echo "   sw.js v22 verified (offline fetch handler + push layer + SSE pass-through)"
else
  echo "   FAIL: sw.js is not the v22 offline+push+SSE-passthrough edition (v=${SWV} push=${SWPUSH} fetch=${SWFETCH})"; exit 1
fi
REGSRC="src/components/medq/ServiceWorkerRegistrar.tsx"
REGV=$(unzip -p "${ZIP}" "${REGSRC}" 2>/dev/null | grep -c "EXPECTED_SW_VERSION = 'v22'" || true)
REGSKIP=$(unzip -p "${ZIP}" "${REGSRC}" 2>/dev/null | grep -c "hostname.startsWith('preview-chat-')" || true)
if [ "${REGV:-0}" -ge 1 ] && [ "${REGSKIP:-0}" -eq 0 ]; then
  echo "   registrar v22 verified (preview-hostname skip removed)"
else
  echo "   FAIL: registrar not v22 or still contains preview-hostname skip"; exit 1
fi
PUSHHOOK="src/components/medq/usePushNotifications.ts"
PUSHGATE=$(unzip -p "${ZIP}" "${PUSHHOOK}" 2>/dev/null | grep -c "endsWith('\.space-z.ai')" || true)
if [ "${PUSHGATE:-0}" -eq 0 ]; then
  echo "   push hook verified (preview-domain gate removed)"
else
  echo "   FAIL: usePushNotifications still gates preview domains"; exit 1
fi
DUMPHEAD=$(unzip -p "${ZIP}" "${DUMP}" 2>/dev/null | head -c 500 || true)
case "${DUMPHEAD}" in
  *BEGIN*) echo "   data dump readable from inside the zip" ;;
  *) echo "   FAIL: data dump unreadable"; exit 1 ;;
esac
case "${DUMPHEAD}" in
  '-- MedQ'*) echo "   dump header clean (no stdout pollution)" ;;
  *) echo "   FAIL: dump head polluted — regenerate without stdout redirect"; exit 1 ;;
esac

echo ""
echo "── 4. Result ──"
ls -lh "${ZIP}"
ENTRIES=$(wc -l < "${LISTING}")
echo "entries: ${ENTRIES}"
echo ""
echo "Top-level contents:"
cut -d/ -f1 "${LISTING}" | sort -u | head -40 || true
echo ""
echo "NOTE: PRIVATE backup — .env + freeapi.db + worklog.md contain live secrets."
echo "      Restore guide: RESTORE.md inside the zip."
