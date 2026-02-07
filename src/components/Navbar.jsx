import { Link, useNavigate, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { useSearch } from "../context/SearchContext";
import { useState } from "react";

// Icons
import {
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";

export default function Navbar() {
  const { query, setQuery } = useSearch();

  const [menuOpen, setMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (location.pathname === "/" && value.trim() !== "") {
      navigate("/hotels");
    }
  }
  return (
    <nav className="bg-white/90 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">

        {/* ===== TOP BAR ===== */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              HotelEase
            </Link>
          </h1>

          {/* Desktop Search */}
          <div className="hidden md:block md:w-1/2">
            <input
              type="text"
              placeholder="Search hotel, city, or room type..."
              value={query}
              onChange={handleSearchChange}
              className="
                w-full border rounded-xl px-4 py-2
                focus:ring-2 focus:ring-blue-500
                text-sm
              "
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-600 hover:text-blue-600">
              Home
            </Link>

            <SignedIn>
              <Link to="/hotels" className="text-gray-600 hover:text-blue-600">
                Hotels
              </Link>
              <UserButton />
            </SignedIn>

            <SignedOut>
              <Link
                to="/sign-in"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>

          {/* Mobile Icons */}
          <div className="flex items-center gap-4 md:hidden">
            <button onClick={() => setShowSearch(!showSearch)}>
              <FaSearch className="text-xl text-gray-600 cursor-pointer" />
            </button>
            <SignedOut>
              <Link
                to="/sign-in"
                onClick={() => setMenuOpen(false)}
                className="
                  block text-center bg-blue-600 text-white
                  py-2 px-3 rounded-lg font-medium
                "
              >
                Sign In
              </Link>
            </SignedOut>
            <div className="pt-2">
              <UserButton />
            </div>
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? (
                <FaTimes className="text-xl cursor-pointer" />
              ) : (
                <FaBars className="text-xl cursor-pointer" />
              )}
            </button>
          </div>
        </div>

        {/* ===== MOBILE SEARCH ===== */}
        {showSearch && (
          <div className="mt-3 md:hidden">
            <input
              type="text"
              placeholder="Search hotel, city, or room type..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                w-full border rounded-xl px-4 py-2
                focus:ring-2 focus:ring-blue-500
                text-sm
              "
            />
          </div>
        )}

        {/* ===== MOBILE MENU ===== */}
        {menuOpen && (
          <div className="mt-4 md:hidden bg-gray-50 rounded-xl p-4 space-y-3">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 font-medium"
            >
              Home
            </Link>

            <SignedIn>
              <Link
                to="/hotels"
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 font-medium"
              >
                Hotels
              </Link>


            </SignedIn>


          </div>
        )}
      </div>
    </nav>
  );
}
