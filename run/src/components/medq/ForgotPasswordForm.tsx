'use client';

import { useEffect, useState } from 'react';
import { useActionState } from 'react';
import {
  requestPasswordResetAction,
  resetPasswordAction,
  type AuthActionState,
} from '@/app/actions/auth';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Mail, Lock, CheckCircle, Stethoscope } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 3-step forgot-password flow:
 *   Step 1: Enter email → requestPasswordResetAction
 *   Step 2: Success message (in production, an email is sent)
 *   Step 3: (Dev only) If server returns devToken, show reset form
 */
export default function ForgotPasswordForm() {
  const [requestState, requestFormAction, requestPending] = useActionState(
    requestPasswordResetAction,
    {} as AuthActionState,
  );
  const [resetState, resetFormAction, resetPending] = useActionState(
    resetPasswordAction,
    {} as AuthActionState,
  );

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [devToken, setDevToken] = useState('');
  const [userId, setUserId] = useState('');

  // When step 1 succeeds, move to step 2 (or step 3 if dev token returned)
  useEffect(() => {
    if (requestState.success && step === 1) {
      if (requestState.devToken && requestState.userId) {
        setDevToken(requestState.devToken);
        setUserId(requestState.userId);
        setStep(3);
      } else {
        setStep(2);
      }
    }
  }, [
    requestState.success,
    requestState.devToken,
    requestState.userId,
    step,
  ]);

  // When step 3 (reset) succeeds
  const resetSuccess = resetState.success && step === 3;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0c0e14' }}>
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#f59e0b] to-[#d97706] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#f59e0b]/25">
            <Mail className="w-7 h-7 text-[#0c0e14]" />
          </div>
          <h1 className="text-2xl font-bold text-[#e8ecf4]">Reset password</h1>
          <p className="text-sm text-[#5a6478] mt-1">
            {step === 1 && 'Enter your email to receive a reset link'}
            {step === 2 && 'Check your email for the reset link'}
            {step === 3 && !resetSuccess && 'Enter your new password'}
            {resetSuccess && 'Password reset successfully'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: '#151821' }}>
          <AnimatePresence mode="wait">
            {/* Step 1: Email request */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form action={requestFormAction} className="space-y-4">
                  <div>
                    <Label htmlFor="reset-email" className="text-xs text-[#8b95a8] mb-1.5 block">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        id="reset-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20"
                        required
                      />
                    </div>
                  </div>

                  {requestState.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2"
                    >
                      {requestState.error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={requestPending}
                    className="w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {requestPending ? (
                      <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin" />Sending...</span>
                    ) : (
                      'Send Reset Link'
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Success (email sent) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00e5a0]" />
                </div>
                <p className="text-sm text-[#e8ecf4] mb-1">Reset link sent!</p>
                <p className="text-xs text-[#5a6478] mb-6">If an account exists with that email, you will receive a password reset link within a few minutes.</p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to sign in
                </Link>
              </motion.div>
            )}

            {/* Step 3: New password (dev mode) */}
            {step === 3 && !resetSuccess && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <form action={resetFormAction} className="space-y-4">
                  <input type="hidden" name="userId" value={userId} />
                  <div>
                    <Label htmlFor="newPassword" className="text-xs text-[#8b95a8] mb-1.5 block">New password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        placeholder="Min. 6 characters"
                        autoComplete="new-password"
                        className="h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="confirmResetPassword" className="text-xs text-[#8b95a8] mb-1.5 block">Confirm new password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        id="confirmResetPassword"
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter new password"
                        autoComplete="new-password"
                        className="h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#f59e0b]/30 focus:ring-[#f59e0b]/20"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>

                  {resetState.error && (
                    <motion.div
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2"
                    >
                      {resetState.error}
                    </motion.div>
                  )}

                  <Button
                    type="submit"
                    disabled={resetPending}
                    className="w-full h-11 bg-[#f59e0b] hover:bg-[#d97706] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {resetPending ? (
                      <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin" />Resetting...</span>
                    ) : (
                      'Reset Password'
                    )}
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 3b: Reset success */}
            {resetSuccess && (
              <motion.div
                key="step3b"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-4"
              >
                <div className="w-16 h-16 rounded-full bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-[#00e5a0]" />
                </div>
                <p className="text-sm text-[#e8ecf4] mb-1">Password updated!</p>
                <p className="text-xs text-[#5a6478] mb-6">You can now sign in with your new password.</p>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Back to sign in
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Back to login (step 1 only) */}
          {step === 1 && (
            <p className="text-center mt-5">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 text-xs text-[#5a6478] hover:text-[#8b95a8] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </Link>
            </p>
          )}
        </div>

        {/* Security badge */}
        <p className="text-center text-[10px] text-[#3a4055] mt-4 flex items-center justify-center gap-1.5">
          <Stethoscope className="w-3 h-3" />
          Secured with 256-bit encryption
        </p>
      </div>
    </div>
  );
}
