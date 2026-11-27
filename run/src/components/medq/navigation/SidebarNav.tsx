'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import React from 'react';
import {
    CreditCard,
    Crown,
    ShieldCheck,
    Stethoscope,
    X,
} from 'lucide-react';

import { tabHref, hasRealPage } from '@/lib/medq-nav';

import { SIDEBAR_NAV } from './config';
import type { SidebarNavProps } from './types';

/**
 * REAL Next.js routing (user directive 2026-11-04): every sidebar item is a
 * plain <Link href> — no onClick interception, no preventDefault, no
 * onTabSwitch. The App Router performs a genuine client-side navigation:
 * the URL changes, back/forward works, deep links work, the (app) layout
 * (sidebar + header) persists across soft navigations.
 *
 * Tab hrefs (single source of truth: lib/medq-nav.ts → tabHref):
 *   - real-page tabs  → their (app) route (e.g. /bank, /generate)
 *   - SPA-only tabs   → the REAL /?tab=<id> URL — the SPA shell at "/"
 *                      renders that tab and the URL survives refresh
 *
 * The active item is highlighted from the URL (activeTab is derived from
 * usePathname/useSearchParams by the shells) — the URL is the source of
 * truth, not component state.
 *
 * prefetch: real-page links prefetch their route (snappy navigation);
 * SPA /?tab= links skip it — there are ~60 of them in the viewport and each
 * would re-request the heavy root-page RSC payload.
 */

export function SidebarNav({
    activeTab,
    tier,
    isOpen,
    onClose,
}: SidebarNavProps) {
    const { data: session } = useSession();
    const isAdmin = session?.user?.role?.toLowerCase() === 'admin';

    const content = (
        <div className="flex flex-col h-full">
            <Link
                href="/home"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-4 border-b border-white/[0.05] hover:opacity-90 transition-opacity"
            >
                <div className="w-9 h-9 bg-gradient-to-br from-[#00e5a0] to-[#00b87a] rounded-xl flex items-center justify-center shadow-lg shadow-[#00e5a0]/25">
                    <Stethoscope className="w-5 h-5 text-[#0c0e14]" />
                </div>

                <div>
                    <h1
                        className="text-lg font-bold tracking-tight"
                        style={{
                            fontFamily:
                                "'Space Grotesk', sans-serif",
                        }}
                    >
                        Med
                        <span className="text-[#00e5a0]">
                            Q
                        </span>
                    </h1>

                    <p className="text-[9px] text-[#5a6478]">
                        Medical Education Platform
                    </p>
                </div>
            </Link>

            <nav
                aria-label="Main"
                className="flex-1 overflow-y-auto py-2 px-2"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor:
                        'rgba(255,255,255,0.08) transparent',
                }}
            >
                {SIDEBAR_NAV.map(
                    (section, sectionIndex) => (
                        <div
                            key={
                                section.section ||
                                sectionIndex
                            }
                            className={
                                sectionIndex > 0
                                    ? 'mt-3'
                                    : ''
                            }
                        >
                            {section.section && (
                                <div className="px-3 py-1.5 mb-1">
                                    <span className="text-[9px] font-bold text-[#3a4055] uppercase tracking-widest">
                                        {section.section}
                                    </span>
                                </div>
                            )}

                            <div className="space-y-0.5">
                                {section.items.map(
                                    (item) => {
                                        if (
                                            item.adminOnly &&
                                            !isAdmin
                                        ) {
                                            return null;
                                        }

                                        const isActive =
                                            activeTab ===
                                            item.id;

                                        const isLocked =
                                            item.premium &&
                                            tier === 'free';

                                        const itemColor =
                                            item.color ??
                                            (isActive
                                                ? '#00e5a0'
                                                : '#8b95a8');

                                        // Real routing: a plain <Link> that
                                        // the App Router navigates natively.
                                        // SPA-only tabs point at the real
                                        // /?tab=<id> URL.
                                        const href = tabHref(item.id);

                                        return (
                                            <Link
                                                key={item.id}
                                                href={href}
                                                prefetch={
                                                    hasRealPage(item.id)
                                                        ? undefined
                                                        : false
                                                }
                                                onClick={onClose}
                                                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium transition-all ${
                                                    isActive
                                                        ? 'text-[#e8ecf4]'
                                                        : 'text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]'
                                                }`}
                                                style={
                                                    isActive
                                                        ? {
                                                              background:
                                                                  item.color
                                                                      ? `${item.color}12`
                                                                      : 'rgba(0,229,160,0.08)',
                                                              borderColor:
                                                                  item.color
                                                                      ? `${item.color}20`
                                                                      : 'rgba(0,229,160,0.12)',
                                                          }
                                                        : undefined
                                                }
                                                aria-current={
                                                    isActive
                                                        ? 'page'
                                                        : undefined
                                                }
                                            >
                                                <span
                                                    style={{
                                                        color: isActive
                                                            ? itemColor
                                                            : undefined,
                                                    }}
                                                >
                                                    {
                                                        item.icon
                                                    }
                                                </span>

                                                <span className="flex-1 text-left">
                                                    {
                                                        item.label
                                                    }
                                                </span>

                                                {item.badge ===
                                                    'LIVE' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-black bg-[#ff5757]/15 text-[#ff5757] animate-pulse">
                                                        LIVE
                                                    </span>
                                                )}

                                                {item.badge ===
                                                    'New' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#b79bff]/15 text-[#b79bff]">
                                                        New
                                                    </span>
                                                )}

                                                {item.badge ===
                                                    'AI' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#b79bff]/15 text-[#b79bff]">
                                                        AI
                                                    </span>
                                                )}

                                                {isLocked && (
                                                    <Crown className="w-3 h-3 text-[#f59e0b] opacity-60" />
                                                )}
                                            </Link>
                                        );
                                    }
                                )}
                            </div>
                        </div>
                    )
                )}

                <div className="pt-3 border-t border-white/[0.05] space-y-0.5">
                    {tier === 'free' && (
                        <Link
                            href="/pricing"
                            onClick={onClose}
                            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13px] font-bold transition-all hover:scale-[1.02]"
                            style={{
                                background:
                                    'linear-gradient(135deg, #8b5cf615, #f59e0b15)',
                                border: '1px solid rgba(139,92,246,0.2)',
                                color: '#c8d0e0',
                            }}
                        >
                            <Crown className="w-4 h-4 text-[#f59e0b]" />

                            <span className="flex-1 text-left">
                                Upgrade to Premium
                            </span>
                        </Link>
                    )}

                    <Link
                        href="/pricing"
                        onClick={onClose}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]"
                    >
                        <CreditCard className="w-4 h-4" />
                        <span className="flex-1 text-left">
                            Pricing
                        </span>
                    </Link>

                    {isAdmin && (
                        <Link
                            href="/admin"
                            onClick={onClose}
                            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] font-medium text-[#8b95a8] hover:text-[#c8d0e0] hover:bg-white/[0.03]"
                        >
                            <ShieldCheck className="w-4 h-4" />
                            <span className="flex-1 text-left">
                                Admin Panel
                            </span>
                        </Link>
                    )}
                </div>
            </nav>
        </div>
    );

    return (
        <>
            <aside className="hidden lg:flex flex-col w-[240px] flex-shrink-0 border-r border-white/[0.05] h-full overflow-hidden bg-[rgba(12,14,20,0.95)] backdrop-blur-xl">
                {content}
            </aside>

            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    <aside className="relative w-[280px] h-full border-r border-white/[0.05] bg-[#0c0e14] animate-slide-in">
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-3 z-10 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/[0.05]"
                            aria-label="Close menu"
                        >
                            <X className="w-4 h-4 text-[#8b95a8]" />
                        </button>

                        {content}
                    </aside>
                </div>
            )}
        </>
    );
}
