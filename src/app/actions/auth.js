'use server';

import {
  loginUser,
  registerUser,
  sendOtp,
  verifyOtp,
  logoutUser,
  updateProfileUser,
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

  await setAuthCookies({
    accessToken: result.accessToken || result.token,
    refreshToken: result.refreshToken,
    user: result.user,
  });

  return { success: true, message: result.message, user: result.user };
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

  await setAuthCookies({
    accessToken: result.accessToken || result.token,
    refreshToken: result.refreshToken,
    user: result.user,
  });

  return { success: true, message: result.message, user: result.user };
}

export async function sendOtpAction(identifier, channel = 'email') {
  if (!identifier) return { success: false, error: 'Identifier is required to send OTP.' };
  return sendOtp(identifier, channel);
}

export async function verifyOtpAction(identifier, otp, redirectUrl = '/') {
  if (!identifier || !otp) return { success: false, error: 'Identifier and OTP code are required.' };

  const result = await verifyOtp(identifier, otp);
  if (!result.success) return result;

  const existingAuth = await getAuthCookies();
  let sessionUser = result.user || result.data?.user || existingAuth.user || null;
  const tokenToUse = result.accessToken || result.token || result.data?.token || existingAuth.accessToken || 'session_active';

  if (!sessionUser) {
    const isEmail = String(identifier).includes('@');
    sessionUser = {
      id: identifier,
      _id: identifier,
      name: isEmail ? identifier.split('@')[0] : identifier,
      email: isEmail ? identifier : '',
      mobile: isEmail ? '' : identifier,
      role: 'customer',
    };
  }

  await setAuthCookies({
    accessToken: tokenToUse,
    refreshToken: result.refreshToken || result.data?.refreshToken || existingAuth.refreshToken || '',
    user: sessionUser,
  });

  const rawName = sessionUser?.name || '';
  const isNameMissing = !rawName || rawName.trim() === '' || rawName === identifier || rawName === identifier.split('@')[0];

  return { success: true, needsName: isNameMissing, redirectUrl, user: sessionUser };
}

export async function updateNameAction(name) {
  if (!name || !name.trim()) return { success: false, error: 'Please enter your full name.' };

  const { accessToken, refreshToken, user } = await getAuthCookies();
  if (!user) return { success: false, error: 'Session expired. Please log in again.' };

  const updatedUser = { ...user, name: name.trim() };
  await setAuthCookies({ accessToken, refreshToken, user: updatedUser });

  return { success: true, user: updatedUser };
}

export async function updateProfileAction(formDataInput) {
  const { accessToken, refreshToken, user: currentUser } = await getAuthCookies();
  if (!accessToken) {
    return { success: false, error: 'Session expired. Please log in again.' };
  }

  let formData;
  if (formDataInput instanceof FormData) {
    formData = formDataInput;
  } else if (typeof formDataInput === 'object' && formDataInput !== null) {
    formData = new FormData();
    if (formDataInput.name !== undefined) formData.append('name', formDataInput.name);
    if (formDataInput.email !== undefined) formData.append('email', formDataInput.email);
    if (formDataInput.mobile !== undefined) formData.append('mobile', formDataInput.mobile);
    if (formDataInput.profileBio !== undefined) formData.append('profileBio', formDataInput.profileBio);
    if (formDataInput.avatar) formData.append('avatar', formDataInput.avatar);
  } else {
    return { success: false, error: 'Invalid form data.' };
  }

  const result = await updateProfileUser(formData, accessToken);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  const updatedUser = {
    ...(currentUser || {}),
    ...(result.user || {}),
    name: formData.get('name') !== null ? String(formData.get('name')) : currentUser?.name,
    email: formData.get('email') !== null ? String(formData.get('email')) : currentUser?.email,
    mobile: formData.get('mobile') !== null ? String(formData.get('mobile')) : currentUser?.mobile,
    profileBio: formData.get('profileBio') !== null ? String(formData.get('profileBio')) : currentUser?.profileBio,
  };

  await setAuthCookies({
    accessToken,
    refreshToken,
    user: updatedUser,
  });

  return { success: true, user: updatedUser, message: result.message || 'Profile updated successfully' };
}

export async function logoutAction() {
  try {
    const { accessToken } = await getAuthCookies();
    if (accessToken) await logoutUser(accessToken);
  } catch (err) {
    console.error(err);
  } finally {
    await clearAuthCookies();
  }
  return { success: true };
}
