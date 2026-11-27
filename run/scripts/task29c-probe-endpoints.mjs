// Task 29c — map each gateway capability to its actual /v1/* endpoint.
const BASE = 'https://ollama2.space-z.ai/v1';
const auth = { Authorization: 'Bearer Z.ai', 'Content-Type': 'application/json' };

async function probe(method, path, body) {
  try {
    const r = await fetch(`${BASE}${path}`, { method, headers: auth, body: body ? JSON.stringify(body) : undefined, signal: AbortSignal.timeout(20000) });
    const t = await r.text();
    const pretty = t.trimStart().startsWith('<') ? '(HTML 404 page)' : t.slice(0, 220);
    console.log(`${method} ${path} → ${r.status} ${pretty}`);
    return { status: r.status, text: t };
  } catch (e) { console.log(`${method} ${path} → TRANSPORT ${e.message}`); return { status: 0, text: '' }; }
}

// Index / docs
await probe('GET', '/');
await probe('GET', '/docs');
await probe('GET', '/openapi.json');

// OpenAI-style sub-endpoints for each capability
await probe('POST', '/audio/speech', { model: 'zai-tts', input: 'hello', voice: 'alloy' });
await probe('POST', '/images/generations', { model: 'zai-image-gen', prompt: 'a heart', n: 1, size: '512x512' });
await probe('GET', '/web_search?query=anemia');
await probe('POST', '/web_search', { model: 'zai-web-search', query: 'anemia' });
await probe('POST', '/web_search', { model: 'zai-web-search', messages: [{ role: 'user', content: 'anemia' }] });
await probe('POST', '/web_reader', { model: 'zai-web-reader', url: 'https://example.com' });
await probe('POST', '/responses', { model: 'zai-web-search', input: 'anemia' });
