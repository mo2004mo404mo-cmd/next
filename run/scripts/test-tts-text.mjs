/**
 * Unit test for stripMarkdownForTTS (src/lib/audio/tts-text.ts).
 * Run: node scripts/test-tts-text.mjs  (after tsc compile step — see runner below)
 * Compiled output lives in tmp/tts-text-out/tts-text.js
 */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { stripMarkdownForTTS } = require('/home/z/my-project/tmp/tts-text-out/tts-text.js');

let pass = 0;
let fail = 0;
function check(name, input, expected) {
  const got = stripMarkdownForTTS(input);
  if (got === expected) {
    pass++;
    console.log(`  ok   ${name}`);
  } else {
    fail++;
    console.log(`  FAIL ${name}\n       expected: ${JSON.stringify(expected)}\n       got:      ${JSON.stringify(got)}`);
  }
}
function checkNot(name, input, forbidden) {
  const got = stripMarkdownForTTS(input);
  const hits = forbidden.filter((f) => got.includes(f));
  if (hits.length === 0) {
    pass++;
    console.log(`  ok   ${name}`);
  } else {
    fail++;
    console.log(`  FAIL ${name} — output still contains ${JSON.stringify(hits)}\n       got: ${JSON.stringify(got)}`);
  }
}

console.log('== headings / emphasis ==');
check('ATX heading', '## Cardiovascular System\n\nThe **heart** pumps blood.', 'Cardiovascular System\n\nThe heart pumps blood.');
check('heading w/ closer', '## Anatomy ##', 'Anatomy');
check('CJK bold', '**心脏**位于纵隔内。', '心脏位于纵隔内。');
check('italic boundaries', 'This is *important* for exams.', 'This is important for exams.');
check('strike', '~~old term~~ is deprecated.', 'old term is deprecated.');

console.log('== protected (NOT markdown) ==');
check('multiplication spaces kept', 'Dose is 5 * 3 mg per day.', 'Dose is 5 * 3 mg per day.');
check('intraword asterisks kept', 'Compute a*b*c for the formula.', 'Compute a*b*c for the formula.');
check('snake_case kept', 'The variable patient_name is stored.', 'The variable patient_name is stored.');
check('dunder follows CommonMark strong', 'Run __init__ first.', 'Run init first.');

console.log('== lists ==');
check('bullets stripped', '- Left ventricle\n- Right ventricle\n* Atria', 'Left ventricle\nRight ventricle\nAtria');
check('ordered markers kept', '1. Assess the patient\n2. Call for help', '1. Assess the patient\n2. Call for help');

console.log('== links / images / refs ==');
check('link label kept', 'Read the [MedQ guide](https://medq.example/docs) now.', 'Read the MedQ guide now.');
check('image dropped', '![ECG strip](ecg.png) shows ST elevation.', 'shows ST elevation.');
check('footnote dropped', 'See[^1] the textbook.', 'See the textbook.');

console.log('== code ==');
check('inline code backticks', 'The gene is `BRCA1` on chromosome 17.', 'The gene is BRCA1 on chromosome 17.');
check('fence kept as text', '```c\nint *p = NULL;\n```', 'int *p = NULL;');

console.log('== tables / quotes / html ==');
check('table to comma cells', '| Chamber | Volume |\n|---|---|\n| LV | 120 mL |', 'Chamber, Volume\nLV, 120 mL');
check('blockquote stripped', '> Remember: sterilize first.', 'Remember: sterilize first.');
check('html tags stripped', 'The <b>mitral</b> valve<br>closes.', 'The mitral valvecloses.');
check('escaped asterisk', '\\*not emphasis\\*', '*not emphasis*');

console.log('== structural removal ==');
check('setext underline dropped', 'Cardiac Cycle\n===', 'Cardiac Cycle');
check('hr dropped (pause kept)', 'Part one.\n---\nPart two.', 'Part one.\n\nPart two.');
check('markdown-only line to empty', '***', '');
check('empty passthrough', '', '');

console.log('== realistic mixed narration ==');
const narration = [
  '## Renal Physiology',
  '',
  'The **nephron** is the *functional unit* of the kidney.',
  '',
  '- Glomerular filtration',
  '- Tubular reabsorption',
  '',
  'Normal GFR is `90-120 mL/min` — see [reference](https://kidney.example).',
  '',
  '> Filtration is driven by Starling forces.',
].join('\n');
checkNot('no markers survive', narration, ['##', '**', '*', '`', '](', '\n- ', '\n> ']);
const once = stripMarkdownForTTS(narration);
const twice = stripMarkdownForTTS(once);
check('idempotent', once, twice);

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail === 0 ? 0 : 1);
