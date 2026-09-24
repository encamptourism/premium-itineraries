'use client';

import { useState } from 'react';
import { FileText, Download, Loader2, CheckCircle2 } from 'lucide-react';
import { generateItineraryPdf } from '@/utils/generateItineraryPdf';

/**
 * Premium Download PDF Button Component for Encamp Privé Itineraries
 *
 * @param {Object} props
 * @param {Object} props.itinerary - Itinerary data object
 * @param {'hero' | 'card' | 'sticky' | 'default'} [props.variant='default'] - Display variant
 * @param {string} [props.className] - Additional Tailwind classes
 */
export default function DownloadPdfButton({ itinerary, variant = 'default', className = '' }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  const handleDownload = async () => {
    if (isGenerating || !itinerary) return;

    setIsGenerating(true);
    try {
      // Small tick delay to allow UI to render spinner before main thread PDF compilation
      await new Promise((resolve) => setTimeout(resolve, 60));
      await generateItineraryPdf(itinerary);

      setIsDownloaded(true);
      setTimeout(() => setIsDownloaded(false), 3000);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // -------------------------------------------------------------
  // -------------------------------------------------------------
  // VARIANT 1: HERO (Breadcrumbs Header Bar Integration)
  // -------------------------------------------------------------
  if (variant === 'hero') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        title="Download Itinerary"
        className={`group inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded bg-gradient-to-r from-[#dfa62f] via-[#c99d40] to-[#b88520] hover:from-[#eab63e] hover:via-[#d6aa47] hover:to-[#c69229] text-black border border-[#ffeaa8]/60 shadow-2xs hover:shadow-xs transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-70 leading-none ${className}`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-3 h-3 text-black animate-spin shrink-0" />
            <span className="font-poppins text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] text-black leading-none">
              Please wait, PDF is downloading…
            </span>
          </>
        ) : isDownloaded ? (
          <>
            <CheckCircle2 className="w-3 h-3 text-emerald-950 shrink-0" />
            <span className="font-poppins text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] text-emerald-950 leading-none">
              Downloaded
            </span>
          </>
        ) : (
          <>
            <Download className="w-3 h-3 text-black group-hover:translate-y-0.5 transition-transform duration-200 shrink-0" />
            <span className="font-poppins text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.08em] text-black whitespace-nowrap leading-none">
              Download Itinerary
            </span>
          </>
        )}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 2: CARD (Sidebar Package Frame Integration)
  // -------------------------------------------------------------
  if (variant === 'card') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#3B080C] via-[#541117] to-[#3B080C] hover:from-[#4A0B10] hover:via-[#6B161E] hover:to-[#4A0B10] border border-[#E0B85C]/70 hover:border-[#FFEAA8] text-[#FFF9E6] font-poppins text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-lg transition-all duration-300 active:scale-[0.98] cursor-pointer disabled:opacity-70 ${className}`}
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 text-[#dfa62f] animate-spin" />
            <span>Please wait, PDF is downloading…</span>
          </>
        ) : isDownloaded ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-300">Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4 text-[#dfa62f]" />
            <span>Download Itinerary PDF</span>
          </>
        )}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 3: STICKY (Mobile Sticky Bottom Bar Integration)
  // -------------------------------------------------------------
  if (variant === 'sticky') {
    return (
      <button
        type="button"
        onClick={handleDownload}
        disabled={isGenerating}
        aria-label="Download Itinerary PDF"
        className={`p-2.5 rounded-xl bg-[#64161B] border border-[#dfa62f]/70 text-[#dfa62f] hover:bg-[#7d1c22] active:scale-95 transition-all flex items-center justify-center cursor-pointer disabled:opacity-60 ${className}`}
      >
        {isGenerating ? (
          <Loader2 className="w-4 h-4 text-[#dfa62f] animate-spin" />
        ) : isDownloaded ? (
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
        ) : (
          <FileText className="w-4 h-4 text-[#dfa62f]" />
        )}
      </button>
    );
  }

  // -------------------------------------------------------------
  // VARIANT 4: DEFAULT (General Purpose Premium Button)
  // -------------------------------------------------------------
  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={isGenerating}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#64161B] via-[#7d1c22] to-[#64161B] border-2 border-[#dfa62f]/70 text-[#fffdf5] font-poppins text-xs font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] cursor-pointer disabled:opacity-75 ${className}`}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-4 h-4 text-[#dfa62f] animate-spin" />
          <span>Please wait, PDF is downloading…</span>
        </>
      ) : isDownloaded ? (
        <>
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span className="text-emerald-300">Downloaded</span>
        </>
      ) : (
        <>
          <FileText className="w-4 h-4 text-[#dfa62f]" />
          <span>Download Itinerary (PDF)</span>
        </>
      )}
    </button>
  );
}
