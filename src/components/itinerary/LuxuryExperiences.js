"use client";

import Image from "next/image";
import {
  LotusHeaderIcon,
  CardBottomDivider,
  MedallionFrame,
} from "./LuxuryExperienceIcons";
import { mapItineraryExperiences } from "./luxuryExperiencesData";

/**
 * Luxury Experiences Section (The Luxurious Edit)
 * 
 * Features dynamic mapping of backend API titles to bespoke 24kt gold vector SVG icons:
 * - Private Tea Estate Experience
 * - Dedicated Luxury SUV
 * - Umiam Lake Escape
 * - Curated Dining
 * - Living Root Heritage
 * - Wellness & Leisure
 * - Private Scenic Stops
 * - Sunrise on the Ganges
 * - Curated Kashi Dining
 * - Private Transfers
 * - Luxury Spa Ritual
 * - Ganges from the Water
 */
export default function LuxuryExperiences({ experiences = [], itinerary = null }) {
  // 1. Fully dynamic mapping from backend API data for any destination
  const rawList = Array.isArray(experiences) ? experiences : [];
  const experienceList = mapItineraryExperiences(rawList);

  if (experienceList.length === 0) {
    return null;
  }

  // 2. Dynamic destination subtitle for any state/destination
  const destination = itinerary?.state || itinerary?.destination || itinerary?.location;
  const destinationSubtitle = destination
    ? `TIMELESS MOMENTS IN ${destination.toUpperCase()}`
    : "TIMELESS MOMENTS";

  const isVaranasiOrKashi =
    itinerary?.state?.toLowerCase().includes("uttar pradesh") ||
    itinerary?.destination?.toLowerCase().includes("varanasi") ||
    itinerary?.title?.toLowerCase().includes("kashi") ||
    itinerary?.subtitle?.toLowerCase().includes("kashi");

  const gridColClass =
    experienceList.length === 1
      ? "grid-cols-1 max-w-sm"
      : experienceList.length === 2
        ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
        : experienceList.length === 3
          ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl"
          : experienceList.length === 4
            ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl"
            : "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 2xl:grid-cols-5 max-w-[1720px]";

  return (
    <section className="relative w-full bg-[#fbf9f4] font-poppins pt-10 pb-12 sm:pt-14 sm:pb-16 overflow-hidden">
      {/* 1. Heritage Mandala Watermark */}
      <div className="absolute -left-16 -top-12 w-[340px] sm:w-[420px] md:w-[500px] h-[340px] sm:h-[420px] md:h-[500px] opacity-[0.14] pointer-events-none select-none z-0">
        <Image src="/images/kashi_mandala_bg.svg" alt="" fill className="object-contain" priority={false} />
      </div>

      {/* 2. Destination Specific Ghats Silhouette (Only for Kashi/Varanasi itineraries) */}
      {isVaranasiOrKashi && (
        <>
          <div className="absolute right-0 top-0 w-[380px] sm:w-[520px] md:w-[650px] h-[260px] sm:h-[320px] md:h-[380px] opacity-[0.20] pointer-events-none select-none z-0">
            <Image src="/images/kashi_ghats_bg.svg" alt="" fill className="object-contain object-top-right" priority={false} />
          </div>
          <div className="absolute right-4 sm:right-12 md:right-20 bottom-1 sm:bottom-2 w-[180px] sm:w-[240px] md:w-[280px] h-[65px] sm:h-[85px] md:h-[100px] opacity-[0.38] pointer-events-none select-none z-0">
            <Image src="/images/kashi_boat_bg.svg" alt="" fill className="object-contain" priority={false} />
          </div>
        </>
      )}

      {/* 4. Bottom River Horizon Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f6eee0]/60 to-transparent pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header with Generous Luxury Spacing */}
        <div className="text-center mb-8 sm:mb-10 space-y-2.5 sm:space-y-3">
          <div className="flex justify-center mb-2 sm:mb-3">
            <LotusHeaderIcon className="w-8 h-6 sm:w-9 sm:h-7 text-[#b38320] transition-transform duration-300 hover:scale-110" />
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8">
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-r from-transparent via-[#b38320]/60 to-[#123b2a]" />
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-[0.22em] text-[#123b2a] uppercase select-none">
              LUXURY EXPERIENCES
            </h2>
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-l from-transparent via-[#b38320]/60 to-[#123b2a]" />
          </div>

          <p className="text-[#b38320] text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-2 select-none pt-1">
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
            <span>{destinationSubtitle}</span>
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
          </p>
        </div>

        {/* Centered Luxury Experience Cards Grid - 5 Cards in a Row on Desktop */}
        <div className={`grid ${gridColClass} gap-3 sm:gap-4 lg:gap-4 xl:gap-5 items-stretch pt-2 mx-auto justify-center`}>
          {experienceList.map((exp, i) => (
            <div
              key={exp._id || exp.id || i}
              className="group relative flex flex-col justify-between p-4 sm:p-5 pt-5 sm:pt-6 pb-4 sm:pb-5 rounded-[28px] min-h-[295px] sm:min-h-[315px] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_16px_36px_-6px_rgba(201,157,64,0.28)] z-10 hover:z-20 cursor-default bg-transparent"
            >
              {/* SVG Card Background Frame - Royal Burgundy Velvet */}
              <Image
                src="/images/luxury_card_frame_burgundy.svg"
                alt=""
                fill
                className="object-fill -z-10 pointer-events-none select-none transition-transform duration-300 group-hover:scale-[1.01]"
              />

              {/* Top Section: Medallion with Golden Filigree & Bespoke Experience Icon */}
              <div className="pt-2 sm:pt-2.5 pb-1 flex justify-center">
                <MedallionFrame
                  title={exp.title}
                  iconKey={exp.iconKey}
                  isActive={true}
                  className="w-28 sm:w-32 xl:w-36 h-14 sm:h-16 xl:h-18"
                />
              </div>

              {/* Middle Section: Title & Description (Evenly Spaced) */}
              <div className="flex-1 flex flex-col items-center justify-center text-center py-2 px-1.5 w-full my-auto">
                <h3 className="font-display-serif text-sm sm:text-[0.98rem] xl:text-[1.05rem] font-bold tracking-[0.05em] leading-snug text-white uppercase w-full mb-2 transition-colors duration-200 group-hover:text-[#FFFDF7]">
                  {exp.title}
                </h3>

                {/* Horizontal Accent Line Below Title with Clear Margin & Smooth Expansion */}
                <div className="w-12 sm:w-14 h-[1px] bg-gradient-to-r from-transparent via-[#FFEAA8]/85 to-transparent mb-2.5 mx-auto transition-all duration-300 group-hover:w-18 group-hover:via-[#FFEAA8]" />

                <p className="text-[11.5px] sm:text-xs xl:text-[12.5px] leading-relaxed w-full text-[#F5EDE1]/90 font-sans px-1 font-light tracking-wide">
                  {exp.description}
                </p>
              </div>

              {/* Bottom Section: Delicate Gold Filigree Divider */}
              <div className="pb-1.5 sm:pb-2 pt-1 flex justify-center transition-transform duration-300 group-hover:scale-105">
                <CardBottomDivider isActive={true} className="w-24 sm:w-28 h-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
