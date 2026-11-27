/**
 * Standalone test of the agent pipeline's NEW media capabilities:
 *   - sound search (real clinical sounds: Commons → Merck → auscultation sites)
 *   - model search (Sketchfab 3D anatomy models)
 *
 * Runs runAgentQuestionGeneration() directly (bun resolves tsconfig paths).
 * The fake request makes callChat fail fast → SDK fallback path is used.
 */
import { runAgentQuestionGeneration } from '@/lib/agent/question-agent';

const fakeRequest = {
  headers: new Headers(),
  method: 'POST',
  url: 'http://localhost:3000/api/generate/agent',
} as unknown as Parameters<typeof runAgentQuestionGeneration>[0];

const topic = process.argv[2] || 'aortic stenosis murmur auscultation';
console.log(`\n=== AGENT PIPELINE TEST — topic: "${topic}" ===\n`);

const questions = await runAgentQuestionGeneration(
  fakeRequest,
  {
    topic,
    system: 'Cardiology',
    types: ['mcq'],
    difficulties: ['Moderate'],
    count: 1,
  },
  (stage, message) => {
    console.log(`  [${stage.padEnd(10)}] ${message}`);
  },
);

console.log(`\n=== RESULT: ${questions.length} question(s) ===`);
for (const q of questions) {
  console.log('  id:', q.id);
  console.log('  text:', String(q.text || '').slice(0, 400).replace(/\n/g, ' '));
  console.log('  options:', JSON.stringify(q.options));
  console.log('  answer:', q.answer);
  console.log('  imageUrl:', q.imageUrl || '(none)');
  console.log('  audioUrl:', q.audioUrl || '(none)');
  console.log('  videoUrl:', q.videoUrl || '(none)');
  console.log('  modelUrl:', q.modelUrl || '(none)');
  console.log('  sources:', q.sources);
}
