import type { Metadata } from 'next';

/**
 * Per-route metadata for /home (the dashboard).
 */
export const metadata: Metadata = {
  title: 'MedQ — Medical Question Generator',
  description: 'Your MedQ study dashboard — streaks, weak areas, recommended practice and quick actions.',
};

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
