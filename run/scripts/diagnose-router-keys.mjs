#!/usr/bin/env node
/**
 * Diagnose freellmapi ai_keys: try decrypting each stored key with the
 * current ENCRYPTION_KEY; report which rows are undecryptable (stale
 * ciphertext from the original author's DB backup) and their routing roles.
 */
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = '/home/z/my-project/freellmapi';
const Database = require(path.join(root, 'node_modules/better-sqlite3'));
const db = new Database(path.join(root, 'server/data/freeapi.db'), { readonly: true });

const env = fs.readFileSync(path.join(root, '.env'), 'utf8');
const keyHex = env.match(/^ENCRYPTION_KEY=([0-9a-fA-F]+)$/m)?.[1];
const master = Buffer.from(keyHex, 'hex');

function decrypt(ciphertextB64, ivB64, tagB64) {
  const d = crypto.createDecipheriv('aes-256-gcm', master, Buffer.from(ivB64, 'base64'));
  d.setAuthTag(Buffer.from(tagB64, 'base64'));
  return Buffer.concat([d.update(Buffer.from(ciphertextB64, 'base64')), d.final()]).toString('utf8');
}

const SQL = `SELECT id, platform, label, base_url, status, enabled, model_scope_json,
                    encrypted_key, iv, auth_tag, last_health_error
             FROM api_keys ORDER BY id`;
const rows = db.prepare(SQL).all();
console.log(`api_keys: ${rows.length} rows | ENCRYPTION_KEY ${keyHex.slice(0, 8)}…\n`);
console.log('ID | platform | base_url | label | status | enabled | decrypt | scope | last_health_error');
console.log('-'.repeat(120));
for (const r of rows) {
  let ok = false, note = '';
  try {
    const k = decrypt(r.encrypted_key, r.iv, r.auth_tag);
    ok = true;
    note = k.length <= 14 ? k : k.slice(0, 6) + '…' + k.slice(-4) + ` (${k.length}ch)`;
  } catch (e) {
    note = e.message.slice(0, 38);
  }
  const scope = (r.model_scope_json || '').toString().slice(0, 60);
  console.log(
    `${String(r.id).padStart(2)} | ${(r.platform || '?').padEnd(8)} | ${(r.base_url || 'default').slice(0, 46).padEnd(46)} | ` +
    `${(r.label || '-').toString().slice(0, 14).padEnd(14)} | ${(r.status || '?').padEnd(8)} | ` +
    `${r.enabled ? 'Y' : 'N'} | ${ok ? 'OK  ' + note : 'FAIL: ' + note} | ${scope} | ${(r.last_health_error || '').toString().slice(0, 26)}`
  );
}
db.close();
