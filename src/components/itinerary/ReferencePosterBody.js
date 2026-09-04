"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Check,
  X,
  Play,
  Sun,
  Compass,
  Plane,
  Trees,
  Leaf,
  Cloud,
  Users,
  FileText,
  ShieldCheck,
  Headset,
  BedDouble,
  DollarSign,
  UserCheck,
  ClipboardCheck,
  Tag,
  ChevronDown,
} from "lucide-react";

export default function ReferencePosterBody({ itinerary, onOpenEnquiry }) {
  const [showAllInclusions, setShowAllInclusions] = useState(false);
  const [showAllExclusions, setShowAllExclusions] = useState(false);

  const days = itinerary?.duration?.days || 7;
  const nights = itinerary?.duration?.nights || 6;
  const dayWise = Array.isArray(itinerary?.dayWiseItinerary) ? itinerary.dayWiseItinerary : [];
  const inclusions = Array.isArray(itinerary?.inclusions) ? itinerary.inclusions : [];
  const exclusions = Array.isArray(itinerary?.exclusions) ? itinerary.exclusions : [];

  const visibleInclusions = showAllInclusions ? inclusions : inclusions.slice(0, 5);
  const visibleExclusions = showAllExclusions ? exclusions : exclusions.slice(0, 4);
  const locations = Array.isArray(itinerary?.locations) ? itinerary.locations : ["Shillong", "Cherrapunji", "Dawki"];
  const bestTime =
    itinerary?.bestTime?.fromMonth && itinerary?.bestTime?.toMonth
      ? `${itinerary.bestTime.fromMonth} to ${itinerary.bestTime.toMonth}`
      : "October to May";

  // Video and shorts thumbnails from gallery or destination images
  const overviewImage =
    itinerary?.gallery?.find((g) => g.tag === "overview")?.url ||
    itinerary?.gallery?.[1]?.url ||
    "https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg";

  // Safely extract YouTube video ID
  const ytUrl = itinerary?.premiumMedia?.youtubeVideo?.url || "";
  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };
  const ytVideoId = getYouTubeId(ytUrl);
  const ytThumbnail = ytVideoId
    ? `https://img.youtube.com/vi/${ytVideoId}/hqdefault.jpg`
    : overviewImage;

  // Auto-play YouTube video when scrolled into view
  const [isYtInView, setIsYtInView] = useState(false);
  const ytContainerRef = useRef(null);

  useEffect(() => {
    const node = ytContainerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsYtInView(true);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => {
      observer.unobserve(node);
    };
  }, []);

  // Short videos data parsing
  const rawShortData =
    itinerary?.premiumMedia?.shortVideo ||
    itinerary?.premiumMedia?.shortVideos ||
    itinerary?.shortVideos ||
    itinerary?.shorts;

  const shortVideoItems = Array.isArray(rawShortData)
    ? rawShortData
    : rawShortData && typeof rawShortData === "object"
    ? [rawShortData]
    : [];

  const galleryImages = Array.isArray(itinerary?.gallery) ? itinerary.gallery.map((g) => g.url) : [];
  const dayImages = dayWise.map((d) => d.image || (Array.isArray(d.gallery) && d.gallery[0]?.url)).filter(Boolean);
  const uniqueImagesPool = [...new Set([...galleryImages, ...dayImages, overviewImage])];

  const shortsToRender = (locations.length > 0 ? locations.slice(0, 4) : ["Shillong", "Cherrapunji", "Dawki", "Meghalaya"]).map((loc, idx) => {
    const apiShort = shortVideoItems[idx] || shortVideoItems[0];
    const thumb =
      apiShort?.thumbnail ||
      apiShort?.coverImage ||
      apiShort?.image ||
      uniqueImagesPool[idx % uniqueImagesPool.length] ||
      overviewImage;

    const title = apiShort?.title || loc;
    const link = apiShort?.url || apiShort?.link || (ytUrl || "https://www.youtube.com");

    return {
      title,
      thumbnail: thumb,
      url: link,
      platform: apiShort?.platform || (link.includes("instagram") ? "instagram" : "youtube"),
    };
  });

  const totalActivities = dayWise.reduce(
    (acc, d) => acc + (Array.isArray(d?.activities) ? d.activities.length : 0),
    0
  );

  return (
    <div className="w-full bg-[#fbf9f4] font-poppins pt-3 sm:pt-10 lg:pt-14 pb-6 sm:pb-8">
      <div className="w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
          
          {/* ========================================================================= */}
          {/* COLUMN 1 (LEFT): DAY WISE ITINERARY */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-4">
            {/* Header with horizontal lines */}
            <div className="flex items-center justify-center gap-3 pb-3 border-b border-[#e2d8c3]">
              <span className="h-[1px] w-12 sm:w-16 bg-[#c8b79b]" />
              <h2 className="font-serif-display text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.2em] text-forest">
                Day Wise Itinerary
              </h2>
              <span className="h-[1px] w-12 sm:w-16 bg-[#c8b79b]" />
            </div>

            {/* List of Days */}
            <div className="space-y-6 pt-1">
              {dayWise.map((day, idx) => {
                const dayNum = day.dayNumber || idx + 1;
                const dayImage =
                  day.image ||
                  (Array.isArray(day.gallery) && day.gallery[0]?.url) ||
                  (Array.isArray(day.stay) && day.stay[0]?.image) ||
                  "https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg";

                return (
                  <div
                    key={day._id || idx}
                    className="relative flex flex-col sm:flex-row items-start gap-3 sm:gap-4"
                  >
                    {/* Top Row on Phone View: Day Badge & Expanded Thumbnail Photo */}
                    <div className="flex items-start gap-3 w-full sm:w-auto shrink-0">
                      {/* 1. Day Badge */}
                      <div className="flex flex-col items-center shrink-0">
                        {/* Round Circle with Day Number inside */}
                        <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-[#0c2b1a] text-white flex items-center justify-center shrink-0 border border-[#1b482e] shadow-xs p-1">
                          <span className="font-serif-display text-base sm:text-lg font-black leading-none text-white">
                            {dayNum}
                          </span>
                        </div>
                        {/* DAY Font below the round circle */}
                        <span className="text-[10px] sm:text-xs uppercase tracking-[0.18em] font-bold text-[#c29b4e] leading-none mt-1.5 font-sans">
                          DAY
                        </span>
                      </div>

                      {/* 2. Day Thumbnail Photo (Expanded width on phone view) */}
                      <div className="relative flex-1 sm:flex-none w-full sm:w-32 h-24 sm:h-32 rounded-xl sm:rounded-2xl overflow-hidden border border-stone-200/80 shadow-xs">
                        <Image
                          src={dayImage}
                          alt={`Day ${dayNum}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 140px"
                          className="object-cover"
                        />
                      </div>
                    </div>

                    {/* 3. Day Title & Activities Timeline (Below on phone, right-side on sm+) */}
                    <div className="w-full sm:flex-1 min-w-0 relative font-poppins">
                      {/* Title with Location Pin Marker */}
                      <div className="flex items-start gap-1.5 sm:gap-2">
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#0c2b1a] shrink-0 mt-0.5"
                        >
                          <path
                            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                            fill="#0c2b1a"
                          />
                          <circle cx="12" cy="9" r="2.5" fill="#d4a853" />
                        </svg>
                        <h3 className="font-poppins text-xs sm:text-sm font-semibold uppercase tracking-wide text-stone-900 leading-snug">
                          {day.title}
                        </h3>
                      </div>

                      {/* Timeline content body */}
                      <div className="relative pl-5 sm:pl-7 pb-2">
                        {/* Vertical Timeline Line */}
                        {idx < dayWise.length - 1 && (
                          <div className="absolute left-[7px] sm:left-[9px] top-[2px] bottom-[-24px] w-[1.5px] bg-[#d9caad]">
                            {/* Gold Node Dot on line between days */}
                            <div className="absolute top-[75%] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
                          </div>
                        )}

                        {/* Activities Bullet Points */}
                        {Array.isArray(day.activities) && day.activities.length > 0 ? (
                          <ul className="mt-1.5 space-y-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-poppins">
                            {day.activities.map((act, aIdx) => {
                              const text = act.greenText || act.blackText || act.title;
                              if (!text) return null;
                              return (
                                <li key={act._id || aIdx} className="flex items-start gap-2">
                                  <span className="text-[#c29b4e] font-bold text-xs sm:text-sm leading-none mt-1">
                                    •
                                  </span>
                                  <span className="text-stone-800 font-normal">
                                    {text}
                                  </span>
                                </li>
                              );
                            })}
                          </ul>
                        ) : day.description ? (
                          <p className="mt-1.5 text-xs sm:text-sm text-stone-700 leading-relaxed font-normal font-poppins">
                            {day.description}
                          </p>
                        ) : null}

                        {/* Overnight Stay Footer */}
                        <div className="font-poppins text-xs sm:text-sm font-semibold text-stone-900 mt-2.5">
                          Overnight Stay in {day.title.split("→").pop()?.trim() || "Meghalaya"}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 2 (CENTER): JOURNEY OVERVIEW, ROUTE MAP, DETAILS & VIDEO */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 space-y-4">
            {/* Journey Overview Card (Border without background fill) */}
            <div className="border border-[#e2d8c3] rounded-2xl p-4 sm:p-5 space-y-4 font-poppins">
              {/* Left-Aligned Header */}
              <div className="text-left">
                <h2 className="font-serif-display text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.18em] text-[#062314]">
                  Journey Overview
                </h2>
              </div>

              {/* Left-Aligned Overview Body Text */}
              {(itinerary?.overviewText || itinerary?.subtitle) && (
                <div
                  className="text-xs sm:text-sm text-stone-700 leading-relaxed text-left font-normal font-poppins [&_h3]:font-poppins [&_h3]:text-sm sm:[&_h3]:text-base [&_h3]:font-bold [&_h3]:text-[#062314] [&_h3]:mt-1.5 [&_h3]:mb-2 [&_ul]:space-y-2 [&_ul]:pl-0 [&_li]:text-xs sm:[&_li]:text-sm [&_li]:text-stone-700 [&_li]:leading-relaxed [&_strong]:font-semibold [&_strong]:text-stone-900"
                  dangerouslySetInnerHTML={{ __html: itinerary.overviewText || itinerary.subtitle }}
                />
              )}

              {/* 4 Stat Metrics Bar with Vertical Dividers */}
              <div className="border border-[#e6dece] rounded-xl p-2.5 sm:p-3">
                <div className="grid grid-cols-4 divide-x divide-[#d9caad] text-center font-poppins">
                  <div className="px-1 flex flex-col items-center justify-center">
                    <div className="font-serif-display text-lg sm:text-xl font-bold text-[#062314] leading-none">
                      {days}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase text-stone-700 mt-1">
                      Days
                    </div>
                  </div>

                  <div className="px-1 flex flex-col items-center justify-center">
                    <div className="font-serif-display text-lg sm:text-xl font-bold text-[#062314] leading-none">
                      {nights}
                    </div>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase text-stone-700 mt-1">
                      Nights
                    </div>
                  </div>

                  <div className="px-1 flex flex-col items-center justify-center">
                    <div className="font-serif-display text-lg sm:text-xl font-bold text-[#062314] leading-none">
                      {totalActivities || "15+"}
                    </div>
                    <div className="text-[8px] sm:text-[9px] font-bold uppercase text-stone-700 mt-1 leading-tight">
                      Experiences
                    </div>
                  </div>

                  <div className="px-1 flex flex-col items-center justify-center">
                    <div className="font-serif-display text-lg sm:text-xl font-bold text-[#062314] leading-none">
                      1
                    </div>
                    <div className="text-[7.5px] sm:text-[8.5px] font-bold uppercase text-stone-700 mt-1 leading-tight">
                      Unforgettable<br/>Journey
                    </div>
                  </div>
                </div>
              </div>

              {/* ROUTE MAP Container */}
              <div className="space-y-2 py-1">
                <div className="flex items-center justify-center gap-2">
                  <span className="h-[1px] w-8 sm:w-12 bg-[#c8b79b]" />
                  <h3 className="font-serif-display text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-[#062314]">
                    Route Map
                  </h3>
                  <span className="h-[1px] w-8 sm:w-12 bg-[#c8b79b]" />
                </div>

                {/* Map Graphic Image */}
                <div className="relative w-full h-44 sm:h-52 rounded-lg overflow-hidden flex items-center justify-center p-1">
                  <Image
                    src={itinerary?.mapImage || "/images/map.png"}
                    alt="Route Map"
                    width={500}
                    height={300}
                    className="w-full h-auto object-contain max-h-52"
                  />
                </div>
              </div>

              {/* Detailed Travel Info Box (Matching Reference Image) */}
              <div className="border border-[#e6dece] rounded-xl p-3.5 sm:p-4 space-y-3 text-xs sm:text-sm font-poppins">
                {/* Row 1: Best Time to Visit & Travel Style */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-start gap-2.5">
                    <Sun className="w-6 h-6 sm:w-7 sm:h-7 text-[#062314] shrink-0 stroke-[1.75] mt-0.5" />
                    <div>
                      <div className="font-bold text-[#062314] uppercase text-[10px] sm:text-xs tracking-wider">
                        Best Time to Visit
                      </div>
                      <div className="font-semibold text-stone-800 text-[11px] sm:text-xs mt-0.5">
                        October to May
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] text-stone-600 leading-tight mt-0.5">
                        Ideal weather for sightseeing and outdoor experiences.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Compass className="w-6 h-6 sm:w-7 sm:h-7 text-[#062314] shrink-0 stroke-[1.75] mt-0.5" />
                    <div>
                      <div className="font-bold text-[#062314] uppercase text-[10px] sm:text-xs tracking-wider">
                        Travel Style
                      </div>
                      <div className="font-semibold text-stone-800 text-[11px] sm:text-xs mt-0.5">
                        Nature | Adventure | Culture
                      </div>
                      <div className="text-[9.5px] sm:text-[10.5px] text-stone-600 leading-tight mt-0.5">
                        Perfect blend of relaxation and exploration.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#d9caad]/60" />

                {/* Row 2: Getting There */}
                <div className="flex items-start gap-2.5">
                  <Plane className="w-6 h-6 sm:w-7 sm:h-7 text-[#062314] shrink-0 stroke-[1.75] mt-0.5" />
                  <div>
                    <div className="font-bold text-[#062314] uppercase text-[10px] sm:text-xs tracking-wider">
                      Getting There
                    </div>
                    <div className="font-semibold text-stone-800 text-[11px] sm:text-xs mt-0.5">
                      Fly to Shillong (Umroi Airport) or Guwahati (GAU)
                    </div>
                    <div className="text-[9.5px] sm:text-[10.5px] text-stone-600 leading-tight mt-0.5">
                      Road transfer included
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#d9caad]/60" />

                {/* Row 3: Travel Responsibly */}
                <div className="flex items-start gap-2.5">
                  <Trees className="w-6 h-6 sm:w-7 sm:h-7 text-[#062314] shrink-0 stroke-[1.75] mt-0.5" />
                  <div>
                    <div className="font-bold text-[#062314] uppercase text-[10px] sm:text-xs tracking-wider">
                      Travel Responsibly
                    </div>
                    <div className="text-[9.5px] sm:text-[10.5px] text-stone-600 leading-tight mt-0.5">
                      We promote sustainable tourism and support local communities for a better tomorrow.
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-[#d9caad]/60" />

                {/* Row 4: 3 Sustainability Impact Metrics */}
                <div className="grid grid-cols-3 gap-1 pt-1 text-center">
                  <div className="flex flex-col items-center">
                    <Cloud className="w-5 h-5 text-[#062314] stroke-[1.75] mb-1" />
                    <span className="text-[10px] font-bold text-[#062314]">
                      66 kg CO₂
                    </span>
                    <span className="text-[8.5px] text-stone-600 leading-tight">
                      Offset per traveller
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Leaf className="w-5 h-5 text-[#062314] stroke-[1.75] mb-1" />
                    <span className="text-[10px] font-bold text-[#062314]">
                      Trees Planted
                    </span>
                    <span className="text-[8.5px] text-stone-600 leading-tight">
                      For a Greener Earth
                    </span>
                  </div>

                  <div className="flex flex-col items-center">
                    <Users className="w-5 h-5 text-[#062314] stroke-[1.75] mb-1" />
                    <span className="text-[10px] font-bold text-[#062314]">
                      Local Communities
                    </span>
                    <span className="text-[8.5px] text-stone-600 leading-tight">
                      Empowered
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Watch The Experience (Video & Shorts Block) */}
            <div className="rounded-2xl p-4 sm:p-5 border border-[#e2d8c3] space-y-3 font-poppins">
              <div className="text-center pb-1">
                <h2 className="font-serif-display text-sm sm:text-base font-black uppercase tracking-[0.2em] text-[#062314]">
                  Watch The {itinerary?.state || "Meghalaya"} Experience
                </h2>
              </div>

              {/* Full Video Main Player (Plays YouTube video automatically when scrolled into view) */}
              <div
                ref={ytContainerRef}
                className="relative w-full h-48 sm:h-56 rounded-xl overflow-hidden border border-stone-200 shadow-sm bg-black"
              >
                {ytVideoId && isYtInView ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${ytVideoId}?autoplay=1&mute=1&playsinline=1&rel=0`}
                    title={itinerary?.premiumMedia?.youtubeVideo?.title || "Watch Experience"}
                    className="w-full h-full rounded-xl border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <a
                    href={ytUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (ytVideoId) {
                        e.preventDefault();
                        setIsYtInView(true);
                      }
                    }}
                    className="block relative w-full h-full group cursor-pointer"
                  >
                    <Image
                      src={ytThumbnail}
                      alt={itinerary?.premiumMedia?.youtubeVideo?.title || "Watch Full Video"}
                      fill
                      sizes="600px"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-[#f8f5ed]/95 text-[#062314] flex items-center justify-center pl-1 group-hover:scale-110 transition-transform shadow-lg">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                    </div>
                    <div className="absolute top-2.5 left-2.5 bg-[#dfa62f] text-[#020d07] text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md truncate max-w-[85%] shadow-md">
                      {itinerary?.premiumMedia?.youtubeVideo?.title || "Full Video"}
                    </div>
                  </a>
                )}
              </div>

              {/* Shorts Row */}
              <div className="pt-2">
                <div className="text-xs font-bold uppercase tracking-wider text-stone-600 mb-2 font-poppins flex items-center justify-between">
                  <span>Shorts</span>
                  {shortVideoItems[0]?.platform && (
                    <span className="text-[10px] text-[#dfa62f] font-semibold lowercase font-sans">
                      @{shortVideoItems[0]?.platform}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {shortsToRender.map((short, i) => (
                    <a
                      key={i}
                      href={short.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative h-20 sm:h-24 rounded-xl overflow-hidden border border-stone-200 group cursor-pointer block shadow-xs"
                    >
                      <Image
                        src={short.thumbnail}
                        alt={short.title}
                        fill
                        sizes="120px"
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col items-center justify-between p-1.5 text-center">
                        <div className="w-5 h-5 rounded-full bg-white/90 text-[#062314] flex items-center justify-center pl-0.5 mt-1 shadow-sm group-hover:bg-[#dfa62f] transition-colors">
                          <Play className="w-2.5 h-2.5 fill-current" />
                        </div>
                        <span className="text-[11px] text-white font-bold tracking-tight line-clamp-1 font-poppins">
                          {short.title}
                        </span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* COLUMN 3 (RIGHT): INCLUSIONS, EXCLUSIONS, FLIGHT/VISA, WHY TRAVEL */}
          {/* ========================================================================= */}
          <div className="lg:col-span-3 space-y-4 mt-[10px] pt-8 sm:pt-14 lg:pt-32 w-full max-w-2xl lg:max-w-[300px] mx-auto lg:ml-auto transform lg:translate-x-6">
            {/* Unified Inclusions & Exclusions Card */}
            <div className="rounded-2xl overflow-hidden border border-[#e2d8c3] font-poppins">
              {/* Dark Forest Green Header Bar for Inclusions */}
              <div className="bg-[#062314] text-white py-2.5 px-4 text-center border-b border-[#dfa62f]/40">
                <h2 className="font-serif-display text-sm sm:text-base font-black uppercase tracking-[0.2em] text-white">
                  Inclusions
                </h2>
              </div>

              {/* Inclusions Content */}
              <div className="py-3.5 px-2.5 sm:px-3.5 space-y-3">
                <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-normal">
                  {visibleInclusions.map((inc, i) => (
                    <li key={inc._id || i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-[#fcf8ee] text-[#b38320] flex items-center justify-center shrink-0 mt-0.5 border border-[#dfa62f]">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{inc.name}</span>
                    </li>
                  ))}
                </ul>

                {inclusions.length > 5 && (
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAllInclusions(!showAllInclusions)}
                      className="text-xs font-semibold text-[#062314] hover:text-[#b38320] transition-colors flex items-center gap-1 focus:outline-none bg-transparent border-0 py-0.5 px-2 cursor-pointer select-none"
                    >
                      <span>{showAllInclusions ? "Show Less" : `View More (${inclusions.length - 5} more)`}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#b38320] transition-transform duration-300 ${
                          showAllInclusions ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}

                {/* Divider Line */}
                <div className="pt-2 pb-1">
                  <div className="h-[1px] w-full bg-stone-200" />
                </div>

                {/* Exclusions Header */}
                <div className="text-center pt-1 pb-1">
                  <h2 className="font-serif-display text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[#062314]">
                    Exclusions
                  </h2>
                </div>

                {/* Exclusions Content */}
                <ul className="space-y-2 text-xs sm:text-[13px] text-stone-700 font-normal">
                  {visibleExclusions.map((exc, i) => (
                    <li key={exc._id || i} className="flex items-start gap-2">
                      <X className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5 stroke-[3]" />
                      <span className="leading-snug">{exc.name}</span>
                    </li>
                  ))}
                </ul>

                {exclusions.length > 4 && (
                  <div className="flex justify-center pt-1">
                    <button
                      type="button"
                      onClick={() => setShowAllExclusions(!showAllExclusions)}
                      className="text-xs font-semibold text-[#062314] hover:text-red-700 transition-colors flex items-center gap-1 focus:outline-none bg-transparent border-0 py-0.5 px-2 cursor-pointer select-none"
                    >
                      <span>{showAllExclusions ? "Show Less" : `View More (${exclusions.length - 4} more)`}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-[#062314] transition-transform duration-300 ${
                          showAllExclusions ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Flight & Visa Assistance Box */}
            <div className="rounded-2xl border border-[#e2d8c3] bg-[#fbf9f4] overflow-hidden text-center font-poppins shadow-none sm:shadow-xs">
              <div className="bg-[#062314] py-2 px-3 text-center">
                <h2 className="font-serif-display text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-white">
                  Flight &amp; Visa Assistance
                </h2>
              </div>
              <div className="grid grid-cols-3 divide-x divide-[#e2d8c3] py-3.5 px-1.5 text-center items-start">
                <div className="flex flex-col items-center px-1">
                  <Plane className="w-8 h-8 sm:w-9 sm:h-9 text-[#062314] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    Flight Tickets
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-stone-600 font-medium leading-snug mt-1">
                    Best deals on domestic &amp; international flights.
                  </span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <FileText className="w-8 h-8 sm:w-9 sm:h-9 text-[#062314] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    Visa Assistance
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-stone-600 font-medium leading-snug mt-1">
                    Complete visa support for a hassle-free travel experience.
                  </span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <UserCheck className="w-8 h-8 sm:w-9 sm:h-9 text-[#062314] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    Foreign Travellers
                  </span>
                  <span className="text-[8px] sm:text-[9px] text-stone-600 font-medium leading-snug mt-1">
                    Dedicated support for documents and travel requirements.
                  </span>
                </div>
              </div>
            </div>

            {/* Why Travel With Us? Box */}
            <div className="rounded-2xl border border-[#e2d8c3] bg-[#fbf9f4] overflow-hidden text-center font-poppins shadow-xs">
              <div className="bg-[#062314] py-2 px-3 text-center">
                <h2 className="font-serif-display text-xs sm:text-sm font-black uppercase tracking-[0.14em] text-white">
                  {itinerary?.whyWithEncamp?.title || "Why Travel With Us?"}
                </h2>
              </div>
              <div className="grid grid-cols-3 divide-x divide-[#e2d8c3] py-3.5 px-1.5 text-center items-start">
                <div className="flex flex-col items-center px-1">
                  <Tag className="w-8 h-8 sm:w-9 sm:h-9 text-[#d4a853] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    Best Price Guarantee
                  </span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <ClipboardCheck className="w-8 h-8 sm:w-9 sm:h-9 text-[#d4a853] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    Easy &amp; Secure Booking
                  </span>
                </div>

                <div className="flex flex-col items-center px-1">
                  <Compass className="w-8 h-8 sm:w-9 sm:h-9 text-[#d4a853] mb-1.5 stroke-[1.4]" />
                  <span className="text-[9px] sm:text-[10px] font-extrabold uppercase text-[#062314] leading-tight">
                    24x7 Customer Support
                  </span>
                </div>
              </div>

              {itinerary?.whyWithEncamp?.content && (
                <div className="p-3 bg-[#f3eddf] text-[10.5px] sm:text-xs text-stone-700 leading-relaxed border-t border-[#e2d8c3]">
                  {itinerary.whyWithEncamp.content}
                </div>
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
