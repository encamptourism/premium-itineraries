"use client";

import { useState } from "react";
import { Phone, Globe, Compass, ChevronDown } from "lucide-react";

export default function ReferencePosterFaqFooter({ itinerary }) {
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const faqs = Array.isArray(itinerary?.faqs) && itinerary.faqs.length > 0
    ? itinerary.faqs
    : [
        {
          question: "What is the best time to visit Meghalaya?",
          answer: "October to May is ideal for pleasant weather and outdoor experiences.",
        },
        {
          question: "Is this itinerary suitable for families?",
          answer: "Yes, it is family-friendly and can be customized for all age groups.",
        },
        {
          question: "Are flights and visa included?",
          answer: "Yes, we provide flight tickets (to & fro) and visa assistance for foreign travelleres.",
        },
        {
          question: "Is the itinerary customizable?",
          answer: "Absolutely! We can customize the itinerary as per your travel dates and preferences.",
        },
        {
          question: "What type of hotels are provided?",
          answer: "We offer comfortable 3★ & 4★ hotels with premium amenities as per the package chosen.",
        },
      ];

  const visibleFaqs = showAllFaqs ? faqs : faqs.slice(0, 3);

  return (
    <div className="w-full bg-[#fbf9f4] font-poppins pt-6 pb-4">
      <div className="w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 mb-6">
        
        {/* Main FAQ Outer Card Container (Exact Match to Reference Image) */}
        <div className="relative border border-[#e2d8c3] rounded-2xl px-4 py-4 sm:py-5 font-poppins mt-3">
          
          {/* FAQ Title Header Embedded into Top Border Line (Matching Day Wise Itinerary Font Size) */}
          <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 bg-[#fbf9f4] px-4 flex items-center justify-center z-10">
            <h2 className="font-serif-display text-base sm:text-lg md:text-xl font-black uppercase tracking-[0.2em] text-[#062314] whitespace-nowrap">
              FAQ&apos;S
            </h2>
          </div>

          {/* Grid with Vertical Dividers */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 ${visibleFaqs.length > 3 ? "lg:grid-cols-3 gap-y-4" : "lg:grid-cols-3"} divide-y sm:divide-y-0 sm:divide-x divide-[#e2d8c3] text-left font-poppins pt-2 sm:pt-3`}>
            {visibleFaqs.map((faq, i) => (
              <div
                key={i}
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
          {faqs.length > 3 && (
            <div className="flex justify-end pt-2 sm:pt-3 border-t border-[#e2d8c3]/40 mt-3">
              <button
                type="button"
                onClick={() => setShowAllFaqs(!showAllFaqs)}
                className="text-xs sm:text-sm font-semibold text-[#062314] hover:text-[#b38320] transition-colors flex items-center gap-1.5 focus:outline-none bg-transparent border-0 py-1 px-3 cursor-pointer select-none"
              >
                <span>{showAllFaqs ? "Show Less" : "Read More FAQs"}</span>
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

      {/* Bottom Dark Banner */}
      <div className="w-full bg-forest text-ivory py-4 sm:py-5 border-t-2 border-gold/40">
        <div className="w-[94%] sm:w-[92%] lg:w-[90%] xl:w-[92%] max-w-[2200px] mx-auto px-2 sm:px-4 lg:px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          {/* Left: Contact Info */}
          <div className="space-y-1">
            <div className="font-serif-display text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-gold">
              Book Your Adventure
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-stone-200">
              <a
                href="tel:+918794756611"
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>+91 87947 56611</span>
              </a>
              <a
                href="https://www.encampadventures.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-gold" />
                <span>www.encampadventures.com</span>
              </a>
            </div>
          </div>

          {/* Center: Script Quote */}
          <div className="flex flex-col items-center">
            <span className="font-script text-2xl sm:text-3xl text-gold-light tracking-wide">
              Let&apos;s create memories that last a lifetime!
            </span>
          </div>

          {/* Right: Encamp Logo Emblem */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-forest-light border border-gold/40 flex items-center justify-center text-gold shadow-sm">
              <Compass className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-serif-display text-sm font-black tracking-wider text-white uppercase leading-none">
                Encamp
              </span>
              <span className="font-serif-display text-[10px] font-bold tracking-[0.2em] text-gold uppercase">
                Adventures
              </span>
              <span className="text-[7px] tracking-[0.15em] uppercase text-stone-400 font-medium">
                Explore · Experience · Enjoy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
