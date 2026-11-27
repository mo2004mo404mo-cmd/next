"""Rewrite the reducer tests in question-generation-graph.test.ts to avoid
the literal sequence that the toolchain strips. Uses plain object literals
inside arrays instead of makeDraft() calls.
"""
from pathlib import Path

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()

# Find the describe('GraphState reducers' block and replace it entirely.
start_marker = "describe('GraphState reducers'"
end_marker = "});"
start_idx = src.find(start_marker)
if start_idx == -1:
    raise SystemExit("Could not find GraphState reducers block")

# Find the matching closing }); — scan from start_idx.
# The block ends with the LAST }); before the next top-level construct.
# Since this is the last describe in the file, find the LAST }); from end.
end_idx = src.rfind(end_marker, start_idx)
if end_idx == -1:
    raise SystemExit("Could not find end of reducers block")
end_idx += len(end_marker)

old_block = src[start_idx:end_idx]
print("OLD block length:", len(old_block))

# Build new block. We avoid the problematic sequence by using array literals
# of plain objects: [{ localId: 'a' }] — written via chr() to be safe.
LB = chr(91)
RB = chr(93)
# Build the array literal: [{localId:'a'}]
arr_a = LB + "{ localId: 'a' }" + RB
arr_b = LB + "{ localId: 'b' }" + RB
arr_bc = LB + "{ localId: 'b' }, { localId: 'c' }" + RB

new_block = (
    "describe('GraphState reducers', () => {\n"
    "  it('generated reducer concatenates across nodes', () => {\n"
    "    const r = GraphState.channels.generated.reducer;\n"
    "    const a = " + arr_a + ";\n"
    "    const bc = " + arr_bc + ";\n"
    "    const out = r(a, bc);\n"
    "    expect(out?.length).toBe(3);\n"
    "  });\n"
    "\n"
    "  it('toRefine reducer replaces (does not concat)', () => {\n"
    "    const r = GraphState.channels.toRefine.reducer;\n"
    "    const a = " + arr_a + ";\n"
    "    const b = " + arr_b + ";\n"
    "    const out = r(a, b);\n"
    "    expect(out?.length).toBe(1);\n"
    "    expect(out?." + LB + "0" + RB + ".localId).toBe('b');\n"
    "  });\n"
    "\n"
    "  it('attempt reducer accepts explicit numbers', () => {\n"
    "    const r = GraphState.channels.attempt.reducer;\n"
    "    expect(r(2, 5)).toBe(5);\n"
    "    expect(r(2, undefined)).toBe(3);\n"
    "  });\n"
    "});"
)

new_src = src[:start_idx] + new_block + src[end_idx:]
TEST.write_text(new_src)
print("Wrote new reducer block. New file size:", len(new_src))

# Sanity check: read back and verify content.
back = TEST.read_text()
print("Back contains 'localId':", "localId" in back)
