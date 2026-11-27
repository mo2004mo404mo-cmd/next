"""Fix remaining 3 mangled usages with corrected regex (no backslash escapes)."""
from pathlib import Path
import re

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()
LB = chr(91)
RB = chr(93)

# Pattern: `generated: akeDraft('XX'), makeDraft('YY')]` — missing [ and m on first
pattern = re.compile(r"generated: akeDraft\('([^']+)'\), makeDraft\('([^']+)'\)\]")
matches = pattern.findall(src)
print(f"Found {len(matches)} 2-element mangled patterns:", matches)
def repl2(m):
    return "generated: " + LB + "makeDraft('" + m.group(1) + "'), makeDraft('" + m.group(2) + "')" + RB
src = pattern.sub(repl2, src)

# Pattern: `generated: akeDraft('X')]` (single element)
pattern2 = re.compile(r"generated: akeDraft\('([^']+)'\)\]")
matches2 = pattern2.findall(src)
print(f"Found {len(matches2)} 1-element mangled patterns:", matches2)
def repl1(m):
    return "generated: " + LB + "makeDraft('" + m.group(1) + "')" + RB
src = pattern2.sub(repl1, src)

TEST.write_text(src)
print("Wrote. File size:", len(src))

back = TEST.read_text()
remaining = re.findall(r"akeDraft", back)
print(f"Remaining 'akeDraft' occurrences: {len(remaining)}")
