// Mock local Ollama server for the BYOK demo video.
// The sandbox has no Ollama installed; the user's server does. This mock
// serves the exact endpoints FreeLLMAPI probes (/v1/models, /api/tags) and
// speaks both wire formats for /v1/chat/completions:
//   - stream:false → plain OpenAI JSON
//   - stream:true  → text/event-stream with chunked deltas, a final
//                    finish_reason:"stop" chunk and a `data: [DONE]` sentinel
//                    (the earlier mock omitted these, which made FreeLLMAPI's
//                    stream parser fail with "stream ended unexpectedly").
const http = require('http');

const MODELS = [
  { name: 'llama3.2:3b', model: 'llama3.2:3b' },
  { name: 'qwen2.5:7b', model: 'qwen2.5:7b' },
  { name: 'medgemma:latest', model: 'medgemma:latest' },
];

// A deterministic, medically sensible canned answer so the demo shows a
// realistic assistant turn instead of lorem-ipsum.
function mockReply(model, messages) {
  const last = messages?.[messages.length - 1]?.content ?? '';
  const q = String(last).toLowerCase();
  if (q.includes('potassium')) {
    return 'The normal serum potassium range is 3.5–5.0 mmol/L. Values below 3.5 mmol/L define hypokalemia (weakness, cramps, ECG flattening of T waves), while values above 5.0 mmol/L define hyperkalemia (peaked T waves, risk of dysrhythmia). Always interpret alongside the ECG and renal function.';
  }
  if (q.includes('ready')) return 'READY';
  return `This is a mock reply from ${model} running on the local Ollama endpoint. It demonstrates the full MedQ AI Router chain: MedQ → /v1 proxy → router → custom OpenAI-compatible endpoint, with streaming token by token.`;
}

function sse(res, event) {
  res.write(`data: ${JSON.stringify(event)}\n\n`);
}

const server = http.createServer((req, res) => {
  const url = req.url.split('?')[0];
  if (url === '/api/tags') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ models: MODELS }));
    return;
  }
  if (url === '/v1/models') {
    res.writeHead(200, { 'content-type': 'application/json' });
    res.end(JSON.stringify({ data: MODELS.map((m) => ({ id: m.name })) }));
    return;
  }
  if (url === '/v1/chat/completions' && req.method === 'POST') {
    let body = '';
    req.on('data', (c) => (body += c));
    req.on('end', () => {
      let parsed = {};
      try { parsed = JSON.parse(body); } catch { /* keep defaults */ }
      const model = parsed.model || 'llama3.2:3b';
      const reply = mockReply(model, parsed.messages);

      if (!parsed.stream) {
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(
          JSON.stringify({
            model,
            choices: [
              { message: { role: 'assistant', content: reply }, finish_reason: 'stop' },
            ],
            usage: {
              prompt_tokens: 12,
              completion_tokens: Math.ceil(reply.length / 4),
              total_tokens: 12 + Math.ceil(reply.length / 4),
            },
          }),
        );
        return;
      }

      // Streaming: word-by-word deltas with small delays so the demo shows
      // tokens arriving progressively, then a terminal chunk + [DONE].
      res.writeHead(200, {
        'content-type': 'text/event-stream',
        'cache-control': 'no-cache',
        connection: 'keep-alive',
      });
      const words = reply.split(' ');
      let i = 0;
      const tick = () => {
        if (i < words.length) {
          sse(res, {
            id: `chatcmpl-mock${i}`,
            object: 'chat.completion.chunk',
            model,
            choices: [{ index: 0, delta: { content: (i === 0 ? '' : ' ') + words[i] }, finish_reason: null }],
          });
          i += 1;
          setTimeout(tick, 60);
        } else {
          sse(res, {
            id: 'chatcmpl-mock-done',
            object: 'chat.completion.chunk',
            model,
            choices: [{ index: 0, delta: {}, finish_reason: 'stop' }],
          });
          res.write('data: [DONE]\n\n');
          res.end();
        }
      };
      // Small initial latency so the demo shows the "thinking" beat.
      setTimeout(tick, 250);
    });
    return;
  }
  res.writeHead(404, { 'content-type': 'application/json' });
  res.end(JSON.stringify({ error: `not found: ${url}` }));
});

server.listen(11434, '127.0.0.1', () => {
  console.log('mock ollama listening on http://127.0.0.1:11434');
});
