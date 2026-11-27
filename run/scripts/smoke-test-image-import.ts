/**
 * smoke-test-image-import.ts
 *
 * Standalone Node script that simulates what the browser-side
 * extractFromFile() + ImportQuestionsModal would do for an image-bearing
 * PPTX file:
 *   1. Unzip the .pptx, extract slide text + slide→media images
 *   2. POST { text, fileName, images } to /api/questions/import/extract
 *   3. Poll the GET endpoint until the job settles (running | done | error)
 *   4. Print the extracted questions and any error message
 *
 * Run with: bun run scripts/smoke-test-image-import.ts
 */
import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const API_BASE = 'http://127.0.0.1:3000';
const PPTX_PATH = '/home/z/my-project/download/image-test.pptx';
const COOKIES_PATH = '/tmp/cookies.txt';

interface ExtractedImage { dataUrl: string; caption: string; }

function sniffImageMime(buf: Buffer): string | null {
  if (buf.length < 12) return null;
  if (buf[0] === 0xff && buf[1] === 0xd8) return 'image/jpeg';
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return 'image/png';
  if (buf.slice(0, 4).toString('latin1') === 'RIFF' && buf.slice(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
  if (buf.slice(0, 3).toString('latin1') === 'GIF') return 'image/gif';
  if (buf.slice(0, 2).toString('latin1') === 'BM') return 'image/bmp';
  return null;
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_m, h) => String.fromCodePoint(Number.parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_m, d) => String.fromCodePoint(Number(d)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function textFromSlideXml(xml: string): string {
  const withBreaks = xml
    .replace(/<a:br\s*\/?>/gi, '\n')
    .replace(/<a:p[^>]*>/gi, '')
    .replace(/<\/a:p>/gi, '\n');
  const withoutRuns = withBreaks.replace(
    /<a:r>([\s\S]*?)<\/a:r>/gi,
    (_m, inner) => {
      const ts = [...inner.matchAll(/<a:t>([\s\S]*?)<\/a:t>/gi)].map((x) => x[1]);
      return ts.join('');
    },
  );
  const text = withoutRuns.replace(/<a:t>([\s\S]*?)<\/a:t>/gi, '$1');
  return decodeXmlEntities(text.replace(/<[^>]*>/g, ''));
}

function slideNumber(name: string): number {
  const m = name.match(/(\d+)\.xml$/);
  return m ? parseInt(m[1], 10) : 0;
}

async function extractPptx(filePath: string): Promise<{ text: string; images: ExtractedImage[] }> {
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const slideNames = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort((a, b) => slideNumber(a) - slideNumber(b));

  const notesByName = new Map<number, string>();
  for (const n of Object.keys(zip.files)) {
    const m = n.match(/^ppt\/notesSlides\/notesSlide(\d+)\.xml$/);
    if (m) notesByName.set(parseInt(m[1], 10), n);
  }

  const parts: string[] = [];
  const images: ExtractedImage[] = [];
  const seenMedia = new Set<string>();

  for (let i = 0; i < slideNames.length; i++) {
    const name = slideNames[i];
    const sn = slideNumber(name);
    const slideXml = await zip.file(name)!.async('string');
    const slideText = textFromSlideXml(slideXml).trim();
    const notesName = notesByName.get(sn);
    let notesText = '';
    if (notesName && zip.file(notesName)) {
      const notesXml = await zip.file(notesName)!.async('string');
      notesText = textFromSlideXml(notesXml).trim();
    }

    // Walk rels for this slide's embedded images
    const relsPath = `ppt/slides/_rels/slide${sn}.xml.rels`;
    const relsEntry = zip.file(relsPath);
    const slideImages: string[] = [];
    if (relsEntry) {
      const relsXml = await relsEntry.async('string');
      for (const tag of relsXml.matchAll(/<Relationship\b[^>]*>/g)) {
        const tagStr = tag[0];
        if (!/\/image"/.test(tagStr)) continue;
        const target = tagStr.match(/Target="([^"]+)"/)?.[1];
        if (!target) continue;
        const mediaPath = target.startsWith('/') ? target.slice(1) : target.replace(/^\.\.\//, 'ppt/');
        if (seenMedia.has(mediaPath)) continue;
        const imgEntry = zip.file(mediaPath);
        if (!imgEntry) continue;
        const imgBuf = await imgEntry.async('nodebuffer');
        if (imgBuf.length < 4_000) continue;
        const mime = sniffImageMime(imgBuf);
        if (!mime) continue;
        const dataUrl = `data:${mime};base64,${imgBuf.toString('base64')}`;
        slideImages.push(dataUrl);
        seenMedia.add(mediaPath);
      }
    }

    let part = `── Slide ${i + 1} ──\n${slideText}`;
    if (notesText) part += `\n[Speaker notes]: ${notesText}`;
    if (slideImages.length > 0) {
      part += `\n[Image ${slideImages.length === 1 ? 'is' : 's are'} embedded on this slide — see VLM extraction below.]`;
      for (let k = 0; k < slideImages.length; k++) {
        images.push({
          dataUrl: slideImages[k],
          caption: `Slide ${i + 1}${slideImages.length > 1 ? ` (image ${k + 1})` : ''}`,
        });
      }
    }
    parts.push(part);
  }

  return { text: parts.join('\n\n'), images };
}

async function startJob(text: string, fileName: string, images: ExtractedImage[]): Promise<string> {
  const body = JSON.stringify({ text, fileName, images });
  const res = await fetch(`${API_BASE}/api/questions/import/extract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: fs.readFileSync(COOKIES_PATH, 'utf-8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.split('\t').slice(-2).join('=')).join('; '),
    },
    body,
  });
  const data = await res.json();
  if (!res.ok || !data.jobId) throw new Error(`POST extract failed: ${res.status} ${JSON.stringify(data)}`);
  return data.jobId;
}

async function pollJob(jobId: string): Promise<any> {
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 5000));
    const res = await fetch(`${API_BASE}/api/questions/import/extract?jobId=${jobId}`, {
      headers: {
        cookie: fs.readFileSync(COOKIES_PATH, 'utf-8').split('\n').filter((l) => l.trim() && !l.startsWith('#')).map((l) => l.split('\t').slice(-2).join('=')).join('; '),
      },
    });
    const data = await res.json();
    const d = JSON.stringify(data).slice(0, 200);
    console.log(`poll ${i + 1}: ${d}`);
    if (data.status === 'done' || data.status === 'error') return data;
  }
  throw new Error('job did not finish in 5 min');
}

(async () => {
  console.log(`Extracting from ${PPTX_PATH}…`);
  const { text, images } = await extractPptx(PPTX_PATH);
  console.log(`  text: ${text.length} chars`);
  console.log(`  images: ${images.length}`);
  for (const img of images) {
    console.log(`    - ${img.caption} (${Math.round(img.dataUrl.length * 0.75 / 1024)} KB)`);
  }
  console.log('---');
  console.log('Starting extraction job…');
  const jobId = await startJob(text, path.basename(PPTX_PATH), images);
  console.log(`  jobId: ${jobId}`);
  console.log('---');
  console.log('Polling until done…');
  const result = await pollJob(jobId);
  console.log('---');
  console.log('Final result:');
  console.log(JSON.stringify(result, null, 2).slice(0, 4000));
})().catch((e) => {
  console.error('SMOKE TEST FAILED:', e);
  process.exit(1);
});
