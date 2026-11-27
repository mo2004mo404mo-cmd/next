'use client';

import { useState } from 'react';
import { useActionState } from 'react';
import { registerAction, type AuthActionState } from '@/app/actions/auth';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Eye, EyeOff, Sparkles, Stethoscope, Shield, Lock, Mail, User } from 'lucide-react';
import { motion } from 'framer-motion';

function getPasswordStrength(password: string): { label: string; color: string; width: string } {
  if (!password) return { label: '', color: '', width: '0%' };
  let score = 0;
  if (password.length >= 6) score++;
  if (password.length >= 10) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  if (score <= 2) return { label: 'Weak', color: '#ff5757', width: '33%' };
  if (score <= 3) return { label: 'Medium', color: '#f59e0b', width: '66%' };
  return { label: 'Strong', color: '#00e5a0', width: '100%' };
}

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(registerAction, {} as AuthActionState);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const pwStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0c0e14' }}>
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#8b5cf6] to-[#7c3aed] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#8b5cf6]/25">
            <Sparkles className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#e8ecf4]">Create your account</h1>
          <p className="text-sm text-[#5a6478] mt-1">Start your medical education journey</p>
        </div>

        {/* Form */}
        <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: '#151821' }}>
          <form action={formAction} className="space-y-4">
            {/* Name */}
            <div>
              <Label htmlFor="name" className="text-xs text-[#8b95a8] mb-1.5 block">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  className="h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="signup-email" className="text-xs text-[#8b95a8] mb-1.5 block">Email address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  id="signup-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 pl-9 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <Label htmlFor="signup-password" className="text-xs text-[#8b95a8] mb-1.5 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  id="signup-password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 6 characters"
                  autoComplete="new-password"
                  className="h-11 pl-9 pr-10 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: pwStrength.width }}
                      transition={{ duration: 0.3 }}
                      className="h-full rounded-full"
                      style={{ background: pwStrength.color }}
                    />
                  </div>
                  <p className="text-[10px] font-medium" style={{ color: pwStrength.color }}>
                    Password strength: {pwStrength.label}
                  </p>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <Label htmlFor="confirmPassword" className="text-xs text-[#8b95a8] mb-1.5 block">Confirm password</Label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  autoComplete="new-password"
                  className="h-11 pl-9 pr-10 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2.5">
              <Checkbox
                id="agreed"
                name="agreed"
                className="border-[#5a6478] data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6] mt-0.5"
              />
              <Label htmlFor="agreed" className="text-xs text-[#8b95a8] leading-relaxed cursor-pointer">
                I agree to the{' '}
                <span className="text-[#8b5cf6] underline decoration-dotted underline-offset-2">Terms of Service</span>
                {' '}and{' '}
                <span className="text-[#8b5cf6] underline decoration-dotted underline-offset-2">Privacy Policy</span>
              </Label>
            </div>

            {/* Error */}
            {state.error && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2"
              >
                {state.error}
              </motion.div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              disabled={pending}
              className="w-full h-11 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
            >
              {pending ? (
                <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</span>
              ) : (
                <><Sparkles className="w-4 h-4 mr-2" />Create Free Account</>
              )}
            </Button>
          </form>

          {/* Footer link */}
          <p className="text-center text-xs text-[#5a6478] mt-5">
            Already have an account?{' '}
            <Link href="/login" className="text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors">Sign in</Link>
          </p>
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
