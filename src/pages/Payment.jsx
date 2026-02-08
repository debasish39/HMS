import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";

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
      status: "Confirmed",
      paymentId: "PAY-" + Date.now(),
      bookedAt: new Date().toISOString(),
    };

    const previous =
      JSON.parse(localStorage.getItem("bookingHistory")) || [];

    localStorage.setItem(
      "bookingHistory",
      JSON.stringify([...previous, confirmedBooking])
    );

    localStorage.removeItem("currentBooking");

    navigate("/confirmation");
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p className="font-semibold">{booking.hotel.name}</p>
        <p className="text-sm text-gray-500">
          Total: ₹{booking.totalPrice}
        </p>
      </div>

      <button
        onClick={handlePayment}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold"
      >
        <FaLock className="inline mr-2" />
        Pay Securely
      </button>
    </div>
  );
}
