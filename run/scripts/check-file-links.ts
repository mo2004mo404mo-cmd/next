// Diagnose file/artifact links: find recent artifacts, test their routes.
import { db } from '../src/lib/db';

async function main() {
  const artifacts = await db.agentArtifact.findMany({
    orderBy: { createdAt: 'desc' },
    take: 15,
    select: {
      id: true, name: true, kind: true, mimeType: true, sizeBytes: true,
      url: true, content: true, userId: true, createdAt: true,
    },
  });
  console.log(`Recent artifacts: ${artifacts.length}`);
  for (const a of artifacts) {
    const hasContent = a.content != null;
    console.log(`- [${a.createdAt.toISOString()}] ${a.id} kind=${a.kind} mime=${a.mimeType} size=${a.sizeBytes} content=${hasContent ? `${String(a.content).length}ch` : 'NULL'} url=${a.url ?? 'none'} userId=${a.userId ?? 'null(guest)'}`);
  }

  // check disk files referenced by url
  const fs = await import('node:fs');
  for (const a of artifacts) {
    if (!a.url) continue;
    const m = a.url.match(/\/generated\/(.+)$/);
    if (!m) { console.log(`  URL odd: ${a.url}`); continue; }
    const p = `/home/z/my-project/public/generated/${m[1]}`;
    console.log(`  disk ${a.id}: ${p} exists=${fs.existsSync(p)}`);
  }
}

main().finally(() => db.$disconnect());
