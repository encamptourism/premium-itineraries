'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Phone, Smartphone, KeyRound, Edit2, RefreshCw, CheckCircle, Sparkles, User } from 'lucide-react';
import OtpInput from '@/components/auth/OtpInput';
import { loginAction, registerAction, sendOtpAction, verifyOtpAction, updateNameAction } from '@/app/actions/auth';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';
  const { refreshUser } = useAuth();

  const [authMethod, setAuthMethod] = useState('otp');
  const [identifierMode, setIdentifierMode] = useState('mobile'); // 'mobile' or 'email'
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  // Inline OTP verification states
  const [otpSent, setOtpSent] = useState(false);
  const [sentIdentifier, setSentIdentifier] = useState('');
  const [sentChannel, setSentChannel] = useState('phone');
  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [success, setSuccess] = useState(false);

  // Name Popup modal states for first-time OTP users
  const [showNameModal, setShowNameModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [nameError, setNameError] = useState('');
  const [isSavingName, startNameTransition] = useTransition();

  useEffect(() => {
    if (!otpSent) return;
    if (countdown <= 0) {
      setCanResend(true);
      return;
    }
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [otpSent, countdown]);

  useEffect(() => {
    if (authMethod === 'otp' && otpSent && digits.every((d) => d !== '') && !isPending && !success && !showNameModal) {
      handleVerifyOtp(digits.join(''));
    }
  }, [digits, otpSent, authMethod]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    if (identifierMode === 'mobile') {
      const numeric = val.replace(/\D/g, '').slice(0, 10);
      setIdentifier(numeric);
    } else {
      setIdentifier(val);
    }
  };

  const handleToggleIdentifierMode = () => {
    const newMode = identifierMode === 'email' ? 'mobile' : 'email';
    setIdentifierMode(newMode);
    setIdentifier('');
    setError('');
  };

  const handleSwitchTab = (method) => {
    setAuthMethod(method);
    setError('');
    if (method === 'password') {
      setOtpSent(false);
      setDigits(['', '', '', '', '', '']);
    }
  };

  const handleEditIdentifier = () => {
    setOtpSent(false);
    setError('');
    setDigits(['', '', '', '', '', '']);
    setSuccess(false);
  };

  const handleResendOtp = () => {
    if (!canResend) return;
    setCanResend(false);
    setCountdown(60);
    setError('');
    setDigits(['', '', '', '', '', '']);
    sendOtpAction(sentIdentifier, sentChannel);
  };

  const handleVerifyOtp = (code) => {
    setError('');
    if (!code || code.length !== 6 || !/^\d{6}$/.test(code)) {
      setError('Please enter a valid 6-digit OTP code.');
      return;
    }

    startTransition(async () => {
      const result = await verifyOtpAction(sentIdentifier, code, redirectTo);

      if (!result.success) {
        setError(result.error || 'Invalid code. Please try again.');
        setDigits(['', '', '', '', '', '']);
        return;
      }

      if (refreshUser) await refreshUser();

      if (result.needsName) {
        setShowNameModal(true);
      } else {
        setSuccess(true);
        setTimeout(() => {
          window.location.href = redirectTo;
        }, 800);
      }
    });
  };

  const handleSaveName = (e) => {
    e.preventDefault();
    setNameError('');

    const cleanName = fullName.trim();
    if (!cleanName) {
      setNameError('Please enter your full name.');
      return;
    }
    if (cleanName.length < 2) {
      setNameError('Full name must be at least 2 characters long.');
      return;
    }

    startNameTransition(async () => {
      const res = await updateNameAction(cleanName);
      if (!res.success) {
        setNameError(res.error || 'Failed to update name.');
        return;
      }

      if (refreshUser) await refreshUser();
      setSuccess(true);
      setShowNameModal(false);
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 600);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (authMethod === 'otp' && otpSent) {
      handleVerifyOtp(digits.join(''));
      return;
    }

    const cleanIdentifier = identifier.trim();
    if (!cleanIdentifier) {
      setError(`Please enter your ${identifierMode === 'email' ? 'email address' : 'mobile number'}.`);
      return;
    }

    const isEmail = identifierMode === 'email' || cleanIdentifier.includes('@');

    if (isEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(cleanIdentifier)) {
        setError('Please enter a valid email address (e.g., user@example.com).');
        return;
      }
    } else {
      const digitsOnly = cleanIdentifier.replace(/\D/g, '');
      if (digitsOnly.length !== 10) {
        setError('Mobile number must be exactly 10 digits.');
        return;
      }
      if (!/^[6-9]/.test(digitsOnly)) {
        setError('Mobile number must start with 6, 7, 8, or 9.');
        return;
      }
    }

    if (authMethod === 'password') {
      if (!password) {
        setError('Please enter your password.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
    }

    const apiIdentifier = !isEmail ? (cleanIdentifier.startsWith('91') && cleanIdentifier.length === 12 ? cleanIdentifier : `91${cleanIdentifier}`) : cleanIdentifier;

    startTransition(async () => {
      if (authMethod === 'otp') {
        const channel = isEmail ? 'email' : 'phone';
        const otpResult = await sendOtpAction(apiIdentifier, channel);

        if (!otpResult.success) {
          setError(otpResult.error || 'Failed to send verification code.');
          return;
        }

        setSentIdentifier(apiIdentifier);
        setSentChannel(channel);
        setOtpSent(true);
        setCountdown(60);
        setCanResend(false);
        setDigits(['', '', '', '', '', '']);
      } else {
        const payload = {
          email: isEmail ? cleanIdentifier : '',
          mobile: isEmail ? '' : apiIdentifier,
          password,
        };

        let result = await loginAction(payload);

        if (!result.success && result.error?.toLowerCase().includes('no account')) {
          result = await registerAction({
            name: isEmail ? cleanIdentifier.split('@')[0] : cleanIdentifier,
            email: isEmail ? cleanIdentifier : '',
            mobile: isEmail ? '' : apiIdentifier,
            password,
            confirm: password,
          });
        }

        if (!result.success) {
          setError(result.error || 'Authentication failed. Please check your details.');
          return;
        }

        if (refreshUser) await refreshUser();
        window.location.href = redirectTo;
      }
    });
  };

  const formattedDisplayIdentifier = sentIdentifier.startsWith('91') && sentIdentifier.length === 12
    ? `+91 ${sentIdentifier.slice(2)}`
    : sentIdentifier;

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  return (
    <div className="min-h-screen flex bg-white font-sans">
      <div className="hidden lg:flex lg:w-[52%] relative overflow-hidden flex-col">
        <Image
          src="https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg"
          alt="Encamp Privé Expeditions"
          fill
          priority
          sizes="52vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#020d07]/95 via-[#062212]/80 to-[#020d07]/85" />

        <div className="relative z-10 flex flex-col justify-between h-full p-12 xl:p-16 text-white">
          <div className="relative w-36 h-11 rounded-xl overflow-hidden">
            <Image src="/images/logo.png" alt="Encamp Privé" fill className="object-contain" priority />
          </div>

          <div className="space-y-6 max-w-md">
            <h2 className="text-4xl xl:text-5xl font-bold leading-tight text-white">
              Your Next<br />Journey Awaits
            </h2>
            <p className="text-stone-300 text-base xl:text-lg font-light leading-relaxed">
              Access bespoke itineraries, loyalty rewards, and your personal travel concierge.
            </p>

            <div className="flex flex-wrap gap-2 pt-2">
              {['CT Coins Rewards', 'Bespoke Itineraries', 'Carbon-Neutral Travel', 'Dedicated Concierge'].map((f) => (
                <span key={f} className="text-xs px-3 py-1 rounded-full border border-white/20 text-stone-300 bg-white/5 backdrop-blur-sm">
                  {f}
                </span>
              ))}
            </div>
          </div>

          <div className="border-l-2 border-[#dfa62f] pl-5 max-w-xs">
            <p className="text-stone-300 italic text-sm leading-relaxed">
              "Not all those who wander are lost."
            </p>
            <p className="text-[#dfa62f] text-xs mt-1.5 font-semibold tracking-wider">— J.R.R. Tolkien</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[48%] flex items-center justify-center px-6 py-12 bg-[#f8f5ed] min-h-screen">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#062212] tracking-tight">
              {otpSent ? 'Verify OTP' : 'Sign In or Register'}
            </h1>
            <p className="text-stone-500 mt-2 text-sm">
              {otpSent
                ? `Verification code sent to your ${sentChannel}`
                : `Enter your ${identifierMode === 'email' ? 'email address' : 'mobile number'} to continue`}
            </p>
          </div>

          {!otpSent && (
            <div className="flex p-1 bg-stone-200/70 rounded-2xl">
              <button
                type="button"
                onClick={() => handleSwitchTab('otp')}
                className={`w-1/2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  authMethod === 'otp'
                    ? 'bg-[#062212] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 font-semibold'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                Via OTP
              </button>

              <button
                type="button"
                onClick={() => handleSwitchTab('password')}
                className={`w-1/2 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  authMethod === 'password'
                    ? 'bg-[#062212] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-900 font-semibold'
                }`}
              >
                <KeyRound className="w-3.5 h-3.5" />
                Via Password
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!otpSent ? (
              <>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="login-identifier" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                      {identifierMode === 'email' ? 'Email Address' : 'Mobile Number'}
                    </label>
                    <button
                      type="button"
                      onClick={handleToggleIdentifierMode}
                      className="text-xs text-[#dfa62f] hover:text-[#c48f22] font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {identifierMode === 'email' ? (
                        <>
                          <Smartphone className="w-3.5 h-3.5" />
                          Sign in via Mobile
                        </>
                      ) : (
                        <>
                          <Mail className="w-3.5 h-3.5" />
                          Sign in via Email
                        </>
                      )}
                    </button>
                  </div>
                  <div className="relative">
                    {identifierMode === 'email' ? (
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    ) : (
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                    )}
                    <input
                      id="login-identifier"
                      type={identifierMode === 'email' ? 'email' : 'tel'}
                      value={identifier}
                      onChange={handleInputChange}
                      maxLength={identifierMode === 'email' ? 100 : 10}
                      placeholder={identifierMode === 'email' ? 'Enter email address' : 'Enter 10-digit mobile number'}
                      required
                      className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:ring-2 focus:ring-[#dfa62f]/20 transition-all shadow-xs"
                    />
                  </div>
                </div>

                {authMethod === 'password' && (
                  <div className="space-y-1.5 animate-fadeIn">
                    <label htmlFor="login-password" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                      <input
                        id="login-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required={authMethod === 'password'}
                        className="w-full pl-11 pr-12 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:ring-2 focus:ring-[#dfa62f]/20 transition-all shadow-xs"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="flex justify-end pt-0.5">
                      <Link
                        href="/forgot-password"
                        className="text-xs text-[#dfa62f] hover:text-[#c48f22] font-semibold transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-5 animate-fadeIn">
                <div className="bg-amber-500/10 border border-[#dfa62f]/30 rounded-2xl p-4 text-center space-y-1">
                  <p className="text-xs text-stone-600 font-medium">
                    Code sent to <span className="font-bold text-stone-800 uppercase">{sentChannel}</span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-mono text-sm font-bold text-[#062212]">
                      {formattedDisplayIdentifier}
                    </span>
                    <button
                      type="button"
                      onClick={handleEditIdentifier}
                      className="text-xs text-[#dfa62f] hover:text-[#c48f22] font-semibold flex items-center gap-1 underline transition-colors"
                    >
                      <Edit2 className="w-3 h-3" /> Change
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <OtpInput
                    value={digits}
                    onChange={setDigits}
                    error={!!error}
                    success={success}
                    disabled={isPending || success || showNameModal}
                  />
                </div>

                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-2xl px-4 py-3 flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    Verified! Redirecting…
                  </div>
                )}

                <div className="text-center text-xs text-stone-500 pt-1">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="inline-flex items-center gap-1.5 text-[#dfa62f] hover:text-[#c48f22] font-semibold transition-colors"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      Resend OTP
                    </button>
                  ) : (
                    <span>
                      Resend code in{' '}
                      <span className="font-bold text-[#062212] tabular-nums">
                        {mm}:{ss}
                      </span>
                    </span>
                  )}
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-2xl px-4 py-3">
                {error}
              </div>
            )}

            {!success && (
              <button
                id="login-submit-btn"
                type="submit"
                disabled={isPending || (otpSent && digits.some((d) => !d))}
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#062212] hover:bg-[#0b3a24] text-white font-bold text-xs uppercase tracking-wider hover:shadow-lg transition-all duration-200 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {isPending ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {otpSent ? 'Verifying…' : authMethod === 'otp' ? 'Sending Code…' : 'Connecting…'}
                  </>
                ) : (
                  <>
                    {otpSent
                      ? 'Verify & Continue'
                      : authMethod === 'otp'
                      ? 'Continue with OTP'
                      : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </form>

          <p className="text-center text-xs text-stone-500 pt-2 leading-relaxed">
            By continuing, you agree to Encamp Privé&apos;s{' '}
            <span className="underline cursor-pointer">Terms of Service</span> and{' '}
            <span className="underline cursor-pointer">Privacy Policy</span>.
          </p>
        </div>
      </div>

      {/* ── Name Popup Modal for New / First-Time Accounts ── */}
      {showNameModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-3xl p-8 shadow-2xl space-y-6 text-center border border-stone-200">
            <div className="w-14 h-14 bg-[#dfa62f]/10 border border-[#dfa62f]/20 rounded-2xl flex items-center justify-center mx-auto text-[#dfa62f]">
              <Sparkles className="w-7 h-7" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-[#062212]">
                Welcome to Encamp Privé
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm">
                Please enter your full name to complete your profile
              </p>
            </div>

            <form onSubmit={handleSaveName} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label htmlFor="modal-name" className="text-[11px] font-bold text-stone-600 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
                  <input
                    id="modal-name"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    autoFocus
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-stone-200 rounded-2xl text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#dfa62f] focus:ring-2 focus:ring-[#dfa62f]/20 transition-all shadow-xs"
                  />
                </div>
              </div>

              {nameError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl px-3.5 py-2.5">
                  {nameError}
                </div>
              )}

              <button
                type="submit"
                disabled={isSavingName}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-[#062212] hover:bg-[#0b3a24] text-white font-bold text-xs uppercase tracking-wider transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {isSavingName ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving…
                  </>
                ) : (
                  <>
                    Save & Continue
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
