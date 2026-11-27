/**
 * Import REAL community skills from the web as MedQ BUILTIN packs
 * (userId null, source "builtin" — shared across accounts, operator-managed).
 *
 * Sources: the official Anthropic skills repository on GitHub
 * (github.com/anthropics/skills) — instruction-only packs that work with
 * MedQ's tool surface (no python-script dependencies):
 *
 *   canvas-design     — design-philosophy-driven posters/art (PDF/PNG)
 *   algorithmic-art   — generative art as standalone HTML/canvas
 *   internal-comms    — structured internal communications documents
 *   skill-creator     — how to author high-quality skills (meta-skill that
 *                       also improves the agent's own manage_skills output)
 *
 * Idempotent: re-running refreshes content in place (upsert), never stacks
 * duplicate rows.
 *
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/import-web-skills.ts
 */
import { importSkillFromUrl, ImportSkillError } from '../src/lib/agent/skills/import';

const SOURCES: Array<{ url: string; category: string }> = [
  {
    url: 'https://github.com/anthropics/skills/tree/main/skills/canvas-design',
    category: 'Creative',
  },
  {
    url: 'https://github.com/anthropics/skills/tree/main/skills/algorithmic-art',
    category: 'Creative',
  },
  {
    url: 'https://github.com/anthropics/skills/tree/main/skills/internal-comms',
    category: 'Communication',
  },
  {
    url: 'https://github.com/anthropics/skills/tree/main/skills/skill-creator',
    category: 'Meta',
  },
];

async function main() {
  let created = 0;
  let updated = 0;
  let failed = 0;

  for (const source of SOURCES) {
    try {
      const result = await importSkillFromUrl({
        url: source.url,
        userId: null,
        source: 'builtin',
        category: source.category,
        upsert: true,
      });
      if (result.updated) {
        updated += 1;
        console.log(`~ ${result.name} refreshed (${result.contentChars} chars)`);
      } else {
        created += 1;
        console.log(`+ ${result.name} imported (${result.contentChars} chars)`);
      }
      console.log(`    from ${result.fetchedFrom}`);
      console.log(`    "${result.description.slice(0, 110)}${result.description.length > 110 ? '…' : ''}"`);
    } catch (error) {
      failed += 1;
      const message = error instanceof ImportSkillError ? error.message : String(error);
      console.error(`! ${source.url}: ${message}`);
    }
  }

  console.log(`\nDone. created=${created} updated=${updated} failed=${failed}`);
  if (failed > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
