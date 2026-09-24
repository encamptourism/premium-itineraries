'use client';

import Image from "next/image";
import TransparentImageCanvas from "./TransparentImageCanvas";
import { Calendar, Users, MapPin, Sparkles, ShieldCheck } from "lucide-react";

export default function HeroSection({ itinerary }) {
  const heroMedia = itinerary?.heroMedia;
  const isCustomLogo = Boolean(heroMedia?.logoUrl);
  const hindiLogoUrl = heroMedia?.logoUrl || heroMedia?.hindiLogoUrl || null;
  const isCustomEnglishLogo = Boolean(heroMedia?.englishLogoUrl || heroMedia?.logoUrlEnglish);
  const englishLogoUrl =
    heroMedia?.englishLogoUrl ||
    heroMedia?.logoUrlEnglish ||
    "/images/tag_logo.png";
  const bannerImage =
    (heroMedia?.url && heroMedia.url.trim() !== "" && heroMedia.url) ||
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

        {/* Top Left: English Logo */}
        {englishLogoUrl && (
          <div className="absolute left-4 sm:left-8 top-3 sm:top-5 z-30 w-36 sm:w-44 lg:w-52 h-12 sm:h-15 lg:h-18 shrink-0 bg-transparent pointer-events-none overflow-hidden">
            <TransparentImageCanvas
              src={englishLogoUrl}
              alt="Encamp Privé Logo"
              fill
              className="object-contain object-left drop-shadow-md"
            />
          </div>
        )}

        {/* Gradient Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/45 to-forest-dark/70" />
        <div className="absolute inset-0 bg-black/25 mix-blend-multiply" />

        {/* Hero Content Container - Centered */}
        <div className="relative z-10 h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center my-auto pb-8 sm:pb-12">
          <div className="w-full flex flex-col items-center justify-center space-y-3 sm:space-y-4">
            {/* Logo on Top of Subtitle - Responsive & Enlarged */}
            {hindiLogoUrl && (
              <div className="relative w-full max-w-[300px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px] xl:max-w-[760px] h-28 sm:h-36 md:h-44 lg:h-52 xl:h-60 shrink-0 mx-auto pointer-events-none mb-1 sm:mb-2">
                {/* Backdrop Overlay directly below/behind logo image */}
                <div className="absolute -inset-x-8 sm:-inset-x-14 -inset-y-6 sm:-inset-y-10 bg-black/60 rounded-full blur-3xl -z-10 pointer-events-none" />
                <TransparentImageCanvas
                  src={hindiLogoUrl}
                  alt={itinerary?.title ? `${itinerary.title} Logo` : "Logo"}
                  fill
                  className="object-contain object-center drop-shadow-md"
                />
              </div>
            )}

            {/* 1. Decorative Script Accent / Subtitle */}
            {itinerary?.subtitle ? (
              <span className="font-script text-2xl sm:text-3xl md:text-4xl text-gold-light tracking-wide drop-shadow-sm">
                {itinerary.subtitle}
              </span>
            ) : (
              <div className="inline-flex items-center gap-2">
                <span className="font-script text-3xl sm:text-4xl md:text-5xl text-gold-light tracking-wide drop-shadow-sm">
                  Explore the Best of
                </span>
              </div>
            )}

            {/* 2. Primary Display Title: Only show if logoUrl does NOT exist */}
            {!isCustomLogo && itinerary?.title && (
              <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-white drop-shadow-md leading-[1.05]">
                {itinerary.title}
              </h1>
            )}

            {/* 3. Duration & Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-1">
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
