import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-forest-dark text-stone-300 pt-16 pb-24 md:pb-16 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="inline-block relative w-36 sm:w-44 h-10 sm:h-12 shrink-0 rounded-lg overflow-hidden">
              <Image
                src="/images/logo.png"
                alt="Encamp Privé Logo"
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Curated private journeys, luxury heritage retreats, and carbon-neutral expeditions across Northeast India and the Himalayas.
            </p>
            <div className="font-script text-2xl text-gold-light">
              Where Every Moment Becomes a Cherished Memory.
            </div>
          </div>

          {/* Contact Col */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white uppercase tracking-wider">
              Private Concierge
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" />
                <a href="tel:+919643182259" className="hover:text-white transition-colors">
                  +91 96431 82259
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" />
                <a href="mailto:info@encampadventures.com" className="hover:text-white transition-colors">
                  info@encampadventures.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                <span>Guwahati · Shillong · Kohima</span>
              </li>
            </ul>
          </div>

          {/* Luxury Expeditions */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white uppercase tracking-wider">
              Destinations
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <Link href="/itinerary/test-premium-luxury-expedition-3862" className="hover:text-gold transition-colors">
                  Meghalaya Grandeur (7D / 6N)
                </Link>
              </li>
              <li>
                <span className="text-stone-500">Arunachal High Monasteries (Coming Soon)</span>
              </li>
              <li>
                <span className="text-stone-500">Nagaland Tribal Conclave (Coming Soon)</span>
              </li>
              <li>
                <span className="text-stone-500">Kaziranga Private Safari (Coming Soon)</span>
              </li>
            </ul>
          </div>

          {/* Sustainability */}
          <div className="space-y-3">
            <h4 className="font-serif-display text-base font-bold text-white uppercase tracking-wider">
              Responsible Travel
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every Encamp Privé guest journey automatically funds indigenous reforestation and offsets upto 1000+ KgCo2e.
            </p>
            <div className="text-[11px] text-gold-light border border-gold/30 bg-forest/80 rounded-lg p-2.5">
              100% Certified Carbon-Neutral Travel
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-stone-500">
          <p>© {new Date().getFullYear()} Encamp Privé · All rights reserved.</p>
          <p>Designed with Mobile-First Luxury Craftsmanship.</p>
        </div>
      </div>
    </footer>
  );
}
