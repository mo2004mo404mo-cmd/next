import type { TabId } from '@/lib/medq-tabid';

import {
    Activity, Award, BarChart2, Bell, BookOpen, BookOpenCheck, Brain, Brain as BrainIcon, CalendarDays, Calculator, Clapperboard, Clock, CreditCard, Eye, FileText, Film, FlaskConical, Flame, FolderOpen, Gamepad2, GitBranch, GitCompare, GraduationCap, Globe, Home as HomeIcon, KeyRound, Layers, Lightbulb, ListChecks, MessageCircle, MessageSquare, Mic, Music, Newspaper, Network, PenLine, Pill, Radar, Radio, ScanEye, Scissors, Sparkles, Sparkles as SparklesIcon, Stethoscope, Stethoscope as StethoscopeIcon, Swords, Swords as SwordsIcon, Table2, Target, Timer, TrendingUp, Trophy, Users, UsersRound, Wand2, Video as VideoIcon, Zap,ShuffleIcon, HelpCircle as TriviaIcon,
} from 'lucide-react';

import type {
    BottomNavDefinition,
    TabConfig,
} from './types';

export const SIDEBAR_NAV: { section: string; items: TabConfig[] }[] = [
    {
        section: '',
        items: [
            {
                id: 'dashboard',
                label: 'Home',
                icon: <HomeIcon className="w-4.5 h-4.5" />,
                color: '#00e5a0',
            },
            {
                id: 'advanced-chat',
                label: 'Messages',
                icon: <MessageCircle className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'New',
            },
        ],
    },

    {
        section: 'Study',
        items: [
            {
                id: 'bank',
                label: 'Question Bank',
                icon: <BookOpen className="w-4.5 h-4.5" />,
            },
            {
                id: 'take-exam',
                label: 'Exam Simulator',
                icon: <Clock className="w-4.5 h-4.5" />,
                color: '#4fc3f7',
                badge: 'New',
            },
            {
                id: 'flashcards',
                label: 'Flashcards',
                icon: <Brain className="w-4.5 h-4.5" />,
            },
            {
                id: 'osce',
                label: 'OSCE Trainer',
                icon: <Stethoscope className="w-4.5 h-4.5" />,
                color: '#10b981',
                badge: 'New',
            },
            {
                id: 'review',
                label: 'Review Hub',
                icon: <Flame className="w-4.5 h-4.5" />,
                color: '#f59e0b',
            },
            {
                id: 'lab-values',
                label: 'Lab Values',
                icon: <FlaskConical className="w-4.5 h-4.5" />,
                color: '#06b6d4',
            },
            {
                id: 'exams',
                label: 'Exams',
                icon: <FileText className="w-4.5 h-4.5" />,
            },
            {
                id: 'collections',
                label: 'Collections',
                icon: <FolderOpen className="w-4.5 h-4.5" />,
            },
            {
                id: 'create',
                label: 'Create',
                icon: <PenLine className="w-4.5 h-4.5" />,
            },
        ],
    },

    {
        section: 'AI Tools',
        items: [
            {
                id: 'freellm',
                label: 'AI Router · BYOK',
                icon: <KeyRound className="w-4.5 h-4.5" />,
                color: '#00e5a0',
                badge: 'New',
            },
            {
                id: 'generate',
                label: 'Generate Questions',
                icon: <Zap className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'tutor',
                label: 'AI Tutor',
                icon: <MessageCircle className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'cases',
                label: 'Case Simulator',
                icon: <Stethoscope className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'mnemonics',
                label: 'AI Mnemonics',
                icon: <Sparkles className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'image-analyzer',
                label: 'Image Analyzer',
                icon: <ScanEye className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'voice',
                label: 'Voice Study',
                icon: <Mic className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'files',
                label: 'From Files',
                icon: <Bell className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'video',
                label: 'Video Lessons',
                icon: <Clapperboard className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'board-prep',
                label: 'Board Prep',
                icon: <GraduationCap className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'anatomy',
                label: 'Anatomy 3D',
                icon: <Eye className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'clinical-vignettes',
                label: 'Clinical Vignettes',
                icon: <FileText className="w-4.5 h-4.5" />,
                premium: true,
                color: '#ff5757',
                badge: 'New',
            },
            {
                id: 'whiteboard-studio',
                label: 'Whiteboard Studio',
                icon: <Film className="w-4.5 h-4.5" />,
                premium: true,
                color: '#4fc3f7',
                badge: 'New',
            },
            {
                id: 'video-library',
                label: 'Video Library',
                icon: <VideoIcon className="w-4.5 h-4.5" />,
                premium: true,
                color: '#8b5cf6',
                badge: 'New',
            },
        ],
    },

    {
        section: 'Compete',
        items: [
            {
                id: 'qotd',
                label: 'Question of the Day',
                icon: <Zap className="w-4.5 h-4.5" />,
                color: '#f59e0b',
                badge: 'New',
            },
            {
                id: 'challenge',
                label: 'Daily Challenge',
                icon: <Trophy className="w-4.5 h-4.5" />,
            },
            {
                id: 'speed-quiz',
                label: 'Speed Quiz',
                icon: <Gamepad2 className="w-4.5 h-4.5" />,
                color: '#00e5a0',
                badge: 'New',
            },
            {
                id: 'arena',
                label: 'Challenge Arena',
                icon: <Swords className="w-4.5 h-4.5" />,
            },
            {
                id: 'live-battle',
                label: 'Live Battle',
                icon: <Radio className="w-4.5 h-4.5" />,
                badge: 'LIVE',
                color: '#ff5757',
            },
            {
                id: 'leaderboard',
                label: 'Leaderboard',
                icon: <Trophy className="w-4.5 h-4.5" />,
                color: '#f59e0b',
            },
        ],
    },

    {
        section: 'Community',
        items: [
            {
                id: 'friends',
                label: 'Friends',
                icon: <Users className="w-4.5 h-4.5" />,
            },
            {
                id: 'groups',
                label: 'Groups',
                icon: <UsersRound className="w-4.5 h-4.5" />,
                badge: 'New',
                color: '#8b5cf6',
            },
            {
                id: 'meeting',
                label: 'Live Meeting',
                icon: <Radio className="w-4.5 h-4.5" />,
                badge: 'LIVE',
                color: '#ff5757',
            },
        ],
    },

    {
        section: 'Progress',
        items: [
            {
                id: 'insights',
                label: 'Insights',
                icon: <Lightbulb className="w-4.5 h-4.5" />,
            },
            {
                id: 'weak-areas',
                label: 'Weak Areas',
                icon: <Target className="w-4.5 h-4.5" />,
                color: '#ff5757',
            },
            {
                id: 'achievements',
                label: 'Achievements',
                icon: <Award className="w-4.5 h-4.5" />,
                color: '#f59e0b',
            },
            {
                id: 'planner',
                label: 'Study Planner',
                icon: <CalendarDays className="w-4.5 h-4.5" />,
                premium: true,
            },
            {
                id: 'knowledge-map',
                label: 'Knowledge Map',
                icon: <Network className="w-4.5 h-4.5" />,
            },
            {
                id: 'streak-calendar',
                label: 'Streak Calendar',
                icon: <CalendarDays className="w-4.5 h-4.5" />,
                color: '#ff6b35',
                badge: 'New',
            },
            {
                id: 'news',
                label: 'Medical News',
                icon: <Newspaper className="w-4.5 h-4.5" />,
            },
            {
                id: 'study-streaks',
                label: 'Study Streaks',
                icon: <Flame className="w-4.5 h-4.5" />,
                color: '#ff6b35',
                badge: 'New',
            },
        ],
    },

    {
        section: 'Tools',
        items: [
            {
                id: 'drug-interactions',
                label: 'Drug Interactions',
                icon: <Pill className="w-4.5 h-4.5" />,
                color: '#ff5757',
                badge: 'New',
            },
            {
                id: 'medication-tables',
                label: 'Medication Tables',
                icon: <Table2 className="w-4.5 h-4.5" />,
                color: '#22d3ee',
                badge: 'New',
            },
            {
                id: 'ai-mode',
                label: 'AI Study Mode',
                icon: <SparklesIcon className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'AI',
            },
            {
                id: 'micro-lessons',
                label: 'Micro-Lessons',
                icon: <SparklesIcon className="w-4.5 h-4.5" />,
                color: '#ec4899',
                badge: 'New',
            },
            {
                id: 'ai-classroom',
                label: 'OpenMAIC Classroom',
                icon: <GraduationCap className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'New',
            },
            {
                id: 'medicine-prices',
                label: 'Medicine Prices',
                icon: <Pill className="w-4.5 h-4.5" />,
                color: '#00e5a0',
                badge: 'New',
            },
            {
                id: 'openfda-drugs',
                label: 'Drug Reference',
                icon: <Globe className="w-4.5 h-4.5" />,
                color: '#4fc3f7',
                badge: 'New',
            },
            {
                id: 'drug-zoom',
                label: 'Drug Zoom',
                icon: <Pill className="w-4.5 h-4.5" />,
                color: '#a456dd',
                badge: 'New',
            },
            {
                id: 'drug-zoom-labs',
                label: 'Lab Search',
                icon: <FlaskConical className="w-4.5 h-4.5" />,
                color: '#ec4899',
                badge: 'New',
            },
            {
                id: 'image-occlusion',
                label: 'Image Occlusion',
                icon: <Layers className="w-4.5 h-4.5" />,
                color: '#ec4899',
                badge: 'New',
            },
            {
                id: 'medical-calculator',
                label: 'Medical Calculators',
                icon: <Calculator className="w-4.5 h-4.5" />,
                color: '#4fc3f7',
            },
            {
                id: 'symptom-checker',
                label: 'Symptom Checker',
                icon: <StethoscopeIcon className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
            },
            {
                id: 'exam-countdown',
                label: 'Exam Countdown',
                icon: <Clock className="w-4.5 h-4.5" />,
                color: '#f59e0b',
            },
            {
                id: 'study-stats',
                label: 'Study Statistics',
                icon: <BarChart2 className="w-4.5 h-4.5" />,
                color: '#00e5a0',
            },
            {
                id: 'study-timer',
                label: 'Study Timer',
                icon: <Timer className="w-4.5 h-4.5" />,
                color: '#10b981',
                badge: 'New',
            },
            {
                id: 'quick-notes',
                label: 'Quick Notes',
                icon: <PenLine className="w-4.5 h-4.5" />,
                color: '#4fc3f7',
                badge: 'New',
            },
            {
                id: 'mnemonic-maker',
                label: 'Mnemonic Maker',
                icon: <Wand2 className="w-4.5 h-4.5" />,
                color: '#f59e0b',
                badge: 'New',
            },
            {
                id: 'medical-dictionary',
                label: 'Medical Dictionary',
                icon: <BookOpenCheck className="w-4.5 h-4.5" />,
                color: '#06b6d4',
                badge: 'New',
            },
            {
                id: 'revision-scheduler',
                label: 'Revision Scheduler',
                icon: <ListChecks className="w-4.5 h-4.5" />,
                color: '#ff6b35',
                badge: 'New',
            },
            {
                id: 'peer-compare',
                label: 'Peer Compare',
                icon: <GitCompare className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'New',
            },
            {
                id: 'flashcard-arena',
                label: 'Flashcard Arena',
                icon: <SwordsIcon className="w-4.5 h-4.5" />,
                color: '#ff5757',
                badge: 'New',
            },
            {
                id: 'study-playlist',
                label: 'Study Playlist',
                icon: <Music className="w-4.5 h-4.5" />,
                color: '#4fc3f7',
                badge: 'New',
            },
            {
                id: 'medical-trivia',
                label: 'Medical Trivia',
                icon: <TriviaIcon className="w-4.5 h-4.5" />,
                color: '#f59e0b',
                badge: 'New',
            },
            {
                id: 'performance-coach',
                label: 'Performance Coach',
                icon: <TrendingUp className="w-4.5 h-4.5" />,
                color: '#10b981',
                badge: 'New',
            },
            {
                id: 'ecg-challenge',
                label: 'ECG Challenge',
                icon: <Activity className="w-4.5 h-4.5" />,
                color: '#ff5757',
                badge: 'New',
            },
            {
                id: 'clinical-pathways',
                label: 'Clinical Pathways',
                icon: <GitBranch className="w-4.5 h-4.5" />,
                color: '#06b6d4',
                badge: 'New',
            },
            {
                id: 'diff-diagnosis',
                label: 'Diff Diagnosis',
                icon: <StethoscopeIcon className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'New',
            },
            {
                id: 'decision-tree',
                label: 'Decision Tree',
                icon: <GitBranch className="w-4.5 h-4.5" />,
                color: '#22d3ee',
                badge: 'New',
            },
            {
                id: 'decision-making-tree',
                label: 'Clinical Reasoning',
                icon: <BrainIcon className="w-4.5 h-4.5" />,
                color: '#8b5cf6',
                badge: 'New',
            },
            {
                id: 'guideline-library',
                label: 'Guideline Library',
                icon: <BookOpen className="w-4.5 h-4.5" />,
                color: '#f59e0b',
                badge: 'New',
            },
            {
                id: 'procedure-player',
                label: 'Procedure Player',
                icon: <Scissors className="w-4.5 h-4.5" />,
                color: '#ec4899',
                badge: 'New',
            },
            {
                id: 'cme-tracker',
                label: 'CME Tracker',
                icon: <GraduationCap className="w-4.5 h-4.5" />,
                color: '#00e5a0',
                badge: 'New',
            },
            {
                id: 'knowledge-gap-analyzer',
                label: 'Gap Analyzer',
                icon: <Radar className="w-4.5 h-4.5" />,
                color: '#22d3ee',
                badge: 'New',
            },
            {
                id: 'med-memorize',
                label: 'Med Memorize',
                icon: <ShuffleIcon className="w-4.5 h-4.5" />,
                color: '#f59e0b',
                badge: 'New',
            },
            {
                id: 'med-chat',
                label: 'Med Chat AI',
                icon: <MessageSquare className="w-4.5 h-4.5" />,
                color: '#00e5a0',
                badge: 'New',
            },
            {
                id: 'oral-exam',
                label: 'Oral Exam',
                icon: <Mic className="w-4.5 h-4.5" />,
                color: '#ff5757',
                badge: 'New',
            },
        ],
    },

    {
        section: 'Rewards',
        items: [
            {
                id: 'erc',
                label: 'Earn Rewards',
                icon: <Zap className="w-4.5 h-4.5" />,
                color: '#f59e0b',
            },
        ],
    },
];

/**
 * Default mobile navigation.
 */
export const DEFAULT_BOTTOM_NAV: TabId[] = [
    'dashboard',
    'bank',
    'advanced-chat',
    'arena',
    'groups',
];

export const MAX_BOTTOM_NAV_ITEMS = 5;

export const BOTTOM_NAV_STORAGE_KEY =
    'medq-mobile-bottom-nav';

export const EXCLUDED_BOTTOM_NAV_ITEMS =
    new Set<TabId>(['meeting']);

/**
 * Related pages that should keep the same
 * bottom-navigation item highlighted.
 */
export const BOTTOM_NAV_SUBTABS: Partial<
    Record<TabId, TabId[]>
> = {
    dashboard: [
        'dashboard',
        'erc',
        'insights',
        'weak-areas',
        'achievements',
        'planner',
        'knowledge-map',
        'news',
        'study-stats',
        'exam-countdown',
        'qotd',
        'streak-calendar',
        'quick-notes',
        'study-timer',
        'peer-compare',
        'performance-coach',
        'study-streaks',
    ],

    bank: [
        'bank',
        'flashcards',
        'review',
        'lab-values',
        'collections',
        'exams',
        'create',
        'generate',
        'files',
        'tutor',
        'mnemonics',
        'cases',
        'image-analyzer',
        'voice',
        'anatomy',
        'video',
        'board-prep',
        'take-exam',
        'drug-interactions',
        'medicine-prices',
        'openfda-drugs',
        'drug-zoom',
        'drug-zoom-labs',
        'medical-calculator',
        'symptom-checker',
        'clinical-vignettes',
        'speed-quiz',
        'mnemonic-maker',
        'medical-dictionary',
        'revision-scheduler',
        'flashcard-arena',
        'study-playlist',
        'medical-trivia',
        'ecg-challenge',
        'clinical-pathways',
        'diff-diagnosis',
        'med-memorize',
        'med-chat',
        'oral-exam',
        'whiteboard-studio',
        'video-library',
        'image-occlusion',
        'decision-tree',
        'decision-making-tree',
        'guideline-library',
        'procedure-player',
        'cme-tracker',
        'knowledge-gap-analyzer',
        'medication-tables',
        'ai-mode',
        'micro-lessons',
        'ai-classroom',
    ],

    'advanced-chat': [
        'advanced-chat',
        'friends',
    ],

    arena: [
        'qotd',
        'challenge',
        'speed-quiz',
        'arena',
        'live-battle',
        'leaderboard',
    ],

    groups: [
        'groups',
        'meeting',
    ],
};
