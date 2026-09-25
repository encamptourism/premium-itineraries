'use client';

import { useState, useRef, useEffect } from 'react';
import { Share2, Check, Copy, MessageCircle, Mail } from 'lucide-react';

export default function ShareItineraryButton({ itinerary, variant = 'default', className = '' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef(null);

  const itineraryTitle = itinerary?.title || 'Encamp Privé Luxury Expedition';
  const subtitle = itinerary?.subtitle || 'Curated private journey in Northeast India';

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const getShareUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return '';
  };

  const handleShareClick = async (e) => {
    e.stopPropagation();
    const url = getShareUrl();
    const shareData = {
      title: `${itineraryTitle} | Encamp Privé`,
      text: `${itineraryTitle} - ${subtitle}`,
      url: url,
    };

    if (typeof navigator !== 'undefined' && navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        return;
      } catch (err) {
        if (err.name === 'AbortError') return;
      }
    }

    setIsOpen((prev) => !prev);
  };

  const handleCopyLink = async (e) => {
    e.stopPropagation();
    const url = getShareUrl();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = url;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const whatsappMessage = encodeURIComponent(`${itineraryTitle} - ${subtitle}\n\n${getShareUrl()}`);
  const whatsappUrl = `https://api.whatsapp.com/send?text=${whatsappMessage}`;
  const mailtoUrl = `mailto:?subject=${encodeURIComponent(`${itineraryTitle} | Encamp Privé`)}&body=${encodeURIComponent(`Check out this bespoke luxury expedition:\n\n${itineraryTitle}\n${subtitle}\n\n${getShareUrl()}`)}`;

  if (variant === 'hero') {
    return (
      <div ref={containerRef} className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleShareClick}
          aria-label="Share Itinerary"
          title="Share Itinerary (WhatsApp, etc.)"
          className={`group inline-flex items-center justify-center gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded bg-[#0b2418] hover:bg-[#123927] text-[#dfa62f] hover:text-[#ffeaa8] border border-[#d4af37]/60 hover:border-[#ffeaa8]/80 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer leading-none ${className}`}
        >
          <Share2 className="w-3 h-3 text-[#dfa62f] group-hover:text-[#ffeaa8] shrink-0 transition-colors" />
          <span className="hidden sm:inline font-poppins text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] text-[#ffeaa8] leading-none whitespace-nowrap">
            Share
          </span>
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-1.5 z-50 min-w-[210px] bg-[#081810]/98 border border-[#C99D40]/60 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl animate-fadeIn">
            <div className="px-2.5 py-1 text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#C99D40] border-b border-[#C99D40]/20 mb-1">
              Share Itinerary
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#153f2c] transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#153f2c] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Copy className="w-3.5 h-3.5 text-[#dfa62f] shrink-0" />
                <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
              </div>
              {isCopied && <Check className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            <a
              href={mailtoUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#153f2c] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-stone-400 shrink-0" />
              <span>Email</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  if (variant === 'sticky') {
    return (
      <div ref={containerRef} className="relative inline-flex items-center">
        <button
          type="button"
          onClick={handleShareClick}
          aria-label="Share Itinerary"
          title="Share Itinerary"
          className={`p-2.5 rounded-xl bg-[#64161B] border border-[#dfa62f]/70 text-[#dfa62f] hover:bg-[#7d1c22] active:scale-95 transition-all flex items-center justify-center cursor-pointer ${className}`}
        >
          <Share2 className="w-4 h-4 text-[#dfa62f]" />
        </button>

        {isOpen && (
          <div className="absolute bottom-full left-0 mb-2 z-50 min-w-[210px] bg-[#3B080C]/98 border border-[#E0B85C]/60 rounded-2xl shadow-2xl p-2 backdrop-blur-xl animate-fadeIn">
            <div className="px-2.5 py-1 text-[10px] font-poppins font-semibold uppercase tracking-wider text-[#dfa62f] border-b border-[#dfa62f]/20 mb-1">
              Share Itinerary
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#541117] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={handleCopyLink}
              className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#541117] transition-colors cursor-pointer text-left"
            >
              <div className="flex items-center gap-2.5">
                <Copy className="w-4 h-4 text-[#dfa62f] shrink-0" />
                <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
              </div>
              {isCopied && <Check className="w-4 h-4 text-emerald-400" />}
            </button>

            <a
              href={mailtoUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#541117] transition-colors"
            >
              <Mail className="w-4 h-4 text-stone-400 shrink-0" />
              <span>Email</span>
            </a>
          </div>
        )}
      </div>
    );
  }

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handleShareClick}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0b2418] border border-[#d4af37]/70 text-[#f0c85a] hover:bg-[#123927] active:scale-95 transition-all cursor-pointer font-poppins text-xs font-bold uppercase tracking-wider ${className}`}
      >
        <Share2 className="w-4 h-4 text-[#f0c85a]" />
        <span>Share</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 z-50 min-w-[210px] bg-[#081810]/98 border border-[#C99D40]/60 rounded-xl shadow-2xl p-1.5 backdrop-blur-xl animate-fadeIn">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#153f2c] transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>WhatsApp</span>
          </a>
          <button
            type="button"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-poppins text-stone-200 hover:text-white hover:bg-[#153f2c] transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5">
              <Copy className="w-3.5 h-3.5 text-[#dfa62f] shrink-0" />
              <span>{isCopied ? 'Link Copied!' : 'Copy Link'}</span>
            </div>
            {isCopied && <Check className="w-3.5 h-3.5 text-emerald-400" />}
          </button>
        </div>
      )}
    </div>
  );
}
