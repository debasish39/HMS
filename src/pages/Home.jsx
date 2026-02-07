import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Find Your Perfect Hotel Stay
        </h1>
        <p className="text-lg mb-8">
          Discover luxury and comfort at the best prices
        </p>
        <Link
          to="/hotels"
          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow hover:bg-gray-100"
        >
          Explore Hotels
        </Link>
      </div>
    </div>
  );
}
