import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaLock, FaMoneyBillWave } from "react-icons/fa";
import { toast } from "sonner";
import Footer from "../components/Footer";
export default function Payment() {
  const navigate = useNavigate();
  const [method, setMethod] = useState("online");

  const booking = JSON.parse(localStorage.getItem("currentBooking"));

  useEffect(() => {
    if (!booking) {
      toast.error("No active booking found");
      navigate("/hotels");
    }
  }, [booking, navigate]);

  if (!booking) return null;

const confirmBooking = (type) => {
  const confirmedBooking = {
    ...booking,
    hotel: {
      ...booking.hotel,
      image: booking.hotel.image, 
    },
    status:
      type === "online" ? "Online" : "Cash on Delivery",
    paymentId:
      type === "online"
        ? "PAY-" + Date.now()
        : "COD-" + Date.now(),
    bookedAt: new Date().toISOString(),
    paymentMethod: type,
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

  const handlePayment = () => {
    if (method === "cod") {
      toast.success("Booking placed with Cash on Delivery");
      confirmBooking("cod");
      return;
    }

    const toastId = toast.loading("Processing payment...");

    setTimeout(() => {
      toast.success("Payment successful!", {
        id: toastId,
        description: "Your booking is confirmed",
      });

      confirmBooking("online");
    }, 1200);
  };

  return (
    <>
    
    <div className="max-w-xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Payment</h2>

      <div className="bg-white shadow rounded-xl p-6 mb-6">
        <p className="font-semibold text-lg">
          {booking.hotel.name}
        </p>
        <p className="text-sm text-gray-500">
          Total Amount
        </p>
        <p className="text-xl font-bold text-blue-600">
          ₹{booking.totalPrice}
        </p>
      </div>

      <div className="bg-white shadow rounded-xl p-6 mb-6 space-y-4">

        <h3 className="font-semibold text-lg">
          Select Payment Method
        </h3>

        {/* ONLINE */}
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            checked={method === "online"}
            onChange={() => setMethod("online")}
          />
          <FaLock className="text-green-600" />
          <span className="font-medium">
            Pay Online (Card / UPI)
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="radio"
            name="payment"
            checked={method === "cod"}
            onChange={() => setMethod("cod")}
          />
          <FaMoneyBillWave className="text-yellow-600" />
          <span className="font-medium">
            Cash on Delivery
          </span>
        </label>
      </div>

      <button
        onClick={handlePayment}
        className={`
          w-full py-3 rounded-xl font-semibold transition
          ${
            method === "online"
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-yellow-500 hover:bg-yellow-600 text-white"
          }
        `}
      >
        {method === "online" ? (
          <>
            <FaLock className="inline mr-2 cursor-pointer" />
            Pay Securely
          </>
        ) : (
          <>
            <FaMoneyBillWave className="inline mr-2 cursor-pointer" />
            Place Order
          </>
        )}
      </button>

      <p className="text-xs text-gray-400 text-center mt-4">
        This is a demo payment. No real money will be charged.
      </p>
    </div>
    <Footer/>
    </>
  );
}
