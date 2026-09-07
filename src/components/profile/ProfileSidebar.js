'use client';

import {
  LogOut, ChevronRight, Home, Compass, Coins, Settings, FileText, Lock
} from 'lucide-react';

const TABS = [
  { id: 'overview',    label: 'Overview',    icon: Home },
  { id: 'journeys',   label: 'My Journeys',  icon: Compass },
  { id: 'ctcoins',    label: 'CT Coins',     icon: Coins },
  { id: 'preferences',label: 'Preferences',  icon: Settings },
  { id: 'documents',  label: 'Documents',    icon: FileText },
  { id: 'settings',   label: 'Settings',     icon: Lock },
];

/**
 * ProfileSidebar — Clean navigation sidebar with dark green & gold accents.
 */
export default function ProfileSidebar({ activeTab, onTab, onLogout }) {
  return (
    <aside className="flex flex-col gap-4">
      {/* Navigation tabs */}
      <nav className="bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-5 py-3.5 border-b border-stone-100 bg-stone-50/50">
          <p className="text-[10px] uppercase font-bold text-[#dfa62f] tracking-widest">Navigation</p>
        </div>
        <div className="p-2 space-y-1">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const TabIcon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTab(tab.id)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group ${
                  isActive
                    ? 'bg-primary-green text-white font-bold shadow-md shadow-primary-green/10'
                    : 'text-stone-600 hover:bg-stone-50 hover:text-primary-green'
                }`}
              >
                <span className="flex items-center gap-3">
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-[#dfa62f]' : 'text-stone-400 group-hover:text-[#dfa62f]'}`} />
                  {tab.label}
                </span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isActive
                      ? 'text-[#dfa62f]'
                      : 'text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </nav>

      {/* Logout button */}
      <button
        onClick={onLogout}
        id="profile-logout-btn"
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-red-200 bg-white text-red-600 text-sm font-semibold hover:bg-red-50 hover:border-red-300 transition-all active:scale-[0.98] shadow-sm"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </aside>
  );
}
