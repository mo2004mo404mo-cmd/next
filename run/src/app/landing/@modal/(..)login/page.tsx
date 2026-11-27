'use client';

import { useRouter } from 'next/navigation';
import LoginForm from '@/components/medq/LoginForm';

/**
 * Intercepting route — renders LoginForm as a modal overlay
 * when navigating to /login from within the SPA (soft navigation).
 *
 * On direct URL visit or refresh, the @modal slot falls back to
 * default.tsx (returns null), and the real /login/page.tsx renders
 * as a full page instead.
 */
export default function LoginModalPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop — dismisses on click (navigates back) */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      {/* Modal content */}
      <div className="relative z-10 w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
}
