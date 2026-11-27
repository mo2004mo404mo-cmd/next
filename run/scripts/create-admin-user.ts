// Create the missing admin@medq.com user so all three Quick Demo Login
// buttons work. Uses the exact bcrypt hash from the SQL backup (verified
// to match "test123" with cost 12), so the demo password works as
// documented in RESTORE-INSTRUCTIONS.md.

import pg from 'pg';

const DSN = 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp';
const c = new pg.Client({ connectionString: DSN });
await c.connect();

// The original admin row from db/medq-backup.sql line 18447:
//   id:            cmusenr950006oir80jr4ludo
//   name:          Admin User
//   email:         admin@medq.com
//   emailVerified: 2026-10-03T13:05:54.937Z
//   password hash: $2b$12$59WY4fe4DxjXERuioKvtIuE6FI3KdO0AfRYSBwDjtXT9TDD9yaYc2
//   role:          admin
//   defaultModel:  medq-router:auto
//   status:        active
//   createdAt:     2026-10-03T13:05:56.153Z
//   updatedAt:     2026-10-19T10:05:36.505Z
//
// All other columns mirror the student/educator rows so the admin row is
// indistinguishable from a normally-restored one.

const r = await c.query(
  `INSERT INTO "User"
    ("id","name","email","emailVerified","password","image","bio","role",
     "medicalSchool","graduationYear","specialty","country","onboardingCompleted",
     "lastActiveAt","isOnline","defaultModel","status","suspendedUntil",
     "suspendedReason","bannedAt","bannedReason","passwordResetAt",
     "createdAt","updatedAt")
   VALUES
    ($1,$2,$3,$4,$5,NULL,'','admin',
     '',NULL,'','',true,
     $6,false,'medq-router:auto','active',NULL,
     NULL,NULL,NULL,NULL,
     $7,$8)
   ON CONFLICT (email) DO UPDATE SET
     password = EXCLUDED.password,
     role = EXCLUDED.role,
     "emailVerified" = EXCLUDED."emailVerified",
     status = EXCLUDED.status,
     "defaultModel" = EXCLUDED."defaultModel"
   RETURNING id, email, role`,
  [
    'cmusenr950006oir80jr4ludo',                              // id (from backup)
    'Admin User',                                              // name
    'admin@medq.com',                                          // email
    new Date('2026-10-03T13:05:54.937Z'),                      // emailVerified
    '$2b$12$59WY4fe4DxjXERuioKvtIuE6FI3KdO0AfRYSBwDjtXT9TDD9yaYc2', // password hash (test123)
    new Date('2026-10-03T13:05:55.521Z'),                      // lastActiveAt
    new Date('2026-10-03T13:05:56.153Z'),                      // createdAt
    new Date(),                                                // updatedAt
  ],
);

console.log('Inserted/updated admin user:');
for (const u of r.rows) {
  console.log(`  id=${u.id}  email=${u.email}  role=${u.role}`);
}

// Also re-verify all three demo logins verify against test123
import bcrypt from 'bcryptjs';
const demo = await c.query(
  `SELECT email, password FROM "User" WHERE email IN ('student@medq.com','educator@medq.com','admin@medq.com') ORDER BY email`,
);
console.log('');
console.log('=== Final bcrypt verify of all three demo accounts ===');
for (const u of demo.rows) {
  const ok = bcrypt.compareSync('test123', u.password);
  console.log(`  ${u.email.padEnd(22)} / test123 -> ${ok ? 'MATCH ✓' : 'NO MATCH ✗'}`);
}

await c.end();
console.log('');
console.log('Done. All three Quick Demo Login buttons should now work.');
