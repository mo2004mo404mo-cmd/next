#!/usr/bin/env python3
"""gen-e2e-pdf.py — build a realistic multi-page PDF question bank for E2E.

Simulates the user's file: "Adrenaline Pediatrics Mid Answers.pdf" style —
terse pediatric MCQs with inline options, letter answers and short
explanations, ~500 chars/question, flowing across many pages. The OLD
file-extract.ts capped client text at 80k chars (~160 of these questions);
the fix must let ALL of them through.

Usage: python3 scripts/gen-e2e-pdf.py [count] [out.pdf]
"""
import sys

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer

COUNT = int(sys.argv[1]) if len(sys.argv) > 1 else 350
OUT = sys.argv[2] if len(sys.argv) > 2 else "/home/z/my-project/scripts/e2e-bank.pdf"

STEMS = [
    ("At birth weight {g} g, which gross-motor milestone is expected at the next visit in a healthy infant?",
     ["Sits without support", "Walks alone", "Climbs stairs", "Rides a tricycle"]),
    ("In the Egyptian EPI schedule for an infant born in week {g}, which vaccine is given at birth?",
     ["BCG and HepB", "MMR", "OPV only", "DPT"]),
    ("A {g}-day-old child with noisy breathing and biphasic stridor most likely has:",
     ["Laryngomalacia", "Vascular ring", "Asthma", "Bronchiolitis"]),
    ("For a child weighing {g} kg in status epilepticus, first-line treatment is:",
     ["IV Lorazepam", "Phenytoin", "Phenobarbital", "Levetiracetam"]),
    ("In a toddler on {g} ml/day of cow milk, the most common cause of iron-deficiency anemia is:",
     ["Excess cow-milk intake", "GI blood loss", "Hookworm", "Celiac disease"]),
    ("An infant who has lost {g} g since birth shows which finding of severe dehydration?",
     ["Sunken fontanelle + anuria", "Dry mucosa", "Slightly decreased urine", "Restless thirst"]),
    ("In a term newborn with a peak bilirubin of {g} mg/dL, physiologic jaundice typically peaks at:",
     ["Day 3–5 of life", "First 24 hours", "Day 10", "Week 3"]),
    ("A murmur graded {g}/6 at the left sternal border with a fixed split S2 suggests:",
     ["ASD", "VSD", "PDA", "TOF"]),
]
ANS = ["A", "B", "C", "D"]
EXPL = [
    "This milestone matches the expected developmental window for age.",
    "The schedule gives this antigen in the first 24 hours of life.",
    "The character of the stridor localizes the lesion to the supraglottic airway.",
    "Benzodiazepines abort seizures fastest and are given first, in parallel with workup.",
    "Excess cow-milk causes occult intestinal losses plus poor iron intake.",
    "The combination reflects significant intravascular depletion needing rapid resuscitation.",
    "Physiologic jaundice rises after 24 h, peaks day 3–5, resolves by 2 weeks.",
    "The fixed split is the classic auscultatory hallmark of this lesion.",
]

doc = SimpleDocTemplate(OUT, pagesize=A4, title="Adrenaline Pediatrics Mid Answers — E2E")
styles = {
    "q": ParagraphStyle("q", fontName="Helvetica-Bold", fontSize=9.5, leading=13, spaceBefore=6),
    "body": ParagraphStyle("body", fontName="Helvetica", fontSize=9.5, leading=13),
    "ans": ParagraphStyle("ans", fontName="Helvetica-Oblique", fontSize=9, leading=12, spaceAfter=6),
}
story = [
    Paragraph("Pediatrics Midterm Question Bank — Answers Included", styles["q"]),
    Spacer(1, 4 * mm),
]
for i in range(1, COUNT + 1):
    stem, opts = STEMS[i % len(STEMS)]
    g = 100 * i + (i % 17)  # unique number inside the first 80 chars
    text = stem.format(g=g) if "{g}" in stem else stem
    correct = (i % 4) + 1
    letters = ["A", "B", "C", "D"]
    story.append(Paragraph(f"{i}. {text} (Q{i:03d}/{COUNT})", styles["q"]))
    story.append(
        Paragraph(
            " &nbsp; ".join(f"{letters[j]}) {o}" for j, o in enumerate(opts)),
            styles["body"],
        )
    )
    story.append(Paragraph(f"Answer: {ANS[correct - 1]} — {EXPL[i % len(EXPL)]}", styles["ans"]))

doc.build(story)
import os  # noqa: E402

print(f"wrote {OUT}: {os.path.getsize(OUT)} bytes, {COUNT} questions")
