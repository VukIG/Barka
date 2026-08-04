import RouteCard from "../components/RouteCard";
import DatePicker from "../components/DatePicker";
import LocationSelect from "../components/LocationSelect";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Calendar,
  Waves,
  Anchor,
  TrendingUp,
} from "lucide-react";
import { croatianLocations } from "../data/mockData";
import { format } from "date-fns";

function Home() {
  const navigate = useNavigate();
  const [date, setDate] = useState(undefined);
  const [error, setError] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null); // "from" | "to" | null
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const toggle = (name) =>
    setOpenDropdown((prev) => (prev === name ? null : name));

  const handleSearch = (e) => {
    e.preventDefault();
    if (!from || !to || !date) {
      setError("Please select a departure, destination and date.");
      return;
    }
    setError("");
    const dateStr = format(date, "yyyy-MM-dd");
    navigate(`/search?from=${from}&to=${to}&date=${dateStr}`);
  };

  return (
    <>
      <div className="relative h-[90vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://vintage-boat-tours.com/lovable-uploads/5ec3949c-5a5c-46a1-8632-6f0ad82ef9ff.jpg"
            alt="Slovene Coast"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/60 via-blue-900/40 to-blue-900/60" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white">Barka</h1>
          </div>
          <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl">
            Share boat rides along the stunning Adriatic coast. Save money, meet
            people, and explore the Adriatic.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* From */}
              <LocationSelect
                label="From"
                value={from}
                placeholder="Select departure"
                options={croatianLocations}
                isOpen={openDropdown === "from"}
                onToggle={() => toggle("from")}
                onSelect={(loc) => {
                  setFrom(loc);
                  setOpenDropdown(null);
                }}
              />

              <LocationSelect
                label="To"
                value={to}
                placeholder="Select destination"
                options={croatianLocations}
                isOpen={openDropdown === "to"}
                onToggle={() => toggle("to")}
                onSelect={(loc) => {
                  setTo(loc);
                  setOpenDropdown(null);
                }}
              />

              {/* Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date
                </label>
                <DatePicker
                  selected={date}
                  onSelect={setDate}
                  placeholder="Select date"
                  minDate={new Date()}
                />
              </div>
            </div>
            {error && (
              <p className="text-red-600 text-sm text-center mb-3">{error}</p>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Search Boat Rides
            </button>
          </form>
        </div>
      </div>

      {/* How It Works */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
          How Barka Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              1. Search
            </h3>
            <p className="text-gray-600">
              Find boat rides between Adriatic coastal cities and islands
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              2. Book
            </h3>
            <p className="text-gray-600">
              Choose your captain and reserve your seat instantly
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Waves className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">
              3. Travel
            </h3>
            <p className="text-gray-600">
              Enjoy the ride along the beautiful Adriatic coast
            </p>
          </div>
        </div>
      </div>

      {/* Popular Routes */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Popular Routes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <RouteCard
              image="https://images.unsplash.com/photo-1768118603672-c5759fe08d1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkdWJyb3ZuaWslMjBjcm9hdGlhJTIwY29hc3RhbCUyMHZpZXd8ZW58MXx8fHwxNzc0NTA1NjE2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              from="Split"
              to="Hvar"
              price="from €35"
            />
            <RouteCard
              image="https://images.unsplash.com/photo-1612443091566-f90ed3ded0c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWlsaW5nJTIweWFjaHQlMjBtZWRpdGVycmFuZWFufGVufDF8fHx8MTc3NDU5MjE2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              from="Dubrovnik"
              to="Korčula"
              price="from €45"
            />
            <RouteCard
              image="https://images.unsplash.com/photo-1612468399191-34e535bbefbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGxpdCUyMGNyb2F0aWElMjBoYXJib3J8ZW58MXx8fHwxNzc0NjE2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              from="Zadar"
              to="Pag"
              price="from €25"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Boat owners */}
          <div className="group bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl p-8 md:p-10 text-center text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <Anchor className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Own a boat? Start earning today!
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Share your boat trips and connect with passengers along the coast
            </p>
            <button
              onClick={() => navigate("/offer")}
              className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Offer a Ride
            </button>
          </div>

          {/* Businesses */}
          <div className="group bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-10 text-center text-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-5">
              <TrendingUp className="w-7 h-7" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">
              Own a business? Boost your revenue!
            </h2>
            <p className="text-base md:text-lg mb-8 text-blue-100">
              Use insights into current boat traffic to predict when your
              customers will arrive
            </p>
            <button
              onClick={() => navigate("/buissnes")}
              className="bg-white text-blue-600 px-8 py-3.5 rounded-lg font-semibold hover:bg-blue-50 transition-colors shadow-lg"
            >
              Get data access
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
