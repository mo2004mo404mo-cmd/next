'use client';

import { useRouter } from 'next/navigation';
import ForgotPasswordForm from '@/components/medq/ForgotPasswordForm';

/**
 * Intercepting route — renders ForgotPasswordForm as a modal overlay
 * when navigating to /forgot-password from within the SPA.
 */
export default function ForgotPasswordModalPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      <div className="relative z-10 w-full max-w-md">
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
