import { notFound } from "next/navigation";
import { getPremiumItinerary, getItineraryApiUrl } from "@/lib/api";
import ReferencePosterHeader from "@/components/itinerary/ReferencePosterHeader";
import ReferencePosterBody from "@/components/itinerary/ReferencePosterBody";
import ReferencePosterFaqFooter from "@/components/itinerary/ReferencePosterFaqFooter";
import MobileStickyCTA from "@/components/itinerary/MobileStickyCTA";
// import DebugPreview from "@/components/itinerary/DebugPreview";

/**
 * Generate dynamic SEO metadata directly from the live API response
 */
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const itinerary = await getPremiumItinerary(slug);

  if (!itinerary) {
    return {
      title: "Itinerary Not Found | Encamp Privé",
      description: "The requested luxury expedition could not be found.",
    };
  }

  const days = itinerary.duration?.days || "";
  const nights = itinerary.duration?.nights || "";
  const durationText = days && nights ? ` (${days}D/${nights}N)` : "";

  const title = `${itinerary.title || "Meghalaya Expedition"}${durationText} | Encamp Adventures`;
  const description =
    itinerary.subtitle ||
    `Curated private journey through ${itinerary.state || "Meghalaya"} with 3-Star and 4-Star+ luxury stays, private vehicle, and bespoke experiences.`;
  const bannerImage =
    itinerary.gallery?.find((g) => g.tag === "banner")?.url ||
    itinerary.gallery?.[0]?.url ||
    "";

  return {
    title,
    description,
    keywords: itinerary.seo?.metaKeywords?.length
      ? itinerary.seo.metaKeywords
      : ["Meghalaya Tour", "Encamp Adventures", "Living Root Bridges", "Dawki River", "Cherrapunji Waterfalls"],
    openGraph: {
      title,
      description,
      type: "website",
      images: bannerImage
        ? [
            {
              url: bannerImage,
              width: 1200,
              height: 630,
              alt: itinerary.title || "Encamp Itinerary",
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: bannerImage ? [bannerImage] : [],
    },
    alternates: {
      canonical: `/itinerary/${slug}`,
    },
  };
}

/**
 * Dynamic Server Component for the Itinerary
 * Renders the reference poster layout with 100% live API data.
 */
export default async function ItineraryPage({ params }) {
  const { slug } = await params;
  const itinerary = await getPremiumItinerary(slug);
  const apiUrl = getItineraryApiUrl(slug);

  if (!itinerary) {
    notFound();
  }

  // Structured JSON-LD Schema for Google TouristTrip Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: itinerary.title || "Encamp Expedition",
    description: itinerary.subtitle || "",
    touristType: ["Adventure", "Culture", "Nature"],
    offers: itinerary.startingFrom?.[0]?.pricePerPerson
      ? {
          "@type": "Offer",
          price: itinerary.startingFrom[0].pricePerPerson,
          priceCurrency: "INR",
          availability: "https://schema.org/InStock",
        }
      : undefined,
    itinerary: Array.isArray(itinerary.dayWiseItinerary) && itinerary.dayWiseItinerary.length
      ? {
          "@type": "ItemList",
          numberOfItems: itinerary.dayWiseItinerary.length,
          itemListElement: itinerary.dayWiseItinerary.map((day, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            name: `Day ${day.dayNumber || idx + 1}: ${day.title || ""}`,
            description: day.description || day.activities?.[0]?.greenText || "",
          })),
        }
      : undefined,
  };

  return (
    <>
      {/* Search Engine Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="min-h-screen bg-[#fbf9f4] text-black flex flex-col selection:bg-gold/20 selection:text-forest">
        {/* 1. Header with Logo, Hero Title, API Hero Image, Packages & 5-Pillars Bar */}
        <ReferencePosterHeader itinerary={itinerary} />

        {/* 2. Main 3-Column Poster Layout (Days, Overview/Route/Video, Inclusions/Exclusions) */}
        <ReferencePosterBody itinerary={itinerary} />

        {/* 3. 5-Column FAQ Section & Dark Contact Footer */}
        <ReferencePosterFaqFooter itinerary={itinerary} />

        {/* 4. Mobile Sticky CTA Bottom Bar */}
        <MobileStickyCTA itinerary={itinerary} />

        {/* 5. Isolated Debug Preview Component (Disabled for production) */}
        {/* <DebugPreview itinerary={itinerary} apiUrl={apiUrl} /> */}
      </main>
    </>
  );
}
