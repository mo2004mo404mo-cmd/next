import { db } from '../src/lib/db'
import { hashSync } from 'bcryptjs'

// ─── Configuration ───────────────────────────────────────────────────────────

const PASSWORD_HASH = hashSync('test123', 10)

const TEST_USERS = [
  { name: 'Dr. Sarah Chen',    email: 'sarah@medq.test',  specialty: 'Cardiology' },
  { name: 'Dr. James Wilson',  email: 'james@medq.test',  specialty: 'Neurology' },
  { name: 'Dr. Priya Sharma',  email: 'priya@medq.test',  specialty: 'Pediatrics' },
  { name: 'Dr. Marco Rossi',   email: 'marco@medq.test',  specialty: 'Surgery' },
  { name: 'Dr. Aisha Mohammed', email: 'aisha@medq.test', specialty: 'OB/GYN' },
  { name: 'Dr. Lucas Kim',     email: 'lucas@medq.test',  specialty: 'Pharmacology' },
  { name: 'Dr. Emma Thompson', email: 'emma@medq.test',   specialty: 'Psychiatry' },
  { name: 'Dr. David Okafor',  email: 'david@medq.test',  specialty: 'Pathology' },
] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function log(section: string, msg: string) {
  console.log(`[${section}] ${msg}`)
}

function timeAgo(minutes: number): Date {
  return new Date(Date.now() - minutes * 60_000)
}

// ─── Main Seed ───────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🚀 Starting chat seed script...\n')

  // Check if we already have seeded chat data (idempotency guard for messages)
  const existingMsgCount = await db.chatMessage.count()
  const skipMessages = existingMsgCount > 0

  if (skipMessages) {
    console.log(`⚠️  Database already has ${existingMsgCount} chat messages.`)
    console.log('   Skipping room/message creation to avoid duplicates.')
    console.log('   Users and friendships will still be upserted (safe).\n')
  }

  // ── 1. Create / upsert users ─────────────────────────────────────────────
  log('Users', 'Upserting 8 test users...')

  const userIds: string[] = []

  for (let i = 0; i < TEST_USERS.length; i++) {
    const u = TEST_USERS[i]
    const user = await db.user.upsert({
      where: { email: u.email },
      update: {},
      create: {
        name: u.name,
        email: u.email,
        role: 'user',
        medicalSchool: 'University Medical School',
        specialty: u.specialty,
        image: null,
        password: PASSWORD_HASH,
        onboardingCompleted: true,
        bio: `${u.name} — ${u.specialty} resident at University Medical School.`,
        isOnline: i < 3, // first 3 are "online"
        lastActiveAt: timeAgo(i * 5),
      },
    })
    userIds.push(user.id)
    log('Users', `  ✓ ${u.name} (${user.id})`)
  }

  const [sarah, james, priya, marco, aisha, lucas, emma, david] = userIds

  // ── 2. Friendships ───────────────────────────────────────────────────────
  log('Friends', 'Creating accepted friendships for Sarah...')

  // Sarah is friends with James, Priya, Marco, Lucas
  const acceptedFriendships = [
    { sender: sarah, receiver: james, isFavorite: true,  nickname: 'Jimmy' },
    { sender: james, receiver: priya, isFavorite: false, nickname: '' },
    { sender: sarah, receiver: marco, isFavorite: false, nickname: '' },
    { sender: priya, receiver: lucas, isFavorite: false, nickname: '' },
    { sender: sarah, receiver: lucas, isFavorite: true,  nickname: 'Luke' },
  ]

  for (const f of acceptedFriendships) {
    await db.friendship.upsert({
      where: {
        senderId_receiverId: { senderId: f.sender, receiverId: f.receiver },
      },
      update: { status: 'accepted', isFavorite: f.isFavorite, nickname: f.nickname },
      create: {
        senderId: f.sender,
        receiverId: f.receiver,
        status: 'accepted',
        isFavorite: f.isFavorite,
        nickname: f.nickname,
      },
    })
    log('Friends', `  ✓ Accepted: ${f.sender.slice(-6)} → ${f.receiver.slice(-6)}`)
  }

  // ── 3. Pending friend requests ───────────────────────────────────────────
  log('Friends', 'Creating pending friend requests...')

  // Incoming to Sarah: from Aisha, from Emma
  const incomingRequests = [
    { sender: aisha,  receiver: sarah, note: 'Hi Dr. Chen! Would love to connect 🩺' },
    { sender: emma,   receiver: sarah, note: 'Fellow med enthusiast here!' },
  ]

  for (const r of incomingRequests) {
    await db.friendship.upsert({
      where: {
        senderId_receiverId: { senderId: r.sender, receiverId: r.receiver },
      },
      update: { status: 'pending', note: r.note },
      create: {
        senderId: r.sender,
        receiverId: r.receiver,
        status: 'pending',
        note: r.note,
      },
    })
    log('Friends', `  ✓ Pending (incoming): ${r.sender.slice(-6)} → Sarah`)
  }

  // Outgoing from Sarah: to David
  const outgoingRequests = [
    { sender: sarah, receiver: david, note: 'Would love to study pathology together!' },
  ]

  for (const r of outgoingRequests) {
    await db.friendship.upsert({
      where: {
        senderId_receiverId: { senderId: r.sender, receiverId: r.receiver },
      },
      update: { status: 'pending', note: r.note },
      create: {
        senderId: r.sender,
        receiverId: r.receiver,
        status: 'pending',
        note: r.note,
      },
    })
    log('Friends', `  ✓ Pending (outgoing): Sarah → ${r.receiver.slice(-6)}`)
  }

  // ── 4–7. Chat rooms & messages (skip if already seeded) ──────────────────
  if (skipMessages) {
    log('ChatData', 'Skipping — messages already exist in database.')
  } else {
    await seedChatRooms(sarah, james, priya, marco, aisha, lucas, emma, david)
  }

  // ── 8. Add @medq.com demo users to chat rooms ────────────────────────────
  log('DemoUsers', 'Adding @medq.com demo users to chat rooms...')
  const demoStudent = await db.user.findUnique({ where: { email: 'student@medq.com' } })
  const demoEducator = await db.user.findUnique({ where: { email: 'educator@medq.com' } })
  const demoAdmin = await db.user.findUnique({ where: { email: 'admin@medq.com' } })

  const allRooms = await db.chatRoom.findMany({ select: { id: true, type: true, name: true } })

  if (demoStudent) {
    for (const room of allRooms) {
      await db.chatRoomMember.upsert({
        where: { roomId_userId: { roomId: room.id, userId: demoStudent.id } },
        update: {},
        create: { roomId: room.id, userId: demoStudent.id, role: 'member', lastReadAt: new Date() },
      })
    }
    log('DemoUsers', `  ✓ Student added to ${allRooms.length} rooms`)

    // Friendship with test users
    for (const testId of [sarah, james, priya, lucas]) {
      await db.friendship.upsert({
        where: { senderId_receiverId: { senderId: demoStudent.id, receiverId: testId } },
        update: { status: 'accepted' },
        create: { senderId: demoStudent.id, receiverId: testId, status: 'accepted' },
      })
    }
    log('DemoUsers', '  ✓ Student friendships with test users')

    // Create DM between student and sarah
    const existingDM = await db.chatRoom.findFirst({
      where: { type: 'direct', members: { every: { userId: { in: [demoStudent.id, sarah] } } } },
      include: { members: true },
    })
    if (!existingDM || existingDM.members.length !== 2) {
      const dm = await db.chatRoom.create({
        data: {
          type: 'direct',
          createdBy: demoStudent.id,
          lastMessageAt: timeAgo(2),
          members: {
            create: [
              { userId: demoStudent.id, role: 'member', lastReadAt: timeAgo(1) },
              { userId: sarah, role: 'member', lastReadAt: timeAgo(5) },
            ],
          },
        },
      })
      await db.chatMessage.create({ data: { roomId: dm.id, senderId: sarah, content: 'Hey! Welcome to MedQ 👋 How are you finding the app so far?', type: 'text', metadata: '{}' } })
      await db.chatMessage.create({ data: { roomId: dm.id, senderId: demoStudent.id, content: 'Hi Dr. Chen! It\'s amazing — the cardiology section is really well done!', type: 'text', metadata: '{}' } })
      await db.chatMessage.create({ data: { roomId: dm.id, senderId: sarah, content: 'Glad to hear it! Feel free to join our study group if you\'re interested 🫀', type: 'text', metadata: '{}' } })
      log('DemoUsers', '  ✓ Created DM between student and Dr. Sarah Chen')
    }
  }

  if (demoEducator) {
    const groupRooms = allRooms.filter(r => r.type === 'group')
    for (const room of groupRooms) {
      await db.chatRoomMember.upsert({
        where: { roomId_userId: { roomId: room.id, userId: demoEducator.id } },
        update: {},
        create: { roomId: room.id, userId: demoEducator.id, role: 'admin', lastReadAt: new Date() },
      })
    }
    log('DemoUsers', `  ✓ Educator added to ${groupRooms.length} group rooms`)
  }

  if (demoAdmin) {
    const groupRooms = allRooms.filter(r => r.type === 'group')
    for (const room of groupRooms) {
      await db.chatRoomMember.upsert({
        where: { roomId_userId: { roomId: room.id, userId: demoAdmin.id } },
        update: {},
        create: { roomId: room.id, userId: demoAdmin.id, role: 'admin', lastReadAt: new Date() },
      })
    }
    log('DemoUsers', `  ✓ Admin added to ${groupRooms.length} group rooms`)
  }

  // ── Summary ───────────────────────────────────────────────────────────────
  const userCount = await db.user.count({ where: { email: { endsWith: '@medq.test' } } })
  const friendCount = await db.friendship.count()
  const roomCount = await db.chatRoom.count()
  const memberCount = await db.chatRoomMember.count()
  const msgCount = await db.chatMessage.count()

  console.log('\n─────────────────────────────────────────────────')
  console.log('✅ Chat seed completed successfully!')
  console.log('─────────────────────────────────────────────────')
  console.log(`  Users (test):     ${userCount}`)
  console.log(`  Friendships:      ${friendCount}`)
  console.log(`  Chat rooms:       ${roomCount}`)
  console.log(`  Room members:     ${memberCount}`)
  console.log(`  Messages:         ${msgCount}`)
  console.log('─────────────────────────────────────────────────\n')
}

// ─── Chat Room & Message Seeding ─────────────────────────────────────────────

async function seedChatRooms(
  sarah: string, james: string, priya: string, marco: string,
  aisha: string, lucas: string, emma: string, david: string
) {
  // ── 4. Direct chat rooms with messages ────────────────────────────────────
  log('DirectChats', 'Creating direct chat rooms...')

  // Helper to find or create a direct room between two users
  async function findOrCreateDirectRoom(userA: string, userB: string) {
    // Look for an existing direct room with exactly these two members
    const existing = await db.chatRoom.findFirst({
      where: {
        type: 'direct',
        members: { every: { userId: { in: [userA, userB] } } },
      },
      include: { members: true },
    })

    if (existing && existing.members.length === 2) {
      log('DirectChats', `  ↻ Reusing existing direct room ${existing.id}`)
      return existing
    }

    const room = await db.chatRoom.create({
      data: {
        type: 'direct',
        createdBy: userA,
        lastMessageAt: timeAgo(2),
        members: {
          create: [
            { userId: userA, role: 'member', lastReadAt: timeAgo(1) },
            { userId: userB, role: 'member', lastReadAt: timeAgo(5) },
          ],
        },
      },
    })
    log('DirectChats', `  ✓ Created direct room ${room.id}`)
    return room
  }

  // Helper to create a message
  async function createMessage(
    roomId: string,
    senderId: string,
    content: string,
    opts?: {
      type?: string
      metadata?: string
      isPinned?: boolean
      replyToId?: string
      createdAt?: Date
    }
  ) {
    return db.chatMessage.create({
      data: {
        roomId,
        senderId,
        content,
        type: opts?.type ?? 'text',
        metadata: opts?.metadata ?? '{}',
        isPinned: opts?.isPinned ?? false,
        replyToId: opts?.replyToId ?? null,
        createdAt: opts?.createdAt ?? new Date(),
      },
    })
  }

  // --- Direct Chat: Sarah ↔ James ---
  const roomSJ = await findOrCreateDirectRoom(sarah, james)

  await createMessage(roomSJ.id, james, 'Hey Sarah! Did you see the new cardiology guidelines?', { createdAt: timeAgo(120) })
  await createMessage(roomSJ.id, sarah, 'Yes! The updated ACC/AHA recommendations are really interesting. The new statin thresholds are a game changer.', { createdAt: timeAgo(115) })
  await createMessage(roomSJ.id, james, 'Totally agree. I found a great summary — want me to share it?', { createdAt: timeAgo(110) })
  const msgSJ4 = await createMessage(roomSJ.id, sarah, 'That would be amazing! Also, have you started the arrhythmia module yet?', { createdAt: timeAgo(105) })
  await createMessage(roomSJ.id, james, 'Just started yesterday. The ECG interpretation section is really well done.', { createdAt: timeAgo(100) })
  // Reply message
  await createMessage(roomSJ.id, sarah, 'Great, I\'ll check it out tonight!', { replyToId: msgSJ4.id, createdAt: timeAgo(95) })
  // Pinned message
  await createMessage(roomSJ.id, james, '📋 Study group meets every Thursday at 7PM in the library — Room 204', { isPinned: true, createdAt: timeAgo(90) })
  // Voice message placeholder
  await createMessage(roomSJ.id, sarah, '🎤 Voice message (0:42)', { type: 'text', metadata: JSON.stringify({ isVoice: true, duration: 42, audioUrl: '/uploads/voice/sample-voice-1.webm' }), createdAt: timeAgo(60) })
  await createMessage(roomSJ.id, james, 'Got it — thanks for the audio summary!', { createdAt: timeAgo(55) })

  // Update room pinned messages
  const pinnedSJ = await db.chatMessage.findFirst({ where: { roomId: roomSJ.id, isPinned: true } })
  if (pinnedSJ) {
    await db.chatRoom.update({ where: { id: roomSJ.id }, data: { pinnedMessageIds: JSON.stringify([pinnedSJ.id]) } })
  }

  // --- Direct Chat: Sarah ↔ Priya ---
  const roomSP = await findOrCreateDirectRoom(sarah, priya)

  await createMessage(roomSP.id, priya, 'Hi Sarah! How\'s the cardiology rotation going?', { createdAt: timeAgo(200) })
  await createMessage(roomSP.id, sarah, 'Busy but loving it! How are the little patients? 😊', { createdAt: timeAgo(195) })
  await createMessage(roomSP.id, priya, 'So rewarding! Had an interesting pediatric cardiology case today.', { createdAt: timeAgo(190) })
  await createMessage(roomSP.id, sarah, 'Oh? Tell me more!', { createdAt: timeAgo(185) })
  await createMessage(roomSP.id, priya, '3-year-old with a new murmur — turned out to be a VSD. We\'re monitoring for now.', { createdAt: timeAgo(180) })
  const msgSP_pinned = await createMessage(roomSP.id, sarah, '📌 Pediatric cardiology referral pathway: https://medq.app/referrals/peds-cardio', { isPinned: true, createdAt: timeAgo(175) })
  await createMessage(roomSP.id, priya, 'That link is super helpful, thanks!', { createdAt: timeAgo(170) })

  if (msgSP_pinned) {
    await db.chatRoom.update({ where: { id: roomSP.id }, data: { pinnedMessageIds: JSON.stringify([msgSP_pinned.id]) } })
  }

  // --- Direct Chat: Sarah ↔ Lucas ---
  const roomSL = await findOrCreateDirectRoom(sarah, lucas)

  await createMessage(roomSL.id, lucas, 'Sarah, quick question about the drug interactions section.', { createdAt: timeAgo(300) })
  await createMessage(roomSL.id, sarah, 'Sure, what\'s up?', { createdAt: timeAgo(295) })
  await createMessage(roomSL.id, lucas, 'Amiodarone and warfarin — the interaction mechanism. Is it CYP inhibition?', { createdAt: timeAgo(290) })
  await createMessage(roomSL.id, sarah, 'Exactly! Amiodarone inhibits CYP2C9 and CYP3A4, which metabolize warfarin. That\'s why you need to reduce warfarin dose by 30-50%.', { createdAt: timeAgo(285) })
  await createMessage(roomSL.id, lucas, 'Perfect, that makes sense. Thanks! 🙏', { createdAt: timeAgo(280) })

  // --- Direct Chat: Marco ↔ David ---
  const roomMD = await findOrCreateDirectRoom(marco, david)

  await createMessage(roomMD.id, marco, 'David, got a pathology question for you about that surgical specimen.', { createdAt: timeAgo(400) })
  await createMessage(roomMD.id, david, 'Sure, send me the details.', { createdAt: timeAgo(395) })
  await createMessage(roomMD.id, marco, 'Appendix — looks like mucinous neoplasm. Can you review the slides?', { createdAt: timeAgo(390) })
  await createMessage(roomMD.id, david, 'I\'ll take a look this afternoon. Low-grade or high-grade suspicion?', { createdAt: timeAgo(385) })

  // ── 5. Group Chat: "Cardiology Study Group" ──────────────────────────────
  log('GroupChat', 'Creating "Cardiology Study Group"...')

  const cardioGroup = await db.chatRoom.create({
    data: {
      type: 'group',
      name: 'Cardiology Study Group',
      avatar: '❤️',
      description: 'Weekly study sessions for cardiology residents and enthusiasts',
      createdBy: sarah,
      lastMessageAt: timeAgo(5),
      members: {
        create: [
          { userId: sarah, role: 'admin',  lastReadAt: timeAgo(3) },
          { userId: james, role: 'admin',  lastReadAt: timeAgo(10) },
          { userId: priya, role: 'member', lastReadAt: timeAgo(20) },
          { userId: lucas, role: 'member', lastReadAt: timeAgo(15) },
          { userId: marco, role: 'member', lastReadAt: timeAgo(30) },
        ],
      },
    },
  })
  log('GroupChat', `  ✓ Created group room ${cardioGroup.id}`)

  // Messages in Cardiology Study Group
  await createMessage(cardioGroup.id, sarah, 'Welcome to the Cardiology Study Group! 🫀 Let\'s use this space to discuss cases, share resources, and prep for boards.', { createdAt: timeAgo(1440) })

  // System message
  await createMessage(cardioGroup.id, sarah, 'James Wilson was promoted to admin', { type: 'system', createdAt: timeAgo(1430) })

  await createMessage(cardioGroup.id, james, 'Thanks for setting this up, Sarah! I\'ll share my ECG flashcard deck tomorrow.', { createdAt: timeAgo(1400) })
  await createMessage(cardioGroup.id, priya, 'Excited to join! I have some interesting pediatric cardiology cases to share.', { createdAt: timeAgo(1380) })
  await createMessage(cardioGroup.id, lucas, 'Can we also cover anti-arrhythmic drugs? The Vaughan-Williams classification always confuses me.', { createdAt: timeAgo(1360) })

  // Pinned: study schedule
  const cardioPinned1 = await createMessage(cardioGroup.id, sarah, '📌 **Weekly Schedule:**\n• Monday: ECG Interpretation\n• Wednesday: Pharmacology Review\n• Friday: Case Discussion\n• Sunday: Practice Questions', { isPinned: true, createdAt: timeAgo(1300) })

  await createMessage(cardioGroup.id, marco, 'Count me in for the case discussions! Surgery-cardio crossover cases are my jam.', { createdAt: timeAgo(1200) })
  await createMessage(cardioGroup.id, james, 'Quick question — what\'s the mechanism behind digoxin toxicity causing hyperkalemia?', { createdAt: timeAgo(180) })

  // Reply to the digoxin question
  const cardioMsg_reply = await createMessage(cardioGroup.id, sarah, 'Digoxin inhibits the Na+/K+ ATPase pump. When it\'s severely inhibited, K+ can\'t enter cells → hyperkalemia. It\'s also why hypokalemia increases dig toxicity — less K+ competing with digoxin for the pump binding site.', { createdAt: timeAgo(170) })

  await createMessage(cardioGroup.id, lucas, 'Great explanation! And that\'s why we monitor potassium closely in patients on digoxin.', { replyToId: cardioMsg_reply.id, createdAt: timeAgo(165) })

  // Voice message in group
  await createMessage(cardioGroup.id, priya, '🎤 Voice message (1:23)', { type: 'text', metadata: JSON.stringify({ isVoice: true, duration: 83, audioUrl: '/uploads/voice/peds-cardio-case.webm' }), createdAt: timeAgo(100) })

  await createMessage(cardioGroup.id, james, 'Thanks Priya — that case sounds fascinating!', { createdAt: timeAgo(90) })

  // Another pinned message
  const cardioPinned2 = await createMessage(cardioGroup.id, sarah, '📌 **Key Resource:** ACC/AHA 2023 Guidelines — https://medq.app/resources/acc-aha-2023', { isPinned: true, createdAt: timeAgo(60) })

  // System message: member joined
  await createMessage(cardioGroup.id, sarah, 'Aisha Mohammed joined the group', { type: 'system', createdAt: timeAgo(30) })

  await createMessage(cardioGroup.id, marco, 'Anyone up for a practice quiz tonight? I can host a speed quiz session.', { createdAt: timeAgo(10) })
  await createMessage(cardioGroup.id, sarah, 'I\'m in! Let\'s do it at 8 PM?', { createdAt: timeAgo(5) })

  // Update pinned messages for cardio group
  await db.chatRoom.update({
    where: { id: cardioGroup.id },
    data: { pinnedMessageIds: JSON.stringify([cardioPinned1.id, cardioPinned2.id]) },
  })

  // ── 6. Group Chat: "Exam Prep Team" ──────────────────────────────────────
  log('GroupChat', 'Creating "Exam Prep Team"...')

  const examGroup = await db.chatRoom.create({
    data: {
      type: 'group',
      name: 'Exam Prep Team',
      avatar: '📝',
      description: 'Final exam preparation — all specialties welcome',
      createdBy: emma,
      lastMessageAt: timeAgo(15),
      members: {
        create: [
          { userId: emma,   role: 'admin',  lastReadAt: timeAgo(10) },
          { userId: david,  role: 'admin',  lastReadAt: timeAgo(20) },
          { userId: aisha,  role: 'member', lastReadAt: timeAgo(30) },
          { userId: marco,  role: 'member', lastReadAt: timeAgo(25) },
          { userId: priya,  role: 'member', lastReadAt: timeAgo(40) },
        ],
      },
    },
  })
  log('GroupChat', `  ✓ Created group room ${examGroup.id}`)

  // Messages in Exam Prep Team
  await createMessage(examGroup.id, emma, 'Hey everyone! 🎓 Final exams are in 3 weeks. Let\'s get organized!', { createdAt: timeAgo(2000) })

  // System message
  await createMessage(examGroup.id, emma, 'David Okafor was promoted to admin', { type: 'system', createdAt: timeAgo(1990) })

  await createMessage(examGroup.id, david, 'I\'ve made a pathology high-yield summary. I\'ll share it here.', { createdAt: timeAgo(1980) })

  // Pinned study plan
  const examPinned1 = await createMessage(examGroup.id, emma, '📌 **Exam Prep Plan:**\n• Week 1: Systems Review (Cardio, Pulm, GI)\n• Week 2: Systems Review (Neuro, Renal, Endo)\n• Week 3: Practice Exams & Weak Areas', { isPinned: true, createdAt: timeAgo(1950) })

  await createMessage(examGroup.id, aisha, 'Great plan! I can cover OB/GYN and reproductive endocrinology.', { createdAt: timeAgo(1900) })
  await createMessage(examGroup.id, marco, 'I\'ll handle surgical topics and trauma protocols.', { createdAt: timeAgo(1850) })
  await createMessage(examGroup.id, priya, 'Pediatrics and developmental milestones — I\'m on it! 🧒', { createdAt: timeAgo(1800) })

  const examMsg_q = await createMessage(examGroup.id, david, 'Quick review question: What\'s the most common cause of membranous nephropathy in adults?', { createdAt: timeAgo(200) })

  await createMessage(examGroup.id, aisha, 'Is it hepatitis B? No wait... phospholipase A2 receptor antibodies!', { replyToId: examMsg_q.id, createdAt: timeAgo(195) })

  await createMessage(examGroup.id, david, 'Spot on, Aisha! 🎯 Primary MN is associated with anti-PLA2R antibodies in ~70% of cases.', { createdAt: timeAgo(190) })

  await createMessage(examGroup.id, emma, 'For psych — remember the SIGECAPS mnemonic for major depressive disorder criteria: Sleep, Interest, Guilt, Energy, Concentration, Appetite, Psychomotor, Suicidality.', { createdAt: timeAgo(120) })

  // Voice message
  await createMessage(examGroup.id, marco, '🎤 Voice message (0:55)', { type: 'text', metadata: JSON.stringify({ isVoice: true, duration: 55, audioUrl: '/uploads/voice/trauma-review.webm' }), createdAt: timeAgo(80) })

  // Pinned resource
  const examPinned2 = await createMessage(examGroup.id, emma, '📌 **Shared Resources:**\n• Pathology deck: https://medq.app/deck/path-high-yield\n• Pharm cheat sheet: https://medq.app/sheets/pharm\n• Practice exams: https://medq.app/exams/mock-final', { isPinned: true, createdAt: timeAgo(45) })

  await createMessage(examGroup.id, priya, 'Just did a 50-question practice set — scored 82%! 🎉', { createdAt: timeAgo(30) })
  await createMessage(examGroup.id, marco, 'Nice! I\'m at 76% — need to review GI more.', { createdAt: timeAgo(20) })
  await createMessage(examGroup.id, david, 'Keep at it! The pathology questions in the mock exam are tricky.', { createdAt: timeAgo(15) })

  // Update pinned messages for exam group
  await db.chatRoom.update({
    where: { id: examGroup.id },
    data: { pinnedMessageIds: JSON.stringify([examPinned1.id, examPinned2.id]) },
  })

  // ── Extra: Poll, Attachment, Call Log messages ──────────────────────────
  log('ChatData', 'Creating poll, attachment, and call log messages...')

  // Poll message in Cardiology Study Group with some votes
  await createMessage(cardioGroup.id, sarah, 'Which ECG finding is most concerning for acute MI?', {
    type: 'poll',
    metadata: JSON.stringify({
      question: 'Which ECG finding is most concerning for acute MI?',
      options: ['ST elevation in 2+ contiguous leads', 'New left bundle branch block', 'T wave inversions', 'Prolonged QT interval'],
      anonymous: false,
      multipleChoice: false,
      votes: {
        '0': [james, lucas],
        '1': [priya],
        '2': [marco],
        '3': [],
      },
    }),
    createdAt: timeAgo(45),
  })

  // Image attachment message in Cardiology Study Group
  await createMessage(cardioGroup.id, priya, 'ECG from the pediatric case today', {
    type: 'image',
    metadata: JSON.stringify({
      attachments: [{
        url: 'https://placehold.co/600x400/1e2130/e8ecf4?text=ECG+Sample',
        fileName: 'pediatric-ecg.png',
        fileSize: 245000,
        fileType: 'image',
        mimeType: 'image/png',
        caption: 'ECG from the pediatric case today',
      }],
    }),
    createdAt: timeAgo(35),
  })

  // File attachment message in Cardiology Study Group
  await createMessage(cardioGroup.id, james, 'ACC/AHA 2023 Guidelines Summary', {
    type: 'file',
    metadata: JSON.stringify({
      attachments: [{
        url: '/uploads/chat/sample-guidelines.pdf',
        fileName: 'acc-aha-2023-guidelines-summary.pdf',
        fileSize: 1843200,
        fileType: 'file',
        mimeType: 'application/pdf',
        caption: 'Key highlights from the updated guidelines',
      }],
    }),
    createdAt: timeAgo(25),
  })

  // Call log message in Cardiology Study Group
  await createMessage(cardioGroup.id, sarah, 'Voice Call · 5:23', {
    type: 'call',
    metadata: JSON.stringify({ callType: 'voice', duration: 323, status: 'completed' }),
    createdAt: timeAgo(15),
  })

  // Quiz poll in Exam Prep Team
  await createMessage(examGroup.id, david, 'Which antibody is most specific for membranous nephropathy?', {
    type: 'poll',
    metadata: JSON.stringify({
      question: 'Which antibody is most specific for membranous nephropathy?',
      options: ['ANA', 'Anti-PLA2R', 'ANCA', 'Anti-GBM', 'Anti-dsDNA'],
      anonymous: false,
      multipleChoice: false,
      isQuiz: true,
      correctOption: 1,
      votes: {
        '0': [marco],
        '1': [aisha, emma],
        '3': [priya],
      },
    }),
    createdAt: timeAgo(50),
  })

  // Missed call log in direct chat
  await createMessage(roomSJ.id, james, 'Missed Voice Call', {
    type: 'call',
    metadata: JSON.stringify({ callType: 'voice', duration: 0, status: 'missed' }),
    createdAt: timeAgo(40),
  })

  log('ChatData', 'Poll, attachment, and call log messages created.')

  log('ChatData', 'All rooms and messages created successfully.')
}

// ─── Run ─────────────────────────────────────────────────────────────────────

main()
  .catch((err) => {
    console.error('\n❌ Seed script failed:', err)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
