'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { logoutAction } from '@/app/actions/auth';

const INITIAL_STATE = {
  user: null,
  ctCoins: null,
  carbonTraceToken: null,
  bookings: [],
  preferences: null,
  documents: [],
  isLoading: true,
  isAuthenticated: false,
};

/**
 * AuthProvider — wraps the entire app (mounted in root layout.js).
 *
 * On mount → calls GET /api/auth/me (server reads cookie, returns user + CT Coins).
 * If authenticated → hydrates context with user data, CT Coins, and bookings.
 * Provides refreshUser() to re-hydrate after a booking.
 * Provides logout() to clear cookie + state.
 */
export default function AuthProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  const fetchUserData = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me', { credentials: 'same-origin', cache: 'no-store' });
      if (!res.ok) {
        setState({ ...INITIAL_STATE, isLoading: false });
        return;
      }
      const data = await res.json();
      setState({
        user: data.user,
        ctCoins: data.ctCoins,
        carbonTraceToken: data.carbontraceToken,
        bookings: data.bookings || [],
        preferences: data.preferences,
        documents: data.documents || [],
        isLoading: false,
        isAuthenticated: true,
      });
    } catch {
      setState({ ...INITIAL_STATE, isLoading: false });
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const refreshUser = useCallback(() => {
    setState((prev) => ({ ...prev, isLoading: true }));
    return fetchUserData();
  }, [fetchUserData]);

  const logout = useCallback(async () => {
    await logoutAction();
    setState({ ...INITIAL_STATE, isLoading: false });
    // Force full reload so middleware cleans up and redirects to /login
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
