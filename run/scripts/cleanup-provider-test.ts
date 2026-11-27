import { db } from '../src/lib/db';
async function main() {
  const ids = ['cmv7ji9ob0000ufq8p3uwuhkl', 'cmv7jr4ef000157q8dwsupnq1'];
  const r = await db.question.deleteMany({ where: { id: { in: ids } } });
  console.log('deleted test questions:', r.count);
}
main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
