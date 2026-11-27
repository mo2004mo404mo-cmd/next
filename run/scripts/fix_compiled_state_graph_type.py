"""Fix the CompiledStateGraph type error.

langgraph 1.5.3's CompiledStateGraph requires 2-10 type arguments. The bare
type `CompiledStateGraph` (no args) was valid in older versions but now
errors. The cleanest fix is to use `ReturnType<typeof ...compile>` or just
`any` for the return type since the caller only needs `.invoke()`.

I'll use a type alias that infers from the compile call site, which keeps
type safety for the caller without needing to spell out all 10 generics.
"""
from pathlib import Path

GRAPH = Path("/tmp/my-project/src/lib/agent/question-generation-graph.ts")
src = GRAPH.read_text()

# Replace the import to drop CompiledStateGraph (no longer used directly)
OLD_IMPORT = """import {
  StateGraph,
  END,
  START,
  Annotation,
  Command,
  type CompiledStateGraph,
} from '@langchain/langgraph';"""
NEW_IMPORT = """import {
  StateGraph,
  END,
  START,
  Annotation,
  Command,
} from '@langchain/langgraph';"""

# Add a type alias using ReturnType inference
TYPE_ALIAS = """

// ─── Compiled graph type ──────────────────────────────────────────────────
//
// langgraph 1.5.3's `CompiledStateGraph` requires 2-10 type arguments. We
// avoid spelling them out by inferring the return type of `.compile()`.
// The caller only needs `.invoke()` and the result type, both of which are
// preserved by the inference.
type CompiledQuestionGenGraph = ReturnType<
  ReturnType<typeof buildQuestionGenerationGraphBlueprint>['compile']
>;
"""

# Find a good insertion point — after the GraphDeps interface definition
# but before buildQuestionGenerationGraphBlueprint
INSERTION_MARKER = "export const MAX_REFINE_ATTEMPTS = 2;"

# Replace the return type annotations
OLD_BUILD_RET = "): Promise<CompiledStateGraph> {"
NEW_BUILD_RET = "): Promise<CompiledQuestionGenGraph> {"

OLD_RUN_RET = "): Promise<QuestionGenState> {"
# This one is fine — QuestionGenState is our own type

if "CompiledQuestionGenGraph" in src:
    print("[graph] already fixed, skipping")
else:
    new_src = src
    if OLD_IMPORT in new_src:
        new_src = new_src.replace(OLD_IMPORT, NEW_IMPORT, 1)
        print("[graph] dropped CompiledStateGraph import")
    if INSERTION_MARKER in new_src:
        # Insert the type alias right after MAX_REFINE_ATTEMPTS line
        idx = new_src.find(INSERTION_MARKER) + len(INSERTION_MARKER)
        new_src = new_src[:idx] + "\n" + TYPE_ALIAS + new_src[idx:]
        print("[graph] added CompiledQuestionGenGraph type alias")
    if OLD_BUILD_RET in new_src:
        new_src = new_src.replace(OLD_BUILD_RET, NEW_BUILD_RET, 1)
        print("[graph] updated buildQuestionGenerationGraph return type")
    GRAPH.write_text(new_src)
