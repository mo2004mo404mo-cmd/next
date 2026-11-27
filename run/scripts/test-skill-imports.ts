/**
 * Unit checks for the skills sprint:
 *  1. parseGeneratedSkill — the tolerant ladder for fast-model outputs
 *  2. normalizeSkillUrl + parseSkillPack (import engine) — pure functions
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/test-skill-imports.ts
 */
import { parseGeneratedSkill } from '../src/app/api/agent/skills/generate/route';
import { normalizeSkillUrl, parseSkillPack } from '../src/lib/agent/skills/import';

let passed = 0;
let failed = 0;
function check(label: string, cond: boolean, extra?: string) {
  if (cond) { passed += 1; console.log(`  ok  ${label}`); }
  else { failed += 1; console.error(`  FAIL ${label}${extra ? ` — ${extra}` : ''}`); }
}

// ── parseGeneratedSkill ──────────────────────────────────────────────────
console.log('parseGeneratedSkill:');

const jsonFence = '```json\n{"name": "ecg-rhythm-drill", "description": "Quizzes ECG rhythms with audio then explains each", "content": "# ECG Rhythm Drill\\n\\n## When to use\\n..."}\n```';
const a = parseGeneratedSkill(jsonFence);
check('json fence parsed', a?.name === 'ecg-rhythm-drill' && a.content.startsWith('# ECG'));

const noisyJson = 'Okay, here is the skill you asked for.\n\n```json\n{"name": "x-drill", "description": "Does X properly and well", "content": "# X\\nbody"}\n```';
const b = parseGeneratedSkill(noisyJson);
check('json fence after preamble', b?.name === 'x-drill');

const formatB = 'NAME: osce-drill\nDESCRIPTION: Runs OSCE practice stations with timed prompts\n---\n# OSCE Drill\n\n## When to use\nBefore OSCE practice.';
const c = parseGeneratedSkill(formatB);
check('format B parsed', c?.name === 'osce-drill' && c.content.startsWith('# OSCE Drill'));

const garbage = 'I could not write that skill because it needs more details.';
check('garbage rejected', parseGeneratedSkill(garbage) === null);

// ── normalizeSkillUrl ────────────────────────────────────────────────────
console.log('normalizeSkillUrl:');
check(
  'github blob → raw',
  normalizeSkillUrl('https://github.com/anthropics/skills/blob/main/skills/pdf/SKILL.md')
    === 'https://raw.githubusercontent.com/anthropics/skills/main/skills/pdf/SKILL.md',
);
check(
  'github tree → raw + SKILL.md',
  normalizeSkillUrl('https://github.com/anthropics/skills/tree/main/skills/canvas-design')
    === 'https://raw.githubusercontent.com/anthropics/skills/main/skills/canvas-design/SKILL.md',
);
check(
  'raw passthrough',
  normalizeSkillUrl('https://raw.githubusercontent.com/o/r/main/SKILL.md')
    === 'https://raw.githubusercontent.com/o/r/main/SKILL.md',
);
try { normalizeSkillUrl('http://github.com/x'); check('http rejected', false); }
catch { check('http rejected', true); }
try { normalizeSkillUrl('https://127.0.0.1/x'); check('loopback rejected', false); }
catch { check('loopback rejected', true); }
try { normalizeSkillUrl('https://192.168.1.5/x'); check('private range rejected', false); }
catch { check('private range rejected', true); }

// ── parseSkillPack ──────────────────────────────────────────────────────
console.log('parseSkillPack:');
const pack = parseSkillPack(
  '---\nname: Canvas Design\ndescription: Create beautiful visual art in .png and .pdf documents using design philosophy.\nlicense: Complete terms in LICENSE.txt\n---\n\n# Canvas Design\n\nBody here.',
  'https://raw.githubusercontent.com/anthropics/skills/main/skills/canvas-design/SKILL.md',
);
check('frontmatter name kebab-cased', pack.name === 'canvas-design');
check('description kept', pack.description.startsWith('Create beautiful visual art'));
check('body without frontmatter', pack.content.startsWith('# Canvas Design'));

const noFm = parseSkillPack('# Bare Skill\n\nFirst paragraph describes it well enough.', 'https://example.com/skills/bare-skill/SKILL.md');
check('no-frontmatter fallback name', noFm.name === 'bare-skill');
check('no-frontmatter fallback description', noFm.description.length >= 10);

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
