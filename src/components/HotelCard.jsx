import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function HotelCard({ hotel }) {
  const handleViewDetails = () => {
    toast.info("Opening hotel details", {
      description: `${hotel.name} · ${hotel.city}`,
    });
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={hotel.image}
        alt={hotel.name}
        className="h-48 w-full object-cover"
      />

      <div className="p-5">
        <h3 className="text-xl font-semibold">{hotel.name}</h3>
        <p className="text-gray-500">{hotel.city}</p>

        <div className="flex justify-between items-center mt-4">
          <p className="font-bold text-blue-600">
            ₹{hotel.price} / night
          </p>
          <p className="text-yellow-500">⭐ {hotel.rating}</p>
        </div>

        <Link
          to={`/hotels/${hotel.id}`}
          onClick={handleViewDetails}
          className="
            block mt-4 text-center
            bg-blue-600 text-white py-2 rounded-lg
            hover:bg-blue-700 transition
          "
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
