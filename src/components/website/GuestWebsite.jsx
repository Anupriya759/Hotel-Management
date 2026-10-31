import React from 'react';
import Hero from './Hero';
import RoomsSection from './RoomsSection';
import AmenitiesSection from './AmenitiesSection';
import TestimonialsSection from './TestimonialsSection';
import WebsiteFooter from './WebsiteFooter';
import BookingModal from './BookingModal';

export default function GuestWebsite() {
  const scrollToRooms = () => {
    const el = document.getElementById('rooms-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      <Hero onExploreRooms={scrollToRooms} />
      <RoomsSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <WebsiteFooter />

      {/* Interactive Guest Booking Engine Modal */}
      <BookingModal />
    </div>
  );
}
