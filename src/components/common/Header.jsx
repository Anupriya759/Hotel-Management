import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { HOTEL_INFO } from '../../data/hotelData';
import { 
  Building2, 
  LayoutDashboard, 
  Globe, 
  Bell, 
  Zap, 
  CheckCheck, 
  Calendar, 
  Clock, 
  Sparkles,
  Phone,
  ShieldCheck,
  X
} from 'lucide-react';

export default function Header() {
  const { 
    viewMode, 
    setViewMode, 
    notifications, 
    markAllNotificationsRead, 
    simulateRandomBooking,
    metrics
  } = useHotel();

  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-xl transition-all">
      {/* Top Utility Ticker Bar */}
      <div className="bg-gradient-to-r from-amber-600/90 via-amber-500/90 to-amber-700/90 text-slate-950 px-4 py-1.5 text-xs font-semibold flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            5-Star Luxury Resort & Smart PMS Platform
          </span>
          <span className="hidden md:inline text-slate-900/70">|</span>
          <span className="hidden md:flex items-center gap-1 text-slate-900">
            <Clock className="w-3.5 h-3.5" />
            Live Status: {metrics.occupancyRate}% Occupancy ({metrics.occupiedRooms}/{metrics.totalRooms} Rooms Occupied)
          </span>
        </div>
        <div className="flex items-center gap-3 ml-auto text-xs">
          <span className="hidden sm:flex items-center gap-1">
            <Phone className="w-3 h-3" />
            Concierge: {HOTEL_INFO.phone}
          </span>
          <button 
            onClick={simulateRandomBooking}
            title="Simulate a real-time online guest booking to see live PMS updates"
            className="inline-flex items-center gap-1 bg-slate-950 text-amber-400 hover:bg-slate-900 px-2.5 py-0.5 rounded-full text-[11px] font-bold shadow-sm transition transform active:scale-95"
          >
            <Zap className="w-3 h-3 text-amber-400 fill-amber-400 animate-pulse" />
            ⚡ Simulate Live Booking
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo */}
          <div 
            onClick={() => setViewMode('website')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition">
              <Building2 className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="font-serif tracking-wider text-lg font-bold text-slate-100 flex items-center gap-2">
                THE GRAND AZURE
                <span className="text-[10px] font-sans uppercase tracking-widest bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded border border-amber-500/30">
                  Resort & Spa
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wide font-sans">
                Monte Carlo Riviera • 5-Star Luxury
              </p>
            </div>
          </div>

          {/* Center Mode Switcher Tabs */}
          <div className="bg-slate-800/80 p-1 rounded-xl border border-slate-700/70 flex items-center shadow-inner">
            <button
              onClick={() => setViewMode('website')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'website'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>Guest Website</span>
            </button>
            <button
              onClick={() => setViewMode('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all relative ${
                viewMode === 'dashboard'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>PMS Staff Dashboard</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
            </button>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3">
            {/* Real-time Notifications Bell */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition"
                title="Real-time Hotel Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-slate-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {notificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden z-50 text-slate-100 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3.5 bg-slate-800/80 border-b border-slate-700/80 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-amber-400" />
                      <span className="font-semibold text-sm">PMS Live Feed</span>
                      {unreadCount > 0 && (
                        <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full border border-amber-500/30">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={markAllNotificationsRead} 
                        className="text-xs text-slate-400 hover:text-amber-400 flex items-center gap-1 transition"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark Read
                      </button>
                      <button 
                        onClick={() => setNotificationsOpen(false)}
                        className="text-slate-400 hover:text-white p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/60 p-1">
                    {notifications.length === 0 ? (
                      <div className="p-6 text-center text-xs text-slate-500">
                        No notifications currently
                      </div>
                    ) : (
                      notifications.map(n => (
                        <div 
                          key={n.id} 
                          className={`p-3 text-xs transition hover:bg-slate-800/50 rounded-lg flex items-start gap-2.5 ${n.unread ? 'bg-amber-500/5 border-l-2 border-amber-500' : ''}`}
                        >
                          <div className="mt-0.5 w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-slate-200">{n.title}</p>
                              <span className="text-[10px] text-slate-500">{n.time}</span>
                            </div>
                            <p className="text-slate-400 mt-0.5 leading-relaxed">{n.text}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-2.5 bg-slate-800/40 border-t border-slate-700/60 text-center">
                    <button 
                      onClick={() => {
                        setNotificationsOpen(false);
                        setViewMode('dashboard');
                      }}
                      className="text-xs text-amber-400 hover:text-amber-300 font-medium"
                    >
                      Open Full Activity Log in Dashboard →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Live Indicator Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700/80 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-mono text-[11px]">System Live</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
