'use client';

/**
 * MedQ advanced landing page — a marketing surface that explains the app to
 * new visitors and drives them to sign up / launch the app.
 *
 * Route: /landing
 *
 * Design language:
 *   - Dark background (`#0a0e1a` deep, `#0c0e14` surface)
 *   - `#00e5a0` mint accent for primary CTAs and highlights
 *   - `#8b5cf6` violet for secondary accents
 *   - Inter / system sans-serif body, mono for stats
 *
 * Advanced features (vs. the simple version):
 *   - Scroll progress bar
 *   - Rotating headline ("USMLE / MRCP / PLAB / NEET / USMLE Step 2 CK")
 *   - Animated count-up stats (IntersectionObserver)
 *   - Floating UI mockup cards in hero with subtle parallax
 *   - Live activity ticker
 *   - Trust logo marquee (infinite scroll)
 *   - Bento grid features (asymmetric layout)
 *   - Interactive product preview (animated mockup)
 *   - Comparison table (MedQ vs alternatives)
 *   - Pricing toggle (monthly / annual)
 *   - Testimonials carousel (auto-rotating + manual controls)
 *   - FAQ accordion
 *   - Sticky mobile CTA bar
 */

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  MessageCircle, Brain, Trophy, Users, Target, Pill, Mic,
  BookOpen, Sparkles, Zap, ArrowRight, Check, Star, Menu, X,
  Stethoscope, FlaskConical, Activity, Shield, Globe2,
  ChevronDown, ChevronLeft, ChevronRight, Quote, Play,
  Lock, Infinity as InfinityIcon, Crown, TrendingUp, Clock,
  GraduationCap, HeartPulse, Microscope, LineChart, Award,
  Cpu, BarChart3, Flame, Calendar,
} from 'lucide-react';
import {
  ScrollReveal, TiltCard, MagneticButton, Sparkline, FloatingScrollTop,
  RegionSelector, LiveStatsBar, GradientText,
  LiveCommunitySection, AiDemoSection, AchievementsSection,
} from './advanced-components';
import {
  AuroraBackground, CursorGlow, LivePresence, SignupToasts,
  AnatomyViewer, KnowledgeGraph, DemoVideoSection,
  TeamSection, SecuritySection, NewsPreviewSection,
  PersonalizationModal, ScrollVelocityBanner, TypewriterText,
  FloatingDock, LiveNotificationBadge,
} from './advanced-components-2';
import {
  WeeklyPlanner, WeaknessDiagnostic, PricingCalculator, MascotSection,
  BeforeAfterSlider, ResultsShowcase, IntegrationMarquee, SocialProofFeed,
  ROICalculator, CommandPaletteDemo, ThemeShowcase, StatTicker,
} from './advanced-components-3';
import {
  LiveQuizArena, AICaseGenerator, DnaHelix, ExamCountdown, StudyTimer,
  VoiceTutor, FlashcardDeck, ProgressConstellation, GlobeHeatmap,
  DailyChallenge, MentorMatchCard, SpacedRepetitionViz,
} from './advanced-components-4';

import {
  EcgTrace, StreakCalendar, CaseTimeline, CodeTerminal,
  NeuralNetworkViz, ParallaxDepthScene, LeaderboardRace, MorphingLogo,
  LiveExamSimulator, ConfettiCelebration, WaveformPlayer, StatsCube3D,
} from './advanced-components-5';

import {
  HeroParallax3D, StickyCtaBar, MobileAppShowcase, TestimonialCoverflow,
  FeatureMatrix, LabResultsViewer, HeartbeatEcgBanner, ReadingProgress,
  AchievementPopup, CoverageMap,
} from './advanced-components-6';

import {
  SpecialtyExplorer, AIDiagnosisSimulator, SkillRadar, PeerCompare,
  StudyPlanGenerator, ClinicalCaseCarousel, MemoryAnchorCards,
  QuestionTypeShowcase, LiveQuestionStream, GamifiedStreakTree,
} from './advanced-components-7';

// ─── Data ──────────────────────────────────────────────────────────

const EXAM_ROTATION = [
  'USMLE Step 1',
  'USMLE Step 2 CK',
  'MRCP Part 1',
  'PLAB',
  'NEET-PG',
  'MCAT',
  'COMLEX',
  'Internal Medicine Board',
];

const STATS = [
  { value: 52, suffix: 'K+', label: 'Active medical students', sub: 'across 80+ countries' },
  { value: 1.2, suffix: 'M', label: 'Questions answered', sub: 'in the last 30 days', decimals: 1 },
  { value: 94, suffix: '%', label: 'Pass-rate uplift', sub: 'after 30 days of use' },
  { value: 240, suffix: '+', label: 'Day streaks', sub: 'common among daily users' },
];

const FEATURES_BENTO = [
  {
    icon: MessageCircle,
    title: 'AI Tutor',
    description: 'Personalized Socratic tutoring on any medical topic. Picks the best model for your question and adapts to your level in real time.',
    color: '#00e5a0',
    badge: 'Premium',
    span: 'lg:col-span-2 lg:row-span-2',
    preview: 'tutor',
  },
  {
    icon: BookOpen,
    title: 'Question Bank',
    description: 'Thousands of board-style questions with detailed explanations and per-topic mastery tracking.',
    color: '#8b5cf6',
    span: '',
  },
  {
    icon: Brain,
    title: 'Adaptive Flashcards',
    description: 'Smart decks generated from your weak areas and mistakes.',
    color: '#06b6d4',
    span: '',
  },
  {
    icon: Trophy,
    title: 'Daily Challenge',
    description: 'A new curated question every day. Compete globally, earn streak bonuses.',
    color: '#f59e0b',
    span: '',
  },
  {
    icon: Target,
    title: 'Weak Areas',
    description: 'AI continuously surfaces topics you need to review — before they cost you on exam day.',
    color: '#ff5757',
    span: 'lg:col-span-2',
  },
  {
    icon: Pill,
    title: 'Drug Interactions',
    description: 'Instant interaction profiles with severity ratings.',
    color: '#ff5757',
    badge: 'New',
    span: '',
  },
  {
    icon: Mic,
    title: 'Oral Exam Simulator',
    description: 'Voice-based AI examiner. Real-time feedback on structure, content, and confidence.',
    color: '#ec4899',
    badge: 'New',
    span: '',
  },
  {
    icon: Stethoscope,
    title: 'Case Simulator',
    description: 'Realistic clinical cases. Work up the differential, order tests, get scored on diagnostic reasoning.',
    color: '#00e5a0',
    badge: 'Premium',
    span: 'lg:col-span-2',
  },
];

const STEPS = [
  {
    number: '01',
    title: 'Take a diagnostic',
    description: 'A 10-minute adaptive quiz maps your strengths and weak areas across the full curriculum — so your study plan is yours from day one.',
    icon: Activity,
  },
  {
    number: '02',
    title: 'Study with AI',
    description: 'Get a personalized daily plan: questions, flashcards, tutor sessions, and case simulations — all targeted at the gaps that matter most.',
    icon: Sparkles,
  },
  {
    number: '03',
    title: 'Track and compete',
    description: 'Watch your mastery climb topic by topic. Earn streaks, climb the leaderboard, and walk into exam day knowing exactly where you stand.',
    icon: Trophy,
  },
];

const TESTIMONIALS = [
  {
    quote: "I went from 60% on practice tests to 92% on the real thing. The Weak Areas feature caught gaps I didn't even know I had. It's not a question bank — it's a feedback loop.",
    name: 'Dr. Amira Hassan',
    role: 'USMLE Step 2 CK, 2025',
    rating: 5,
    location: 'Cairo, Egypt',
  },
  {
    quote: "The AI tutor is the first one that actually feels like a doctor teaching me — not a search engine. It adapts to what I don't know in real time, and challenges me instead of coddling me.",
    name: 'Marcus Lee',
    role: 'Internal Medicine resident',
    rating: 5,
    location: 'Seoul, South Korea',
  },
  {
    quote: "Daily Challenge + streaks turned studying into a habit. 240 days straight and counting. Passed MRCP Part 1 last month. I genuinely don't think I could have done it without MedQ.",
    name: 'Priya Sharma',
    role: 'MRCP Part 1, 2025',
    rating: 5,
    location: 'Mumbai, India',
  },
  {
    quote: "The Oral Exam Simulator was a game changer for my PLAB 2 prep. I practiced 60+ cases in two weeks. By exam day, my confidence was at a level I didn't know was possible.",
    name: 'Dr. Kwame Mensah',
    role: 'PLAB 2, 2024',
    rating: 5,
    location: 'Accra, Ghana',
  },
  {
    quote: "I'm an IMG adjusting to the US system. The Case Simulator taught me the workup patterns US residencies expect. My attendings started commenting on my differentials within a month.",
    name: 'Dr. Sofia Reyes',
    role: 'IM Resident, PGY-2',
    rating: 5,
    location: 'Mexico City, Mexico',
  },
];

const TRUST_LOGOS = [
  'Harvard Medical School',
  'Johns Hopkins',
  'Oxford Medical School',
  'Stanford Medicine',
  'Mayo Clinic',
  'Karolinska Institutet',
  'Cambridge Medical',
  'Yale School of Medicine',
  'Imperial College London',
  'Toronto Faculty of Medicine',
];

const COMPARISON_ROWS = [
  { feature: 'AI tutor that adapts to your level', medq: true, textbook: false, generic: 'partial', qbank: false },
  { feature: 'Adaptive spaced repetition', medq: true, textbook: false, generic: false, qbank: 'partial' },
  { feature: 'Real-time weak-area detection', medq: true, textbook: false, generic: false, qbank: 'partial' },
  { feature: 'Voice-based oral exam practice', medq: true, textbook: false, generic: false, qbank: false },
  { feature: 'Clinical case simulations', medq: true, textbook: 'partial', generic: 'partial', qbank: 'partial' },
  { feature: 'Works offline (PWA)', medq: true, textbook: true, generic: false, qbank: false },
  { feature: 'Bring-your-own-key (BYOK) encryption', medq: true, textbook: false, generic: false, qbank: false },
  { feature: 'Daily updates with new content', medq: true, textbook: false, generic: true, qbank: 'partial' },
  { feature: 'Curriculum-aligned question bank', medq: true, textbook: 'partial', generic: false, qbank: true },
  { feature: 'Cost', medq: 'From $0', textbook: '$200+', generic: '$20/mo', qbank: '$50+/mo' },
];

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Free',
    tagline: 'For getting started',
    monthly: 0,
    annual: 0,
    icon: Zap,
    color: '#8b95a8',
    features: [
      'Daily Challenge',
      '50 questions / month',
      'Basic AI tutor (limited model)',
      '20 flashcard reviews / day',
      'Streak tracking',
      'Leaderboard access',
    ],
    cta: 'Start free',
    highlight: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For serious exam prep',
    monthly: 19,
    annual: 15,
    icon: Sparkles,
    color: '#00e5a0',
    features: [
      'Everything in Free, plus:',
      'Unlimited questions',
      'Premium AI tutor (best models)',
      'Unlimited flashcards + spaced repetition',
      'Weak-area analytics dashboard',
      'Oral Exam Simulator (30 / month)',
      'Case Simulator (20 / month)',
      'Drug interaction lookup',
      'Study groups',
    ],
    cta: 'Start 7-day trial',
    highlight: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'For residency + beyond',
    monthly: 39,
    annual: 31,
    icon: Crown,
    color: '#8b5cf6',
    features: [
      'Everything in Pro, plus:',
      'Unlimited oral exam + case sims',
      'BYOK — bring your own API keys',
      'Priority AI model access',
      'CME credit tracking',
      'Performance coaching AI',
      'Custom study plans',
      'Early access to new features',
    ],
    cta: 'Start 7-day trial',
    highlight: false,
  },
];

const FAQS = [
  {
    q: 'Is MedQ affiliated with USMLE, MRCP, or any licensing board?',
    a: 'No. MedQ is an independent study tool. Our question bank and curriculum are aligned with the topics these exams cover, but we are not endorsed by or affiliated with any licensing body. Names like "USMLE" and "MRCP" are trademarks of their respective organizations.',
  },
  {
    q: 'Do I need to bring my own AI API key?',
    a: 'No. The Free and Pro tiers use MedQ-provided AI models — just sign up and start studying. The Premium tier adds a "Bring Your Own Key" (BYOK) option for users who want to use their own OpenAI, Anthropic, or other provider keys. BYOK keys are encrypted with AES-256-GCM and never leave your account.',
  },
  {
    q: 'How is MedQ different from a regular question bank?',
    a: 'A traditional Q-bank gives you questions and explanations — and stops there. MedQ builds a feedback loop: every answer feeds into your weak-area model, your daily plan, your flashcard deck, and your next case simulation. The AI tutor adapts in real time, so time spent studying is always targeted at your specific gaps.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes. MedQ is a Progressive Web App (PWA). After your first load, you can install it to your home screen and use most features offline — including cached questions, flashcards, and on-device AI for basic queries. Premium AI tutor and live leaderboards require a connection.',
  },
  {
    q: 'Can I cancel anytime?',
    a: 'Yes. Subscriptions cancel at the end of your current billing cycle — no questions, no retention calls. You keep access until then. Annual plans get a prorated refund within the first 14 days.',
  },
  {
    q: 'Is my study data private?',
    a: 'Your study history, weak-area analysis, and notes are tied to your account and never sold. BYOK API keys are encrypted at rest with AES-256-GCM. You can export or delete all your data at any time from Settings → Privacy.',
  },
  {
    q: 'Which exams does MedQ cover?',
    a: 'MedQ is curriculum-aligned for USMLE Step 1 & Step 2 CK, MRCP Part 1 & 2, PLAB 1 & 2, NEET-PG, COMLEX, and the Internal Medicine board exam. The Case Simulator and Oral Exam Simulator are particularly popular for Step 2 CS / PLAB 2 / OSCE-style assessments.',
  },
];

const TICKER_EVENTS = [
  { name: 'Amira from Cairo', action: 'scored 92% on a Cardiology quiz', time: 'just now' },
  { name: 'Marcus in Seoul', action: 'started a 7-day Pro trial', time: '12s ago' },
  { name: 'Priya in Mumbai', action: 'extended her streak to 240 days', time: '34s ago' },
  { name: 'Kwame in Accra', action: 'finished Oral Exam Sim case #58', time: '1m ago' },
  { name: 'Sofia in Mexico City', action: 'mastered Acid-Base Disorders', time: '2m ago' },
  { name: 'Lin in Taipei', action: 'climbed to Top 12 on the global leaderboard', time: '3m ago' },
  { name: 'Fatima in Riyadh', action: 'completed the Diagnostic in 9 min', time: '4m ago' },
  { name: 'Diego in Buenos Aires', action: 'generated 40 flashcards from weak areas', time: '5m ago' },
];

// ─── Hooks ─────────────────────────────────────────────────────────

/** Count-up animation triggered when the element scrolls into view. */
function useCountUp(target: number, decimals = 0, durationMs = 1600) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            const start = performance.now();
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / durationMs);
              // easeOutCubic
              const eased = 1 - Math.pow(1 - t, 3);
              setValue(target * eased);
              if (t < 1) requestAnimationFrame(tick);
              else setValue(target);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [target, durationMs]);

  const display =
    decimals > 0
      ? value.toFixed(decimals)
      : Math.round(value).toLocaleString('en-US');

  return { ref, display };
}

// ─── Page ──────────────────────────────────────────────────────────

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [examIdx, setExamIdx] = useState(0);
  const [tickerIdx, setTickerIdx] = useState(0);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [pricingAnnual, setPricingAnnual] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [heroMouse, setHeroMouse] = useState({ x: 0, y: 0 });
  const [region, setRegion] = useState('us');

  // Scroll progress + scrolled state
  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setScrolled(scrollTop > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Rotating exam name
  useEffect(() => {
    const id = setInterval(() => {
      setExamIdx((i) => (i + 1) % EXAM_ROTATION.length);
    }, 2400);
    return () => clearInterval(id);
  }, []);

  // Ticker rotation
  useEffect(() => {
    const id = setInterval(() => {
      setTickerIdx((i) => (i + 1) % TICKER_EVENTS.length);
    }, 3500);
    return () => clearInterval(id);
  }, []);

  // Testimonial carousel auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 6500);
    return () => clearInterval(id);
  }, []);

  // Hero parallax (subtle mouse-follow on orbs)
  const onHeroMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setHeroMouse({ x, y });
  }, []);

  // Personalization modal
  const [personalizeOpen, setPersonalizeOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-x-clip bg-[#0a0e1a] text-[#e8ecf4] antialiased selection:bg-[#00e5a0]/30 selection:text-white">
      {/* ── Command palette (press / to open) ── */}
      <CommandPaletteDemo />

      {/* ── Cursor glow (page-wide) ── */}
      <CursorGlow />

      {/* ── Signup toasts (bottom-left) ── */}
      <SignupToasts />

      {/* ── Personalization modal ── */}
      <PersonalizationModal open={personalizeOpen} onClose={() => setPersonalizeOpen(false)} />

      {/* ── Reading progress sidebar (desktop only) ── */}
      <ReadingProgress />

      {/* ── Achievement popup (gamified scroll milestones) ── */}
      <AchievementPopup />

      {/* ── Sticky CTA bar (appears after hero) ── */}
      <StickyCtaBar />

      {/* ── Scroll progress bar ── */}
      <div className="fixed left-0 top-0 z-[60] h-0.5 w-full bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-[#00e5a0] via-[#06b6d4] to-[#8b5cf6] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* ── Background gradient orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-[#00e5a0]/10 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${heroMouse.x * 30}px, ${heroMouse.y * 30}px)` }}
        />
        <div
          className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-[#8b5cf6]/10 blur-[140px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${heroMouse.x * -40}px, ${heroMouse.y * -20}px)` }}
        />
        <div
          className="absolute bottom-0 left-1/3 h-[400px] w-[400px] rounded-full bg-[#06b6d4]/8 blur-[120px] transition-transform duration-700 ease-out"
          style={{ transform: `translate(${heroMouse.x * 20}px, ${heroMouse.y * -30}px)` }}
        />
      </div>

      {/* ── Nav ── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-white/[0.06] bg-[#0a0e1a]/80 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/landing" className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-lg bg-[#00e5a0] text-[#0a0e1a] font-black text-lg">
              M
            </div>
            <span className="text-lg font-bold tracking-tight">MedQ</span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm text-[#8b95a8] hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm text-[#8b95a8] hover:text-white transition-colors">How it works</a>
            <a href="#pricing" className="text-sm text-[#8b95a8] hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-sm text-[#8b95a8] hover:text-white transition-colors">Stories</a>
            <a href="#faq" className="text-sm text-[#8b95a8] hover:text-white transition-colors">FAQ</a>
            <Link href="/" className="text-sm text-[#8b95a8] hover:text-white transition-colors">Open app</Link>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LiveNotificationBadge />
            <Link
              href="/login"
              className="text-sm font-medium text-[#8b95a8] hover:text-white transition-colors"
            >
              Sign in
            </Link>
            <Link
              href="/"
              className="inline-flex h-9 items-center rounded-lg bg-[#00e5a0] px-4 text-sm font-bold text-[#0a0e1a] transition-all hover:bg-[#00d090] hover:shadow-[0_0_24px_-6px_rgba(0,229,160,0.6)]"
            >
              Get started free
            </Link>
          </div>

          <button
            className="md:hidden p-2 -mr-2 text-[#8b95a8] hover:text-white"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/[0.06] bg-[#0a0e1a]/95 backdrop-blur-xl">
            <div className="flex flex-col gap-1 px-6 py-4">
              {[
                ['Features', '#features'],
                ['How it works', '#how-it-works'],
                ['Pricing', '#pricing'],
                ['Stories', '#testimonials'],
                ['FAQ', '#faq'],
              ].map(([label, href]) => (
                <a
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-[#8b95a8] hover:text-white"
                >
                  {label}
                </a>
              ))}
              <Link href="/" className="py-2 text-sm text-[#8b95a8] hover:text-white">Open app</Link>
              <Link href="/" className="mt-2 inline-flex h-10 items-center justify-center rounded-lg bg-[#00e5a0] px-4 text-sm font-bold text-[#0a0e1a]">
                Get started free
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="relative" onMouseMove={onHeroMouseMove}>
        {/* ── Hero ── */}
        <HeroSection examIdx={examIdx} tickerIdx={tickerIdx} region={region} onRegionChange={setRegion} />

        {/* ── Live stats bar ── */}
        <section className="mx-auto max-w-7xl px-6 pb-8" id="hero">
          <LiveStatsBar />
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <LivePresence />
            <button
              onClick={() => setPersonalizeOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/30 bg-[#8b5cf6]/10 px-4 py-2 text-xs font-medium text-[#a78bfa] transition hover:bg-[#8b5cf6]/20"
            >
              <Sparkles size={14} /> Personalize my plan
            </button>
          </div>
          {/* Heartbeat ECG banner — reinforces medical brand */}
          <ScrollReveal delay={80}>
            <div className="mt-8">
              <HeartbeatEcgBanner />
            </div>
          </ScrollReveal>
        </section>

        {/* ── Trust logo marquee ── */}
        <TrustMarquee />

        {/* ── Integrations marquee ── */}
        <section className="mx-auto max-w-7xl px-6 py-8">
          <ScrollReveal>
            <div style={{ textAlign: 'center', marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: '#64748b', letterSpacing: 1, fontWeight: 600 }}>
                WORKS WITH YOUR PREFERRED AI PROVIDER · BRING YOUR OWN KEY
              </div>
            </div>
            <IntegrationMarquee />
          </ScrollReveal>
        </section>

        {/* ── Mascot + weekly planner ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal className="mb-8">
            <MascotSection />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <WeeklyPlanner />
          </ScrollReveal>
        </section>

        {/* ── Animated stats ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <StatCard key={s.label} stat={s} />
            ))}
          </ScrollReveal>
        </section>

        {/* ── Hero parallax 3D (second hero — re-engages after stats) ── */}
        <section className="mx-auto max-w-7xl px-6 py-8 sm:py-12">
          <ScrollReveal>
            <HeroParallax3D />
          </ScrollReveal>
        </section>

        {/* ── Mobile app showcase + lab results viewer (side-by-side) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Sparkles size={12} /> Real clinical tools
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From <span className="bg-gradient-to-r from-[#00e5a0] to-[#06b6d4] bg-clip-text text-transparent">textbook</span> to bedside
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              MedQ doesn't just quiz you — it gives you the same tools you'll use on wards.
              Interactive lab panels, mobile study, and a real exam interface.
            </p>
          </ScrollReveal>
          <div className="grid gap-6 lg:grid-cols-2">
            <ScrollReveal delay={60}><MobileAppShowcase /></ScrollReveal>
            <ScrollReveal delay={120}><LabResultsViewer /></ScrollReveal>
          </div>
        </section>

        {/* ── Coverage map (social proof at scale) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal>
            <CoverageMap />
          </ScrollReveal>
        </section>

        {/* ── Scroll velocity banner ── */}
        <ScrollVelocityBanner text="MASTER MEDICINE" />

        {/* ── Features (bento grid) ── */}
        <div id="features">
          <FeaturesSection />
        </div>

        {/* ── Interactive AI demo ── */}
        <div id="demo">
          <AiDemoSection />
        </div>

        {/* ── Demo video ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Play size={12} /> Watch the demo
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              See MedQ in action
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              A 3-minute walkthrough of how the AI tutor breaks down a clinical case, suggests differentials, and builds your study plan.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <DemoVideoSection />
          </ScrollReveal>
        </section>

        {/* ── Anatomy viewer ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <HeartPulse size={12} /> Body systems
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Tap a system. Learn what's high-yield.
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Each body system in MedQ is mapped to the most-tested concepts for your exam. Hover or tap to explore.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <AnatomyViewer />
          </ScrollReveal>
        </section>

        {/* ── Knowledge graph ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <LineChart size={12} /> Connected learning
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Topics don't exist in isolation
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              MedQ shows you how concepts connect — so when you master Cardiology, you also reinforce Pharmacology, Physiology, and Pathology.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <KnowledgeGraph />
          </ScrollReveal>
        </section>

        {/* ── Live quiz arena ── */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Users size={12} /> Real-time multiplayer
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Compete live against 127 students
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Join the live quiz arena. 15 seconds. Fastest correct answer wins. Leaderboard resets every hour.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <LiveQuizArena />
          </ScrollReveal>
        </section>

        {/* ── AI Case Generator + DNA helix ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Sparkles size={12} /> Generative AI
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Generate infinite practice cases
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Pick a presentation. The AI writes a full case — vitals, labs, ECG, teaching questions — in seconds.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <AICaseGenerator />
            <DnaHelix />
          </ScrollReveal>
        </section>

        {/* ── Product preview ── */}
        <ProductPreviewSection />

        {/* ── Comparison table ── */}
        <ComparisonSection />

        {/* ── Detailed feature matrix (MedQ vs alternatives) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20" id="compare">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Check size={12} /> Side-by-side
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why students <span className="bg-gradient-to-r from-[#8b5cf6] to-[#00e5a0] bg-clip-text text-transparent">switch</span> to MedQ
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              The honest comparison. We're not the cheapest — we're the most complete.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <FeatureMatrix />
          </ScrollReveal>
        </section>

        {/* ── Specialty explorer (batch 7) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Stethoscope size={12} /> 12 specialties · 47.2K questions
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Explore your <span className="bg-gradient-to-r from-[#00e5a0] to-[#8b5cf6] bg-clip-text text-transparent">specialty universe</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Click any slice of the wheel. Each specialty carries its own adaptive question bank, mastery tracking, and review scheduling.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <SpecialtyExplorer />
          </ScrollReveal>
        </section>

        {/* ── AI diagnosis simulator + Live question stream (batch 7) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Brain size={12} /> AI reasoning engine
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Watch MedQ <span className="bg-gradient-to-r from-[#8b5cf6] to-[#06b6d4] bg-clip-text text-transparent">reason like an attending</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Pick symptoms and the engine ranks differentials with matched features and likelihood bars.
            </p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            <ScrollReveal delay={60}><AIDiagnosisSimulator /></ScrollReveal>
            <ScrollReveal delay={120}><LiveQuestionStream /></ScrollReveal>
          </div>
        </section>

        {/* ── How it works ── */}
        <HowItWorksSection />

        {/* ── Live community (heatmap + leaderboard) ── */}
        <div id="community">
          <LiveCommunitySection />
        </div>

        {/* ── Achievements ── */}
        <AchievementsSection />

        {/* ── Daily challenge widget ── */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <ScrollReveal>
            <DailyChallenge />
          </ScrollReveal>
        </section>

        {/* ── Weakness diagnostic (interactive quiz) ── */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <Zap size={12} /> 2-minute diagnostic
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Find your weak spots in 4 questions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Try our mini diagnostic. We'll show you exactly which topics to focus on first.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <WeaknessDiagnostic />
          </ScrollReveal>
        </section>

        {/* ── Skill radar + peer comparison (batch 7) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <BarChart3 size={12} /> Multi-axis competency
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              You're <span className="bg-gradient-to-r from-[#06b6d4] to-[#00e5a0] bg-clip-text text-transparent">more than a score</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              A single number hides the truth. MedQ tracks six orthogonal dimensions and benchmarks each against the global cohort.
            </p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={60}><SkillRadar /></ScrollReveal>
            <ScrollReveal delay={120}><PeerCompare /></ScrollReveal>
          </div>
        </section>

        {/* ── Study plan generator (batch 7) ── */}
        <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] px-3 py-1 text-xs font-medium text-[#fbbf24]">
              <Calendar size={12} /> Adaptive planning
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pick a date. <span className="bg-gradient-to-r from-[#f59e0b] to-[#00e5a0] bg-clip-text text-transparent">Get a plan.</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Drag the sliders — MedQ distributes topics, schedules cumulative review weeks, and rebalances whenever life happens.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <StudyPlanGenerator />
          </ScrollReveal>
        </section>

        {/* ── Results showcase ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <TrendingUp size={12} /> Measurable results
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From 42% to 94% in 30 days
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Real score trajectory from 2,847 active users. Drag the slider to compare before/after.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 lg:grid-cols-2">
            <ResultsShowcase />
            <BeforeAfterSlider />
          </ScrollReveal>
        </section>

        {/* ── Flashcards + spaced repetition ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <BookOpen size={12} /> Adaptive flashcards
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Flashcards that remember what you forget
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Tap to flip. Swipe to navigate. MedQ's spaced-repetition algorithm schedules each card exactly when you're about to forget it.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
            <FlashcardDeck />
            <SpacedRepetitionViz />
          </ScrollReveal>
        </section>

        {/* ── Study tools cluster ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] px-3 py-1 text-xs font-medium text-[#fbbf24]">
              <Zap size={12} /> Your daily toolkit
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to study smarter
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Countdown timer, focus timer, voice tutor — built right into MedQ. No 5-tab setup required.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <ExamCountdown />
            <StudyTimer />
            <VoiceTutor />
          </ScrollReveal>
        </section>

        {/* ── Security ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Lock size={12} /> Security first
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your keys never leave your browser unencrypted
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              We can't read your API keys. Nobody can — except you, in memory, when a request needs to fire.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <SecuritySection />
          </ScrollReveal>
        </section>

        {/* ── Pricing ── */}
        <div id="pricing">
          <PricingSection
            annual={pricingAnnual}
            onToggle={setPricingAnnual}
          />
        </div>

        {/* ── Pricing calculator + ROI ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal className="grid gap-6 lg:grid-cols-2">
            <PricingCalculator />
            <ROICalculator />
          </ScrollReveal>
        </section>

        {/* ── Social proof feed + theme showcase ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
              <Activity size={12} /> Always alive
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              The community never sleeps
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Real-time activity from 52,000+ medical students worldwide. And yes — you can theme it your way.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
            <SocialProofFeed />
            <ThemeShowcase />
          </ScrollReveal>
        </section>

        {/* ── Testimonials carousel ── */}
        <TestimonialsSection
          idx={testimonialIdx}
          onPrev={() => setTestimonialIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          onNext={() => setTestimonialIdx((i) => (i + 1) % TESTIMONIALS.length)}
          onSelect={setTestimonialIdx}
        />

        {/* ── 3D testimonial coverflow (additional social proof) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
          <ScrollReveal>
            <TestimonialCoverflow />
          </ScrollReveal>
        </section>

        {/* ── Team / advisors ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] px-3 py-1 text-xs font-medium text-[#fbbf24]">
              <Stethoscope size={12} /> Medical board
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Reviewed by physicians from top institutions
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Every clinical case and explanation is reviewed by board-certified physicians from Harvard, Hopkins, Stanford, Mayo Clinic, and more.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <TeamSection />
          </ScrollReveal>
        </section>

        {/* ── Globe + constellation + mentor match ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#06b6d4]/20 bg-[#06b6d4]/[0.06] px-3 py-1 text-xs font-medium text-[#22d3ee]">
              <Globe2 size={12} /> Worldwide community
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              You're never studying alone
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              52,000+ students across 80+ countries. Track your mastery as a constellation, see where the world is studying, and find your mentor.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120} className="grid gap-6 lg:grid-cols-3">
            <GlobeHeatmap />
            <ProgressConstellation />
            <MentorMatchCard />
          </ScrollReveal>
        </section>

        {/* ── News / blog preview ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8b5cf6]/20 bg-[#8b5cf6]/[0.06] px-3 py-1 text-xs font-medium text-[#a78bfa]">
                <BookOpen size={12} /> From the blog
              </div>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Latest from MedQ
              </h2>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00e5a0] hover:underline"
            >
              Read all posts <ArrowRight size={14} />
            </a>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <NewsPreviewSection />
          </ScrollReveal>
        </section>

        {/* ── FAQ ── */}
        <div id="faq">
          <FaqSection openFaq={openFaq} setOpenFaq={setOpenFaq} />
        </div>

        {/* ── Advanced Section Block 5 ──────────────────────────────── */}
        {/* ECG + Case Timeline: cardiology clinical reasoning showcase */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono mb-3">
                <Activity size={12} /> CLINICAL REASONING · LIVE
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                From <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">symptom</span> to <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">diagnosis</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                Watch a real case unfold with live vitals, ECG interpretation, and decision-point explanations.
                Our reasoning engine walks you through every step the way a senior clinician would.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <ScrollReveal delay={60}><EcgTrace /></ScrollReveal>
            <ScrollReveal delay={120}><CaseTimeline /></ScrollReveal>
          </div>
        </section>

        {/* Streak Calendar: gamified study activity */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <StreakCalendar />
          </ScrollReveal>
        </section>

        {/* ── Clinical case carousel + Memory anchors (batch 7) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#ef4444]/20 bg-[#ef4444]/[0.06] px-3 py-1 text-xs font-medium text-red-400">
              <Stethoscope size={12} /> High-yield cases
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Learn from <span className="bg-gradient-to-r from-[#ef4444] to-[#8b5cf6] bg-clip-text text-transparent">real patients</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Vignettes mirror actual board exam style — every case ends with a one-line diagnosis, full explanation, and the relevant memory anchor.
            </p>
          </ScrollReveal>
          <div className="grid lg:grid-cols-2 gap-6">
            <ScrollReveal delay={60}><ClinicalCaseCarousel /></ScrollReveal>
            <ScrollReveal delay={120}><MemoryAnchorCards /></ScrollReveal>
          </div>
        </section>

        {/* ── Question type showcase (batch 7) ── */}
        <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Pill size={12} /> 5 formats · 1 engine
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Train every <span className="bg-gradient-to-r from-[#00e5a0] to-[#f59e0b] bg-clip-text text-transparent">question format</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Boards aren't all multiple-choice. MedQ trains you on MCQ, multi-select, matching, image-based, and full clinical vignettes — switch tabs to try each.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <QuestionTypeShowcase />
          </ScrollReveal>
        </section>

        {/* Code Terminal + Neural Network: developer + AI engine dual showcase */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono mb-3">
                <Cpu size={12} /> UNDER THE HOOD
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Built for <span className="bg-gradient-to-r from-violet-400 to-cyan-300 bg-clip-text text-transparent">developers</span> and <span className="bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">learners</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                A simple SDK for power users. A 2.4M-parameter diagnosis engine under the hood, fine-tuned on
                4 million peer-reviewed case-vignettes.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <ScrollReveal delay={60}><CodeTerminal /></ScrollReveal>
            <ScrollReveal delay={120}><NeuralNetworkViz /></ScrollReveal>
          </div>
        </section>

        {/* Parallax Depth Scene: break in the page flow */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <ParallaxDepthScene />
          </ScrollReveal>
        </section>

        {/* Leaderboard Race + Morphing Logo: gamification + brand */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-[1fr_320px] gap-6">
            <ScrollReveal delay={60}><LeaderboardRace /></ScrollReveal>
            <ScrollReveal delay={120}><MorphingLogo /></ScrollReveal>
          </div>
        </section>

        {/* Live Exam Simulator: full exam experience preview */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
                <GraduationCap size={12} /> EXAM ENVIRONMENT
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Practice in the <span className="bg-gradient-to-r from-cyan-400 to-emerald-300 bg-clip-text text-transparent">real exam interface</span>
              </h2>
              <p className="text-slate-400 mt-3 max-w-2xl mx-auto">
                Question palette, mark-and-review, live timer, and the exact keyboard shortcuts you'll use on test day.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}><LiveExamSimulator /></ScrollReveal>
        </section>

        {/* Confetti + Waveform Player: celebration + audio learning */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6">
            <ScrollReveal delay={60}><ConfettiCelebration /></ScrollReveal>
            <ScrollReveal delay={120}><WaveformPlayer /></ScrollReveal>
          </div>
        </section>

        {/* Stats Cube 3D: closing impact metrics */}
        <section className="px-4 md:px-6 py-16 max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
                <BarChart3 size={12} /> IMPACT · 6 DIMENSIONS
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Numbers that <span className="bg-gradient-to-r from-emerald-400 to-violet-300 bg-clip-text text-transparent">compound</span>
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={80}><StatsCube3D /></ScrollReveal>
        </section>

        {/* ── Gamified streak tree (batch 7) ── */}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
          <ScrollReveal className="mb-10 text-center">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/[0.06] px-3 py-1 text-xs font-medium text-[#fbbf24]">
              <Flame size={12} /> Visualize your streak
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Your streak <span className="bg-gradient-to-r from-[#f59e0b] to-[#00e5a0] bg-clip-text text-transparent">grows</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-base text-[#94a3b8]">
              Every day you study, new leaves sprout on a different specialty branch. Miss a day → leaves fall. Mastery makes the branch longer.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={80}>
            <GamifiedStreakTree />
          </ScrollReveal>
        </section>

        {/* ── Final CTA ── */}
        <FinalCtaSection />
      </main>

      {/* ── Floating scroll-to-top ── */}
      <FloatingScrollTop />

      {/* ── Floating dock (desktop only) ── */}
      <div className="hidden md:block">
        <FloatingDock />
      </div>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Sticky mobile CTA ── */}
      <MobileStickyCta />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Hero
// ═══════════════════════════════════════════════════════════════════

function HeroSection({
  examIdx,
  tickerIdx,
  region,
  onRegionChange,
}: {
  examIdx: number;
  tickerIdx: number;
  region: string;
  onRegionChange: (id: string) => void;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-20 pb-16 sm:pt-28 sm:pb-24">
      <AuroraBackground />
      <div className="relative grid items-center gap-12 lg:grid-cols-2">
        {/* Left: copy + CTAs */}
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#00e5a0]/20 bg-[#00e5a0]/[0.06] px-3 py-1 text-xs font-medium text-[#00e5a0]">
              <Sparkles className="size-3.5" />
              AI-native medical education platform
            </div>
            <RegionSelector region={region} onChange={onRegionChange} />
          </div>

          <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
            Pass{' '}
            <span className="relative inline-block">
              <GradientText
                key={examIdx}
                className="font-black"
              >
                {EXAM_ROTATION[examIdx]}
              </GradientText>
            </span>
            <br />
            with confidence.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-pretty text-lg text-[#8b95a8] sm:text-xl lg:mx-0">
            MedQ is the all-in-one medical exam prep platform built around an AI
            tutor that actually understands medicine. Personalized question banks,
            adaptive flashcards, oral exam practice, and real-time weak-area
            tracking — all in one place.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#cbd5e1] lg:justify-start">
            <span className="text-[#8b95a8]">Built for</span>
            <span className="font-semibold text-[#00e5a0]">
              <TypewriterText
                phrases={[
                  'medical students.',
                  'residents.',
                  'USMLE takers.',
                  'NEET-PG aspirants.',
                  'PLAB candidates.',
                ]}
              />
            </span>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <MagneticButton href="/" variant="primary">
              Start studying free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </MagneticButton>
            <MagneticButton href="#features" variant="secondary">
              <Play className="size-4" />
              Watch 2-min demo
            </MagneticButton>
          </div>
          <p className="mt-5 text-xs text-[#8b95a8]">
            No credit card required · Free tier includes daily challenge + 50 questions
          </p>
        </div>

        {/* Right: floating mockup + ticker */}
        <div className="relative min-w-0">
          <TiltCard max={8} className="rounded-2xl">
            <HeroMockup />
          </TiltCard>
          <ActivityTicker idx={tickerIdx} />
        </div>
      </div>

      {/* keyframes for rotating headline */}
      <style jsx global>{`
        @keyframes medq-fade-up {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes medq-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes medq-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes medq-pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}

function HeroMockup() {
  return (
    <div className="relative mx-auto w-full max-w-md min-w-0" style={{ transform: 'translateZ(40px)' }}>
      {/* Main "app window" card */}
      <div
        className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#0c0e14] to-[#151821] shadow-2xl"
        style={{ animation: 'medq-float 6s ease-in-out infinite' }}
      >
        {/* Window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <div className="flex gap-1.5">
            <div className="size-2.5 rounded-full bg-[#ff5f57]" />
            <div className="size-2.5 rounded-full bg-[#febc2e]" />
            <div className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="ml-2 flex-1 truncate text-[11px] font-mono text-[#5a6478]">
            medq.app / ai-tutor
          </div>
        </div>

        {/* Body: AI tutor exchange */}
        <div className="space-y-3 p-5">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#00e5a0]/15 px-3.5 py-2 text-xs text-[#e8ecf4]">
              Why does hyperkalemia cause peaked T waves?
            </div>
          </div>

          {/* AI response */}
          <div className="flex justify-start gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5a0] to-[#06b6d4] text-[10px] font-bold text-[#0a0e1a]">
              AI
            </div>
            <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2 text-xs leading-relaxed text-[#c8d0e0]">
              <span className="font-semibold text-[#00e5a0]">Great question.</span> High extracellular K⁺
              reduces the concentration gradient across the myocyte membrane. This
              <span className="text-white"> accelerates early repolarization</span> (phase 3 of the action
              potential) — so the T wave narrows and peaks.
            </div>
          </div>

          {/* AI typing dots */}
          <div className="flex justify-start gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5a0] to-[#06b6d4] text-[10px] font-bold text-[#0a0e1a]">
              AI
            </div>
            <div className="rounded-2xl rounded-bl-md bg-white/[0.04] px-3.5 py-2.5">
              <div className="flex gap-1">
                <span className="size-1.5 rounded-full bg-[#8b95a8]" style={{ animation: 'medq-pulse-dot 1.4s ease-in-out infinite', animationDelay: '0ms' }} />
                <span className="size-1.5 rounded-full bg-[#8b95a8]" style={{ animation: 'medq-pulse-dot 1.4s ease-in-out infinite', animationDelay: '200ms' }} />
                <span className="size-1.5 rounded-full bg-[#8b95a8]" style={{ animation: 'medq-pulse-dot 1.4s ease-in-out infinite', animationDelay: '400ms' }} />
              </div>
            </div>
          </div>

          {/* Mini stats strip */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[
              { label: 'Mastery', value: '87%', color: '#00e5a0' },
              { label: 'Streak', value: '42d', color: '#f59e0b' },
              { label: 'Weak', value: '3', color: '#ff5757' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/[0.03] p-2 text-center">
                <div className="font-mono text-sm font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-[9px] uppercase tracking-wider text-[#5a6478]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating "Daily Challenge" badge */}
      <div
        className="absolute -left-6 top-1/3 hidden rounded-xl border border-white/10 bg-[#151821]/95 px-3 py-2 shadow-xl backdrop-blur sm:block"
        style={{ animation: 'medq-float 7s ease-in-out infinite', animationDelay: '-2s', transform: 'translateZ(60px)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#f59e0b]/15 text-[#f59e0b]">
            <Trophy className="size-3.5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#5a6478]">Daily</div>
            <div className="text-xs font-semibold text-white">+12 streak</div>
          </div>
        </div>
      </div>

      {/* Floating "Weak area detected" badge */}
      <div
        className="absolute -right-4 bottom-8 hidden rounded-xl border border-white/10 bg-[#151821]/95 px-3 py-2 shadow-xl backdrop-blur sm:block"
        style={{ animation: 'medq-float 5.5s ease-in-out infinite', animationDelay: '-1s', transform: 'translateZ(80px)' }}
      >
        <div className="flex items-center gap-2">
          <div className="flex size-7 items-center justify-center rounded-lg bg-[#ff5757]/15 text-[#ff5757]">
            <Target className="size-3.5" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider text-[#5a6478]">Weak area</div>
            <div className="text-xs font-semibold text-white">Renal physiology</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActivityTicker({ idx }: { idx: number }) {
  const ev = TICKER_EVENTS[idx];
  return (
    <div className="mt-6 flex items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
      <div className="relative flex size-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00e5a0] opacity-60" />
        <span className="relative inline-flex size-2 rounded-full bg-[#00e5a0]" />
      </div>
      <p className="text-xs text-[#8b95a8]">
        <span className="font-semibold text-white">{ev.name}</span>{' '}
        {ev.action}
        <span className="ml-2 text-[#5a6478]">· {ev.time}</span>
      </p>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Trust marquee
// ═══════════════════════════════════════════════════════════════════

function TrustMarquee() {
  // Duplicate the list so the marquee loops seamlessly (50% translate).
  const items = [...TRUST_LOGOS, ...TRUST_LOGOS];
  return (
    <section className="border-y border-white/[0.04] bg-white/[0.015] py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-5 text-center text-xs uppercase tracking-[0.2em] text-[#5a6478]">
          Trusted by medical students from
        </p>
        <div className="relative overflow-hidden">
          {/* Edge fade */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0e1a] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0e1a] to-transparent" />
          <div
            className="flex w-max gap-12"
            style={{ animation: 'medq-marquee 40s linear infinite' }}
          >
            {items.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2 text-sm font-semibold text-[#8b95a8]/70"
              >
                <GraduationCap className="size-4 text-[#5a6478]" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Stat card with count-up
// ═══════════════════════════════════════════════════════════════════

function StatCard({ stat }: { stat: typeof STATS[number] }) {
  const { ref, display } = useCountUp(stat.value, stat.decimals ?? 0);
  // Deterministic sparkline data per stat (so SSR matches client).
  const sparkData = useMemo(() => {
    const seed = stat.label.charCodeAt(0);
    return Array.from({ length: 12 }, (_, i) => 30 + ((seed * (i + 1)) % 60) + Math.sin(i) * 10);
  }, [stat.label]);
  return (
    <div
      ref={ref}
      className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-center backdrop-blur-sm transition-all hover:border-[#00e5a0]/30 hover:bg-white/[0.04]"
    >
      <Sparkline
        data={sparkData}
        width={120}
        height={32}
        color="#00e5a0"
        className="mx-auto mb-2 opacity-60 transition-opacity group-hover:opacity-100"
      />
      <div className="font-mono text-3xl font-bold text-[#00e5a0] sm:text-4xl">
        {display}
        <span className="text-2xl sm:text-3xl">{stat.suffix}</span>
      </div>
      <div className="mt-1 text-sm font-medium text-[#e8ecf4]">{stat.label}</div>
      <div className="text-xs text-[#5a6478]">{stat.sub}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Features (bento grid)
// ═══════════════════════════════════════════════════════════════════

function FeaturesSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#8b95a8]">
            <Sparkles className="size-3 text-[#00e5a0]" />
            Nine tools, one platform
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Everything you need to ace your exam
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            Built by doctors and medical educators — not a generic AI wrapper.
            Each tool feeds the others, so every minute you study makes the next minute smarter.
          </p>
        </div>
      </ScrollReveal>

      <div className="mt-16 grid auto-rows-[minmax(180px,_auto)] gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {FEATURES_BENTO.map((f, i) => {
          const Icon = f.icon;
          const span = f.span ?? '';
          return (
            <ScrollReveal
              key={f.title}
              delay={i * 60}
              className={`group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04] ${span}`}
            >
              <div
                className="absolute -top-12 -right-12 size-32 rounded-full opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-25"
                style={{ background: f.color }}
              />
              <div className="relative flex h-full flex-col">
                <div className="flex items-center justify-between">
                  <div
                    className="flex size-11 items-center justify-center rounded-xl"
                    style={{ background: `${f.color}1a`, color: f.color }}
                  >
                    <Icon className="size-5" />
                  </div>
                  {f.badge && (
                    <span className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#8b95a8]">
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8b95a8]">
                  {f.description}
                </p>
                {/* Span-2 cards get a visual flourish */}
                {span.includes('row-span-2') && (
                  <div className="mt-auto pt-6">
                    <MiniTutorPreview />
                  </div>
                )}
                {span.includes('col-span-2') && !span.includes('row-span-2') && (
                  <div className="mt-auto pt-4">
                    <MiniMasteryBar color={f.color} />
                  </div>
                )}
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}

function MiniTutorPreview() {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#0c0e14]/60 p-3">
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-[#5a6478]">
        <span className="size-1.5 rounded-full bg-[#00e5a0]" />
        Live tutor session
      </div>
      <div className="mt-2 space-y-2">
        <div className="rounded-lg bg-[#00e5a0]/10 px-2.5 py-1.5 text-[11px] text-[#c8d0e0]">
          "Walk me through the RAAS pathway"
        </div>
        <div className="rounded-lg bg-white/[0.04] px-2.5 py-1.5 text-[11px] leading-relaxed text-[#8b95a8]">
          <span className="text-[#00e5a0]">Renin</span> is released by juxtaglomerular cells when
          renal perfusion drops. It cleaves angiotensinogen → angiotensin I...
        </div>
      </div>
    </div>
  );
}

function MiniMasteryBar({ color }: { color: string }) {
  const bars = [82, 67, 91, 45, 73, 88, 56];
  return (
    <div className="flex items-end gap-1.5">
      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-t"
          style={{
            height: `${h}px`,
            background: `linear-gradient(to top, ${color}40, ${color})`,
            opacity: 0.4 + (h / 100) * 0.6,
          }}
        />
      ))}
      <div className="ml-2 text-[10px] uppercase tracking-wider text-[#5a6478]">
        Topic mastery
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Product preview (animated showcase)
// ═══════════════════════════════════════════════════════════════════

function ProductPreviewSection() {
  const [tab, setTab] = useState<'tutor' | 'flashcards' | 'cases'>('tutor');
  return (
    <section className="border-y border-white/[0.04] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            A study surface that feels alive
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            Three taps to a study session. Real-time feedback. Adaptive to the
            topics you struggle with — not a one-size-fits-all quiz.
          </p>
        </div>
        </ScrollReveal>

        {/* Tab switcher */}
        <ScrollReveal delay={100} className="mt-12 flex justify-center">
          <div className="inline-flex items-center gap-1 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1">
            {([
              ['tutor', 'AI Tutor', MessageCircle],
              ['flashcards', 'Flashcards', Brain],
              ['cases', 'Case Sim', Stethoscope],
            ] as const).map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  tab === id
                    ? 'bg-[#00e5a0] text-[#0a0e1a]'
                    : 'text-[#8b95a8] hover:text-white'
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Preview panel */}
        <ScrollReveal delay={200} className="mt-10 overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0c0e14] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <div className="flex gap-1.5">
              <div className="size-2.5 rounded-full bg-[#ff5f57]" />
              <div className="size-2.5 rounded-full bg-[#febc2e]" />
              <div className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="ml-2 flex-1 truncate text-[11px] font-mono text-[#5a6478]">
              medq.app / {tab === 'tutor' ? 'ai-tutor' : tab === 'flashcards' ? 'flashcards' : 'case-sim'}
            </div>
          </div>
          <div className="grid gap-0 md:grid-cols-[260px_1fr]">
            {/* Sidebar */}
            <div className="hidden border-r border-white/[0.06] p-4 md:block">
              <div className="text-[10px] uppercase tracking-wider text-[#5a6478]">Today</div>
              <div className="mt-2 space-y-1">
                {[
                  ['Daily Challenge', Trophy, true],
                  ['10 flashcards due', Brain, false],
                  ['Cardiology review', HeartPulse, false],
                  ['Renal case sim', Stethoscope, false],
                ].map(([label, Icon, active]) => {
                  const I = Icon as typeof Trophy;
                  return (
                    <div
                      key={label as string}
                      className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs ${
                        active ? 'bg-[#00e5a0]/10 text-[#00e5a0]' : 'text-[#8b95a8]'
                      }`}
                    >
                      <I className="size-3.5" />
                      {label as string}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 text-[10px] uppercase tracking-wider text-[#5a6478]">Mastery</div>
              <div className="mt-2 space-y-2">
                {[
                  ['Cardiology', 87, '#00e5a0'],
                  ['Renal', 64, '#06b6d4'],
                  ['Endocrine', 72, '#8b5cf6'],
                  ['Neuro', 45, '#ff5757'],
                ].map(([label, val, color]) => (
                  <div key={label as string}>
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="text-[#8b95a8]">{label as string}</span>
                      <span className="font-mono text-[#c8d0e0]">{val}%</span>
                    </div>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${val}%`, background: color as string }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main content area */}
            <div className="p-6">
              {tab === 'tutor' && <PreviewTutor />}
              {tab === 'flashcards' && <PreviewFlashcards />}
              {tab === 'cases' && <PreviewCases />}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PreviewTutor() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-br-md bg-[#00e5a0]/15 px-4 py-2.5 text-sm text-[#e8ecf4]">
          Explain the difference between Type 1 and Type 2 RTA.
        </div>
      </div>
      <div className="flex justify-start gap-3">
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5a0] to-[#06b6d4] text-xs font-bold text-[#0a0e1a]">
          AI
        </div>
        <div className="max-w-[85%] space-y-2 rounded-2xl rounded-bl-md bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-[#c8d0e0]">
          <p>
            <span className="font-semibold text-[#00e5a0]">Type 1 (Distal) RTA:</span> the
            alpha-intercalated cells can't secrete H⁺ against a gradient. Urine pH stays
            &gt; 5.5 even with acidosis. Associated with <span className="text-white">hypokalemia</span>,
            nephrolithiasis, and bone demineralization.
          </p>
          <p>
            <span className="font-semibold text-[#06b6d4]">Type 2 (Proximal) RTA:</span> the
            proximal tubule can't reabsorb bicarbonate. The distal nephron can still acidify
            urine once plasma HCO₃⁻ drops low enough — so urine pH can fall &lt; 5.5.
            Often seen with Fanconi syndrome.
          </p>
          <div className="mt-3 rounded-lg bg-[#00e5a0]/[0.06] px-3 py-2 text-xs text-[#8b95a8]">
            <span className="font-semibold text-[#00e5a0]">Want to test this?</span> I can generate
            a 5-question quiz on renal tubular acidoses.
          </div>
        </div>
      </div>
    </div>
  );
}

function PreviewFlashcards() {
  const cards = [
    { front: 'Mechanism of metformin', back: 'Activates AMPK → ↓ hepatic gluconeogenesis, ↑ peripheral glucose uptake', tag: 'Pharmacology' },
    { front: 'Curling ulcers are associated with', back: 'Severe burns (hypovolemia → mucosal ischemia)', tag: 'GI' },
    { front: 'Most common cause of acute pancreatitis', back: 'Gallstones (then alcohol)', tag: 'GI' },
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((c, i) => (
        <div
          key={i}
          className="group relative aspect-[3/4] [perspective:1000px]"
        >
          <div className="relative size-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
            {/* Front */}
            <div className="absolute inset-0 flex flex-col rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#151821] to-[#0c0e14] p-4 [backface-visibility:hidden]">
              <span className="text-[10px] uppercase tracking-wider text-[#00e5a0]">{c.tag}</span>
              <p className="mt-auto text-sm font-semibold text-white">{c.front}</p>
              <p className="mt-2 text-[10px] text-[#5a6478]">Hover to flip</p>
            </div>
            {/* Back */}
            <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-[#00e5a0]/30 bg-gradient-to-br from-[#00e5a0]/10 to-[#06b6d4]/10 p-4 text-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
              <p className="text-xs leading-relaxed text-[#e8ecf4]">{c.back}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function PreviewCases() {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-[#ff5757]/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#ff5757]">
            Case 014 · Cardiology
          </span>
          <span className="text-[10px] text-[#5a6478]">Difficulty: ★★★☆☆</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-[#c8d0e0]">
          A 62-year-old male presents with crushing substernal chest pain radiating to the
          left arm, diaphoresis, and dyspnea. ECG shows ST elevations in II, III, and aVF.
          BP 88/52. HR 48.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { label: 'Order troponin', color: '#8b95a8' },
          { label: 'Administer aspirin', color: '#00e5a0' },
          { label: 'Activate cath lab', color: '#00e5a0' },
        ].map((opt, i) => (
          <div
            key={i}
            className="rounded-lg border border-white/[0.06] bg-[#0c0e14] px-3 py-2.5 text-xs font-medium"
            style={{ color: opt.color }}
          >
            <span className="mr-2 font-mono text-[#5a6478]">{i + 1}.</span>
            {opt.label}
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-[#00e5a0]/[0.06] px-4 py-3 text-xs text-[#8b95a8]">
        <span className="font-semibold text-[#00e5a0]">AI feedback:</span> Correct! This is an
        inferior STEMI. The bradycardia and hypotension suggest RCA involvement (supplies SA
        and AV node). Immediate reperfusion is the priority.
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Comparison table
// ═══════════════════════════════════════════════════════════════════

function ComparisonSection() {
  // (kept compact for clarity) — full table content below
  const Cell = ({ value }: { value: boolean | 'partial' | string }) => {
    if (value === true) {
      return (
        <div className="flex justify-center">
          <div className="flex size-6 items-center justify-center rounded-full bg-[#00e5a0]/15 text-[#00e5a0]">
            <Check className="size-3.5" />
          </div>
        </div>
      );
    }
    if (value === false) {
      return (
        <div className="flex justify-center">
          <div className="flex size-6 items-center justify-center rounded-full bg-white/[0.04] text-[#5a6478]">
            <X className="size-3.5" />
          </div>
        </div>
      );
    }
    if (value === 'partial') {
      return (
        <div className="flex justify-center">
          <div className="flex size-6 items-center justify-center rounded-full bg-[#f59e0b]/15 text-[#f59e0b]">
            <span className="text-xs font-bold">~</span>
          </div>
        </div>
      );
    }
    return <div className="text-center text-sm font-semibold text-[#c8d0e0]">{value}</div>;
  };

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <ScrollReveal>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Why students switch to MedQ
        </h2>
        <p className="mt-4 text-lg text-[#8b95a8]">
          The same study hours, dramatically different outcomes. Here's how MedQ
          compares to the tools you're probably already using.
        </p>
      </div>
      </ScrollReveal>

      <ScrollReveal delay={100} className="mt-12 overflow-x-auto">
        <table className="w-full min-w-[640px] border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="w-[40%] px-4 py-4 text-left text-sm font-semibold text-[#8b95a8]">
                Capability
              </th>
              <th className="px-4 py-4 text-center">
                <div className="inline-flex items-center gap-2 text-sm font-bold text-[#00e5a0]">
                  <div className="size-5 rounded bg-[#00e5a0] text-center text-[10px] font-black leading-5 text-[#0a0e1a]">M</div>
                  MedQ
                </div>
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-[#8b95a8]">
                Textbooks
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-[#8b95a8]">
                Generic AI
              </th>
              <th className="px-4 py-4 text-center text-sm font-semibold text-[#8b95a8]">
                Q-Bank
              </th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? '' : 'bg-white/[0.015]'}>
                <td className="border-t border-white/[0.04] px-4 py-3.5 text-sm text-[#c8d0e0]">
                  {row.feature}
                </td>
                <td className="border-t border-white/[0.04] bg-[#00e5a0]/[0.02] px-4 py-3.5">
                  <Cell value={row.medq} />
                </td>
                <td className="border-t border-white/[0.04] px-4 py-3.5">
                  <Cell value={row.textbook} />
                </td>
                <td className="border-t border-white/[0.04] px-4 py-3.5">
                  <Cell value={row.generic} />
                </td>
                <td className="border-t border-white/[0.04] px-4 py-3.5">
                  <Cell value={row.qbank} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </ScrollReveal>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// How it works
// ═══════════════════════════════════════════════════════════════════

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-y border-white/[0.04] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <ScrollReveal>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Three steps to exam-ready
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            MedQ doesn't just hand you a question bank. It builds a feedback
            loop around your performance — and tightens it every day.
          </p>
        </div>
        </ScrollReveal>

        <div className="relative mt-16 grid gap-6 md:grid-cols-3">
          {/* Connecting line */}
          <div className="pointer-events-none absolute left-1/6 right-1/6 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#00e5a0]/30 to-transparent md:block" />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <ScrollReveal
                key={step.number}
                delay={i * 120}
                className="relative rounded-2xl border border-white/[0.06] bg-[#0c0e14]/60 p-7 transition-colors hover:border-[#00e5a0]/20"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-3xl font-bold text-[#00e5a0]/40">
                    {step.number}
                  </span>
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#00e5a0]/10 text-[#00e5a0]">
                    <Icon className="size-5" />
                  </div>
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8b95a8]">
                  {step.description}
                </p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Pricing
// ═══════════════════════════════════════════════════════════════════

function PricingSection({
  annual,
  onToggle,
}: {
  annual: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
      <ScrollReveal>
      <div className="mx-auto max-w-2xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#8b95a8]">
          <Sparkles className="size-3 text-[#00e5a0]" />
          Free forever. Upgrade anytime.
        </div>
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Pricing that scales with you
        </h2>
        <p className="mt-4 text-lg text-[#8b95a8]">
          Start on Free. Upgrade when you're serious. Cancel anytime — no retention calls.
        </p>

        {/* Toggle */}
        <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/[0.06] bg-white/[0.02] p-1">
          <button
            onClick={() => onToggle(false)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              !annual ? 'bg-[#00e5a0] text-[#0a0e1a]' : 'text-[#8b95a8]'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => onToggle(true)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              annual ? 'bg-[#00e5a0] text-[#0a0e1a]' : 'text-[#8b95a8]'
            }`}
          >
            Annual
            <span className="ml-1.5 rounded-full bg-[#00e5a0]/20 px-1.5 py-0.5 text-[10px] font-bold text-[#00e5a0]">
              -20%
            </span>
          </button>
        </div>
      </div>
      </ScrollReveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {PRICING_PLANS.map((plan, i) => {
          const Icon = plan.icon;
          const price = annual ? plan.annual : plan.monthly;
          return (
            <ScrollReveal
              key={plan.id}
              delay={i * 100}
              className={`relative overflow-hidden rounded-2xl border p-7 transition-all ${
                plan.highlight
                  ? 'border-[#00e5a0]/40 bg-gradient-to-br from-[#00e5a0]/[0.06] to-transparent shadow-[0_0_60px_-20px_rgba(0,229,160,0.4)]'
                  : 'border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]'
              }`}
            >
              {plan.highlight && (
                <div className="absolute right-5 top-5 rounded-full bg-[#00e5a0] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#0a0e1a]">
                  Most popular
                </div>
              )}
              <div
                className="flex size-11 items-center justify-center rounded-xl"
                style={{ background: `${plan.color}1a`, color: plan.color }}
              >
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-[#8b95a8]">{plan.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="font-mono text-4xl font-black text-white">${price}</span>
                <span className="text-sm text-[#8b95a8]">/month</span>
              </div>
              {annual && plan.monthly > 0 && (
                <p className="mt-1 text-xs text-[#00e5a0]">
                  Save ${(plan.monthly - plan.annual) * 12}/year
                </p>
              )}

              <Link
                href="/"
                className={`mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all ${
                  plan.highlight
                    ? 'bg-[#00e5a0] text-[#0a0e1a] hover:bg-[#00d090] hover:shadow-[0_0_30px_-8px_rgba(0,229,160,0.6)]'
                    : 'border border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]'
                }`}
              >
                {plan.cta}
                <ArrowRight className="size-4" />
              </Link>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[#c8d0e0]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#00e5a0]" />
                    <span className={f.endsWith(':') ? 'font-semibold text-white' : ''}>{f}</span>
                  </li>
                ))}
              </ul>
            </ScrollReveal>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-[#5a6478]">
        All plans include BYOK encryption (AES-256-GCM), PWA offline mode, and curriculum-aligned content.
        Prices in USD.
      </p>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Testimonials carousel
// ═══════════════════════════════════════════════════════════════════

function TestimonialsSection({
  idx,
  onPrev,
  onNext,
  onSelect,
}: {
  idx: number;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (i: number) => void;
}) {
  const t = TESTIMONIALS[idx];
  return (
    <section id="testimonials" className="border-y border-white/[0.04] bg-white/[0.015]">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-medium text-[#8b95a8]">
            <Quote className="size-3 text-[#00e5a0]" />
            Real outcomes, not paid endorsements
          </div>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Loved by medical students worldwide
          </h2>
        </div>

        <div className="mx-auto mt-14 max-w-4xl">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0c0e14]/60 p-8 sm:p-12">
            {/* Big quote mark */}
            <Quote className="absolute right-6 top-6 size-16 text-white/[0.04]" />

            <div key={idx} style={{ animation: 'medq-fade-up 0.5s ease-out' }}>
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} className="size-5 fill-[#f59e0b] text-[#f59e0b]" />
                ))}
              </div>
              <blockquote className="mt-5 text-xl leading-relaxed text-[#e8ecf4] sm:text-2xl">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center gap-4 border-t border-white/[0.06] pt-6">
                <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-[#00e5a0] to-[#06b6d4] text-sm font-bold text-[#0a0e1a]">
                  {t.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="text-base font-semibold text-white">{t.name}</div>
                  <div className="text-sm text-[#8b95a8]">{t.role} · {t.location}</div>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={onPrev}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="size-4" />
              </button>
              <div className="flex gap-1.5">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => onSelect(i)}
                    // WCAG 2.5.8 (AA, new in 2.2): hit area 24×24 px even though
                    // the visible dot stays 6×6 px. Visible dot is a child <span>.
                    className="w-6 h-6 inline-flex items-center justify-center"
                    aria-label={`Go to testimonial ${i + 1}`}
                    aria-current={i === idx ? 'true' : undefined}
                  >
                    <span
                      className={`block h-1.5 rounded-full transition-all ${
                        i === idx ? 'w-8 bg-[#00e5a0]' : 'w-1.5 bg-white/20 hover:bg-white/40'
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
              <button
                onClick={onNext}
                className="flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-[#8b95a8] transition-colors hover:bg-white/[0.06] hover:text-white"
                aria-label="Next testimonial"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// FAQ
// ═══════════════════════════════════════════════════════════════════

function FaqSection({
  openFaq,
  setOpenFaq,
}: {
  openFaq: number | null;
  setOpenFaq: (v: number | null) => void;
}) {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-lg text-[#8b95a8]">
          Everything you wanted to know — and a few things you didn't.
        </p>
      </div>

      <div className="mt-12 space-y-3">
        {FAQS.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div
              key={i}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? 'border-[#00e5a0]/30 bg-[#00e5a0]/[0.03]' : 'border-white/[0.06] bg-white/[0.02]'
              }`}
            >
              <button
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                <ChevronDown
                  className={`size-5 shrink-0 text-[#8b95a8] transition-transform ${
                    isOpen ? 'rotate-180 text-[#00e5a0]' : ''
                  }`}
                />
              </button>
              <div
                className="grid transition-all duration-300"
                style={{
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  opacity: isOpen ? 1 : 0,
                }}
              >
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-[#8b95a8]">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Final CTA
// ═══════════════════════════════════════════════════════════════════

function FinalCtaSection() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  return (
    <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32">
      <div className="relative overflow-hidden rounded-3xl border border-[#00e5a0]/20 bg-gradient-to-br from-[#00e5a0]/[0.08] via-[#0c0e14] to-[#8b5cf6]/[0.08] p-10 sm:p-16">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#00e5a0]/20 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#8b5cf6]/20 blur-3xl" />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Your exam is closer than you think.
          </h2>
          <p className="mt-4 text-lg text-[#8b95a8]">
            Start a free account today. Take the diagnostic, get your study plan,
            and see your weak areas light up — in under 15 minutes.
          </p>

          {submitted ? (
            <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-[#00e5a0]/30 bg-[#00e5a0]/[0.06] px-5 py-3 text-sm font-medium text-[#00e5a0]">
              <Check className="size-4" />
              You're on the list. We'll email you when your free credits are ready.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (email.includes('@')) setSubmitted(true);
              }}
              className="mx-auto mt-8 flex max-w-md flex-col items-stretch gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@medschool.edu"
                className="h-12 flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 text-sm text-white placeholder:text-[#5a6478] focus:border-[#00e5a0]/40 focus:outline-none focus:ring-2 focus:ring-[#00e5a0]/20"
              />
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#00e5a0] px-6 text-base font-bold text-[#0a0e1a] transition-all hover:bg-[#00d090] hover:shadow-[0_0_40px_-10px_rgba(0,229,160,0.6)]"
              >
                Get started free
                <ArrowRight className="size-4" />
              </button>
            </form>
          )}

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#8b95a8]">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-[#00e5a0]" /> No credit card
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-[#00e5a0]" /> Cancel anytime
            </span>
            <span className="text-white/20">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-4 text-[#00e5a0]" /> 15-min setup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Footer
// ═══════════════════════════════════════════════════════════════════

function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/landing" className="flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#00e5a0] text-[#0a0e1a] font-black text-lg">
                M
              </div>
              <span className="text-lg font-bold tracking-tight">MedQ</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#8b95a8]">
              AI-native medical education. Built by doctors, for the next
              generation of doctors. Questions, tutoring, and exam prep that
              actually adapts to how you learn.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {['BYOK encrypted', 'PWA offline', 'Curriculum-aligned', 'Daily updates'].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-[#8b95a8]"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Product</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#8b95a8]">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
              <li><Link href="/" className="hover:text-white transition-colors">Open app</Link></li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Resources</h2>
            <ul className="mt-3 space-y-2 text-sm text-[#8b95a8]">
              <li><a href="#" className="hover:text-white transition-colors">Study guides</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Exam calendars</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Help center</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-6 sm:flex-row">
          <p className="text-xs text-[#5a6478]">
            © 2026 MedQ. All rights reserved. Not affiliated with USMLE, MRCP, or any licensing board.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#5a6478]">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════
// Sticky mobile CTA
// ═══════════════════════════════════════════════════════════════════

function MobileStickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > 800);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 transform border-t border-white/[0.06] bg-[#0a0e1a]/95 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        show ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div>
          <div className="text-sm font-bold text-white">Start studying free</div>
          <div className="text-[11px] text-[#8b95a8]">No credit card · 50 free questions</div>
        </div>
        <Link
          href="/"
          className="inline-flex h-10 items-center gap-1.5 rounded-lg bg-[#00e5a0] px-4 text-sm font-bold text-[#0a0e1a]"
        >
          Open app
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
