// Task 29 — one-time capability backfill for already-registered custom models.
// Probes each enabled custom endpoint's /v1/models (the same source the daily
// sync uses) and stores the upstream-declared `capability` on every models row
// of that endpoint. Idempotent; adds the column if the server hasn't migrated
// yet (the migration's hasColumn check then no-ops on startup).
import { createDecipheriv } from 'node:crypto';
import { createRequire } from 'node:module';
import fs from 'node:fs';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');

const env = fs.readFileSync('freellmapi/.env', 'utf8');
const ENCRYPTION_KEY = /ENCRYPTION_KEY=(\w+)/.exec(env)?.[1];
const keyBuf = Buffer.from(ENCRYPTION_KEY, 'hex');

function decryptKey(row) {
  try {
    const d = createDecipheriv('aes-256-gcm', keyBuf, Buffer.from(row.iv, 'hex'));
    d.setAuthTag(Buffer.from(row.auth_tag, 'hex'));
    return Buffer.concat([d.update(Buffer.from(row.encrypted_key, 'hex')), d.final()]).toString('utf8');
  } catch {
    return null;
  }
}

const db = new Database('freellmapi/server/data/freeapi.db');
db.pragma('busy_timeout = 4000');

const cols = db.prepare('PRAGMA table_info(models)').all().map(c => c.name);
if (!cols.includes('upstream_capability')) {
  db.prepare('ALTER TABLE models ADD COLUMN upstream_capability TEXT').run();
  console.log('added models.upstream_capability column');
}

// Known-good fallback for gateways that answer /models without capability
// metadata (only applied to ids we have verified against these gateways).
const VERIFIED_FALLBACK = {
  'zai-llm': 'chat', 'zai-vision': 'vision', 'zai-tts': 'tts', 'zai-asr': 'asr',
  'zai-image-gen': 'image-gen', 'zai-image-edit': 'image-edit',
  'zai-web-search': 'web-search', 'zai-web-reader': 'web-reader',
  'zai-glm-4-plus': 'chat', 'zai-glm-4v-plus': 'vision',
};

const endpoints = db.prepare("SELECT DISTINCT k.base_url, k.id AS key_id FROM api_keys k WHERE k.platform='custom' AND k.enabled=1 AND k.base_url IS NOT NULL").all();
for (const ep of endpoints) {
  ep.scope = ep.base_url.replace(/\/$/, '');        // models.endpoint_scope is the stored (raw) base
  // Match the discovery convention: a base_url without /v1 still serves /v1/models.
  ep.probeUrl = /\/v1$/.test(ep.scope) ? ep.scope : `${ep.scope}/v1`;
}
console.log(`probing ${endpoints.length} custom endpoint(s)`);

const update = db.prepare('UPDATE models SET upstream_capability = ? WHERE platform=\'custom\' AND model_id = ? AND endpoint_scope = ?');
let totalUpdated = 0;

for (const ep of endpoints) {
  const keyRow = db.prepare('SELECT * FROM api_keys WHERE id = ?').get(ep.key_id);
  const secret = decryptKey(keyRow);
  const headers = { 'Content-Type': 'application/json' };
  // 'no-key' sentinel (#1331) → anonymous call, no Authorization header.
  if (secret && secret !== 'no-key') headers.Authorization = `Bearer ${secret}`;
  let payload = null;
  try {
    const res = await fetch(`${ep.probeUrl}/models`, { headers, signal: AbortSignal.timeout(20000) });
    payload = await res.json();
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
  } catch (e) {
    console.log(`  ${ep.probeUrl}: probe failed (${e.message}) — applying verified fallback map`);
    payload = null;
  }
  const declared = new Map();
  if (payload && Array.isArray(payload.data)) {
    for (const m of payload.data) {
      if (m && typeof m.id === 'string' && typeof m.capability === 'string') {
        declared.set(m.id, m.capability.trim().toLowerCase());
      }
    }
    console.log(`  ${ep.base_url}: ${declared.size} capability labels from live /models`);
  }
  const scope = ep.scope;
  const rows = db.prepare("SELECT model_id FROM models WHERE platform='custom' AND endpoint_scope = ?").all(scope);
  for (const r of rows) {
    const cap = declared.get(r.model_id) ?? VERIFIED_FALLBACK[r.model_id];
    if (cap) {
      update.run(cap, r.model_id, scope);
      totalUpdated++;
    } else {
      console.log(`  ! no capability for ${r.model_id} @ ${scope} — left NULL (treated chat-capable)`);
    }
  }
}

console.log(`updated ${totalUpdated} rows`);
const check = db.prepare("SELECT model_id, endpoint_scope, upstream_capability FROM models WHERE platform='custom' ORDER BY endpoint_scope, model_id").all();
for (const c of check) console.log(`  ${c.model_id}  cap=${c.upstream_capability}  scope=${c.endpoint_scope}`);
db.close();
