'use client';

import { useEffect } from "react";
import Image from "next/image";
import {
  Compass,
  Home,
  UserCheck,
  Headset,
  Leaf,
} from "lucide-react";
import { useCarbonTrace } from "@/context/CarbonTraceContext";

export default function ReferencePosterHeader({ itinerary }) {
  const ctContext = useCarbonTrace();
  const setCheckoutData = ctContext?.setCheckoutData;

  const bannerImage =
    itinerary?.gallery?.find((g) => g.tag === "banner")?.url ||
    itinerary?.gallery?.[0]?.url ||
    "";

  const days = itinerary?.duration?.days || 0;
  const nights = itinerary?.duration?.nights || 0;
  const durationText = days && nights ? `${days} DAYS | ${nights} NIGHTS` : days ? `${days} DAYS` : "";

  const startingPrice = itinerary?.packagePricing?.premiumPackagePrice || itinerary?.startingFrom?.[0]?.totalPricePerPerson || itinerary?.startingFrom?.[0]?.pricePerPerson || 0;

  // Dynamically sync current itinerary invoice price & carbon footprint to CarbonTrace SDK
  useEffect(() => {
    if (itinerary && typeof setCheckoutData === "function") {
      const carbon = itinerary.carbonFootprint || itinerary.carbon_footprint || 0;
      setCheckoutData({
        invoiceAmount: startingPrice,
        carbonFootprint: carbon,
      });
    }
  }, [itinerary, startingPrice, setCheckoutData]);

  return (
    <div className="w-full bg-[#fbf9f4] font-poppins pb-2 sm:pb-8 lg:pb-10">

      {/* 100% Full Screen Width Hero Section */}
      <section className="relative w-full bg-primary-green overflow-visible pt-3 sm:pt-6 pb-8 sm:pb-14 h-[80vh] min-h-[560px] lg:min-h-[640px] lg:h-[80vh] flex flex-col justify-between shadow-none sm:shadow-2xl">

        {/* Full Viewport Screen Width API Hero Background Image */}
        {bannerImage && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={bannerImage}
              alt={itinerary?.title || "Encamp Expedition Hero"}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center transform scale-102 transition-transform duration-1000"
            />
            {/* Rich Scrim Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/60" />
          </div>
        )}

        {/* Top Left: Encamp Tag Logo anchored directly to Hero Section */}
        <div className="absolute left-3 sm:left-6 lg:left-8 top-3 sm:top-5 z-30 w-36 sm:w-48 lg:w-56 h-12 sm:h-16 lg:h-20 shrink-0 rounded-xl overflow-hidden">
          <Image
            src="/images/tag_logo.png"
            alt="Encamp Privé Logo"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Content Container with percentage width */}
        <div className="relative z-10 w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col justify-center my-auto h-full">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center justify-between w-full my-auto h-full">
            {/* Left & Center: Crest Logo & Title Banner */}
            <div className="lg:col-span-9 xl:col-span-9 relative flex flex-col justify-center items-center h-full space-y-2 sm:space-y-4 my-auto">

              {/* Top Center: Editorial Title Section (Visually Balanced Vertical & Horizontal Center) */}
              <div className="w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-2 sm:px-4 lg:pl-12 xl:pl-20 lg:pr-4 text-white my-auto lg:mt-8 z-10">
                {itinerary?.subtitle && (
                  <span className="font-script text-base sm:text-lg md:text-xl lg:text-2xl text-[#f0c85a] drop-shadow-md leading-tight">
                    {itinerary.subtitle}
                  </span>
                )}

                {itinerary?.title && (
                  <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-[0.06em] text-white drop-shadow-lg leading-tight my-1">
                    {itinerary.title}
                  </h1>
                )}

                {/* Double-Pointed Gold Ribbon Banner with Attached Gold Accent Lines */}
                {durationText && (
                  <div className="flex items-center justify-center gap-0 my-1.5 sm:my-2 w-full">
                    {/* Left Attached Gold Accent Line */}
                    <span className="h-[1.5px] w-6 sm:w-14 md:w-20 lg:w-24 bg-[#d4a853] opacity-85" />

                    {/* Double-Pointed Gold Ribbon Banner */}
                    <div className="relative px-3 sm:px-7 py-0.5 sm:py-1 bg-gradient-to-r from-[#c68e22] via-[#e5aa2d] to-[#c68e22] text-[#fffdf5] font-serif text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] shadow-md [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_50%,calc(100%-9px)_100%,9px_100%,0_50%)] flex items-center justify-center shrink-0">
                      {durationText}
                    </div>

                    {/* Right Attached Gold Accent Line */}
                    <span className="h-[1.5px] w-6 sm:w-14 md:w-20 lg:w-24 bg-[#d4a853] opacity-85" />
                  </div>
                )}
              </div>

            </div>

            {/* Right 3 Columns spacer on desktop to balance left center title */}
            <div className="hidden lg:block lg:col-span-3 xl:col-span-3 h-full" />

          </div>

        </div>

        {/* 5-Pillars Horizontal Strip EXACTLY ANCHORED AT BOTTOM EDGE (50% INSIDE / 50% OUTSIDE) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-4 xl:left-8 lg:translate-x-0 transform translate-y-1/2 max-w-xl lg:max-w-2xl w-[94%] sm:w-auto bg-white text-primary-green rounded-full py-1.5 sm:py-2.5 px-3 sm:px-6 border border-[#f0c85a]/40 shadow-xl z-30">
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1 divide-x divide-stone-200">

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Compass className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Handpicked Experiences
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Home className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Exclusive Stays
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <UserCheck className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Local Experts
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Headset className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                24x7 Support
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Leaf className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Sustainable Travel
              </span>
            </div>

          </div>
        </div>

      </section>

    </div>
  );
}
