"use client";

import { useState, useEffect } from "react";
import {
  BedDouble,
  Utensils,
  Car,
  Camera,
  Coins,
  Check,
  Calendar,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useCarbonTrace } from "@/context/CarbonTraceContext";
import { getCarbonTracePayload, getItineraryItemId } from "@/lib/api";
import { initCheckoutAction } from "@/app/actions/checkout";

function LuxuryPackageFrame({ children, className = "" }) {
  return (
    <div
      className={`relative text-white font-poppins ${className}`}
      style={{
        borderStyle: "solid",
        borderWidth: "24px",
        borderImageSource: "url('/images/luxury_frame.svg')",
        borderImageSlice: "38 fill",
        borderImageRepeat: "stretch",
      }}
    >
      <div className="relative z-10 flex flex-col justify-between h-full p-1">
        {children}
      </div>
    </div>
  );
}

export default function PackageBookingCard({ itinerary, itineraryId, onOpenEnquiry, openRedeemModal }) {
  const ctContext = useCarbonTrace();
  const appliedRedemption = ctContext?.appliedRedemption;
  const itineraryData = itinerary || {};

  const [bookingState, setBookingState] = useState({
    date: "",
    name: "",
    phone: "",
    email: "",
    qty: 1,
    coupon: "",
    selectedPackage: "premium",
  });

  const [bookingErrors, setBookingErrors] = useState({});
  const [bookingLoading, setBookingLoading] = useState(false);

  // Unit pricing per person
  const baseStartingPrice =
    itineraryData?.packagePricing?.premiumPackagePrice ||
    itineraryData?.startingFrom?.[0]?.totalPricePerPerson ||
    itineraryData?.startingFrom?.[0]?.pricePerPerson ||
    0;

  const baseLuxuryPrice =
    itineraryData?.packagePricing?.luxuryPackagePrice ||
    (baseStartingPrice ? Math.round(baseStartingPrice * 1.37) : 0);

  // Dynamic price scaling based on number of travelers:
  // 1 or 2 guests = 1 * basePrice (flat base package rate)
  // 3 guests = 2 * basePrice
  // 4 guests = 3 * basePrice
  // N guests = (N - 1) * basePrice
  const qty = Math.max(1, Number(bookingState.qty) || 1);
  const priceMultiplier = qty <= 2 ? 1 : qty - 1;

  const totalStartingPrice = baseStartingPrice * priceMultiplier;
  const totalLuxuryPrice = baseLuxuryPrice * priceMultiplier;

  // Subtractive CTCoin Redemption calculation per package
  const premiumDiscount =
    appliedRedemption?.packageType === "premium" || !appliedRedemption?.packageType
      ? Math.min(totalStartingPrice, appliedRedemption?.amount || 0)
      : 0;

  const luxuryDiscount =
    appliedRedemption?.packageType === "luxury" || !appliedRedemption?.packageType
      ? Math.min(totalLuxuryPrice, appliedRedemption?.amount || 0)
      : 0;

  const netStartingPrice = Math.max(0, totalStartingPrice - premiumDiscount);
  const netLuxuryPrice = Math.max(0, totalLuxuryPrice - luxuryDiscount);

  const formattedStartingPrice = totalStartingPrice
    ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(totalStartingPrice)
    : null;

  const formattedLuxuryPrice = totalLuxuryPrice
    ? new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(totalLuxuryPrice)
    : null;

  const formattedNetStartingPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(netStartingPrice);

  const formattedNetLuxuryPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(netLuxuryPrice);

  const carbonFootprint = Number(
    itineraryData?.carbonFootprint ||
    itineraryData?.carbon_footprint ||
    itineraryData?.commondetails?.carbonFootprint ||
    itineraryData?.commondetails?.carbon_footprint ||
    0
  );

  const [previewPremiumCoins, setPreviewPremiumCoins] = useState(0);
  const [previewLuxuryCoins, setPreviewLuxuryCoins] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function updateRewardPreviews() {
      const fetchPreview = async (invoiceVal) => {
        if (!invoiceVal) return 0;
        if (typeof window !== "undefined" && window.CarbontraceWallet?.previewReward) {
          try {
            const rewardInfo = await window.CarbontraceWallet.previewReward({
              carbon_footprint: carbonFootprint,
              invoice_value: Number(invoiceVal),
            });
            if (rewardInfo && typeof rewardInfo.ctcoins_reward !== "undefined") {
              return Number(rewardInfo.ctcoins_reward) || 0;
            }
          } catch (err) {
            console.warn("Failed to preview CTCoin reward from SDK:", err);
          }
        }
        return 0;
      };

      const premiumInvoiceAmount = netStartingPrice || totalStartingPrice;
      const luxuryInvoiceAmount = netLuxuryPrice || totalLuxuryPrice;

      const [pCoins, lCoins] = await Promise.all([
        fetchPreview(premiumInvoiceAmount),
        fetchPreview(luxuryInvoiceAmount),
      ]);

      if (isMounted) {
        setPreviewPremiumCoins(pCoins);
        setPreviewLuxuryCoins(lCoins);
      }
    }

    updateRewardPreviews();

    // Check periodically for SDK readiness if initialized asynchronously
    const timer = setInterval(() => {
      if (typeof window !== "undefined" && window.CarbontraceWallet?.previewReward) {
        updateRewardPreviews();
      }
    }, 1000);

    return () => {
      isMounted = false;
      clearInterval(timer);
    };
  }, [netStartingPrice, totalStartingPrice, netLuxuryPrice, totalLuxuryPrice, carbonFootprint]);

  const premiumCoins = previewPremiumCoins;
  const luxuryCoins = previewLuxuryCoins;

  const scrollToBookingCard = () => {
    const card = document.getElementById("booking-card") || document.getElementById("package-booking-card");
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleCheckout = async (e, packageType = "premium") => {
    if (e) e.preventDefault();
    setBookingErrors({});

    // 1. Validation
    const errors = {};
    if (!bookingState.date) errors.date = "Please select a date";
    if (!bookingState.name.trim()) errors.name = "Name is required";
    if (!bookingState.phone.trim()) errors.phone = "Phone number is required";
    if (!bookingState.email.trim()) errors.email = "Email address is required";

    if (Object.keys(errors).length > 0) {
      setBookingErrors(errors);
      scrollToBookingCard();
      return;
    }

    setBookingLoading(true);
    try {
      const redeemCoins = packageType === "luxury" ? luxuryDiscount : premiumDiscount;
      const itemId = itineraryId || getItineraryItemId(itineraryData);

      if (!itemId) {
        console.error("[Checkout Error] Unable to resolve item_id from itineraryData:", itineraryData);
        setBookingErrors({
          api: "Selected itinerary item ID could not be found. Please refresh the page and try again.",
        });
        setBookingLoading(false);
        return;
      }

      const payload = {
        model: "premiumitinerary",
        item_id: itemId,
        qty: Number(bookingState.qty),
        customer_name: bookingState.name.trim(),
        customer_email: bookingState.email.trim(),
        customer_phone: bookingState.phone.trim(),
        return_url: typeof window !== "undefined" ? window.location.href : "",
        coupon: bookingState.coupon || "",
        tripDates: bookingState.date,
        advancePayment: Boolean(
          itineraryData?.advancePayment?.isAvailable ||
          itineraryData?.commondetails?.advancePayment?.isAvailable
        ),
        carbontrace: getCarbonTracePayload(redeemCoins),
        items: [
          {
            model: "premiumitinerary",
            item_id: itemId,
            qty: Number(bookingState.qty),
          },
        ],
      };

      const res = await initCheckoutAction(payload);
      if (res.success && res.checkout_url) {
        window.location.href = res.checkout_url;
      } else {
        setBookingErrors({ api: res.error || "Failed to initialize checkout. Please try again." });
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setBookingErrors({
        api:
          err.response?.data?.message ||
          err.message ||
          "An error occurred during checkout. Please try again.",
      });
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <LuxuryPackageFrame className="w-full">
      {/* Packages Title */}
      <div className="text-center pb-3 border-b border-white/20">
        <h2 className="font-poppins text-lg sm:text-xl font-bold uppercase tracking-[0.18em] text-[#f0c85a] drop-shadow-xs">
          Our Packages
        </h2>
      </div>

      <div className="py-3 flex-1 flex flex-col justify-between space-y-4 font-poppins">
        {/* Booking Form Fields Container (Transparent / Theme Integrated) */}
        <div
          id="booking-card"
          className="bg-transparent p-1 space-y-3.5 text-white font-poppins text-left"
        >
          {/* TRAVEL DATE */}
          <div>
            <label className="block text-[12px] font-semibold text-[#f0c85a] uppercase tracking-[0.14em] mb-1 font-poppins">
              TRAVEL DATE <span className="text-amber-400">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                value={bookingState.date}
                onChange={(e) =>
                  setBookingState({ ...bookingState, date: e.target.value })
                }
                className={`w-full px-3.5 py-2.5 bg-white text-[#123B2A] text-[14px] font-medium rounded-md border transition-all ${bookingErrors.date
                  ? "border-rose-400 ring-1 ring-rose-400"
                  : "border-[#d8caa5] hover:border-[#f0c85a]"
                  } focus:outline-none focus:border-[#f0c85a] focus:ring-2 focus:ring-[#f0c85a]/50 shadow-2xs font-poppins`}
              />
            </div>
            {bookingErrors.date && (
              <p className="text-[11px] text-rose-300 font-semibold mt-0.5 font-poppins">
                {bookingErrors.date}
              </p>
            )}
          </div>

          {/* FULL NAME */}
          <div>
            <label className="block text-[12px] font-semibold text-[#f0c85a] uppercase tracking-[0.14em] mb-1 font-poppins">
              FULL NAME <span className="text-amber-400">*</span>
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              value={bookingState.name}
              onChange={(e) =>
                setBookingState({ ...bookingState, name: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 bg-white text-[#123B2A] text-[14px] font-medium rounded-md border transition-all ${bookingErrors.name
                ? "border-rose-400 ring-1 ring-rose-400"
                : "border-[#d8caa5] hover:border-[#f0c85a]"
                } focus:outline-none focus:border-[#f0c85a] focus:ring-2 focus:ring-[#f0c85a]/50 shadow-2xs placeholder:text-stone-400 font-poppins`}
            />
            {bookingErrors.name && (
              <p className="text-[11px] text-rose-300 font-semibold mt-0.5 font-poppins">
                {bookingErrors.name}
              </p>
            )}
          </div>

          {/* PHONE NUMBER */}
          <div>
            <label className="block text-[12px] font-semibold text-[#f0c85a] uppercase tracking-[0.14em] mb-1 font-poppins">
              PHONE NUMBER <span className="text-amber-400">*</span>
            </label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={bookingState.phone}
              onChange={(e) =>
                setBookingState({ ...bookingState, phone: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 bg-white text-[#123B2A] text-[14px] font-medium rounded-md border transition-all ${bookingErrors.phone
                ? "border-rose-400 ring-1 ring-rose-400"
                : "border-[#d8caa5] hover:border-[#f0c85a]"
                } focus:outline-none focus:border-[#f0c85a] focus:ring-2 focus:ring-[#f0c85a]/50 shadow-2xs placeholder:text-stone-400 font-poppins`}
            />
            {bookingErrors.phone && (
              <p className="text-[11px] text-rose-300 font-semibold mt-0.5 font-poppins">
                {bookingErrors.phone}
              </p>
            )}
          </div>

          {/* EMAIL ADDRESS */}
          <div>
            <label className="block text-[12px] font-semibold text-[#f0c85a] uppercase tracking-[0.14em] mb-1 font-poppins">
              EMAIL ADDRESS <span className="text-amber-400">*</span>
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              value={bookingState.email}
              onChange={(e) =>
                setBookingState({ ...bookingState, email: e.target.value })
              }
              className={`w-full px-3.5 py-2.5 bg-white text-[#123B2A] text-[14px] font-medium rounded-md border transition-all ${bookingErrors.email
                ? "border-rose-400 ring-1 ring-rose-400"
                : "border-[#d8caa5] hover:border-[#f0c85a]"
                } focus:outline-none focus:border-[#f0c85a] focus:ring-2 focus:ring-[#f0c85a]/50 shadow-2xs placeholder:text-stone-400 font-poppins`}
            />
            {bookingErrors.email && (
              <p className="text-[11px] text-rose-300 font-semibold mt-0.5 font-poppins">
                {bookingErrors.email}
              </p>
            )}
          </div>

          {/* NUMBER OF TRAVELERS */}
          <div>
            <label className="block text-[12px] font-semibold text-[#f0c85a] uppercase tracking-[0.14em] mb-1 font-poppins">
              NUMBER OF TRAVELERS
            </label>
            <div className="flex items-center w-full rounded-md border border-[#d8caa5] overflow-hidden bg-white shadow-2xs font-poppins">
              <button
                type="button"
                onClick={() =>
                  setBookingState((prev) => ({
                    ...prev,
                    qty: Math.max(1, prev.qty - 1),
                  }))
                }
                className="w-11 py-2 text-[#123B2A] hover:bg-[#f2ebd9] transition-colors font-bold text-base cursor-pointer border-r border-[#d8caa5] select-none flex items-center justify-center font-poppins"
              >
                -
              </button>
              <div className="flex-1 py-2 bg-white text-center font-bold text-[14px] sm:text-[16px] text-[#123B2A] select-none font-poppins tracking-wide">
                {bookingState.qty}{" "}
                {bookingState.qty === 1 ? "Traveler" : "Travelers"}
              </div>
              <button
                type="button"
                onClick={() =>
                  setBookingState((prev) => ({ ...prev, qty: prev.qty + 1 }))
                }
                className="w-11 py-2 text-[#123B2A] hover:bg-[#f2ebd9] transition-colors font-bold text-base cursor-pointer border-l border-[#d8caa5] select-none flex items-center justify-center font-poppins"
              >
                +
              </button>
            </div>
          </div>

          {bookingErrors.api && (
            <div className="p-2.5 rounded-md bg-rose-950/80 border border-rose-500/50 text-rose-200 text-[11px] font-semibold flex items-center gap-1.5 font-poppins">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 text-rose-400" />
              <span>{bookingErrors.api}</span>
            </div>
          )}
        </div>

        {/* 1. Premium Package */}
        <div className="space-y-2.5 pb-3.5 border-b border-white/20 font-poppins">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#f0c85a] text-center font-poppins">
            Premium Package
          </div>

          {/* 4 Mini Gold Icons */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs text-stone-300 pt-1 font-poppins">
            <div className="flex flex-col items-center">
              <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>4★ Hotels</span>
            </div>
            <div className="flex flex-col items-center">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>Breakfast</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>Private Cab</span>
            </div>
            <div className="flex flex-col items-center">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>All Sightseeing</span>
            </div>
          </div>

          {formattedStartingPrice && (
            <div className="text-center pt-1.5 font-poppins">
              {premiumDiscount > 0 ? (
                <div>
                  <div className="text-xs line-through text-stone-300 font-medium font-poppins">
                    {formattedStartingPrice}/-
                  </div>
                  <div className="font-poppins text-xl sm:text-2xl font-extrabold text-emerald-400 leading-none">
                    {formattedNetStartingPrice}/-
                  </div>
                  <div className="text-[10px] sm:text-xs text-emerald-300 font-bold mt-0.5 font-poppins">
                    -₹{premiumDiscount.toLocaleString()} CTCoin Discount
                  </div>
                </div>
              ) : (
                <div className="font-poppins text-xl sm:text-2xl font-extrabold text-white leading-none">
                  {formattedStartingPrice}/-
                </div>
              )}
              <div className="font-poppins text-xs text-stone-300 font-medium mt-1">
                For {bookingState.qty} {bookingState.qty === 1 ? "guest" : "guests"}
              </div>
              {premiumCoins > 0 && (
                <div className="mt-1 inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f0c85a]/15 text-[#f0c85a] text-[10px] font-bold font-poppins">
                  <Coins className="w-3.5 h-3.5 text-[#f0c85a]" />
                  <span>+{premiumCoins} CTCoin Reward</span>
                </div>
              )}
              {typeof openRedeemModal === "function" && (
                <button
                  type="button"
                  onClick={() => openRedeemModal("premium")}
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0c85a]/20 border border-[#f0c85a]/50 text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green text-xs font-bold transition-all cursor-pointer shadow-xs font-poppins"
                >
                  <Coins className="w-3.5 h-3.5 text-[#f0c85a]" />
                  <span>
                    {premiumDiscount > 0
                      ? `Redeemed (-₹${premiumDiscount.toLocaleString()})`
                      : "Redeem CTCoin in Premium"}
                  </span>
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => handleCheckout(e, "premium")}
            disabled={bookingLoading}
            className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-primary-green font-bold text-xs sm:text-sm uppercase tracking-[0.1em] py-2.5 rounded-lg shadow-md transition-all cursor-pointer mt-1.5 flex items-center justify-center gap-2 disabled:opacity-75 font-poppins"
          >
            {bookingLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary-green" />
            ) : null}
            <span>{bookingLoading ? "Processing..." : "Book Now"}</span>
          </button>
        </div>

        {/* 2. Luxury Package */}
        <div className="space-y-2.5 pb-3.5 border-b border-white/20 font-poppins">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-[0.16em] text-[#f0c85a] text-center font-poppins">
            Luxury Package
          </div>

          {/* 4 Mini Gold Icons */}
          <div className="grid grid-cols-4 gap-2 text-center text-[10px] sm:text-xs text-stone-300 pt-1 font-poppins">
            <div className="flex flex-col items-center">
              <BedDouble className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>5★ Hotels</span>
            </div>
            <div className="flex flex-col items-center">
              <Utensils className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>All Meals</span>
            </div>
            <div className="flex flex-col items-center">
              <Car className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>Private Cab</span>
            </div>
            <div className="flex flex-col items-center">
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-[#f0c85a] mb-1" />
              <span>All Sightseeing</span>
            </div>
          </div>

          {formattedLuxuryPrice && (
            <div className="text-center pt-1.5 font-poppins">
              {luxuryDiscount > 0 ? (
                <div>
                  <div className="text-xs line-through text-stone-300 font-medium font-poppins">
                    {formattedLuxuryPrice}/-
                  </div>
                  <div className="font-poppins text-xl sm:text-2xl font-extrabold text-emerald-400 leading-none">
                    {formattedNetLuxuryPrice}/-
                  </div>
                  <div className="text-[10px] sm:text-xs text-emerald-300 font-bold mt-0.5 font-poppins">
                    -₹{luxuryDiscount.toLocaleString()} CTCoin Discount
                  </div>
                </div>
              ) : (
                <div className="font-poppins text-xl sm:text-2xl font-extrabold text-white leading-none">
                  {formattedLuxuryPrice}/-
                </div>
              )}
              <div className="font-poppins text-xs text-stone-300 font-medium mt-1">
                For {bookingState.qty} {bookingState.qty === 1 ? "guest" : "guests"}
              </div>
              {luxuryCoins > 0 && (
                <div className="mt-1 inline-flex items-center justify-center gap-1 px-2.5 py-0.5 rounded-full bg-[#f0c85a]/15 text-[#f0c85a] text-[10px] font-bold font-poppins">
                  <Coins className="w-3.5 h-3.5 text-[#f0c85a]" />
                  <span>+{luxuryCoins} CTCoin Reward</span>
                </div>
              )}
              {typeof openRedeemModal === "function" && (
                <button
                  type="button"
                  onClick={() => openRedeemModal("luxury")}
                  className="w-full mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#f0c85a]/20 border border-[#f0c85a]/50 text-[#f0c85a] hover:bg-[#f0c85a] hover:text-primary-green text-xs font-bold transition-all cursor-pointer shadow-xs font-poppins"
                >
                  <Coins className="w-3.5 h-3.5 text-[#f0c85a]" />
                  <span>
                    {luxuryDiscount > 0
                      ? `Redeemed (-₹${luxuryDiscount.toLocaleString()})`
                      : "Redeem CTCoin in Luxury"}
                  </span>
                </button>
              )}
            </div>
          )}

          <button
            type="button"
            onClick={(e) => handleCheckout(e, "luxury")}
            disabled={bookingLoading}
            className="w-full bg-gradient-to-r from-[#e5a823] to-[#cf8f15] hover:brightness-110 text-primary-green font-bold text-xs sm:text-sm uppercase tracking-[0.1em] py-2.5 rounded-lg shadow-md transition-all cursor-pointer mt-1.5 flex items-center justify-center gap-2 disabled:opacity-75 font-poppins"
          >
            {bookingLoading ? (
              <Loader2 className="w-4 h-4 animate-spin text-primary-green" />
            ) : null}
            <span>{bookingLoading ? "Processing..." : "Book Now"}</span>
          </button>
        </div>

        {/* 3. Custom Package */}
        <div className="space-y-2.5">
          <div className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[#f0c85a] text-center">
            Custom Package
          </div>

          <ul className="space-y-2 text-xs text-stone-200">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#f0c85a] shrink-0" />
              <span>Tailor Made Itinerary</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#f0c85a] shrink-0" />
              <span>Personalized Experiences</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#f0c85a] shrink-0" />
              <span>24x7 Support</span>
            </li>
          </ul>

          <button
            type="button"
            onClick={onOpenEnquiry}
            className="w-full border-2 border-[#f0c85a]/40 text-stone-200 hover:bg-white/10 font-bold text-xs sm:text-sm uppercase tracking-wider py-2 rounded-lg transition-all cursor-pointer mt-1"
          >
            Enquire Now
          </button>
        </div>
      </div>
    </LuxuryPackageFrame>
  );
}
