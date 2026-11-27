import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import ForgotPasswordForm from '@/components/medq/ForgotPasswordForm';

/**
 * Forgot Password page — Server Component.
 *
 * Redirects to home if already authenticated.
 */
export default async function ForgotPasswordPage() {
  const session = await getSession();
  if (session) redirect('/');
  return <ForgotPasswordForm />;
}