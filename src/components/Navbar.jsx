import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (location.pathname === "/" && value.trim()) {
      navigate("/hotels");
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            className="
    text-3xl font-bold text-blue-600 tracking-wide
  "          style={{ fontFamily: "'Great Vibes', cursive" }}





          >
            Hotel<span className="text-gray-800">Ease</span>
          </Link>


          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-xl relative">
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
          <div className="hidden md:flex items-center gap-6">
            {["Home", "Hotels", "My Bookings"].map((item) => (
              <Link
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Hotels"
                      ? "/hotels"
                      : "/history"
                }
                className="
                  relative text-gray-700 font-medium
                  after:absolute after:left-0 after:-bottom-1
                  after:h-0.5 after:w-0 after:bg-blue-600
                  hover:after:w-full after:transition-all
                "
              >
                {item}
              </Link>
            ))}

            <SignedIn>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in"
                className="
                  bg-blue-600 hover:bg-blue-700
                  text-white px-4 py-2 rounded-full text-sm font-medium
                  transition
                "
              >
                Sign In
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-3 md:hidden">
            <button onClick={() => setShowSearch(!showSearch)}>
              <FaSearch className="text-xl text-gray-600" />
            </button>

            <SignedIn>
              <UserButton />
            </SignedIn>

            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-xl" />
              ) : (
                <FaBars className="text-xl" />
              )}
            </button>
          </div>
        </div>

        {/* ===== MOBILE SEARCH ===== */}
        {showSearch && (
          <div className="mt-3 md:hidden relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search hotels..."
              value={query}
              onChange={handleSearchChange}
              className="
                w-full pl-12 pr-4 py-2.5 rounded-full border
                focus:ring-2 focus:ring-blue-500 text-sm
              "
            />
          </div>
        )}

        {/* ===== MOBILE MENU ===== */}
        {menuOpen && (
          <div
            className="
              mt-4 md:hidden rounded-2xl bg-gray-50
              p-4 space-y-4 shadow-inner
            "
          >
            {["Home", "Hotels", "My Bookings"].map((item) => (
              <Link
                key={item}
                to={
                  item === "Home"
                    ? "/"
                    : item === "Hotels"
                      ? "/hotels"
                      : "/history"
                }
                onClick={() => setMenuOpen(false)}
                className="block text-gray-800 font-medium text-lg"
              >
                {item}
              </Link>
            ))}

            <SignedOut>
              <Link
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="
                  block text-center bg-blue-600 text-white
                  py-2.5 rounded-full font-medium
                "
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
}
