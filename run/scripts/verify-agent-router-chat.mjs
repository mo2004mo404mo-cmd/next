// E2E: MedQ Agent chat (the real /api/agent/chat/v2 SSE pipeline) with a
// medq-router model — the "MedQ linked with FreeLLM" proof.
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/agent-router.cookies.txt';

await $`rm -f ${JAR}`.quiet();
const csrf = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrf} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
console.log('login:', JSON.parse(await $`curl -s -b ${JAR} ${B}/api/auth/session`.text())?.user?.email);

const body = JSON.stringify({
  message: 'hi',
  history: [],
  threadId: 'verify-router-link-1',
  model: 'medq-router:medgemma:latest',
});

console.log('\n--- agent chat via medq-router (SSE) ---');
const out = await $`curl -s -N --max-time 90 -b ${JAR} -X POST ${B}/api/agent/chat/v2 -H 'Accept: text/event-stream' -H 'Content-Type: application/json' -d ${body}`.text();
const lines = out.split('\n').filter(l => l.startsWith('data:'));
console.log(`SSE data events: ${lines.length}`);
const text = lines.map(l => {
  try { return JSON.parse(l.slice(5)); } catch { return null; }
}).filter(Boolean);
const tokens = text.filter(e => e.type === 'token' || e.text).map(e => e.text ?? '').join('');
console.log('REPLY TEXT:', tokens.slice(0, 300) || '(none)');
const meta = text.find(e => e.type === 'meta' || e.model);
console.log('META:', JSON.stringify(meta)?.slice(0, 200));
const errLine = out.split('\n').find(l => l.includes('"error"') || l.includes('ERROR'));
if (errLine) console.log('ERROR LINE:', errLine.slice(0, 300));
process.exit(0);
