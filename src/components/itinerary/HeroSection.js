import Image from "next/image";
import { Calendar, Users, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export default function HeroSection({ itinerary }) {
  const bannerImage =
    itinerary?.gallery?.find((g) => g.tag === "banner")?.url ||
    itinerary?.gallery?.[0]?.url ||
    null;

  const days = itinerary?.duration?.days;
  const nights = itinerary?.duration?.nights;
  const durationText = days && nights ? `${days} DAYS · ${nights} NIGHTS` : days ? `${days} DAYS` : null;
  const locationList = Array.isArray(itinerary?.locations) ? itinerary.locations.join(" · ") : null;

  return (
    <section className="relative w-full bg-forest-dark overflow-hidden">
      {/* Background Hero Image */}
      <div className="relative w-full h-[82vh] min-h-[580px] max-h-[820px] sm:h-[85vh]">
        {bannerImage && (
          <Image
            src={bannerImage}
            alt={`${itinerary?.title || "Luxury Expedition"} - Encamp Privé`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 1920px"
            className="object-cover object-center transform scale-105 transition-transform duration-1000 ease-out"
          />
        )}

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/45 to-forest-dark/70" />
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />

        {/* Hero Content Container */}
        <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-12 sm:pb-16 md:pb-20">
          <div className="max-w-3xl flex flex-col items-start space-y-3 sm:space-y-4">
            {/* 1. Decorative Script Accent */}
            <div className="inline-flex items-center gap-2">
              <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-light tracking-wide drop-shadow-sm">
                Explore the Best of
              </span>
            </div>

            {/* 2. Primary Display Title */}
            {itinerary?.title && (
              <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white drop-shadow-md leading-[1.05]">
                {itinerary.title}
              </h1>
            )}

            {/* 3. Duration & Tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              {durationText && (
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold/90 text-forest-dark text-xs sm:text-sm font-bold uppercase tracking-wider shadow-sm">
                  <Calendar className="w-3.5 h-3.5" />
                  {durationText}
                </span>
              )}

              {itinerary?.tripType && (
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-ivory text-xs sm:text-sm font-medium tracking-wide">
                  <Sparkles className="w-3.5 h-3.5 text-gold-light" />
                  {itinerary.tripType}
                </span>
              )}

              {locationList && (
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-stone-200 text-xs sm:text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5 text-gold-light" />
                  {locationList}
                </span>
              )}
            </div>

            {/* 4. Subtitle */}
            {itinerary?.subtitle && (
              <p className="font-sans text-sm sm:text-base md:text-lg text-stone-200/90 font-normal leading-relaxed max-w-2xl pt-1">
                {itinerary.subtitle}
              </p>
            )}

            {/* 5. Mobile Quick Meta Row */}
            <div className="w-full pt-4 border-t border-white/15 flex items-center justify-between sm:justify-start sm:gap-8 text-white/90 text-xs sm:text-sm">
              {itinerary?.people?.min && (
                <div className="flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-gold" />
                  <span>{itinerary.people.min} to {itinerary.people.max || 10} Guests</span>
                </div>
              )}
              {itinerary?.bestTime?.fromMonth && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>Best Season: {itinerary.bestTime.fromMonth} – {itinerary.bestTime.toMonth}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gold" />
                <span>100% Curated</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
