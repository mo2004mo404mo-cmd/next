#!/usr/bin/env node
/** Regression: text-evidence search must still use search_medical_references with [S#] citations. */
const BASE = 'http://localhost:3000';
async function main() {
  const jar = [];
  const keep = (res) => {
    const sc = res.headers.getSetCookie?.() ?? [res.headers.get('set-cookie')].filter(Boolean);
    for (const c of sc) jar.push(c.split(';')[0]);
  };
  const hdr = () => ({ cookie: jar.join('; '), 'content-type': 'application/json' });
  let r = await fetch(`${BASE}/api/auth/csrf`); keep(r);
  const { csrfToken } = await r.json();
  r = await fetch(`${BASE}/api/auth/callback/credentials?json=true`, {
    method: 'POST',
    headers: { ...hdr(), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ csrfToken, email: 'student@medq.com', password: 'test123', redirect: 'false' }).toString(),
    redirect: 'manual',
  }); keep(r);
  r = await fetch(`${BASE}/api/agent/chat/v2`, {
    method: 'POST', headers: hdr(),
    body: JSON.stringify({ message: 'What are the current ESC 2024 guidelines on hypertension thresholds?', threadId: null }),
  });
  const raw = await r.text();
  const tools = []; let done = null;
  for (const b of raw.split('\n\n')) {
    const ev = b.match(/^event: (.+)$/m); const dt = b.match(/^data: (.+)$/m);
    if (ev && dt) { try { const d = JSON.parse(dt[1]); if (ev[1] === 'tool.call') tools.push(`${d.toolName}(${JSON.stringify(d.args).slice(0, 60)})`); if (ev[1] === 'done') done = d; } catch {} }
  }
  console.log('tools:', tools.join(' | ') || 'none');
  const t = done?.text ?? '';
  const cites = (t.match(/\[S\d\]/g) ?? []).length;
  console.log(`final text: ${t.length} chars | [S#] citations: ${cites}`);
  console.log(t.slice(0, 400));
}
main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
