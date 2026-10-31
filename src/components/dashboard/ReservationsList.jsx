import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { 
  CalendarCheck, 
  Search, 
  CheckCircle2, 
  Receipt, 
  LogOut, 
  CreditCard, 
  PlusCircle,
  Clock,
  User,
  Filter
} from 'lucide-react';

export default function ReservationsList({ searchTerm = '' }) {
  const { 
    bookings, 
    checkInGuest, 
    checkOutGuest, 
    setSelectedInvoiceBooking, 
    setIsStaffWalkInModalOpen 
  } = useHotel();

  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status.toLowerCase().replace(/\s+/g, '-') === statusFilter;
    const matchesSearch = !searchTerm || 
      b.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.guestName.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      b.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Confirmed (Due In)</span>;
      case 'Checked-in':
        return <span className="bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Checked-in (In House)</span>;
      case 'Due Out Today':
        return <span className="bg-orange-100 text-orange-800 text-[11px] font-bold px-2.5 py-1 rounded-full">Due Out Today</span>;
      case 'Checked-out':
        return <span className="bg-slate-100 text-slate-700 text-[11px] font-bold px-2.5 py-1 rounded-full">Checked-out</span>;
      default:
        return <span className="bg-slate-100 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-full">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CalendarCheck className="w-5 h-5 text-amber-600" />
            Reservations & Booking Registry
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Total of {bookings.length} reservations logged across direct web bookings and OTAs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Filters */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs overflow-x-auto">
            {['all', 'confirmed', 'checked-in', 'due-out-today', 'checked-out'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1 rounded-lg font-medium capitalize transition whitespace-nowrap ${
                  statusFilter === st
                    ? 'bg-white text-slate-900 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {st.replace(/-/g, ' ')}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsStaffWalkInModalOpen(true)}
            className="inline-flex items-center gap-1.5 bg-slate-900 hover:bg-amber-600 text-white font-bold px-3.5 py-2 rounded-xl text-xs transition shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3.5 px-4">Ref #</th>
                <th className="py-3.5 px-4">Guest Info</th>
                <th className="py-3.5 px-4">Room / Suite</th>
                <th className="py-3.5 px-4">Stay Dates</th>
                <th className="py-3.5 px-4">Financials</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500 text-xs">
                    No reservations matching filter criteria.
                  </td>
                </tr>
              ) : (
                filteredBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/70 transition">
                    {/* Ref & Channel */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-900">
                      <div>{b.id}</div>
                      <span className="text-[10px] font-sans font-normal text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {b.channel}
                      </span>
                    </td>

                    {/* Guest Name & Contact */}
                    <td className="py-4 px-4">
                      <p className="font-bold text-slate-900">{b.guestName}</p>
                      <p className="text-[11px] text-slate-500">{b.email}</p>
                      <p className="text-[10px] text-slate-400">{b.phone}</p>
                    </td>

                    {/* Room & Type */}
                    <td className="py-4 px-4">
                      <span className="font-mono font-bold bg-amber-500/10 text-amber-800 px-2 py-0.5 rounded text-xs">
                        Room #{b.roomNumber}
                      </span>
                      <p className="text-[11px] text-slate-600 mt-1 font-medium">{b.roomType}</p>
                    </td>

                    {/* Stay Dates */}
                    <td className="py-4 px-4">
                      <div className="font-semibold text-slate-800">
                        {b.checkIn} → {b.checkOut}
                      </div>
                      <span className="text-[10px] text-slate-500">
                        {b.nights} Nights ({b.adults} Adults{b.children > 0 ? `, ${b.children} Ch` : ''})
                      </span>
                    </td>

                    {/* Financials */}
                    <td className="py-4 px-4">
                      <div className="font-serif font-bold text-sm text-slate-900">${b.totalAmount}</div>
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <CreditCard className="w-3 h-3" />
                        {b.paymentStatus}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      {getStatusBadge(b.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {b.status === "Confirmed" && (
                          <button
                            onClick={() => checkInGuest(b.id)}
                            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Check In</span>
                          </button>
                        )}

                        {(b.status === "Checked-in" || b.status === "Due Out Today") && (
                          <button
                            onClick={() => checkOutGuest(b.id)}
                            className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition shadow-sm flex items-center gap-1"
                          >
                            <LogOut className="w-3.5 h-3.5" />
                            <span>Check Out</span>
                          </button>
                        )}

                        <button
                          onClick={() => setSelectedInvoiceBooking(b)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-1.5 rounded-xl text-xs font-semibold transition flex items-center gap-1"
                          title="View Guest Folio / Print Invoice"
                        >
                          <Receipt className="w-3.5 h-3.5" />
                          <span>Folio</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
