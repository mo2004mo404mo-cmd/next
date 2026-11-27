#!/usr/bin/env python3
"""Build test fixtures for the Knowledge Library ingestion pipeline.

- test-deck.pptx : 3 slides (text + speaker notes) + 1 embedded slide image
                   (python-pptx → structurally real PPTX)
- test-book.epub : minimal valid EPUB (mimetype/container/opf/spine, 2 chapters)

Run: /tmp/pptx-venv/bin/python scripts/make-test-fixtures.py
"""
import zipfile
import os

FIX = "/home/z/my-project/upload/fixtures"
os.makedirs(FIX, exist_ok=True)

# ── PPTX ────────────────────────────────────────────────────────────────────
from pptx import Presentation
from pptx.util import Inches, Pt

prs = Presentation()
prs.slide_width = Inches(13.333)
prs.slide_height = Inches(7.5)
blank = prs.slide_layouts[6]

# Slide 1 — title + bullets
s1 = prs.slides.add_slide(blank)
tb = s1.shapes.add_textbox(Inches(0.7), Inches(0.6), Inches(12), Inches(2))
tf = tb.text_frame
tf.text = "Diabetic Ketoacidosis — Emergency Management"
p = tf.add_paragraph()
p.text = "Ward Protocol, 4th edition"
notes = s1.notes_slide.notes_text_frame
notes.text = "Emphasize the triad: hyperglycemia, ketosis, metabolic acidosis. Residents often forget the anion gap."

# Slide 2 — bullets + embedded image (the DKA slide PNG)
s2 = prs.slides.add_slide(blank)
tb2 = s2.shapes.add_textbox(Inches(0.7), Inches(0.6), Inches(7), Inches(5))
tf2 = tb2.text_frame
tf2.text = "Insulin and Potassium Rules"
for line in [
    "Start insulin 0.1 units/kg/h IV once K+ > 3.3 mmol/L",
    "Add 20-30 mEq KCl to fluids when K+ < 5.2",
    "Check glucose hourly, potassium every 2 hours",
    "Switch to dextrose 5% when glucose < 200 mg/dL",
]:
    para = tf2.add_paragraph()
    para.text = line
if os.path.exists(f"{FIX}/slide1.png"):
    s2.shapes.add_picture(f"{FIX}/slide1.png", Inches(8.2), Inches(1.5), width=Inches(4.6))
notes2 = s2.notes_slide.notes_text_frame
notes2.text = "Do not start insulin before correcting hypokalemia — risk of fatal arrhythmia."

# Slide 3 — bullets only
s3 = prs.slides.add_slide(blank)
tb3 = s3.shapes.add_textbox(Inches(0.7), Inches(0.6), Inches(12), Inches(6))
tf3 = tb3.text_frame
tf3.text = "Cerebral Edema"
for line in [
    "Most feared complication, mostly in children",
    "Treat with mannitol 0.5-1 g/kg or hypertonic saline 3%",
    "Avoid overly rapid sodium correction",
    "Headache or altered mental status → act immediately",
]:
    para = tf3.add_paragraph()
    para.text = line
notes3 = s3.notes_slide.notes_text_frame
notes3.text = "Mortality of cerebral edema approaches 25% — high suspicion is key."

prs.save(f"{FIX}/test-deck.pptx")
print(f"wrote {FIX}/test-deck.pptx ({os.path.getsize(f'{FIX}/test-deck.pptx')} bytes)")

# ── EPUB ────────────────────────────────────────────────────────────────────
ch1 = """<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Chapter 1: Chest Pain</title></head><body>
<h1>Chapter 1: Chest Pain</h1>
<p>Chest pain in the emergency department demands rapid triage. Acute coronary syndrome presents as pressure-like
substernal pain radiating to the left arm or jaw, lasting more than twenty minutes, often with diaphoresis.</p>
<p>Esophageal rupture (Boerhaave syndrome) follows forceful vomiting and shows mediastinal air on CT.
Aortic dissection tears with a ripping character radiating to the back, and a widened mediastinum on chest x-ray.</p>
<p>Pulmonary embolism causes pleuritic pain with tachycardia and hypoxemia; use the Wells score to guide imaging.</p>
</body></html>"""

ch2 = """<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml"><head><title>Chapter 2: Shock</title></head><body>
<h1>Chapter 2: Shock</h1>
<p>Distributive shock includes septic, anaphylactic, and neurogenic forms. Septic shock requires vasopressors
to maintain mean arterial pressure above 65 mmHg despite adequate fluid resuscitation.</p>
<p>Cardiogenic shock features cool clammy skin, pulmonary edema, and a low cardiac output state.
The SHOCK trial favored early revascularization.</p>
<p>Hemorrhagic shock is treated with balanced blood products, not crystalloid — follow the massive transfusion protocol.</p>
</body></html>"""

container = """<?xml version="1.0"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles><rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/></rootfiles>
</container>"""

opf = """<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="bookid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="bookid">urn:uuid:medq-test-book</dc:identifier>
    <dc:title>Emergency Medicine Essentials</dc:title>
    <dc:creator>MedQ Test Suite</dc:creator>
    <dc:language>en</dc:language>
  </metadata>
  <manifest>
    <item id="ch1" href="chapter1.xhtml" media-type="application/xhtml+xml"/>
    <item id="ch2" href="chapter2.xhtml" media-type="application/xhtml+xml"/>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
  </manifest>
  <spine>
    <itemref idref="ch1"/>
    <itemref idref="ch2"/>
  </spine>
</package>"""

nav = """<?xml version="1.0" encoding="utf-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops">
<head><title>Navigation</title></head><body><nav epub:type="toc"><ol>
<li><a href="chapter1.xhtml">Chapter 1: Chest Pain</a></li>
<li><a href="chapter2.xhtml">Chapter 2: Shock</a></li>
</ol></nav></body></html>"""

epub_path = f"{FIX}/test-book.epub"
with zipfile.ZipFile(epub_path, "w") as z:
    z.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)
    z.writestr("META-INF/container.xml", container)
    z.writestr("OEBPS/content.opf", opf)
    z.writestr("OEBPS/nav.xhtml", nav)
    z.writestr("OEBPS/chapter1.xhtml", ch1)
    z.writestr("OEBPS/chapter2.xhtml", ch2)
print(f"wrote {epub_path} ({os.path.getsize(epub_path)} bytes)")
