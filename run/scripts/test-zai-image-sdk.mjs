/**
 * Test ZAI image generation via z-ai-web-dev-sdk directly (same as zai-image-adapter).
 */
import fs from 'fs';
import path from 'path';
import os from 'os';

const CONFIG_PATHS = [
  path.join(process.cwd(), '.z-ai-config'),
  path.join(os.homedir(), '.z-ai-config'),
  '/etc/.z-ai-config',
];

function readConfig() {
  for (const p of CONFIG_PATHS) {
    try {
      const raw = fs.readFileSync(p, 'utf-8');
      return JSON.parse(raw);
    } catch { /* try next */ }
  }
  return null;
}

async function main() {
  const cfg = readConfig();
  const apiKey = process.env.ZAI_API_KEY || cfg?.apiKey;
  const baseUrl = process.env.ZAI_BASE_URL || cfg?.baseUrl;
  const token = cfg?.token;
  console.log('has apiKey:', !!apiKey, '| has baseUrl:', !!baseUrl, '| has token:', !!token);

  const loader = new Function('return import("z-ai-web-dev-sdk")');
  const mod = await loader();
  const Ctor = mod?.default ?? mod;
  // Mirror src/lib/zai.ts: prefer `new Ctor(config)` when .z-ai-config exists
  const zai = cfg ? new Ctor(cfg) : await Ctor.create();
  if (!zai) { console.log('SDK instantiation failed'); return; }

  const t0 = Date.now();
  try {
    const res = await zai.images.generations.create({
      model: process.env.MEDQ_AGENT_IMAGE_MODEL || undefined,
      prompt: 'Simple educational diagram of coronary artery anatomy, clean medical illustration',
      size: '1344x768',
    });
    const ms = Date.now() - t0;
    const item = res?.data?.[0] || {};
    console.log('SUCCESS in', ms, 'ms');
    console.log('keys:', Object.keys(res || {}));
    console.log('item keys:', Object.keys(item));
    if (item.url) console.log('url:', item.url);
    if (item.b64_json) console.log('b64_json length:', item.b64_json.length);
  } catch (err) {
    console.log('FAILED in', Date.now() - t0, 'ms');
    console.log('error:', String(err && err.message || err).slice(0, 400));
  }
}

main().catch((e) => { console.error('fatal', e); process.exit(1); });
