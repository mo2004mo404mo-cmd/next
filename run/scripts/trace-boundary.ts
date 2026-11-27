/**
 * Trace the exact structure at the failing chunk boundaries.
 */
import pg from 'pg';
import { normalizeExtractedText, chunkTextQuality } from '../src/lib/agent/knowledge/text-quality';

async function main() {
  const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name FROM "KnowledgeSource" WHERE status='ready' AND name = 'Peditric-Med.pdf'`,
  );
  const s = sources[0];
  const fs = await import('fs');
  const buffer = fs.readFileSync(`upload/file-store/${s.id}.bin`);
  const { getDocumentProxy, extractText } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  const normalized = normalizeExtractedText(text);
  const chunks = chunkTextQuality(normalized, { size: 900, overlap: 150 });

  for (const idx of [137, 154, 157]) {
    const c = chunks[idx].trimEnd();
    const tail = c.slice(-120);
    console.log(`\n═══ chunk #${idx} (len ${c.length}) tail:`);
    console.log(JSON.stringify(tail));
    // Locate the tail's start in the normalized text
    const probe = tail.slice(0, 40);
    const at = normalized.indexOf(probe);
    if (at >= 0) {
      const boundary = at + tail.length;
      console.log(`— normalized text around the chunk END (boundary at ${boundary}):`);
      console.log(JSON.stringify(normalized.slice(boundary - 160, boundary + 240)));
    } else {
      console.log('— tail not found in normalized text (overlap-modified?)');
    }
  }
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
