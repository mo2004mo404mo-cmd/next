import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import SignupForm from '@/components/medq/SignupForm';

/**
 * Signup page — Server Component.
 *
 * Redirects to home if already authenticated.
 */
export default async function SignupPage() {
  const session = await getSession();
  if (session) redirect('/');
  return <SignupForm />;
}