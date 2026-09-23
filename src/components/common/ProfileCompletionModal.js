'use client';

import { useState, useEffect, useTransition } from 'react';
import { Sparkles, User, Mail, Phone, ArrowRight, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import OtpInput from '@/components/auth/OtpInput';
import {
  updateNameAction,
  updateEmailAction,
  updateMobileAction,
  sendOtpAction,
} from '@/app/actions/auth';

export default function ProfileCompletionModal() {
  const { user, isAuthenticated, refreshUser } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [steps, setSteps] = useState([]); // ['name', 'email', 'mobile']
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Form values
  const [fullName, setFullName] = useState('');
  const [realEmail, setRealEmail] = useState('');
  const [newMobile, setNewMobile] = useState('');
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtpDigits, setMobileOtpDigits] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsOpen(false);
      return;
    }

    const isSkipped = sessionStorage.getItem('ep_completion_skipped');
    if (isSkipped) {
      setIsOpen(false);
      return;
    }

    const rawName = String(user.name || '').trim();
    const rawEmail = String(user.email || '').trim();
    const rawMobile = String(user.mobile || '').trim();

    const needsName = !rawName || rawName === 'Customer' || rawName === rawMobile;
    const needsEmail = !rawEmail || rawEmail.endsWith('@customer.encamp.com');
    const needsMobile = !rawMobile;

    const activeSteps = [];
    if (needsName) activeSteps.push('name');
    if (needsEmail) activeSteps.push('email');
    if (needsMobile) activeSteps.push('mobile');

    if (activeSteps.length > 0) {
      setSteps(activeSteps);
      setCurrentStepIndex(0);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [isAuthenticated, user]);

  if (!isOpen || steps.length === 0) return null;

  const currentStep = steps[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex + 1 < steps.length) {
      setCurrentStepIndex((prev) => prev + 1);
      setError('');
    } else {
      handleDismiss();
    }
  };

  const handleDismiss = () => {
    setIsOpen(false);
    sessionStorage.setItem('ep_completion_skipped', 'true');
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    setError('');

    const cleanName = fullName.trim();
    if (!cleanName || cleanName === 'Customer') {
      setError('Please enter your valid full name.');
      return;
    }
    if (cleanName.length < 2) {
      setError('Full name must be at least 2 characters long.');
      return;
    }

    startTransition(async () => {
      const res = await updateNameAction(cleanName);
      if (!res.success) {
        setError(res.error || 'Failed to update name.');
        return;
      }
      if (refreshUser) await refreshUser();
      handleNextStep();
    });
  };

  const handleSaveEmail = (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = realEmail.trim();
    if (!cleanEmail || !cleanEmail.includes('@') || cleanEmail.endsWith('@customer.encamp.com')) {
      setError('Please enter your real personal or work email address.');
      return;
    }

    startTransition(async () => {
      const res = await updateEmailAction(cleanEmail);
      if (!res.success) {
        setError(res.error || 'Failed to update email.');
        return;
      }
      if (refreshUser) await refreshUser();
      handleNextStep();
    });
  };

  const handleSendMobileOtp = (e) => {
    e.preventDefault();
    setError('');

    const cleanMobile = newMobile.trim().replace(/\D/g, '');
    if (cleanMobile.length < 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    const formatted = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;

    startTransition(async () => {
      const res = await sendOtpAction(formatted, 'phone');
      if (!res.success) {
        setError(res.error || 'Failed to send OTP to mobile number.');
        return;
      }
      setMobileOtpSent(true);
    });
  };

  const handleVerifyMobileOtp = (e) => {
    e.preventDefault();
    setError('');

    const code = mobileOtpDigits.join('');
    if (code.length !== 6) {
      setError('Please enter the 6-digit OTP code sent to your mobile number.');
      return;
    }

    const cleanMobile = newMobile.trim().replace(/\D/g, '');
    const formatted = cleanMobile.length === 10 ? `91${cleanMobile}` : cleanMobile;

    startTransition(async () => {
      const res = await updateMobileAction(formatted);
      if (!res.success) {
        setError(res.error || 'Mobile verification failed.');
        return;
      }
      if (refreshUser) await refreshUser();
      handleNextStep();
    });
  };

  return (
    <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-center border border-stone-200 relative">
        {/* Top-Right Dismiss Button */}
        <button
          type="button"
          onClick={handleDismiss}
          className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition-all cursor-pointer"
          title="Skip for now"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 bg-[#dfa62f]/10 border border-[#dfa62f]/20 rounded-2xl flex items-center justify-center mx-auto text-[#dfa62f]">
          <Sparkles className="w-7 h-7" />
        </div>

        <div className="space-y-1.5">
          <h2 className="text-2xl font-bold text-primary-green">Welcome to Encamp Privé</h2>
          <p className="text-stone-500 text-xs sm:text-sm">
            Please complete your profile details to customize your experience.
          </p>
        </div>

        {/* Step 1: Full Name */}
        {currentStep === 'name' && (
          <form onSubmit={handleSaveName} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label htmlFor="home-modal-name" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  id="home-modal-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  autoFocus
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-3.5 py-2.5">
                {error}
              </div>
            )}

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-green text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    Save & Continue <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all cursor-pointer text-center"
              >
                Skip for now
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Real Email */}
        {currentStep === 'email' && (
          <form onSubmit={handleSaveEmail} className="space-y-4 text-left">
            <div className="space-y-1.5">
              <label htmlFor="home-modal-email" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                Personal / Work Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                <input
                  id="home-modal-email"
                  type="email"
                  value={realEmail}
                  onChange={(e) => setRealEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  autoFocus
                  className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all shadow-xs"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-3.5 py-2.5">
                {error}
              </div>
            )}

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-green text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Updating Email…
                  </>
                ) : (
                  <>
                    Save & Continue <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all cursor-pointer text-center"
              >
                Skip for now
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Mobile + OTP */}
        {currentStep === 'mobile' && (
          <div className="space-y-4 text-left">
            {!mobileOtpSent ? (
              <form onSubmit={handleSendMobileOtp} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="home-modal-mobile" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    <input
                      id="home-modal-mobile"
                      type="tel"
                      value={newMobile}
                      onChange={(e) => setNewMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="9876543210"
                      required
                      maxLength={10}
                      autoFocus
                      className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all shadow-xs"
                    />
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-3.5 py-2.5">
                    {error}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    disabled={isPending}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-green text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md"
                  >
                    {isPending ? 'Sending Code…' : 'Send Mobile Verification OTP'}
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all cursor-pointer text-center"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleVerifyMobileOtp} className="space-y-4 text-center">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 block">Enter Mobile OTP Code</label>
                  <OtpInput digits={mobileOtpDigits} setDigits={setMobileOtpDigits} disabled={isPending} />
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-3.5 py-2.5 text-left">
                    {error}
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <button
                    type="submit"
                    disabled={isPending || mobileOtpDigits.some((d) => !d)}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary-green text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.99] disabled:opacity-60 cursor-pointer shadow-md"
                  >
                    {isPending ? 'Verifying Mobile…' : 'Verify & Finish'}
                  </button>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full py-3 rounded-2xl border border-stone-200 text-stone-600 font-bold text-xs uppercase tracking-wider hover:bg-stone-50 transition-all cursor-pointer text-center"
                  >
                    Skip for now
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
