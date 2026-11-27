/**
 * scripts/verify-deep-agent-provider.ts — verify the deep agent's provider
 * resolution after the managed-Z.AI fallback fix.
 *
 * 1. resolveMedQAgentConfig() must now return the managed Z.AI gateway
 *    (baseUrl + apiKey + X-Token headers) when no MEDQ_AGENT_API_KEY /
 *    OPENAI_API_KEY env key is set.
 * 2. A LangChain ChatOpenAI call through that config must succeed (proves the
 *    gateway headers ride along — plain Bearer gets 403).
 * 3. A REAL deep-agent generation run (count=1) must save a question.
 *
 * Usage: bun scripts/verify-deep-agent-provider.ts
 */
import { ChatOpenAI } from '@langchain/openai';
import { resolveMedQAgentConfig } from '../src/lib/agent/deep-agent-runtime';
import { db } from '../src/lib/db';

async function main() {
  // ── 1. Config resolution ──
  const config = resolveMedQAgentConfig();
  console.log('[1] resolveMedQAgentConfig():');
  console.log('    baseUrl :', config.baseUrl);
  console.log('    apiKey  :', config.apiKey ? `${config.apiKey.slice(0, 6)}…` : '(EMPTY — BROKEN)');
  console.log('    model   :', config.model);
  console.log('    label   :', config.label ?? '(none)');
  console.log('    headers :', config.defaultHeaders ? Object.keys(config.defaultHeaders).join(', ') : '(none)');
  if (!config.apiKey) {
    console.log('\nFAIL: no provider resolved — the bug is still present.');
    process.exit(1);
  }

  // ── 2. LangChain round-trip through the resolved config ──
  console.log('\n[2] ChatOpenAI round-trip through resolved config…');
  const modelConfiguration: { baseURL?: string; defaultHeaders?: Record<string, string> } = {
    baseURL: config.baseUrl,
  };
  if (config.defaultHeaders) modelConfiguration.defaultHeaders = config.defaultHeaders;
  const model = new ChatOpenAI({
    apiKey: config.apiKey,
    model: config.model,
    temperature: 0,
    configuration: modelConfiguration,
    maxRetries: 2,
  });
  const response = await model.invoke('Reply with exactly: OK');
  const text = String(response.content ?? '').trim();
  console.log('    reply   :', text.slice(0, 60));
  if (!text) {
    console.log('\nFAIL: empty LLM response.');
    process.exit(1);
  }

  // ── 3. Full deep-agent generation run (count = 1) ──
  console.log('\n[3] Full deep-agent generation run (count=1)…');
  const { runDeepAgentQuestionGenerationWithFallback } = await import('../src/lib/agent/question-deep-agent');

  const user = await db.user.findFirst({ where: { email: 'demo@medq.app' }, select: { id: true, email: true } })
    ?? await db.user.findFirst({ select: { id: true, email: true }, orderBy: { createdAt: 'asc' } });
  if (!user) {
    console.log('    (no user in DB — skipping the generation run)');
    return;
  }
  console.log('    user    :', user.email);

  const savedIds: string[] = [];
  let statusLine = '';
  let errorLine = '';
  for await (const event of runDeepAgentQuestionGenerationWithFallback({
    topic: 'Pediatric dehydration assessment in children',
    system: 'Pediatrics',
    types: ['mcq'],
    difficulties: ['Medium'],
    count: 1,
    userId: user.id,
  })) {
    if (event.type === 'status') { statusLine = event.model; console.log('    status  :', event.model); }
    if (event.type === 'saved') {
      savedIds.push(String(event.question.id ?? ''));
      console.log('    saved   :', JSON.stringify({
        id: event.question.id,
        topic: event.question.topic,
        type: event.question.type,
      }));
    }
    if (event.type === 'error') { errorLine = event.error; console.log('    error   :', event.error.slice(0, 200)); }
    if (event.type === 'done') console.log('    done    :', `saved ${event.saved}/${event.requested}`);
    if (event.type === 'plan') console.log('    plan    :', `${(event.todos as unknown[]).length} steps`);
  }

  if (savedIds.length === 0) {
    console.log(`\nFAIL: no question saved.${errorLine ? ` Last error: ${errorLine}` : ''}`);
    process.exit(1);
  }

  console.log(`\nPASS: provider resolution + generation OK (status="${statusLine}", saved=${savedIds.length}).`);
  console.log('Test question ids (cleanup candidates):', savedIds.join(', '));
  process.exit(0);
}

main().catch((err) => {
  console.error('FAIL: unexpected error:', err);
  process.exit(1);
});
