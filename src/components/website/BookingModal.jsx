import React, { useState, useEffect } from 'react';
import { useHotel } from '../../context/HotelContext';
import { ROOM_TYPES, HOTEL_INFO } from '../../data/hotelData';
import confetti from 'canvas-confetti';
import { 
  X, 
  Calendar, 
  Users, 
  Sparkles, 
  Check, 
  ArrowRight, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  ExternalLink,
  ChevronLeft
} from 'lucide-react';

const LUXURY_ADDONS = [
  { id: 'transfer', name: 'Private Airport Chauffeur Transfer', price: 65, category: 'Transport', desc: 'Mercedes-Maybach S-Class greeting at airport terminal' },
  { id: 'breakfast', name: 'Daily Gourmet Champagne Breakfast Buffet', price: 35, category: 'Dining', desc: 'Caviar bar, fresh French pastries, and Laurent-Perrier' },
  { id: 'spa', name: 'Thalasso Wellness & Couple Spa Pass', price: 90, category: 'Spa', desc: 'Full access to hydrotherapy circuit & 60min massage' },
  { id: 'champagne', name: 'Vintage Moët & Chandon In-Room Setup', price: 55, category: 'Dining', desc: 'Chilled bottle with chocolate-dipped strawberries' },
];

export default function BookingModal() {
  const { 
    bookingModalOpen, 
    setBookingModalOpen, 
    preselectedRoomType, 
    rooms, 
    createBooking,
    setViewMode,
    setDashboardTab
  } = useHotel();

  const [step, setStep] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState(preselectedRoomType || ROOM_TYPES[0]);
  const [checkIn, setCheckIn] = useState('2026-10-31');
  const [checkOut, setCheckOut] = useState('2026-11-04');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [selectedAddons, setSelectedAddons] = useState([]);
  
  // Guest details form
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  
  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    if (preselectedRoomType) {
      setSelectedRoomType(preselectedRoomType);
    }
  }, [preselectedRoomType]);

  if (!bookingModalOpen) return null;

  // Calculate nights
  const d1 = new Date(checkIn);
  const d2 = new Date(checkOut);
  const diffTime = Math.max(d2 - d1, 86400000);
  const nights = Math.max(1, Math.round(diffTime / (1000 * 60 * 60 * 24)));

  const roomSubtotal = (selectedRoomType?.basePrice || 280) * nights;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = roomSubtotal + addonsTotal;

  const toggleAddon = (addon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const handleCompleteBooking = (e) => {
    e.preventDefault();
    if (!fullName || !email) {
      alert("Please provide your name and email.");
      return;
    }

    // Find available room of this type
    const matchingRoom = rooms.find(r => r.typeId === selectedRoomType.id && r.status === 'available') 
      || rooms.find(r => r.status === 'available') 
      || { number: "102" };

    const bookingResult = createBooking({
      guestName: fullName,
      email: email,
      phone: phone || "+1 555-0199",
      roomNumber: matchingRoom.number,
      roomType: selectedRoomType.name,
      checkIn: checkIn,
      checkOut: checkOut,
      nights: nights,
      adults: adults,
      children: children,
      totalAmount: grandTotal,
      paidAmount: grandTotal,
      status: "Confirmed",
      paymentStatus: "Paid (Card *9021)",
      channel: "Direct Website",
      specialRequests: specialRequests || "None",
      addons: selectedAddons
    });

    setConfirmedBooking(bookingResult);
    setStep(4);

    // Trigger celebratory confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const closeModal = () => {
    setBookingModalOpen(false);
    setStep(1);
    setConfirmedBooking(null);
  };

  const handleSwitchToDashboard = () => {
    closeModal();
    setViewMode('dashboard');
    setDashboardTab('reservations');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="bg-slate-900 text-white px-6 py-5 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                {HOTEL_INFO.name}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">Instant Reservation</span>
            </div>
            <h2 className="font-serif text-xl font-bold mt-0.5">
              {step === 4 ? "Booking Confirmed & Guaranteed" : "Book Your Luxury Escape"}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (Steps 1-3) */}
        {step < 4 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between text-xs font-medium text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-amber-600 font-bold' : ''}`}>
              <span className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-[11px] font-bold">1</span>
              <span>Stay & Suite</span>
            </div>
            <div className="w-8 h-px bg-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-amber-600 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 2 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>2</span>
              <span>Luxury Add-ons</span>
            </div>
            <div className="w-8 h-px bg-slate-300" />
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-amber-600 font-bold' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${step >= 3 ? 'bg-amber-500 text-slate-950' : 'bg-slate-200 text-slate-600'}`}>3</span>
              <span>Guest Details</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: Stay & Suite Selection */}
          {step === 1 && (
            <div className="space-y-6">
              {/* Suite Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Suite or Villa
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ROOM_TYPES.map((rt) => (
                    <div
                      key={rt.id}
                      onClick={() => setSelectedRoomType(rt)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition flex items-center gap-3 ${
                        selectedRoomType?.id === rt.id
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-500'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <img src={rt.image} alt={rt.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-xs text-slate-900 truncate">{rt.name}</p>
                        <p className="text-[11px] text-slate-500">{rt.bed}</p>
                        <p className="text-xs font-bold text-amber-600 mt-0.5">${rt.basePrice} / night</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dates & Occupancy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Adults</label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  >
                    {[1, 2, 3, 4, 5].map(n => (
                      <option key={n} value={n}>{n} Adults</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">Children</label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium"
                  >
                    {[0, 1, 2, 3].map(n => (
                      <option key={n} value={n}>{n} Children</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Rate Summary */}
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-600">
                    Stay Duration: <span className="font-bold text-slate-900">{nights} Nights</span> ({checkIn} → {checkOut})
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Rate: ${selectedRoomType.basePrice} × {nights} nights
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-500">Suite Subtotal:</span>
                  <p className="text-xl font-bold font-serif text-slate-900">${roomSubtotal}</p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-900 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center gap-2"
                >
                  <span>Continue to Add-ons</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Luxury Add-ons */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Curate Your Mediterranean Stay</h3>
                <p className="text-xs text-slate-500 mt-0.5">Select optional VIP services to be arranged prior to arrival.</p>
              </div>

              <div className="space-y-3">
                {LUXURY_ADDONS.map((addon) => {
                  const isChecked = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`p-4 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
                        isChecked
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 ${
                        isChecked ? 'bg-amber-500 border-amber-500 text-slate-950' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-slate-900">{addon.name}</p>
                          <span className="text-xs font-bold text-amber-600">+${addon.price}</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">{addon.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[11px] text-slate-500">Current Total:</span>
                    <p className="text-lg font-bold font-serif text-slate-900">${grandTotal}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="bg-slate-900 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl text-xs transition flex items-center gap-2"
                  >
                    <span>Guest Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Information & Instant Confirmation */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Primary Guest Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lord Marcus Vance"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="marcus.vance@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Payment Method</label>
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-700">
                    <CreditCard className="w-4 h-4 text-emerald-600" />
                    <span>Instant Guarantee (Simulated Card)</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Special Requests & In-Suite Preferences</label>
                <textarea
                  rows="2"
                  placeholder="e.g., Honeymoon anniversary, feather-free pillows, late check-in flight arriving at 20:00"
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Order Final Breakdown */}
              <div className="bg-slate-900 text-white rounded-2xl p-4 text-xs space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>{selectedRoomType.name} ({nights} Nights)</span>
                  <span>${roomSubtotal}</span>
                </div>
                {selectedAddons.map(a => (
                  <div key={a.id} className="flex justify-between text-slate-400">
                    <span>+ {a.name}</span>
                    <span>${a.price}</span>
                  </div>
                ))}
                <div className="pt-2 border-t border-slate-800 flex justify-between font-bold text-sm text-amber-300">
                  <span>Total Amount (Taxes & Fees Included)</span>
                  <span className="font-serif text-lg">${grandTotal}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl text-xs transition shadow-lg shadow-amber-500/25 flex items-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-slate-950" />
                  <span>Confirm & Complete Reservation</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Instant Confirmation Voucher Screen */}
          {step === 4 && confirmedBooking && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Guaranteed & Confirmed
                </span>
                <h3 className="font-serif text-2xl font-bold text-slate-900 mt-2">
                  Thank You, {confirmedBooking.guestName}!
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Your luxury stay at The Grand Azure Resort & Spa has been registered in the hotel management system.
                </p>
              </div>

              {/* Printable Voucher Card */}
              <div className="bg-slate-50 border-2 border-dashed border-amber-500/40 rounded-3xl p-6 text-left max-w-lg mx-auto shadow-inner">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Confirmation Ref #</span>
                    <p className="font-mono text-lg font-bold text-amber-600">{confirmedBooking.id}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 uppercase">Assigned Room</span>
                    <p className="font-bold text-slate-900 text-sm">Room #{confirmedBooking.roomNumber}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 py-3 text-xs border-b border-slate-200">
                  <div>
                    <span className="text-slate-500 text-[11px]">Suite Type</span>
                    <p className="font-semibold text-slate-900">{confirmedBooking.roomType}</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Duration</span>
                    <p className="font-semibold text-slate-900">{confirmedBooking.nights} Nights</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Check-In</span>
                    <p className="font-semibold text-slate-900">{confirmedBooking.checkIn} (15:00)</p>
                  </div>
                  <div>
                    <span className="text-slate-500 text-[11px]">Check-Out</span>
                    <p className="font-semibold text-slate-900">{confirmedBooking.checkOut} (11:00)</p>
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-600">Total Billed:</span>
                  <span className="text-lg font-bold font-serif text-slate-900">${confirmedBooking.totalAmount}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSwitchToDashboard}
                  className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 shadow-md shadow-amber-500/20"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>View in Staff PMS Dashboard (Live)</span>
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-3 rounded-xl text-xs transition"
                >
                  Close & Return to Website
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
