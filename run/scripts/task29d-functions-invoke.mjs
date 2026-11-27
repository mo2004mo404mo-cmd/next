// Task 29d — test functions/invoke for web_search/web_reader on managed + custom gateways.
const payload = (fn, args) => JSON.stringify({ function_name: fn, arguments: args });
const headers = (key, extra = {}) => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${key}`, 'X-Z-AI-From': 'Z', ...extra });

const MANAGED = {
  name: 'managed internal-api.z.ai',
  base: 'https://internal-api.z.ai/v1',
  headers: headers('Z.ai', {
    'X-Chat-Id': 'chat-691a8232-8160-46f6-8772-b17f55363ed9',
    'X-User-Id': 'cba33489-424c-41e1-8356-ce27ee0fc249',
    'X-Token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2JhMzM0ODktNDI0Yy00MWUxLTgzNTYtY2UyN2VlMGZjMjQ5IiwiY2hhdF9pZCI6ImNoYXQtNjkxYTgyMzItODE2MC00NmY2LTg3NzItYjE3ZjU1MzYzZWQ5IiwicGxhdGZvcm0iOiJ6YWkifQ.WAVwdTNLUzSM1cpF2O1WM9BfulMgfze8STUySy26X5g',
  }),
};
const OLLAMA2 = { name: 'custom ollama2.space-z.ai', base: 'https://ollama2.space-z.ai/v1', headers: headers('Z.ai') };

async function probe(g, label, fn, args) {
  try {
    const r = await fetch(`${g.base}/functions/invoke`, { method: 'POST', headers: g.headers, body: payload(fn, args), signal: AbortSignal.timeout(30000) });
    const t = await r.text();
    const isHtml = t.trimStart().startsWith('<');
    console.log(`[${g.name}] ${label} → ${r.status} ${isHtml ? '(HTML 404)' : t.slice(0, 260)}`);
    return { status: r.status, text: t };
  } catch (e) { console.log(`[${g.name}] ${label} → TRANSPORT ${e.message}`); return { status: 0, text: '' }; }
}

for (const g of [MANAGED, OLLAMA2]) {
  await probe(g, 'web_search', 'web_search', { query: 'anemia treatment guidelines 2024', num: 3 });
  await probe(g, 'web_reader', 'web_reader', { url: 'https://example.com' });
}

// Managed gateway: does chat/completions accept zai-web-search?
try {
  const r = await fetch(`${MANAGED.base}/chat/completions`, { method: 'POST', headers: MANAGED.headers, body: JSON.stringify({ model: 'zai-web-search', messages: [{ role: 'user', content: 'anemia' }] }), signal: AbortSignal.timeout(30000) });
  console.log(`[managed] chat/completions zai-web-search → ${r.status} ${(await r.text()).slice(0, 220)}`);
} catch (e) { console.log('[managed] chat/completions zai-web-search → TRANSPORT', e.message); }
