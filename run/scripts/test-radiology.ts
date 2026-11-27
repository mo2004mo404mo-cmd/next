import { toolSearchRadiologyImage, looksLikeRadiologyQuery } from '../src/lib/agent/question-agent';
async function main() {
  console.log('query detection:', {
    'chest x-ray pneumothorax': looksLikeRadiologyQuery('chest x-ray pneumothorax'),
    'CT head subdural': looksLikeRadiologyQuery('CT head subdural hematoma'),
    'ECG interpretation': looksLikeRadiologyQuery('ECG interpretation'),
    'mitral valve anatomy': looksLikeRadiologyQuery('mitral valve anatomy'),
  });
  const t0 = Date.now();
  const found = await toolSearchRadiologyImage('chest x-ray pneumothorax');
  console.log(`live search (${((Date.now() - t0) / 1000).toFixed(1)}s):`, JSON.stringify(found));
  if (found) {
    const fs = await import('fs');
    const exists = fs.existsSync('public' + found.url);
    const size = exists ? fs.statSync('public' + found.url).size : 0;
    console.log('file on disk:', exists, `${(size / 1024).toFixed(0)} KB`);
    // second call = cache hit
    const t1 = Date.now();
    const cached = await toolSearchRadiologyImage('chest x-ray pneumothorax');
    console.log(`cache hit (${Date.now() - t1}ms):`, cached?.url === found.url ? 'SAME RESULT ✓' : 'DIFFERENT!');
  }
}
main().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
