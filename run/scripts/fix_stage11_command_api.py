"""Rewrite question-generation-graph.ts to use langgraph 1.5.3 API.

Langgraph 1.x removed addConditionalEdges. Conditional routing is now done
by nodes returning Command({ update, goto }) objects. Each conditional node
declares its possible destinations via addNode(name, fn, { ends: [...] }).

This rewrite:
  • Imports Command from @langchain/langgraph
  • Wraps generateBatch and verify deps in node functions that return Command
  • Removes addConditionalEdges, uses addEdge for static edges
  • Adds ends: [...] to generate_batch and verify nodes
"""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

# Replace the imports to include Command
old_import = "import {\n  StateGraph,\n  END,\n  START,\n  Annotation,\n  type CompiledStateGraph,\n} from '@langchain/langgraph';"
new_import = "import {\n  StateGraph,\n  END,\n  START,\n  Annotation,\n  Command,\n  type CompiledStateGraph,\n} from '@langchain/langgraph';"
src = src.replace(old_import, new_import)

# Replace the blueprint function
old_blueprint = """export function buildQuestionGenerationGraphBlueprint(deps: GraphDeps) {
  return new StateGraph(GraphState)
    .addNode('planner', deps.plan)
    .addNode('ground', deps.ground)
    .addNode('generate_batch', deps.generateBatch)
    .addNode('verify', deps.verify)
    .addNode('save', deps.save)
    .addNode('refine', deps.refine)
    .addEdge(START, 'planner')
    .addEdge('planner', 'ground')
    .addEdge('ground', 'generate_batch')
    .addConditionalEdges('generate_batch', routeAfterGenerate)
    .addConditionalEdges('verify', routeAfterVerify)
    .addEdge('refine', 'generate_batch')
    .addEdge('save', END);
}"""

new_blueprint = """/**
 * Wrap a deps.generateBatch in a node that returns a Command with the
 * routing decision baked in. langgraph 1.x removed addConditionalEdges;
 * nodes return Command({ update, goto }) to route conditionally.
 */
function makeGenerateBatchNode(deps: GraphDeps) {
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
}

export function buildQuestionGenerationGraphBlueprint(deps: GraphDeps) {
  return new StateGraph(GraphState)
    .addNode('planner', deps.plan)
    .addNode('ground', deps.ground)
    .addNode('generate_batch', makeGenerateBatchNode(deps), {
      ends: ['verify', 'generate_batch'],
    })
    .addNode('verify', makeVerifyNode(deps), {
      ends: ['save', 'refine'],
    })
    .addNode('save', deps.save)
    .addNode('refine', deps.refine)
    .addEdge(START, 'planner')
    .addEdge('planner', 'ground')
    .addEdge('ground', 'generate_batch')
    .addEdge('refine', 'generate_batch')
    .addEdge('save', END);
}"""

if old_blueprint in src:
    src = src.replace(old_blueprint, new_blueprint)
    print("[graph] replaced blueprint with Command-based routing")
else:
    print("[graph] WARNING: old blueprint anchor not found — file may have drifted")

GRAPH.write_text(src)
print("Wrote graph file")
