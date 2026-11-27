# MedQ — Medical Question Generator

Full-stack medical education platform with embedded AI Router (FreeLLM API) for BYOK multi-provider LLM routing, video/image/audio generation, and a 124-table Prisma schema over PostgreSQL.

- **Frontend:** Next.js 16.3.3 + React 19 + Tailwind 4 + shadcn/ui
- **Backend:** Next.js API routes + embedded Express sidecar (FreeLLM API)
- **Database:** PostgreSQL 17.5 (embedded, user-space — no root required)
- **AI Router:** FreeLLM API 0.4.1 (in-process, embedded Express app on ephemeral loopback port)
- **LLM providers:** 20+ supported (OpenAI, Anthropic, Google, ZAI, Ollama, OpenRouter, SiliconFlow, Doubao, GLM, …)

---

## Quick start

```bash
# 1. Install dependencies
bun install                              # MedQ Next.js app
cd freellmapi && npm install --omit=optional && \
  npm install better-sqlite3 && \
  npm rebuild better-sqlite3 && cd ..     # FreeLLM API sidecar (incl. native SQLite)

# 2. Start embedded PostgreSQL (creates the cluster on first run)
bash scripts/setup-postgres.sh

# 3. Generate Prisma client + push schema to DB
bunx prisma generate
bunx prisma db push

# 4. Build the Next.js production bundle
bash scripts/build-prod.sh               # ~2 min on 4GB RAM, no OOM

# 5. Start the production server
bash scripts/restart-prod.sh             # http://localhost:3000

# Or: one-shot install
bash INSTALL.sh
```

The app boots on `http://localhost:3000` with the AI Router dashboard at `/freellmapi/` (or short URL `/freellm/`).

---

## What's in this archive

```
medq-app/
├── README.md                       ← this file
├── INSTALL.sh                      ← one-shot install script (runs steps 1–5)
├── RESTORE.md                      ← operator runbook (restore, demo accounts, providers)
├── Caddyfile                       ← reverse-proxy config (optional)
├── package.json                    ← MedQ Next.js app
├── bun.lock
├── next.config.ts
├── prisma/
│   └── schema.prisma               ← 124-table schema
├── public/                         ← static assets (logos, avatars)
├── scripts/                        ← bootstrap + ops scripts (portable: paths resolved from $0)
│   ├── setup-postgres.sh           ← embedded PG 17.5 init + start + create nextapp db
│   ├── build-prod.sh               ← next build --webpack --experimental-build-mode compile
│   ├── restart-prod.sh             ← next start -p 3000 (with health probes)
│   └── ...
├── src/                            ← MedQ Next.js source (instrumentation, routes, lib)
├── .next/                          ← prebuilt production bundle (skip next build entirely)
├── .pg-embed/                      ← embedded PostgreSQL binary + cluster data
│   ├── package.json                ← declares @embedded-postgres/linux-x64 dep
│   ├── create-db.mjs               ← creates the nextapp database
│   └── data/                       ← live PG cluster (PG_VERSION, base/, global/, ...)
├── .env                            ← sanitized dev config (DATABASE_URL, NEXTAUTH_SECRET, ...)
├── freellmapi/                     ← AI Router (embedded sidecar)
│   ├── .env                        ← ENCRYPTION_KEY, PORT=3002, HOST=127.0.0.1
│   ├── server/
│   │   ├── src/                    ← TypeScript source
│   │   ├── dist/                   ← compiled JavaScript (already built)
│   │   └── data/
│   │       ├── freeapi.db          ← SQLite (3 video models + 7 API keys already configured)
│   │       └── medq-bridge.json    ← MedQ-to-FreeLLM API bridge credentials
│   ├── client/
│   │   ├── src/                    ← TypeScript/React source for the dashboard
│   │   ├── dist/                   ← built /freellmapi/ bundle (VITE_BASE=/freellmapi/)
│   │   └── dist-freellm/           ← built /freellm/ bundle (VITE_BASE=/freellm/)
│   └── shared/types.ts
├── db/
│   └── medq-backup-20261026.sql    ← 1.8GB full data backup (optional restore — see RESTORE.md)
└── tmp/                            ← runtime logs (created on first start)
```

---

## Excluded from this archive

- `node_modules/` (every depth — recreated by `bun install` / `npm install`)
- `tmp/` runtime logs
- `.git/` version control
- `*.zip` nested archives

Everything else is included as-is.

---

## Demo accounts (after restoring the SQL backup)

| Role     | Email                | Password |
| -------- | -------------------- | -------- |
| Student  | student@medq.com     | test123  |
| Educator | educator@medq.com    | test123  |
| Admin    | admin@medq.com       | test123  |

Without the backup, the app auto-creates a guest account on first request — question bank import, AI generation, flashcards and study groups are all functional with a guest session.

To restore the SQL backup:
```bash
psql "postgresql://postgres:postgres@127.0.0.1:5432/nextapp" -f db/medq-backup-20261026.sql
```

---

## AI providers

Out of the box the app auto-detects: local Ollama (keyless) → any provider API key in `.env` → ZAI. To pin a specific provider:
```bash
DEFAULT_MODEL=openai:gpt-4o-mini
OPENAI_API_KEY=sk-...
```

All 20+ providers and their env vars are listed in `.env`. The unified layer (`src/lib/ai/`) handles routing, thinking modes, retries and fallbacks.

### BYOK (Bring Your Own Key) dashboard

Settings → AI Providers lets a user save **multiple endpoints for the same provider** — e.g. the remote `https://ollama2.space-z.ai` from `.env` *plus* a local Ollama at `http://localhost:11434`, or two OpenAI keys. Each endpoint is a (key + base URL + label) row that can be tested, enabled/disabled, reordered and deleted individually.

- **Round-robin**: consecutive requests spread across enabled endpoints
- **Failover**: if an endpoint fails, the call transparently retries on the next endpoint
- **Custom video providers**: the dashboard's Video tab supports custom OpenAI-compatible async video-generation endpoints (`POST /videos/generations` → poll `GET /videos/{id}` → download MP4). Three are already registered against your endpoint: `cogvideox-3`, `sora-2`, `sora-2-pro`.

---

## Embedded AI Router (FreeLLM API)

The AI Router runs **in-process** as part of the Next.js server (no separate sidecar process). It exposes:

- `/freellmapi/` and `/freellm/` — the BYOK dashboard (two pre-built client bundles)
- `/v1/chat/completions`, `/v1/models`, `/v1/embeddings`, `/v1/images/generations`, `/v1/videos/generations`, `/v1/audio/speech`, `/v1/audio/transcriptions` — OpenAI-compatible inference endpoints
- `/api/keys`, `/api/models`, `/api/fallback`, `/api/decisions/models`, `/api/media` — dashboard API

Auth bridge: a signed-in MedQ user gets a FreeLLMAPI dashboard session token minted server-side via `/api/freellmapi-bridge` — no second login required.

---

## Ports

| Port | What runs |
|------|-----------|
| 3000 | Next.js production server (MedQ app + embedded AI Router) |
| 5432 | Embedded PostgreSQL (loopback only) |

The AI Router has **no fixed TCP port of its own** — it binds an ephemeral loopback port (e.g. 127.0.0.1:45349) at boot, which is reverse-proxied through the MedQ origin on port 3000.

## MiroTalk calls and OSCE practice room

Direct chat calls, group calls, and the OSCE practice room use a separately hosted MiroTalk SFU instance. Configure these variables in the MedQ deployment:

```env
MIROTALK_URL=https://your-public-mirotalk-host
MIROTALK_API_URL=http://127.0.0.1:3010
MIROTALK_API_KEY_SECRET=your-mirotalk-api-key-secret
NEXT_PUBLIC_MIROTALK_URL=https://your-public-mirotalk-host
```

`MIROTALK_URL` is the public HTTPS base URL (not the `/api/v1/join` path). `MIROTALK_API_URL` optionally overrides the server-to-server API base URL; use a loopback URL when MedQ and MiroTalk run in the same sandbox. `NEXT_PUBLIC_MIROTALK_URL` must use the same origin as `MIROTALK_URL`; the browser uses it to validate meeting links. Calls open MiroTalk in a separate tab, so MiroTalk's `ALLOWED_EMBED_ORIGINS` setting is not required. The API secret must match MiroTalk's `api.keySecret` setting and must not use a `NEXT_PUBLIC_` prefix. Restart/rebuild MedQ after changing environment configuration.

MiroTalk must be publicly reachable by browsers: expose its HTTPS web/API endpoint and configure its WebRTC media ports (the upstream Docker template uses UDP 40000–40100). A reverse-proxied web endpoint alone is insufficient if the media path is blocked; Codespaces port forwarding does not provide the required UDP media connectivity. MiroTalk's `/api/v1/join` endpoint must be enabled and protected with the configured API secret.

The OSCE voice room keeps MedQ's browser speech recognition and AI patient active alongside MiroTalk. Speak to the AI patient in the MedQ tab; MiroTalk runs separately for a practice partner and screen sharing, and its audio is not forwarded to the AI. Spoken turns are transcribed into the OSCE encounter and included in its debrief; raw room audio is not recorded by MedQ.

The LiveKit integration has been retired. MedQ no longer provides its LiveKit-specific in-call AI voice agents, recordings, transcription/translation, moderation and waiting rooms, breakout rooms, in-call quizzes/scribe, or LiveKit ingress/egress and scheduling integrations. The MedQ Assistant remains available in text mode, including browser speech dictation where supported. MiroTalk's own product features are controlled by the MiroTalk deployment and are not integrated into MedQ's former LiveKit workflows.

---

## Troubleshooting

### Dev server OOM-killed on 4GB boxes

Use `scripts/build-prod.sh` + `scripts/restart-prod.sh` instead of `bun run dev`. The dev server (next-server) settles at ~3.2GB RSS after compiling the root SPA — right at the kernel's kill line. The production server is ~430MB steady state.

### `Cannot find package 'compression'` at startup

The FreeLLM API sidecar dependencies weren't installed. Run:
```bash
cd freellmapi && npm install --omit=optional && \
  npm install better-sqlite3 && \
  npm rebuild better-sqlite3
```

### `better-sqlite3 is not installed`

Same as above — install + rebuild the native binding.

### Embedded PostgreSQL fails to start with `libicui18n.so.60: cannot open shared object file`

Create the symlinks manually:
```bash
cd .pg-embed/node_modules/@embedded-postgres/linux-x64/native/lib
ln -sf libicudata.so.60.2 libicudata.so.60
ln -sf libicui18n.so.60.2 libicui18n.so.60
ln -sf libicuuc.so.60.2 libicuuc.so.60
```

### Dashboard crashes with `Cannot read properties of undefined (reading 'split')`

This was a bug in the FreeLLM API client when a custom provider had a model with `kind: 'video'`. The `CUSTOM_MODEL_KIND_LABEL` map in `freellmapi/client/src/components/keys/shared.tsx` was missing the `'video'` entry. The fix is included in this archive — both `dist/` and `dist-freellm/` bundles are rebuilt with the patch.

---

## License

Private. See `freellmapi/LICENSE` for the AI Router's license.

---

## Reference

- **Operator runbook:** `RESTORE.md`
- **Architecture deep-dive:** `freellmapi/docs/en/architecture/`
- **Worklog:** `worklog.md` (development history; not required for running the app)
