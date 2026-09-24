import { NextResponse } from 'next/server';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';
import { getPremiumItinerary } from '@/lib/api';
import { sanitizeText, resolveHeroImage, resolveHindiLogo } from '@/utils/generateItineraryPdf';
import { mapItineraryExperiences } from '@/components/itinerary/luxuryExperiencesData';

export const dynamic = 'force-dynamic';
let cachedBrowser = null;

async function getBrowser() {
  if (cachedBrowser && cachedBrowser.connected) {
    return cachedBrowser;
  }
  try {
    cachedBrowser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-first-run',
        '--disable-extensions',
        '--font-render-hinting=none',
      ],
    });
    return cachedBrowser;
  } catch (err) {
    console.error('[PDF Route] Failed to launch Puppeteer:', err);
    throw err;
  }
}

async function getBase64Image(urlOrPath) {
  if (!urlOrPath || typeof urlOrPath !== 'string') return null;
  if (urlOrPath.startsWith('data:image')) return urlOrPath;

  try {
    if (urlOrPath.startsWith('/')) {
      const localPath = path.join(process.cwd(), 'public', urlOrPath);
      if (fs.existsSync(localPath)) {
        const fileBuffer = fs.readFileSync(localPath);
        const ext = path.extname(localPath).toLowerCase().replace('.', '');
        const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
        return `data:${mime};base64,${fileBuffer.toString('base64')}`;
      }
    }

    if (urlOrPath.startsWith('http://') || urlOrPath.startsWith('https://')) {
      const res = await fetch(urlOrPath, { cache: 'no-store' });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || 'image/jpeg';
        const arrayBuffer = await res.arrayBuffer();
        const base64 = Buffer.from(arrayBuffer).toString('base64');
        return `data:${contentType};base64,${base64}`;
      }
    }
  } catch (err) {
    console.warn('[PDF Route] Image Base64 conversion warning for:', urlOrPath, err.message);
  }
  return urlOrPath;
}

function getDayImage(day) {
  if (!day) return null;
  const resolve = (img) => {
    if (!img) return null;
    if (typeof img === 'string' && img.trim()) return img.trim();
    if (typeof img === 'object') {
      return img.url || img.src || img.image || img.imageUrl || img.photo || img.path || null;
    }
    return null;
  };

  if (Array.isArray(day.images) && day.images.length > 0) return resolve(day.images[0]);
  if (day.images) return resolve(day.images);
  if (day.image) return resolve(day.image);
  if (Array.isArray(day.photos) && day.photos.length > 0) return resolve(day.photos[0]);
  if (Array.isArray(day.gallery) && day.gallery.length > 0) return resolve(day.gallery[0]);
  if (Array.isArray(day.stay) && day.stay[0]?.image) return resolve(day.stay[0].image);
  return null;
}

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: 'Itinerary slug parameter is required' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const format = (searchParams.get('format') || 'pdf').toLowerCase();

    // Fetch 100% live itinerary data directly from backend API
    const itinerary = await getPremiumItinerary(slug);

    if (!itinerary) {
      return NextResponse.json({ error: 'Itinerary not found in API' }, { status: 404 });
    }

    const days = Number(itinerary.duration?.days || 7);
    const nights = Number(itinerary.duration?.nights || 6);
    const durationText = days && nights ? `${days} DAYS | ${nights} NIGHTS` : `${days} DAYS`;
    
    const heroImageRaw = resolveHeroImage(itinerary);
    const hindiLogoRaw = resolveHindiLogo(itinerary);
    const encampLogoRaw = '/images/logo.png';

    const [
      heroImageSrc,
      hindiLogoSrc,
      encampLogoSrc,
      calendarIconSrc,
      nightIconSrc,
      hillIconSrc,
      diamondIconSrc,
      luxuryFrameBurgundySrc,
      pillarsFrameSrc,
      footerImageSrc,
    ] = await Promise.all([
      getBase64Image(heroImageRaw),
      getBase64Image(hindiLogoRaw),
      getBase64Image(encampLogoRaw),
      getBase64Image('/images/calendar.png'),
      getBase64Image('/images/night.png'),
      getBase64Image('/images/hill.png'),
      getBase64Image('/images/diamond.png'),
      getBase64Image('/images/luxury_card_frame_burgundy.svg'),
      getBase64Image('/images/pillars_frame.svg'),
      getBase64Image('/images/itinerypdffooter.png'),
    ]);

    const dayWise = Array.isArray(itinerary.dayWiseItinerary) ? itinerary.dayWiseItinerary : [];
    const inclusions = Array.isArray(itinerary.inclusions) ? itinerary.inclusions.map(sanitizeText).filter(Boolean) : [];
    const exclusions = Array.isArray(itinerary.exclusions) ? itinerary.exclusions.map(sanitizeText).filter(Boolean) : [];

    const dayImagesMap = {};
    await Promise.all(
      dayWise.map(async (day, idx) => {
        const dayNum = day.dayNumber || idx + 1;
        const rawImg = getDayImage(day);
        if (rawImg) {
          dayImagesMap[dayNum] = await getBase64Image(rawImg);
        }
      })
    );

    const startingPrice =
      itinerary.packagePricing?.premiumPackagePrice ||
      itinerary.startingFrom?.[0]?.totalPricePerPerson ||
      itinerary.startingFrom?.[0]?.pricePerPerson ||
      0;

    const luxuryPrice =
      itinerary.packagePricing?.luxuryPackagePrice ||
      (startingPrice ? Math.round(startingPrice * 1.37) : 0);

    const totalActivities = dayWise.reduce(
      (acc, d) => acc + (Array.isArray(d?.activities) ? d.activities.length : 0),
      0
    );

    // Enrich luxury experiences with bespoke icons and curated descriptions directly from API data
    const rawExp = Array.isArray(itinerary.luxuryExperiences) ? itinerary.luxuryExperiences : [];
    itinerary.luxuryExperiences = mapItineraryExperiences(rawExp);

    // Read EJS template from single source of truth file: src/templates/itineraryPdf.ejs
    const ejsFilePath = path.join(process.cwd(), 'src', 'templates', 'itineraryPdf.ejs');
    const ejsTemplateStr = fs.readFileSync(ejsFilePath, 'utf8');

    // Render dynamic HTML from EJS template with live API data
    const html = ejs.render(ejsTemplateStr, {
      itinerary,
      heroImageSrc,
      hindiLogoSrc,
      encampLogoSrc,
      calendarIconSrc,
      nightIconSrc,
      hillIconSrc,
      diamondIconSrc,
      luxuryFrameBurgundySrc,
      pillarsFrameSrc,
      footerImageSrc,
      durationText,
      days,
      nights,
      startingPrice,
      luxuryPrice,
      totalActivities,
      inclusions,
      exclusions,
      dayWise,
      dayImagesMap,
      issueDate: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
    });

    // If HTML preview is requested, return rendered HTML
    if (format === 'html') {
      return new NextResponse(html, {
        status: 200,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    }

    // Otherwise, generate high-fidelity PDF with Puppeteer
    const cleanTitle = sanitizeText(itinerary.title || 'Itinerary');
    const filename = `${cleanTitle.replace(/[^a-zA-Z0-9]/g, '_')}_Encamp_Prive.pdf`;

    // Natural dimensions: 2170 x 324 (aspect ratio: 6.6975)
    // On A4 paper (210mm width), the full-width natural height without cropping is exactly 31.36mm
    const footerHeightMm = '31.36mm';

    // Footer template passed on EVERY page at the extreme bottom (zero crop, zero white space below)
    const footerTemplate = `
      <style>
        #footer {
          padding: 0 !important;
          margin: 0 !important;
          width: 100% !important;
          height: ${footerHeightMm} !important;
          position: relative !important;
        }
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          height: 100% !important;
          overflow: hidden !important;
          -webkit-print-color-adjust: exact !important;
        }
      </style>
      <div style="position: absolute; bottom: 0; left: 0; right: 0; width: 100%; margin: 0; padding: 0; line-height: 0; font-size: 0; overflow: hidden;">
        ${
          footerImageSrc
            ? `<img src="${footerImageSrc}" style="width: 100%; width: 210mm; height: auto; display: block; margin: 0; padding: 0; border: none; vertical-align: bottom;" />`
            : `<div style="width: 100%; padding: 4px 14mm; box-sizing: border-box; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #6B7280; font-family: 'Poppins', sans-serif; border-top: 1px solid #E5E7EB;">
                 <span>Encamp Privé • Carbon Neutral Expeditions • 66 kg CO₂ Offset per traveller</span>
                 <span>Concierge: concierge@encampprive.com</span>
               </div>`
        }
      </div>
    `;

    let page;
    try {
      const browser = await getBrowser();
      page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
      await page.setContent(html, { waitUntil: 'domcontentloaded' });

      // Ensure all custom web fonts (Poppins, Cormorant Garamond, etc.) are fully rendered
      try {
        await page.evaluateHandle('document.fonts.ready');
      } catch (fontErr) {
        console.warn('[PDF Route] Font loading wait warning:', fontErr);
      }

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate,
        margin: {
          top: '10mm',
          bottom: footerHeightMm,
          left: '0mm',
          right: '0mm',
        },
      });

      return new NextResponse(pdfBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${filename}"`,
          'Cache-Control': 'no-store, max-age=0',
        },
      });
    } finally {
      if (page) {
        await page.close().catch(() => {});
      }
    }
  } catch (err) {
    console.error('[PDF Route GET Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error rendering PDF template', stack: err.stack },
      { status: 500 }
    );
  }
}
