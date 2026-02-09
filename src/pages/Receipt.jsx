import {
  FaEnvelope,
  FaCheckCircle,
  FaHotel,
  FaCalendarAlt,
  FaUsers,
  FaRupeeSign,
  FaIdCard,
} from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

export default function Receipt() {
  const { bookingId } = useParams();

  const history =
    JSON.parse(localStorage.getItem("bookingHistory")) || [];

  const booking = history.find(
    (b) => b.bookingId.toString() === bookingId
  );

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500">
        <p className="text-lg font-medium">Receipt not found</p>
        <Link to="/history" className="text-blue-600 underline">
          Back to history
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      
      {/* ================= HEADER ================= */}
      <div className="flex items-center gap-3 mb-8">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <FaEnvelope className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Booking Receipt</h2>
          <p className="text-sm text-gray-500">
            Confirmation & payment details
          </p>
        </div>
      </div>

      {/* ================= RECEIPT CARD ================= */}
      <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
        
        {/* Top banner */}
        <div className="bg-green-50 border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <FaCheckCircle />
            Booking Confirmed
          </div>

          <span className="text-xs text-gray-500">
            Payment ID: <b>{booking.paymentId}</b>
          </span>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">

          {/* Email meta */}
          <div className="text-sm text-gray-500">
            <p><b>To:</b> customer@email.com</p>
            <p><b>Subject:</b> Your Hotel Booking Confirmation</p>
          </div>

          <hr />

          {/* Message */}
          <div>
            <p className="mb-2">Hello Guest,</p>
            <p>
              We’re happy to inform you that your booking at{" "}
              <b className="text-gray-800">{booking.hotel.name}</b>{" "}
              has been successfully confirmed.
            </p>
          </div>

          {/* ================= DETAILS GRID ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">

            <DetailItem
              icon={<FaHotel />}
              label="Hotel"
              value={`${booking.hotel.name}, ${booking.hotel.city}`}
            />

            <DetailItem
              icon={<FaIdCard />}
              label="Room Type"
              value={booking.hotel.roomType}
            />

            <DetailItem
              icon={<FaCalendarAlt />}
              label="Stay"
              value={`${booking.checkIn} → ${booking.checkOut}`}
            />

            <DetailItem
              icon={<FaUsers />}
              label="Guests"
              value={`${booking.adults} Adult(s), ${booking.children} Child(ren)`}
            />

            <DetailItem
              icon={<FaRupeeSign />}
              label="Total Paid"
              value={`₹${booking.totalPrice}`}
              bold
            />
          </div>

          {/* Footer message */}
          <div className="pt-4 border-t text-sm text-gray-600">
            Thank you for choosing <b>HotelEase</b>.  
            We wish you a comfortable and pleasant stay.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= SMALL COMPONENT ================= */

function DetailItem({ icon, label, value, bold }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="text-blue-600 mt-1">{icon}</div>
      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className={`text-sm ${bold ? "font-bold" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
