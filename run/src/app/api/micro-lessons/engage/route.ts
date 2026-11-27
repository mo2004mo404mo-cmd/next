import { NextRequest, NextResponse } from 'next/server';

/**
 * POST /api/micro-lessons/engage
 *
 * Records user engagement events for micro-lessons.
 * Used for analytics, streak tracking, and personalization.
 *
 * Request body:
 *   { events: EngagementRecord[] }
 *   where EngagementRecord = { lessonId, timestamp, action, metadata? }
 *
 * Response:
 *   { recorded: number }
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { events } = body;

    if (!Array.isArray(events) || events.length === 0) {
      return NextResponse.json(
        { error: 'Missing or empty "events" array' },
        { status: 400 }
      );
    }

    // Validate each event
    const validEvents = events.filter((e: any) =>
      e &&
      typeof e.lessonId === 'string' &&
      typeof e.timestamp === 'number' &&
      ['viewed', 'flip', 'self_test_answer', 'navigate_related'].includes(e.action)
    );

    // In production, this would write to a database
    // For now, we acknowledge receipt
    // Could also trigger:
    //   - Streak update
    //   - Achievement check
    //   - Notification scheduling
    //   - Analytics aggregation

    return NextResponse.json({ recorded: validEvents.length });
  } catch (error) {
    console.error('[Micro-Lessons Engage] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to record engagement' },
      { status: 500 }
    );
  }
}
