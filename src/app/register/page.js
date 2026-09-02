'use client';

import { Suspense } from 'react';
import LoginPage from '../login/page';

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8f5ed] flex items-center justify-center"><span className="w-8 h-8 border-2 border-[#dfa62f]/30 border-t-[#dfa62f] rounded-full animate-spin" /></div>}>
      <LoginPage />
    </Suspense>
  );
}
