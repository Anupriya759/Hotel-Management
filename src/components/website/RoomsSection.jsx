import React, { useState } from 'react';
import { ROOM_TYPES } from '../../data/hotelData';
import RoomCard from './RoomCard';
import { Sparkles, Filter } from 'lucide-react';

export default function RoomsSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Deluxe', 'Suite', 'Villa', 'Penthouse', 'Bungalow'];

  const filteredRooms = selectedCategory === 'All'
    ? ROOM_TYPES
    : ROOM_TYPES.filter(r => r.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="rooms-section" className="py-24 bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            Accommodations & Sanctuaries
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
            Exquisite Suites & Private Villas
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-light">
            Each living space at The Grand Azure has been meticulously curated with Italian marble, custom handcrafted furnishings, and panoramic horizons of the azure sea.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-amber-400 shadow-md'
                  : 'bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Room Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} roomType={room} />
          ))}
        </div>
      </div>
    </section>
  );
}
