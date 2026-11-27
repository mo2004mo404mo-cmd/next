#!/usr/bin/env node
/**
 * Reproduce the "tool result echoed as assistant text" issue with zai-llm.
 *
 * Flow: send a chat completion WITH a tool definition that the model will
 * call; then send the tool result back as a tool message; observe whether
 * the next assistant turn starts by echoing the raw tool-result JSON.
 */
import { readFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:3000/v1';
const KEY = process.env.MEDQ_AGENT_API_KEY
  ?? readFileSync('/home/z/my-project/.env', 'utf8').match(/MEDQ_AGENT_API_KEY=(.*)/)[1].trim();

const TOOLS = [{
  type: 'function',
  function: {
    name: 'search_medical_references',
    description: 'Search current medical references. Use for every clinical claim that needs up-to-date evidence.',
    parameters: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'The search query' },
        maxResults: { type: 'number', description: 'Max results (1-5)' },
      },
      required: ['query'],
    },
  },
}];

async function chat(messages, stream = true) {
  const res = await fetch(`${BASE}/chat/completions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${KEY}` },
    body: JSON.stringify({ model: 'zai-llm', messages, tools: TOOLS, stream, temperature: 0.2 }),
  });
  if (!res.ok) {
    console.error('HTTP', res.status, await res.text().catch(() => ''));
    process.exit(1);
  }
  if (!stream) {
    const j = await res.json();
    return { content: j.choices?.[0]?.message?.content ?? '', tool_calls: j.choices?.[0]?.message?.tool_calls ?? [] };
  }
  // Parse SSE
  const text = await res.text();
  let content = '';
  let toolCalls = [];
  for (const frame of text.split('\n\n')) {
    const line = frame.split('\n').find((l) => l.startsWith('data: '));
    if (!line) continue;
    const payload = line.slice(6);
    if (payload === '[DONE]') continue;
    try {
      const j = JSON.parse(payload);
      const delta = j.choices?.[0]?.delta;
      if (delta?.content) content += delta.content;
      if (delta?.tool_calls) {
        for (const tc of delta.tool_calls) {
          const i = tc.index ?? 0;
          toolCalls[i] = toolCalls[i] || { id: '', name: '', args: '' };
          if (tc.id) toolCalls[i].id += tc.id;
          if (tc.function?.name) toolCalls[i].name += tc.function.name;
          if (tc.function?.arguments) toolCalls[i].args += tc.function.arguments;
        }
      }
    } catch {}
  }
  return { content, tool_calls: toolCalls.filter(Boolean) };
}

(async () => {
  console.log('=== TURN 1: ask something that forces a tool call ===');
  const t1 = await chat([
    { role: 'system', content: 'You are a medical research assistant. Always search before answering.' },
    { role: 'user', content: 'What are the current STEMI ECG criteria? Search for references first.' },
  ]);
  console.log('content:', JSON.stringify(t1.content.slice(0, 200)));
  console.log('tool_calls:', JSON.stringify(t1.tool_calls));

  if (!t1.tool_calls.length) {
    console.log('\nNo tool call was made — cannot reproduce.');
    return;
  }

  console.log('\n=== TURN 2: send the tool result back ===');
  const TOOL_RESULT = JSON.stringify({
    results: [{
      title: 'STEMI ECG Criteria: ST-Elevation Thresholds',
      url: 'https://example.com/stemi-ecg-criteria',
      snippet: 'ST-segment elevation should be assessed 0.04s after the J-point; ≥2mm in V2-V3 men.',
    }],
    formatted: '[S1] STEMI ECG Criteria example.com',
    note: 'Cite these URLs inline.',
  });
  const t2 = await chat([
    { role: 'system', content: 'You are a medical research assistant. Always search before answering.' },
    { role: 'user', content: 'What are the current STEMI ECG criteria? Search for references first.' },
    { role: 'assistant', content: t1.content || null, tool_calls: t2c(t1.tool_calls) },
    { role: 'tool', tool_call_id: t1.tool_calls[0].id, content: TOOL_RESULT },
  ]);
  console.log('content (first 400):', JSON.stringify(t2.content.slice(0, 400)));
  const echoed = t2.content.includes('"results"') || t2.content.includes('"title"');
  console.log('\n>>> MODEL ECHOED TOOL RESULT AS TEXT:', echoed);
})();

function t2c(tcs) {
  return tcs.map((tc) => ({
    id: tc.id, type: 'function',
    function: { name: tc.name, arguments: tc.args || '{}' },
  }));
}
