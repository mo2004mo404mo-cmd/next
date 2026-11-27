// Decrypt router keys and probe Groq directly — diagnose the 403
import crypto from 'node:crypto';
import fs from 'node:fs';
import { DatabaseSync } from 'node:sqlite';

const DB_PATH = '/home/z/my-project/freellmapi/server/data/freeapi.db';
const KEY_FILE = '/home/z/my-project/freellmapi/server/data/.encryption-key';

let hex = process.env.ENCRYPTION_KEY;
if (!hex || hex === 'your-64-char-hex-key-here') {
  if (fs.existsSync(KEY_FILE)) {
    hex = fs.readFileSync(KEY_FILE, 'utf8').trim();
  } else {
    const env = fs.readFileSync('/home/z/my-project/freellmapi/.env', 'utf8');
    hex = env.split('\n').find((l) => l.startsWith('ENCRYPTION_KEY='))?.slice('ENCRYPTION_KEY='.length).trim();
  }
}
const key = Buffer.from(hex, 'hex');

function decrypt(encrypted, iv, authTag) {
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(iv, 'hex'), { authTagLength: 16 });
  decipher.setAuthTag(Buffer.from(authTag, 'hex'));
  return decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
}

const db = new DatabaseSync(DB_PATH, { readOnly: true });
const rows = db.prepare("SELECT id, platform, encrypted_key, iv, auth_tag, status, enabled FROM api_keys WHERE platform = 'groq'").all();
for (const r of rows) {
  let plain = '';
  try { plain = decrypt(r.encrypted_key, r.iv, r.auth_tag); } catch (e) { plain = `<decrypt failed: ${e.message}>`; }
  console.log(`groq key #${r.id} status=${r.status} enabled=${r.enabled} len=${plain.length} prefix=${plain.slice(0, 8)}`);

  // Probe 1: models endpoint (what validateKey uses)
  try {
    const res = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${plain}` },
      signal: AbortSignal.timeout(20000),
    });
    const body = await res.text().catch(() => '');
    console.log(`  /models → HTTP ${res.status} ${res.statusText}`);
    console.log(`  headers: cf-mitigated=${res.headers.get('cf-mitigated')} server=${res.headers.get('server')}`);
    console.log(`  body[:400]: ${body.slice(0, 400)}`);
  } catch (e) {
    console.log(`  /models → TRANSPORT ERROR: ${e.message}`);
  }

  // Probe 2: a minimal chat completion (does the key actually WORK for inference?)
  if (!plain.startsWith('<')) {
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: { Authorization: `Bearer ${plain}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', max_tokens: 5, messages: [{ role: 'user', content: 'hi' }] }),
        signal: AbortSignal.timeout(30000),
      });
      const body = await res.text().catch(() => '');
      console.log(`  /chat/completions → HTTP ${res.status} ${res.statusText}`);
      console.log(`  body[:300]: ${body.slice(0, 300)}`);
    } catch (e) {
      console.log(`  /chat/completions → TRANSPORT ERROR: ${e.message}`);
    }
  }
  console.log('---');
}
