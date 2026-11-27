'use client';

import {
    useMemo,
    useState,
} from 'react';

import {
    GripVertical,
    Minus,
    Plus,
    RotateCcw,
    Search,
    X,
} from 'lucide-react';

import type { TabId } from '@/lib/medq-tabid';

import {
    DEFAULT_BOTTOM_NAV,
    MAX_BOTTOM_NAV_ITEMS,
} from './config';

import {
    buildBottomNavDefinitions,
} from './utils';

interface BottomNavCustomizerProps {
    selectedItems: TabId[];
    onChange: (items: TabId[]) => void;
    onClose: () => void;
}

const AVAILABLE_BOTTOM_NAV_ITEMS =
    buildBottomNavDefinitions();

export function BottomNavCustomizer({
    selectedItems,
    onChange,
    onClose,
}: BottomNavCustomizerProps) {
    const [search, setSearch] = useState('');
    const [draggedId, setDraggedId] =
        useState<TabId | null>(null);

    const selectedDefinitions = useMemo(() => {
        return selectedItems
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
            );
    }, [selectedItems]);

    const availableDefinitions = useMemo(() => {
        const query = search.trim().toLowerCase();

        return AVAILABLE_BOTTOM_NAV_ITEMS.filter(
            (item) => {
                // Don't show items already selected.
                if (selectedItems.includes(item.id)) {
                    return false;
                }

                // No search query = show everything.
                if (!query) {
                    return true;
                }

                return (
                    item.label
                        .toLowerCase()
                        .includes(query) ||
                    String(item.id)
                        .toLowerCase()
                        .includes(query)
                );
            }
        );
    }, [search, selectedItems]);

    const addItem = (id: TabId) => {
        if (
            selectedItems.length >=
            MAX_BOTTOM_NAV_ITEMS
        ) {
            return;
        }

        if (selectedItems.includes(id)) {
            return;
        }

        onChange([
            ...selectedItems,
            id,
        ]);
    };

    const removeItem = (id: TabId) => {
        onChange(
            selectedItems.filter(
                (itemId) => itemId !== id
            )
        );
    };

    const moveItem = (
        sourceId: TabId,
        targetId: TabId
    ) => {
        if (sourceId === targetId) {
            return;
        }

        const next = [...selectedItems];

        const sourceIndex =
            next.indexOf(sourceId);

        const targetIndex =
            next.indexOf(targetId);

        if (
            sourceIndex === -1 ||
            targetIndex === -1
        ) {
            return;
        }

        next.splice(sourceIndex, 1);
        next.splice(targetIndex, 0, sourceId);

        onChange(next);
    };

    const reset = () => {
        onChange([
            ...DEFAULT_BOTTOM_NAV,
        ]);
    };

    return (
        <div
            className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bottom-nav-customizer-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal */}
            <div
                className="relative w-full lg:w-[520px] max-h-[90vh] lg:max-h-[820px] rounded-t-3xl lg:rounded-3xl border border-white/[0.08] shadow-2xl overflow-hidden"
                style={{
                    background:
                        'linear-gradient(180deg, #11151e 0%, #0c0e14 100%)',
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
                    <div>
                        <h2
                            id="bottom-nav-customizer-title"
                            className="text-base font-bold text-[#e8ecf4]"
                        >
                            Customize Navigation
                        </h2>

                        <p className="text-[11px] text-[#5a6478] mt-0.5">
                            Choose and reorder up to{' '}
                            {MAX_BOTTOM_NAV_ITEMS}{' '}
                            shortcuts
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-[#8b95a8] hover:text-white hover:bg-white/[0.06] transition-colors"
                        aria-label="Close customization"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-75px)] lg:max-h-[745px] p-4">
                    {/* Selected */}
                    <section className="mb-6">
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#5a6478]">
                                Your Bottom Navigation
                            </div>

                            <div className="text-[10px] font-semibold text-[#00e5a0]">
                                {selectedItems.length}/
                                {MAX_BOTTOM_NAV_ITEMS}
                            </div>
                        </div>

                        <div className="space-y-2">
                            {selectedDefinitions.map(
                                (
                                    item,
                                    index
                                ) => {
                                    const Icon =
                                        item.icon;

                                    const color =
                                        item.color ||
                                        '#00e5a0';

                                    return (
                                        <div
                                            key={
                                                item.id
                                            }
                                            draggable
                                            onDragStart={() =>
                                                setDraggedId(
                                                    item.id
                                                )
                                            }
                                            onDragEnd={() =>
                                                setDraggedId(
                                                    null
                                                )
                                            }
                                            onDragOver={(
                                                event
                                            ) => {
                                                event.preventDefault();
                                            }}
                                            onDrop={() => {
                                                if (
                                                    draggedId
                                                ) {
                                                    moveItem(
                                                        draggedId,
                                                        item.id
                                                    );
                                                }

                                                setDraggedId(
                                                    null
                                                );
                                            }}
                                            className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-grab active:cursor-grabbing ${
                                                draggedId ===
                                                item.id
                                                    ? 'opacity-40 border-[#00e5a0]/30 bg-[#00e5a0]/5'
                                                    : 'border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.045]'
                                            }`}
                                        >
                                            <GripVertical
                                                className="w-4 h-4 text-[#3f4658] flex-shrink-0"
                                                aria-hidden="true"
                                            />

                                            <div
                                                className="w-9 h-9 rounded-lg flex items-center justify-center"
                                                style={{
                                                    background: `${color}12`,
                                                    color,
                                                }}
                                            >
                                                <Icon className="w-4.5 h-4.5" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="text-[13px] font-semibold text-[#dce2ed] truncate">
                                                    {
                                                        item.label
                                                    }
                                                </div>

                                                <div className="text-[9px] text-[#4f576a]">
                                                    Position{' '}
                                                    {index +
                                                        1}
                                                </div>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeItem(
                                                        item.id
                                                    )
                                                }
                                                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#687186] hover:text-[#ff5757] hover:bg-[#ff5757]/10 transition-colors"
                                                aria-label={`Remove ${item.label}`}
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    );
                                }
                            )}

                            {selectedDefinitions.length ===
                                0 && (
                                <div className="py-8 rounded-xl border border-dashed border-white/[0.08] text-center">
                                    <p className="text-[11px] text-[#4f576a]">
                                        No navigation
                                        shortcuts
                                        selected.
                                    </p>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Available */}
                    <section>
                        <div className="flex items-center justify-between mb-2.5">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-[#5a6478]">
                                Available Navigation
                            </div>

                            <div className="text-[9px] text-[#3f4658]">
                                Drag to reorder
                                above
                            </div>
                        </div>

                        {/* Search */}
                        <div className="relative mb-3">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#4f576a]"
                                aria-hidden="true"
                            />

                            <input
                                type="search"
                                value={search}
                                onChange={(
                                    event
                                ) =>
                                    setSearch(
                                        event
                                            .target
                                            .value
                                    )
                                }
                                placeholder="Search navigation..."
                                aria-label="Search navigation"
                                className="w-full h-10 rounded-xl border border-white/[0.06] bg-white/[0.025] pl-9 pr-3 text-[12px] text-[#dce2ed] placeholder:text-[#4f576a] outline-none focus:border-[#00e5a0]/30 focus:bg-white/[0.04]"
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-1.5">
                            {availableDefinitions.map(
                                (
                                    item
                                ) => {
                                    const Icon =
                                        item.icon;

                                    const disabled =
                                        selectedItems.length >=
                                        MAX_BOTTOM_NAV_ITEMS;

                                    const color =
                                        item.color ||
                                        '#8b95a8';

                                    return (
                                        <button
                                            key={
                                                item.id
                                            }
                                            type="button"
                                            onClick={() =>
                                                addItem(
                                                    item.id
                                                )
                                            }
                                            disabled={
                                                disabled
                                            }
                                            className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left border border-transparent transition-all ${
                                                disabled
                                                    ? 'opacity-40 cursor-not-allowed'
                                                    : 'hover:bg-white/[0.04] hover:border-white/[0.05]'
                                            }`}
                                            aria-label={`Add ${item.label} to bottom navigation`}
                                        >
                                            <div
                                                className="w-8 h-8 rounded-lg flex items-center justify-center"
                                                style={{
                                                    background: `${color}10`,
                                                    color,
                                                }}
                                            >
                                                <Icon className="w-4 h-4" />
                                            </div>

                                            <span className="flex-1 text-[12px] font-medium text-[#8b95a8]">
                                                {
                                                    item.label
                                                }
                                            </span>

                                            <Plus
                                                className="w-4 h-4 text-[#3f4658]"
                                                aria-hidden="true"
                                            />
                                        </button>
                                    );
                                }
                            )}
                        </div>

                        {availableDefinitions.length ===
                            0 && (
                            <div className="py-10 text-center text-[11px] text-[#4f576a]">
                                No navigation
                                items found.
                            </div>
                        )}
                    </section>
                </div>

                {/* Footer */}
                <div className="flex items-center gap-2 px-4 py-3 border-t border-white/[0.06] bg-black/10">
                    <button
                        type="button"
                        onClick={reset}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold text-[#8b95a8] hover:text-[#dce2ed] hover:bg-white/[0.05] transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" />
                        Reset
                    </button>

                    <div className="flex-1" />

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-lg bg-[#00e5a0] text-[#07120f] text-[11px] font-bold hover:bg-[#19edb0] transition-colors"
                    >
                        Done
                    </button>
                </div>
            </div>
        </div>
    );
}
