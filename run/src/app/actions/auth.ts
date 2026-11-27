'use server';

/**
 * Server Actions for authentication flows — Auth.js v5
 *
 * Best practices applied:
 *  - All mutations run server-side (no client-side fetch to API routes)
 *  - Input validation happens here, close to the data layer
 *  - Prisma queries are never exposed to the client
 *  - Returns structured state for `useActionState` (React 19)
 *  - Uses v5 server-side `signIn()` — no client-side `next-auth/react` needed
 */

import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { isRedirectError } from 'next/dist/client/components/redirect-error';
import { signIn } from '@/auth';
import { db } from '@/lib/db';

// ─── Shared types ──────────────────────────────────────────────────────────

export interface AuthActionState {
  success?: boolean;
  error?: string;
  /** Registration: email + password for auto-sign-in after account creation */
  email?: string;
  password?: string;
  /** Password reset: dev-mode token + userId for direct reset link */
  devToken?: string;
  userId?: string;
}

// ─── Login ─────────────────────────────────────────────────────────────────

/**
 * Full server-side login flow.
 * Validates credentials, checks moderation status, then calls
 * Auth.js v5 `signIn()` on the server — no client round-trip needed.
 *
 * Returns `{ success: true }` on success. NextAuth handles the redirect.
 */
export async function loginAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Please enter your email and password.' };
  }

  try {
    const user = await db.user.findUnique({ where: { email } });
   console.log(user);
   
    if (!user || !user.password) {
      return { error: 'Invalid email or password.' };
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return { error: 'Invalid email or password.' };
    }

    if (!user.emailVerified) {
      return { error: 'Please verify your email before signing in.' };
    }

    // Check moderation status
    if (user.status === 'banned') {
      return { error: 'Your account has been banned. ' + (user.bannedReason || 'Please contact support.') };
    }
    if (user.status === 'suspended') {
      if (user.suspendedUntil && user.suspendedUntil.getTime() < Date.now()) {
        // Auto-reinstate expired suspension
        await db.user.update({
          where: { id: user.id },
          data: { status: 'active', suspendedUntil: null, suspendedReason: null },
        });
      } else {
        const until = user.suspendedUntil
          ? new Date(user.suspendedUntil).toISOString()
          : 'indefinite';
        return { error: 'Your account is suspended until ' + until + '.' };
      }
    }

    // ── Server-side signIn (Auth.js v5 only!) ──
    // This sets the session cookie and triggers the JWT callback.
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });

    // signIn() throws on failure or redirects on success,
    // so if we reach here, something unexpected happened.
    return { success: true };
  } catch (err: unknown) {
    // NextAuth throws NEXT_REDIRECT on successful signIn with redirectTo.
    // We don't catch it — let it propagate so Next.js handles the redirect.
    if (isRedirectError(err)) throw err;

    // Auth errors from the authorize() callback (banned, suspended)
    if (err instanceof Error && (err.message.startsWith('banned:') || err.message.startsWith('suspended:'))) {
      return { error: err.message.replace(/^(banned|suspended):/, '') };
    }

    console.error('[loginAction] Error:', err);
    return { error: 'Invalid email or password.' };
  }
}

// ─── Registration ───────────────────────────────────────────────────────────

/**
 * Registers a new user and sets up their free-tier subscription + credits.
 * After successful creation, auto-signs in via server-side `signIn()`.
 */
export async function registerAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const name = (formData.get('name') as string)?.trim();
  const email = (formData.get('email') as string)?.trim().toLowerCase();
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;
  const agreed = formData.get('agreed') === 'on';

  // ── Validation ──
  if (!name || !email || !password) {
    return { error: 'Name, email, and password are required.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { error: 'Please enter a valid email address.' };
  }

  if (password.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  if (!agreed) {
    return { error: 'You must agree to the Terms of Service.' };
  }

  // ── Check for existing user ──
  try {
    const existingUser = await db.user.findUnique({ where: { email } });
    if (existingUser) {
      return { error: 'An account with this email already exists.' };
    }
  } catch (err) {
    console.error('[registerAction] DB lookup error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }

  // ── Create user + subscription + credits ──
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'student',
        onboardingCompleted: false,
      },
    });

    // Free-tier subscription (1 year)
    await db.subscription.create({
      data: {
        userId: user.id,
        tier: 'free',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      },
    });

    // Welcome bonus credits
    await db.creditWallet.create({
      data: { userId: user.id, balance: 25, totalEarned: 25 },
    });

    await db.creditTransaction.create({
      data: {
        userId: user.id,
        type: 'admin_grant',
        amount: 25,
        balance: 25,
        category: 'welcome_bonus',
        description: 'Welcome bonus - 25 free credits!',
      },
    });

    // ── Auto sign-in after registration (server-side) ──
    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });

    return { success: true, email };
  } catch (err: unknown) {
    if (isRedirectError(err)) throw err;
    console.error('[registerAction] Creation error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

// ─── Forgot Password ────────────────────────────────────────────────────────

/**
 * Initiates a password reset flow for the given email.
 * Always returns success to prevent email enumeration.
 * In dev mode, returns the token for direct use.
 */
export async function requestPasswordResetAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const email = (formData.get('email') as string)?.trim().toLowerCase();

  if (!email || !email.includes('@')) {
    return { error: 'Please provide a valid email address.' };
  }

  try {
    const user = await db.user.findUnique({ where: { email } });

    // Always return success even if user doesn't exist (anti-enumeration)
    if (!user || !user.password) {
      return { success: true };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes

    await db.user.update({
      where: { id: user.id },
      data: { passwordResetAt: new Date(expiresAt) },
    });

    // In production: send email with reset link
    // Dev/demo: return the token so the reset form can use it directly
    if (process.env.NODE_ENV === 'development') {
      return { success: true, devToken: resetToken, userId: user.id };
    }

    return { success: true };
  } catch (err) {
    console.error('[requestPasswordResetAction] Error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}

// ─── Reset Password ─────────────────────────────────────────────────────────

/**
 * Resets a user's password given their userId and a new password.
 * Verifies the 30-minute reset window.
 */
export async function resetPasswordAction(
  _prevState: AuthActionState,
  formData: FormData,
): Promise<AuthActionState> {
  const userId = formData.get('userId') as string;
  const newPassword = formData.get('newPassword') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  if (!userId || !newPassword) {
    return { error: 'Missing required fields.' };
  }

  if (typeof newPassword !== 'string' || newPassword.length < 6) {
    return { error: 'Password must be at least 6 characters.' };
  }

  if (newPassword !== confirmPassword) {
    return { error: 'Passwords do not match.' };
  }

  try {
    const user = await db.user.findUnique({ where: { id: userId } });

    if (!user) {
      return { error: 'Invalid or expired reset link.' };
    }

    if (!user.passwordResetAt) {
      return { error: 'No password reset requested.' };
    }

    const resetExpires = user.passwordResetAt.getTime();
    if (Date.now() > resetExpires) {
      return { error: 'Reset link has expired. Please request a new one.' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db.user.update({
      where: { id: userId },
      data: { password: hashedPassword, passwordResetAt: null },
    });

    return { success: true };
  } catch (err) {
    console.error('[resetPasswordAction] Error:', err);
    return { error: 'Something went wrong. Please try again.' };
  }
}
