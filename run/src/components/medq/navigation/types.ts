import type React from 'react';
import type { TabId } from '@/lib/medq-tabid';

export interface TabConfig {
    id: TabId;
    label: string;
    icon: React.ReactNode;
    premium?: boolean;
    adminOnly?: boolean;
    badge?: string;
    color?: string;
}

export interface BottomNavDefinition {
    id: TabId;
    label: string;
    icon: React.ComponentType<{
        className?: string;
        style?: React.CSSProperties;
    }>;
    color?: string;
    subTabs?: TabId[];
}

export interface SidebarNavProps {
    /** Derived from the URL (usePathname/useSearchParams) by the shells. */
    activeTab: TabId;
    tier: string;
    user?: unknown;
    isOpen: boolean;
    onClose: () => void;
}

export interface MobileBottomNavProps {
    activeTab: TabId;
    unreadNotifs: number;
    items: BottomNavDefinition[];
    onCustomize: () => void;
}
