'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Compass,
  Home,
  UserCheck,
  Headset,
  Leaf,
} from "lucide-react";
import { useCarbonTrace } from "@/context/CarbonTraceContext";

export default function ItineraryHeroSection({ itinerary }) {
  const ctContext = useCarbonTrace();
  const setCheckoutData = ctContext?.setCheckoutData;

  const heroMedia = itinerary?.heroMedia;
  const isCustomLogo = Boolean(heroMedia?.logoUrl);
  const hindiLogoUrl = heroMedia?.logoUrl || heroMedia?.hindiLogoUrl || null;
  const isCustomEnglishLogo = Boolean(heroMedia?.englishLogoUrl || heroMedia?.logoUrlEnglish);
  const englishLogoUrl =
    heroMedia?.englishLogoUrl ||
    heroMedia?.logoUrlEnglish ||
    "/images/tag_logo.png";

  const [imageErrorIndex, setImageErrorIndex] = useState(0);

  const resolveImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string" && img.trim() !== "") return img.trim();
    if (typeof img === "object") {
      return (
        img.url ||
        img.heroImage ||
        img.bannerUrl ||
        img.imageUrl ||
        img.src ||
        img.image ||
        img.path ||
        null
      );
    }
    return null;
  };

  const potentialImages = [
    resolveImageUrl(itinerary?.heroMedia),
    resolveImageUrl(itinerary?.heroMedia?.url),
    resolveImageUrl(itinerary?.heroMedia?.heroImage),
    resolveImageUrl(itinerary?.heroMedia?.bannerUrl),
    resolveImageUrl(itinerary?.heroMedia?.imageUrl),
    resolveImageUrl(itinerary?.bannerImage),
    resolveImageUrl(itinerary?.heroImage),
    resolveImageUrl(itinerary?.heroImageUrl),
    resolveImageUrl(itinerary?.bannerUrl),
    resolveImageUrl(itinerary?.coverImage),
    resolveImageUrl(itinerary?.image),
    resolveImageUrl(itinerary?.featuredImage),
    resolveImageUrl(itinerary?.gallery?.find((g) => (typeof g === "object" ? g?.tag === "banner" : false))),
    ...(Array.isArray(itinerary?.gallery) ? itinerary.gallery.map(resolveImageUrl) : []),
    ...(Array.isArray(itinerary?.images) ? itinerary.images.map(resolveImageUrl) : []),
  ].filter((url, index, self) => typeof url === "string" && url.trim() !== "" && self.indexOf(url) === index);

  const bannerImage = potentialImages[imageErrorIndex] || potentialImages[0] || "";

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
      <section className="relative w-full bg-primary-green overflow-visible pt-3 sm:pt-6 pb-8 sm:pb-14 h-[80vh] min-h-[400px] sm:min-h-[560px] lg:min-h-[640px] lg:h-[80vh] flex flex-col justify-between shadow-none sm:shadow-2xl">

        {/* Full Viewport Screen Width API Hero Background Image */}
        {bannerImage && (
          <div className="absolute inset-0 w-full h-full overflow-hidden">
            <Image
              src={bannerImage}
              alt={itinerary?.title || "Encamp Expedition Hero"}
              fill
              priority
              sizes="100vw"
              onError={() => {
                if (imageErrorIndex + 1 < potentialImages.length) {
                  setImageErrorIndex((prev) => prev + 1);
                }
              }}
              className="object-cover object-center transform scale-102 transition-transform duration-1000"
            />
            {/* Rich Scrim Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/20 to-black/60" />
          </div>
        )}

        {/* SVG Filter to make white background transparent without multiplying or black borders */}
        <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <defs>
            <filter id="remove-white" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  -2.5 -2.5 -2.5 0 6.5
                "
                result="masked"
              />
              <feComposite in="masked" in2="SourceGraphic" operator="in" />
            </filter>
          </defs>
        </svg>

        {/* Top Right: English Logo */}
        {englishLogoUrl && (
          <div className="absolute right-3 sm:right-6 lg:right-8 top-3 sm:top-5 z-30 w-36 sm:w-44 lg:w-52 h-12 sm:h-15 lg:h-18 shrink-0 bg-transparent pointer-events-none overflow-hidden">
            <Image
              src={englishLogoUrl}
              alt="Encamp Privé Logo"
              fill
              className="object-contain object-right bg-transparent drop-shadow-md"
              style={isCustomEnglishLogo ? { filter: "url(#remove-white)" } : undefined}
              priority
            />
          </div>
        )}

        {/* Content Container - Vertically & Horizontally Centered */}
        <div className="relative z-10 w-[96%] sm:w-[94%] max-w-5xl mx-auto px-2 sm:px-4 flex-1 flex flex-col justify-center items-center my-auto h-full text-center">
          <div className="w-full flex flex-col items-center justify-center text-center px-2 sm:px-4 text-white my-auto z-10 space-y-2 sm:space-y-3">
            {/* Logo on Top of Subtitle - Nudged slightly left & top */}
            {hindiLogoUrl && (
              <div className="relative w-full max-w-[440px] sm:max-w-[420px] md:max-w-[540px] lg:max-w-[660px] xl:max-w-[760px] h-48 sm:h-36 md:h-44 lg:h-52 xl:h-60 shrink-0 mx-auto pointer-events-none mb-1 sm:mb-2 -translate-x-0 sm:-translate-x-16 md:-translate-x-24 lg:-translate-x-36 -translate-y-0 sm:-translate-y-3 md:-translate-y-4">
                {/* Backdrop Overlay directly below/behind logo image */}
                <div className="absolute -inset-x-8 sm:-inset-x-14 -inset-y-6 sm:-inset-y-10 bg-black/60 rounded-full blur-3xl -z-10 pointer-events-none" />
                <Image
                  src={hindiLogoUrl}
                  alt={itinerary?.title ? `${itinerary.title} Logo` : "Logo"}
                  fill
                  sizes="(max-width: 640px) 300px, (max-width: 768px) 420px, (max-width: 1024px) 540px, (max-width: 1280px) 660px, 760px"
                  className="object-contain object-center bg-transparent"
                  style={isCustomLogo ? { filter: "url(#remove-white)" } : undefined}
                  priority
                />
              </div>
            )}

            {itinerary?.subtitle && (
              <span className="font-script text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#f0c85a] drop-shadow-md leading-tight">
                {itinerary.subtitle}
              </span>
            )}

            {/* Title: Only show if logoUrl does NOT exist */}
            {!isCustomLogo && itinerary?.title && (
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

        {/* 5-Pillars Horizontal Strip EXACTLY ANCHORED AT BOTTOM EDGE (50% INSIDE / 50% OUTSIDE) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-4 xl:left-8 lg:translate-x-0 transform translate-y-1/2 max-w-xl lg:max-w-2xl w-[94%] sm:w-auto text-primary-green py-2 sm:py-3.5 px-4 sm:px-8 z-30">
          {/* Inline Ultra-Luxurious 24K Gold Royal Crest SVG Frame */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 pointer-events-none filter drop-shadow-xl"
            viewBox="0 0 1000 140"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* 24K Glossy Gold Foil Gradient */}
              <linearGradient id="royal24KGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4A3106"/>
                <stop offset="12%" stopColor="#A87B1D"/>
                <stop offset="28%" stopColor="#FCEE98"/>
                <stop offset="42%" stopColor="#D9A632"/>
                <stop offset="58%" stopColor="#FFFADB"/>
                <stop offset="72%" stopColor="#C28F20"/>
                <stop offset="88%" stopColor="#E0B141"/>
                <stop offset="100%" stopColor="#573807"/>
              </linearGradient>

              {/* Silk Champagne Gold Gradient */}
              <linearGradient id="silkChampagne" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8C661D"/>
                <stop offset="25%" stopColor="#E2C26E"/>
                <stop offset="50%" stopColor="#FFFFFF"/>
                <stop offset="75%" stopColor="#D9B24D"/>
                <stop offset="100%" stopColor="#7A5612"/>
              </linearGradient>

              {/* Luxury Shadow */}
              <filter id="royalShadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="5" stdDeviation="8" floodColor="#382405" floodOpacity="0.18"/>
              </filter>
            </defs>

            {/* Base Solid White Card Fill with Luxury Curved Cutout Path */}
            <path
              d="M 50,8 
                 L 460,8 A 20,20 0 0 0 480,4 L 500,0 L 520,4 A 20,20 0 0 0 540,8 
                 L 950,8 
                 A 16,16 0 0 1 966,14 L 980,28 A 16,16 0 0 1 992,44 
                 L 992,96 
                 A 16,16 0 0 1 980,112 L 966,126 A 16,16 0 0 1 950,132 
                 L 540,132 A 20,20 0 0 0 520,136 L 500,140 L 480,136 A 20,20 0 0 0 460,132 
                 L 50,132 
                 A 16,16 0 0 1 34,126 L 20,112 A 16,16 0 0 1 8,96 
                 L 8,44 
                 A 16,16 0 0 1 20,28 L 34,14 A 16,16 0 0 1 50,8 Z"
              fill="#ffffff"
              filter="url(#royalShadow)"
            />

            {/* Main Outer 24K Gold Border Contour */}
            <path
              d="M 50,8 
                 L 460,8 A 20,20 0 0 0 480,4 L 500,0 L 520,4 A 20,20 0 0 0 540,8 
                 L 950,8 
                 A 16,16 0 0 1 966,14 L 980,28 A 16,16 0 0 1 992,44 
                 L 992,96 
                 A 16,16 0 0 1 980,112 L 966,126 A 16,16 0 0 1 950,132 
                 L 540,132 A 20,20 0 0 0 520,136 L 500,140 L 480,136 A 20,20 0 0 0 460,132 
                 L 50,132 
                 A 16,16 0 0 1 34,126 L 20,112 A 16,16 0 0 1 8,96 
                 L 8,44 
                 A 16,16 0 0 1 20,28 L 34,14 A 16,16 0 0 1 50,8 Z"
              fill="none"
              stroke="url(#royal24KGold)"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Inner Parallel Fine Champagne Gold Line (Crisp & Refined) */}
            <path
              d="M 54,14 
                 L 458,14 A 16,16 0 0 0 478,10 L 500,6 L 522,10 A 16,16 0 0 0 542,14 
                 L 946,14 
                 A 12,12 0 0 1 958,19 L 971,32 A 12,12 0 0 1 982,44 
                 L 982,96 
                 A 12,12 0 0 1 971,108 L 958,121 A 12,12 0 0 1 946,126 
                 L 542,126 A 16,16 0 0 0 522,130 L 500,134 L 478,130 A 16,16 0 0 0 458,126 
                 L 54,126 
                 A 12,12 0 0 1 42,121 L 29,108 A 12,12 0 0 1 18,96 
                 L 18,44 
                 A 12,12 0 0 1 29,32 L 42,19 A 12,12 0 0 1 54,14 Z"
              fill="none"
              stroke="url(#silkChampagne)"
              strokeWidth="1.2"
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Corner Gold Pin-Dot Flourishes */}
            <g fill="url(#royal24KGold)">
              <circle cx="38" cy="28" r="1.5" />
              <circle cx="962" cy="28" r="1.5" />
              <circle cx="962" cy="112" r="1.5" />
              <circle cx="38" cy="112" r="1.5" />
            </g>

            {/* Top Center Royal Crown / Diamond Crest */}
            <g fill="url(#royal24KGold)">
              {/* Center Main Diamond */}
              <polygon points="500,-2 506,4 500,10 494,4" />
              {/* Flanking Side Beads */}
              <circle cx="482" cy="5" r="2" />
              <circle cx="518" cy="5" r="2" />
            </g>

            {/* Bottom Center Matching Crest */}
            <g fill="url(#royal24KGold)">
              <polygon points="500,130 506,136 500,142 494,136" />
              <circle cx="482" cy="135" r="2" />
              <circle cx="518" cy="135" r="2" />
            </g>
          </svg>
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1 divide-x divide-[#d5b45a]/30">

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Compass className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#c99a2c] mb-0.5 stroke-[1.6]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Handpicked Experiences
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Home className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#c99a2c] mb-0.5 stroke-[1.6]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Exclusive Stays
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <UserCheck className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#c99a2c] mb-0.5 stroke-[1.6]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                Local Experts
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Headset className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#c99a2c] mb-0.5 stroke-[1.6]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-primary-green leading-tight">
                24x7 Support
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Leaf className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#c99a2c] mb-0.5 stroke-[1.6]" />
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
