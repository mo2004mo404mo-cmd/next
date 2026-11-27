// Try multiple master-key derivations against Postgres UserApiKey rows.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire('/home/z/my-project/freellmapi/package.json');
const { Client } = require('pg');

const rootEnv = fs.readFileSync('/home/z/my-project/.env', 'utf8');
const secret = rootEnv.match(/^NEXTAUTH_SECRET="([^"]+)"/m)?.[1] ?? '';
const byokMaster = rootEnv.match(/^BYOK_MASTER_KEY=(.*)$/m)?.[1]?.trim() ?? '';

function gcm(key, ct, iv, tag) {
  const d = crypto.createDecipheriv('aes-256-gcm', key, iv, { authTagLength: 16 });
  d.setAuthTag(tag);
  return Buffer.concat([d.update(ct), d.final()]).toString('utf8');
}

const candidates = {
  'sha256(secret.trim())': crypto.createHash('sha256').update(secret.trim()).digest(),
  'sha256(secret)': crypto.createHash('sha256').update(secret).digest(),
  'secret as raw hex': /^[0-9a-fA-F]{64}$/.test(secret) ? Buffer.from(secret, 'hex') : null,
  'secret utf8 (first 32?)': Buffer.from(secret, 'utf8').subarray(0, 32),
  'BYOK_MASTER_KEY env': byokMaster ? Buffer.from(byokMaster, 'hex') : null,
  'sha256("medq" + secret)': crypto.createHash('sha256').update('medq' + secret).digest(),
};

const pg = new Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
await pg.connect();
const rows = (await pg.query('SELECT id, "providerId", "encryptedKey", iv, "authTag", "createdAt" FROM "UserApiKey" ORDER BY "providerId"')).rows;
for (const r of rows) {
  const iv = Buffer.from(r.iv, 'base64');
  const tag = Buffer.from(r.authTag, 'base64');
  const ct = Buffer.from(r.encryptedKey, 'base64');
  console.log(`row ${r.id} ${r.providerId} ivBytes=${iv.length} tagBytes=${tag.length} ctBytes=${ct.length} created=${r.createdAt?.toISOString?.().slice(0, 10)}`);
  for (const [name, key] of Object.entries(candidates)) {
    if (!key || key.length !== 32) { if (name !== 'BYOK_MASTER_KEY env' || byokMaster) console.log(`   skip ${name} (len ${key?.length})`); continue; }
    try {
      const pt = gcm(key, ct, iv, tag);
      console.log(`   ✓ DECRYPTS with ${name} → ${JSON.stringify(pt === '\u0000keyless' ? '(keyless)' : pt).slice(0, 60)}`);
    } catch { /* nope */ }
  }
}
await pg.end();
