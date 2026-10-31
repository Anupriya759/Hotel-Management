import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  Building, 
  Filter, 
  KeyRound, 
  User, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Clock,
  Layers,
  Check,
  Receipt
} from 'lucide-react';

export default function RoomRack({ filterQuery = '' }) {
  const { 
    rooms, 
    updateRoomDirectStatus, 
    setRoomHousekeeping, 
    selectedRoom, 
    setSelectedRoom,
    bookings,
    checkInGuest,
    checkOutGuest,
    setSelectedInvoiceBooking
  } = useHotel();

  const [statusFilter, setStatusFilter] = useState('all');
  const [floorFilter, setFloorFilter] = useState('all');

  const floors = [4, 3, 2, 1];

  const filteredRooms = rooms.filter(room => {
    const matchesStatus = statusFilter === 'all' || room.status === statusFilter;
    const matchesFloor = floorFilter === 'all' || room.floor === Number(floorFilter);
    const matchesQuery = !filterQuery || 
      room.number.includes(filterQuery) || 
      room.typeName.toLowerCase().includes(filterQuery.toLowerCase()) || 
      (room.guestName && room.guestName.toLowerCase().includes(filterQuery.toLowerCase()));
    return matchesStatus && matchesFloor && matchesQuery;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-emerald-50 border-emerald-300 text-emerald-800';
      case 'occupied':
        return 'bg-blue-50 border-blue-300 text-blue-900';
      case 'reserved':
        return 'bg-amber-50 border-amber-300 text-amber-900';
      case 'cleaning':
        return 'bg-purple-50 border-purple-300 text-purple-900';
      case 'maintenance':
        return 'bg-rose-50 border-rose-300 text-rose-900';
      default:
        return 'bg-slate-50 border-slate-300 text-slate-800';
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Available</span>;
      case 'occupied':
        return <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Occupied</span>;
      case 'reserved':
        return <span className="bg-amber-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">Reserved</span>;
      case 'cleaning':
        return <span className="bg-purple-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Cleaning</span>;
      case 'maintenance':
        return <span className="bg-rose-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Out of Order</span>;
      default:
        return null;
    }
  };

  // Find booking for selected room
  const currentBooking = selectedRoom ? bookings.find(b => b.roomNumber === String(selectedRoom.number)) : null;

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-amber-600" />
            Visual Property Room Matrix & Status Rack
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Click any room card to manage guest check-in/out, assign cleaning, or view folio.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs">
            {['all', 'available', 'occupied', 'cleaning', 'reserved', 'maintenance'].map(status => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg font-medium capitalize transition ${
                  statusFilter === status 
                    ? 'bg-white text-slate-900 font-bold shadow-sm' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Floor filter */}
          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="bg-slate-100 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none"
          >
            <option value="all">All Floors (1-4)</option>
            <option value="4">Floor 4: Penthouse</option>
            <option value="3">Floor 3: Panorama</option>
            <option value="2">Floor 2: Deluxe Wing</option>
            <option value="1">Floor 1: Garden Villas</option>
          </select>
        </div>
      </div>

      {/* Room Grid by Floor */}
      <div className="space-y-6">
        {floors.map(floorNum => {
          const floorRooms = filteredRooms.filter(r => r.floor === floorNum);
          if (floorRooms.length === 0) return null;

          const floorName = floorNum === 4 ? "Floor 4 — Presidential & Penthouse Suites"
            : floorNum === 3 ? "Floor 3 — Panoramic Riviera Floor"
            : floorNum === 2 ? "Floor 2 — Deluxe Coastal Wing"
            : "Floor 1 — Ground Level & Royal Garden Villas";

          return (
            <div key={floorNum} className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 text-amber-400 font-bold text-xs flex items-center justify-center font-mono">
                    L{floorNum}
                  </span>
                  <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">{floorName}</h3>
                </div>
                <span className="text-xs text-slate-400">
                  {floorRooms.filter(r => r.status === 'occupied').length} / {floorRooms.length} Occupied
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-3">
                {floorRooms.map(room => (
                  <div
                    key={room.id}
                    onClick={() => setSelectedRoom(room)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 flex flex-col justify-between ${getStatusColor(room.status)}`}
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-sm text-slate-900">
                          #{room.number}
                        </span>
                        {getStatusBadge(room.status)}
                      </div>
                      <p className="text-[11px] font-semibold text-slate-700 mt-2 truncate" title={room.typeName}>
                        {room.typeName}
                      </p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">${room.rate}/night</p>
                    </div>

                    <div className="mt-4 pt-2 border-t border-slate-200/70 text-[10px]">
                      {room.guestName ? (
                        <div className="flex items-center gap-1 text-slate-800 font-medium truncate" title={room.guestName}>
                          <User className="w-3 h-3 text-slate-600 shrink-0" />
                          <span className="truncate">{room.guestName}</span>
                        </div>
                      ) : room.status === 'cleaning' ? (
                        <span className="text-purple-700 font-semibold flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          {room.housekeeping === 'dirty' ? 'Dirty' : 'Cleaning...'}
                        </span>
                      ) : room.status === 'maintenance' ? (
                        <span className="text-rose-700 font-semibold flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          Inspection
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Clean & Ready
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Room Detail Drawer / Modal */}
      {selectedRoom && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xl font-bold text-amber-400 bg-slate-800 px-3 py-1 rounded-xl">
                  Room #{selectedRoom.number}
                </span>
                <div>
                  <h3 className="font-serif font-bold text-base">{selectedRoom.typeName}</h3>
                  <p className="text-xs text-slate-400">Floor {selectedRoom.floor} • ${selectedRoom.rate}/night</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedRoom(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Current Status Pill */}
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Current Live Status</span>
                  <div className="mt-1 flex items-center gap-2">
                    {getStatusBadge(selectedRoom.status)}
                    <span className="text-xs font-semibold text-slate-700">
                      Keycard: {selectedRoom.keyCard || 'ACTIVE'}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Housekeeping</span>
                  <p className="text-xs font-semibold text-slate-800 capitalize mt-1">
                    {selectedRoom.housekeeping || 'Clean'}
                  </p>
                </div>
              </div>

              {/* Guest Information (if occupied or reserved) */}
              {selectedRoom.guestName ? (
                <div className="border border-slate-200 p-4 rounded-2xl bg-amber-50/40">
                  <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider">Registered Guest</span>
                  <h4 className="font-bold text-sm text-slate-900 mt-1">{selectedRoom.guestName}</h4>
                  <div className="grid grid-cols-2 gap-2 mt-2 text-xs text-slate-600">
                    <div>
                      <span className="text-slate-400 text-[10px]">Check-In:</span>
                      <p className="font-semibold">{selectedRoom.checkIn || '2026-10-31'}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px]">Check-Out:</span>
                      <p className="font-semibold">{selectedRoom.checkOut || '2026-11-03'}</p>
                    </div>
                  </div>

                  {currentBooking && (
                    <div className="mt-3 pt-2 border-t border-amber-200 flex items-center justify-between text-xs">
                      <span className="text-amber-800 font-medium">Ref: {currentBooking.id} (${currentBooking.totalAmount})</span>
                      <button
                        onClick={() => {
                          setSelectedInvoiceBooking(currentBooking);
                          setSelectedRoom(null);
                        }}
                        className="text-amber-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <Receipt className="w-3.5 h-3.5" />
                        View Guest Folio
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border border-slate-200 p-4 rounded-2xl text-xs text-slate-500 text-center">
                  No guest is currently occupying this room.
                </div>
              )}

              {/* Instant Action Triggers */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Change Room Status</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      updateRoomDirectStatus(selectedRoom.id, 'available');
                      setRoomHousekeeping(selectedRoom.id, 'clean');
                      setSelectedRoom(null);
                    }}
                    className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Set to Available & Clean
                  </button>

                  <button
                    onClick={() => {
                      updateRoomDirectStatus(selectedRoom.id, 'cleaning');
                      setRoomHousekeeping(selectedRoom.id, 'dirty');
                      setSelectedRoom(null);
                    }}
                    className="p-2.5 rounded-xl border border-purple-300 bg-purple-50 hover:bg-purple-100 text-purple-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-4 h-4" />
                    Send to Housekeeping
                  </button>

                  <button
                    onClick={() => {
                      updateRoomDirectStatus(selectedRoom.id, 'maintenance');
                      setSelectedRoom(null);
                    }}
                    className="p-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <AlertTriangle className="w-4 h-4" />
                    Out of Order / Repair
                  </button>

                  {selectedRoom.status === 'occupied' && currentBooking && (
                    <button
                      onClick={() => {
                        checkOutGuest(currentBooking.id);
                        setSelectedRoom(null);
                      }}
                      className="p-2.5 rounded-xl border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <User className="w-4 h-4" />
                      Check Out Guest
                    </button>
                  )}

                  {selectedRoom.status === 'reserved' && currentBooking && (
                    <button
                      onClick={() => {
                        checkInGuest(currentBooking.id);
                        setSelectedRoom(null);
                      }}
                      className="p-2.5 rounded-xl border border-emerald-300 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      Check In Guest Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
