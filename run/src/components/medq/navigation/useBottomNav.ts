'use client';

import {
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';

import type { TabId } from '@/lib/medq-tabid';

import {
    DEFAULT_BOTTOM_NAV,
    MAX_BOTTOM_NAV_ITEMS,
} from './config';

import {
    buildBottomNavDefinitions,
    loadBottomNav,
    sanitizeBottomNav,
    saveBottomNav,
} from './utils';

const AVAILABLE_BOTTOM_NAV_ITEMS =
    buildBottomNavDefinitions();

export function useBottomNav() {
    const [bottomNavIds, setBottomNavIds] =
        useState<TabId[]>(DEFAULT_BOTTOM_NAV);

    const [customizerOpen, setCustomizerOpen] =
        useState(false);

    useEffect(() => {
        setBottomNavIds(
            loadBottomNav(
                AVAILABLE_BOTTOM_NAV_ITEMS
            )
        );
    }, []);

    useEffect(() => {
        saveBottomNav(bottomNavIds);
    }, [bottomNavIds]);

    const bottomNavItems = useMemo(
        () =>
            bottomNavIds
                .map((id) =>
                    AVAILABLE_BOTTOM_NAV_ITEMS.find(
                        (item) => item.id === id
                    )
                )
                .filter(
                    (
                        item
                    ): item is NonNullable<
                        typeof item
                    > => Boolean(item)
                ),
        [bottomNavIds]
    );

    const setItems = useCallback(
        (items: TabId[]) => {
            setBottomNavIds(
                sanitizeBottomNav(
                    items,
                    AVAILABLE_BOTTOM_NAV_ITEMS
                )
            );
        },
        []
    );

    const reset = useCallback(() => {
        setBottomNavIds(
            [...DEFAULT_BOTTOM_NAV]
        );
    }, []);

    return {
        items: bottomNavItems,
        itemIds: bottomNavIds,
        setItems,
        reset,
        customizerOpen,
        openCustomizer: () =>
            setCustomizerOpen(true),
        closeCustomizer: () =>
            setCustomizerOpen(false),
        maxItems: MAX_BOTTOM_NAV_ITEMS,
    };
}
