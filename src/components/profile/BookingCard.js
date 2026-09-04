'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Calendar, MapPin, Users, ArrowRight, CheckCircle, Clock, XCircle } from 'lucide-react';

const STATUS = {
  upcoming:  { label: 'Upcoming',  icon: Clock,        color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
  confirmed: { label: 'Confirmed', icon: CheckCircle,  color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' },
  completed: { label: 'Completed', icon: CheckCircle,  color: 'text-stone-600', bg: 'bg-stone-100 border-stone-200' },
  cancelled: { label: 'Cancelled', icon: XCircle,      color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' },
};

/**
 * BookingCard — displays a single itinerary booking in a clean white card with dark green headers & gold price.
 */
export default function BookingCard({ booking }) {
  const {
    name,
    destination,
    startDate,
    endDate,
    nights,
    guests,
    status,
    image,
    amountPaid,
    itinerarySlug,
  } = booking;

  const statusInfo = STATUS[status] || STATUS.upcoming;
  const StatusIcon = statusInfo.icon;

  const fmt = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  const daysUntil = status === 'upcoming'
    ? Math.ceil((new Date(startDate) - new Date()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <div className="group bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#dfa62f]/60 transition-all duration-300 flex flex-col sm:flex-row">
      {/* Image */}
      <div className="relative sm:w-48 lg:w-56 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, 224px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-[#062212] flex items-center justify-center">
            <MapPin className="w-8 h-8 text-[#dfa62f]" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent sm:bg-gradient-to-r" />

        {daysUntil !== null && daysUntil >= 0 && (
          <div className="absolute top-3 left-3 bg-[#dfa62f] text-[#020d07] text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {daysUntil === 0 ? 'Today!' : `${daysUntil}d away`}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-4">
        <div className="space-y-2.5">
          {/* Status + name */}
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#062212] leading-tight group-hover:text-[#dfa62f] transition-colors">
                {name}
              </h3>
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfa62f]" />
                {destination}
              </div>
            </div>
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${statusInfo.bg} ${statusInfo.color}`}>
              <StatusIcon className="w-3.5 h-3.5" />
              {statusInfo.label}
            </span>
          </div>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#dfa62f]" />
              {fmt(startDate)} – {fmt(endDate)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              {nights} nights
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-stone-400" />
              {guests} {guests === 1 ? 'guest' : 'guests'}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-100 flex-wrap gap-3">
          <div>
            <span className="text-[10px] uppercase font-semibold text-stone-400 tracking-wider">Amount Paid</span>
            <div className="font-poppins text-lg sm:text-xl font-bold text-[#062212]">
              ₹{amountPaid?.toLocaleString('en-IN')}
            </div>
          </div>
          <Link
            href={`/itinerary/${itinerarySlug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#062212] hover:text-[#dfa62f] transition-colors group/link"
          >
            View Itinerary
            <ArrowRight className="w-3.5 h-3.5 text-[#dfa62f] group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
