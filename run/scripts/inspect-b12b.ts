import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
async function main() {
  for (const id of ['cmv7hhrby00eoosq8uwpqt90c', 'cmv7iouvk00er0rq8qd3tu8ws', 'cmv7hhrby00eqosq8yviqgu6g']) {
    const rows = await sql`SELECT c.id, c."sourceId", c.content, s.name as srcName FROM "KnowledgeChunk" c JOIN "KnowledgeSource" s ON s.id = c."sourceId" WHERE c.id = ${id}`;
    if (!rows.length) { console.log(`${id} NOT FOUND`); continue; }
    const r = rows[0];
    console.log(`\n=== ${r.id} (source: ${r.srcName}, len=${r.content.length}) ===`);
    console.log(r.content.slice(0, 1200));
  }
  // also: how many chunks does each key token appear in (DF calibration)
  const tokens = ['deficiency','vitamin','b12','iron','anemia','glossitis','pernicious','intrinsic','gastrectomy','malabsorption','macrocytic','gastric','autoimmune','folate','ferritin'];
  const counts: Record<string, number> = {};
  for (const t of tokens) {
    const r = await sql`SELECT COUNT(*)::int as n FROM "KnowledgeChunk" WHERE content ILIKE ${'%' + t + '%'}`;
    counts[t] = r[0].n;
  }
  console.log('\n=== token document frequency (of 1782 chunks) ===');
  console.log(JSON.stringify(counts, null, 1));
  await sql.end();
}
main();
