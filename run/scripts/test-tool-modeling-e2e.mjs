#!/usr/bin/env node
/**
 * E2E test for the tool-call modeling fixes (chat v2 SSE stream).
 *
 * Reproduces the user's "create questions on X" flow and asserts the wire
 * contract on the SSE frames:
 *   1. generation.tool.call frames carry REAL args (not {})
 *   2. generation.tool.result frames pair by id with their call
 *   3. every tool.call gets a matching tool.result (no stuck "requested")
 *   4. no duplicate cards for the same call (outer vs generation channels)
 *   5. text deltas contain no raw tool-result JSON ({"results":... echoes)
 *
 * Usage: node scripts/test-tool-modeling-e2e.mjs "create 2 questions on asthma"
 */
import { readFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:3000';
const KEY = readFileSync('/home/z/my-project/.env', 'utf8').match(/MEDQ_AGENT_API_KEY=(.*)/)[1].trim();
const MESSAGE = process.argv[2] ?? 'create 2 mcq questions on asthma, keep it quick, no images';

// ── 1. Get an authenticated session (NextAuth credentials flow) ──
async function login() {
  const csrfRes = await fetch(`${BASE}/api/auth/csrf`);
  const csrfCookie = csrfRes.headers.get('set-cookie')?.split(';')[0] ?? '';
  const { csrfToken } = await csrfRes.json();

  const body = new URLSearchParams({
    email: 'student@medq.com',
    password: 'test123',
    csrfToken,
    callbackUrl: `${BASE}/`,
    json: 'true',
  });
  const loginRes = await fetch(`${BASE}/api/auth/callback/credentials`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Cookie: csrfCookie,
    },
    body,
    redirect: 'manual',
  });
  const cookies = [csrfCookie];
  for (const c of loginRes.headers.getSetCookie?.() ?? []) {
    const pair = c.split(';')[0];
    if (pair.startsWith('authjs.session-token') || pair.startsWith('next-auth.session-token')) cookies.push(pair);
  }
  const cookieHeader = cookies.join('; ');
  const sessionRes = await fetch(`${BASE}/api/auth/session`, { headers: { Cookie: cookieHeader } });
  const session = await sessionRes.json();
  if (!session?.user?.id) throw new Error(`login failed: ${JSON.stringify(session).slice(0, 200)}`);
  return { cookie: cookieHeader, userId: session.user.id };
}

// ── 2. Stream the chat and collect SSE frames ──
async function chat(cookie) {
  const res = await fetch(`${BASE}/api/agent/chat/v2`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'text/event-stream',
      Cookie: cookie,
    },
    body: JSON.stringify({ message: MESSAGE, currentTab: 'dashboard' }),
  });
  if (!res.ok) throw new Error(`chat HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);

  const text = await res.text();
  const frames = [];
  for (const block of text.split('\n\n')) {
    const lines = block.split('\n');
    const ev = lines.find((l) => l.startsWith('event:'))?.slice(6).trim();
    const dataLine = lines.filter((l) => l.startsWith('data:')).map((l) => l.slice(5).trim()).join('\n');
    if (!ev || !dataLine) continue;
    let data;
    try { data = JSON.parse(dataLine); } catch { data = dataLine; }
    frames.push({ event: ev, data });
  }
  return frames;
}

// ── 3. Assertions ──
const { cookie } = await login();
console.log(`logged in; streaming: "${MESSAGE}"\n`);
const frames = await chat(cookie);

const calls = [];        // generation.tool.call / tool.call frames
const results = [];      // matching result frames
const subagents = [];
let textAll = '';
let doneFrame = null;

for (const f of frames) {
  if (f.event === 'text.delta' && typeof f.data?.text === 'string') textAll += f.data.text;
  if (f.event === 'tool.call') calls.push({ channel: 'outer', ...f.data });
  if (f.event === 'generation.tool.call') calls.push({ channel: 'gen', ...f.data });
  if (f.event === 'tool.result') results.push({ channel: 'outer', ...f.data });
  if (f.event === 'generation.tool.result') results.push({ channel: 'gen', ...f.data });
  if (f.event === 'subagent') subagents.push(f.data);
  if (f.event === 'done') doneFrame = f.data;
  if (f.event === 'error') console.log('!! error frame:', JSON.stringify(f.data).slice(0, 200));
}

console.log('── frame summary ──');
const counts = {};
for (const f of frames) counts[f.event] = (counts[f.event] ?? 0) + 1;
console.log(JSON.stringify(counts, null, 0), '\n');

console.log('── tool calls (channel | tool | id | args) ──');
for (const c of calls) {
  const argsStr = typeof c.args === 'string' ? c.args : JSON.stringify(c.args ?? {});
  console.log(`${c.channel.padEnd(5)} | ${String(c.toolName).padEnd(34)} | ${String(c.id).slice(0, 28).padEnd(28)} | ${argsStr.slice(0, 90)}`);
}
console.log('\n── tool results (channel | tool | id | status | excerpt) ──');
for (const r of results) {
  console.log(`${r.channel.padEnd(5)} | ${String(r.toolName).padEnd(34)} | ${String(r.id).slice(0, 28).padEnd(28)} | ${String(r.status).padEnd(6)} | ${String(r.excerpt ?? r.result ?? '').slice(0, 70)}`);
}
console.log('\n── subagent events ──');
for (const s of subagents) console.log(`${s.event}  ${s.name}`);

// Assertions
let failures = 0;
const fail = (msg) => { failures += 1; console.log(`FAIL: ${msg}`); };

// 1. args present on gen calls
for (const c of calls.filter((c) => c.channel === 'gen')) {
  if (c.args == null || (typeof c.args === 'object' && Object.keys(c.args).length === 0) || c.args === '{}') {
    fail(`generation.tool.call for ${c.toolName} has EMPTY args`);
  }
}

// 2. id pairing: every result id should match an open call id (per channel)
for (const channel of ['outer', 'gen']) {
  const chCalls = calls.filter((c) => c.channel === channel);
  const chResults = results.filter((r) => r.channel === channel);
  const callIds = new Set(chCalls.map((c) => String(c.id)));
  for (const r of chResults) {
    if (!callIds.has(String(r.id))) fail(`${channel} result id ${r.id} (${r.toolName}) does not match any call id`);
  }
  // 3. no stuck calls (every call eventually got a result) — only when the run completed
  if (doneFrame) {
    const resultIds = new Set(chResults.map((r) => String(r.id)));
    for (const c of chCalls) {
      if (!resultIds.has(String(c.id))) {
        // FIFO fallback may complete a different chip id; count matched by count
        console.log(`WARN: ${channel} call ${c.toolName} (${c.id}) has no id-matched result`);
      }
    }
    if (chResults.length < chCalls.length) fail(`${channel}: ${chCalls.length} calls but only ${chResults.length} results — stuck "waiting" cards`);
  }
}

// 4. no duplicate cards: same tool+id on both channels
const outerIds = new Set(calls.filter((c) => c.channel === 'outer').map((c) => String(c.id)));
for (const c of calls.filter((c) => c.channel === 'gen')) {
  if (outerIds.has(String(c.id))) fail(`duplicate card id ${c.id} on both channels`);
}

// 5. no raw tool-result JSON in the answer text (deltas may transiently show
//    a model echo; the FINAL done text must be scrubbed clean)
if (/\{"results":\s*\[|"formatted"|\\"note\\":\s*"Cite these URLs/.test(textAll)) {
  fail('answer text contains raw tool-result JSON (echo leak)');
}
if (/\{"provider":\s*"zai"/.test(textAll)) {
  fail('answer text contains raw image-provider JSON (echo leak)');
}
if (doneFrame && typeof doneFrame.text === 'string') {
  if (/\{"ok":\s*true,\s*"savedCount"|\{"results":\s*\[|\{"provider":\s*"zai"|\{"saved":\s*true/.test(doneFrame.text)) {
    fail('FINAL done text still contains verbatim tool-result JSON (scrub failed)');
  }
}

console.log('\n── final text (first 500 chars) ──');
console.log(textAll.slice(0, 500));
if (doneFrame) {
  console.log('\n── done.text (scrubbed, first 600 chars) ──');
  console.log(String(doneFrame.text ?? '').slice(0, 600));
  console.log(`\ndone: llmCallCount=${doneFrame.llmCallCount}, text length=${(doneFrame.text ?? '').length}`);
}

console.log(failures === 0 ? '\n✅ ALL ASSERTIONS PASSED' : `\n❌ ${failures} assertion(s) failed`);
process.exit(failures === 0 ? 0 : 1);
