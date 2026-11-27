// Task 29b — full model catalog + find the right endpoint for web-search/web-reader capabilities.
const BASE = 'https://ollama2.space-z.ai/v1';
const KEY = 'Z.ai';
const auth = { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' };

const models = await (await fetch(`${BASE}/models`, { headers: auth, signal: AbortSignal.timeout(15000) })).json();
console.log('FULL MODEL LIST:');
for (const m of models.data) console.log(`  ${m.id}  capability=${m.capability}  extra=${JSON.stringify(Object.keys(m))}`);
console.log('RAW:', JSON.stringify(models).slice(0, 2000));

// Raw 400 body for zai-web-search on chat/completions — may name the correct endpoint
const r1 = await fetch(`${BASE}/chat/completions`, { method: 'POST', headers: auth, body: JSON.stringify({ model: 'zai-web-search', messages: [{ role: 'user', content: 'anemia' }] }), signal: AbortSignal.timeout(15000) });
console.log('\nchat/completions zai-web-search →', r1.status, await r1.text());

// Endpoint variants
for (const path of ['/web-search', '/search', '/v1/web_search', '/tools/web_search', '/websearch']) {
  try {
    const r = await fetch(`${BASE}${path}`, { method: 'POST', headers: auth, body: JSON.stringify({ query: 'anemia', num: 2 }), signal: AbortSignal.timeout(10000) });
    const t = await r.text();
    const isHtml = t.trimStart().startsWith('<');
    console.log(`POST ${path} → ${r.status} ${isHtml ? '(HTML 404 page)' : t.slice(0, 200)}`);
  } catch (e) { console.log(`POST ${path} → TRANSPORT ${e.message}`); }
}
