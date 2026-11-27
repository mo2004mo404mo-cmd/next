/**
 * Generate a ~60-70s lecture-style WAV via the ZAI TTS (same provider the
 * app's synthesize_speech tool uses), to test the lecture-summarizer skill
 * with audio longer than the gateway's 30s cap (forces VAD segmentation).
 */
import fs from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
const execFileAsync = promisify(execFile);

async function ttsChunk(client, text) {
  const response = await client.audio.tts.create({ input: text, response_format: 'wav' });
  if (response instanceof Response) {
    if (!response.ok) throw new Error(`tts HTTP ${response.status}`);
    return Buffer.from(await response.arrayBuffer());
  }
  if (Buffer.isBuffer(response)) return response;
  if (typeof response === 'string') return Buffer.from(response, 'base64');
  throw new Error('unexpected tts response');
}

async function main() {
  const zai = (await import('z-ai-web-dev-sdk')).default;
  const cfg = JSON.parse(fs.readFileSync('/etc/.z-ai-config', 'utf-8'));
  const client = new zai(cfg);

  const full = `Today we will discuss acute coronary syndromes. Acute coronary syndrome encompasses three conditions: unstable angina, non-ST elevation myocardial infarction, and ST elevation myocardial infarction. The underlying mechanism in most cases is plaque rupture followed by thrombus formation, which partially or completely occludes a coronary artery. Clinically, patients typically present with crushing chest pressure radiating to the left arm or jaw, associated with diaphoresis, nausea, and dyspnea. The initial workup includes a twelve-lead electrocardiogram and cardiac troponin levels. || ST elevation myocardial infarction is diagnosed when there is ST segment elevation of at least one millimeter in two contiguous leads, and it requires immediate reperfusion therapy, preferably primary percutaneous coronary intervention within ninety minutes of first medical contact. If percutaneous intervention is unavailable within one hundred twenty minutes, fibrinolytic therapy should be considered. || For non-ST elevation syndromes, management includes dual antiplatelet therapy with aspirin plus a P2Y12 inhibitor, anticoagulation, and risk stratification using the TIMI or GRACE score. Remember the mnemonic MONA: morphine, oxygen, nitrates, and aspirin, although oxygen is now only given when saturation is below ninety percent.`;

  const chunks = full.split('||').map((s) => s.trim()).filter(Boolean);
  console.log('chunks:', chunks.map((c) => c.length));
  const t0 = Date.now();
  const parts = [];
  for (const [i, chunk] of chunks.entries()) {
    const buf = await ttsChunk(client, chunk);
    const p = `/tmp/lecture-part-${i}.wav`;
    fs.writeFileSync(p, buf);
    parts.push(p);
    console.log(`part ${i}: ${buf.length} bytes`);
  }
  // Stitch: normalize each to 16k mono pcm so concatenation is clean.
  const normed = [];
  for (const [i, p] of parts.entries()) {
    const out = `/tmp/lecture-norm-${i}.wav`;
    await execFileAsync('ffmpeg', ['-y', '-i', p, '-ar', '24000', '-ac', '1', '-c:a', 'pcm_s16le', out]);
    normed.push(out);
  }
  const listFile = '/tmp/lecture-list.txt';
  fs.writeFileSync(listFile, normed.map((p) => `file '${p}'`).join('\n'));
  await execFileAsync('ffmpeg', ['-y', '-f', 'concat', '-safe', '0', '-i', listFile, '-c', 'copy', '/home/z/my-project/download/medq-skill-tests/acs-lecture.wav']);
  console.log(`done in ${Date.now() - t0}ms -> acs-lecture.wav`);
}
main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
