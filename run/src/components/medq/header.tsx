'use client';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { tabToPath, pathToTab, resolveNavigationTarget, DIALOG_TARGETS } from '@/lib/medq-routing';
import { useSettings } from '@/components/medq/SettingsContext';

import PremiumBadge from '@/components/medq/PremiumBadge';
import ThemeToggle from '@/components/medq/ThemeToggle';
import { CreditDisplay } from '@/components/medq/PremiumBadge';
import NotificationsPanel from '@/components/medq/NotificationsPanel'
import UserMenu from '@/components/medq/UserMenu'
import {
  SidebarNav,
  MobileBottomNav,
  BottomNavCustomizer,
  useBottomNav,
  SIDEBAR_NAV
} from '@/components/medq/navigation';
import type { TabId } from '@/lib/medq-tabid';

interface TabConfig {
  id: TabId;
  label: string;
  icon: React.ReactNode;
  premium?: boolean;
  adminOnly?: boolean;
  badge?: string;
  color?: string;
}


import {
  Stethoscope, LayoutDashboard, Bolt, FileUp, BookOpen, Brain, FolderOpen, Trophy,
  Lightbulb, CalendarDays, Network, PenLine, FileText, MessageCircle,
  GraduationCap, Clapperboard, ScanEye, Mic, Sparkles, Newspaper, Eye,
  Loader2, Timer, Crown, CreditCard, BarChart3, LogIn, ShieldCheck, Users,
  Swords, Radio, Zap, Bell, Menu, X, ChevronDown, ChevronRight,
  Home as HomeIcon, UsersRound, TrendingUp, MoreHorizontal,
  Compass, Star, Settings, HelpCircle, Heart, Hash, Flame, FlaskConical,
  Search, Award, Pill, Clock, Calculator, Stethoscope as StethoscopeIcon, BarChart2,
  Zap as ZapIcon, StickyNote, Calendar, Gamepad2,
  Wand2, BookOpenCheck, GitCompare, ListChecks, Swords as SwordsIcon, Music, HelpCircle as TriviaIcon, Activity,
  GitBranch, Brain as BrainIcon, MessageSquare, Shuffle as ShuffleIcon, Heart as HeartPulse,
  Film, Video as VideoIcon, Globe, Layers, Scissors, Radar, Table2,
  Sparkles as SparklesIcon,
} from 'lucide-react';



const ALL_TABS = SIDEBAR_NAV.flatMap(s => s.items);
const SPECIAL_TABS: TabConfig[] = [
  { id: 'pricing', label: 'Pricing', icon: <CreditCard className="w-4 h-4" /> },
  { id: 'revenue', label: 'Revenue', icon: <BarChart3 className="w-4 h-4" /> },
  { id: 'admin', label: 'Admin', icon: <ShieldCheck className="w-4 h-4" />, adminOnly: true },
];








type HeaderAction =
  | 'profile'
  | 'settings'
  | 'pricing'
  | 'device-security'
  | 'sidebar'
  | 'search'
  | 'credit-shop'
  | 'rewarded-ad';

const Header = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user
    ? {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        image: session.user.image,
        role: session.user.role,
      }
    : null;
  
  const activeTab = pathToTab(pathname);
  
  const currentTab = [...ALL_TABS, ...SPECIAL_TABS].find(t => t.id === activeTab);
  const currentLabel = currentTab?.label || 'MedQ';
  
  const { settings, playSoundIfEnabled } = useSettings();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifCount, setNotifCount] = useState(0);

  const runHeaderAction = (action: HeaderAction) => {
    window.dispatchEvent(new CustomEvent('medq-header-action', { detail: { action } }));
  };


  return (

    <header className="medq-header-bar border-b border-white/[0.05] flex-shrink-0 z-30" style={{ background: 'var(--medq-header-bg, rgba(12,14,20,0.92))', backdropFilter: 'blur(20px)', borderColor: 'var(--medq-border, rgba(255,255,255,0.05))' }}>
      <div className="flex items-center justify-between px-4 py-3 max-w-[1200px] mx-auto w-full min-w-0">
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}
          <button onClick={() => runHeaderAction('sidebar')} className="lg:hidden w-11 h-11 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06]" aria-label="Open menu">
            <Menu className="w-4 h-4 text-[#8b95a8]" />
          </button>
          {/* Current tab title */}
          <div className="min-w-0">
            <h2 className="text-sm font-bold text-[#e8ecf4] truncate">{currentLabel}</h2>
            <p className="text-[10px] text-[#5a6478] hidden lg:block">Med<span className="text-[#00e5a0]">Q</span> · Study · Compete · Connect</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <PremiumBadge size="sm" />
          <CreditDisplay
            onEarnCredits={() => runHeaderAction('rewarded-ad')}
            onOpenShop={() => runHeaderAction('credit-shop')} />

          {/* Theme toggle (dark / light) */}
          <ThemeToggle />

          {/* Global Search button */}
          <button
            onClick={() => runHeaderAction('search')}
            className="w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06] transition-all"
            aria-label="Search (Ctrl+K)"
            title="Search (Ctrl+K)"
          >
            <Search className="w-4 h-4 text-[#8b95a8]" />
          </button>

          {/* Notifications bell - hidden when notifications setting is off */}
          {/* {isAuthenticated && settings.notifications && ( */}
          {true && settings.notifications && (
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative w-11 h-11 lg:w-9 lg:h-9 rounded-lg flex items-center justify-center hover:bg-white/[0.05] border border-white/[0.06] transition-all"
                aria-label={`Notifications${notifCount > 0 ? ` (${notifCount} unread)` : ''}`}
              >
                <Bell className="w-4 h-4 text-[#8b95a8]" />
                {notifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#ff5757] text-[8px] font-bold text-white flex items-center justify-center">{notifCount > 9 ? '9+' : notifCount}</span>
                )}
              </button>
              <NotificationsPanel
                open={showNotifications}
                onClose={() => setShowNotifications(false)}
              // onNavigate={(tab) => { setShowNotifications(false); handleTabSwitch(tab as TabId); }}
              />
            </div>
          )}

          {/* Auth section */}
          {/* {isAuthenticated && user ? ( */}
          <UserMenu
            user={user}
            onShowProfile={() => runHeaderAction('profile')}
            onShowSettings={() => runHeaderAction('settings')}
            onSwitchToPricing={() => runHeaderAction('pricing')}
            onShowDeviceSecurity={() => runHeaderAction('device-security')}
          />
        </div>
      </div>

    </header>

  )
}

export default Header