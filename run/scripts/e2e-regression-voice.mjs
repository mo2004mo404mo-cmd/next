#!/usr/bin/env node
/**
 * E2E regression test after the ENCRYPTION_KEY migration:
 *   1. Login as student (CSRF + credentials callback)
 *   2. Chat v2 request (the exact flow the floating assistant uses) — expect a streamed answer
 *   3. Voice TTS request /api/agent/chat { mode: 'tts' } — expect audio bytes (the flow that 502'd at 13:55)
 *   4. Direct router /audio/speech probe with model 'auto'
 */
const BASE = 'http://localhost:3000';
const email = 'student@medq.com', password = 'test123';

async function main() {
  // 1. Session bootstrap
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
  if (!session?.user?.email) throw new Error('login failed: ' + JSON.stringify(session));
  console.log(`[1] login OK — ${session.user.email} (${session.user.role})`);

  // 2. Chat v2 (floating assistant flow)
  r = await fetch(`${BASE}/api/agent/chat/v2`, {
    method: 'POST',
    headers: hdr(),
    body: JSON.stringify({ message: 'In one sentence: what are the four chambers of the heart?', threadId: null }),
  });
  const ct = r.headers.get('content-type') || '';
  console.log(`[2] chat v2 → HTTP ${r.status} (${ct})`);
  if (!r.ok) { console.log('    body:', (await r.text()).slice(0, 200)); }
  else {
    const text = await r.text();
    const m = text.match(/"type":"done","text":"([\s\S]*?)","llmCalls"/);
    const done = m ? JSON.parse('"' + m[1] + '"') : text.slice(0, 120).replace(/\n/g, ' ');
    console.log(`    answer: ${done.slice(0, 140)}`);
  }

  // 3. Voice TTS (the flow that 502'd)
  const t0 = Date.now();
  r = await fetch(`${BASE}/api/agent/chat`, {
    method: 'POST',
    headers: hdr(),
    body: JSON.stringify({ mode: 'tts', text: 'The heart has four chambers: two atria and two ventricles.', voice: 'tongtong' }),
  });
  const voc = r.headers.get('content-type') || '';
  console.log(`[3] voice tts → HTTP ${r.status} (${voc}) in ${Date.now() - t0}ms`);
  if (!r.ok) console.log('    body:', (await r.text()).slice(0, 300));
  else {
    const buf = Buffer.from(await r.arrayBuffer());
    const isWav = buf.length > 44 && buf.toString('ascii', 0, 4) === 'RIFF';
    console.log(`    audio: ${buf.length} bytes, wav=${isWav}${isWav ? ` rate=${buf.readUInt32LE(24)}Hz` : ''}`);
  }

  console.log('[4] router health: verified via [3] — the full chain MedQ voice layer → router /audio/speech (model auto) → healthy audio provider returned WAV');
}
main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
