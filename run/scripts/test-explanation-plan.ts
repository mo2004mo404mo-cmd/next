/**
 * Unit tests for src/lib/explanation-plan.ts — the explanation QUALITY
 * contract: deterministic batching, markdown→safe-HTML conversion, tolerant
 * JSON parsing, and the minimum-length validation gate.
 *
 * Run: bun scripts/test-explanation-plan.ts
 */

import {
  EXPLAIN_BATCH_SIZE,
  MIN_EXPLANATION_CHARS,
  planBatches,
  pendingBatchIdxs,
  explainSystemPrompt,
  buildExplainPrompt,
  parseExplanationsJson,
  markdownToSafeHtml,
} from '../src/lib/explanation-plan';

let pass = 0;
let fail = 0;
function ok(cond: boolean, label: string) {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}`);
  }
}

// ── A reference-quality explanation (meets the floor) ──
function richExplanation(answer = 'Verapamil'): string {
  return [
    `**Why ${answer} is correct:** Verapamil is a non-dihydropyridine calcium channel blocker that blocks L-type calcium channels in cardiac and smooth muscle. By reducing calcium influx into AV nodal cells, it slows conduction velocity and prolongs the refractory period of the AV node, which terminates re-entrant supraventricular tachycardias and controls the ventricular rate in atrial fibrillation. Unlike dihydropyridines, it acts strongly on the myocardium and conduction tissue rather than primarily on vascular smooth muscle.`,
    '',
    `**Why the other options are wrong:**`,
    `- **Nifedipine:** a dihydropyridine CCB — vascular selectivity causes reflex tachycardia and it has almost no AV nodal effect, so it cannot control rate.`,
    `- **Digoxin:** works indirectly via vagal stimulation; onset is slow (hours) and it is a poor choice for acute rate control compared with CCBs.`,
    `- **Adenosine:** terminates AV-nodal re-entry but lasts seconds — useless for sustained rate control.`,
    '',
    `**Key pearls:**`,
    `- Non-dihydropyridine CCBs (verapamil, diltiazem) are first-line for rate control in AF with preserved EF.`,
    `- Avoid verapamil in HFrEF and pre-excitation (WPW) — it can cause hemodynamic collapse or pre-excited AF.`,
    '',
    `**One-line takeaway:** For acute AV-nodal rate control, think non-dihydropyridine calcium channel blockade — verapamil or diltiazem.`,
  ].join('\n');
}

const LONG = richExplanation();

console.log('1. Batch planning');
{
  const ids = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7'];
  const batches = planBatches(ids);
  ok(batches.length === 3, `7 ids / batch ${EXPLAIN_BATCH_SIZE} → 3 batches (got ${batches.length})`);
  ok(JSON.stringify(batches.flat()) === JSON.stringify(ids), 'plan preserves order & completeness');
  ok(JSON.stringify(batches[0]) === JSON.stringify(['q1', 'q2', 'q3']), 'batch 0 = first deterministic slice');
  ok(pendingBatchIdxs([null, { explained: [] }, null]).join() === '0,2', 'pendingBatchIdxs finds null slots');
}

console.log('2. Prompts');
{
  const sys = explainSystemPrompt();
  ok(sys.includes('Why {answer} is correct') || sys.includes('Why the correct answer'), 'system prompt demands the why-correct section');
  ok(sys.includes('Key pearls') && sys.includes('One-line takeaway'), 'system prompt demands pearls + takeaway');
  const prompt = buildExplainPrompt([
    { id: 'abc123', text: 'Which drug slows AV nodal conduction?', type: 'mcq', options: ['Verapamil', 'Nifedipine', 'Digoxin', 'Adenosine'], answer: 'Verapamil' },
  ]);
  ok(prompt.includes('abc123'), 'prompt carries the exact id');
  ok(prompt.includes('A. Verapamil') && prompt.includes('D. Adenosine'), 'prompt letterizes options');
  ok(prompt.includes('Correct answer: Verapamil'), 'prompt states the correct answer');
}

console.log('3. markdownToSafeHtml');
{
  const html = markdownToSafeHtml(LONG);
  ok(html.includes('<strong>Why Verapamil is correct:</strong>'), 'bold labels become <strong>');
  ok(html.includes('<ul>') && html.includes('<li>'), 'bullets become lists');
  ok(!html.includes('<script'), 'no raw script passthrough');
  const escaped = markdownToSafeHtml('5 < 6 & **not bold**');
  ok(escaped.includes('&lt;') && escaped.includes('&amp;'), 'raw < and & are escaped');
  ok(escaped.includes('<strong>not bold</strong>'), 'bold still applies after escaping');
  const attack = markdownToSafeHtml('<img src=x onerror=alert(1)> **ok**');
  ok(!/<img/.test(attack), 'injected HTML tags are neutralized');
}

console.log('4. parseExplanationsJson');
async function runParseTests() {
  const ids = ['q1', 'q2'];
  const good = JSON.stringify([
    { id: 'q1', explanation: LONG, distractorAnalysis: '- **A:** wrong', clinicalPearl: 'pearl', mnemonic: '' },
    { id: 'q2', explanation: LONG, distractorAnalysis: '', clinicalPearl: '', mnemonic: 'VINDy' },
  ]);
  {
    const { items, parseFail } = await parseExplanationsJson('```json\n' + good + '\n```', ids);
    ok(!parseFail && items.length === 2, 'fenced JSON parses');
    ok(items[0].explanation.includes('**Why Verapamil is correct:**'), 'explanation content preserved');
  }
  {
    // Thin explanation → REJECTED by the quality floor
    const thin = JSON.stringify([{ id: 'q1', explanation: 'Because verapamil blocks calcium channels.', distractorAnalysis: '', clinicalPearl: '', mnemonic: '' }]);
    const { items } = await parseExplanationsJson(thin, ids);
    ok(items.length === 0, `sub-${MIN_EXPLANATION_CHARS}-char explanation is rejected`);
  }
  {
    // Truncated JSON array → salvage complete objects; the cut object's
    // explanation falls below the quality floor and is honestly dropped.
    const q2Start = good.indexOf('{"id":"q2"');
    const cut = good.slice(0, q2Start + 60); // cut deep inside object #2
    const { items, parseFail } = await parseExplanationsJson(cut, ids);
    ok(items.length === 1 && items[0].id === 'q1', 'truncated array salvages the complete object, drops the cut one');
    ok(!parseFail, 'salvaged results are not flagged as parse failures');
  }
  {
    // Unknown id → dropped
    const foreign = JSON.stringify([{ id: 'zzz', explanation: LONG, distractorAnalysis: '', clinicalPearl: '', mnemonic: '' }]);
    const { items, parseFail } = await parseExplanationsJson(foreign, ids);
    ok(items.length === 0 && parseFail, 'foreign ids are dropped and counted as parse failure');
  }
  {
    // Garbage degeneration → rejected
    const garbage = JSON.stringify([{ id: 'q1', explanation: 'a'.repeat(600), distractorAnalysis: '', clinicalPearl: '', mnemonic: '' }]);
    const { items } = await parseExplanationsJson(garbage, ids);
    ok(items.length === 0, 'repeated-char garbage is rejected despite length');
  }
}

await runParseTests();

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
