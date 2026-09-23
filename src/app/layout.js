import { Alex_Brush, Cormorant_Garamond, Plus_Jakarta_Sans, Poppins, Luxurious_Roman } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "@/components/itinerary/Navbar";
import Footer from "@/components/common/Footer";
import AuthProvider from "@/context/AuthProvider";
import { CarbonTraceProvider } from "@/context/CarbonTraceContext";
import ProfileCompletionModal from "@/components/common/ProfileCompletionModal";
import { getAllPremiumItineraries } from "@/lib/api";
import "./globals.css";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-script",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-display-serif",
  display: "swap",
});

const luxuriousRoman = Luxurious_Roman({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-luxurious-roman",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "Encamp Privé | Bespoke Luxury Expeditions",
  description: "Curated private journeys and bespoke luxury travel experiences.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// Auth pages render without the main Navbar/Footer
const AUTH_PATHS = ["/login", "/register", "/verify-otp", "/forgot-password"];

export default async function RootLayout({ children }) {
  // x-pathname is set by middleware on every request
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") || "";
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Fetch all itineraries for footer destinations
  let allItineraries = [];
  try {
    const apiResponse = await getAllPremiumItineraries();
    if (Array.isArray(apiResponse)) allItineraries = apiResponse;
    else if (apiResponse?.data && Array.isArray(apiResponse.data)) allItineraries = apiResponse.data;
    else if (apiResponse?.itineraries && Array.isArray(apiResponse.itineraries)) allItineraries = apiResponse.itineraries;
  } catch (e) { /* silently fail */ }

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alexBrush.variable} ${cormorantGaramond.variable} ${luxuriousRoman.variable} ${plusJakartaSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-black"
      >
        <AuthProvider>
          <CarbonTraceProvider>
            {!isAuthPage && <Navbar />}
            <ProfileCompletionModal />
            <main className="flex-1 min-h-screen">{children}</main>
            {!isAuthPage && <Footer itineraries={allItineraries} />}
          </CarbonTraceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
