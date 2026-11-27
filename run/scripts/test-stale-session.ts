/**
 * E2E test: stale-session fallback in resolveUserId().
 *
 * Forges an Auth.js v5 session JWT for a user id that does NOT exist in the
 * DB (simulating a cookie carried over from the previous environment /
 * re-seeded database), then hits an endpoint that CREATES an FK-constrained
 * row. Before the fix this 500s (P2003 Subscription_userId_fkey); after the
 * fix it must fall back to the guest account and succeed.
 */
import { SignJWT } from 'jose';
import fs from 'fs';

const BASE = 'http://localhost:3000';

function getSecret(): string {
  const env = fs.readFileSync('.env', 'utf8');
  const m = env.match(/^NEXTAUTH_SECRET=(.+)$/m);
  if (!m) throw new Error('NEXTAUTH_SECRET not found in .env');
  return m[1].trim();
}

const STALE_USER_ID = 'cstale999999999999999999'; // guaranteed nonexistent

async function main() {
  const secret = new TextEncoder().encode(getSecret());
  const exp = Math.floor(Date.now() / 1000) + 60 * 60; // 1h
  const token = await new SignJWT({
    name: 'Stale User',
    email: 'stale@old-environment.local',
    role: 'student',
    id: STALE_USER_ID,
  })
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setSubject(STALE_USER_ID)
    .setIssuedAt()
    .setExpirationTime(exp)
    .sign(secret);

  console.log('forged stale JWT (sub=' + STALE_USER_ID + '), cookie authjs.session-token');

  // 1) FK-constrained CREATE via upload route
  const form = new FormData();
  const content = 'Stale-session fallback E2E test: heparin is the first-line anticoagulant for pulmonary embolism.';
  form.append('file', new Blob([content], { type: 'text/plain' }), 'stale-session-test.txt');

  const res = await fetch(`${BASE}/api/knowledge/upload`, {
    method: 'POST',
    headers: { cookie: `authjs.session-token=${token}` },
    body: form,
  });
  const json = await res.json().catch(() => ({}));
  console.log('upload with stale cookie →', res.status, JSON.stringify(json).slice(0, 160));
  if (res.status !== 200) throw new Error('FAIL: expected 200 with guest fallback');

  // cleanup the test source
  if (json.sourceId) {
    const del = await fetch(`${BASE}/api/knowledge/sources/${json.sourceId}`, {
      method: 'DELETE',
      headers: { cookie: `authjs.session-token=${token}` },
    });
    console.log('cleanup delete (stale cookie) →', del.status);
  }

  // 2) Read path also routes to guest (returns the guest's sources, 200)
  const list = await fetch(`${BASE}/api/knowledge/sources`, {
    headers: { cookie: `authjs.session-token=${token}` },
  });
  const listJson = await list.json().catch(() => ({}));
  console.log('sources list with stale cookie →', list.status, 'count:', (listJson.sources || []).length);

  console.log('\nPASS: stale sessions fall back to guest — no more FK 500s');
}

main().catch((e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
