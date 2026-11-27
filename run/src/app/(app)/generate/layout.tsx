import type { Metadata } from 'next';

/**
 * Per-route metadata for /generate (client pages cannot export metadata, so
 * a tiny server layout provides it — previously every route shared the root
 * "MedQ — Medical Question Generator" title).
 */
export const metadata: Metadata = {
  title: 'Generate Questions — MedQ',
  description: 'Generate exam-ready medical questions with AI — by topic, from files, or grounded in your knowledge library.',
};

export default function GenerateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
