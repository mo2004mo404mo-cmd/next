#!/usr/bin/env python3
"""Restructure MedQAgentV3.tsx: wrap the orphaned turn-finalization body
into a `finalizeTurn` callback defined before sendMessage."""
PATH = '/home/z/my-project/src/components/medq/ai-agent/MedQAgentV3.tsx'

with open(PATH, encoding='utf-8') as f:
    text = f.read()

# 1. Remove the orphaned block: from the line after sendMessage's closing
#    deps line through the stale trailing `);`.
orphan_start = text.index('        // Execute the emitted UI actions FIRST, collecting receipt labels and')
orphan_end_marker = """            content: `\\u26a0\\ufe0f ${result.error}`,
            timestamp: Date.now(),
          },
        ]);
      }
    },
    [agent, messages, currentTab, getContextSummary, fileAttachments, clearAttachments, executeAction, onAction, llmModel, uiState.currentPage, threadId],
  );
"""
# find the actual end: the orphan's trailing stale deps array (sendMessage's
# copy was already updated to reference finalizeTurn, so only ONE remains).
stale_deps = "[agent, messages, currentTab, getContextSummary, fileAttachments, clearAttachments, executeAction, onAction, llmModel, uiState.currentPage, threadId],\n  );"
hits = [i for i in range(len(text)) if text.startswith(stale_deps, i)]
if len(hits) != 1:
    print(f'FAIL: expected exactly 1 stale deps array, found {len(hits)}')
    raise SystemExit(1)
second = hits[0]
orphan = text[orphan_start:second + len(stale_deps)]

# 2. Build finalizeTurn from the orphan body (reindent: 8 -> 6 spaces base).
# The orphan body references `result` — keep the param name.
body = orphan
# strip the trailing stale deps + closing
body = body[:body.rindex('    },\n' + ' ' * 4 + '[')]
# normalize indentation: body lines currently have 8-space base inside sendMessage's callback
lines = body.rstrip().split('\n')
finalized = []
for l in lines:
    finalized.append(l)
body_text = '\n'.join(finalized)

finalize_turn = """  /** Convert a finished agent turn (send() return value or reattach()
   * result) into local chat state: execute emitted UI actions, append the
   * assistant message with its tool/plan snapshot, and surface honest
   * cancelled / error notices. Shared by sendMessage and the post-refresh
   * live re-attach path so a resumed turn finalizes identically. */
  const finalizeTurn = useCallback(
    (result: AgentV2State) => {
""" + body_text + """
    },
    [executeAction, onAction, uiState.currentPage],
  );

"""

# 3. Remove the orphan block from its current position.
text = text[:orphan_start] + text[second + len(stale_deps):]

# 4. Insert finalizeTurn before sendMessage.
anchor = '  const sendMessage = useCallback('
idx = text.index(anchor)
text = text[:idx] + finalize_turn + text[idx:]

with open(PATH, 'w', encoding='utf-8') as f:
    f.write(text)
print('OK: finalizeTurn extracted and inserted before sendMessage')
