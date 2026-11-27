/**
 * Emit job progress updates to the socket.io service.
 * Called by API routes after updateJob() to push real-time updates to the browser.
 * This is fire-and-forget — errors are logged but don't affect the job.
 */

import type { GenerationJob } from '@/lib/job-store';

const SOCKET_SERVICE_URL = (process.env.SOCKET_PROGRESS_URL || '').replace(/\/$/, '');

/**
 * Emit a job update event to the socket service.
 * The socket service will broadcast to connected clients.
 */
export function emitJobUpdate(job: GenerationJob): void {
  if (!SOCKET_SERVICE_URL) return;

  // Fire-and-forget POST to socket service
  const event = job.status === 'completed' ? 'job:completed'
    : job.status === 'failed' ? 'job:failed'
    : 'job:progress';

  fetch(`${SOCKET_SERVICE_URL}/emit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event, data: job }),
  }).catch(err => {
    // Log but don't throw — socket notification is best-effort
    console.warn('[socket-emit] Failed to emit job update:', err);
  });
}
