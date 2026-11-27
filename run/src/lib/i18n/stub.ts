/**
 * Stub for react-i18next's useTranslation hook.
 *
 * OpenMAIC uses i18next for translations; medq does not yet wire up i18n.
 * Components ported from OpenMAIC that call `useTranslation()` import this
 * stub instead. The stub returns `t` as an identity function so the original
 * translation keys are rendered as-is (English fallback). When medq wires up
 * real i18n, replace this with `export { useTranslation } from 'react-i18next'`.
 */

export type TFunction = (key: string, options?: Record<string, unknown>) => string;

export interface UseTranslationReturn {
  t: TFunction;
  i18n: {
    language: string;
    changeLanguage: (lng: string) => Promise<void>;
    exists: (key: string) => boolean;
  };
  ready: boolean;
}

export function useTranslation(_ns?: string | string[]): UseTranslationReturn {
  return {
    t: (key: string, options?: Record<string, unknown>) => {
      if (options && typeof options === 'object' && 'defaultValue' in options) {
        return String((options as { defaultValue: unknown }).defaultValue);
      }
      return key;
    },
    i18n: {
      language: 'en',
      changeLanguage: async () => {},
      exists: () => true,
    },
    ready: true,
  };
}

export const initReactI18next = {
  type: 'backend' as const,
  init: () => {},
};

export default useTranslation;
