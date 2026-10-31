import React from 'react';
import { HotelProvider, useHotel } from './context/HotelContext';
import Header from './components/common/Header';
import Toast from './components/common/Toast';
import GuestWebsite from './components/website/GuestWebsite';
import PMSDashboard from './components/dashboard/PMSDashboard';

function MainApp() {
  const { viewMode } = useHotel();

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Universal Top Header with Seamless View Switching */}
      <Header />

      {/* Dynamic View rendering: Guest Website vs PMS Dashboard */}
      <div className="flex-1">
        {viewMode === 'website' ? <GuestWebsite /> : <PMSDashboard />}
      </div>

      {/* Floating Reactive Toast Alerts */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <HotelProvider>
      <MainApp />
    </HotelProvider>
  );
}
