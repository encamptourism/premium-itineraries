"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { LotusHeaderIcon } from "./LuxuryExperienceIcons";

/**
 * Exact Emerald & Gold Jewel Medallion with Cardinal Diamonds
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
        <linearGradient id="numMedGold2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F7E6B5" />
          <stop offset="50%" stopColor="#CBA24B" />
          <stop offset="100%" stopColor="#87651C" />
        </linearGradient>
        <radialGradient id="emeraldMedGrad2" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0E4A38" />
          <stop offset="70%" stopColor="#052D21" />
          <stop offset="100%" stopColor="#011811" />
        </radialGradient>
      </defs>

      <polygon points="27,1 30,5 27,9 24,5" fill="url(#numMedGold2)" />
      <polygon points="27,45 30,49 27,53 24,49" fill="url(#numMedGold2)" />
      <polygon points="1,27 5,24 9,27 5,30" fill="url(#numMedGold2)" />
      <polygon points="45,27 49,24 53,27 49,30" fill="url(#numMedGold2)" />

      <circle cx="11" cy="11" r="1.3" fill="url(#numMedGold2)" />
      <circle cx="43" cy="11" r="1.3" fill="url(#numMedGold2)" />
      <circle cx="43" cy="43" r="1.3" fill="url(#numMedGold2)" />
      <circle cx="11" cy="43" r="1.3" fill="url(#numMedGold2)" />

      <circle cx="27" cy="27" r="20" fill="none" stroke="url(#numMedGold2)" strokeWidth="1.5" />
      <circle cx="27" cy="27" r="18" fill="url(#emeraldMedGrad2)" stroke="url(#numMedGold2)" strokeWidth="1" />
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
        <linearGradient id="faqCardBorderGold2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EAD292" />
          <stop offset="50%" stopColor="#CBA24B" />
          <stop offset="100%" stopColor="#87651C" />
        </linearGradient>
        <linearGradient id="faqCardFill2" x1="0%" y1="0%" x2="0%" y2="100%">
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
        fill="url(#faqCardFill2)"
        stroke="url(#faqCardBorderGold2)"
        strokeWidth="1.6"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function FaqSection({ faqs = [], customFaqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const rawFaqs = [
    ...(Array.isArray(customFaqs) ? customFaqs : []),
    ...(Array.isArray(faqs) ? faqs : []),
  ];

  const DEFAULT_FAQS = [
    {
      question: "Do Indians need a visa for Bhutan?",
      answer: "No, Indian citizens do not require a visa. However, a permit is mandatory and can be obtained at entry points like Phuentsholing or online.",
    },
    {
      question: "Do we need a passport for Bhutan?",
      answer: "Yes, Indian citizens need either a valid passport or a voter ID card to enter Bhutan.",
    },
    {
      question: "Is Bhutan open for Indian tourists?",
      answer: "Yes, Bhutan is open for Indian tourists. Ensure you have the required documents and permits before travel.",
    },
    {
      question: "Is Bhutan part of India?",
      answer: "No, Bhutan is an independent country and a sovereign Himalayan kingdom.",
    },
    {
      question: "Where is Bhutan located?",
      answer: "Bhutan is located in the Eastern Himalayas, bordered by India to the south, east, and west, and China to the north.",
    },
    {
      question: "What is India to Bhutan distance?",
      answer: "The road distance from Guwahati to Thimphu is approximately 267 km. The exact distance varies based on the entry point and destination.",
    },
  ];

  const allFaqs = rawFaqs.length >= 3 ? rawFaqs : DEFAULT_FAQS;
  const initialCount = 6;
  const visibleFaqs = showAllFaqs ? allFaqs : allFaqs.slice(0, initialCount);
  const remainingCount = Math.max(0, allFaqs.length - initialCount);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#FAF6EE] py-12 sm:py-16 border-t border-[#E5D7BA] font-poppins relative overflow-hidden select-none">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 mx-auto">
        
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

        {/* 3-Column Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const numberString = String(i + 1).padStart(2, "0");

            return (
              <div
                key={i}
                className="relative w-full p-5 sm:p-6 transition-all duration-300 min-h-[170px] flex flex-col justify-between group cursor-pointer"
                onClick={() => toggleFaq(i)}
              >
                <FaqCardSvgFrame />

                <div className="relative z-10 space-y-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <ScallopedNumberMedallion number={numberString} />
                      <h3 className="font-display-serif text-base sm:text-[18px] font-bold text-[#073224] leading-snug tracking-wide group-hover:text-[#B8860B] transition-colors">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-gradient-to-b from-[#FAF4E6] to-[#EEDEB8] border border-[#CBA24B]/70 flex items-center justify-center shrink-0 text-[#7A5A18] group-hover:bg-[#CBA24B] group-hover:text-white transition-all shadow-xs mt-0.5">
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </div>

                  <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#CBA24B]/50 to-transparent" />

                  <div className={`flex items-start transition-all duration-300 ${
                    isOpen ? "flex opacity-100" : "hidden sm:flex opacity-95"
                  }`}>
                    <div className="w-[1.5px] bg-[#CBA24B]/75 rounded-full self-stretch min-h-[48px] mr-4 shrink-0" />
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
        {allFaqs.length > initialCount && (
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
                  <linearGradient id="btnGoldGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#F7E6B5" />
                    <stop offset="50%" stopColor="#CBA24B" />
                    <stop offset="100%" stopColor="#87651C" />
                  </linearGradient>
                  <linearGradient id="btnBgGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
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
                  fill="url(#btnBgGrad2)"
                  stroke="url(#btnGoldGrad2)"
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
    </section>
  );
}
