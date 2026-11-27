"""Replace the 3 reducer tests to use the correct langgraph 1.5.3 API:
State.spec.<field>.operator (not State.channels.<field>.reducer).
"""
from pathlib import Path

TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")
src = TEST.read_text()

# Find the reducer describe block and replace it.
START = "describe('GraphState reducers'"
start_idx = src.find(START)
if start_idx == -1:
    raise SystemExit("Could not find reducer block")

# Find end — last }); after start, before EOF (this is the last block).
end_idx = src.rfind("});", start_idx)
end_idx += len("});")

old_block = src[start_idx:end_idx]

# Build the new block. We avoid the LB/RB sequence in source by using chr().
LB = chr(91)
RB = chr(93)
arr_a = LB + "{ localId: 'a' }" + RB
arr_b = LB + "{ localId: 'b' }" + RB
arr_bc = LB + "{ localId: 'b' }, { localId: 'c' }" + RB

new_block = (
    "describe('GraphState reducers', () => {\n"
    "  it('generated reducer concatenates across nodes', () => {\n"
    "    const r = GraphState.spec.generated.operator;\n"
    "    const a = " + arr_a + ";\n"
    "    const bc = " + arr_bc + ";\n"
    "    const out = r(a, bc);\n"
    "    expect(out?.length).toBe(3);\n"
    "  });\n"
    "\n"
    "  it('toRefine reducer replaces (does not concat)', () => {\n"
    "    const r = GraphState.spec.toRefine.operator;\n"
    "    const a = " + arr_a + ";\n"
    "    const b = " + arr_b + ";\n"
    "    const out = r(a, b);\n"
    "    expect(out?.length).toBe(1);\n"
    "    expect(out?." + LB + "0" + RB + ".localId).toBe('b');\n"
    "  });\n"
    "\n"
    "  it('attempt reducer accepts explicit numbers', () => {\n"
    "    const r = GraphState.spec.attempt.operator;\n"
    "    expect(r(2, 5)).toBe(5);\n"
    "    expect(r(2, undefined)).toBe(3);\n"
    "  });\n"
    "});"
)

new_src = src[:start_idx] + new_block + src[end_idx:]
TEST.write_text(new_src)
print("Replaced reducer block. New file size:", len(new_src))
