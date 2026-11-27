import { config } from 'dotenv';
import pkg from '../src/generated/client/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
const { PrismaClient } = pkg;
config({ override: true });
config({ path: '.env.local', override: true });
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const db = new PrismaClient({ adapter });
const room = await db.chatRoom.findFirst({ where: { name: { contains: 'Cardiology' } }, include: { members: { include: { user: { select: { id: true, name: true, email: true } } } } } });
if (room) {
  console.log('ROOM:', room.id, room.name, room.type);
  for (const m of room.members) console.log(`  ${m.user.name} <${m.user.email}> role=${m.role}`);
}
await db.$disconnect();
