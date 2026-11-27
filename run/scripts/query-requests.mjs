// query-requests.mjs — read the sidecar's `requests` table for recent admin
// API calls (who registered the custom endpoint?). Run from the server
// workspace so better-sqlite3 resolves.
import { createRequire } from 'node:module';
const require = createRequire('/home/z/my-project/freellmapi/server/package.json');
const Database = require('better-sqlite3');

const db = new Database('/home/z/my-project/freellmapi/server/data/freeapi.db', { readonly: true });

const cols = db.prepare("PRAGMA table_info(requests)").all().map(c => c.name);
console.log('requests columns:', cols.join(', '));

const rows = db.prepare(
  `SELECT * FROM requests ORDER BY id DESC LIMIT 400`
).all();

const interesting = rows.filter(r =>
  String(r.path || '').includes('keys') || String(r.path || '').includes('models') ||
  String(r.path || '').includes('media') || String(r.path || '').includes('sync'));

console.log(`\nlast ${interesting.length} admin-ish requests (newest first):`);
for (const r of interesting.slice(0, 30)) {
  const t = r.created_at ? new Date(Number(r.created_at) < 1e12 ? Number(r.created_at) * 1000 : Number(r.created_at)).toISOString() : (r.ts || '?');
  console.log(`#${r.id} ${t} ${r.method || ''} ${r.path} -> ${r.status ?? r.status_code ?? ''}` +
    ` client=${r.client || r.caller || r.client_name || ''} ip=${r.ip || r.remote_addr || ''}`);
}
db.close();
