'use client';

import { useCallback, useState, useEffect, useRef, useLayoutEffect } from 'react';
import { createPortal } from 'react-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import { Node, Mark, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewWrapper } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import { TextStyle, Color } from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Subscript as SubscriptIcon,
  Superscript as SuperscriptIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  IndentIncrease,
  IndentDecrease,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  ImageIcon,
  Quote,
  Code,
  Minus,
  Undo2,
  Redo2,
  RemoveFormatting,
  Highlighter,
  Palette,
  Maximize2,
  Minimize2,
  Type,
  ChevronDown,
  MoreHorizontal,
  Pilcrow,
  X,
  Check,
  ExternalLink,
  Table as TableIcon,
  TableCellsMerge,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════
   CUSTOM TIPTAP EXTENSIONS
   ═══════════════════════════════════════════════════════════════ */

/**
 * ColoredMark — Recognizes <span class="q-hl-*"> elements so that
 * insertContent() preserves them instead of stripping unknown spans.
 */
const ColoredMark = Mark.create({
  name: 'coloredMark',

  parseHTML() {
    return [
      { tag: 'span.q-hl' },
      { tag: 'span.q-hl-red' },
      { tag: 'span.q-hl-green' },
      { tag: 'span.q-hl-amber' },
      { tag: 'span.q-hl-purple' },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', mergeAttributes(HTMLAttributes), 0];
  },

  addAttributes() {
    return {
      class: { default: null },
      style: { default: null },
    };
  },
});

/**
 * RawHtmlBlock — An atomic block node that stores raw HTML content
 * and renders it via a React NodeView with dangerouslySetInnerHTML.
 */
function RawHtmlBlockView({ node }: { node: { attrs: { rawHtml: string; className: string } } }) {
  return (
    <NodeViewWrapper as="div">
      <div
        className={node.attrs.className || ''}
        dangerouslySetInnerHTML={{ __html: node.attrs.rawHtml || '' }}
        contentEditable={false}
        style={{ cursor: 'default', userSelect: 'none' }}
      />
    </NodeViewWrapper>
  );
}

const RawHtmlBlock = Node.create({
  name: 'rawHtmlBlock',
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      rawHtml: { default: '' },
      className: { default: '' },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-raw-block]',
        getAttrs: (el: HTMLElement) => ({
          rawHtml: el.getAttribute('data-raw-html') || '',
          className: el.getAttribute('data-class') || '',
        }),
      },
      {
        tag: 'div.q-callout',
        getAttrs: (el: HTMLElement) => ({
          rawHtml: el.innerHTML || '',
          className: el.className || '',
        }),
      },
      {
        tag: 'div.q-flow',
        getAttrs: (el: HTMLElement) => ({
          rawHtml: el.innerHTML || '',
          className: el.className || '',
        }),
      },
      {
        tag: 'div.q-mnemo',
        getAttrs: (el: HTMLElement) => ({
          rawHtml: el.innerHTML || '',
          className: el.className || '',
        }),
      },
      {
        tag: 'div.q-grid',
        getAttrs: (el: HTMLElement) => ({
          rawHtml: el.innerHTML || '',
          className: el.className || '',
        }),
      },
    ];
  },

  renderHTML({ node }) {
    return [
      'div',
      {
        'data-raw-block': '',
        'data-raw-html': node.attrs.rawHtml,
        'data-class': node.attrs.className,
        class: node.attrs.className,
      },
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(RawHtmlBlockView);
  },
});

/**
 * Post-process editor HTML output to convert data-raw-block divs
 * back to their original HTML form for display outside the editor.
 */
function processEditorHtml(html: string): string {
  if (typeof document === 'undefined') return html;
  if (!html.includes('data-raw-block')) return html;

  const div = document.createElement('div');
  div.innerHTML = html;
  div.querySelectorAll('[data-raw-block]').forEach((el) => {
    const rawHtml = el.getAttribute('data-raw-html') || '';
    const className = el.getAttribute('data-class') || '';
    const newDiv = document.createElement('div');
    newDiv.className = className;
    newDiv.innerHTML = rawHtml;
    el.replaceWith(newDiv);
  });
  return div.innerHTML;
}

/* ═══════════════════════════════════════════════════════════════
   QUICK-INSERT BUTTON DEFINITIONS
   ═══════════════════════════════════════════════════════════════ */
interface QuickInsertButton {
  label: string;
  emoji: string;
  color: string;
  bgHover: string;
  borderColor: string;
  kind: 'inline' | 'block';
  className?: string;
  insert: (selectedText: string) => string;
}

const QUICK_INSERT_BUTTONS: QuickInsertButton[] = [
  {
    label: 'Highlight',
    emoji: '🟢',
    color: 'text-[#00e5a0]',
    bgHover: 'hover:bg-[#00e5a0]/10',
    borderColor: 'border-[#00e5a0]/20',
    kind: 'inline',
    className: 'q-hl',
    insert: (t) => `<span class="q-hl">${t || 'highlighted text'}</span>`,
  },
  {
    label: 'Pathology',
    emoji: '🔴',
    color: 'text-[#ff5757]',
    bgHover: 'hover:bg-[#ff5757]/10',
    borderColor: 'border-[#ff5757]/20',
    kind: 'inline',
    className: 'q-hl-red',
    insert: (t) => `<span class="q-hl-red">${t || 'pathology text'}</span>`,
  },
  {
    label: 'Caution',
    emoji: '🟡',
    color: 'text-[#ffb347]',
    bgHover: 'hover:bg-[#ffb347]/10',
    borderColor: 'border-[#ffb347]/20',
    kind: 'inline',
    className: 'q-hl-amber',
    insert: (t) => `<span class="q-hl-amber">${t || 'caution text'}</span>`,
  },
  {
    label: 'Classify',
    emoji: '🟣',
    color: 'text-[#b388ff]',
    bgHover: 'hover:bg-[#b388ff]/10',
    borderColor: 'border-[#b388ff]/20',
    kind: 'inline',
    className: 'q-hl-purple',
    insert: (t) => `<span class="q-hl-purple">${t || 'classify text'}</span>`,
  },
  {
    label: 'Callout',
    emoji: '💡',
    color: 'text-[#4fc3f7]',
    bgHover: 'hover:bg-[#4fc3f7]/10',
    borderColor: 'border-[#4fc3f7]/20',
    kind: 'block',
    className: 'q-callout q-callout-blue',
    insert: (t) => `💡 <strong>Title:</strong> ${t || 'Content'}`,
  },
  {
    label: 'Flow',
    emoji: '➡️',
    color: 'text-[#8b95a8]',
    bgHover: 'hover:bg-white/5',
    borderColor: 'border-white/10',
    kind: 'block',
    className: 'q-flow',
    insert: (t) =>
      `<span class="q-node q-node-red">Step 1</span><span class="q-arrow">→</span><span class="q-node q-node-green">Step 2</span>`,
  },
  {
    label: 'Mnemonic',
    emoji: '🧠',
    color: 'text-[#ff5757]',
    bgHover: 'hover:bg-[#ff5757]/10',
    borderColor: 'border-[#ff5757]/20',
    kind: 'block',
    className: 'q-mnemo',
    insert: (t) =>
      `<div><div class="q-letter" style="background:linear-gradient(135deg,#ef4444,#dc2626)">L</div><div class="q-letter-text">Letter meaning</div></div>`,
  },
  {
    label: 'Pearl',
    emoji: '💎',
    color: 'text-[#ffb347]',
    bgHover: 'hover:bg-[#ffb347]/10',
    borderColor: 'border-[#ffb347]/20',
    kind: 'block',
    className: 'q-callout q-callout-amber',
    insert: (t) => `💎 <strong>Clinical Pearl:</strong> ${t || 'Content'}`,
  },
  {
    label: 'Cards',
    emoji: '📋',
    color: 'text-[#22c55e]',
    bgHover: 'hover:bg-[#22c55e]/10',
    borderColor: 'border-[#22c55e]/20',
    kind: 'block',
    className: 'q-grid q-grid-2',
    insert: (t) =>
      `<div class="q-card q-card-correct">✅ Correct</div><div class="q-card q-card-red">❌ Wrong</div>`,
  },
];

/* ═══════════════════════════════════════════════════════════════
   PRESET COLORS
   ═══════════════════════════════════════════════════════════════ */
const TEXT_COLORS = [
  '#e8ecf4', '#00e5a0', '#ff5757', '#ffb347', '#4fc3f7',
  '#b388ff', '#22c55e', '#f472b6', '#8b95a8', '#ffffff',
];

const HIGHLIGHT_COLORS = [
  '#00e5a0', '#ff5757', '#ffb347', '#4fc3f7', '#b388ff',
  '#22c55e', '#f472b6', '#fef08a', '#e8ecf4',
];

/* ═══════════════════════════════════════════════════════════════
   TOOLBAR BUTTON HELPER
   ═══════════════════════════════════════════════════════════════ */
interface ToolbarBtnProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

function ToolbarBtn({ onClick, isActive, disabled, title, children, size = 'md' }: ToolbarBtnProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`
        ${size === 'sm' ? 'p-1' : 'p-1.5'} rounded-lg transition-all duration-150 flex items-center justify-center flex-shrink-0
        ${isActive
          ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
          : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }
        ${disabled ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      {children}
    </button>
  );
}

function ToolbarDivider() {
  return <div className="w-px h-5 bg-white/[0.08] mx-0.5 flex-shrink-0" />;
}

/* ═══════════════════════════════════════════════════════════════
   DROPDOWN ITEM HELPER (for use inside DropdownPanel)
   ═══════════════════════════════════════════════════════════════ */
interface DropdownItemProps {
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
  shortcut?: string;
}

function DropdownItem({ onClick, isActive, children, shortcut }: DropdownItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors ${
        isActive
          ? 'bg-[#00e5a0]/10 text-[#00e5a0]'
          : 'text-[#c8d0e0] hover:bg-white/[0.06] hover:text-[#e8ecf4]'
      }`}
    >
      <span className="flex-1 flex items-center gap-2">{children}</span>
      {shortcut && (
        <span className="text-[10px] text-[#4a5068] ml-auto font-mono">{shortcut}</span>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════════════════════════
   DROPDOWN PANEL — Rendered via createPortal to document.body
   with position:fixed so it escapes any overflow clipping.
   Tracks the trigger button position on scroll/resize.
   ═══════════════════════════════════════════════════════════════ */
interface DropdownPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
  align?: 'left' | 'right';
  panelMinWidth?: number;
}

function DropdownPanel({
  isOpen,
  onClose,
  triggerRef,
  children,
  align = 'left',
  panelMinWidth = 160,
}: DropdownPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });

  // Use refs for stable scroll handler — avoids React re-render delays during scroll
  const isOpenRef = useRef(isOpen);
  const alignRef = useRef(align);
  const panelMinWidthRef = useRef(panelMinWidth);

  // Keep refs in sync with props (inside effect to satisfy react-hooks/refs rule)
  useEffect(() => {
    isOpenRef.current = isOpen;
    alignRef.current = align;
    panelMinWidthRef.current = panelMinWidth;
  });

  // Synchronous DOM-only position update — no React state, no re-renders
  const updatePosition = useCallback(() => {
    if (!isOpenRef.current || !triggerRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const y = triggerRect.bottom + 4;
    let x = alignRef.current === 'right'
      ? triggerRect.right - panelMinWidthRef.current
      : triggerRect.left;

    // Clamp to viewport
    if (x + panelMinWidthRef.current > window.innerWidth - 8) {
      x = window.innerWidth - panelMinWidthRef.current - 8;
    }
    if (x < 8) x = 8;

    posRef.current = { x, y };
    if (panelRef.current) {
      panelRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [triggerRef]);

  useLayoutEffect(() => {
    updatePosition();
  }, [isOpen, updatePosition]);

  // Track scroll and resize — handler is stable (ref-based), no delay
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;

    function handleClick(e: MouseEvent | TouchEvent) {
      if (panelRef.current && panelRef.current.contains(e.target as Node)) return;
      if (triggerRef.current && triggerRef.current.contains(e.target as Node)) return;
      onClose();
    }

    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
      document.addEventListener('touchstart', handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [isOpen, onClose, triggerRef]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={panelRef}
      data-dropdown-panel
      className="py-1.5 bg-[#1a1e2b] border border-white/[0.1] rounded-xl shadow-2xl overflow-y-auto min-w-[160px] animate-in fade-in slide-in-from-top-1 duration-150"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: 'translate(0px, 0px)',
        zIndex: 9999,
        maxHeight: '280px',
        WebkitOverflowScrolling: 'touch',
        minWidth: `${panelMinWidth}px`,
      }}
    >
      {children}
    </div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════
   COLOR PICKER — Rendered via createPortal to document.body
   with position:fixed so it escapes any overflow clipping.
   Tracks the trigger button position on scroll/resize.
   ═══════════════════════════════════════════════════════════════ */
interface ColorPickerProps {
  isOpen: boolean;
  onClose: () => void;
  colors: string[];
  isHighlight?: boolean;
  onSelect: (color: string) => void;
  onReset: () => void;
  resetLabel: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

function ColorPicker({ isOpen, onClose, colors, isHighlight, onSelect, onReset, resetLabel, triggerRef }: ColorPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const pickerWidth = 210;

  // Use refs for stable scroll handler — avoids React re-render delays during scroll
  const isOpenRef = useRef(isOpen);

  // Keep ref in sync with prop (inside effect to satisfy react-hooks/refs rule)
  useEffect(() => {
    isOpenRef.current = isOpen;
  });

  // Synchronous DOM-only position update — no React state, no re-renders
  const updatePosition = useCallback(() => {
    if (!isOpenRef.current || !triggerRef?.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const y = triggerRect.bottom + 8;
    let x = triggerRect.left + triggerRect.width / 2 - pickerWidth / 2;

    if (x < 8) x = 8;
    if (x + pickerWidth > window.innerWidth - 8) {
      x = window.innerWidth - pickerWidth - 8;
    }

    posRef.current = { x, y };
    if (pickerRef.current) {
      pickerRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  }, [triggerRef]);

  useLayoutEffect(() => {
    updatePosition();
  }, [isOpen, updatePosition]);

  // Track scroll and resize — handler is stable (ref-based), no delay
  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen, updatePosition]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && pickerRef.current.contains(e.target as Node)) return;
      if (triggerRef?.current && triggerRef.current.contains(e.target as Node)) return;
      onClose();
    }
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, triggerRef]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={pickerRef}
      data-dropdown-panel
      className="p-3 bg-[#1a1e2b] border border-white/[0.12] rounded-xl shadow-2xl animate-in fade-in slide-in-from-top-1 duration-150"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: 'translate(0px, 0px)',
        zIndex: 9999,
      }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => {
              onSelect(color);
              onClose();
            }}
            className="w-8 h-8 rounded-lg border border-white/[0.12] hover:scale-110 transition-transform cursor-pointer hover:border-white/[0.3]"
            style={{ backgroundColor: isHighlight ? color + '40' : color }}
            title={color}
          />
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          onReset();
          onClose();
        }}
        className="w-full mt-2 text-[11px] text-[#8b95a8] hover:text-[#e8ecf4] px-2 py-1.5 rounded-lg hover:bg-white/[0.06] transition-colors cursor-pointer"
      >
        {resetLabel}
      </button>
    </div>,
    document.body
  );
}

/* ═══════════════════════════════════════════════════════════════
   FLOATING SELECTION TOOLBAR — Rendered as a direct child of the
   editor wrapper using position:absolute (no portal, no position:fixed).
   Tracks the selection position relative to the editor wrapper
   and updates on scroll within the editor content area.
   ═══════════════════════════════════════════════════════════════ */
interface FloatingToolbarProps {
  editor: ReturnType<typeof useEditor>;
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

function FloatingSelectionToolbar({ editor, wrapperRef }: FloatingToolbarProps) {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!editor) return;

    const updatePosition = () => {
      const { from, to } = editor.state.selection;
      if (from === to) {
        setVisible(false);
        return;
      }

      // Check if selection has text
      const text = editor.state.doc.textBetween(from, to, '');
      if (!text.trim()) {
        setVisible(false);
        return;
      }

      // We need the wrapper to position relative to it
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      // Get selection coordinates (viewport-relative)
      const coords = editor.view.coordsAtPos(from);
      const wrapperRect = wrapper.getBoundingClientRect();

      // Convert viewport coords to wrapper-relative coords
      let left = coords.left - wrapperRect.left - 30;

      // Clamp to wrapper bounds
      const estimatedWidth = 220;
      if (left + estimatedWidth > wrapperRect.width - 10) {
        left = wrapperRect.width - estimatedWidth - 10;
      }
      if (left < 10) left = 10;

      // Position above the selection
      const toolbarHeight = 44;
      const isMobile = window.innerWidth < 768;
      const topOffset = isMobile ? toolbarHeight + 16 : 52;
      let top = coords.top - wrapperRect.top - topOffset;

      // If toolbar would go above the wrapper, place below selection instead
      if (top < 4) {
        const endCoords = editor.view.coordsAtPos(to);
        top = endCoords.bottom - wrapperRect.top + 8;
      }

      // Check if the selection is even visible within the wrapper
      const contentArea = wrapper.querySelector('.medq-editor-content');
      if (contentArea) {
        const contentRect = contentArea.getBoundingClientRect();
        // If selection is above or below the visible content area, hide
        if (coords.top < contentRect.top - 10 || coords.top > contentRect.bottom + 10) {
          setVisible(false);
          return;
        }
      }

      setPosition({ top, left });
      setVisible(true);
    };

    // Listen for Tiptap selection updates
    editor.on('selectionUpdate', updatePosition);

    // Track native selection changes (for mobile touch selection)
    const handleSelectionChange = () => {
      if (!editor.view.hasFocus()) return;
      updatePosition();
    };
    document.addEventListener('selectionchange', handleSelectionChange);

    // Update on scroll — capture phase catches scrolls in nested scrollable containers
    const handleScroll = () => {
      requestAnimationFrame(updatePosition);
    };
    window.addEventListener('scroll', handleScroll, true);

    // Also listen for scroll on the editor content area specifically
    let contentArea: Element | null = null;
    const setupContentScrollListener = () => {
      contentArea = wrapperRef.current?.querySelector('.medq-editor-content') || null;
      if (contentArea) {
        contentArea.addEventListener('scroll', handleScroll);
      }
    };
    setupContentScrollListener();

    // Delayed blur handling — on mobile, blur fires before toolbar tap registers
    let blurTimeout: ReturnType<typeof setTimeout>;
    const handleBlur = () => {
      blurTimeout = setTimeout(() => setVisible(false), 200);
    };
    const handleFocus = () => {
      clearTimeout(blurTimeout);
    };
    editor.on('blur', handleBlur);
    editor.on('focus', handleFocus);

    return () => {
      editor.off('selectionUpdate', updatePosition);
      editor.off('blur', handleBlur);
      editor.off('focus', handleFocus);
      document.removeEventListener('selectionchange', handleSelectionChange);
      window.removeEventListener('scroll', handleScroll, true);
      if (contentArea) {
        contentArea.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(blurTimeout);
    };
  }, [editor, wrapperRef]);

  if (!visible) return null;

  return (
    <div
      ref={toolbarRef}
      className="absolute z-[60] flex items-center gap-0.5 p-1.5 bg-[#1a1e2b]/95 backdrop-blur-sm border border-white/[0.12] rounded-xl shadow-2xl animate-in fade-in duration-100"
      style={{ top: position.top, left: position.left }}
      onMouseDown={(e) => e.preventDefault()}
      onTouchStart={(e) => e.preventDefault()}
    >
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          editor.isActive('bold')
            ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
            : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }`}
        title="Bold"
      >
        <Bold className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          editor.isActive('italic')
            ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
            : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }`}
        title="Italic"
      >
        <Italic className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          editor.isActive('underline')
            ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
            : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }`}
        title="Underline"
      >
        <UnderlineIcon className="w-3.5 h-3.5" />
      </button>
      <div className="w-px h-4 bg-white/[0.08] mx-0.5" />
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleHighlight({ color: '#00e5a0' }).run()}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          editor.isActive('highlight')
            ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
            : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }`}
        title="Highlight"
      >
        <Highlighter className="w-3.5 h-3.5" />
      </button>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-1.5 rounded-lg transition-all cursor-pointer ${
          editor.isActive('strike')
            ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
            : 'text-[#8b95a8] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
        }`}
        title="Strikethrough"
      >
        <Strikethrough className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   INLINE DIALOG — Replaces window.prompt for link/image insertion.
   Rendered as a direct child of the editor wrapper, so it
   positions correctly and scrolls naturally with the editor.
   ═══════════════════════════════════════════════════════════════ */
interface InlineDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  placeholder: string;
  initialValue?: string;
  onConfirm: (value: string) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

function InlineDialog({ isOpen, onClose, title, placeholder, initialValue = '', onConfirm, containerRef }: InlineDialogProps) {
  // When isOpen changes from false→true the parent remounts this component
  // (because it returns null when !isOpen), so useState initializes correctly.
  const [value, setValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Focus the input after a short delay for animation
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return;
    function handleClick(e: MouseEvent) {
      const panel = containerRef?.current?.querySelector('[data-inline-dialog]');
      if (panel && panel.contains(e.target as Node)) return;
      onClose();
    }
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handleClick);
    }, 100);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [isOpen, onClose, containerRef]);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (value.trim()) {
      onConfirm(value.trim());
    }
    onClose();
  };

  return (
    <div
      data-inline-dialog
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-[320px] max-w-[90%] bg-[#1a1e2b] border border-white/[0.12] rounded-xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-150"
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-semibold text-[#e8ecf4]">{title}</h4>
        <button
          type="button"
          onClick={onClose}
          className="p-1 rounded-lg text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <ExternalLink className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#4a5068]" />
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleConfirm();
            }}
            placeholder={placeholder}
            className="w-full bg-[#0c0e14] border border-white/[0.08] rounded-lg px-3 py-2 pl-8 text-sm text-[#e8ecf4] placeholder-[#3a4055] outline-none focus:border-[#00e5a0]/40 focus:ring-1 focus:ring-[#00e5a0]/20 transition-all"
          />
        </div>
        <button
          type="button"
          onClick={handleConfirm}
          disabled={!value.trim()}
          className="px-3 py-2 bg-[#00e5a0]/15 text-[#00e5a0] rounded-lg text-sm font-semibold hover:bg-[#00e5a0]/25 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  minHeight?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Start typing... Use the toolbar above to format text.',
  minHeight = '100px',
  className = '',
}: RichTextEditorProps) {
  const [sourceMode, setSourceMode] = useState(false);
  const [sourceValue, setSourceValue] = useState(value);
  const [fullscreen, setFullscreen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);
  const [showHeadingMenu, setShowHeadingMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);

  // Ref to the editor wrapper — used for absolute positioning of dropdowns & floating toolbar
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Refs for all trigger buttons that open dropdown panels
  const headingTriggerRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const colorPickerTriggerRef = useRef<HTMLButtonElement>(null);
  const highlightPickerTriggerRef = useRef<HTMLButtonElement>(null);

  // Track whether the current change originated from the editor itself
  const isEditorUpdate = useRef(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        codeBlock: { HTMLAttributes: { class: 'ql-syntax' } },
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Subscript,
      Superscript,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'editor-link' },
      }),
      Image.configure({
        HTMLAttributes: { class: 'editor-image' },
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
        HTMLAttributes: { class: 'q-hl' },
      }),
      Placeholder.configure({
        placeholder,
      }),
      CharacterCount,
      ColoredMark,
      RawHtmlBlock,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'medq-editor-table',
        },
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value || '',
    editorProps: {
      attributes: {
        class: 'medq-tiptap-editor',
      },
    },
    onUpdate: ({ editor: ed }) => {
      isEditorUpdate.current = true;
      const html = ed.getHTML();
      const text = ed.getText();
      const processedHtml = processEditorHtml(html);
      if (!text.trim() && !html.includes('<img') && !html.includes('<div')) {
        onChange('');
      } else {
        onChange(processedHtml);
      }
    },
    immediatelyRender: false,
  });

  // Sync external value changes to editor
  const isInternalUpdate = useRef(false);
  useEffect(() => {
    if (!editor) return;
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    if (isEditorUpdate.current) {
      isEditorUpdate.current = false;
      return;
    }
    const currentHTML = editor.getHTML();
    const normalizedCurrent = currentHTML === '<p></p>' ? '' : currentHTML;
    const normalizedValue = value || '';
    if (normalizedValue !== normalizedCurrent) {
      editor.commands.setContent(normalizedValue || '<p></p>');
    }
  }, [value, editor]);

  /* ─── Close all menus ─── */
  const closeAllMenus = useCallback(() => {
    setShowHeadingMenu(false);
    setShowMoreMenu(false);
    setShowColorPicker(false);
    setShowHighlightPicker(false);
  }, []);

  // Ctrl+K shortcut for link dialog
  useEffect(() => {
    if (!editor || sourceMode) return;
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        closeAllMenus();
        setShowLinkDialog(true);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editor, sourceMode, closeAllMenus]);

  // Global Escape handler to close any open dropdown
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeAllMenus]);

  /* ─── Handle quick-insert button click ─── */
  const handleQuickInsert = useCallback(
    (btn: QuickInsertButton) => {
      if (!editor) return;
      const { from, to } = editor.state.selection;
      const selectedText = editor.state.doc.textBetween(from, to, '');

      if (btn.kind === 'inline') {
        const text = selectedText || btn.insert('').replace(/<[^>]*>/g, '');
        const cssClass = btn.className || '';

        if (selectedText) {
          editor.chain().focus()
            .deleteSelection()
            .insertContent({
              type: 'text',
              text,
              marks: cssClass ? [{ type: 'coloredMark', attrs: { class: cssClass } }] : [],
            })
            .run();
        } else {
          editor.chain().focus()
            .insertContent({
              type: 'text',
              text,
              marks: cssClass ? [{ type: 'coloredMark', attrs: { class: cssClass } }] : [],
            })
            .run();
        }
      } else {
        const innerHtml = btn.insert(selectedText);
        editor.commands.insertContent({
          type: 'rawHtmlBlock',
          attrs: {
            rawHtml: innerHtml,
            className: btn.className || '',
          },
        });
        editor.commands.insertContent('<p></p>');
      }
    },
    [editor],
  );

  /* ─── Toggle source mode ─── */
  const handleToggleSource = useCallback(() => {
    if (!sourceMode) {
      setSourceValue(editor ? editor.getHTML() : value);
      setSourceMode(true);
    } else {
      if (editor) {
        isInternalUpdate.current = true;
        editor.commands.setContent(sourceValue);
        onChange(sourceValue);
      }
      setSourceMode(false);
    }
  }, [sourceMode, editor, value, sourceValue, onChange]);

  /* ─── Handle link insertion via dialog ─── */
  const handleLinkConfirm = useCallback((url: string) => {
    if (!editor) return;
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }
    // Ensure URL has a protocol
    let href = url;
    if (!/^https?:\/\//i.test(href) && !/^mailto:/i.test(href) && !/^tel:/i.test(href)) {
      href = 'https://' + href;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href }).run();
  }, [editor]);

  /* ─── Handle image insertion via dialog ─── */
  const handleImageConfirm = useCallback((url: string) => {
    if (!editor) return;
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  /* ─── Fullscreen toggle ─── */
  const toggleFullscreen = useCallback(() => {
    setFullscreen((prev) => !prev);
  }, []);

  /* ─── Open a single dropdown, closing all others ─── */
  const openMenu = useCallback((setter: React.Dispatch<React.SetStateAction<boolean>>) => {
    closeAllMenus();
    setter(true);
  }, [closeAllMenus]);

  if (!editor) {
    return (
      <div className={`medq-editor-wrapper rounded-xl border border-white/[0.08] bg-[#1a1e2b] ${className}`}>
        <div className="w-full h-28 animate-pulse flex items-center justify-center">
          <span className="text-[#3a4055] text-sm">Loading editor...</span>
        </div>
      </div>
    );
  }

  const charCount = editor.storage.characterCount;
  const characters = charCount ? charCount.characters() : 0;
  const words = charCount ? charCount.words() : 0;

  // Determine current heading level for display
  const currentHeading = editor.isActive('heading', { level: 1 }) ? 'H1'
    : editor.isActive('heading', { level: 2 }) ? 'H2'
    : editor.isActive('heading', { level: 3 }) ? 'H3'
    : 'P';

  // Get initial link URL for the dialog
  const currentLinkUrl = editor.getAttributes('link').href || '';

  return (
    <div
      ref={wrapperRef}
      className={`medq-editor-wrapper rounded-xl border border-white/[0.08] bg-[#1a1e2b] flex flex-col relative ${
        fullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''
      } ${className}`}
    >
      {/* ═══════════════════════════════════════════════════════
          TOOLBAR — Contains only trigger buttons.
          The toolbar has overflow-x-auto for horizontal scrolling
          on mobile, but NO dropdown panels are rendered inside it.
          All panels are rendered as siblings at the wrapper level.
          ═══════════════════════════════════════════════════════ */}
      {!sourceMode && (
        <div className="medq-toolbar border-b border-white/[0.06] bg-[#1a1e2b] flex-shrink-0">
          <div className="medq-toolbar-inner flex items-center gap-0.5 px-2 py-1.5 overflow-x-auto scrollbar-thin">
            {/* Undo / Redo */}
            <ToolbarBtn
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              title="Undo (Ctrl+Z)"
            >
              <Undo2 className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo2 className="w-4 h-4" />
            </ToolbarBtn>

            <ToolbarDivider />

            {/* Text Formatting */}
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive('bold')}
              title="Bold (Ctrl+B)"
            >
              <Bold className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive('italic')}
              title="Italic (Ctrl+I)"
            >
              <Italic className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              isActive={editor.isActive('underline')}
              title="Underline (Ctrl+U)"
            >
              <UnderlineIcon className="w-4 h-4" />
            </ToolbarBtn>

            <ToolbarDivider />

            {/* Heading Dropdown Trigger — plain button, panel is at wrapper level */}
            <button
              ref={headingTriggerRef}
              type="button"
              onClick={() => {
                if (showHeadingMenu) {
                  setShowHeadingMenu(false);
                } else {
                  openMenu(setShowHeadingMenu);
                }
              }}
              className={`p-1.5 rounded-lg transition-all duration-150 flex items-center gap-1 cursor-pointer flex-shrink-0 ${
                editor.isActive('heading') || showHeadingMenu
                  ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
                  : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
              }`}
              title="Headings"
            >
              <span className="text-[11px] font-bold leading-none">{currentHeading}</span>
              <ChevronDown className="w-3 h-3 opacity-60" />
            </button>

            <ToolbarDivider />

            {/* Lists */}
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive('bulletList')}
              title="Bullet List"
            >
              <List className="w-4 h-4" />
            </ToolbarBtn>
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive('orderedList')}
              title="Ordered List"
            >
              <ListOrdered className="w-4 h-4" />
            </ToolbarBtn>

            <ToolbarDivider />

            {/* Text Color picker trigger */}
            <button
              ref={colorPickerTriggerRef}
              type="button"
              onClick={() => {
                if (showColorPicker) {
                  setShowColorPicker(false);
                } else {
                  openMenu(setShowColorPicker);
                }
              }}
              title="Text Color"
              className={`p-1 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                showColorPicker
                  ? 'bg-[#4fc3f7]/15 text-[#4fc3f7]'
                  : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
              }`}
            >
              <Palette className="w-4 h-4" />
            </button>

            {/* Highlight picker trigger */}
            <button
              ref={highlightPickerTriggerRef}
              type="button"
              onClick={() => {
                if (showHighlightPicker) {
                  setShowHighlightPicker(false);
                } else {
                  openMenu(setShowHighlightPicker);
                }
              }}
              title="Highlight Color"
              className={`p-1 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                showHighlightPicker
                  ? 'bg-[#ffb347]/15 text-[#ffb347]'
                  : editor.isActive('highlight')
                    ? 'bg-[#00e5a0]/15 text-[#00e5a0]'
                    : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
              }`}
            >
              <Highlighter className="w-4 h-4" />
            </button>

            <ToolbarDivider />

            {/* Strikethrough */}
            <ToolbarBtn
              onClick={() => editor.chain().focus().toggleStrike().run()}
              isActive={editor.isActive('strike')}
              title="Strikethrough"
            >
              <Strikethrough className="w-4 h-4" />
            </ToolbarBtn>

            {/* Link */}
            <ToolbarBtn
              onClick={() => { closeAllMenus(); setShowLinkDialog(true); }}
              isActive={editor.isActive('link')}
              title="Insert Link (Ctrl+K)"
            >
              <LinkIcon className="w-4 h-4" />
            </ToolbarBtn>

            <ToolbarDivider />

            {/* More Options Trigger — plain button, panel is at wrapper level */}
            <button
              ref={moreTriggerRef}
              type="button"
              onClick={() => {
                if (showMoreMenu) {
                  setShowMoreMenu(false);
                } else {
                  openMenu(setShowMoreMenu);
                }
              }}
              className={`p-1.5 rounded-lg transition-all duration-150 flex items-center justify-center cursor-pointer flex-shrink-0 ${
                showMoreMenu
                  ? 'bg-white/[0.08] text-[#e8ecf4]'
                  : 'text-[#6b7280] hover:text-[#e8ecf4] hover:bg-white/[0.06]'
              }`}
              title="More Options"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {/* Spacer */}
            <div className="flex-1 min-w-[8px]" />

            {/* Fullscreen toggle */}
            <ToolbarBtn
              onClick={toggleFullscreen}
              title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </ToolbarBtn>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════
          FLOATING PANELS — All rendered as direct children of
          the wrapper div (position: relative), so their
          position: absolute is relative to the wrapper, not
          the toolbar. This avoids clipping by overflow-x-auto
          and incorrect offset parents.
          ═══════════════════════════════════════════════════════ */}

      {/* Heading dropdown panel */}
      {!sourceMode && (
        <DropdownPanel
          isOpen={showHeadingMenu}
          onClose={() => setShowHeadingMenu(false)}
          triggerRef={headingTriggerRef}
        >
          <DropdownItem
            onClick={() => { editor.chain().focus().setParagraph().run(); setShowHeadingMenu(false); }}
            isActive={editor.isActive('paragraph') && !editor.isActive('heading')}
            shortcut="Ctrl+Alt+0"
          >
            <Pilcrow className="w-3.5 h-3.5" />
            Normal Text
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleHeading({ level: 1 }).run(); setShowHeadingMenu(false); }}
            isActive={editor.isActive('heading', { level: 1 })}
            shortcut="Ctrl+Alt+1"
          >
            <Heading1 className="w-3.5 h-3.5" />
            Heading 1
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleHeading({ level: 2 }).run(); setShowHeadingMenu(false); }}
            isActive={editor.isActive('heading', { level: 2 })}
            shortcut="Ctrl+Alt+2"
          >
            <Heading2 className="w-3.5 h-3.5" />
            Heading 2
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleHeading({ level: 3 }).run(); setShowHeadingMenu(false); }}
            isActive={editor.isActive('heading', { level: 3 })}
            shortcut="Ctrl+Alt+3"
          >
            <Heading3 className="w-3.5 h-3.5" />
            Heading 3
          </DropdownItem>
        </DropdownPanel>
      )}

      {/* More Options dropdown panel */}
      {!sourceMode && (
        <DropdownPanel
          isOpen={showMoreMenu}
          onClose={() => setShowMoreMenu(false)}
          triggerRef={moreTriggerRef}
          align="right"
          panelMinWidth={180}
        >
          {/* Subscript */}
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleSubscript().run(); setShowMoreMenu(false); }}
            isActive={editor.isActive('subscript')}
          >
            <SubscriptIcon className="w-3.5 h-3.5" />
            Subscript
          </DropdownItem>
          {/* Superscript */}
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleSuperscript().run(); setShowMoreMenu(false); }}
            isActive={editor.isActive('superscript')}
          >
            <SuperscriptIcon className="w-3.5 h-3.5" />
            Superscript
          </DropdownItem>

          <div className="my-1 border-t border-white/[0.06]" />

          {/* Indent/Outdent */}
          <DropdownItem
            onClick={() => { editor.chain().focus().sinkListItem('listItem').run(); setShowMoreMenu(false); }}
          >
            <IndentIncrease className="w-3.5 h-3.5" />
            Indent
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().liftListItem('listItem').run(); setShowMoreMenu(false); }}
          >
            <IndentDecrease className="w-3.5 h-3.5" />
            Outdent
          </DropdownItem>

          <div className="my-1 border-t border-white/[0.06]" />

          {/* Alignment */}
          <DropdownItem
            onClick={() => { editor.chain().focus().setTextAlign('left').run(); setShowMoreMenu(false); }}
            isActive={editor.isActive({ textAlign: 'left' })}
          >
            <AlignLeft className="w-3.5 h-3.5" />
            Align Left
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().setTextAlign('center').run(); setShowMoreMenu(false); }}
            isActive={editor.isActive({ textAlign: 'center' })}
          >
            <AlignCenter className="w-3.5 h-3.5" />
            Center
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().setTextAlign('right').run(); setShowMoreMenu(false); }}
            isActive={editor.isActive({ textAlign: 'right' })}
          >
            <AlignRight className="w-3.5 h-3.5" />
            Align Right
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().setTextAlign('justify').run(); setShowMoreMenu(false); }}
            isActive={editor.isActive({ textAlign: 'justify' })}
          >
            <AlignJustify className="w-3.5 h-3.5" />
            Justify
          </DropdownItem>

          <div className="my-1 border-t border-white/[0.06]" />

          {/* Block elements */}
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleBlockquote().run(); setShowMoreMenu(false); }}
            isActive={editor.isActive('blockquote')}
          >
            <Quote className="w-3.5 h-3.5" />
            Blockquote
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().toggleCodeBlock().run(); setShowMoreMenu(false); }}
            isActive={editor.isActive('codeBlock')}
          >
            <Code className="w-3.5 h-3.5" />
            Code Block
          </DropdownItem>
          <DropdownItem
            onClick={() => { editor.chain().focus().setHorizontalRule().run(); setShowMoreMenu(false); }}
          >
            <Minus className="w-3.5 h-3.5" />
            Horizontal Rule
          </DropdownItem>
          <DropdownItem
            onClick={() => { setShowMoreMenu(false); setShowImageDialog(true); }}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Insert Image
          </DropdownItem>

          <div className="my-1 border-t border-white/[0.06]" />

          {/* Table */}
          <DropdownItem
            onClick={() => {
              editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
              setShowMoreMenu(false);
            }}
          >
            <TableIcon className="w-3.5 h-3.5" />
            Insert Table
          </DropdownItem>
          {editor.isActive('table') && (
            <>
              <DropdownItem
                onClick={() => { editor.chain().focus().addRowBefore().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Add Row Before
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().addRowAfter().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Add Row After
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().addColumnBefore().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Add Column Before
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().addColumnAfter().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Add Column After
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteRow().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Delete Row
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteColumn().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Delete Column
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().deleteTable().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Delete Table
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().mergeCells().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Merge Cells
              </DropdownItem>
              <DropdownItem
                onClick={() => { editor.chain().focus().splitCell().run(); setShowMoreMenu(false); }}
              >
                <TableCellsMerge className="w-3.5 h-3.5" />
                Split Cell
              </DropdownItem>
            </>
          )}

          <div className="my-1 border-t border-white/[0.06]" />

          {/* Clear Formatting */}
          <DropdownItem
            onClick={() => { editor.chain().focus().clearNodes().unsetAllMarks().run(); setShowMoreMenu(false); }}
          >
            <RemoveFormatting className="w-3.5 h-3.5" />
            Clear Formatting
          </DropdownItem>
        </DropdownPanel>
      )}

      {/* Color Picker panel */}
      {!sourceMode && (
        <ColorPicker
          isOpen={showColorPicker}
          onClose={() => setShowColorPicker(false)}
          colors={TEXT_COLORS}
          onSelect={(color) => editor.chain().focus().setColor(color).run()}
          onReset={() => editor.chain().focus().unsetColor().run()}
          resetLabel="Reset Color"
          triggerRef={colorPickerTriggerRef}
        />
      )}

      {/* Highlight Picker panel */}
      {!sourceMode && (
        <ColorPicker
          isOpen={showHighlightPicker}
          onClose={() => setShowHighlightPicker(false)}
          colors={HIGHLIGHT_COLORS}
          isHighlight
          onSelect={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
          onReset={() => editor.chain().focus().unsetHighlight().run()}
          resetLabel="Remove Highlight"
          triggerRef={highlightPickerTriggerRef}
        />
      )}

      {/* ─── Floating Selection Toolbar ─── */}
      {!sourceMode && <FloatingSelectionToolbar editor={editor} wrapperRef={wrapperRef} />}

      {/* ─── Editor Content ─── */}
      {!sourceMode && (
        <div
          className="medq-editor-content flex-1 overflow-y-auto"
          style={{ minHeight: fullscreen ? 'calc(100vh - 140px)' : minHeight }}
          onContextMenu={(e) => e.preventDefault()}
        >
          <EditorContent editor={editor} />
        </div>
      )}

      {/* ─── Source Mode Textarea ─── */}
      {sourceMode && (
        <textarea
          value={sourceValue}
          onChange={(e) => setSourceValue(e.target.value)}
          className="w-full bg-[#0c0e14] text-[#e8ecf4] text-sm font-mono p-4 outline-none resize-y border-none flex-1"
          style={{ minHeight: fullscreen ? 'calc(100vh - 100px)' : `calc(${minHeight} + 80px)` }}
          spellCheck={false}
          placeholder="<p>Raw HTML here...</p>"
        />
      )}

      {/* ─── Quick-Insert Buttons Row + Footer ─── */}
      <div className="medq-quick-insert-row border-t border-white/[0.06] bg-[#161a26] flex-shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {QUICK_INSERT_BUTTONS.map((btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={() => handleQuickInsert(btn)}
              disabled={sourceMode}
              className={`medq-qi-btn ${btn.color} ${btn.bgHover} border ${btn.borderColor} ${
                sourceMode ? 'opacity-40 cursor-not-allowed' : ''
              }`}
              title={btn.label}
            >
              <span className="medq-qi-emoji">{btn.emoji}</span>
              <span className="medq-qi-label">{btn.label}</span>
            </button>
          ))}

          {/* Source Toggle */}
          <button
            type="button"
            onClick={handleToggleSource}
            className={`medq-qi-btn border font-semibold ${
              sourceMode
                ? 'text-[#00e5a0] border-[#00e5a0]/30 bg-[#00e5a0]/10'
                : 'text-[#5a6478] border-white/10 hover:bg-white/5 hover:text-[#00e5a0]'
            }`}
            title={sourceMode ? 'Back to rich text' : 'Edit HTML source'}
          >
            <span className="medq-qi-emoji">&lt;/&gt;</span>
            <span className="medq-qi-label">Source</span>
          </button>

          {/* Fullscreen toggle (in quick-insert row too for source mode) */}
          {sourceMode && (
            <button
              type="button"
              onClick={toggleFullscreen}
              className="medq-qi-btn border font-semibold text-[#5a6478] border-white/10 hover:bg-white/5 hover:text-[#00e5a0]"
              title={fullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              <span className="medq-qi-emoji">
                {fullscreen ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
              </span>
              <span className="medq-qi-label">{fullscreen ? 'Exit' : 'Full'}</span>
            </button>
          )}
        </div>

        {/* Character / Word count */}
        {!sourceMode && (
          <div className="flex items-center gap-3 pt-1.5 text-[10px] text-[#3a4055]">
            <span className="flex items-center gap-1">
              <Type className="w-3 h-3" />
              {characters} chars
            </span>
            <span>{words} words</span>
          </div>
        )}
      </div>

      {/* ─── Inline Dialogs (Link, Image) ─── */}
      <InlineDialog
        isOpen={showLinkDialog}
        onClose={() => setShowLinkDialog(false)}
        title="Insert Link"
        placeholder="https://example.com"
        initialValue={currentLinkUrl}
        onConfirm={handleLinkConfirm}
        containerRef={wrapperRef}
      />
      <InlineDialog
        isOpen={showImageDialog}
        onClose={() => setShowImageDialog(false)}
        title="Insert Image"
        placeholder="https://example.com/image.png"
        onConfirm={handleImageConfirm}
        containerRef={wrapperRef}
      />
    </div>
  );
}
