# MedQ — Restore & Run Guide

Full-stack medical education platform: Next.js 16 + React 19 + Tailwind 4 +
shadcn/ui + Prisma 7 (PostgreSQL, 124 tables) + unified LLM layer
(Ollama / OpenAI / Anthropic / Google / ZAI / 20+ providers).

## Quick start

```bash
# 1. Install dependencies
bun install

# 2. Point .env at a PostgreSQL database (any Postgres 14+ works)
#    DATABASE_URL="postgresql://postgres:postgres@127.0.0.1:5432/nextapp"
#    (the shipped .env has a sanitized dev config; create the DB first)

# 3. Create the schema (124 tables)
bunx prisma generate
bunx prisma db push

# 4. (optional but recommended) restore the full data backup:
#    users, seeded questions, flashcards, chats, imported question bank
psql "$DATABASE_URL" -f db/medq-backup-20261008.sql

# 5. Run
bun run dev        # http://localhost:3000  (dev mode — hot reload)

# or, recommended for small servers (4GB): production mode
bash scripts/build-prod.sh    # webpack build tuned for low-memory boxes
bash scripts/restart-prod.sh  # `next start -p 3000`, ~450MB steady RAM
```

> Note: this backup intentionally excludes `src/generated` (the Prisma
> client — step 3's `bunx prisma generate` recreates it) and `node_modules`
> (`bun install` recreates it).

## Demo accounts (after restoring the backup)

| Role     | Email                | Password |
| -------- | -------------------- | -------- |
| Student  | student@medq.com     | test123  |
| Educator | educator@medq.com    | test123  |
| Admin    | admin@medq.com       | test123  |

Without the backup restore, the app auto-creates a guest account on first
request and works fine — question bank import, AI generation, flashcards and
study groups are all functional with a guest session.

## AI providers

Out of the box the app auto-detects: local Ollama (keyless) → any provider
API key in `.env` → ZAI. To use a specific provider set e.g.:

```
DEFAULT_MODEL=openai:gpt-4o-mini
OPENAI_API_KEY=sk-...
```

All 20+ providers and their env vars are listed in `.env`. The unified layer
(`src/lib/ai/`) handles routing, thinking modes, retries and fallbacks.

### Multi-endpoint BYOK (several keys / base URLs per provider)

Settings → AI Providers lets a user save **multiple endpoints for the same
provider** — e.g. the remote `https://ollama2.space-z.ai` from `.env` *plus*
a local Ollama at `http://localhost:11434` on the same server, or two
OpenAI keys. Each endpoint is a (key + base URL + label) row that can be
tested, enabled/disabled, reordered and deleted individually.

- **Round-robin**: consecutive requests spread across enabled endpoints
  (ordered by priority — drag with the ↑ / ↓ buttons).
- **Failover**: if an endpoint fails (down, refused, bad key), the call
  transparently retries on the next endpoint before surfacing the error.
- **Endpoint pairing**: an endpoint's key and base URL always travel
  together — the remote gateway's key is never sent to your local server.
- **Keyless endpoints**: Ollama / Lemonade endpoints can be a base URL only.

> **Self-hosted note** — pointing an endpoint at `localhost` / a private
> address requires `ALLOW_LOCAL_NETWORKS=true` in `.env` (the SSRF guard
> otherwise blocks local targets in production builds). The shipped `.env`
> already sets this; remove it only for public multi-tenant deployments.

### AI explanations for the whole bank

Question Bank → **AI Explanations** (or select questions → **Explain** in
the bulk bar) batch-generates rich teaching notes for every question that
lacks one: *why the correct answer is right* (mechanism), *why each other
option is wrong*, *key pearls*, and a *one-line takeaway* — rendered as
formatted notes on the question card. The job is resumable (rate-limited
passes pause and auto-resume; every batch's writes are durable), never
overwrites existing explanations unless you tick *Replace existing
explanations*, and honestly reports what couldn't be generated.

## Highlighted features

- **Question Bank** — 33 seeded clinical MCQs + file import
- **Import questions from a file** (Question Bank → Import):
  - JSON / CSV → parsed directly, no AI needed
  - TXT / MD / DOCX / PDF / pasted text → AI extraction (chunked, background
    job with progress polling, provider fallback, duplicate protection)
  - re-importing the same file is safe — duplicates are skipped automatically
- **AI question generation** — multi-stage agent pipeline with model routing
- **Flashcards** (SM-2 spaced repetition), **QOTD**, **exam simulator**
- **Study groups + chat**, **RAG knowledge library** (YouTube / Drive / URL /
  audio ingestion with transcripts)
- **BYOK** — users can plug in their own provider keys from the UI — several
  endpoints per provider with round-robin load balancing and automatic
  failover
- **AI explanations** — bank-wide or selected-question teaching-note
  generation (resumable, quality-gated at ≥400 chars, rendered as formatted
  notes)

## Project layout

```
src/app/          Next.js routes (pages + 200+ API routes)
src/components/   UI (shadcn/ui + medq feature components)
src/lib/ai/       unified LLM layer (providers, routing, thinking, fallback)
src/lib/agent/    generation pipeline + knowledge ingestion (RAG)
prisma/           schema + seeds
db/               medq-backup-*.sql — full data backup (see Quick start #4)
scripts/          dev/ops scripts (postgres setup, db dump, warmup, e2e)
```

## Troubleshooting

- **No AI provider configured** — the app shows a setup guide; simplest path:
  run Ollama locally (`ollama pull llama3.3`) or set one API key in `.env`.
- **Large file import takes minutes** — that's the chunked AI extraction
  working; keep the modal open, progress is shown live.
- **Port 3000 busy** — `bun run dev -- -p 3001`.

## Data backup / restore

Regenerate a fresh backup any time:

```bash
bun scripts/dump-db.ts > db/medq-backup-$(date +%Y%m%d).sql
```

Restore into a schema-created DB (see Quick start #3-4). The dump uses
`json_populate_record` for exact type fidelity and resets all sequences.

## FreeLLM API — the AI Router (EMBEDDED, `freellmapi/`)

The complete [freellmapi](https://github.com/tashfeenahmed/freellmapi) clone
powers the **FreeLLM API · BYOK** tab (dashboard at `/freellmapi`, OpenAI-compatible
endpoint at `/v1/*`). Since 2026-10-21 it runs **inside the Next.js process**
(#MEDQ-embedded): instrumentation boots its Express app on an ephemeral loopback
port, so there is ONE app, ONE process and ONE public port (3000) — nothing to
start separately. Full instructions: **`freellmapi/SETUP.md`**. Short version:

```bash
cd freellmapi
npm install --no-audit --no-fund
VITE_BASE=/freellmapi/ npm run build -w client
npm run build -w server
printf 'ENCRYPTION_KEY=%s\nPORT=3002\nHOST=127.0.0.1\nNODE_ENV=production\n' \
  "$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")" > .env
cd ..   # done — the router boots with the Next.js app (scripts/restart-prod.sh)
```

Critical: `freellmapi/.env`'s `ENCRYPTION_KEY` encrypts every provider key in
`freellmapi/server/data/freeapi.db`. Back both up together; never rotate the
key on a DB that already has keys (they become undecryptable). The delivery
zip ships neither the key nor the DB — first visit lands on freellmapi's own
sign-up screen (loopback installs need no setup code; the MedQ bridge
auto-claims it for signed-in users). Optional standalone mode for debugging:
`bash scripts/start-freellmapi.sh` (port 3002; the app falls back to it when
no embedded router is running).
