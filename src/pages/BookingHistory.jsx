import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaReceipt,
} from "react-icons/fa";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("bookingHistory")) || [];
    setBookings(data.reverse()); // latest first
  }, []);

  if (bookings.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 px-4">
        <FaHotel className="text-5xl mb-4 text-gray-300" />
        <h2 className="text-xl font-semibold">No bookings yet</h2>
        <p className="text-sm mt-2 mb-6 text-center">
          Book a hotel and it will appear here
        </p>
        <Link
          to="/hotels"
          className="bg-blue-600 text-white px-6 py-3 rounded-xl"
        >
          Explore Hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        Booking History
      </h1>

      <div className="space-y-6">
        {bookings.map((b, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col gap-4"
          >
            {/* HOTEL */}
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaHotel className="text-blue-600" />
              {b.hotel.name}
            </div>

            <p className="text-sm text-gray-500">
              {b.hotel.city} · {b.hotel.roomType}
            </p>

            {/* DETAILS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                {b.checkIn} → {b.checkOut}
              </div>

              <div className="flex items-center gap-2">
                <FaUsers />
                {b.adults} Adults, {b.children} Children
              </div>
            </div>

            {/* PRICE + STATUS */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-lg font-bold">
                <FaRupeeSign />
                {b.totalPrice}
              </div>

              <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-700">
                {b.status}
              </span>
            </div>

            {/* META */}
            <div className="flex flex-wrap gap-3 text-xs text-gray-500">
              <span>
                Booking ID: <b>{b.bookingId}</b>
              </span>
              <span>
                Payment ID: <b>{b.paymentId}</b>
              </span>
              <span>
                Booked On:{" "}
                {new Date(b.bookedAt).toLocaleDateString()}
              </span>
            </div>

            {/* RECEIPT */}
            <Link
              to="/receipt"
              className="mt-2 inline-flex items-center gap-2 text-blue-600 text-sm font-medium"
            >
              <FaReceipt />
              View Receipt
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
