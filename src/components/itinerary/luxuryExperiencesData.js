/**
 * Luxury Experiences Data & Icon Mapping Configuration
 * 
 * Single source of truth for all Luxury Experiences (The Luxurious Edit).
 */

export const LUXURY_EXPERIENCES = [
  {
    title: "Private Tea Estate Experience",
    aliases: ["tea estate", "tea garden", "assam tea", "darjeeling tea", "tea tasting"],
    defaultDescription:
      "Walk through manicured heritage estates with a private tea sommelier, tasting world-renowned single-estate flushes amidst misty colonial bungalows.",
    iconKey: "tea-estate",
  },
  {
    title: "Dedicated Luxury SUV",
    aliases: ["luxury suv", "dedicated suv", "private suv", "private vehicle", "chauffeur vehicle", "4x4 expedition"],
    defaultDescription:
      "Traverse high-altitude passes and scenic valleys in an exclusive premium 4x4 SUV, chauffeured by experienced mountain road pilots.",
    iconKey: "luxury-suv",
  },
  {
    title: "Umiam Lake Escape",
    aliases: ["umiam lake", "lake escape", "barapani", "umiam waterscape", "lake retreat"],
    defaultDescription:
      "Unwind along serene pine-fringed shores, enjoying private catamaran cruising and tranquil lakefront champagne repasts.",
    iconKey: "umiam-lake",
  },
  {
    title: "Curated Dining",
    aliases: ["curated dining", "dining", "spoon and fork", "fork and spoon", "fine dining", "gourmet dining", "private dining", "chef tasting", "bespoke dining"],
    defaultDescription:
      "Savour multi-course chef-curated tastings celebrating organic farm-to-table indigenous delicacies and royal regional culinary traditions.",
    iconKey: "curated-dining",
  },
  {
    title: "Living Root Heritage",
    aliases: ["living root", "root bridge", "jingkieng jri", "cherrapunji root", "double decker root bridge"],
    defaultDescription:
      "Marvel at centuries-old botanical wonders guided by elder Khasi naturalists along protected, unhurried rainforest trails.",
    iconKey: "living-root",
  },
  {
    title: "Wellness & Leisure",
    aliases: ["wellness & leisure", "wellness and leisure", "wellness", "leisure", "wellness retreat", "mindful leisure"],
    defaultDescription:
      "Immerse in grounding botanical aromatherapies, mindful mountain walks, and unhurried stillness crafted for complete renewal.",
    iconKey: "wellness-leisure",
  },
  {
    title: "Private Scenic Stops",
    aliases: ["private scenic stops", "scenic stops", "scenic viewpoints", "panoramic stops", "viewpoints"],
    defaultDescription:
      "Pause at exclusive, uncrowded vantage points for panoramic gorge vistas, private artisanal picnics, and golden hour photography.",
    iconKey: "scenic-stops",
  },
  {
    title: "Sunrise on the Ganges",
    aliases: ["sunrise on the ganges", "ganges sunrise", "subah-e-banaras", "kashi sunrise", "morning ganges"],
    defaultDescription:
      "Begin your morning with the quiet majesty of Kashi awakening, witnessing morning chants and golden solar reflections across the sacred waters.",
    iconKey: "sunrise-ganges",
  },
  {
    title: "Curated Kashi Dining",
    aliases: ["curated kashi dining", "kashi dining", "banarasi dining", "banaras cuisine", "banarasi thali"],
    defaultDescription:
      "Discover authentic Banarasi flavours through royal thali banquets, heritage sweetmeats, and refined multi-generational secret recipes.",
    iconKey: "kashi-dining",
  },
  {
    title: "Private Transfers",
    aliases: ["private transfers", "private transfer", "transfers", "transfer", "car transfer", "car", "vip transfers", "airport transfers", "chauffeur transfer"],
    defaultDescription:
      "Travel effortlessly with comfortable, dedicated private transfers, luggage assistance, and VIP priority transit throughout your journey.",
    iconKey: "private-transfers",
  },
  {
    title: "Luxury Spa Ritual",
    aliases: ["luxury spa ritual", "spa ritual", "luxury spa", "ayurvedic spa", "healing ritual"],
    defaultDescription:
      "Indulge in therapeutic herbal poultices, artisanal warm oil elixirs, and bespoke head-to-toe revitalizing treatments.",
    iconKey: "luxury-spa",
  },
  {
    title: "Ganges from the Water",
    aliases: ["ganges from the water", "ganges boat", "bajra cruise", "river cruise", "kashi boat"],
    defaultDescription:
      "Glide peacefully on a private wooden royal bajra along the ghats, serenaded by soft live sitar and evening floating oil lamps.",
    iconKey: "ganges-water",
  },
];

export function normalizeTitle(str) {
  return str ? str.toLowerCase().replace(/[^\w\s]/g, "").replace(/\s+/g, " ").trim() : "";
}

export function findExperienceMeta(rawTitle) {
  if (!rawTitle) return null;
  const q = normalizeTitle(rawTitle);

  return (
    LUXURY_EXPERIENCES.find((item) => {
      const titleNorm = normalizeTitle(item.title);
      return (
        titleNorm === q ||
        item.iconKey === q ||
        q.includes(titleNorm) ||
        titleNorm.includes(q) ||
        item.aliases?.some((a) => {
          const aNorm = normalizeTitle(a);
          return aNorm === q || q.includes(aNorm) || aNorm.includes(q);
        })
      );
    }) || null
  );
}

export function getExperienceIconKey(title) {
  return findExperienceMeta(title)?.iconKey || "default-luxury";
}

export function mapItineraryExperiences(rawExperiences) {
  if (!Array.isArray(rawExperiences)) return [];

  return rawExperiences.map((exp, idx) => {
    const rawTitle = typeof exp === "string" ? exp : exp?.title || exp?.name || `Experience ${idx + 1}`;
    const meta = findExperienceMeta(rawTitle);

    return {
      ...(typeof exp === "object" ? exp : {}),
      id: exp?.id || exp?._id || meta?.iconKey || `exp-${idx}`,
      title: rawTitle,
      description: (typeof exp === "object" && exp?.description) || meta?.defaultDescription || "",
      iconKey: meta?.iconKey || "default-luxury",
    };
  });
}

export default LUXURY_EXPERIENCES;
