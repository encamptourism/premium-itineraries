'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { useBreadcrumbs } from '@/context/BreadcrumbsContext';

export default function Breadcrumbs({ items, rightAction, className = '' }) {
  const pathname = usePathname();
  const context = useBreadcrumbs();
  const activeRightAction = rightAction || context?.rightAction;

  let breadcrumbItems = items;

  if (!breadcrumbItems) {
    if (!pathname || pathname === '/' || pathname === '') {
      return null;
    }

    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return null;

    breadcrumbItems = [
      { label: 'Home', href: '/' }
    ];

    let currentHref = '';
    segments.forEach((seg, idx) => {
      currentHref += `/${seg}`;
      const isLast = idx === segments.length - 1;

      let label = decodeURIComponent(seg)
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      let href = isLast ? null : currentHref;

      if (seg.toLowerCase() === 'itinerary') {
        label = 'Itineraries';
        href = isLast ? null : '/';
      }

      breadcrumbItems.push({
        label,
        href,
      });
    });
  }

  if (!breadcrumbItems || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumbs"
      className={`w-full bg-[#081810]/95 border-b border-[#C99D40]/30 backdrop-blur-md shadow-sm transition-all z-40 overflow-hidden ${className}`}
    >
      <div className="w-full px-2.5 sm:px-6 lg:px-8 py-0.5 sm:py-1 min-h-[26px] sm:min-h-[32px] flex items-center justify-between gap-2 sm:gap-3 overflow-hidden">
        <ol className="flex items-center gap-0.5 sm:gap-1 text-[8px] min-[360px]:text-[8.5px] min-[400px]:text-[9px] sm:text-[11px] min-w-0">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li key={index} className="inline-flex items-center min-w-0 shrink-0">
                {index > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className="w-2 h-2 sm:w-3 sm:h-3 text-[#C99D40]/70 mx-0.5 sm:mx-1 shrink-0 stroke-[2]"
                  />
                )}

                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="font-poppins font-medium text-[#FFEAA8] tracking-[0.03em] sm:tracking-[0.08em] text-[8px] min-[360px]:text-[8.5px] min-[400px]:text-[9px] sm:text-[11px] uppercase truncate max-w-[105px] min-[360px]:max-w-[130px] min-[400px]:max-w-[160px] sm:max-w-xs md:max-w-md drop-shadow-sm leading-normal"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    className="group inline-flex items-center gap-0.5 sm:gap-1 font-poppins text-stone-300 hover:text-[#FFEAA8] tracking-[0.03em] sm:tracking-[0.06em] text-[8px] min-[360px]:text-[8.5px] min-[400px]:text-[9px] sm:text-[11px] uppercase transition-colors leading-normal shrink-0"
                  >
                    {index === 0 && (
                      <Home className="w-2.5 h-2.5 min-[360px]:w-3 min-[360px]:h-3 sm:w-3 sm:h-3 text-[#C99D40] group-hover:text-[#FFEAA8] transition-colors shrink-0" />
                    )}
                    <span className={index === 0 ? "hidden sm:inline" : ""}>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {activeRightAction && (
          <div className="shrink-0 flex items-center">
            {activeRightAction}
          </div>
        )}
      </div>
    </nav>
  );
}
