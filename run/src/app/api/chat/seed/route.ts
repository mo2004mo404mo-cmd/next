import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// POST /api/chat/seed - Seed demo friendships, chat rooms, and messages (ENRICHED)
export async function POST() {
  try {
    // Find all demo users
    const student = await db.user.findUnique({ where: { email: 'student@medq.com' } });
    const educator = await db.user.findUnique({ where: { email: 'educator@medq.com' } });
    const admin = await db.user.findUnique({ where: { email: 'admin@medq.com' } });
    const sarah = await db.user.findUnique({ where: { email: 'sarah@medq.com' } });
    const ahmed = await db.user.findUnique({ where: { email: 'ahmed@medq.com' } });
    const priya = await db.user.findUnique({ where: { email: 'priya@medq.com' } });
    const james = await db.user.findUnique({ where: { email: 'james@medq.com' } });
    const maria = await db.user.findUnique({ where: { email: 'maria@medq.com' } });

    if (!student || !educator || !admin) {
      return NextResponse.json({ error: 'Core demo users not found. Run /api/seed-demo first.' }, { status: 400 });
    }

    const allUsers = [student, educator, admin, sarah, ahmed, priya, james, maria].filter(Boolean) as { id: string; name: string | null }[];
    const results = { friendships: 0, directRooms: 0, directMessages: 0, groupRooms: 0, groupMessages: 0, reactions: 0, systemMessages: 0, pollMessages: 0, pinnedMessages: 0, skipped: [] as string[] };

    // ═══════════════════════════════════════════════════════════
    // 1. Create Friendships (all accepted, every pair)
    // ═══════════════════════════════════════════════════════════
    const coreFriendships = [
      { senderId: student.id, receiverId: educator.id },
      { senderId: student.id, receiverId: admin.id },
      { senderId: educator.id, receiverId: admin.id },
    ];

    const extendedFriendships: { senderId: string; receiverId: string }[] = [];
    if (sarah) {
      extendedFriendships.push(
        { senderId: student.id, receiverId: sarah.id },
        { senderId: educator.id, receiverId: sarah.id },
        { senderId: sarah.id, receiverId: admin.id },
      );
    }
    if (ahmed) {
      extendedFriendships.push(
        { senderId: student.id, receiverId: ahmed.id },
        { senderId: educator.id, receiverId: ahmed.id },
        { senderId: ahmed.id, receiverId: admin.id },
      );
    }
    if (priya) {
      extendedFriendships.push(
        { senderId: student.id, receiverId: priya.id },
        { senderId: priya.id, receiverId: educator.id },
        { senderId: priya.id, receiverId: admin.id },
      );
    }
    if (james) {
      extendedFriendships.push(
        { senderId: james.id, receiverId: student.id },
        { senderId: james.id, receiverId: educator.id },
        { senderId: james.id, receiverId: admin.id },
      );
    }
    if (maria) {
      extendedFriendships.push(
        { senderId: maria.id, receiverId: student.id },
        { senderId: maria.id, receiverId: educator.id },
        { senderId: maria.id, receiverId: admin.id },
      );
    }
    if (sarah && ahmed) extendedFriendships.push({ senderId: sarah.id, receiverId: ahmed.id });
    if (sarah && priya) extendedFriendships.push({ senderId: sarah.id, receiverId: priya.id });
    if (ahmed && james) extendedFriendships.push({ senderId: ahmed.id, receiverId: james.id });
    if (priya && maria) extendedFriendships.push({ senderId: priya.id, receiverId: maria.id });
    if (james && sarah) extendedFriendships.push({ senderId: james.id, receiverId: sarah.id });
    if (maria && ahmed) extendedFriendships.push({ senderId: maria.id, receiverId: ahmed.id });

    const allFriendships = [...coreFriendships, ...extendedFriendships];

    for (const pair of allFriendships) {
      try {
        await db.friendship.upsert({
          where: { senderId_receiverId: { senderId: pair.senderId, receiverId: pair.receiverId } },
          update: { status: 'accepted' },
          create: { senderId: pair.senderId, receiverId: pair.receiverId, status: 'accepted' },
        });
        results.friendships++;
      } catch {
        results.skipped.push(`friendship ${pair.senderId}->${pair.receiverId}`);
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 2. Create Direct Chat Rooms with sample messages
    // ═══════════════════════════════════════════════════════════
    interface SeedMessage {
      senderId: string;
      content: string;
      type?: string;
      metadata?: any;
      isPinned?: boolean;
      replyToIndex?: number; // index of message to reply to in the same array
      minutesAgo?: number; // absolute timestamp offset from now
    }

    const directPairs: { user1: { id: string; name: string | null }; user2: { id: string; name: string | null }; messages: SeedMessage[] }[] = [
      { user1: student, user2: educator, messages: [
        { senderId: student.id, content: "Hey! How's your cardiology revision going?", minutesAgo: 7 * 24 * 60 },
        { senderId: educator.id, content: "Pretty good! Just finished reviewing the cardiac cycle. The Wiggers diagram finally makes sense 😅", minutesAgo: 7 * 24 * 60 - 3 },
        { senderId: student.id, content: "The mnemonics for the cranial nerves are finally sticking!", minutesAgo: 5 * 24 * 60 + 120 },
        { senderId: educator.id, content: "Oh nice! 'Oh Oh Oh To Touch And Feel Very Good Velvet, AH!' never fails 😂", minutesAgo: 5 * 24 * 60 + 115 },
        { senderId: student.id, content: "Have you tried the new practice questions on pharmacology?", minutesAgo: 3 * 24 * 60 + 60 },
        { senderId: educator.id, content: "Yes! The ones on autonomic drugs are really well made. Great for USMLE prep.", minutesAgo: 3 * 24 * 60 + 55 },
        { senderId: student.id, content: "That clinical case simulator is really helpful for differential diagnosis", minutesAgo: 2 * 24 * 60 },
        { senderId: educator.id, content: "Definitely. The branching logic really makes you think through the decision tree", minutesAgo: 2 * 24 * 60 - 5 },
        { senderId: student.id, content: "Quick question: what's the mechanism of action of aspirin again?", minutesAgo: 45 },
        { senderId: educator.id, content: "Irreversibly inhibits COX-1, reducing thromboxane A2 production → decreased platelet aggregation. Remember: it's COX-1 selective at low doses!", minutesAgo: 40, isPinned: true },
        { senderId: student.id, content: "That's right! Low dose = antiplatelet, high dose = anti-inflammatory. Thanks! 🙏", minutesAgo: 35 },
      ]},
      { user1: student, user2: admin, messages: [
        { senderId: admin.id, content: "Welcome to MedQ! Let me know if you need any help getting started 🏥", minutesAgo: 6 * 24 * 60 },
        { senderId: student.id, content: "Thanks! The platform looks amazing. Love the flashcard spaced repetition feature!", minutesAgo: 6 * 24 * 60 - 10 },
        { senderId: admin.id, content: "Glad you like it! We're adding new features every week", minutesAgo: 4 * 24 * 60 },
        { senderId: student.id, content: "I noticed the study planner is really useful for organizing my exam prep", minutesAgo: 4 * 24 * 60 - 5 },
        { senderId: admin.id, content: "That's one of our most popular features. Have you tried the daily challenge?", minutesAgo: 2 * 24 * 60 },
        { senderId: student.id, content: "Not yet, but I'll definitely check it out today!", minutesAgo: 30 },
      ]},
      { user1: educator, user2: admin, messages: [
        { senderId: admin.id, content: "Dr. Educator, your question submissions have been excellent! 🌟", minutesAgo: 5 * 24 * 60 },
        { senderId: educator.id, content: "Thank you! I try to make them clinically relevant and challenging", minutesAgo: 5 * 24 * 60 - 15 },
        { senderId: admin.id, content: "The students are really engaging with your cardiology questions in particular", minutesAgo: 3 * 24 * 60 },
        { senderId: educator.id, content: "That's great to hear. I'm working on a new set for respiratory physiology next", minutesAgo: 3 * 24 * 60 - 10 },
        { senderId: admin.id, content: "Looking forward to it! Your explanations are always top-notch", minutesAgo: 1 * 24 * 60 },
        { senderId: educator.id, content: "I believe good explanations are just as important as the questions themselves", minutesAgo: 1 * 24 * 60 - 5 },
      ]},
    ];

    // Add direct chats for new users
    if (sarah) {
      directPairs.push(
        { user1: student, user2: sarah, messages: [
          { senderId: sarah.id, content: "Hey! I saw you're studying cardiology too. Want to review together?", minutesAgo: 4 * 24 * 60 },
          { senderId: student.id, content: "That would be great! I'm struggling with ECG interpretation 😅", minutesAgo: 4 * 24 * 60 - 10 },
          { senderId: sarah.id, content: "ECG is all about pattern recognition. Try the 1-2-3 rule for MI localization", minutesAgo: 3 * 24 * 60 },
          { senderId: student.id, content: "That's helpful! I'll practice with the cardiology question bank", minutesAgo: 2 * 24 * 60 },
          { senderId: sarah.id, content: "The neuroanatomy questions are my favorite. The brain pathways are like a maze 🧠", minutesAgo: 20 },
        ]},
        { user1: educator, user2: sarah, messages: [
          { senderId: educator.id, content: "Sarah, your neurology knowledge is impressive! Have you considered creating some questions?", minutesAgo: 3 * 24 * 60 },
          { senderId: sarah.id, content: "I'd love to! I have some great clinical vignettes from my neurology rotation", minutesAgo: 3 * 24 * 60 - 5 },
          { senderId: educator.id, content: "Perfect! The platform could use more neuro questions. Especially stroke localization", minutesAgo: 2 * 24 * 60 },
        ]},
      );
    }
    if (ahmed) {
      directPairs.push(
        { user1: student, user2: ahmed, messages: [
          { senderId: ahmed.id, content: "Salaam! I heard you're prepping for exams. How's it going?", minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: "Hey Dr. Ahmed! Going well, but emergency medicine always catches me off guard", minutesAgo: 5 * 24 * 60 - 10 },
          { senderId: ahmed.id, content: "EM is all about ABCDE - Airway, Breathing, Circulation, Disability, Exposure. Always start there!", minutesAgo: 3 * 24 * 60, isPinned: true },
          { senderId: student.id, content: "That's a great reminder. The triage scenarios are tricky though", minutesAgo: 2 * 24 * 60 },
          { senderId: ahmed.id, content: "Practice makes perfect. I'll try to add more EM questions to the bank 🚑", minutesAgo: 15 },
        ]},
      );
    }
    if (priya) {
      directPairs.push(
        { user1: student, user2: priya, messages: [
          { senderId: priya.id, content: "Hi! I love your study notes on the platform. Very organized!", minutesAgo: 4 * 24 * 60 },
          { senderId: student.id, content: "Thanks Priya! Your mnemonics for pediatric milestones are lifesavers 🙏", minutesAgo: 4 * 24 * 60 - 10 },
          { senderId: priya.id, content: "Haha thanks! I have a whole collection. Want to trade mnemonics?", minutesAgo: 2 * 24 * 60 },
          { senderId: student.id, content: "Absolutely! I'll share my cardio ones for your peds ones", minutesAgo: 10 },
        ]},
      );
    }
    if (james) {
      directPairs.push(
        { user1: student, user2: james, messages: [
          { senderId: james.id, content: "Greetings from Edinburgh! How's the USMLE prep going?", minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: "Hey James! Slowly but surely. How about PLAB?", minutesAgo: 5 * 24 * 60 - 15 },
          { senderId: james.id, content: "Making progress! The surgical questions are my strong suit", minutesAgo: 3 * 24 * 60 },
          { senderId: student.id, content: "Lucky you! Surgery always confuses me with all the different approaches", minutesAgo: 25 },
        ]},
      );
    }
    if (maria) {
      directPairs.push(
        { user1: student, user2: maria, messages: [
          { senderId: maria.id, content: "Olá! 👋 I'm Maria, OB/GYN enthusiast from Brazil!", minutesAgo: 6 * 24 * 60 },
          { senderId: student.id, content: "Hi Maria! Welcome to MedQ! OB/GYN is fascinating", minutesAgo: 6 * 24 * 60 - 10 },
          { senderId: maria.id, content: "It really is! Especially fetal development - it's like watching a miracle unfold 👶", minutesAgo: 4 * 24 * 60 },
          { senderId: student.id, content: "Any tips for remembering the stages of labor?", minutesAgo: 2 * 24 * 60 },
          { senderId: maria.id, content: "Stage 1: dilation, Stage 2: delivery, Stage 3: placenta. Think 'DDP' like a dance move! 💃", minutesAgo: 5 },
        ]},
      );
    }

    for (const pair of directPairs) {
      // Check if direct room already exists between these two users
      const existingRoom = await db.chatRoom.findFirst({
        where: {
          type: 'direct',
          members: {
            every: { userId: { in: [pair.user1.id, pair.user2.id] } },
          },
        },
      });

      if (existingRoom) {
        results.skipped.push(`direct room ${pair.user1.name}-${pair.user2.name}`);
        continue;
      }

      // Create direct room
      const room = await db.chatRoom.create({
        data: {
          type: 'direct',
          lastMessageAt: new Date(),
          members: {
            create: [
              { userId: pair.user1.id, role: 'member' },
              { userId: pair.user2.id, role: 'member' },
            ],
          },
        },
      });

      results.directRooms++;

      // Create sample messages with varied timestamps
      const now = Date.now();
      const createdMsgIds: string[] = [];
      for (let i = 0; i < pair.messages.length; i++) {
        const msg = pair.messages[i];
        const minutesAgo = msg.minutesAgo ?? (pair.messages.length - i) * 5;
        const timestamp = new Date(now - minutesAgo * 60 * 1000);
        const replyToId = msg.replyToIndex !== undefined ? createdMsgIds[msg.replyToIndex] : null;
        const created = await db.chatMessage.create({
          data: {
            roomId: room.id,
            senderId: msg.senderId,
            content: msg.content,
            type: msg.type || 'text',
            metadata: JSON.stringify(msg.metadata || {}),
            isPinned: msg.isPinned || false,
            replyToId,
            createdAt: timestamp,
          },
        });
        createdMsgIds.push(created.id);
        results.directMessages++;
        if (msg.isPinned) results.pinnedMessages++;
      }

      // Update lastMessageAt to match the most recent message
      const lastMinutesAgo = pair.messages[pair.messages.length - 1]?.minutesAgo ?? 5;
      await db.chatRoom.update({
        where: { id: room.id },
        data: { lastMessageAt: new Date(now - lastMinutesAgo * 60 * 1000) },
      });

      // Set different lastReadAt for members
      // Student reads some chats recently, others days ago
      const studentMember = await db.chatRoomMember.findUnique({
        where: { roomId_userId: { roomId: room.id, userId: student.id } },
      });
      if (studentMember) {
        // Read half the conversations recently, others less recently
        const readOffset = results.directRooms % 2 === 0 ? 60 : 3 * 24 * 60; // alternate between recent and days ago
        await db.chatRoomMember.update({
          where: { id: studentMember.id },
          data: { lastReadAt: new Date(now - readOffset * 60 * 1000) },
        });
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 3. Create Group Chat Rooms (ENRICHED)
    // ═══════════════════════════════════════════════════════════

    const groupMemberIds = allUsers.map(u => u.id);

    const groupRooms: {
      name: string;
      avatar: string;
      description: string;
      createdBy: string;
      messages: SeedMessage[];
    }[] = [
      {
        name: 'Cardio Study Group',
        avatar: '🫀',
        description: 'Cardiovascular system study discussions',
        createdBy: educator.id,
        messages: [
          { senderId: educator.id, content: 'Welcome to the Cardio Study Group! 💪', minutesAgo: 7 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'Just finished reviewing the cardiac cycle - the Wiggers diagram finally makes sense', minutesAgo: 6 * 24 * 60 + 120 },
          { senderId: student.id, content: "Remember: S1 = AV valves closing, S2 = Semilunar valves closing", minutesAgo: 6 * 24 * 60 + 60 },
          { senderId: admin.id, content: "Great mnemonic! I always add: S1 = 'Mitral Tricuspid' (lub), S2 = 'Aortic Pulmonic' (dub)", minutesAgo: 6 * 24 * 60 },
          ...(sarah ? [{ senderId: sarah.id, content: "From a neuro perspective - remember the cardiac reflexes! The vagus nerve is key 🧠", minutesAgo: 5 * 24 * 60 + 180 }] : []),
          { senderId: educator.id, content: 'Can someone explain the difference between preload and afterload?', minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: 'Preload = ventricular stretch at end of diastole (volume). Afterload = resistance the ventricle must overcome to eject blood', minutesAgo: 5 * 24 * 60 - 10, replyToIndex: 5 },
          { senderId: admin.id, content: "Think of preload as how much you're stretching a rubber band. Afterload is how heavy the door is that you're pushing open", minutesAgo: 4 * 24 * 60 + 60 },
          ...(ahmed ? [{ senderId: ahmed.id, content: "In the ER, we always check afterload first in heart failure patients - it's the most actionable parameter 🚑", minutesAgo: 4 * 24 * 60, replyToIndex: 5 }] : []),
          { senderId: educator.id, content: 'Perfect analogy! 🔥 Frank-Starling law relates preload to stroke volume', minutesAgo: 3 * 24 * 60 },
          { senderId: student.id, content: "Don't forget: increased afterload → decreased stroke volume → increased O2 demand → worse heart failure", minutesAgo: 3 * 24 * 60 - 30, isPinned: true },
          { senderId: admin.id, content: 'Pro tip: the best way to remember cardiac output = HR × SV, and SV = EDV - ESV', minutesAgo: 2 * 24 * 60 },
          // Poll message
          { senderId: educator.id, content: 'Which artery is most commonly occluded in MI?', minutesAgo: 1 * 24 * 60, type: 'poll', metadata: { poll: { question: 'Which artery is most commonly occluded in MI?', options: ['LAD', 'RCA', 'LCx', 'PDA'], isMultiChoice: false, isAnonymous: false, votes: { '0': [student.id, ahmed?.id].filter(Boolean), '1': [sarah?.id].filter(Boolean), '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'LAD is the correct answer! Also known as the "widowmaker" when proximal 🫀', minutesAgo: 1 * 24 * 60 - 30 },
          { senderId: educator.id, content: 'Exactly! The LAD supplies ~50% of the left ventricle. Proximal occlusion = poor prognosis', minutesAgo: 45 },
          { senderId: student.id, content: 'Thanks for the great discussion everyone! 🎉', minutesAgo: 5 },
        ],
      },
      {
        name: 'MedQ General',
        avatar: '🏥',
        description: 'General medical discussions',
        createdBy: admin.id,
        messages: [
          { senderId: admin.id, content: 'Welcome to MedQ General! 🏥 This is the place for all medical education discussions', minutesAgo: 7 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'Happy to be here! Looking forward to great discussions', minutesAgo: 7 * 24 * 60 - 30 },
          { senderId: student.id, content: 'Excited to learn from everyone! 🎓', minutesAgo: 6 * 24 * 60 + 180 },
          ...(sarah ? [{ senderId: sarah.id, content: "Hello everyone! Neuro nerd here - ask me anything about the brain! 🧠", minutesAgo: 6 * 24 * 60 + 120 }] : []),
          ...(ahmed ? [{ senderId: ahmed.id, content: "Salaam everyone! EM doc from Cairo. Quick thinking saves lives! ⚡", minutesAgo: 6 * 24 * 60 + 60 }] : []),
          ...(priya ? [{ senderId: priya.id, content: "Namaste! 🙏 Pediatrics is my passion. Let's make learning fun!", minutesAgo: 6 * 24 * 60 }] : []),
          ...(james ? [{ senderId: james.id, content: "Cheers from Edinburgh! Surgery is my game 🔪", minutesAgo: 5 * 24 * 60 + 180 }] : []),
          ...(maria ? [{ senderId: maria.id, content: "Olá from São Paulo! OB/GYN all the way! 👶", minutesAgo: 5 * 24 * 60 + 120 }] : []),
          { senderId: admin.id, content: "Fun fact: The average human body contains about 5 liters of blood, and the heart pumps all of it through the body once every minute!", minutesAgo: 5 * 24 * 60 },
          { senderId: educator.id, content: "Speaking of blood - anyone else find the coagulation cascade the hardest thing to memorize?", minutesAgo: 4 * 24 * 60 },
          { senderId: student.id, content: "The intrinsic pathway is the worst 😭 But 'Ten is In' (X→intrinsic) helps me remember", minutesAgo: 4 * 24 * 60 - 20, replyToIndex: 9 },
          { senderId: admin.id, content: "My tip: Focus on the common pathway from Factor X onwards - that's where most exam questions hit", minutesAgo: 3 * 24 * 60, isPinned: true },
          { senderId: educator.id, content: "True! And warfarin affects the vitamin K-dependent factors: 2, 7, 9, 10 (remember: 1942 → 'War of 1942')", minutesAgo: 2 * 24 * 60 },
          { senderId: student.id, content: "That's a great mnemonic! I'll add that to my flashcards 📝", minutesAgo: 1 * 24 * 60 },
          // Poll
          { senderId: admin.id, content: 'Which coagulation factor has the shortest half-life?', minutesAgo: 30, type: 'poll', metadata: { poll: { question: 'Which coagulation factor has the shortest half-life?', options: ['Factor II', 'Factor VII', 'Factor IX', 'Factor X'], isMultiChoice: false, isAnonymous: false, votes: { '0': [], '1': [student.id, educator.id], '2': [], '3': [] } }, reactions: [] } },
          { senderId: educator.id, content: 'Factor VII has the shortest half-life (~6 hours). That\'s why INR rises first with warfarin!', minutesAgo: 20, replyToIndex: 13 },
          { senderId: student.id, content: 'Makes sense! That\'s why bridge therapy with heparin is needed 🧬', minutesAgo: 5 },
        ],
      },
      {
        name: 'Neuro Study Group',
        avatar: '🧠',
        description: 'Neurology and neuroanatomy discussions',
        createdBy: sarah?.id || educator.id,
        messages: [
          { senderId: sarah?.id || educator.id, content: 'Welcome to the Neuro Study Group! 🧠 Where the brain is the main focus!', minutesAgo: 6 * 24 * 60, type: 'system' },
          { senderId: sarah?.id || student.id, content: "Let's start with cranial nerves - who has the best mnemonic?", minutesAgo: 6 * 24 * 60 - 10 },
          { senderId: student.id, content: "Oh Oh Oh To Touch And Feel Very Good Velvet, AH! for CN I-XII", minutesAgo: 5 * 24 * 60 + 180, isPinned: true },
          { senderId: sarah?.id || educator.id, content: "For nuclei: 'Messy Marge Serves Visiting Vendors Lemon And Ham' = Mesencephalic, Main, Spinal, Visceral, Ventral, Lateral, Alar, Horn", minutesAgo: 5 * 24 * 60 },
          { senderId: educator.id, content: "Don't forget: CN III, IV, VI control eye movements. CN IV is the only one that exits dorsally!", minutesAgo: 4 * 24 * 60 },
          { senderId: student.id, content: "And CN IV (trochlear) innervates the superior oblique - 'you troch on the side of your nose'", minutesAgo: 4 * 24 * 60 - 30, replyToIndex: 4 },
          { senderId: sarah?.id || educator.id, content: "Stroke localization is crucial for exams. MCA = face + arm, ACA = leg, PCA = visual", minutesAgo: 3 * 24 * 60, isPinned: true },
          { senderId: educator.id, content: "Great point! And always remember: same-side weakness, opposite-side lesion (for motor cortex)", minutesAgo: 2 * 24 * 60 },
          // Poll
          { senderId: sarah?.id || educator.id, content: 'Which cranial nerve is most commonly affected in Bell\'s palsy?', minutesAgo: 1 * 24 * 60, type: 'poll', metadata: { poll: { question: "Which cranial nerve is most commonly affected in Bell's palsy?", options: ['CN V (Trigeminal)', 'CN VII (Facial)', 'CN IX (Glossopharyngeal)', 'CN XII (Hypoglossal)'], isMultiChoice: false, isAnonymous: false, votes: { '0': [], '1': [student.id, educator.id, ahmed?.id].filter(Boolean), '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'CN VII of course! It\'s a lower motor neuron lesion of the facial nerve 🧠', minutesAgo: 30 },
          { senderId: educator.id, content: 'Correct! Remember: UMN spares the forehead (bilateral cortical representation), LMN affects entire ipsilateral face', minutesAgo: 10 },
        ],
      },
      {
        name: 'Emergency Medicine',
        avatar: '🚑',
        description: 'Emergency medicine cases and discussions',
        createdBy: ahmed?.id || educator.id,
        messages: [
          { senderId: ahmed?.id || educator.id, content: 'Welcome to EM Cases! 🚑 Real scenarios, real decisions', minutesAgo: 5 * 24 * 60, type: 'system' },
          { senderId: ahmed?.id || educator.id, content: "Case: 55yo M, chest pain, diaphoretic. What's your first step?", minutesAgo: 5 * 24 * 60 - 10 },
          { senderId: student.id, content: "ABCs first! Then ECG within 10 minutes", minutesAgo: 4 * 24 * 60 + 120, replyToIndex: 1 },
          { senderId: ahmed?.id || educator.id, content: "Correct! Time is muscle. MONA = Morphine, Oxygen, Nitro, Aspirin", minutesAgo: 4 * 24 * 60 },
          { senderId: educator.id, content: "Actually, current guidelines de-emphasize morphine. Focus on dual antiplatelet therapy and PCI", minutesAgo: 3 * 24 * 60 },
          { senderId: ahmed?.id || educator.id, content: "Great update! Evidence-based medicine matters. Always check the latest guidelines", minutesAgo: 3 * 24 * 60 - 20, replyToIndex: 4 },
          { senderId: student.id, content: "What about the HEART score for chest pain risk stratification?", minutesAgo: 2 * 24 * 60 },
          { senderId: ahmed?.id || educator.id, content: "Excellent! H-History, E-ECG, A-Age, R-Risk factors, T-Troponin. Score 0-3 = low risk, 4-6 = observe, 7-10 = intervene", minutesAgo: 2 * 24 * 60 - 30, isPinned: true },
          { senderId: educator.id, content: 'Another EM pearl: in trauma, always check for ABCDE then do a secondary survey. Don\'t get distracted by obvious injuries!', minutesAgo: 1 * 24 * 60 },
          // Poll
          { senderId: ahmed?.id || educator.id, content: 'What is the most common presentation of aortic dissection?', minutesAgo: 3 * 60, type: 'poll', metadata: { poll: { question: 'What is the most common presentation of aortic dissection?', options: ['Tearing chest pain radiating to back', 'Crushing substernal chest pain', 'Sharp pleuritic chest pain', 'Dyspnea with hemoptysis'], isMultiChoice: false, isAnonymous: false, votes: { '0': [student.id, educator.id], '1': [], '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'Tearing pain radiating to the back! Classic Stanford Type A presentation 🚑', minutesAgo: 1 * 60 },
        ],
      },
      // ═══════════ NEW GROUP ROOMS ═══════════
      {
        name: 'Pathology Club',
        avatar: '🔬',
        description: 'Pathology discussions with slide descriptions and case correlations',
        createdBy: educator.id,
        messages: [
          { senderId: educator.id, content: 'Welcome to Pathology Club! 🔬 Where every slide tells a story', minutesAgo: 7 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'Let\'s start with the basics: inflammation! Remember the 5 cardinal signs - rubor (redness), tumor (swelling), calor (heat), dolor (pain), functio laesa (loss of function)', minutesAgo: 6 * 24 * 60 + 180, isPinned: true },
          { senderId: student.id, content: 'Those are the Celsus signs! And Virchow added functio laesa later, right?', minutesAgo: 6 * 24 * 60 + 120, replyToIndex: 1 },
          { senderId: educator.id, content: 'Exactly! Now, acute vs chronic inflammation - what are the key cellular players?', minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: 'Acute = neutrophils. Chronic = lymphocytes, macrophages, plasma cells', minutesAgo: 5 * 24 * 60 - 30 },
          ...(sarah ? [{ senderId: sarah.id, content: 'Don\'t forget granulomatous inflammation! Caseating (TB) vs non-caseating (sarcoidosis) 🔬', minutesAgo: 4 * 24 * 60 }] : []),
          { senderId: educator.id, content: 'Great point! Path slide tip: caseating granulomas have central necrosis that looks like cottage cheese', minutesAgo: 4 * 24 * 60 - 15 },
          { senderId: student.id, content: 'What about the difference between coagulative and liquefactive necrosis?', minutesAgo: 3 * 24 * 60 },
          { senderId: educator.id, content: 'Coagulative = tissue architecture preserved (classic in MI). Liquefactive = tissue destruction with pus (classic in brain infarcts and bacterial abscesses)', minutesAgo: 3 * 24 * 60 - 20, isPinned: true },
          ...(ahmed ? [{ senderId: ahmed.id, content: 'In the ER, we see fat necrosis in acute pancreatitis - those chalky white spots on the pancreas are pathognomonic 🔬', minutesAgo: 2 * 24 * 60 }] : []),
          ...(priya ? [{ senderId: priya.id, content: 'Pediatric pathology pearl: Wilms tumor has a characteristic "triphasic" pattern - blastemal, stromal, and epithelial cells 👶', minutesAgo: 1 * 24 * 60 }] : []),
          // Poll
          { senderId: educator.id, content: 'Which type of necrosis is seen in TB?', minutesAgo: 6 * 60, type: 'poll', metadata: { poll: { question: 'Which type of necrosis is seen in TB?', options: ['Coagulative', 'Liquefactive', 'Caseous', 'Fat necrosis'], isMultiChoice: false, isAnonymous: false, votes: { '0': [], '1': [], '2': [student.id, sarah?.id].filter(Boolean), '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'Caseous necrosis! The "cheese-like" appearance is classic for TB 🔬', minutesAgo: 3 * 60 },
        ],
      },
      {
        name: 'Pharmacology Study',
        avatar: '💊',
        description: 'Drug mechanisms, interactions, and clinical pharmacology discussions',
        createdBy: educator.id,
        messages: [
          { senderId: educator.id, content: 'Welcome to Pharmacology Study! 💊 Know your drugs, know your patients', minutesAgo: 7 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'Key concept: agonists vs antagonists. Full agonist = max response. Partial agonist = submax response even at full receptor occupancy. Antagonist = blocks the receptor', minutesAgo: 6 * 24 * 60, isPinned: true },
          { senderId: student.id, content: 'And competitive antagonists shift the curve right (increase EC50), while non-competitive shift it down (decrease Emax)!', minutesAgo: 6 * 24 * 60 - 20, replyToIndex: 1 },
          { senderId: educator.id, content: 'Perfect! Now let\'s talk autonomic pharmacology. Sympathetic = fight or flight. Parasympathetic = rest and digest', minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: 'My trick: Sympathetic has "S" = Stress. Parasympathetic has "P" = Peace 😌', minutesAgo: 5 * 24 * 60 - 15 },
          ...(ahmed ? [{ senderId: ahmed.id, content: 'In EM, we use epinephrine for cardiac arrest, anaphylaxis, and severe asthma. Know your doses! 1mg IV for cardiac, 0.3-0.5mg IM for anaphylaxis 💊', minutesAgo: 4 * 24 * 60 }] : []),
          { senderId: educator.id, content: 'Drug interactions review: CYP450 inducers = "CRAP GPS" (Carbamazepine, Rifampin, Alcohol/Phenobarbital, Griseofulvin, Phenytoin, St. John\'s Wort)', minutesAgo: 3 * 24 * 60, isPinned: true },
          { senderId: student.id, content: 'And inhibitors = "SICKFACE" (Sulfonamides, Isoniazid, Ketoconazole, Fluconazole, Alcohol acute, Cimetidine, Erythromycin)', minutesAgo: 3 * 24 * 60 - 10, replyToIndex: 6 },
          ...(priya ? [{ senderId: priya.id, content: 'Peds pharmacology reminder: children are NOT small adults! Different Vd, different metabolism, always weight-based dosing 🧮', minutesAgo: 2 * 24 * 60 }] : []),
          ...(james ? [{ senderId: james.id, content: 'Surgical pharmacology: know your muscle relaxants! Succinylcholine = depolarizing (phase I block). Rocuronium = non-depolarizing', minutesAgo: 1 * 24 * 60 }] : []),
          // Poll
          { senderId: educator.id, content: 'Which drug is a competitive antagonist at muscarinic receptors?', minutesAgo: 2 * 60, type: 'poll', metadata: { poll: { question: 'Which drug is a competitive antagonist at muscarinic receptors?', options: ['Neostigmine', 'Atropine', 'Pilocarpine', 'Bethanechol'], isMultiChoice: false, isAnonymous: false, votes: { '0': [], '1': [student.id, ahmed?.id].filter(Boolean), '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'Atropine! "Atropine blocks everything wet" - dry mouth, dry eyes, constipation, urinary retention 💊', minutesAgo: 1 * 60 },
        ],
      },
      {
        name: 'OSCE Practice',
        avatar: '🩺',
        description: 'Clinical skills practice, OSCE stations, and communication tips',
        createdBy: educator.id,
        messages: [
          { senderId: educator.id, content: 'Welcome to OSCE Practice! 🩺 Master your clinical skills', minutesAgo: 6 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'OSCE tip #1: Always wash your hands before and after patient contact. It\'s an automatic fail if you forget!', minutesAgo: 6 * 24 * 60 - 10, isPinned: true },
          { senderId: student.id, content: 'And always introduce yourself: "Hello, I\'m [name], I\'m a medical student. Can I confirm your name and date of birth?"', minutesAgo: 5 * 24 * 60 + 120 },
          { senderId: educator.id, content: 'Perfect! Now let\'s practice cardiovascular examination. What\'s the correct sequence?', minutesAgo: 5 * 24 * 60 },
          { senderId: student.id, content: 'Inspection → Palpation → Percussion → Auscultation. Always in that order!', minutesAgo: 5 * 24 * 60 - 15, replyToIndex: 3 },
          ...(sarah ? [{ senderId: sarah.id, content: 'For neuro OSCEs: always document GCS, pupil size and reactivity, and limb power (MRC scale 0-5) 🧠', minutesAgo: 4 * 24 * 60 }] : []),
          ...(ahmed ? [{ senderId: ahmed.id, content: 'Emergency OSCE: ABCDE assessment is crucial. Expose the patient but maintain dignity. Communicate findings clearly 🚑', minutesAgo: 4 * 24 * 60 - 20 }] : []),
          { senderId: educator.id, content: 'Communication station tip: use the Calgary-Cambridge framework. Build rapport, gather info, explain, plan, close 🩺', minutesAgo: 3 * 24 * 60 },
          ...(maria ? [{ senderId: maria.id, content: 'OB/GYN OSCE: always offer a chaperone for intimate examinations. Document consent! 👶', minutesAgo: 2 * 24 * 60 }] : []),
          { senderId: student.id, content: 'What about breaking bad news? SPIKES protocol is gold standard', minutesAgo: 1 * 24 * 60 },
          { senderId: educator.id, content: 'SPIKES: Setting, Perception, Invitation, Knowledge, Emotions, Strategy/Summary. Practice it until it\'s natural!', minutesAgo: 1 * 24 * 60 - 10, isPinned: true },
          // Poll
          { senderId: educator.id, content: 'What is the most important first step in any OSCE station?', minutesAgo: 4 * 60, type: 'poll', metadata: { poll: { question: 'What is the most important first step in any OSCE station?', options: ['Read the instructions carefully', 'Wash your hands', 'Introduce yourself', 'Start the examination'], isMultiChoice: false, isAnonymous: false, votes: { '0': [student.id, educator.id], '1': [], '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'Read the instructions! You need to know what you\'re being asked to do before anything else 🩺', minutesAgo: 2 * 60 },
        ],
      },
      {
        name: 'Anatomy Lab',
        avatar: '🦴',
        description: 'Gross anatomy, dissection discussions, and clinical correlations',
        createdBy: educator.id,
        messages: [
          { senderId: educator.id, content: 'Welcome to Anatomy Lab! 🦴 Where structure meets function', minutesAgo: 7 * 24 * 60, type: 'system' },
          { senderId: educator.id, content: 'Let\'s start with the thorax. The mediastinum is divided into superior and inferior (which is further divided into anterior, middle, and posterior)', minutesAgo: 6 * 24 * 60 + 180 },
          { senderId: student.id, content: 'The middle mediastinum contains the heart, pericardium, and phrenic nerve. Key surgical landmark!', minutesAgo: 6 * 24 * 60 + 120 },
          { senderId: educator.id, content: 'Important: the phrenic nerve (C3-C5) innervates the diaphragm and passes ANTERIOR to the lung root. Vagus nerve passes POSTERIOR', minutesAgo: 5 * 24 * 60, isPinned: true },
          { senderId: student.id, content: 'Mnemonic: "Phrenic is Anterior to the root, Vagus is behind" - PAV 🚗', minutesAgo: 5 * 24 * 60 - 15, replyToIndex: 3 },
          ...(james ? [{ senderId: james.id, content: 'Surgical anatomy: knowing the triangle of Calot is essential for cholecystectomy. Cystic artery, cystic duct, and common hepatic duct 🔪', minutesAgo: 4 * 24 * 60 }] : []),
          { senderId: educator.id, content: 'Abdominal wall layers: Skin → Camper\'s fascia → Scarpa\'s fascia → External oblique → Internal oblique → Transversus abdominis → Transversalis fascia → Peritoneum', minutesAgo: 3 * 24 * 60 },
          { senderId: student.id, content: 'Mnemonic: "Some Super Engineers Can Fix Very Old Refrigerators" for the layers 😂', minutesAgo: 3 * 24 * 60 - 20 },
          ...(sarah ? [{ senderId: sarah.id, content: 'Neuroanatomy: the internal capsule has anterior limb, genu, and posterior limb. Genu = motor for face, posterior limb = motor for body 🧠', minutesAgo: 2 * 24 * 60 }] : []),
          { senderId: educator.id, content: 'Blood supply to the internal capsule: anterior limb = ACA/MCA lenticulostriates, genu = MCA lenticulostriates, posterior limb = anterior choroidal', minutesAgo: 1 * 24 * 60, isPinned: true },
          ...(priya ? [{ senderId: priya.id, content: 'Pediatric anatomy: in newborns, the liver takes up ~5% of body weight (vs 2% in adults). That\'s why the abdomen looks so protuberant! 👶', minutesAgo: 12 * 60 }] : []),
          // Poll
          { senderId: educator.id, content: 'Which structure passes through the foramen ovale?', minutesAgo: 5 * 60, type: 'poll', metadata: { poll: { question: 'Which structure passes through the foramen ovale?', options: ['Mandibular nerve (V3)', 'Maxillary nerve (V2)', 'Middle meningeal artery', 'Internal carotid artery'], isMultiChoice: false, isAnonymous: false, votes: { '0': [student.id, sarah?.id].filter(Boolean), '1': [], '2': [], '3': [] } }, reactions: [] } },
          { senderId: student.id, content: 'V3! Foramen ovale = Mandibular branch. Remember: Ovale sounds like "O-molar" → O for oral/mastication 🦴', minutesAgo: 2 * 60 },
        ],
      },
    ];

    for (const group of groupRooms) {
      // Check if group room with same name already exists
      const existingRoom = await db.chatRoom.findFirst({
        where: { type: 'group', name: group.name },
      });

      if (existingRoom) {
        results.skipped.push(`group room ${group.name}`);
        continue;
      }

      // Create group room with all available members
      const membersCreate = groupMemberIds.map(uid => ({
        userId: uid,
        role: uid === group.createdBy ? 'admin' : ('member' as const),
      }));
      // Deduplicate
      const uniqueMembers = membersCreate.filter((v, i, a) => a.findIndex(t => t.userId === v.userId) === i);

      const room = await db.chatRoom.create({
        data: {
          type: 'group',
          name: group.name,
          avatar: group.avatar,
          description: group.description,
          createdBy: group.createdBy,
          lastMessageAt: new Date(),
          members: {
            create: uniqueMembers,
          },
        },
      });

      results.groupRooms++;

      // Create sample messages with varied timestamps
      const now = Date.now();
      const createdMsgIds: string[] = [];
      for (let i = 0; i < group.messages.length; i++) {
        const msg = group.messages[i];
        const minutesAgo = msg.minutesAgo ?? (group.messages.length - i) * 3;
        const timestamp = new Date(now - minutesAgo * 60 * 1000);
        const replyToId = msg.replyToIndex !== undefined ? createdMsgIds[msg.replyToIndex] : null;
        const msgType = msg.type || 'text';

        let metadata = msg.metadata || {};
        // For system messages, add system info
        if (msgType === 'system') {
          metadata = { ...metadata, systemEvent: 'room_created', systemUser: msg.senderId };
          results.systemMessages++;
        }
        if (msgType === 'poll') {
          results.pollMessages++;
        }

        const created = await db.chatMessage.create({
          data: {
            roomId: room.id,
            senderId: msg.senderId,
            content: msg.content,
            type: msgType,
            metadata: JSON.stringify(metadata),
            isPinned: msg.isPinned || false,
            replyToId,
            createdAt: timestamp,
          },
        });
        createdMsgIds.push(created.id);
        results.groupMessages++;
        if (msg.isPinned) results.pinnedMessages++;
      }

      // Update lastMessageAt to match the most recent message
      const lastMinutesAgo = group.messages[group.messages.length - 1]?.minutesAgo ?? 3;
      await db.chatRoom.update({
        where: { id: room.id },
        data: { lastMessageAt: new Date(now - lastMinutesAgo * 60 * 1000) },
      });

      // ═══════════════════════════════════════════════════════════
      // Post-creation: Add reactions to some messages
      // ═══════════════════════════════════════════════════════════
      const roomMessages = await db.chatMessage.findMany({
        where: { roomId: room.id, type: 'text' },
        orderBy: { createdAt: 'asc' },
      });

      // Add reactions to various messages
      for (let i = 0; i < roomMessages.length; i++) {
        const msg = roomMessages[i];
        const meta = JSON.parse(msg.metadata || '{}');
        let updated = false;

        // Add reactions to certain messages based on position and content
        if (i === 1 && !meta.reactions) {
          // Second message gets thumbs up and heart
          meta.reactions = [
            { emoji: '👍', userIds: [student.id, admin.id, sarah?.id].filter(Boolean) },
            { emoji: '❤️', userIds: [ahmed?.id, priya?.id].filter(Boolean) },
          ];
          updated = true;
        }
        if (i === 3 && !meta.reactions) {
          // Fourth message gets fire emoji
          meta.reactions = [
            { emoji: '🔥', userIds: [student.id, educator.id] },
            { emoji: '💯', userIds: [admin.id] },
          ];
          updated = true;
        }
        if (i === 5 && !meta.reactions) {
          // Sixth message gets clap
          meta.reactions = [
            { emoji: '👏', userIds: [student.id, admin.id, sarah?.id].filter(Boolean) },
          ];
          updated = true;
        }
        if (i === roomMessages.length - 2 && !meta.reactions) {
          // Second to last message gets celebration
          meta.reactions = [
            { emoji: '🎉', userIds: [educator.id, admin.id] },
            { emoji: '👍', userIds: [student.id] },
          ];
          updated = true;
        }

        if (updated) {
          await db.chatMessage.update({
            where: { id: msg.id },
            data: { metadata: JSON.stringify(meta) },
          });
          results.reactions++;
        }
      }

      // ═══════════════════════════════════════════════════════════
      // Post-creation: Set isPinned/isMuted/pinOrder on some ChatRoomMembers
      // ═══════════════════════════════════════════════════════════
      // Pin some rooms for the student user
      const studentMembership = await db.chatRoomMember.findUnique({
        where: { roomId_userId: { roomId: room.id, userId: student.id } },
      });

      if (studentMembership) {
        // Pin the first 3 group rooms, mute the 5th+ ones
        const roomIndex = results.groupRooms;
        if (roomIndex <= 3) {
          await db.chatRoomMember.update({
            where: { id: studentMembership.id },
            data: { isPinned: true, pinOrder: roomIndex },
          });
        }
        if (roomIndex >= 5) {
          await db.chatRoomMember.update({
            where: { id: studentMembership.id },
            data: { isMuted: true },
          });
        }
        // Set different lastReadAt values for varying unread counts
        const readMinutesAgo = roomIndex <= 2 ? 5 : roomIndex <= 4 ? 2 * 24 * 60 : 5 * 24 * 60;
        await db.chatRoomMember.update({
          where: { id: studentMembership.id },
          data: { lastReadAt: new Date(now - readMinutesAgo * 60 * 1000) },
        });
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 4. Add "X was added to the group" system messages for new rooms
    // ═══════════════════════════════════════════════════════════
    for (const group of groupRooms) {
      const existingRoom = await db.chatRoom.findFirst({
        where: { type: 'group', name: group.name },
      });
      if (!existingRoom) continue;

      // Check if we already have member_added system messages for this room (skip if re-seeded)
      const existingMemberAddedMsg = await db.chatMessage.findFirst({
        where: { roomId: existingRoom.id, type: 'system', content: { contains: 'was added to the group' } },
      });
      if (existingMemberAddedMsg) continue;

      // Add "X created the group" system message at the very beginning (only if not already present)
      const existingCreatedMsg = await db.chatMessage.findFirst({
        where: { roomId: existingRoom.id, type: 'system', content: { contains: 'created the group' } },
      });
      if (!existingCreatedMsg) {
        const firstMsg = await db.chatMessage.findFirst({
          where: { roomId: existingRoom.id },
          orderBy: { createdAt: 'asc' },
        });
        if (firstMsg) {
          await db.chatMessage.create({
            data: {
              roomId: existingRoom.id,
              senderId: group.createdBy,
              content: `${allUsers.find(u => u.id === group.createdBy)?.name || 'Someone'} created the group "${group.name}"`,
              type: 'system',
              metadata: JSON.stringify({ systemEvent: 'room_created', systemUser: group.createdBy }),
              createdAt: new Date(firstMsg.createdAt.getTime() - 1000), // 1 second before first message
            },
          });
          results.systemMessages++;
        }
      }

      // Add "Y was added to the group" system messages
      const firstMsgForTime = await db.chatMessage.findFirst({
        where: { roomId: existingRoom.id },
        orderBy: { createdAt: 'asc' },
      });
      const roomMembers = await db.chatRoomMember.findMany({
        where: { roomId: existingRoom.id, userId: { not: group.createdBy } },
        include: { user: { select: { name: true } } },
      });
      for (const member of roomMembers.slice(0, 3)) {
        const addTime = new Date(firstMsgForTime ? firstMsgForTime.createdAt.getTime() + 500 : Date.now());
        await db.chatMessage.create({
          data: {
            roomId: existingRoom.id,
            senderId: group.createdBy,
            content: `${member.user?.name || 'Someone'} was added to the group`,
            type: 'system',
            metadata: JSON.stringify({ systemEvent: 'member_added', systemUser: group.createdBy, addedUser: member.userId }),
            createdAt: addTime,
          },
        });
        results.systemMessages++;
      }
    }

    // ═══════════════════════════════════════════════════════════
    // 5. Set some users as online for testing
    // ═══════════════════════════════════════════════════════════
    await db.user.updateMany({
      where: { email: { in: ['student@medq.com', 'sarah@medq.com', 'ahmed@medq.com'] } },
      data: { isOnline: true, lastActiveAt: new Date() },
    });
    await db.user.updateMany({
      where: { email: { in: ['educator@medq.com', 'admin@medq.com'] } },
      data: { isOnline: false, lastActiveAt: new Date(Date.now() - 30 * 60 * 1000) },
    });

    return NextResponse.json({
      success: true,
      message: 'Chat data seeded successfully with enriched data!',
      results,
    });
  } catch (error) {
    console.error('Error seeding chat data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
