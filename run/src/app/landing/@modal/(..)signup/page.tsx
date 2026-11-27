'use client';

import { useRouter } from 'next/navigation';
import SignupForm from '@/components/medq/SignupForm';

/**
 * Intercepting route — renders SignupForm as a modal overlay
 * when navigating to /signup from within the SPA.
 */
export default function SignupModalPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => router.back()}
      />
      <div className="relative z-10 w-full max-w-md">
        <SignupForm />
      </div>
    </div>
  );
}
