import { SQL } from 'bun';
const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');
async function main() {
  const q0 = await sql`SELECT text, answer, citations FROM "Question" WHERE id = 'cmv7lh3eb000i57q8u17prdc9'`;
  const q = q0[0];
  const cites = (typeof q.citations === 'string' ? JSON.parse(q.citations) : q.citations) || [];
  console.log(`answer: ${q.answer}`);
  console.log(`${cites.length} citations:`);
  for (const c of cites) {
    const hasIntrinsic = /intrinsic factor/i.test(c.chunkContent || '');
    const hasGastric = /gastric surgery/i.test(c.chunkContent || '');
    console.log(`\n--- chunk ${c.chunkId} (intrinsic=${hasIntrinsic} gastricSurgery=${hasGastric})`);
    console.log(`QUOTE: ${c.quote}`);
  }
  await sql.end();
}
main();
