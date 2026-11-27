#!/usr/bin/env node
/**
 * E2E: image search steering fix.
 * Sends the exact user message from the transcript ("search for heart images")
 * through chat v2 as the student, then checks:
 *   1. which tool the model called (search_medical_images vs _references)
 *   2. whether the final reply embeds ![caption](imageUrl) markdown images
 *   3. that the image URLs are fetchable (renderable in the chat panel)
 */
const BASE = 'http://localhost:3000';
const email = 'student@medq.com', password = 'test123';

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
  console.log(`[1] login OK — ${session.user.email}`);

  console.log('[2] sending: "search for heart images" ...');
  const t0 = Date.now();
  r = await fetch(`${BASE}/api/agent/chat/v2`, {
    method: 'POST',
    headers: hdr(),
    body: JSON.stringify({ message: 'search for heart images', threadId: null }),
  });
  if (!r.ok) throw new Error(`chat v2 HTTP ${r.status}: ${(await r.text()).slice(0, 200)}`);
  const raw = await r.text();
  console.log(`    stream completed in ${Date.now() - t0}ms (${raw.length} bytes)`);

  // Parse SSE events (named events: event: <name>\ndata: <json>)
  const events = [];
  for (const block of raw.split('\n\n')) {
    const ev = block.match(/^event: (.+)$/m);
    const dt = block.match(/^data: (.+)$/m);
    if (ev && dt) { try { events.push({ name: ev[1], data: JSON.parse(dt[1]) }); } catch {} }
  }
  const toolStarts = events.filter(e => e.name === 'tool.call').map(e => `${e.data.toolName}(${JSON.stringify(e.data.args).slice(0, 90)})`);
  const toolEnds = events.filter(e => e.name === 'tool.result');
  const done = events.find(e => e.name === 'done');
  console.log(`    tools called: ${toolStarts.length}`);
  for (const t of toolStarts) console.log(`      - ${t}`);
  for (const te of toolEnds) console.log(`      ∙ ${te.data?.toolName} -> ok`);

  // Check the final text for embedded markdown images
  const finalText = done?.data?.text ?? '';
  const imgs = [...finalText.matchAll(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g)];
  console.log(`\n[3] final reply: ${finalText.length} chars, ${imgs.length} inline markdown image(s)`);
  for (const m of imgs) console.log(`      ![${m[1].slice(0, 50)}](${m[2].slice(0, 80)})`);
  const usedReferences = toolStarts.some(t => t.startsWith('search_medical_references'));
  const usedImageSearch = toolStarts.some(t => t.startsWith('search_medical_images'));
  console.log(`\n[4] VERDICT: search_medical_images=${usedImageSearch ? 'YES ✓' : 'NO ✗'} | search_medical_references=${usedReferences ? 'yes (aux)' : 'no'} | images embedded=${imgs.length > 0 ? 'YES ✓' : 'NO ✗'}`);

  // Verify one embedded image URL is fetchable
  if (imgs[0]) {
    const head = await fetch(imgs[0][2], { redirect: 'follow' });
    const buf = Buffer.from(await head.arrayBuffer());
    console.log(`[5] first embedded image: HTTP ${head.status}, ${buf.length} bytes, ${head.headers.get('content-type')}`);
  }
  if (!usedImageSearch || imgs.length === 0) {
    console.log('\nFINAL REPLY (for debugging):');
    console.log(finalText.slice(0, 800));
  }
}
main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
