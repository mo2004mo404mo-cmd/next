import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sign up — MedQ',
  description: 'Create your free MedQ account and start studying smarter.',
};

export default function SignupLayout({ children }: { children: React.ReactNode }) {
  return children;
}