import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

// GET /api/groups — List groups with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const university = searchParams.get('university');
    const year = searchParams.get('year');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const skip = (page - 1) * limit;

    const where: any = {};

    if (type) {
      where.type = type;
    }
    if (university) {
      where.university = { contains: university };
    }
    if (year) {
      where.year = { contains: year };
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { university: { contains: search } },
        { specialty: { contains: search } },
      ];
    }

    // Only show public groups to non-members by default
    const publicOnly = searchParams.get('publicOnly') !== 'false';
    if (publicOnly && !search) {
      where.isPublic = true;
    }

    const [groups, total] = await Promise.all([
      db.group.findMany({
        where,
        orderBy: [{ memberCount: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
        include: {
          members: {
            take: 5,
            orderBy: { joinedAt: 'asc' },
            include: {
              user: {
                select: { id: true, name: true, image: true, specialty: true },
              },
            },
          },
        },
      }),
      db.group.count({ where }),
    ]);

    return Response.json({
      groups,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error listing groups:', error);
    return Response.json({ error: 'Failed to list groups' }, { status: 500 });
  }
}

// POST /api/groups — Create a new group
export async function POST(request: Request) {
  try {
    const userId = await getAuthenticatedUserId(request);
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      name,
      description,
      avatar,
      type,
      university,
      year,
      specialty,
      isPublic,
    } = body;

    // Validate required fields
    if (!name || name.trim().length === 0) {
      return Response.json({ error: 'Group name is required' }, { status: 400 });
    }

    const validTypes = ['university', 'year', 'study_group', 'specialty', 'general'];
    if (type && !validTypes.includes(type)) {
      return Response.json({ error: `Invalid group type. Must be one of: ${validTypes.join(', ')}` }, { status: 400 });
    }

    // Generate unique invite code for private groups
    const generateInviteCode = () => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
      let code = '';
      for (let i = 0; i < 8; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    const inviteCode = isPublic === false ? generateInviteCode() : '';

    // Create the group and auto-join creator as admin
    const group = await db.group.create({
      data: {
        name: name.trim(),
        description: description || '',
        avatar: avatar || '🎓',
        type: type || 'general',
        university: university || '',
        year: year || '',
        specialty: specialty || '',
        isPublic: isPublic !== false,
        inviteCode,
        memberCount: 1,
        createdBy: userId,
        members: {
          create: {
            userId,
            role: 'admin',
          },
        },
      },
      include: {
        members: {
          include: {
            user: {
              select: { id: true, name: true, image: true, specialty: true },
            },
          },
        },
      },
    });

    return Response.json({ group }, { status: 201 });
  } catch (error) {
    console.error('Error creating group:', error);
    return Response.json({ error: 'Failed to create group' }, { status: 500 });
  }
}
