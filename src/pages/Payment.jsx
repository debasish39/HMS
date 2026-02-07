import { Link, useNavigate } from "react-router-dom";
import { FaCreditCard, FaLock } from "react-icons/fa";

export default function Payment() {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("currentBooking"));

  if (!booking) {
    navigate("/hotels");
    return null;
  }

  const handlePayment = () => {
    const confirmedBooking = {
      ...booking,
      status: "confirmed",
      paymentId: "PAY-" + Date.now(),
    };

    localStorage.setItem("confirmedBooking", JSON.stringify(confirmedBooking));
    localStorage.removeItem("currentBooking");

    navigate("/confirmation");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p className="font-semibold">{booking.hotel.name}</p>
        <p className="text-sm text-gray-500">
          ₹{booking.totalPrice}
        </p>
      </div>

      <div className="space-y-4">
        <input
          placeholder="Card Number"
          className="w-full border px-4 py-2 rounded"
        />
        <div className="grid grid-cols-2 gap-4">
          <input placeholder="MM / YY" className="border px-4 py-2 rounded" />
          <input placeholder="CVV" className="border px-4 py-2 rounded" />
        </div>
      </div>

      <button
        onClick={handlePayment}
        className="w-full mt-6 bg-green-600 text-white py-3 rounded-xl font-semibold"
      >
        <FaLock className="inline mr-2" />
        Pay Securely
      </button>
    </div>
  );
}
