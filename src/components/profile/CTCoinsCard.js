'use client';

import { useEffect, useRef, useState } from 'react';
import { Coins, TrendingUp, ArrowUpRight, ArrowDownRight, Award, Shield, Crown, Gem } from 'lucide-react';

const TIER_ICONS = {
  Award,
  Shield,
  Crown,
  Gem,
};

export default function CTCoinsCard({ ctCoins }) {
  const [displayBalance, setDisplayBalance] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    if (!ctCoins?.balance) return;
    const target = ctCoins.balance;
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayBalance(Math.round(eased * target));
      if (progress < 1) animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [ctCoins?.balance]);

  if (!ctCoins) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-32 bg-stone-100 rounded-3xl" />
      </div>
    );
  }

  const { balance = 0, tierInfo, nextTier, progress = 0, transactions = [] } = ctCoins;
  const TierIcon = tierInfo?.icon ? TIER_ICONS[tierInfo.icon] || Award : Award;
  const NextTierIcon = nextTier?.icon ? TIER_ICONS[nextTier.icon] || Shield : Shield;

  return (
    <div className="space-y-5">
      <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-stone-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center">
                <Coins className="w-4 h-4 text-[#dfa62f]" />
              </div>
              <span className="text-stone-500 text-xs font-bold uppercase tracking-widest">CT Coins Balance</span>
            </div>
            <div className="text-3xl sm:text-4xl font-bold text-[#dfa62f] tabular-nums pt-1">
              {displayBalance.toLocaleString()}
            </div>
            <p className="text-stone-400 text-[11px]">Powered by Carbon Trace 3rd-Party API</p>
          </div>

          {tierInfo?.name && (
            <div className="flex flex-col items-end gap-2">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary-green/5 text-primary-green border border-primary-green/15 shadow-2xs">
                <TierIcon className="w-4 h-4 text-[#dfa62f]" />
                {tierInfo.name} Tier Member
              </span>
            </div>
          )}
        </div>

        {tierInfo && nextTier ? (
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 font-bold text-primary-green">
                <TierIcon className="w-3.5 h-3.5 text-[#dfa62f]" />
                {tierInfo?.name || ''} <span className="text-stone-400 font-normal">Current</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-primary-green">
                <NextTierIcon className="w-3.5 h-3.5 text-stone-400" />
                {nextTier?.name || ''} <span className="text-stone-400 font-normal">Next</span>
              </div>
            </div>

            <div className="relative h-2.5 bg-stone-100 rounded-full overflow-hidden border border-stone-200">
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${tierInfo?.color || 'var(--primary-green)'}, ${nextTier?.color || '#dfa62f'})`,
                }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-stone-500">
              <span>{balance.toLocaleString()} coins</span>
              {nextTier?.min && (
                <span className="font-semibold text-primary-green">
                  {(nextTier.min - balance).toLocaleString()} coins to {nextTier.name}
                </span>
              )}
            </div>
          </div>
        ) : null}
      </div>

      <div className="bg-amber-50/60 border border-amber-200/80 rounded-3xl p-5">
        <div className="flex items-center gap-2 mb-1.5">
          <TrendingUp className="w-4 h-4 text-[#dfa62f]" />
          <h4 className="text-xs font-bold text-primary-green uppercase tracking-wider">How to Earn CT Coins</h4>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          CT Coins are awarded by <span className="font-semibold text-primary-green">Carbon Trace</span> each time you complete an itinerary booking.
          Your coins represent your commitment to carbon-offset luxury travel.
        </p>
      </div>

      {transactions?.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 border-b border-stone-100 bg-stone-50/50">
            <h4 className="font-semibold text-primary-green text-xs uppercase tracking-wider">Transaction History</h4>
          </div>
          <div className="divide-y divide-stone-100">
            {transactions.map((txn) => (
              <div key={txn.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-stone-50 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    txn.type === 'earned' ? 'bg-emerald-50 border border-emerald-200' : 'bg-rose-50 border border-rose-200'
                  }`}>
                    {txn.type === 'earned'
                      ? <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600" />
                      : <ArrowDownRight className="w-3.5 h-3.5 text-rose-600" />}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-stone-800 truncate">{txn.description}</p>
                    <p className="text-[10px] text-stone-400">
                      {new Date(txn.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <span className={`text-xs font-bold flex-shrink-0 ml-2 ${
                  txn.type === 'earned' ? 'text-emerald-600' : 'text-rose-600'
                }`}>
                  {txn.type === 'earned' ? '+' : '-'}{txn.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
