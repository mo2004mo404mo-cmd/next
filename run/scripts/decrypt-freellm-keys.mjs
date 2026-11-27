// Decrypt the provider keys stored in freellmapi's freeapi.db (AES-256-GCM,
// key = ENCRYPTION_KEY from freellmapi/.env). Read-only, local diagnosis tool.
import { Database } from 'bun:sqlite';
import crypto from 'crypto';

const env = await Bun.file('/home/z/my-project/freellmapi/.env').text();
const encKeyHex = env.match(/^ENCRYPTION_KEY=([0-9a-fA-F]{64})$/m)?.[1];
if (!encKeyHex) { console.error('ENCRYPTION_KEY not found/invalid'); process.exit(1); }
const key = Buffer.from(encKeyHex, 'hex');

const db = new Database('/home/z/my-project/freellmapi/server/data/freeapi.db', { readonly: true });
const rows = db.query('SELECT id, platform, label, base_url, encrypted_key, iv, auth_tag FROM api_keys').all();
for (const r of rows) {
  let plain;
  try {
    const d = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(r.iv, 'hex'), { authTagLength: 16 });
    d.setAuthTag(Buffer.from(r.auth_tag, 'hex'));
    plain = d.update(r.encrypted_key, 'hex', 'utf8') + d.final('utf8');
  } catch (e) {
    plain = `<decrypt failed: ${e.message}>`;
  }
  const masked = plain.length > 12
    ? plain.slice(0, 6) + '…' + plain.slice(-4) + `  (len ${plain.length})`
    : plain;
  console.log(`#${r.id} [${r.platform}] ${r.label || '(no label)'} | baseUrl: ${r.base_url || '(default)'} | key: ${masked}`);
}
db.close();
