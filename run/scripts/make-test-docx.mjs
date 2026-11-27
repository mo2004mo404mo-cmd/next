// Create a test docx artifact (like the office tools do: file in
// public/generated + AgentArtifact DB row) so the /pdf preview route can be
// verified end-to-end with soffice conversion.
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';
import fs from 'node:fs';
import { randomUUID } from 'node:crypto';

const doc = new Document({
  sections: [{
    children: [
      new Paragraph({ text: 'Heart Failure Cheat Sheet', heading: HeadingLevel.HEADING_1 }),
      new Paragraph('Diagnosis: echocardiography for EF classification; BNP over 100 pg/mL supports the diagnosis.'),
      new Paragraph('Treatment ladder: ACE inhibitor, evidence-based beta blocker, MRA, SGLT2 inhibitor.'),
    ],
  }],
});

const buffer = await Packer.toBuffer(doc);
const fileName = `artifact-${randomUUID().slice(0, 12)}.docx`;
fs.writeFileSync(`public/generated/${fileName}`, buffer);

console.log('docx written:', fileName, buffer.byteLength, 'bytes');
console.log('ARTIFACT_FILE=' + fileName);
