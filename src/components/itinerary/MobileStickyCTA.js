'use client';

import DownloadPdfButton from './DownloadPdfButton';
import ShareItineraryButton from './ShareItineraryButton';
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
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-[#123B2A]/95 backdrop-blur-md border-t border-[#dfa62f]/40 px-3 py-2.5 shadow-2xl flex items-center justify-between gap-2.5 animate-fadeIn">
      <div className="flex items-center gap-2 shrink-0">
        <DownloadPdfButton itinerary={itinerary} variant="sticky" />
        <ShareItineraryButton itinerary={itinerary} variant="sticky" />
      </div>

      <button
        type="button"
        onClick={scrollToBooking}
        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#dfa62f] via-[#eab63e] to-[#c99a2c] hover:from-[#eab63e] hover:to-[#dfa62f] text-[#123B2A] font-poppins text-xs font-black uppercase tracking-wider shadow-md hover:shadow-lg active:scale-98 transition-all cursor-pointer"
      >
        <span>Book Now</span>
        <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
      </button>
    </div>
  );
}
