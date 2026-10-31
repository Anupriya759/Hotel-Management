import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { ROOM_TYPES } from '../../data/hotelData';
import { 
  X, 
  UserPlus, 
  Calendar, 
  BedDouble, 
  CheckCircle, 
  CreditCard,
  DollarSign
} from 'lucide-react';

export default function WalkInModal() {
  const { 
    isStaffWalkInModalOpen, 
    setIsStaffWalkInModalOpen, 
    rooms, 
    createBooking 
  } = useHotel();

  const [guestName, setGuestName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRoomNumber, setSelectedRoomNumber] = useState('');
  const [checkIn, setCheckIn] = useState('2026-10-31');
  const [checkOut, setCheckOut] = useState('2026-11-03');
  const [channel, setChannel] = useState('Front Desk Walk-in');
  const [instantCheckIn, setInstantCheckIn] = useState(true);

  if (!isStaffWalkInModalOpen) return null;

  // Filter available rooms
  const availableRooms = rooms.filter(r => r.status === 'available');

  const handleCreate = (e) => {
    e.preventDefault();
    if (!guestName || !selectedRoomNumber) {
      alert("Please provide guest name and select an available room.");
      return;
    }

    const assignedRoom = rooms.find(r => r.number === selectedRoomNumber);
    const roomType = ROOM_TYPES.find(rt => rt.id === assignedRoom?.typeId) || ROOM_TYPES[0];
    
    // Calc nights
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diffTime = Math.max(d2 - d1, 86400000);
    const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));
    const total = roomType.basePrice * nights;

    createBooking({
      guestName,
      email: email || `${guestName.toLowerCase().replace(/\s+/g, '.')}@guest.com`,
      phone: phone || "+1 555-0144",
      roomNumber: selectedRoomNumber,
      roomType: roomType.name,
      checkIn,
      checkOut,
      nights,
      adults: 2,
      children: 0,
      totalAmount: total,
      paidAmount: total,
      status: instantCheckIn ? "Checked-in" : "Confirmed",
      paymentStatus: "Paid (Front Desk Terminal)",
      channel: channel,
      specialRequests: "Registered via PMS Front Desk terminal."
    });

    setIsStaffWalkInModalOpen(false);
    setGuestName('');
    setEmail('');
    setPhone('');
    setSelectedRoomNumber('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base">New Front Desk Walk-in / Phone Booking</h3>
          </div>
          <button
            onClick={() => setIsStaffWalkInModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleCreate} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Guest Full Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Baroness Helene Von Berg"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Email</label>
              <input
                type="email"
                placeholder="helene.berg@domain.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Phone</label>
              <input
                type="tel"
                placeholder="+49 89 123456"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Select Available Room */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">
              Select Available Clean Room * ({availableRooms.length} available)
            </label>
            <select
              required
              value={selectedRoomNumber}
              onChange={(e) => setSelectedRoomNumber(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 font-bold text-slate-900 focus:outline-none focus:border-amber-500"
            >
              <option value="">-- Choose Room from Visual Rack --</option>
              {availableRooms.map(r => (
                <option key={r.id} value={r.number}>
                  Room #{r.number} - {r.typeName} (${r.rate}/night, Floor {r.floor})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Check-in</label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 uppercase mb-1">Check-out</label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
              />
            </div>
          </div>

          {/* Booking Channel */}
          <div>
            <label className="block font-bold text-slate-700 uppercase mb-1">Reservation Channel</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900"
            >
              <option value="Front Desk Walk-in">Front Desk Walk-in</option>
              <option value="Phone Reservation">Phone Reservation</option>
              <option value="VIP Concierge">VIP Concierge Desk</option>
              <option value="Corporate Contract">Corporate Partner</option>
            </select>
          </div>

          {/* Instant Check-In Checkbox */}
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 flex items-center gap-3">
            <input
              type="checkbox"
              id="instantCheckIn"
              checked={instantCheckIn}
              onChange={(e) => setInstantCheckIn(e.target.checked)}
              className="w-4 h-4 text-amber-600 rounded focus:ring-0"
            />
            <label htmlFor="instantCheckIn" className="cursor-pointer">
              <span className="font-bold text-slate-900 block">Instant Check-in upon creation</span>
              <span className="text-[11px] text-slate-600">Activate electronic keycard and mark room as Occupied immediately.</span>
            </label>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsStaffWalkInModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-slate-900 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Register & Confirm Booking</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
