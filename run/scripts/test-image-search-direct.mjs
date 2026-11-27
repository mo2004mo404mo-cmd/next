#!/usr/bin/env node
/**
 * Probe the ZAI image-search backend exactly the way the
 * search_medical_images tool calls it:
 *   z-ai-web-dev-sdk → /etc/.z-ai-config (internal-api.z.ai) → images.search.create
 */
async function main() {
  const fs = await import('fs');
  const cfg = JSON.parse(fs.readFileSync('/etc/.z-ai-config', 'utf-8'));

  const { default: ZAI } = await import('z-ai-web-dev-sdk');
  const zai = new ZAI(cfg);

  const t0 = Date.now();
  try {
    const response = await zai.images.search.create({ query: 'heart anatomy diagram labeled', count: 5 });
    const results = response?.results ?? [];
    console.log(`OK in ${Date.now() - t0}ms — ${results.length} results`);
    for (const [i, r] of results.entries()) {
      console.log(`  [${i + 1}] ${r.caption?.slice(0, 60) ?? '(no caption)'}`);
      console.log(`      url=${r.original_url?.slice(0, 100) ?? '(missing)'}`);
      console.log(`      source=${r.source ?? '(missing)'} ${r.original_width ?? '?'}x${r.original_height ?? '?'}`);
    }
    // Verify the first URL is actually fetchable (so the chat can render it)
    if (results[0]?.original_url) {
      const head = await fetch(results[0].original_url, { method: 'GET', redirect: 'follow' });
      const buf = Buffer.from(await head.arrayBuffer());
      console.log(`\n  fetch check: HTTP ${head.status}, ${buf.length} bytes, content-type=${head.headers.get('content-type')}`);
    }
  } catch (err) {
    console.log(`FAILED in ${Date.now() - t0}ms`);
    console.log('ERROR:', err instanceof Error ? err.message : String(err));
    process.exit(1);
  }
}
main();
