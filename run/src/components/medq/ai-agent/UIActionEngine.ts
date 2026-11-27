'use client';

/**
 * MedQ UI Action Engine — Executes agent actions directly on the existing frontend.
 *
 * This module provides a centralized action execution layer that:
 * - Reuses existing components, routing, state, actions, navigation
 * - Never generates another UI — always operates on the existing one
 * - Never bypasses frontend logic (validation, permissions, etc.)
 *
 * Capabilities:
 * - Navigation: Pages, Modules, Records, Reports, Dashboards
 * - UI Control: Dialogs, Tabs, Panels, Sections, Focus, Highlighting, Selection, Scrolling
 * - Forms: Autofill, Validation, Suggestions, Drafts, Submission, Field explanations
 * - CRUD: Create, Edit, Details, Delete preview, Archive, Duplicate, Restore
 * - Visual Guidance: Guided tours, Tooltips, Highlights, Context explanations
 * - Interaction: Existing buttons, Existing actions, Existing menu commands
 */

import { useCallback } from 'react';
import { useUIState } from './UIStateContext';
import { stageGeneratePrefill } from '@/lib/generate-prefill';

// ─── Types ────────────────────────────────────────────────────────────

export type UIAction =
  // Navigation
  | { type: 'navigate'; target: string; subTarget?: string; data?: Record<string, unknown> }
  | { type: 'go_back' }
  | { type: 'navigate_module'; module: string }
  // UI Control
  | { type: 'open_dialog'; dialogId: string; data?: Record<string, unknown> }
  | { type: 'close_dialog'; dialogId?: string }
  | { type: 'switch_tab'; tabId: string }
  | { type: 'toggle_panel'; panelId: string; open?: boolean }
  | { type: 'toggle_section'; sectionId: string; open?: boolean }
  | { type: 'set_focus'; elementId: string; scrollIntoView?: boolean }
  | { type: 'scroll_to'; selector: string; align?: 'top' | 'center' | 'bottom'; smooth?: boolean }
  | { type: 'select_element'; selector: string; multi?: boolean }
  // Forms
  | { type: 'autofill_form'; formId: string; values: Record<string, unknown> }
  | { type: 'validate_form'; formId: string }
  | { type: 'submit_form'; formId: string }
  | { type: 'clear_form'; formId: string }
  | { type: 'explain_field'; elementId: string }
  | { type: 'suggest_field'; elementId: string; suggestions: string[] }
  // CRUD
  | { type: 'create_record'; entity: string; initialValues?: Record<string, unknown> }
  | { type: 'edit_record'; entity: string; id: string }
  | { type: 'view_record'; entity: string; id: string }
  | { type: 'delete_record'; entity: string; id: string; confirm?: boolean }
  | { type: 'archive_record'; entity: string; id: string }
  | { type: 'duplicate_record'; entity: string; id: string }
  | { type: 'restore_record'; entity: string; id: string }
  // Visual Guidance
  | { type: 'highlight_element'; selector: string; duration?: number; color?: string; message?: string }
  | { type: 'clear_highlight' }
  | { type: 'show_tooltip'; selector: string; message: string; position?: 'top' | 'bottom' | 'left' | 'right'; duration?: number }
  | { type: 'start_tour'; tourId: string; steps: TourStep[] }
  | { type: 'next_tour_step' }
  | { type: 'end_tour' }
  | { type: 'explain_context'; selector?: string }
  // Interaction
  | { type: 'click_button'; selector: string }
  | { type: 'trigger_action'; actionId: string; data?: Record<string, unknown> }
  | { type: 'dispatch_event'; eventName: string; detail?: unknown }
  // Legacy (backward compat)
  | { type: 'navigate_to_tab'; params: { tab: string; subAction?: string } }
  | { type: 'search_content'; params: { query: string; category?: string } }
  | { type: 'generate_questions'; params: { topic: string; count?: number; difficulty?: string } }
  | { type: 'start_quiz'; params: { mode: string; topic?: string } }
  | { type: 'look_up_drug'; params: { drugName: string; infoType?: string } }
  | { type: 'create_flashcard'; params: { topic: string; count?: number; style?: string } }
  | { type: 'set_study_timer'; params: { minutes?: number; mode?: string } }
  | { type: 'bookmark_content'; params: { type: string; identifier: string } }
  | { type: 'explain_concept'; params: { concept: string; depth?: string } }
  | { type: 'get_study_plan'; params: { exam: string; daysLeft?: number; focusAreas?: string } }
  | { type: 'review_weak_areas'; params: { subject?: string } }
  | { type: 'answer_medical_question'; params: { answer: string; tipCard?: string } }
  // v4: File Intelligence
  | { type: 'analyze_file'; fileId: string; fileName: string; analysisType?: string; question?: string }
  | { type: 'organize_file'; fileId: string; collection?: string; tags?: string[]; folder?: string }
  // v5: Downloads — trigger a real file download via <a download>. NEVER use
  // 'navigate' for download URLs: '/generated/...' would be misinterpreted by
  // tabToPath() as a tab name and prepended with another '/', producing a
  // protocol-relative '//generated/...' URL that pushState rejects as cross-origin.
  | { type: 'download'; url: string; filename?: string }
  | { type: 'open_url'; url: string; newTab?: boolean };

export interface TourStep {
  selector: string;
  title: string;
  message: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  action?: string; // optional action to perform at this step
}

export interface UIActionResult {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ─── Hook ─────────────────────────────────────────────────────────────

/**
 * useUIActionEngine — Hook that provides an `executeAction` function
 * for the AI agent to directly control the frontend UI.
 *
 * All actions reuse existing frontend mechanisms:
 * - Navigation via custom events (the same events the sidebar uses)
 * - Forms via DOM interaction (sets values, triggers change events)
 * - Dialogs via DOM queries + events
 * - Visual guidance via overlay rendering
 */
type MedqWindow = Window & {
  __medqTourSteps?: TourStep[];
  __medqTourId?: string;
};

export function useUIActionEngine() {
  const { state, updateState } = useUIState();

  const executeAction = useCallback((action: UIAction): UIActionResult => {
    switch (action.type) {
      // ─── Navigation ─────────────────────────────────────────────
      case 'navigate': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: action.target, subTarget: action.subTarget, data: action.data } }));
        return { success: true, message: `Navigated to ${action.target}${action.subTarget ? ` → ${action.subTarget}` : ''}` };
      }
      case 'go_back': {
        window.dispatchEvent(new CustomEvent('medq-agent-go-back'));
        return { success: true, message: 'Navigated back' };
      }
      case 'navigate_module': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate-module', { detail: { module: action.module } }));
        return { success: true, message: `Switched to ${action.module} module` };
      }

      // ─── UI Control ─────────────────────────────────────────────
      case 'open_dialog': {
        window.dispatchEvent(new CustomEvent('medq-agent-open-dialog', { detail: { dialogId: action.dialogId, data: action.data } }));
        return { success: true, message: `Opened dialog: ${action.dialogId}` };
      }
      case 'close_dialog': {
        if (action.dialogId) {
          window.dispatchEvent(new CustomEvent('medq-agent-close-dialog', { detail: { dialogId: action.dialogId } }));
        } else {
          // Close the topmost dialog
          const topDialog = state.openDialogs[state.openDialogs.length - 1];
          if (topDialog) {
            window.dispatchEvent(new CustomEvent('medq-agent-close-dialog', { detail: { dialogId: topDialog.id } }));
          } else {
            // Try pressing Escape
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
          }
        }
        return { success: true, message: action.dialogId ? `Closed dialog: ${action.dialogId}` : 'Closed top dialog' };
      }
      case 'switch_tab': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: action.tabId } }));
        return { success: true, message: `Switched to tab: ${action.tabId}` };
      }
      case 'toggle_panel': {
        window.dispatchEvent(new CustomEvent('medq-agent-toggle-panel', { detail: { panelId: action.panelId, open: action.open } }));
        return { success: true, message: `${action.open !== false ? 'Opened' : 'Closed'} panel: ${action.panelId}` };
      }
      case 'toggle_section': {
        const section = document.querySelector(`[data-section-id="${action.sectionId}"]`) || document.getElementById(action.sectionId);
        if (section) {
          (section as HTMLElement).click();
          return { success: true, message: `Toggled section: ${action.sectionId}` };
        }
        return { success: false, message: `Section not found: ${action.sectionId}` };
      }
      case 'set_focus': {
        const el = document.querySelector(`[data-ui-id="${action.elementId}"]`) || document.getElementById(action.elementId);
        if (el && (el as HTMLElement).focus) {
          (el as HTMLElement).focus();
          if (action.scrollIntoView) {
            (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return { success: true, message: `Focused: ${action.elementId}` };
        }
        return { success: false, message: `Element not found: ${action.elementId}` };
      }
      case 'scroll_to': {
        const target = document.querySelector(action.selector);
        if (target) {
          (target as HTMLElement).scrollIntoView({
            behavior: action.smooth !== false ? 'smooth' : 'auto',
            // Map friendly names to the DOM's logical block positions.
            block: action.align === 'top' ? 'start' : action.align === 'bottom' ? 'end' : 'center',
          });
          return { success: true, message: `Scrolled to: ${action.selector}` };
        }
        return { success: false, message: `Scroll target not found: ${action.selector}` };
      }
      case 'select_element': {
        const selectTarget = document.querySelector(action.selector);
        if (selectTarget) {
          (selectTarget as HTMLElement).click();
          return { success: true, message: `Selected: ${action.selector}` };
        }
        return { success: false, message: `Element not found: ${action.selector}` };
      }

      // ─── Forms ──────────────────────────────────────────────────
      case 'autofill_form': {
        const form = document.querySelector(`[data-form-id="${action.formId}"]`) || document.getElementById(action.formId);
        if (!form) return { success: false, message: `Form not found: ${action.formId}` };

        let filled = 0;
        for (const [fieldName, value] of Object.entries(action.values)) {
          const input = form.querySelector(`[name="${fieldName}"]`) as HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null;
          if (!input) continue;

          const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            input.tagName === 'SELECT' ? HTMLSelectElement.prototype :
            input.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype :
            HTMLInputElement.prototype,
            'value'
          )?.set;

          if (nativeInputValueSetter) {
            nativeInputValueSetter.call(input, String(value));
          } else {
            (input as HTMLInputElement).value = String(value);
          }

          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
          filled++;
        }
        return { success: true, message: `Autofilled ${filled} fields in form ${action.formId}` };
      }
      case 'validate_form': {
        const vForm = document.querySelector(`[data-form-id="${action.formId}"]`) || document.getElementById(action.formId);
        if (!vForm) return { success: false, message: `Form not found: ${action.formId}` };
        // Trigger HTML5 validation
        const isValid = (vForm as HTMLFormElement).reportValidity ? (vForm as HTMLFormElement).reportValidity() : true;
        return { success: true, message: isValid ? 'Form is valid' : 'Form has validation errors', data: { valid: isValid } };
      }
      case 'submit_form': {
        const sForm = document.querySelector(`[data-form-id="${action.formId}"]`) || document.getElementById(action.formId);
        if (!sForm) return { success: false, message: `Form not found: ${action.formId}` };
        // Find submit button or call form.submit
        const submitBtn = sForm.querySelector('[type="submit"]') as HTMLButtonElement | null;
        if (submitBtn) {
          submitBtn.click();
        } else {
          (sForm as HTMLFormElement).requestSubmit();
        }
        return { success: true, message: `Submitted form: ${action.formId}` };
      }
      case 'clear_form': {
        const cForm = document.querySelector(`[data-form-id="${action.formId}"]`) || document.getElementById(action.formId);
        if (!cForm) return { success: false, message: `Form not found: ${action.formId}` };
        (cForm as HTMLFormElement).reset();
        return { success: true, message: `Cleared form: ${action.formId}` };
      }
      case 'explain_field': {
        const field = document.querySelector(`[data-ui-id="${action.elementId}"]`) || document.getElementById(action.elementId);
        const label = field?.getAttribute('aria-label') || field?.getAttribute('placeholder') || '';
        const helpText = field?.getAttribute('title') || field?.closest('.form-group, [class*="field"]')?.querySelector('[class*="help"], [class*="description"]')?.textContent || '';
        return {
          success: true,
          message: `Field info: ${label}${helpText ? `. ${helpText}` : ''}`,
          data: { label, helpText },
        };
      }
      case 'suggest_field': {
        window.dispatchEvent(new CustomEvent('medq-agent-suggest', {
          detail: { elementId: action.elementId, suggestions: action.suggestions },
        }));
        return { success: true, message: `Showing suggestions for ${action.elementId}` };
      }

      // ─── CRUD ──────────────────────────────────────────────────
      case 'create_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'create', entity: action.entity, initialValues: action.initialValues },
        }));
        return { success: true, message: `Opening create form for ${action.entity}` };
      }
      case 'edit_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'edit', entity: action.entity, id: action.id },
        }));
        return { success: true, message: `Opening edit form for ${action.entity} #${action.id}` };
      }
      case 'view_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'view', entity: action.entity, id: action.id },
        }));
        return { success: true, message: `Viewing ${action.entity} #${action.id}` };
      }
      case 'delete_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'delete', entity: action.entity, id: action.id, confirm: action.confirm },
        }));
        return { success: true, message: `Delete ${action.entity} #${action.id}${action.confirm ? ' (confirmed)' : ' (pending confirmation)'}` };
      }
      case 'archive_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'archive', entity: action.entity, id: action.id },
        }));
        return { success: true, message: `Archived ${action.entity} #${action.id}` };
      }
      case 'duplicate_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'duplicate', entity: action.entity, id: action.id },
        }));
        return { success: true, message: `Duplicating ${action.entity} #${action.id}` };
      }
      case 'restore_record': {
        window.dispatchEvent(new CustomEvent('medq-agent-crud', {
          detail: { action: 'restore', entity: action.entity, id: action.id },
        }));
        return { success: true, message: `Restored ${action.entity} #${action.id}` };
      }

      // ─── Visual Guidance ────────────────────────────────────────
      case 'highlight_element': {
        updateState({
          guidance: {
            active: true,
            targetSelector: action.selector,
            targetType: 'highlight',
            message: action.message,
          },
        });
        const hlTarget = document.querySelector(action.selector);
        if (hlTarget) {
          (hlTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        // Auto-clear after duration
        if (action.duration !== 0) {
          setTimeout(() => {
            updateState({ guidance: { active: false } });
          }, action.duration || 3000);
        }
        return { success: true, message: `Highlighting: ${action.selector}` };
      }
      case 'clear_highlight': {
        updateState({ guidance: { active: false } });
        return { success: true, message: 'Cleared highlight' };
      }
      case 'show_tooltip': {
        updateState({
          guidance: {
            active: true,
            targetSelector: action.selector,
            targetType: 'tooltip',
            message: action.message,
          },
        });
        const ttTarget = document.querySelector(action.selector);
        if (ttTarget) {
          (ttTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        setTimeout(() => {
          updateState({ guidance: { active: false } });
        }, action.duration || 4000);
        return { success: true, message: `Tooltip: ${action.message}` };
      }
      case 'start_tour': {
        const win = window as MedqWindow;
        updateState({
          guidance: {
            active: true,
            targetType: 'tour-step',
            tourId: action.tourId,
            tourStep: 0,
            tourTotalSteps: action.steps.length,
            targetSelector: action.steps[0]?.selector,
            message: action.steps[0]?.message,
          },
        });
        // Store tour steps in window for multi-step navigation
        win.__medqTourSteps = action.steps;
        win.__medqTourId = action.tourId;
        return { success: true, message: `Started tour: ${action.tourId} (${action.steps.length} steps)` };
      }
      case 'next_tour_step': {
        const win = window as MedqWindow;
        const steps: TourStep[] = win.__medqTourSteps || [];
        const currentStep: number = state.guidance.tourStep ?? -1;
        const nextStep = currentStep + 1;
        if (nextStep >= steps.length) {
          updateState({ guidance: { active: false } });
          delete win.__medqTourSteps;
          return { success: true, message: 'Tour completed' };
        }
        updateState({
          guidance: {
            active: true,
            targetType: 'tour-step',
            tourId: state.guidance.tourId,
            tourStep: nextStep,
            tourTotalSteps: steps.length,
            targetSelector: steps[nextStep].selector,
            message: steps[nextStep].message,
          },
        });
        const tourTarget = document.querySelector(steps[nextStep].selector);
        if (tourTarget) {
          (tourTarget as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return { success: true, message: `Tour step ${nextStep + 1}/${steps.length}: ${steps[nextStep].title}` };
      }
      case 'end_tour': {
        const win = window as MedqWindow;
        updateState({ guidance: { active: false } });
        delete win.__medqTourSteps;
        return { success: true, message: 'Tour ended' };
      }
      case 'explain_context': {
        const contextEl = action.selector ? document.querySelector(action.selector) : null;
        const contextInfo: string[] = [];

        if (contextEl) {
          const ariaLabel = contextEl.getAttribute('aria-label');
          const title = contextEl.getAttribute('title');
          const role = contextEl.getAttribute('role');
          if (ariaLabel) contextInfo.push(`Label: ${ariaLabel}`);
          if (title) contextInfo.push(`Title: ${title}`);
          if (role) contextInfo.push(`Role: ${role}`);
          const text = contextEl.textContent?.trim().slice(0, 200);
          if (text) contextInfo.push(`Content: ${text}`);
        }

        // Add current state context
        contextInfo.push(`Current page: ${state.currentPage}`);
        contextInfo.push(`Current module: ${state.currentModule}`);

        return {
          success: true,
          message: contextInfo.join('. '),
          data: { context: contextInfo },
        };
      }

      // ─── Interaction ───────────────────────────────────────────
      case 'click_button': {
        const btn = document.querySelector(action.selector) as HTMLElement | null;
        if (btn) {
          btn.click();
          return { success: true, message: `Clicked: ${action.selector}` };
        }
        return { success: false, message: `Button not found: ${action.selector}` };
      }
      case 'trigger_action': {
        window.dispatchEvent(new CustomEvent('medq-agent-action', {
          detail: { actionId: action.actionId, data: action.data },
        }));
        return { success: true, message: `Triggered action: ${action.actionId}` };
      }
      case 'dispatch_event': {
        window.dispatchEvent(new CustomEvent(action.eventName, { detail: action.detail }));
        return { success: true, message: `Dispatched: ${action.eventName}` };
      }

      // ─── Legacy Actions (backward compat) ──────────────────────
      case 'navigate_to_tab': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: action.params.tab, subTarget: action.params.subAction } }));
        return { success: true, message: `Navigated to ${action.params.tab}` };
      }
      case 'search_content': {
        window.dispatchEvent(new CustomEvent('medq-agent-search', { detail: action.params }));
        return { success: true, message: `Searching: ${action.params.query}` };
      }
      case 'generate_questions': {
        // Stash BEFORE the navigation event — the /generate route may take
        // longer than the 500 ms event delay to mount; the page drains the
        // stash on arrival (src/lib/generate-prefill.ts).
        stageGeneratePrefill(action.params);
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'generate' } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-generate-questions', { detail: action.params }));
        }, 500);
        return { success: true, message: `Generating questions on ${action.params.topic}` };
      }
      case 'start_quiz': {
        const modeToTab: Record<string, string> = {
          'speed-quiz': 'speed-quiz', 'daily-challenge': 'challenge', 'qotd': 'qotd',
          'live-battle': 'live-battle', 'flashcard-arena': 'flashcards', 'exam': 'exams',
        };
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: modeToTab[action.params.mode] || 'speed-quiz' } }));
        return { success: true, message: `Starting ${action.params.mode}` };
      }
      case 'look_up_drug': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'drug-interactions' } }));
        window.dispatchEvent(new CustomEvent('medq-agent-drug-lookup', { detail: action.params }));
        return { success: true, message: `Looking up ${action.params.drugName}` };
      }
      case 'create_flashcard': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'flashcards' } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-create-flashcard', { detail: action.params }));
        }, 500);
        return { success: true, message: `Creating flashcards on ${action.params.topic}` };
      }
      case 'set_study_timer': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'study-timer' } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-set-timer', { detail: action.params }));
        }, 500);
        return { success: true, message: `Setting timer: ${action.params.minutes || 25} min` };
      }
      case 'bookmark_content': {
        window.dispatchEvent(new CustomEvent('medq-bookmark', { detail: action.params }));
        return { success: true, message: `Bookmarked: ${action.params.identifier}` };
      }
      case 'explain_concept': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'ai-mode' } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-explain-concept', { detail: action.params }));
        }, 500);
        return { success: true, message: `Explaining ${action.params.concept}` };
      }
      case 'get_study_plan': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'planner' } }));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('medq-study-plan', { detail: action.params }));
        }, 500);
        return { success: true, message: `Creating study plan for ${action.params.exam}` };
      }
      case 'review_weak_areas': {
        window.dispatchEvent(new CustomEvent('medq-agent-navigate', { detail: { tab: 'weak-areas' } }));
        return { success: true, message: 'Navigated to weak areas' };
      }
      case 'answer_medical_question': {
        return { success: true, message: 'Answered question' };
      }

      // v4: File Intelligence Actions
      case 'analyze_file': {
        // Trigger server-side analysis via custom event
        window.dispatchEvent(new CustomEvent('medq-agent-file-analysis', {
          detail: { fileId: action.fileId, fileName: action.fileName, analysisType: action.analysisType || 'full', question: action.question },
        }));
        return { success: true, message: `Analyzing file: ${action.fileName}` };
      }
      case 'organize_file': {
        window.dispatchEvent(new CustomEvent('medq-agent-file-organize', {
          detail: { fileId: action.fileId, collection: action.collection, tags: action.tags, folder: action.folder },
        }));
        return { success: true, message: `Organizing file into ${action.collection || 'auto collection'}` };
      }

      // v5: Real download — never touches the History API, so it cannot cause
      // a cross-origin pushState SecurityError. We create a temporary <a>
      // element with the `download` attribute and click it; the browser then
      // handles the download natively (which works for both same-origin
      // relative URLs like '/generated/...' and absolute URLs).
      case 'download': {
        try {
          const a = document.createElement('a');
          a.href = action.url;
          a.download = action.filename || '';
          // For cross-origin URLs the `download` attribute is ignored, but
          // `target=_blank` + `rel=noopener` still opens the file in a new
          // tab where the browser will either render or download it.
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          // Cleanup after the click is dispatched
          setTimeout(() => {
            try { document.body.removeChild(a); } catch {}
          }, 1000);
          return { success: true, message: `Downloading: ${action.filename || action.url}` };
        } catch (err) {
          return { success: false, message: `Download failed: ${err instanceof Error ? err.message : String(err)}` };
        }
      }
      case 'open_url': {
        try {
          if (action.newTab === false) {
            window.location.href = action.url;
          } else {
            window.open(action.url, '_blank', 'noopener,noreferrer');
          }
          return { success: true, message: `Opened URL: ${action.url}` };
        } catch (err) {
          return { success: false, message: `Failed to open URL: ${err instanceof Error ? err.message : String(err)}` };
        }
      }

      default: {
        // Unreachable for the typed union, but malformed actions from the
        // LLM can still arrive at runtime — report which type slipped through.
        const unknownAction = action as { type?: string } | null | undefined;
        return { success: false, message: `Unknown action type: ${unknownAction?.type ?? 'unknown'}` };
      }
    }
  }, [state, updateState]);

  return { executeAction };
}
