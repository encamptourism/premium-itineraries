import Link from "next/link";
import Image from "next/image";
import { Compass, Sparkles, ArrowRight, ShieldCheck, MapPin, Calendar } from "lucide-react";
import { getAllPremiumItineraries } from "@/lib/api";

export default async function Home() {
  const apiResponse = await getAllPremiumItineraries();

  // Safely extract itineraries array from API response structure
  let itineraries = [];
  if (Array.isArray(apiResponse)) {
    itineraries = apiResponse;
  } else if (apiResponse && Array.isArray(apiResponse.data)) {
    itineraries = apiResponse.data;
  } else if (apiResponse && Array.isArray(apiResponse.itineraries)) {
    itineraries = apiResponse.itineraries;
  }

  // Fallback if API returned empty array or offline
  const fallbackItinerary = {
    _id: "test-premium-luxury-expedition-3862",
    slug: "test-premium-luxury-expedition-3862",
    title: "Meghalaya Grandeur",
    subtitle: "Tea estates, double-decker living root bridges, crystal-clear river canyons, and private heritage stays.",
    duration: { days: 7, nights: 6 },
    startingFrom: [{ pricePerPerson: 150000 }],
    gallery: [{ url: "https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg", tag: "banner" }],
    badge: "Featured Journey"
  };

  const displayList = itineraries.length > 0 ? itineraries : [fallbackItinerary];

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      {/* Hero Showcase */}
      <section className="relative w-full min-h-[55vh] lg:min-h-[60vh] bg-forest-dark flex items-center justify-center overflow-hidden">
        <Image
          src="https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg"
          alt="Encamp Privé Expeditions"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/40" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-5 py-12 sm:py-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-light text-xs font-semibold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            Bespoke Luxury Travel
          </div>

          <div className="space-y-2">
            <span className="font-script text-4xl sm:text-5xl md:text-6xl text-gold-light block">
              Explore the Best of
            </span>
            <h1 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-wider text-white">
              Encamp Privé
            </h1>
          </div>

          <p className="font-sans text-base sm:text-lg md:text-xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed">
            Curated private journeys, luxury heritage retreats, and carbon-neutral expeditions across Northeast India.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`/itinerary/${displayList[0]?.slug || 'test-premium-luxury-expedition-3862'}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gold text-forest-dark font-bold text-sm uppercase tracking-wider hover:bg-gold-light shadow-xl transition-all active:scale-95"
            >
              <span>Explore {displayList[0]?.title || "Meghalaya Grandeur"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Expeditions Grid */}
      <section id="itineraries" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="eyebrow text-gold font-semibold tracking-widest text-xs">
            Signature Portfolios
          </span>
          <h2 className="heading-xl text-forest font-bold tracking-tight mt-1">
            Featured Private Expeditions
          </h2>
          <p className="body-sm text-stone-600 mt-2">
            Immersive, mobile-native itineraries designed for discerning travelers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayList.map((item, index) => {
            const slug = item.slug || item._id;
            const title = item.title || item.name || "Luxury Expedition";
            const subtitle = item.subtitle || item.description || item.overview || "";
            
            // Image extraction
            const bgImage = item.bannerImage ||
              item.heroImage ||
              item.image ||
              (Array.isArray(item.gallery) ? (item.gallery.find(g => g.tag === 'banner')?.url || item.gallery[0]?.url) : null) ||
              "https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg";

            // Duration
            const days = item.duration?.days || item.days;
            const nights = item.duration?.nights || item.nights;
            const durationText = days && nights ? `${days} Days · ${nights} Nights` : days ? `${days} Days` : "Custom Journey";

            // Price
            const price = item.startingFrom?.[0]?.pricePerPerson || item.startingFrom?.pricePerPerson || item.price || item.startingPrice;
            const formattedPrice = price ? `₹${Number(price).toLocaleString('en-IN')}` : null;

            return (
              <Link
                key={item._id || slug || index}
                href={`/itinerary/${slug}`}
                className="group relative bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={bgImage}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-forest text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-gold/30">
                      {item.badge || item.tag || (index === 0 ? "Featured Journey" : "Premium Journey")}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 text-xs text-stone-200 mb-1">
                      <Calendar className="w-3.5 h-3.5 text-gold" />
                      <span>{durationText}</span>
                    </div>
                    <h3 className="font-serif-display text-2xl font-bold uppercase tracking-wide">
                      {title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                    {subtitle}
                  </p>

                  <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-stone-500">Starting From</span>
                      <div className="font-poppins text-lg font-bold text-forest">
                        {formattedPrice ? (
                          <>{formattedPrice} <span className="text-xs font-poppins text-stone-500">1-2 guest</span></>
                        ) : (
                          <span className="text-xs font-semibold text-stone-700">Contact for Pricing</span>
                        )}
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-forest/5 text-forest group-hover:bg-forest group-hover:text-gold flex items-center justify-center transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
