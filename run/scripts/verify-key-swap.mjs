#!/usr/bin/env node
/**
 * Verify key decryption with BOTH the current fresh ENCRYPTION_KEY and the
 * ORIGINAL key from the zip's freellmapi/.env. Also audit every table that
 * stores encrypted blobs for rows written after our restore (2026-10-22),
 * which would be encrypted under the FRESH key and break after the swap.
 */
import path from 'node:path';
import fs from 'node:fs';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const root = '/home/z/my-project/freellmapi';
const Database = require(path.join(root, 'node_modules/better-sqlite3'));
const db = new Database(path.join(root, 'server/data/freeapi.db'), { readonly: true });

const freshKey = Buffer.from(
  fs.readFileSync(path.join(root, '.env'), 'utf8').match(/^ENCRYPTION_KEY=([0-9a-fA-F]+)$/m)[1], 'hex');
const origKey = Buffer.from(
  fs.readFileSync('/home/z/my-project/scripts/original-encryption-key.txt', 'utf8').trim(), 'hex');

function tryDecrypt(key, encryptedHex, ivHex, tagHex) {
  try {
    const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(ivHex, 'hex'), { authTagLength: 16 });
    d.setAuthTag(Buffer.from(tagHex, 'hex'));
    const pt = Buffer.concat([d.update(Buffer.from(encryptedHex, 'hex')), d.final()]).toString('utf8');
    return { ok: true, pt };
  } catch (e) {
    return { ok: false, err: e.message.slice(0, 45) };
  }
}

const rows = db.prepare('SELECT id, platform, base_url, status, encrypted_key, iv, auth_tag FROM api_keys ORDER BY id').all();
console.log('=== api_keys decryption matrix (fresh vs original key) ===');
let origWins = 0, freshWins = 0, neither = 0;
for (const r of rows) {
  const o = tryDecrypt(origKey, r.encrypted_key, r.iv, r.auth_tag);
  const f = tryDecrypt(freshKey, r.encrypted_key, r.iv, r.auth_tag);
  if (o.ok) origWins++;
  if (f.ok) freshWins++;
  if (!o.ok && !f.ok) neither++;
  const pt = o.ok ? (o.pt.length <= 16 ? o.pt : o.pt.slice(0, 8) + '…' + o.pt.slice(-4) + `(${o.pt.length}ch)`) : o.err;
  console.log(`key ${String(r.id).padStart(2)} | orig:${o.ok ? 'OK ' : 'fail'} | fresh:${f.ok ? 'OK' : 'fail'} | ${o.ok ? pt : ''}`);
}
console.log(`\nSummary: original decrypts ${origWins}/${rows.length}, fresh decrypts ${freshWins}/${rows.length}, neither: ${neither}`);

// ── Audit: rows written after restore (2026-10-22) in tables with encrypted blobs ──
console.log('\n=== audit: rows possibly encrypted under the FRESH key ===');
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all().map(t => t.name);
let risky = 0;
for (const t of tables) {
  const cols = db.prepare(`PRAGMA table_info(${t})`).all().map(c => c.name);
  const hasEnc = cols.includes('encrypted_key') || cols.includes('proxy_encrypted');
  if (!hasEnc) continue;
  const timeCol = cols.find(c => ['created_at', 'updated_at', 'added_at'].includes(c));
  const q = timeCol
    ? `SELECT COUNT(*) n, MIN(${timeCol}) mn, MAX(${timeCol}) mx FROM ${t} WHERE ${timeCol} > '2026-10-22'`
    : `SELECT COUNT(*) n FROM ${t}`;
  const res = db.prepare(q).get();
  const total = db.prepare(`SELECT COUNT(*) n FROM ${t}`).get().n;
  const recent = res.n && (timeCol ? res.n : 0);
  console.log(`${t}: total=${total}${timeCol ? ` recent(after 10-22)=${recent}` : ' (no timestamp — manual check)'} ${recent > 0 ? '⚠️ RISK' : 'ok'}`);
  if (recent > 0) risky += recent;
}
console.log(risky ? `\n⚠️ ${risky} rows at risk` : '\nNo rows written after restore — safe to swap ENCRYPTION_KEY back to the original.');
db.close();
