import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSearch } from "../context/SearchContext";
import { FaSearch, FaHome, FaHotel, FaClipboardList, FaSignInAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (location.pathname === "/" && value.trim()) {
      navigate("/hotels");
    }
  };

  // ================= SCROLL LOGIC =================
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down
        setShowNav(false);
      } else {
        // scrolling up
        setShowNav(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      {/* ================= MOBILE TOP SEARCH ================= */}
      <div
        className={`
          md:hidden sticky top-0 z-50
          bg-white/90 backdrop-blur border border-b-black/30 px-4 py-3
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="relative">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search hotels, cities, room types..."
            value={query}
            onChange={handleSearchChange}
            className="
              w-full pl-12 pr-4 py-2.5 rounded-xl border
              focus:ring-2 focus:ring-blue-500 focus:outline-none
              text-sm bg-gray-50
            "
          />
        </div>
      </div>

      {/* ================= DESKTOP NAVBAR ================= */}
      <nav
        className={`
          hidden md:block sticky top-0 z-50
          bg-white/80 backdrop-blur-md border-b
          transition-transform border border-b-black/30 duration-300
          ${showNav ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-6">

            {/* Logo */}
            <Link
              to="/"
              className="text-3xl font-bold text-blue-600 tracking-wide"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Hotel<span className="text-gray-800">Ease</span>
            </Link>

            {/* Desktop Search */}
            <div className="flex flex-1 max-w-xl relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search hotels, cities, room types..."
                value={query}
                onChange={handleSearchChange}
                className="
                  w-full pl-12 pr-4 py-2.5 rounded-full border
                  focus:ring-2 focus:ring-blue-500 focus:outline-none
                  text-sm bg-gray-50
                "
              />
            </div>

            {/* Desktop Menu */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-gray-700 font-medium">
                <FaHome /> Home
              </Link>
              <Link to="/hotels" className="flex items-center gap-2 text-gray-700 font-medium">
                <FaHotel /> Hotels
              </Link>
              <Link to="/history" className="flex items-center gap-2 text-gray-700 font-medium">
                <FaClipboardList /> My Bookings
              </Link>

              <SignedIn>
                <UserButton />
              </SignedIn>

              <SignedOut>
                <Link
                  to="/sign-in"
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium transition"
                >
                  <FaSignInAlt /> Sign In
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <div
        className={`
          md:hidden fixed bottom-0 left-0 right-0 z-50
          bg-white border-t
          transition-transform duration-300
          ${showNav ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex items-center justify-around py-2 text-xs">
          <Link to="/" className="flex flex-col items-center gap-1 text-gray-700">
            <FaHome className="text-lg" />
            <span>Home</span>
          </Link>

          <Link to="/hotels" className="flex flex-col items-center gap-1 text-gray-700">
            <FaHotel className="text-lg" />
            <span>Hotels</span>
          </Link>

          <Link to="/history" className="flex flex-col items-center gap-1 text-gray-700">
            <FaClipboardList className="text-lg" />
            <span>Bookings</span>
          </Link>

          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <Link to="/sign-in" className="flex flex-col items-center gap-1 text-blue-600">
              <FaSignInAlt className="text-lg" />
              <span>Sign In</span>
            </Link>
          </SignedOut>
        </div>
      </div>
    </>
  );
}
