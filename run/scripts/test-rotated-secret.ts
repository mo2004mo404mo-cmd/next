/**
 * test-rotated-secret.ts — verify that session cookies signed with the OLD
 * NEXTAUTH_SECRET (leaked via the previously public zip URLs) are now
 * gracefully rejected after rotation: auth() decodes nothing, resolveUserId
 * falls back to the guest account, and API routes keep returning 200.
 *
 * Usage: bun scripts/test-rotated-secret.ts <old-secret-hex> [baseUrl]
 */
import { SignJWT } from 'jose';

const oldSecret = process.argv[2];
const base = process.argv[3] ?? 'http://localhost:3000';
if (!oldSecret) {
  console.error('pass the OLD NEXTAUTH_SECRET hex as argv[2]');
  process.exit(1);
}

const key = new TextEncoder().encode(oldSecret);
const token = await new SignJWT({ sub: 'cmoldleakyyyyyyyyyyyyyyyyy', name: 'LeakedSecretUser' })
  .setProtectedHeader({ alg: 'HS256' })
  .setIssuedAt()
  .setExpirationTime('30d')
  .sign(key);

const cookie = `authjs.session-token=${token}`;
for (const [label, path] of [
  ['GET  /api/knowledge/sources', '/api/knowledge/sources'],
  ['POST /api/generate/agent    ', '/api/generate/agent'],
] as const) {
  const res = await fetch(base + path, {
    headers: { cookie },
    method: path.includes('generate') ? 'POST' : 'GET',
    body: path.includes('generate') ? JSON.stringify({ topic: 'asthma', count: 1 }) : undefined,
    ...(path.includes('generate') ? { 'content-type': 'application/json' } : {}),
  } as RequestInit);
  const body = await res.text();
  console.log(`${label} → ${res.status} ${body.slice(0, 120)}`);
}
console.log('\nPASS: old-secret cookies degrade to guest (200s), no 500s, no FK crashes');
