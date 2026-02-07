import { useParams, Link } from "react-router-dom";
import hotels from "../services/hotels";

// Icons
import {
  FaMapMarkerAlt,
  FaStar,
  FaBed,
  FaRupeeSign,
  FaArrowLeft,
} from "react-icons/fa";

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = hotels.find((h) => h.id === parseInt(id));

  if (!hotel) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-gray-500 gap-3">
        <FaBed className="text-5xl text-blue-600" />
        <p className="text-lg font-medium">Hotel not found</p>
        <Link to="/hotels" className="text-blue-600 underline">
          Go back to hotels
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-10">
      
      {/* Back Button */}
      <Link
        to="/hotels"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 mb-6"
      >
        <FaArrowLeft />
        Back to hotels
      </Link>

      {/* Image */}
      <div className="overflow-hidden rounded-2xl shadow mb-8">
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 sm:h-80 object-cover"
        />
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Details */}
        <div className="lg:col-span-2">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-gray-800">
            {hotel.name}
          </h1>

          <p className="flex items-center gap-2 text-gray-500 mb-4">
            <FaMapMarkerAlt className="text-blue-600" />
            {hotel.city}
          </p>

          <p className="text-gray-600 leading-relaxed mb-6">
            {hotel.description}
          </p>

          {/* Room Info */}
          <div className="flex flex-wrap gap-4">
            <span className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium">
              <FaBed />
              {hotel.roomType} Room
            </span>

            <span className="flex items-center gap-2 bg-yellow-50 text-yellow-600 px-4 py-2 rounded-full text-sm font-medium">
              <FaStar />
              {hotel.rating} Rating
            </span>
          </div>
        </div>

        {/* Right: Price & Action */}
        <div className="bg-white shadow-lg rounded-2xl p-6 h-fit">
          <p className="text-gray-500 text-sm mb-1">
            Price per night
          </p>

          <p className="flex items-center gap-1 text-3xl font-bold text-gray-800 mb-6">
            <FaRupeeSign className="text-xl" />
            {hotel.price}
          </p>

      <Link
  to={`/book/${hotel.id}`}
  className="w-full bg-blue-600 text-white py-3 px-3 rounded-xl text-center font-semibold"
>
  Book Now
</Link>

          <p className="text-xs text-gray-400 text-center mt-3">
            Free cancellation available
          </p>
        </div>
      </div>
    </div>
  );
}
