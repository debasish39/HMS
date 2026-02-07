import { FaEnvelope } from "react-icons/fa";

export default function Receipt() {
  const booking = JSON.parse(localStorage.getItem("confirmedBooking"));

  if (!booking) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-4">
        Booking Receipt
      </h2>

      <div className="border rounded-xl p-6 bg-gray-50">
        <p><b>To:</b> customer@email.com</p>
        <p><b>Subject:</b> Your Hotel Booking Confirmation</p>

        <hr className="my-4" />

        <p>Hello Guest,</p>
        <p className="mt-2">
          Your booking at <b>{booking.hotel.name}</b> is confirmed.
        </p>

        <ul className="mt-4 space-y-1">
          <li>Check-in: {booking.checkIn}</li>
          <li>Check-out: {booking.checkOut}</li>
          <li>Guests: {booking.adults} Adult(s), {booking.children} Child(ren)</li>
          <li>Total Paid: ₹{booking.totalPrice}</li>
          <li>Payment ID: {booking.paymentId}</li>
        </ul>

        <p className="mt-6">
          Thank you for choosing us!
        </p>
      </div>
    </div>
  );
}
