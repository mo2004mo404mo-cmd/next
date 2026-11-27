// Test the z-ai-web-dev-sdk LLM chat path (as MedQ's skills would use)
const ZAI = require('/home/z/my-project/node_modules/z-ai-web-dev-sdk/dist/index.js');

async function main() {
  const zai = await (ZAI.default || ZAI).create();
  console.log('SDK loaded');

  // 1. simple chat completion
  try {
    const completion = await zai.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a terse medical tutor.' },
        { role: 'user', content: 'Reply with exactly: SKILL-TEST-OK' },
      ],
    });
    console.log('CHAT OK:', JSON.stringify(completion).slice(0, 300));
  } catch (e) {
    console.log('CHAT FAIL:', e.message);
  }

  // 2. model listing if available
  try {
    const models = await zai.models.list();
    console.log('MODELS:', (models.data || []).map((m) => m.id).join(', ').slice(0, 300));
  } catch (e) {
    console.log('MODELS FAIL:', e.message);
  }
}

main().catch((e) => console.log('FATAL:', e.message));
