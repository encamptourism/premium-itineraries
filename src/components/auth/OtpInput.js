'use client';

import { useRef } from 'react';

/**
 * OtpInput — 6-digit OTP entry component.
 *
 * Props:
 *   value      → string[]  (array of 6 single digits, e.g. ['1','2','3','4','5','6'])
 *   onChange   → (newValue: string[]) => void
 *   error      → boolean   (shows red ring on all inputs)
 *   success    → boolean   (shows green ring on all inputs)
 *   disabled   → boolean
 */
export default function OtpInput({ value, onChange, error, success, disabled }) {
  const inputRefs = useRef([]);

  const handleChange = (index, raw) => {
    if (!/^\d*$/.test(raw)) return;
    const digit = raw.slice(-1); // keep last char if user types fast
    const next = [...value];
    next[index] = digit;
    onChange(next);

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
      const next = [...value];
      next[index] = '';
      onChange(next);
    }
    if (e.key === 'ArrowLeft' && index > 0) inputRefs.current[index - 1]?.focus();
    if (e.key === 'ArrowRight' && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const next = [...value];
    pasted.split('').forEach((ch, i) => { if (i < 6) next[i] = ch; });
    onChange(next);
    // Focus last filled or next empty
    const focusIdx = Math.min(pasted.length, 5);
    inputRefs.current[focusIdx]?.focus();
  };

  const boxClass = (digit) => {
    const base =
      'w-12 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold rounded-2xl border-2 transition-all duration-200 focus:outline-none caret-transparent select-none';
    if (success)
      return `${base} border-green-400 bg-green-50 text-green-700`;
    if (error)
      return `${base} border-red-400 bg-red-50 text-red-600 animate-shake`;
    if (digit)
      return `${base} border-gold bg-amber-50 text-forest`;
    return `${base} border-stone-200 bg-stone-50 text-stone-900 focus:border-gold focus:bg-amber-50/50 focus:ring-2 focus:ring-gold/20`;
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3" onPaste={handlePaste}>
      {value.map((digit, i) => (
        <input
          key={i}
          ref={(el) => (inputRefs.current[i] = el)}
          id={`otp-digit-${i}`}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={1}
          value={digit}
          disabled={disabled}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          className={boxClass(digit)}
          aria-label={`OTP digit ${i + 1}`}
        />
      ))}
    </div>
  );
}
