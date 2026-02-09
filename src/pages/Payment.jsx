import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaLock } from "react-icons/fa";
import { toast } from "sonner";

export default function Payment() {
  const navigate = useNavigate();

  const booking = JSON.parse(localStorage.getItem("currentBooking"));

  // ❌ No booking found
  useEffect(() => {
    if (!booking) {
      toast.error("No active booking found");
      navigate("/hotels");
    }
  }, [booking, navigate]);

  if (!booking) return null;

  const handlePayment = () => {
    // 🔄 Loading toast
    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
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

      // ✅ Success toast
      toast.success("Payment successful!", {
        id: toastId,
        description: `Payment ID: ${confirmedBooking.paymentId}`,
      });

      navigate("/confirmation");
    }, 1200); // simulate gateway delay
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
        className="
          w-full bg-green-600 text-white py-3 rounded-xl
          font-semibold hover:bg-green-700 transition
        "
      >
        <FaLock className="inline mr-2" />
        Pay Securely
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        This is a demo payment. No real money will be charged.
      </p>
    </div>
  );
}
