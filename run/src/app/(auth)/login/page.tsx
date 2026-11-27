import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';
import LoginForm from '@/components/medq/LoginForm';

/**
 * Login page — Server Component.
 *
 * Checks session before rendering any UI. If the user is already
 * authenticated, redirects to the home page. This runs server-side
 * at the edge, so no client JavaScript ships to the browser.
 */
export default async function LoginPage() {
  const session = await getSession();
  
  if (session) redirect('/');
  return <LoginForm />;
}
