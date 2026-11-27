/**
 * Task 21 unit-level check — run the ADVANCED transcription engine directly
 * on the harvard.wav fixture (bypasses HTTP): verifies loudnorm, VAD
 * segmentation, sentence-level timestamps, stats, and LLM insights.
 *
 * Run: bunx tsx scripts/test-audio-engine-21.ts
 */
import fs from 'fs';

async function main() {
  const file = '/home/z/my-project/upload/fixtures/harvard.wav';
  const buf = fs.readFileSync(file);
  const { transcribeAdvanced } = await import('../src/lib/agent/knowledge/audio-pipeline');
  const t0 = Date.now();
  const result = await transcribeAdvanced(buf, { fileName: 'harvard.wav' });
  const dt = (Date.now() - t0) / 1000;

  console.log(`⏱  transcribed in ${dt.toFixed(1)}s (audio ${result.durationSec}s)`);
  console.log(`\nSTATS: ${JSON.stringify(result.stats, null, 2)}`);
  console.log(`\nINSIGHTS: ${JSON.stringify(result.insights, null, 2)}`);

  console.log(`\nSEGMENTS (${result.segments.length}):`);
  for (const s of result.segments) {
    console.log(`  [${s.start.toFixed(2)} → ${s.end.toFixed(2)}] ${s.text.slice(0, 80)}`);
  }

  console.log(`\nSENTENCES (${result.sentences.length}):`);
  for (const s of result.sentences) {
    console.log(`  [${s.start.toFixed(2)}-${s.end.toFixed(2)}] ${s.text}`);
  }

  console.log(`\nPARAGRAPHS (${result.paragraphs.length}): ${JSON.stringify(result.paragraphs)}`);
  console.log(`\nTIMESTAMPED TEXT (RAG):\n${result.timestampedText}`);

  // assertions
  const errors: string[] = [];
  if (result.sentences.length < 6) errors.push(`expected ≥6 sentences, got ${result.sentences.length}`);
  if (result.stats.wpm < 80 || result.stats.wpm > 300) errors.push(`suspicious wpm: ${result.stats.wpm}`);
  if (result.stats.coverage < 0.4) errors.push(`low speech coverage: ${result.stats.coverage}`);
  if (!result.insights.title) errors.push('no insight title');
  if (result.sentences.some((s, i) => i > 0 && s.start < result.sentences[i - 1].end - 0.01)) {
    errors.push('sentence timings overlap/unordered');
  }
  if (errors.length) {
    console.error(`\n✗ FAIL: ${errors.join('; ')}`);
    process.exit(1);
  }
  console.log('\n✓ engine checks passed');
}

void main().catch((e) => { console.error(e); process.exit(1); });
