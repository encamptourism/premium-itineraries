'use client';

import Image from 'next/image';
import { User, MapPin, Coins, Calendar, Shield, Award, Crown, Gem, Quote } from 'lucide-react';

const TIER_ICONS = {
  Award,
  Shield,
  Crown,
  Gem,
};

/**
 * ProfileHeaderCard — Compact, light & elegant Landscape Header Card with Avatar & Bio.
 */
export default function ProfileHeaderCard({ user, ctCoins }) {
  const avatarUrl = user?.avatar || user?.photo || user?.photoUrl;
  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'EP';

  const joinedYear = user?.joinedAt || user?.createdAt
    ? new Date(user.joinedAt || user.createdAt).getFullYear()
    : '—';

  const tier = ctCoins?.tierInfo;
  const TierIcon = tier?.icon ? TIER_ICONS[tier.icon] || Award : Award;

  return (
    <div className="w-full bg-white border border-stone-200/90 rounded-2xl p-3.5 sm:p-5 overflow-hidden text-stone-900 mb-5 shadow-xs">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6">

        {/* Left Side: Compact Avatar & User Details */}
        <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-4 w-full md:w-auto">
          {/* Avatar Box */}
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary-green border border-[#dfa62f]/40 overflow-hidden flex items-center justify-center text-xl sm:text-2xl font-bold text-[#dfa62f] shadow-sm flex-shrink-0">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user?.name || 'Profile Avatar'}
                className="w-full h-full object-cover"
              />
            ) : (
              initials
            )}
          </div>

          {/* User Details */}
          <div className="space-y-1 max-w-lg">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
              <h2 className="text-xl sm:text-2xl font-bold text-primary-green leading-tight">
                {user?.name || 'Member'}
              </h2>
              {tier && (
                <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-primary-green/5 text-primary-green border border-primary-green/15">
                  <TierIcon className="w-3.5 h-3.5 text-[#dfa62f]" />
                  {tier.name} Member
                </span>
              )}
            </div>

            <p className="text-stone-500 text-xs sm:text-sm font-medium">{user?.email}</p>

            {/* Phone & Role */}
            <div className="flex items-center justify-center sm:justify-start gap-4 text-xs text-stone-400 pt-0.5">
              {(user?.mobile || user?.phone) && (
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-[#dfa62f]" />
                  {user.mobile || user.phone}
                </span>
              )}

              {user?.role && (
                <span className="flex items-center gap-1 capitalize">
                  <MapPin className="w-3.5 h-3.5 text-[#dfa62f]" />
                  {user.role} Account
                </span>
              )}
            </div>

            {/* Profile Bio */}
            {user?.profileBio && (
              <p className="text-xs text-stone-600 italic pt-1 flex items-start justify-center sm:justify-start gap-1 leading-relaxed">
                <Quote className="w-3 h-3 text-[#dfa62f] flex-shrink-0 mt-0.5" />
                <span>"{user.profileBio}"</span>
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Compact CT Coins & Member Since Stat Cards */}
        <div className="grid grid-cols-2 gap-3 w-full md:w-auto flex-shrink-0">
          {/* CT Coins Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-center min-w-[110px] sm:min-w-[130px] shadow-2xs">
            <div className="flex items-center justify-center gap-1 text-[#dfa62f] mb-0.5">
              <Coins className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-[#dfa62f]">
              {ctCoins?.balance?.toLocaleString() ?? '—'}
            </div>
            <div className="text-[9px] text-stone-400 uppercase tracking-widest font-semibold">CT COINS</div>
          </div>

          {/* Member Since Box */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl px-4 py-2.5 text-center min-w-[110px] sm:min-w-[130px] shadow-2xs">
            <div className="flex items-center justify-center gap-1 text-stone-400 mb-0.5">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="text-lg sm:text-xl font-bold text-primary-green">
              {joinedYear}
            </div>
            <div className="text-[9px] text-stone-400 uppercase tracking-widest font-semibold">MEMBER SINCE</div>
          </div>
        </div>

      </div>
    </div>
  );
}
