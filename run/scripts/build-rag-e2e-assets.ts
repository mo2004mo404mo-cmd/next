/**
 * Build E2E test assets for the knowledge/RAG pipeline:
 *   1. study-notes.md          — medical text with distinctive, checkable facts
 *   2. lecture.pdf             — a real (minimal) PDF with text content
 *   3. lecture-audio.mp3       — TTS-narrated medical content (tests ASR chain)
 *   4. lecture-video.mp4       — image + narration (tests ASR + frame VLM)
 */
import fs from 'fs';
import { execFile } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execFile);

const DIR = '/tmp/rag-e2e';
fs.mkdirSync(DIR, { recursive: true });

const NOTES = `# Grand Rounds: Acute Care Protocols — Ward Handbook v3

## Diabetic Ketoacidosis (DKA) Protocol
Our unit's DKA protocol differs from the textbook: we start insulin at 0.05 units/kg/h (NOT the classic 0.1),
because our audit of 412 admissions showed equal resolution time with half the hypoglycemia events.
Potassium must be checked before insulin: start replacement when K+ is below 4.2 mEq/L, targeting 4.0-4.5.
The preferred fluid is balanced crystalloid (Plasma-Lyte) over normal saline.

## Community-Acquired Pneumonia (CAP)
For CAP in our region, atypical coverage is mandatory: doxycycline 100 mg twice daily for 7 days is the
first-line outpatient choice because regional macrolide resistance is 38%. CURB-65 score of 2 or more
triggers admission. We do NOT use amoxicillin monotherapy here — resistance exceeded 30% in 2025.

## Heart Failure Discharge Bundle
Every discharge includes: SGLT2 initiator (dapagliflozin 10 mg daily), a 7-day weight diary,
and a follow-up appointment within 5 days. MRA (eplerenone 25 mg) is started before discharge when K+ < 5.0.

## Stroke Pathway
Door-to-needle target for thrombolysis is 35 minutes at our center (national target is 60).
Alteplase dose: 0.9 mg/kg, max 90 mg, 10% as bolus. NIHSS above 22 requires senior review
before thrombolysis.`;

async function makePdf(path: string, text: string): Promise<void> {
  // Minimal single/multi-page PDF with Helvetica text. pdfjs (unpdf) extracts this fine.
  const lines = text.split('\n').map((l) => l.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)'));
  const pageLines: string[][] = [];
  let cur: string[] = [];
  for (const line of lines) {
    cur.push(line);
    if (cur.length >= 40) { pageLines.push(cur); cur = []; }
  }
  if (cur.length) pageLines.push(cur);

  const objects: string[] = [];
  const pageObjIds: number[] = [];
  // 1: Catalog, 2: Pages, 3: Font
  const fontId = 3;
  let nextId = 4;
  for (const pl of pageLines) {
    const contentId = nextId++;
    const pageId = nextId++;
    pageObjIds.push(pageId);
    const content = `BT /F1 10 Tf 40 750 Td 13 TL\n${pl.map((l) => `(${l}) Tj T*`).join('\n')}\nET`;
    objects[contentId] = `<< /Length ${content.length} >>\nstream\n${content}\nendstream`;
    objects[pageId] =
      `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 ${fontId} 0 R >> >> /Contents ${contentId} 0 R >>`;
  }
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageObjIds.length} >>`;
  objects[3] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;

  let pdf = '%PDF-1.4\n';
  const offsets: number[] = [];
  for (let i = 1; i < objects.length; i++) {
    if (!objects[i]) continue;
    offsets[i] = pdf.length;
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = pdf.length;
  const maxId = objects.length;
  pdf += `xref\n0 ${maxId}\n0000000000 65535 f \n`;
  for (let i = 1; i < maxId; i++) {
    pdf += objects[i] ? `${String(offsets[i]).padStart(10, '0')} 00000 n \n` : `0000000000 65535 f \n`;
  }
  pdf += `trailer\n<< /Size ${maxId} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;
  fs.writeFileSync(path, Buffer.from(pdf, 'latin1'));
}

async function main() {
  // 1. Text notes
  fs.writeFileSync(`${DIR}/ward-handbook.md`, NOTES);
  console.log('✓ ward-handbook.md (', NOTES.length, 'chars )');

  // 2. PDF
  await makePdf(`${DIR}/ward-protocol.pdf`, NOTES.replace(/^#.*$/gm, '').trim());
  const pdfBytes = fs.statSync(`${DIR}/ward-protocol.pdf`).size;
  console.log('✓ ward-protocol.pdf (', pdfBytes, 'bytes )');

  // 3. TTS audio — a DIFFERENT protocol text so the audio is independently checkable
  const script =
    'Lecture recording. Antibiotic stewardship on ward five. ' +
    'Our local guideline for catheter associated urinary tract infection is nitrofurantoin one hundred milligrams twice daily for five days, ' +
    'and we reserve fosfomycin as a single three gram dose for patients with renal impairment. ' +
    'Catheter change must happen before the second antibiotic dose. ' +
    'Reminder: methenamine hippurate is now our preferred prophylaxis agent for recurrent infections, ' +
    'one gram twice daily, after the twenty twenty five stewardship review.';
  await exec('z-ai', ['tts', '-i', script, '-o', `${DIR}/lecture-audio.wav`]);
  await exec('ffmpeg', ['-y', '-i', `${DIR}/lecture-audio.wav`, '-codec:a', 'libmp3lame', '-b:a', '96k', `${DIR}/lecture-audio.mp3`]);
  const audioBytes = fs.statSync(`${DIR}/lecture-audio.mp3`).size;
  console.log('✓ lecture-audio.mp3 (', audioBytes, 'bytes ) — script len', script.length);

  // 4. Video: title card (drawtext) + the narration audio
  await exec('ffmpeg', [
    '-y',
    '-f', 'lavfi', '-i', 'color=c=0x0a3d62:s=1280x720:d=60',
    '-i', `${DIR}/lecture-audio.mp3`,
    '-vf', "drawtext=text='Ward 5 — Antibiotic Stewardship Lecture 2026':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=(h-text_h)/2,drawtext=text='CAUTI Protocol & Nitrofurantoin Dosing':fontcolor=yellow:fontsize=32:x=(w-text_w)/2:y=(h-text_h)/2+90",
    '-c:v', 'libx264', '-tune', 'stillimage', '-c:a', 'aac', '-b:a', '128k', '-shortest', '-pix_fmt', 'yuv420p',
    `${DIR}/lecture-video.mp4`,
  ], { timeout: 120_000 });
  const videoBytes = fs.statSync(`${DIR}/lecture-video.mp4`).size;
  console.log('✓ lecture-video.mp4 (', videoBytes, 'bytes )');

  console.log('\nAssets ready in', DIR);
}
main().catch((e) => { console.error('FAILED:', e); process.exit(1); });
