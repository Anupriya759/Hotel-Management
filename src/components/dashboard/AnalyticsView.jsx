import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  DollarSign, 
  Calendar, 
  Award,
  ArrowUpRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export default function AnalyticsView() {
  const { metrics, bookings } = useHotel();

  // Revenue by booking channel
  const channels = [
    { name: 'Direct Hotel Website', percentage: 54, amount: Math.round(metrics.totalRevenue * 0.54), color: 'bg-amber-500' },
    { name: 'Booking.com', percentage: 22, amount: Math.round(metrics.totalRevenue * 0.22), color: 'bg-blue-600' },
    { name: 'Expedia Group', percentage: 14, amount: Math.round(metrics.totalRevenue * 0.14), color: 'bg-indigo-500' },
    { name: 'Front Desk Walk-in & Phone', percentage: 10, amount: Math.round(metrics.totalRevenue * 0.10), color: 'bg-emerald-500' },
  ];

  // 7-day occupancy forecast
  const forecast = [
    { day: 'Mon', rate: 82, revenue: 14200 },
    { day: 'Tue', rate: 85, revenue: 15400 },
    { day: 'Wed', rate: 88, revenue: 16800 },
    { day: 'Thu', rate: 92, revenue: 18900 },
    { day: 'Fri', rate: 98, revenue: 23400 },
    { day: 'Sat', rate: 100, revenue: 26500 },
    { day: 'Sun', rate: 94, revenue: 19800 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-600" />
            Revenue Management & Hospitality Analytics
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time RevPAR, yield optimization, channel contribution, and 7-day forecast.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +14.6% YoY Performance
          </span>
        </div>
      </div>

      {/* 4 Financial KPI Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">ADR (Average Daily Rate)</span>
          <p className="text-2xl font-serif font-bold text-slate-900 mt-2">${metrics.averageDailyRate}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> +$24 vs previous month
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">RevPAR (Rev per Avail Room)</span>
          <p className="text-2xl font-serif font-bold text-slate-900 mt-2">${metrics.revPar}</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" /> High season peak yield
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Length of Stay</span>
          <p className="text-2xl font-serif font-bold text-slate-900 mt-2">4.2 Nights</p>
          <p className="text-xs text-slate-500 mt-1">Luxury leisure segment</p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total YTD Portfolio Rev</span>
          <p className="text-2xl font-serif font-bold text-slate-900 mt-2">$1.84M</p>
          <p className="text-xs text-emerald-600 font-semibold mt-1">Surpassing 2026 targets</p>
        </div>
      </div>

      {/* 2-Column Section: 7-Day Occupancy Forecast & Channel Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Forecast Chart */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-900">7-Day Occupancy & Revenue Projection</h3>
              <p className="text-xs text-slate-500">Projected weekend sell-out</p>
            </div>
            <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
              Avg: 91.5%
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="space-y-4">
            {forecast.map((f, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs font-medium text-slate-700">
                  <span className="w-10 font-bold">{f.day}</span>
                  <span className="text-slate-500">${f.revenue.toLocaleString()}</span>
                  <span className="font-bold text-slate-900">{f.rate}% Occ</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-700"
                    style={{ width: `${f.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Channel Distribution */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Direct vs OTA Distribution</h3>
                <p className="text-xs text-slate-500">Direct booking strategy minimizes OTA commission fees</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                54% Direct
              </span>
            </div>

            <div className="space-y-4">
              {channels.map((ch, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800">{ch.name}</span>
                    <span className="text-slate-600 font-mono">${ch.amount.toLocaleString()} ({ch.percentage}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div 
                      className={`h-2.5 rounded-full ${ch.color}`}
                      style={{ width: `${ch.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900">
            <span className="font-bold block mb-1">Direct Booking Commission Savings</span>
            Estimated $24,800 saved this quarter by steering bookings through our official hotel booking engine.
          </div>
        </div>

      </div>
    </div>
  );
}
