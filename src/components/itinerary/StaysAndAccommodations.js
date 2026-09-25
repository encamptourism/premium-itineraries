'use client';

import React, { useRef, useEffect } from 'react';
import {
  Images,
  Leaf,
  MapPin,
  Star,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Car,
  Utensils,
  Coffee,
  ShowerHead,
  Flame,
  Wifi,
} from 'lucide-react';

const AMENITIES = {
  wifi: { label: 'Wi-Fi', bg: '#f3e8ff', color: '#9333ea', icon: Wifi },
  breakfast: { label: 'Breakfast', bg: '#fef3c7', color: '#d97706', icon: Coffee },
  dinner: { label: 'Dinner', bg: '#f3e8ff', color: '#9333ea', icon: Utensils },
  lunch: { label: 'Lunch', bg: '#ffedd5', color: '#ea580c', icon: Utensils },
  water: { label: 'Hot Water', bg: '#e0f2fe', color: '#0284c7', icon: ShowerHead },
  bonfire: { label: 'Bonfire', bg: '#ffe4e6', color: '#e11d48', icon: Flame },
  parking: { label: 'Parking', bg: '#dcfce7', color: '#16a34a', icon: Car },
};

const getAmenity = (tag) => {
  const key = Object.keys(AMENITIES).find((k) => tag?.toLowerCase().includes(k));
  return AMENITIES[key] || { label: tag, bg: '#e0e7ff', color: '#4f46e5', icon: CheckCircle2 };
};

const getImages = (s) => {
  const raw = [s.images, s.image, s.gallery, s.cover, s.coverImage].flat(2).filter(Boolean);
  return [...new Set(raw.map((i) => (typeof i === 'string' ? i : i?.url || i?.image || i?.src)).filter(Boolean))];
};

export default function StaysAndAccommodations({ itinerary, data, onViewDetails }) {
  const sliderRef = useRef(null);
  const d = itinerary || data;
  if (!d) return null;

  const staysMap = {};
  (d.dayWiseItinerary || []).forEach((day, idx) => {
    (day.stay || []).forEach((stay) => {
      const name = typeof stay === 'object' ? stay.name : stay;
      if (!name) return;
      if (!staysMap[name]) {
        staysMap[name] = {
          raw: typeof stay === 'object' ? stay : {},
          name: name.replace(/&amp;/g, '&'),
          days: [],
          images: getImages(stay),
        };
      }
      staysMap[name].days.push(`Day ${day.dayNumber ?? idx + 1}`);
    });
  });

  const stays = Object.values(staysMap);
  if (stays.length === 0) return null;

  const scrollByDirection = (dir) => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: dir * 360, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el || stays.length <= 1) return;
    let paused = false;
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);
    el.addEventListener('touchstart', pause, { passive: true });
    el.addEventListener('touchend', resume);
    const id = setInterval(() => {
      if (paused) return;
      const cardWidth = el.firstElementChild?.offsetWidth || 360;
      const maxScroll = el.scrollWidth - el.clientWidth;
      if (el.scrollLeft >= maxScroll - 4) {
        el.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        el.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
      }
    }, 5000);
    return () => {
      clearInterval(id);
      el.removeEventListener('mouseenter', pause);
      el.removeEventListener('mouseleave', resume);
      el.removeEventListener('touchstart', pause);
      el.removeEventListener('touchend', resume);
    };
  }, [stays.length]);

  const handleClick = (slug) => {
    if (onViewDetails) return onViewDetails();
    if (slug) {
      window.location.href = `/${d.state || 'meghalaya'}/accommodation/${slug}`;
      return;
    }
    document.getElementById('booking-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section className="w-full bg-[#fbf9f4] font-poppins pt-2 pb-6 sm:pt-4 sm:pb-8">
      <div className="w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="w-full lg:w-[75%]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6">
            <div className="flex flex-col w-full">
              <div className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 mb-1">
                <h2 className="font-serif-display text-base sm:text-lg md:text-xl font-semibold uppercase tracking-[0.25em] text-[#123B2A] whitespace-nowrap -translate-y-[1px]">
                  Stays & Accommodations
                </h2>
              </div>
              <div className="hidden sm:block w-full h-[1px] bg-[#E2D8C3]" />
            </div>

            {stays.length > 2 && (
              <div className="hidden sm:flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollByDirection(-1)}
                  aria-label="Previous stays"
                  className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollByDirection(1)}
                  aria-label="Next stays"
                  className="w-8 h-8 rounded-full border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="overflow-hidden">
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none pb-2"
              style={{ WebkitOverflowScrolling: 'touch' }}
            >
            {stays.map((stay, idx) => {
              const raw = stay.raw;
              const mainImage = stay.images[0] || raw.image || d?.gallery?.[0]?.url || '';
              const location = [raw.district, raw.state].filter(Boolean).join(', ') || raw.location || d.state || '';
              const retreatType = raw.comfort || raw.locationtype || raw.roomType || raw.subtitle || '';
              const price = raw.price || raw.pricing?.[0]?.price;
              const amenities = [...(raw.otherDetails?.amenities || raw.amenities || []), ...(raw.otherDetails?.meal || raw.meals || [])].slice(0, 4);

              return (
                <div
                  key={idx}
                  className={stays.length === 1
                    ? 'flex-none w-full snap-start'
                    : 'flex-none w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] snap-start'
                  }
                >
                  <div className="w-full h-full bg-white rounded-2xl sm:rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group">
                    <div>
                      <div
                        onClick={() => handleClick(raw.slug)}
                        className="relative h-56 sm:h-64 w-full overflow-hidden cursor-pointer"
                      >
                        {mainImage ? (
                          <img
                            src={mainImage}
                            alt={stay.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full bg-stone-800" />
                        )}

                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-2 z-10 pointer-events-none">
                          <div className="flex flex-wrap items-center gap-1.5 max-w-[75%]">
                            {stay.days.map((dayLabel, dIdx) => (
                              <span
                                key={dIdx}
                                className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-[#b00fd4] to-[#7928ca] text-white text-[10px] sm:text-[11px] font-bold uppercase shadow-xs whitespace-nowrap"
                              >
                                {dayLabel}
                              </span>
                            ))}
                          </div>

                          {stay.images.length > 0 && (
                            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 text-stone-800 text-[11px] font-bold shadow-xs shrink-0">
                              <Images className="w-3.5 h-3.5 text-stone-700" />
                              <span>{stay.images.length}</span>
                            </div>
                          )}
                        </div>

                        <div className="absolute inset-x-0 bottom-0 pt-16 pb-3 px-4 bg-gradient-to-t from-black/90 via-black/45 to-transparent flex flex-col justify-end text-white z-10">
                          {raw.rating && (
                            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-400 text-stone-900 text-[11px] font-bold w-fit mb-1 shadow-xs">
                              <Star className="w-3 h-3 fill-stone-900 text-stone-900" />
                              <span>{raw.rating}</span>
                            </div>
                          )}

                          <h3 className="text-lg sm:text-xl font-bold text-white leading-snug drop-shadow-sm line-clamp-1 group-hover:text-amber-200 transition-colors">
                            {stay.name}
                          </h3>

                          {retreatType && (
                            <div className="flex items-center gap-1.5 text-xs text-stone-200 font-medium mt-1">
                              <Leaf className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 shrink-0" />
                              <span>{retreatType}</span>
                            </div>
                          )}

                          {location && (
                            <div className="flex items-center gap-1.5 text-xs text-stone-200 font-medium mt-0.5">
                              <MapPin className="w-3.5 h-3.5 text-fuchsia-400 fill-fuchsia-400 shrink-0" />
                              <span>{location}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {amenities.length > 0 && (
                        <div className="px-4 py-3 bg-white border-b border-stone-100 flex items-center gap-3 overflow-x-auto scrollbar-none">
                          {amenities.map((item, aIdx) => {
                            const cfg = getAmenity(item);
                            const IconComponent = cfg.icon;
                            return (
                              <div key={aIdx} className="flex items-center gap-1.5 text-xs text-stone-700 font-medium whitespace-nowrap shrink-0">
                                <div
                                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                                >
                                  <IconComponent className="w-3 h-3" />
                                </div>
                                <span>{cfg.label}</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    <div className="px-3 py-2 bg-white flex items-center justify-between gap-2">
                      {price ? (
                        <div>
                          <span className="text-[9px] text-stone-400 uppercase font-medium leading-none block mb-0.5">
                            Starts from
                          </span>
                          <div className="flex items-baseline gap-0.5">
                            <span className="text-[13px] font-extrabold text-[#7928ca]">
                              ₹{Number(price).toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-stone-500 font-normal">
                              /night
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div />
                      )}

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleClick(raw.slug)}
                          className="px-2.5 py-1 rounded-lg border border-fuchsia-500/80 hover:border-fuchsia-600 text-fuchsia-600 hover:bg-fuchsia-50 text-[10px] font-bold flex items-center gap-0.5 transition-all cursor-pointer whitespace-nowrap"
                        >
                          <span>View Details</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[9px] font-bold whitespace-nowrap shrink-0">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>Included</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
