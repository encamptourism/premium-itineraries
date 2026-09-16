'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Coins, Wallet, ShieldCheck, RefreshCw, CheckCircle2, Tag } from 'lucide-react';
import { useCarbonTrace } from '@/context/CarbonTraceContext';

export default function CarbonTraceWalletModal({ isOpen, onClose, premiumPrice = 151000, luxuryPrice = 185000, carbonFootprint = 12.8, initialPackage = 'premium' }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    connected,
    address,
    ctcoins,
    isConnecting,
    connectWallet,
    disconnectWallet,
    getCTCoinBalance,
    setCheckoutData,
    appliedRedemption,
    applyDiscount,
  } = useCarbonTrace();

  const userCoins = typeof getCTCoinBalance === 'function' ? getCTCoinBalance() : (ctcoins || 0);
  const [selectedPackage, setSelectedPackage] = useState(initialPackage || 'premium');
  const [requestedCoins, setRequestedCoins] = useState(appliedRedemption?.amount || Math.min(userCoins, 1500));
  const [discountApplied, setDiscountApplied] = useState(false);

  // Sync initial package tab when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPackage(initialPackage || 'premium');
    }
  }, [isOpen, initialPackage]);

  const activePrice = selectedPackage === 'luxury' ? (luxuryPrice || 185000) : (premiumPrice || 151000);
  const maxRedeemable = Math.min(userCoins, activePrice);

  // Sync active invoice & carbon footprint when modal opens or package selection changes
  useEffect(() => {
    if (isOpen && typeof setCheckoutData === 'function') {
      setCheckoutData({
        invoiceAmount: activePrice,
        carbonFootprint: carbonFootprint || 12.8,
      });
    }
  }, [isOpen, selectedPackage, activePrice, carbonFootprint, setCheckoutData]);

  if (!isOpen || !mounted) return null;

  const handleApplyRedemption = () => {
    const coinsToRedeem = Math.min(Math.max(0, Number(requestedCoins) || 0), maxRedeemable);
    if (typeof applyDiscount === 'function') {
      applyDiscount(coinsToRedeem, selectedPackage);
      setDiscountApplied(true);
    }
  };

  const currentApplied = appliedRedemption?.amount || 0;
  const netPackagePrice = Math.max(0, activePrice - currentApplied);

  return createPortal(
    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-stone-200 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-3 border-b border-stone-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-amber-100 border border-amber-300 flex items-center justify-center text-[#dfa62f]">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg sm:text-xl font-bold text-forest uppercase tracking-wide">
                CarbonTrace Wallet & CTCoin Discount
              </h3>
              <p className="text-xs text-stone-500">
                {connected ? (
                  <span>Wallet: <code className="font-mono bg-stone-100 px-1.5 py-0.5 rounded text-forest font-bold">{address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}</code> · Balance: <strong className="text-[#dfa62f]">{userCoins.toLocaleString()} CTCoin</strong></span>
                ) : (
                  'Connect your wallet to redeem CTCoin savings on package prices'
                )}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto space-y-4 py-1 flex-1 min-h-[300px]">
          {/* Package Selection Tabs */}
          <div className="bg-stone-100 p-1 rounded-2xl grid grid-cols-2 gap-1 text-center">
            <button
              type="button"
              onClick={() => setSelectedPackage('premium')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPackage === 'premium'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Premium Package (₹{Number(premiumPrice).toLocaleString()})
            </button>

            <button
              type="button"
              onClick={() => setSelectedPackage('luxury')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedPackage === 'luxury'
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Luxury Package (₹{Number(luxuryPrice).toLocaleString()})
            </button>
          </div>

          {!connected ? (
            <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-6 text-center space-y-4 my-auto">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-[#dfa62f] mx-auto flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-forest text-base">Connect CarbonTrace Wallet</h4>
                <p className="text-xs text-stone-600 max-w-sm mx-auto mt-1">
                  Connect your wallet to redeem CTCoin credits and subtract savings directly from the package price.
                </p>
              </div>
              <button
                type="button"
                onClick={connectWallet}
                disabled={isConnecting}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-forest text-ivory text-xs font-bold uppercase tracking-wider hover:bg-forest-light transition-all disabled:opacity-50 cursor-pointer shadow-md"
              >
                {isConnecting ? (
                  <RefreshCw className="w-4 h-4 animate-spin text-gold" />
                ) : (
                  <Wallet className="w-4 h-4 text-gold" />
                )}
                <span>{isConnecting ? 'Connecting Wallet...' : 'Connect CarbonTrace Wallet'}</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Package Net Price Calculation Box */}
              <div className="bg-gradient-to-r from-forest to-forest-dark text-white rounded-2xl p-4 sm:p-5 shadow-sm space-y-2">
                <div className="flex items-center justify-between text-xs text-stone-300">
                  <span className="uppercase font-bold tracking-wider">
                    {selectedPackage === 'luxury' ? 'Luxury Package' : 'Premium Package'} Total
                  </span>
                  <span>Carbon Footprint: {carbonFootprint} kg CO₂</span>
                </div>

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    {currentApplied > 0 && (
                      <span className="line-through text-stone-300 text-sm font-medium mr-2">
                        ₹{activePrice.toLocaleString()}/-
                      </span>
                    )}
                    <span className="text-2xl sm:text-3xl font-poppins font-black text-gold">
                      ₹{netPackagePrice.toLocaleString()}/-
                    </span>
                  </div>

                  {currentApplied > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold">
                      <Tag className="w-3.5 h-3.5" />
                      -₹{currentApplied.toLocaleString()} CTCoin Discount
                    </span>
                  )}
                </div>
              </div>

              {/* CTCoin Redemption Selector Control */}
              <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-forest uppercase tracking-wider">
                    Redeem CTCoins for Discount
                  </label>
                  <span className="text-xs font-semibold text-stone-600">
                    Max Available: <strong className="text-[#dfa62f]">{userCoins.toLocaleString()} CTCoin</strong>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={0}
                    max={maxRedeemable}
                    value={requestedCoins}
                    onChange={(e) => setRequestedCoins(Math.max(0, parseInt(e.target.value, 10) || 0))}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-300 font-mono font-bold text-sm bg-white focus:outline-none focus:ring-2 focus:ring-forest"
                    placeholder="Enter coins to redeem"
                  />
                  <button
                    type="button"
                    onClick={() => setRequestedCoins(maxRedeemable)}
                    className="px-3 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Max ({maxRedeemable})
                  </button>
                  <button
                    type="button"
                    onClick={handleApplyRedemption}
                    className="px-4 py-2 rounded-xl bg-forest hover:bg-forest-light text-ivory text-xs font-bold transition-colors cursor-pointer shadow-xs"
                  >
                    Apply Discount
                  </button>
                </div>

                {discountApplied && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold pt-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Redemption of {currentApplied.toLocaleString()} CTCoin applied to {selectedPackage} package price!</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Invisible SDK Target Containers for CarbonTrace integration */}
          <div className="hidden" aria-hidden="true">
            <div id="ct_wallet" />
            <div id="ct_onboarding" />
            <div id="checkoutdata" />
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 mt-2 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-forest" />
            <span>Official CarbonTrace SDK Integration</span>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-forest text-ivory hover:bg-forest-light font-bold cursor-pointer transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
