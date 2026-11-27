import { $ } from 'bun';
const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/agent-test2.jar';
const csrfToken = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
const raw = await $`curl -s -b ${JAR} --max-time 150 -N -X POST ${B}/api/agent/chat/v2 -H 'Content-Type: application/json' -d '{"message":"In one sentence: what is the normal serum potassium range?","context":""}'`.text();
console.log(raw.slice(0, 2000));
process.exit(0);
