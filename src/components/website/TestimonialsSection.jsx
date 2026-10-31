import React from 'react';
import { GUEST_REVIEWS, HOTEL_INFO } from '../../data/hotelData';
import { Star, ShieldCheck, Quote } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-100 text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-amber-600 mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              Verified Guest Experiences
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              Cherished Memories from Our Discerning Guests
            </h2>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 shrink-0">
            <div className="text-3xl font-serif font-bold text-slate-900">{HOTEL_INFO.stats.rating}</div>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
              </div>
              <p className="text-xs text-slate-500 mt-0.5">Based on {HOTEL_INFO.stats.reviewsCount}+ verified stays</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUEST_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 rounded-3xl border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-slate-300" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900 mb-2">
                  "{review.title}"
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed font-light">
                  {review.comment}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/30"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{review.author}</h4>
                  <p className="text-xs text-slate-500">{review.location}</p>
                  <p className="text-[11px] text-amber-600 font-medium mt-0.5">{review.stayed}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
