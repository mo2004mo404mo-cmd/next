'use client';

import { useTheme } from '@/lib/hooks/use-theme';
import { Sun, Moon } from 'lucide-react';

/**
 * ThemeToggle — a compact icon button that flips between dark and light themes.
 * Uses the global `useTheme` hook from `@/lib/hooks/use-theme` which toggles
 * the `.dark` class on <html> and persists the choice to localStorage.
 *
 * Renders both icons and uses CSS (see globals.css `.medq-theme-toggle`)
 * to crossfade based on the active theme, so there is no hydration flash.
 */
export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const cycle = () => {
    // Simple dark ↔ light toggle. If currently 'system', jump to the
    // explicit opposite of the resolved theme.
    if (theme === 'system') {
      setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
    } else {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    }
  };

  return (
    <button
      type="button"
      onClick={cycle}
      className={`medq-theme-toggle ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <Sun className="icon-sun" />
      <Moon className="icon-moon" />
    </button>
  );
}

export default ThemeToggle;
