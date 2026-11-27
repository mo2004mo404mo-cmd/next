/**
 * Next.js instrumentation hook — runs once when the server process boots
 * (dev and production, node runtime only).
 *
 * Starts the agent queue worker + scheduler tick eagerly so scheduled agent
 * jobs ("every Sunday 9pm, generate 20 MCQs on my weak topics") fire on time
 * without needing a first API call. Intervals are unref'd in the worker, so
 * this never holds the process open or interferes with builds.
 *
 * Edge-runtime note: Next.js compiles instrumentation for BOTH the nodejs
 * and edge runtimes. The actual startup code lives in
 * `./instrumentation-nodejs` and is dynamic-imported inside the nodejs
 * guard below (canonical Next.js pattern) so the edge bundle drops it and
 * never tries to resolve sharp/dotenv/prisma (node-only modules).
 */
export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('./instrumentation-nodejs').then((m) =>
      m.startNodejsServices()
    );
  }
}
