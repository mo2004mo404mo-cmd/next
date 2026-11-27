'use client';

import { useState, useRef } from 'react';
import { useActionState } from 'react';
import { loginAction, registerAction, type AuthActionState } from '@/app/actions/auth';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
  Stethoscope, Mail, Lock, User, Eye, EyeOff, Loader2,
  Shield, ArrowRight, Sparkles, ChevronDown, ChevronUp, GraduationCap, BookOpen, ShieldCheck,
} from 'lucide-react';

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
  defaultTab?: 'signin' | 'signup';
  onSuccess?: () => void;
}

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

export default function AuthModal({ open, onClose, defaultTab = 'signin', onSuccess }: AuthModalProps) {
  const [tab, setTab] = useState(defaultTab);
  // ── Server Action states (React 19 useActionState) ──
  const [loginState, loginFormAction, loginPending] = useActionState(
    loginAction,
    {} as AuthActionState,
  );
  const [registerState, registerFormAction, registerPending] = useActionState(
    registerAction,
    {} as AuthActionState,
  );

  // Note: loading/error are derived from the two action states for demo buttons
  const loading = loginPending || registerPending;
  const [siEmail, setSiEmail] = useState('');
  const [siPassword, setSiPassword] = useState('');
  const [siRemember, setSiRemember] = useState(false);
  const [siShowPw, setSiShowPw] = useState(false);

  // Sign Up state
  const [suName, setSuName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPassword, setSuPassword] = useState('');
  const [suConfirmPw, setSuConfirmPw] = useState('');
  const [suShowPw, setSuShowPw] = useState(false);
  const [suShowConfirmPw, setSuShowConfirmPw] = useState(false);
  const [suAgree, setSuAgree] = useState(false);

  // Demo account section
  const [showDemo, setShowDemo] = useState(true);
  const signInFormRef = useRef<HTMLFormElement>(null);

  const pwStrength = getPasswordStrength(suPassword);

  const resetForm = () => {
    setSiEmail(''); setSiPassword(''); setSiRemember(false); setSiShowPw(false);
    setSuName(''); setSuEmail(''); setSuPassword(''); setSuConfirmPw(''); setSuShowPw(false); setSuShowConfirmPw(false); setSuAgree(false);
  };

  // Sign-in is handled entirely by the server action (loginAction).
  // The form uses `action={loginFormAction}` — no JS onSubmit needed.
  // Server-side signIn() sets the cookie and redirects.
  // For the demo auto-fill buttons, we still need a manual submit helper
  // because they set email/password via state first.
  const handleDemoSignIn = (email: string, password: string) => {
    setSiEmail(email);
    setSiPassword(password);
    // Use requestSubmit to trigger the form's action
    setTimeout(() => {
      signInFormRef.current?.requestSubmit();
    }, 50);
  };

  // Sign-up is handled entirely by the server action (registerAction).
  // The form uses `action={registerFormAction}` — no JS onSubmit needed.
  // Server-side registerAction creates the user, then calls signIn() and redirects.
  // Validation runs on the server, so we don't need client-side checks here.

  if (!open) return null;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md rounded-2xl border border-white/[0.06] overflow-hidden"
            style={{ background: '#151821' }}
          >
            {/* Header with gradient */}
            <div className="relative px-6 pt-6 pb-4 text-center" style={{ background: 'linear-gradient(180deg, rgba(0,229,160,0.06) 0%, transparent 100%)' }}>
              <div className="w-12 h-12 bg-gradient-to-br from-[#00e5a0] to-[#00b87a] rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#00e5a0]/25">
                <Stethoscope className="w-6 h-6 text-[#0c0e14]" />
              </div>
              <h2 className="text-lg font-bold text-[#e8ecf4]">Welcome to MedQ</h2>
              <p className="text-xs text-[#5a6478] mt-1">AI-powered medical education platform</p>
            </div>

            {/* Tabs */}
            <div className="px-6">
              <Tabs value={tab} onValueChange={(v) => { setTab(v as 'signin' | 'signup'); }} className="w-full">
                <TabsList className="w-full h-9 rounded-lg mb-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <TabsTrigger
                    value="signin"
                    className="flex-1 text-xs font-semibold data-[state=active]:bg-[#00e5a0]/15 data-[state=active]:text-[#00e5a0] rounded-md transition-all"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="flex-1 text-xs font-semibold data-[state=active]:bg-[#8b5cf6]/15 data-[state=active]:text-[#8b5cf6] rounded-md transition-all"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* Sign In Form */}
                <TabsContent value="signin">
                  <form ref={signInFormRef} action={loginFormAction} className="space-y-3">
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={siEmail}
                        onChange={(e) => setSiEmail(e.target.value)}
                        className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#00e5a0]/30 focus:ring-[#00e5a0]/20"
                        autoComplete="email"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        type={siShowPw ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={siPassword}
                        onChange={(e) => setSiPassword(e.target.value)}
                        className="h-10 pl-9 pr-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#00e5a0]/30 focus:ring-[#00e5a0]/20"
                        autoComplete="current-password"
                      />
                      <button
                        type="button"
                        onClick={() => setSiShowPw(!siShowPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                      >
                        {siShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remember"
                          checked={siRemember}
                          onCheckedChange={(v) => setSiRemember(!!v)}
                          className="border-[#5a6478] data-[state=checked]:bg-[#00e5a0] data-[state=checked]:border-[#00e5a0]"
                        />
                        <Label htmlFor="remember" className="text-xs text-[#8b95a8] cursor-pointer">Remember me</Label>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button type="button" className="text-[10px] text-[#5a6478] hover:text-[#8b95a8] transition-colors underline decoration-dotted underline-offset-2">
                            Forgot password?
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">
                          Coming soon
                        </TooltipContent>
                      </Tooltip>
                    </div>

                    {loginState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2"
                      >
                        {loginState.error}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={loginPending}
                      className="w-full h-10 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-sm rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {loginPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" />Signing in...</>
                      ) : (
                        <><ArrowRight className="w-4 h-4 mr-2" />Sign In</>
                      )}
                    </Button>

                    {/* Demo Account Section */}
                    <div className="mt-3 border rounded-lg overflow-hidden" style={{ borderColor: 'rgba(0,229,160,0.15)', background: 'rgba(0,229,160,0.03)' }}>
                      <button
                        type="button"
                        onClick={() => setShowDemo(!showDemo)}
                        className="w-full flex items-center justify-between px-3 py-2.5 text-xs hover:bg-white/[0.02] transition-all"
                        style={{ color: '#00e5a0' }}
                      >
                        <span className="flex items-center gap-1.5">
                          <Shield className="w-3.5 h-3.5" />
                          <span className="font-semibold">Quick Demo Login</span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(0,229,160,0.1)', color: '#00e5a0' }}>No signup needed</span>
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
                            <div className="px-3 pb-3 pt-1 space-y-2">
                              <p className="text-[10px] text-[#5a6478] mb-2">Click to auto-fill credentials for testing</p>
                              {[
                                { label: 'Student', email: 'student@medq.com', icon: GraduationCap, color: '#00e5a0' },
                                { label: 'Educator', email: 'educator@medq.com', icon: BookOpen, color: '#8b5cf6' },
                                { label: 'Admin', email: 'admin@medq.com', icon: ShieldCheck, color: '#f59e0b' },
                              ].map((demo) => (
                                <button
                                  key={demo.email}
                                  type="button"
                                  disabled={loading}
                                  onClick={() => handleDemoSignIn(demo.email, 'test123')}
                                  className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                                  style={{ background: `${demo.color}10`, border: `1px solid ${demo.color}20` }}
                                >
                                  <div
                                    className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0"
                                    style={{ background: `${demo.color}20` }}
                                  >
                                    <demo.icon className="w-3.5 h-3.5" style={{ color: demo.color }} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="text-xs font-semibold text-[#e8ecf4]">{demo.label}</div>
                                    <div className="text-[10px] text-[#5a6478] truncate">{demo.email}</div>
                                  </div>
                                  <ArrowRight className="w-3 h-3 text-[#5a6478] flex-shrink-0" />
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </form>
                </TabsContent>

                {/* Sign Up Form */}
                <TabsContent value="signup">
                  <form action={registerFormAction} className="space-y-3">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        type="text"
                        name="name"
                        placeholder="Full name"
                        value={suName}
                        onChange={(e) => setSuName(e.target.value)}
                        className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                        autoComplete="name"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        type="email"
                        name="email"
                        placeholder="Email address"
                        value={suEmail}
                        onChange={(e) => setSuEmail(e.target.value)}
                        className="h-10 pl-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                        autoComplete="email"
                      />
                    </div>

                    <div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                        <Input
                          type={suShowPw ? 'text' : 'password'}
                          name="password"
                          placeholder="Password"
                          value={suPassword}
                          onChange={(e) => setSuPassword(e.target.value)}
                          className="h-10 pl-9 pr-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                          autoComplete="new-password"
                        />
                        <button
                          type="button"
                          onClick={() => setSuShowPw(!suShowPw)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                        >
                          {suShowPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {/* Password strength indicator */}
                      {suPassword && (
                        <div className="mt-1.5 space-y-1">
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

                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5a6478]" />
                      <Input
                        type={suShowConfirmPw ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm password"
                        value={suConfirmPw}
                        onChange={(e) => setSuConfirmPw(e.target.value)}
                        className="h-10 pl-9 pr-9 text-sm rounded-lg border-white/[0.06] bg-[#0c0e14]/50 text-[#e8ecf4] placeholder:text-[#3a4055] focus:border-[#8b5cf6]/30 focus:ring-[#8b5cf6]/20"
                        autoComplete="new-password"
                      />
                      <button
                        type="button"
                        onClick={() => setSuShowConfirmPw(!suShowConfirmPw)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5a6478] hover:text-[#8b95a8] transition-colors"
                      >
                        {suShowConfirmPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex items-start gap-2">
                      <Checkbox
                        id="agree"
                        name="agreed"
                        checked={suAgree}
                        onCheckedChange={(v) => setSuAgree(!!v)}
                        className="border-[#5a6478] data-[state=checked]:bg-[#8b5cf6] data-[state=checked]:border-[#8b5cf6] mt-0.5"
                      />
                      <Label htmlFor="agree" className="text-xs text-[#8b95a8] leading-relaxed cursor-pointer">
                        I agree to the{' '}
                        <span className="text-[#8b5cf6] underline decoration-dotted underline-offset-2">Terms of Service</span>
                        {' '}and{' '}
                        <span className="text-[#8b5cf6] underline decoration-dotted underline-offset-2">Privacy Policy</span>
                      </Label>
                    </div>

                    {registerState.error && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-[#ff5757] bg-[#ff5757]/10 border border-[#ff5757]/20 rounded-lg px-3 py-2"
                      >
                        {registerState.error}
                      </motion.div>
                    )}

                    <Button
                      type="submit"
                      disabled={registerPending}
                      className="w-full h-10 bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-bold text-sm rounded-lg transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                    >
                      {registerPending ? (
                        <><Loader2 className="w-4 h-4 animate-spin mr-2" />Creating account...</>
                      ) : (
                        <><Sparkles className="w-4 h-4 mr-2" />Create Free Account</>
                      )}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 mt-2 border-t border-white/[0.04]">
              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#3a4055]">
                <Shield className="w-3 h-3" />
                <span>Secured with 256-bit encryption</span>
              </div>
            </div>

            {/* Close button */}
            <button
              onClick={() => { resetForm(); onClose(); }}
              className="absolute top-4 right-4 w-7 h-7 rounded-lg flex items-center justify-center text-[#5a6478] hover:text-[#e8ecf4] hover:bg-white/[0.04] transition-all"
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
