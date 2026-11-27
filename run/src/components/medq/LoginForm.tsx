'use client';

import { useState, useRef } from 'react';
import { useActionState } from 'react';
import { loginAction, type AuthActionState } from '@/app/actions/auth';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, ArrowRight, GraduationCap, BookOpen, ShieldCheck, Stethoscope, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, {} as AuthActionState);
  const [showPassword, setShowPassword] = useState(false);
  const [showDemo, setShowDemo] = useState(true);
  const formRef = useRef<HTMLFormElement>(null);

  const handleDemoSignIn = (email: string) => {
    const form = formRef.current;
    if (!form) return;

    const emailInput = form.elements.namedItem('email');
    const passwordInput = form.elements.namedItem('password');
    if (!(emailInput instanceof HTMLInputElement) || !(passwordInput instanceof HTMLInputElement)) return;

    emailInput.value = email;
    passwordInput.value = 'test123';
    form.requestSubmit();
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4" style={{ background: '#0c0e14' }}>
      <div className="w-full max-w-md">
        {/* Logo + Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#00e5a0] to-[#00b87a] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-[#00e5a0]/25">
            <Stethoscope className="w-7 h-7 text-[#0c0e14]" />
          </div>
          <h1 className="text-2xl font-bold text-[#e8ecf4]">Welcome back</h1>
          <p className="text-sm text-[#8b95a8] mt-1">Sign in to your MedQ account</p>
        </div>

        {/* Form */}
          <div className="rounded-2xl border border-white/[0.06] p-6" style={{ background: '#151821' }}>
            <form ref={formRef} action={formAction} className="space-y-4">
              {/* Email */}
              <div>
                <Label htmlFor="email" className="text-xs text-[#8b95a8] mb-1.5 block">Email address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="h-11 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#6b7590] focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0]"
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label htmlFor="password" className="text-xs text-[#8b95a8]">Password</Label>
                  <Link href="/forgot-password" className="text-xs text-[#00e5a0] hover:text-[#00d090] transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="h-11 pr-14 text-sm rounded-xl border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#6b7590] focus:border-[#00e5a0]/60 focus:ring-2 focus:ring-[#00e5a0]"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 flex min-h-[44px] min-w-[44px] items-center justify-center text-[#8b95a8] hover:text-[#e8ecf4] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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
                className="w-full h-11 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-sm rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
              >
                {pending ? (
                  <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-[#0c0e14]/30 border-t-[#0c0e14] rounded-full animate-spin" />Signing in...</span>
                ) : (
                  <><ArrowRight className="w-4 h-4 mr-2" />Sign In</>
                )}
              </Button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/[0.06]" />
              <span className="text-[10px] text-[#8b95a8] uppercase tracking-wider">or</span>
              <div className="flex-1 h-px bg-white/[0.06]" />
            </div>

            {/* Demo Accounts */}
            <div className="border rounded-xl overflow-hidden" style={{ borderColor: 'rgba(0,229,160,0.15)', background: 'rgba(0,229,160,0.03)' }}>
              <button
                type="button"
                onClick={() => setShowDemo(!showDemo)}
                className="w-full flex items-center justify-between px-4 py-3 text-xs hover:bg-white/[0.02] transition-all"
                style={{ color: '#00e5a0' }}
              >
                <span className="flex items-center gap-2">
                  <Stethoscope className="w-3.5 h-3.5" />
                  <span className="font-semibold">Try a demo account</span>
                </span>
                {showDemo ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
              <AnimatePresence>
                {showDemo && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-1 space-y-2">
                      {[
                        { label: 'Student', email: 'student@medq.com', icon: GraduationCap, color: '#00e5a0' },
                        { label: 'Educator', email: 'educator@medq.com', icon: BookOpen, color: '#8b5cf6' },
                        { label: 'Admin', email: 'admin@medq.com', icon: ShieldCheck, color: '#f59e0b' },
                      ].map((demo) => (
                        <button
                          key={demo.email}
                          type="button"
                          onClick={() => handleDemoSignIn(demo.email)}
                          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all hover:scale-[1.01] active:scale-[0.99]"
                          style={{ background: `${demo.color}10`, border: `1px solid ${demo.color}20` }}
                        >
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${demo.color}20` }}>
                            <demo.icon className="w-4 h-4" style={{ color: demo.color }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-semibold text-[#e8ecf4]">{demo.label}</div>
                            <div className="text-[10px] text-[#8b95a8] truncate">{demo.email}</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footer link */}
            <p className="text-center text-xs text-[#8b95a8] mt-5">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="text-[#00e5a0] hover:text-[#00d090] font-semibold transition-colors">Create an account</Link>
            </p>
          </div>

        {/* Security badge */}
        <p className="text-center text-[10px] text-[#8b95a8] mt-4 flex items-center justify-center gap-1.5">
          <Stethoscope className="w-3 h-3" />
          Secured with 256-bit encryption
        </p>
      </div>
    </main>
  );
}
