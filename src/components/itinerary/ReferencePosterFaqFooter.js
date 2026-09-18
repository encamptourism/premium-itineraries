"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Globe, ChevronDown } from "lucide-react";

// Royal Number Medallion with Emerald Gem Core & Symmetrical Gold Filigree Wings
function FaqNumberMedallion({ number = "01" }) {
  return (
    <svg
      viewBox="0 0 88 48"
      className="w-[72px] sm:w-[80px] h-10 sm:h-11 shrink-0 select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="faqGoldMed" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F9E2A0" />
          <stop offset="45%" stopColor="#C99D40" />
          <stop offset="100%" stopColor="#A87720" />
        </linearGradient>
        <radialGradient id="emeraldGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0B3C2D" />
          <stop offset="80%" stopColor="#06291E" />
          <stop offset="100%" stopColor="#031A13" />
        </radialGradient>
      </defs>

      {/* Left Leaf/Petal Filigree */}
      <g stroke="url(#faqGoldMed)" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Center leaf body */}
        <path d="M 24,24 C 18,24 12,21 6,24 C 12,27 18,25 24,24" fill="#F8EED4" fillOpacity="0.35" />
        {/* Top wing */}
        <path d="M 21,21 C 15,16 10,18 7,22" />
        {/* Bottom wing */}
        <path d="M 21,27 C 15,32 10,30 7,26" />
        {/* Accent Beads */}
        <circle cx="5" cy="24" r="1.1" fill="url(#faqGoldMed)" stroke="none" />
        <circle cx="12" cy="17" r="0.95" fill="url(#faqGoldMed)" stroke="none" />
        <circle cx="12" cy="31" r="0.95" fill="url(#faqGoldMed)" stroke="none" />
      </g>

      {/* Right Leaf/Petal Filigree (Symmetrical) */}
      <g stroke="url(#faqGoldMed)" strokeWidth="1.15" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Center leaf body */}
        <path d="M 64,24 C 70,24 76,21 82,24 C 76,27 70,25 64,24" fill="#F8EED4" fillOpacity="0.35" />
        {/* Top wing */}
        <path d="M 67,21 C 73,16 78,18 81,22" />
        {/* Bottom wing */}
        <path d="M 67,27 C 73,32 78,30 81,26" />
        {/* Accent Beads */}
        <circle cx="83" cy="24" r="1.1" fill="url(#faqGoldMed)" stroke="none" />
        <circle cx="76" cy="17" r="0.95" fill="url(#faqGoldMed)" stroke="none" />
        <circle cx="76" cy="31" r="0.95" fill="url(#faqGoldMed)" stroke="none" />
      </g>

      {/* Center Emerald Circle */}
      <circle cx="44" cy="24" r="19.5" fill="url(#emeraldGrad)" stroke="url(#faqGoldMed)" strokeWidth="1.3" />
      
      {/* Inner Dashed Gold Ring */}
      <circle cx="44" cy="24" r="16.5" stroke="#ECD5A2" strokeWidth="0.8" strokeDasharray="1.5, 2.2" fill="none" opacity="0.9" />

      {/* Number Text in Cormorant Garamond */}
      <text
        x="44"
        y="29.5"
        textAnchor="middle"
        fill="#FCEAB3"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-display-serif), Georgia, serif"
        letterSpacing="0.03em"
      >
        {number}
      </text>
    </svg>
  );
}

// Vertical Thin Gold Divider Line with Center Diamond
function VerticalGoldDivider() {
  return (
    <svg
      viewBox="0 0 10 38"
      className="w-2.5 sm:w-3 h-8 sm:h-10 shrink-0 select-none opacity-90 mx-0.5 sm:mx-1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="5" y1="2" x2="5" y2="36" stroke="#CFA85B" strokeWidth="0.85" strokeLinecap="round" opacity="0.65" />
      <polygon points="5,16 8,19 5,22 2,19" fill="#C99D40" stroke="#FCEAB3" strokeWidth="0.5" />
    </svg>
  );
}

export default function ReferencePosterFaqFooter({ itinerary }) {
  // First item open by default matching reference image
  const [openIndex, setOpenIndex] = useState(0);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const stateOrDest = itinerary?.state || itinerary?.destination || "Meghalaya";

  const rawFaqs = [
    ...(Array.isArray(itinerary?.customFaqs) ? itinerary.customFaqs : []),
    ...(Array.isArray(itinerary?.faqs) ? itinerary.faqs : []),
  ];

  const DEFAULT_FAQS = [
    {
      id: "included",
      question: `What is included in the Premium ${stateOrDest} itinerary?`,
      answer: `The Premium ${stateOrDest} package can include premium accommodation, private transfers, curated sightseeing, selected experiences, daily breakfast, local assistance, and carefully planned experiences across Shillong, Cherrapunji, Dawki, Mawlynnong and other highlights, depending on the selected package.`,
    },
    {
      id: "destinations",
      question: `Which destinations are covered in this Premium ${stateOrDest} trip?`,
      answer: `This curated itinerary covers major destinations including Shillong, Cherrapunji (Sohra), Dawki (Umngot River), Mawlynnong (cleanest village), and Krang Shuri, alongside serene hidden waterfalls and living root bridges.`,
    },
    {
      id: "hotels",
      question: `What type of hotels are provided on the Premium ${stateOrDest} tour?`,
      answer: `We handpick boutique luxury resorts, heritage properties, and premium experiential stays that offer exceptional comfort, authentic hospitality, and breathtaking nature views.`,
    },
    {
      id: "customize",
      question: `Can I customize the Premium ${stateOrDest} itinerary?`,
      answer: `Yes, our luxury expeditions are entirely bespoke. You can adjust duration, select preferred resorts, add unique experiences like private boating or trekking, and tailor the pace to your personal preference.`,
    },
    {
      id: "private",
      question: `Is this ${stateOrDest} package private or shared?`,
      answer: `All Encamp Privé itineraries are 100% private. You will have a dedicated luxury vehicle, private chauffeur, and personal trip coordinator throughout your journey.`,
    },
  ];

  const faqs = rawFaqs.length >= 3 ? rawFaqs : DEFAULT_FAQS;
  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 4);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full bg-[#fbf9f4] font-poppins pt-10 pb-4 overflow-hidden">
      {/* Background Watermark Elements */}
      <div className="absolute -left-16 -top-10 w-[300px] sm:w-[420px] h-[300px] sm:h-[420px] opacity-[0.09] pointer-events-none select-none z-0">
        <Image src="/images/kashi_mandala_bg.svg" alt="" fill className="object-contain" priority={false} />
      </div>
      <div className="absolute -right-10 -top-6 w-[360px] sm:w-[480px] h-[260px] sm:h-[340px] opacity-[0.12] pointer-events-none select-none z-0">
        <Image src="/images/kashi_ghats_bg.svg" alt="" fill className="object-contain object-top-right" priority={false} />
      </div>

      {/* Main Container - Max Width 7xl */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
        {/* Section Header Matching Reference */}
        <div className="text-center mb-10 sm:mb-12 space-y-2">
          {/* Top Golden Lotus Bloom with Flanking Gradient Hairlines */}
          <div className="flex items-center justify-center gap-3 sm:gap-5 pt-2 mb-1">
            <div className="h-[1px] w-14 sm:w-24 md:w-32 bg-gradient-to-r from-transparent via-[#C99D40]/75 to-[#C99D40]" />
            <svg viewBox="0 0 36 28" className="w-8 h-6 shrink-0 select-none" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="faqHdrGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDEAB3" />
                  <stop offset="50%" stopColor="#C99D40" />
                  <stop offset="100%" stopColor="#9E7422" />
                </linearGradient>
              </defs>
              {/* Central Petal */}
              <path d="M 18,3 C 15,9 15,17 18,23 C 21,17 21,9 18,3 Z" fill="url(#faqHdrGold)" />
              {/* Left Petal */}
              <path d="M 18,10 C 12,12 9,18 13,22 C 15,20 17,17 18,14" fill="url(#faqHdrGold)" opacity="0.85" />
              {/* Right Petal */}
              <path d="M 18,10 C 24,12 27,18 23,22 C 21,20 19,17 18,14" fill="url(#faqHdrGold)" opacity="0.85" />
              {/* Base Calyx */}
              <path d="M 10,23 Q 18,25 26,23 Q 18,24 10,23 Z" fill="url(#faqHdrGold)" />
              <circle cx="18" cy="25.5" r="1.2" fill="url(#faqHdrGold)" />
            </svg>
            <div className="h-[1px] w-14 sm:w-24 md:w-32 bg-gradient-to-l from-transparent via-[#C99D40]/75 to-[#C99D40]" />
          </div>

          {/* Main Title: FAQ'S with Balanced Kerning */}
          <h2 className="font-display-serif text-3xl sm:text-4xl md:text-[2.65rem] font-medium tracking-[0.32em] text-[#0A3326] uppercase select-none leading-tight">
            FAQ&apos;S
          </h2>

          {/* Subtitle: YOUR QUESTIONS, OUR ANSWERS */}
          <p className="font-poppins text-[#A67C2E] text-[11px] sm:text-xs md:text-[12.5px] font-semibold tracking-[0.26em] uppercase select-none">
            YOUR QUESTIONS, OUR ANSWERS
          </p>

          {/* Mini Gold Filigree Divider: — ✦ — */}
          <div className="flex items-center justify-center gap-3 py-1">
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-r from-transparent via-[#C99D40]/70 to-[#C99D40]" />
            <span className="text-[#C99D40] text-[11px] leading-none select-none">✦</span>
            <div className="w-10 sm:w-16 h-[1px] bg-gradient-to-l from-transparent via-[#C99D40]/70 to-[#C99D40]" />
          </div>

          {/* Descriptive Tagline */}
          <p className="font-display-serif text-stone-600 text-lg sm:text-xl md:text-[1.35rem] font-normal italic tracking-wide">
            Everything you need to know before your journey
          </p>
        </div>

        {/* Stacked Full-Width FAQ Cards (1 in Each Row) */}
        <div className="space-y-4 sm:space-y-4.5">
          {visibleFaqs.map((faq, i) => {
            const isOpen = openIndex === i;
            const numberString = String(i + 1).padStart(2, "0");

            return (
              <div
                key={faq._id || faq.id || i}
                style={{
                  backgroundColor: "#FCFAF6",
                  border: "1px solid #DFCEAA",
                  boxShadow: "0 2px 14px -2px rgba(180, 140, 75, 0.07), 0 1px 3px rgba(0,0,0,0.02)",
                }}
                className="group relative w-full rounded-2xl p-4 sm:p-5 md:px-7 md:py-5 transition-all duration-200"
              >
                {/* Clickable Header Row */}
                <div
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 text-left cursor-pointer select-none"
                >
                  {/* Left Number Medallion with Gold Filigree Wings */}
                  <FaqNumberMedallion number={numberString} />

                  {/* Vertical Thin Gold Divider with Diamond */}
                  <VerticalGoldDivider />

                  {/* Question Text in Cormorant Garamond */}
                  <h3 className="flex-1 font-display-serif text-[16px] sm:text-[1.125rem] md:text-[1.2rem] font-bold text-[#073224] leading-snug tracking-wide hover:text-[#b38528] transition-colors pl-1">
                    {faq.question}
                  </h3>

                  {/* Right Circular Toggle Button - Soft Cream Fill, NO BORDER */}
                  <div
                    style={{ backgroundColor: "#F4EDE2" }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border-0 transition-colors cursor-pointer ml-2 hover:brightness-95"
                  >
                    <ChevronDown
                      style={{ color: "#9E7B3B" }}
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </div>

                {/* Collapsible Answer Inset Box - Warm Oatmeal Sand Tint, BORDERLESS */}
                {isOpen && (
                  <div
                    style={{ backgroundColor: "#F2ECE0" }}
                    className="mt-4 sm:mt-5 p-5 sm:p-6 md:p-7 rounded-xl sm:rounded-2xl transition-all duration-300 border-0"
                  >
                    <p className="font-poppins text-[#4A4A4A] text-xs sm:text-[13.5px] md:text-[14.5px] leading-[1.75]">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Read More / Read Less Toggle Button */}
        {faqs.length > 4 && (
          <div className="flex justify-center pt-8 sm:pt-9">
            <button
              type="button"
              onClick={() => setShowAllFaqs(!showAllFaqs)}
              style={{
                backgroundColor: "#FCFAF6",
                border: "1px solid #DFCEAA",
                boxShadow: "0 2px 12px -2px rgba(180, 140, 75, 0.12)",
              }}
              className="inline-flex items-center gap-2.5 px-8 py-3 rounded-full text-xs sm:text-[13px] font-semibold tracking-wider font-poppins text-[#0A3326] uppercase hover:text-[#B38320] hover:border-[#C99D40] hover:shadow-md transition-all duration-200 cursor-pointer select-none"
            >
              <span>{showAllFaqs ? "Read Less" : "Read More"}</span>
              <ChevronDown
                style={{ color: "#9E7B3B" }}
                className={`w-4 h-4 transition-transform duration-300 ${
                  showAllFaqs ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>
        )}
      </div>

      {/* Bottom Dark Banner */}
      <div className="w-full bg-forest text-ivory py-4 sm:py-5 border-t-2 border-gold/40">
        <div className="w-[94%] sm:w-[92%] lg:w-[90%] xl:w-[92%] max-w-[2200px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left: Contact Info */}
          <div className="space-y-1">
            <div className="font-poppins text-xs sm:text-sm font-extrabold uppercase tracking-[0.16em] text-gold-light">
              Book Your Adventure
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-200">
              <a
                href="tel:+919643182259"
                className="flex items-center gap-1.5 hover:text-gold-light transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold-light" />
                <span>+91 96431 82259</span>
              </a>
              <a
                href="https://www.encampadventures.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gold-light transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gold-light" />
                <span>www.encampadventures.com</span>
              </a>
            </div>
          </div>

          {/* Center: Script Quote */}
          <div className="flex flex-col items-center">
            <span className="font-script text-2xl sm:text-3xl text-gold-light tracking-wide">
              Where Every Moment Becomes a Cherished Memory.
            </span>
          </div>

          {/* Right: Encamp Logo Emblem */}
          <div className="flex items-center gap-2.5">
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
