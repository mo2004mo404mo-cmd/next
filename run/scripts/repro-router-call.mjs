// Reproduce the generation-plane medq-router call and capture the exact error.
import { $ } from 'bun';

const B = 'http://127.0.0.1:3000';
const JAR = '/tmp/repro-router.cookies.txt';

await $`rm -f ${JAR}`.quiet();
const csrf = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrf} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
console.log('login:', JSON.parse(await $`curl -s -b ${JAR} ${B}/api/auth/session`.text())?.user?.email);

const body = JSON.stringify({
  userAnswer: 'A',
  correctAnswer: 'B',
  questionContext: {
    question: 'A 60-year-old man with crushing chest pain and ST elevation in leads II, III, aVF. What is the next best step?',
    options: { A: 'Aspirin', B: 'Immediate reperfusion' },
    system: 'Cardiology', topic: 'MI', difficulty: 'hard', type: 'mcq',
  },
});
console.log('\n--- medq-router call ---');
const out = await $`curl -s --max-time 90 -b ${JAR} -X POST ${B}/api/ai/clinical-reasoning -H 'Content-Type: application/json' -H 'x-model: medq-router:medgemma:latest' -d ${body}`.text();
console.log(out.slice(0, 600));
process.exit(0);
