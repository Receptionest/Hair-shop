"use client";

import { MapPin, Truck, Clock, ShieldCheck, Phone, CheckCircle2 } from "lucide-react";

const deliveryZones = [
  { area: "Sonpark Studio Hub", time: "Ready in 2 Hours", cost: "FREE Pickup", badge: "Collection Hub" },
  { area: "West Acres & Stonehenge", time: "Same Day (Order before 2pm)", cost: "R60 Flat", badge: "Local Van" },
  { area: "Steiltes & Hermansburg", time: "Same Day", cost: "R60 Flat", badge: "Local Van" },
  { area: "Riverside Park & CBD", time: "Same Day", cost: "R60 Flat", badge: "Local Van" },
  { area: "Kamagugu & Mataffin", time: "Same Day", cost: "R60 Flat", badge: "Local Van" },
  { area: "White River & Rocky Drift", time: "Next Morning", cost: "R70 Flat", badge: "Lowveld Route" },
  { area: "Nationwide South Africa", time: "2 - 3 Days (Courier Guy / Paxi)", cost: "R60 - R100", badge: "Door-to-Door" },
];

export default function NelspruitDeliveryBanner() {
  return (
    <section className="py-14 bg-gradient-to-r from-[#241324] via-[#351B32] to-[#241324] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider mb-2">
            <Truck className="w-3.5 h-3.5" />
            Fast Mbombela Logistics
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">
            We Deliver Directly To Your Door in Nelspruit
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 mt-1">
            Need your hair for a weekend groove or urgent Monday morning look? We deliver faster than anyone else in Mpumalanga.
          </p>
        </div>

        {/* Zones Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {deliveryZones.slice(0, 4).map((zone, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-400/40 transition-colors">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">
                  {zone.badge}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400">
                  {zone.cost}
                </span>
              </div>
              <h4 className="font-bold text-sm text-white">{zone.area}</h4>
              <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                <Clock className="w-3 h-3 text-amber-400" />
                {zone.time}
              </p>
            </div>
          ))}
        </div>

        {/* Studio location card */}
        <div className="mt-8 p-5 rounded-2xl bg-white/10 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-4xl mx-auto text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-sm text-white">
                Visit Our Nelspruit Showroom & Collection Hub
              </p>
              <p className="text-xs text-gray-300">
                Shop 14, Sonpark Centre, cnr Faurie & Madiba Dr, Nelspruit • Mon-Sat: 09:00 - 17:30
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/40 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Open For Free Walk-ins & Pickups
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
