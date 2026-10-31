import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ROOMS, INITIAL_BOOKINGS, ROOM_TYPES, HOUSEKEEPING_STAFF } from '../data/hotelData';

const HotelContext = createContext();

// Lightweight Web Audio chime for real-time notifications
const playChime = () => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
    // AudioContext blocked or not supported
  }
};

export const HotelProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('website'); // 'website' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'room-rack' | 'reservations' | 'housekeeping' | 'billing' | 'analytics'
  const [rooms, setRooms] = useState(() => {
    const saved = localStorage.getItem('grand_azure_rooms');
    return saved ? JSON.parse(saved) : INITIAL_ROOMS;
  });
  const [bookings, setBookings] = useState(() => {
    const saved = localStorage.getItem('grand_azure_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [notifications, setNotifications] = useState([
    { id: 1, title: "New Online Reservation", text: "Dr. Chloe Chen reserved Deluxe Ocean Room #203", time: "10 mins ago", unread: true, type: "booking" },
    { id: 2, title: "VIP Arrival Today", text: "Sheikh Tariq Al-Mansoor checked into Penthouse #401", time: "25 mins ago", unread: true, type: "vip" },
    { id: 3, title: "Housekeeping Completed", text: "Room 102 marked Clean & Inspected by Maria Gomez", time: "42 mins ago", unread: false, type: "housekeeping" },
  ]);
  const [activities, setActivities] = useState([
    { id: 'act-1', text: "Alexander Wright ordered Azure Seafood Grill dinner ($245) to Room #105", time: "14:25", type: "charge" },
    { id: 'act-2', text: "Housekeeper David Kim commenced sanitization of Suite #206", time: "14:10", type: "clean" },
    { id: 'act-3', text: "Express keycard authorized for Charlotte Dubois arrival Room #106", time: "13:45", type: "system" },
    { id: 'act-4', text: "Online direct booking confirmed: Presidential Penthouse Suite #402", time: "13:12", type: "booking" },
  ]);

  // Modals & Drawers
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedInvoiceBooking, setSelectedInvoiceBooking] = useState(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [preselectedRoomType, setPreselectedRoomType] = useState(null);
  const [isStaffWalkInModalOpen, setIsStaffWalkInModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('grand_azure_rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('grand_azure_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Show toast utility
  const showToast = (message, type = 'info') => {
    setToastMessage({ message, type, id: Date.now() });
    playChime();
    setTimeout(() => {
      setToastMessage((prev) => (prev?.message === message ? null : prev));
    }, 4500);
  };

  // Add notification
  const addNotification = (title, text, type = 'info') => {
    const newNotif = {
      id: Date.now(),
      title,
      text,
      time: "Just now",
      unread: true,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  // Create booking (from Guest website or Staff dashboard)
  const createBooking = (bookingData) => {
    const bookingId = `BK-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingId,
      ...bookingData,
      status: bookingData.status || "Confirmed",
      paymentStatus: bookingData.paymentStatus || "Paid",
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      folio: [
        {
          id: `f-${Date.now()}`,
          item: `${bookingData.roomType} (${bookingData.nights || 2} Nights)`,
          amount: bookingData.totalAmount,
          category: "Room"
        },
        ...(bookingData.addons || []).map((addon, idx) => ({
          id: `f-addon-${Date.now()}-${idx}`,
          item: addon.name,
          amount: addon.price,
          category: addon.category || "Service"
        }))
      ]
    };

    setBookings(prev => [newBooking, ...prev]);

    // Update room status if room number assigned
    if (bookingData.roomNumber) {
      setRooms(prev => prev.map(r => {
        if (r.number === String(bookingData.roomNumber)) {
          return {
            ...r,
            status: bookingData.status === "Checked-in" ? "occupied" : "reserved",
            guestName: bookingData.guestName,
            checkIn: bookingData.checkIn,
            checkOut: bookingData.checkOut,
          };
        }
        return r;
      }));
    }

    // Add activity log
    const activityText = `New reservation ${bookingId} booked by ${bookingData.guestName} (${bookingData.roomType}) - $${bookingData.totalAmount}`;
    setActivities(prev => [{ id: `act-${Date.now()}`, text: activityText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), type: 'booking' }, ...prev]);

    // Add notification
    addNotification("New Guest Reservation", `${bookingData.guestName} booked ${bookingData.roomType} ($${bookingData.totalAmount})`, "booking");

    showToast(`Reservation ${bookingId} confirmed for ${bookingData.guestName}!`, "success");
    return newBooking;
  };

  // Check in guest
  const checkInGuest = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Checked-in" } : b));
    setRooms(prev => prev.map(r => {
      if (r.number === String(booking.roomNumber)) {
        return {
          ...r,
          status: "occupied",
          guestName: booking.guestName,
          keyCard: "ACTIVE"
        };
      }
      return r;
    }));

    setActivities(prev => [{
      id: `act-${Date.now()}`,
      text: `${booking.guestName} checked in to Room #${booking.roomNumber}`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'checkin'
    }, ...prev]);

    addNotification("Guest Checked In", `${booking.guestName} is now active in Room #${booking.roomNumber}`, "checkin");
    showToast(`${booking.guestName} successfully checked into Room #${booking.roomNumber}!`, "success");
  };

  // Check out guest
  const checkOutGuest = (bookingId) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    setBookings(prev => prev.map(b => b.id === bookingId ? { ...b, status: "Checked-out" } : b));
    setRooms(prev => prev.map(r => {
      if (r.number === String(booking.roomNumber)) {
        return {
          ...r,
          status: "cleaning",
          guestName: null,
          checkIn: null,
          checkOut: null,
          housekeeping: "dirty",
          keyCard: "VACANT"
        };
      }
      return r;
    }));

    setActivities(prev => [{
      id: `act-${Date.now()}`,
      text: `${booking.guestName} checked out of Room #${booking.roomNumber}. Sent to Housekeeping queue.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'checkout'
    }, ...prev]);

    addNotification("Guest Checked Out", `Room #${booking.roomNumber} vacated and flagged for Housekeeping.`, "checkout");
    showToast(`Checked out ${booking.guestName}. Room #${booking.roomNumber} is now marked for Housekeeping.`, "info");
  };

  // Housekeeping status update
  const setRoomHousekeeping = (roomId, newHousekeepingStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        const isCleanNow = newHousekeepingStatus === 'clean';
        return {
          ...r,
          housekeeping: newHousekeepingStatus,
          status: (r.status === 'cleaning' && isCleanNow) ? 'available' : r.status
        };
      }
      return r;
    }));

    const targetRoom = rooms.find(r => r.id === roomId);
    if (targetRoom) {
      setActivities(prev => [{
        id: `act-${Date.now()}`,
        text: `Room #${targetRoom.number} housekeeping status updated to "${newHousekeepingStatus.toUpperCase()}"`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'clean'
      }, ...prev]);
      showToast(`Room #${targetRoom.number} updated to ${newHousekeepingStatus}!`, "info");
    }
  };

  // Update room status directly from matrix
  const updateRoomDirectStatus = (roomId, newStatus) => {
    setRooms(prev => prev.map(r => {
      if (r.id === roomId) {
        return {
          ...r,
          status: newStatus,
          guestName: newStatus === 'available' || newStatus === 'cleaning' || newStatus === 'maintenance' ? null : r.guestName
        };
      }
      return r;
    }));
    const targetRoom = rooms.find(r => r.id === roomId);
    if (targetRoom) {
      showToast(`Room #${targetRoom.number} marked as ${newStatus}`, "info");
    }
  };

  // Add charge to guest folio
  const addChargeToFolio = (bookingId, itemDescription, amount, category = "Dining") => {
    const newItem = {
      id: `f-${Date.now()}`,
      item: itemDescription,
      amount: parseFloat(amount),
      category
    };

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updatedFolio = [...(b.folio || []), newItem];
        const newTotal = updatedFolio.reduce((sum, item) => sum + item.amount, 0);
        return {
          ...b,
          folio: updatedFolio,
          totalAmount: newTotal
        };
      }
      return b;
    }));

    showToast(`Added charge of $${amount} (${itemDescription}) to folio`, "success");
  };

  // Live simulation helper: triggers a realistic guest booking to demonstrate real-time capability
  const simulateRandomBooking = () => {
    const sampleGuests = [
      { name: "Sir Richard Thorne", email: "richard.thorne@oxford.ac.uk", phone: "+44 7712 345678" },
      { name: "Mademoiselle Celine Moreau", email: "celine.m@cannesfest.fr", phone: "+33 6 11 22 33 44" },
      { name: "Kenji & Saki Takahashi", email: "takahashi@tokyotech.jp", phone: "+81 90 1234 5678" },
      { name: "Senator William Bradley", email: "bradley.office@usgov.senate.us", phone: "+1 202-555-0143" },
      { name: "Astrid & Lars Nygard", email: "astrid.nygard@nordicdesign.se", phone: "+46 8 123 456" }
    ];

    const guest = sampleGuests[Math.floor(Math.random() * sampleGuests.length)];
    const availableRooms = rooms.filter(r => r.status === 'available');

    if (availableRooms.length === 0) {
      showToast("Simulation: Hotel is currently at 100% capacity!", "warning");
      return;
    }

    const assignedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)];
    const roomType = ROOM_TYPES.find(rt => rt.id === assignedRoom.typeId) || ROOM_TYPES[0];
    const nights = Math.floor(Math.random() * 4) + 2;
    const totalAmount = roomType.basePrice * nights;

    createBooking({
      guestName: guest.name,
      email: guest.email,
      phone: guest.phone,
      roomNumber: assignedRoom.number,
      roomType: roomType.name,
      checkIn: "2026-11-01",
      checkOut: `2026-11-0${1 + nights}`,
      nights: nights,
      adults: 2,
      children: 0,
      status: "Confirmed",
      paymentStatus: "Paid",
      channel: "Direct Website (Live)",
      totalAmount: totalAmount,
      paidAmount: totalAmount,
      specialRequests: "Simulated live direct booking via online web engine.",
    });
  };

  // Calculate current dashboard metrics
  const totalRooms = rooms.length;
  const occupiedRooms = rooms.filter(r => r.status === 'occupied').length;
  const reservedRooms = rooms.filter(r => r.status === 'reserved').length;
  const availableRooms = rooms.filter(r => r.status === 'available').length;
  const cleaningRooms = rooms.filter(r => r.status === 'cleaning' || r.housekeeping === 'dirty' || r.housekeeping === 'in-progress').length;
  const maintenanceRooms = rooms.filter(r => r.status === 'maintenance').length;
  const occupancyRate = Math.round((occupiedRooms / totalRooms) * 100);

  // Revenue calculation
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);
  const todaysCheckIns = bookings.filter(b => b.checkIn === "2026-10-31" && b.status === "Confirmed").length;
  const todaysCheckOuts = bookings.filter(b => b.checkOut === "2026-10-31" && b.status === "Due Out Today").length;
  const averageDailyRate = occupiedRooms > 0 ? Math.round(totalRevenue / bookings.length) : 340;
  const revPar = Math.round((averageDailyRate * occupancyRate) / 100);

  return (
    <HotelContext.Provider
      value={{
        viewMode,
        setViewMode,
        dashboardTab,
        setDashboardTab,
        rooms,
        setRooms,
        bookings,
        setBookings,
        notifications,
        activities,
        selectedRoom,
        setSelectedRoom,
        selectedInvoiceBooking,
        setSelectedInvoiceBooking,
        bookingModalOpen,
        setBookingModalOpen,
        preselectedRoomType,
        setPreselectedRoomType,
        isStaffWalkInModalOpen,
        setIsStaffWalkInModalOpen,
        toastMessage,
        setToastMessage,
        showToast,
        addNotification,
        markAllNotificationsRead,
        createBooking,
        checkInGuest,
        checkOutGuest,
        setRoomHousekeeping,
        updateRoomDirectStatus,
        addChargeToFolio,
        simulateRandomBooking,
        // Computed metrics
        metrics: {
          totalRooms,
          occupiedRooms,
          reservedRooms,
          availableRooms,
          cleaningRooms,
          maintenanceRooms,
          occupancyRate,
          totalRevenue,
          todaysCheckIns,
          todaysCheckOuts,
          averageDailyRate,
          revPar
        }
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

export const useHotel = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error('useHotel must be used within a HotelProvider');
  }
  return context;
};
