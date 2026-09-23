'use client';

import { useState, useEffect, useTransition, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { updateProfileAction } from '@/app/actions/auth';
import ProfileHeaderCard from '@/components/profile/ProfileHeaderCard';
import ProfileSidebar from '@/components/profile/ProfileSidebar';
import BookingCard from '@/components/profile/BookingCard';
import CTCoinsCard from '@/components/profile/CTCoinsCard';
import {
  TrendingUp, Plane, Coins, MapPin, Calendar, FileText,
  Camera, Save, Lock, Trash2, AlertTriangle, Sparkles,
  CreditCard, Compass, CheckCircle2, Loader2, ArrowLeft
} from 'lucide-react';

// ─── Tab: Overview ─────────────────────────────────────────────────────────────

function OverviewTab({ user, ctCoins, bookings }) {
  const upcoming = bookings?.filter((b) => b.status === 'upcoming') || [];
  const nextTrip = upcoming[0];
  const daysUntil = nextTrip
    ? Math.ceil((new Date(nextTrip.startDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  const completed = bookings?.filter((b) => b.status === 'completed') || [];

  return (
    <div className="space-y-6">
      {/* Quick stats - Clean White Cards */}
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            label: 'Trips Taken',
            value: completed.length,
            icon: <Plane className="w-5 h-5 text-primary-green" />,
            valColor: 'text-primary-green',
          },
          {
            label: 'Upcoming',
            value: upcoming.length,
            icon: <Calendar className="w-5 h-5 text-amber-600" />,
            valColor: 'text-primary-green',
          },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-stone-200 rounded-3xl p-5 flex flex-col gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <div className={`font-serif-display text-2xl sm:text-3xl font-bold ${stat.valColor}`}>{stat.value}</div>
              <div className="text-xs text-stone-500 font-medium mt-0.5">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Next trip countdown */}
      {nextTrip && daysUntil !== null && (
        <div className="bg-gradient-to-r from-primary-green via-primary-green to-primary-green border border-[#dfa62f]/40 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-bold text-[#dfa62f] uppercase tracking-widest">Next Expedition</p>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-white mt-1">{nextTrip.name}</h3>
              <div className="flex items-center gap-1.5 text-stone-300 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfa62f]" />
                {nextTrip.destination}
              </div>
            </div>
            <div className="text-center px-4 py-2 bg-primary-green border border-[#dfa62f]/30 rounded-2xl">
              <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#dfa62f]">{daysUntil}</div>
              <div className="text-[10px] text-stone-300 font-semibold uppercase tracking-wider">Days Away</div>
            </div>
          </div>
        </div>
      )}

      {/* Recent CT activity */}
      {ctCoins?.transactions?.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-stone-100 bg-stone-50/50 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#dfa62f]" />
            <h3 className="font-semibold text-primary-green text-sm">Recent CT Coin Activity</h3>
          </div>
          <div className="divide-y divide-stone-100">
            {ctCoins.transactions.slice(0, 3).map((txn) => (
              <div key={txn.id} className="flex items-center justify-between px-6 py-4 hover:bg-stone-50 transition-colors">
                <p className="text-xs text-stone-700 font-medium">{txn.description}</p>
                <span className={`text-sm font-bold ${txn.type === 'earned' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {txn.type === 'earned' ? '+' : '-'}{txn.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab: Journeys ─────────────────────────────────────────────────────────────

function JourneysTab({ bookings }) {
  const upcoming = (bookings || []).filter((b) => ['upcoming', 'confirmed'].includes(b.status));
  const past = (bookings || []).filter((b) => ['completed', 'cancelled'].includes(b.status));

  if (!bookings?.length) {
    return (
      <div className="bg-white border border-stone-200 rounded-3xl text-center py-20 px-4 shadow-sm">
        <Plane className="w-12 h-12 text-[#dfa62f]/60 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-primary-green">No Journeys Booked</h3>
        <p className="text-stone-500 text-sm mt-2 max-w-sm mx-auto">Your booked itineraries will appear here with live flight & countdown details.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {upcoming.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-primary-green text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#dfa62f] inline-block shadow-[0_0_8px_#dfa62f]" />
            Upcoming Expeditions ({upcoming.length})
          </h3>
          {upcoming.map((b) => <BookingCard key={b.id} booking={b} />)}
        </div>
      )}
      {past.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold text-stone-500 text-xs uppercase tracking-widest flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-400 inline-block" />
            Past Expeditions ({past.length})
          </h3>
          {past.map((b) => <BookingCard key={b.id} booking={b} />)}
        </div>
      )}
    </div>
  );
}

// ─── Tab: Preferences ──────────────────────────────────────────────────────────

const DIETARY = ['Vegetarian', 'Vegan', 'Halal', 'Gluten-Free', 'No Restriction'];
const ROOM_OPTS = ['Single', 'Double', 'Twin', 'Suite'];
const ACTIVITY = ['Adventure', 'Cultural', 'Wellness', 'Wildlife', 'Photography'];
const COMM = ['Email', 'WhatsApp', 'Both'];

function PreferencesTab({ preferences }) {
  const [prefs, setPrefs] = useState(preferences || { dietary: [], room: 'Double', activity: [], communication: 'Email' });
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  const toggleArr = (key, val) => {
    setPrefs((p) => ({
      ...p,
      [key]: p[key]?.includes(val) ? p[key].filter((x) => x !== val) : [...(p[key] || []), val],
    }));
    setSaved(false);
  };

  const handleSave = () => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 600));
      setSaved(true);
    });
  };

  const chipClass = (active) =>
    `px-4 py-2.5 rounded-2xl text-xs font-semibold border transition-all cursor-pointer ${active
      ? 'bg-primary-green text-white border-primary-green font-bold shadow-sm'
      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-[#dfa62f] hover:text-primary-green'
    }`;

  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-8 shadow-sm text-stone-900">
      <div>
        <h3 className="text-xs font-bold text-[#dfa62f] uppercase tracking-widest mb-3">Dietary Requirements</h3>
        <div className="flex flex-wrap gap-2.5">
          {DIETARY.map((d) => (
            <button key={d} onClick={() => toggleArr('dietary', d)} className={chipClass(prefs.dietary?.includes(d))}>
              {d}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#dfa62f] uppercase tracking-widest mb-3">Room Preference</h3>
        <div className="flex flex-wrap gap-2.5">
          {ROOM_OPTS.map((r) => (
            <button key={r} onClick={() => { setPrefs((p) => ({ ...p, room: r })); setSaved(false); }} className={chipClass(prefs.room === r)}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#dfa62f] uppercase tracking-widest mb-3">Activity Interests</h3>
        <div className="flex flex-wrap gap-2.5">
          {ACTIVITY.map((a) => (
            <button key={a} onClick={() => toggleArr('activity', a)} className={chipClass(prefs.activity?.includes(a))}>
              {a}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-bold text-[#dfa62f] uppercase tracking-widest mb-3">Communication Preference</h3>
        <div className="flex flex-wrap gap-2.5">
          {COMM.map((c) => (
            <button key={c} onClick={() => { setPrefs((p) => ({ ...p, communication: c })); setSaved(false); }} className={chipClass(prefs.communication === c)}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={isPending}
        className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary-green text-white text-sm font-bold uppercase tracking-wider hover:bg-primary-green shadow-md transition-all disabled:opacity-60"
      >
        {isPending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save className="w-4 h-4 text-[#dfa62f]" />}
        {saved ? '✓ Preferences Saved' : 'Save Preferences'}
      </button>
    </div>
  );
}

// ─── Tab: Documents ───────────────────────────────────────────────────────────

function DocumentsTab() {
  return (
    <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-stone-900">
      <p className="text-stone-600 text-sm leading-relaxed">
        Securely store your travel documents. Our concierge team accesses these to prepare custom permits for your expeditions.
      </p>

      <div className="border-2 border-dashed border-stone-200 bg-stone-50/50 rounded-3xl p-10 text-center hover:border-[#dfa62f] hover:bg-stone-50 transition-all cursor-pointer group">
        <Camera className="w-10 h-10 text-stone-400 group-hover:text-[#dfa62f] mx-auto mb-3 transition-colors" />
        <p className="text-sm font-semibold text-stone-700 group-hover:text-primary-green">
          Drop files here or <span className="text-[#dfa62f]">browse</span>
        </p>
        <p className="text-xs text-stone-400 mt-1">Passport, Visa, National ID — PDF, JPG, PNG (max 10MB)</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: FileText, label: 'Passport', note: 'International travel' },
          { icon: CreditCard, label: 'National ID', note: 'Domestic reference' },
          { icon: Plane, label: 'Visa', note: 'Entry permits' },
        ].map(({ icon: Icon, label, note }) => (
          <div key={label} className="bg-stone-50 border border-stone-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-[#dfa62f]" />
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-green">{label}</p>
              <p className="text-xs text-stone-500">{note}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50/80 border border-blue-200 rounded-2xl px-5 py-4 flex items-start gap-3">
        <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-blue-800 leading-relaxed">
          Document uploads are encrypted end-to-end and only accessible by you and your assigned Encamp Privé concierge.
        </p>
      </div>
    </div>
  );
}

// ─── Tab: Settings (Profile Update with multipart/form-data) ─────────────────────

function SettingsTab({ user, logout, refreshUser }) {
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const format10DigitMobile = (val) => {
    if (!val) return '';
    const digits = String(val).replace(/\D/g, '');
    if (digits.length === 12 && digits.startsWith('91')) {
      return digits.slice(2);
    }
    return digits.slice(0, 10);
  };

  const [mobile, setMobile] = useState(() => format10DigitMobile(user?.mobile || user?.phone || ''));
  const [profileBio, setProfileBio] = useState(user?.profileBio || '');
  const [avatarFile, setAvatarFile] = useState(null);
  const getInitialAvatar = (u) => {
    if (!u) return null;
    if (typeof u.avatar === 'string' && u.avatar) return u.avatar;
    if (typeof u.photoUrl === 'string' && u.photoUrl) return u.photoUrl;
    if (typeof u.photo === 'string' && u.photo) return u.photo;
    if (u.photo?.secure_url) return u.photo.secure_url;
    if (u.avatar?.secure_url) return u.avatar.secure_url;
    return null;
  };

  const [avatarPreview, setAvatarPreview] = useState(() => getInitialAvatar(user));

  const [profileSaved, setProfileSaved] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [pwSaved, setPwSaved] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
      setProfileSaved(false);
    }
  };

  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 10);
    setMobile(val);
    setProfileSaved(false);
  };

  const saveProfile = (e) => {
    e?.preventDefault();
    setErrorMsg('');
    setProfileSaved(false);

    const cleanName = name.trim();
    const cleanEmail = email.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg('Full name must be at least 2 characters long.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const digitsOnly = mobile.replace(/\D/g, '');
    if (digitsOnly.length !== 10) {
      setErrorMsg('Mobile number must be exactly 10 digits.');
      return;
    }
    if (!/^[6-9]/.test(digitsOnly)) {
      setErrorMsg('Mobile number must start with 6, 7, 8, or 9.');
      return;
    }

    const apiMobile = `91${digitsOnly}`;

    startTransition(async () => {
      const formData = new FormData();
      formData.append('name', cleanName);
      formData.append('email', cleanEmail);
      formData.append('mobile', apiMobile);
      formData.append('profileBio', profileBio);
      if (avatarFile) {
        formData.append('avatar', avatarFile);
      }

      console.log('[CLIENT] Submitting Profile Update Form:', {
        name: cleanName,
        email: cleanEmail,
        mobile: apiMobile,
        profileBio,
        avatarFile: avatarFile ? { name: avatarFile.name, type: avatarFile.type, size: avatarFile.size } : null,
      });

      const res = await updateProfileAction(formData);

      if (!res.success) {
        setErrorMsg(res.error || 'Failed to update profile.');
        return;
      }

      setProfileSaved(true);
      const updatedAvatarUrl = getInitialAvatar(res.user);
      if (updatedAvatarUrl) {
        setAvatarPreview(updatedAvatarUrl);
      }
      setAvatarFile(null);
      if (refreshUser) await refreshUser();
    });
  };

  const savePassword = () => {
    startTransition(async () => {
      await new Promise((r) => setTimeout(r, 800));
      setPwSaved(true);
      setPwForm({ current: '', next: '', confirm: '' });
    });
  };

  return (
    <div className="space-y-8 text-stone-900">
      {/* Edit Customer Profile */}
      <form onSubmit={saveProfile} className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-primary-green">Edit Profile</h3>
        </div>

        {/* Avatar Upload Field */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-stone-600 uppercase tracking-widest block">Profile Avatar</label>
          <div className="flex items-center gap-5">
            <div className="relative w-20 h-20 rounded-2xl bg-primary-green border-2 border-[#dfa62f] overflow-hidden flex items-center justify-center text-2xl font-bold text-[#dfa62f] shadow-sm flex-shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : (
                name ? name.slice(0, 2).toUpperCase() : 'EP'
              )}
            </div>
            <div>
              <label htmlFor="avatar-upload" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 text-xs font-bold transition-all cursor-pointer">
                <Camera className="w-4 h-4 text-[#dfa62f]" />
                Choose New Avatar
              </label>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              <p className="text-[11px] text-stone-500 mt-1.5">JPG, PNG or WEBP (Max 5MB)</p>
            </div>
          </div>
        </div>

        {/* Name Field */}
        <div className="space-y-1.5">
          <label htmlFor="profile-name" className="text-xs font-bold text-stone-600 uppercase tracking-widest">Full Name</label>
          <input
            id="profile-name"
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setProfileSaved(false); }}
            placeholder="Enter full name"
            required
            className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all"
          />
        </div>

        {/* Email Field */}
        <div className="space-y-1.5">
          <label htmlFor="profile-email" className="text-xs font-bold text-stone-600 uppercase tracking-widest">Email Address</label>
          <input
            id="profile-email"
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setProfileSaved(false); }}
            placeholder="Enter email address"
            required
            className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all"
          />
        </div>

        {/* Mobile Field */}
        <div className="space-y-1.5">
          <label htmlFor="profile-mobile" className="text-xs font-bold text-stone-600 uppercase tracking-widest">Mobile Number</label>
          <div className="relative flex items-center">
            <span className="absolute left-4 text-xs font-bold text-stone-500 pointer-events-none">+91</span>
            <input
              id="profile-mobile"
              type="tel"
              value={mobile}
              maxLength={10}
              onChange={handleMobileChange}
              placeholder="9876543210"
              required
              className="w-full pl-12 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all font-mono"
            />
          </div>
        </div>

        {/* Profile Bio Field */}
        <div className="space-y-1.5">
          <label htmlFor="profile-bio" className="text-xs font-bold text-stone-600 uppercase tracking-widest">Profile Bio</label>
          <textarea
            id="profile-bio"
            rows={3}
            value={profileBio}
            onChange={(e) => { setProfileBio(e.target.value); setProfileSaved(false); }}
            placeholder="Write a brief profile bio or travel summary..."
            className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all resize-none"
          />
        </div>

        {/* Loading Banner */}
        {isPending && (
          <div className="bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-semibold rounded-2xl px-5 py-3.5 flex items-center gap-3 animate-pulse">
            <Loader2 className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
            <span>Updating profile details & uploading avatar image to server…</span>
          </div>
        )}

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl px-4 py-3">
            {errorMsg}
          </div>
        )}

        {profileSaved && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold rounded-2xl px-5 py-3.5 flex items-center gap-2.5 animate-in fade-in duration-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>✓ Profile & avatar updated successfully!</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-primary-green hover:bg-primary-green text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-60 cursor-pointer"
        >
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 text-[#dfa62f] animate-spin" />
              Updating Profile & Avatar…
            </>
          ) : (
            <>
              <Save className="w-4 h-4 text-[#dfa62f]" />
              Save Profile Changes
            </>
          )}
        </button>
      </form>

      {/* Change password */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
        <h3 className="text-xl font-bold text-primary-green">Change Password</h3>
        {[
          { label: 'Current Password', key: 'current' },
          { label: 'New Password', key: 'next' },
          { label: 'Confirm New Password', key: 'confirm' },
        ].map(({ label, key }) => (
          <div key={key} className="space-y-1.5">
            <label className="text-xs font-bold text-stone-600 uppercase tracking-widest">{label}</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="password"
                value={pwForm[key]}
                onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                className="w-full pl-11 pr-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm text-stone-900 focus:outline-none focus:border-[#dfa62f] focus:bg-white transition-all"
              />
            </div>
          </div>
        ))}
        <button
          onClick={savePassword}
          disabled={isPending}
          className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-primary-green text-white text-xs font-bold uppercase tracking-wider hover:bg-primary-green shadow-md transition-all disabled:opacity-60"
        >
          <Lock className="w-4 h-4 text-[#dfa62f]" />
          {pwSaved ? '✓ Password Updated' : 'Update Password'}
        </button>
      </div>

      {/* Danger zone */}
      <div className="border border-red-200 bg-red-50/50 rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <h3 className="font-semibold text-red-700 text-sm">Danger Zone</h3>
        </div>
        <p className="text-xs text-stone-600 leading-relaxed">
          Deleting your account is permanent. All booking history, CT Coins, and concierge notes will be purged.
        </p>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-2xl border border-red-300 bg-white text-red-600 text-xs font-bold uppercase tracking-wider hover:bg-red-50 transition-all shadow-sm"
        >
          <Trash2 className="w-4 h-4" />
          Delete Account
        </button>
      </div>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-3xl p-7 max-w-sm w-full shadow-2xl space-y-5 text-stone-900">
            <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mx-auto">
              <AlertTriangle className="w-7 h-7 text-red-600" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-primary-green">Delete Account?</h3>
              <p className="text-stone-500 text-xs mt-2">
                This action is permanent and cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 py-3 rounded-2xl border border-stone-200 bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-100 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteModal(false); logout(); }}
                className="flex-1 py-3 rounded-2xl bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Profile Page ──────────────────────────────────────────────────────────────

function ProfilePageContent() {
  const { user, ctCoins, bookings, preferences, isLoading, logout, refreshUser } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = searchParams.get('tab');

  const TAB_LABELS = {
    overview: 'Overview',
    journeys: 'My Journeys',
    ctcoins: 'CT Coins',
    preferences: 'Preferences',
    documents: 'Documents',
    settings: 'Profile',
    profile: 'Profile',
  };

  const [activeTab, setActiveTab] = useState(() => {
    return tabParam && TAB_LABELS[tabParam] ? tabParam : 'overview';
  });

  useEffect(() => {
    if (tabParam && TAB_LABELS[tabParam]) {
      setActiveTab(tabParam);
    }
  }, [tabParam]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('tab', tabId);
      window.history.replaceState(null, '', url.pathname + url.search);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <span className="w-10 h-10 border-2 border-[#dfa62f]/30 border-t-[#dfa62f] rounded-full animate-spin inline-block" />
          <p className="text-stone-600 text-sm font-medium">Loading your profile…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Back Button */}
        <button
          onClick={() => {
            if (typeof window !== 'undefined' && window.history.length > 1) {
              router.back();
            } else {
              router.push('/');
            }
          }}
          className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full border border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold transition-all group shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 text-stone-500 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back</span>
        </button>

        {/* Full-Width Landscape Member Profile Header Card at the VERY TOP */}
        <ProfileHeaderCard user={user} ctCoins={ctCoins} />

        {/* Mobile tab scroll */}
        <div className="lg:hidden mb-6 overflow-x-auto -mx-4 px-4">
          <div className="flex gap-2 w-max">
            {Object.entries(TAB_LABELS).map(([id, label]) => (
              <button
                key={id}
                onClick={() => handleTabChange(id)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-bold transition-all ${activeTab === id
                    ? 'bg-primary-green text-white shadow-md'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-[#dfa62f]'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="hidden lg:block sticky top-24">
            <ProfileSidebar
              activeTab={activeTab}
              onTab={handleTabChange}
              onLogout={logout}
            />
          </div>

          {/* Main content */}
          <div>
            {/* Heading */}
            <div className="mb-7">
              <h1 className="text-2xl sm:text-4xl font-bold text-primary-green">
                {TAB_LABELS[activeTab]}
              </h1>
              <div className="w-16 h-1 bg-[#dfa62f] mt-2 rounded-full shadow-[0_0_10px_#dfa62f]" />
            </div>

            {/* Tab content */}
            {activeTab === 'overview' && (
              <OverviewTab user={user} ctCoins={ctCoins} bookings={bookings} />
            )}
            {activeTab === 'journeys' && <JourneysTab bookings={bookings} />}
            {activeTab === 'ctcoins' && <CTCoinsCard ctCoins={ctCoins} />}
            {activeTab === 'preferences' && <PreferencesTab preferences={preferences} />}
            {activeTab === 'documents' && <DocumentsTab />}
            {(activeTab === 'settings' || activeTab === 'profile') && <SettingsTab user={user} logout={logout} refreshUser={refreshUser} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="w-10 h-10 border-2 border-[#dfa62f]/30 border-t-[#dfa62f] rounded-full animate-spin inline-block" />
      </div>
    }>
      <ProfilePageContent />
    </Suspense>
  );
}
