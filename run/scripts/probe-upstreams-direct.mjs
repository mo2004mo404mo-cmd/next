#!/usr/bin/env node
/**
 * Probe the router's zai-llm upstreams directly with placeholder bearer keys
 * (z.ai gateways use platform-level auth). Identifies which upstream returns
 * the "401 missing X-Token header" that breaks mid-run turns.
 */
const upstreams = [
  { id: 2, name: 'ollama2', url: 'https://ollama2.space-z.ai/v1/chat/completions', key: 'Z.ai' },
  { id: 5, name: 'ollama22', url: 'https://ollama22.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 7, name: '16d9ef57', url: 'https://preview-chat-16d9ef57-df67-431b-8edf-8d3e6da2d694.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 8, name: '0d1efeef', url: 'https://preview-chat-0d1efeef-2cf7-4a06-9240-d673459b23ac.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 9, name: 'bd5e6bd6', url: 'https://preview-chat-bd5e6bd6-28c2-47f7-bd43-67de60c1cb4d.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 10, name: '21f349c7', url: 'https://preview-chat-21f349c7-97ba-4361-950e-5789e93f1c68.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 11, name: '37b5732e', url: 'https://preview-chat-37b5732e-2989-4018-9611-f76a0c6e7d21.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 12, name: 'aa99e679', url: 'https://preview-chat-aa99e679-6002-489d-908d-35c9e4de25e4.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 13, name: '4b909210', url: 'https://preview-chat-4b909210-232b-4bca-b58b-0d07cd4f6ad7.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 14, name: '11c0658d', url: 'https://preview-chat-11c0658d-d19c-442a-8a8f-8f27be8d7898.space-z.ai/v1/chat/completions', key: 'no-key' },
  { id: 15, name: 'd6f8aabb', url: 'https://preview-chat-d6f8aabb-09ce-4634-b56d-a42d19e7a90e.space-z.ai/v1/chat/completions', key: 'no-key' },
];

for (const u of upstreams) {
  const started = Date.now();
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 15_000);
    const res = await fetch(u.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${u.key}` },
      body: JSON.stringify({ model: 'glm-4.5-flash', messages: [{ role: 'user', content: 'ping' }], max_tokens: 4 }),
      signal: ctrl.signal,
    });
    clearTimeout(t);
    const text = await res.text().catch(() => '');
    console.log(`#${u.id} ${u.name}: ${res.status} (${Date.now() - started}ms) ${res.ok ? 'OK' : text.slice(0, 120).replace(/\s+/g, ' ')}`);
  } catch (e) {
    console.log(`#${u.id} ${u.name}: ERR (${Date.now() - started}ms) ${String(e).slice(0, 90)}`);
  }
}
