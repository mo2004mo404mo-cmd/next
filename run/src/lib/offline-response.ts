'use client';

/**
 * Helpers for gracefully handling offline 503 responses from the SW.
 *
 * The SW (public/sw.js) returns:
 *   { status: 503, body: { error: string, offline: true } }
 * for any API GET that fails because the network is down AND no cached
 * response is available.
 *
 * Without these helpers, tab components show misleading errors like:
 *   - "Failed to load questions" (BankTab)
 *   - "Failed to fetch dashboard data" (DashboardTab)
 *   - "Fetch rooms error" (ChatTab)
 * …even though the actual cause is just "you're offline, no cache".
 *
 * Usage:
 *   const res = await fetch('/api/questions?...');
 *   if (!res.ok) {
 *     if (isOfflineResponse(res)) {
 *       // Show "You're offline — showing cached data when available" empty state
 *     } else {
 *       // Show generic "Failed to load" error
 *     }
 *   }
 */

/**
 * Returns true if the Response is a 503 from the SW's offline fallback.
 * The SW stamps these responses with `{ offline: true }` in the JSON body.
 *
 * Note: this only works AFTER `await res.json()` has been called, OR by
 * checking the status code alone (less precise but doesn't require parsing).
 */
export function isOfflineStatus(res: Response): boolean {
  return res.status === 503;
}

/**
 * Returns true if the parsed JSON body has `offline: true` — the marker
 * the SW adds to its offline fallback responses.
 *
 * Use this when you've already parsed the response body:
 *   const data = await res.json().catch(() => null);
 *   if (isOfflineBody(data)) { ... }
 */
export function isOfflineBody(data: unknown): boolean {
  return !!data && typeof data === 'object' && (data as any).offline === true;
}

/**
 * Combined check: status 503 OR body.offline === true.
 *
 * Example:
 *   const res = await fetch('/api/dashboard');
 *   if (!res.ok) {
 *     const data = await res.json().catch(() => null);
 *     if (isOfflineError(res, data)) {
 *       setOfflineEmptyState(true);  // show "You're offline" UI
 *     } else {
 *       setError('Failed to load');  // show generic error
 *     }
 *     return;
 *   }
 */
export function isOfflineError(res: Response, data: unknown): boolean {
  return isOfflineStatus(res) || isOfflineBody(data);
}

/**
 * Convenience: returns true if the browser is currently offline.
 * Use this to preemptively skip fetches that will obviously fail.
 */
export function browserIsOffline(): boolean {
  return typeof navigator !== 'undefined' && !navigator.onLine;
}
