import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import { HOTEL_INFO } from '../../data/hotelData';
import { 
  Receipt, 
  X, 
  Printer, 
  Mail, 
  Plus, 
  CreditCard, 
  Building2, 
  Calendar, 
  DollarSign,
  CheckCircle2
} from 'lucide-react';

export default function BillingModal() {
  const { 
    selectedInvoiceBooking, 
    setSelectedInvoiceBooking, 
    addChargeToFolio,
    showToast 
  } = useHotel();

  const [newChargeItem, setNewChargeItem] = useState('');
  const [newChargeAmount, setNewChargeAmount] = useState('');
  const [newChargeCategory, setNewChargeCategory] = useState('Dining');

  if (!selectedInvoiceBooking) return null;

  const booking = selectedInvoiceBooking;
  const folioItems = booking.folio || [];
  const subtotal = folioItems.reduce((sum, item) => sum + item.amount, 0);
  const vatRate = 0.10; // 10% hospitality VAT
  const vatAmount = Math.round(subtotal * vatRate);
  const totalWithTax = subtotal + vatAmount;

  const handleAddCharge = (e) => {
    e.preventDefault();
    if (!newChargeItem || !newChargeAmount) return;
    addChargeToFolio(booking.id, newChargeItem, parseFloat(newChargeAmount), newChargeCategory);
    setNewChargeItem('');
    setNewChargeAmount('');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailInvoice = () => {
    showToast(`Official Tax Invoice sent to ${booking.email}`, "success");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Modal Top Bar */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <Receipt className="w-5 h-5 text-amber-400" />
            <h3 className="font-serif font-bold text-base">Guest Folio & Tax Invoice Management</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={handleEmailInvoice}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 flex items-center gap-1.5 transition"
            >
              <Mail className="w-4 h-4" />
              <span>Email Guest</span>
            </button>
            <button
              onClick={() => setSelectedInvoiceBooking(null)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-8 text-slate-800">
          {/* Hotel Header */}
          <div className="flex justify-between items-start border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                  <Building2 className="w-4 h-4" />
                </div>
                <h2 className="font-serif font-bold text-lg text-slate-900">{HOTEL_INFO.name}</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">{HOTEL_INFO.address}</p>
              <p className="text-xs text-slate-500">{HOTEL_INFO.phone} • {HOTEL_INFO.email}</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest font-mono">Folio / Invoice</span>
              <p className="font-mono text-xl font-bold text-amber-600 mt-0.5">{booking.id}</p>
              <p className="text-xs text-slate-500 mt-1">Date: {new Date().toLocaleDateString()}</p>
              <span className="inline-block mt-1 text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                Payment: {booking.paymentStatus}
              </span>
            </div>
          </div>

          {/* Guest and Stay Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Billed To</span>
              <p className="font-bold text-slate-900 mt-0.5">{booking.guestName}</p>
              <p className="text-slate-500">{booking.email}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Accommodating</span>
              <p className="font-bold text-slate-900 mt-0.5">Room #{booking.roomNumber}</p>
              <p className="text-slate-500">{booking.roomType}</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Stay Dates</span>
              <p className="font-bold text-slate-900 mt-0.5">{booking.checkIn}</p>
              <p className="text-slate-500">to {booking.checkOut} ({booking.nights}N)</p>
            </div>
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold">Channel</span>
              <p className="font-bold text-slate-900 mt-0.5">{booking.channel}</p>
              <p className="text-slate-500">{booking.adults} Adults, {booking.children || 0} Ch</p>
            </div>
          </div>

          {/* Itemized Folio Table */}
          <div className="mt-6">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Itemized Folio Breakdown</h4>
            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-4">Description / Charge Item</th>
                    <th className="py-2.5 px-4">Category</th>
                    <th className="py-2.5 px-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {folioItems.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-50">
                      <td className="py-2.5 px-4 font-medium text-slate-900">{item.item}</td>
                      <td className="py-2.5 px-4">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-2.5 px-4 text-right font-mono font-bold">${item.amount.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-4 flex justify-end">
              <div className="w-64 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Hospitality VAT (10%):</span>
                  <span className="font-mono font-medium">${vatAmount.toFixed(2)}</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Due:</span>
                  <span className="font-mono font-serif text-amber-600 text-base">${totalWithTax.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Add Incidental Charge Form (PMS Staff Control) */}
          <div className="mt-8 pt-6 border-t border-slate-200 bg-slate-50 p-4 rounded-2xl print:hidden">
            <h5 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Plus className="w-3.5 h-3.5 text-amber-600" />
              Post Live Incidental / POS Charge
            </h5>
            <form onSubmit={handleAddCharge} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                type="text"
                placeholder="Item (e.g. Minibar, Spa Massage, Laundry)"
                value={newChargeItem}
                onChange={(e) => setNewChargeItem(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 sm:col-span-2"
              />
              <input
                type="number"
                placeholder="Amount ($)"
                value={newChargeAmount}
                onChange={(e) => setNewChargeAmount(e.target.value)}
                className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-amber-600 text-white font-bold px-4 py-2 rounded-xl text-xs transition flex items-center justify-center gap-1"
              >
                <span>Add Charge</span>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
