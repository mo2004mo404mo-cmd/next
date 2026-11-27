/**
 * Debug the raw + normalized text around the repro'd cut points.
 */
import pg from 'pg';
import { normalizeExtractedText } from '../src/lib/agent/knowledge/text-quality';

async function main() {
  const client = new pg.Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
  await client.connect();
  const { rows: sources } = await client.query(
    `SELECT id, name FROM "KnowledgeSource" WHERE status='ready' AND name LIKE '%.pdf' ORDER BY name`,
  );
  const s = sources.find((r: { name: string }) => r.name === 'Peditric-Med.pdf') ?? sources[0];
  const fs = await import('fs');
  const p = `upload/file-store/${s.id}.bin`;
  const buffer = fs.readFileSync(p);
  const { getDocumentProxy, extractText } = await import('unpdf');
  const pdf = await getDocumentProxy(new Uint8Array(buffer));
  const { text } = await extractText(pdf, { mergePages: true });
  const normalized = normalizeExtractedText(text);

  const probes = [
    'worth remembering: whatever',
    'spacing out to every few months',
    'once biochemical',
    'the same follow-up cadence',
  ];
  for (const probe of probes) {
    const i = normalized.indexOf(probe);
    console.log(`\n=== probe "${probe}" @ ${i} ===`);
    if (i >= 0) {
      const rawIdx = text.replace(/\r/g, '').indexOf(probe.split(':')[0].split(' ').slice(0, 3).join(' '));
      console.log('--- RAW around probe:');
      const ri = Math.max(0, rawIdx - 200);
      console.log(JSON.stringify(text.slice(ri, rawIdx + 320)));
      console.log('--- NORMALIZED around probe:');
      console.log(JSON.stringify(normalized.slice(Math.max(0, i - 200), i + 320)));
    }
  }
  await client.end();
}
main().catch((e) => { console.error(e); process.exit(1); });
