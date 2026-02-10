import { FaCheckCircle, FaHome, FaHistory } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import Footer from "../components/Footer";

export default function Confirmation() {
  const history =
    JSON.parse(localStorage.getItem("bookingHistory")) || [];

  const booking = history[history.length - 1];

  useEffect(() => {
    if (!booking) {
      toast.error("No confirmed booking found");
    } else {
      toast.success("Booking confirmed successfully!", {
        description: `Payment ID: ${booking.paymentId}`,
      });
    }
  }, [booking]);

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500">
        <p className="text-lg font-medium">No booking found</p>
        <Link to="/hotels" className="text-blue-600 underline">
          Browse hotels
        </Link>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      
      {/* Icon */}
      <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-6" />

      <h2 className="text-2xl font-bold mb-2">
        Booking Confirmed!
      </h2>

      <p className="text-gray-500 mb-6">
        Thank you for your booking. Your stay is confirmed.
      </p>

      {/* Details */}
      <div className="bg-white shadow rounded-xl p-6 text-left mb-8 space-y-1">
        <p><b>Hotel:</b> {booking.hotel.name}</p>
        <p><b>City:</b> {booking.hotel.city}</p>
        <p><b>Room:</b> {booking.hotel.roomType}</p>
        <p><b>Check-in:</b> {booking.checkIn}</p>
        <p><b>Check-out:</b> {booking.checkOut}</p>
        <p><b>Nights:</b> {booking.nights}</p>
        <p><b>Total:</b> ₹{booking.totalPrice}</p>
        <p><b>Payment ID:</b> {booking.paymentId}</p>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-medium"
        >
          <FaHome />
          Home
        </Link>

        <Link
          to="/history"
          className="flex items-center justify-center gap-2 border border-blue-600 text-blue-600 px-6 py-3 rounded-xl font-medium"
        >
          <FaHistory />
          Booking History
        </Link>
      </div>
      
    </div>
    <Footer/>
    </>
  );
}
