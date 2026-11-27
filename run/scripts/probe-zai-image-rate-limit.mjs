/**
 * Poll the ZAI image API until the 429 rate limit clears (max ~6 min).
 * Writes result to scripts/.zai-image-probe-result.txt
 */
import fs from 'fs';

const OUT = '/home/z/my-project/scripts/.zai-image-probe-result.txt';

async function attempt() {
  const cfg = JSON.parse(fs.readFileSync('/etc/.z-ai-config', 'utf-8'));
  const loader = new Function('return import("z-ai-web-dev-sdk")');
  const mod = await loader();
  const Ctor = mod?.default ?? mod;
  const zai = new Ctor(cfg);
  const res = await zai.images.generations.create({
    prompt: 'Simple educational diagram of coronary artery anatomy, clean medical illustration',
    size: '1344x768',
  });
  return res;
}

const t0 = Date.now();
for (let i = 1; i <= 12; i++) {
  try {
    const res = await attempt();
    const item = res?.data?.[0] || {};
    const b64 = item.b64_json || '';
    fs.writeFileSync(OUT, `SUCCESS at attempt ${i} after ${Math.round((Date.now()-t0)/1000)}s: b64 length ${b64.length}, url ${item.url || '(none)'}\n`);
    console.log(`SUCCESS at attempt ${i}`);
    process.exit(0);
  } catch (err) {
    const msg = String(err?.message || err).slice(0, 150);
    console.log(`attempt ${i} failed: ${msg}`);
    fs.writeFileSync(OUT, `attempt ${i} (${Math.round((Date.now()-t0)/1000)}s): ${msg}\n`);
    if (!msg.includes('429')) {
      fs.writeFileSync(OUT, `STOPPED at attempt ${i}: non-429 error: ${msg}\n`);
      process.exit(1);
    }
    await new Promise(r => setTimeout(r, 30000));
  }
}
fs.writeFileSync(OUT, 'STILL_RATE_LIMITED after 12 attempts (~6 min)\n');
console.log('still rate limited after 12 attempts');
