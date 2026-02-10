import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
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
    setBookings(data.reverse());
  }, []);

  if (bookings.length === 0) {
    return (
      <>
        <div
          className="min-h-[70vh] flex flex-col items-center justify-center text-gray-500 px-4 text-center"
          data-aos="fade-up"
        >
          <FaHotel className="text-5xl mb-4 text-gray-300" />
          <h2 className="text-lg font-semibold">No bookings yet</h2>
          <p className="text-sm mt-2 mb-6">
            Your confirmed bookings will appear here
          </p>
          <Link
            to="/hotels"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-sm font-medium"
          >
            Explore Hotels
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-6 sm:py-8">
        <h1
          className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8"
          data-aos="fade-right"
        >
          Booking History
        </h1>

        <div className="space-y-5 sm:space-y-6">
          {bookings.map((b, index) => (
            <div
              key={b.bookingId}
              data-aos="fade-up"
              data-aos-delay={index * 80}
              className="
                bg-white rounded-xl sm:rounded-2xl shadow
                overflow-hidden
                flex flex-col sm:flex-row
              "
            >
              <div className="relative w-full h-36 sm:w-56 sm:h-auto">
                <img
                  src={
                    b.hotel.image ||
                    "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
                  }
                  alt={b.hotel.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />

                <span className="
                  absolute top-2 right-2
                  sm:hidden
                  bg-green-100 text-green-700
                  text-xs font-medium
                  px-2 py-1 rounded-full
                ">
                  {b.status}
                </span>
              </div>

              <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                    <FaHotel className="text-blue-600 shrink-0" />
                    <span className="line-clamp-2">
                      {b.hotel.name}
                    </span>
                  </div>

                  <span className="
                    hidden sm:inline-block
                    px-3 py-1 rounded-full
                    text-xs bg-green-100 text-green-700
                  ">
                    {b.status}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-500">
                  {b.hotel.city} · {b.hotel.roomType}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-600" />
                    {b.checkIn} → {b.checkOut}
                  </div>

                  <div className="flex items-center gap-2">
                    <FaUsers className="text-blue-600" />
                    {b.adults} Adults, {b.children} Children
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1 text-base sm:text-lg font-bold">
                    <FaRupeeSign />
                    {b.totalPrice}
                  </div>

                  <Link
                    to={`/receipt/${b.bookingId}`}
                    className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium hover:underline"
                  >
                    <FaReceipt />
                    <span className="sm:inline">View Receipt</span>
                  </Link>
                </div>

                <div className="text-xs text-gray-400 mt-auto pt-2 border-t sm:border-none">
                  Booking ID: {b.bookingId}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
