import { db } from '../src/lib/db'
const keys = await db.userApiKey.findMany({ select: { providerId: true, label: true, baseUrl: true, enabled: true, modelsConfig: true } })
for (const k of keys) {
  let models = []
  try {
    const raw = typeof k.modelsConfig === 'string' ? JSON.parse(k.modelsConfig) : k.modelsConfig
    if (Array.isArray(raw)) models = raw.map((m) => m.id ?? m.modelId ?? String(m)).slice(0, 10)
    else if (raw && typeof raw === 'object') models = Object.keys(raw).slice(0, 10)
  } catch { models = ['<unparsed>'] }
  console.log(`provider=${k.providerId} | label=${k.label} | base=${k.baseUrl} | enabled=${k.enabled} | models=[${models.join(', ')}]`)
}
process.exit(0)
