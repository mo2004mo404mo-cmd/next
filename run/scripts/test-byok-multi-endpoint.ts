/**
 * Live test for multi-endpoint BYOK (src/lib/server/byok.ts) against the
 * running postgres. Verifies: multiple endpoints per provider, round-robin
 * resolution, pinned-slot resolution (failover), enable/disable, reorder,
 * per-endpoint delete, and endpoint-pair (key+URL) integrity.
 *
 * Run: bun scripts/test-byok-multi-endpoint.ts
 */

import { db } from '../src/lib/db';
import {
  saveUserApiKey,
  listUserApiKeys,
  resolveUserApiKey,
  setEndpointEnabled,
  moveEndpoint,
  deleteUserApiKeyById,
  deleteUserApiKey,
  KEYLESS_PROVIDER_IDS,
} from '../src/lib/server/byok';

let pass = 0;
let fail = 0;
function ok(cond: boolean, label: string) {
  if (cond) {
    pass++;
    console.log(`  ✓ ${label}`);
  } else {
    fail++;
    console.error(`  ✗ ${label}`);
  }
}

async function main() {
  // Fresh test user + clean slate
  const testEmail = `byok-test-${Date.now()}@test.local`;
  const user = await db.user.create({
    data: { email: testEmail, name: 'BYOK Multi-Endpoint Test', password: 'x' },
  });
  const uid = user.id;

  try {
    console.log('1. Keyless multi-endpoint creation (the ollama case)');
    ok(KEYLESS_PROVIDER_IDS.has('ollama'), 'ollama is a keyless provider');
    const remote = await saveUserApiKey(uid, 'ollama', {
      apiKey: '',
      baseUrl: 'https://ollama2.space-z.ai',
      label: 'Remote gateway',
    });
    const local = await saveUserApiKey(uid, 'ollama', {
      apiKey: '',
      baseUrl: 'http://localhost:11434',
      label: 'Local server',
    });
    ok(!!remote.id && !!local.id && remote.id !== local.id, 'two endpoints get distinct row ids');

    let listed = await listUserApiKeys(uid);
    const ollamaRows = listed.filter((k) => k.providerId === 'ollama');
    ok(ollamaRows.length === 2, `listUserApiKeys shows 2 ollama endpoints (got ${ollamaRows.length})`);
    ok(ollamaRows[0].label === 'Remote gateway' && ollamaRows[1].label === 'Local server', 'endpoints ordered by priority');

    console.log('2. Round-robin resolution');
    const seen: string[] = [];
    for (let i = 0; i < 4; i++) {
      const r = await resolveUserApiKey(uid, 'ollama');
      ok(!!r, `resolution ${i + 1} succeeds`);
      if (r) seen.push(r.baseUrl ?? '');
    }
    ok(new Set(seen).size === 2, `consecutive calls alternate endpoints (${seen.join(' → ')})`);
    ok(seen[0] !== seen[1], 'round-robin actually rotates');

    console.log('3. Pinned-slot resolution (the failover path)');
    const pinned1 = await resolveUserApiKey(uid, 'ollama', { slot: 1 });
    ok(pinned1?.baseUrl === 'http://localhost:11434', 'slot 1 = the local endpoint');
    const pinned0 = await resolveUserApiKey(uid, 'ollama', { slot: 0 });
    ok(pinned0?.baseUrl === 'https://ollama2.space-z.ai', 'slot 0 = the remote endpoint');
    ok(pinned1?.endpointCount === 2, 'endpointCount reported for failover loops');

    console.log('4. Endpoint-pair integrity (key + URL travel together)');
    const withKey = await saveUserApiKey(uid, 'openai', {
      apiKey: 'sk-test-key-1234567890',
      baseUrl: 'https://corp-gateway.example.com/v1',
      label: 'Corp gateway',
    });
    const resolved = await resolveUserApiKey(uid, 'openai', { slot: 0 });
    ok(resolved?.apiKey === 'sk-test-key-1234567890', 'the endpoint\'s key is returned');
    ok(resolved?.baseUrl === 'https://corp-gateway.example.com/v1', 'the endpoint\'s baseUrl is returned with it');

    console.log('5. Reorder (priority)');
    await moveEndpoint(uid, local.id, 'up');
    listed = await listUserApiKeys(uid);
    const reordered = listed.filter((k) => k.providerId === 'ollama');
    ok(reordered[0].label === 'Local server', 'moveEndpoint(up) puts the local endpoint first');

    console.log('6. Disable an endpoint');
    await setEndpointEnabled(uid, remote.id, false);
    const onlyEnabled = await resolveUserApiKey(uid, 'ollama');
    ok(onlyEnabled?.baseUrl === 'http://localhost:11434', 'disabled endpoint is skipped by the resolver');
    // Re-enable for later checks
    await setEndpointEnabled(uid, remote.id, true);
    const back = await resolveUserApiKey(uid, 'ollama', { slot: 1 });
    ok(back?.baseUrl === 'https://ollama2.space-z.ai', 're-enabled endpoint is resolvable again');

    console.log('7. Per-endpoint delete');
    await deleteUserApiKeyById(uid, remote.id);
    listed = await listUserApiKeys(uid);
    ok(listed.filter((k) => k.providerId === 'ollama').length === 1, 'single endpoint deleted, sibling kept');

    console.log('8. Delete-all per provider');
    await deleteUserApiKey(uid, 'openai');
    listed = await listUserApiKeys(uid);
    ok(listed.filter((k) => k.providerId === 'openai').length === 0, 'provider-wide delete removes all its endpoints');
  } finally {
    await db.user.delete({ where: { id: uid } }).catch(() => {}); // cascades UserApiKey
  }

  console.log(`\n${pass} passed, ${fail} failed`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => {
  console.error('TEST CRASHED:', e);
  process.exit(1);
});
