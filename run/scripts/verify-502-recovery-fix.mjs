// E2E verification of the agent chat v2 flow after the 502-recovery fix:
//   1. Login as admin
//   2. POST /api/agent/chat/v2 with a simple message -> verify SSE events
//      (meta/token/done + ping frames during silent stretches)
//   3. GET /api/agent/threads/:id/messages -> verify the recovery endpoint
//      returns the user + assistant messages
import { $ } from 'bun';

const JAR = '/tmp/medq-502fix.jar';
const B = 'http://127.0.0.1:3000';

const csrfToken = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
const session = await $`curl -s -b ${JAR} ${B}/api/auth/session`.text();
console.log('1. login:', session.includes('admin') ? 'OK' : 'FAIL ' + session.slice(0, 100));

// Simple turn (no tools needed — keeps it fast)
const out = await $`curl -s -N --max-time 90 -b ${JAR} -X POST ${B}/api/agent/chat/v2 -H 'Content-Type: application/json' -H 'Accept: text/event-stream' -D /tmp/medq-502fix-headers.txt --data '{"message":"Reply with exactly the word: pong","history":[],"currentTab":"dashboard"}'`.text();

const events = [...out.matchAll(/event: ([a-z.]+)\n/g)].map(m => m[1]);
const threadId = (await Bun.file('/tmp/medq-502fix-headers.txt').text()).match(/x-thread-id:\s*(\S+)/i)?.[1];
const doneText = out.match(/event: done\ndata: (.*)/)?.[1] ?? '';
console.log('2. SSE events:', JSON.stringify([...new Set(events)]));
console.log('   threadId:', threadId ?? '(none)');
console.log('   done payload:', doneText.slice(0, 160));
const hasText = /pong/i.test(out);
console.log('   answer contains pong:', hasText ? 'OK' : 'WARN (model may have phrased differently)');

// Recovery endpoint
if (threadId) {
  const msgs = JSON.parse(await $`curl -s -b ${JAR} ${B}/api/agent/threads/${threadId}/messages`.text());
  const roles = (msgs.messages ?? []).map(m => m.role);
  console.log('3. GET messages:', JSON.stringify(roles), '| has createdAt:', (msgs.messages ?? []).every(m => !!m.createdAt));
}
process.exit(0);
