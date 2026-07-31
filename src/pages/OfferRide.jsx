import { useState } from "react";
import { useNavigate } from "react-router";
import { MapPin, Calendar, Clock, Euro, Anchor, Users, Plus, X } from "lucide-react";
import { croatianLocations, boatTypes } from "../data/mockData";
import DatePicker from "../components/DatePicker";

export function OfferRide() {
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [selectedDate, setSelectedDate] = useState(undefined);

  const [formData, setFormData] = useState({
    from: "",
    to: "",
    time: "",
    price: "",
    totalSeats: "",
    boatType: "",
    pickupPoint: "",
    dropoffPoint: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook up to backend later
    console.log({ formData, amenities, selectedDate });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Offer a Boat Ride</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 space-y-6">
          {/* Route */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Route</h2>
            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.from}
                onChange={(e) => setFormData({ ...formData, from: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">From...</option>
                {croatianLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>

              <select
                value={formData.to}
                onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                className="border p-2 rounded"
                required
              >
                <option value="">To...</option>
                {croatianLocations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Price (€)</label>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Seats</label>
              <input
                type="number"
                value={formData.totalSeats}
                onChange={(e) => setFormData({ ...formData, totalSeats: e.target.value })}
                className="border p-2 rounded w-full"
                required
              />
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
            Submit Ride
          </button>
        </form>
      </div>
    </div>
  );
}

export default OfferRide;