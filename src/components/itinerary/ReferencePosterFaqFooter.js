"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Globe, ChevronDown, ArrowRight } from "lucide-react";
import { LotusHeaderIcon } from "./LuxuryExperienceIcons";

/**
 * Exact Emerald & Gold Jewel Medallion with Cardinal Diamonds (Matching Reference Image)
 */
function ScallopedNumberMedallion({ number = "06" }) {
  return (
    <svg
      viewBox="0 0 54 54"
      className="w-11 h-11 sm:w-12 sm:h-12 shrink-0 select-none drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="numMedGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E6B5" />
          <stop offset="50%" stopColor="#CBA24B" />
          <stop offset="100%" stopColor="#87651C" />
        </linearGradient>
        <radialGradient id="emeraldMedGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0E4A38" />
          <stop offset="70%" stopColor="#052D21" />
          <stop offset="100%" stopColor="#011811" />
        </radialGradient>
      </defs>

      {/* 4 Cardinal Diamond Accent Points */}
      <polygon points="27,1 30,5 27,9 24,5" fill="url(#numMedGold)" />
      <polygon points="27,45 30,49 27,53 24,49" fill="url(#numMedGold)" />
      <polygon points="1,27 5,24 9,27 5,30" fill="url(#numMedGold)" />
      <polygon points="45,27 49,24 53,27 49,30" fill="url(#numMedGold)" />

      {/* 4 Diagonal Accent Dots */}
      <circle cx="11" cy="11" r="1.3" fill="url(#numMedGold)" />
      <circle cx="43" cy="11" r="1.3" fill="url(#numMedGold)" />
      <circle cx="43" cy="43" r="1.3" fill="url(#numMedGold)" />
      <circle cx="11" cy="43" r="1.3" fill="url(#numMedGold)" />

      {/* Outer Polished Gold Ring */}
      <circle cx="27" cy="27" r="20" fill="none" stroke="url(#numMedGold)" strokeWidth="1.5" />

      {/* Emerald Core Circle */}
      <circle cx="27" cy="27" r="18" fill="url(#emeraldMedGrad)" stroke="url(#numMedGold)" strokeWidth="1" />

      {/* Inner Thin Gold Accent Circle */}
      <circle cx="27" cy="27" r="15" stroke="#F7E6B5" strokeWidth="0.7" opacity="0.8" fill="none" />

      {/* Number Text in Luxurious Roman */}
      <text
        x="27"
        y="33"
        textAnchor="middle"
        fill="#F7E6B5"
        fontSize="17"
        fontWeight="400"
        fontFamily="var(--font-luxurious-roman), Georgia, serif"
        letterSpacing="0.02em"
      >
        {number}
      </text>
    </svg>
  );
}

/**
 * Smoothly Rounded Concave Notched-Corner Card SVG Background Frame (Single Border)
 */
function FaqCardSvgFrame() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-sm"
      preserveAspectRatio="none"
      viewBox="0 0 380 220"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="faqCardBorderGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAD292" />
          <stop offset="50%" stopColor="#CBA24B" />
          <stop offset="100%" stopColor="#87651C" />
        </linearGradient>
        <linearGradient id="faqCardFill" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FAF6EE" />
          <stop offset="100%" stopColor="#F5ECE0" />
        </linearGradient>
      </defs>

      {/* Perfectly Symmetrical Smoothly Rounded Concave Notched Card Border */}
      <path
        d="M 24,2 
           L 356,2 
           A 6,6 0 0,1 362,8 
           A 14,14 0 0,0 372,18 
           A 6,6 0 0,1 378,24 
           L 378,196 
           A 6,6 0 0,1 372,202 
           A 14,14 0 0,0 362,212 
           A 6,6 0 0,1 356,218 
           L 24,218 
           A 6,6 0 0,1 18,212 
           A 14,14 0 0,0 8,202 
           A 6,6 0 0,1 2,196 
           L 2,24 
           A 6,6 0 0,1 8,18 
           A 14,14 0 0,0 18,8 
           A 6,6 0 0,1 24,2 Z"
        fill="url(#faqCardFill)"
        stroke="url(#faqCardBorderGold)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Corner Watermark Lotus Line-Art Graphic
 */
function CornerLotusWatermark({ className = "" }) {
  return (
    <svg viewBox="0 0 160 160" className={`w-36 sm:w-52 h-36 sm:h-52 select-none pointer-events-none opacity-20 ${className}`} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80,10 C 60,40 60,100 80,140 C 100,100 100,40 80,10 Z" stroke="#C99D40" strokeWidth="1.2" />
      <path d="M 80,45 C 45,50 30,85 50,120 C 65,105 75,90 80,70" stroke="#C99D40" strokeWidth="1.2" />
      <path d="M 80,45 C 115,50 130,85 110,120 C 95,105 85,90 80,70" stroke="#C99D40" strokeWidth="1.2" />
      <path d="M 80,70 C 35,70 15,100 35,135 C 55,125 70,110 80,95" stroke="#C99D40" strokeWidth="1.2" />
      <path d="M 80,70 C 125,70 145,100 125,135 C 105,125 90,110 80,95" stroke="#C99D40" strokeWidth="1.2" />
      <circle cx="80" cy="142" r="3" fill="#C99D40" />
    </svg>
  );
}

export default function ReferencePosterFaqFooter({ itinerary }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const stateOrDest = itinerary?.state || itinerary?.destination || "Bhutan";

  const rawFaqs = [
    ...(Array.isArray(itinerary?.customFaqs) ? itinerary.customFaqs : []),
    ...(Array.isArray(itinerary?.faqs) ? itinerary.faqs : []),
  ];

  const DEFAULT_FAQS = [
    {
      id: "faq-1",
      question: `Do Indians need a visa for ${stateOrDest}?`,
      answer: `No, Indian citizens do not require a visa. However, a permit is mandatory and can be obtained at entry points like Phuentsholing or online.`,
    },
    {
      id: "faq-2",
      question: `Do we need a passport for ${stateOrDest}?`,
      answer: `Yes, Indian citizens need either a valid passport or a voter ID card to enter ${stateOrDest}.`,
    },
    {
      id: "faq-3",
      question: `Is ${stateOrDest} open for Indian tourists?`,
      answer: `Yes, ${stateOrDest} is open for Indian tourists. Ensure you have the required documents and permits before travel.`,
    },
    {
      id: "faq-4",
      question: `Is ${stateOrDest} part of India?`,
      answer: `No, ${stateOrDest} is an independent country and a sovereign Himalayan kingdom.`,
    },
    {
      id: "faq-5",
      question: `Where is ${stateOrDest} located?`,
      answer: `${stateOrDest} is located in the Eastern Himalayas, bordered by India to the south, east, and west, and China to the north.`,
    },
    {
      id: "faq-6",
      question: `What is India to ${stateOrDest} distance?`,
      answer: `The road distance from Guwahati to Thimphu is approximately 267 km. The exact distance varies based on the entry point and destination.`,
    },
    {
      id: "faq-7",
      question: `What is the best season for luxury travel?`,
      answer: `Spring (March to May) and Autumn (September to November) offer clear Himalayan views and pleasant weather.`,
    },
    {
      id: "faq-8",
      question: `What currency is used in ${stateOrDest}?`,
      answer: `The local currency is the Ngultrum (BTN). Indian Rupees (INR) are widely accepted across most luxury resorts and local markets.`,
    },
    {
      id: "faq-9",
      question: `Are private luxury vehicles provided?`,
      answer: `Yes, all Encamp Privé expeditions include private luxury SUVs/vehicles with dedicated chauffeurs and local trip coordinators.`,
    },
  ];

  const faqs = rawFaqs.length >= 3 ? rawFaqs : DEFAULT_FAQS;
  const initialCount = 6;
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, initialCount);
  const remainingCount = Math.max(0, faqs.length - initialCount);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full bg-[#FAF6EE] font-poppins pt-12 pb-6 overflow-hidden border-t border-[#E5D7BA]">
      
      {/* Background Watermark Elements */}
      <CornerLotusWatermark className="absolute -left-12 -bottom-12" />
      <CornerLotusWatermark className="absolute -right-12 -bottom-12 transform scale-x-[-1]" />

      {/* Heritage Sky & Mandir Watermarks */}
      <div className="absolute left-0 top-0 w-80 h-48 opacity-[0.07] pointer-events-none select-none">
        <Image src="/images/kashi_mandala_bg.svg" alt="" fill className="object-contain object-left-top" />
      </div>
      <div className="absolute right-0 top-0 w-80 h-48 opacity-[0.08] pointer-events-none select-none">
        <Image src="/images/kashi_ghats_bg.svg" alt="" fill className="object-contain object-right-top" />
      </div>

      <div className="relative z-10 w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto mb-12">
        
        {/* ============================================================ */}
        {/* HEADER SECTION (MATCHING LUXURY EXPERIENCES HEADER DESIGN)   */}
        {/* ============================================================ */}
        <div className="text-center mb-8 sm:mb-10 space-y-1 select-none">
          <div className="flex justify-center mb-1">
            <LotusHeaderIcon className="w-8 h-6 sm:w-9 sm:h-7 text-[#b38320]" />
          </div>

          <div className="flex items-center justify-center gap-3 sm:gap-6 md:gap-8">
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-r from-transparent via-[#b38320]/60 to-[#123b2a]" />
            <h2 className="font-display-serif text-2xl sm:text-3xl md:text-[2.25rem] font-medium tracking-[0.22em] text-[#123b2a] uppercase select-none">
              FAQ&quot;S
            </h2>
            <div className="h-[1px] w-12 sm:w-24 md:w-36 bg-gradient-to-l from-transparent via-[#b38320]/60 to-[#123b2a]" />
          </div>

          <p className="text-[#b38320] text-[10px] sm:text-xs md:text-sm font-medium tracking-[0.3em] uppercase flex items-center justify-center gap-2 select-none">
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
            <span>YOUR QUESTIONS, OUR ANSWERS</span>
            <span className="text-[9px] sm:text-[11px] text-[#c99d40]">✦</span>
          </p>
        </div>

        {/* ============================================================ */}
        {/* 3-COLUMN CARD GRID LAYOUT                                   */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const numberString = String(i + 1).padStart(2, "0");

            return (
              <div
                key={faq._id || faq.id || i}
                className="relative w-full p-5 sm:p-6 transition-all duration-300 min-h-[170px] flex flex-col justify-between group cursor-pointer"
                onClick={() => toggleFaq(i)}
              >
                {/* SVG Background Frame with Concave Notched Corners */}
                <FaqCardSvgFrame />

                {/* Card Content Container */}
                <div className="relative z-10 space-y-3.5">
                  
                  {/* Top Row: Medallion Number, Question Title, Circular Dropdown Button */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      {/* Scalloped Starburst Gold Medallion Number */}
                      <ScallopedNumberMedallion number={numberString} />

                      {/* Question Title */}
                      <h3 className="font-display-serif text-base sm:text-[18px] font-bold text-[#073224] leading-snug tracking-wide group-hover:text-[#B8860B] transition-colors">
                        {faq.question}
                      </h3>
                    </div>

                    {/* Circular Dropdown Button */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#FAF4E6] to-[#EEDEB8] border border-[#CBA24B]/70 flex items-center justify-center shrink-0 text-[#7A5A18] group-hover:bg-[#CBA24B] group-hover:text-white transition-all shadow-xs mt-0.5">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  {/* Horizontal Gold Separator Line */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#CBA24B]/50 to-transparent" />

                  {/* Answer Row Area with Left Vertical Gold Line & A: Label */}
                  <div className={`flex items-start transition-all duration-300 ${
                    isOpen ? "flex opacity-100" : "hidden sm:flex opacity-95"
                  }`}>
                    {/* Vertical Gold Line */}
                    <div className="w-[1.5px] bg-[#CBA24B]/75 rounded-full self-stretch min-h-[48px] mr-4 shrink-0" />

                    {/* Answer Flex Content */}
                    <div className="flex items-start gap-2 text-xs sm:text-[13.5px] text-[#3A4A43] leading-relaxed flex-1">
                      <span className="font-display-serif font-bold text-[#073224] text-sm sm:text-base leading-none pt-0.5">
                        A:
                      </span>
                      <p className="flex-1 leading-relaxed text-[#3A4A43]">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

        {/* ============================================================ */}
        {/* BOTTOM READ MORE BUTTON WITH FLANKING GOLD LINES             */}
        {/* ============================================================ */}
        {faqs.length > initialCount && (
          <div className="flex items-center justify-center gap-3 sm:gap-6 pt-10 select-none">
            {/* Left Tapered Gold Hairline & Diamond Ornament */}
            <div className="flex items-center flex-1 max-w-[180px] sm:max-w-[280px]">
              <div className="h-[1.2px] w-full bg-gradient-to-r from-transparent via-[#CBA24B]/60 to-[#CBA24B]" />
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0 -ml-0.5" fill="currentColor">
                <polygon points="8,1 15,8 8,15 1,8" fill="#CBA24B" stroke="#FCEAB3" strokeWidth="0.5" />
                <polygon points="8,4 12,8 8,12 4,8" fill="#072D20" />
              </svg>
            </div>

            {/* Ornamental Scalloped Dark Green & Gold Button */}
            <button
              type="button"
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              className="relative group cursor-pointer active:scale-95 transition-transform"
            >
              <svg
                viewBox="0 0 360 48"
                className="w-[280px] sm:w-[340px] h-11 sm:h-12 drop-shadow-md"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient id="btnGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7E6B5" />
                    <stop offset="50%" stopColor="#CBA24B" />
                    <stop offset="100%" stopColor="#87651C" />
                  </linearGradient>
                  <linearGradient id="btnBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#083E2D" />
                    <stop offset="100%" stopColor="#022117" />
                  </linearGradient>
                </defs>

                {/* Smooth Cubic Bezier Ornamental Bracket Button Path */}
                <path
                  d="M 32,2 
                     L 328,2 
                     C 340,2 344,8 346,14 
                     C 348,20 352,24 358,24 
                     C 352,24 348,28 346,34 
                     C 344,40 340,46 328,46 
                     L 32,46 
                     C 20,46 16,40 14,34 
                     C 12,28 8,24 2,24 
                     C 8,24 12,20 14,14 
                     C 16,8 20,2 32,2 Z"
                  fill="url(#btnBgGrad)"
                  stroke="url(#btnGoldGrad)"
                  strokeWidth="1.6"
                />
              </svg>

              {/* Text & Right Arrow */}
              <div className="absolute inset-0 flex items-center justify-center gap-2 text-[#FCEAB3] group-hover:text-white transition-colors px-6">
                <span className="font-display-serif font-medium text-xs sm:text-[13px] tracking-[0.22em] uppercase whitespace-nowrap">
                  {showAllFaqs ? (
                    <>
                      <span className="sm:hidden">SHOW LESS</span>
                      <span className="hidden sm:inline">SHOW LESS FAQS</span>
                    </>
                  ) : (
                    <>
                      <span className="sm:hidden">READ MORE</span>
                      <span className="hidden sm:inline">READ MORE FAQS ({remainingCount} MORE)</span>
                    </>
                  )}
                </span>
                <span className="text-[#F7E6B5] text-sm sm:text-base font-serif transition-transform duration-300 group-hover:translate-x-1 shrink-0">
                  →
                </span>
              </div>
            </button>

            {/* Right Tapered Gold Hairline & Diamond Ornament */}
            <div className="flex items-center flex-1 max-w-[180px] sm:max-w-[280px]">
              <svg viewBox="0 0 16 16" className="w-3.5 h-3.5 shrink-0 -mr-0.5" fill="currentColor">
                <polygon points="8,1 15,8 8,15 1,8" fill="#CBA24B" stroke="#FCEAB3" strokeWidth="0.5" />
                <polygon points="8,4 12,8 8,12 4,8" fill="#072D20" />
              </svg>
              <div className="h-[1.2px] w-full bg-gradient-to-l from-transparent via-[#CBA24B]/60 to-[#CBA24B]" />
            </div>
          </div>
        )}

      </div>

      {/* ============================================================ */}
      {/* BOTTOM ROYAL CONTACT FOOTER STRIP                            */}
      {/* ============================================================ */}
      <div className="w-full bg-[#073224] text-[#FAF6EE] py-4 sm:py-5 border-t-2 border-[#C99D40]/50">
        <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          {/* Contact Info */}
          <div className="space-y-1">
            <div className="font-poppins text-xs font-bold uppercase tracking-[0.18em] text-[#FCEAB3]">
              Book Your Luxury Expedition
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-200">
              <a href="tel:+919643182259" className="flex items-center gap-1.5 hover:text-[#FCEAB3] transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#C99D40]" />
                <span>+91 96431 82259</span>
              </a>
              <a href="https://www.encampadventures.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-[#FCEAB3] transition-colors">
                <Globe className="w-3.5 h-3.5 text-[#C99D40]" />
                <span>www.encampadventures.com</span>
              </a>
            </div>
          </div>

          {/* Script Quote */}
          <div className="flex flex-col items-center">
            <span className="font-display-serif italic text-xl sm:text-2xl text-[#FCEAB3] tracking-wide">
              Where Every Moment Becomes a Cherished Memory.
            </span>
          </div>

          {/* Logo Emblem */}
          <div className="flex items-center gap-2">
            <div className="relative w-32 sm:w-36 h-9 sm:h-10 shrink-0 rounded-lg overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Encamp Privé Logo"
                fill
                className="object-contain object-center md:object-right"
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
