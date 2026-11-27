/**
 * Probe the ZAI vision chain exactly the way describeImage will call it:
 * z-ai-web-dev-sdk → /etc/.z-ai-config (internal-api.z.ai) → createVision
 * with glm-4.5v on the nephron illustration.
 */
async function main() {
  const fs = await import('fs');
  const cfg = JSON.parse(fs.readFileSync('/etc/.z-ai-config', 'utf-8'));
  console.log('baseUrl:', cfg.baseUrl);

  const { default: ZAI } = await import('z-ai-web-dev-sdk');
  const zai = new ZAI(cfg);

  const img = fs.readFileSync('/home/z/my-project/download/medq-skill-tests/skill-test-illustration-nephron.jpg');
  const dataUrl = `data:image/jpeg;base64,${img.toString('base64')}`;
  console.log('image bytes:', img.length, 'dataUrl chars:', dataUrl.length);

  const t0 = Date.now();
  try {
    const res = await zai.chat.completions.createVision({
      model: 'glm-4.5v',
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: 'Identify the anatomical structure shown and list its labeled parts, briefly.' },
            { type: 'image_url', image_url: { url: dataUrl } },
          ],
        },
      ],
      thinking: { type: 'disabled' },
    });
    const text = res?.choices?.[0]?.message?.content || JSON.stringify(res).slice(0, 300);
    console.log(`OK in ${Date.now() - t0}ms`);
    console.log('VISION OUTPUT:', text.slice(0, 600));
  } catch (err) {
    console.log(`FAILED in ${Date.now() - t0}ms`);
    console.log('ERROR:', err instanceof Error ? err.message : String(err));
  }
}
main();
