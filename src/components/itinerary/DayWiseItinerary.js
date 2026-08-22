import Image from "next/image";
import { Clock, BedDouble, CheckCircle2, Sparkles } from "lucide-react";

export default function DayWiseItinerary({ dayWiseItinerary = [] }) {
  if (!dayWiseItinerary || dayWiseItinerary.length === 0) return null;

  return (
    <section className="w-full bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="eyebrow text-gold font-semibold tracking-widest text-sm">
            Day-by-Day Experience
          </span>
          <h2 className="heading-xl text-forest font-bold tracking-tight mt-1">
            Curated Expedition Itinerary
          </h2>
          <p className="body-sm text-stone-600 mt-2 text-sm">
            Every day is thoughtfully paced with private transfers, handpicked encounters, and unhurried luxury.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative space-y-12 sm:space-y-16">
          {/* Vertical Connecting Line for Desktop */}
          <div className="hidden lg:block absolute left-[39px] top-6 bottom-6 w-[2px] bg-stone-200" />

          {dayWiseItinerary.map((day, index) => {
            const dayNum = day.dayNumber || index + 1;
            const dayImage =
              day.image ||
              (Array.isArray(day.gallery) && day.gallery[0]?.url) ||
              (Array.isArray(day.stay) && day.stay[0]?.image) ||
              null;

            return (
              <div
                key={day._id || index}
                id={`day-${dayNum}`}
                className="relative flex flex-col lg:flex-row gap-6 lg:gap-10 items-start group"
              >
                {/* 1. Day Badge (Mobile & Desktop) */}
                <div className="flex items-center gap-3 lg:flex-col lg:items-center shrink-0 z-10">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-2xl bg-forest text-ivory flex flex-col items-center justify-center shadow-md border-2 border-forest-light group-hover:scale-105 transition-transform duration-300">
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gold">
                      Day
                    </span>
                    <span className="font-serif-display text-xl sm:text-3xl font-bold leading-none mt-0.5">
                      {String(dayNum).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="lg:hidden flex flex-col">
                    <span className="font-serif-display text-lg sm:text-xl font-bold text-forest uppercase tracking-wide">
                      {day.title}
                    </span>
                    {day.description && (
                      <span className="text-sm text-stone-600 font-medium">
                        {day.description}
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Main Content Card */}
                <div className="flex-1 w-full bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                  {/* Desktop Title & Subtitle */}
                  <div className="hidden lg:block mb-6 border-b border-stone-100 pb-4">
                    <h3 className="font-serif-display text-2xl md:text-3xl font-bold text-forest uppercase tracking-wider">
                      {day.title}
                    </h3>
                    {day.description && (
                      <p className="text-sm md:text-base text-stone-600 font-medium mt-1">
                        {day.description}
                      </p>
                    )}
                  </div>

                  {/* Responsive Grid: Image & Activity Timeline */}
                  <div className={`grid grid-cols-1 ${dayImage ? "md:grid-cols-12 gap-6" : ""} items-start`}>
                    {/* Day Visual / Photo */}
                    {dayImage && (
                      <div className="md:col-span-5 relative w-full h-56 sm:h-64 md:h-72 rounded-xl overflow-hidden shadow-sm">
                        <Image
                          src={dayImage}
                          alt={`Day ${dayNum}: ${day.title}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 450px"
                          className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading={index < 2 ? "eager" : "lazy"}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute bottom-3 left-3 right-3 text-white">
                          <span className="text-xs font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                            {day.title?.split("→")[0]?.trim() || `Day ${dayNum}`}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Activities List */}
                    <div className={dayImage ? "md:col-span-7 space-y-4" : "w-full space-y-4"}>
                      {day.activities && day.activities.length > 0 && (
                        <div className="space-y-4">
                          {day.activities.map((act, actIdx) => (
                            <div
                              key={act._id || actIdx}
                              className="relative pl-5 border-l-2 border-gold/50 space-y-1.5"
                            >
                              <div className="flex items-center gap-2">
                                <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-forest bg-forest/5 px-2.5 py-0.5 rounded">
                                  <Clock className="w-3.5 h-3.5 text-gold" />
                                  {act.timeOfDay || "Activity"}
                                </span>
                              </div>

                              {/* Green / Highlight Lead Text */}
                              {act.greenText && (
                                <p className="text-sm sm:text-base font-semibold text-forest-light leading-snug">
                                  {act.greenText}
                                </p>
                              )}

                              {/* Black / Detail Text */}
                              {act.blackText && (
                                <p className="text-sm text-stone-700 leading-relaxed">
                                  {act.blackText}
                                </p>
                              )}

                              {/* Instruction Bullet Points if present */}
                              {act.instruction && (
                                <div className="bg-stone-50 rounded-lg p-3 text-sm text-stone-600 whitespace-pre-line border border-stone-150 mt-1">
                                  {act.instruction}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Day Highlights Pills */}
                      {Array.isArray(day.highlights) && day.highlights.length > 0 && (
                        <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2">
                          {day.highlights.map((hl, hIdx) => (
                            <span
                              key={hIdx}
                              className="inline-flex items-center gap-1 text-xs font-medium text-forest bg-ivory border border-stone-300/80 px-3 py-1 rounded-full"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-gold" />
                              {hl}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stay / Accommodation Card if Available */}
                  {Array.isArray(day.stay) && day.stay.length > 0 && (
                    <div className="mt-6 pt-5 border-t border-stone-100 bg-stone-50/70 -mx-5 sm:-mx-7 md:-mx-8 -mb-5 sm:-mb-7 md:-mb-8 p-4 sm:p-6 rounded-b-2xl sm:rounded-b-3xl flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-forest text-gold flex items-center justify-center shrink-0">
                          <BedDouble className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-stone-500">
                            Curated Accommodation
                          </div>
                          <div className="font-serif-display text-sm sm:text-base font-bold text-forest">
                            {day.stay[0].name}
                          </div>
                        </div>
                      </div>

                      {day.stay[0].rating && (
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs sm:text-sm font-semibold text-forest shadow-xs">
                          <CheckCircle2 className="w-4 h-4 text-gold" />
                          {day.stay[0].rating}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
