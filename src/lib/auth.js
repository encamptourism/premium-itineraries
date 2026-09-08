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

export async function setAuthCookies({ accessToken, refreshToken, user }) {
  const cookieStore = await cookies();
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  };

  if (accessToken && typeof accessToken === 'string' && accessToken.trim() !== '' && accessToken !== 'session_active') {
    cookieStore.set(ACCESS_TOKEN_COOKIE, accessToken.trim(), options);
  } else {
    cookieStore.delete(ACCESS_TOKEN_COOKIE);
  }

  if (refreshToken && typeof refreshToken === 'string' && refreshToken.trim() !== '') {
    cookieStore.set(REFRESH_TOKEN_COOKIE, refreshToken.trim(), options);
  } else if (refreshToken === null) {
    cookieStore.delete(REFRESH_TOKEN_COOKIE);
  }

  if (user && typeof user === 'object') {
    cookieStore.set(USER_COOKIE, JSON.stringify(user), options);
  } else if (user === null) {
    cookieStore.delete(USER_COOKIE);
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

function sanitizeErrorMessage(rawErrorMsg, defaultUserMsg = 'An error occurred. Please try again.') {
  if (!rawErrorMsg) return defaultUserMsg;
  const msg = String(rawErrorMsg).trim();

  const safePatterns = [
    /invalid.*otp/i,
    /otp.*expired/i,
    /incorrect.*password/i,
    /user.*not.*found/i,
    /user.*already.*exist/i,
    /email.*already.*exist/i,
    /mobile.*already.*exist/i,
    /already registered/i,
    /invalid email/i,
    /invalid mobile/i,
    /invalid phone/i,
    /session expired/i,
    /please log in/i,
    /passwords do not match/i,
  ];

  for (const pattern of safePatterns) {
    if (pattern.test(msg)) {
      return msg;
    }
  }

  return defaultUserMsg;
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
        console.error(`[Auth API Error] Failed to parse JSON response from ${url}:`, parseErr.message, 'Raw text:', text.substring(0, 200));
        return {
          success: false,
          error: 'Authentication service unavailable. Please try again later.',
        };
      }
    }

    if (!res.ok) {
      const rawMsg = Array.isArray(data?.message)
        ? data.message.join(', ')
        : (data?.message || data?.error || (typeof data === 'string' ? data : `Request failed with status ${res.status}`));
      
      console.error(`[Auth API Error] HTTP ${res.status} from ${url}:`, rawMsg);
      return { success: false, error: sanitizeErrorMessage(rawMsg, 'Authentication request failed. Please try again.') };
    }

    const isPayloadSuccess = data?.success !== false && data?.status !== false && data?.status !== 'error' && !data?.error;

    if (!isPayloadSuccess) {
      const rawMsg = Array.isArray(data?.message)
        ? data.message.join(', ')
        : (data?.message || data?.error || 'Auth API indicated request failure.');
      
      console.error(`[Auth API Payload Failure] ${url}:`, rawMsg);
      return { success: false, error: sanitizeErrorMessage(rawMsg, 'Authentication request failed. Please try again.') };
    }

    return { success: true, ...data };
  } catch (err) {
    console.error(`[Auth API Fetch Error] Call to ${url} failed:`, err);
    return { success: false, error: 'Unable to connect to authentication server. Please try again later.' };
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
  if (!accessToken || accessToken === 'session_active') {
    return { success: false, error: 'Missing access token for logout.' };
  }
  const headers = { Authorization: accessToken.startsWith('Bearer ') ? accessToken : `Bearer ${accessToken}` };
  return fetchAuthApi('logout', { method: 'POST', headers, body: JSON.stringify({}) });
}

export async function updateProfileUser(formData, accessToken) {
  if (!accessToken || accessToken === 'session_active') {
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

  const payloadEntries = Array.from(formData.entries()).map(([k, v]) => [
    k,
    typeof v === 'object' && v !== null
      ? `{ File: name="${v.name || ''}", type="${v.type || ''}", size=${v.size || 0} }`
      : v,
  ]);

  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('[API FETCH] Outgoing Profile Update Request:');
  console.log('URL:', url);
  console.log('Method: POST');
  console.log('Headers:', headers);
  console.log('Payload Form Fields:', Object.fromEntries(payloadEntries));
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  try {
    const res = await fetch(url, {
      method: 'POST',
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
        console.error('[API FETCH Error] Failed to parse JSON profile update response:', parseErr.message, 'Raw response:', text.substring(0, 200));
        return { success: false, error: 'Profile update service unavailable. Please try again later.' };
      }
    }

    console.log('[API FETCH] Profile Update Backend Response:');
    console.log('Status Code:', res.status);
    console.log('Response Body:', data);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    if (!res.ok) {
      const rawMsg = Array.isArray(data?.message)
        ? data.message.join(', ')
        : (data?.message || data?.error || (typeof data === 'string' ? data : `Status code ${res.status}`));
      
      console.error(`[Profile Update Error] HTTP ${res.status}:`, rawMsg);
      return { success: false, error: sanitizeErrorMessage(rawMsg, 'Profile update failed. Please check your details and try again.') };
    }

    const isPayloadSuccess = data?.success !== false && data?.status !== false && data?.status !== 'error' && !data?.error;

    if (!isPayloadSuccess) {
      const rawMsg = Array.isArray(data?.message)
        ? data.message.join(', ')
        : (data?.message || data?.error || 'Profile update rejected');
      
      console.error('[Profile Update Payload Error]:', rawMsg);
      return { success: false, error: sanitizeErrorMessage(rawMsg, 'Profile update failed. Please check your details and try again.') };
    }

    const returnedUser = data?.user || data?.data?.user || data?.data || null;

    if (!returnedUser || typeof returnedUser !== 'object') {
      console.error('[Profile Update Error] Server succeeded but returned empty user object:', data);
      return {
        success: false,
        error: 'Profile update could not be completed. Please try logging in again.',
      };
    }

    return {
      success: true,
      message: 'Profile updated successfully',
      user: returnedUser,
    };
  } catch (err) {
    console.error('[API FETCH Error] Profile update exception:', err);
    return { success: false, error: 'Unable to update profile. Please try again later.' };
  }
}

