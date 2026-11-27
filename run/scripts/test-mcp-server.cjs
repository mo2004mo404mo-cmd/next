#!/usr/bin/env node
/**
 * Minimal stdio MCP server for E2E-testing MedQ's MCP integration.
 * Implements: initialize, tools/list, tools/call over newline-delimited
 * JSON-RPC on stdin/stdout (MCP 2025-06-18).
 *
 * Exposes one tool: medical_reference_lookup { topic } → static text.
 */
const readline = require('node:readline');

const TOOLS = [
  {
    name: 'medical_reference_lookup',
    description: 'Look up a concise medical reference summary for a topic (test server).',
    inputSchema: {
      type: 'object',
      properties: {
        topic: { type: 'string', description: 'The medical topic to look up' },
      },
      required: ['topic'],
    },
  },
];

const REFERENCES = {
  'anion gap': 'Normal anion gap is 3-11 mEq/L (8-12 by older references). Elevated gap suggests metabolic acidosis from unmeasured anions (MUDPILES). [test-mcp-server]',
};

const rl = readline.createInterface({ input: process.stdin });
rl.on('line', (line) => {
  let message;
  try { message = JSON.parse(line); } catch { return; }
  if (!message || message.jsonrpc !== '2.0') return;
  const { id, method, params } = message;
  if (method === 'initialize') {
    reply(id, {
      protocolVersion: '2025-06-18',
      capabilities: { tools: {} },
      serverInfo: { name: 'medq-test-mcp', version: '1.0.0' },
    });
  } else if (method === 'notifications/initialized') {
    // notification — no response
  } else if (method === 'tools/list') {
    reply(id, { tools: TOOLS });
  } else if (method === 'tools/call') {
    const topic = String(params?.arguments?.topic ?? '').toLowerCase();
    const text = REFERENCES[topic]
      ?? `No reference entry for "${topic}" in the test server. [test-mcp-server]`;
    reply(id, { content: [{ type: 'text', text }] });
  } else if (id != null) {
    reply(id, undefined, { code: -32601, message: `Unknown method: ${method}` });
  }
});

function reply(id, result, error) {
  if (id == null) return;
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', id, ...(error ? { error } : { result }) }) + '\n');
}
