import { PrismaClient } from '../src/generated/index.js';
const db = new PrismaClient();
const devices = await db.deviceFingerprint.findMany({
  orderBy: { lastSeenAt: 'desc' },
  take: 30,
  include: { user: { select: { email: true } } },
});
console.log(`=== ${devices.length} device fingerprint rows ===`);
for (const d of devices) {
  console.log(`\n[${d.id.slice(-8)}] user=${d.user?.email}`);
  console.log(`  os=${d.osGuess} browser=${d.browserGuess} platform=${d.platform}`);
  console.log(`  hash=${d.fingerprintHash.slice(0,24)}…`);
  console.log(`  screen=${d.screenSummary} tz=${d.timezone}`);
  console.log(`  UA=${d.userAgent.slice(0,140)}`);
  console.log(`  logins=${d.loginCount} trust=${d.trustScore} revoked=${d.revoked}`);
  console.log(`  firstSeen=${d.firstSeenAt?.toISOString()}  lastSeen=${d.lastSeenAt?.toISOString()}`);
  console.log(`  lastIp=${d.lastIp}  lastGeo=${d.lastGeo}`);
  if (d.label) console.log(`  label="${d.label}"`);
}

const events = await db.securityEvent.findMany({
  orderBy: { createdAt: 'desc' },
  take: 40,
  include: { user: { select: { email: true } } },
});
console.log(`\n\n=== ${events.length} recent security events ===`);
for (const e of events) {
  console.log(`[${e.createdAt.toISOString()}] [${e.severity}] ${e.eventType}  user=${e.user?.email}`);
  console.log(`  msg: ${e.message}`);
  if (e.ipAddress) console.log(`  ip=${e.ipAddress}  ua=${e.userAgent.slice(0,80)}`);
  if (e.fingerprintHash) console.log(`  fp=${e.fingerprintHash.slice(0,24)}…`);
}

const dupes = await db.$queryRaw`
  SELECT "userId", "osGuess", "browserGuess", COUNT(*)::int AS n, MAX("lastSeenAt") AS latest
  FROM "DeviceFingerprint"
  WHERE revoked = false
  GROUP BY "userId", "osGuess", "browserGuess"
  HAVING COUNT(*) > 1
  ORDER BY latest DESC
  LIMIT 10;
`;
console.log(`\n\n=== Same-device-class duplicates (multiple fingerprints for same user+os+browser) ===`);
console.log(JSON.stringify(dupes, null, 2));
await db.$disconnect();
