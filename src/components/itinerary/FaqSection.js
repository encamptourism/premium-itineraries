import { HelpCircle } from "lucide-react";

export default function FaqSection({ faqs = [], customFaqs = [] }) {
  const allFaqs = [
    ...(Array.isArray(customFaqs) ? customFaqs : []),
    ...(Array.isArray(faqs) ? faqs : []),
  ];

  if (!allFaqs || allFaqs.length === 0) return null;

  return (
    <section className="w-full bg-stone-50 py-12 sm:py-16 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="eyebrow text-gold font-semibold tracking-widest text-xs">
            Frequently Asked Questions
          </span>
          <h2 className="heading-xl text-forest font-bold tracking-tight mt-1">
            Essential Travel Insights
          </h2>
          <p className="body-sm text-stone-600 mt-2">
            Everything you need to know about weather, pacing, family suitability, and private customizations.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {allFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-stone-200/80 shadow-xs"
            >
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-forest/10 text-forest flex items-center justify-center shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-gold" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="font-serif-display text-base sm:text-lg font-bold text-forest leading-snug">
                    {faq.question}
                  </h3>
                  <p className="body-sm text-stone-600 leading-relaxed font-normal">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
