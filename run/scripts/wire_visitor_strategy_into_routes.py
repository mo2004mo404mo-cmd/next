"""Wire classifyVisitor into /api/extract and /api/questions/import/extract.

Adds `resolveAccessTier(userId)` to visitor-strategy.ts as the DB-aware
counterpart to the pure `classifyVisitor` — looks up the user's
subscription tier from Postgres and returns the AccessTier.

Updates the two extract routes to:
  1. Resolve the access tier after authentication.
  2. Apply the per-tier file size cap (visitor = 2 MB, free = 15 MB,
     premium = 50 MB, pro = 100 MB) instead of the hardcoded 15 MB.
  3. Surface a helpful "sign up for a free account" message for visitors
     hitting the 2 MB cap.

For /api/questions/import/extract the same cap applies to the source-file
upload portion (the route persists the file via the Knowledge-Library
pattern; visitors cannot upload to the library per the threshold matrix, so
the route now 403s visitors entirely with the sign-up message).

Idempotent.
"""
from pathlib import Path
import re

PROJECT = Path("/tmp/my-project")
STRATEGY = PROJECT / "src/lib/subscription/visitor-strategy.ts"
EXTRACT_ROUTE = PROJECT / "src/app/api/extract/route.ts"
IMPORT_ROUTE = PROJECT / "src/app/api/questions/import/extract/route.ts"

# ── 1. Append resolveAccessTier to visitor-strategy.ts ──
APPENDIX = """

// ── DB-aware resolver (server-only) ────────────────────────────────────────
//
// `classifyVisitor` (above) is pure: callers pass isGuestUser + tier.
// `resolveAccessTier` is the DB-aware counterpart: given a userId, it looks
// up whether that user IS the guest user (shared anonymous record) and what
// their subscription tier is, then returns the AccessTier.
//
// Routes call this after resolveUserId() to get the tier, then thresholdFor()
// to apply caps.

// Lazy imports so the pure functions above stay pure-testable without a DB.
// (These imports only run when resolveAccessTier is actually called.)
type DbLike = {
  subscription: {
    findUnique: (args: { where: { userId: string } }) => Promise<{ tier: string } | null>;
  };
};

async function loadDb(): Promise<DbLike> {
  const mod = await import('@/lib/db');
  return mod.db as unknown as DbLike;
}

async function loadGuestResolver(): Promise<() => Promise<string>> {
  const mod = await import('@/lib/guest-user');
  return mod.getGuestUserId;
}

/**
 * Resolve the AccessTier for a given userId. Server-only (touches DB).
 *
 *   - If userId === guest user id → 'visitor'
 *   - Otherwise → look up subscription.tier; default to 'free' if missing
 *
 * Lazy-imports the db + guest-user modules so the pure helpers above stay
 * unit-testable without a DB or Next runtime.
 */
export async function resolveAccessTier(userId: string): Promise<AccessTier> {
  const getGuestUserId = await loadGuestResolver();
  const guestId = await getGuestUserId();
  if (userId === guestId) return 'visitor';

  const db = await loadDb();
  const sub = await db.subscription.findUnique({ where: { userId } });
  const tier = (sub?.tier as Tier) ?? 'free';
  return classifyVisitor({ isGuestUser: false, tier });
}
"""

strategy_src = STRATEGY.read_text()
if "resolveAccessTier" in strategy_src:
    print("[visitor-strategy.ts] resolveAccessTier already present, skipping")
else:
    STRATEGY.write_text(strategy_src.rstrip() + "\n" + APPENDIX + "\n")
    print("[visitor-strategy.ts] appended resolveAccessTier")

# ── 2. Wire into /api/extract ──
extract_src = EXTRACT_ROUTE.read_text()

OLD_EXTRACT_IMPORTS = """import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { extractFromFileServer, extractAudioPassthrough, isAudioExtension } from '@/lib/server-file-extract';
import { createLogger } from '@/lib/logger';"""

NEW_EXTRACT_IMPORTS = """import { NextResponse } from 'next/server';
import { resolveUserId, badRequest, unauthorized } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { extractFromFileServer, extractAudioPassthrough, isAudioExtension } from '@/lib/server-file-extract';
import { createLogger } from '@/lib/logger';
import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';"""

OLD_EXTRACT_CAP = """const MAX_FILE_BYTES = 15 * 1024 * 1024; // 15 MB — parity with every other upload surface

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to extract file content');

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest('Expected multipart/form-data with a "file" field');
  }

  const file = form.get('file');
  if (!(file instanceof File)) return badRequest('"file" field is required');
  if (file.size === 0) return badRequest('File is empty');
  if (file.size > MAX_FILE_BYTES) {
    return badRequest(`File exceeds the ${MAX_FILE_BYTES / 1024 / 1024}MB cap`);
  }"""

NEW_EXTRACT_CAP = """// Hard ceiling across all tiers (pro = 100 MB). The per-tier cap is enforced
// below using the visitor-strategy threshold matrix (Stage 10).
const ABSOLUTE_MAX_BYTES = 100 * 1024 * 1024;

export const POST = withErrorHandler(async (req: Request) => {
  const userId = await resolveUserId();
  if (!userId) return unauthorized('Sign in to extract file content');

  // Stage 10: classify the caller's access tier and apply per-tier file size cap.
  // Visitors (anonymous, guest@medq.local) get 2 MB; free = 15 MB; premium = 50 MB; pro = 100 MB.
  const tier = await resolveAccessTier(userId);
  const tierConfig = thresholdFor(tier);
  const tierMaxBytes = tierConfig.fileUploadMaxMb * 1024 * 1024;

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return badRequest('Expected multipart/form-data with a "file" field');
  }

  const file = form.get('file');
  if (!(file instanceof File)) return badRequest('"file" field is required');
  if (file.size === 0) return badRequest('File is empty');
  if (file.size > ABSOLUTE_MAX_BYTES) {
    return badRequest(`File exceeds the ${ABSOLUTE_MAX_BYTES / 1024 / 1024}MB absolute cap`);
  }
  if (file.size > tierMaxBytes) {
    const hint = tierConfig.isAnonymous
      ? ` — sign up for a free account to upload files up to ${thresholdFor('free').fileUploadMaxMb}MB`
      : '';
    return badRequest(
      `File exceeds the ${tierConfig.fileUploadMaxMb}MB cap for your ${tierConfig.label} tier${hint}`,
    );
  }"""

if "resolveAccessTier" in extract_src:
    print("[extract/route.ts] already wired, skipping")
else:
    if OLD_EXTRACT_IMPORTS in extract_src and OLD_EXTRACT_CAP in extract_src:
        extract_src = extract_src.replace(OLD_EXTRACT_IMPORTS, NEW_EXTRACT_IMPORTS, 1)
        extract_src = extract_src.replace(OLD_EXTRACT_CAP, NEW_EXTRACT_CAP, 1)
        EXTRACT_ROUTE.write_text(extract_src)
        print("[extract/route.ts] wired resolveAccessTier + per-tier cap")
    else:
        print("[extract/route.ts] WARNING: anchors not found — file may have drifted")

# ── 3. Wire into /api/questions/import/extract ──
import_src = IMPORT_ROUTE.read_text()

# Find the import block and add our imports
OLD_IMPORT_IMPORTS = """import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { callChat } from '@/lib/ai/unified-llm';
import { resolveUserId } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { extractFromFileServer } from '@/lib/server-file-extract';"""

NEW_IMPORT_IMPORTS = """import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { db } from '@/lib/db';
import { callChat } from '@/lib/ai/unified-llm';
import { resolveUserId, forbidden } from '@/lib/auth-helpers';
import { withErrorHandler } from '@/lib/api-handler';
import { extractFromFileServer } from '@/lib/server-file-extract';
import { resolveAccessTier, thresholdFor } from '@/lib/subscription/visitor-strategy';"""

# Find the POST handler and add a tier gate at the top.
# Looking for the existing pattern where resolveUserId is called.
PAT = re.compile(r"(export const POST = withErrorHandler\(async \(req[^)]*\) => \{[^}]*?const userId = await resolveUserId\(\);)")

if "resolveAccessTier" in import_src:
    print("[import/extract/route.ts] already wired, skipping")
else:
    new_src = import_src
    if OLD_IMPORT_IMPORTS in new_src:
        new_src = new_src.replace(OLD_IMPORT_IMPORTS, NEW_IMPORT_IMPORTS, 1)
        print("[import/extract/route.ts] added imports")
    else:
        print("[import/extract/route.ts] WARNING: import block not found")

    # Find the POST handler's userId resolution and inject a tier gate right after.
    # Use a regex match on the unique pattern.
    TIER_GATE = """
  // Stage 10: visitor strategy gate. Visitors (anonymous, guest@medq.local)
  // cannot use AI question extraction — it's a paid-tier feature that
  // consumes LLM credits and persists results to the Knowledge Library.
  // Free/premium/pro tiers proceed; the rate-limit and daily-quota system
  // handles per-user caps downstream.
  const _tier = await resolveAccessTier(userId);
  const _tierCfg = thresholdFor(_tier);
  if (!_tierCfg.canSaveQuestions) {
    return forbidden(
      `AI question extraction is not available for the ${_tierCfg.label} tier. ` +
      `Sign up for a free account to extract questions from your uploaded files.`,
    );
  }
"""

    # Match: const userId = await resolveUserId();\n (with possible following lines)
    # Insert TIER_GATE right after the resolveUserId() call.
    USERID_PAT = re.compile(r"(const userId = await resolveUserId\(\);\n)")
    matches = USERID_PAT.findall(new_src)
    print(f"[import/extract/route.ts] found {len(matches)} resolveUserId() call(s)")

    if len(matches) >= 1:
        # Only inject after the FIRST occurrence (the POST handler).
        new_src = USERID_PAT.sub(lambda m: m.group(0) + TIER_GATE, new_src, count=1)
        print("[import/extract/route.ts] injected tier gate")
    else:
        print("[import/extract/route.ts] WARNING: resolveUserId call not found")

    IMPORT_ROUTE.write_text(new_src)
