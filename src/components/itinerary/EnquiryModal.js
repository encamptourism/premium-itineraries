"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function EnquiryModal({ isOpen, onClose, itineraryTitle }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelMonth: "",
    guests: "2",
    notes: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-stone-100 text-stone-500 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-forest/10 text-forest mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-forest" />
            </div>
            <h3 className="font-serif-display text-2xl font-bold text-forest">
              Enquiry Received
            </h3>
            <p className="text-sm text-stone-600 max-w-sm mx-auto">
              Thank you, {formData.name}. Our private travel concierge will contact you within 2 business hours with full customization options.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 px-6 py-2.5 rounded-full bg-forest text-ivory text-xs font-semibold uppercase tracking-wider hover:bg-forest-light transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="eyebrow text-gold font-semibold tracking-widest text-xs">
                Encamp Privé Concierge
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-forest uppercase tracking-wide mt-1">
                Plan Your Journey
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Inquire for <strong className="text-forest">{itineraryTitle || "Meghalaya Grandeur"}</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="eleanor@luxury.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    Target Month
                  </label>
                  <select
                    value={formData.travelMonth}
                    onChange={(e) => setFormData({ ...formData, travelMonth: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                  >
                    <option value="">Select Month</option>
                    <option value="Oct 2026">Oct 2026</option>
                    <option value="Nov 2026">Nov 2026</option>
                    <option value="Dec 2026">Dec 2026</option>
                    <option value="Jan 2027">Jan 2027</option>
                    <option value="Feb 2027">Feb 2027</option>
                    <option value="Mar 2027">Mar 2027</option>
                    <option value="Apr 2027">Apr 2027</option>
                    <option value="May 2027">May 2027</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                    No. of Guests
                  </label>
                  <select
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest bg-white"
                  >
                    <option value="2">2 Guests (Couple)</option>
                    <option value="3-4">3 to 4 Guests (Family)</option>
                    <option value="5-8">5 to 8 Guests (Group)</option>
                    <option value="8+">8+ Guests (Private Caravan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                  Special Requests / Preferences
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Dietary preferences, villa upgrades, private helicopter, etc."
                  className="w-full px-4 py-2 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-forest text-ivory hover:bg-forest-light py-3.5 px-6 rounded-full font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-gold" />
                  <span>Submit Private Enquiry</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-forest" />
                <span>100% Privacy Assured · No Spam Guarantee</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
