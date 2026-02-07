import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import hotels from "../services/hotels";

// Icons
import {
  FaUser,
  FaChild,
  FaCalendarAlt,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";

export default function BookNow() {
  const { id } = useParams();
  const navigate = useNavigate();

  const hotel = hotels.find((h) => h.id === parseInt(id));

  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  // ---------------- Nights Calculation ----------------
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const diff = end - start;
    return diff > 0 ? diff / (1000 * 60 * 60 * 24) : 0;
  }, [checkIn, checkOut]);

  // ---------------- Price Calculation ----------------
  const totalPrice = useMemo(() => {
    if (!nights || !hotel) return 0;
    const guestFactor = adults + children * 0.5;
    return Math.round(hotel.price * nights * guestFactor);
  }, [hotel, nights, adults, children]);

  // ---------------- Save Booking ----------------
  const handleConfirmBooking = () => {
    const booking = {
      bookingId: Date.now(),
      hotel,
      adults,
      children,
      checkIn,
      checkOut,
      nights,
      totalPrice,
      status: "pending",
    };

    localStorage.setItem("currentBooking", JSON.stringify(booking));
    navigate(`/payment/${hotel.id}`);
  };

  if (!hotel) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500">
        Booking not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      
      {/* Back */}
      <Link
        to={`/hotels/${hotel.id}`}
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft />
        Back to hotel
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ================= LEFT: FORM ================= */}
        <div className="lg:col-span-2 bg-white shadow-lg rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">
            Book Your Stay
          </h2>

          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaCalendarAlt /> Check-in
              </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaCalendarAlt /> Check-out
              </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaUser /> Adults
              </label>
              <input
                type="number"
                min="1"
                value={adults}
                onChange={(e) => setAdults(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm mb-1">
                <FaChild /> Children
              </label>
              <input
                type="number"
                min="0"
                value={children}
                onChange={(e) => setChildren(Number(e.target.value))}
                className="w-full border rounded-lg px-3 py-2"
              />
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleConfirmBooking}
            disabled={!checkIn || !checkOut || nights <= 0}
            className="
              w-full bg-blue-600 text-white py-3 rounded-xl
              font-semibold hover:bg-blue-700 transition
              disabled:opacity-50 disabled:cursor-not-allowed
            "
          >
            Proceed to Payment
          </button>
        </div>

        {/* ================= RIGHT: SUMMARY ================= */}
        <div className="bg-gray-50 rounded-2xl p-6 shadow-md h-fit">
          <h3 className="text-lg font-semibold mb-4">
            Booking Summary
          </h3>

          <p className="font-medium">{hotel.name}</p>
          <p className="text-sm text-gray-500 mb-4">
            {hotel.city} · {hotel.roomType}
          </p>

          <div className="space-y-2 text-sm mb-4">
            <p>Nights: {nights}</p>
            <p>Adults: {adults}</p>
            <p>Children: {children}</p>
          </div>

          <div className="flex items-center gap-1 text-xl font-bold text-gray-800">
            <FaRupeeSign />
            {totalPrice}
          </div>

          <p className="text-xs text-gray-400 mt-2">
            Taxes included · Free cancellation
          </p>
        </div>
      </div>
    </div>
  );
}
