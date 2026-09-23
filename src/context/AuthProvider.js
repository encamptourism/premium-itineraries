'use client';

import { useState, useEffect, useCallback } from 'react';
import { AuthContext } from './AuthContext';
import { logoutAction, getMeAction } from '@/app/actions/auth';
import SplashScreen from '@/components/common/SplashScreen';

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

export default function AuthProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE);

  const fetchUserData = useCallback(async () => {
    try {
      const data = await getMeAction();
      if (!data || !data.success) {
        setState({ ...INITIAL_STATE, isLoading: false });
        return;
      }
      setState({
        user: data.user,
        ctCoins: data.ctCoins || null,
        carbonTraceToken: data.carbontraceToken,
        bookings: data.bookings || [],
        preferences: data.preferences,
        documents: data.documents || [],
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (err) {
      console.error('[AuthProvider] Failed to fetch user session:', err.message);
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
    window.location.href = '/login';
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, refreshUser, logout }}>
      <SplashScreen />
      {children}
    </AuthContext.Provider>
  );
}
