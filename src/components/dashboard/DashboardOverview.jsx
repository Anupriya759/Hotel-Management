import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  Building2, 
  BedDouble, 
  DollarSign, 
  UserCheck, 
  Sparkles, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Receipt,
  Grid3X3
} from 'lucide-react';

export default function DashboardOverview() {
  const { 
    metrics, 
    bookings, 
    rooms, 
    activities, 
    checkInGuest, 
    checkOutGuest,
    setDashboardTab,
    setSelectedInvoiceBooking
  } = useHotel();

  // Find bookings arriving today or needing check-in
  const arrivalsToday = bookings.filter(b => b.status === "Confirmed");
  const departuresToday = bookings.filter(b => b.status === "Due Out Today" || b.status === "Checked-in");

  return (
    <div className="space-y-6">
      {/* 4 Top KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Occupancy Rate */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Occupancy Rate</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <BedDouble className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-slate-900">{metrics.occupancyRate}%</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +4.2%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              {metrics.occupiedRooms} occupied of {metrics.totalRooms} total rooms
            </p>
          </div>
          <div className="mt-4 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${metrics.occupancyRate}%` }} 
            />
          </div>
        </div>

        {/* Total Active Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Active Revenue</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-slate-900">${metrics.totalRevenue.toLocaleString()}</span>
              <span className="text-xs font-semibold text-emerald-600 flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +12.8%
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              ADR: ${metrics.averageDailyRate} • RevPAR: ${metrics.revPar}
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-100">
            <span>Direct Website: 68%</span>
            <span>OTA/Expedia: 32%</span>
          </div>
        </div>

        {/* Today's Check-ins */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Arrivals Pending</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-slate-900">{arrivalsToday.length}</span>
              <span className="text-xs text-amber-600 font-semibold">Scheduled today</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              VIP Arrivals: 2 • Express Keycard ready
            </p>
          </div>
          <button 
            onClick={() => setDashboardTab('reservations')}
            className="mt-4 text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
          >
            Manage Check-ins →
          </button>
        </div>

        {/* Housekeeping Status */}
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Housekeeping Queue</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold font-serif text-purple-700">{metrics.cleaningRooms}</span>
              <span className="text-xs text-slate-500">Rooms in progress</span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              4 Staff on duty • Avg turnaround: 28 min
            </p>
          </div>
          <button 
            onClick={() => setDashboardTab('housekeeping')}
            className="mt-4 text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1"
          >
            View Housekeeping Board →
          </button>
        </div>
      </div>

      {/* Live Room Distribution Bar */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Live Inventory & Room Distribution (32 Total Rooms)</h3>
            <p className="text-xs text-slate-500">Real-time status snapshot across Floors 1 through 4</p>
          </div>
          <button
            onClick={() => setDashboardTab('room-rack')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-amber-600 bg-slate-100 px-3 py-1.5 rounded-xl transition"
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            Open Full Visual Rack
          </button>
        </div>

        {/* Distribution Multi-Color Bar */}
        <div className="w-full h-3 rounded-full bg-slate-100 flex overflow-hidden">
          <div style={{ width: `${(metrics.occupiedRooms / metrics.totalRooms) * 100}%` }} className="bg-blue-600" title={`Occupied: ${metrics.occupiedRooms}`} />
          <div style={{ width: `${(metrics.availableRooms / metrics.totalRooms) * 100}%` }} className="bg-emerald-500" title={`Available: ${metrics.availableRooms}`} />
          <div style={{ width: `${(metrics.reservedRooms / metrics.totalRooms) * 100}%` }} className="bg-amber-400" title={`Reserved: ${metrics.reservedRooms}`} />
          <div style={{ width: `${(metrics.cleaningRooms / metrics.totalRooms) * 100}%` }} className="bg-purple-500" title={`Cleaning: ${metrics.cleaningRooms}`} />
          <div style={{ width: `${(metrics.maintenanceRooms / metrics.totalRooms) * 100}%` }} className="bg-red-500" title={`Maintenance: ${metrics.maintenanceRooms}`} />
        </div>

        {/* Legend */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-blue-600 shrink-0" />
            <span className="text-slate-600 font-medium">Occupied: {metrics.occupiedRooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-emerald-500 shrink-0" />
            <span className="text-slate-600 font-medium">Available: {metrics.availableRooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-amber-400 shrink-0" />
            <span className="text-slate-600 font-medium">Reserved: {metrics.reservedRooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-purple-500 shrink-0" />
            <span className="text-slate-600 font-medium">Cleaning: {metrics.cleaningRooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded bg-red-500 shrink-0" />
            <span className="text-slate-600 font-medium">Maintenance: {metrics.maintenanceRooms}</span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Section: Today's Pending Arrivals & Live Real-Time Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Arriving Guests & Direct Check-in */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">Arriving Guests & Pending Check-ins</h3>
            </div>
            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
              {arrivalsToday.length} Due In
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {arrivalsToday.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-500">
                All scheduled guest check-ins for today have completed.
              </div>
            ) : (
              arrivalsToday.slice(0, 4).map((b) => (
                <div key={b.id} className="p-4 hover:bg-slate-50/80 transition flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 font-bold flex items-center justify-center text-xs">
                      #{b.roomNumber}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{b.guestName}</h4>
                      <p className="text-[11px] text-slate-500">{b.roomType} • {b.nights} nights ({b.checkIn} to {b.checkOut})</p>
                      <p className="text-[10px] text-amber-600 font-medium mt-0.5">Ref: {b.id} • {b.channel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => checkInGuest(b.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm flex items-center gap-1"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Check In</span>
                    </button>
                    <button
                      onClick={() => setSelectedInvoiceBooking(b)}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1.5 rounded-xl text-xs transition"
                      title="View Folio"
                    >
                      <Receipt className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right 1 Col: Real-time PMS Activity Log */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <h3 className="text-sm font-bold text-slate-900">Real-Time Event Stream</h3>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Live PMS</span>
          </div>

          <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
            {activities.map((act) => (
              <div key={act.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs">
                <div className="flex items-center justify-between text-slate-400 text-[10px] mb-1 font-mono">
                  <span>{act.time}</span>
                  <span className="uppercase text-[9px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                    {act.type}
                  </span>
                </div>
                <p className="text-slate-700 font-medium leading-relaxed">{act.text}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
