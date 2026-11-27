import type { Metadata } from 'next';

/**
 * Per-route metadata for /flashcards.
 */
export const metadata: Metadata = {
  title: 'Flashcards — MedQ',
  description: 'Study with spaced-repetition flashcards, match games and learn mode.',
};

export default function FlashcardsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
