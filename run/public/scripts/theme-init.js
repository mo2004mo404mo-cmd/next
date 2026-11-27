/**
 * MedQ — No-flash theme initialization
 *
 * Runs synchronously in <head> before <body> is parsed (via next/script
 * strategy="beforeInteractive"). Removes the .dark class from <html> if
 * the user has previously chosen 'light' theme, preventing a flash of
 * dark mode on light-theme users.
 *
 * Reads the same 'theme' localStorage key that useTheme() uses, so they
 * stay in sync.
 */
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') {
      document.documentElement.classList.remove('dark');
    }
    // 'dark' or 'system' or null → keep .dark class.
    // For 'system', we could check prefers-color-scheme, but that risks a
    // flash if the user's system is light. Instead, we let useTheme()
    // handle 'system' after hydration — the initial paint is dark, which
    // matches the SSR HTML.
  } catch (e) {
    /* ignore — localStorage may be blocked */
  }
})();
