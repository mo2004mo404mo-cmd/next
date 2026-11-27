#!/usr/bin/env node
// Illustration turn with INCREMENTAL SSE parsing: approves the HITL card the
// moment approval_required arrives (the tour script buffered the whole stream,
// so its approval landed after the agent's wait had already timed out → 409).
const BASE = 'http://localhost:3000';
const jar = [];
const keep = (res) => {
  const sc = res.headers.getSetCookie?.() ?? [res.headers.get('set-cookie')].filter(Boolean);
  for (const c of sc) jar.push(c.split(';')[0]);
};
const hdr = () => ({ cookie: jar.join('; '), 'content-type': 'application/json' });

const THREAD = process.argv[2];
const MSG = process.argv[3] || 'Generate a simple medical illustration of the nephron.';

async function login() {
  let r = await fetch(`${BASE}/api/auth/csrf`); keep(r);
  const { csrfToken } = await r.json();
  r = await fetch(`${BASE}/api/auth/callback/credentials?json=true`, {
    method: 'POST',
    headers: { ...hdr(), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ csrfToken, email: 'student@medq.com', password: 'test123', redirect: 'false' }).toString(),
    redirect: 'manual',
  });
  keep(r);
}

async function main() {
  await login();
  const res = await fetch(`${BASE}/api/agent/chat/v2`, {
    method: 'POST', headers: hdr(),
    body: JSON.stringify({ message: MSG, threadId: THREAD }),
  });
  if (!res.ok || !res.body) { console.error('POST failed', res.status); process.exit(1); }

  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = '';
  const tools = [];
  let doneText = '', doneCalls = null, approved = false;
  const timer = setTimeout(() => { console.error('HARD-TIMEOUT'); process.exit(2); }, 480000);

  for (;;) {
    const { value, done } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf('\n\n')) >= 0) {
      const block = buf.slice(0, idx); buf = buf.slice(idx + 2);
      const ev = block.match(/^event: (.+)$/m)?.[1];
      const dt = block.match(/^data: (.+)$/m)?.[1];
      if (!ev || !dt) continue;
      let d; try { d = JSON.parse(dt); } catch { continue; }
      if (ev === 'tool.call') { tools.push(d.toolName || d.name || '?'); console.log('tool:', tools[tools.length - 1]); }
      if (ev === 'approval_required' && !approved) {
        approved = true;
        console.log('approval_required → approving', d.approvalId ?? d.id);
        const ar = await fetch(`${BASE}/api/agent/approvals/${d.approvalId ?? d.id}`, {
          method: 'POST', headers: hdr(), body: JSON.stringify({ approved: true }),
        });
        console.log('approve status:', ar.status);
      }
      if (ev === 'done') { doneText = d.text || ''; doneCalls = d.llmCallCount ?? null; }
      if (ev === 'error') console.log('ERROR EVENT:', (d.message || '').slice(0, 160));
      if (ev === 'ping') { /* keepalive */ }
    }
  }
  clearTimeout(timer);
  console.log(`tools=${tools.join(',')} approved=${approved} llmCalls=${doneCalls} text=${doneText.length}ch`);
  const img = doneText.match(/!\[[^\]]*\]\(([^)]+)\)/);
  console.log('image ref:', img ? img[1].slice(0, 120) : 'none');
  console.log('tail:', doneText.replace(/\n/g, ' ').slice(-220));
}
main().catch((e) => { console.error('FATAL', e); process.exit(1); });
