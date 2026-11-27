"""Fix remaining 3 mangled makeDraft usages with corrected regex.

This script is written via the Write tool (not heredoc) to preserve
regex backslashes exactly. The earlier heredoc approach doubled them.
"""
from pathlib import Path
import re

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()
LB = chr(91)
RB = chr(93)

# Pattern A: 2-element form `generated: akeDraft('XX'), makeDraft('YY')]`
pat2 = re.compile(r"generated: akeDraft\('([^']+)'\), makeDraft\('([^']+)'\)\]")
n2 = pat2.findall(src)
print("2-elem matches:", n2)
def repl2(m):
    return "generated: " + LB + "makeDraft('" + m.group(1) + "'), makeDraft('" + m.group(2) + "')" + RB
src = pat2.sub(repl2, src)

# Pattern B: 1-element form `generated: akeDraft('X')]`
pat1 = re.compile(r"generated: akeDraft\('([^']+)'\)\]")
n1 = pat1.findall(src)
print("1-elem matches:", n1)
def repl1(m):
    return "generated: " + LB + "makeDraft('" + m.group(1) + "')" + RB
src = pat1.sub(repl1, src)

TEST.write_text(src)
print("Wrote. File size:", len(src))

back = TEST.read_text()
remaining = re.findall(r"akeDraft", back)
print("Remaining akeDraft occurrences:", len(remaining))
