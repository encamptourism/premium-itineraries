import { cookies } from 'next/headers';

export const ACCESS_TOKEN_COOKIE = 'ep_access_token';
export const REFRESH_TOKEN_COOKIE = 'ep_refresh_token';
export const USER_COOKIE = 'ep_user';

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days

const BASE_URL = (process.env.BASE_URL || '').replace(/\/+$/, '');
const AUTH_API_BASE_URL = (
  process.env.AUTH_API_BASE_URL ||
  process.env.NEXT_PUBLIC_AUTH_API_URL ||
  `${BASE_URL}/customer/auth`
).replace(/\/+$/, '');

// ── Mobile Number Helper (Prefix 91 to 10-digit mobile numbers) ──

export function formatMobileWith91(val) {
  if (!val) return '';
  const str = String(val).trim();
  if (str.includes('@')) return str;
  const digits = str.replace(/\D/g, '');
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

// ── Cookie Helpers (Store External Tokens Directly in HttpOnly Cookies) ──

export async function setAuthCookies({ accessToken, refreshToken, user }) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  };

  const tokenToSet = accessToken || 'session_active';
  cookieStore.set(ACCESS_TOKEN_COOKIE, tokenToSet, options);

  if (refreshToken) {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken, options);
  }
  if (user) {
    cookieStore.set(USER_COOKIE, JSON.stringify(user), options);
  }
}

export async function getAuthCookies() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value || null;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value || null;
  const rawUser = cookieStore.get(USER_COOKIE)?.value || null;

  let user = null;
  if (rawUser) {
    try {
      user = JSON.parse(rawUser);
    } catch {
      user = null;
    }
  }

  return { accessToken, refreshToken, user };
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(ACCESS_TOKEN_COOKIE);
  cookieStore.delete(REFRESH_TOKEN_COOKIE);
  cookieStore.delete(USER_COOKIE);
}

// ── External Auth API Calls ──

async function fetchAuthApi(endpoint, options = {}) {
  const url = `${AUTH_API_BASE_URL}/${endpoint.replace(/^\/+/, '')}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: { accept: '*/*', 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: AbortSignal.timeout(15000),
    });
    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = data?.message || data?.error || `Request failed with status ${res.status}`;
      return { success: false, error: msg };
    }
    return { success: data?.success ?? true, ...data };
  } catch (err) {
    return { success: false, error: err.message || 'Unable to connect to auth server.' };
  }
}

export async function loginUser(payload) {
  const formattedPayload = { ...payload };
  if (formattedPayload.mobile) {
    formattedPayload.mobile = formatMobileWith91(formattedPayload.mobile);
  }
  if (formattedPayload.email && !formattedPayload.email.includes('@')) {
    formattedPayload.mobile = formatMobileWith91(formattedPayload.email);
    delete formattedPayload.email;
  }
  return fetchAuthApi('login', { method: 'POST', body: JSON.stringify(formattedPayload) });
}

export async function registerUser(payload) {
  const formattedPayload = { ...payload };
  if (formattedPayload.mobile) {
    formattedPayload.mobile = formatMobileWith91(formattedPayload.mobile);
  }
  return fetchAuthApi('signup', { method: 'POST', body: JSON.stringify(formattedPayload) });
}

export async function sendOtp(identifier, channel = 'email') {
  const isEmail = String(identifier).includes('@');
  const formattedMobile = !isEmail ? formatMobileWith91(identifier) : '';
  const formattedIdentifier = isEmail ? identifier : formattedMobile;

  const body = {
    identifier: formattedIdentifier,
    mobile: isEmail ? '' : formattedMobile,
    email: isEmail ? identifier : '',
  };
  return fetchAuthApi('send-otp', { method: 'POST', body: JSON.stringify(body) });
}

export async function verifyOtp(identifier, otp) {
  const isEmail = String(identifier).includes('@');
  const formattedIdentifier = isEmail ? identifier : formatMobileWith91(identifier);
  return fetchAuthApi('verify-otp', { method: 'POST', body: JSON.stringify({ identifier: formattedIdentifier, otp }) });
}

export async function logoutUser(accessToken) {
  const headers = accessToken ? { Authorization: accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}` } : {};
  return fetchAuthApi('logout', { method: 'POST', headers, body: JSON.stringify({}) });
}

export async function updateProfileUser(formData, accessToken) {
  const url = `${BASE_URL}/customer/profile/update`;
  const headers = { accept: '*/*' };
  if (accessToken) {
    headers['Authorization'] = accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}`;
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      signal: AbortSignal.timeout(20000),
    });

    const data = await res.json().catch(() => null);
    if (!res.ok) {
      const msg = data?.message || data?.error || `Request failed with status ${res.status}`;
      return { success: false, error: msg };
    }

    return {
      success: data?.success ?? true,
      message: data?.message || 'Profile updated successfully',
      user: data?.user || data?.data?.user || data?.data || null,
    };
  } catch (err) {
    return { success: false, error: err.message || 'Unable to update profile.' };
  }
}
