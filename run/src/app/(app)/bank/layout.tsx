import type { Metadata } from 'next';

/**
 * Per-route metadata for /bank and /bank/[id].
 */
export const metadata: Metadata = {
  title: 'Question Bank — MedQ',
  description: 'Browse, filter, edit and study the MedQ question bank — 1355+ medical questions with explanations and mnemonics.',
};

export default function BankLayout({ children }: { children: React.ReactNode }) {
  return children;
}
