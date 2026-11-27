// Build a real .pptx test file with medical questions to upload through
// the MedQ Import modal in the browser (E2E verification of the new
// PPTX client-side extraction + AI question extraction pipeline).

import JSZip from 'jszip';

const slide = (title, body) => `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:sp><p:txBody><a:bodyPr/><a:lstStyle/>
    <a:p><a:r><a:rPr lang="en-US" b="1"/><a:t>${title}</a:t></a:r></a:p>
    ${body}
  </p:txBody></p:sp></p:spTree></p:cSld>
</p:sld>`;

const q = (lines) => lines.map((l) => `    <a:p><a:r><a:t>${l}</a:t></a:r></a:p>`).join('\n');

const slides = [
  slide('Pharmacology Quiz', q(['Question 1', 'Which drug class is first-line for heart failure with reduced ejection fraction?', 'A) Beta blockers', 'B) Calcium channel blockers', 'C) NSAIDs', 'D) First-generation antihistamines', 'Answer: A'])),
  slide('Q2', q(['What is the mechanism of action of metformin?', 'A) Increases insulin secretion', 'B) Decreases hepatic glucose output and increases insulin sensitivity', 'C) Blocks glucose absorption in the gut', 'D) Increases renal glucose excretion', 'Answer: B'])),
  slide('Q3', q(['Which antibiotic class carries the highest risk of Clostridioides difficile infection?', 'A) Penicillins', 'B) Macrolides', 'C) Fluoroquinolones', 'D) Aminoglycosides', 'Answer: C'])),
  slide('Q4', q(['A patient on an ACE inhibitor develops a persistent dry cough. What is the mechanism?', 'A) Potassium retention', 'B) Bradykinin accumulation', 'C) Renal artery stenosis', 'D) Angiotensin II surge', 'Answer: B'])),
];

const notes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:notes xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:sp><p:txBody>
    <a:p><a:r><a:t>Board-relevant: know bradykinin as the cough culprit; switching to an ARB resolves it.</a:t></a:r></a:p>
  </p:txBody></p:sp></p:spTree></p:cSld>
</p:notes>`;

const zip = new JSZip();
zip.file('[Content_Types].xml', '<?xml version="1.0"?><Types/>');
zip.file('_rels/.rels', '<?xml version="1.0"?><Relationships/>');
slides.forEach((s, i) => zip.file(`ppt/slides/slide${i + 1}.xml`, s));
zip.file('ppt/notesSlides/notesSlide4.xml', notes);

const buf = await zip.generateAsync({ type: 'nodebuffer' });
await Bun.write('/home/z/my-project/download/medq-test-quiz.pptx', buf);
console.log(`wrote /home/z/my-project/download/medq-test-quiz.pptx (${buf.length} bytes, ${slides.length} slides)`);
