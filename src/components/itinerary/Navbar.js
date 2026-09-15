'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, User, LogOut, ChevronDown, Settings, Coins, Wallet } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useCarbonTrace } from '@/context/CarbonTraceContext';
import CarbonTraceWalletModal from '@/components/checkout/CarbonTraceWalletModal';

export default function Navbar() {
  const { user, ctCoins, isAuthenticated, isLoading, logout } = useAuth();
  const ctContext = useCarbonTrace();
  
  const connected = ctContext?.connected || false;
  const address = ctContext?.address || null;
  const ctcoins = ctContext?.ctcoins || 0;
  const getCTCoinBalance = ctContext?.getCTCoinBalance;

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [isCtModalOpen, setIsCtModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const contactRef = useRef(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (contactRef.current && !contactRef.current.contains(e.target)) {
        setContactOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'EP';

  const firstName = user?.name
    ? user.name.trim().split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : '';

  const tier = ctCoins?.tierInfo;

  // Prioritize active wallet balance or authenticated CT coin balance
  const activeCtcoins = connected
    ? (typeof getCTCoinBalance === 'function' ? getCTCoinBalance() : ctcoins)
    : (ctCoins?.balance ?? ctcoins ?? 0);

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-primary-green/95 backdrop-blur-md border-b border-primary-green shadow-sm transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative w-36 sm:w-44 h-10 sm:h-12 shrink-0 rounded-lg overflow-hidden">
            <Image
              src="/images/logo.png"
              alt="Encamp Privé Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-2.5 sm:gap-4">

          {/* Contact popover */}
          <div className="relative" ref={contactRef}>
            <button
              id="navbar-contact-btn"
              type="button"
              onClick={() => {
                setContactOpen((v) => !v);
                setOpen(false);
              }}
              className="flex items-center gap-1.5 sm:gap-2 text-xs font-semibold tracking-wider text-stone-200 hover:text-[#dfa62f] transition-all py-1.5 px-2.5 sm:px-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer select-none"
              aria-label="Contact options"
              aria-expanded={contactOpen}
            >
              <Phone className="w-3.5 h-3.5 text-[#dfa62f]" />
              <span className="tracking-wider text-xs font-semibold hidden sm:inline">Contact Us</span>
              <ChevronDown className={`w-3 h-3 text-stone-400 transition-transform duration-200 ${contactOpen ? 'rotate-180' : ''}`} />
            </button>

            {contactOpen && (
              <div className="absolute right-0 top-full mt-2.5 w-64 bg-primary-green border border-[#dfa62f]/30 rounded-2xl shadow-2xl p-3 z-50 animate-fade-in text-stone-100">
                <div className="px-2 pt-1 pb-2 border-b border-white/10 mb-2">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-[#dfa62f]">
                    Contact Concierge
                  </p>
                </div>

                {/* Call option */}
                <a
                  href="tel:+919643182259"
                  onClick={() => setContactOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-[#dfa62f]/20 mb-1.5"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-[#dfa62f]/15 border border-[#dfa62f]/40 flex items-center justify-center shrink-0 group-hover:bg-[#dfa62f] transition-all">
                    <Phone className="w-4 h-4 text-[#dfa62f] group-hover:text-primary-green" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Call Us</p>
                    <p className="text-xs font-bold text-stone-100 tracking-wider group-hover:text-[#dfa62f] transition-colors mt-0.5">
                      +91 96431 82259
                    </p>
                  </div>
                </a>

                {/* Email option */}
                <a
                  href="mailto:info@encampadventures.com"
                  onClick={() => setContactOpen(false)}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-all group border border-transparent hover:border-[#dfa62f]/20"
                >
                  <div className="w-8.5 h-8.5 rounded-full bg-[#dfa62f]/15 border border-[#dfa62f]/40 flex items-center justify-center shrink-0 group-hover:bg-[#dfa62f] transition-all">
                    <Mail className="w-4 h-4 text-[#dfa62f] group-hover:text-primary-green" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold">Email Us</p>
                    <p className="text-xs font-bold text-stone-100 group-hover:text-[#dfa62f] transition-colors mt-0.5 truncate">
                      info@encampadventures.com
                    </p>
                  </div>
                </a>
              </div>
            )}
          </div>

          {/* Auth state */}
          {!isLoading && (
            isAuthenticated ? (
              /* ── User menu ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  id="navbar-user-menu-btn"
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full bg-white text-stone-900 border border-stone-200 hover:border-[#dfa62f] hover:bg-stone-50 transition-all shadow-sm cursor-pointer select-none"
                  aria-label="User menu"
                  aria-expanded={open}
                >
                  {/* Avatar */}
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-primary-green text-[#dfa62f] flex items-center justify-center text-[11px] font-bold flex-shrink-0 border border-[#dfa62f]/30"
                  >
                    {initials}
                  </div>

                  {firstName && (
                    <span className="text-xs font-bold text-stone-900 tracking-wide max-w-[100px] truncate">
                      {firstName}
                    </span>
                  )}

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 top-full mt-3.5 w-64 bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-300/50 overflow-hidden z-50 animate-fade-in text-stone-900">
                    {/* User info */}
                    <div className="px-4 py-3.5 border-b border-stone-100 bg-stone-50/70">
                      <p className="text-primary-green text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-stone-500 text-xs truncate mt-0.5">{user?.email}</p>
                      
                      {/* CT Coins Summary in Menu */}
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setIsCtModalOpen(true);
                        }}
                        className="w-full mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-between hover:bg-amber-100/70 transition-colors cursor-pointer text-left"
                      >
                        <div className="flex items-center gap-1.5">
                          <Coins className="w-3.5 h-3.5 text-[#dfa62f]" />
                          <span className="text-xs font-bold text-stone-800">{activeCtcoins.toLocaleString()} CTCoin</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-amber-200 text-stone-700">
                          Wallet & Redeem
                        </span>
                      </button>
                    </div>

                    {/* Nav items */}
                    <div className="py-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          setIsCtModalOpen(true);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-primary-green hover:bg-stone-50 font-semibold transition-colors text-left cursor-pointer"
                      >
                        <Wallet className="w-4 h-4 text-[#dfa62f]" />
                        CarbonTrace Wallet & Redeem
                      </button>
                      <Link
                        href="/profile"
                        id="navbar-profile-link"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-primary-green hover:bg-stone-50 font-semibold transition-colors"
                      >
                        <User className="w-4 h-4 text-stone-400" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile?tab=settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-primary-green hover:bg-stone-50 font-semibold transition-colors"
                      >
                        <Settings className="w-4 h-4 text-stone-400" />
                        Account Settings
                      </Link>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-stone-100 p-1.5">
                      <button
                        id="navbar-logout-btn"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* ── Sign In button ── */
              <Link
                id="navbar-signin-btn"
                href="/login"
                className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[#dfa62f] via-[#f0c85a] to-[#dfa62f] text-primary-green text-xs font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_15px_rgba(223,166,47,0.35)] transition-all active:scale-95 border border-[#f0c85a]/40"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>

      {/* CarbonTrace SDK Wallet & Redemption Modal */}
      <CarbonTraceWalletModal
        isOpen={isCtModalOpen}
        onClose={() => setIsCtModalOpen(false)}
      />
    </header>
  );
}
