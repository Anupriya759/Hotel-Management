import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { Users, BedDouble, Maximize2, Check, ArrowRight, Sparkles } from 'lucide-react';

export default function RoomCard({ roomType }) {
  const { setBookingModalOpen, setPreselectedRoomType } = useHotel();

  const handleBook = () => {
    setPreselectedRoomType(roomType);
    setBookingModalOpen(true);
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      {/* Image with overlay badge */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={roomType.image}
          alt={roomType.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
        
        {roomType.badge && (
          <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-slate-950 fill-slate-950" />
            {roomType.badge}
          </div>
        )}

        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
          <span className="text-xs font-semibold tracking-wider uppercase bg-slate-900/70 backdrop-blur-md px-2.5 py-1 rounded-lg">
            {roomType.category}
          </span>
          <div className="text-right">
            <div className="text-xs text-slate-300 line-through">${roomType.originalPrice}</div>
            <div className="text-2xl font-serif font-bold text-amber-300">
              ${roomType.basePrice}
              <span className="text-xs font-sans text-slate-200 font-normal"> / night</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
            {roomType.name}
          </h3>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {roomType.description}
          </p>

          {/* Quick Specs */}
          <div className="mt-4 py-3 border-y border-slate-100 grid grid-cols-3 gap-2 text-xs text-slate-600">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500 shrink-0" />
              <span>Up to {roomType.capacity} Guests</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BedDouble className="w-4 h-4 text-amber-500 shrink-0" />
              <span className="truncate">{roomType.bed}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4 text-amber-500 shrink-0" />
              <span>{roomType.size}</span>
            </div>
          </div>

          {/* Amenities Pills */}
          <div className="mt-4 space-y-1.5">
            {roomType.amenities.slice(0, 3).map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span>{amenity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            <span className="text-emerald-600 font-semibold">● Instant Confirmation</span>
          </div>
          <button
            onClick={handleBook}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-amber-600 text-white font-semibold px-4 py-2.5 rounded-xl text-xs transition duration-200 group-hover:shadow-lg"
          >
            <span>Reserve Suite</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
