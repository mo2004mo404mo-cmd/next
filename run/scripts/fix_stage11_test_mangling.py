#!/usr/bin/env python3
"""Fix mangled reducer tests in question-generation-graph.test.ts.

The patch_stage11 script's embedded test source had `[m` (start of an ANSI
escape sequence) eaten by the Write toolchain, turning `r([makeDraft('a')]`
into `r(akeDraft('a')]`. This script rewrites the three reducer tests using
explicit string concatenation so the brackets survive.
"""
from pathlib import Path

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")

OLD = """describe('GraphState reducers', () => {
  it('generated reducer concatenates across nodes', () => {
    const r = GraphState.channels.generated.reducer;
    const out = r(akeDraft('a')], akeDraft('b'), makeDraft('c')]);
    expect(out?.length).toBe(3);
  });

  it('toRefine reducer replaces (does not concat)', () => {
    const r = GraphState.channels.toRefine.reducer;
    const out = r(akeDraft('a')], akeDraft('b')]);
    expect(out?.length).toBe(1);
    expect(out?.[0].localId).toBe('b');
  });

  it('attempt reducer accepts explicit numbers', () => {
    const r = GraphState.channels.attempt.reducer;
    expect(r(2, 5)).toBe(5);
    expect(r(2, undefined)).toBe(3);
  });
});"""

# Build NEW using explicit string concat to dodge any escape eating.
LB = chr(91)   # [
RB = chr(93)   # ]
NEW = (
    "describe('GraphState reducers', () => {\n"
    "  it('generated reducer concatenates across nodes', () => {\n"
    "    const r = GraphState.channels.generated.reducer;\n"
    "    const a = " + LB + "makeDraft('a')" + RB + ";\n"
    "    const bc = " + LB + "makeDraft('b'), makeDraft('c')" + RB + ";\n"
    "    const out = r(a, bc);\n"
    "    expect(out?.length).toBe(3);\n"
    "  });\n"
    "\n"
    "  it('toRefine reducer replaces (does not concat)', () => {\n"
    "    const r = GraphState.channels.toRefine.reducer;\n"
    "    const a = " + LB + "makeDraft('a')" + RB + ";\n"
    "    const b = " + LB + "makeDraft('b')" + RB + ";\n"
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

src = TEST.read_text()
if OLD not in src:
    print("OLD anchor not found — file may already be fixed or further mangled.")
    # Try a regex-friendly fallback: scan for the mangled pattern.
    import re
    mangled = re.search(r"describe\('GraphState reducers'.*?\}\);\s*$", src, re.DOTALL)
    if mangled:
        src = src[:mangled.start()] + NEW + "\n"
        TEST.write_text(src)
        print("Replaced via regex fallback.")
    else:
        raise SystemExit("Could not locate reducer tests to replace.")
else:
    TEST.write_text(src.replace(OLD, NEW, 1))
    print("Replaced via exact anchor.")
