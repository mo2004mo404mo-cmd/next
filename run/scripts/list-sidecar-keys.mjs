import { $ } from 'bun';
const JAR = '/tmp/medq-rewire.jar';
const B = 'http://127.0.0.1:3000';
const csrfToken = JSON.parse(await $`curl -s -c ${JAR} ${B}/api/auth/csrf`.text()).csrfToken;
await $`curl -s -b ${JAR} -c ${JAR} -X POST ${B}/api/auth/callback/credentials -H 'Content-Type: application/x-www-form-urlencoded' --data-urlencode csrfToken=${csrfToken} --data-urlencode email=admin@medq.com --data-urlencode password=test123 --data-urlencode callbackUrl=${B}/ -o /dev/null`.quiet();
const bridge = JSON.parse(await $`curl -s -b ${JAR} -X POST ${B}/api/freellmapi-bridge`.text());
const raw = await $`curl -s ${B}/freellmapi/api/keys -H ${'Authorization: Bearer ' + bridge.token}`.text();
const j = JSON.parse(raw);
const list = j.keys ?? j ?? [];
for (const k of (Array.isArray(list) ? list : [])) {
  console.log(`#${k.id} ${String(k.platform ?? k.type ?? 'custom')} | ${k.label ?? ''} | ${k.baseUrl ?? ''} | models:${(k.models ?? []).length}`);
}
const models = JSON.parse(await $`curl -s ${B}/freellmapi/api/models -H ${'Authorization: Bearer ' + bridge.token}`.text());
const data = models.models ?? models.data ?? [];
const zai = (Array.isArray(data) ? data : []).filter((m) => String(m.id ?? m.model ?? '').startsWith('zai'));
console.log(`zai models in catalog: ${zai.map((m) => m.id ?? m.model).join(', ')}`);
process.exit(0);
