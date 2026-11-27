/**
 * Abort-chain verification for the question-generation deep agent.
 *
 * Scenario 1 — already-aborted signal: the pipeline must refuse to start
 * (checkpoint #0) instead of hammering the LLM gateway for a dead client.
 *
 * Scenario 2 — abort mid-run: simulate a client disconnecting partway
 * through by aborting a controller after the first events arrive; the
 * pipeline must stop at its next checkpoint (checkpoint #1) with the
 * "Cancelled" error instead of running to the 12-minute deadline.
 */
import { runDeepAgentQuestionGeneration } from '../src/lib/agent/question-deep-agent';

async function main() {
  // ── Scenario 1: pre-aborted signal ──
  const controller1 = new AbortController();
  controller1.abort();
  const t1 = Date.now();
  const events1: string[] = [];
  for await (const event of runDeepAgentQuestionGeneration({
    topic: 'short stature',
    system: 'Endocrine',
    types: ['mcq'],
    difficulties: ['Medium'],
    count: 3,
    signal: controller1.signal,
  })) {
    events1.push(event.type);
  }
  const elapsed1 = Date.now() - t1;
  console.log(`[scenario 1] pre-aborted: ${events1.join(',')} in ${elapsed1}ms`);
  const ok1 = events1.includes('error') && elapsed1 < 5_000 && !events1.includes('saved');
  console.log(ok1 ? '[scenario 1] PASS — refused to start for an aborted client' : '[scenario 1] FAIL');

  // ── Scenario 2: abort mid-run ──
  const controller2 = new AbortController();
  const t2 = Date.now();
  const events2: string[] = [];
  let sawActivity = false;
  for await (const event of runDeepAgentQuestionGeneration({
    topic: 'short stature',
    system: 'Endocrine',
    types: ['mcq'],
    difficulties: ['Medium'],
    count: 3,
    signal: controller2.signal,
  })) {
    events2.push(event.type);
    // Abort as soon as the run shows any life (status/plan/tool events);
    // from here the pipeline should hit checkpoint #1 and stop quickly.
    if (!sawActivity && ['status', 'plan', 'tool_start', 'subagent'].includes(event.type)) {
      sawActivity = true;
      controller2.abort();
    }
  }
  const elapsed2 = Date.now() - t2;
  const hasCancel = events2.some((t, i) => t === 'error');
  console.log(`[scenario 2] mid-run abort: ${events2.join(',')} in ${elapsed2}ms`);
  // A cooperative cancel beats the full run easily; give it a generous bound
  // (one in-flight LLM call can still take a while, but not minutes).
  const ok2 = hasCancel && elapsed2 < 90_000;
  console.log(ok2 ? '[scenario 2] PASS — run stopped after abort instead of grinding on' : '[scenario 2] FAIL');

  process.exit(ok1 && ok2 ? 0 : 1);
}

main().catch((err) => {
  console.error('test crashed:', err);
  process.exit(1);
});
