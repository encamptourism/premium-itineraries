import Image from "next/image";
import {
  Compass,
  Sparkles,
  Home,
  UserCheck,
  Headset,
  Leaf,
  BedDouble,
  Utensils,
  Car,
  Camera,
  Check,
  Flame,
} from "lucide-react";

export default function ReferencePosterHeader({ itinerary, onOpenEnquiry }) {
  const bannerImage =
    itinerary?.gallery?.find((g) => g.tag === "banner")?.url ||
    itinerary?.gallery?.[0]?.url ||
    "https://encamp-s3b.s3.ap-south-1.amazonaws.com/1787245472531_Encamp%20terra%20meghalaya.png.jpg";

  const days = itinerary?.duration?.days || 7;
  const nights = itinerary?.duration?.nights || 6;
  const durationText = `${days} DAYS | ${nights} NIGHTS`;

  const startingPrice = itinerary?.packagePricing?.premiumPackagePrice || itinerary?.startingFrom?.[0]?.totalPricePerPerson || itinerary?.startingFrom?.[0]?.pricePerPerson || 42999;
  const luxuryPrice = itinerary?.packagePricing?.luxuryPackagePrice || Math.round(startingPrice * 1.37);

  const formattedStartingPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(startingPrice);

  const formattedLuxuryPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(luxuryPrice);

  return (
    <div className="w-full bg-[#fbf9f4] font-poppins pb-2 sm:pb-8 lg:pb-10">

      {/* 100% Full Screen Width Hero Section */}
      <section className="relative w-full bg-[#062314] overflow-visible pt-3 sm:pt-6 pb-8 sm:pb-14 h-[60vh] min-h-[480px] lg:min-h-[560px] lg:h-[65vh] flex flex-col justify-between shadow-none sm:shadow-2xl">

        {/* Full Viewport Screen Width API Hero Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <Image
            src={bannerImage}
            alt={itinerary?.title || "Encamp Expedition Hero"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center transform scale-102 transition-transform duration-1000"
          />
          {/* Rich Scrim Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/30 to-black/80" />
          <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
        </div>

        {/* Top Left: Encamp Tag Logo anchored directly to Hero Section */}
        <div className="absolute left-3 sm:left-6 lg:left-8 top-3 sm:top-5 z-30 w-36 sm:w-48 lg:w-56 h-12 sm:h-16 lg:h-20 shrink-0 rounded-xl overflow-hidden">
          <Image
            src="/images/tag_logo.png"
            alt="Encamp Privé Logo"
            fill
            className="object-contain object-left-top"
            priority
          />
        </div>

        {/* Content Container with percentage width */}
        <div className="relative z-10 w-[96%] sm:w-[94%] lg:w-[94%] xl:w-[95%] max-w-[1920px] mx-auto px-2 sm:px-4 lg:px-6 flex-1 flex flex-col justify-center my-auto h-full">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-center justify-between w-full my-auto h-full">

            {/* Left & Center: Crest Logo & Title Banner */}
            <div className="lg:col-span-9 relative flex flex-col justify-center items-center h-full space-y-2 sm:space-y-4 my-auto">

              {/* Top Center: Editorial Title Section (Visually Balanced Vertical & Horizontal Center) */}
              <div className="w-full max-w-xs sm:max-w-2xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto flex flex-col items-center justify-center text-center px-2 sm:px-4 lg:pl-32 xl:pl-40 lg:pr-8 text-white my-auto lg:mt-8 z-10">
                <span className="font-script text-base sm:text-lg md:text-xl lg:text-2xl text-[#f0c85a] drop-shadow-md leading-tight">
                  {itinerary?.subtitle}
                </span>

                <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-[0.06em] text-white drop-shadow-lg leading-tight my-1">
                  {itinerary?.title || "MEGHALAYA"}
                </h1>

                {/* Double-Pointed Gold Ribbon Banner with Attached Gold Accent Lines (Exact Match to Reference Image) */}
                <div className="flex items-center justify-center gap-0 my-1.5 sm:my-2 w-full">
                  {/* Left Attached Gold Accent Line */}
                  <span className="h-[1.5px] w-6 sm:w-14 md:w-20 lg:w-24 bg-[#d4a853] opacity-85" />

                  {/* Double-Pointed Gold Ribbon Banner */}
                  <div className="relative px-3 sm:px-7 py-0.5 sm:py-1 bg-gradient-to-r from-[#c68e22] via-[#e5aa2d] to-[#c68e22] text-[#fffdf5] font-serif text-[9px] sm:text-xs md:text-sm font-bold uppercase tracking-[0.18em] shadow-md [clip-path:polygon(9px_0,calc(100%-9px)_0,100%_50%,calc(100%-9px)_100%,9px_100%,0_50%)] flex items-center justify-center shrink-0">
                    {durationText}
                  </div>

                  {/* Right Attached Gold Accent Line */}
                  <span className="h-[1.5px] w-6 sm:w-14 md:w-20 lg:w-24 bg-[#d4a853] opacity-85" />
                </div>
              </div>

            </div>

            {/* Desktop-only Right 3 Columns: "OUR PACKAGES" Card POPPING OUT from Bottom */}
            <div className="hidden lg:flex lg:col-span-3 w-full max-w-[290px] sm:max-w-[300px] mx-auto lg:ml-auto bg-[#062314] text-white rounded-2xl p-3 sm:p-4 flex-col justify-between border-2 border-[#f0c85a] transform translate-y-6 sm:translate-y-12 lg:translate-y-24 lg:translate-x-6 z-30">

              {/* Packages Title */}
              <div className="text-center pb-3 border-b border-white/20">
                <h2 className="font-serif-display text-base sm:text-lg font-bold uppercase tracking-[0.2em] text-white">
                  Our Packages
                </h2>
              </div>

              {/* Package Blocks Spaced Between */}
              <div className="py-3 flex-1 flex flex-col justify-between space-y-4">

                {/* 1. Premium Package */}
                <div className="space-y-2 pb-3 border-b border-white/20">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                    Premium Package
                  </div>

                  {/* 4 Mini Gold Icons */}
                  <div className="grid grid-cols-4 gap-1 text-center text-[9px] text-stone-300 pt-1">
                    <div className="flex flex-col items-center">
                      <BedDouble className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>4★ Hotels</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Utensils className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>Breakfast</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Car className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>Private Cab</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Camera className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>All Sightseeing</span>
                    </div>
                  </div>

                  <div className="text-center pt-1.5">
                    <div className="font-poppins text-2xl font-black text-white leading-none">
                      {formattedStartingPrice}/-
                    </div>
                    <div className="font-poppins text-[9px] sm:text-[10px] text-stone-300 font-medium">1-2 guest</div>
                  </div>

                  <button
                    onClick={onOpenEnquiry}
                    className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg shadow-md transition-all cursor-pointer mt-1"
                  >
                    Book Now
                  </button>
                </div>

                {/* 2. Luxury Package */}
                <div className="space-y-2 pb-3 border-b border-white/20">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                    Luxury Package
                  </div>

                  {/* 4 Mini Gold Icons */}
                  <div className="grid grid-cols-4 gap-1 text-center text-[9px] text-stone-300 pt-1">
                    <div className="flex flex-col items-center">
                      <BedDouble className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>5★ Hotels</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Utensils className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>All Meals</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Car className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>Private Cab</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Camera className="w-4 h-4 text-[#f0c85a] mb-1" />
                      <span>All Sightseeing</span>
                    </div>
                  </div>

                  <div className="text-center pt-1.5">
                    <div className="font-poppins text-2xl font-black text-white leading-none">
                      {formattedLuxuryPrice}/-
                    </div>
                    <div className="font-poppins text-[9px] sm:text-[10px] text-stone-300 font-medium">1-2 guest</div>
                  </div>

                  <button
                    onClick={onOpenEnquiry}
                    className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg shadow-md transition-all cursor-pointer mt-1"
                  >
                    Book Now
                  </button>
                </div>

                {/* 3. Custom Package */}
                <div className="space-y-2">
                  <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                    Custom Package
                  </div>

                  <ul className="space-y-1.5 text-[11px] text-stone-200">
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                      <span>Tailor Made Itinerary</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                      <span>Personalized Experiences</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                      <span>Flexible Plans</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                      <span>24x7 Support</span>
                    </li>
                  </ul>

                  <button
                    onClick={onOpenEnquiry}
                    className="w-full border-2 border-[#f0c85a] text-[#f0c85a] hover:bg-[#f0c85a] hover:text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer mt-2"
                  >
                    Enquire Now
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* 5-Pillars Horizontal Strip EXACTLY ANCHORED AT BOTTOM EDGE (50% INSIDE / 50% OUTSIDE) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-4 xl:left-8 lg:translate-x-0 transform translate-y-1/2 max-w-xl lg:max-w-2xl w-[94%] sm:w-auto bg-white text-[#062314] rounded-full py-1.5 sm:py-2.5 px-3 sm:px-6 border border-[#f0c85a]/40 shadow-xl z-30">
          <div className="grid grid-cols-5 gap-0.5 sm:gap-1 divide-x divide-stone-200">

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Compass className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-[#062314] leading-tight">
                Handpicked Experiences
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Home className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-[#062314] leading-tight">
                Exclusive Stays
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <UserCheck className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-[#062314] leading-tight">
                Local Experts
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Headset className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-[#062314] leading-tight">
                24x7 Support
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center px-1 sm:px-2 py-0.5">
              <Leaf className="w-3.5 h-3.5 sm:w-6 sm:h-6 text-[#f0c85a] mb-0.5 stroke-[1.5]" />
              <span className="text-[6.5px] sm:text-[9px] font-bold uppercase tracking-tighter sm:tracking-wider text-[#062314] leading-tight">
                Sustainable Travel
              </span>
            </div>

          </div>
        </div>

      </section>

      {/* Mobile-only "OUR PACKAGES" Card rendered below 80vh hero section */}
      <div className="block lg:hidden pt-10 sm:pt-14 px-2 sm:px-4 w-full max-w-2xl mx-auto">
        <div className="bg-[#062314] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#f0c85a] shadow-none sm:shadow-xl w-full">
          {/* Packages Title */}
          <div className="text-center pb-3 border-b border-white/20">
            <h2 className="font-serif-display text-base sm:text-lg font-bold uppercase tracking-[0.2em] text-white">
              Our Packages
            </h2>
          </div>

          {/* Package Blocks Spaced Between */}
          <div className="py-3 space-y-4">

            {/* 1. Premium Package */}
            <div className="space-y-2 pb-3 border-b border-white/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                Premium Package
              </div>

              {/* 4 Mini Gold Icons */}
              <div className="grid grid-cols-4 gap-1 text-center text-[9px] text-stone-300 pt-1">
                <div className="flex flex-col items-center">
                  <BedDouble className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>4★ Hotels</span>
                </div>
                <div className="flex flex-col items-center">
                  <Utensils className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>Breakfast</span>
                </div>
                <div className="flex flex-col items-center">
                  <Car className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>Private Cab</span>
                </div>
                <div className="flex flex-col items-center">
                  <Camera className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>All Sightseeing</span>
                </div>
              </div>

              <div className="text-center pt-1.5">
                <div className="font-poppins text-2xl font-black text-white leading-none">
                  {formattedStartingPrice}/-
                </div>
                <div className="font-poppins text-[9px] sm:text-[10px] text-stone-300 font-medium">1-2 guest</div>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg shadow-md transition-all cursor-pointer mt-1"
              >
                Book Now
              </button>
            </div>

            {/* 2. Luxury Package */}
            <div className="space-y-2 pb-3 border-b border-white/20">
              <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                Luxury Package
              </div>

              {/* 4 Mini Gold Icons */}
              <div className="grid grid-cols-4 gap-1 text-center text-[9px] text-stone-300 pt-1">
                <div className="flex flex-col items-center">
                  <BedDouble className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>5★ Hotels</span>
                </div>
                <div className="flex flex-col items-center">
                  <Utensils className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>All Meals</span>
                </div>
                <div className="flex flex-col items-center">
                  <Car className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>Private Cab</span>
                </div>
                <div className="flex flex-col items-center">
                  <Camera className="w-4 h-4 text-[#f0c85a] mb-1" />
                  <span>All Sightseeing</span>
                </div>
              </div>

              <div className="text-center pt-1.5">
                <div className="font-poppins text-2xl font-black text-white leading-none">
                  {formattedLuxuryPrice}/-
                </div>
                <div className="font-poppins text-[9px] sm:text-[10px] text-stone-300 font-medium">1-2 guest</div>
              </div>

              <button
                onClick={onOpenEnquiry}
                className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg shadow-md transition-all cursor-pointer mt-1"
              >
                Book Now
              </button>
            </div>

            {/* 3. Custom Package */}
            <div className="space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-[#f0c85a] text-center">
                Custom Package
              </div>

              <ul className="space-y-1.5 text-[11px] text-stone-200">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                  <span>Tailor Made Itinerary</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                  <span>Personalized Experiences</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                  <span>Flexible Plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#f0c85a] shrink-0" />
                  <span>24x7 Support</span>
                </li>
              </ul>

              <button
                onClick={onOpenEnquiry}
                className="w-full border-2 border-[#f0c85a] text-[#f0c85a] hover:bg-[#f0c85a] hover:text-[#062314] font-black text-xs uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer mt-2"
              >
                Enquire Now
              </button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
