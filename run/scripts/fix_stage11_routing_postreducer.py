"""Fix routing to use the post-reducer state, not the patch-overlaid state.

The previous code did `const merged = {...state, ...patch}` then routed on
`merged.generated.length`. But the `generated` reducer CONCATENATES — so
the patch's `generated: [x]` doesn't reflect the accumulated state. Routing
on `merged.generated.length === 1` instead of `state.generated.length + 1`
caused the loop.

Fix: compute the post-reducer length manually for routing decisions."""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

OLD_NODES = """function makeGenerateBatchNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    const patch = await deps.generateBatch(state);
    // Merge patch into a view of state for the routing decision. We do NOT
    // mutate state here — the reducer applies `patch` to the real state.
    const merged: QuestionGenState = { ...state, ...patch } as QuestionGenState;
    const next = routeAfterGenerate(merged);
    return new Command({ update: patch, goto: next });
  };
}

function makeVerifyNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    const patch = await deps.verify(state);
    const merged: QuestionGenState = { ...state, ...patch } as QuestionGenState;
    const next = routeAfterVerify(merged);
    return new Command({ update: patch, goto: next });
  };
}"""

NEW_NODES = """function makeGenerateBatchNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    const patch = await deps.generateBatch(state);
    // The `generated` reducer CONCATENATES prev + next, so the post-patch
    // length is state.generated.length + patch.generated.length — NOT
    // patch.generated.length alone. Routing on the wrong value loops forever.
    const postLength = (state.generated?.length ?? 0) + (patch.generated?.length ?? 0);
    const next: 'verify' | 'generate_batch' =
      postLength >= state.count ? 'verify' : 'generate_batch';
    return new Command({ update: patch, goto: next });
  };
}

function makeVerifyNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    const patch = await deps.verify(state);
    // `toRefine` reducer REPLACES (not concat), so patch.toRefine IS the
    // post-patch value. `attempt` reducer accepts explicit numbers, so
    // patch.attempt (if a number) IS the post-patch value.
    const postToRefineLength = patch.toRefine?.length ?? state.toRefine?.length ?? 0;
    const postAttempt =
      typeof patch.attempt === 'number' ? patch.attempt : (state.attempt ?? 0) + 1;
    let next: 'save' | 'refine';
    if (postToRefineLength === 0) next = 'save';
    else if (postAttempt >= MAX_REFINE_ATTEMPTS) next = 'save';
    else next = 'refine';
    return new Command({ update: patch, goto: next });
  };
}"""

if OLD_NODES in src:
    src = src.replace(OLD_NODES, NEW_NODES)
    GRAPH.write_text(src)
    print("[graph] fixed routing to use post-reducer state")
else:
    print("[graph] WARNING: OLD_NODES anchor not found")
