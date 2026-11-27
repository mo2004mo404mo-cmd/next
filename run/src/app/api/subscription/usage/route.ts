import { NextRequest, NextResponse } from 'next/server';
import { incrementUsage } from '@/lib/freemium-store';
import { getCurrentUser, badRequest } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';

/**
 * POST /api/subscription/usage
 * Increments a usage counter for the calling user.
 *
 * Public-ish: anonymous usage is tracked under a guest bucket so free-tier
 * rate limits still apply to logged-out users. Auth is optional here, so we
 * use withErrorHandler (not apiHandler) and look up the user softly.
 */
export const POST = withErrorHandler(async (req: NextRequest) => {
  const user = await getCurrentUser();
  const userId = (user as any)?.id as string | undefined;

  const { category } = await req.json();
  if (!category) return badRequest('Category required');
  const result = await incrementUsage(category, userId);
  return NextResponse.json(result);
});
