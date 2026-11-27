import React from 'react';

import {
    BOTTOM_NAV_SUBTABS,
    BOTTOM_NAV_STORAGE_KEY,
    DEFAULT_BOTTOM_NAV,
    EXCLUDED_BOTTOM_NAV_ITEMS,
    MAX_BOTTOM_NAV_ITEMS,
    SIDEBAR_NAV,
} from './config';

import type {
    BottomNavDefinition,
    TabConfig,
} from './types';

import type { TabId } from '@/lib/medq-tabid';


function getIconComponent(
    item: TabConfig
): BottomNavDefinition['icon'] {
    const icon = item.icon as React.ReactElement;

    return function DynamicIcon(props) {
        return React.cloneElement(icon, props);
    };
}

export function buildBottomNavDefinitions(): BottomNavDefinition[] {
    const definitions: BottomNavDefinition[] = [];
    const seen = new Set<TabId>();

    for (const section of SIDEBAR_NAV) {
        for (const item of section.items) {
            if (seen.has(item.id)) {
                continue;
            }

            if (EXCLUDED_BOTTOM_NAV_ITEMS.has(item.id)) {
                continue;
            }

            if (item.adminOnly) {
                continue;
            }

            seen.add(item.id);

            definitions.push({
                id: item.id,
                label: item.label,
                icon: getIconComponent(item),
                color: item.color,
                subTabs:
                    BOTTOM_NAV_SUBTABS[item.id] ??
                    [item.id],
            });
        }
    }

    return definitions;
}

export function sanitizeBottomNav(
    value: unknown,
    availableItems: BottomNavDefinition[]
): TabId[] {
    if (!Array.isArray(value)) {
        return [...DEFAULT_BOTTOM_NAV];
    }

    const validIds = new Set(
        availableItems.map((item) => item.id)
    );

    const result: TabId[] = [];

    for (const id of value) {
        if (
            typeof id !== 'string' ||
            !validIds.has(id as TabId)
        ) {
            continue;
        }

        if (result.includes(id as TabId)) {
            continue;
        }

        result.push(id as TabId);

        if (
            result.length >=
            MAX_BOTTOM_NAV_ITEMS
        ) {
            break;
        }
    }

    for (const id of DEFAULT_BOTTOM_NAV) {
        if (
            result.length >=
            MAX_BOTTOM_NAV_ITEMS
        ) {
            break;
        }

        if (!result.includes(id)) {
            result.push(id);
        }
    }

    return result;
}

export function getActiveBottomNavId(
    activeTab: TabId,
    items: BottomNavDefinition[]
): TabId {
    for (const item of items) {
        if (item.subTabs?.includes(activeTab)) {
            return item.id;
        }
    }

    return 'dashboard';
}

export function loadBottomNav(
    availableItems: BottomNavDefinition[]
): TabId[] {
    try {
        const saved = window.localStorage.getItem(
            BOTTOM_NAV_STORAGE_KEY
        );

        if (!saved) {
            return [...DEFAULT_BOTTOM_NAV];
        }

        return sanitizeBottomNav(
            JSON.parse(saved),
            availableItems
        );
    } catch {
        return [...DEFAULT_BOTTOM_NAV];
    }
}

export function saveBottomNav(
    items: TabId[]
): void {
    try {
        window.localStorage.setItem(
            BOTTOM_NAV_STORAGE_KEY,
            JSON.stringify(items)
        );
    } catch {
        // localStorage may be unavailable.
    }
}
