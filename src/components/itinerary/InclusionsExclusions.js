import { Check, X, Gift, ShieldCheck } from "lucide-react";

export default function InclusionsExclusions({ inclusions = [], exclusions = [] }) {
  return (
    <section className="w-full bg-stone-50 py-12 sm:py-16 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="eyebrow text-gold font-semibold tracking-widest text-sm">
            Transparency & Clarity
          </span>
          <h2 className="heading-xl text-forest font-bold tracking-tight mt-1">
            Package Inclusions & Details
          </h2>
          <p className="body-sm text-stone-600 mt-2 text-sm">
            Every Encamp Privé journey is backed by comprehensive inclusions and zero hidden surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Inclusions Card */}
          <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-forest/10 text-forest flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-forest" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-forest uppercase tracking-wide">
                    What Is Included
                  </h3>
                  <span className="text-sm text-stone-500 font-medium">
                    {inclusions.length} Premium Features Covered
                  </span>
                </div>
              </div>

              <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-forest text-ivory rounded-full">
                Complimentary
              </span>
            </div>

            <ul className="divide-y divide-stone-100 mt-4 space-y-0">
              {inclusions.map((item, idx) => (
                <li key={item._id || idx} className="py-3.5 flex items-start gap-3 text-sm text-stone-700 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions Card */}
          <div className="bg-white border border-stone-200/90 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between pb-5 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center">
                  <X className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-forest uppercase tracking-wide">
                    What Is Excluded
                  </h3>
                  <span className="text-sm text-stone-500 font-medium">
                    Optional or Personal Additions
                  </span>
                </div>
              </div>

              <span className="text-sm font-bold uppercase tracking-wider px-3 py-1 bg-stone-100 text-stone-600 rounded-full">
                Optional
              </span>
            </div>

            <ul className="divide-y divide-stone-100 mt-4 space-y-0">
              {exclusions.map((item, idx) => (
                <li key={item._id || idx} className="py-3.5 flex items-start gap-3 text-sm text-stone-600 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-stone-100 text-stone-500 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="w-3.5 h-3.5 stroke-[2.5]" />
                  </div>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
