/**
 * Task 28 — reproduce & verify the router's bulk-import duplicate detection.
 *
 * Scenario: user uploads a JSON of keys and sees "13 duplicate(s) detected —
 * already exist and will be skipped." The router DB holds only 4 keys, so we
 * prove the mechanics: preview flags EVERY ROW whose value matches a stored
 * key. A file that lists the same stored values repeatedly → count = rows,
 * not distinct keys. Also verifies a mixed file flags only true matches.
 *
 * Steps:
 *   1. Decrypt the 4 stored router keys (AES-256-GCM, hex ct/iv/tag).
 *   2. Login to the embedded router (bridge credentials) → session cookie.
 *   3. POST /api/keys/preview with:
 *        A) 13 rows that repeat the 4 stored values  → expect 13 duplicates
 *        B) 4 stored values + 9 fresh random values → expect 4 duplicates
 *   4. Print both responses (no import — preview never writes).
 */
import { readFileSync } from 'node:fs';
import crypto from 'node:crypto';
import path from 'node:path';

const ROOT = '/home/z/my-project/freellmapi';
const DB_FILE = path.join(ROOT, 'server/data/freeapi.db');

// ── 1. Load ENCRYPTION_KEY + decrypt stored rows ────────────────────────────
const envText = readFileSync(path.join(ROOT, '.env'), 'utf8');
const keyMatch = envText.match(/^ENCRYPTION_KEY=(.+)$/m);
if (!keyMatch) { console.error('ENCRYPTION_KEY not found in freellmapi/.env'); process.exit(1); }
const ENC_KEY = Buffer.from(keyMatch[1].trim(), 'hex');

const { default: Database } = await import(path.join(ROOT, 'node_modules/better-sqlite3/lib/index.js'));
const db = new Database(DB_FILE, { readonly: true });
const rows = db.prepare('SELECT id, platform, label, encrypted_key, iv, auth_tag FROM api_keys ORDER BY id').all();
db.close();

function decrypt(row) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', ENC_KEY, Buffer.from(row.iv, 'hex'));
  decipher.setAuthTag(Buffer.from(row.auth_tag, 'hex'));
  return Buffer.concat([decipher.update(Buffer.from(row.encrypted_key, 'hex')), decipher.final()]).toString('utf8');
}

const stored = rows.map(r => ({ id: r.id, label: r.label, platform: r.platform, value: decrypt(r) }));
console.log('stored keys:', stored.map(s => `#${s.id} ${s.label} → "${s.value.slice(0, 10)}${s.value.length > 10 ? '…' : ''}"`).join(' | '));

// ── 2. Login (bridge credentials) ────────────────────────────────────────────
const bridge = JSON.parse(readFileSync(path.join(ROOT, 'server/data/medq-bridge.json'), 'utf8'));
const basePort = (process.argv[2] || '41569').trim();
const BASE = `http://127.0.0.1:${basePort}`;

const loginRes = await fetch(`${BASE}/api/auth/login`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: bridge.email, password: bridge.password }),
});
if (!loginRes.ok) { console.error('login failed:', loginRes.status, await loginRes.text()); process.exit(1); }
const loginBody = await loginRes.json();
const token = loginBody.token || loginBody.sessionToken || loginBody.session?.token;
if (!token) { console.error('no token in login response:', JSON.stringify(loginBody).slice(0, 200)); process.exit(1); }
console.log('logged in, token:', token.slice(0, 12) + '…');

// ── 3. Preview helper ────────────────────────────────────────────────────────
async function previewJSON(obj, filename) {
  const form = new FormData();
  const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
  form.append('files', blob, filename);
  const res = await fetch(`${BASE}/api/keys/preview`, {
    method: 'POST',
    headers: { authorization: `Bearer ${token}` },
    body: form,
  });
  const body = await res.json();
  if (!res.ok) { console.error('preview failed:', res.status, JSON.stringify(body)); process.exit(1); }
  return body;
}

// ── 4a. Scenario A: 13 rows all repeating the 4 stored values ───────────────
const values = stored.map(s => s.value);
const fileA = {};
for (let i = 0; i < 13; i++) {
  fileA[`IMPORTED_KEY_${i + 1}`] = values[i % values.length]; // cycles the 4 values
}
const a = await previewJSON(fileA, 'keys-repeat.json');
const aDupes = a.keys.filter(k => k.isDuplicate);
console.log('\nSCENARIO A — 13 rows cycling the 4 stored values');
console.log(`  rows=${a.total} duplicates(flagged rows)=${a.duplicates} distinctDupValues=${new Set(aDupes.map(k => k.keyValue)).size} imported(rows client would offer)=${a.keys.length - aDupes.length}`);
console.log('  NEW FIELDS:', JSON.stringify({ duplicateDistinct: a.duplicateDistinct, duplicateMatches: a.duplicateMatches, fileRepeats: a.fileRepeats }));
console.log('  per-row sample:', JSON.stringify(aDupes.slice(0, 2).map(k => ({ name: k.keyName, matched: k.matchedLabel, fileRepeat: k.fileRepeat }))));

// ── 4b. Scenario B: 4 stored + 9 fresh values → only 4 flagged ──────────────
const fileB = {};
stored.forEach((s, i) => { fileB[s.label.replace(/\W+/g, '_').toUpperCase() + '_REAL'] = s.value; });
for (let i = 0; i < 9; i++) fileB[`FRESH_KEY_${i + 1}`] = `sk-fresh-${crypto.randomBytes(12).toString('hex')}`;
const b = await previewJSON(fileB, 'keys-mixed.json');
const bDupes = b.keys.filter(k => k.isDuplicate);
console.log('\nSCENARIO B — 4 real + 9 fresh rows');
console.log(`  rows=${b.total} duplicates=${b.duplicates} freshSelected=${b.keys.filter(k => !k.isDuplicate && k.keyValue.startsWith('sk-fresh')).length}`);
console.log('  matched values (first 4):', bDupes.map(k => k.keyValue.slice(0, 8) + '…').join(' | '));
console.log('\nDONE — preview never writes; DB untouched.');
