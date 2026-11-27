#!/usr/bin/env node
/**
 * Migrate freellmapi api_keys from the ORIGINAL author's ENCRYPTION_KEY to the
 * current FRESH key (per-row, mixed-state aware — the stock rotation script is
 * all-or-nothing and cannot handle a DB where some rows are already new-key).
 *
 * For every api_keys row:
 *   - decrypt with ORIGINAL key  -> re-encrypt with FRESH key -> UPDATE
 *   - decrypt with FRESH key only -> already migrated, skip
 *   - neither decrypts           -> abort transaction, nothing written
 *
 * All writes in ONE transaction with a 10s busy timeout (router holds the DB
 * in WAL mode; the pass runs every 5 min, a 8-row UPDATE takes milliseconds).
 */
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = '/home/z/my-project/freellmapi';
const Database = require(path.join(root, 'node_modules/better-sqlite3'));

const DB_PATH = path.join(root, 'server/data/freeapi.db');
const db = new Database(DB_PATH, { timeout: 10000 });
db.pragma('busy_timeout = 10000');

const freshHex = fs.readFileSync(path.join(root, '.env'), 'utf8').match(/^ENCRYPTION_KEY=([0-9a-fA-F]+)$/m)[1];
const origHex = fs.readFileSync('/home/z/my-project/scripts/original-encryption-key.txt', 'utf8').trim();
const freshKey = Buffer.from(freshHex, 'hex');
const origKey = Buffer.from(origHex, 'hex');

function decryptWith(key, enc, iv, tag) {
  const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'), { authTagLength: 16 });
  d.setAuthTag(Buffer.from(tag, 'hex'));
  return Buffer.concat([d.update(Buffer.from(enc, 'hex')), d.final()]).toString('utf8');
}
function encryptWith(key, text) {
  const iv = crypto.randomBytes(16);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  let enc = c.update(text, 'utf8', 'hex');
  enc += c.final('hex');
  return { encrypted: enc, iv: iv.toString('hex'), authTag: c.getAuthTag().toString('hex') };
}

const rows = db.prepare('SELECT id, platform, label, base_url, encrypted_key, iv, auth_tag FROM api_keys WHERE encrypted_key IS NOT NULL ORDER BY id').all();
const migrated = [], skipped = [], failures = [];

for (const r of rows) {
  let pt = null, via = null;
  try { pt = decryptWith(origKey, r.encrypted_key, r.iv, r.auth_tag); via = 'orig'; }
  catch { try { pt = decryptWith(freshKey, r.encrypted_key, r.iv, r.auth_tag); via = 'fresh'; } catch { via = 'none'; } }
  if (via === 'orig') migrated.push({ ...r, pt });
  else if (via === 'fresh') skipped.push(r.id);
  else failures.push(r.id);
}

if (failures.length) {
  console.error(`ABORT — rows undecryptable under BOTH keys: ${failures.join(', ')}. Nothing written.`);
  process.exit(1);
}

console.log(`Rows: ${rows.length} total | to-migrate(orig->fresh): ${migrated.length} | already-fresh: ${skipped.length}`);
for (const m of migrated) {
  const show = m.pt.length <= 18 ? m.pt : m.pt.slice(0, 10) + '…' + m.pt.slice(-4) + ` (${m.pt.length}ch)`;
  console.log(`  key ${String(m.id).padStart(2)} [${m.platform}] ${(m.base_url || 'default').slice(0, 42)} -> plaintext: ${show}`);
}

const apply = db.transaction(() => {
  const upd = db.prepare('UPDATE api_keys SET encrypted_key = ?, iv = ?, auth_tag = ? WHERE id = ?');
  for (const m of migrated) {
    const re = encryptWith(freshKey, m.pt);
    upd.run(re.encrypted, re.iv, re.authTag, m.id);
  }
});
apply();
console.log(`\nDONE — re-encrypted ${migrated.length} row(s) under the current ENCRYPTION_KEY.`);

// Post-verification: every row must now decrypt with the FRESH key.
const bad = [];
for (const r of db.prepare('SELECT id, encrypted_key, iv, auth_tag FROM api_keys WHERE encrypted_key IS NOT NULL').all()) {
  try { decryptWith(freshKey, r.encrypted_key, r.iv, r.auth_tag); } catch { bad.push(r.id); }
}
console.log(bad.length ? `VERIFY FAILED for rows: ${bad.join(', ')}` : 'VERIFY OK — all api_keys rows decrypt under the current ENCRYPTION_KEY.');
db.close();
process.exit(bad.length ? 1 : 0);
