/**
 * Verify server-side (Node) embedding via @huggingface/transformers.
 * Test models: bge-small-en-v1.5 (primary) with fallback to all-MiniLM-L6-v2.
 */
async function main() {
  const t0 = Date.now();
  const mod: any = await import('@huggingface/transformers');
  console.log('transformers.js imported in', Date.now() - t0, 'ms; env keys:', Object.keys(mod.env || {}).slice(0, 8).join(','));

  const candidates = [
    { id: 'Xenova/bge-small-en-v1.5', dims: 384, instruction: 'Represent this sentence for searching relevant passages: ' },
    { id: 'Xenova/all-MiniLM-L6-v2', dims: 384, instruction: '' },
  ];

  for (const cand of candidates) {
    try {
      const t1 = Date.now();
      const extractor = await mod.pipeline('feature-extraction', cand.id, { dtype: 'fp32' });
      console.log(`LOADED ${cand.id} in ${Date.now() - t1}ms`);

      const t2 = Date.now();
      const out = await extractor(
        [cand.instruction + 'aortic stenosis crescendo-decrescendo systolic murmur', 'mitral regurgitation holosystolic murmur'],
        { pooling: 'mean', normalize: true },
      );
      let vecs: number[][] = [];
      if (out.data instanceof Float32Array) {
        const n = Math.floor(out.data.length / cand.dims);
        for (let i = 0; i < n; i++) vecs.push(Array.from(out.data.subarray(i * cand.dims, (i + 1) * cand.dims)));
      } else if (Array.isArray(out.data)) {
        vecs = out.data as number[][];
        if (typeof vecs[0] === 'number') { const flat = vecs as unknown as number[]; vecs = [flat]; }
      }
      const cos = (a: number[], b: number[]) => a.reduce((s, v, i) => s + v * b[i], 0);
      console.log(`EMBED OK: count=${vecs.length} dims=${vecs[0]?.length} in ${Date.now() - t2}ms`);
      console.log(`  sim(as, mr) = ${cos(vecs[0], vecs[1]).toFixed(4)}`);
      const out2 = await extractor([cand.instruction + 'how to bake chocolate cookies'], { pooling: 'mean', normalize: true });
      const v2 = Array.from((out2.data instanceof Float32Array ? out2.data : new Float32Array(out2.data as number[])) as Float32Array);
      console.log(`  sim(as, cookies) = ${cos(vecs[0], v2).toFixed(4)} (should be much lower)`);
      // throughput probe: 32 short texts
      const t3 = Date.now();
      await extractor(new Array(32).fill('cardiac auscultation findings in aortic regurgitation include diastolic decrescendo murmur'), { pooling: 'mean', normalize: true });
      console.log(`  batch32 in ${Date.now() - t3}ms`);
      break;
    } catch (e: any) {
      console.log(`FAIL ${cand.id}: ${e?.message?.slice(0, 200)}`);
    }
  }
}
main().catch((e) => { console.error('crashed:', e); process.exit(1); });
