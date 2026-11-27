#!/usr/bin/env node
/**
 * Test BYOK row decryption against the live Postgres UserApiKey rows with
 * the current NEXTAUTH_SECRET — replicating byok-crypto.ts exactly — and
 * trying several plausible historical derivations if the current one fails.
 */
import crypto from 'node:crypto';
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const env = fs.readFileSync('/home/z/my-project/.env', 'utf8');
const secret = env.match(/^NEXTAUTH_SECRET=(.*)$/m)[1].trim().replace(/^"|"$/g, '');
console.log(`NEXTAUTH_SECRET: len=${secret.length} sha256-12=${crypto.createHash('sha256').update(secret).digest('hex').slice(0, 12)}`);

// Pull the rows via psql (JSON output)
const psql = '/home/z/pgwork/pgclient/usr/lib/postgresql/17/bin/psql';
const raw = execSync(`${psql} -h 127.0.0.1 -U postgres -d nextapp -t -A -c "SELECT json_agg(row_to_json(t)) FROM (SELECT \\"providerId\\", \\"encryptedKey\\", \\"iv\\", \\"authTag\\", \\"label\\" FROM \\"UserApiKey\\") t"`, { encoding: 'utf8' });
const rows = JSON.parse(raw.trim());
console.log(`rows: ${rows.length}\n`);

const keyVariants = {
  'sha256(secret) [current code]': crypto.createHash('sha256').update(secret).digest(),
  'secret utf8 bytes (needs 32)': Buffer.from(secret, 'utf8'),
  'secret hex-decoded': /^[0-9a-fA-F]{64}$/.test(secret) ? Buffer.from(secret, 'hex') : null,
};

function decrypt(key, ctB64, ivB64, tagB64) {
  const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivB64, 'base64'));
  d.setAuthTag(Buffer.from(tagB64, 'base64'));
  return Buffer.concat([d.update(Buffer.from(ctB64, 'base64')), d.final()]).toString('utf8');
}

for (const r of rows) {
  const results = [];
  for (const [name, key] of Object.entries(keyVariants)) {
    if (!key || key.length !== 32) { results.push(`${name}: skipped`); continue; }
    try {
      const pt = decrypt(key, r.encryptedKey, r.iv, r.authTag);
      results.push(`${name}: OK -> "${pt.length > 24 ? pt.slice(0, 12) + '…' + pt.slice(-4) + `(${pt.length})` : pt}"`);
    } catch (e) {
      results.push(`${name}: FAIL (${e.message.slice(0, 30)})`);
    }
  }
  console.log(`[${r.providerId}] ${r.label ?? ''}`);
  for (const x of results) console.log('   ' + x);
  console.log('');
}
