"""Fix the zero-draft infinite-loop gap in makeGenerateBatchNode.

If a generate_batch pass produces ZERO drafts (LLM unavailable AND no
grounding passages — the offline fallback returns [] with empty grounding),
the routing looped generate_batch → generate_batch forever until the
recursion limit. Fix: when a pass produces nothing, terminate the loop —
route to verify (which routes to save with whatever exists) and record the
reason on the errors channel.
"""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

OLD = """function makeGenerateBatchNode(deps: GraphDeps) {
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
}"""

NEW = """function makeGenerateBatchNode(deps: GraphDeps) {
  return async (state: QuestionGenState) => {
    let patch = await deps.generateBatch(state);
    // The `generated` reducer CONCATENATES prev + next, so the post-patch
    // length is state.generated.length + patch.generated.length — NOT
    // patch.generated.length alone. Routing on the wrong value loops forever.
    const produced = patch.generated?.length ?? 0;
    const postLength = (state.generated?.length ?? 0) + produced;
    let next: 'verify' | 'generate_batch';
    if (postLength >= state.count) {
      next = 'verify';
    } else if (produced === 0) {
      // A pass produced NOTHING (LLM unavailable + no grounding passages,
      // or a hard failure). Looping again would spin to the recursion limit
      // with nothing changing — terminate: verify and save whatever exists,
      // with the reason recorded on the errors channel.
      next = 'verify';
      patch = {
        ...patch,
        errors: [
          ...(patch.errors ?? []),
          'generate_batch pass produced 0 drafts — terminating early (saving what exists)',
        ],
      };
    } else {
      next = 'generate_batch';
    }
    return new Command({ update: patch, goto: next });
  };
}"""

if "produced 0 drafts — terminating early" in src:
    print("[graph] zero-draft termination already present, skipping")
else:
    if OLD in src:
        GRAPH.write_text(src.replace(OLD, NEW, 1))
        print("[graph] fixed zero-draft termination")
    else:
        raise SystemExit("[graph] FATAL: makeGenerateBatchNode anchor not found")
