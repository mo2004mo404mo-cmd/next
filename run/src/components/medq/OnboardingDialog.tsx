'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Stethoscope, GraduationCap, Clock, ArrowRight, ArrowLeft,
  Sparkles, Loader2, Check, User, BookOpen, Target, Heart,
  TrendingUp, Brain, Trophy, Activity, Eye, Microscope,
  Pill, Baby, Bone, BrainCircuit, Syringe, ShieldPlus,
} from 'lucide-react';
import { toast } from 'sonner';

interface OnboardingDialogProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const SPECIALTIES = [
  'Internal Medicine', 'Surgery', 'Pediatrics', 'OB/GYN',
  'Psychiatry', 'Radiology', 'Emergency Medicine', 'Anesthesiology',
  'Dermatology', 'Pathology', 'Family Medicine', 'Neurology',
  'Cardiology', 'Orthopedics', 'Other',
];

const EXAMS = [
  'USMLE Step 1', 'USMLE Step 2 CK', 'USMLE Step 3',
  'PLAB', 'FMGE', 'MCAT',
  'Medical School Finals', 'Residency In-Training',
  'Board Certification', 'Other',
];

const STUDY_TIMES = [
  { value: 'morning', label: 'Morning', icon: '🌅', desc: 'Best for fresh focus' },
  { value: 'afternoon', label: 'Afternoon', icon: '☀️', desc: 'Steady energy' },
  { value: 'evening', label: 'Evening', icon: '🌆', desc: 'Wind-down review' },
  { value: 'night', label: 'Night', icon: '🌙', desc: 'Quiet deep work' },
];

const TOPIC_INTERESTS = [
  { id: 'cardiology', label: 'Cardiology', icon: Heart, color: '#ff5757' },
  { id: 'neurology', label: 'Neurology', icon: Brain, color: '#8b5cf6' },
  { id: 'pulmonology', label: 'Pulmonology', icon: Activity, color: '#4fc3f7' },
  { id: 'gastroenterology', label: 'GI / Hepatology', icon: Microscope, color: '#f59e0b' },
  { id: 'nephrology', label: 'Nephrology', icon: Activity, color: '#06b6d4' },
  { id: 'endocrinology', label: 'Endocrine', icon: Activity, color: '#ec4899' },
  { id: 'hematology', label: 'Hematology', icon: Syringe, color: '#ef4444' },
  { id: 'oncology', label: 'Oncology', icon: ShieldPlus, color: '#a855f7' },
  { id: 'infectious', label: 'Infectious Disease', icon: ShieldPlus, color: '#10b981' },
  { id: 'rheumatology', label: 'Rheumatology', icon: Bone, color: '#0ea5e9' },
  { id: 'pediatrics', label: 'Pediatrics', icon: Baby, color: '#fbbf24' },
  { id: 'ophthalmology', label: 'Ophthalmology', icon: Eye, color: '#14b8a6' },
  { id: 'psychiatry', label: 'Psychiatry', icon: BrainCircuit, color: '#8b5cf6' },
  { id: 'pharmacology', label: 'Pharmacology', icon: Pill, color: '#84cc16' },
];

const TOTAL_STEPS = 6;

export default function OnboardingDialog({ open, onClose, onComplete }: OnboardingDialogProps) {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState({
    name: '',
    medicalSchool: '',
    graduationYear: '',
  });
  const [specialty, setSpecialty] = useState('');
  const [examType, setExamType] = useState('');
  const [studyHours, setStudyHours] = useState([2]);
  const [studyTime, setStudyTime] = useState('morning');
  const [interests, setInterests] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  const handleNext = () => {
    if (step === 1 && (!profile.name.trim())) {
      toast.error('Please enter your name');
      return;
    }
    if (step === 2 && !specialty) {
      toast.error('Please select your specialty');
      return;
    }
    if (step === 3 && !examType) {
      toast.error('Please select the exam you are preparing for');
      return;
    }
    setStep(s => Math.min(s + 1, TOTAL_STEPS - 1));
  };

  const handleBack = () => {
    setStep(s => Math.max(s - 1, 0));
  };

  const toggleInterest = (id: string) => {
    setInterests(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const handleFinish = async () => {
    setSaving(true);
    try {
      const payload: Record<string, any> = {
        onboardingCompleted: true,
      };
      if (profile.name.trim()) payload.name = profile.name.trim();
      if (profile.medicalSchool.trim()) payload.medicalSchool = profile.medicalSchool.trim();
      if (profile.graduationYear.trim()) {
        const yr = parseInt(profile.graduationYear, 10);
        if (!isNaN(yr) && yr >= 1950 && yr <= 2100) payload.graduationYear = yr;
      }
      if (specialty) payload.specialty = specialty;

      // Persist primary onboarding fields
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        // Stash preferences client-side for personalization (non-critical)
        try {
          const prefs = {
            examType,
            studyHoursPerDay: studyHours[0],
            preferredStudyTime: studyTime,
            topicInterests: interests,
            completedAt: new Date().toISOString(),
          };
          localStorage.setItem('medq-onboarding-prefs', JSON.stringify(prefs));
        } catch {}

        toast.success('Welcome to MedQ! Let\'s start learning 🎉');
        onComplete();
        onClose();
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (!open) return null;

  const progress = Math.round(((step) / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg rounded-2xl border border-white/[0.06] overflow-hidden flex flex-col"
        style={{ background: '#151821', maxHeight: 'calc(100vh - 32px)' }}
      >
        {/* Step indicator */}
        <div className="px-6 pt-6 pb-2 flex-shrink-0">
          <div className="flex items-center gap-2 mb-3">
            {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
              <div key={i} className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: i <= step ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full rounded-full"
                  style={{
                    background: i <= step
                      ? 'linear-gradient(90deg, #00e5a0, #4fc3f7)'
                      : 'transparent',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-[#5a6478] uppercase tracking-wider">
              Step {step + 1} of {TOTAL_STEPS} · {progress}%
            </span>
            {step > 0 && (
              <button
                onClick={onClose}
                className="text-[10px] text-[#5a6478] hover:text-[#8b95a8] transition-colors"
              >
                Skip for now
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="step0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-6 text-center"
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring' }}
                  className="w-20 h-20 rounded-3xl mx-auto mb-4 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #00e5a0, #4fc3f7)' }}
                >
                  <Sparkles className="w-10 h-10 text-[#0c0e14]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-[#e8ecf4] mb-2">
                  Welcome to MedQ
                </h2>
                <p className="text-sm text-[#8b95a8] mb-6 max-w-sm mx-auto leading-relaxed">
                  Your AI-powered medical study companion. Let&apos;s personalize your
                  experience — it only takes a minute.
                </p>

                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    { icon: Target, label: 'Personalized', color: '#00e5a0' },
                    { icon: TrendingUp, label: 'Adaptive', color: '#4fc3f7' },
                    { icon: Trophy, label: 'Gamified', color: '#f59e0b' },
                  ].map(({ icon: Icon, label, color }) => (
                    <div key={label} className="p-3 rounded-xl border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <Icon className="w-5 h-5 mx-auto mb-1.5" style={{ color }} />
                      <p className="text-[10px] text-[#8b95a8] font-semibold">{label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-4"
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#4fc3f7]/10 flex items-center justify-center mx-auto mb-3">
                    <User className="w-7 h-7 text-[#4fc3f7]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#e8ecf4]">Tell us about you</h3>
                  <p className="text-xs text-[#8b95a8] mt-1">A few details to get started</p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-[#8b95a8] mb-1.5 block uppercase tracking-wide">
                      Full Name <span className="text-[#ff5757]">*</span>
                    </label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                      placeholder="Dr. Jane Doe"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#0c0e14]/80 border border-white/[0.06] text-[#e8ecf4] placeholder:text-[#3a4055] focus:outline-none focus:border-[#00e5a0]/30 focus:ring-1 focus:ring-[#00e5a0]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#8b95a8] mb-1.5 block uppercase tracking-wide">
                      Medical School
                    </label>
                    <input
                      type="text"
                      value={profile.medicalSchool}
                      onChange={e => setProfile(p => ({ ...p, medicalSchool: e.target.value }))}
                      placeholder="Johns Hopkins School of Medicine"
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#0c0e14]/80 border border-white/[0.06] text-[#e8ecf4] placeholder:text-[#3a4055] focus:outline-none focus:border-[#00e5a0]/30 focus:ring-1 focus:ring-[#00e5a0]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-[#8b95a8] mb-1.5 block uppercase tracking-wide">
                      Expected Graduation Year
                    </label>
                    <input
                      type="number"
                      value={profile.graduationYear}
                      onChange={e => setProfile(p => ({ ...p, graduationYear: e.target.value }))}
                      placeholder="2027"
                      min={1950}
                      max={2100}
                      className="w-full px-3.5 py-2.5 rounded-xl text-sm bg-[#0c0e14]/80 border border-white/[0.06] text-[#e8ecf4] placeholder:text-[#3a4055] focus:outline-none focus:border-[#00e5a0]/30 focus:ring-1 focus:ring-[#00e5a0]/20 transition-all"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-4"
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#00e5a0]/10 flex items-center justify-center mx-auto mb-3">
                    <Stethoscope className="w-7 h-7 text-[#00e5a0]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#e8ecf4]">Your Specialty</h3>
                  <p className="text-xs text-[#8b95a8] mt-1">What&apos;s your primary focus?</p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {SPECIALTIES.map(s => (
                    <button
                      key={s}
                      onClick={() => setSpecialty(s)}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                        specialty === s
                          ? 'bg-[#00e5a0]/15 border-[#00e5a0]/30 text-[#00e5a0]'
                          : 'bg-[#0c0e14]/50 border-white/[0.04] text-[#8b95a8] hover:border-white/[0.08] hover:text-[#c8d0e0]'
                      }`}
                    >
                      {specialty === s && <Check className="w-3 h-3 inline mr-1" />}
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-4"
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#8b5cf6]/10 flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-7 h-7 text-[#8b5cf6]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#e8ecf4]">Exam Preparation</h3>
                  <p className="text-xs text-[#8b95a8] mt-1">Which exam are you targeting?</p>
                </div>

                <div className="grid grid-cols-1 gap-2 max-h-[280px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {EXAMS.map(e => (
                    <button
                      key={e}
                      onClick={() => setExamType(e)}
                      className={`px-4 py-3 rounded-xl text-xs font-semibold transition-all border text-left flex items-center ${
                        examType === e
                          ? 'bg-[#8b5cf6]/15 border-[#8b5cf6]/30 text-[#8b5cf6]'
                          : 'bg-[#0c0e14]/50 border-white/[0.04] text-[#8b95a8] hover:border-white/[0.08] hover:text-[#c8d0e0]'
                      }`}
                    >
                      {examType === e && <Check className="w-3.5 h-3.5 mr-2 flex-shrink-0" />}
                      <span className={examType === e ? '' : 'ml-5'}>{e}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-4"
              >
                <div className="text-center mb-5">
                  <div className="w-14 h-14 rounded-2xl bg-[#f59e0b]/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="w-7 h-7 text-[#f59e0b]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#e8ecf4]">Study Schedule</h3>
                  <p className="text-xs text-[#8b95a8] mt-1">When and how much do you study?</p>
                </div>

                <div className="px-2 mb-5">
                  <div className="text-center mb-3">
                    <span className="text-4xl font-bold text-[#00e5a0]">{studyHours[0]}</span>
                    <span className="text-sm text-[#5a6478] ml-1">hrs/day</span>
                  </div>
                  <Slider
                    value={studyHours}
                    onValueChange={setStudyHours}
                    min={0.5}
                    max={8}
                    step={0.5}
                    className="w-full [&_[data-slot=slider-track]]:bg-white/[0.06] [&_[data-slot=slider-range]]:bg-gradient-to-r [&_[data-slot=slider-range]]:from-[#00e5a0] [&_[data-slot=slider-range]]:to-[#4fc3f7] [&_[data-slot=slider-thumb]]:border-[#00e5a0] [&_[data-slot=slider-thumb]]:bg-[#151821]"
                  />
                  <div className="flex items-center justify-between mt-2 text-[10px] text-[#3a4055]">
                    <span>0.5 hrs</span>
                    <span>8 hrs</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-[#8b95a8] mb-2 block uppercase tracking-wide">
                    Preferred Study Time
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {STUDY_TIMES.map(t => (
                      <button
                        key={t.value}
                        onClick={() => setStudyTime(t.value)}
                        className={`px-3 py-3 rounded-xl text-left transition-all border ${
                          studyTime === t.value
                            ? 'bg-[#00e5a0]/10 border-[#00e5a0]/30'
                            : 'bg-[#0c0e14]/50 border-white/[0.04] hover:border-white/[0.08]'
                        }`}
                      >
                        <div className="text-xl mb-1">{t.icon}</div>
                        <p className={`text-xs font-bold ${studyTime === t.value ? 'text-[#00e5a0]' : 'text-[#e8ecf4]'}`}>
                          {t.label}
                        </p>
                        <p className="text-[9px] text-[#5a6478] mt-0.5">{t.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="px-6 py-4"
              >
                <div className="text-center mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#ec4899]/10 flex items-center justify-center mx-auto mb-3">
                    <BookOpen className="w-7 h-7 text-[#ec4899]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#e8ecf4]">Topics of Interest</h3>
                  <p className="text-xs text-[#8b95a8] mt-1">
                    Pick up to 5 — we&apos;ll surface more questions on these
                    <br />
                    <span className="text-[#5a6478]">{interests.length} / 5 selected</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 max-h-[240px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {TOPIC_INTERESTS.map(t => {
                    const selected = interests.includes(t.id);
                    const Icon = t.icon;
                    const maxReached = interests.length >= 5 && !selected;
                    return (
                      <button
                        key={t.id}
                        onClick={() => !maxReached && toggleInterest(t.id)}
                        disabled={maxReached}
                        className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-2 ${
                          selected
                            ? 'border-[#ec4899]/30 bg-[#ec4899]/10'
                            : 'bg-[#0c0e14]/50 border-white/[0.04] text-[#8b95a8] hover:border-white/[0.08] hover:text-[#c8d0e0]'
                        } ${maxReached ? 'opacity-40 cursor-not-allowed' : ''}`}
                      >
                        <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: selected ? t.color : '#5a6478' }} />
                        <span className={selected ? 'text-[#e8ecf4]' : ''}>{t.label}</span>
                        {selected && <Check className="w-3 h-3 ml-auto text-[#ec4899]" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-between flex-shrink-0">
          {step > 0 ? (
            <Button
              variant="ghost"
              onClick={handleBack}
              className="text-xs text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.04]"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
              Back
            </Button>
          ) : (
            <div />
          )}

          {step === 0 ? (
            <Button
              onClick={handleNext}
              className="h-9 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs rounded-lg"
            >
              Get Started
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : step < TOTAL_STEPS - 1 ? (
            <Button
              onClick={handleNext}
              className="h-9 bg-[#00e5a0] hover:bg-[#00d090] text-[#0c0e14] font-bold text-xs rounded-lg"
            >
              Next
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          ) : (
            <Button
              onClick={handleFinish}
              disabled={saving}
              className="h-9 bg-gradient-to-r from-[#00e5a0] to-[#4fc3f7] hover:opacity-90 text-[#0c0e14] font-bold text-xs rounded-lg disabled:opacity-50"
            >
              {saving ? (
                <><Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />Setting up...</>
              ) : (
                <><Sparkles className="w-3.5 h-3.5 mr-1.5" />Start Learning!</>
              )}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
