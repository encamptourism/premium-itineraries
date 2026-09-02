'use client';

import { createContext, useContext } from 'react';

/**
 * AuthContext — global state available to every Client Component.
 *
 * Shape:
 *   user              → { id, name, email, phone, role, avatar, joinedAt }
 *   ctCoins           → { balance, tierInfo, nextTier, progress, transactions[] }
 *   carbonTraceToken  → string (Carbon Trace API auth token)
 *   bookings          → Booking[]
 *   preferences       → user preferences object
 *   documents         → Document[]
 *   isLoading         → boolean (true during initial /api/auth/me fetch)
 *   isAuthenticated   → boolean
 *   refreshUser()     → re-fetches /api/auth/me + CT Coins
 *   logout()          → clears cookie + context state
 *
 * Usage:
 *   import { useAuth } from '@/context/AuthContext';
 *   const { user, ctCoins, isAuthenticated } = useAuth();
 */

export const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
