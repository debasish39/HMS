import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Confirmation() {
  const booking = JSON.parse(localStorage.getItem("confirmedBooking"));

  if (!booking) {
    return <p className="text-center py-20">No booking found</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-16 text-center">
      <FaCheckCircle className="text-green-600 text-6xl mx-auto mb-6" />

      <h2 className="text-2xl font-bold mb-2">
        Booking Confirmed!
      </h2>

      <p className="text-gray-500 mb-6">
        Thank you for your booking.
      </p>

      <div className="bg-white shadow rounded-xl p-6 text-left mb-6">
        <p><b>Hotel:</b> {booking.hotel.name}</p>
        <p><b>Check-in:</b> {booking.checkIn}</p>
        <p><b>Check-out:</b> {booking.checkOut}</p>
        <p><b>Total:</b> ₹{booking.totalPrice}</p>
        <p><b>Payment ID:</b> {booking.paymentId}</p>
      </div>

      <Link
        to="/receipt"
        className="bg-blue-600 text-white px-6 py-3 rounded-xl"
      >
        View Receipt
      </Link>
    </div>
  );
}
