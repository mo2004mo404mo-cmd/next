'use client';

import Link from 'next/link';
import {
    MoreHorizontal,
} from 'lucide-react';

import { tabHref, hasRealPage } from '@/lib/medq-nav';

import {
    getActiveBottomNavId,
} from './utils';

import type {
    MobileBottomNavProps,
} from './types';

/**
 * REAL Next.js routing (user directive 2026-11-04): every bottom-nav item
 * is a plain <Link href> — no click interception, no preventDefault, no
 * onTabSwitch. Real-page tabs navigate to their (app) route; SPA tabs
 * navigate to the REAL /?tab=<id> URL (refresh-safe, back/forward works).
 * The shell derives the active item from the URL.
 */

export function MobileBottomNav({
    activeTab,
    unreadNotifs,
    items,
    onCustomize,
}: MobileBottomNavProps) {
    const activeNavId =
        getActiveBottomNavId(
            activeTab,
            items
        );

    return (
        <nav
            className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t border-white/[0.06] flex items-center justify-around py-1 px-1"
            style={{
                background:
                    'rgba(12,14,20,0.97)',
                backdropFilter: 'blur(20px)',
                paddingBottom:
                    'max(0.375rem, env(safe-area-inset-bottom))',
            }}
            aria-label="Mobile navigation"
        >
            {items.map((item) => {
                const isActive =
                    activeNavId === item.id;

                const Icon = item.icon;
                const color =
                    item.color ?? '#00e5a0';

                return (
                    <Link
                        key={item.id}
                        href={tabHref(item.id)}
                        prefetch={
                            hasRealPage(item.id)
                                ? undefined
                                : false
                        }
                        className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] relative ${
                            isActive
                                ? ''
                                : 'text-[#5a6478] hover:text-[#8b95a8]'
                        }`}
                        style={
                            isActive
                                ? { color }
                                : undefined
                        }
                        aria-current={
                            isActive
                                ? 'page'
                                : undefined
                        }
                    >
                        <Icon
                            className={`w-5 h-5 ${
                                isActive
                                    ? 'scale-110'
                                    : ''
                            }`}
                        />

                        <span
                            className="text-[10px] font-semibold"
                            style={
                                isActive
                                    ? { color }
                                    : undefined
                            }
                        >
                            {item.label}
                        </span>

                        {item.id ===
                            'advanced-chat' &&
                            unreadNotifs > 0 && (
                                <span className="absolute top-0 right-0.5 min-w-4 h-4 px-0.5 rounded-full bg-[#ff5757] text-[8px] font-bold text-white flex items-center justify-center">
                                    {unreadNotifs > 9
                                        ? '9+'
                                        : unreadNotifs}
                                </span>
                            )}
                    </Link>
                );
            })}

            <button
                onClick={onCustomize}
                className="flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg transition-all min-w-[56px] text-[#5a6478] hover:text-[#8b95a8]"
                aria-label="Customize navigation"
            >
                <MoreHorizontal className="w-5 h-5" />
                <span className="text-[10px] font-semibold">
                    More
                </span>
            </button>
        </nav>
    );
}
