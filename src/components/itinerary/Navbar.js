import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#020d07]/98 backdrop-blur-md border-b border-[#082213]/60 shadow-xl shadow-black/40 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
          <div className="relative w-32 sm:w-36 h-9 sm:h-11 shrink-0 rounded-lg overflow-hidden">
            <Image
              src="/images/logo.jpeg"
              alt="Encamp Privé Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Quick Direct Actions */}
        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href="tel:+918794756611"
            className="hidden md:flex items-center gap-2 text-xs font-semibold tracking-wider text-stone-200 hover:text-[#dfa62f] transition-all py-1.5 px-3 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#dfa62f]" />
            <span className="tracking-widest text-[11px] font-medium">+91 87947 56611</span>
          </a>

          <a
            href="#pricing-section"
            className="inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-gradient-to-r from-[#dfa62f] via-[#f0c85a] to-[#dfa62f] text-[#020d07] text-xs font-bold tracking-widest uppercase hover:brightness-110 hover:shadow-[0_0_15px_rgba(223,166,47,0.35)] transition-all active:scale-95 border border-[#f0c85a]/40"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </header>
  );
}
