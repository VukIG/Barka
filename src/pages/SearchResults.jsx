import TripCard from "../components/TripCard"

import { useState, useMemo } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Calendar, Filter, Anchor } from "lucide-react";
import { mockTrips, boatTypes } from "../data/mockData";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";
  const date = searchParams.get("date") || "";

  const [selectedBoatType, setSelectedBoatType] = useState("All Boat Types");
  const [maxPrice, setMaxPrice] = useState(100);
  const [minSeats, setMinSeats] = useState(1);

  const filteredTrips = useMemo(() => {
    return mockTrips.filter((trip) => {
      const matchesRoute = trip.from === from && trip.to === to;
      const matchesDate = !date || trip.date === date;
      const matchesBoatType =
        selectedBoatType === "All Boat Types" || trip.boatType === selectedBoatType;
      const matchesPrice = trip.price <= maxPrice;
      const matchesSeats = trip.seatsAvailable >= minSeats;

      return matchesRoute && matchesDate && matchesBoatType && matchesPrice && matchesSeats;
    });
  }, [from, to, date, selectedBoatType, maxPrice, minSeats]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {from} → {to}
          </h1>
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date || "Any date"}</span>
            </div>
            <span>•</span>
            <span>{filteredTrips.length} rides found</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="w-5 h-5 text-blue-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Boat Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Boat Type
                </label>
                <div className="space-y-2">
                  {boatTypes.map((type) => (
                    <label key={type} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="boatType"
                        checked={selectedBoatType === type}
                        onChange={() => setSelectedBoatType(type)}
                        className="w-4 h-4 text-blue-600"
                      />
                      <span className="text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Max Price: €{maxPrice}
                </label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-600"
                />
              </div>

              {/* Min Seats */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Minimum Seats Available
                </label>
                <select
                  value={minSeats}
                  onChange={(e) => setMinSeats(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "seat" : "seats"}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3 space-y-4">
            {filteredTrips.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Anchor className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  No rides found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search for a different route
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Back to Search
                </button>
              </div>
            ) : (
              filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;