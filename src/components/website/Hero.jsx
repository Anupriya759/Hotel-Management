import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { ROOM_TYPES } from '../../data/hotelData';
import { 
  Calendar, 
  Users, 
  Search, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  ChevronRight,
  BedDouble,
  Compass
} from 'lucide-react';

export default function Hero({ onExploreRooms }) {
  const { setBookingModalOpen, setPreselectedRoomType } = useHotel();

  const [checkIn, setCheckIn] = useState('2026-10-31');
  const [checkOut, setCheckOut] = useState('2026-11-04');
  const [guests, setGuests] = useState('2');
  const [category, setCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    if (category !== 'all') {
      const match = ROOM_TYPES.find(rt => rt.id === category);
      if (match) setPreselectedRoomType(match);
    }
    setBookingModalOpen(true);
  };

  return (
    <div className="relative min-h-[92vh] flex flex-col justify-center bg-slate-950 text-white overflow-hidden">
      {/* Background Image with Cinematic Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2000&q=85"
          alt="Luxury Hotel Resort overlooking Mediterranean coast"
          className="w-full h-full object-cover object-center scale-105 transform motion-safe:animate-pulse duration-1000 opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex-1 flex flex-col justify-center">
        {/* Top Luxury Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md self-start">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Awarded Europe's #1 Luxury Coastal Retreat 2026</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl leading-[1.15]">
          Timeless Splendor on the <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 italic font-normal">Azure Riviera</span>
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl font-light leading-relaxed">
          Surrender to the pinnacle of hospitality. Private cliffside infinity pools, Michelin-starred culinary artistry, and tailor-made Riviera experiences overlooking crystal seas.
        </p>

        {/* Floating Quick Booking Bar */}
        <div className="mt-12 bg-slate-900/90 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl max-w-5xl">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Check-in Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check-in Date
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition font-sans"
              />
            </div>

            {/* Check-out Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Check-out Date
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition font-sans"
              />
            </div>

            {/* Guests & Room Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                Guests & Suite
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-800/90 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition"
              >
                <option value="all">All Suites & Villas (2 Guests)</option>
                {ROOM_TYPES.map(rt => (
                  <option key={rt.id} value={rt.id}>{rt.name} (${rt.basePrice}/n)</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-6 py-3.5 rounded-xl text-sm transition shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 group active:scale-95"
              >
                <Search className="w-4 h-4 text-slate-950 group-hover:scale-110 transition" />
                Check Rates & Book
              </button>
            </div>
          </form>

          {/* Quick Perks Line */}
          <div className="mt-4 pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Direct Booking Best Rate Guaranteed</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Complimentary Welcome Champagne & Canapés</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Free Cancellation Up to 48h Prior</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
