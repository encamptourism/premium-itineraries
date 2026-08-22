"use client";

import { useState } from "react";
import { Check, Phone, MessageSquare, Sparkles, Shield, ArrowRight } from "lucide-react";
import EnquiryModal from "./EnquiryModal";

export default function PricingSection({ itinerary }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const priceItem = Array.isArray(itinerary?.startingFrom) && itinerary.startingFrom.length > 0
    ? itinerary.startingFrom[0]
    : null;

  const formattedPrice = priceItem?.pricePerPerson
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(priceItem.pricePerPerson)
    : null;

  const advanceVal = itinerary?.advancePayment?.isAvailable && itinerary.advancePayment.value
    ? new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
      }).format(itinerary.advancePayment.value)
    : null;

  const days = itinerary?.duration?.days || 0;
  const nights = itinerary?.duration?.nights || 0;
  const tripType = itinerary?.tripType || "Private Expedition";
  const title = itinerary?.title || "Luxury Expedition";
  const encodedTitle = encodeURIComponent(title);

  return (
    <section id="pricing-section" className="w-full bg-white py-14 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow text-gold font-semibold tracking-widest text-xs">
            Investment & Customization
          </span>
          <h2 className="heading-xl text-forest font-bold tracking-tight mt-1">
            Pricing & Bespoke Booking
          </h2>
          <p className="body-sm text-stone-600 mt-2">
            Choose our masterfully curated private expedition or let our travel architects tailor every detail to your schedule.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {/* Card 1: Curated Private Expedition (Signature) */}
          <div className="lg:col-span-2 relative bg-forest text-ivory rounded-3xl p-7 sm:p-10 shadow-xl border-2 border-forest-light flex flex-col justify-between overflow-hidden">
            {/* Top Gold Badge */}
            <div className="absolute top-0 right-0 bg-gold text-forest-dark font-bold text-xs uppercase tracking-widest py-2 px-6 rounded-bl-2xl shadow-sm">
              Signature Expedition
            </div>

            <div className="space-y-6">
              <div>
                {itinerary?.itineraryType && (
                  <span className="text-xs uppercase tracking-[0.2em] font-semibold text-gold-light">
                    {itinerary.itineraryType}
                  </span>
                )}
                <h3 className="font-serif-display text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white mt-1">
                  {title}
                </h3>
                {(days > 0 || nights > 0) && (
                  <p className="text-sm text-stone-300 font-sans mt-2">
                    {days} Days · {nights} Nights · {tripType}
                  </p>
                )}
              </div>

              {/* Price Row */}
              {formattedPrice && (
                <div className="flex flex-wrap items-baseline gap-3 py-4 border-y border-forest-light">
                  <span className="font-serif-display text-4xl sm:text-5xl font-bold text-gold">
                    {formattedPrice}
                  </span>
                  <span className="text-sm text-stone-300 uppercase tracking-wider font-medium">
                    / per guest
                  </span>
                  {priceItem?.people && (
                    <span className="text-xs text-stone-400">
                      ({priceItem.people})
                    </span>
                  )}
                </div>
              )}

              {/* Advance Payment Notice */}
              {advanceVal && (
                <div className="bg-forest-light/60 rounded-2xl p-4 border border-gold/20 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2.5">
                    <Shield className="w-5 h-5 text-gold shrink-0" />
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">
                        Lock Dates with Advance Token
                      </div>
                      <div className="text-xs text-stone-300">
                        Reserve now with {advanceVal} per guest. Balance closer to departure.
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-gold-light uppercase tracking-wider">
                    Flexible Rescheduling
                  </span>
                </div>
              )}

              {/* Dynamic Inclusions Preview */}
              {Array.isArray(itinerary?.inclusions) && itinerary.inclusions.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {itinerary.inclusions.slice(0, 4).map((inc, i) => (
                    <div key={inc._id || i} className="flex items-center gap-2 text-xs text-stone-200">
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      <span className="line-clamp-1">{inc.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex-1 bg-gold text-forest-dark hover:bg-gold-light py-4 px-8 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <span>Enquire & Reserve Journey</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/918794756611?text=Hi%20Encamp%20Priv%C3%A9%2C%20I%20am%20interested%20in%20the%20${encodedTitle}%20Expedition.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm font-medium transition-all"
              >
                <MessageSquare className="w-4 h-4 text-gold" />
                <span>WhatsApp Concierge</span>
              </a>
            </div>
          </div>

          {/* Card 2: 100% Bespoke & Custom Package */}
          <div className="bg-ivory border border-stone-300 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest/10 text-forest text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Bespoke Design
              </div>

              <div>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-forest uppercase tracking-wide">
                  Custom Tailored Expedition
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2">
                  Require helicopter transfers, extended days, special culinary arrangements, or private family villas?
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Completely personalized pacing & dates</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Choice of presidential suites & private camps</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Private dining & cultural performances</span>
                </div>
                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                  <Check className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>Personal travel curator assigned</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-forest text-ivory hover:bg-forest-light py-3.5 px-6 rounded-full font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Request Custom Quote</span>
              </button>

              <a
                href="tel:+918794756611"
                className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-stone-600 hover:text-forest transition-colors uppercase tracking-wider"
              >
                <Phone className="w-3.5 h-3.5 text-gold" />
                <span>Call +91 87947 56611</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        itineraryTitle={title}
      />
    </section>
  );
}
