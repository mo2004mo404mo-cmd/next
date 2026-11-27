/**
 * Chat data repair — fixes the orphaned-row 500 in /api/chat/rooms.
 *
 * Background: seed-chat.ts ran against an older database generation; the 8
 * @medq.test doctor users (and their ids) were later wiped by a re-seed, but
 * ChatRoomMember / ChatMessage / Friendship rows referencing them survived.
 * /api/chat/rooms then crashed with
 *   TypeError: Cannot read properties of null (reading 'name')
 * (otherMembers[0].user is null) → the Messages page showed "no chats".
 *
 * Repair strategy: wipe ALL chat + friendship rows and re-run prisma/seed-chat.ts
 * against the CURRENT users (it is idempotent and re-adds the demo
 * student/educator/admin to every room). Result: coherent demo chat data with
 * every member/sender pointing at a user that actually exists.
 *
 * Usage: npx tsx scripts/repair-chat-data.ts
 */
import { db } from '../src/lib/db';

async function main() {
  console.log('[repair] Chat data repair starting…');

  const before = {
    rooms: await db.chatRoom.count(),
    members: await db.chatRoomMember.count(),
    messages: await db.chatMessage.count(),
    friendships: await db.friendship.count(),
    users: await db.user.count(),
  };
  console.log('[repair] Before:', JSON.stringify(before));

  // Wipe chat + friendship tables (order respects FKs where present).
  await db.chatMessage.deleteMany();
  await db.chatRoomMember.deleteMany();
  await db.chatRoom.deleteMany();
  await db.friendship.deleteMany();

  const after = {
    rooms: await db.chatRoom.count(),
    members: await db.chatRoomMember.count(),
    messages: await db.chatMessage.count(),
    friendships: await db.friendship.count(),
  };
  console.log('[repair] After wipe:', JSON.stringify(after));
  console.log('[repair] Now run: npx tsx prisma/seed-chat.ts');
}

main()
  .catch((e) => { console.error('[repair] FAILED:', e); process.exit(1); })
  .finally(() => db.$disconnect());
