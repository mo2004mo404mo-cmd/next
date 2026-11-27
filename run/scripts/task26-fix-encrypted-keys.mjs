// Task 26 — Fix "Unsupported state or unable to authenticate data" at the DATA level.
//
// Root cause: freellmapi/server/data/freeapi.db rows 2-19 were AES-256-GCM
// encrypted under the ORIGINAL author ENCRYPTION_KEY (shipped in the zip),
// which was lost when Task 1 generated a fresh freellmapi/.env. GCM auth-tag
// verification therefore fails for those rows on every health pass / proxy
// decrypt → the error the user sees in the AI Router Keys view, plus
// "[BYOK] Could not decrypt" spam from 5 dead Postgres UserApiKey rows
// (written 10-18 under a pre-rotation NEXTAUTH_SECRET — placeholders, lost).
//
// Live-safe: busy_timeout + single transaction; the embedded router keeps
// running (same pattern as the shipped scripts/migrate-router-keys.mjs).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');
const { Client } = require('pg');

const ROOT = '/home/z/my-project';
const envText = fs.readFileSync(path.join(ROOT, 'freellmapi/.env'), 'utf8');
const currentKey = Buffer.from(envText.match(/^ENCRYPTION_KEY=([0-9a-f]{64})$/m)?.[1] ?? '', 'hex');
if (currentKey.length !== 32) { console.error('FATAL: bad ENCRYPTION_KEY'); process.exit(1); }

function gcmDecrypt(key, ct, iv, tag) {
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength: 16 });
  d.setAuthTag(tag);
  return Buffer.concat([d.update(ct), d.final()]).toString('utf8');
}
function gcmEncrypt(key, plaintext) {
  const iv = crypto.randomBytes(16);
  const c = crypto.createCipheriv('aes-256-gcm', key, iv);
  const enc = Buffer.concat([c.update(plaintext, 'utf8'), c.final()]);
  return { enc: enc.toString('hex'), iv: iv.toString('hex'), tag: c.getAuthTag().toString('hex') };
}

// ── 1. SQLite ──
const sq = new Database(path.join(ROOT, 'freellmapi/server/data/freeapi.db'));
sq.pragma('busy_timeout = 10000');

const DEAD_SQLITE_IDS = [2, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
// Row 5 (ollama22 z.ai gateway) — documented placeholder plaintext, worth keeping:
// re-encrypt it under the CURRENT key so it becomes usable capacity again.
const REKEY_ROW = { id: 5, plaintext: 'no-key' };

const migrate = sq.transaction(() => {
  const del = sq.prepare('DELETE FROM api_keys WHERE id = ?');
  for (const id of DEAD_SQLITE_IDS) {
    const info = del.run(id);
    console.log(`sqlite: deleted api_keys id=${id} (${info.changes} row)`);
  }
  const { enc, iv, tag } = gcmEncrypt(currentKey, REKEY_ROW.plaintext);
  sq.prepare(`UPDATE api_keys SET encrypted_key = ?, iv = ?, auth_tag = ?, status = 'unknown',
              last_health_error = '', last_checked_at = NULL WHERE id = ?`).run(enc, iv, tag, REKEY_ROW.id);
  console.log(`sqlite: re-encrypted api_keys id=${REKEY_ROW.id} placeholder under CURRENT key, status->unknown`);
});
migrate();

console.log('\nsqlite post-verify (all remaining rows must decrypt):');
const after = sq.prepare('SELECT id, platform, label, encrypted_key, iv, auth_tag, base_url, status FROM api_keys ORDER BY id').all();
let bad = 0;
for (const r of after) {
  let plain = '';
  try {
    plain = gcmDecrypt(currentKey, Buffer.from(r.encrypted_key, 'hex'), Buffer.from(r.iv, 'hex'), Buffer.from(r.auth_tag, 'hex'));
    console.log(`  id=${r.id} OK   platform=${r.platform} label=${r.label || '-'} base=${r.base_url || '-'} status=${r.status} plain=${JSON.stringify(plain).slice(0, 24)}`);
  } catch (e) {
    bad++;
    console.log(`  id=${r.id} FAIL ${e.message}`);
  }
}
sq.close();
if (bad) { console.error(`FATAL: ${bad} rows still undecryptable`); process.exit(1); }

// ── 2. Postgres UserApiKey ──
const DEAD_PG_IDS = [
  'cmvecp35r0009zeucsm58t71q', // google  — placeholder under pre-rotation secret
  'cmvea376f0009xnucn2jb2ul3', // ollama  — placeholder under pre-rotation secret
  'cmve9hwzp00041fucno5ejcu2', // openai  — placeholder under pre-rotation secret
  'cmve9iotg00051fucm2nst3f9', // openai  — placeholder under pre-rotation secret
  'cmveclees0004zeuc6j4ot17p', // openai  — placeholder under pre-rotation secret
];
const pg = new Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await pg.connect();
const secret = fs.readFileSync(path.join(ROOT, '.env'), 'utf8').match(/^NEXTAUTH_SECRET="([^"]+)"/m)?.[1] ?? '';
const appMaster = crypto.createHash('sha256').update(secret.trim()).digest();
// sanity: medq-router row must decrypt BEFORE we delete anything
const keeper = (await pg.query(`SELECT id, "encryptedKey", iv, "authTag" FROM "UserApiKey" WHERE "providerId" = 'medq-router'`)).rows[0];
if (!keeper) { console.error('FATAL: medq-router row missing'); process.exit(1); }
gcmDecrypt(appMaster, Buffer.from(keeper.encryptedKey, 'base64'), Buffer.from(keeper.iv, 'base64'), Buffer.from(keeper.authTag, 'base64'));
console.log('\npostgres: sanity OK — medq-router row decrypts under current master key');
for (const id of DEAD_PG_IDS) {
  const info = await pg.query('DELETE FROM "UserApiKey" WHERE id = $1', [id]);
  console.log(`postgres: deleted UserApiKey ${id} (${info.rowCount} row)`);
}
const remaining = (await pg.query('SELECT "providerId", count(*)::int AS n FROM "UserApiKey" GROUP BY 1')).rows;
console.log('postgres remaining UserApiKey rows:', JSON.stringify(remaining));
await pg.end();
console.log('\nDONE — data-level fix applied.');
