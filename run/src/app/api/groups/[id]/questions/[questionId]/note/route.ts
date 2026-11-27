import { db } from '@/lib/db';
import { getAuthenticatedUserId } from '@/lib/auth-helpers';

async function getUser(req: Request) {
  const userId = await getAuthenticatedUserId(req);
  if (!userId) return null;
  return db.user.findUnique({ where: { id: userId } });
}

// POST /api/groups/[id]/questions/[questionId]/note — add a personal note
// GET  — list notes (only the requester's own notes)
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const q = await db.groupQuestion.findUnique({ where: { id: questionId }, select: { notes: true } });
    if (!q) return Response.json({ error: 'Not found' }, { status: 404 });

    const allNotes = JSON.parse(q.notes || '[]');
    const myNotes = allNotes.filter((n: any) => n.userId === user.id);
    return Response.json({ notes: myNotes });
  } catch (error) {
    console.error('Error getting notes:', error);
    return Response.json({ error: 'Failed to get notes' }, { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const question = await db.groupQuestion.findUnique({ where: { id: questionId } });
    if (!question || question.groupId !== id) {
      return Response.json({ error: 'Question not found' }, { status: 404 });
    }

    const body = await request.json();
    const { note } = body;
    if (!note || !note.trim()) {
      return Response.json({ error: 'Note text required' }, { status: 400 });
    }

    const notes = JSON.parse(question.notes || '[]');
    const newNote = {
      id: `note_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      userId: user.id,
      userName: user.name || 'Unknown',
      note: note.trim(),
      createdAt: new Date().toISOString(),
    };
    notes.push(newNote);

    await db.groupQuestion.update({
      where: { id: questionId },
      data: { notes: JSON.stringify(notes) },
    });

    return Response.json({ note: newNote }, { status: 201 });
  } catch (error) {
    console.error('Error adding note:', error);
    return Response.json({ error: 'Failed to add note' }, { status: 500 });
  }
}

// DELETE — remove a note by id (query param ?noteId=)
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string; questionId: string }> }
) {
  try {
    const { id, questionId } = await params;
    const user = await getUser(request);
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const membership = await db.groupMember.findUnique({
      where: { groupId_userId: { groupId: id, userId: user.id } },
    });
    if (!membership) return Response.json({ error: 'Not a member' }, { status: 403 });

    const { searchParams } = new URL(request.url);
    const noteId = searchParams.get('noteId');
    if (!noteId) return Response.json({ error: 'noteId required' }, { status: 400 });

    const question = await db.groupQuestion.findUnique({ where: { id: questionId } });
    if (!question) return Response.json({ error: 'Not found' }, { status: 404 });

    let notes = JSON.parse(question.notes || '[]');
    const target = notes.find((n: any) => n.id === noteId);
    if (!target) return Response.json({ error: 'Note not found' }, { status: 404 });
    if (target.userId !== user.id && membership.role !== 'admin') {
      return Response.json({ error: 'Not allowed' }, { status: 403 });
    }
    notes = notes.filter((n: any) => n.id !== noteId);

    await db.groupQuestion.update({
      where: { id: questionId },
      data: { notes: JSON.stringify(notes) },
    });

    return Response.json({ message: 'Note deleted' });
  } catch (error) {
    console.error('Error deleting note:', error);
    return Response.json({ error: 'Failed to delete note' }, { status: 500 });
  }
}
