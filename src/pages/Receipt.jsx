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
import { useEffect } from "react";
import AOS from "aos";

export default function Receipt() {
  const { bookingId } = useParams();

  const history =
    JSON.parse(localStorage.getItem("bookingHistory")) || [];

  const booking = history.find(
    (b) => b.bookingId.toString() === bookingId
  );

  /* ================= AOS INIT ================= */
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  if (!booking) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500"
        data-aos="fade-up"
      >
        <p className="text-lg font-medium">Receipt not found</p>
        <Link to="/history" className="text-blue-600 underline">
          Back to history
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-3 sm:px-4 py-8 sm:py-10">

      {/* ================= HEADER ================= */}
      <div
        className="flex items-center gap-3 mb-6"
        data-aos="fade-right"
      >
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <FaEnvelope className="text-blue-600 text-xl" />
        </div>
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">
            Booking Receipt
          </h2>
          <p className="text-sm text-gray-500">
            Confirmation & payment details
          </p>
        </div>
      </div>

      {/* ================= RECEIPT CARD ================= */}
      <div
        className="bg-white rounded-2xl shadow-lg border overflow-hidden"
        data-aos="fade-up"
        data-aos-delay="100"
      >

        {/* ================= HOTEL IMAGE ================= */}
        <div
          className="relative h-40 sm:h-56 w-full"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          <img
            src={
              booking.hotel.image ||
              "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
            }
            alt={booking.hotel.name}
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://images.unsplash.com/photo-1611892440504-42a792e24d32";
            }}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Hotel name overlay */}
          <div className="absolute bottom-3 left-4 text-white">
            <h3 className="text-lg font-semibold">
              {booking.hotel.name}
            </h3>
            <p className="text-xs opacity-90">
              {booking.hotel.city}
            </p>
          </div>
        </div>

        {/* ================= TOP BANNER ================= */}
        <div
          className="bg-green-50 border-b p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          data-aos="fade-down"
          data-aos-delay="300"
        >
          <div className="flex items-center gap-2 text-green-700 font-medium">
            <FaCheckCircle />
            Booking Confirmed
          </div>

          <span className="text-xs text-gray-500">
            Payment ID: <b>{booking.paymentId}</b>
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-6">

          {/* Email meta */}
          <div
            className="text-sm text-gray-500"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <p><b>To:</b> customer@email.com</p>
            <p><b>Subject:</b> Your Hotel Booking Confirmation</p>
          </div>

          <hr />

          <div
            className="text-sm sm:text-base"
            data-aos="fade-up"
            data-aos-delay="450"
          >
            <p className="mb-2">Hello Guest,</p>
            <p>
              We’re happy to inform you that your booking at{" "}
              <b className="text-gray-800">
                {booking.hotel.name}
              </b>{" "}
              has been successfully confirmed.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            {[
              {
                icon: <FaHotel />,
                label: "Hotel",
                value: `${booking.hotel.name}, ${booking.hotel.city}`,
              },
              {
                icon: <FaIdCard />,
                label: "Room Type",
                value: booking.hotel.roomType,
              },
              {
                icon: <FaCalendarAlt />,
                label: "Stay",
                value: `${booking.checkIn} → ${booking.checkOut}`,
              },
              {
                icon: <FaUsers />,
                label: "Guests",
                value: `${booking.adults} Adult(s), ${booking.children} Child(ren)`,
              },
              {
                icon: <FaRupeeSign />,
                label: "Total Paid",
                value: `₹${booking.totalPrice}`,
                bold: true,
              },
            ].map((item, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={500 + index * 80}
              >
                <DetailItem {...item} />
              </div>
            ))}
          </div>

          <div
            className="pt-4 border-t text-sm text-gray-600"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Thank you for choosing <b>HotelEase</b>.  
            We wish you a comfortable and pleasant stay.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= DETAIL ITEM ================= */

function DetailItem({ icon, label, value, bold }) {
  return (
    <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl">
      <div className="text-blue-600 mt-1">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>
        <p className={`text-sm ${bold ? "font-bold" : ""}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
