/**
 * Home Extras — UI additions that exist on the live open.maic.chat site but
 * were never released to the open-source GitHub repo.
 *
 * These three components are built from scratch (not ported) based on the
 * live-site audit. They are opt-in UI layers that sit above the existing
 * OpenMAIC home page:
 *
 *   1. <AnnouncementBar />  — rotating banner carousel above the prompt input.
 *   2. <WhatsNewModal />    — first-visit modal showing the v0.2.2 changelog.
 *   3. <DiscoverTabs>       — wraps the existing "Recent Classrooms" section
 *                             with a My-Courses / Discover tab switcher.
 *
 * Design philosophy:
 *   - "Discover" does NOT fake community view/like counts. Instead it shows
 *     curated medical-education topic cards (medq's domain) that pre-fill the
 *     prompt textarea when clicked — honest, useful, domain-appropriate.
 *   - All dismiss/state is persisted to localStorage so the UI stays calm on
 *     repeat visits.
 *   - All copy is bilingual (English + Chinese) inline, keyed off the current
 *     i18n locale — no new translation files needed (keeps the surface area
 *     small; the existing locale JSONs already have 500+ keys each).
 *
 * Standalone file: home-page.tsx imports these via a single import line,
 * keeping the verbatim-port boundary clean.
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Wand2,
  HeartPulse,
  Brain,
  Stethoscope,
  Dna,
  Pill,
  Microscope,
  Activity,
  Bone,
  Eye,
  type LucideIcon,
} from 'lucide-react';
import { useI18n } from '@/lib/hooks/use-i18n';
import { cn } from '@/lib/utils';

// ============================================================================
// Shared constants
// ============================================================================

const WHATS_NEW_VERSION = '0.2.2';
const WHATS_NEW_STORAGE_KEY = `openmaic_whats_new_dismissed_v${WHATS_NEW_VERSION}`;
const ANNOUNCEMENT_DISMISS_KEY = `openmaic_announcement_dismissed_v${WHATS_NEW_VERSION}`;
const ANNOUNCEMENT_ADVANCE_MS = 6000;

/** Featured topics for the Discover tab — curated medical-education prompts.
 *  Each card is an honest "click to pre-fill" call-to-action, not a fake
 *  community course with view/like counts. */
interface FeaturedTopic {
  id: string;
  icon: LucideIcon;
  category: { 'en-US': string; 'zh-CN': string };
  title: { 'en-US': string; 'zh-CN': string };
  prompt: { 'en-US': string; 'zh-CN': string };
  accent: string; // tailwind gradient classes
}

const FEATURED_TOPICS: FeaturedTopic[] = [
  {
    id: 'dka',
    icon: Activity,
    category: { 'en-US': 'Endocrinology', 'zh-CN': '内分泌科' },
    title: {
      'en-US': 'Pathophysiology of Diabetic Ketoacidosis',
      'zh-CN': '糖尿病酮症酸中毒的病理生理学',
    },
    prompt: {
      'en-US': 'Explain the pathophysiology of diabetic ketoacidosis, including the role of insulin deficiency, counter-regulatory hormones, and ketone body formation.',
      'zh-CN': '讲解糖尿病酮症酸中毒的病理生理学，包括胰岛素缺乏、对抗调节激素和酮体生成的作用。',
    },
    accent: 'from-rose-500/15 to-orange-500/15 dark:from-rose-500/10 dark:to-orange-500/10',
  },
  {
    id: 'ecg',
    icon: HeartPulse,
    category: { 'en-US': 'Cardiology', 'zh-CN': '心内科' },
    title: {
      'en-US': 'ECG Interpretation: Myocardial Infarction',
      'zh-CN': '心电图解读：心肌梗死',
    },
    prompt: {
      'en-US': 'Teach me how to identify acute myocardial infarction on a 12-lead ECG, including ST elevation, reciprocal changes, and the territory each lead monitors.',
      'zh-CN': '教我如何在12导联心电图上识别急性心肌梗死，包括ST段抬高、对应导联改变，以及每个导联监测的心脏部位。',
    },
    accent: 'from-red-500/15 to-pink-500/15 dark:from-red-500/10 dark:to-pink-500/10',
  },
  {
    id: 'neuro',
    icon: Brain,
    category: { 'en-US': 'Neurology', 'zh-CN': '神经科' },
    title: {
      'en-US': 'Stroke: Ischemic vs Hemorrhagic',
      'zh-CN': '脑卒中：缺血性 vs 出血性',
    },
    prompt: {
      'en-US': 'Compare ischemic and hemorrhagic stroke — pathophysiology, clinical presentation, CT findings, and acute management including the tPA time window.',
      'zh-CN': '比较缺血性和出血性脑卒中——病理生理、临床表现、CT影像特点，以及包括tPA时间窗在内的急性期管理。',
    },
    accent: 'from-violet-500/15 to-indigo-500/15 dark:from-violet-500/10 dark:to-indigo-500/10',
  },
  {
    id: 'abx',
    icon: Pill,
    category: { 'en-US': 'Pharmacology', 'zh-CN': '药理学' },
    title: {
      'en-US': 'Antibiotic Classes and Mechanisms',
      'zh-CN': '抗生素分类与作用机制',
    },
    prompt: {
      'en-US': 'Explain the major antibiotic classes (beta-lactams, macrolides, fluoroquinolones, aminoglycosides, tetracyclines) — mechanism of action, spectrum, and key side effects.',
      'zh-CN': '讲解主要抗生素类别（β-内酰胺类、大环内酯类、氟喹诺酮类、氨基糖苷类、四环素类）——作用机制、抗菌谱和主要副作用。',
    },
    accent: 'from-emerald-500/15 to-teal-500/15 dark:from-emerald-500/10 dark:to-teal-500/10',
  },
  {
    id: 'renal',
    icon: Microscope,
    category: { 'en-US': 'Nephrology', 'zh-CN': '肾内科' },
    title: {
      'en-US': 'Acute Kidney Injury: RIFLE Criteria',
      'zh-CN': '急性肾损伤：RIFLE标准',
    },
    prompt: {
      'en-US': 'Walk me through the RIFLE criteria for acute kidney injury — Risk, Injury, Failure, Loss, ESRD — and the pre-renal vs intrinsic vs post-renal differential.',
      'zh-CN': '带我理解急性肾损伤的RIFLE标准——Risk、Injury、Failure、Loss、ESRD——以及肾前性、肾性、肾后性鉴别诊断。',
    },
    accent: 'from-amber-500/15 to-yellow-500/15 dark:from-amber-500/10 dark:to-yellow-500/10',
  },
  {
    id: 'anatomy',
    icon: Bone,
    category: { 'en-US': 'Anatomy', 'zh-CN': '解剖学' },
    title: {
      'en-US': 'Brachial Plexus: A Complete Walkthrough',
      'zh-CN': '臂丛神经：完整讲解',
    },
    prompt: {
      'en-US': 'Teach me the brachial plexus — roots, trunks, divisions, cords, branches — with the major nerves and the clinical relevance of each level.',
      'zh-CN': '讲解臂丛神经——根、干、股、束、支——包括主要神经和每一层的临床意义。',
    },
    accent: 'from-sky-500/15 to-cyan-500/15 dark:from-sky-500/10 dark:to-cyan-500/10',
  },
  {
    id: 'pharm',
    icon: Dna,
    category: { 'en-US': 'Biochemistry', 'zh-CN': '生物化学' },
    title: {
      'en-US': 'Glycolysis: All 10 Steps Explained',
      'zh-CN': '糖酵解：10步反应详解',
    },
    prompt: {
      'en-US': 'Walk me through all 10 steps of glycolysis — enzymes, substrates, products, ATP/NADH yield, and the rate-limiting step. Use the whiteboard to draw the pathway.',
      'zh-CN': '讲解糖酵解的全部10步反应——酶、底物、产物、ATP/NADH生成，以及限速步骤。请在白板上画出通路。',
    },
    accent: 'from-fuchsia-500/15 to-purple-500/15 dark:from-fuchsia-500/10 dark:to-purple-500/10',
  },
  {
    id: 'physical',
    icon: Stethoscope,
    category: { 'en-US': 'Clinical Skills', 'zh-CN': '临床技能' },
    title: {
      'en-US': 'Cardiac Auscultation: Heart Sounds',
      'zh-CN': '心脏听诊：心音',
    },
    prompt: {
      'en-US': 'Teach me cardiac auscultation — S1, S2, S3, S4, murmurs (systolic vs diastolic), and how to distinguish aortic stenosis from mitral regurgitation at the bedside.',
      'zh-CN': '教我心心脏听诊——S1、S2、S3、S4、杂音（收缩期vs舒张期），以及床旁如何区分主动脉瓣狭窄与二尖瓣关闭不全。',
    },
    accent: 'from-lime-500/15 to-green-500/15 dark:from-lime-500/10 dark:to-green-500/10',
  },
  {
    id: 'ophthal',
    icon: Eye,
    category: { 'en-US': 'Ophthalmology', 'zh-CN': '眼科' },
    title: {
      'en-US': 'Glaucoma: Open-Angle vs Angle-Closure',
      'zh-CN': '青光眼：开角型 vs 闭角型',
    },
    prompt: {
      'en-US': 'Compare open-angle and angle-closure glaucoma — anatomy, pathophysiology, clinical presentation, IOP findings, and treatment including the mechanism of pilocarpine.',
      'zh-CN': '比较开角型和闭角型青光眼——解剖、病理生理、临床表现、眼压特点，以及包括毛果芸香碱机制在内的治疗。',
    },
    accent: 'from-blue-500/15 to-indigo-500/15 dark:from-blue-500/10 dark:to-indigo-500/10',
  },
];

// ============================================================================
// 1. AnnouncementBar — rotating banner carousel
// ============================================================================

interface Banner {
  id: string;
  badge: string;
  badgeColor: string;
  text: { 'en-US': string; 'zh-CN': string };
  cta?: { 'en-US': string; 'zh-CN': string };
  ctaAction?: 'openWhatsNew';
  gradient: string;
}

const BANNERS: Banner[] = [
  {
    id: 'v022-pro-mode',
    badge: 'v0.2.2',
    badgeColor: 'bg-violet-500/90 text-white',
    text: {
      'en-US': 'Pro Mode: lightly edit generated slides — text, elements, and layout — directly in the classroom.',
      'zh-CN': 'Pro Mode 上线：直接在课堂中轻量编辑已生成的幻灯片——文字、元素、布局。',
    },
    cta: { 'en-US': 'See what\u2019s new', 'zh-CN': '查看新功能' },
    ctaAction: 'openWhatsNew',
    gradient: 'from-violet-500/10 via-fuchsia-500/5 to-transparent dark:from-violet-500/15 dark:via-fuchsia-500/10',
  },
  {
    id: 'v020-interactive',
    badge: 'v0.2.0',
    badgeColor: 'bg-cyan-500/90 text-white',
    text: {
      'en-US': 'Interactive Mode: 3D models, simulations, drag-and-drop games, and code playgrounds embedded right in the lesson.',
      'zh-CN': 'Interactive Mode：3D模型、仿真实验、拖拽小游戏和代码沙盒，全部嵌入课程中。',
    },
    gradient: 'from-cyan-500/10 via-sky-500/5 to-transparent dark:from-cyan-500/15 dark:via-sky-500/10',
  },
  {
    id: 'medical-focus',
    badge: 'MedQ',
    badgeColor: 'bg-emerald-500/90 text-white',
    text: {
      'en-US': 'Curated for medical education — DKA, ECG interpretation, antibiotic mechanisms, and 6 more ready-to-run lessons in Discover.',
      'zh-CN': '专为医学教育定制——DKA、心电图解读、抗生素机制等9节现成课程，见 Discover 标签。',
    },
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent dark:from-emerald-500/15 dark:via-teal-500/10',
  },
];

interface AnnouncementBarProps {
  onOpenWhatsNew: () => void;
}

export function AnnouncementBar({ onOpenWhatsNew }: AnnouncementBarProps) {
  const { locale } = useI18n();
  const [dismissed, setDismissed] = useState(false);
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === 'true') {
        setDismissed(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % BANNERS.length);
    }, ANNOUNCEMENT_ADVANCE_MS);
  }, []);

  useEffect(() => {
    if (dismissed) return;
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [dismissed, startTimer]);

  const dismiss = () => {
    setDismissed(true);
    try {
      localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, 'true');
    } catch {
      /* ignore */
    }
  };

  if (dismissed) return null;

  const banner = BANNERS[index];
  const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';

  return (
    <div
      className={cn(
        'relative w-full max-w-[800px] mb-4 rounded-2xl border border-border/40 overflow-hidden',
        'bg-gradient-to-r',
        banner.gradient,
      )}
    >
      <div className="flex items-center gap-3 px-4 py-2.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="flex items-center gap-2.5 flex-1 min-w-0"
          >
            <span
              className={cn(
                'shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider',
                banner.badgeColor,
              )}
            >
              {banner.badge}
            </span>
            <span className="text-[12.5px] text-foreground/80 truncate">
              {banner.text[locKey]}
            </span>
            {banner.cta && banner.ctaAction === 'openWhatsNew' && (
              <button
                onClick={onOpenWhatsNew}
                className="shrink-0 text-[11px] font-medium text-violet-600 dark:text-violet-400 hover:underline"
              >
                {banner.cta[locKey]} →
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="shrink-0 flex items-center gap-1">
          <button
            onClick={() => {
              setIndex((prev) => (prev - 1 + BANNERS.length) % BANNERS.length);
              startTimer();
            }}
            aria-label="Previous banner"
            className="size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <ChevronLeft className="size-3.5" />
          </button>
          <button
            onClick={() => {
              setIndex((prev) => (prev + 1) % BANNERS.length);
              startTimer();
            }}
            aria-label="Next banner"
            className="size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <ChevronRight className="size-3.5" />
          </button>
          <div className="w-px h-3 bg-border/40 mx-0.5" />
          <button
            onClick={dismiss}
            aria-label="Dismiss announcement"
            className="size-5 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors"
          >
            <X className="size-3.5" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-1 pb-0.5">
        {BANNERS.map((b, i) => (
          <button
            key={b.id}
            onClick={() => {
              setIndex(i);
              startTimer();
            }}
            aria-label={`Go to banner ${i + 1}`}
            className={cn(
              'h-0.5 rounded-full transition-all',
              i === index ? 'w-4 bg-foreground/60' : 'w-1.5 bg-foreground/20 hover:bg-foreground/40',
            )}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// 2. WhatsNewModal — first-visit changelog modal
// ============================================================================

interface WhatsNewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ChangelogItem {
  title: { 'en-US': string; 'zh-CN': string };
  description: { 'en-US': string; 'zh-CN': string };
  icon: LucideIcon;
  color: string;
}

const CHANGELOG: ChangelogItem[] = [
  {
    title: { 'en-US': 'Pro Mode', 'zh-CN': 'Pro 模式' },
    description: {
      'en-US': 'Lightly edit generated slides — text, elements, and layout — directly in the classroom, without regenerating.',
      'zh-CN': '直接在课堂中轻量编辑已生成的幻灯片——文字、元素、布局——无需重新生成。',
    },
    icon: Wand2,
    color: 'text-violet-500',
  },
  {
    title: { 'en-US': 'Editable Outline', 'zh-CN': '可编辑大纲' },
    description: {
      'en-US': 'Review, add, remove, and reorder scenes in the outline before generation. Fix the AI\u2019s plan before it builds the slides.',
      'zh-CN': '生成前可在大纲中查看、新增、删除、重排场景。在 AI 开始构建幻灯片之前修正其计划。',
    },
    icon: Sparkles,
    color: 'text-cyan-500',
  },
  {
    title: { 'en-US': 'Offline Interactive Export', 'zh-CN': '离线交互式导出' },
    description: {
      'en-US': 'Export classrooms as standalone HTML with all external resources inlined. Open offline, share by email, no server required.',
      'zh-CN': '将课堂导出为独立 HTML，所有外部资源已内联。可离线打开、邮件分享，无需服务器。',
    },
    icon: Activity,
    color: 'text-emerald-500',
  },
  {
    title: { 'en-US': 'Multi-Agent Classroom', 'zh-CN': '多智能体课堂' },
    description: {
      'en-US': 'AI Teacher, Quiz Master, Challenger, and Summarizer — four agents voice each slide, draw on the whiteboard, and discuss with you.',
      'zh-CN': 'AI 老师、测验官、挑战者、总结官——四位智能体为每张幻灯片配音、在白板上书写、与你讨论。',
    },
    icon: Brain,
    color: 'text-rose-500',
  },
];

export function WhatsNewModal({ open, onOpenChange }: WhatsNewModalProps) {
  const { locale } = useI18n();
  const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';

  const dismiss = () => {
    try {
      localStorage.setItem(WHATS_NEW_STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    onOpenChange(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={dismiss}
        >
          <motion.div
            initial={{ scale: 0.95, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border border-border/60 shadow-2xl overflow-hidden"
          >
            {/* Header gradient */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/10 to-transparent dark:from-violet-500/30 dark:via-fuchsia-500/20" />
            <button
              onClick={dismiss}
              aria-label="Close"
              className="absolute top-3 right-3 size-7 rounded-full flex items-center justify-center text-muted-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors z-10"
            >
              <X className="size-4" />
            </button>

            <div className="relative px-6 pt-8 pb-5">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                <Sparkles className="size-3" />
                v{WHATS_NEW_VERSION}
              </div>
              <h2 className="text-xl font-bold mb-1">
                {locKey === 'zh-CN' ? 'OpenMAIC 有更新' : 'What\u2019s New in OpenMAIC'}
              </h2>
              <p className="text-[13px] text-muted-foreground mb-5">
                {locKey === 'zh-CN'
                  ? '本次更新带来了以下新功能与改进：'
                  : 'Here\u2019s what shipped in this release:'}
              </p>

              <div className="space-y-3.5">
                {CHANGELOG.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title['en-US']} className="flex items-start gap-3">
                      <div
                        className={cn(
                          'shrink-0 size-8 rounded-lg bg-foreground/5 dark:bg-foreground/10 flex items-center justify-center',
                          item.color,
                        )}
                      >
                        <Icon className="size-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[13px] font-semibold">{item.title[locKey]}</div>
                        <div className="text-[12px] text-muted-foreground leading-relaxed">
                          {item.description[locKey]}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="px-6 pb-5 pt-1 flex justify-end gap-2 border-t border-border/40">
              <button
                onClick={dismiss}
                className="px-4 py-1.5 text-[12px] font-medium rounded-lg bg-violet-500 text-white hover:bg-violet-600 transition-colors"
              >
                {locKey === 'zh-CN' ? '我知道了' : 'Got it'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Hook: returns whether the What's-New modal should auto-open on first visit. */
export function useShouldShowWhatsNew(): [boolean, () => void] {
  const [shouldShow, setShouldShow] = useState(false);
  useEffect(() => {
    try {
      if (localStorage.getItem(WHATS_NEW_STORAGE_KEY) !== 'true') {
        // Small delay so it doesn't compete with the page's initial animation
        const t = setTimeout(() => setShouldShow(true), 800);
        return () => clearTimeout(t);
      }
    } catch {
      /* ignore */
    }
  }, []);
  const markSeen = useCallback(() => {
    try {
      localStorage.setItem(WHATS_NEW_STORAGE_KEY, 'true');
    } catch {
      /* ignore */
    }
    setShouldShow(false);
  }, []);
  return [shouldShow, markSeen];
}

// ============================================================================
// 3. DiscoverTabs — My Courses / Discover tab switcher
// ============================================================================

export type ClassroomTab = 'my-courses' | 'discover';

interface DiscoverTabsProps {
  activeTab: ClassroomTab;
  onTabChange: (tab: ClassroomTab) => void;
  myCoursesCount: number;
  discoverCount: number;
}

export function DiscoverTabs({
  activeTab,
  onTabChange,
  myCoursesCount,
  discoverCount,
}: DiscoverTabsProps) {
  const { locale } = useI18n();
  const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';

  const tabs: { id: ClassroomTab; label: string; count: number }[] = [
    {
      id: 'my-courses',
      label: locKey === 'zh-CN' ? '我的课程' : 'My Courses',
      count: myCoursesCount,
    },
    {
      id: 'discover',
      label: locKey === 'zh-CN' ? '发现' : 'Discover',
      count: discoverCount,
    },
  ];

  return (
    <div className="flex items-center gap-1 p-0.5 rounded-full bg-foreground/5 dark:bg-foreground/10">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'relative px-3.5 py-1 text-[12px] font-medium rounded-full transition-colors',
            activeTab === tab.id
              ? 'text-foreground'
              : 'text-muted-foreground/70 hover:text-foreground/80',
          )}
        >
          {activeTab === tab.id && (
            <motion.div
              layoutId="discover-tab-pill"
              className="absolute inset-0 rounded-full bg-white dark:bg-slate-800 shadow-sm"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-1.5">
            {tab.label}
            <span
              className={cn(
                'text-[10px] tabular-nums',
                activeTab === tab.id ? 'text-violet-500' : 'text-muted-foreground/50',
              )}
            >
              {tab.count}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

// ============================================================================
// 4. FeaturedTopicCard — single card in the Discover grid
// ============================================================================

interface FeaturedTopicCardProps {
  topic: FeaturedTopic;
  onClick: (prompt: string) => void;
}

export function FeaturedTopicCard({ topic, onClick }: FeaturedTopicCardProps) {
  const { locale } = useI18n();
  const locKey = locale === 'zh-CN' || locale === 'zh-TW' ? 'zh-CN' : 'en-US';
  const Icon = topic.icon;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick(topic.prompt[locKey])}
      className={cn(
        'group relative w-full text-left rounded-2xl border border-border/50 overflow-hidden',
        'bg-gradient-to-br',
        topic.accent,
        'hover:border-border hover:shadow-md transition-all',
        'p-4',
      )}
    >
      <div className="flex items-start gap-3">
        <div className="shrink-0 size-9 rounded-xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm flex items-center justify-center shadow-sm">
          <Icon className="size-4.5 text-foreground/80" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70 mb-0.5">
            {topic.category[locKey]}
          </div>
          <div className="text-[13px] font-semibold leading-snug line-clamp-2">
            {topic.title[locKey]}
          </div>
        </div>
      </div>
      <div className="mt-2.5 flex items-center gap-1 text-[11px] text-violet-600 dark:text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles className="size-3" />
        {locKey === 'zh-CN' ? '点击生成此课程' : 'Click to generate this lesson'}
      </div>
    </motion.button>
  );
}

export { FEATURED_TOPICS };
