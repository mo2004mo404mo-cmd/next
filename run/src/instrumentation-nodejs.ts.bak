/**
 * Node.js-only instrumentation entry.
 *
 * Kept in a dedicated file so the edge-runtime instrumentation compile never
 * pulls the agent worker's module graph (sharp / dotenv / prisma are
 * node-only). `src/instrumentation.ts` dynamic-imports this module inside
 * its `NEXT_RUNTIME === 'nodejs'` guard — the canonical Next.js pattern for
 * runtime-specific instrumentation code — so the bundler can drop it from
 * the edge bundle entirely.
 *
 * #MEDQ-embedded: this is also where the freellmapi AI Router is booted
 * IN-PROCESS (startEmbeddedFreellmapi). One Next.js process on port 3000
 * serves the whole app — dashboard, API routes and the embedded Express
 * sidecar behind /freellm, /freellmapi and /v1. There is deliberately no
 * separate freellmapi process or port to start.
 */

import { ensureWorkerStarted } from './lib/agent/queue/worker';

export async function startNodejsServices(): Promise<void> {
  // Memory-pressure kill switch: set MEDQ_MINIMAL_BOOT=1 to skip both the
  // agent worker AND the embedded FreeLLM API sidecar during boot. The Next.js
  // server itself stays up — AI Router surfaces and scheduled agent jobs are
  // degraded, but the question bank, exam simulator, voice mode, and all other
  // MedQ features keep working. Useful on small sandboxes where the in-process
  // sidecar + worker push resident memory past the cgroup limit and SIGBUS.
  if (process.env.MEDQ_MINIMAL_BOOT === '1') {
    console.warn('[instrumentation] MEDQ_MINIMAL_BOOT=1 \u2014 skipping agent worker + FreeLLM API sidecar');
    return;
  }

  try {
    ensureWorkerStarted();
  } catch (error) {
    // Never break server boot on a worker failure — scheduled jobs are a
    // background convenience, not a startup dependency.
    console.warn('[instrumentation] agent worker failed to start:', error);
  }

  // #MEDQ-embedded: boot the AI Router sidecar inside this process. A failure
  // here degrades only the AI Router surfaces (they 502 with a pointer to the
  // logs); the rest of MedQ must keep serving.
  try {
    const { startEmbeddedFreellmapi } = await import('./lib/freellmapi-embedded');
    await startEmbeddedFreellmapi();
  } catch (error) {
    console.warn('[instrumentation] embedded FreeLLM API (AI Router) failed to start:', error);
  }
}
