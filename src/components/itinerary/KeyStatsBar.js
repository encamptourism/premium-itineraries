import { Sparkles, BedDouble, Compass, Headset, Leaf } from "lucide-react";

export default function KeyStatsBar({ itinerary }) {
  const carbon = itinerary?.carbonFootprint ? `${itinerary.carbonFootprint}kg CO₂ Neutralized` : "Carbon-Neutral Travel";
  const tripType = itinerary?.tripType || "Premium Private SUV";
  const adventureType = itinerary?.adventureType || "Luxury Expedition";

  const stats = [
    {
      icon: Sparkles,
      title: "Expedition Style",
      subtitle: adventureType,
    },
    {
      icon: BedDouble,
      title: "Handpicked Stays",
      subtitle: "Heritage & Boutique",
    },
    {
      icon: Compass,
      title: "Transit",
      subtitle: tripType,
    },
    {
      icon: Headset,
      title: "24x7 Concierge",
      subtitle: "Dedicated Ground Lead",
    },
    {
      icon: Leaf,
      title: "Responsible Luxury",
      subtitle: carbon,
    },
  ];

  return (
    <div className="w-full bg-forest text-ivory border-b border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-forest-light/60">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? "pt-3 sm:pt-0 sm:pl-4 md:pl-6" : ""
                } ${idx === 4 ? "col-span-2 sm:col-span-1" : ""}`}
              >
                <div className="w-10 h-10 rounded-full bg-forest-light/80 border border-gold/30 flex items-center justify-center text-gold shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif-display text-sm sm:text-base font-bold text-ivory tracking-wide leading-snug">
                    {item.title}
                  </span>
                  <span className="text-[11px] sm:text-xs text-stone-300 font-sans tracking-normal">
                    {item.subtitle}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
