"""Final fix — use chr() to build the regex pattern, sidestepping all
escape/quote handling in the Write toolchain.
"""
from pathlib import Path
import re

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()

APOS = chr(39)  # single quote '
LB = chr(91)    # [
RB = chr(93)    # ]

# Pattern A: 2-element form `generated: akeDraft('XX'), makeDraft('YY')]`
# Built from chr() pieces so the Write tool cannot mangle quotes.
pat2_str = (
    "generated: akeDraft" + LB + "]" + APOS + "([^" + APOS + "]+)" + APOS + LB + "]"
    ", makeDraft" + LB + "]" + APOS + "([^" + APOS + "]+)" + APOS + LB + "]" + LB + "]" + RB
)
# Simpler: build with chr() substitution
pat2_str = "generated: akeDraft[(]'([^']+)'[)], makeDraft[(]'([^']+)'[)][]]"
print("pat2_str repr:", repr(pat2_str))
pat2 = re.compile(pat2_str)
n2 = pat2.findall(src)
print("2-elem matches:", n2)

def repl2(m):
    return "generated: " + LB + "makeDraft" + APOS + m.group(1) + APOS + "), makeDraft(" + APOS + m.group(2) + APOS + ")" + RB

# Wait — the replacement also needs the parentheses. Let me just hardcode
# the result format since the regex captures are simple.
def repl2_correct(m):
    a = m.group(1)
    b = m.group(2)
    return "generated: " + LB + "makeDraft(" + APOS + a + APOS + "), makeDraft(" + APOS + b + APOS + ")" + RB

src = pat2.sub(repl2_correct, src)

# Pattern B: 1-element form `generated: akeDraft('X')]`
pat1_str = "generated: akeDraft[(]'([^']+)'[)][]]"
pat1 = re.compile(pat1_str)
n1 = pat1.findall(src)
print("1-elem matches:", n1)
def repl1_correct(m):
    a = m.group(1)
    return "generated: " + LB + "makeDraft(" + APOS + a + APOS + ")" + RB
src = pat1.sub(repl1_correct, src)

TEST.write_text(src)
print("Wrote. File size:", len(src))

back = TEST.read_text()
remaining = re.findall(r"akeDraft", back)
print("Remaining akeDraft occurrences:", len(remaining))
