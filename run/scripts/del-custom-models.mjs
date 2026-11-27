// del-custom-models.mjs — delete every custom chat model row via the sidecar
// API, printing each response (forensics: find out why deletes fail).
const BASE = 'http://127.0.0.1:3000';
const TOKEN = (await import('node:fs')).readFileSync('/tmp/freellm-token.txt', 'utf8').trim();
const AUTH = { Authorization: `Bearer ${TOKEN}` };

const listRes = await fetch(`${BASE}/freellmapi/api/models`, { headers: AUTH });
const m = await listRes.json();
const arr = Array.isArray(m) ? m : (m.models || m.data || []);
const rows = arr.filter(x => x.platform === 'custom');
console.log('custom chat rows:', rows.map(r => `#${r.id} ${r.modelId}`).join(', ') || '(none)');

for (const r of rows) {
  const res = await fetch(`${BASE}/freellmapi/api/models/custom/${r.id}`, { method: 'DELETE', headers: AUTH });
  const body = await res.text();
  console.log(`DELETE #${r.id} (${r.modelId}) -> ${res.status} ${body.slice(0, 160)}`);
}

// media rows too
const mediaRes = await fetch(`${BASE}/freellmapi/api/media`, { headers: AUTH });
const mm = await mediaRes.json();
const mArr = Array.isArray(mm) ? mm : (mm.models || mm.data || mm.media || []);
const mediaRows = (Array.isArray(mArr) ? mArr : []).filter(x => x.platform === 'custom');
console.log('custom media rows:', mediaRows.map(r => `#${r.id} ${r.modelId || r.model}`).join(', ') || '(none)');
for (const r of mediaRows) {
  const res = await fetch(`${BASE}/freellmapi/api/media/custom/${r.id}`, { method: 'DELETE', headers: AUTH });
  const body = await res.text();
  console.log(`DELETE media #${r.id} (${r.modelId || r.model}) -> ${res.status} ${body.slice(0, 160)}`);
}
