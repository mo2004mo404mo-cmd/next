/** Direct tool-level test: toolFindSound + toolFindModel with realistic queries. */
import { toolFindSound, toolFindModel } from '@/lib/agent/question-agent';

console.log('=== toolFindModel tests ===');
for (const q of ['human heart anatomy', 'bones of the hand', 'skull anatomy', 'brachial plexus anatomy']) {
  const m = await toolFindModel(q);
  console.log(`  "${q}" →`, m ? `${m.title} | ${m.embedUrl.slice(0, 80)} | ${m.credit}` : 'NULL');
}

console.log('\n=== toolFindSound tests ===');
for (const q of ['crackles pneumonia', 'wheeze', 'stridor', 'bowel sounds small bowel obstruction', 'mitral valve prolapse']) {
  const s = await toolFindSound(q);
  console.log(`  "${q}" →`, s ? `${s.title} | ${s.url} | ${s.credit.slice(0, 60)}` : 'NULL');
}
