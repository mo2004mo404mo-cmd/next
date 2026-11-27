// Verify persisted generate_document results parse into file-card info
import { db } from '../src/lib/db';

async function main() {
  const threads = ['02d4681f-cc85-4006-9f1f-2d5dd53a88c1', 'a93633c9-bb1f-43d6-9cc0-0762fa8bf42b', 'f8364e92-321f-4436-9504-2b892467ddf4'];
  for (const tid of threads) {
    const msgs = await db.agentThreadMessage.findMany({ where: { threadId: tid, role: 'assistant' } });
    for (const m of msgs) {
      if (!(m.toolResults ?? '').includes('created')) continue;
      const results = JSON.parse(m.toolResults ?? '[]') as Array<{ toolCallId?: string; toolName: string; content: string; isError?: boolean }>;
      for (const r of results) {
        if (!r.content.includes('"created"')) continue;
        console.log(`thread ${tid} tool=${r.toolName} err=${r.isError} len=${r.content.length}`);
        try {
          const parsed = JSON.parse(r.content) as { created?: boolean; artifact?: { id: string; name: string; downloadUrl: string; mimeType?: string; sizeBytes?: number; kind?: string; filename?: string; previewUrl?: string; pdfPreviewUrl?: string } };
          console.log(`  PARSES OK: created=${parsed.created} id=${parsed.artifact?.id} name=${parsed.artifact?.name} downloadUrl=${parsed.artifact?.downloadUrl} mime=${parsed.artifact?.mimeType} size=${parsed.artifact?.sizeBytes}`);
        } catch (e) {
          console.log(`  PARSE FAILS (truncated?): ${String(e).slice(0, 100)} tail=${r.content.slice(-80)}`);
        }
      }
    }
  }
}

main().finally(() => db.$disconnect());
