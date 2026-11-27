import { db } from '../src/lib/db'
const row = await db.userApiKey.findFirst({ where: { providerId: 'medq-router' } })
console.log(JSON.stringify(row, (k, v) => k === 'apiKeyEnc' ? '<encrypted>' : v, 2).slice(0, 2200))
process.exit(0)
