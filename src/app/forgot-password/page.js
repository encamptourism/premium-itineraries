'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { sendOtpAction } from '@/app/actions/auth';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = email.trim();
    if (!cleanEmail) {
      setError('Please enter your email address.');
      return;
    }

    startTransition(async () => {
      const res = await sendOtpAction(cleanEmail, 'email');
      if (!res.success) {
        setError(res.error || 'Failed to send reset code. Please try again.');
        return;
      }

      setSent(true);
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f5ed] flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md mb-6">
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-primary-green font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sign In
        </Link>
      </div>

      <div className="relative w-36 h-11 rounded-xl overflow-hidden mb-8">
        <Image src="/images/logo.png" alt="Encamp Privé" fill className="object-contain" priority />
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-stone-200/60 p-8 sm:p-10 space-y-8">
        {!sent ? (
          <>
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[#dfa62f]/10 border border-[#dfa62f]/20 flex items-center justify-center mx-auto">
                <Mail className="w-7 h-7 text-[#dfa62f]" />
              </div>
              <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-primary-green">
                Reset Password
              </h1>
              <p className="text-stone-500 text-sm">
                Enter your email and we will send a verification code to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label htmlFor="forgot-email" className="text-xs font-bold text-stone-600 uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    id="forgot-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full pl-11 pr-4 py-3.5 bg-[#f8f5ed] border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:ring-2 focus:ring-[#dfa62f]/20 transition-all"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
                  {error}
                </div>
              )}

              <button
                id="forgot-submit-btn"
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl bg-primary-green hover:bg-primary-green text-white font-bold text-sm uppercase tracking-wider hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Reset Code
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-5 py-4">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-primary-green">Code Sent!</h2>
            <p className="text-stone-500 text-sm leading-relaxed">
              We have sent a 6-digit verification code to{' '}
              <span className="font-semibold text-stone-700">{email}</span>.
            </p>
            <Link
              href={`/login`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary-green hover:bg-primary-green text-white font-bold text-xs uppercase tracking-wider transition-all"
            >
              Back to Sign In
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div>
              <button
                onClick={() => setSent(false)}
                className="text-xs text-stone-400 hover:text-stone-600 transition-colors underline"
              >
                Try a different email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
