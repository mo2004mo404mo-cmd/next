/**
 * One-time cleanup: merge duplicate DeviceFingerprint rows that exist for the
 * SAME physical device (same user + osGuess + browserGuess + platform + screen
 * dimensions + hardwareConcurrency + deviceMemory + timezone), but were
 * recorded as separate rows because the brittle fingerprintHash included
 * volatile signals (DPR changes from zoom, UA version bumps, canvas drift).
 *
 * Strategy:
 *   1. Group active (revoked=false) rows by (userId, stable-class).
 *   2. For each group with >1 row:
 *      a. Pick the most-recently-seen row as the canonical one.
 *      b. Sum loginCount from all duplicates into canonical.
 *      c. Take the max trustScore.
 *      d. Mark all non-canonical rows revoked=true with reason
 *         'merged_into_canonical' (we don't DELETE because SecurityEvent
 *         rows reference fingerprintHash — revoking keeps the FK intact).
 *   3. Log a 'device.trust_changed' info event so users see the merge in
 *      their security log.
 *
 * Idempotent: safe to re-run.
 */
const { Client } = require('/home/z/my-project/upload/medq-app/node_modules/pg');

const db = new Client({
  connectionString: 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp',
});

async function main() {
  await db.connect();

  // Find duplicate groups.
  // screenSummary is stored as "<w>x<h>x<dpr>" — we strip the last segment
  // (DPR) because that's the volatile part.
  // hardwareConcurrency and deviceMemory are NOT persisted columns.
  const dupes = await db.query(`
    SELECT
      "userId",
      "osGuess",
      "browserGuess",
      "platform",
      split_part("screenSummary", 'x', 1) || 'x' || split_part("screenSummary", 'x', 2) AS screen_dims,
      "timezone",
      COUNT(*)::int AS n,
      MAX("lastSeenAt") AS latest_seen
    FROM "DeviceFingerprint"
    WHERE revoked = false
    GROUP BY
      "userId", "osGuess", "browserGuess", "platform",
      split_part("screenSummary", 'x', 1) || 'x' || split_part("screenSummary", 'x', 2),
      "timezone"
    HAVING COUNT(*) > 1
    ORDER BY latest_seen DESC
  `);

  console.log(`Found ${dupes.rows.length} duplicate groups (same user + stable device-class, multiple fingerprint rows).`);

  let totalMerged = 0;
  let totalCanonicalRowsKept = 0;

  for (const g of dupes.rows) {
    // Find all rows in this group, ordered by lastSeenAt DESC.
    const rows = await db.query(`
      SELECT id, "fingerprintHash", "loginCount", "trustScore", "lastSeenAt", "label", "lastIp", "lastGeo", "userAgent", "screenSummary"
      FROM "DeviceFingerprint"
      WHERE revoked = false
        AND "userId" = $1
        AND "osGuess" = $2
        AND "browserGuess" = $3
        AND "platform" = $4
        AND split_part("screenSummary", 'x', 1) || 'x' || split_part("screenSummary", 'x', 2) = $5
        AND "timezone" = $6
      ORDER BY "lastSeenAt" DESC
    `, [g.userId, g.osGuess, g.browserGuess, g.platform, g.screen_dims, g.timezone]);

    const canonical = rows.rows[0];
    const duplicates = rows.rows.slice(1);
    if (!canonical || duplicates.length === 0) continue;

    const mergedLoginCount = duplicates.reduce((sum, r) => sum + r.loginCount, canonical.loginCount);
    const mergedTrustScore = Math.max(...rows.rows.map(r => r.trustScore));

    // Update the canonical row with merged counts.
    await db.query(`
      UPDATE "DeviceFingerprint"
      SET "loginCount" = $1, "trustScore" = $2
      WHERE id = $3
    `, [mergedLoginCount, mergedTrustScore, canonical.id]);

    // Revoke all duplicate rows.
    const duplicateIds = duplicates.map(r => r.id);
    const revokeResult = await db.query(`
      UPDATE "DeviceFingerprint"
      SET revoked = true,
          "revokedAt" = NOW(),
          "revokedReason" = 'merged_into_canonical',
          "trustScore" = 0
      WHERE id = ANY($1::text[])
    `, [duplicateIds]);

    // Log an info security event for the merge.
    await db.query(`
      INSERT INTO "SecurityEvent" ("id", "userId", "eventType", "severity", "message", "metadata", "ipAddress", "userAgent", "fingerprintHash", "createdAt", "readAt")
      VALUES (gen_random_uuid()::text, $1, 'device.trust_changed', 'info',
        $2,
        $3, '', '', $4, NOW(), NULL)
    `, [
      g.userId,
      `Merged ${duplicates.length} duplicate device rows for ${g.osGuess} ${g.browserGuess} (${g.screenDims}) into canonical device (loginCount ${canonical.loginCount} → ${mergedLoginCount})`,
      JSON.stringify({
        reason: 'dedup_cleanup',
        canonicalFingerprintHash: canonical.fingerprintHash,
        mergedFingerprintHashes: duplicates.map(r => r.fingerprintHash),
        canonicalId: canonical.id,
        mergedIds: duplicateIds,
        previousLoginCount: canonical.loginCount,
        newLoginCount: mergedLoginCount,
      }),
      canonical.fingerprintHash,
    ]);

    console.log(`  [user ${g.userId.slice(-8)}] ${g.osGuess} ${g.browserGuess} ${g.screenDims}: kept row ${canonical.id.slice(-8)} (loginCount ${canonical.loginCount}→${mergedLoginCount}, trust ${mergedTrustScore}), revoked ${duplicates.length} duplicates`);
    totalMerged += duplicates.length;
    totalCanonicalRowsKept += 1;
  }

  console.log(`\nDone. Merged ${totalMerged} duplicate rows across ${totalCanonicalRowsKept} canonical devices.`);

  // Show the after state.
  const after = await db.query(`
    SELECT "userId", "osGuess", "browserGuess",
           split_part("screenSummary", 'x', 1) || 'x' || split_part("screenSummary", 'x', 2) AS screen_dims,
           SUM(CASE WHEN revoked = false THEN 1 ELSE 0 END)::int AS active_devices,
           COUNT(*)::int AS total_devices
    FROM "DeviceFingerprint"
    GROUP BY "userId", "osGuess", "browserGuess", screen_dims
    ORDER BY active_devices DESC, total_devices DESC
    LIMIT 20
  `);
  console.log(`\n=== After cleanup: device counts per (user, os, browser, screen) ===`);
  for (const r of after.rows) {
    console.log(`  user=${r.userId.slice(-8)} ${r.osGuess} ${r.browserGuess} ${r.screen_dims}  active=${r.active_devices}  total=${r.total_devices}`);
  }

  await db.end();
}

main().catch(e => { console.error('FAIL:', e); process.exit(1); });
