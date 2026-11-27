#!/usr/bin/env python3
"""Build a small PPTX with embedded images for testing the question-import
VLM pass. The deck has:
  - Slide 1: title slide with one diagram (PNG generated inline)
  - Slide 2: a slide that contains an image-based MCQ (the question text
              is INSIDE the image, not in the slide text layer)
  - Slide 3: a slide with normal text + a small image (mixed content)
This is the case the user reported broken: "files contain images but you
extract text only and files contain image based questions".
"""
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from PIL import Image, ImageDraw, ImageFont
import io

OUT_DIR = "/home/z/my-project/download"
os.makedirs(OUT_DIR, exist_ok=True)
SAMPLE_DIR = "/tmp/sample-pptx"
os.makedirs(SAMPLE_DIR, exist_ok=True)


def make_image(text_lines, size=(640, 480), bg=(240, 248, 255)):
    img = Image.new("RGB", size, bg)
    draw = ImageDraw.Draw(img)
    try:
        font = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24
        )
        small = ImageFont.truetype(
            "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 18
        )
    except Exception:
        font = ImageFont.load_default()
        small = font
    y = 30
    for i, (line, big) in enumerate(text_lines):
        f = font if big else small
        draw.text((30, y), line, fill=(20, 20, 20), font=f)
        y += 38 if big else 26
    return img


# Slide 1: anatomy diagram (text + image)
img1 = make_image([
    ("Cardiac Conduction System", True),
    ("SA node -> AV node -> His bundle", False),
    ("-> Bundle branches -> Purkinje fibers", False),
], size=(640, 320))
img1_path = os.path.join(SAMPLE_DIR, "cardiac.png")
img1.save(img1_path)

# Slide 2: an IMAGE-BASED MCQ — question text and options live INSIDE the
# image, no slide-text layer at all. This is what the user means by
# "files contain image based questions".
img2 = make_image([
    ("Q. Which antiarrhythmic blocks K+ channels (Class III)?", True),
    ("", False),
    ("A. Lidocaine", False),
    ("B. Quinidine", False),
    ("C. Amiodarone", False),
    ("D. Flecainide", False),
    ("", False),
    ("Answer: C", False),
], size=(720, 480))
img2_path = os.path.join(SAMPLE_DIR, "mcq_image.png")
img2.save(img2_path)

# Slide 3: mixed content — slide text layer has the stem, an embedded image
# shows a labeled histology diagram the student must reference.
img3 = make_image([
    ("Histology: Cardiac muscle (400x)", True),
    ("- Intercalated discs (arrows)", False),
    ("- Branching fibers, central nuclei", False),
    ("- Striated appearance", False),
], size=(640, 320))
img3_path = os.path.join(SAMPLE_DIR, "histo.png")
img3.save(img3_path)


prs = Presentation()
blank = prs.slide_layouts[6]

# Slide 1
s1 = prs.slides.add_slide(blank)
s1.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(8.5), Inches(0.8)).text_frame.text = "Slide 1: Cardiac Conduction"
s1.shapes.add_picture(img1_path, Inches(1.5), Inches(1.5), width=Inches(6.0))

# Slide 2 — pure image-based question (NO text layer beyond the title)
s2 = prs.slides.add_slide(blank)
s2.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(8.5), Inches(0.8)).text_frame.text = "Slide 2: Image-based question"
s2.shapes.add_picture(img2_path, Inches(1.0), Inches(1.3), width=Inches(7.0))

# Slide 3 — mixed: text + small image
s3 = prs.slides.add_slide(blank)
tb = s3.shapes.add_textbox(Inches(0.5), Inches(0.3), Inches(8.5), Inches(1.5)).text_frame
tb.text = "Q. The cell junction marked with arrows in the image below is responsible for:"
p = tb.paragraphs[0]
p2 = tb.add_paragraph()
p2.text = "A. Electrical coupling between cardiomyocytes"
p3 = tb.add_paragraph()
p3.text = "B. Adhesion to basement membrane"
p4 = tb.add_paragraph()
p4.text = "C. Synchronous contraction (same as A — answer is A)"
s3.shapes.add_picture(img3_path, Inches(1.5), Inches(2.0), width=Inches(5.0))

out_pptx = os.path.join(OUT_DIR, "image-test.pptx")
prs.save(out_pptx)
print(f"Wrote {out_pptx} ({os.path.getsize(out_pptx)} bytes)")
print(f"Slide 1 has cardiac.png (anatomy diagram)")
print(f"Slide 2 has mcq_image.png (image-based MCQ — text is in the image)")
print(f"Slide 3 has histo.png (mixed text + image)")
