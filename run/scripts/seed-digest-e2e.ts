/**
 * E2E seed for the unread-digest feature: push the student's lastReadAt back
 * and insert a flood of realistic group messages (including scheduled events:
 * meetings, an exam date, a deadline, a schedule change) from OTHER members,
 * so the digest has real unread input. Created message ids are written to
 * /tmp/digest-e2e-ids.json for precise cleanup.
 *
 * Run: bun run --preload ./scripts/preload-server-only.ts scripts/seed-digest-e2e.ts
 */
import fs from 'node:fs';
import { db } from '../src/lib/db';

const STUDENT_EMAIL = 'student@medq.com';
const ROOM_NAME = 'Cardiology Study Group';

async function main() {
  const student = await db.user.findFirst({ where: { email: STUDENT_EMAIL } });
  if (!student) throw new Error('student not found');
  const room = await db.chatRoom.findFirst({
    where: { name: ROOM_NAME, type: 'group' },
    include: { members: { select: { userId: true, user: { select: { id: true, name: true } } } } },
  });
  if (!room) throw new Error('room not found');
  const others = room.members.filter((m) => m.userId !== student.id).map((m) => m.user);
  if (others.length === 0) throw new Error('no other members');

  // Push lastReadAt back 1 day so all seeded messages count as unread.
  await db.chatRoomMember.update({
    where: { roomId_userId: { roomId: room.id, userId: student.id } },
    data: { lastReadAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  });

  const base = Date.now() - 5 * 60 * 60 * 1000; // spread over the last 5h
  const script: Array<[number, string]> = [
    [0, 'Morning everyone! Quick reminder that we have the cardio path review session this Thursday at 4pm in the library room 2B.'],
    [1, 'Can we move the ECG workshop to Wednesday instead? I have a clash with anatomy lab.'],
    [2, 'Wednesday works for me — same time, 2pm?'],
    [0, 'Yes, ECG workshop is now Wednesday 2pm, room 2B. Please update your calendars.'],
    [3, 'Dr. Hassan just posted the exam blueprint — the cardiology final exam is on November 12 at 9am, lecture hall A.'],
    [1, 'November 12?? That is earlier than last year. Ok, we need to speed up.'],
    [4, 'I finished summarizing the heart failure chapter, sharing my notes later today. The exam weighting is 25% cardiac pathophysiology.'],
    [2, 'The assignment deadline for the case report is Friday 11:59pm — do not forget to submit on the portal.'],
    [5, 'Is anyone going to the pathology lab make-up session tomorrow at 10am?'],
    [3, 'Also the quiz next Monday covers arrhythmias — Dr. Hassan said 20 MCQs.'],
    [1, 'For the ECG workshop bring your own calipers if you have them.'],
    [0, 'Study group meeting moved: THURSDAY 4pm cardio path review (unchanged), ECG workshop now WEDNESDAY 2pm. Exam NOV 12 9am. Case report due FRIDAY.'],
    [4, 'Who has the Guyton textbook? I need chapter 22 for the pre-reading.'],
    [2, 'I have it, will bring it to the Thursday session.'],
    [5, 'The portal submission for the case report needs a plagiarism check receipt attached, just so you know.'],
    [3, 'Office hours with Dr. Hassan are Tuesday 1-3pm if anyone wants to ask about the blueprint.'],
    [1, 'Thanks! I will go Tuesday to ask about the arrhythmia quiz scope.'],
    [0, 'Reminder: bring printed copies of the ECG strips for Wednesday, 6 sets for the group.'],
    [4, 'My summary notes are up on the shared drive — heart failure + valvular disease sections.'],
    [2, 'Perfect, I will review before the exam.'],
    // A few more ordinary messages to give the digest some volume.
    [5, 'Anyone has the mnemonic for bundle branch blocks?'],
    [3, '"Polly wants a bun" — right bundle, and left is Weird Wills.'],
    [1, 'Lol, that one sticks.'],
    [0, 'Send your practice MCQ scores before Friday so we can plan the last review session.'],
    [4, 'I scored 68% on the practice set, arrhythmias are my weak spot.'],
    [2, '72% here, valvular disease is dragging me down.'],
    [5, '75%, fine with everything except ECG interpretation.'],
    [3, 'Then Wednesday ECG workshop is exactly what we need.'],
    [1, 'Agreed. See you all Wednesday 2pm.'],
    [0, 'Last call: case report due Friday 11:59pm, no extensions this semester.'],
  ];

  const created: string[] = [];
  for (let i = 0; i < script.length; i += 1) {
    const [senderIndex, content] = script[i];
    const sender = others[senderIndex % others.length];
    const message = await db.chatMessage.create({
      data: {
        roomId: room.id,
        senderId: sender.id,
        content,
        type: 'text',
        metadata: JSON.stringify({ e2e: 'digest-e2e' }),
        createdAt: new Date(base + i * 6 * 60 * 1000),
      },
    });
    created.push(message.id);
  }
  await db.chatRoom.update({
    where: { id: room.id },
    data: { lastMessageAt: new Date() },
  });

  fs.writeFileSync('/tmp/digest-e2e-ids.json', JSON.stringify({ roomIds: [room.id], messageIds: created }));
  console.log(`Seeded ${created.length} unread messages in "${ROOM_NAME}" (${room.id})`);
  console.log(`Student lastReadAt pushed back 24h; ids saved to /tmp/digest-e2e-ids.json`);
  await db.$disconnect();
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
