#!/usr/bin/env node
/**
 * Task 26 part 2 — Assistant capability tour.
 * Creates ONE new chat thread as student@medq.com and walks it through every
 * capability, leaving the transcript in the account for the user to confirm:
 *   1 greeting/intro   2 web references [S#]   3 image search (inline)
 *   4 ui_action nav    5 flashcards            6 quiz vignette (interactive)
 *   7 file read        8 skill save            9 illustration (HITL approval)
 * Progress is appended to tmp/tour-state.json after EVERY turn so a crash
 * never loses completed turns. Re-running skips already-done turns.
 */
const BASE = 'http://localhost:3000';
const fs = require('node:fs');
const STATE_FILE = '/home/z/my-project/tmp/tour-state.json';

const TURNS = [
  { label: 'intro', msg: "Hi! I'm a medical student testing you. In one short paragraph: what can you help me with in this app?" },
  { label: 'web-references', msg: 'What are the current ESC 2024 guidelines on hypertension thresholds? Cite your sources.' },
  { label: 'image-search', msg: 'Show me real images of the human heart anatomy.' },
  { label: 'ui-navigation', msg: 'Open the question bank for me please.' },
  { label: 'flashcards', msg: 'Create 3 flashcards about anemia classification.' },
  { label: 'quiz-vignette', msg: 'Give me ONE USMLE-style clinical vignette question on sepsis. Do NOT reveal the answer yet — I want to attempt it first.' },
  { label: 'file-read', msg: 'Read the AGENTS.md file at the project root and summarize it in 3 short bullets.' },
  { label: 'skill-save', msg: "Save a simple skill named 'capability-demo-skill' whose content says: always cite sources in medical answers." },
  { label: 'illustration', msg: 'Generate a simple medical illustration of the cardiac cycle.' },
];

const state = fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) : { threadId: null, turns: {} };
const save = () => fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 1));

const jar = [];
const keep = (res) => {
  const sc = res.headers.getSetCookie?.() ?? [res.headers.get('set-cookie')].filter(Boolean);
  for (const c of sc) jar.push(c.split(';')[0]);
};
const hdr = () => ({ cookie: jar.join('; '), 'content-type': 'application/json' });

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
  if (!r.ok && r.status !== 302) throw new Error(`login failed: ${r.status}`);
}

async function approveIfNeeded(approval) {
  const id = approval?.id ?? approval?.approvalId;
  if (!id) return 'no-id';
  const r = await fetch(`${BASE}/api/agent/approvals/${id}`, {
    method: 'POST', headers: hdr(),
    body: JSON.stringify({ approved: true }),
  });
  return `approved(${r.status})`;
}

async function runTurn(label, msg, turnIdx) {
  const rec = { label, startedAt: new Date().toISOString(), tools: [], actions: [], approvals: [], llmCalls: null, error: null, textLen: 0, textHead: '', model: null };
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 420000); // 7 min cap
  try {
    const r = await fetch(`${BASE}/api/agent/chat/v2`, {
      method: 'POST', headers: hdr(), signal: controller.signal,
      body: JSON.stringify({ message: msg, threadId: state.threadId }),
    });
    const threadId = r.headers.get('x-thread-id');
    if (threadId && !state.threadId) { state.threadId = threadId; save(); }
    const raw = await r.text();
    for (const block of raw.split('\n\n')) {
      const ev = block.match(/^event: (.+)$/m)?.[1];
      const dt = block.match(/^data: (.+)$/m)?.[1];
      if (!ev || !dt) continue;
      let d; try { d = JSON.parse(dt); } catch { continue; }
      if (ev === 'meta' && d.threadId && !state.threadId) { state.threadId = d.threadId; save(); }
      if (ev === 'meta' && d.model) rec.model = d.model;
      if (ev === 'tool.call') rec.tools.push(d.toolName || d.name || '?');
      if (ev === 'actions') rec.actions.push(d);
      if (ev === 'approval_required') { rec.approvals.push(d); const a = await approveIfNeeded(d); rec.approvals.push({ decision: a }); }
      if (ev === 'done') { rec.llmCalls = d.llmCallCount ?? d.llmCalls ?? null; rec.textLen = (d.text || '').length; rec.textHead = (d.text || '').slice(0, 240); }
      if (ev === 'error') rec.error = (d.message || d.error || JSON.stringify(d)).slice(0, 200);
    }
  } catch (e) {
    rec.error = `fetch: ${e.message}`;
  } finally {
    clearTimeout(timer);
  }
  rec.finishedAt = new Date().toISOString();
  state.turns[turnIdx] = rec;
  save();
  console.log(`[${label}] thread=${state.threadId} tools=${rec.tools.join(',') || '-'} llmCalls=${rec.llmCalls} approvals=${rec.approvals.length} err=${rec.error || 'none'} text=${rec.textLen}ch`);
  console.log(`   head: ${rec.textHead.replace(/\n/g, ' ').slice(0, 160)}`);
}

async function main() {
  await login();
  console.log('logged in as student@medq.com; threadId =', state.threadId);
  const once = process.argv.includes('--once');
  for (let i = 0; i < TURNS.length; i++) {
    if (state.turns[i]) { console.log(`skip turn ${i + 1} (${TURNS[i].label}) — already done`); continue; }
    console.log(`— turn ${i + 1}/${TURNS.length}: ${TURNS[i].label}`);
    await runTurn(TURNS[i].label, TURNS[i].msg, i);
    if (once) { console.log('--once: exiting after this turn'); return; }
    await new Promise((r2) => setTimeout(r2, 2500));
  }
  console.log('TOUR COMPLETE. threadId =', state.threadId);
}
main().catch((e) => { console.error('FATAL:', e); process.exit(1); });
