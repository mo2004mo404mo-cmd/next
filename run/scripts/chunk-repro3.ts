/**
 * Precise torn-sentence detection: strips the overlap carry (longest suffix
 * of chunk i that prefixes chunk i+1) and checks whether the NEW content
 * starts mid-sentence (lowercase) while the previous chunk ended without a
 * terminator.
 */
import pg from 'pg';
import { chunkTextQuality, normalizeExtractedText } from '../src/lib/agent/knowledge/text-quality';

function detectTorn(cur: string, next: string): { torn: boolean; continuation: string } {
  const a = cur.trimEnd();
  const b = next.trimStart();
  const max = Math.min(220, a.length, b.length);
  for (let l = max; l >= 12; l--) {
    if (b.startsWith(a.slice(a.length - l))) {
      const rest = b.slice(l).trimStart();
      if (!rest) return { torn: false, continuation: '' };
      return { torn: /^[a-z]/.test(rest) && !/[.!?…]$/.test(a.slice(-1)), continuation: rest.slice(0, 40) };
    }
  }
  return { torn: /^[a-z]/.test(b) && !/[.!?…]$/.test(a.slice(-1)), continuation: b.slice(0, 40) };
}

async function main() {
  const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name FROM "KnowledgeSource" WHERE status='ready' AND name LIKE '%.pdf' ORDER BY name`,
  );
  for (const s of sources) {
    const fs = await import('fs');
    const p = `upload/file-store/${s.id}.bin`;
    if (!fs.existsSync(p)) continue;
    const buffer = fs.readFileSync(p);
    const { getDocumentProxy, extractText } = await import('unpdf');
    const pdf = await getDocumentProxy(new Uint8Array(buffer));
    const { text } = await extractText(pdf, { mergePages: true });
    const chunks = chunkTextQuality(normalizeExtractedText(text), { size: 900, overlap: 150 });

    let torn = 0;
    const examples: string[] = [];
    for (let i = 0; i < chunks.length - 1; i++) {
      const { torn: isTorn, continuation } = detectTorn(chunks[i], chunks[i + 1]);
      if (isTorn) {
        torn++;
        if (examples.length < 8) {
          examples.push(`  [torn #${i}] …${chunks[i].trimEnd().slice(-60).replace(/\n/g, '⏎')} ⟪next: ${continuation}…⟫`);
        }
      }
    }
    console.log(`\n=== ${s.name}: ${chunks.length} chunks, torn=${torn} ===`);
    for (const e of examples) console.log(e);
  }
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
