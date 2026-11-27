// Which provider/model answered recent MedQ chats?
import { db } from '../src/lib/db'
const rows = await db.aiCallLog.findMany({
  orderBy: { createdAt: 'desc' },
  take: 15,
  select: {
    createdAt: true, providerId: true, modelId: true, status: true,
    latencyMs: true, error: true, stage: true,
  },
})
for (const r of rows) {
  console.log(
    new Date(r.createdAt).toISOString().slice(11, 19),
    'stage=' + String(r.stage ?? '-').padEnd(14),
    'provider=' + String(r.providerId).padEnd(10),
    'model=' + String(r.modelId).padEnd(36),
    'status=' + String(r.status).padEnd(8),
    (r.latencyMs ?? 0) + 'ms',
    r.error ? String(r.error).slice(0, 70) : '',
  )
}
process.exit(0)
