"""Rename the 'plan' node to 'planner' to avoid langgraph's name clash
with the 'plan' state field. Update both graph file and test file.
"""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
TEST = Path("/tmp/my-project/test/question-generation-graph.test.ts")

# Update graph file: rename 'plan' node references.
g_src = GRAPH.read_text()
# 1) addNode('plan', ...) -> addNode('planner', ...)
g_src_new = g_src.replace("addNode('plan', deps.plan)", "addNode('planner', deps.plan)")
# 2) addEdge(START, 'plan') -> addEdge(START, 'planner')
g_src_new = g_src_new.replace("addEdge(START, 'plan')", "addEdge(START, 'planner')")
# 3) addEdge('plan', 'ground') -> addEdge('planner', 'ground')
g_src_new = g_src_new.replace("addEdge('plan', 'ground')", "addEdge('planner', 'ground')")

# Update comments that say "plan →" to "planner →"
g_src_new = g_src_new.replace("plan → ground", "planner → ground")
g_src_new = g_src_new.replace("plan / ground / generate_batch", "planner / ground / generate_batch")

if g_src_new != g_src:
    GRAPH.write_text(g_src_new)
    print("[graph] renamed plan -> planner")
else:
    print("[graph] no changes")

# Update test file: rename any references to the 'plan' NODE (not the state field).
t_src = TEST.read_text()
t_src_new = t_src
# Just check that test references 'plan' as a node — actually the tests
# use deps.plan (function name, not node name) — that's fine.
# No changes needed to test file.
if t_src_new != t_src:
    TEST.write_text(t_src_new)
    print("[test] updated")
else:
    print("[test] no changes needed")
