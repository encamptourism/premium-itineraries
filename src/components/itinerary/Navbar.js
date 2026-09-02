'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, User, LogOut, ChevronDown, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, ctCoins, isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'EP';

  const tier = ctCoins?.tierInfo;

  const handleLogout = async () => {
    setOpen(false);
    await logout();
  };

  return (
    <header className="sticky top-0 z-50 bg-[#020d07]/95 backdrop-blur-md border-b border-[#082213] shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 sm:h-14 flex items-center justify-between">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group">
          <div className="relative w-28 sm:w-32 h-7 sm:h-9 shrink-0 rounded-lg overflow-hidden">
            <Image
              src="/images/logo.jpeg"
              alt="Encamp Privé Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Phone (desktop) */}
          <a
            href="tel:+918794756611"
            className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-200 hover:text-[#dfa62f] transition-all py-1.5 px-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#dfa62f]" />
            <span className="tracking-widest text-[11px] font-medium">+91 87947 56611</span>
          </a>

          {/* Auth state */}
          {!isLoading && (
            isAuthenticated ? (
              /* ── User menu ── */
              <div className="relative" ref={dropdownRef}>
                <button
                  id="navbar-user-menu-btn"
                  onClick={() => setOpen((v) => !v)}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-white text-stone-900 border border-stone-200 hover:border-[#dfa62f] hover:bg-stone-50 transition-all shadow-sm"
                  aria-label="User menu"
                  aria-expanded={open}
                >
                  {/* Avatar */}
                  <div
                    className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#062212] text-[#dfa62f] flex items-center justify-center text-[11px] font-bold flex-shrink-0 border border-[#dfa62f]/30"
                  >
                    {initials}
                  </div>

                  <ChevronDown
                    className={`w-3.5 h-3.5 text-stone-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Dropdown */}
                {open && (
                  <div className="absolute right-0 top-full mt-3.5 w-60 bg-white border border-stone-200 rounded-2xl shadow-xl shadow-stone-300/50 overflow-hidden z-50 animate-fade-in text-stone-900">
                    {/* User info */}
                    <div className="px-4 py-3.5 border-b border-stone-100 bg-stone-50/70">
                      <p className="text-[#062212] text-sm font-bold truncate">{user?.name}</p>
                      <p className="text-stone-500 text-xs truncate mt-0.5">{user?.email}</p>
                      {tier && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold mt-1.5 px-2.5 py-0.5 rounded-full bg-[#062212]/5 text-[#062212] border border-[#062212]/15">
                          {tier.name} Member
                        </span>
                      )}
                    </div>

                    {/* Nav items */}
                    <div className="py-1.5">
                      <Link
                        href="/profile"
                        id="navbar-profile-link"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-[#062212] hover:bg-stone-50 font-semibold transition-colors"
                      >
                        <User className="w-4 h-4 text-[#dfa62f]" />
                        My Profile
                      </Link>
                      <Link
                        href="/profile?tab=settings"
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-stone-700 hover:text-[#062212] hover:bg-stone-50 font-semibold transition-colors"
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
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-xl font-semibold transition-colors"
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
                className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[#dfa62f] via-[#f0c85a] to-[#dfa62f] text-[#020d07] text-xs font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_15px_rgba(223,166,47,0.35)] transition-all active:scale-95 border border-[#f0c85a]/40"
              >
                Sign In
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}
