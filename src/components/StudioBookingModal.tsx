"use client";

import { useState } from "react";
import { X, Calendar, Clock, MapPin, Sparkles, CheckCircle2, Scissors, User, Phone } from "lucide-react";
import { soundFX } from "@/utils/audio";
import confetti from "canvas-confetti";

interface StudioBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const services = [
  { id: "fitting", label: "VIP Wig Fitting & Cap Sizing", desc: "Try on 5 blend styles with our master braider & stylist." },
  { id: "lace-tint", label: "Free HD Lace Tinting & Edge Customization", desc: "We tint your lace to match your exact skin undertone." },
  { id: "touch-feel", label: "Blend Texture Touch & Feel Experience", desc: "Inspect cuticle alignment, heat test live flat irons." },
  { id: "ponytail", label: "Instant Ponytail Install Session", desc: "Slick and install your 2-minute glam wrap." },
];

const timeSlots = [
  "09:30 - 10:00",
  "11:00 - 11:30",
  "12:30 - 13:00",
  "14:00 - 14:30",
  "15:30 - 16:00",
  "16:30 - 17:00",
];

export default function StudioBookingModal({
  isOpen,
  onClose,
}: StudioBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: services[0].label,
    preferredDate: "This Saturday",
    preferredTime: timeSlots[3],
    suburb: "Nelspruit",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    soundFX.playPop();

    try {
      await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      soundFX.playSparkle();
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-rose-200 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shadow-sm">
                <Scissors className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-[#2B172A] font-serif">
                  Book Sonpark Fitting Lounge
                </h2>
                <p className="text-xs text-rose-600 font-bold">
                  Free 30-Minute Consultation • Nelspruit Hub
                </p>
              </div>
            </div>

            <p className="text-xs text-gray-500 mb-5">
              Shop 14, Sonpark Centre (Corner Faurie & Madiba Dr, Nelspruit). Come sip champagne and try your units in our velvet vanity mirrors!
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              {/* Service Selection */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  Select Experience:
                </label>
                <div className="space-y-1.5">
                  {services.map((svc) => (
                    <label
                      key={svc.id}
                      className={`p-2.5 rounded-xl border flex items-start gap-2.5 cursor-pointer transition-all ${
                        formData.service === svc.label
                          ? "border-rose-500 bg-rose-50/80 font-bold"
                          : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="service"
                        checked={formData.service === svc.label}
                        onChange={() => setFormData({ ...formData, service: svc.label })}
                        className="accent-rose-600 mt-0.5"
                      />
                      <div>
                        <p className="text-xs font-bold text-gray-900">{svc.label}</p>
                        <p className="text-[10px] text-gray-500">{svc.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Preferred Day
                  </label>
                  <select
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white font-medium focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  >
                    <option value="Today Afternoon">Today Afternoon</option>
                    <option value="Tomorrow">Tomorrow</option>
                    <option value="This Friday">This Friday</option>
                    <option value="This Saturday">This Saturday (Most Popular)</option>
                    <option value="Next Week Tuesday">Next Week Tuesday</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Time Slot
                  </label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs bg-white font-medium focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  >
                    {timeSlots.map((ts) => (
                      <option key={ts} value={ts}>
                        {ts}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Busisiwe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 072 345 6789"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Hair Style You Want to Try (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Looking for a 28 inch wet & wavy or 10 inch bob"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs focus:ring-2 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl sunset-gradient text-white font-black text-sm shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {loading ? "Confirming Slot..." : "Lock In Free VIP Fitting 👑"}
              </button>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-[#2B172A] font-serif">
              You&#39;re Booked, Queen!
            </h3>
            <p className="text-xs text-gray-600 max-w-sm mx-auto">
              We saved your spot for <strong className="text-gray-900">{formData.preferredDate} ({formData.preferredTime})</strong> at our Sonpark Fitting Studio.
            </p>

            <div className="p-4 bg-orange-50 rounded-2xl border border-orange-200 text-left text-xs space-y-1.5 max-w-sm mx-auto">
              <p className="font-bold text-orange-950 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-orange-600" />
                Nelspruit Studio Address:
              </p>
              <p className="text-orange-900">
                Shop 14, Sonpark Centre, cnr Faurie & Madiba Dr, Nelspruit
              </p>
              <p className="text-[11px] text-orange-700">
                🅿️ Free safe parking right outside the salon entrance.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-2xl bg-gray-900 text-white font-bold text-xs hover:bg-black cursor-pointer"
            >
              Done & Return to Store
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
