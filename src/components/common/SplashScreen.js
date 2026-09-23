'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function SplashScreen() {
  const [shouldRender, setShouldRender] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only display on initial site visit per session
    const hasSeenSplash = sessionStorage.getItem('ep_splash_seen');
    if (!hasSeenSplash) {
      setShouldRender(true);

      const fadeTimer = setTimeout(() => {
        setFadeOut(true);
      }, 1500); // Display duration: 1.5 seconds

      const removeTimer = setTimeout(() => {
        setShouldRender(false);
        sessionStorage.setItem('ep_splash_seen', 'true');
      }, 2000); // 1.5s + 0.5s fade animation

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(removeTimer);
      };
    }
  }, []);

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[999999] h-screen h-[100dvh] w-screen overflow-hidden bg-[#070F0D] flex items-center justify-center select-none touch-none overscroll-none transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        fadeOut
          ? 'opacity-0 pointer-events-none scale-105'
          : 'opacity-100 scale-100'
      }`}
      aria-label="Application Splash"
      role="dialog"
      aria-modal="true"
    >
      {/* Centered Minimal Pure Logo */}
      <div className="relative z-10 flex items-center justify-center animate-nativeAppPop">
        <Image
          src="/images/logo.png"
          alt="Encamp Privé Logo"
          width={240}
          height={75}
          className="w-48 sm:w-64 h-auto object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
          priority
        />
      </div>

      {/* Entrance Animation */}
      <style jsx>{`
        @keyframes nativeAppPop {
          0% {
            opacity: 0;
            transform: scale(0.92);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-nativeAppPop {
          animation: nativeAppPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
