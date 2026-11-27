// test-zai-vlm.mjs — probe whether the z-ai-web-dev-sdk VLM (used by the
// Bank question extractor for image-based questions) actually works in the
// current sandbox. Creates a tiny 1×1 PNG and asks the VLM to describe it.
import ZAI from 'z-ai-web-dev-sdk';

const TINY_PNG_DATAURL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8z8BQDwAEhQGAhKmWmwAAAABJRU5ErkJggg==';

try {
  console.log('creating ZAI client...');
  const zai = await ZAI.create();
  console.log('✓ client created');
  console.log('calling VLM (chat.completions.createVision)...');
  const completion = await zai.chat.completions.createVision({
    model: 'glm-4.5v',
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: 'Describe this image in one short sentence.' },
          { type: 'image_url', image_url: { url: TINY_PNG_DATAURL } },
        ],
      },
    ],
    thinking: { type: 'disabled' },
  });
  const text = completion?.choices?.[0]?.message?.content || '(empty)';
  console.log('✓ VLM responded:', String(text).slice(0, 200));
} catch (err) {
  console.error('✗ VLM FAILED:', err?.message || err);
  if (err?.response) {
    console.error('  status:', err.response.status);
    console.error('  body:', JSON.stringify(err.response.data || err.response.body || {}).slice(0, 300));
  }
  process.exit(1);
}
