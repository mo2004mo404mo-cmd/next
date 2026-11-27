/**
 * Direct probe of the VLM chain used by ingest-media.ts:
 *   getZai() → getVisionModel() → createVision()
 * Prints the raw error each candidate model throws (the library swallows
 * these), so we can see WHY frame/slide OCR returns null.
 *
 * Run: bunx tsx scripts/probe-vlm.ts
 */
import fs from 'fs';

const VISION_MODELS = ['glm-4.5v', 'glm-4.6v', 'glm-4v'];

async function main() {
  const mod = (await import('z-ai-web-dev-sdk')) as unknown as {
    default: { create: () => Promise<{ chat: { completions: { createVision: (b: Record<string, unknown>) => Promise<unknown> } } }> };
  };
  const zai = await mod.default.create();
  console.log('sdk instance ok');

  const img = fs.readFileSync('/home/z/my-project/upload/fixtures/slide1.png');
  const dataUrl = `data:image/png;base64,${img.toString('base64')}`;

  for (const model of VISION_MODELS) {
    try {
      const res = (await zai.chat.completions.createVision({
        model,
        messages: [
          { role: 'user', content: [
            { type: 'text', text: 'Reply with the exact title text visible in this image, nothing else.' },
            { type: 'image_url', image_url: { url: dataUrl } },
          ] },
        ],
        thinking: { type: 'disabled' },
      })) as { choices?: Array<{ message?: { content?: string } }> };
      const text = res?.choices?.[0]?.message?.content;
      console.log(`✓ ${model} → ${JSON.stringify(text?.slice(0, 120))}`);
    } catch (e) {
      console.log(`✗ ${model} → ${e instanceof Error ? e.message.slice(0, 300) : e}`);
    }
  }
}

void main().catch((e) => { console.error('probe crashed:', e); process.exit(1); });
