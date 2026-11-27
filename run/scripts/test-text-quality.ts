/**
 * Unit-verify the text-quality fixes: page-number stripping, lowercase
 * continuation merge, dangling-paragraph join, and buildCitationQuote.
 */
import {
  normalizeExtractedText,
  chunkTextQuality,
  buildCitationQuote,
  trimToSentence,
} from '../src/lib/agent/knowledge/text-quality';

let failures = 0;
function check(name: string, cond: boolean, detail?: string) {
  if (!cond) {
    failures++;
    console.log(`FAIL  ${name}${detail ? ` — ${detail}` : ''}`);
  } else {
    console.log(`ok    ${name}`);
  }
}

// 1) Page-number line removal + bullet continuation merge.
const raw1 = [
  '• Severe cases may require orthopaedic intervention — early diagnosis',
  'matters',
  '35',
  'S Clarifications Note — Follow-up Cadence Confirmed',
  'The doctor confirmed the same follow-up cadence as the lecture file: initially every',
  '2–4 weeks to assess response, then spacing out to',
  'every few months once biochemical healing is evident — included here.',
].join('\n');
const n1 = normalizeExtractedText(raw1);
check('page-number line removed', !/(^|\n)35(\n|$)/.test(n1), JSON.stringify(n1));
check('bullet continuation merged (lowercase next)', n1.includes('early diagnosis matters'));
check('body soft-wrap merged', n1.includes('to assess response, then spacing out to every few months'));

// 2) Hyphenation still repaired.
const n2 = normalizeExtractedText('the patient has dys-\npnea and chest pain');
check('dehyphenation intact', n2.includes('dyspnea'));

// 3) Cross-page dangling fragment pre-join (chunker level).
const pageBreakText = [
  'Proactive measures are crucial to avert the development of rickets, particularly in vulnerable populations. Effective prevention strategies focus on ensuring adequate',
  '',
  'vitamin D and calcium intake through diet and safe sun exposure.',
].join('\n');
const chunks3 = chunkTextQuality(pageBreakText, { size: 900, overlap: 150 });
check(
  'cross-paragraph sentence kept whole',
  chunks3.length === 1 && chunks3[0].includes('ensuring adequate vitamin D and calcium intake'),
  JSON.stringify(chunks3),
);

// 4) buildCitationQuote — question-relevant sentence selection (> max chars
//    so the selection actually engages).
const chunkContent = [
  'Nutritional rickets remains a diagnostic challenge in subtropical regions despite abundant sunshine, and clinicians frequently miss the condition until deformities appear.',
  'The biochemical fingerprint of nutritional rickets is BOTH calcium and phosphate ending up low.',
  'Treatment involves vitamin D supplementation with calcium repletion over 8–12 weeks, followed by maintenance dosing and dietary counselling for the family.',
  'Radiographic features include widened, cupped, and frayed metaphyses at the growth plates, best appreciated at the wrists and knees.',
  'Prevention programs focus on maternal supplementation, infant vitamin D drops from the first week of life, and food fortification policies.',
].join(' ');
const q1 = 'What is the characteristic biochemical pattern seen in nutritional rickets?';
const quote1 = buildCitationQuote(chunkContent, q1, 400);
check(
  'citation quote targets the relevant sentence',
  quote1.includes('biochemical fingerprint') && !quote1.includes('Prevention programs'),
  JSON.stringify(quote1),
);
check('citation quote is sentence-complete', /[.!?]$/.test(quote1));
const quote2 = buildCitationQuote(chunkContent, 'completely unrelated query about dermatology lasers', 400);
check('zero-overlap falls back to head trim', quote2.length > 0 && quote2.length <= 400);
const quote3 = buildCitationQuote('short content', 'anything', 400);
check('short content returned verbatim', quote3 === 'short content');
const quote4 = buildCitationQuote(chunkContent, '', 400);
check('empty question falls back', quote4.length > 0 && quote4.length <= 400);

// 5) Regression: trimToSentence unchanged behavior.
check('trimToSentence still trims', trimToSentence(chunkContent, 100).length <= 101);

// 6) Table-ish content: rows without terminators stay word-aligned.
const tableText = ['Route of transmission | Person-to-person | Foodborne', 'Incubation | 15-50 days | 3-6 weeks'].join('\n');
const chunks6 = chunkTextQuality(tableText, { size: 40, overlap: 10 });
check('table rows never cut mid-word', chunks6.every((c) => /^[A-Za-z]/.test(c.trim())));

console.log(failures === 0 ? '\nALL PASS' : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
