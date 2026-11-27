/* Smoke test: presence:update broadcast on join + identify + disconnect. */
import { io } from 'socket.io-client';

const URL = 'http://127.0.0.1:3004/';
const ROOM = 'presence-test-room';

const results = [];
const check = (name, ok) => { results.push(`${ok ? 'PASS' : 'FAIL'} ${name}`); console.log(results[results.length - 1]); };

// Two clients simulating two members.
const a = io(URL, { transports: ['websocket', 'polling'] });
const b = io(URL, { transports: ['websocket', 'polling'] });

let aPresence = null, bPresence = null;
a.on('presence:update', (d) => { aPresence = d; });
b.on('presence:update', (d) => { bPresence = d; });

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

await new Promise((r) => a.on('connect', r));
await new Promise((r) => b.on('connect', r));

// 1. A joins (unidentified) then identifies — join-before-identify ordering.
a.emit('join:room', ROOM);
a.emit('identify', 'user-A');
await wait(300);
check('A identify rebroadcast presence to room (self sees)', aPresence?.roomId === ROOM && aPresence.onlineUserIds.includes('user-A'));

// 2. B joins + identifies → both see [A, B].
b.emit('join:room', ROOM);
b.emit('identify', 'user-B');
await wait(300);
check('B join broadcasts [A,B] to A', aPresence?.onlineUserIds?.includes('user-B') && aPresence.onlineUserIds.includes('user-A'));
check('B join broadcasts [A,B] to B', bPresence?.onlineUserIds?.length === 2);

// 3. B disconnects → A sees only [A].
b.disconnect();
await wait(300);
check('B disconnect updates A presence to [A]', aPresence?.onlineUserIds?.length === 1 && aPresence.onlineUserIds[0] === 'user-A');

// 4. new:message still delivered to room members.
let gotMsg = false;
a.on('new:message', (m) => { if (m === 'hello-presence') gotMsg = true; });
const res = await fetch('http://127.0.0.1:3004/emit', {
  method: 'POST', headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ event: 'new:message', room: ROOM, data: 'hello-presence' }),
});
await wait(300);
check('new:message delivered via /emit', res.ok && gotMsg);

a.disconnect();
await wait(200);
const fails = results.filter((r) => r.startsWith('FAIL'));
console.log(`\n${results.length - fails.length}/${results.length} passed`);
process.exit(fails.length ? 1 : 0);
