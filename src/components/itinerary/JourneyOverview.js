import { MapPin, Sun, Car, PlaneTakeoff, Trees } from "lucide-react";

export default function JourneyOverview({ itinerary }) {
  const days = itinerary?.duration?.days || 0;
  const nights = itinerary?.duration?.nights || 0;
  const locations = Array.isArray(itinerary?.locations) ? itinerary.locations : [];
  
  // Calculate total activities count dynamically from API dayWiseItinerary
  const totalActivities = (itinerary?.dayWiseItinerary || []).reduce(
    (acc, day) => acc + (Array.isArray(day?.activities) ? day.activities.length : 0),
    0
  );

  const bestTimeText =
    itinerary?.bestTime?.fromMonth && itinerary?.bestTime?.toMonth
      ? `${itinerary.bestTime.fromMonth} to ${itinerary.bestTime.toMonth}`
      : null;

  return (
    <section className="w-full bg-white text-black py-10 sm:py-14 border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Dynamic Overview Text & Why Encamp Privé from API */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="eyebrow text-gold font-semibold tracking-widest text-xs">
                Journey Overview
              </span>
              <h2 className="heading-xl text-forest font-bold tracking-tight">
                {itinerary?.title || "Expedition Overview"}
              </h2>
            </div>

            {itinerary?.subtitle && (
              <p className="body-md text-stone-700 leading-relaxed font-normal">
                {itinerary.subtitle}
              </p>
            )}

            {/* Dynamic Metrics Cards directly from API data */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 py-2">
              {days > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4 text-center">
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-forest">{days}</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-0.5">Days</div>
                </div>
              )}
              {nights > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4 text-center">
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-forest">{nights}</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-0.5">Nights</div>
                </div>
              )}
              {totalActivities > 0 && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4 text-center">
                  <div className="font-serif-display text-2xl sm:text-3xl font-bold text-forest">{totalActivities}+</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-0.5">Activities</div>
                </div>
              )}
              {itinerary?.tripType && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 sm:p-4 text-center">
                  <div className="font-serif-display text-base sm:text-lg font-bold text-forest line-clamp-1">{itinerary.tripType}</div>
                  <div className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-stone-500 mt-0.5">Travel Mode</div>
                </div>
              )}
            </div>

            {/* Dynamic Overview HTML Content directly from API (overviewText) */}
            {itinerary?.overviewText && (
              <div
                className="prose prose-stone max-w-none pt-4 border-t border-stone-100 text-stone-700 text-sm leading-relaxed [&_h3]:font-serif-display [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-forest [&_h3]:mb-3 [&_ul]:space-y-2.5 [&_li]:text-stone-700 [&_strong]:text-forest [&_strong]:font-semibold"
                dangerouslySetInnerHTML={{ __html: itinerary.overviewText }}
              />
            )}
          </div>

          {/* Right Column: Route Map & Locations directly from API */}
          <div className="lg:col-span-5 space-y-5">
            {locations.length > 0 && (
              <div className="bg-ivory/60 border border-stone-300/80 rounded-2xl p-5 sm:p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-serif-display text-base font-bold text-forest uppercase tracking-wider">
                      Expedition Route
                    </span>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {locations.length} Locations
                  </span>
                </div>

                {/* Route Path Flow from API locations array */}
                <div className="relative pl-6 space-y-4 border-l-2 border-dashed border-gold/60 my-2">
                  {locations.map((loc, idx) => (
                    <div key={idx} className="relative">
                      <div
                        className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-white ${
                          idx === 0 || idx === locations.length - 1 ? "bg-forest" : "bg-gold"
                        }`}
                      />
                      <div className="text-xs font-bold uppercase text-forest">{loc}</div>
                      <div className="text-[11px] text-stone-600">
                        {idx === 0 ? "Expedition Start Point" : idx === locations.length - 1 ? "Expedition Destination" : "En-route Destination"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Travel Essentials Grid populated directly from API attributes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {bestTimeText && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
                  <Sun className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-forest uppercase tracking-wider">Best Time To Visit</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">{bestTimeText}</div>
                  </div>
                </div>
              )}

              {itinerary?.state && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
                  <PlaneTakeoff className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-forest uppercase tracking-wider">Region / State</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5 uppercase">{itinerary.state}</div>
                  </div>
                </div>
              )}

              {itinerary?.tripType && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
                  <Car className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-forest uppercase tracking-wider">Trip Type</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">{itinerary.tripType}</div>
                  </div>
                </div>
              )}

              {itinerary?.carbonFootprint !== undefined && (
                <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 flex items-start gap-3">
                  <Trees className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-forest uppercase tracking-wider">Carbon Footprint</div>
                    <div className="text-xs text-stone-600 font-medium mt-0.5">{itinerary.carbonFootprint} kg CO₂ Neutralized</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
