import React from 'react';
import { RESORT_AMENITIES } from '../../data/hotelData';
import { 
  Waves, 
  UtensilsCrossed, 
  Sparkles, 
  Anchor, 
  Crown, 
  Dumbbell,
  CheckCircle,
  Wine,
  Car
} from 'lucide-react';

const ICON_MAP = {
  Waves: Waves,
  UtensilsCrossed: UtensilsCrossed,
  Sparkles: Sparkles,
  Anchor: Anchor,
  Crown: Crown,
  Dumbbell: Dumbbell
};

export default function AmenitiesSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
            Unrivaled Resort Curations
          </span>
          <h2 className="mt-2 font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Indulge in 5-Star Mediterranean Splendor
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg font-light leading-relaxed">
            Every moment at The Grand Azure is elevated by world-class amenities designed to indulge the senses and nurture the spirit.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {RESORT_AMENITIES.map((amenity, idx) => {
            const IconComponent = ICON_MAP[amenity.icon] || Sparkles;
            return (
              <div 
                key={idx}
                className="bg-slate-800/60 border border-slate-700/70 p-8 rounded-3xl hover:border-amber-500/50 transition-all duration-300 group hover:-translate-y-1 hover:bg-slate-800/90 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition duration-300">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-amber-300/80 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {amenity.badge}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-400 transition">
                  {amenity.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed font-light">
                  {amenity.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlights Banner */}
        <div className="mt-16 bg-gradient-to-r from-amber-600/20 via-amber-500/15 to-transparent border border-amber-500/30 rounded-3xl p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif text-2xl font-bold text-amber-200">
              Complimentary VIP Guest Inclusions
            </h4>
            <p className="mt-2 text-sm text-slate-300">
              All suite reservations include daily champagne breakfast buffet, unlimited Thalasso spa hydrotherapy access, high-speed Wi-Fi 6, and sunset sommelier tastings.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-amber-300">
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Wine className="w-4 h-4 text-amber-400" /> Sommelier Tastings
            </span>
            <span className="flex items-center gap-1.5 bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-700">
              <Car className="w-4 h-4 text-amber-400" /> Valet & Chauffeur
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
