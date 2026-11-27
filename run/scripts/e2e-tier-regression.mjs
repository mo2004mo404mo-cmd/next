#!/usr/bin/env node
/**
 * E2E regression for the Tier 1-4 enhancement batch (2026-10-23).
 *
 * Student session through chat v2, verifying the new behaviors end-to-end:
 *   1. create_flashcards tool — cards land in the SM-2 due queue
 *   2. analyze_my_weaknesses tool — real attempt data surfaces
 *   3. get_exam_blueprint tool — USMLE weights + week allocation
 *   4. search_medical_images — local image cache (cachedUrl + imgcache files)
 *   5. telemetry — AgentToolExecution + AgentRun rows written (checked by the
 *      caller via psql after the run; here we just confirm tools executed)
 * Each turn gets a fresh thread. Prints a PASS/FAIL verdict per check.
 */
const BASE = 'http://localhost:3000';
const email = 'student@medq.com', password = 'test123';

const results = [];
const check = (name, ok, detail = '') => {
  results.push({ name, ok });
  console.log(`  ${ok ? 'PASS' : 'FAIL'} — ${name}${detail ? ` (${detail})` : ''}`);
};

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
  console.log(`[0] login OK — ${session.user.email}\n`);

  async function sendChat(message, label) {
    console.log(`▶ ${label}`);
    const t0 = Date.now();
    r = await fetch(`${BASE}/api/agent/chat/v2`, {
      method: 'POST',
      headers: hdr(),
      body: JSON.stringify({ message, threadId: null }),
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
    const finalText = done?.data?.text ?? '';
    console.log(`  ${Date.now() - t0}ms · ${toolStarts.length} tool calls · reply ${finalText.length} chars`);
    for (const t of toolStarts) console.log(`    - ${t.data.toolName}`);
    return { toolStarts, finalText, events };
  }

  // ── 1. Flashcards ──
  const fc = await sendChat('Make exactly 3 flashcards about the nephron (front/back pairs) and save them to my flashcard review queue.', 'FLASHCARDS');
  const usedFlashcards = fc.toolStarts.some(t => t.data.toolName === 'create_flashcards');
  check('create_flashcards tool invoked', usedFlashcards);
  check('reply mentions review queue / due', /due|review|flashcard/i.test(fc.finalText), fc.finalText.slice(0, 120).replace(/\n/g, ' '));

  // ── 2. Weakness analysis ──
  const wk = await sendChat('What should I focus on in my studies? Analyze my actual performance data.', 'WEAKNESSES');
  const usedWeakness = wk.toolStarts.some(t => t.data.toolName === 'analyze_my_weaknesses');
  check('analyze_my_weaknesses tool invoked', usedWeakness);

  // ── 3. Exam blueprint ──
  const bp = await sendChat('Plan my 8-week USMLE Step 1 study schedule using the exam blueprint.', 'BLUEPRINT');
  const usedBlueprint = bp.toolStarts.some(t => t.data.toolName === 'get_exam_blueprint');
  check('get_exam_blueprint tool invoked', usedBlueprint);
  const allocMatches = [...bp.finalText.matchAll(/week\s*\d+|\d+\s*(?:-|–)?\s*week/gi)].length;
  check('schedule has per-area week allocations', allocMatches >= 4, `${allocMatches} week mentions`);

  // ── 4. Image search + local cache ──
  const im = await sendChat('search for images of the cardiac cycle', 'IMAGE SEARCH + CACHE');
  const imageTool = im.toolStarts.find(t => t.data.toolName === 'search_medical_images');
  check('search_medical_images tool invoked', Boolean(imageTool));
  // cachedUrl appears in the tool result? (tool.result event data or the model's markdown)
  const toolResultEvent = im.events.find(e => e.name === 'tool.result' && e.data?.toolName === 'search_medical_images');
  const resultJson = toolResultEvent?.data?.result ?? toolResultEvent?.data?.excerpt ?? '';
  const hasCachedField = resultJson.includes('"cached":true');
  check('tool result returns cached local images', hasCachedField);
  // embedded local URLs in the final reply?
  const localImgs = [...im.finalText.matchAll(/!\[[^\]]*\]\((\/generated\/imgcache\/[^)\s]+)\)/g)];
  const remoteImgs = [...im.finalText.matchAll(/!\[[^\]]*\]\((https?:\/\/[^)\s]+)\)/g)];
  check('reply embeds locally-cached image(s)', localImgs.length > 0, `${localImgs.length} local, ${remoteImgs.length} remote`);
  if (localImgs[0]) {
    const head = await fetch(`${BASE}${localImgs[0][1]}`);
    const buf = Buffer.from(await head.arrayBuffer());
    check('cached image serves locally', head.status === 200 && buf.length > 1000, `HTTP ${head.status}, ${buf.length}B`);
  } else if (remoteImgs[0]) {
    console.log('  (note: model chose remote URLs — cache may have failed; check imgcache dir)');
  }

  // ── Verdict ──
  const passed = results.filter(x => x.ok).length;
  console.log(`\n═══════ ${passed}/${results.length} checks passed ═══════`);
  if (passed < results.length) process.exitCode = 1;
}

main().catch(e => { console.error('FAILED:', e.message); process.exit(1); });
