'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';
import { useBreadcrumbs } from '@/context/BreadcrumbsContext';

/**
 * Common Luxury Breadcrumbs Component for Encamp Privé
 * Matches the royal forest green & gold aesthetic with chevron dividers.
 *
 * @param {Object} props
 * @param {Array<{ label: string, href?: string }>} [props.items] - Optional custom breadcrumb items
 * @param {React.ReactNode} [props.rightAction] - Optional action element to display on the right
 * @param {string} [props.className] - Additional wrapper class names
 */
export default function Breadcrumbs({ items, rightAction, className = '' }) {
  const pathname = usePathname();
  const context = useBreadcrumbs();
  const activeRightAction = rightAction || context?.rightAction;

  // If custom items are not provided, auto-generate from current URL path
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

  // Do not render breadcrumb if it only contains Home or is empty
  if (!breadcrumbItems || breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumbs"
      className={`w-full bg-[#081810]/95 border-b border-[#C99D40]/30 backdrop-blur-md shadow-sm transition-all z-40 overflow-hidden ${className}`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-8 py-0.5 sm:py-1 min-h-[28px] sm:min-h-[32px] flex items-center justify-between gap-3 overflow-hidden">
        <ol className="flex items-center gap-1 text-[10px] sm:text-[11px] min-w-0">
          {breadcrumbItems.map((item, index) => {
            const isLast = index === breadcrumbItems.length - 1;

            return (
              <li key={index} className="inline-flex items-center min-w-0 shrink-0">
                {/* Gold Chevron Right Divider */}
                {index > 0 && (
                  <ChevronRight
                    aria-hidden="true"
                    className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C99D40]/70 mx-0.5 sm:mx-1 shrink-0 stroke-[2]"
                  />
                )}

                {isLast || !item.href ? (
                  <span
                    aria-current="page"
                    className="font-poppins font-medium text-[#FFEAA8] tracking-[0.08em] uppercase truncate max-w-[160px] sm:max-w-xs md:max-w-md drop-shadow-sm leading-normal"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1 font-poppins text-stone-300 hover:text-[#FFEAA8] tracking-[0.06em] uppercase transition-colors leading-normal shrink-0"
                  >
                    {index === 0 && (
                      <Home className="w-3 h-3 text-[#C99D40] group-hover:text-[#FFEAA8] transition-colors shrink-0" />
                    )}
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ol>

        {/* Right Action Slot (e.g. Download Itinerary PDF Button) */}
        {activeRightAction && (
          <div className="shrink-0 flex items-center">
            {activeRightAction}
          </div>
        )}
      </div>
    </nav>
  );
}
