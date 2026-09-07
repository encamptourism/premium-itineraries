'use client';

import { useEffect } from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('[Global App Error]:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#f8f5ed] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/80 shadow-2xl shadow-stone-900/10 text-center space-y-6">
        <div className="w-16 h-16 bg-red-50 rounded-2xl border border-red-100 flex items-center justify-center mx-auto text-red-600">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-primary-green">
            Unexpected Error
          </h1>
          <p className="text-stone-500 text-sm leading-relaxed">
            {error?.message || 'We ran into an unexpected problem. Please try again or return to the home page.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-green text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 transition-all shadow-md active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            Reload Page
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-stone-300 text-stone-700 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all"
          >
            <Home className="w-4 h-4" />
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
