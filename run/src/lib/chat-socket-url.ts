/**
 * Shared chat-socket URL resolution.
 *
 * Where the chat socket service lives from THIS browser's point of view:
 * behind the preview gateway the relative "/?XTransformPort=3004" form is
 * routed to the service; on plain localhost (dev / e2e tests) the gateway
 * doesn't exist, so connect directly to the service on 127.0.0.1:3004
 * (its CORS is open). Same logic for the HTTP /emit endpoint.
 *
 * Previously this lived privately inside CallProvider; the messages page
 * hardcoded the gateway form, which meant its realtime socket could NEVER
 * connect when the app was opened on localhost (no gateway to transform the
 * port) — new messages then only arrived via refetch (open room / refresh),
 * exactly the "I have to leave the chat and come back" bug.
 */
export function chatSocketUrl(): string {
  if (typeof window === 'undefined') return '/?XTransformPort=3004';
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host.startsWith('127.');
  return isLocal ? 'http://127.0.0.1:3004/' : '/?XTransformPort=3004';
}

export function chatEmitUrl(): string {
  if (typeof window === 'undefined') return '/emit?XTransformPort=3004';
  const host = window.location.hostname;
  const isLocal = host === 'localhost' || host.startsWith('127.');
  return isLocal ? 'http://127.0.0.1:3004/emit' : '/emit?XTransformPort=3004';
}
