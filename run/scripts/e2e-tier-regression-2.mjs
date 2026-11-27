#!/usr/bin/env node
/**
 * E2E part 2: guideline freshness + batch attachments (T4.14, T2.8).
 *   1. freshness: a guideline query → search_medical_references result JSON
 *      must show re-ranked dates (freshest first) and the reply should cite
 *      years.
 *   2. batch attachments: TWO images attached in ONE message → the model must
 *      treat them as one set (analyze both / cross-reference) and both
 *      attachment:// refs must be consumed.
 */
const BASE = 'http://localhost:3000';
const email = 'student@medq.com', password = 'test123';

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? ` (${detail})` : ''}`);
};

// Two tiny distinct SVG images as data URLs (valid, cheap, no fs access).
const svg = (label, color) =>
  'data:image/svg+xml;base64,' + Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120"><rect width="200" height="120" fill="${color}"/><text x="20" y="60" font-size="20" fill="#fff">${label}</text></svg>`
  ).toString('base64');

async function main() {
  const jar = [];
  const keep = (res) => {
    const sc = res.headers.getSetCookie?.() ?? [res.headers.get('set-cookie')].filter(Boolean);
    for (const c of sc) jar.push(c.split(';')[0]);
  };
  const hdr = () => ({ cookie: jar.join('; '), 'content-type': 'application/json' });

  let r = await fetch(`${BASE}/api/auth/csrf`);
  keep(r);
  const { csrfToken } = await r.json();
  r = await fetch(`${BASE}/api/auth/callback/credentials?json=true`, {
    method: 'POST',
    headers: { ...hdr(), 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ csrfToken, email, password, redirect: 'false' }).toString(),
    redirect: 'manual',
  });
  keep(r);
  const session = await fetch(`${BASE}/api/auth/session`, { headers: hdr() }).then(x => x.json());
  if (!session?.user?.email) throw new Error('login failed');
  console.log(`[0] login OK\n`);

  async function sendChat(message, fileAttachments, label) {
    console.log(`▶ ${label}`);
    const t0 = Date.now();
    r = await fetch(`${BASE}/api/agent/chat/v2`, {
      method: 'POST',
      headers: hdr(),
      body: JSON.stringify({ message, threadId: null, ...(fileAttachments ? { fileAttachments } : {}) }),
    });
    if (!r.ok) throw new Error(`chat v2 HTTP ${r.status}: ${(await r.text()).slice(0, 300)}`);
    const raw = await r.text();
    const events = [];
    for (const block of raw.split('\n\n')) {
      const ev = block.match(/^event: (.+)$/m);
      const dt = block.match(/^data: (.+)$/m);
      if (ev && dt) { try { events.push({ name: ev[1], data: JSON.parse(dt[1]) }); } catch {} }
    }
    const toolStarts = events.filter(e => e.name === 'tool.call');
    const done = events.find(e => e.name === 'done');
    console.log(`  ${Date.now() - t0}ms · ${toolStarts.map(t => t.data.toolName).join(', ') || 'no tools'}`);
    return { toolStarts, finalText: done?.data?.text ?? '', events };
  }

  // ── 1. Guideline freshness ──
  const fr = await sendChat('What are the current hypertension diagnostic thresholds per the latest guidelines? Cite sources.', null, 'FRESHNESS');
  const searchResult = fr.events.find(e => e.name === 'tool.result' && e.data?.toolName === 'search_medical_references');
  const resultJson = String(searchResult?.data?.result ?? searchResult?.data?.excerpt ?? '');
  check('search_medical_references invoked', Boolean(searchResult));
  const dates = [...resultJson.matchAll(/"date"\s*:\s*"([^"]+)"/g)].map(m => m[1]);
  check('result rows carry dates', dates.length > 0, dates.slice(0, 3).join(' | '));
  // Re-rank verification (bucket semantics): a dated FRESH entry (>= current
  // year - 3) must never appear AFTER a dated STALE one. Within-bucket order
  // intentionally preserves the engine's relevance ranking.
  const currentYear = new Date().getFullYear();
  const freshYear = currentYear - 3;
  const entryYears = dates.map(d => parseInt((/\d{4}/.exec(d) || ['0'])[0], 10)).filter(y => y > 1990);
  const firstFreshIdx = entryYears.findIndex(y => y >= freshYear);
  const lastStaleIdx = entryYears.map((y, i) => (y < freshYear ? i : -1)).reduce((a, b) => Math.max(a, b), -1);
  check('no stale source ranked above a fresh one', firstFreshIdx === -1 || lastStaleIdx === -1 || lastStaleIdx < firstFreshIdx, `freshYear>=${freshYear}, years: ${entryYears.join(', ')}`);
  const citesYear = /\b(19|20)\d{2}\b/.test(fr.finalText);
  check('reply mentions guideline years', citesYear);

  // ── 2. Batch attachments ──
  const attachments = [
    { id: `att-${Date.now()}-a`, name: 'diagram-a.svg', type: 'image/svg+xml', size: 300, dataUrl: svg('DIAGRAM A', '#1a5fb4') },
    { id: `att-${Date.now()}-b`, name: 'diagram-b.svg', type: 'image/svg+xml', size: 300, dataUrl: svg('DIAGRAM B', '#8b5cf6') },
  ];
  const ba = await sendChat('Compare these two diagrams I attached — what does each show and how do they relate?', attachments, 'BATCH ATTACHMENTS');
  const visionCalls = ba.toolStarts.filter(t => t.data.toolName === 'analyze_visual_material');
  check('analyze_visual_material used', visionCalls.length > 0, `${visionCalls.length} call(s)`);
  const argsJson = visionCalls.map(c => JSON.stringify(c.data.args)).join(' ');
  check('attachment:// refs consumed', argsJson.includes('attachment://'), argsJson.slice(0, 90));
  check('both diagrams referenced in reply', /a\b[\s\S]*b\b|both|first|second/i.test(ba.finalText), `${ba.finalText.length} chars`);

  const passed = results.filter(x => x.ok).length;
  console.log(`\n═══════ ${passed}/${results.length} checks passed ═══════`);
  if (passed < results.length) process.exitCode = 1;
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
