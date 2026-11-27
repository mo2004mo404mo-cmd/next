/**
 * Seed BUILTIN agent skills (source: "builtin", userId: null — shared by every
 * user, managed by operators via this script, never editable/deletable from
 * the UI or manage_skills).
 *
 * Skills are instruction packs (SKILL.md bodies) that steer the agent toward a
 * proven workflow. The four shipped builtins cover the document deliverables
 * learners ask for most; each names the exact tool to call and the structure
 * that makes the output great.
 *
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/seed-builtin-skills.ts
 */
import { db } from '../src/lib/db';

interface BuiltinSkill {
  name: string;
  description: string;
  category: string;
  suggestedTools: string[];
  content: string;
}

const BUILTINS: BuiltinSkill[] = [
  {
    name: 'pdf-cheat-sheet',
    description:
      'Compress any medical topic into a high-yield 1-2 page PDF cheat sheet with tables, mnemonics and a rapid-review footer — ideal for last-minute revision.',
    category: 'Documents',
    suggestedTools: ['generate_document'],
    content: `# PDF Cheat Sheet

## When to use
The learner asks for a "cheat sheet", "summary sheet", "one-pager", or "quick reference" about a medical topic — especially before an exam or rotation.

## Workflow
1. Clarify scope if the topic is broad (e.g. "pharmacology" → ask which drug classes; otherwise pick the highest-yield core).
2. Gather the facts you are confident about first (knowledge tools if the learner has library material).
3. Call \`generate_document\` with \`format: "pdf"\`, a short \`title\`, and markdown \`content\` structured EXACTLY like this:

   - An H2 "At a glance" — 3-5 bullet essentials (definitions, cut-offs, red flags).
   - An H2 per subtopic with a markdown TABLE for comparisons (columns like Feature / Type I / Type II). Tables render cleanly in the PDF.
   - An H2 "Mnemonic" block when a memory aid exists.
   - An H2 "Rapid review" — numbered one-liners covering the whole sheet.

## Output rules
- Keep it to what fits ~2 PDF pages: dense but not cramped; prefer tables over prose.
- Use **bold** for the discriminating facts (the testable ones).
- End the chat answer with: what the sheet covers + the download link (the file card shows automatically).
`,
  },
  {
    name: 'pdf-flashcard-sheet',
    description:
      'Generate a printable PDF of Q&A flashcards in a two-column table (Question | Answer) for active recall and self-testing on any topic.',
    category: 'Documents',
    suggestedTools: ['generate_document'],
    content: `# PDF Flashcard Sheet

## When to use
The learner wants printable/digital flashcards ("make me flashcards on X", "Q&A sheet", "active recall set") rather than in-app SM-2 cards.

## Workflow
1. Decide the count with the learner if not stated (default 15-25 cards).
2. Write each card as ONE crisp question + ONE complete-but-tight answer (answer ≤ 2 sentences). Include a mix: definitions, mechanisms, next steps in management, classic traps.
3. Call \`generate_document\` with \`format: "pdf"\` and \`content\` as a single markdown table:

   | # | Question | Answer |
   |---|----------|--------|
   | 1 | ... | ... |

4. Suggest saving key cards into the app's spaced-repetition deck as a follow-up.

## Output rules
- No answer may exceed 2 sentences; split longer ones into two cards.
- Mark high-yield cards with **bold** question numbers.
- The PDF is for printing/cutting — keep rows scannable.
`,
  },
  {
    name: 'word-study-report',
    description:
      'Produce a structured Word document (.docx) study report — topic deep-dive with sections, learning objectives and references — for coursework or rotation hand-ins.',
    category: 'Documents',
    suggestedTools: ['create_word_document'],
    content: `# Word Study Report

## When to use
The learner needs a formal document deliverable: a report, write-up, topic summary for submission, or structured notes to share.

## Workflow
1. Confirm the audience and depth (coursework vs quick notes) if ambiguous.
2. Research when needed (search tools / knowledge library).
3. Call \`create_word_document\` with markdown \`content\` structured as:
   - Title + one-paragraph executive summary
   - "Learning objectives" (3-5 bullets)
   - 3-6 numbered sections with H2 headings; each section ends with a short "Key points" bullet list
   - A references section listing sources actually used (with URLs when from web search)
4. Report the structure back briefly in chat with the download link.

## Output rules
- Formal but plain prose; no filler sentences.
- Every claim you are unsure about gets a qualifier or is omitted.
- Tables for comparisons, bullets for enumerations — never walls of text.
`,
  },
  {
    name: 'slide-deck',
    description:
      'Build a presentation (.pptx) on a medical topic — one idea per slide, visual-first layout, presenter notes included — for seminars, journal clubs and teaching sessions.',
    category: 'Documents',
    suggestedTools: ['create_presentation'],
    content: `# Slide Deck

## When to use
The learner asks for a presentation, slides, or a talk: seminar, journal club, case presentation, teaching session.

## Workflow
1. Confirm slide count if not stated (default 5-8) and the audience level.
2. Plan the narrative BEFORE generating: title → framing/why it matters → core content (2-4 slides) → pitfalls/differences → takeaways.
3. Call \`create_presentation\` with one slide per idea: a 3-6 word title, 3-5 short bullets (≤ 10 words each), and speaker notes carrying the full explanation.
4. Offer an accompanying handout (pdf-cheat-sheet) as a natural follow-up.

## Output rules
- One idea per slide; if a slide needs two ideas, split it.
- Bullets are fragments, not sentences; explanations live in the notes.
- Clinical numbers/cut-offs on slides must be double-checked before inclusion.
`,
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  let unchanged = 0;

  for (const skill of BUILTINS) {
    const existing = await db.agentSkill.findFirst({
      where: { userId: null, name: skill.name },
    });
    const data = {
      description: skill.description,
      content: skill.content,
      suggestedTools: JSON.stringify(skill.suggestedTools),
      category: skill.category,
      source: 'builtin',
      enabled: true,
    };
    if (!existing) {
      await db.agentSkill.create({ data: { ...data, name: skill.name, userId: null } });
      created += 1;
      console.log(`+ ${skill.name}`);
    } else if (
      existing.description !== skill.description ||
      existing.content !== skill.content ||
      !existing.enabled
    ) {
      await db.agentSkill.update({ where: { id: existing.id }, data });
      updated += 1;
      console.log(`~ ${skill.name}`);
    } else {
      unchanged += 1;
      console.log(`= ${skill.name} (already current)`);
    }
  }

  // Safety: never leave duplicates (Postgres treats NULL userIds as distinct
  // in the unique index, so a re-run bug could stack rows).
  for (const skill of BUILTINS) {
    const rows = await db.agentSkill.findMany({
      where: { userId: null, name: skill.name },
      orderBy: { createdAt: 'asc' },
    });
    if (rows.length > 1) {
      const remove = rows.slice(1).map((r) => r.id);
      await db.agentSkill.deleteMany({ where: { id: { in: remove } } });
      console.log(`! deduped ${skill.name}: removed ${remove.length} duplicate(s)`);
    }
  }

  console.log(`\nDone. created=${created} updated=${updated} unchanged=${unchanged}`);
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
