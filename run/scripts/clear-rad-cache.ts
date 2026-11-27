import { db } from '../src/lib/db';
async function main() {
  const del = await db.mediaSearchCache.deleteMany({ where: { kind: 'radiology' } });
  console.log('deleted radiology cache rows:', del.count);
  await db.$disconnect();
}
main();
