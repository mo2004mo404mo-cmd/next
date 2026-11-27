'use client';

/**
 * ComposerSlashPalette — "/" command palette for the MedQ agent composer.
 *
 * Not a deepagents-package feature (the JS package has no slash-command
 * surface) — this is the chat-UX convention from Claude Code / agent
 * consoles, adapted for MedQ:
 *
 *   • Panel commands      /new (fresh thread), /skills (browse-skill palette)
 *   • Quick actions       the SKILL_CATALOG starters (PDF cheat sheet,
 *                         presentation, chart, illustration, image search…)
 *   • Agent skills        the user's AgentSkill library ("/<name>" → inserts
 *                         a "use my skill" prompt; the pack itself loads via
 *                         the skills middleware's progressive disclosure)
 *
 * Opens while the composer's first token starts with "/". Keyboard: ↑/↓
 * move, Enter/Tab pick, Esc close. Selections either insert a prompt (the
 * learner finishes the sentence) or run a panel action.
 */

import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { FilePlus2, Sparkles, Terminal } from 'lucide-react';
import { SKILL_CATALOG } from './MedQAgentConfig';

interface SlashCommand {
  id: string;
  slash: string;
  label: string;
  hint: string;
  /** Text placed into the composer (learner completes the sentence). */
  insert?: string;
  /** Panel action to run instead of inserting text. */
  action?: 'new-chat' | 'browse-skills';
}

interface UserSkill {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

/** Panel-level commands (always offered). */
const PANEL_COMMANDS: SlashCommand[] = [
  { id: 'cmd:new', slash: '/new', label: 'New conversation', hint: 'Start a fresh thread on the next send', action: 'new-chat' },
  { id: 'cmd:skills', slash: '/skills', label: 'Browse skills', hint: 'Open the quick-start skill palette', action: 'browse-skills' },
];

/** Quick-start commands derived from the shared catalog. */
const CATALOG_COMMANDS: SlashCommand[] = SKILL_CATALOG.map((skill) => ({
  id: `cat:${skill.id}`,
  slash: `/${skill.id}`,
  label: skill.name,
  hint: skill.category,
  insert: skill.prompt,
}));

export interface SlashPaletteHandle {
  /** Pick the currently highlighted command (Enter/Tab in the composer). */
  pickHighlighted: () => void;
  /** Number of visible commands (arrow-key clamp + zero-guard). */
  count: () => number;
}

export const ComposerSlashPalette = forwardRef<SlashPaletteHandle, {
  /** The composer's current text (starts with "/"). */
  query: string;
  /** Currently highlighted row index (controlled by the composer). */
  highlight: number;
  onHighlightChange: (index: number) => void;
  /** Insert a prompt into the composer and focus it. */
  onPickText: (text: string) => void;
  /** Run a panel action. */
  onAction: (action: 'new-chat' | 'browse-skills') => void;
  onClose: () => void;
}>(function ComposerSlashPalette({ query, highlight, onHighlightChange, onPickText, onAction, onClose }, ref) {
  const [userSkills, setUserSkills] = useState<UserSkill[] | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Lazily fetch the user's agent-skill library the first time the palette
  // opens (guests / failures degrade to no skill entries).
  useEffect(() => {
    if (userSkills !== null) return;
    let active = true;
    fetch('/api/agent/skills')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!active || !Array.isArray(data?.skills)) return;
        setUserSkills(
          data.skills
            .filter((s: UserSkill) => s && typeof s.name === 'string' && s.enabled)
            .slice(0, 20),
        );
      })
      .catch(() => {
        if (active) setUserSkills([]);
      });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const skillCommands: SlashCommand[] = useMemo(
    () =>
      (userSkills ?? []).map((skill) => ({
        id: `skill:${skill.id}`,
        slash: `/${skill.name}`,
        label: skill.name,
        hint: 'your skill · load_skill',
        insert: `Use my "${skill.name}" skill for this: `,
      })),
    [userSkills],
  );

  const commands = useMemo(
    // User skills rank ABOVE the generic quick-start catalog — personal
    // workflows are the most specific intent.
    () => [...PANEL_COMMANDS, ...skillCommands, ...CATALOG_COMMANDS],
    [skillCommands],
  );

  const filtered = useMemo(() => {
    const q = query.replace(/^\//, '').trim().toLowerCase();
    if (!q) return commands.slice(0, 14);
    return commands
      .filter(
        (cmd) =>
          cmd.slash.toLowerCase().includes(q) ||
          cmd.label.toLowerCase().includes(q) ||
          cmd.hint.toLowerCase().includes(q),
      )
      .slice(0, 14);
  }, [commands, query]);

  // Reset the highlight whenever the filter changes.
  useEffect(() => {
    onHighlightChange(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  // Keep the highlighted row in view.
  useEffect(() => {
    const el = listRef.current?.children[highlight] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlight]);

  const pick = (cmd: SlashCommand) => {
    if (cmd.action) {
      onAction(cmd.action);
    } else if (cmd.insert !== undefined) {
      onPickText(cmd.insert);
    }
    onClose();
  };

  // Imperative surface for the composer's keyboard handling: the textarea
  // owns the key events, the palette owns the filtered list. (Declared before
  // the empty-filter early return — hooks must run unconditionally.)
  useImperativeHandle(ref, () => ({
    pickHighlighted: () => {
      const cmd = filtered[highlight] ?? filtered[filtered.length - 1];
      if (cmd) pick(cmd);
    },
    count: () => filtered.length,
  }), [filtered, highlight, onPickText, onAction, onClose]);
  if (filtered.length === 0) {
    return (
      <div className="absolute bottom-full left-0 right-0 mb-2 z-50 rounded-xl border border-white/10 bg-[#111525] p-3 shadow-2xl">
        <div className="text-[10px] text-[#5a6478]">No commands match “{query}”. Try /new, /skills, or a quick-start like /pdf.</div>
      </div>
    );
  }

  return (
    <div
      className="absolute bottom-full left-0 right-0 mb-2 z-50 flex max-h-64 flex-col overflow-hidden rounded-xl border border-white/10 bg-[#111525] shadow-2xl"
      style={{ backdropFilter: 'blur(20px)' }}
    >
      <div className="flex items-center gap-1.5 border-b border-white/5 px-3 py-1.5 text-[9px] uppercase tracking-wide text-[#5a6478]">
        <Terminal className="h-3 w-3" />
        Commands
        <span className="ml-auto normal-case">↑↓ move · Enter pick · Esc close</span>
      </div>
      <div ref={listRef} className="overflow-y-auto p-1 custom-scrollbar">
        {filtered.map((cmd, i) => (
          <button
            key={cmd.id}
            onClick={() => pick(cmd)}
            onMouseEnter={() => onHighlightChange(i)}
            className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-[11px] ${
              i === highlight ? 'bg-white/8' : 'hover:bg-white/5'
            }`}
          >
            {cmd.action ? (
              <FilePlus2 className="h-3.5 w-3.5 shrink-0 text-[#00e5a0]" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-[#8b5cf6]" />
            )}
            <span className="min-w-0 flex-1 truncate">
              <span className="font-medium text-[#00e5a0]">{cmd.slash}</span>
              <span className="text-[#e8ecf4]"> — {cmd.label}</span>
            </span>
            <span className="shrink-0 text-[9px] text-[#5a6478]">{cmd.hint}</span>
          </button>
        ))}
      </div>
    </div>
  );
});

/**
 * Should the slash palette be open for this composer text?
 * True while the FIRST token starts with "/" and nothing has been sent yet.
 */
export function slashPaletteOpen(text: string): boolean {
  if (!text.startsWith('/')) return false;
  const firstToken = text.split(/\s/, 1)[0] ?? '';
  return firstToken.length > 0 && firstToken.length <= 40;
}
