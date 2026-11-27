#!/usr/bin/env python3
"""Surgical refactor of useAgentV2Stream.ts (sprint: re-attach recovery).

1. Removes the inline SSE switch inside send() (lines START_BLOCK..END_BLOCK
   inclusive) and replaces it with a consumeSSEStream call on the shared
   onTurnEvent handler.
2. Inserts the shared-handler + tryReattach block after the watchdog setup
   (still inside send(), before the outer try) so BOTH the post-stream
   recovery path AND the catch path can re-attach.
3. Rewires the "stream ended without terminal" block to try re-attach first.
4. Rewires the network-drop catch to try re-attach before thread polling.
5. Clears the persisted active-request key in finally + cancel().
6. Appends the reattach() callback (full replay, from=1) to the hook's return.

Run once; verify with git-style markers afterwards.
"""
import sys

PATH = '/home/z/my-project/src/components/medq/ai-agent/useAgentV2Stream.ts'

with open(PATH, encoding='utf-8') as f:
    lines = f.readlines()

def find_one(predicate, what):
    hits = [i for i, l in enumerate(lines) if predicate(l)]
    if len(hits) != 1:
        print(f'FAIL: expected exactly one match for {what}, found {len(hits)}: {hits}')
        sys.exit(1)
    return hits[0]

# ── Step 1: excise the inline switch block ────────────────────────────────
start_candidates = [i for i, l in enumerate(lines) if l.strip().startswith('// Track tool calls so we can correlate')]
if len(start_candidates) != 2:
    print(f'FAIL: expected two candidates (factory copy + inline copy), found {len(start_candidates)}')
    sys.exit(1)
start = start_candidates[1]  # the inline copy inside send()
# find end: the line '      );' that follows '        controller.signal,' right after the switch tail
end_candidates = [i for i, l in enumerate(lines) if l.rstrip() == '      );' and i > start and lines[i-1].rstrip() == '        controller.signal,']
if len(end_candidates) != 1:
    print(f'FAIL: expected one consumeSSEStream close, found {end_candidates}')
    sys.exit(1)
end = end_candidates[0]

replacement = [
    '      // Consume the POST stream with the shared turn handler. If the wire\n',
    '      // drops, the recovery paths below re-attach through GET /v2/events\n',
    '      // with the SAME handler (pairing maps preserved).\n',
    '      await consumeSSEStream(res.body, onTurnEvent, controller.signal);\n',
]
lines[start:end+1] = replacement
print(f'step1: removed lines {start+1}..{end+1}, inserted {len(replacement)} lines')

# ── Step 2: insert shared handler + tryReattach after the watchdog setup ──
sw = find_one(lambda l: 'const startWatchdog = () => {' in l, 'startWatchdog')
# its body is 2 lines: lastEventAt=...; if(...) watchdog=setInterval(...)
close = None
for i in range(sw, sw+6):
    if lines[i].rstrip() == '    };':
        close = i
        break
if close is None:
    print('FAIL: startWatchdog closing not found')
    sys.exit(1)

block = [
    '',
    '    // ── Shared turn event handler + live re-attach ──',
    '    // One handler instance per send() call: the POST stream, and any',
    '    // re-attached /events stream after a wire drop, all dispatch through',
    '    // it, so server tool_call ids stay paired with client chip ids across',
    '    // the resume. `eventsSeen` counts processed BUFFERED events (the',
    '    // server\'s ring-buffer position) — the re-attach resume cursor.',
    '    let eventsSeen = 0;',
    '    const handleTurnEvent = createTurnEventHandler({',
    '      applyAction,',
    '      toolCallCounterRef: toolCallCounter,',
    '      noteEvent: () => { eventsSeen += 1; },',
    '      onMeta: (requestId) => {',
    '        activeRequestIdRef.current = requestId;',
    '        persistActiveRequest(requestId);',
    '      },',
    '      onComplete: (text) => { options.onComplete?.(text, finalState); },',
    '      onError: (message) => { options.onError?.(message); },',
    '    });',
    '    const onTurnEvent = (event: string, data: unknown) => {',
    '      lastEventAt = Date.now();',
    '      handleTurnEvent(event, data);',
    '    };',
    '',
    '    /** Re-attach to the still-running server-side run (up to a few',
    '     *  attempts for flaky networks). Returns true when a terminal event',
    '     *  arrived through the resumed stream. 404 → the run is gone',
    '     *  (expired / server restarted): fall back to thread polling. */',
    '    const tryReattach = async (): Promise<boolean> => {',
    '      for (let attempt = 0; attempt < 3; attempt += 1) {',
    '        const requestId = activeRequestIdRef.current;',
    '        if (!requestId || controller.signal.aborted) return false;',
    '        try {',
    '          const rres = await fetch(`${endpoint}/events?requestId=${encodeURIComponent(requestId)}&from=${eventsSeen + 1}`, {',
    '            headers: { Accept: \'text/event-stream\' },',
    '            signal: controller.signal,',
    '          });',
    '          if (rres.status === 404) return false;',
    '          if (!rres.ok || !rres.body) {',
    '            await new Promise((r) => setTimeout(r, 800));',
    '            continue;',
    '          }',
    '          startWatchdog();',
    '          await consumeSSEStream(rres.body, onTurnEvent, controller.signal);',
    '          if (finalState.phase === \'done\' || finalState.phase === \'error\') return true;',
    '          // The resumed wire dropped again — loop and resume further.',
    '          await new Promise((r) => setTimeout(r, 600));',
    '        } catch {',
    '          if (controller.signal.aborted) return false;',
    '          await new Promise((r) => setTimeout(r, 800));',
    '        }',
    '      }',
    '      return finalState.phase === \'done\' || finalState.phase === \'error\';',
    '    };',
    '',
]
lines[close+1:close+1] = block
print(f'step2: inserted handler block after line {close+1}')

with open(PATH, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('OK: steps 1-2 written; steps 3-6 to be applied via Edit tool')
