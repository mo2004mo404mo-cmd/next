import { $ } from 'bun';
const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/agent-test.jar';
const csrfToken = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
const raw = await $`curl -s -b ${JAR} --max-time 150 -N -X POST ${B}/api/agent/chat/v2 -H 'Content-Type: application/json' -d '{"message":"In one sentence: what is the normal serum potassium range?","context":""}'`.text();
// SSE events: data: {"type":"status","model":...} / {"type":"token","text":...}
const events = raw.split('\n').filter((l) => l.startsWith('data:'));
let model = '', text = '';
for (const e of events.slice(0, 400)) {
  try {
    const j = JSON.parse(e.slice(5));
    if (j.type === 'status' && j.model) model = j.model;
    if (j.type === 'token' && j.text) text += j.text;
    if (j.type === 'error') text += ' [ERROR] ' + (j.error ?? '');
  } catch {}
}
console.log('model :', model);
console.log('reply :', text.slice(0, 260).replace(/\s+/g, ' '));
console.log('events:', events.length);
process.exit(0);
