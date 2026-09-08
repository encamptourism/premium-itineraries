"use client";

import Link from "next/link";
import Image from "next/image";

// Custom SVG Icons matching the reference design exactly

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a15.3 15.3 0 0 0 4 10 15.3 15.3 0 0 0-4 10 15.3 15.3 0 0 0-4-10 15.3 15.3 0 0 0 4-10z" />
      <path d="M2 12h20" />
    </svg>
  );
}

function PassportIcon() {
  return (
    <svg viewBox="0 0 32 40" className="w-8 h-10 text-[#f0c85a] shrink-0" fill="none" stroke="currentColor">
      <rect x="3" y="3" width="26" height="34" rx="3" strokeWidth="1.5" />
      <circle cx="16" cy="17" r="7" strokeWidth="1.2" />
      <path d="M 9 17 H 23" strokeWidth="1" opacity="0.8" />
      <path d="M 16 10 C 19 13 19 21 16 24 C 13 21 13 13 16 10 Z" strokeWidth="1" opacity="0.8" />
      <path d="M 18 28 L 26 22 L 24 30 L 27 33 L 23 32 L 20 35 L 20 32 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MountainIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <path d="M4.14 15.08 8 7.66l3 5.4" />
    </svg>
  );
}

function HutIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M3 10 L12 3 L21 10" />
      <path d="M5 10 V20 H19 V10" />
      <path d="M9 20 V14 H15 V20" />
      <path d="M2 10 H22" />
    </svg>
  );
}

function TribalPatternIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="4" y="4" width="16" height="16" />
      <path d="M12 4 L20 12 L12 20 L4 12 Z" />
      <path d="M12 8 L16 12 L12 16 L8 12 Z" />
    </svg>
  );
}

function SafariCompassIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3 V6 M12 18 V21 M3 12 H6 M18 12 H21" />
      <polygon points="12,7 14,12 12,17 10,12" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.4 19 2c1 2 2 4.1 2 9 0 5.5-4.5 9-10 9z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function ShieldCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-primary-green text-[#E2DDD3] relative overflow-hidden font-poppins pt-6 pb-3 border-t border-[#f0c85a]/30 selection:bg-[#f0c85a]/30 selection:text-white">

      {/* Background Topographic Watermark Lines (Top Left & Top Right) */}
      <div className="absolute top-0 left-0 w-80 h-80 opacity-10 pointer-events-none -translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 500 500" className="w-full h-full text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="100" cy="100" r="80" />
          <circle cx="100" cy="100" r="130" />
          <circle cx="100" cy="100" r="190" />
          <circle cx="100" cy="100" r="260" />
        </svg>
      </div>
      <div className="absolute top-0 right-0 w-80 h-80 opacity-10 pointer-events-none translate-x-1/4 -translate-y-1/4">
        <svg viewBox="0 0 500 500" className="w-full h-full text-[#f0c85a]" fill="none" stroke="currentColor" strokeWidth="1">
          <circle cx="400" cy="100" r="80" />
          <circle cx="400" cy="100" r="130" />
          <circle cx="400" cy="100" r="190" />
          <circle cx="400" cy="100" r="260" />
        </svg>
      </div>

      <div className="max-w-[1700px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main 4-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 divide-y md:divide-y-0 lg:divide-x divide-[#f0c85a]/20 pb-4">

          {/* COLUMN 1: Brand Info & Mountain Line Art */}
          <div className="space-y-3 lg:pr-6 flex flex-col justify-between pt-2 md:pt-0">
            <div className="space-y-3">
              {/* Brand Logo Box (Header Logo Image) */}
              <Link href="/" className="inline-block relative w-48 sm:w-56 h-14 sm:h-16 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Encamp Privé Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </Link>

              {/* Brand Description */}
              <p className="text-[11px] sm:text-xs text-[#C8D2C6] leading-relaxed max-w-xs">
                Curated private journeys, luxury heritage retreats, and carbon-neutral expeditions across Northeast India and the Himalayas.
              </p>

              {/* Accent Line */}
              <div className="w-10 h-[1px] bg-[#f0c85a]/50" />

              {/* Italic Callout Tagline */}
              <div className="font-serif-display italic text-[#f0c85a] text-base sm:text-lg leading-tight tracking-wide font-normal max-w-xs">
                From Where Every Moment Becomes a Cherished Memory. to The Future of Luxury Travel, Thoughtfully Designed with Puspose.
              </div>
            </div>

            {/* Mountain Artwork Image at bottom of Column 1 */}
            <div className="pt-2 mt-auto relative w-full h-24 sm:h-28 overflow-hidden">
              <Image
                src="/images/footerhill.png"
                alt="Footer Hill Artwork"
                fill
                className="object-contain object-bottom"
              />
            </div>
          </div>

          {/* COLUMN 2: Private Concierge */}
          <div className="space-y-5 lg:px-6 flex flex-col justify-between pt-4 md:pt-0">
            <div className="space-y-4">
              {/* Column Header */}
              <div>
                <h4 className="font-serif-display text-sm sm:text-base font-bold text-[#EAE6DF] uppercase tracking-[0.2em]">
                  PRIVATE CONCIERGE
                </h4>
                <div className="w-8 h-[1.5px] bg-[#f0c85a] mt-1.5" />
              </div>

              {/* Contact List */}
              <ul className="space-y-3.5 text-xs sm:text-[13px] text-[#C8D2C6]">
                <li className="flex items-center gap-3.5 group">
                  <div className="w-8 h-8 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <PhoneIcon />
                  </div>
                  <a href="tel:+919643182259" className="hover:text-[#f0c85a] transition-colors tracking-wide font-medium">
                    +91 96431 82259
                  </a>
                </li>

                <li className="flex items-center gap-3.5 group">
                  <div className="w-8 h-8 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <MailIcon />
                  </div>
                  <a href="mailto:info@encampadventures.com" className="hover:text-[#f0c85a] transition-colors tracking-wide font-medium">
                    info@encampadventures.com
                  </a>
                </li>

                <li className="flex items-center gap-3.5 group">
                  <div className="w-8 h-8 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <GlobeIcon />
                  </div>
                  <span className="tracking-wide text-[#C8D2C6]">
                    Worldwide · Bespoke · Exceptional
                  </span>
                </li>
              </ul>
            </div>

            {/* At Your Service Box */}
            <div className="border border-[#f0c85a]/40 rounded-xl p-3.5 sm:p-4 bg-transparent flex items-start gap-4 mt-6">
              <div className="relative w-14 sm:w-16 h-14 sm:h-16 shrink-0 mt-0.5">
                <Image
                  src="/images/footerpassport.png"
                  alt="Passport Icon"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="space-y-1">
                <h5 className="font-serif-display text-xs sm:text-[13px] font-bold text-[#f0c85a] uppercase tracking-[0.16em]">
                  AT YOUR SERVICE
                </h5>
                <p className="text-xs text-[#A8B6A4] leading-relaxed">
                  Our travel concierge is available 24/7 to craft extraordinary experiences just for you.
                </p>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Destinations */}
          <div className="space-y-4 lg:px-6 flex flex-col justify-between pt-4 md:pt-0">
            <div className="space-y-3">
              {/* Column Header */}
              <div>
                <h4 className="font-serif-display text-xs sm:text-sm font-bold text-[#EAE6DF] uppercase tracking-[0.18em]">
                  DESTINATIONS
                </h4>
                <div className="w-6 h-[1.5px] bg-[#f0c85a] mt-1" />
              </div>

              {/* Destination Items */}
              <ul className="space-y-2 text-[11px] sm:text-xs">
                <li className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <MountainIcon />
                  </div>
                  <Link href="/itinerary/meghalaya-private-luxury-tour" className="text-[#E2DDD3] hover:text-[#f0c85a] transition-colors font-medium">
                    Meghalaya Grandeur (7D / 6N)
                  </Link>
                </li>

                <li className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <HutIcon />
                  </div>
                  <div className="text-[#C8D2C6]">
                    <span>Arunachal High Monasteries</span>
                    <span className="text-[#8FA38D] text-[10px] font-normal block sm:inline sm:ml-1">(Coming Soon)</span>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <TribalPatternIcon />
                  </div>
                  <div className="text-[#C8D2C6]">
                    <span>Nagaland Tribal Conclave</span>
                    <span className="text-[#8FA38D] text-[10px] font-normal block sm:inline sm:ml-1">(Coming Soon)</span>
                  </div>
                </li>

                <li className="flex items-center gap-2.5 group">
                  <div className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 group-hover:border-[#f0c85a] group-hover:bg-[#f0c85a]/10 transition-all">
                    <SafariCompassIcon />
                  </div>
                  <div className="text-[#C8D2C6]">
                    <span>Kaziranga Private Safari</span>
                    <span className="text-[#8FA38D] text-[10px] font-normal block sm:inline sm:ml-1">(Coming Soon)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Explore All Journeys Button */}
            <div className="pt-2">
              <Link
                href="/#itineraries"
                className="border border-[#f0c85a]/60 rounded-md px-3 py-1.5 flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-[#f0c85a] uppercase tracking-[0.16em] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300 w-full max-w-[210px]"
              >
                <span>EXPLORE ALL JOURNEYS</span>
                <span className="text-sm leading-none ml-1">›</span>
              </Link>
            </div>
          </div>

          {/* COLUMN 4: Responsible Travel */}
          <div className="flex flex-col justify-between pt-4 md:pt-0">
            <div className="space-y-3 lg:pl-6 pr-2">
              {/* Column Header */}
              <div>
                <h4 className="font-serif-display text-xs sm:text-sm font-bold text-[#EAE6DF] uppercase tracking-[0.18em]">
                  RESPONSIBLE TRAVEL
                </h4>
                <div className="w-6 h-[1.5px] bg-[#f0c85a] mt-1" />
              </div>

              {/* Responsible Travel Text */}
              <p className="text-[11px] sm:text-xs text-[#C8D2C6] leading-relaxed">
                Every Encamp Privé guest journey automatically funds indigenous reforestation and offsets upto 1000+ KgCo2e.
              </p>

              {/* Carbon Neutral Certified Badge */}
              <div className="border border-[#f0c85a]/40 rounded-lg p-2.5 bg-transparent flex items-center gap-3 max-w-[250px]">
                <div className="w-7 h-7 rounded-full border border-[#f0c85a]/60 flex items-center justify-center shrink-0 bg-transparent">
                  <LeafIcon />
                </div>
                <div className="space-y-0.5">
                  <div className="text-[9px] font-bold text-[#f0c85a] uppercase tracking-[0.14em]">
                    100% CERTIFIED
                  </div>
                  <div className="text-[10.5px] font-extrabold text-[#f0c85a] uppercase tracking-[0.1em]">
                    CARBON-NEUTRAL TRAVEL
                  </div>
                </div>
              </div>
            </div>

            {/* Pine Forest Backdrop Graphic with Flying Birds Image - Full Width & All-Sides Gradient */}
            <div className="relative w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] lg:w-[calc(100%+2rem)] -mr-4 sm:-mr-6 lg:-mr-8 h-28 sm:h-36 md:h-40 overflow-hidden mt-3 rounded-b-xl lg:rounded-br-2xl">
              <Image
                src="/images/footerscene.png"
                alt="Footer Scene Backdrop"
                fill
                className="object-cover object-bottom"
              />
              {/* All-Sides Vignette Dark Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary-green via-transparent to-primary-green/70 z-10 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-green via-transparent to-primary-green z-10 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* BOTTOM FRAME BAR */}
        <div className="border border-[#f0c85a]/40 rounded-xl p-2.5 sm:p-3 bg-transparent">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x divide-[#f0c85a]/30 items-center">

            {/* Segment 1: Privacy Notice */}
            <div className="flex items-center gap-2.5 lg:pr-4">
              <div className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center shrink-0 bg-transparent">
                <ShieldCheckIcon />
              </div>
              <p className="text-[10px] sm:text-[11px] text-[#C8D2C6] leading-snug">
                Your privacy is important to us.
                <br />
                Read our{" "}
                <Link href="/privacy-policy" className="text-[#f0c85a] font-semibold underline hover:text-[#F5D77F] transition-colors">
                  Privacy Policy
                </Link>{" "}
                to learn how we protect your data.
              </p>
            </div>

            {/* Segment 2: Center Emblem Badge (Header Logo Image) */}
            <div className="flex flex-col items-center justify-center lg:px-4">
              <Link href="/" className="relative w-44 sm:w-52 h-12 sm:h-14 shrink-0">
                <Image
                  src="/images/logo.png"
                  alt="Encamp Privé Logo"
                  fill
                  className="object-contain object-center"
                />
              </Link>
            </div>

            {/* Segment 3: Copyright & Mission Statement */}
            <div className="space-y-0.5 text-center lg:text-left lg:px-4">
              <p className="text-[10px] sm:text-[11px] text-[#C8D2C6] font-medium tracking-wide">
                © 2026 Encamp Privé. All rights reserved.
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#C8D2C6]/80 font-serif-display italic tracking-wide">
                Curated with passion. Delivered with purpose.
              </p>
            </div>

            {/* Segment 4: Follow Our Journey & Social Links */}
            <div className="flex flex-col items-center justify-center lg:px-4 space-y-1.5">
              <h5 className="font-serif-display text-[10px] sm:text-[11px] font-bold text-[#f0c85a] tracking-[0.16em] uppercase">
                FOLLOW OUR JOURNEY
              </h5>

              <div className="flex items-center gap-3.5 sm:gap-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/encampadventures/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>

                {/* Facebook */}
                <a
                  href="https://www.facebook.com/encampadventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </a>

                {/* YouTube */}
                <a
                  href="https://www.youtube.com/@encampadventures"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/encampadventures/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://api.whatsapp.com/send?phone=919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-7 h-7 rounded-full border border-[#f0c85a]/50 flex items-center justify-center text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
}
