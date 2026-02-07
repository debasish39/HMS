const baseHotels = [
  // ===== MUMBAI =====
  {
    id: 1,
    name: "Taj Palace",
    city: "Mumbai",
    price: 4500,
    rating: 4.8,
    roomType: "Deluxe",
    description: "Luxury hotel with sea view",
  },
  {
    id: 2,
    name: "Taj Palace",
    city: "Mumbai",
    price: 6200,
    rating: 4.9,
    roomType: "Suite",
    description: "Premium suite with ocean view",
  },
  {
    id: 3,
    name: "Taj Palace",
    city: "Mumbai",
    price: 3500,
    rating: 4.6,
    roomType: "Standard",
    description: "Comfortable standard room",
  },

  // ===== DELHI =====
  {
    id: 4,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 5200,
    rating: 4.9,
    roomType: "Executive",
    description: "Premium business hotel",
  },
  {
    id: 5,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 3800,
    rating: 4.6,
    roomType: "Deluxe",
    description: "Spacious deluxe room",
  },
  {
    id: 6,
    name: "Oberoi Hotel",
    city: "Delhi",
    price: 2600,
    rating: 4.4,
    roomType: "Standard",
    description: "Budget-friendly room",
  },

  // ===== BANGALORE =====
  {
    id: 7,
    name: "Leela Palace",
    city: "Bangalore",
    price: 4800,
    rating: 4.7,
    roomType: "Deluxe",
    description: "Modern luxury stay",
  },
  {
    id: 8,
    name: "Leela Palace",
    city: "Bangalore",
    price: 6500,
    rating: 4.9,
    roomType: "Suite",
    description: "Royal suite with city view",
  },
  {
    id: 9,
    name: "Leela Palace",
    city: "Bangalore",
    price: 3200,
    rating: 4.5,
    roomType: "Standard",
    description: "Cozy standard room",
  },
];

// =====================================================
// AUTO-GENERATE REMAINING ROOMS (UP TO 100 TOTAL)
// =====================================================

const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai"];
const hotelNames = [
  "Grand Stay",
  "Royal Inn",
  "Urban Nest",
  "Elite Rooms",
  "Comfort Residency",
];
const roomTypes = ["Standard", "Deluxe", "Executive", "Suite"];

const hotels = [...baseHotels];

let nextId = baseHotels.length + 1;

while (hotels.length < 100) {
  const cityIndex = hotels.length % cities.length;
  const hotelIndex = hotels.length % hotelNames.length;
  const roomIndex = hotels.length % roomTypes.length;

  hotels.push({
    id: nextId,
    name: hotelNames[hotelIndex],
    city: cities[cityIndex],
    price: 2000 + roomIndex * 1000,
    rating: Number((4 + (hotels.length % 10) * 0.1).toFixed(1)),
    roomType: roomTypes[roomIndex],
    description: "Comfortable room with modern amenities",
  });

  nextId++;
}

export default hotels;
