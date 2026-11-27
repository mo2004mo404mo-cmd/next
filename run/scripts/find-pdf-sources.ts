import { db } from '../src/lib/db';
async function main() {
  const srcs = await db.knowledgeSource.findMany({
    where: { status: 'ready' },
    select: { id: true, name: true, fileKind: true, metaJson: true, userId: true },
    take: 30,
    orderBy: { createdAt: 'desc' },
  });
  for (const s of srcs) {
    const meta = s.metaJson ? JSON.parse(s.metaJson) : {};
    if (meta.originalMime === 'application/pdf' || meta.originalMime?.startsWith('image/')) {
      console.log(s.id, '|', s.fileKind, '|', meta.originalMime, '|', s.name.slice(0, 60), '| user:', s.userId.slice(0, 12));
    }
  }
  await db.$disconnect();
}
main();
