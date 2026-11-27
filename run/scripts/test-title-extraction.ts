/** Unit-test the thread-title extraction ladder against RECORDED fast-model
 * outputs (glm-4.5-flash behaviors observed live on 2026-10-24) plus clean
 * format-following outputs. Run: bun scripts/test-title-extraction.ts
 */
import { extractThreadTitle } from '../src/lib/agent/threads/title';

const cases: Array<{ name: string; raw: string; expect: string }> = [
  {
    name: 'recorded: reasoning + quoted candidates, truncated endorsement (the original failure)',
    raw:
      '\nI need to create a short title (3-6 words) for a conversation about the difference between Duchenne and Becker muscular dystrophy genetics.\n\n' +
      'The conversation begins with a question asking for an explanation of the genetic differences between Duchenne and Becker muscular dystrophy.\n\n' +
      'Some possible titles:\n1. "Muscular Dystrophy Genetics"\n2. "Duchenne vs Becker Genetics"\n3. "MD Genetic Differences"\n' +
      '4. "X-Linked MD Genetics"\n5. "Dystrophy Genetics Explained"\n6. "Duchenne Becker Genetics"\n7. "MD Genetic Comparison"\n' +
      '8. "Genetics of Muscular Dystrophy"\n\nI think "Duchenne Becker Genetics"',
    expect: 'Duchenne Becker Genetics',
  },
  {
    name: 'recorded: pure reasoning, no candidates (guard case — extraction may yield junk, callers guard)',
    raw: '\nI need to create a short title (3-6 words) for a conversation about the difference between Duchenne and Becker muscular dystrophy genetics. This',
    expect: 'ANY', // caller-side looksLikeReasoning guard must reject this
  },
  {
    name: 'clean: TITLE line format (the requested format)',
    raw: 'Let me think about this.\n\nTITLE: Renal Physiology Review',
    expect: 'Renal Physiology Review',
  },
  {
    name: 'clean: tag format',
    raw: '<title>Duchenne vs Becker Genetics</title>',
    expect: 'Duchenne vs Becker Genetics',
  },
  {
    name: 'clean: plain single line',
    raw: 'Acid-Base Balance Tutorial',
    expect: 'Acid-Base Balance Tutorial',
  },
  {
    name: 'endorsed candidate with full sentence',
    raw: 'Some options: "Cardio Pharm" or "ACE Inhibitors".\n\nI think "ACE Inhibitors" is the most specific.',
    expect: 'ACE Inhibitors',
  },
  {
    name: 'unterminated tag (truncated)',
    raw: 'Okay, thinking...\n<title>Pharmacology of',
    expect: 'Pharmacology of',
  },
];

// Caller-side guard replicated for the ANY case check
function looksLikeReasoning(title: string): boolean {
  return (
    title.length < 3 ||
    title.split(' ').length > 12 ||
    /^(i (need|want|will|'ll|have|should)|let me|the user (wants|asked|is)|okay|sure|first[,.]|now[,.]|so[,.])/i.test(title) ||
    /title for|conversation between/i.test(title)
  );
}

let pass = 0;
let fail = 0;
for (const c of cases) {
  const got = extractThreadTitle(c.raw);
  if (c.expect === 'ANY') {
    if (looksLikeReasoning(got)) {
      console.log(`PASS  ${c.name} -> guard rejects ("${got.slice(0, 40)}…")`);
      pass++;
    } else {
      console.log(`FAIL  ${c.name} -> guard did NOT reject "${got}"`);
      fail++;
    }
  } else if (got === c.expect) {
    console.log(`PASS  ${c.name} -> "${got}"`);
    pass++;
  } else {
    console.log(`FAIL  ${c.name} -> got "${got}", expected "${c.expect}"`);
    fail++;
  }
}
console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail > 0 ? 1 : 0);
