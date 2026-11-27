#!/usr/bin/env node
/**
 * Probe which REAL AI endpoints answer from this sandbox.
 * Tests OpenAI-compatible chat completions on every configured provider.
 * Prints provider -> OK/FAIL + reply snippet. NEVER prints keys.
 */
import fs from 'node:fs';

const env = Object.fromEntries(
  fs.readFileSync('/home/z/my-project/.env', 'utf8')
    .split('\n')
    .filter((l) => l.includes('=') && !l.startsWith('#'))
    .map((l) => [l.slice(0, l.indexOf('=')), l.slice(l.indexOf('=') + 1).trim().replace(/^["']|["']$/g, '')]),
);

async function probe(name, url, key, model, extraHeaders = {}) {
  const ctl = new AbortController();
  const t = setTimeout(() => ctl.abort(), 25000);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${key}`, ...extraHeaders },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: 'Reply with exactly: REAL-ENDPOINT-OK' }],
        max_tokens: 20,
        stream: false,
      }),
      signal: ctl.signal,
    });
    const text = await res.text();
    let snippet = text.slice(0, 120).replace(/\s+/g, ' ');
    try {
      const j = JSON.parse(text);
      snippet = (j.choices?.[0]?.message?.content ?? j.error?.message ?? snippet).toString().slice(0, 80);
    } catch { /* raw */ }
    console.log(`${res.status === 200 ? 'OK  ' : 'FAIL'} ${name.padEnd(22)} ${model.padEnd(18)} http=${res.status} :: ${snippet}`);
  } catch (e) {
    console.log(`ERR  ${name.padEnd(22)} ${model.padEnd(18)} :: ${e.message}`);
  } finally {
    clearTimeout(t);
  }
}

async function listModels(name, url, key) {
  try {
    const res = await fetch(url, { headers: { authorization: `Bearer ${key}` } });
    if (!res.ok) { console.log(`LIST ${name}: http ${res.status}`); return; }
    const j = await res.json();
    const ids = (j.data ?? j.models ?? []).map((m) => m.id ?? m.name).slice(0, 12);
    console.log(`LIST ${name}: ${ids.join(', ')}`);
  } catch (e) {
    console.log(`LIST ${name}: ${e.message}`);
  }
}

const zaiBase = (env.ZAI_BASE_URL || '').replace(/\/$/, '');
const zaiKey = env.ZAI_API_KEY || '';

// ZAI proxy — try both /v1 and root paths
await listModels('ZAI /v1/models', `${zaiBase}/v1/models`, zaiKey);
for (const m of ['zai-llm', 'glm-4.5', 'glm-4.5-air']) {
  await probe('ZAI /v1/chat', `${zaiBase}/v1/chat/completions`, zaiKey, m);
}

// GLM direct
if (env.GLM_API_KEY) {
  await probe('GLM bigmodel', `${(env.GLM_BASE_URL || 'https://open.bigmodel.cn/api/paas/v4').replace(/\/$/, '')}/chat/completions`, env.GLM_API_KEY, 'glm-4-flash');
}
// OpenAI direct
if (env.OPENAI_API_KEY) {
  await probe('OpenAI', `${(env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')}/chat/completions`, env.OPENAI_API_KEY, 'gpt-4o-mini');
}
// DeepSeek
if (env.DEEPSEEK_API_KEY) {
  await probe('DeepSeek', `${(env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com/v1').replace(/\/$/, '')}/chat/completions`, env.DEEPSEEK_API_KEY, 'deepseek-chat');
}
