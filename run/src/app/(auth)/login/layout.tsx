import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign in — MedQ',
  description: 'Sign in to your MedQ account and continue studying.',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
