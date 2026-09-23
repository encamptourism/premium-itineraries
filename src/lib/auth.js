import { cookies } from 'next/headers';

export const ACCESS_TOKEN_COOKIE = 'ep_access_token';
export const REFRESH_TOKEN_COOKIE = 'ep_refresh_token';
export const USER_COOKIE = 'ep_user';

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

const BASE_URL = (process.env.BASE_URL || '').replace(/\/+$/, '');
const AUTH_API_BASE_URL = (
  process.env.AUTH_API_BASE_URL ||
  process.env.NEXT_PUBLIC_AUTH_API_URL ||
  `${BASE_URL}/customer/auth`
).replace(/\/+$/, '');

export function getAvatarUrl(user) {
  if (!user) return null;
  if (typeof user.avatar === 'string' && user.avatar) return user.avatar;
  if (typeof user.photoUrl === 'string' && user.photoUrl) return user.photoUrl;
  if (typeof user.photo === 'string' && user.photo) return user.photo;
  if (user.photo && typeof user.photo === 'object' && user.photo.secure_url) {
    return user.photo.secure_url;
  }
  if (user.avatar && typeof user.avatar === 'object' && user.avatar.secure_url) {
    return user.avatar.secure_url;
  }
  return null;
}

export function formatMobileWith91(val) {
  if (!val) return '';
  const str = String(val).trim();
  if (str.includes('@')) return str;
  let digits = str.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('0')) {
    digits = digits.substring(1);
  }
  if (digits.length === 10) {
    return `91${digits}`;
  }
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits;
  }
  return digits;
}

export async function setAuthCookies({ accessToken, refreshToken, user }) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  };

  if (accessToken === null) {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
  } else if (typeof accessToken === 'string' && accessToken.trim() !== '') {
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken.trim(), options);
  }

  if (refreshToken === null) {
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
  } else if (typeof refreshToken === 'string' && refreshToken.trim() !== '') {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken.trim(), options);
  }

  if (user === null) {
    cookieStore.delete(USER_COOKIE);
  } else if (user && typeof user === 'object') {
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
    } catch (err) {
      console.error('[Auth Cookie Error] Corrupted user cookie payload:', err.message);
      cookieStore.delete(USER_COOKIE);
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

function extractErrorMessage(data, fallback = 'API request failed.') {
  if (!data) return fallback;
  if (typeof data === 'string') return data;
  if (Array.isArray(data.message)) return data.message.join(', ');
  if (data.message) return String(data.message);
  if (data.error) return String(data.error);
  return fallback;
}

async function fetchAuthApi(endpoint, options = {}) {
  const url = `${AUTH_API_BASE_URL}/${endpoint.replace(/^\/+/, '')}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: { accept: '*/*', 'Content-Type': 'application/json', ...(options.headers || {}) },
      signal: AbortSignal.timeout(15000),
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error(`[Auth API Error] Failed to parse JSON response from ${url}:`, parseErr.message);
        return {
          success: false,
          error: `Server error (${res.status}): Invalid response from authentication server.`,
        };
      }
    }

    if (!res.ok) {
      const errorMsg = extractErrorMessage(data, `Request failed with status ${res.status}`);
      console.error(`[Auth API Error] HTTP ${res.status} from ${url}:`, errorMsg);
      return { success: false, error: errorMsg };
    }

    const isPayloadSuccess = data?.success !== false && data?.status !== false && data?.status !== 'error' && !data?.error;

    if (!isPayloadSuccess) {
      const errorMsg = extractErrorMessage(data, 'Authentication request failed.');
      console.error(`[Auth API Failure] ${url}:`, errorMsg);
      return { success: false, error: errorMsg };
    }

    return { success: true, ...data };
  } catch (err) {
    console.error(`[Auth API Fetch Error] Call to ${url} failed:`, err);
    return { success: false, error: err.message || 'Unable to connect to authentication server.' };
  }
}

export async function fetchUserProfile(accessToken) {
  if (!accessToken) {
    return { success: false, error: 'No access token provided.' };
  }

  const url = `${BASE_URL}/customer/profile`;
  const token = accessToken.trim();
  const headers = {
    accept: '*/*',
    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
  };

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(15000),
      cache: 'no-store',
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('[API FETCH Error] Failed to parse profile JSON:', parseErr.message);
      }
    }

    if (!res.ok) {
      const errorMsg = extractErrorMessage(data, `Profile fetch failed with status ${res.status}`);
      return { success: false, error: errorMsg };
    }

    const returnedUser = data?.user || data?.data?.user || data?.data || data;
    return { success: true, user: returnedUser };
  } catch (err) {
    console.error('[API FETCH Error] fetchUserProfile exception:', err);
    return { success: false, error: err.message || 'Unable to fetch profile from server.' };
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
  if (!accessToken) {
    return { success: false, error: 'Missing access token for logout.' };
  }
  const headers = { Authorization: accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}` };
  return fetchAuthApi('logout', { method: 'POST', headers, body: JSON.stringify({}) });
}

export async function updateProfileUser(formData, accessToken) {
  if (!accessToken) {
    return {
      success: false,
      error: 'Session expired. Please log in again to update your profile.',
    };
  }

  const url = `${BASE_URL}/customer/profile/update`;
  const token = accessToken.trim();

  const headers = {
    accept: '*/*',
    Authorization: token.startsWith('Bearer ') ? token : `Bearer ${token}`,
  };

  try {
    const res = await fetch(url, {
      method: 'PUT',
      headers,
      body: formData,
      signal: AbortSignal.timeout(20000),
    });

    const text = await res.text();
    let data = null;
    if (text) {
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        console.error('[API FETCH Error] Failed to parse JSON profile update response:', parseErr.message);
        return { success: false, error: `Invalid response format from server (${res.status}).` };
      }
    }

    if (!res.ok) {
      const errorMsg = extractErrorMessage(data, `Profile update failed with status ${res.status}`);
      console.error(`[Profile Update Error] HTTP ${res.status}:`, errorMsg);
      return { success: false, error: errorMsg };
    }

    const isPayloadSuccess = data?.success !== false && data?.status !== false && data?.status !== 'error' && !data?.error;

    if (!isPayloadSuccess) {
      const errorMsg = extractErrorMessage(data, 'Profile update rejected');
      console.error('[Profile Update Payload Error]:', errorMsg);
      return { success: false, error: errorMsg };
    }

    const returnedUser = data?.user || data?.data?.user || (typeof data?.data === 'object' ? data.data : null) || data || {};

    return {
      success: true,
      message: data?.message || 'Profile updated successfully',
      user: returnedUser,
    };
  } catch (err) {
    console.error('[API FETCH Error] Profile update exception:', err);
    return { success: false, error: err.message || 'Unable to update profile.' };
  }
}
