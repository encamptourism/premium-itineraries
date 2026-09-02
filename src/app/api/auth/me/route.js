import { NextResponse } from 'next/server';
import { getAuthCookies } from '@/lib/auth';

export async function GET() {
  const { accessToken, user } = await getAuthCookies();

  if (!user && !accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const sessionUser = user || {
    id: 'user_active',
    _id: 'user_active',
    name: 'Traveler',
    email: '',
    mobile: '',
    role: 'customer',
  };

  const ctSession = sessionUser.carbontraceSession || null;

  return NextResponse.json({
    success: true,
    user: {
      id: sessionUser.id || sessionUser._id || null,
      _id: sessionUser._id || sessionUser.id || null,
      name: sessionUser.name || 'Traveler',
      email: sessionUser.email || null,
      mobile: sessionUser.mobile || null,
      photo: sessionUser.photo || null,
      profileBio: sessionUser.profileBio || null,
      role: sessionUser.role || 'customer',
      ptoken: sessionUser.ptoken || null,
      createdAt: sessionUser.createdAt || null,
    },
    carbontraceToken: sessionUser.ptoken || accessToken || null,
    ctCoins: ctSession
      ? {
          balance: ctSession.ctcoinsBalance ?? 0,
          totalOffset: ctSession.totalCarbonOffset ?? 0,
          isConnected: Boolean(ctSession.isConnected),
        }
      : null,
    bookings: sessionUser.bookings || [],
    preferences: sessionUser.preferences || null,
    documents: sessionUser.documents || [],
  });
}

