// Task 26 — Diagnose both failing crypto stores before migration.
// 1) SQLite freeapi.db: try decrypting every api_keys row under the CURRENT
//    freellmapi/.env key (what the embedded router uses).
// 2) Postgres UserApiKey: try decrypting every row under the app master key
//    (SHA-256 of NEXTAUTH_SECRET, since BYOK_MASTER_KEY is empty).
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const Database = require('better-sqlite3');

const ROOT = '/home/z/my-project';

// ── load keys ──
const envText = fs.readFileSync(path.join(ROOT, 'freellmapi/.env'), 'utf8');
const currentKey = Buffer.from(
  envText.match(/^ENCRYPTION_KEY=([0-9a-f]{64})$/m)?.[1] ?? '',
  'hex',
);
if (currentKey.length !== 32) { console.error('FATAL: bad current ENCRYPTION_KEY'); process.exit(1); }

const rootEnv = fs.readFileSync(path.join(ROOT, '.env'), 'utf8');
const nextAuthSecret = rootEnv.match(/^NEXTAUTH_SECRET="([^"]+)"/m)?.[1] ?? '';
console.log(`NEXTAUTH_SECRET length = ${nextAuthSecret.length}`);
const appMaster = crypto.createHash('sha256').update(nextAuthSecret.trim()).digest();
console.log(`app master key fingerprint = sha256:${crypto.createHash('sha256').update(appMaster).digest('hex').slice(0, 16)}`);

function gcmDecrypt(key, ciphertextBuf, ivBuf, tagBuf) {
  const d = crypto.createDecipheriv('aes-256-gcm', key, ivBuf, { authTagLength: 16 });
  d.setAuthTag(tagBuf);
  return Buffer.concat([d.update(ciphertextBuf), d.final()]).toString('utf8');
}

// ── 1. SQLite matrix ──
console.log('════ SQLite freeapi.db (router keys) — key = freellmapi/.env ENCRYPTION_KEY ════');
const sq = new Database(path.join(ROOT, 'freellmapi/server/data/freeapi.db'), { readonly: true });
const rows = sq.prepare('SELECT id, platform, label, encrypted_key, iv, auth_tag, base_url, status, enabled FROM api_keys ORDER BY id').all();
for (const r of rows) {
  let verdict, plain = '';
  try {
    plain = gcmDecrypt(currentKey, Buffer.from(r.encrypted_key, 'hex'), Buffer.from(r.iv, 'hex'), Buffer.from(r.auth_tag, 'hex'));
    verdict = 'OK  ';
  } catch (e) { verdict = 'FAIL'; }
  const shown = verdict === 'OK' ? JSON.stringify(plain).slice(0, 30) : '(undecryptable)';
  console.log(`  id=${String(r.id).padEnd(3)} ${verdict} platform=${(r.platform || '-').padEnd(10)} label=${(r.label || '-').padEnd(24)} base=${(r.base_url || '-').padEnd(60)} enabled=${r.enabled} plain=${shown}`);
}
sq.close();

// ── 2. Postgres UserApiKey ──
console.log('\n════ Postgres UserApiKey (app BYOK) — key = SHA256(NEXTAUTH_SECRET) ════');
const { Client } = (await import('pg')).default;
const pg = new Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await pg.connect();
const urows = (await pg.query('SELECT id, "userId", "providerId", "baseUrl", label, "encryptedKey", iv, "authTag", enabled, "createdAt" FROM "UserApiKey" ORDER BY "providerId", "createdAt"')).rows;
for (const r of urows) {
  let verdict, plain = '';
  try {
    plain = gcmDecrypt(appMaster, r.encryptedKey, Buffer.from(r.iv, 'base64'), Buffer.from(r.authTag, 'base64'));
    verdict = 'OK  ';
  } catch (e) { verdict = 'FAIL'; }
  const shown = verdict === 'OK' ? JSON.stringify(plain === '\u0000keyless' ? '(keyless)' : plain).slice(0, 40) : '(undecryptable)';
  const u = await pg.query('SELECT email FROM "User" WHERE id = $1', [r.userId]);
  console.log(`  ${r.providerId.padEnd(12)} ${verdict} user=${(u.rows[0]?.email || r.userId).padEnd(24)} base=${(r.baseUrl || '-').padEnd(40)} enabled=${r.enabled} created=${r.createdAt?.toISOString?.().slice(0, 10)} plain=${shown} rowId=${r.id}`);
}
await pg.end();
