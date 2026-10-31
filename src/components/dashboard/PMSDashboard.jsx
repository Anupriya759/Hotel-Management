import React, { useState } from 'react';
import { useHotel } from '../../context/HotelContext';
import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';
import DashboardOverview from './DashboardOverview';
import RoomRack from './RoomRack';
import ReservationsList from './ReservationsList';
import HousekeepingView from './HousekeepingView';
import AnalyticsView from './AnalyticsView';
import WalkInModal from './WalkInModal';
import BillingModal from './BillingModal';

export default function PMSDashboard() {
  const { dashboardTab } = useHotel();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <DashboardHeader onSearch={setSearchTerm} searchTerm={searchTerm} />

      <div className="flex-1 flex flex-col md:flex-row max-w-[1600px] w-full mx-auto">
        <DashboardSidebar />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {dashboardTab === 'overview' && <DashboardOverview />}
          {dashboardTab === 'room-rack' && <RoomRack filterQuery={searchTerm} />}
          {dashboardTab === 'reservations' && <ReservationsList searchTerm={searchTerm} />}
          {dashboardTab === 'housekeeping' && <HousekeepingView />}
          {dashboardTab === 'billing' && <ReservationsList searchTerm={searchTerm} />}
          {dashboardTab === 'analytics' && <AnalyticsView />}
        </main>
      </div>

      {/* Global Dashboard Modals */}
      <WalkInModal />
      <BillingModal />
    </div>
  );
}
