import type { Metadata } from 'next';

/**
 * Per-route metadata for /osce (OSCE voice trainer).
 */
export const metadata: Metadata = {
  title: 'OSCE Trainer — MedQ',
  description: 'Practice standardized-patient encounters by voice. Take the history, get graded.',
};

export default function OsceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
