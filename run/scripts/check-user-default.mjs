import { db } from '../src/lib/db'
const u = await db.user.findFirst({ where: { email: 'admin@medq.com' }, select: { id: true, email: true, defaultModel: true } })
console.log('admin user:', JSON.stringify(u, null, 2))
const keys = await db.userApiKey.findMany({ select: { id: true, providerId: true, label: true, baseUrl: true, enabled: true, modelsConfig: true } })
for (const k of keys) console.log('BYOK row:', k.providerId, '|', k.label, '|', k.baseUrl, '| enabled:', k.enabled, '| models:', (k.modelsConfig ?? []).map(m => m.id ?? m.modelId ?? m).slice(0, 8))
process.exit(0)
