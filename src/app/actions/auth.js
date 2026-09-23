'use server';

import {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  logoutUser,
  updateProfileUser,
  fetchUserProfile,
  setAuthCookies,
  getAuthCookies,
  clearAuthCookies,
} from '@/lib/auth';

export async function loginAction(data) {
  let email = '';
  let mobile = '';
  let password = '';

  if (data instanceof FormData) {
    email = String(data.get('email') || '').trim();
    mobile = String(data.get('mobile') || data.get('phone') || '').trim();
    password = String(data.get('password') || '');
  } else if (typeof data === 'object' && data !== null) {
    email = String(data.email || '').trim();
    mobile = String(data.mobile || data.phone || '').trim();
    password = String(data.password || '');
  }

  if (!email && !mobile) return { success: false, error: 'Email or Mobile number is required.' };
  if (!password) return { success: false, error: 'Password is required.' };

  const result = await loginUser({ email, mobile, password });
  if (!result.success) return { success: false, error: result.error };

  const accessToken = result.accessToken || result.token || result.data?.accessToken || result.data?.token;
  const refreshToken = result.refreshToken || result.data?.refreshToken || null;
  const user = result.user || result.data?.user || result.customer || null;

  await setAuthCookies({ accessToken, refreshToken, user });

  const rawName = String(user?.name || '').trim();
  const rawEmail = String(user?.email || '').trim();
  const rawMobile = String(user?.mobile || '').trim();

  const needsName = !rawName || rawName === 'Customer' || rawName === rawMobile;
  const needsEmail = !rawEmail || rawEmail.endsWith('@customer.encamp.com');
  const needsMobile = !rawMobile;

  return { success: true, message: result.message, user, needsName, needsEmail, needsMobile };
}

export async function registerAction(data) {
  let name = '';
  let email = '';
  let mobile = '';
  let password = '';
  let confirm = '';

  if (data instanceof FormData) {
    name = String(data.get('name') || '').trim();
    email = String(data.get('email') || '').trim();
    mobile = String(data.get('mobile') || data.get('phone') || '').trim();
    password = String(data.get('password') || '');
    confirm = String(data.get('confirm') || '');
  } else if (typeof data === 'object' && data !== null) {
    name = String(data.name || '').trim();
    email = String(data.email || '').trim();
    mobile = String(data.mobile || data.phone || '').trim();
    password = String(data.password || '');
    confirm = String(data.confirm || '');
  }

  if (!name || (!email && !mobile) || !password) {
    return { success: false, error: 'Name, Email or Mobile, and Password are required.' };
  }
  if (confirm && password !== confirm) {
    return { success: false, error: 'Passwords do not match.' };
  }

  const result = await registerUser({ name, email, mobile, password });
  if (!result.success) return { success: false, error: result.error };

  const accessToken = result.accessToken || result.token || result.data?.accessToken || result.data?.token;
  const refreshToken = result.refreshToken || result.data?.refreshToken || null;
  const user = result.user || result.data?.user || result.customer || null;

  await setAuthCookies({ accessToken, refreshToken, user });
  return { success: true, message: result.message, user };
}

export async function sendOtpAction(identifier, channel = 'email') {
  if (!identifier) return { success: false, error: 'Identifier is required to send OTP.' };
  return sendOtp(identifier, channel);
}

export async function verifyOtpAction(identifier, otp, redirectUrl = '/') {
  if (!identifier || !otp) return { success: false, error: 'Identifier and OTP code are required.' };

  const result = await verifyOtp(identifier, otp);
  if (!result.success) return result;

  const accessToken = result.accessToken || result.token || result.data?.accessToken || result.data?.token;
  const refreshToken = result.refreshToken || result.data?.refreshToken || null;
  const user = result.user || result.data?.user || result.customer || null;

  await setAuthCookies({ accessToken, refreshToken, user });

  const rawName = String(user?.name || '').trim();
  const rawEmail = String(user?.email || '').trim();
  const rawMobile = String(user?.mobile || '').trim();

  const needsName = !rawName || rawName === 'Customer' || rawName === rawMobile;
  const needsEmail = !rawEmail || rawEmail.endsWith('@customer.encamp.com');
  const needsMobile = !rawMobile;

  return { success: true, needsName, needsEmail, needsMobile, redirectUrl, user };
}

export async function updateNameAction(name) {
  if (!name || !name.trim()) return { success: false, error: 'Please enter your full name.' };

  const { accessToken, refreshToken, user } = await getAuthCookies();
  let updatedUser = user ? { ...user, name: name.trim() } : { name: name.trim() };

  if (accessToken) {
    try {
      const fd = new FormData();
      fd.append('name', name.trim());
      fd.append('email', user?.email || '');
      fd.append('mobile', user?.mobile || '');
      const apiRes = await updateProfileUser(fd, accessToken);
      if (apiRes.success && apiRes.user) {
        updatedUser = { ...updatedUser, ...apiRes.user };
      }
    } catch (e) {
      console.error('[updateNameAction] API update warning:', e.message);
    }
  }

  await setAuthCookies({ accessToken, refreshToken, user: updatedUser });
  return { success: true, user: updatedUser };
}

export async function updateEmailAction(email) {
  if (!email || !email.trim() || !email.includes('@')) {
    return { success: false, error: 'Please enter a valid email address.' };
  }
  if (email.trim().endsWith('@customer.encamp.com')) {
    return { success: false, error: 'Please enter your real personal/work email address.' };
  }

  const { accessToken, refreshToken, user } = await getAuthCookies();
  let updatedUser = user ? { ...user, email: email.trim() } : { email: email.trim() };

  if (accessToken) {
    try {
      const fd = new FormData();
      fd.append('name', user?.name || '');
      fd.append('email', email.trim());
      fd.append('mobile', user?.mobile || '');
      const apiRes = await updateProfileUser(fd, accessToken);
      if (apiRes.success && apiRes.user) {
        updatedUser = { ...updatedUser, ...apiRes.user };
      }
    } catch (e) {
      console.error('[updateEmailAction] API update warning:', e.message);
    }
  }

  await setAuthCookies({ accessToken, refreshToken, user: updatedUser });
  return { success: true, user: updatedUser };
}

export async function updateMobileAction(mobile) {
  if (!mobile || !mobile.trim()) {
    return { success: false, error: 'Please enter a valid mobile number.' };
  }

  const { accessToken, refreshToken, user } = await getAuthCookies();
  let updatedUser = user ? { ...user, mobile: mobile.trim() } : { mobile: mobile.trim() };

  if (accessToken) {
    try {
      const fd = new FormData();
      fd.append('name', user?.name || '');
      fd.append('email', user?.email || '');
      fd.append('mobile', mobile.trim());
      const apiRes = await updateProfileUser(fd, accessToken);
      if (apiRes.success && apiRes.user) {
        updatedUser = { ...updatedUser, ...apiRes.user };
      }
    } catch (e) {
      console.error('[updateMobileAction] API update warning:', e.message);
    }
  }

  await setAuthCookies({ accessToken, refreshToken, user: updatedUser });
  return { success: true, user: updatedUser };
}

export async function updateProfileAction(formDataInput) {
  const { accessToken, refreshToken, user: currentUser } = await getAuthCookies();
  if (!accessToken) {
    return { success: false, error: 'Session expired. Please log in again.' };
  }

  const formData = new FormData();

  if (formDataInput instanceof FormData) {
    const nameVal = formDataInput.get('name');
    const emailVal = formDataInput.get('email');
    const mobileVal = formDataInput.get('mobile');
    const bioVal = formDataInput.get('profileBio');
    const avatarVal = formDataInput.get('avatar');

    formData.append('name', nameVal !== null ? String(nameVal).trim() : '');
    formData.append('email', emailVal !== null ? String(emailVal).trim() : '');
    formData.append('mobile', mobileVal !== null ? String(mobileVal).trim() : '');
    formData.append('profileBio', bioVal !== null ? String(bioVal) : '');

    // Forward the avatar File/Blob directly — no reconstruction needed
    if (avatarVal && typeof avatarVal === 'object' && avatarVal.size > 0) {
      formData.append('avatar', avatarVal, avatarVal.name || 'avatar.jpg');
    }
    // If no avatar file selected, simply don't append the field — avoids clearing existing avatar
  } else if (typeof formDataInput === 'object' && formDataInput !== null) {
    formData.append('name', formDataInput.name !== undefined ? String(formDataInput.name) : '');
    formData.append('email', formDataInput.email !== undefined ? String(formDataInput.email) : '');
    formData.append('mobile', formDataInput.mobile !== undefined ? String(formDataInput.mobile) : '');
    formData.append('profileBio', formDataInput.profileBio !== undefined ? String(formDataInput.profileBio) : '');

    if (formDataInput.avatar && typeof formDataInput.avatar === 'object' && formDataInput.avatar.size > 0) {
      formData.append('avatar', formDataInput.avatar, formDataInput.avatar.name || 'avatar.jpg');
    }
  } else {
    return { success: false, error: 'Invalid form data.' };
  }

  const result = await updateProfileUser(formData, accessToken);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  const backendUser = result.user || {};
  const avatarUrl =
    (typeof backendUser.avatar === 'string' ? backendUser.avatar : backendUser.avatar?.secure_url) ||
    (typeof backendUser.photo === 'string' ? backendUser.photo : backendUser.photo?.secure_url) ||
    (typeof backendUser.photoUrl === 'string' ? backendUser.photoUrl : null);

  const updatedUser = {
    ...(currentUser || {}),
    ...backendUser,
    ...(avatarUrl ? { avatar: avatarUrl } : {}),
  };

  await setAuthCookies({
    accessToken,
    refreshToken,
    user: updatedUser,
  });

  return { success: true, user: updatedUser, message: result.message || 'Profile updated successfully' };
}

export async function logoutAction() {
  const { accessToken } = await getAuthCookies();
  if (accessToken) {
    await logoutUser(accessToken);
  }
  await clearAuthCookies();
  return { success: true };
}

export async function getMeAction() {
  const { accessToken, refreshToken, user } = await getAuthCookies();

  const token = accessToken || refreshToken;
  if (!token) {
    return { success: false, error: 'No active authentication session' };
  }

  // If user object is cached in cookie, use it; otherwise fetch live profile from backend API
  let activeUser = user;
  if (!activeUser && accessToken) {
    const liveProfile = await fetchUserProfile(accessToken);
    if (liveProfile.success && liveProfile.user) {
      activeUser = liveProfile.user;
      await setAuthCookies({ accessToken, refreshToken, user: activeUser });
    }
  }

  return {
    success: true,
    user: activeUser || null,
    carbontraceToken: activeUser?.ptoken || null,
    ctCoins: activeUser?.carbontraceSession
      ? {
          balance: activeUser.carbontraceSession.ctcoinsBalance ?? 0,
          totalOffset: activeUser.carbontraceSession.totalCarbonOffset ?? 0,
          isConnected: Boolean(activeUser.carbontraceSession.isConnected),
        }
      : null,
    bookings: activeUser?.bookings || [],
    preferences: activeUser?.preferences || null,
    documents: activeUser?.documents || [],
  };
}
