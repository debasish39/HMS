import { useState, useEffect, useRef } from "react";
import hotelsData from "../services/hotels";
import HotelCard from "../components/HotelCard";
import { useSearch } from "../context/SearchContext";
import { toast } from "sonner";
import Footer from "../components/Footer";
import {
  FaCity,
  FaBed,
  FaRupeeSign,
  FaSortAmountDown,
  FaSearch,
  FaFilter,
  FaTimes,
} from "react-icons/fa";

export default function Hotels() {
  const { query } = useSearch();

  const [city, setCity] = useState("All");
  const [roomType, setRoomType] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [sortBy, setSortBy] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(false);

  const firstRender = useRef(true);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);

      if (!firstRender.current) {
        toast.info("Filters updated");
      } else {
        firstRender.current = false;
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, city, roomType, maxPrice, sortBy]);

  const filteredHotels = hotelsData
    .filter((hotel) => {
      if (!query) return true;
      const searchText = query.toLowerCase();
      return (
        hotel.name.toLowerCase().includes(searchText) ||
        hotel.city.toLowerCase().includes(searchText) ||
        hotel.roomType.toLowerCase().includes(searchText)
      );
    })
    .filter((hotel) => city === "All" || hotel.city === city)
    .filter((hotel) => roomType === "All" || hotel.roomType === roomType)
    .filter((hotel) => hotel.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  useEffect(() => {
    if (!loading && filteredHotels.length === 0 && !firstRender.current) {
      toast.error("No rooms match your search");
    }
  }, [filteredHotels, loading]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Available Rooms
            </h2>
            <p className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <FaSearch />
              Showing {filteredHotels.length} results
            </p>
          </div>

          <button
            onClick={() => setShowFilters(true)}
            className="sm:hidden flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            <FaFilter />
            Filters
          </button>
        </div>

        <div className="hidden sm:grid bg-white shadow-lg rounded-2xl p-6 mb-10 grid-cols-2 lg:grid-cols-4 gap-6">
          <FilterContent
            city={city}
            setCity={setCity}
            roomType={roomType}
            setRoomType={setRoomType}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {showFilters && (
          <div className="fixed inset-0 z-50 bg-black/40 flex items-end sm:hidden">
            <div className="bg-white w-full h-[85vh] rounded-t-3xl flex flex-col animate-slideUp">
              <div className="flex items-center justify-between px-5 py-4 border-b">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
                <FilterContent
                  city={city}
                  setCity={setCity}
                  roomType={roomType}
                  setRoomType={setRoomType}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  isMobile
                />
              </div>

              <div className="border-t px-5 py-4">
                <button
                  onClick={() => {
                    setShowFilters(false);
                    toast.success("Filters applied");
                  }}
                  className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">
                Updating results...
              </p>
            </div>
          </div>
        ) : filteredHotels.length === 0 ? (
          <div className="text-center py-24 text-gray-500">
            <p className="text-lg font-medium">
              No rooms match your search
            </p>
            <p className="text-sm mt-2">
              Try adjusting filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8">
            {filteredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

/* ================= FILTER CONTENT ================= */

function FilterContent({
  city,
  setCity,
  roomType,
  setRoomType,
  maxPrice,
  setMaxPrice,
  sortBy,
  setSortBy,
  isMobile = false,
}) {
  return (
    <>
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FaCity className="text-blue-600" /> City
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm"
        >
          <option value="All">All Cities</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Chennai">Chennai</option>
        </select>
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FaBed className="text-blue-600" /> Room Type
        </label>
        <select
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="w-full border rounded-xl px-4 py-3 text-sm"
        >
          <option value="All">All Room Types</option>
          <option value="Standard">Standard</option>
          <option value="Deluxe">Deluxe</option>
          <option value="Executive">Executive</option>
          <option value="Suite">Suite</option>
        </select>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
            <FaRupeeSign className="text-blue-600" /> Max Price
          </label>
          <span className="text-sm font-semibold text-blue-600">
            ₹{maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="2000"
          max="10000"
          step="500"
          value={maxPrice}
          onChange={(e) =>
            setMaxPrice(Number(e.target.value))
          }
          className="w-full accent-blue-600"
        />
      </div>

      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-600 mb-2">
          <FaSortAmountDown className="text-blue-600" /> Sort By
        </label>

        {isMobile ? (
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: "", label: "Recommended" },
              { value: "price-low", label: "Low → High" },
              { value: "price-high", label: "High → Low" },
              { value: "rating", label: "Top Rated" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => setSortBy(item.value)}
                className={`py-3 rounded-xl text-sm font-medium border ${
                  sortBy === item.value
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : (
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
            className="w-full border rounded-xl px-4 py-3 text-sm"
          >
            <option value="">Recommended</option>
            <option value="price-low">
              Price: Low → High
            </option>
            <option value="price-high">
              Price: High → Low
            </option>
            <option value="rating">Top Rated</option>
          </select>
        )}
      </div>
    </>
  );
}
