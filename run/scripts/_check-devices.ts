import { db } from './src/lib/db';

async function main() {
  const devices = await db.deviceFingerprint.findMany({
    orderBy: { lastSeenAt: 'desc' },
    take: 20,
    include: { user: { select: { email: true } } },
  });
  console.log(`Total devices: ${devices.length}`);
  for (const d of devices) {
    console.log('\n--- device ---');
    console.log('  user:', d.user?.email);
    console.log('  os:', d.osGuess, ' browser:', d.browserGuess);
    console.log('  hash:', d.fingerprintHash.slice(0,16) + '...');
    console.log('  screen:', d.screenSummary, ' tz:', d.timezone);
    console.log('  platform:', d.platform);
    console.log('  UA:', d.userAgent.slice(0, 100));
    console.log('  loginCount:', d.loginCount, ' trustScore:', d.trustScore, ' revoked:', d.revoked);
    console.log('  firstSeen:', d.firstSeenAt, ' lastSeen:', d.lastSeenAt);
    console.log('  lastIp:', d.lastIp, ' lastGeo:', d.lastGeo);
    if (d.label) console.log('  label:', d.label);
  }
  
  const events = await db.securityEvent.findMany({
    orderBy: { createdAt: 'desc' },
    take: 30,
    include: { user: { select: { email: true } } },
  });
  console.log('\n\n=== Recent security events ===');
  console.log(`Total: ${events.length}`);
  for (const e of events) {
    console.log(`\n[${e.createdAt.toISOString()}] [${e.severity}] ${e.eventType}`);
    console.log(`  user: ${e.user?.email}`);
    console.log(`  msg: ${e.message}`);
    console.log(`  ip: ${e.ipAddress}  ua: ${e.userAgent.slice(0,80)}`);
    console.log(`  fpHash: ${e.fingerprintHash?.slice(0,16) || '(none)'}`);
  }
  await db.$disconnect();
}

main().catch(e => { console.error('FAIL:', e); process.exit(1); });
