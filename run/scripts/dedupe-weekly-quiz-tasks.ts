/**
 * Converge the weekly weak-topic quiz scheduled task(s) to the learner's
 * latest expressed intent: "every Sunday at 10pm, generate 10 MCQs on my
 * weak topics" (Africa/Cairo local time).
 *
 * History: the chat transcript showed FIVE duplicates (the agent had no
 * update/delete tool, so "update your task" kept creating new ones). Those
 * rows were lost with the sandbox's old data dir; the restored backup
 * carries ONE task ("Weekly weak-topic drill", 5 MCQs @ 21:00 Cairo).
 * This script updates it to the canonical config — and still deletes any
 * duplicates if they reappear later.
 */
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/client';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL ?? 'postgresql://postgres:postgres@127.0.0.1:5432/nextapp' }),
});

const CRON = '0 22 * * SUN';       // 10pm every Sunday (local time)
const TZ = 'Africa/Cairo';          // learner's timezone
const PROMPT = 'Generate 10 MCQs on my weak topics';
const NAME = 'Weekly weak topics quiz';

async function main() {
  const { computeNextRun } = await import('../src/lib/agent/scheduler/cron');

  const tasks = await prisma.agentScheduledTask.findMany({ orderBy: { createdAt: 'asc' } });
  console.log(`Found ${tasks.length} scheduled tasks:`);
  for (const t of tasks) {
    console.log(` - ${t.id} | ${t.name} | ${t.status} | cron=${t.cron ?? '-'} tz=${t.timezone} | next=${t.nextRunAt?.toISOString() ?? '-'} | owner=${t.userId}`);
    console.log(`   prompt="${t.prompt.slice(0, 90)}"`);
  }

  const weekly = tasks.filter((t) => /weekly/i.test(t.name) || /weak topics/i.test(t.prompt));
  const keep = weekly[weekly.length - 1];
  const drop = weekly.filter((t) => t.id !== keep?.id);

  const nextRunAt = computeNextRun(CRON, null, TZ);
  console.log(`\nCanonical: "${NAME}" — ${CRON} ${TZ}, next run ${nextRunAt?.toISOString()}`);
  console.log(`Cairo now: ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Cairo' })}`);

  let canonical;
  if (keep) {
    canonical = await prisma.agentScheduledTask.update({
      where: { id: keep.id },
      data: { name: NAME, prompt: PROMPT, cron: CRON, runAt: null, timezone: TZ, nextRunAt, status: 'active' },
    });
    console.log(`Updated existing task ${keep.id} → canonical config`);
  } else {
    const owner = await prisma.user.findFirst({ where: { email: 'student@medq.com' } });
    if (!owner) { console.log('No student user found — aborting'); return; }
    canonical = await prisma.agentScheduledTask.create({
      data: { userId: owner.id, name: NAME, prompt: PROMPT, cron: CRON, timezone: TZ, nextRunAt, status: 'active' },
    });
    console.log(`Created canonical task for student@medq.com`);
  }
  console.log(`Canonical task: ${canonical.id} | next ${canonical.nextRunAt?.toISOString()} (${TZ})`);

  for (const t of drop) {
    await prisma.agentScheduledTask.delete({ where: { id: t.id } });
    console.log(`Deleted duplicate: ${t.id} (was ${t.cron} ${t.timezone})`);
  }

  const others = await prisma.agentScheduledTask.findMany({ where: { id: { not: canonical.id } } });
  console.log(`\nOther tasks remaining: ${others.length}`);
  for (const t of others) {
    console.log(` - ${t.id} | ${t.name} | ${t.status} | cron=${t.cron ?? '-'} tz=${t.timezone} | next=${t.nextRunAt?.toISOString() ?? '-'}`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
