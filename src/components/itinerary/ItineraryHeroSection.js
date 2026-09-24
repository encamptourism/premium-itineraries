'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import TransparentImageCanvas from "./TransparentImageCanvas";
import {
  Compass,
  Home,
  UserCheck,
  Headset,
  Leaf,
} from "lucide-react";
import DownloadPdfButton from "./DownloadPdfButton";
import { useCarbonTrace } from "@/context/CarbonTraceContext";
import { useBreadcrumbs } from "@/context/BreadcrumbsContext";

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

  const breadcrumbsCtx = useBreadcrumbs();
  const setRightAction = breadcrumbsCtx?.setRightAction;

  useEffect(() => {
    if (itinerary && typeof setRightAction === 'function') {
      setRightAction(<DownloadPdfButton itinerary={itinerary} variant="hero" />);
    }
    return () => {
      if (typeof setRightAction === 'function') {
        setRightAction(null);
      }
    };
  }, [itinerary, setRightAction]);

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
            {/* Light Overlay */}
            <div className="absolute inset-0 bg-black/10" />
          </div>
        )}


        {/* Top Left: English Logo */}
        {englishLogoUrl && (
          <div className="absolute left-3 sm:left-6 lg:left-8 top-3 sm:top-5 z-30 w-36 sm:w-44 lg:w-52 h-12 sm:h-15 lg:h-18 shrink-0 bg-transparent pointer-events-none overflow-hidden">
            <TransparentImageCanvas
              src={englishLogoUrl}
              alt="Encamp Privé Logo"
              fill
              className="object-contain object-left drop-shadow-md"
            />
          </div>
        )}


        {/* Content Container - Vertically & Horizontally Centered */}
        <div className="relative z-10 w-[96%] sm:w-[94%] max-w-5xl mx-auto px-2 sm:px-4 flex-1 flex flex-col justify-center items-center my-auto h-full text-center">
          <div className="w-full flex flex-col items-center justify-center text-center px-2 sm:px-4 text-white my-auto z-10 space-y-2 sm:space-y-3">
            {/* Logo on Top of Subtitle - Nudged slightly left & top */}
            {hindiLogoUrl && (
              <div className="relative w-full max-w-[520px] sm:max-w-[520px] md:max-w-[660px] lg:max-w-[800px] xl:max-w-[920px] h-56 sm:h-44 md:h-56 lg:h-64 xl:h-72 shrink-0 mx-auto pointer-events-none mb-1 sm:mb-2 -translate-x-0 sm:-translate-x-16 md:-translate-x-24 lg:-translate-x-36 -translate-y-0 sm:-translate-y-3 md:-translate-y-4">
                <TransparentImageCanvas
                  src={hindiLogoUrl}
                  alt={itinerary?.title ? `${itinerary.title} Logo` : "Logo"}
                  fill
                  className="object-contain object-center drop-shadow-md"
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
                <span className="h-[3px] w-12 sm:w-24 md:w-36 lg:w-48 bg-[#64161B] opacity-85" />

                {/* Double-Pointed Gold Ribbon Banner */}
                <div className="relative px-3 sm:px-7 py-0.5 sm:py-1 bg-[#64161B] text-[#fffdf5] font-serif text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] shadow-md [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_50%,calc(100%-9px)_100%,9px_100%,0_50%)] flex items-center justify-center shrink-0">
                  {durationText}
                </div>

                {/* Right Attached Gold Accent Line */}
                <span className="h-[3px] w-12 sm:w-24 md:w-36 lg:w-48 bg-[#64161B] opacity-85" />
              </div>
            )}
          </div>
        </div>

        {/* 5-Pillars Horizontal Strip EXACTLY ANCHORED AT BOTTOM EDGE (50% INSIDE / 50% OUTSIDE) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-4 xl:left-8 lg:translate-x-0 transform translate-y-1/2 max-w-xl lg:max-w-2xl w-[94%] sm:w-auto text-primary-green py-2 sm:py-3.5 px-4 sm:px-8 z-30">
          {/* Inline Premium Royal Gold Frame */}
          <svg
            className="absolute inset-0 w-full h-full -z-10 pointer-events-none filter drop-shadow-xl"
            viewBox="0 0 1000 140"
            preserveAspectRatio="none"
            shapeRendering="geometricPrecision"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Premium Polished Gold Gradient */}
              <linearGradient id="premiumGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B6914"/>
                <stop offset="18%" stopColor="#C9A13E"/>
                <stop offset="35%" stopColor="#E8D07A"/>
                <stop offset="50%" stopColor="#F5E6A3"/>
                <stop offset="65%" stopColor="#E8D07A"/>
                <stop offset="82%" stopColor="#C9A13E"/>
                <stop offset="100%" stopColor="#8B6914"/>
              </linearGradient>

              {/* Subtle Inner Gold Gradient */}
              <linearGradient id="innerGold" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A0842A" stopOpacity="0.5"/>
                <stop offset="50%" stopColor="#D4B65C" stopOpacity="0.6"/>
                <stop offset="100%" stopColor="#A0842A" stopOpacity="0.5"/>
              </linearGradient>

              {/* Elegant Soft Shadow */}
              <filter id="frameShadow" x="-3%" y="-8%" width="106%" height="116%">
                <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#2C1A00" floodOpacity="0.12"/>
              </filter>
            </defs>

            {/* White Card Base — Royal Curved Silhouette */}
            <path
              d="M 30,10
                 L 435,10 Q 465,10 482,4 L 500,0 L 518,4 Q 535,10 565,10
                 L 970,10 Q 992,10 992,32
                 L 992,108 Q 992,130 970,130
                 L 565,130 Q 535,130 518,136 L 500,140 L 482,136 Q 465,130 435,130
                 L 30,130 Q 8,130 8,108
                 L 8,32 Q 8,10 30,10 Z"
              fill="#ffffff" filter="url(#frameShadow)"/>

            {/* Outer Gold Border */}
            <path
              d="M 30,10
                 L 435,10 Q 465,10 482,4 L 500,0 L 518,4 Q 535,10 565,10
                 L 970,10 Q 992,10 992,32
                 L 992,108 Q 992,130 970,130
                 L 565,130 Q 535,130 518,136 L 500,140 L 482,136 Q 465,130 435,130
                 L 30,130 Q 8,130 8,108
                 L 8,32 Q 8,10 30,10 Z"
              fill="none" stroke="url(#premiumGold)" strokeWidth="2.5"/>

            {/* Inner Inset Gold Border (follows royal curve) */}
            <path
              d="M 36,18
                 L 433,18 Q 460,18 476,12 L 500,7 L 524,12 Q 540,18 567,18
                 L 964,18 Q 984,18 984,36
                 L 984,104 Q 984,122 964,122
                 L 567,122 Q 540,122 524,128 L 500,133 L 476,128 Q 460,122 433,122
                 L 36,122 Q 16,122 16,104
                 L 16,36 Q 16,18 36,18 Z"
              fill="none" stroke="url(#innerGold)" strokeWidth="0.8"/>

            {/* Corner Flourishes — Elegant Curved Scrolls */}
            <g fill="none" stroke="url(#premiumGold)" strokeWidth="1.4" strokeLinecap="round">
              <path d="M 22,38 Q 22,20 40,20"/>
              <path d="M 978,38 Q 978,20 960,20"/>
              <path d="M 978,102 Q 978,120 960,120"/>
              <path d="M 22,102 Q 22,120 40,120"/>
            </g>

            {/* Corner Accent Dots */}
            <g fill="url(#premiumGold)">
              <circle cx="28" cy="26" r="1.2"/>
              <circle cx="972" cy="26" r="1.2"/>
              <circle cx="972" cy="114" r="1.2"/>
              <circle cx="28" cy="114" r="1.2"/>
            </g>

            {/* Top Center Diamond Crest */}
            <polygon points="500,0 506,6 500,12 494,6" fill="url(#premiumGold)"/>

            {/* Bottom Center Diamond Crest */}
            <polygon points="500,128 506,134 500,140 494,134" fill="url(#premiumGold)"/>
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
