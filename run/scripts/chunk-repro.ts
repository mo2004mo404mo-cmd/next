/**
 * Reproduce chunking on the retained PDF originals with the CURRENT code,
 * to determine whether cuts persist after the sentence-aware chunker.
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

    console.log(`\n=== ${s.name}: ${chunks.length} chunks (raw ${text.length} chars) ===`);
    let midWord = 0, midSent = 0, tableEnd = 0;
    for (let i = 0; i < chunks.length; i++) {
      const c = chunks[i].trimEnd();
      const lastLine = c.split('\n').pop().trim();
      if (!/[.!?…:;")\]]$/.test(lastLine) && lastLine.length >= 25) {
        if (/^[•\-\*\d]/.test(lastLine)) { tableEnd++; continue; }
        // check if last word is cut (next chunk continues it, considering overlap)
        const next = chunks[i + 1]?.trimStart() ?? '';
        midSent++;
        if (midSent <= 4) {
          console.log(`  [end   #${i}] …${c.slice(-64).replace(/\n/g, '⏎')}`);
          console.log(`  [start #${i + 1}] ${next.slice(0, 64).replace(/\n/g, '⏎')}`);
        }
      }
      // mid-word: ends with lowercase letters, next starts lowercase (no overlap match)
      const tailWord = c.split(/\s+/).pop() ?? '';
      const headWord = (chunks[i + 1] ?? '').trimStart().split(/\s+/)[0] ?? '';
      if (/[a-z]$/.test(tailWord) && /^[a-z]/.test(headWord) && tailWord.length > 2 && headWord.length > 2 && !tailWord.includes(headWord)) {
        // possible mid-word only if next does NOT start with overlap copy of tail
        const overlapCarry = (chunks[i + 1] ?? '').includes(tailWord);
        if (!overlapCarry) { midWord++; if (midWord <= 3) console.log(`  [MID-WORD #${i}] "${tailWord}" + "${headWord}"`); }
      }
    }
    console.log(`  summary: midSentence-end=${midSent} tableEnd=${tableEnd} midWordSuspicious=${midWord}`);
  }
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
