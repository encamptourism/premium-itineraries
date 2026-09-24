'use client';

import DownloadPdfButton from './DownloadPdfButton';
import { ArrowUpRight } from 'lucide-react';

export default function MobileStickyCTA({ itinerary }) {
  const scrollToBooking = () => {
    const card = document.getElementById('booking-card') || document.getElementById('package-booking-card');
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#123B2A]/95 backdrop-blur-md border-t border-[#dfa62f]/40 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-3 animate-fadeIn">
      {/* Quick Download PDF Icon Button */}
      <DownloadPdfButton itinerary={itinerary} variant="sticky" />

      {/* Main Book Now / Scroll Action Button */}
      <button
        type="button"
        onClick={scrollToBooking}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfa62f] to-[#c99a2c] text-[#123B2A] font-poppins text-xs font-black uppercase tracking-wider shadow-md active:scale-98 transition-transform cursor-pointer"
      >
        <span>Select Package & Book</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
