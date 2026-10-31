export const HOTEL_INFO = {
  name: "The Grand Azure Resort & Spa",
  tagline: "Where Timeless Elegance Meets Coastal Splendor",
  address: "742 Azure Coastline Boulevard, Monte Carlo Bay, MC 98000",
  phone: "+1 (800) 555-AZURE",
  email: "concierge@grandazureresort.com",
  stars: 5,
  checkInTime: "15:00",
  checkOutTime: "11:00",
  currency: "$",
  stats: {
    totalRooms: 32,
    rating: 4.94,
    reviewsCount: 1420,
    staffCount: 48,
  }
};

export const ROOM_TYPES = [
  {
    id: "deluxe-ocean",
    name: "Deluxe Ocean View Room",
    category: "Deluxe",
    basePrice: 280,
    originalPrice: 340,
    capacity: 2,
    bed: "1 King Bed or 2 Twins",
    size: "45 m² / 485 sq ft",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1000&q=80",
    badge: "Popular Choice",
    description: "Floor-to-ceiling glass doors opening onto a private marble balcony with breathtaking unobstructed panoramic ocean views.",
    amenities: ["Ocean View Balcony", "Marble Bathroom", "Nespresso Bar", "Complimentary High-Speed Wi-Fi", "Smart TV with Streaming", "Plush Bathrobes & Slippers"],
  },
  {
    id: "executive-suite",
    name: "Executive Skyline Suite",
    category: "Suite",
    basePrice: 420,
    originalPrice: 510,
    capacity: 3,
    bed: "1 California King Bed",
    size: "68 m² / 730 sq ft",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80",
    badge: "Executive Club Access",
    description: "Expansive living salon with custom Italian furnishings, work desk, and VIP lounge access with complimentary evening cocktails.",
    amenities: ["Executive Lounge Access", "Separate Living Area", "Soaking Tub & Rain Shower", "Daily Canapés & Wine", "Hermès Bath Amenities", "Shoeshine Service"],
  },
  {
    id: "garden-villa",
    name: "Royal Garden Pool Villa",
    category: "Villa",
    basePrice: 620,
    originalPrice: 750,
    capacity: 4,
    bed: "2 King Master Beds",
    size: "110 m² / 1,180 sq ft",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
    badge: "Private Pool",
    description: "Secluded tropical sanctuary with private heated plunge pool, sun terrace, outdoor rain shower, and lush botanical garden enclosure.",
    amenities: ["Private Heated Plunge Pool", "Outdoor Daybed & Sun Deck", "Private Dining Gazebo", "Dedicated Villa Host", "Complimentary Minibar", "Yoga & Meditation Mat"],
  },
  {
    id: "presidential-penthouse",
    name: "The Grand Azure Presidential Penthouse",
    category: "Penthouse",
    basePrice: 950,
    originalPrice: 1200,
    capacity: 5,
    bed: "2 King Beds + Butler Quarters",
    size: "185 m² / 2,000 sq ft",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=1000&q=80",
    badge: "Ultra Luxury",
    description: "The pinnacle of coastal luxury occupying the entire top floor. Private wrap-around terrace, infinity whirlpool, grand piano, and 24/7 private butler.",
    amenities: ["24/7 Dedicated Butler Service", "Private Rooftop Jacuzzi", "Grand Dining Room (Seats 8)", "Steinway Baby Grand Piano", "Top-Shelf Wine Cellar", "Helipad Transfer Included"],
  },
  {
    id: "sunset-bungalow",
    name: "Horizon Beachfront Bungalow",
    category: "Bungalow",
    basePrice: 380,
    originalPrice: 460,
    capacity: 2,
    bed: "1 King Bed",
    size: "54 m² / 580 sq ft",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1000&q=80",
    badge: "Beach Access",
    description: "Steps from powdery white sands. Fall asleep to gentle surf and awaken with direct barefoot access to our private azure lagoon.",
    amenities: ["Direct Beachfront Access", "Private Hammock & Deck", "Outdoor Garden Shower", "Complimentary Kayak & SUP", "Sunset Champagne Daily", "Bose Sound System"],
  },
  {
    id: "junior-comfort",
    name: "Courtyard Junior Suite",
    category: "Suite",
    basePrice: 220,
    originalPrice: 260,
    capacity: 2,
    bed: "1 Queen Bed",
    size: "38 m² / 410 sq ft",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1000&q=80",
    badge: "Great Value",
    description: "Peaceful retreat overlooking peaceful Mediterranean courtyard fountains with fragrant citrus trees and serene ambient lighting.",
    amenities: ["Courtyard View", "Deep Soaking Tub", "Ergonomic Desk", "Smart Room Controls", "Organic Cotton Linens", "Artisanal Tea Station"],
  }
];

export const INITIAL_ROOMS = [
  // Floor 1 - Ground / Garden Level
  { id: 101, number: "101", floor: 1, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "occupied", guestName: "Sophia Martinez", checkIn: "2026-10-29", checkOut: "2026-11-02", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 102, number: "102", floor: 1, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 103, number: "103", floor: 1, typeId: "sunset-bungalow", typeName: "Horizon Beach Bungalow", rate: 380, status: "occupied", guestName: "Liam Henderson", checkIn: "2026-10-30", checkOut: "2026-11-04", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 104, number: "104", floor: 1, typeId: "sunset-bungalow", typeName: "Horizon Beach Bungalow", rate: 380, status: "cleaning", guestName: null, checkIn: null, checkOut: null, housekeeping: "dirty", keyCard: "VACANT" },
  { id: 105, number: "105", floor: 1, typeId: "garden-villa", typeName: "Royal Garden Pool Villa", rate: 620, status: "occupied", guestName: "Alexander Wright", checkIn: "2026-10-28", checkOut: "2026-11-03", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 106, number: "106", floor: 1, typeId: "garden-villa", typeName: "Royal Garden Pool Villa", rate: 620, status: "reserved", guestName: "Charlotte Dubois", checkIn: "2026-10-31", checkOut: "2026-11-05", housekeeping: "clean", keyCard: "PENDING" },
  { id: 107, number: "107", floor: 1, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 108, number: "108", floor: 1, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "maintenance", guestName: null, checkIn: null, checkOut: null, housekeeping: "inspect", keyCard: "LOCKED" },

  // Floor 2 - Deluxe Coastal Wing
  { id: 201, number: "201", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "occupied", guestName: "David Sterling", checkIn: "2026-10-29", checkOut: "2026-11-01", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 202, number: "202", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 203, number: "203", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "reserved", guestName: "Dr. Chloe Chen", checkIn: "2026-10-31", checkOut: "2026-11-03", housekeeping: "clean", keyCard: "PENDING" },
  { id: 204, number: "204", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "occupied", guestName: "Marcus Vance", checkIn: "2026-10-27", checkOut: "2026-10-31", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 205, number: "205", floor: 2, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "occupied", guestName: "Isabella Rossi", checkIn: "2026-10-30", checkOut: "2026-11-03", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 206, number: "206", floor: 2, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "cleaning", guestName: null, checkIn: null, checkOut: null, housekeeping: "in-progress", keyCard: "VACANT" },
  { id: 207, number: "207", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 208, number: "208", floor: 2, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "occupied", guestName: "James O'Connor", checkIn: "2026-10-30", checkOut: "2026-11-02", housekeeping: "clean", keyCard: "ACTIVE" },

  // Floor 3 - Panorama Floor
  { id: 301, number: "301", floor: 3, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "occupied", guestName: "Viktor Petrov", checkIn: "2026-10-26", checkOut: "2026-11-01", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 302, number: "302", floor: 3, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 303, number: "303", floor: 3, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "occupied", guestName: "Amara Tanaka", checkIn: "2026-10-29", checkOut: "2026-11-04", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 304, number: "304", floor: 3, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 305, number: "305", floor: 3, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "reserved", guestName: "Oliver Bennett", checkIn: "2026-10-31", checkOut: "2026-11-02", housekeeping: "clean", keyCard: "PENDING" },
  { id: 306, number: "306", floor: 3, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "cleaning", guestName: null, checkIn: null, checkOut: null, housekeeping: "dirty", keyCard: "VACANT" },
  { id: 307, number: "307", floor: 3, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "occupied", guestName: "Emma Watson-Brown", checkIn: "2026-10-31", checkOut: "2026-11-03", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 308, number: "308", floor: 3, typeId: "junior-comfort", typeName: "Courtyard Junior Suite", rate: 220, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },

  // Floor 4 - Penthouse & Royal Suites
  { id: 401, number: "401", floor: 4, typeId: "presidential-penthouse", typeName: "Presidential Penthouse", rate: 950, status: "occupied", guestName: "Sheikh Tariq Al-Mansoor", checkIn: "2026-10-27", checkOut: "2026-11-05", housekeeping: "clean", keyCard: "VIP" },
  { id: 402, number: "402", floor: 4, typeId: "presidential-penthouse", typeName: "Presidential Penthouse", rate: 950, status: "reserved", guestName: "Grace Kelly Harrington", checkIn: "2026-10-31", checkOut: "2026-11-06", housekeeping: "clean", keyCard: "PENDING" },
  { id: 403, number: "403", floor: 4, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "occupied", guestName: "Luc & Camille Moreau", checkIn: "2026-10-29", checkOut: "2026-11-02", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 404, number: "404", floor: 4, typeId: "executive-suite", typeName: "Executive Skyline Suite", rate: 420, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 405, number: "405", floor: 4, typeId: "garden-villa", typeName: "Royal Garden Pool Villa", rate: 620, status: "occupied", guestName: "Henrik Lindqvist", checkIn: "2026-10-28", checkOut: "2026-11-04", housekeeping: "clean", keyCard: "ACTIVE" },
  { id: 406, number: "406", floor: 4, typeId: "garden-villa", typeName: "Royal Garden Pool Villa", rate: 620, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
  { id: 407, number: "407", floor: 4, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "cleaning", guestName: null, checkIn: null, checkOut: null, housekeeping: "in-progress", keyCard: "VACANT" },
  { id: 408, number: "408", floor: 4, typeId: "deluxe-ocean", typeName: "Deluxe Ocean View", rate: 280, status: "available", guestName: null, checkIn: null, checkOut: null, housekeeping: "clean", keyCard: "VACANT" },
];

export const INITIAL_BOOKINGS = [
  {
    id: "BK-8901",
    guestName: "Alexander Wright",
    email: "a.wright@globallux.com",
    phone: "+1 415-555-0192",
    roomNumber: "105",
    roomType: "Royal Garden Pool Villa",
    checkIn: "2026-10-28",
    checkOut: "2026-11-03",
    nights: 6,
    adults: 2,
    children: 1,
    status: "Checked-in",
    paymentStatus: "Paid",
    channel: "Direct Website",
    totalAmount: 3720,
    paidAmount: 3720,
    specialRequests: "Airport limousine pickup, champagne chilled upon arrival",
    createdAt: "2026-10-20 14:22",
    folio: [
      { id: "f1", item: "Room Charge (6 Nights)", amount: 3720, category: "Room" },
      { id: "f2", item: "Azure Seafood Grill & Wine", amount: 245, category: "Dining" },
      { id: "f3", item: "Deep Tissue Couple Spa Massage", amount: 320, category: "Spa" },
    ]
  },
  {
    id: "BK-8902",
    guestName: "Sheikh Tariq Al-Mansoor",
    email: "tariq.mansoor@royaldubai.ae",
    phone: "+971 50 123 4567",
    roomNumber: "401",
    roomType: "Presidential Penthouse",
    checkIn: "2026-10-27",
    checkOut: "2026-11-05",
    nights: 9,
    adults: 4,
    children: 2,
    status: "Checked-in",
    paymentStatus: "Paid",
    channel: "VIP Direct",
    totalAmount: 8550,
    paidAmount: 8550,
    specialRequests: "Strict privacy, private chef breakfast daily, helipad reception",
    createdAt: "2026-10-15 09:10",
    folio: [
      { id: "f4", item: "Presidential Penthouse (9 Nights)", amount: 8550, category: "Room" },
      { id: "f5", item: "Helicopter Transfer (Nice Airport)", amount: 850, category: "Transport" },
      { id: "f6", item: "Private In-Suite Wine Pairing Dinner", amount: 680, category: "Dining" },
      { id: "f7", item: "Caviar & Beluga Room Service", amount: 410, category: "Dining" },
    ]
  },
  {
    id: "BK-8903",
    guestName: "Sophia Martinez",
    email: "sophia.m@barcelonadesign.es",
    phone: "+34 612 345 678",
    roomNumber: "101",
    roomType: "Courtyard Junior Suite",
    checkIn: "2026-10-29",
    checkOut: "2026-11-02",
    nights: 4,
    adults: 1,
    children: 0,
    status: "Checked-in",
    paymentStatus: "Paid",
    channel: "Booking.com",
    totalAmount: 880,
    paidAmount: 880,
    specialRequests: "Quiet room away from elevators, feather pillows",
    createdAt: "2026-10-25 18:30",
    folio: [
      { id: "f8", item: "Courtyard Suite (4 Nights)", amount: 880, category: "Room" },
      { id: "f9", item: "Breakfast Buffet (2 Days)", amount: 70, category: "Dining" },
    ]
  },
  {
    id: "BK-8904",
    guestName: "Charlotte Dubois",
    email: "c.dubois@parisluxury.fr",
    phone: "+33 6 88 99 00 11",
    roomNumber: "106",
    roomType: "Royal Garden Pool Villa",
    checkIn: "2026-10-31",
    checkOut: "2026-11-05",
    nights: 5,
    adults: 2,
    children: 0,
    status: "Confirmed",
    paymentStatus: "Deposit Paid",
    channel: "Direct Website",
    totalAmount: 3100,
    paidAmount: 1550,
    specialRequests: "Late check-in estimated at 19:30, Honeymoon celebration",
    createdAt: "2026-10-26 11:45",
    folio: [
      { id: "f10", item: "Royal Garden Villa (5 Nights)", amount: 3100, category: "Room" },
    ]
  },
  {
    id: "BK-8905",
    guestName: "Dr. Chloe Chen",
    email: "chen.chloe@medstanford.edu",
    phone: "+1 650-555-8941",
    roomNumber: "203",
    roomType: "Deluxe Ocean View",
    checkIn: "2026-10-31",
    checkOut: "2026-11-03",
    nights: 3,
    adults: 2,
    children: 0,
    status: "Confirmed",
    paymentStatus: "Paid",
    channel: "Expedia",
    totalAmount: 840,
    paidAmount: 840,
    specialRequests: "High floor requested, allergen-free bedding",
    createdAt: "2026-10-28 20:05",
    folio: [
      { id: "f11", item: "Deluxe Ocean View (3 Nights)", amount: 840, category: "Room" },
    ]
  },
  {
    id: "BK-8906",
    guestName: "Marcus Vance",
    email: "marcus.vance@techhorizon.co.uk",
    phone: "+44 7700 900123",
    roomNumber: "204",
    roomType: "Deluxe Ocean View",
    checkIn: "2026-10-27",
    checkOut: "2026-10-31",
    nights: 4,
    adults: 1,
    children: 0,
    status: "Due Out Today",
    paymentStatus: "Paid",
    channel: "Corporate Rate",
    totalAmount: 1120,
    paidAmount: 1120,
    specialRequests: "Express check-out and tax invoice via email",
    createdAt: "2026-10-22 16:15",
    folio: [
      { id: "f12", item: "Deluxe Ocean View (4 Nights)", amount: 1120, category: "Room" },
      { id: "f13", item: "Mini-bar Consumables", amount: 65, category: "Minibar" },
      { id: "f14", item: "Dry Cleaning & Pressing", amount: 48, category: "Laundry" }
    ]
  },
  {
    id: "BK-8907",
    guestName: "Grace Kelly Harrington",
    email: "grace.harrington@harringtonlaw.com",
    phone: "+1 212-555-7734",
    roomNumber: "402",
    roomType: "Presidential Penthouse",
    checkIn: "2026-10-31",
    checkOut: "2026-11-06",
    nights: 6,
    adults: 3,
    children: 0,
    status: "Confirmed",
    paymentStatus: "Paid",
    channel: "Direct Website",
    totalAmount: 5700,
    paidAmount: 5700,
    specialRequests: "Anniversary setup with red roses, Moët & Chandon vintage",
    createdAt: "2026-10-29 10:14",
    folio: [
      { id: "f15", item: "Presidential Penthouse (6 Nights)", amount: 5700, category: "Room" }
    ]
  },
  {
    id: "BK-8908",
    guestName: "Isabella Rossi",
    email: "i.rossi@milanoatelier.it",
    phone: "+39 02 8877 665",
    roomNumber: "205",
    roomType: "Executive Skyline Suite",
    checkIn: "2026-10-30",
    checkOut: "2026-11-03",
    nights: 4,
    adults: 2,
    children: 0,
    status: "Checked-in",
    paymentStatus: "Paid",
    channel: "Direct Website",
    totalAmount: 1680,
    paidAmount: 1680,
    specialRequests: "Early morning Nespresso pod refills, yoga mat",
    createdAt: "2026-10-24 15:40",
    folio: [
      { id: "f16", item: "Executive Suite (4 Nights)", amount: 1680, category: "Room" },
      { id: "f17", item: "Sunset Cocktails at SkyLounge", amount: 92, category: "Dining" }
    ]
  }
];

export const RESORT_AMENITIES = [
  {
    title: "Infinity Azure Pool",
    desc: "Heated sea-water infinity pool suspended over the Mediterranean cliffs with private cabanas and day-long cocktail service.",
    icon: "Waves",
    badge: "24/7 Access"
  },
  {
    title: "L'Etoile Michelin Dining",
    desc: "Celebrated culinary journey crafted by 3-Michelin-starred Executive Chef Jean-Paul Laurent highlighting fresh coastal gastronomy.",
    icon: "UtensilsCrossed",
    badge: "Award Winning"
  },
  {
    title: "Thalasso Wellness Spa",
    desc: "Holistic wellness therapies, mineral steam baths, cryotherapy chambers, and tailor-made Swiss cellular skincare treatments.",
    icon: "Sparkles",
    badge: "Revitalizing"
  },
  {
    title: "Private Beach & Yacht Marina",
    desc: "Dedicated private bay with sun loungers, motorized water sports, sunset Riva yacht charters, and snorkeling safaris.",
    icon: "Anchor",
    badge: "Exclusive"
  },
  {
    title: "24/7 Royal Concierge",
    desc: "Bespoke experiences, VIP helicopter transfers, Monaco Grand Prix tickets, private shopping tours, and reservations.",
    icon: "Crown",
    badge: "White Glove"
  },
  {
    title: "State-of-the-Art Technogym",
    desc: "Panoramic fitness center equipped with Technogym Artis series, resident Olympic trainers, and ocean-view sunrise yoga.",
    icon: "Dumbbell",
    badge: "Fitness"
  }
];

export const GUEST_REVIEWS = [
  {
    id: 1,
    author: "Lady Evelyn Sinclair",
    location: "London, United Kingdom",
    rating: 5,
    title: "An unmatchable standard of luxury and warmth",
    comment: "The Grand Azure completely redefined coastal hospitality for our family. The Presidential Penthouse terrace views are otherworldly, and our butler Antoine anticipated every single request before we even spoke.",
    stayed: "Stayed in Presidential Penthouse",
    date: "October 2026",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    author: "Julian & Clara Sterling",
    location: "Zurich, Switzerland",
    rating: 5,
    title: "The private pool villa exceeded our dreams",
    comment: "From the chilled Dom Pérignon upon arrival to the private heated plunge pool under the stars, every touchpoint was flawless. The Thalasso Spa treatments were the best we've had anywhere in Europe.",
    stayed: "Stayed in Royal Garden Villa",
    date: "October 2026",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    author: "Marcello Moretti",
    location: "Milan, Italy",
    rating: 5,
    title: "Impeccable dining & genuine 5-star service",
    comment: "As a frequent traveler to Côte d'Azur, The Grand Azure stands apart. Breakfast overlooking the bay was magical, the room rack management and staff coordination was seamless. We will return every summer.",
    stayed: "Stayed in Deluxe Ocean Suite",
    date: "September 2026",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80"
  }
];

export const HOUSEKEEPING_STAFF = [
  { id: "h1", name: "Maria Gomez", role: "Head Housekeeper", shift: "Morning (07:00 - 15:30)", activeTasks: 3, completedToday: 8 },
  { id: "h2", name: "David Kim", role: "Senior Attendant", shift: "Morning (07:00 - 15:30)", activeTasks: 2, completedToday: 6 },
  { id: "h3", name: "Elena Rostova", role: "Suite Specialist", shift: "Evening (14:30 - 23:00)", activeTasks: 1, completedToday: 5 },
  { id: "h4", name: "Samira Patel", role: "Floor Supervisor", shift: "Morning (07:00 - 15:30)", activeTasks: 4, completedToday: 7 },
];
