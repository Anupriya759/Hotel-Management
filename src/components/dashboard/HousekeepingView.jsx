import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { HOUSEKEEPING_STAFF } from '../../data/hotelData';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  User, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Flame
} from 'lucide-react';

export default function HousekeepingView() {
  const { rooms, setRoomHousekeeping } = useHotel();

  const dirtyRooms = rooms.filter(r => r.housekeeping === 'dirty');
  const inProgressRooms = rooms.filter(r => r.housekeeping === 'in-progress');
  const cleanRooms = rooms.filter(r => r.housekeeping === 'clean');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-600" />
            Housekeeping & Room Turnaround Board
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cleanliness monitoring, inspection verification, and staff shift tracking.
          </p>
        </div>

        {/* Quick Summary Pill */}
        <div className="flex items-center gap-2 text-xs">
          <span className="bg-rose-100 text-rose-800 font-bold px-3 py-1 rounded-full">
            {dirtyRooms.length} Pending
          </span>
          <span className="bg-purple-100 text-purple-800 font-bold px-3 py-1 rounded-full">
            {inProgressRooms.length} In Progress
          </span>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
            {cleanRooms.length} Clean & Ready
          </span>
        </div>
      </div>

      {/* Staff Roster Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-sm">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-amber-400" />
          Active Housekeeping Crew On Duty
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {HOUSEKEEPING_STAFF.map(staff => (
            <div key={staff.id} className="bg-slate-800/80 border border-slate-700 p-3 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-100">{staff.name}</p>
                <p className="text-[10px] text-slate-400">{staff.role}</p>
                <p className="text-[10px] text-amber-400 font-mono mt-0.5">{staff.shift}</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                  {staff.completedToday} Done
                </span>
                <p className="text-[10px] text-slate-400 mt-1">{staff.activeTasks} Active</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3-Column Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Column 1: Dirty / Needs Sanitization */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Dirty / Vacated ({dirtyRooms.length})</h4>
            </div>
            <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
              Needs Cleaning
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {dirtyRooms.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                All rooms are currently in-progress or sanitized.
              </div>
            ) : (
              dirtyRooms.map(room => (
                <div key={room.id} className="p-3.5 rounded-2xl border border-rose-200 bg-rose-50/50 hover:bg-rose-50 transition flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm text-slate-900">Room #{room.number}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Floor {room.floor}</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold">{room.typeName}</p>
                  
                  <div className="mt-3 pt-2 border-t border-rose-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-rose-700 font-semibold">Priority: Normal</span>
                    <button
                      onClick={() => setRoomHousekeeping(room.id, 'in-progress')}
                      className="bg-slate-900 hover:bg-amber-600 text-white font-bold px-3 py-1 rounded-xl text-[11px] transition flex items-center gap-1"
                    >
                      <span>Start Cleaning</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 2: In-Progress */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Sanitization In Progress ({inProgressRooms.length})</h4>
            </div>
            <span className="text-[10px] font-semibold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full">
              Attendant Active
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {inProgressRooms.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No rooms currently undergoing active turnover.
              </div>
            ) : (
              inProgressRooms.map(room => (
                <div key={room.id} className="p-3.5 rounded-2xl border border-purple-200 bg-purple-50/50 hover:bg-purple-50 transition flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-sm text-slate-900">Room #{room.number}</span>
                    <span className="text-[10px] text-purple-700 font-mono">Assigned: David Kim</span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold">{room.typeName}</p>
                  
                  <div className="mt-3 pt-2 border-t border-purple-200/60 flex items-center justify-between">
                    <span className="text-[10px] text-purple-700 font-medium">Beds changed, deep vacuuming</span>
                    <button
                      onClick={() => setRoomHousekeeping(room.id, 'clean')}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1 rounded-xl text-[11px] transition flex items-center gap-1 shadow-sm"
                    >
                      <Check className="w-3 h-3" />
                      <span>Mark Clean</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Column 3: Clean & Inspected */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-4 shadow-sm flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h4 className="text-xs font-bold text-slate-900 uppercase">Inspected & Ready ({cleanRooms.length})</h4>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              Guest Ready
            </span>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px]">
            {cleanRooms.slice(0, 8).map(room => (
              <div key={room.id} className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/40 hover:bg-emerald-50 transition flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-900">Room #{room.number}</span>
                    <span className="text-[10px] text-slate-500 font-mono">Floor {room.floor}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">{room.typeName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    Inspected
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
