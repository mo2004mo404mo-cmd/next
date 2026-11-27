// Minimal z-ai-web-dev-sdk chat test — is the built-in gateway alive?
import ZAI from 'z-ai-web-dev-sdk';

async function main() {
  const zai = await ZAI.create();
  for (const model of ['glm-4.5', 'glm-4.6', 'glm-4-flash', 'glm-4.5-air']) {
    try {
      const r = await zai.chat.completions.create({
        model,
        messages: [{ role: 'user', content: 'Reply with exactly: SDK-OK' }],
        max_tokens: 16,
      });
      const text = r.choices?.[0]?.message?.content ?? JSON.stringify(r).slice(0, 100);
      console.log(`OK   ${model}: ${String(text).slice(0, 60)}`);
    } catch (e) {
      console.log(`FAIL ${model}: ${e.message?.slice(0, 100)}`);
    }
  }
  process.exit(0);
}
main();
