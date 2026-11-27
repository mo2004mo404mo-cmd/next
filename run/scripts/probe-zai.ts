// Single tiny ZAI request to probe gateway health
const ZAI = (await import('z-ai-web-dev-sdk')).default;
const zai = await ZAI.create();
try {
  const t0 = Date.now();
  const r = await zai.chat.completions.create({
    messages: [{ role: 'user', content: 'Reply with exactly: OK' }],
    thinking: { type: 'disabled' },
    max_tokens: 5,
  });
  console.log(`ZAI healthy (${Date.now() - t0}ms):`, r.choices[0]?.message?.content);
} catch (e) {
  console.log('ZAI probe FAILED:', e instanceof Error ? e.message : e);
}
