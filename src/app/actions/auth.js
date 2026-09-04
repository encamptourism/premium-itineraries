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
  if (!accessToken && !currentUser) {
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

    if (avatarVal && typeof avatarVal === 'object' && typeof avatarVal.arrayBuffer === 'function' && avatarVal.size > 0) {
      const filename = avatarVal.name || 'avatar.jpg';
      const type = avatarVal.type || 'image/jpeg';
      const arrayBuffer = await avatarVal.arrayBuffer();
      const fileObj = new File([arrayBuffer], filename, { type });
      formData.append('avatar', fileObj);
    } else {
      formData.append('avatar', '');
    }
  } else if (typeof formDataInput === 'object' && formDataInput !== null) {
    formData.append('name', formDataInput.name !== undefined ? String(formDataInput.name) : '');
    formData.append('email', formDataInput.email !== undefined ? String(formDataInput.email) : '');
    formData.append('mobile', formDataInput.mobile !== undefined ? String(formDataInput.mobile) : '');
    formData.append('profileBio', formDataInput.profileBio !== undefined ? String(formDataInput.profileBio) : '');

    if (formDataInput.avatar && typeof formDataInput.avatar === 'object' && typeof formDataInput.avatar.arrayBuffer === 'function' && formDataInput.avatar.size > 0) {
      const filename = formDataInput.avatar.name || 'avatar.jpg';
      const type = formDataInput.avatar.type || 'image/jpeg';
      const arrayBuffer = await formDataInput.avatar.arrayBuffer();
      const fileObj = new File([arrayBuffer], filename, { type });
      formData.append('avatar', fileObj);
    } else {
      formData.append('avatar', '');
    }
  } else {
    return { success: false, error: 'Invalid form data.' };
  }

  console.log('[SERVER ACTION] Profile Update FormData fields:');
  for (const [key, val] of formData.entries()) {
    console.log(`  ${key}:`, typeof val === 'object' && val !== null ? `{ File: name="${val.name}", type="${val.type}", size=${val.size} }` : val);
  }

  const result = await updateProfileUser(formData, accessToken);
  if (!result.success) {
    return { success: false, error: result.error };
  }

  const backendUser = result.user || {};
  const newAvatar =
    backendUser.avatar ||
    backendUser.photo ||
    backendUser.photoUrl ||
    backendUser.avatarUrl ||
    backendUser.profileImage ||
    backendUser.profile_image ||
    backendUser.image ||
    currentUser?.avatar ||
    currentUser?.photo;

  const updatedUser = {
    ...(currentUser || {}),
    ...backendUser,
    name: formData.get('name') !== null && String(formData.get('name')).trim() !== '' ? String(formData.get('name')) : (backendUser.name || currentUser?.name),
    email: formData.get('email') !== null && String(formData.get('email')).trim() !== '' ? String(formData.get('email')) : (backendUser.email || currentUser?.email),
    mobile: formData.get('mobile') !== null && String(formData.get('mobile')).trim() !== '' ? String(formData.get('mobile')) : (backendUser.mobile || currentUser?.mobile),
    profileBio: formData.get('profileBio') !== null ? String(formData.get('profileBio')) : (backendUser.profileBio || currentUser?.profileBio),
    avatar: newAvatar,
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
