/**
 * Generate a realistic chest X-ray test image via the ZAI SDK directly
 * (same images.generations API the app's zai-image-adapter uses), for
 * E2E-verifying the "attach my own X-ray to a question" feature.
 */
import { createZAI } from '../src/lib/zai';
import fs from 'fs';

const PROMPT = 'Realistic PA chest X-ray radiograph, grayscale, medical imaging quality, bilateral diffuse reticulonodular opacities in the lower lung zones with preserved upper zones, normal cardiac silhouette, no text overlays, radiology teaching file style';

async function main() {
  const zai = await createZAI();
  if (!zai) { console.error('no ZAI client'); process.exit(1); }
  const response = await zai.images.generations.create({ prompt: PROMPT, size: '1024x1024' });
  const base64 = response?.data?.[0]?.base64;
  if (!base64) {
    console.error('empty response:', JSON.stringify(response).slice(0, 200));
    process.exit(1);
  }
  fs.writeFileSync('/home/z/my-project/tmp/e2e-t53-xray.jpg', Buffer.from(base64, 'base64'));
  console.log('saved tmp/e2e-t53-xray.jpg, bytes:', Math.round(base64.length * 3 / 4));
}

main().catch((e) => { console.error('FAILED:', e.message); process.exit(1); });
