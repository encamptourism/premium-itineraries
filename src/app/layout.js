import { Alex_Brush, Cormorant_Garamond, Plus_Jakarta_Sans, Poppins } from "next/font/google";
import { headers } from "next/headers";
import Navbar from "@/components/itinerary/Navbar";
import Footer from "@/components/itinerary/Footer";
import AuthProvider from "@/context/AuthProvider";
import "./globals.css";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display-script",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display-serif",
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

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${alexBrush.variable} ${cormorantGaramond.variable} ${plusJakartaSans.variable} ${poppins.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col font-sans bg-white text-black"
      >
        <AuthProvider>
          {!isAuthPage && <Navbar />}
          <main className="flex-1">{children}</main>
          {!isAuthPage && <Footer />}
        </AuthProvider>
      </body>
    </html>
  );
}
