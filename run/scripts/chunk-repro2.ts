/**
 * Reproduce chunking on the retained PDF originals with the CURRENT code and
 * measure TRULY TORN sentences: a chunk whose tail continues mid-sentence in
 * the normalized source (the character right after the cut is a lowercase
 * letter — the sentence was split across chunk boundaries).
 */
import pg from 'pg';
import { chunkTextQuality, normalizeExtractedText } from '../src/lib/agent/knowledge/text-quality';

async function main() {
  const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name FROM "KnowledgeSource" WHERE status='ready' AND name LIKE '%.pdf' ORDER BY name`,
  );

  for (const s of sources) {
    const fs = await import('fs');
    const p = `upload/file-store/${s.id}.bin`;
    if (!fs.existsSync(p)) { console.log(`\n=== ${s.name}: no retained original ===`); continue; }
    const buffer = fs.readFileSync(p);
    const { getDocumentProxy, extractText } = await import('unpdf');
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    const normalized = normalizeExtractedText(text);
    const chunks = chunkTextQuality(normalized, { size: 900, overlap: 150 });

    // Suffix-start index for locating each chunk's tail in the source.
    const normIdx = new Map<string, number[]>();
    // build a simple search using indexOf from a moving cursor (chunks are ordered)
    let cursor = 0;
    const positions: number[] = [];
    for (const c of chunks) {
      const at = normalized.indexOf(c.slice(0, 60), cursor);
      positions.push(at);
      if (at >= 0) cursor = at + 1;
    }
    void normIdx;

    let torn = 0;
    let startCut = 0;
    const examples: string[] = [];
    for (let i = 0; i < chunks.length; i++) {
      const c = chunks[i].trimEnd();
      const pos = positions[i];
      if (pos >= 0) {
        const end = pos + c.length;
        const after = normalized.slice(end, end + 2);
        // torn = the source continues the SAME sentence right after the cut
        if (/^[a-z,]/.test(after) && !/[.!?…]$/.test(c.slice(-1))) {
          torn++;
          if (examples.length < 6) {
            examples.push(`  [torn #${i}] …${c.slice(-70).replace(/\n/g, '⏎')} ⟪+${JSON.stringify(after)}⟫`);
          }
        }
      }
      const head = chunks[i].trimStart().slice(0, 2);
      if (/^[a-z]/.test(head)) startCut++;
    }

    console.log(`\n=== ${s.name}: ${chunks.length} chunks ===`);
    for (const e of examples) console.log(e);
    console.log(`  summary: tornSentenceEnds=${torn} lowercaseStartCuts=${startCut}`);
  }
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
