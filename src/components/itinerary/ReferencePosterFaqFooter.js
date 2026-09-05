"use client";

import { useState } from "react";
import Image from "next/image";
import { Phone, Globe, ChevronDown } from "lucide-react";

export default function ReferencePosterFaqFooter({ itinerary }) {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const faqs = [
    ...(Array.isArray(itinerary?.customFaqs) ? itinerary.customFaqs : []),
    ...(Array.isArray(itinerary?.faqs) ? itinerary.faqs : []),
  ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 6);

  return (
    <div className="w-full bg-[#fbf9f4] font-poppins pt-6 pb-4">
      {faqs.length > 0 && (
        <div className="w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 mb-6">
          
          {/* Main FAQ Outer Card Container */}
          <div className="relative border border-[#e2d8c3] rounded-2xl px-4 py-4 sm:py-5 font-poppins mt-3">
            
            {/* FAQ Title Header Embedded into Top Border Line */}
            <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#fbf9f4] px-4 flex items-center justify-center z-10">
              <h2 className="font-serif-display text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.2em] text-[#062314] whitespace-nowrap">
                FAQ&apos;S
              </h2>
            </div>

            {/* Grid with Vertical Dividers */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 ${visibleFaqs.length > 3 ? "lg:grid-cols-3 gap-y-4" : "lg:grid-cols-3"} divide-y sm:divide-y-0 sm:divide-x divide-[#e2d8c3] text-left font-poppins pt-2 sm:pt-3`}>
              {visibleFaqs.map((faq, i) => (
                <div
                  key={faq._id || i}
                  className={`space-y-1.5 ${i > 0 && i % 3 !== 0 ? "pt-2.5 sm:pt-0 sm:pl-3 lg:pl-4" : i > 0 ? "pt-2.5 sm:pt-3 sm:pl-0" : ""}`}
                >
                  {/* Question Line */}
                  <div className="text-xs sm:text-sm leading-snug flex items-start gap-1">
                    <span className="font-extrabold text-[#062314] shrink-0">
                      Q{i + 1}.
                    </span>
                    <span className="font-bold text-[#062314]">
                      {faq.question}
                    </span>
                  </div>

                  {/* Answer Line */}
                  <div className="text-xs sm:text-sm text-stone-700 leading-relaxed flex items-start gap-1">
                    <span className="font-bold text-[#062314] shrink-0">
                      A:
                    </span>
                    <span>{faq.answer}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* No-Outline Read More Toggle Button (Aligned Right) */}
            {faqs.length > 6 && (
              <div className="flex justify-end pt-2 sm:pt-3 border-t border-[#e2d8c3]/40 mt-3">
                <button
                  type="button"
                  onClick={() => setShowAllFaqs(!showAllFaqs)}
                  className="text-xs sm:text-sm font-semibold text-[#062314] hover:text-[#b38320] transition-colors flex items-center gap-1.5 focus:outline-none bg-transparent border-0 py-1 px-3 cursor-pointer select-none"
                >
                  <span>{showAllFaqs ? "Show Less" : `Read More FAQs (${faqs.length - 6} more)`}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#b38320] transition-transform duration-300 ${
                      showAllFaqs ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            )}

          </div>
        </div>
      )}

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
