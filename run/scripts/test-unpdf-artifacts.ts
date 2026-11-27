/* Probe unpdf extraction artifacts on the retained PDFs */
import fs from 'fs';
import path from 'path';

const DIR = '/home/z/my-project/upload/file-store';

async function main() {
  const files = fs.readdirSync(DIR).filter((f) => f.endsWith('.bin'));
  for (const f of files) {
    const buf = fs.readFileSync(path.join(DIR, f));
    const head = buf.subarray(0, 5).toString('latin1');
    const isPdf = head.startsWith('%PDF');
    const isZip = buf.subarray(0, 2).toString('latin1') === 'PK';
    console.log(`\n=== ${f} (${Math.round(buf.length / 1024)}KB) pdf=${isPdf} zip=${isZip}`);
    if (!isPdf) continue;
    const { getDocumentProxy, extractText } = await import('unpdf');
    const pdf = await getDocumentProxy(new Uint8Array(buf));
    const { text } = await extractText(pdf, { mergePages: true });
    console.log(`pages text length: ${text.length}`);
    // Show a representative middle slice with visible line markers
    const mid = text.slice(400, 1400);
    console.log('--- RAW 1000 chars from offset 400 (⏎ shown as \\n) ---');
    console.log(JSON.stringify(mid).slice(0, 1600));
    // Artifact census
    const hyphBreak = text.match(/[a-z]-\n[a-z]/g) || [];
    const letterBreak = text.match(/[a-zA-Z]\n[a-zA-Z]/g) || [];
    const doubleSpace = text.match(/  +/g) || [];
    const noSpaceJoin = text.match(/[a-z][A-Z][a-z]/g) || [];
    console.log(`\nARTIFACTS: hyphen-linebreaks=${hyphBreak.length} letter-newline-letter=${letterBreak.length} multi-space=${doubleSpace.length} lowerUpperJoin=${noSpaceJoin.length}`);
    if (letterBreak.length) console.log('letterBreak samples:', JSON.stringify(letterBreak.slice(0, 8)));
    if (noSpaceJoin.length) console.log('noSpaceJoin samples:', JSON.stringify(noSpaceJoin.slice(0, 8)));
  }
}

main().catch((e) => { console.error('FAILED', e); process.exit(1); });
