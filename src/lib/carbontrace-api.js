export const CT_TIERS = [
  { name: 'Bronze', min: 0, max: 999, color: '#cd7f32', bg: '#fdf3e7', icon: 'Award', textColor: '#7c4d1e' },
  { name: 'Silver', min: 1000, max: 4999, color: '#9e9e9e', bg: '#f5f5f5', icon: 'Shield', textColor: '#4a4a4a' },
  { name: 'Gold', min: 5000, max: 14999, color: '#dfa62f', bg: '#fdf6e3', icon: 'Crown', textColor: '#7a5500' },
  { name: 'Platinum', min: 15000, max: Infinity, color: '#a855f7', bg: '#f5f0ff', icon: 'Gem', textColor: '#6b21a8' },
];

export function getTierInfo(balance = 0) {
  return CT_TIERS.find((t) => balance >= t.min && balance <= t.max) || CT_TIERS[0];
}

export function getNextTier(balance = 0) {
  const idx = CT_TIERS.findIndex((t) => balance >= t.min && balance <= t.max);
  return CT_TIERS[idx + 1] || null;
}

export function getTierProgress(balance = 0) {
  const current = getTierInfo(balance);
  const next = getNextTier(balance);
  if (!next) return 100;
  const range = next.min - current.min;
  const earned = balance - current.min;
  return Math.min(100, Math.round((earned / range) * 100));
}

const CARBONTRACE_API_URL = process.env.CARBONTRACE_API_URL || process.env.NEXT_PUBLIC_CARBONTRACE_API_URL || '';

export async function getCTCoins(carbontraceToken) {
  if (!carbontraceToken || !CARBONTRACE_API_URL) {
    return {
      balance: 0,
      tierInfo: getTierInfo(0),
      nextTier: getNextTier(0),
      progress: getTierProgress(0),
      transactions: [],
    };
  }

  try {
    const res = await fetch(`${CARBONTRACE_API_URL.replace(/\/+$/, '')}/coins`, {
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${carbontraceToken}`,
      },
    });

    if (!res.ok) {
      return {
        balance: 0,
        tierInfo: getTierInfo(0),
        nextTier: getNextTier(0),
        progress: getTierProgress(0),
        transactions: [],
      };
    }

    const data = await res.json();
    const balance = data.balance || 0;
    return {
      balance,
      tierInfo: getTierInfo(balance),
      nextTier: getNextTier(balance),
      progress: getTierProgress(balance),
      transactions: data.transactions || [],
    };
  } catch {
    return {
      balance: 0,
      tierInfo: getTierInfo(0),
      nextTier: getNextTier(0),
      progress: getTierProgress(0),
      transactions: [],
    };
  }
}

export async function registerBooking(carbontraceToken, bookingData) {
  if (!carbontraceToken || !CARBONTRACE_API_URL) {
    return { coinsEarned: 0, newBalance: 0 };
  }

  try {
    const res = await fetch(`${CARBONTRACE_API_URL.replace(/\/+$/, '')}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${carbontraceToken}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!res.ok) return { coinsEarned: 0, newBalance: 0 };
    return res.json();
  } catch {
    return { coinsEarned: 0, newBalance: 0 };
  }
}
