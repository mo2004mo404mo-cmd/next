import type { Metadata } from 'next';

/**
 * Per-route metadata for /exam-sim.
 */
export const metadata: Metadata = {
  title: 'Exam Simulator — MedQ',
  description: 'Timed USMLE-style question blocks with per-system score reports.',
};

export default function ExamSimLayout({ children }: { children: React.ReactNode }) {
  return children;
}
