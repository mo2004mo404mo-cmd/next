const { Client } = require('/home/z/my-project/upload/medq-app/node_modules/pg');
const db = new Client({ connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' });
(async () => {
  await db.connect();
  const r = await db.query(`SELECT "userId", "osGuess", "browserGuess", "userAgent", "screenSummary", "timezone", COUNT(*)::int AS n, MAX("lastSeenAt") AS latest FROM "DeviceFingerprint" WHERE revoked = false GROUP BY "userId", "osGuess", "browserGuess", "userAgent", "screenSummary", "timezone" ORDER BY latest DESC LIMIT 30`);
  console.log(`=== ${r.rows.length} distinct (user, os, browser, UA, screen, tz) combos ===`);
  for (const row of r.rows) {
    console.log(`\nuser=${row.userId.slice(-8)} os=${row.osGuess} browser=${row.browserGuess}`);
    console.log(`  screen=${row.screenSummary}  tz=${row.timezone}`);
    console.log(`  UA=${row.userAgent.slice(0,140)}`);
    console.log(`  n_fingerprints=${row.n}  lastSeen=${row.latest.toISOString()}`);
  }
  
  const fp = await db.query(`SELECT id, "userId", "fingerprintHash", "osGuess", "browserGuess", "userAgent", "screenSummary", "timezone", "loginCount", "trustScore", "revoked", "firstSeenAt", "lastSeenAt", "lastIp", "lastGeo" FROM "DeviceFingerprint" ORDER BY "lastSeenAt" DESC LIMIT 30`);
  console.log(`\n\n=== ${fp.rows.length} device fingerprint rows (most recent first) ===`);
  for (const d of fp.rows) {
    console.log(`\n[${d.id.slice(-8)}] user=${d.userId.slice(-8)}  os=${d.osGuess} browser=${d.browserGuess}`);
    console.log(`  hash=${d.fingerprintHash.slice(0,24)}…`);
    console.log(`  screen=${d.screenSummary}  tz=${d.timezone}`);
    console.log(`  UA=${d.userAgent.slice(0,140)}`);
    console.log(`  logins=${d.loginCount} trust=${d.trustScore} revoked=${d.revoked}`);
    console.log(`  firstSeen=${d.firstSeenAt.toISOString()}  lastSeen=${d.lastSeenAt.toISOString()}`);
    console.log(`  lastIp=${d.lastIp}  lastGeo=${d.lastGeo}`);
  }
  
  const ev = await db.query(`SELECT "createdAt", "severity", "eventType", "userId", "message", "ipAddress", "userAgent", "fingerprintHash" FROM "SecurityEvent" ORDER BY "createdAt" DESC LIMIT 30`);
  console.log(`\n\n=== ${ev.rows.length} recent security events ===`);
  for (const e of ev.rows) {
    console.log(`[${e.createdAt.toISOString()}] [${e.severity}] ${e.eventType}  user=${e.userId?.slice(-8)}`);
    console.log(`  msg: ${e.message}`);
    if (e.ipAddress) console.log(`  ip=${e.ipAddress}  ua=${e.userAgent.slice(0,80)}`);
    if (e.fingerprintHash) console.log(`  fp=${e.fingerprintHash.slice(0,24)}…`);
  }
  
  await db.end();
})().catch(e => { console.error('FAIL:', e.message); process.exit(1); });
