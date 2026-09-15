'use client';

import { useState, useEffect } from 'react';
import { Coins, Wallet, ShieldAlert, CheckCircle, Plus, Minus, RefreshCw } from 'lucide-react';
import { useCarbonTrace } from '@/context/CarbonTraceContext';

export default function CTCoinRedemption({ onChange }) {
  const {
    connected,
    address,
    senderId,
    optedIn,
    isConnecting,
    isOptingIn,
    error,
    connectWallet,
    disconnectWallet,
    optInCTCoins,
    getCTCoinBalance,
  } = useCarbonTrace();

  const availableCtcoins = getCTCoinBalance();
  const [requestedCoins, setRequestedCoins] = useState(0);

  // Sync redemption selection back to parent whenever values change
  useEffect(() => {
    const redeemCtcoins = Math.min(Math.max(0, Number(requestedCoins) || 0), availableCtcoins);
    if (onChange) {
      onChange({
        applyRedemption: redeemCtcoins > 0,
        senderId: senderId || '',
        redeemCtcoins: redeemCtcoins,
      });
    }
  }, [requestedCoins, availableCtcoins, senderId, onChange]);

  const handleDecrease = () => {
    setRequestedCoins((prev) => Math.max(0, prev - 1));
  };

  const handleIncrease = () => {
    setRequestedCoins((prev) => Math.min(availableCtcoins, prev + 1));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (isNaN(val)) {
      setRequestedCoins(0);
      return;
    }
    if (val < 0) setRequestedCoins(0);
    else if (val > availableCtcoins) setRequestedCoins(availableCtcoins);
    else setRequestedCoins(val);
  };

  return (
    <div className="bg-amber-50/40 border border-amber-200/70 rounded-2xl p-4 sm:p-5 space-y-4 text-stone-800">
      {/* Section Header */}
      <div className="flex items-center justify-between flex-wrap gap-2 pb-3 border-b border-amber-200/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 border border-amber-300/80 flex items-center justify-center text-[#dfa62f]">
            <Coins className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-forest">CarbonTrace CTCoin Redemption</h4>
            <p className="text-[11px] text-stone-500">Offset your travel & redeem earned CTCoin credits</p>
          </div>
        </div>

        {/* Wallet Connect/Disconnect Action */}
        <div>
          {!connected ? (
            <button
              type="button"
              onClick={connectWallet}
              disabled={isConnecting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-forest text-ivory text-xs font-bold hover:bg-forest-light transition-all disabled:opacity-50 cursor-pointer shadow-xs"
            >
              {isConnecting ? (
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Wallet className="w-3.5 h-3.5 text-gold" />
              )}
              <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono bg-white border border-amber-200 px-2 py-0.5 rounded-md text-stone-600">
                {address ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}` : 'Connected'}
              </span>
              <button
                type="button"
                onClick={disconnectWallet}
                className="text-[11px] font-semibold text-rose-600 hover:underline cursor-pointer"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Wallet State Details */}
      {connected && (
        <div className="space-y-3 pt-1">
          {/* Balance & Opt-in Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-white rounded-xl p-3 border border-amber-200/60 shadow-2xs">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Available CTCoin</span>
              <div className="text-xl font-bold text-[#dfa62f] font-poppins">{availableCtcoins.toLocaleString()}</div>
            </div>

            <div className="bg-white rounded-xl p-3 border border-amber-200/60 shadow-2xs flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider">Asset Opt-In Status</span>
              {optedIn ? (
                <div className="flex items-center gap-1.5 text-emerald-600 text-xs font-bold">
                  <CheckCircle className="w-4 h-4" />
                  <span>Opted Into CTCoin</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={optInCTCoins}
                  disabled={isOptingIn}
                  className="mt-1 inline-flex items-center justify-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-600 text-white text-xs font-semibold hover:bg-amber-700 transition-all disabled:opacity-50 cursor-pointer"
                >
                  {isOptingIn ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ShieldAlert className="w-3 h-3" />}
                  <span>{isOptingIn ? 'Opting in...' : 'Opt-In CTCoin'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Redemption Input Counter */}
          <div className="bg-white rounded-xl p-3.5 border border-amber-200/60 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-stone-700">Use CTCoin for Booking</label>
              <span className="text-xs font-mono font-bold text-forest">
                CTCoin to redeem: <strong className="text-[#dfa62f] font-bold">{requestedCoins}</strong>
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDecrease}
                disabled={requestedCoins <= 0}
                className="w-9 h-9 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              >
                <Minus className="w-4 h-4" />
              </button>

              <input
                type="number"
                min={0}
                max={availableCtcoins}
                value={requestedCoins}
                onChange={handleInputChange}
                className="flex-1 text-center py-2 px-3 rounded-xl border border-stone-300 font-mono font-bold text-sm focus:outline-none focus:ring-2 focus:ring-forest"
              />

              <button
                type="button"
                onClick={handleIncrease}
                disabled={requestedCoins >= availableCtcoins}
                className="w-9 h-9 rounded-xl border border-stone-200 bg-stone-50 hover:bg-stone-100 flex items-center justify-center text-stone-700 disabled:opacity-40 transition-all cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {availableCtcoins > 0 && (
              <div className="flex justify-between items-center text-[10px] text-stone-400 pt-1">
                <span>Min: 0</span>
                <button
                  type="button"
                  onClick={() => setRequestedCoins(availableCtcoins)}
                  className="text-forest hover:underline font-semibold cursor-pointer"
                >
                  Use Max ({availableCtcoins})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {!connected && (
        <p className="text-[11px] text-stone-500 italic">
          Connect your wallet to view available CTCoin balance and apply redemption to this booking.
        </p>
      )}
    </div>
  );
}
