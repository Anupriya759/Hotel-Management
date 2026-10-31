import React from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  LayoutDashboard, 
  Grid3X3, 
  CalendarCheck, 
  Sparkles, 
  Receipt, 
  BarChart3, 
  ShieldCheck,
  Building,
  KeyRound,
  Layers
} from 'lucide-react';

export default function DashboardSidebar() {
  const { dashboardTab, setDashboardTab, metrics } = useHotel();

  const navigationItems = [
    { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard, badge: null },
    { id: 'room-rack', label: 'Visual Room Rack', icon: Grid3X3, badge: `${metrics.occupiedRooms}/${metrics.totalRooms}` },
    { id: 'reservations', label: 'Reservations & Folio', icon: CalendarCheck, badge: metrics.todaysCheckIns > 0 ? `${metrics.todaysCheckIns} Due` : null },
    { id: 'housekeeping', label: 'Housekeeping & Clean', icon: Sparkles, badge: metrics.cleaningRooms > 0 ? `${metrics.cleaningRooms}` : null },
    { id: 'billing', label: 'Guest Billing & Invoices', icon: Receipt, badge: null },
    { id: 'analytics', label: 'Revenue & Occupancy', icon: BarChart3, badge: null },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-4 border-r border-slate-800 flex flex-col justify-between shrink-0">
      <div>
        {/* Module Title */}
        <div className="px-3 py-2 mb-4">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Hotel Property Management (PMS)
          </p>
          <p className="text-xs text-amber-400 font-semibold mt-0.5">
            The Grand Azure Riviera Core
          </p>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = dashboardTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setDashboardTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                    isActive
                      ? 'bg-slate-950 text-amber-400'
                      : 'bg-slate-800 text-amber-400 border border-amber-500/30'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick Summary Box */}
      <div className="mt-8 p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span>Live RevPAR</span>
          <span className="font-mono text-emerald-400 font-bold">${metrics.revPar}</span>
        </div>
        <div className="flex items-center justify-between text-slate-400">
          <span>Average Daily Rate</span>
          <span className="font-mono text-amber-400 font-bold">${metrics.averageDailyRate}</span>
        </div>
        <div className="mt-3 pt-2 border-t border-slate-700 text-[10px] text-slate-400 flex items-center gap-1">
          <KeyRound className="w-3 h-3 text-amber-400" />
          <span>Shift: Morning Front Desk</span>
        </div>
      </div>
    </aside>
  );
}
