import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  Search, 
  PlusCircle, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  Zap,
  Building,
  Sparkles
} from 'lucide-react';

export default function DashboardHeader({ onSearch, searchTerm }) {
  const { 
    setIsStaffWalkInModalOpen, 
    simulateRandomBooking, 
    metrics 
  } = useHotel();

  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-16 z-30 shadow-sm">
      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search by guest name, room #, or reservation ref..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full bg-slate-100 hover:bg-slate-100/80 focus:bg-white border border-slate-200 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 transition focus:outline-none"
        />
      </div>

      {/* Middle Status & Clock */}
      <div className="hidden lg:flex items-center gap-6 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-mono text-slate-700">{currentTime}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-700 font-semibold">{metrics.occupancyRate}% Occupied</span>
          <span className="text-slate-400">({metrics.occupiedRooms}/{metrics.totalRooms})</span>
        </div>
      </div>

      {/* Action Buttons & Staff Profile */}
      <div className="flex items-center gap-3">
        <button
          onClick={simulateRandomBooking}
          className="hidden sm:inline-flex items-center gap-1.5 bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 px-3 py-2 rounded-xl text-xs font-bold transition shadow-sm"
          title="Simulate incoming live booking to test real-time PMS reactivity"
        >
          <Zap className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>Simulate Live Event</span>
        </button>

        <button
          onClick={() => setIsStaffWalkInModalOpen(true)}
          className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>+ Walk-in Guest</span>
        </button>

        {/* Staff User Avatar */}
        <div className="flex items-center gap-2 pl-3 border-l border-slate-200">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80"
            alt="Elena Vance - General Manager"
            className="w-9 h-9 rounded-xl object-cover border border-slate-300"
          />
          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-none">Elena Vance</p>
            <p className="text-[10px] text-slate-500 mt-0.5">General Manager</p>
          </div>
        </div>
      </div>
    </div>
  );
}
