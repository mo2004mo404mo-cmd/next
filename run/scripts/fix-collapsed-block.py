#!/usr/bin/env python3
"""Fix the collapsed single-line insertion from refactor-agent-stream.py.

The block was written without newlines. Re-split it at the known boundaries
(using the '    ' indentation + sentinel markers) and re-write properly.
"""
PATH = '/home/z/my-project/src/components/medq/ai-agent/useAgentV2Stream.ts'

with open(PATH, encoding='utf-8') as f:
    lines = f.readlines()

# Locate the malformed line (starts with the shared-handler comment)
bad_idx = None
for i, l in enumerate(lines):
    if l.lstrip().startswith('// ── Shared turn event handler + live re-attach ──') and 'let eventsSeen' in l:
        bad_idx = i
        break
if bad_idx is None:
    # maybe already fixed
    for i, l in enumerate(lines):
        if 'const tryReattach' in l and 'Shared turn event handler' in l:
            bad_idx = i
            break
if bad_idx is None:
    print('FAIL: malformed line not found (maybe already fixed?)')
    raise SystemExit(1)

bad = lines[bad_idx].rstrip('\n')
indent = '    '

# The collapsed content, in order, with explicit newlines:
fixed = """    // ── Shared turn event handler + live re-attach ──
    // One handler instance per send() call: the POST stream, and any
    // re-attached /events stream after a wire drop, all dispatch through
    // it, so server tool_call ids stay paired with client chip ids across
    // the resume. `eventsSeen` counts processed BUFFERED events (the
    // server's ring-buffer position) — the re-attach resume cursor.
    let eventsSeen = 0;
    const handleTurnEvent = createTurnEventHandler({
      applyAction,
      toolCallCounterRef: toolCallCounter,
      noteEvent: () => { eventsSeen += 1; },
      onMeta: (requestId) => {
        activeRequestIdRef.current = requestId;
        persistActiveRequest(requestId);
      },
      onComplete: (text) => { options.onComplete?.(text, finalState); },
      onError: (message) => { options.onError?.(message); },
    });
    const onTurnEvent = (event: string, data: unknown) => {
      lastEventAt = Date.now();
      handleTurnEvent(event, data);
    };

    /** Re-attach to the still-running server-side run (up to a few
     *  attempts for flaky networks). Returns true when a terminal event
     *  arrived through the resumed stream. 404 → the run is gone
     *  (expired / server restarted): fall back to thread polling. */
    const tryReattach = async (): Promise<boolean> => {
      for (let attempt = 0; attempt < 3; attempt += 1) {
        const requestId = activeRequestIdRef.current;
        if (!requestId || controller.signal.aborted) return false;
        try {
          const rres = await fetch(`${endpoint}/events?requestId=${encodeURIComponent(requestId)}&from=${eventsSeen + 1}`, {
            headers: { Accept: 'text/event-stream' },
            signal: controller.signal,
          });
          if (rres.status === 404) return false;
          if (!rres.ok || !rres.body) {
            await new Promise((r) => setTimeout(r, 800));
            continue;
          }
          startWatchdog();
          await consumeSSEStream(rres.body, onTurnEvent, controller.signal);
          if (finalState.phase === 'done' || finalState.phase === 'error') return true;
          // The resumed wire dropped again — loop and resume further.
          await new Promise((r) => setTimeout(r, 600));
        } catch {
          if (controller.signal.aborted) return false;
          await new Promise((r) => setTimeout(r, 800));
        }
      }
      return finalState.phase === 'done' || finalState.phase === 'error';
    };
"""

lines[bad_idx:bad_idx+1] = [fixed]
with open(PATH, 'w', encoding='utf-8') as f:
    f.writelines(lines)
print('OK: re-split the collapsed block')
