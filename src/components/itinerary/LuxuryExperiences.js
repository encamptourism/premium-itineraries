"use client";

import Image from "next/image";
import {
  LotusHeaderIcon,
  CardBottomDivider,
  MedallionFrame,
} from "./LuxuryExperienceIcons";

export default function LuxuryExperiences({ experiences = [], itinerary = null }) {
  const experienceList = Array.isArray(experiences) ? experiences : [];

  if (experienceList.length === 0) {
    return null;
  }

  const destinationSubtitle =
    itinerary?.title?.toLowerCase().includes("kashi") ||
      itinerary?.subtitle?.toLowerCase().includes("kashi") ||
      !itinerary?.state
      ? "TIMELESS MOMENTS "
      : `TIMELESS MOMENTS IN ${itinerary.state.toUpperCase()}`;

  const gridColClass =
    experienceList.length === 1
      ? "grid-cols-1 max-w-sm"
      : experienceList.length === 2
      ? "grid-cols-1 sm:grid-cols-2 max-w-2xl"
      : experienceList.length === 3
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl"
      : experienceList.length === 4
      ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-[1360px]"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 max-w-[1680px]";

  return (
    <section className="relative w-full bg-[#fbf9f4] font-poppins pt-8 pb-10 sm:pt-12 sm:pb-14 overflow-hidden">
      {/* 1. Left Heritage Mandala Watermark */}
      <div className="absolute -left-16 -top-12 w-[340px] sm:w-[420px] md:w-[500px] h-[340px] sm:h-[420px] md:h-[500px] opacity-[0.14] pointer-events-none select-none z-0">
        <Image src="/images/kashi_mandala_bg.svg" alt="" fill className="object-contain" priority={false} />
      </div>

      {/* 2. Right Heritage Ghats & Temples Silhouette */}
      <div className="absolute right-0 top-0 w-[380px] sm:w-[520px] md:w-[650px] h-[260px] sm:h-[320px] md:h-[380px] opacity-[0.20] pointer-events-none select-none z-0">
        <Image src="/images/kashi_ghats_bg.svg" alt="" fill className="object-contain object-top-right" priority={false} />
      </div>

      {/* 3. Bottom Right Traditional Wooden Boatman Silhouette */}
      <div className="absolute right-4 sm:right-12 md:right-20 bottom-1 sm:bottom-2 w-[180px] sm:w-[240px] md:w-[280px] h-[65px] sm:h-[85px] md:h-[100px] opacity-[0.38] pointer-events-none select-none z-0">
        <Image src="/images/kashi_boat_bg.svg" alt="" fill className="object-contain" priority={false} />
      </div>

      {/* 4. Bottom River Horizon Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f6eee0]/60 to-transparent pointer-events-none z-0" />

      {/* Main Content Container */}
      <div className="relative z-10 w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1720px] mx-auto px-2 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 space-y-1">
          <div className="flex justify-center mb-1">
            <LotusHeaderIcon className="w-8 h-6 sm:w-9 sm:h-7 text-[#b38320]" />
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8">
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-r from-transparent via-[#b38320]/60 to-[#123b2a]" />
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-[0.22em] text-[#123b2a] uppercase select-none">
              LUXURY EXPERIENCES
            </h2>
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-l from-transparent via-[#b38320]/60 to-[#123b2a]" />
          </div>

          <p className="text-[#b38320] text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-2 select-none">
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
            <span>{destinationSubtitle}</span>
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
          </p>
        </div>

        {/* Centered Luxury Experience Cards Grid */}
        <div className={`grid ${gridColClass} gap-4 sm:gap-4 md:gap-5 items-stretch pt-2 mx-auto justify-center`}>
          {experienceList.map((exp, i) => (
            <div
              key={exp._id || exp.id || i}
              className="group relative flex flex-col justify-between p-4 sm:p-5 rounded-2xl min-h-[270px] sm:min-h-[290px] transition-transform duration-200 ease-out hover:scale-[1.03] z-10 hover:z-20 cursor-default"
            >
              {/* SVG Card Background Frame - Royal Burgundy Velvet */}
              <Image
                src="/images/luxury_card_frame_burgundy.svg"
                alt=""
                fill
                className="object-fill -z-10 pointer-events-none select-none"
              />

              {/* Top Section: Medallion with Golden Filigree & Luxury Symbol */}
              <div className="pt-1 sm:pt-2 flex justify-center">
                <MedallionFrame isActive={true} />
              </div>

              {/* Middle Section: Title & Description (Full Width) */}
              <div className="flex-1 flex flex-col items-center justify-center text-center my-2 px-1 w-full">
                <h3 className="font-display-serif text-base sm:text-lg md:text-[1.15rem] font-bold tracking-wide leading-snug text-white w-full">
                  {exp.title}
                </h3>

                {/* Horizontal Accent Line After Title */}
                <div className="w-14 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#FFEAA8]/80 to-transparent my-2.5" />

                <p className="text-xs sm:text-[13px] leading-relaxed w-full text-[#f3ede3]">
                  {exp.description}
                </p>
              </div>

              {/* Bottom Section: Delicate Gold Filigree Divider */}
              <div className="pb-1 sm:pb-2 flex justify-center">
                <CardBottomDivider isActive={true} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
