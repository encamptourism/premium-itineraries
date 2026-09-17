'use client';

import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthContext';

export const CarbonTraceContext = createContext(null);

const CLIENT_ACCESS_TOKEN = process.env.NEXT_PUBLIC_CARBONTRACE_CLIENT_ACCESS_TOKEN || '';
const AUTH_PATHS = ['/login', '/register', '/verify-otp', '/forgot-password'];

export function getStoredSenderId(user) {
  if (user?.senderId) return user.senderId;
  if (user?.id) return user.id;
  if (user?._id) return user._id;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('ep_sender_id') || '';
  }
  return '';
}

function extractCTCoinBalance(snapshot, walletState) {
  if (typeof snapshot?.ctcoins?.amount === 'number') return snapshot.ctcoins.amount;
  if (typeof snapshot?.ctCoins?.balance === 'number') return snapshot.ctCoins.balance;
  if (typeof walletState?.walletSnapshot?.ctCoins?.balance === 'number') return walletState.walletSnapshot.ctCoins.balance;
  if (typeof walletState?.walletSnapshot?.ctcoins?.amount === 'number') return walletState.walletSnapshot.ctcoins.amount;
  if (typeof snapshot?.ctcoins === 'number') return snapshot.ctcoins;
  if (typeof snapshot?.ctCoins === 'number') return snapshot.ctCoins;
  return 0;
}

function extractOptInStatus(snapshot, walletState) {
  if (typeof snapshot?.optedIn === 'boolean') return snapshot.optedIn;
  if (typeof snapshot?.ctcoins?.optedIn === 'boolean') return snapshot.ctcoins.optedIn;
  if (typeof snapshot?.ctCoins?.optedIn === 'boolean') return snapshot.ctCoins.optedIn;
  if (typeof walletState?.walletSnapshot?.ctCoins?.optedIn === 'boolean') return walletState.walletSnapshot.ctCoins.optedIn;
  return Boolean(snapshot?.optedIn || snapshot?.ctcoins?.optedIn || snapshot?.ctCoins?.optedIn);
}

export function CarbonTraceProvider({ children }) {
  const pathname = usePathname() || '';
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  const auth = useAuth();
  const user = auth?.user || null;
  const isInitializedRef = useRef(false);

  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [walletState, setWalletState] = useState({
    connected: false,
    address: null,
    senderId: getStoredSenderId(user),
    algoBalance: 0,
    ctcoins: 0,
    optedIn: false,
    isConnecting: false,
    isOptingIn: false,
    error: null,
  });

  // Keep senderId in sync with logged in user if user state changes
  useEffect(() => {
    const currentSenderId = getStoredSenderId(user);
    setWalletState((prev) => (prev.senderId === currentSenderId ? prev : { ...prev, senderId: currentSenderId }));
  }, [user]);

  // Clean up or hide any floating SDK elements when on auth pages
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (isAuthPage) {
      const residualElements = document.querySelectorAll('[id^="ct_"], [id*="carbontrace"], iframe[src*="carbontrace"]');
      residualElements.forEach((el) => {
        if (el && el.parentElement && !el.closest('#ct_wallet') && !el.closest('#ct_onboarding')) {
          el.style.display = 'none';
        }
      });
      return;
    }

    const relocateTopFallbackElements = () => {
      const body = document.body;
      if (!body) return;

      const header = document.querySelector('header') || document.querySelector('nav');
      if (!header) return;

      const children = Array.from(body.children);
      children.forEach((child) => {
        if (child === header || child.contains(header) || child.tagName === 'SCRIPT') return;

        if (child.compareDocumentPosition(header) & Node.DOCUMENT_POSITION_FOLLOWING) {
          body.appendChild(child);
        }
      });
    };

    relocateTopFallbackElements();

    const observer = new MutationObserver(() => {
      relocateTopFallbackElements();
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    return () => observer.disconnect();
  }, [isAuthPage]);

  const updateWalletSnapshotState = useCallback((address, snapshot) => {
    const ctInstance = typeof window !== 'undefined' ? window.CarbontraceWallet : null;
    const balance = extractCTCoinBalance(snapshot, ctInstance?.walletState);
    const optedIn = extractOptInStatus(snapshot, ctInstance?.walletState);
    const algoBalance = snapshot?.algoBalance || snapshot?.balance || 0;

    setWalletState((prev) => ({
      ...prev,
      connected: Boolean(address),
      address: address || null,
      ctcoins: balance,
      algoBalance: algoBalance,
      optedIn: optedIn,
      error: null,
    }));
  }, []);

  const initializeSdk = useCallback(async () => {
    if (typeof window === 'undefined' || !window.CarbontraceWallet || isAuthPage) return false;

    try {
      await window.CarbontraceWallet.init({
        token: CLIENT_ACCESS_TOKEN,
        walletContainer: 'ct_wallet',
        onboardingContainer: 'ct_onboarding',
        embedWallet: false,
        autoManageUi: true,
        isMandatory: true,
        onConnect: (address, snapshot) => {
          updateWalletSnapshotState(address, snapshot);
        },
        onDisconnect: () => {
          setWalletState((prev) => ({
            ...prev,
            connected: false,
            address: null,
            algoBalance: 0,
            ctcoins: 0,
            optedIn: false,
            error: null,
          }));
        },
        onChainConfirmed: () => {
          if (window.CarbontraceWallet?.walletState) {
            const state = window.CarbontraceWallet.walletState;
            updateWalletSnapshotState(state.address, state.walletSnapshot);
          }
        },
      });

      isInitializedRef.current = true;

      if (window.CarbontraceWallet?.walletState?.address) {
        const state = window.CarbontraceWallet.walletState;
        updateWalletSnapshotState(state.address, state.walletSnapshot);
      }
      return true;
    } catch (err) {
      console.warn('[CarbonTrace SDK Init Notice]:', err?.message || err);
      return false;
    }
  }, [updateWalletSnapshotState, isAuthPage]);

  const handleScriptLoad = () => {
    setSdkLoaded(true);
    initializeSdk();
  };

  const connectWallet = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));
    try {
      if (typeof window !== 'undefined') {
        if (!window.CarbontraceWallet) {
          throw new Error('CarbonTrace SDK script is loading or unavailable.');
        }

        if (!isInitializedRef.current) {
          await initializeSdk();
        }

        const res = await window.CarbontraceWallet.connectWallet();
        const ctState = window.CarbontraceWallet?.walletState || window.CarbontraceWallet?.state;
        const address = res?.address || res?.account || ctState?.address || ctState?.account;
        const snapshot = res?.snapshot || res?.walletSnapshot || ctState?.walletSnapshot || ctState?.snapshot;

        if (address) {
          updateWalletSnapshotState(address, snapshot);
        }
      }
    } catch (err) {
      console.error('[CarbonTrace Wallet Connect Error]:', err);
      setWalletState((prev) => ({
        ...prev,
        error: err?.message || 'Failed to connect CarbonTrace Wallet.',
      }));
    } finally {
      setWalletState((prev) => ({ ...prev, isConnecting: false }));
    }
  }, [initializeSdk, updateWalletSnapshotState]);

  const disconnectWallet = useCallback(async () => {
    try {
      if (typeof window !== 'undefined' && window.CarbontraceWallet?.disconnectWallet) {
        await window.CarbontraceWallet.disconnectWallet();
      }
    } catch (err) {
      console.error('[CarbonTrace Wallet Disconnect Error]:', err);
    } finally {
      setWalletState((prev) => ({
        ...prev,
        connected: false,
        address: null,
        algoBalance: 0,
        ctcoins: 0,
        optedIn: false,
        error: null,
      }));
    }
  }, []);

  const optInCTCoins = useCallback(async () => {
    setWalletState((prev) => ({ ...prev, isOptingIn: true, error: null }));
    try {
      if (typeof window !== 'undefined' && window.CarbontraceWallet?.optInCTCoins) {
        await window.CarbontraceWallet.optInCTCoins();
        setWalletState((prev) => ({ ...prev, optedIn: true }));
      } else {
        setWalletState((prev) => ({
          ...prev,
          error: 'CarbonTrace SDK is loading or unavailable.',
        }));
      }
    } catch (err) {
      console.error('[CarbonTrace Opt-In Error]:', err);
      setWalletState((prev) => ({
        ...prev,
        error: err?.message || 'CTCoin opt-in failed or was cancelled.',
      }));
    } finally {
      setWalletState((prev) => ({ ...prev, isOptingIn: false }));
    }
  }, []);

  const getCTCoinBalance = useCallback(() => {
    return walletState.ctcoins || 0;
  }, [walletState.ctcoins]);

  const setCheckoutData = useCallback(async ({ invoiceAmount, carbonFootprint, orderId, email, applyRedemption } = {}) => {
    if (typeof window !== 'undefined') {
      const checkoutElem = document.getElementById('checkoutdata');
      if (checkoutElem) {
        if (invoiceAmount !== undefined && invoiceAmount !== null) {
          checkoutElem.setAttribute('data-invoice_amount', String(invoiceAmount));
        }
        if (carbonFootprint !== undefined && carbonFootprint !== null) {
          checkoutElem.setAttribute('data-carbon_footprint', String(carbonFootprint));
        }
      }

      if (window.CarbontraceWallet?.captureData) {
        try {
          await window.CarbontraceWallet.captureData({
            saleData: {
              sale_order_id: orderId || `EP-ITIN-${Date.now()}`,
              invoice_value: Number(invoiceAmount) || 0,
              carbon_footprint: Number(carbonFootprint) || 0,
              email: email || '',
              apply_redemption: Boolean(applyRedemption),
            },
          });
          return true;
        } catch (err) {
          console.warn('[CarbonTrace SDK setCheckoutData Notice]:', err?.message || err);
        }
      }
    }
    return false;
  }, []);

  const captureData = useCallback(async (saleData) => {
    try {
      if (typeof window !== 'undefined' && window.CarbontraceWallet?.captureData) {
        await window.CarbontraceWallet.captureData({ saleData });
        return true;
      }
    } catch (err) {
      console.warn('[CarbonTrace SDK captureData Notice]:', err?.message || err);
    }
    return false;
  }, []);

  const [appliedRedemption, setAppliedRedemption] = useState({
    amount: 0,
    packageType: null,
  });

  const applyDiscount = useCallback((amount, packageType = null) => {
    setAppliedRedemption({
      amount: Math.max(0, Number(amount) || 0),
      packageType: packageType || null,
    });
  }, []);

  const value = {
    sdkLoaded,
    ...walletState,
    connectWallet,
    disconnectWallet,
    optInCTCoins,
    getCTCoinBalance,
    captureData,
    setCheckoutData,
    appliedRedemption,
    applyDiscount,
  };

  return (
    <CarbonTraceContext.Provider value={value}>
      {!isAuthPage && (
        <>
          <Script
            src="https://admin.carbontrace.in/js/carbon-sdk-bundle.js"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
            onError={(e) => console.warn('[CarbonTrace SDK Load Error]:', e)}
          />
          <div
            id="ct_wallet"
            style={{
              position: 'fixed',
              bottom: '80px',
              right: '20px',
              zIndex: 99999,
              maxWidth: '420px',
              width: 'auto',
            }}
          />
          <div id="ct_onboarding" />
        </>
      )}
      {children}
    </CarbonTraceContext.Provider>
  );
}

export function useCarbonTrace() {
  const ctx = useContext(CarbonTraceContext);
  if (!ctx) {
    throw new Error('useCarbonTrace must be used inside <CarbonTraceProvider>');
  }
  return ctx;
}
