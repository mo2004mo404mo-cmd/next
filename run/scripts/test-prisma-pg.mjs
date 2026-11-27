/** Reproduce the server's PrismaPg adapter connection exactly. */
import { config } from 'dotenv';
const { parsed } = config();
const envUrl = process.env.DATABASE_URL;
const fileUrl = parsed?.DATABASE_URL;
const connectionString = envUrl && envUrl.startsWith('postgres') ? envUrl : fileUrl ?? envUrl;
console.log('env DATABASE_URL:', envUrl);
console.log('file DATABASE_URL:', fileUrl);
console.log('using:', connectionString);

const { PrismaPg } = await import('@prisma/adapter-pg');
const { PrismaClient } = await import('./src/generated/client.ts').catch(() => ({ PrismaClient: null }));
if (!PrismaClient) {
  // generated client is TS — use the compiled hook via require below
  const { createRequire } = await import('module');
  const require = createRequire(import.meta.url);
  const { PrismaClient: PC } = require('/home/z/my-project/src/generated/client.js');
  const adapter = new PrismaPg({ connectionString });
  const db = new PC({ adapter, log: ['error'] });
  const users = await db.user.findMany({ select: { id: true }, take: 2 });
  console.log('adapter query OK, users:', users.length);
  await db.$disconnect();
}
