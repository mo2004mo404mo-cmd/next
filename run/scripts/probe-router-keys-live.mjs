#!/usr/bin/env node
/**
 * Probe every enabled zai-llm (custom) key behind the embedded freellmapi
 * router: send a tiny chat request THROUGH the router with per-key pinning
 * unavailable — instead call each upstream base_url directly with its
 * decrypted key, mirroring the router's request shape. Goal: find the key
 * that 401s with "missing X-Token header" and any other dead keys, then
 * print a ready-to-run disable list.
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

function decrypt(row) {
  const d = crypto.createDecipheriv('aes-256-gcm', master, Buffer.from(row.iv, 'base64'));
  d.setAuthTag(Buffer.from(row.auth_tag, 'base64'));
  return Buffer.concat([d.update(Buffer.from(row.encrypted_key, 'base64')), d.final()]).toString('utf8');
}

const rows = db.prepare(
  `SELECT id, platform, label, base_url, status, enabled, encrypted_key, iv, auth_tag, last_health_error
   FROM api_keys WHERE enabled = 1 ORDER BY id`
).all();

console.log(`enabled keys: ${rows.length}`);
const results = [];
for (const row of rows) {
  let key = '';
  try { key = decrypt(row); } catch { results.push({ id: row.id, platform: row.platform, label: row.label, ok: false, note: 'DECRYPT-FAIL' }); continue; }
  const base = (row.base_url || '').replace(/\/+$/, '');
  const url = base.endsWith('/v1') ? `${base}/chat/completions` : `${base}/v1/chat/completions`;
  const isZaiGateway = /space-z\.ai|z\.ai/.test(base);
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
    // z.ai gateways require the platform token header the SDK always sends.
    ...(isZaiGateway ? { 'X-Token': key } : {}),
  };
  const started = Date.now();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 20_000);
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ model: 'glm-4.5-flash', messages: [{ role: 'user', content: 'ping' }], max_tokens: 4 }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    const text = await res.text().catch(() => '');
    results.push({
      id: row.id, platform: row.platform, label: row.label, base,
      ok: res.ok, status: res.status, ms: Date.now() - started,
      note: res.ok ? 'OK' : text.slice(0, 110).replace(/\s+/g, ' '),
    });
  } catch (e) {
    results.push({ id: row.id, platform: row.platform, label: row.label, base, ok: false, status: 0, ms: Date.now() - started, note: String(e).slice(0, 90) });
  }
}

for (const r of results) {
  console.log(`#${r.id} [${r.platform}] "${r.label}" ${r.base ?? ''} -> ${r.ok ? 'OK' : 'FAIL'} (${r.status}, ${r.ms}ms) ${r.note ?? ''}`);
}
const bad = results.filter((r) => !r.ok);
console.log(`\nFAILING: ${bad.map((r) => r.id).join(', ') || 'none'}`);
