/**
 * Deep-dive: examine chunk boundaries of the reindexed PDF sources to find
 * exactly WHERE mid-word / mid-sentence cuts still occur after reindex.
 */
import pg from 'pg';

const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });

async function main() {
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name FROM "KnowledgeSource" WHERE status='ready' AND name LIKE '%.pdf' ORDER BY name`,
  );
  for (const s of sources) {
    const { rows: chunks } = await client.query(
      `SELECT idx, content FROM "KnowledgeChunk" WHERE "sourceId"=$1 ORDER BY idx ASC`,
      [s.id],
    );
    if (chunks.length < 2) continue;
    console.log(`\n=== ${s.name} (${chunks.length} chunks) ===`);
    let midWord = 0, midSentence = 0, tableish = 0;
    for (let i = 0; i < chunks.length - 1; i++) {
      const cur = chunks[i].content.trimEnd();
      const next = chunks[i + 1].content.trimStart();
      const lastChar = cur.slice(-1);
      const firstChar = next.slice(0, 1);
      // mid-word: cur ends lowercase letter, next starts lowercase letter
      if (/[a-z]/.test(lastChar) && /[a-z]/.test(firstChar)) {
        // overlap carry means next chunk should START with the overlap tail,
        // so a lowercase start is normal for sentence-carry. Check instead
        // whether the last line of cur looks truncated mid-sentence.
      }
      const lastLine = cur.split('\n').pop().trim();
      const isList = /^[•\-\*\d]/.test(lastLine) || lastLine.length < 25;
      if (!/[.!?…:;")\]]$/.test(lastLine) && lastLine.length >= 25) {
        if (isList) tableish++;
        else {
          midSentence++;
          if (midSentence <= 3) {
            console.log(`  [end-cut  chunk#${chunks[i].idx}] …${cur.slice(-70).replace(/\n/g, '⏎')}`);
            console.log(`  [next-start chunk#${chunks[i+1].idx}] ${next.slice(0, 70).replace(/\n/g, '⏎')}`);
          }
        }
      }
    }
    console.log(`  summary: midSentence-end=${midSentence} tableOrList-end=${tableish}`);
  }
}
main().catch((e) => { console.error(e); process.exit(1); }).finally(() => client.end());
