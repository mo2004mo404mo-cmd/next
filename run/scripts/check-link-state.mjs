// Inspect the link state: BYOK endpoints, user default model, chat model usage
import { db } from '../src/lib/db'

const email = 'admin@medq.com'
const user = await db.user.findUnique({
  where: { email },
  select: {
    id: true, defaultModel: true,
    apiKeys: {
      select: {
        id: true, providerId: true, label: true, enabled: true,
        baseUrl: true, modelsConfig: true, createdAt: true,
      },
    },
  },
})
console.log('USER', user?.id, 'defaultModel =', JSON.stringify(user?.defaultModel))
console.log('\nBYOK ENDPOINTS:')
for (const k of user?.apiKeys ?? []) {
  let models = []
  try {
    const raw = typeof k.modelsConfig === 'string' ? JSON.parse(k.modelsConfig) : k.modelsConfig
    models = Array.isArray(raw)
      ? raw.map(m => m?.id ?? m?.model ?? String(m))
      : raw?.models ? raw.models.map(m => m?.id ?? String(m)) : []
  } catch { /* ignore */ }
  console.log(`  [${k.enabled ? 'on ' : 'off'}] ${k.providerId.padEnd(12)} ${k.label ?? '-'} -> ${k.baseUrl} models=[${models.join(', ')}]`)
}

// What model did the latest chat conversation use?
const convo = await db.conversation.findMany({
  orderBy: { updatedAt: 'desc' },
  take: 3,
  select: { id: true, title: true, model: true, updatedAt: true },
})
console.log('\nRECENT CONVERSATIONS:')
for (const c of convo) console.log('  ', new Date(c.updatedAt).toISOString().slice(5, 16), JSON.stringify(c.model), (c.title ?? '').slice(0, 40))
process.exit(0)
