'use client';

/**
 * MedQ UI State Context — Centralized UI state tracking for the AI Agent.
 *
 * Automatically tracks:
 * - Current page / tab / route
 * - Current module & section
 * - Open dialogs, panels, modals
 * - Active forms, focused controls
 * - Selected entities & rows
 * - Active filters
 * - Workspace layout state
 * - Current user permissions (from AuthProvider + SubscriptionContext)
 *
 * Components register their state via useUIStateRegistration() hook.
 * The AI agent reads the full state snapshot via useUIState().
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { useSubscription } from '@/components/medq/SubscriptionContext';

// ─── Types ────────────────────────────────────────────────────────────

export interface DialogState {
  id: string;
  type: 'modal' | 'drawer' | 'popover' | 'sheet';
  title?: string;
  data?: Record<string, unknown>;
}

export interface FormState {
  id: string;
  name?: string;
  fields: Record<string, {
    value: unknown;
    error?: string;
    touched?: boolean;
  }>;
  isValid?: boolean;
  isDirty?: boolean;
  isSubmitting?: boolean;
}

export interface SelectionState {
  entityType: string;
  ids: string[];
  primaryId?: string;
  label?: string;
}

export interface FilterState {
  id: string;
  key: string;
  value: unknown;
  label?: string;
}

export interface FocusState {
  elementId?: string;
  elementType?: string;
  elementLabel?: string;
  formId?: string;
}

export interface VisualGuidanceState {
  active: boolean;
  targetSelector?: string;
  targetType?: 'highlight' | 'tooltip' | 'tour-step';
  message?: string;
  tourId?: string;
  tourStep?: number;
  tourTotalSteps?: number;
}

export interface UIStateSnapshot {
  // Navigation
  currentPage: string;
  currentModule: string;
  currentRoute: string;
  previousPage?: string;

  // UI State
  openDialogs: DialogState[];
  activePanels: string[];
  activeSections: string[];
  openTabs: string[];

  // Focus & Forms
  focusedControl: FocusState;
  activeForms: FormState[];

  // Selection
  selectedEntities: SelectionState[];
  selectedRows: Record<string, string[]>; // tableId -> rowIds

  // Filters
  activeFilters: FilterState[];

  // Workspace
  workspace: {
    sidebarOpen: boolean;
    sidebarCollapsed: boolean;
    theme: string;
    viewport: { width: number; height: number };
  };

  // Permissions
  permissions: {
    isAuthenticated: boolean;
    role: string;
    tier: string;
    canAccess: Record<string, boolean>;
  };

  // Visual guidance
  guidance: VisualGuidanceState;

  // Timestamp
  capturedAt: number;
}

type UIStateUpdater = (partial: Partial<UIStateSnapshot>) => void;

interface UIStateContextType {
  state: UIStateSnapshot;
  updateState: UIStateUpdater;
  /** Register a component's state — auto-cleans up on unmount */
  registerComponentState: (componentId: string, state: Partial<UIStateSnapshot>) => void;
  unregisterComponentState: (componentId: string) => void;
  /** Get a serialized summary for the LLM system prompt */
  getContextSummary: () => string;
}

// ─── Defaults ─────────────────────────────────────────────────────────

const DEFAULT_STATE: UIStateSnapshot = {
  currentPage: 'dashboard',
  currentModule: 'study',
  currentRoute: '/',
  openDialogs: [],
  activePanels: [],
  activeSections: [],
  openTabs: ['dashboard'],
  focusedControl: {},
  activeForms: [],
  selectedEntities: [],
  selectedRows: {},
  activeFilters: [],
  workspace: {
    sidebarOpen: true,
    sidebarCollapsed: false,
    theme: 'dark',
    viewport: { width: 0, height: 0 },
  },
  permissions: {
    isAuthenticated: false,
    role: 'guest',
    tier: 'free',
    canAccess: {},
  },
  guidance: { active: false },
  capturedAt: Date.now(),
};

// ─── Context ──────────────────────────────────────────────────────────

const UIStateContext = createContext<UIStateContextType>(null!);

export function useUIState() {
  return useContext(UIStateContext);
}

// ─── Component Registration Hook ──────────────────────────────────────

/**
 * Hook for components to register their current state with the UI state context.
 * Automatically cleans up on unmount.
 *
 * @example
 * ```tsx
 * function MyQuestionBankTab({ ... }) {
 *   const [selectedIds, setSelectedIds] = useState<string[]>([]);
 *   const [filters, setFilters] = useState({ subject: 'cardiology' });
 *
 *   useUIStateRegistration('bank', {
 *     selectedEntities: [{ entityType: 'question', ids: selectedIds, label: 'Selected questions' }],
 *     activeFilters: [{ id: 'subject', key: 'subject', value: filters.subject, label: `Subject: ${filters.subject}` }],
 *   });
 *
 *   // ... rest of component
 * }
 * ```
 */
export function useUIStateRegistration(componentId: string, partialState: Partial<UIStateSnapshot>) {
  const { registerComponentState, unregisterComponentState } = useContext(UIStateContext);

  useEffect(() => {
    registerComponentState(componentId, partialState);
    return () => {
      unregisterComponentState(componentId);
    };
  }, [componentId, partialState, registerComponentState, unregisterComponentState]);

  // Re-register when state changes
  useEffect(() => {
    registerComponentState(componentId, partialState);
  }, [componentId, partialState, registerComponentState]);
}

// ─── Provider ─────────────────────────────────────────────────────────

export function UIStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<UIStateSnapshot>(() => ({ ...DEFAULT_STATE, capturedAt: Date.now() }));
  const componentStatesRef = useRef<Map<string, Partial<UIStateSnapshot>>>(new Map());
  useSubscription();

  // Track viewport
  useEffect(() => {
    const updateViewport = () => {
      setState(prev => ({
        ...prev,
        workspace: {
          ...prev.workspace,
          viewport: { width: window.innerWidth, height: window.innerHeight },
        },
        capturedAt: Date.now(),
      }));
    };
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  // Track global focus
  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      const elementId = target.id || target.getAttribute('data-ui-id') || undefined;
      const elementType = target.tagName?.toLowerCase();
      const elementLabel =
        target.getAttribute('aria-label') ||
        target.getAttribute('placeholder') ||
        target.getAttribute('title') ||
        (target as HTMLInputElement).name ||
        undefined;

      // Find parent form
      const form = target.closest('form');
      const formId = form?.id || form?.getAttribute('data-form-id') || undefined;

      setState(prev => ({
        ...prev,
        focusedControl: { elementId, elementType, elementLabel, formId },
        capturedAt: Date.now(),
      }));
    };

    const handleFocusOut = () => {
      // Don't immediately clear — small delay to allow focus switch
      setTimeout(() => {
        if (!document.activeElement || document.activeElement === document.body) {
          setState(prev => ({
            ...prev,
            focusedControl: {},
            capturedAt: Date.now(),
          }));
        }
      }, 100);
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
    };
  }, []);

  // Track open modals/dialogs via DOM observer
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const dialogs: DialogState[] = [];

      // Detect open modals (aria-modal, role="dialog", common dialog patterns)
      document.querySelectorAll('[role="dialog"], [aria-modal="true"], .medq-dialog, .medq-modal').forEach((el, idx) => {
        if ((el as HTMLElement).offsetParent !== null) { // visible
          const id = el.id || el.getAttribute('data-dialog-id') || `dialog-${idx}`;
          const title = el.getAttribute('aria-label') || el.querySelector('h1,h2,h3,[role="heading"]')?.textContent?.trim() || undefined;
          dialogs.push({ id, type: 'modal', title });
        }
      });

      // Detect open drawers/sheets
      document.querySelectorAll('[role="complementary"], .medq-drawer, .medq-sheet').forEach((el, idx) => {
        if ((el as HTMLElement).offsetParent !== null) {
          const id = el.id || el.getAttribute('data-drawer-id') || `drawer-${idx}`;
          const title = el.getAttribute('aria-label') || undefined;
          dialogs.push({ id, type: 'drawer', title });
        }
      });

      setState(prev => {
        // Only update if dialogs changed
        const prevIds = prev.openDialogs.map(d => d.id).sort().join(',');
        const newIds = dialogs.map(d => d.id).sort().join(',');
        if (prevIds === newIds) return prev;
        return { ...prev, openDialogs: dialogs, capturedAt: Date.now() };
      });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['aria-modal', 'role', 'class', 'style'] });
    return () => observer.disconnect();
  }, []);

  const updateState = useCallback((partial: Partial<UIStateSnapshot>) => {
    setState(prev => ({
      ...prev,
      ...partial,
      capturedAt: Date.now(),
    }));
  }, []);

  const registerComponentState = useCallback((componentId: string, partial: Partial<UIStateSnapshot>) => {
    componentStatesRef.current.set(componentId, partial);
    // Merge component states into the main state
    setState(prev => mergeComponentStates(prev, componentStatesRef.current));
  }, []);

  const unregisterComponentState = useCallback((componentId: string) => {
    componentStatesRef.current.delete(componentId);
    setState(() => mergeComponentStates({ ...DEFAULT_STATE, capturedAt: Date.now() }, componentStatesRef.current));
  }, []);

  const getContextSummary = useCallback((): string => {
    const s = state;
    const lines: string[] = [];

    lines.push(`CURRENT CONTEXT:`);
    lines.push(`- Page: ${s.currentPage}`);
    lines.push(`- Module: ${s.currentModule}`);
    if (s.previousPage) lines.push(`- Previous page: ${s.previousPage}`);
    if (s.openDialogs.length > 0) {
      lines.push(`- Open dialogs: ${s.openDialogs.map(d => `${d.type}:${d.id}${d.title ? ` (${d.title})` : ''}`).join(', ')}`);
    }
    if (s.activePanels.length > 0) {
      lines.push(`- Active panels: ${s.activePanels.join(', ')}`);
    }
    if (s.focusedControl.elementId || s.focusedControl.elementLabel) {
      lines.push(`- Focused control: ${s.focusedControl.elementLabel || s.focusedControl.elementId} (${s.focusedControl.elementType || 'unknown'}${s.focusedControl.formId ? `, in form: ${s.focusedControl.formId}` : ''})`);
    }
    if (s.activeForms.length > 0) {
      lines.push(`- Active forms: ${s.activeForms.map(f => `${f.id}${f.name ? ` (${f.name})` : ''} valid=${f.isValid ?? '?'} dirty=${f.isDirty ?? '?'} submitting=${f.isSubmitting ?? '?'}`).join(', ')}`);
    }
    if (s.selectedEntities.length > 0) {
      lines.push(`- Selected entities: ${s.selectedEntities.map(e => `${e.entityType}${e.label ? ` (${e.label})` : ''} [${e.ids.length} items]`).join(', ')}`);
    }
    if (Object.keys(s.selectedRows).length > 0) {
      lines.push(`- Selected rows: ${Object.entries(s.selectedRows).map(([k, v]) => `${k}: ${v.length} rows`).join(', ')}`);
    }
    if (s.activeFilters.length > 0) {
      lines.push(`- Active filters: ${s.activeFilters.map(f => `${f.key}=${JSON.stringify(f.value)}${f.label ? ` (${f.label})` : ''}`).join(', ')}`);
    }
    lines.push(`- User: ${s.permissions.isAuthenticated ? `${s.permissions.role} (tier: ${s.permissions.tier})` : 'not authenticated'}`);
    lines.push(`- Workspace: sidebar=${s.workspace.sidebarOpen ? 'open' : 'closed'}, theme=${s.workspace.theme}, viewport=${s.workspace.viewport.width}x${s.workspace.viewport.height}`);

    if (s.guidance.active) {
      lines.push(`- Visual guidance: active (type=${s.guidance.targetType}, target=${s.guidance.targetSelector}, message=${s.guidance.message})`);
    }

    return lines.join('\n');
  }, [state]);

  const contextValue = useMemo(() => ({
    state,
    updateState,
    registerComponentState,
    unregisterComponentState,
    getContextSummary,
  }), [state, updateState, registerComponentState, unregisterComponentState, getContextSummary]);

  return (
    <UIStateContext.Provider value={contextValue}>
      {children}
    </UIStateContext.Provider>
  );
}

// ─── Merge Helper ─────────────────────────────────────────────────────

function mergeComponentStates(
  base: UIStateSnapshot,
  componentStates: Map<string, Partial<UIStateSnapshot>>
): UIStateSnapshot {
  const merged = { ...base, capturedAt: Date.now() };

  // Merge arrays from component states (dialogs, forms, selections, filters, etc.)
  const allDialogs: DialogState[] = [...base.openDialogs];
  const allForms: FormState[] = [];
  const allSelections: SelectionState[] = [];
  const allFilters: FilterState[] = [];
  const allPanels: string[] = [...base.activePanels];
  const allSections: string[] = [...base.activeSections];
  const allSelectedRows: Record<string, string[]> = { ...base.selectedRows };

  for (const [, partial] of componentStates) {
    if (partial.openDialogs) allDialogs.push(...partial.openDialogs);
    if (partial.activeForms) allForms.push(...partial.activeForms);
    if (partial.selectedEntities) allSelections.push(...partial.selectedEntities);
    if (partial.activeFilters) allFilters.push(...partial.activeFilters);
    if (partial.activePanels) allPanels.push(...partial.activePanels);
    if (partial.activeSections) allSections.push(...partial.activeSections);
    if (partial.selectedRows) Object.assign(allSelectedRows, partial.selectedRows);
    if (partial.currentPage) merged.currentPage = partial.currentPage;
    if (partial.currentModule) merged.currentModule = partial.currentModule;
    if (partial.currentRoute) merged.currentRoute = partial.currentRoute;
    if (partial.previousPage) merged.previousPage = partial.previousPage;
    if (partial.openTabs) merged.openTabs = partial.openTabs;
    if (partial.workspace) merged.workspace = { ...merged.workspace, ...partial.workspace };
    if (partial.guidance) merged.guidance = { ...merged.guidance, ...partial.guidance };
    if (partial.focusedControl && Object.keys(partial.focusedControl).length > 0) {
      merged.focusedControl = partial.focusedControl;
    }
  }

  merged.openDialogs = dedupById(allDialogs);
  merged.activeForms = dedupById(allForms);
  merged.selectedEntities = allSelections;
  merged.activeFilters = dedupById(allFilters);
  merged.activePanels = [...new Set(allPanels)];
  merged.activeSections = [...new Set(allSections)];
  merged.selectedRows = allSelectedRows;

  return merged;
}

function dedupById<T extends { id: string }>(arr: T[]): T[] {
  const seen = new Map<string, T>();
  for (const item of arr) {
    seen.set(item.id, item);
  }
  return Array.from(seen.values());
}
