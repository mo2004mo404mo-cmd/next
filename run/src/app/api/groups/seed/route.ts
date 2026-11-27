import { db } from '@/lib/db';

// POST /api/groups/seed — Seed initial groups for the platform
export async function POST() {
  try {
    // Check if groups already exist
    const existingCount = await db.group.count();
    if (existingCount > 0) {
      return Response.json({
        message: 'Groups already seeded',
        count: existingCount,
      });
    }

    // Find an admin user to be the creator of seed groups
    const adminUser = await db.user.findFirst({ where: { role: 'admin' } });
    const createdBy = adminUser?.id || '';

    const seedGroups = [
      {
        name: 'Cairo University Medicine',
        description: 'Official group for medical students at Cairo University — Kasr Al-Ainy. Share resources, discuss cases, and connect with fellow students.',
        avatar: '🏛️',
        type: 'university',
        university: 'Cairo University',
        year: '',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Class of 2026',
        description: 'Graduating class of 2026 — stay connected, share study materials, and prepare for finals together!',
        avatar: '🎓',
        type: 'year',
        university: '',
        year: '2026',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Class of 2027',
        description: 'Graduating class of 2027 — join your classmates for study sessions and exam prep.',
        avatar: '📚',
        type: 'year',
        university: '',
        year: '2027',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Internal Medicine Study Group',
        description: 'Deep-dive study group for Internal Medicine. Case discussions, board-style questions, and clinical pearls.',
        avatar: '🫀',
        type: 'specialty',
        university: '',
        year: '',
        specialty: 'Internal Medicine',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Surgery Study Group',
        description: 'Surgical study group — anatomy review, operative techniques, and surgical case discussions.',
        avatar: '🔪',
        type: 'specialty',
        university: '',
        year: '',
        specialty: 'Surgery',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'USMLE Step 1 Prep',
        description: 'Collaborative preparation for USMLE Step 1. Share resources, practice questions, and study schedules.',
        avatar: '🧠',
        type: 'study_group',
        university: '',
        year: '',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Pediatrics Circle',
        description: 'Pediatrics study and discussion group. From newborn care to adolescent medicine.',
        avatar: '👶',
        type: 'specialty',
        university: '',
        year: '',
        specialty: 'Pediatrics',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Cardiology Interest Group',
        description: 'For students passionate about cardiology. ECG interpretation, heart failure management, and interventional cardiology discussions.',
        avatar: '❤️',
        type: 'study_group',
        university: '',
        year: '',
        specialty: 'Cardiology',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Harvard Medical School',
        description: 'Community for Harvard Medical School students. Study together, share insights, and support each other.',
        avatar: '🏥',
        type: 'university',
        university: 'Harvard Medical School',
        year: '',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Anatomy & Histology Lab',
        description: 'Study group focused on anatomy, histology, and embryology. Dissection tips, slide reviews, and practical exam prep.',
        avatar: '🔬',
        type: 'study_group',
        university: '',
        year: '',
        specialty: 'Anatomy',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Emergency Medicine',
        description: 'Emergency Medicine study group. Trauma protocols, resuscitation algorithms, and ER case discussions.',
        avatar: '🚑',
        type: 'specialty',
        university: '',
        year: '',
        specialty: 'Emergency Medicine',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Pharmacology Club',
        description: 'Master pharmacology together! Drug mechanisms, side effects, interactions, and board-style pharmacology questions.',
        avatar: '💊',
        type: 'study_group',
        university: '',
        year: '',
        specialty: 'Pharmacology',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'General Discussion',
        description: 'Open community for all medical students. Share anything — memes, tips, struggles, and wins!',
        avatar: '💬',
        type: 'general',
        university: '',
        year: '',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'PLAB Prep Group',
        description: 'Preparation group for the Professional and Linguistic Assessments Board (PLAB) exam.',
        avatar: '🇬🇧',
        type: 'study_group',
        university: '',
        year: '',
        specialty: '',
        isPublic: true,
        inviteCode: '',
        memberCount: 1,
        createdBy,
      },
      {
        name: 'Private Study Circle',
        description: 'An invite-only study group for focused collaborative learning. Request an invite code from an existing member.',
        avatar: '🔐',
        type: 'study_group',
        university: '',
        year: '',
        specialty: '',
        isPublic: false,
        inviteCode: 'STUDY2K',
        memberCount: 1,
        createdBy,
      },
    ];

    const createdGroups = [];

    for (const groupData of seedGroups) {
      // Only create with admin membership if we have a creator
      const group = await db.group.create({
        data: createdBy
          ? {
              ...groupData,
              members: {
                create: {
                  userId: createdBy,
                  role: 'admin',
                },
              },
            }
          : groupData,
      });
      createdGroups.push(group);
    }

    return Response.json({
      message: 'Groups seeded successfully',
      count: createdGroups.length,
      groups: createdGroups.map((g) => ({ id: g.id, name: g.name, type: g.type })),
    });
  } catch (error) {
    console.error('Error seeding groups:', error);
    return Response.json({ error: 'Failed to seed groups' }, { status: 500 });
  }
}
