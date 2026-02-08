import { Link } from "react-router-dom";
import { FaHome, FaHotel, FaExclamationTriangle } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full text-center bg-white shadow-xl rounded-2xl p-8">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-blue-100 flex items-center justify-center">
            <FaExclamationTriangle className="text-4xl text-blue-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-blue-600 mb-2">
          404
        </h1>

        {/* Message */}
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          Page Not Found
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="
              inline-flex items-center justify-center gap-2
              bg-blue-600 text-white px-6 py-3 rounded-xl
              font-medium hover:bg-blue-700 transition
            "
          >
            <FaHome />
            Go Home
          </Link>

          <Link
            to="/hotels"
            className="
              inline-flex items-center justify-center gap-2
              border border-blue-600 text-blue-600 px-6 py-3 rounded-xl
              font-medium hover:bg-blue-50 transition
            "
          >
            <FaHotel />
            Browse Hotels
          </Link>
        </div>
      </div>
    </div>
  );
}
