"""Fix the remaining 3 mangled makeDraft usages in the test file.

Each is `generated: akeDraft('X'), makeDraft('Y')]` — should be
`generated: [makeDraft('X'), makeDraft('Y')]`.
"""
from pathlib import Path

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()

LB = chr(91)
RB = chr(93)

# Build the fixed strings using chr() to dodge the toolchain mangling.
g1 = "generated: " + LB + "makeDraft('g1'), makeDraft('g2')" + RB
g3 = "generated: " + LB + "makeDraft('g3'), makeDraft('g4')" + RB
gx = "generated: " + LB + "makeDraft('x')" + RB

# Replacements: find each mangled pattern, replace with the fixed string.
import re
# Pattern: `generated: akeDraft('XX'), makeDraft('YY')]` (missing [ and m on first)
pattern = re.compile(r"generated: akeDraft\(\'([^\']+)\'\), makeDraft\(\'([^\']+)\'\)\]")
matches = pattern.findall(src)
print(f"Found {len(matches)} 2-element mangled patterns:", matches)
src = pattern.sub(lambda m: g1[:0] + "generated: " + LB + "makeDraft('" + m.group(1) + "'), makeDraft('" + m.group(2) + "')" + RB, src)

# Pattern: `generated: akeDraft('X')]` (single element, missing [ and m)
pattern2 = re.compile(r"generated: akeDraft\(\'([^\']+)\'\)\]")
matches2 = pattern2.findall(src)
print(f"Found {len(matches2)} 1-element mangled patterns:", matches2)
src = pattern2.sub(lambda m: "generated: " + LB + "makeDraft('" + m.group(1) + "')" + RB, src)

TEST.write_text(src)
print("Wrote fixes. File size:", len(src))

# Verify
back = TEST.read_text()
import re as re2
remaining = re2.findall(r"akeDraft", back)
print(f"Remaining 'akeDraft' occurrences: {len(remaining)}")
