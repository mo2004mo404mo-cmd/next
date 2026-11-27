// Inspect UserApiKey rows + modelsConfig to confirm the "model not visible" bug data.
import { SQL } from 'bun';

const sql = new SQL('postgresql://postgres:postgres@127.0.0.1:5432/nextapp');

const keys = await sql`
  SELECT k."providerId", k."label", k."baseUrl", k."enabled", k."priority",
         k."modelsConfig", k."lastVerifiedAt", k."lastUsedAt",
         u."email" AS "userEmail", u."defaultModel"
  FROM "UserApiKey" k JOIN "User" u ON u."id" = k."userId"
  ORDER BY k."providerId", k."priority"`;

console.log(`Total UserApiKey rows: ${keys.length}\n`);
for (const k of keys) {
  const models = k.modelsConfig ? JSON.parse(k.modelsConfig) : null;
  console.log(`• [${k.providerId}] label=${k.label ?? '—'} baseUrl=${k.baseUrl ?? 'default'} enabled=${k.enabled} prio=${k.priority}`);
  console.log(`  user=${k.userEmail} defaultModel=${k.defaultModel ?? 'null'}`);
  console.log(`  modelsConfig: ${models ? `${models.length} models → ${models.map((m: any) => m.id).slice(0, 6).join(', ')}${models.length > 6 ? ' …' : ''}` : 'NULL'}`);
  console.log(`  verified=${k.lastVerifiedAt ?? 'never'} used=${k.lastUsedAt ?? 'never'}`);
}

const users = await sql`SELECT "email", "defaultModel" FROM "User" LIMIT 15`;
console.log('\nUser.defaultModel values:');
for (const u of users) console.log(`  ${u.email}: ${u.defaultModel ?? 'null'}`);

const usage = await sql`SELECT COUNT(*)::int AS n FROM "AgentUsage"`;
console.log(`\nAgentUsage rows (analytics data plane): ${usage[0].n}`);
