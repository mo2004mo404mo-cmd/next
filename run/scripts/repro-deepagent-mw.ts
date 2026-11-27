/**
 * Repro: "Invalid response from wrapModelCall in middleware
 * patchToolCallsMiddleware: expected AIMessage or Command, got object"
 *
 * Mirrors question-deep-agent.ts structure with zero app imports:
 *   ChatOpenAI (MEDQ_AGENT_* env) + tools + one subagent + agent.stream
 * Run: bun scripts/repro-deepagent-mw.ts
 */
import { ChatOpenAI } from '@langchain/openai';
import { DynamicStructuredTool } from '@langchain/core/tools';
import { HumanMessage } from '@langchain/core/messages';
import { createDeepAgent, type SubAgent } from 'deepagents';
import { z } from 'zod';

const baseUrl = process.env.MEDQ_AGENT_BASE_URL || 'http://127.0.0.1:3000/v1';
const apiKey = process.env.MEDQ_AGENT_API_KEY || '';
const modelId = process.env.MEDQ_AGENT_MODEL || 'zai-llm';
console.log(`[repro] model=${modelId} baseUrl=${baseUrl} key=${apiKey ? 'set' : 'MISSING'}`);

const model = new ChatOpenAI({
  apiKey,
  model: modelId,
  temperature: 0.3,
  configuration: { baseURL: baseUrl },
  maxRetries: 4,
});

// ── Step 1: bare model invoke (no agent) ──
try {
  const r = await model.invoke([new HumanMessage('Say OK and nothing else.')]);
  console.log('[step1] bare invoke OK:', r.constructor.name, '| type=', (r as { type?: string }).type, '| content=', String(r.content).slice(0, 60));
} catch (e) {
  console.error('[step1] bare invoke FAILED:', e);
}

// ── Step 2: model with bound tools (tool-call round trip) ──
const calc = new DynamicStructuredTool({
  name: 'calculator',
  description: 'Compute a math expression',
  schema: z.object({ expression: z.string() }),
  func: async ({ expression }) => String(eval(expression)),
});
try {
  const bound = model.bindTools([calc]);
  const r = await bound.invoke([new HumanMessage('Use the calculator tool to compute 2+2. You must call the tool.')]);
  console.log('[step2] bound-tools invoke OK:', r.constructor.name, '| tool_calls=', (r as { tool_calls?: unknown[] }).tool_calls?.length ?? 0);
} catch (e) {
  console.error('[step2] bound-tools invoke FAILED:', e);
}

// ── Step 3: full deep agent with subagent (mirrors the real structure) ──
const author: SubAgent = {
  name: 'question-author',
  description: 'Writes one short exam question.',
  systemPrompt: 'You write tiny exam questions. Return only the question text.',
};
const agent = createDeepAgent({
  name: 'repro-agent',
  model,
  systemPrompt: [
    'You are a repro agent. Delegate question writing to the question-author subagent,',
    'then report the question back. Keep it to one sentence.',
  ].join('\n'),
  subagents: [author],
  tools: [calc],
});

try {
  const stream = await agent.stream(
    { messages: [new HumanMessage('Create one trivial question about hand hygiene via the subagent.')] },
    { streamMode: ['updates', 'messages'] } as never,
  );
  let n = 0;
  for await (const [mode, payload] of stream as AsyncIterable<[string, unknown]>) {
    n++;
    if (mode === 'messages') {
      const [chunk] = payload as [{ content?: unknown }, unknown];
      if (chunk?.content) console.log(`[step3] msg#${n}:`, String(chunk.content).slice(0, 80));
    } else if (mode === 'updates') {
      console.log(`[step3] update#${n}:`, JSON.stringify(payload).slice(0, 120));
    }
    if (n > 60) { console.log('[step3] truncating stream'); break; }
  }
  console.log('[step3] deep agent stream COMPLETED — no middleware error');
} catch (e) {
  console.error('[step3] deep agent FAILED:');
  console.error(e);
}
