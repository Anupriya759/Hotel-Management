import React from 'react';
import { HOTEL_INFO } from '../../data/hotelData';
import { Building2, MapPin, Phone, Mail, Award, Shield, ArrowRight } from 'lucide-react';

export default function WebsiteFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-slate-950">
                <Building2 className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <span className="font-serif text-lg font-bold text-white tracking-wider">THE GRAND AZURE</span>
                <p className="text-[10px] uppercase tracking-widest text-amber-400">Resort & Spa</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-light">
              {HOTEL_INFO.tagline}. Set along the most prestigious shores of the French Riviera, offering bespoke hospitality since 1928.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-amber-400">
              <Award className="w-4 h-4" />
              <span>Forbes 5-Star Certified Resort 2026</span>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Concierge & Location
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{HOTEL_INFO.email}</span>
              </li>
              <li className="pt-2 text-[11px] text-slate-500">
                Check-in: {HOTEL_INFO.checkInTime} • Check-out: {HOTEL_INFO.checkOutTime}
              </li>
            </ul>
          </div>

          {/* Quick Nav Links */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              Resort Experiences
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#rooms-section" className="hover:text-amber-400 transition">Ocean View Suites</a></li>
              <li><a href="#rooms-section" className="hover:text-amber-400 transition">Royal Plunge Pool Villas</a></li>
              <li><a href="#rooms-section" className="hover:text-amber-400 transition">Presidential Penthouse</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">L'Etoile Michelin Gastronomy</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Thalasso Thermal Wellness</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Private Yacht Charters</a></li>
            </ul>
          </div>

          {/* Newsletter / Club */}
          <div>
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider mb-4">
              The Azure Circle
            </h4>
            <p className="text-xs text-slate-400 mb-3 leading-relaxed">
              Subscribe for private invitation-only seasonal releases, gala events, and preferential booking privileges.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your.email@domain.com"
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 flex-1"
              />
              <button 
                onClick={() => alert("Thank you for subscribing to The Azure Circle private newsletter.")}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              We respect your complete digital privacy.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} The Grand Azure Resort & Spa. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Hospitality</span>
            <span className="hover:text-slate-400 cursor-pointer">Accessibility</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
