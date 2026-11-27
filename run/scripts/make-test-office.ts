/**
 * Build test-deck fixtures: XLSX (exceljs, 2 sheets of medical data) and
 * DOCX with an embedded image (docx package + slide PNG).
 *
 * Run: bunx tsx scripts/make-test-office.ts
 */
import fs from 'fs';

const FIX = '/home/z/my-project/upload/fixtures';

async function makeXlsx() {
  const ExcelJS = (await import('exceljs')).default ?? (await import('exceljs'));
  const wb = new ExcelJS.Workbook();

  const labs = wb.addWorksheet('Lab Reference Ranges');
  labs.addRow(['Analyte', 'Reference Range', 'Units', 'Critical Value']);
  labs.addRow(['WBC', '4.0 - 11.0', '10^9/L', '< 2.0 or > 30.0']);
  labs.addRow(['Hemoglobin', '13.5 - 17.5 (M), 12.0 - 15.5 (F)', 'g/dL', '< 7.0']);
  labs.addRow(['Potassium', '3.5 - 5.1', 'mmol/L', '< 2.8 or > 6.2']);
  labs.addRow(['Creatinine', '0.7 - 1.3', 'mg/dL', '> 5.0']);
  labs.addRow(['Troponin I', '< 0.04', 'ng/mL', '> 0.40']);
  labs.addRow(['Lactate', '0.5 - 2.2', 'mmol/L', '> 4.0']);

  const drugs = wb.addWorksheet('Emergency Drug Doses');
  drugs.addRow(['Drug', 'Adult Dose', 'Route', 'Indication']);
  drugs.addRow(['Adenosine', '6 mg then 12 mg', 'IV push', 'SVT']);
  drugs.addRow(['Epinephrine (anaphylaxis)', '0.3 - 0.5 mg', 'IM', 'Anaphylaxis']);
  drugs.addRow(['Naloxone', '0.4 - 2 mg, repeat q2-3min', 'IV/IM/IN', 'Opioid overdose']);
  drugs.addRow(['Mannitol', '0.5 - 1 g/kg', 'IV over 20 min', 'Cerebral edema']);
  drugs.addRow(['Insulin (DKA)', '0.1 units/kg/h', 'IV infusion', 'DKA']);
  drugs.addRow(['Hypertonic saline 3%', '5 mL/kg over 10 min', 'IV', 'Raised ICP']);

  await wb.xlsx.writeFile(`${FIX}/test-labs.xlsx`);
  console.log(`wrote ${FIX}/test-labs.xlsx (${fs.statSync(`${FIX}/test-labs.xlsx`).size} bytes)`);
}

async function makeDocx() {
  const { Document, Packer, Paragraph, HeadingLevel, TextRun, ImageRun } = await import('docx');
  const img = fs.readFileSync(`${FIX}/slide1.png`);

  const doc = new Document({
    sections: [
      {
        children: [
          new Paragraph({ text: 'DKA Ward Protocol — Resident Handbook', heading: HeadingLevel.HEADING_1 }),
          new Paragraph(
            'Diabetic ketoacidosis is defined by the triad of hyperglycemia above 250 mg/dL, ketonemia, and metabolic acidosis with an anion gap above 12. The first-hour priorities are fluid resuscitation with one liter of normal saline and a potassium check before any insulin is started.',
          ),
          new Paragraph({ text: 'Insulin Infusion', heading: HeadingLevel.HEADING_2 }),
          new Paragraph(
            'Begin a regular insulin infusion at 0.1 units per kilogram per hour once serum potassium exceeds 3.3 mmol/L. Target a glucose fall of 50-75 mg/dL per hour. When glucose falls below 200 mg/dL, add dextrose 5% to the fluids and reduce the infusion to 0.05 units/kg/h.',
          ),
          new Paragraph({ text: 'Teaching Slide', heading: HeadingLevel.HEADING_2 }),
          new Paragraph({
            children: [
              new ImageRun({
                data: img,
                transformation: { width: 460, height: 259 },
              }),
            ],
          }),
          new Paragraph({ text: 'Cerebral Edema', heading: HeadingLevel.HEADING_2 }),
          new Paragraph(
            'Cerebral edema is the leading cause of death in pediatric DKA, with a mortality near 25%. Warning signs include headache, bradycardia, and deteriorating mental status. Treat immediately with mannitol 0.5-1 g/kg or hypertonic saline 3%.',
          ),
        ],
      },
    ],
  });

  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(`${FIX}/test-notes.docx`, buf);
  console.log(`wrote ${FIX}/test-notes.docx (${buf.length} bytes)`);
}

async function main() {
  fs.mkdirSync(FIX, { recursive: true });
  await makeXlsx();
  await makeDocx();
}

void main().catch((e) => { console.error(e); process.exit(1); });
